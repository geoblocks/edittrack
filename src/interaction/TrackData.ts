import {equals} from 'ol/coordinate.js';
import Feature from 'ol/Feature.js';
import LineString from 'ol/geom/LineString.js';
import type Point from 'ol/geom/Point.js';
import type {Coordinate} from 'ol/coordinate.js';

interface ParsedFeatures {
  segments: Array<Feature<LineString>>;
  controlPoints: Array<Feature<Point>>;
  pois: Array<Feature<Point>>;
}

interface AdjacentSegments {
  before?: Feature<LineString>;
  after?: Feature<LineString>;
}

interface AddedControlPoint {
  pointFrom: Feature<Point>;
  pointTo: Feature<Point>;
  segment?: Feature<LineString>;
}

interface DeletedControlPoint {
  deleted: Array<Feature<Point|LineString>>;
  pointBefore?: Feature<Point>;
  pointAfter?: Feature<Point>;
  newSegment?: Feature<LineString>;
}

export default class TrackData {
  private segments_: Array<Feature<LineString>> = [];
  private controlPoints_: Array<Feature<Point>> = [];
  private pois_: Array<Feature<Point>> = [];

  parseFeatures(features: Feature<Point|LineString>[]): ParsedFeatures {
    const parsed: ParsedFeatures = {
      segments: [],
      pois: [],
      controlPoints: [],
    };
    const {segments, pois, controlPoints} = parsed;

    for (const feature of features) {
      const type = feature.get('type');
      if (type === 'segment') {
        console.assert(feature.getGeometry().getType() === 'LineString');
        segments.push(feature as Feature<LineString>);
      } else if (type === 'controlPoint') {
        console.assert(feature.getGeometry().getType() === 'Point');
        controlPoints.push(feature as Feature<Point>);
      } else if (type === 'POI') {
        console.assert(feature.getGeometry().getType() === 'Point');
        pois.push(feature as Feature<Point>);
      }
    }

    return parsed;
  }

  restoreParsedFeatures(parsedFeatures: ParsedFeatures) {
    const {segments, pois, controlPoints} = parsedFeatures;
    console.assert((!controlPoints.length && !segments.length) || (controlPoints.length === segments.length + 1));
    this.clear();
    controlPoints.sort(sortByIndex);
    this.segments_ = segments;
    this.pois_ = pois;
    this.controlPoints_ = controlPoints;
  }

  getAdjacentSegments(controlPoint: Feature<Point>): AdjacentSegments {
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

  getControlPointBefore(controlPoint: Feature<Point>): Feature<Point> | null {
    const index = this.controlPoints_.indexOf(controlPoint);
    if (index > 0) {
      return this.controlPoints_[index - 1];
    }
    return null;
  }

  getControlPointAfter(controlPoint: Feature<Point>): Feature<Point> | null {
    const index = this.controlPoints_.indexOf(controlPoint);
    if (index >= 0 && index < this.controlPoints_.length - 1) {
      return this.controlPoints_[index + 1];
    }
    return null;
  }

  getPOIs(): Feature<Point>[] {
    return this.pois_;
  }

  getControlPoints(): Feature<Point>[] {
    return this.controlPoints_;
  }

  getSegments(): Array<Feature<LineString>> {
    return this.segments_;
  }

  getLineString(): LineString {
    const coordinates: Coordinate[] = [];
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

  insertControlPointAt(point: Feature<Point>, index: number): Feature<LineString> | undefined {
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

  /*
   * Add a new control point at the end.
   */
  pushControlPoint(point: Feature<Point>): AddedControlPoint {
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

  /*
   * Deletes the supplied point and all adjacent segments.
   * Creates a new segment if the deleted point had two neighbors.
   * Updates first/last subtype if needed.
   */
  deleteControlPoint(point: Feature<Point>): DeletedControlPoint {
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

  /*
   * Remove the last control point.
   */
  deleteLastControlPoint(): Feature<Point | LineString>[] {
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

  hasData(): boolean {
    return this.controlPoints_.length > 0 || this.segments_.length > 0 || this.pois_.length > 0;
  }

  /*
   * Deletes the supplied point.
   */
  deletePOI(point: Feature<Point>) {
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

function sortByIndex(left: Feature<any>, right: Feature<any>): number {
  return left.get('index') - right.get('index');
}

function createStraightSegment(featureFrom: Feature<Point>, featureTo: Feature<Point>): Feature<LineString> {
  const geometry = new LineString([
    featureFrom.getGeometry().getCoordinates(),
    featureTo.getGeometry().getCoordinates()
  ]);

  const segment = new Feature({geometry});
  segment.set('type', 'segment');

  return segment;
}

function isXYZ(coordinates: Coordinate[]): boolean {
  for (let i = 0, ii = coordinates.length; i < ii; i++) {
    const coord = coordinates[i];
    if (coord.length !== 3 || !coord.every(num => typeof num === 'number')) {
      return false;
    }
  }
  return true;
}
