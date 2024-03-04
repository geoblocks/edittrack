import type Point from 'ol/geom/Point.js';
import type Feature from 'ol/Feature.js';
import type TrackData from './TrackData';
import type {Router} from '../router/index';
import type {Profiler} from '../profiler/index';
import type {Densifier} from '../densifier/index';
import {equals} from 'ol/coordinate';

type TrackUpdaterOptions = {
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
    this.densifier = options.densifier;
    this.profiler = options.profiler;
    this.router = options.router;
  }

  setTrackData(trackData: TrackData) {
    this.trackData = trackData;
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
  ): Promise<void> {
    if (modifiedControlPoint) {
      const {before, after} = this.trackData.getAdjacentSegments(modifiedControlPoint);
      const pointFrom = this.trackData.getControlPointBefore(modifiedControlPoint);
      const pointTo = this.trackData.getControlPointAfter(modifiedControlPoint);
      modifiedControlPoint.set('snapped', snapping ? undefined : false);
      if (before) {
        if (this.router) await this.router.snapSegment(before, pointFrom, modifiedControlPoint);
        if (this.densifier && !before.get('snapped')) this.densifier.densify(before);
        await this.profiler.computeProfile(before);
      }
      if (after) {
        if (this.router) await this.router.snapSegment(after, modifiedControlPoint, pointTo);
        if (this.densifier && !after.get('snapped')) this.densifier.densify(after);
        await this.profiler.computeProfile(after);
      }
      this.equalizeCoordinates(pointFrom);
      this.equalizeCoordinates(modifiedControlPoint);
      this.equalizeCoordinates(pointTo);
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
