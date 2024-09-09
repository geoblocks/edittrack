import type Feature from "ol/Feature.js";
import type LineString from "ol/geom/LineString.js";
import { Densifier } from "./index";
import { distance } from "ol/coordinate";

const DEFAULT_DISTANCE = 10;
const DEFAULT_MAX_POINTS = 200;

type UnsnappedDensifierOptions = {
  /**
   * The distance between two points in the new geometry.
   *
   */
  distance?: number;

  /** The maximal number of points allowed for the new geometry */
  maxPoints?: number;
};

/**
 * This Densifier only applies on unsnapped segments, and will split it into subsegment by creating
 * new points on the line, so that the distance between points is not more that `distance`
 * (in meters).
 *
 * The parameter `maxPoints` overrides `maxPointDistance`, and creates a hard limit on the number of
 * points created in the new segment.
 *
 * If the segment already contains points in between, they are discarded and a new straight segment
 * between the start and the end of the line is returned.
 *
 * WARNING:: It is assumed that the map projection is in meters, like EPSG:3857 or EPSG:2056, as the
 * euclidian distance is used to compute the new points.
 */
export default class UnsnappedDensifier implements Densifier {
  private distance: number;
  private maxPoints: number;

  constructor(parameters: UnsnappedDensifierOptions) {
    this.distance = parameters.distance ?? DEFAULT_DISTANCE;
    this.maxPoints = parameters.maxPoints ?? DEFAULT_MAX_POINTS;
  }

  densify(segment: Feature<LineString>): void {
    if (segment.get("snapped")) {
      return;
    }

    const geometry = segment.getGeometry();
    const coordinates = geometry.getCoordinates();

    if (coordinates.length < 2) {
      return;
    }
    const start = coordinates[0];
    const end = coordinates[coordinates.length - 1];

    const segment_distance = distance(start, end);
    const xDiff = end[0] - start[0];
    const yDiff = end[1] - start[1];
    const nSubSegments = Math.ceil(segment_distance / this.distance);
    const nPoints = Math.min(this.maxPoints, nSubSegments + 1);
    const newCoords = new Array(nPoints);
    newCoords[0] = start;
    for (let i = 1; i < nPoints - 1; i++) {
      const x = start[0] + (xDiff * i) / nPoints;
      const y = start[1] + (yDiff * i) / nPoints;
      newCoords[i] = [x, y];
    }
    newCoords[nPoints - 1] = end;

    geometry.setCoordinates(newCoords);
  }
}
