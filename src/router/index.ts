export {default as OSMRouter} from './OSRMRouter.ts';
export {default as GraphHopper} from './GraphHopper.ts';

import type Feature from 'ol/Feature.js';
import type LineString from 'ol/geom/LineString.js';
import type Point from 'ol/geom/Point.js';

export interface Router {
  snapSegment(segment: Feature<LineString>, pointFrom: Feature<Point>, pointTo: Feature<Point>): Promise<any>;
}
