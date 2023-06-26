import {toLonLat} from 'ol/proj.js';
import PolyLineXYZMFormat from './PolylineXYZM.ts';
import {distance} from 'ol/coordinate.js';

/** @typedef {import('ol/geom/LineString').default} LineString */
/** @typedef {import('ol/geom/Point').default} Point */

/**
 * @typedef {Object} Options
 * @property {import("ol/proj").ProjectionLike} mapProjection
 * @property {string} url
 * @property {number} [maxRoutingDistance=Infinity]
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
    this.maxRoutingDistance_ = options.maxRoutingDistance !== undefined ? options.maxRoutingDistance : Infinity;
  }

  /**
   * @param {import("ol/Feature").default<LineString>} segment
   * @param {import("ol/Feature").default<Point>} pointFrom
   * @param {import("ol/Feature").default<Point>} pointTo
   * @return {Promise<boolean>}
   */
  async snapSegment(segment, pointFrom, pointTo) {
    const pointFromGeometry = pointFrom.getGeometry();
    const pointToGeometry = pointTo.getGeometry();
    const pointFromCoordinates = pointFromGeometry.getCoordinates();
    const pointToCoordinates = pointToGeometry.getCoordinates();

    const coordinates = [pointFromCoordinates, pointToCoordinates].map(cc => toLonLat(cc.slice(0, 2), this.mapProjection_));
    const coordinateString = coordinates.map(c => `point=${c.reverse().join(',')}`).join('&');

    const response = await fetch(`${this.url_}&${coordinateString}`);
    const json = await response.json();
    if (json.paths) {
      const path = json.paths[0];
      const resultGeometry = /** @type {import("ol/geom/LineString").default} */ (this.polylineFormat_.readGeometry(path.points, {
        featureProjection: this.mapProjection_
      }));
      const resultCoordinates = resultGeometry.getCoordinates();
      const resultFromCoordinates = resultCoordinates[0].slice(0, 2);
      const resultToCoordinates = resultCoordinates[resultCoordinates.length - 1].slice(0, 2);

      pointFrom.set('snapped', distance(pointFromCoordinates, resultFromCoordinates) < this.maxRoutingDistance_);
      pointTo.set('snapped', distance(pointToCoordinates, resultToCoordinates) < this.maxRoutingDistance_);
      const snapped = pointFrom.get('snapped') && pointTo.get('snapped');

      if (snapped) {
        segment.getGeometry().setCoordinates(resultCoordinates, 'XYZM');
        pointFromGeometry.setCoordinates(resultFromCoordinates);
        pointToGeometry.setCoordinates(resultToCoordinates);
      } else {
        segment.getGeometry().setCoordinates([pointFromCoordinates, pointToCoordinates], 'XY');
      }
      segment.set('snapped', snapped);

      return snapped;
    }
    return false;
  }
}
