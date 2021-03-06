import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import Draw from 'ol/interaction/Draw.js';
import Modify from 'ol/interaction/Modify.js';
import Select from 'ol/interaction/Select.js';
import {click} from 'ol/events/condition.js';

import TrackData from './TrackData.js';
import TrackUpdater from './TrackUpdater.js';

import {findClosestPointInLines} from './closestfinder.js';

import {debounce, setZ} from './util.js';
import GeometryType from 'ol/geom/GeometryType';

/** @typedef {import('ol/geom/LineString').default} LineString */
/** @typedef {import('ol/MapBrowserEvent').default} MapBrowserEvent */

/** @typedef {'edit'|''} TrackMode */

/**
 * @typedef Options
 * @type {Object}
 * @property {import("ol/Map").default} map
 * @property {import("ol/layer/Vector").default} trackLayer
 * @property {geoblocks.Router} router
 * @property {geoblocks.Profiler} profiler
 * @property {import("ol/style/Style").default} [style]
 */

/**
 * @param {import("ol/MapBrowserEvent").default} mapBrowserEvent
 * @return {boolean}
 */
const altKeyAndOptionallyShift = function(mapBrowserEvent) {
  const originalEvent = /** @type {MouseEvent} */ (mapBrowserEvent.originalEvent);
  return originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey);
};


class TrackManager {

