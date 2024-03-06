import {toLonLat} from 'ol/proj.js';
import PolyLineFormat from 'ol/format/Polyline.js';
import RouterBase, {RouterBaseOptions} from './RouterBase';
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
  public url: string;

  constructor(options: GraphHopperOptions) {
    super(options);

    this.url = options.url;
  }

  async getRoute(pointFromCoordinates: Coordinate, pointToCoordinates: Coordinate): Promise<Coordinate[]> {
    const mapProjection = this.map.getView().getProjection();
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
      resultCoordinates.forEach(c => {
        if (c.length === 2 || c[2] === undefined) {console.error('Graphhopper: undefined altitude', c)}
        c[2] *= 1000
      });
      return resultCoordinates;
    }
    return [];
  }

}
