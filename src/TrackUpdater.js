/**
 * @typedef TrackData
 * @type {import("./TrackData.js").default}
 */


class TrackUpdater {

  /**
   * @param {Object} options
   * @property {TrackData} trackData
   * @property {geoblocks.Router} router
   * @property {geoblocks.Profiler} [profiler]
   */
  constructor(options) {
    /**
     * @type {TrackData}
     */
    this.trackData_ = options.trackData;

    /**
     * @type {geoblocks.Profiler|undefined}
     */
    this.profiler_ = options.profiler;

    /**
     * @type {geoblocks.Router}
     */
    this.router_ = options.router;
  }


  /**
   * @private
   * @param {ol.Feature} segment
   * @param {ol.Feature} pointFrom
   * @param {ol.Feature} pointTo
   */
  updateStraightLineSegmentGeometry_(segment, pointFrom, pointTo) {
    console.assert(!segment.get('snapped'));
    /** @type {ol.geom.LineString} */(segment.getGeometry()).setCoordinates([
      /** @type {ol.geom.Point} */(pointFrom.getGeometry()).getCoordinates(),
      /** @type {ol.geom.Point} */(pointTo.getGeometry()).getCoordinates()
    ]);
  }

  /**
   * @param {ol.Feature} modifiedControlPoint
   * @return {Promise}
   */
  computeAdjacentSegmentsProfile(modifiedControlPoint) {
    const promises = [];
    if (modifiedControlPoint && this.profiler_) {
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
   * @param {ol.Feature} modifiedControlPoint
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
   * @param {ol.Feature} modifiedControlPoint
   * @return {Promise}
   */
  updateAdjacentSegmentsGeometries(modifiedControlPoint) {
    const routedSegments = [];
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
