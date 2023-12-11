import type Point from 'ol/geom/Point.js';
import type LineString from 'ol/geom/LineString.js';
import type Feature from 'ol/Feature.js';
import type TrackData from './TrackData.ts';
import type {Router} from '../router/router.d.ts';

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
      if (before) {
        const pointFrom = this.trackData.getControlPointBefore(modifiedControlPoint);
        if (snapping) {
          await this.router.snapSegment(before, pointFrom, modifiedControlPoint);
        } else {
          this.moveSegment(before, pointFrom, modifiedControlPoint);
        }
      }
      if (after) {
        const pointTo = this.trackData.getControlPointAfter(modifiedControlPoint);
        if (snapping) {
          await this.router.snapSegment(after, modifiedControlPoint, pointTo);
        } else {
          this.moveSegment(after, modifiedControlPoint, pointTo);
        }
      }
    }
  }
}
