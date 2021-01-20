import {distance} from 'ol/coordinate.js';

export default class ExtractFromSegment {

  /**
   * @param {import("ol/Feature").default} segment
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
          const coordinate = coordinates[i];
          profile.push({
            alts: {
              COMB: coordinate[2]
            },
            dist: accDistance,
            easting: coordinate[0],
            northing: coordinate[1]
          });
          const prevCoordinate = coordinates[i - 1];
          if (prevCoordinate) {
            accDistance += distance(prevCoordinate, coordinate);
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
