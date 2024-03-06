import type Point from 'ol/geom/Point.js';
import type Feature from 'ol/Feature.js';
import type TrackData from './TrackData';
import type {Router} from '../router/index';
import type {Profiler} from '../profiler/index';
import {equals} from 'ol/coordinate';

type TrackUpdaterOptions = {
  trackData: TrackData;
  router: Router;
  profiler: Profiler;
};


/**
 * Drive the chosen router to update the segment geometries.
 */
export default class TrackUpdater {
  private trackData: TrackData;
  private profiler: Profiler;
  private router: Router;

  constructor(options: TrackUpdaterOptions) {
    this.trackData = options.trackData;
    this.profiler = options.profiler;
    this.router = options.router;
  }

  computeAdjacentSegmentsProfile(modifiedControlPoint: Feature<Point>): Promise<any> {
    const promises = [];
    if (modifiedControlPoint) {
      const {before, after} = this.trackData.getAdjacentSegments(modifiedControlPoint);
      if (before) {
        promises.push(this.profiler.computeProfile(before));
      }
      if (after) {
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

  async updateAdjacentSegmentsGeometries(modifiedControlPoint: Feature<Point>, snapping: boolean): Promise<any> {
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
      await Promise.all(geometryUpdates).then(async () => {
        this.equalizeCoordinates(pointFrom);
        this.equalizeCoordinates(modifiedControlPoint);
        this.equalizeCoordinates(pointTo);
        const profileUpdates = [];
        if (before) {
          profileUpdates.push(this.profiler.computeProfile(before));
        }
        if (after) {
          profileUpdates.push(this.profiler.computeProfile(after));
        }
        if (pointFrom) {
          const {before, after} = this.trackData.getAdjacentSegments(pointFrom);
          profileUpdates.push(this.profiler.computeProfile(before));
          profileUpdates.push(this.profiler.computeProfile(after));
        }
        if (pointTo) {
          const {before, after} = this.trackData.getAdjacentSegments(pointTo);
          profileUpdates.push(this.profiler.computeProfile(before));
          profileUpdates.push(this.profiler.computeProfile(after));
        }
        await Promise.all(profileUpdates);
      });
    }
  }

  // If needed, equalize the control point, the segment before and after to all share the same coordinate.
  equalizeCoordinates(controlPoint: Feature<Point>) {
    const {before, after} = this.trackData.getAdjacentSegments(controlPoint);
    if (before && after) {
      const firstCoordinate = before.getGeometry().getLastCoordinate();
      const lastCoordinate = after.getGeometry().getFirstCoordinate();

      if (!equals(firstCoordinate.slice(0, 2), lastCoordinate.slice(0, 2))) {
        // both segments were snapped but the middle point results from the two routing was not exactly the same.
        const beforeCoordinates = before.getGeometry().getCoordinates();
        beforeCoordinates[beforeCoordinates.length - 1] = lastCoordinate;
        before.getGeometry().setCoordinates(beforeCoordinates);
        this.profiler.computeProfile(before);
        controlPoint.getGeometry().setCoordinates(lastCoordinate);
      }
    }
  }

}
