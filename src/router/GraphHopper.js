import {toLonLat} from 'ol/proj.js';
import PolyLineXYZMFormat from './PolylineXYZM.js';
import GeometryLayout from 'ol/geom/GeometryLayout';

/** @typedef {import('ol/geom/LineString').default} LineString */
/** @typedef {import('ol/geom/Point').default} Point */

/**
 * @typedef {Object} Options
 * @property {import("ol/proj").ProjectionLike} mapProjection
 * @property {string} url
 */


export default class GraphHopper {

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
     * @type {import("ol/proj").ProjectionLike}
     */
    this.mapProjection_ = options.mapProjection;

    /**
     * @private
     * @type {PolyLineXYZMFormat}
     */
    this.polylineFormat_ = new PolyLineXYZMFormat();
  }

  /**
   * @param {import("ol/Feature").default<LineString>} segment
   * @param {import("ol/Feature").default<Point>} pointFrom
   * @param {import("ol/Feature").default<Point>} pointTo
   * @return {Promise<void>}
   */
  snapSegment(segment, pointFrom, pointTo) {
    const pointFromGeometry = /** @type {import("ol/geom/Point").default} */ (pointFrom.getGeometry());
    const pointToGeometry = /** @type {import("ol/geom/Point").default} */ (pointTo.getGeometry());
    const pointFromCoordinates = pointFromGeometry.getCoordinates();
    const pointToCoordinates = pointToGeometry.getCoordinates();

    const coordinates = [pointFromCoordinates, pointToCoordinates].map(cc => toLonLat(cc.slice(0, 2), this.mapProjection_));
    const coordinateString = coordinates.map(c => `point=${c.reverse().join(',')}`).join('&');

    return fetch(`${this.url_}&${coordinateString}`)
      .then(response => response.json())
      .then(json => {
        if (json.paths) {
          const path = json.paths[0];
          const resultGeometry = /** @type {import("ol/geom/LineString").default} */ (this.polylineFormat_.readGeometry(path.points, {
            featureProjection: this.mapProjection_
          }));
          const resultCoordinates = resultGeometry.getCoordinates();
          const segmentGeometry = /** @type {import("ol/geom/LineString").default} */ (segment.getGeometry());
          segmentGeometry.setCoordinates(resultCoordinates, GeometryLayout.XYZM);

          segment.setProperties({
            snapped: true
          });
          pointFromGeometry.setCoordinates(resultCoordinates[0].slice(0, 2));
          pointToGeometry.setCoordinates(resultCoordinates[resultCoordinates.length - 1].slice(0, 2));
          pointFrom.set('snapped', true);
          pointTo.set('snapped', true);
        }
      });
  }
}
