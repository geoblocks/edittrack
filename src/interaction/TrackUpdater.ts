import type Point from 'ol/geom/Point.js';
import type Feature from 'ol/Feature.js';
import type TrackData from './TrackData';
import type {Router} from '../router/index';
import type {Profiler} from '../profiler/index';
import {equals} from 'ol/coordinate';
import {Densifier} from 'src/densifier';

type TrackUpdaterOptions = {
  trackData: TrackData;
  densifier: Densifier;
  router: Router;
  profiler: Profiler;
};

/**
 * Drive the chosen router to update the segment geometries.
 */
export default class TrackUpdater {
  private trackData: TrackData;
  private densifier: Densifier;
  private profiler: Profiler;
  private router: Router;

  constructor(options: TrackUpdaterOptions) {
    this.trackData = options.trackData;
    this.densifier = options.densifier;
    this.profiler = options.profiler;
    this.router = options.router;
  }

  computeAdjacentSegmentsProfile(modifiedControlPoint: Feature<Point>): Promise<any> {
    const promises = [];
    if (modifiedControlPoint) {
      const {before, after} = this.trackData.getAdjacentSegments(modifiedControlPoint);
      if (before) {
        if (this.densifier) this.densifier.densify(before);
        promises.push(this.profiler.computeProfile(before));
      }
      if (after) {
        if (this.densifier) this.densifier.densify(after);
        promises.push(this.profiler.computeProfile(after));
      }
    }
    return Promise.all(promises);
  }

  changeAdjacentSegmentsStyling(modifiedControlPoint: Feature<Point>, subtype: string) {
    if (modifiedControlPoint) {
      const {before, after} = this.trackData.getAdjacentSegments(modifiedControlPoint);
      if (before) {
        before.set('subtype', subtype);
      }
      if (after) {
        after.set('subtype', subtype);
      }
    }
  }

  async updateAdjacentSegmentsGeometries(
    modifiedControlPoint: Feature<Point>,
    snapping: boolean
  ): Promise<any> {
    if (modifiedControlPoint) {
      const {before, after} = this.trackData.getAdjacentSegments(modifiedControlPoint);
      const pointFrom = this.trackData.getControlPointBefore(modifiedControlPoint);
      const pointTo = this.trackData.getControlPointAfter(modifiedControlPoint);
      modifiedControlPoint.set('snapped', snapping ? undefined : false);
      const geometryUpdates = [];
      if (before) {
        geometryUpdates.push(this.router.snapSegment(before, pointFrom, modifiedControlPoint));
      }
      if (after) {
        geometryUpdates.push(this.router.snapSegment(after, modifiedControlPoint, pointTo));
      }
      // wait for snap before equalize coordinates
      const results = await Promise.all(geometryUpdates);
      this.equalizeCoordinates(pointFrom);
      this.equalizeCoordinates(modifiedControlPoint);
      this.equalizeCoordinates(pointTo);
      return results;
    }
  }

  /**
   * If needed, equalize the control point, the segment before and after to all share the same coordinate.
   */
  equalizeCoordinates(controlPoint: Feature<Point>) {
    const {before, after} = this.trackData.getAdjacentSegments(controlPoint);
    if (before && after) {
      const firstCoordinateXY = before.getGeometry().getLastCoordinate().slice(0, 2);
      const lastCoordinateXY = after.getGeometry().getFirstCoordinate().slice(0, 2);

      if (!equals(firstCoordinateXY, lastCoordinateXY)) {
        // both segments were snapped but the middle point results from the two routing was not exactly the same.
        const beforeCoordinates = before.getGeometry().getCoordinates();
        // only replace the XY part of the last coordinate
        beforeCoordinates[beforeCoordinates.length - 1].splice(0, 2, ...lastCoordinateXY);
        before.getGeometry().setCoordinates(beforeCoordinates);

        controlPoint.getGeometry().setCoordinates(lastCoordinateXY);
      }
    }
  }
}
