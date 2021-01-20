import Feature from 'ol/Feature';

export interface Profiler {
    computeProfile(segment: Feature): Promise<void>;
}
