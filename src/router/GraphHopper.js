import {toLonLat} from 'ol/proj.js';
import PolyLineXYZMFormat from './PolylineXYZM.ts';
import RouterBase from './RouterBase.ts';

/** @typedef {import('ol/geom/LineString').default} LineString */
/** @typedef {import('ol/geom/Point').default} Point */

/**
 * @typedef {Object} Options
 * @property {import("ol/Map").default} map
 * @property {string} url
 * @property {number} [maxRoutingTolerance=Infinity]
 */


export default class GraphHopper extends RouterBase {

  /**
   * @param {Options} options
   */
  constructor(options) {
    super(options);

    /**
     * @private
     * @type {string}
     */
    this.url_ = options.url;

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
   * @return {Promise<boolean>}
   */
  async snapSegment(segment, pointFrom, pointTo) {
    const mapProjection = this.map.getView().getProjection();
    const pointFromGeometry = pointFrom.getGeometry();
    const pointToGeometry = pointTo.getGeometry();
    const pointFromCoordinates = pointFromGeometry.getCoordinates();
    const pointToCoordinates = pointToGeometry.getCoordinates();

    const coordinates = [pointFromCoordinates, pointToCoordinates].map(cc => toLonLat(cc.slice(0, 2), mapProjection));
    const coordinateString = coordinates.map(c => `point=${c.reverse().join(',')}`).join('&');

    const response = await fetch(`${this.url_}&${coordinateString}`);
    const json = await response.json();
    if (json.paths) {
      const path = json.paths[0];
      const resultGeometry = /** @type {import("ol/geom/LineString").default} */ (this.polylineFormat_.readGeometry(path.points, {
        featureProjection: mapProjection
      }));
      const resultCoordinates = resultGeometry.getCoordinates();
      const resultFromCoordinates = resultCoordinates[0].slice(0, 2);
      const resultToCoordinates = resultCoordinates[resultCoordinates.length - 1].slice(0, 2);

      pointFrom.set('snapped', this.isInTolerance(pointFromCoordinates, resultFromCoordinates));
      pointTo.set('snapped', this.isInTolerance(pointToCoordinates, resultToCoordinates));
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