  /**
   * @param {Options} options
   */
  constructor(options) {

    /**
     * @type {import("ol/Map").default}
     * @private
     */
    this.map_ = options.map;

    /**
     * @type {import("ol/source/Vector").default}
     * @private
     */
    this.source_ = options.trackLayer.getSource();

    /**
     * @type {import("ol/layer/Vector").default}
     * @private
     */
    this.trackLayer_ = options.trackLayer;

    /**
     * @type {boolean}
     */
    this.snapping = true;

    /**
     * @private
     * @type {TrackMode}
     */
    this.mode_ = '';

    /**
     * @type {Array<Function>}
     * @private
     */
    this.trackChangeEventListeners_ = [];

    /**
     * @type {Array<Function>}
     * @private
     */
    this.trackHoverEventListeners_ = [];

    /**
     * @private
     */
    this.trackData_ = new TrackData();

    console.assert(!!options.router);

    /**
     * @type {geoblocks.Router}
     * @private
     */
    this.router_ = options.router;

    /**
     * @type {geoblocks.Profiler}
     * @private
     */
    this.profiler_ = options.profiler;

    /**
     * @private
     */
    this.updater_ = new TrackUpdater({
      profiler: this.profiler_,
      router: this.router_,
      trackData: this.trackData_
    });

    /**
     * @private
     */
    this.drawTrack_ = new Draw({
      type: GeometryType.POINT,
      source: this.source_,
      style: options.style,
      // don't draw when trying to delete a feature
      condition: (mapBrowserEvent) => !altKeyAndOptionallyShift(mapBrowserEvent),
    });
    this.drawTrack_.setActive(false);

    this.drawTrack_.on('drawend', (event) => {
      console.assert(event.feature.getGeometry().getType() === 'Point');
      const feature = /** @type {Feature<Point>} */ (event.feature);
      const {pointFrom, pointTo, segment} = this.trackData_.pushControlPoint(feature);
      if (segment) {
        this.source_.addFeature(segment);
        if (this.snapping) {
          this.router_.snapSegment(segment, pointFrom, pointTo)
            .then(() => {
              // compute profile for routed segment
              this.profiler_.computeProfile(segment).then(() => {
                const {before} = this.trackData_.getAdjacentSegments(pointFrom);
                if (before && !before.get('snapped')) {
                  // move the last point of the previous straight segment
                  const geometry = /** @type {LineString} */ (before.getGeometry());
                  const coordinates = geometry.getCoordinates();
                  console.assert(coordinates.length === 2, 'Previous segment is not a straight line');
                  geometry.setCoordinates([coordinates[0], segment.getGeometry().getFirstCoordinate()]);
                }
                this.onTrackChanged_();
              });
            });
        } else {
          // compute profile for straight segment and set the elevation to the points
          this.profiler_.computeProfile(segment).then(() => {
          /**
           * @type {[number, number, number, number][]}
           */
            const segmentProfile = segment.get('profile');
            if (segmentProfile) {
              setZ(segment, segmentProfile[0][2], segmentProfile[segmentProfile.length - 1][2]);
            }
            this.onTrackChanged_();
          });
        }
      }
    });

    /**
     * @private
     * @type {?Feature<Point>}
     */
    this.modifiedControlPoint_ = null;

    /**
     * @private
     * @type {?Feature<LineString>}
     */
    this.modifiedSegment_ = null;

    /**
     * @private
     * @type {?import("ol/coordinate").Coordinate}
     */
    this.lastCoordinates_ = null;

    /**
     * @private
     * @type {boolean}
     */
    this.modifyInProgress_ = false;

    const debouncedMapToProfileUpdater = debounce(/** @param {MapBrowserEvent} event */ (event) => {
      this.lastCoordinates_ = event.coordinate;
      const hoverOnFeature = this.map_.hasFeatureAtPixel(event.pixel, {
        layerFilter: layer => layer === options.trackLayer,
        hitTolerance: 20
      });
      if (hoverOnFeature && this.trackData_.getSegments().length > 0) {
        const segments = this.trackData_.getSegments().map(feature => feature.getGeometry());
        const best = findClosestPointInLines(segments, this.lastCoordinates_, {tolerance: 1, interpolate: true});
        this.onTrackHovered_(best ? best.distanceFromStart : undefined);
      } else {
        this.onTrackHovered_(undefined);
      }
    }, 10);

    this.map_.on('pointermove', debouncedMapToProfileUpdater);

    /**
     * @private
     */
    this.modifyTrack_ = new Modify({
      source: this.source_,
      style: () => null,
      // don't modify when trying to delete a feature
      condition: (mapBrowserEvent) => !altKeyAndOptionallyShift(mapBrowserEvent),
      // deleteCondition: () => false,
    });
    this.modifyTrack_.setActive(false);
    this.source_.on('changefeature', (event) => {
      const feature = event.feature;
      if (this.modifyInProgress_) {
        const type = feature.get('type');
        if (type === 'controlPoint') {
          console.assert(feature.getGeometry().getType() === 'Point');
          // moving an existing point
          console.assert(this.modifiedControlPoint_ ? this.modifiedControlPoint_ === feature : true);
          this.modifiedControlPoint_ = /** @type {Feature<Point>} */ (feature);
        } else if (type === 'segment') {
          // adding a new point to an existing segment
          console.assert(feature.getGeometry().getType() === 'LineString');
          this.modifiedSegment_ = /** @type {Feature<LineString>} */ (feature);
        }
      }
    });

    this.modifyTrack_.on('modifystart', () => {
      this.modifyInProgress_ = true;
    });
    this.modifyTrack_.on('modifyend', () => {
      const modifiedControlPoint = this.modifiedControlPoint_;
      const modifiedSegment = this.modifiedSegment_;

      this.modifyInProgress_ = false;
      if (modifiedControlPoint) {
        this.updater_.updateAdjacentSegmentsGeometries(modifiedControlPoint).then(() => {
          this.updater_.changeAdjacentSegmentsStyling(modifiedControlPoint, '');
          this.updater_.computeAdjacentSegmentsProfile(modifiedControlPoint).then(() => this.onTrackChanged_());
        });
      } else if (modifiedSegment) {
        const indexOfSegment = this.trackData_.getSegments().indexOf(modifiedSegment);
        console.assert(indexOfSegment >= 0);
        const controlPoint = /** @type {Feature<Point>} */ (new Feature({
          geometry: new Point(this.lastCoordinates_)
        }));
        this.source_.addFeature(controlPoint);
        const removed = this.trackData_.insertControlPointAt(controlPoint, indexOfSegment + 1);
        console.assert(!!removed);
        this.source_.removeFeature(removed);

        const {before, after} = this.trackData_.getAdjacentSegments(controlPoint);
        console.assert(!!before && !!after);
        this.source_.addFeatures([before, after]);

        this.updater_.updateAdjacentSegmentsGeometries(controlPoint).then(() => {
          this.updater_.changeAdjacentSegmentsStyling(controlPoint, '');
          this.updater_.computeAdjacentSegmentsProfile(controlPoint).then(() => this.onTrackChanged_());
        });
      }
      this.modifiedControlPoint_ = null;
      this.modifiedSegment_ = null;
    });

    /**
     * @private
     */
    this.deletePoint_ = new Select({
      // only delete if alt-key is being pressed while clicking
      condition: (mapBrowserEvent) => click(mapBrowserEvent) && altKeyAndOptionallyShift(mapBrowserEvent),
      layers: [this.trackLayer_],
      filter: (feature) => feature.get('type') === 'controlPoint',
    });

    this.deletePoint_.on('select', (feature) => {
      const selected = /** @type {Feature<Point>} */ (feature.selected[0]);
      console.assert(selected.getGeometry().getType() === 'Point');
      const {deleted, pointBefore, pointAfter, newSegment} = this.trackData_.deleteControlPoint(selected);

      // remove deleted features from source
      deleted.forEach(f => this.source_.removeFeature(f));

      // add newly created segment to source
      if (newSegment) {
        this.source_.addFeature(newSegment);
      }

      // update adjacent points
      if (pointBefore || pointAfter) {
        const geometryUpdates = [];
        if (pointBefore) {
          geometryUpdates.push(this.updater_.updateAdjacentSegmentsGeometries(pointBefore));
        }
        if (pointAfter) {
          geometryUpdates.push(this.updater_.updateAdjacentSegmentsGeometries(pointAfter));
        }
        Promise.all(geometryUpdates).then(() => {
          const segmentUpdates = [];
          if (pointBefore) {
            segmentUpdates.push(this.updater_.computeAdjacentSegmentsProfile(pointBefore));
          }
          if (pointAfter) {
            segmentUpdates.push(this.updater_.computeAdjacentSegmentsProfile(pointAfter));
          }
          Promise.all(segmentUpdates).then(() => {
            this.onTrackChanged_();
          });
        });
      }

      // unselect deleted feature
      this.deletePoint_.getFeatures().clear();
    });

    // The draw interaction must be added after the modify
    // otherwise clicking on an existing segment or point doesn't add a new point
    this.map_.addInteraction(this.modifyTrack_);
    this.map_.addInteraction(this.drawTrack_);
    this.map_.addInteraction(this.deletePoint_);
  }

