import GeoJSONFormat from 'ol/format/GeoJSON.js';

// @ts-ignore
import EPSG_2056 from '@geoblocks/proj/src/EPSG_2056.js';


// https://api3.geo.admin.ch/services/sdiservices.html#profile

/**
 * @typedef {Object} Options
 * @property {import("ol/proj").ProjectionLike} projection
 */

/**
 * @typedef {Object} SwisstopoProfileItem
 * @property {number} dist
 * @property {{COMB: number}} alts
 * @property {number} easting
 * @property {number} northing
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
   * @param {import("ol/Feature").default} segment in EPSG:2056 projection
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
        /**
         * @param {SwisstopoProfileItem} r
         * @return {[number, number, number, number]}
         */
        const toXYZM = r => [r.easting, r.northing, r.alts.COMB, r.dist];
        segment.set('profile', profile.map(toXYZM));
      });
  }
}
