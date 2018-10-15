declare namespace geoblocks {
  interface Profiler {
    computeProfile(segment: ol.Feature): Promise<any>;
  }
}
