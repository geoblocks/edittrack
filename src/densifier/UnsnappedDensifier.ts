import type Feature from 'ol/Feature.js';
import type LineString from 'ol/geom/LineString.js';
import {ProjectionLike} from 'ol/proj';
import {Densifier} from './index';

const MAX_POINT_DISTANCE_FOR_A_TRACK = 10;

type UnsnappedDensifierOptions = {
  // TODO: should we move projection as a function parameter instead ?
  projection: ProjectionLike;
  optimalPointDistance?: number;

  /** Maximum distance between two points, in meters */
  maxPointDistance?: number;

  /* */
  maxPoints?: number;
  extraDistance?: number;
  nDigits?: number;
  maxRequests?: number;
};

export default class UnsnappedDensifier implements Densifier {
  private projection: ProjectionLike;
  private maxPointDistance: number;

  constructor(parameters: UnsnappedDensifierOptions) {
    this.projection = parameters.projection;
    this.maxPointDistance = parameters.maxPointDistance || MAX_POINT_DISTANCE_FOR_A_TRACK;
  }

  densify(segment: Feature<LineString>): void {
    if (segment.get('snapped')) {
      console.log('Segment is snapped, skipped densifier');
      return;
    }
    const geometry = segment.getGeometry();
    const coordinates = geometry.getCoordinates();
    // if (coordinates.length != 2) {
    //   console.log(`Segment length is not 2 (${coordinates.length}), skipped densifier")`);
    //   return;
    // }
  }
}
