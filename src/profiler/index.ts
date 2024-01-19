export {default as ExtractFromSegmentProfiler} from './ExtractFromSegment.ts';
export {default as SwisstopoProfiler} from './SwisstopoProfiler.ts';
export {default as FallbackProfiler} from './Fallback.ts';

import type Feature from 'ol/Feature.js';
import type LineString from 'ol/geom/LineString.js';

export interface Profiler {
    computeProfile(segment: Feature<LineString>): Promise<void>;
}
