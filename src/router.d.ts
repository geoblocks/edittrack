declare namespace geoblocks {
  interface Router {
    snapSegment(segment: ol.Feature, pointFrom: ol.Feature, pointTo: ol.Feature): Promise<any>;
  }
}
