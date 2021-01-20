import Feature from 'ol/Feature';
import LineString from 'ol/geom/LineString';

declare namespace geoblocks {
  interface Profiler {
    computeProfile(segment: Feature<LineString>): Promise<any>;
  }
}
