import {equals} from 'ol/coordinate.js';
import Feature from 'ol/Feature.js';
import LineString from 'ol/geom/LineString.js';

/** @typedef {import('ol/geom/Point').default} Point */


export default class TrackData {

  constructor() {
    /**
     * The pieces of the track linestring.
     * @private
     * @type {Array<Feature<LineString>>}
     */
    this.segments_ = [];

    /**
     * The ends of the track linestring pieces.
     * @private
     * @type {Array<Feature<Point>>}
     */
    this.controlPoints_ = [];

    /**
     * Some POI points coming together with the line track.
     * @private
     * @type {Array<Feature<Point>>}
     */
    this.pois_ = [];
  }

  /**
   * @param {Array<Feature<Point|LineString>>} features
   */
  restoreFeatures(features) {
    this.clear();
    for (const feature of features) {
      const type = feature.get('type');
      if (type === 'segment') {
        console.assert(feature.getGeometry().getType() === 'LineString');
        this.segments_.push(/** @type {Feature<LineString>} */ (feature));
      } else if (type === 'controlPoint') {
        console.assert(feature.getGeometry().getType() === 'Point');
        this.controlPoints_.push(/** @type {Feature<Point>} */ (feature));
      } else if (type === 'POI') {
        console.assert(feature.getGeometry().getType() === 'Point');
        this.pois_.push(/** @type {Feature<Point>} */ (feature));
      }
    }
    this.segments_.sort(sortByIndex);
    this.controlPoints_.sort(sortByIndex);

    console.assert(this.controlPoints_.length === this.segments_.length + 1);
  }


  /**
   * @param {Feature<Point>} controlPoint
   * @return {{before: Feature<LineString>|undefined, after: Feature<LineString>|undefined}}
   */
  getAdjacentSegments(controlPoint) {
    let before = undefined;
    let after = undefined;
    const index = this.controlPoints_.indexOf(controlPoint);

    if (index >= 1) {
      before = this.segments_[index - 1];
    }
    if (index >= 0 && index < this.segments_.length) {
      after = this.segments_[index];
    }

    return {before, after};
  }

  /**
   * @param {Feature<Point>} controlPoint
   * @return {?Feature<Point>}
   */
  getControlPointBefore(controlPoint) {
    const index = this.controlPoints_.indexOf(controlPoint);
    if (index > 0) {
      return this.controlPoints_[index - 1];
    }
    return null;
  }

  /**
   * @param {Feature<Point>} controlPoint
   * @return {?Feature<Point>}
   */
  getControlPointAfter(controlPoint) {
    const index = this.controlPoints_.indexOf(controlPoint);
    if (index >= 0 && index < this.controlPoints_.length - 1) {
      return this.controlPoints_[index + 1];
    }
    return null;
  }

  /**
   * @return {Feature<Point>[]}
   */
  getPOIs() {
    return this.pois_;
  }

  /**
   * @return {Feature<Point>[]}
   */
  getControlPoints() {
    return this.controlPoints_;
  }

  /**
   * @return {Array<Feature<LineString>>}
   */
  getSegments() {
    return this.segments_;
  }

  /**
   * Return the whole track as one line string.
   * @return {LineString}
   */
  getLineString() {
    /**
     * @type {import('ol/coordinate').Coordinate[]}
     */
    const coordinates = [];
    for (const feature of this.segments_) {
      const segment = feature.getGeometry().getCoordinates();
      // remove the overlap between the last coordinate of a segment and
      // the first coordinate of the next one
      const overlap = coordinates.length > 0 && equals(segment[0], coordinates[coordinates.length - 1]);
      for (let i = overlap ? 1 : 0; i < coordinates.length; ++i) {
        coordinates.push(coordinates[i].slice(0, 3));
      }
    }
    console.assert(isXYZ(coordinates));
    return new LineString(coordinates);
  }

  /**
   * @param {Feature<Point>} point
   * @param {number} index
   * @return {Feature<LineString>|undefined}
   */
  insertControlPointAt(point, index) {
    let removed = undefined;
    point.set('type', 'controlPoint');
    console.assert(index >= 0 && index <= this.controlPoints_.length);
    // add new control point
    this.controlPoints_.splice(index, 0, point);

    // remove segment
    if (index > 0 && index < this.controlPoints_.length) {
      removed = this.segments_[index - 1];
      this.segments_.splice(index - 1, 1);
    }

    // index > 0
    const pointBefore = this.controlPoints_[index - 1];
    if (pointBefore) {
      // not the first control point
      const segmentBefore = createStraightSegment(pointBefore, point);
      segmentBefore.set('snapped', pointBefore.get('snapped'));
      this.segments_.splice(index - 1, 0, segmentBefore);
    }

    // index <= this.controlPoints_.length
    const pointAfter = this.controlPoints_[index + 1];
    if (pointAfter) {
      // not the last control point
      const segmentAfter = createStraightSegment(point, pointAfter);
      segmentAfter.set('snapped', pointAfter.get('snapped'));
      this.segments_.splice(index - 1, 0, segmentAfter);
    }

    // update indices property
    for (let i = index; i < this.controlPoints_.length; ++i) {
      this.controlPoints_[i].set('index', i);
    }
    return removed;
  }

