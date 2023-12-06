import {distance} from 'ol/coordinate.js';
import type Feature from 'ol/Feature.js';
import type LineString from 'ol/geom/LineString.js';

export default class ExtractFromSegment implements geoblocks.Profiler {

  computeProfile(segment: Feature<LineString>): Promise<void> {

    return new Promise((resolve, reject) => {
      const geometry = segment.getGeometry();
      if (geometry.getLayout() === 'XYZM') {
        segment.set('profile', geometry.getCoordinates());
        resolve();
      } else if (geometry.getLayout() === 'XYZ') {
        const profile: number[][] = [];
        let accDistance = 0;
        const coordinates = geometry.getCoordinates();
        for (let i = 0, ii = coordinates.length; i < ii; i++) {
          const coos = coordinates[i];
          // FIXME: this only works with projections in meters
          // and preserving the distances (thus not with mercator)
          const m = i === 0 ? 0 : distance(coordinates[i - 1], coos);
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
