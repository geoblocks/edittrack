import {toLonLat} from 'ol/proj.js';
import PolyLineXYZMFormat from './PolylineXYZM.ts';
import RouterBase, {RouterBaseOptions} from './RouterBase.ts';
import type {LineString, Point} from 'ol/geom.js';
import type Feature from 'ol/Feature.js';

type GraphHopperOptions = RouterBaseOptions & {
  url: string;
};

export default class GraphHopper extends RouterBase {
  private polylineFormat = new PolyLineXYZMFormat();
  public url: string;

  constructor(options: GraphHopperOptions) {
    super(options);

    this.url = options.url;
  }

  async snapSegment(segment: Feature<LineString>, pointFrom: Feature<Point>, pointTo: Feature<Point>): Promise<boolean> {
    const mapProjection = this.map.getView().getProjection();
    const pointFromGeometry = pointFrom.getGeometry();
    const pointToGeometry = pointTo.getGeometry();
    const pointFromCoordinates = pointFromGeometry!.getCoordinates();
    const pointToCoordinates = pointToGeometry!.getCoordinates();

    const coordinates = [pointFromCoordinates, pointToCoordinates].map(cc => toLonLat(cc.slice(0, 2), mapProjection));
    const coordinateString = coordinates.map(c => `point=${c.reverse().join(',')}`).join('&');

    const response = await fetch(`${this.url}&${coordinateString}`);
    const json = await response.json();
    if (json.paths) {
      const path = json.paths[0];
      const resultGeometry = this.polylineFormat.readGeometry(path.points, {
        featureProjection: mapProjection
      });
      const resultCoordinates = resultGeometry.getCoordinates();
      const resultFromCoordinates = resultCoordinates[0].slice(0, 2);
      const resultToCoordinates = resultCoordinates[resultCoordinates.length - 1].slice(0, 2);

      pointFrom.set('snapped', this.isInTolerance(pointFromCoordinates, resultFromCoordinates));
      pointTo.set('snapped', this.isInTolerance(pointToCoordinates, resultToCoordinates));
      const snapped = pointFrom.get('snapped') && pointTo.get('snapped');

      if (snapped) {
        segment.getGeometry()!.setCoordinates(resultCoordinates, 'XYZM');
        pointFromGeometry!.setCoordinates(resultFromCoordinates);
        pointToGeometry!.setCoordinates(resultToCoordinates);
      } else {
        segment.getGeometry()!.setCoordinates([pointFromCoordinates, pointToCoordinates], 'XY');
      }
      segment.set('snapped', snapped);

      return snapped;
    }
    return false;
  }
}
