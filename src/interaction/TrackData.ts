import {equals} from 'ol/coordinate.js';
import Feature from 'ol/Feature.js';
import LineString from 'ol/geom/LineString.js';
import MultiPoint from 'ol/geom/MultiPoint.js';
import Point from 'ol/geom/Point.js';

export type FeatureType = 'segment' | 'controlPoint' | 'POI';

interface ParsedFeatures {
  segments: Feature<LineString>[];
  controlPoints: Feature<Point>[];
  pois: Feature<Point>[];
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
  deleted: Feature<Point|LineString>[];
  pointBefore?: Feature<Point>;
  pointAfter?: Feature<Point>;
  newSegment?: Feature<LineString>;
}

export default class TrackData {
  private segments: Feature<LineString>[] = [];
  private controlPoints: Feature<Point>[] = [];
  private pois: Feature<Point>[] = [];

  parseFeatures(features: Feature<Point|LineString>[]): ParsedFeatures {
    const parsed: ParsedFeatures = {
      segments: [],
      pois: [],
      controlPoints: [],
    };
    const {segments, pois, controlPoints} = parsed;
    for (const feature of features) {
      const type = feature.get('type') as FeatureType;
      if (type === 'segment') {
        const g = feature.getGeometry();
        if (g.getType() !== 'LineString') {
          throw new Error('Some segment is not a LineString');
        };
        if (g.getLayout() !== 'XYZM') {
          throw new Error('Some segment is not XYZM');
        }
        segments.push(feature as Feature<LineString>);
      } else if (type === 'controlPoint') {
        if (feature.getGeometry().getType() !== 'Point') {
          throw new Error('Some controlPoint is not a Point');
        };
        controlPoints.push(feature as Feature<Point>);
      } else if (type === 'POI') {
        if (feature.getGeometry().getType() !== 'Point') {
          throw new Error('Some POI is not a Point');
        };
        pois.push(feature as Feature<Point>);
      }
    }
    controlPoints.forEach((p, i) => {
      const sCoo = (i === controlPoints.length - 1) ? segments[i - 1].getGeometry().getLastCoordinate() : segments[i].getGeometry().getFirstCoordinate()
      const cCoo = p.getGeometry().getCoordinates();
      const dx = Math.abs(sCoo[0] - cCoo[0]);
      const dy = Math.abs(sCoo[1] - cCoo[1]);
      if (dx > 0.1 || dy > 0.1 ) {
        console.error(`Control point ${i} is not on segment end ${sCoo} != ${cCoo} (dy=${dx}, dy=${dy})`);
      }
    })

    return parsed;
  }

  restoreParsedFeatures(parsedFeatures: ParsedFeatures) {
    const {segments, pois, controlPoints} = parsedFeatures;
    console.assert((!controlPoints.length && !segments.length) || (controlPoints.length === segments.length + 1));
    this.clear();
    controlPoints.sort(sortByIndex);
    this.segments = segments;
    this.pois = pois;
    this.controlPoints = controlPoints;
    this.updatePOIIndexes();
  }

  getAdjacentSegments(controlPoint: Feature<Point>): AdjacentSegments {
    let before = undefined;
    let after = undefined;
    const index = this.controlPoints.indexOf(controlPoint);

    if (index >= 1) {
      before = this.segments[index - 1];
    }
    if (index >= 0 && index < this.segments.length) {
      after = this.segments[index];
    }

    return {before, after};
  }

  getControlPointBefore(controlPoint: Feature<Point>): Feature<Point> | null {
    const index = this.controlPoints.indexOf(controlPoint);
    if (index > 0) {
      return this.controlPoints[index - 1];
    }
    return null;
  }

  getControlPointAfter(controlPoint: Feature<Point>): Feature<Point> | null {
    const index = this.controlPoints.indexOf(controlPoint);
    if (index >= 0 && index < this.controlPoints.length - 1) {
      return this.controlPoints[index + 1];
    }
    return null;
  }

  getPOIs(): Feature<Point>[] {
    return this.pois;
  }

  getControlPoints(): Feature<Point>[] {
    return this.controlPoints;
  }

  getSegments(): Feature<LineString>[] {
    return this.segments;
  }

  insertControlPointAt(point: Feature<Point>, index: number): Feature<LineString> | undefined {
    let removed = undefined;
    point.set('type', 'controlPoint');
    console.assert(index >= 0 && index <= this.controlPoints.length);
    // add new control point
    this.controlPoints.splice(index, 0, point);

    // remove segment
    if (index > 0 && index < this.controlPoints.length) {
      removed = this.segments[index - 1];
      this.segments.splice(index - 1, 1);
    }

    // index > 0
    const pointBefore = this.controlPoints[index - 1];
    if (pointBefore) {
      // not the first control point
      const segmentBefore = createStraightSegment(pointBefore, point);
      segmentBefore.set('snapped', pointBefore.get('snapped'));
      this.segments.splice(index - 1, 0, segmentBefore);
    }

    // index <= this.controlPoints_.length
    const pointAfter = this.controlPoints[index + 1];
    if (pointAfter) {
      // not the last control point
      const segmentAfter = createStraightSegment(point, pointAfter);
      segmentAfter.set('snapped', pointAfter.get('snapped'));
      this.segments.splice(index - 1, 0, segmentAfter);
    }

    // update indices property
    this.updateControlPointsIndexes(index);
    this.updateSegmentIndexes();

    return removed;
  }

