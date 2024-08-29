export {default as UnsnappedDensifier} from './UnsnappedDensifier';

import type Feature from 'ol/Feature.js';
import type LineString from 'ol/geom/LineString.js';

export interface Densifier {
  densify(segment: Feature<LineString>): void;
}
