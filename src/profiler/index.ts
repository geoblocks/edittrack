export {default as ExtractFromSegmentProfiler} from './ExtractFromSegment';
export {default as SwisstopoProfiler} from './SwisstopoProfiler';
export {default as FallbackProfiler} from './Fallback';

import type Feature from 'ol/Feature.js';
import type LineString from 'ol/geom/LineString.js';

export interface Profiler {
  computeProfile(segment: Feature<LineString>): Promise<void>;
}