  private updateControlPointsIndexes(index: number) {
    for (let i = index; i < this.controlPoints.length; ++i) {
      this.controlPoints[i].set('index', i);
    }
  }

  /**
   * Add a new control point at the end.
   */
  pushControlPoint(point: Feature<Point>): AddedControlPoint {
    this.insertControlPointAt(point, this.controlPoints.length);
    const length = this.controlPoints.length;

    if (length === 1) {
      // first control point
      point.set('subtype', 'first');
      return {pointFrom: point, pointTo: point, segment: undefined};
    }
    if (length >= 2) {
      const previous = this.controlPoints[length - 2];
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
   */
  deleteControlPoint(point: Feature<Point>): DeletedControlPoint {
    const deleteIndex = this.controlPoints.indexOf(point);
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
      const segmentBeforeIndex = this.segments.indexOf(before);
      deletedFeatures.push(...this.segments.splice(segmentBeforeIndex, 1));
    }
    if (after) {
      const segmentAfterIndex = this.segments.indexOf(after);
      deletedFeatures.push(...this.segments.splice(segmentAfterIndex, 1));
    }

    // create new segment if there is still a point before and after
    let newSegment = null;
    if (pointBefore && pointAfter) {
      newSegment = createStraightSegment(pointBefore, pointAfter);
      newSegment.set('snapped', point.get('snapped'));
      this.segments.splice(deleteIndex - 1, 0, newSegment);
    }

    // deleted point was the first point, update new first point
    if (pointAfter && deleteIndex === 0) {
      pointAfter.set('subtype', 'first');
    }
    // deleted point was the last point, update new last point
    if (pointBefore && deleteIndex === this.controlPoints.length - 1 && deleteIndex !== 1) {
      pointBefore.set('subtype', 'last');
    }

    // delete the point
    deletedFeatures.push(...this.controlPoints.splice(deleteIndex, 1));

    // update indices property
    this.updateControlPointsIndexes(deleteIndex);
    this.updateSegmentIndexes();
    return {
      deleted: deletedFeatures,
      pointBefore: pointBefore,
      pointAfter: pointAfter,
      newSegment: newSegment
    };
  }

  private updateSegmentIndexes() {
    this.segments.forEach((s, idx) => s.set('index', idx, false));
  }

  updatePOIIndexes() {
    // build a multi point geometry from all segments coordinates
    const points = new MultiPoint(this.segments.map((s) => s.getGeometry().getCoordinates()).flat());
    const pointsCoordinates = points.getCoordinates();
    const sorted = this.pois.map((poi) => {
      // find the closest point to the POI and returns its index; that's it's "distance" from the start
      const closestPoint = points.getClosestPoint(poi.getGeometry().getCoordinates());
      return {
        poi: poi,
        index: pointsCoordinates.findIndex((c) => equals(c, closestPoint))
      };
    }).sort((a, b) => a.index - b.index);
    sorted.forEach((s, index) => s.poi.set('index', index));

    // We sort the stored pois array itself
    this.pois.sort((a, b) => a.get('index') - b.get('index'));
  }

  /**
   * Remove the last control point.
   */
  deleteLastControlPoint(): Feature<Point | LineString>[] {
    const deletedFeatures = [];
    const point = this.controlPoints.pop();
    if (point !== undefined) {
      //this.source_.removeFeature(point);
      const length = this.controlPoints.length;
      const previous = this.controlPoints[length - 1];
      // change previous point from 'last' to 'control' except if it's the 'first'
      if (length > 1) {
        previous.set('subtype', 'last');
      }
      deletedFeatures.push(point);
    }

    const segment = this.segments.pop();
    if (segment !== undefined) {
      deletedFeatures.push(segment);
    }
    return deletedFeatures;
  }

  reverse() {
    const length = this.controlPoints.length;
    if (length > 1) {
      this.controlPoints.reverse();
      this.controlPoints[0].set('subtype', 'first');
      this.controlPoints[length - 1].set('subtype', 'last');
      this.controlPoints.forEach((p, index) => p.set('index', index));

      this.segments.reverse();
      for (const segment of this.segments) {
        const geometry = segment.getGeometry();
        const coordinates = geometry.getCoordinates();
        coordinates.reverse();
        geometry.setCoordinates(coordinates);
      }
    }
  }

  hasData(): boolean {
    return this.controlPoints.length > 0 || this.segments.length > 0 || this.pois.length > 0;
  }

  /**
   * Deletes the supplied point.
   */
  deletePOI(point: Feature<Point>) {
    console.assert(point.get('type') === 'POI');
    const idx = this.pois.findIndex(p => p === point);
    this.pois.splice(idx, 1);
  }

  addPOI(point: Feature<Point>) {
    console.assert(point.get('type') === 'POI');
    this.pois.push(point)
  }

  clear() {
    this.controlPoints.length = 0;
    this.segments.length = 0;
    this.pois.length = 0;
  }

  assertValid() {
    // same coordinates for control points and segments last and first coordinates
    for (const point of this.controlPoints) {
      const coordinates = [point.getGeometry().getCoordinates().splice(0, 2)];
      const {before, after} = this.getAdjacentSegments(point);
      if (before) {
        coordinates.push(before.getGeometry().getLastCoordinate().splice(0, 2));
      }
      if (after) {
        coordinates.push(after.getGeometry().getFirstCoordinate().splice(0, 2));
      }
      if (!coordinates.every((value, _, array) => equals(value, array[0]))) {
        console.warn(`Not same coordinates at control point ${point.get('index')}`);
      }
    }
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
