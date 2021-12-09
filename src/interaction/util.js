/** @typedef {import('ol/geom/LineString').default} LineString */

/**
 * @param {Function} fn
 * @param {number} [delay]
 * @return {Function}
 */
export function debounce(fn, delay = 0) {
  /**
   * @type {number}
   */
  let id;
  // @ts-ignore
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
