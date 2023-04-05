/**
 * @typedef {import("./TrackData.js").default} TrackData
 * @typedef {import('ol/geom/Point').default} Point
 * @typedef {import('ol/geom/LineString').default} LineString
 * @typedef {import('ol/geom/Geometry').default} Geometry
 */


/**
 * @typedef {Object} Options
 * @property {TrackData} trackData
 * @property {geoblocks.Router} router
 * @property {geoblocks.Profiler} profiler
 */

/**
 * Drive the chosen router and profiler to update the segment geometries.
 */
class TrackUpdater {

  /**
   * @param {Options} options
   */
  constructor(options) {
    /**
     * @type {TrackData}
     */
    this.trackData_ = options.trackData;

    /**
     * @type {geoblocks.Profiler}
     */
    this.profiler_ = options.profiler;

    /**
     * @type {geoblocks.Router}
     */
    this.router_ = options.router;
  }


  /**
   * @private
   * @param {import('ol/Feature').default<LineString>} segment
   * @param {import('ol/Feature').default<Point>} pointFrom
   * @param {import('ol/Feature').default<Point>} pointTo
   */
  updateStraightLineSegmentGeometry_(segment, pointFrom, pointTo) {
    console.assert(!segment.get('snapped'));
    segment.getGeometry().setCoordinates([
      pointFrom.getGeometry().getCoordinates(),
      pointTo.getGeometry().getCoordinates()
    ]);
  }

  /**
   * @param {import('ol/Feature').default<Point>} modifiedControlPoint
   * @return {Promise<any>}
   */
  computeAdjacentSegmentsProfile(modifiedControlPoint) {
    const promises = [];
    if (modifiedControlPoint) {
      const {before, after} = this.trackData_.getAdjacentSegments(modifiedControlPoint);
      if (before) {
        promises.push(this.profiler_.computeProfile(before));
      }
      if (after) {
        promises.push(this.profiler_.computeProfile(after));
      }
    }
    return Promise.all(promises);
  }

  /**
   * @param {import('ol/Feature').default<Point>} modifiedControlPoint
   * @param {string} subtype
   */
  changeAdjacentSegmentsStyling(modifiedControlPoint, subtype) {
    if (modifiedControlPoint) {
      const {before, after} = this.trackData_.getAdjacentSegments(modifiedControlPoint);
      if (before) {
        before.set('subtype', subtype);
      }
      if (after) {
        after.set('subtype', subtype);
      }
    }
  }

  /**
   * @param {import('ol/Feature').default<Point>} modifiedControlPoint
   * @return {Promise<any>}
   */
  updateAdjacentSegmentsGeometries(modifiedControlPoint) {
    const routedSegments = [];
    /** @type {function[]} */
    const straightSegments = [];

    if (modifiedControlPoint) {
      const {before, after} = this.trackData_.getAdjacentSegments(modifiedControlPoint);
      if (before) {
        const pointFrom = this.trackData_.getControlPointBefore(modifiedControlPoint);
        if (before.get('snapped')) {
          routedSegments.push(() => this.router_.snapSegment(before, pointFrom, modifiedControlPoint));
        } else {
          straightSegments.push(() => this.updateStraightLineSegmentGeometry_(before, pointFrom, modifiedControlPoint));
        }
      }
      if (after) {
        const pointTo = this.trackData_.getControlPointAfter(modifiedControlPoint);
        if (after.get('snapped')) {
          routedSegments.push(() => this.router_.snapSegment(after, modifiedControlPoint, pointTo));
        } else {
          straightSegments.push(() => this.updateStraightLineSegmentGeometry_(after, modifiedControlPoint, pointTo));
        }
      }
    }
    return Promise.all(routedSegments.map(fn => fn())).then(() => {
      straightSegments.forEach(fn => fn());
    });
  }
}

export default TrackUpdater;
