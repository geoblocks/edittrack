import {fromLonLat, toLonLat} from 'ol/proj.js';
import type { Snapper } from '.';
import type { Feature, Map } from 'ol';
import type { Point } from 'ol/geom';

type GraphHopperOptions = {
  map: Map;
  url: string;
  /**
   * The maximum distance in meters between the initial coordinates and the snapped ones.
   * Snapping only happen when the distance is lower than this limit.
   */
  maxDistance?: number;
};


export default class GraphHopper implements Snapper {
 
  /**
   * The URL prefix for snapping a point to the network.
   * This *does not* depends on a specific vehicle, so may not be accurate.
   * It is kept private because there is not configurable.
   */
  private nearestUrl: string;

  private map: Map;

  private maxDistance: number;


  constructor(options: GraphHopperOptions) {
    this.nearestUrl = options.url;
    this.maxDistance = options.maxDistance ?? 20;
    this.map = options.map;
  }
  
  async snapPoint(point: Feature<Point>): Promise<any> {
    const geom = point.getGeometry();
    const mapProjection = this.map.getView().getProjection();
    const cc = toLonLat(geom.getCoordinates().slice(0, 2), mapProjection);
    const url = `${this.nearestUrl}&point=${cc.reverse().join(',')}`;
    const response = await fetch(url);
    const json = await response.json();
    const distance: number = json.distance;
    if (distance === undefined) {
      // something went wrong
      return undefined;
    }
    if (distance > this.maxDistance) {
      // too far, skipping
      return undefined;
    }
    const newCoordinates = fromLonLat(json.coordinates, mapProjection);
    geom.setCoordinates(newCoordinates);
    point.set('snapped', true);
  }
}
