import {distance} from 'ol/coordinate.js';
/** @typedef {import('ol/geom/LineString').default} LineString */

export default class ExtractFromSegment {

  /**
   * @param {import("ol/Feature").default<LineString>} segment
   * @return {Promise<void>}
   */
  computeProfile(segment) {

    return new Promise((resolve, reject) => {
      const geometry = segment.getGeometry();
      if (geometry.getLayout() === 'XYZ') {
        const profile = [];
        let accDistance = 0;
        const coordinates = geometry.getCoordinates();
        for (let i = 0, ii = coordinates.length; i < ii; i++) {
          const coos = coordinates[i];
          profile.push([coos[0], coos[1], coos[2], accDistance]);
          const prevCoos = coordinates[i - 1];
          if (prevCoos) {
            accDistance += distance(prevCoos, coos);
          }
        }
        segment.set('profile', profile);
        resolve();
      } else {
        reject();
      }
    });

  }
}
