import {distance} from 'ol/coordinate.js';
import type Feature from 'ol/Feature.js';
import type LineString from 'ol/geom/LineString.js';
import type {Profiler} from './index';

export default class ExtractFromSegment implements Profiler {

  computeProfile(segment: Feature<LineString>): Promise<void> {

    return new Promise((resolve, reject) => {
      const geometry = segment.getGeometry();
      // check if there is an undefined altitude in the coordinates
      const coordinates = geometry.getCoordinates();
      for (let i = 0, ii = coordinates.length; i < ii; i++) {
        if (coordinates[i][2] === undefined) {
          console.error('ExtractFromSegment undefined altitude', coordinates[i]);
        }
      }
      if (geometry.getLayout() === 'XYZM') {
        segment.set('profile', geometry.getCoordinates());
        resolve();
      } else if (geometry.getLayout() === 'XYZ') {
        const profile: number[][] = [];
        let accDistance = 0;
        const coordinates = geometry.getCoordinates();
        for (let i = 0, ii = coordinates.length; i < ii; i++) {
          const coos = coordinates[i];
          if (coordinates[i][2] === undefined) {
            console.error('ExtractFromSegment XYZ layout undefined altitude', coordinates[i]);
          }
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
