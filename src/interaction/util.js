import {clamp, lerp} from 'ol/math.js';
/** @typedef {import('ol/geom/LineString').default} LineString */

/**
 * @param {Function} fn
 * @param {number} [delay]
 */
export function debounce(fn, delay = 0) {
  let id;
  return (...args) => {
    if (id !== undefined) {
      clearTimeout(id);
    }
    id = setTimeout(() => {
      fn(...args);
      id = undefined;
    }, delay);
  };
}

/**
 * @param {import("ol/coordinate").Coordinate} a
 * @param {import("ol/coordinate").Coordinate} b
 * @param {number} t amount
 * @return {import("ol/coordinate").Coordinate} the linearly interpolated coordinates
 */
export function lerpCoordinates(a, b, t) {
  return [
    lerp(a[0], b[0], t),
    lerp(a[1], b[1], t)
  ];
}

/**
 * @param {import("ol/coordinate").Coordinate} a
 * @param {import("ol/coordinate").Coordinate} b
 * @return {number} the scalar product of the coordinates
 */
export function scalarProduct(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

/**
 * @param {import("ol/coordinate").Coordinate} a
 * @param {import("ol/coordinate").Coordinate} b
 * @return {import("ol/coordinate").Coordinate}
 */
export function substractCoordinates(a, b) {
  return [
    a[0] - b[0],
    a[1] - b[1]
  ];
}


// https://math.stackexchange.com/questions/2193720/find-a-point-on-a-line-segment-which-is-the-closest-to-other-point-not-on-the-li
/**
 * Find the closest point to a point P on the segment [A, B].
 * @param {import("ol/coordinate").Coordinate} a
 * @param {import("ol/coordinate").Coordinate} b
 * @param {import("ol/coordinate").Coordinate} p
 * @return {number} the distance t on the [A, B] segment normalized between [0, 1].
 */
export function closestPointOnASegment(a, b, p) {
  const u = substractCoordinates(p, a);
  const v = substractCoordinates(b, a);
  const t = scalarProduct(u, v) / scalarProduct(v, v);
  return clamp(t, 0, 1);
}


/**
 * @param {import("ol/Feature").default<LineString>} straightSegment
 * @param {number} first
 * @param {number} last
 */
export function setZ(straightSegment, first, last) {
  const geometry = straightSegment.getGeometry();
  const coordinates = geometry.getCoordinates();
  console.assert(coordinates.length === 2);
  if (geometry.getLayout() === 'XY') {
    coordinates[0].push(first);
    coordinates[1].push(last);
  } else {
    coordinates[0][2] = first;
    coordinates[1][2] = last;
  }
  geometry.setCoordinates(coordinates);
  console.assert(geometry.getLayout() === 'XYZ');
}
