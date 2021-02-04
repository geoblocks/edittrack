import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';

export interface Profiler {
    computeProfile(segment: Feature<LineString>): Promise<void>;
}
