import {toLonLat} from 'ol/proj.js';
import PolyLineFormat from 'ol/format/Polyline.js';
import RouterBase, {RouteInfo, RouterBaseOptions, RouteDetail} from './RouterBase';
import type LineString from 'ol/geom/LineString.js';
import type {Coordinate} from 'ol/coordinate.js';

type GraphHopperOptions = RouterBaseOptions & {
  url: string;
};

export default class GraphHopper extends RouterBase {
  private polylineFormat = new PolyLineFormat({
    factor: 1e5,
    geometryLayout: 'XYZ'
  });

  /**
   * The URL prefix used for querying an itinerary on the network.
   * This depends on a specific vehicle.
   * To make it easy to change vehicle, this property is public.
   */
  public url: string;


  constructor(options: GraphHopperOptions) {
    super(options);
    this.url = options.url;
  }

  async getRoute(pointFromCoordinates: Coordinate, pointToCoordinates: Coordinate): Promise<RouteInfo> {
    const mapProjection = this.getMapProjection();
    const coordinates = [pointFromCoordinates, pointToCoordinates].map(cc => toLonLat(cc.slice(0, 2), mapProjection));
    const coordinateString = coordinates.map(c => `point=${c.reverse().join(',')}`).join('&');

    const response = await fetch(`${this.url}&${coordinateString}`);
    const json = await response.json();
    if (json.paths) {
      const path = json.paths[0];
      const resultGeometry = this.polylineFormat.readGeometry(path.points, {
        featureProjection: mapProjection
      }) as LineString;
      const resultCoordinates = resultGeometry.getCoordinates();
      resultCoordinates.forEach(c => c[2] *= 1000);
      const surfaces: RouteDetail[] = path.details?.surface?.map((s: [number, number, string]) => {
        return {
          start: s[0],
          end: s[1],
          type: s[2]
        }
      });
      const structures: RouteDetail[] = path.details?.structure?.map((s: [number, number, string]) => {
        return {
          start: s[0],
          end: s[1],
          type: s[2]
        }
      });
      const hiking_categories: RouteDetail[] = path.details?.hiking_category?.map((s: [number, number, string]) => {
        return {
          start: s[0],
          end: s[1],
          type: s[2]
        }
      });
      return {
        coordinates: resultCoordinates,
        surfaces: surfaces || [],
        structures: structures || [],
        hiking_categories: hiking_categories || [],
      };
    }
    return {
      coordinates: []
    };
  }
}
