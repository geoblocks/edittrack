import {toLonLat} from 'ol/proj.js';
import PolyLineXYZMFormat from './PolylineXYZM.js';
import {distance} from 'ol/coordinate.js';

/** @typedef {import('ol/geom/LineString').default} LineString */
/** @typedef {import('ol/geom/Point').default} Point */

/**
 * @typedef {Object} Options
 * @property {import("ol/proj").ProjectionLike} mapProjection
 * @property {string} url
 * @property {number} [maxSnappingDistance=Infinity]
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

    /**
     * @private
     * @type {number}
     */
    this.maxSnappingDistance_ = options.maxSnappingDistance === undefined ? Infinity : options.maxSnappingDistance;
  }

  /**
   * @param {import("ol/Feature").default<LineString>} segment
   * @param {import("ol/Feature").default<Point>} pointFrom
   * @param {import("ol/Feature").default<Point>} pointTo
   * @return {Promise<void>}
   */
  snapSegment(segment, pointFrom, pointTo) {
    const pointFromGeometry = pointFrom.getGeometry();
    const pointToGeometry = pointTo.getGeometry();
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
          const resultFromCoordinates = resultCoordinates[0].slice(0, 2);
          const resultToCoordinates = resultCoordinates[resultCoordinates.length - 1].slice(0, 2);
          const segmentGeometry = segment.getGeometry();

          if (distance(pointFromCoordinates, resultFromCoordinates) < this.maxSnappingDistance_ && distance(pointToCoordinates, resultToCoordinates) < this.maxSnappingDistance_) {
            segmentGeometry.setCoordinates(resultCoordinates, 'XYZM');
            segment.set('snapped', true);
            pointFromGeometry.setCoordinates(resultFromCoordinates);
            pointToGeometry.setCoordinates(resultToCoordinates);
            pointFrom.set('snapped', true);
            pointTo.set('snapped', true);
          } else {
            segmentGeometry.setCoordinates([pointFromCoordinates, pointToCoordinates], 'XY');
            segment.set('snapped', false);
            pointFrom.set('snapped', false);
            pointTo.set('snapped', false);
          }
        }
      });
  }
}
