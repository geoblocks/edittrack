import type Feature from 'ol/Feature.js';
import type LineString from 'ol/geom/LineString.js';
import {Densifier} from './index';
import {distance} from 'ol/coordinate';

const MAX_POINT_DISTANCE_FOR_A_TRACK = 10;
const DEFAULT_MAX_POINTS = 200;

type UnsnappedDensifierOptions = {
  /** Maximum distance between two points, in meters */
  maxPointDistance?: number;

  /** The precision digits used for the new coordinates */
  nDigits?: number;

  /** The maximal number of points allowed for the new geometry */
  maxPoints?: number;
};

/**
 * This Densifier only applies on unsnapped segments, and will split it into subsegment by creating new points
 * on the line, so that the maximal distance between points is not more that `maxPointDistance` (in meters).
 *
 * If the segment already contains points in between, they are discarded and a new straight segment between
 * the start and the end of the line is returned.
 *
 * WARNING:: It is assumed that the map projection is in meters, like EPSG:3857 or EPSG:2056, as the
 * euclidian distance is used to compute the new points.
 */
export default class UnsnappedDensifier implements Densifier {
  private maxPointDistance: number;
  private maxPoints: number;
  private nDigits: number;

  constructor(parameters: UnsnappedDensifierOptions) {
    this.maxPointDistance = parameters.distance || MAX_POINT_DISTANCE_FOR_A_TRACK;
    this.maxPoints = parameters.maxPoints || DEFAULT_MAX_POINTS;
    this.nDigits = parameters.nDigits ?? MAX_POINT_DISTANCE_FOR_A_TRACK / 2 + 1;
  }

  densify(segment: Feature<LineString>): void {
    if (segment.get('snapped')) {
      console.log('Segment is snapped, skipped densifier');
      return;
    }

    const geometry = segment.getGeometry();
    const coordinates = geometry.getCoordinates();

    const start = coordinates[0];
    const end = coordinates[coordinates.length - 1];

    const segment_distance = distance(start, end);
    const xDiff = end[0] - start[0];
    const yDiff = end[1] - start[1];
    const nSubSegments = Math.ceil(segment_distance / this.maxPointDistance);
    const nPoints = Math.min(this.maxPoints, nSubSegments + 1);
    const newCoords = new Array(nPoints);
    newCoords[0] = start;
    for (let i = 1; i < nPoints - 1; i++) {
      const x = start[0] + (xDiff * i) / nPoints;
      const y = start[1] + (yDiff * i) / nPoints;
      newCoords[i] = [parseFloat(x.toFixed(this.nDigits)), parseFloat(y.toFixed(this.nDigits))];
    }
    newCoords[nPoints - 1] = end;

    geometry.setCoordinates(newCoords);
  }
}
