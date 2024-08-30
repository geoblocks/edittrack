export {default as UnsnappedDensifier} from './UnsnappedDensifier';
export {default as SnappedDensifier} from './SnappedDensifier';

import type Feature from 'ol/Feature.js';
import type LineString from 'ol/geom/LineString.js';

/**
 * A Densifier is an object that can modify the geometry of a segment by modifying its coordinates.
 * It takes a segment as input, and modifies it in place.
 *
 * It is called between the router and the profiler.
 *
 * The densification process is used:
 * - when a segment is added to the line
 * - when a segment is modified
 *
 * However, the densification is not applied when a feature is restored, as no modifications are
 * expected.
 */
export interface Densifier {
  densify(segment: Feature<LineString>): void;
}
