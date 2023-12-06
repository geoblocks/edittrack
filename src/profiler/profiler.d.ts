import type Feature from 'ol/Feature.js';
import type LineString from 'ol/geom/LineString.js';

export interface Profiler {
    computeProfile(segment: Feature<LineString>): Promise<void>;
}
