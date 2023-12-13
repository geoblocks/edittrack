import type Point from 'ol/geom/Point.js';
import type LineString from 'ol/geom/LineString.js';
import type Feature from 'ol/Feature.js';
import type TrackData from './TrackData.ts';
import type {Router} from '../router/router.d.ts';
import {equals} from 'ol/coordinate';

type TrackUpdaterOptions = {
  trackData: TrackData;
  router: Router;
};


/**
 * Drive the chosen router to update the segment geometries.
 */
export default class TrackUpdater {
  private trackData: TrackData;
  private router: Router;

  constructor(options: TrackUpdaterOptions) {
    this.trackData = options.trackData;
    this.router = options.router;
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

  moveSegment(segment: Feature<LineString>, pointFrom: Feature<Point>, pointTo: Feature<Point>) {
    const pointFromGeometry = pointFrom.getGeometry();
    const pointToGeometry = pointTo.getGeometry();

    segment.set('snapped', false);
    pointFrom.set('snapped', false);
    pointTo.set('snapped', false);

    segment.getGeometry().setCoordinates([pointFromGeometry.getCoordinates(), pointToGeometry.getCoordinates()], 'XY');
  }

  async updateAdjacentSegmentsGeometries(modifiedControlPoint: Feature<Point>, snapping: boolean): Promise<any> {
    if (modifiedControlPoint) {
      const {before, after} = this.trackData.getAdjacentSegments(modifiedControlPoint);
      const pointFrom = this.trackData.getControlPointBefore(modifiedControlPoint);
      const pointTo = this.trackData.getControlPointAfter(modifiedControlPoint);
      const geometryUpdates = [];
      if (before) {
        if (snapping) {
          geometryUpdates.push(this.router.snapSegment(before, pointFrom, modifiedControlPoint));
        } else {
          this.moveSegment(before, pointFrom, modifiedControlPoint);
        }
      }
      if (after) {
        if (snapping) {
          geometryUpdates.push(this.router.snapSegment(after, modifiedControlPoint, pointTo));
        } else {
          this.moveSegment(after, modifiedControlPoint, pointTo);
        }
      }
      await Promise.all(geometryUpdates).then(() => {
        this.equalizeCoordinates(pointFrom);
        this.equalizeCoordinates(modifiedControlPoint);
        this.equalizeCoordinates(pointTo);
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

        controlPoint.getGeometry().setCoordinates(lastCoordinate);
      }
    }
  }

}
