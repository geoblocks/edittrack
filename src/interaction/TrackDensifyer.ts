import {distance, type Coordinate} from "ol/coordinate.js";
import {MAX_POINTS_PER_REQUEST} from "../profiler/SwisstopoProfiler";

const AT_LEAST_A_POINT_EVERY_N = 10; // meters
const MAX_POINT_DISTANCE_FOR_A_TRACK = 80;
const EXTRA_DISTANCE = 6; // no points will be inserted if one exists at that extra distance

export function densifyTrack(
  coordinates: Coordinate[],
  optimalPointDistance: number = AT_LEAST_A_POINT_EVERY_N,
  maxPointDistance: number = MAX_POINT_DISTANCE_FOR_A_TRACK,
  maxPoints: number = MAX_POINTS_PER_REQUEST * 2,
  extra: number = EXTRA_DISTANCE,
  nDigits: number = AT_LEAST_A_POINT_EVERY_N / 2 + 1
): Coordinate[] {
  let interval = optimalPointDistance;
  const maxDistance = maxPointDistance ? maxPointDistance : 80;
  const numberOfPoints = coordinates.length;
  if (numberOfPoints >= maxPoints) return coordinates;

  let retry = false;
  do {
    try {
      const newCoordinates = [];
      const optimalPointDistancePlusExtra = optimalPointDistance + extra;
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
          const stepVector = [
            (interval * xDiff) / dist,
            (interval * yDiff) / dist,
          ];
          while (dist > optimalPointDistancePlusExtra) {
            previousCoordinate = [
              previousCoordinate[0] + stepVector[0],
              previousCoordinate[1] + stepVector[1],
            ];
            dist -= interval;
            newCoordinates.push([
              parseFloat(previousCoordinate[0].toFixed(nDigits)),
              parseFloat(previousCoordinate[1].toFixed(nDigits)),
            ]);
            addedCount += 1;
            if (addedCount > maxPoints) throw new Error();
          }
        }
        newCoordinates.push(coordinate);
        previousCoordinate = coordinate;
        addedCount += 1;
        if (addedCount > maxPoints) throw new Error();
      }
      return newCoordinates;
    } catch (e) {
      interval *= 2; // Double the interval on error
      retry = true; // Set retry flag to true to retry the loop
    }
  } while (retry && interval <= maxDistance);
  console.error("Failed to insert points, Keeping the original ones");
  return coordinates;
}
