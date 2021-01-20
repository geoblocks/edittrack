import GeoJSONFormat from 'ol/format/GeoJSON.js';
import EPSG_2056 from '@geoblocks/proj/src/EPSG_2056.js';

// https://api3.geo.admin.ch/services/sdiservices.html#profile

/**
 * @typedef {Object} Options
 * @property {import("ol/proj").ProjectionLike} projection
 */


/**
 * @implements {geoblocks.Profiler}
 */
export default class SwisstopoProfiler {

  /**
   * @param {Options} options
   */
  constructor(options) {
    /**
     * @private
     * @type {string}
     */
    this.url_ = 'https://api3.geo.admin.ch/rest/services/profile.json';

    /**
     * @private
     * @type {GeoJSONFormat}
     */
    this.geojsonFormat_ = new GeoJSONFormat({
      dataProjection: EPSG_2056,
      featureProjection: options.projection
    });
  }

  /**
   * @param {import("ol/Feature").default} segment
   * @return {Promise<void>}
   */
  computeProfile(segment) {
    // TODO: round to coordinate to meter precision
    const geom = this.geojsonFormat_.writeGeometry(segment.getGeometry());

    const request = fetch(this.url_, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `geom=${geom}&sr=2056&offset=1`
    });
    return request
      .then(response => response.json())
      .then((profile) => {
        segment.set('profile', profile);
      });
  }
}
