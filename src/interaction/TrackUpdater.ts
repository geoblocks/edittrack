import type Point from 'ol/geom/Point.js';
import type Feature from 'ol/Feature.js';
import type TrackData from './TrackData.ts';


type TrackUpdaterOptions = {
  trackData: TrackData;
  router: geoblocks.Router;
  profiler: geoblocks.Profiler;
};


/**
 * Drive the chosen router and profiler to update the segment geometries.
 */
export default class TrackUpdater {
  private trackData: TrackData;
  private profiler: geoblocks.Profiler;
  private router: geoblocks.Router;

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

  async updateAdjacentSegmentsGeometries(modifiedControlPoint: Feature<Point>): Promise<any> {
    // FIXME: use snapping property from manager
    if (modifiedControlPoint) {
      const {before, after} = this.trackData.getAdjacentSegments(modifiedControlPoint);
      if (before) {
        const pointFrom = this.trackData.getControlPointBefore(modifiedControlPoint);
        await this.router.snapSegment(before, pointFrom, modifiedControlPoint);
        await this.profiler.computeProfile(before);
      }
      if (after) {
        const pointTo = this.trackData.getControlPointAfter(modifiedControlPoint);
        await this.router.snapSegment(after, modifiedControlPoint, pointTo);
        await this.profiler.computeProfile(after);
      }
    }
  }
}
