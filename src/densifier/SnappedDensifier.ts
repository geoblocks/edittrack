import type Feature from 'ol/Feature.js';
import type LineString from 'ol/geom/LineString.js';
import {ProjectionLike} from 'ol/proj';
import {Densifier} from './index';

import {MAX_POINTS_PER_REQUEST} from '../profiler/SwisstopoProfiler';
import {Coordinate, distance} from 'ol/coordinate';

const AT_LEAST_A_POINT_EVERY_N_METERS = 10;
const MAX_POINT_DISTANCE_FOR_A_TRACK = 80;
const EXTRA_DISTANCE = 6; //

type SnappedDensifierOptions = {
  /** The current projection of the geometry */
  projection: ProjectionLike;
  // TODO: should we move projection as a function parameter instead ?

  /** The wanted distance between two adjacent points */
  optimalPointDistance?: number;

  /** The greatest distance between two adjacent points */
  maxPointDistance?: number;

  /**
   * The maximal number of points allowed for the new geometry
   * If this number is reached, the original coordinates will be kept
   */
  maxPoints?: number;

  /** no points will be inserted if one exists at that extra distance */
  extraDistance?: number;

  /** The precision digits used for the new coordinates */
  nDigits?: number;
};

/**
 * This densifier will insert points to an geometry to increase the point density according to the parameters.
 */
export default class SnappedDensifier implements Densifier {
  private projection: ProjectionLike;
  private optimalPointDistance: number;
  private maxPointDistance?: number = MAX_POINTS_PER_REQUEST;
  private maxPoints?: number = MAX_POINTS_PER_REQUEST * 2;
  private extraDistance?: number = EXTRA_DISTANCE;
  private nDigits?: number = AT_LEAST_A_POINT_EVERY_N_METERS / 2 + 1;

  constructor(parameters: SnappedDensifierOptions) {
    this.projection = parameters.projection;
    this.optimalPointDistance = parameters.optimalPointDistance ?? AT_LEAST_A_POINT_EVERY_N_METERS;
    this.maxPointDistance = parameters.maxPointDistance ?? MAX_POINT_DISTANCE_FOR_A_TRACK;
  }

  densify(segment: Feature<LineString>): void {
    let interval = this.optimalPointDistance;
    const geometry = segment.getGeometry();
    const coordinates = geometry.getCoordinates();
    const numberOfPoints = coordinates.length;
    if (numberOfPoints >= this.maxPoints) return;

    let retry = false;
    do {
      try {
        const newCoordinates = [];
        const optimalPointDistancePlusExtra = this.optimalPointDistance + this.extraDistance;
        let previousCoordinate: Coordinate;
        let addedCount = 0;
        for (const coordinate of coordinates) {
          if (addedCount === 0) {
            newCoordinates.push(coordinate);
            addedCount += 1;
            previousCoordinate = coordinate;
            continue;
          }
          const xDiff = coordinate[0] - previousCoordinate[0];
          const yDiff = coordinate[1] - previousCoordinate[1];
          let dist = distance(coordinate, previousCoordinate);
          if (dist > optimalPointDistancePlusExtra) {
            const stepVector = [(interval * xDiff) / dist, (interval * yDiff) / dist];
            while (dist > optimalPointDistancePlusExtra) {
              previousCoordinate = [
                previousCoordinate[0] + stepVector[0],
                previousCoordinate[1] + stepVector[1],
              ];
              dist -= interval;
              newCoordinates.push([
                parseFloat(previousCoordinate[0].toFixed(this.nDigits)),
                parseFloat(previousCoordinate[1].toFixed(this.nDigits)),
              ]);
              addedCount += 1;
              if (addedCount > this.maxPoints) throw new Error();
            }
          }
          newCoordinates.push(coordinate);
          previousCoordinate = coordinate;
          addedCount += 1;
          if (addedCount > this.maxPoints) throw new Error();
        }
        geometry.setCoordinates(newCoordinates);
      } catch {
        interval *= 2; // Double the interval on error
        retry = true; // Set retry flag to true to retry the loop
      }
    } while (retry && interval <= this.maxPointDistance);
    console.error('Failed to insert points, Keeping the original ones');
  }
}
