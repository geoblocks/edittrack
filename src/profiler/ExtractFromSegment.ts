import { getDistance } from 'ol/sphere';
import type Feature from 'ol/Feature.js';
import type LineString from 'ol/geom/LineString.js';
import { ProjectionLike } from 'ol/proj';
import type { Profiler } from './index';

type ExtractFromSegmentProfilerOptions = {
  projection: ProjectionLike;
};
export default class ExtractFromSegment implements Profiler {

  private projection: ProjectionLike;

  constructor(options: ExtractFromSegmentProfilerOptions) {
    this.projection = options.projection;
  }

  computeProfile(
    segment: Feature<LineString>,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const geometry = segment.getGeometry();
      if (geometry.getLayout() === 'XYZM') {
        segment.set('profile', geometry.getCoordinates());
        resolve();
      } else if (geometry.getLayout() === 'XYZ') {
        const profile: number[][] = [];
        let accDistance = 0;
        const geometry_4326 = geometry
          .clone()
          .transform(this.projection, 'EPSG:4326');

        const coordinates_4326 = geometry_4326.getCoordinates();

        for (let i = 0, ii = coordinates_4326.length; i < ii; i++) {
          const coos = coordinates_4326[i];
          const m = i === 0 ? 0 : getDistance(coordinates_4326[i - 1], coordinates_4326[i]);
          accDistance += m;
          profile.push([coos[0], coos[1], coos[2], accDistance]);
        }
        segment.set('profile', profile);
        resolve();
      } else {
        reject();
      }
    });
  }
}
