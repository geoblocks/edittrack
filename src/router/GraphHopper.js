import {toLonLat} from 'ol/proj.js';
import PolyLineFormat from 'ol/format/Polyline.js';

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
     * @type {PolyLineFormat}
     */
    this.polylineFormat_ = new PolyLineFormat({
      geometryLayout: 'XYZ'
    });

  }

  /**
   * @param {import("ol/Feature").default} segment
   * @param {import("ol/Feature").default} pointFrom
   * @param {import("ol/Feature").default} pointTo
   * @return {Promise<void>}
   */
  snapSegment(segment, pointFrom, pointTo) {
    const pointFromGeometry = /** @type {import("ol/geom/Point").default} */ (pointFrom.getGeometry());
    const pointToGeometry = /** @type {import("ol/geom/Point").default} */ (pointTo.getGeometry());
    const pointFromCoordinates = pointFromGeometry.getCoordinates();
    const pointToCoordinates = pointToGeometry.getCoordinates();

    const coordinates = [pointFromCoordinates, pointToCoordinates].map(coordinates => toLonLat(coordinates.slice(0, 2), this.mapProjection_));
    const coordinateString = coordinates.map(c => `point=${c.reverse().join(',')}`).join('&');

    return fetch(`${this.url_}&${coordinateString}`)
      .then(response => response.json())
      .then(json => {
        if (json.paths) {
          const path = json.paths[0];
          const resultGeometry = this.polylineFormat_.readGeometry(path.points, {
            featureProjection: this.mapProjection_
          });
          const resultCoordinates = fixupElevation(resultGeometry.getCoordinates());
          const segmentGeometry = /** @type {import("ol/geom/LineString").default} */ (segment.getGeometry());
          segmentGeometry.setCoordinates(resultCoordinates, 'XYZ');

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


/**
 * @param {import("ol/coordinate").Coordinate} coordinates
 * @return {import("ol/coordinate").Coordinate}
 */
function fixupElevation(coordinates) {
  for (let i = 0, ii = coordinates.length; i < ii; i++) {
    const coordinate = coordinates[i];
    coordinate[2] *= 1000;
  }
  return coordinates;
}
