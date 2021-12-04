import {distance, closestOnSegment} from 'ol/coordinate.js';

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
  let currentLineLength = 0; // Euclidian length (of the line :p)
  const coordinatess = line.getCoordinates();
  let previous = coordinatess[0];

  /** @type {ClosestPoint} */
  const best = {
    distanceFromStart: 0,
    distanceFromSearched: Number.POSITIVE_INFINITY,
    coordinates: coordinatess[0],
  };

  for (let i = 0; i < coordinatess.length; ++i) {
    let coordinates = coordinatess[i];
    const segmentLength = distance(coordinates, previous);
    currentLineLength += segmentLength;
    const originalCoordinates = coordinates;

    let distanceFromStart = currentLineLength;
    if (interpolate && i > 0) {
      const newCoordinates = closestOnSegment(searched, [previous, coordinates]);
      distanceFromStart = currentLineLength - distance(coordinates, newCoordinates);
      coordinates = newCoordinates;
    }
    const distanceFromSearched = distance(searched, coordinates);
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
