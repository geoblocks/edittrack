import Feature from 'ol/Feature';

export interface Router {
  snapSegment(segment: Feature, pointFrom: Feature, pointTo: Feature): Promise<any>;
}
