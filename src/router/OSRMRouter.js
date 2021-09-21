import {fromLonLat, toLonLat} from 'ol/proj.js';

/**
 * @typedef {import("ol/proj").ProjectionLike} ProjectionLike
 * @typedef {import('ol/geom/LineString').default} LineString
 * @typedef {import('ol/geom/Point').default} Point
 */


/**
 * @typedef {Object} Options
 * @property {ProjectionLike} mapProjection
 * @property {string} url The URL profile prefix to use, see *_PROFILE_URL.
 * @property {string} extraParams Parameters like access token.
 * @property {number} radius
 */


/**
 * @const {string}
 */
export const OSM_CH_ROUTED_FOOT_PROFILE_URL = 'https://routing.osm.ch/routed-foot/route/v1/driving';

/**
 * @const {string}
 */
export const OSRM_DEFAULT_PROFILE_URL = 'https://router.project-osrm.org/route/v1/driving';


export default class OSRMRouter {

  /**
   * @param {Options} options
   */
  constructor(options) {
    /**
     * @private
     * @type {string}
     */
    this.url_ = options.url;

    /**
     * @private
     * @type {number}
     */
    this.radius_ = options.radius || 10000;

    /**
     * @private
     * @type {ProjectionLike}
     */
    this.mapProjection_ = options.mapProjection;

    /**
     * @private
     * @type {string}
     */
    this.extraParams_ = options.extraParams;
  }

  /**
   * @param {import('ol/Feature').default<LineString>} segment
   * @param {import('ol/Feature').default<Point>} pointFrom
   * @param {import('ol/Feature').default<Point>} pointTo
   * @return {Promise<void>}
   */
  snapSegment(segment, pointFrom, pointTo) {
    const pointFromGeometry = /** @type {Point} */ (pointFrom.getGeometry());
    const pointToGeometry = /** @type {Point} */ (pointTo.getGeometry());
    const coordinates = [pointFromGeometry.getCoordinates(), pointToGeometry.getCoordinates()].map(cc => toLonLat(cc.slice(0, 2), this.mapProjection_));

    // [ [a,b] , [c,d] ] -> 'a,b;c,d'
    const coordinateString = coordinates.map(c => c.join(',')).join(';');
    const radiuses = coordinates.map(() => this.radius_).join(';');

    let url = `${this.url_}/${coordinateString}?radiuses=${radiuses}&geometries=geojson`;
    if (this.extraParams_) {
      url += `&${this.extraParams_}`;
    }
    return fetch(url)
      .then(response => response.json())
      .then((jsonResponse) => {
        console.assert(jsonResponse.code === 'Ok');
        console.assert(jsonResponse.routes.length === 1);
        const route = jsonResponse.routes[0];
        const segmentCoordinates = /** @type {import('ol/coordinate').Coordinate[]} */
        (route.geometry.coordinates).map(cc => fromLonLat(cc, this.mapProjection_));
        const segmentGeometry = segment.getGeometry();

        segment.setProperties({
          snapped: true
        });

        segmentGeometry.setCoordinates(segmentCoordinates);

        pointFromGeometry.setCoordinates(segmentCoordinates[0]);
        pointToGeometry.setCoordinates(segmentCoordinates[segmentCoordinates.length - 1]);
        pointFrom.set('snapped', true);
        pointTo.set('snapped', true);
      });
  }

  /**
   * @param {string} url
   */
  setUrl(url) {
    this.url_ = url;
  }
}