  /**
   * @return {TrackMode} mode
   */
  get mode() {
    return this.mode_;
  }

  /**
   * @param {TrackMode} mode
   */
  set mode(mode) {
    this.drawTrack_.setActive(mode === 'edit');
    this.modifyTrack_.setActive(mode === 'edit');
    this.deletePoint_.setActive(mode === 'edit');
    this.mode_ = mode || '';
  }

  onTrackChanged_() {
    // notify observers
    this.notifyTrackChangeEventListeners_();
  }

  /**
   * @param {number} distance
   */
  onTrackHovered_(distance) {
    // notify observers
    this.notifyTrackHoverEventListener_(distance);
  }

  deleteLastPoint() {
    if (this.mode_) {
      const deletedFeatures = this.trackData_.deleteLastControlPoint();
      deletedFeatures.forEach(feature => this.source_.removeFeature(feature));
      this.onTrackChanged_();
    }
  }

  reverse() {
    this.trackData_.reverse();
    const points = this.trackData_.getControlPoints();
    for (let i = 1, ii = points.length; i < ii; i += 2) {
      const point = points[i];
      this.updater_.changeAdjacentSegmentsStyling(point, 'modifying');
      this.updater_.updateAdjacentSegmentsGeometries(point).then(() => {
        this.updater_.changeAdjacentSegmentsStyling(point, '');
        this.updater_.computeAdjacentSegmentsProfile(point).then(() => this.onTrackChanged_());
      });
    }
  }

  /**
   */
  clear() {
    this.source_.clear();
    this.trackData_.clear();
    this.onTrackChanged_();
  }

  /**
   * @param {Array<Feature>} features
   * @return {Promise<any>}
   */
  restoreFeatures(features) {
    this.clear();
    this.trackData_.restoreFeatures(features);
    this.source_.addFeatures(features);
    const segments = this.trackData_.getSegments();
    const profileRequests = segments.map(segment => this.profiler_.computeProfile(segment));
    return Promise.all(profileRequests).then(() => {
      this.onTrackChanged_();
    });
  }

  /**
   * @return {Feature<Point>[]}
   */
  getControlPoints() {
    return this.trackData_.getControlPoints().map((point, index) => {
      const clone = /** @type {Feature<Point>} */ (point.clone());
      clone.set('index', index);
      return clone;
    });
  }

  /**
   * @return {Feature<LineString>[]}
   */
  getSegments() {
    return this.trackData_.getSegments().map((segment, index) => {
      const clone = /** @type {Feature<LineString>} */ (segment.clone());
      clone.set('index', index);
      return clone;
    });
  }

  /**
   * Return the whole track as one line string in a feature.
   * @return {Feature}
   */
  getTrackFeature() {
    return new Feature(this.trackData_.getLineString());
  }

  /**
   * Add new event listener to be notified on track changes.
   * @param {Function} fn EventListener
   */
  addTrackChangeEventListener(fn) {
    this.trackChangeEventListeners_.push(fn);
  }

  /**
   * Remove registered event listener.
   * @param {Function} fn EventListener
   */
  removeTrackChangeEventListener(fn) {
    this.trackChangeEventListeners_ = this.trackChangeEventListeners_.filter(item => item !== fn);
  }

  /**
   * @private
   */
  notifyTrackChangeEventListeners_() {
    this.trackChangeEventListeners_.forEach(handler => handler());
  }

  /**
   * Add new event listener to be notified on track hover.
   * @param {Function} fn EventListener
   */
  addTrackHoverEventListener(fn) {
    this.trackHoverEventListeners_.push(fn);
  }

  /**
   * Remove registered event listener.
   * @param {Function} fn EventListener
   */
  removeTrackHoverEventListener(fn) {
    this.trackHoverEventListeners_ = this.trackHoverEventListeners_.filter(item => item !== fn);
  }

  /**
   * @param {number} distance
   * @private
   */
  notifyTrackHoverEventListener_(distance) {
    this.trackHoverEventListeners_.forEach(handler => handler(distance));
  }
}

export default TrackManager;
