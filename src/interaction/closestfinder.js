import {distance as fakeDistance, closestOnSegment} from 'ol/coordinate.js';
import GeometryLayout from 'ol/geom/GeometryLayout.js';

/**
 * @typedef {Object} ClosestPoint
 * @property {number} distanceFromStart
 * @property {number} distanceFromSearched
 * @property {import("ol/coordinate").Coordinate} coordinates
 * @property {number} [fullLength]
 */

/**
 * @typedef {Object} ClosestLinesOptions
 * @property {number} tolerance
 * @property {boolean} interpolate
 */

/**
 * @param {import("ol/geom/LineString").default} line
 * @param {import("ol/coordinate").Coordinate} searched
 * @param {number} previousLineLength
 * @param {boolean} interpolate
 * @return {ClosestPoint}
 */
export function findClosestPointInLine(line, searched, previousLineLength, interpolate) {
  let currentLineLength = 0; // from XYZM data
  const coordinatess = line.getCoordinates();
  let previous = coordinatess[0];
  if (line.getLayout() !== GeometryLayout.XYZM) {
    console.error('invalid', line);
    throw new Error('findClosestPointInLine works only with XYZM lines');
  }

  /** @type {ClosestPoint} */
  const best = {
    distanceFromStart: 0,
    distanceFromSearched: Number.POSITIVE_INFINITY,
    coordinates: coordinatess[0],
  };

  for (let i = 0; i < coordinatess.length; ++i) {
    let coordinates = coordinatess[i];
    const segmentLength = coordinates[3] - previous[3];
    console.assert(Number.isFinite(segmentLength) && segmentLength >= 0);
    currentLineLength += segmentLength;
    const originalCoordinates = coordinates;

    let distanceFromStart = currentLineLength;
    if (interpolate && i > 0 && segmentLength > 0) {
      const newCoordinates = closestOnSegment(searched, [previous, coordinates]);
      // FakeDistance is accurate for local projections in meters (like EPSG:2056)
      // but not for mercator, because the distances between coordinates on the map
      // depends on the latitude.
      // Since we compare coordinates close to each other (at same latitude), the ratio of
      // distances can be considered accurate with mercator.
      // So, to avoid reprojecting our coordinates and use great circle formulas,
      // we compute euclidian distances and use their ratio to get the interpolated (accurate) distance.
      const fakeD1 = fakeDistance(previous, newCoordinates);
      const fakeD2 = fakeDistance(newCoordinates, coordinates);
      const estimatedMDistanceToEnd = segmentLength * fakeD2 / (fakeD1 + fakeD2);
      distanceFromStart = currentLineLength - estimatedMDistanceToEnd;
      coordinates = newCoordinates;
    }
    const distanceFromSearched = fakeDistance(searched, coordinates);
    if (distanceFromSearched < best.distanceFromSearched) {
      best.distanceFromSearched = distanceFromSearched;
      best.coordinates = coordinates;
      best.distanceFromStart = previousLineLength + distanceFromStart;
    }
    previous = originalCoordinates;
  }
  best.fullLength = previousLineLength + currentLineLength;
  return best;
}


/**
 * @param {Array<import("ol/geom/LineString").default>} lines
 * @param {import("ol/coordinate").Coordinate} searched
 * @param {ClosestLinesOptions} options
 * @return {ClosestPoint}
 */
export function findClosestPointInLines(lines, searched, options) {
  const {tolerance, interpolate} = options;
  const bests = [];
  let previousDistance = 0;
  for (const line of lines) {
    const best = findClosestPointInLine(line, searched, previousDistance, interpolate);
    bests.push(best);
    if (best.distanceFromSearched <= tolerance) {
      return best;
    }
    console.assert(best.fullLength !== undefined);
    previousDistance = best.fullLength;
  }
  bests.sort((a, b) => a.distanceFromSearched - b.distanceFromSearched);
  return bests[0];
}
