export {default as GraphHopperSnapper} from './GraphHopperSnapper';

import type Feature from 'ol/Feature.js';
import type Point from 'ol/geom/Point.js';

export interface Snapper {
  snapPoint(point: Feature<Point>): Promise<any>;
}