  /**
   * Add a new control point at the end.
   * @param {Feature<Point>} point
   * @return {{pointFrom: Feature<Point>, pointTo: Feature<Point>, segment: Feature<LineString>|undefined}}
   */
  pushControlPoint(point) {
    this.insertControlPointAt(point, this.controlPoints_.length);
    const length = this.controlPoints_.length;

    if (length === 1) {
      // first control point
      point.set('subtype', 'first');
      return {pointFrom: point, pointTo: point, segment: undefined};
    }
    if (length >= 2) {
      const previous = this.controlPoints_[length - 2];
      // change previous point from 'last' to 'control' except if it's the 'first'
      if (length > 2) {
        previous.unset('subtype');
      }
      // last control point
      point.set('subtype', 'last');
      const {before, after} = this.getAdjacentSegments(point);
      console.assert(after === undefined);
      return {pointFrom: previous, pointTo: point, segment: before};
    }
    throw new Error('Internal error: incorrect length');
  }

  /**
   * Deletes the supplied point and all adjacent segments.
   * Creates a new segment if the deleted point had two neighbors.
   * Updates first/last subtype if needed.
   * @param {Feature<Point>} point Point to delete.
   * @return {{deleted: Array<Feature<Point|LineString>>, pointBefore: ?Feature<Point>, pointAfter: ?Feature<Point>, newSegment: ?Feature<LineString>}}
   */
  deleteControlPoint(point) {
    const deleteIndex = this.controlPoints_.indexOf(point);
    if (deleteIndex === -1) {
      return {
        deleted: [],
        pointBefore: null,
        pointAfter: null,
        newSegment: null
      };
    }

    const deletedFeatures = [];
    const pointBefore = this.getControlPointBefore(point);
    const pointAfter = this.getControlPointAfter(point);
    const {before, after} = this.getAdjacentSegments(point);

    // delete adjacent segments
    if (before) {
      const segmentBeforeIndex = this.segments_.indexOf(before);
      deletedFeatures.push(...this.segments_.splice(segmentBeforeIndex, 1));
    }
    if (after) {
      const segmentAfterIndex = this.segments_.indexOf(after);
      deletedFeatures.push(...this.segments_.splice(segmentAfterIndex, 1));
    }

    // create new segment if there is still a point before and after
    let newSegment = null;
    if (pointBefore && pointAfter) {
      newSegment = createStraightSegment(pointBefore, pointAfter);
      newSegment.set('snapped', point.get('snapped'));
      this.segments_.splice(deleteIndex - 1, 0, newSegment);
    }

    // deleted point was the first point, update new first point
    if (pointAfter && deleteIndex === 0) {
      pointAfter.set('subtype', 'first');
    }
    // deleted point was the last point, update new last point
    if (pointBefore && deleteIndex === this.controlPoints_.length - 1 && deleteIndex !== 1) {
      pointBefore.set('subtype', 'last');
    }

    // delete the point
    deletedFeatures.push(...this.controlPoints_.splice(deleteIndex, 1));

    // update indices property
    for (let i = deleteIndex; i < this.controlPoints_.length; ++i) {
      this.controlPoints_[i].set('index', i);
    }
    return {
      deleted: deletedFeatures,
      pointBefore: pointBefore,
      pointAfter: pointAfter,
      newSegment: newSegment
    };
  }

  /**
   * Remove the last control point.
   * @return {Array<Feature<Point|LineString>>}
   */
  deleteLastControlPoint() {
    const deletedFeatures = [];
    const point = this.controlPoints_.pop();
    if (point !== undefined) {
      //this.source_.removeFeature(point);
      const length = this.controlPoints_.length;
      const previous = this.controlPoints_[length - 1];
      // change previous point from 'last' to 'control' except if it's the 'first'
      if (length > 1) {
        previous.set('subtype', 'last');
      }
      deletedFeatures.push(point);
    }

    const segment = this.segments_.pop();
    if (segment !== undefined) {
      deletedFeatures.push(segment);
    }
    return deletedFeatures;
  }

  reverse() {
    const length = this.controlPoints_.length;
    if (length > 1) {
      this.controlPoints_.reverse();
      this.controlPoints_[0].set('subtype', 'first');
      this.controlPoints_[length - 1].set('subtype', 'last');
      this.controlPoints_.forEach((p, index) => p.set('index', index));

      this.segments_.reverse();
      for (const segment of this.segments_) {
        const geometry = segment.getGeometry();
        const coordinates = geometry.getCoordinates();
        coordinates.reverse();
        geometry.setCoordinates(coordinates);
      }
    }
  }

  /**
   * Deletes the supplied point.
   * @param {Feature<Point>} point Point to delete.
   */
  deletePOI(point) {
    console.assert(point.get('type') === 'POI');
    const idx = this.pois_.findIndex(p => p === point);
    this.pois_.splice(idx, 1);
  }

  clear() {
    this.controlPoints_.length = 0;
    this.segments_.length = 0;
    this.pois_.length = 0;
  }
}

/**
 * @param {Feature<any>} left
 * @param {Feature<any>} right
 * @return {number}
 */
function sortByIndex(left, right) {
  return left.get('index') - right.get('index');
}

/**
 * @param {Feature<Point>} featureFrom
 * @param {Feature<Point>} featureTo
 * @return {Feature<LineString>}
 */
function createStraightSegment(featureFrom, featureTo) {
  const geometry = new LineString([
    featureFrom.getGeometry().getCoordinates(),
    featureTo.getGeometry().getCoordinates()
  ]);

  const segment = new Feature({geometry});
  segment.set('type', 'segment');

  return segment;
}

/**
 * @param {Array<Array<number>>} coordinates
 * @return {boolean}
 */
function isXYZ(coordinates) {
  for (let i = 0, ii = coordinates.length; i < ii; i++) {
    const coord = coordinates[i];
    if (coord.length !== 3 || !coord.every(num => typeof num === 'number')) {
      return false;
    }
  }
  return true;
}
