import type Feature from "ol/Feature.js";
import type LineString from "ol/geom/LineString.js";
import { Densifier } from "./index";

import { Coordinate, distance } from "ol/coordinate";

const AT_LEAST_A_POINT_EVERY_N_METERS = 10;
const MAX_POINT_DISTANCE_FOR_A_TRACK = 80;
const DEFAULT_MAX_POINTS = 2000
const DEFAULT_EXTRA_DISTANCE = 6; //

type SnappedDensifierOptions = {
  /** The wanted distance between two adjacent points */
  optimalPointDistance?: number;

  /** The greatest distance between two adjacent points */
  maxPointDistance?: number;

  /**
   * The maximal number of points allowed for the new geometry
   * If this number is reached, the original coordinates will be kept
   * If null, the number of points will not be checked
   */
  maxPoints: number | null;

  /** no points will be inserted if one exists at that extra distance */
  extraDistance?: number;
};

/**
 * This densifier will insert points to an geometry to increase the point density according to the parameters.
 *
 * WARNING:: It is assumed that the map projection is in meters, like EPSG:3857 or EPSG:2056, as the
 * euclidian distance is used to compute the new points.
 */
export default class SnappedDensifier implements Densifier {
  private optimalPointDistance: number;
  private maxPointDistance: number;
  private maxPoints: number | null;
  private extraDistance: number;

  constructor(parameters: SnappedDensifierOptions) {
    this.optimalPointDistance =
      parameters.optimalPointDistance ?? AT_LEAST_A_POINT_EVERY_N_METERS;
    this.maxPointDistance =
      parameters.maxPointDistance ?? MAX_POINT_DISTANCE_FOR_A_TRACK;
    this.extraDistance = parameters.extraDistance ?? DEFAULT_EXTRA_DISTANCE;
    this.maxPoints = parameters.maxPoints !== undefined ? parameters.maxPoints : DEFAULT_MAX_POINTS;
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
        let previousCoordinate: Coordinate = coordinates[0]
        let addedCount = 0;
        for (const coordinate of coordinates) {
          if (addedCount === 0) {
            newCoordinates.push(coordinate);
            addedCount += 1;
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
              newCoordinates.push(previousCoordinate);
              addedCount += 1;
              if (this.maxPoints && addedCount > this.maxPoints) throw new Error();
            }
          }
          newCoordinates.push(coordinate);
          previousCoordinate = coordinate;
          addedCount += 1;
          if (this.maxPoints && addedCount > this.maxPoints) throw new Error();
        }
        geometry.setCoordinates(newCoordinates, 'XY');
        return;
      } catch {
        interval *= 2; // Double the interval on error
        retry = true; // Set retry flag to true to retry the loop
      }
    } while (retry && interval <= this.maxPointDistance);
    console.error('Failed to insert points, Keeping the original ones');
  }
}
