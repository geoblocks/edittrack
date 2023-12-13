import {toLonLat} from 'ol/proj.js';
import PolyLineFormat from 'ol/format/Polyline.js';
import RouterBase, {RouterBaseOptions} from './RouterBase.ts';
import type {LineString, Point} from 'ol/geom.js';
import type Feature from 'ol/Feature.js';

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

  async snapSegment(segment: Feature<LineString>, pointFrom: Feature<Point>, pointTo: Feature<Point>): Promise<boolean> {
    const pointFromSnapped = pointFrom.get('snapped');
    const pointToSnapped = pointTo.get('snapped');
    const mapProjection = this.map.getView().getProjection();
    const pointFromGeometry = pointFrom.getGeometry();
    const pointToGeometry = pointTo.getGeometry();
    const pointFromCoordinates = pointFromGeometry!.getCoordinates();
    const pointToCoordinates = pointToGeometry!.getCoordinates();

    if (pointFromSnapped == false || pointToSnapped === false) {
      segment.getGeometry()!.setCoordinates([pointFromCoordinates, pointToCoordinates], 'XY');
      return false;
    }

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
      const resultFromCoordinates = resultCoordinates[0].slice(0, 2);
      const resultToCoordinates = resultCoordinates[resultCoordinates.length - 1].slice(0, 2);

      if (pointFromSnapped === undefined) {
        pointFrom.set('snapped', this.isInTolerance(pointFromCoordinates, resultFromCoordinates));
      }
      if (pointToSnapped === undefined) {
        pointTo.set('snapped', this.isInTolerance(pointToCoordinates, resultToCoordinates));
      }
      const snapped = pointFrom.get('snapped') && pointTo.get('snapped');

      if (snapped) {
        segment.getGeometry()!.setCoordinates(resultCoordinates, 'XYZ');
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
