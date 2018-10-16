import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import Draw from 'ol/interaction/Draw.js';
import Modify from 'ol/interaction/Modify.js';
import Select from 'ol/interaction/Select.js';
// @ts-ignore TODO: remove this ignore when we switch to using OL5+ type definitions
import {click} from 'ol/events/condition.js';

import TrackData from './TrackData.js';
import TrackUpdater from './TrackUpdater.js';

import {findClosestPointInLines} from './closestfinder.js';

import {debounce} from './util.js';

/**
 * @param {ol.MapBrowserEvent} mapBrowserEvent
 * @return {boolean}
 */
const altKeyAndOptionallyShift = function(mapBrowserEvent) {
  const originalEvent = /** @type {MouseEvent} */ (mapBrowserEvent.originalEvent);
  return originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey);
};


class TrackManager {

  /**
   * @param {Object} options
   * @property {ol.proj.Projection} projection
   * @property {ol.Map} map
   * @property {ol.layer.Vector} trackLayer
   * @property {geoblocks.Router} router
   * @property {geoblocks.Profiler} profiler
   */
  constructor(options) {

    /**
     * @type {string}
     * @private
     */
    this.projection_ = options.projection;

    /**
     * @type {ol.Map}
     * @private
     */
    this.map_ = options.map;

    /**
     * @type {ol.source.Vector}
     * @private
     */
    this.source_ = options.trackLayer.getSource();

    /**
     * @type {ol.layer.Vector}
     * @private
     */
    this.trackLayer_ = options.trackLayer;

    /**
     * @type {boolean}
     */
    this.snapping = true;

    /**
     * @private
     * @type {string}
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

    console.assert(options.router);
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
      type: 'Point',
      source: this.source_,
      style: options.style,
      // don't draw when trying to delete a feature
      toggleCondition: (mapBrowserEvent) => !altKeyAndOptionallyShift(mapBrowserEvent),
    });
    this.drawTrack_.setActive(false);

    this.drawTrack_.on('drawend', (event) => {
      const {pointFrom, pointTo, segment} = this.trackData_.pushControlPoint(event.feature);
      if (segment) {
        this.source_.addFeature(segment);
        if (this.snapping) {
          this.router_.snapSegment(segment, pointFrom, pointTo)
            .then(() => {
              // compute profile for routed segment
              if (this.profiler_) {
                this.profiler_.computeProfile(segment).then(() => this.onTrackChanged_());
              }
              const {before} = this.trackData_.getAdjacentSegments(pointFrom);
              if (before && !before.get('snapped')) {
                const geometry = before.getGeometry();
                const coordinates = geometry.getCoordinates();
                console.assert(coordinates.length === 2);
                geometry.setCoordinates([coordinates[0], pointFrom.getGeometry().getCoordinates()]);
              }
            });
        } else {
          // compute profile for straight segment
          if (this.profiler_) {
            this.profiler_.computeProfile(segment).then(() => this.onTrackChanged_());
          }
        }
      }
    });

    /**
     * @private
     * @type {?ol.Feature}
     */
    this.modifiedControlPoint_ = null;

    /**
     * @private
     * @type {?ol.Feature}
     */
    this.modifiedSegment_ = null;

    /**
     * @private
     * @type {?ol.Coordinate}
     */
    this.lastCoordinates_ = null;

    /**
     * @private
     * @type {boolean}
     */
    this.modifyInProgress_ = false;

    const debouncedMapToProfileUpdater = debounce((event) => {
      const coordinates = this.lastCoordinates_ = event.coordinate;
      const hoverOnFeature = this.map_.hasFeatureAtPixel(event.pixel, {
        layerFilter: layer => layer === options.trackLayer,
        hitTolerance: 20
      });
      if (hoverOnFeature && this.trackData_.getSegments().length > 0) {
        /**
         * @const {Array<ol.geom.LineString}
         */
        const segments = this.trackData_.getSegments().map(feature => feature.getGeometry());
        const best = findClosestPointInLines(segments, coordinates, {tolerance: 1, interpolate: true});
        this.onTrackHovered_(best ? best.distanceFromStart : undefined);
      } else {
        this.onTrackHovered_(undefined);
      }
    }, 0);

    this.map_.on('pointermove', debouncedMapToProfileUpdater);

    /**
     * @private
     */
    this.modifyTrack_ = new Modify({
      source: this.source_,
      style: () => null,
      // don't modify when trying to delte a feature
      toggleCondition: (mapBrowserEvent) => !altKeyAndOptionallyShift(mapBrowserEvent),
      // deleteCondition: () => false,
    });
    this.modifyTrack_.setActive(false);
    this.source_.on('changefeature', (event) => {
      // @ts-ignore FIXME: remove when OL5 definitions are used
      const feature = event.feature;
      if (this.modifyInProgress_) {
        const type = feature.get('type');
        if (type === 'controlPoint') {
          // moving an existing point
          console.assert(this.modifiedControlPoint_ ? this.modifiedControlPoint_ === feature : true);
          this.modifiedControlPoint_ = feature;
        } else if (type === 'segment') {
          // adding a new point to an existing segment
          this.modifiedSegment_ = feature;
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
        const indexOfSegment = this.trackData_.segments_.indexOf(modifiedSegment);
        console.assert(indexOfSegment >= 0);
        const controlPoint = new Feature({
          geometry: new Point(this.lastCoordinates_)
        });
        this.source_.addFeature(controlPoint);
        const removed = this.trackData_.insertControlPointAt(controlPoint, indexOfSegment + 1);
        console.assert(removed);
        this.source_.removeFeature(removed);

        const {before, after} = this.trackData_.getAdjacentSegments(controlPoint);
        console.assert(before && after);
        this.source_.addFeatures([before, after]);

        this.updater_.updateAdjacentSegmentsGeometries(controlPoint).then(() => {
          this.updater_.changeAdjacentSegmentsStyling(controlPoint, '');
          this.updater_.computeAdjacentSegmentsProfile(controlPoint).then(() => this.onTrackChanged_());
        });
      }
      this.modifiedControlPoint_ = this.modifiedSegment_ = null;
    });

    /**
     * @private
     */
    this.deletePoint_ = new Select({
      // only delete if alt-key is being pressed while clicking
      condition: (mapBrowserEvent) => click(mapBrowserEvent) && altKeyAndOptionallyShift(mapBrowserEvent),
      layers: [this.trackLayer_],
    });

    this.deletePoint_.on('select', (feature) => {
      const {deleted, pointBefore, pointAfter, newSegment} = this.trackData_.deleteControlPoint(feature.selected[0]);

      // remove deleted features from source
      deleted.forEach(feature => this.source_.removeFeature(feature));

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
   * @param {string} mode
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

  onTrackHovered_(coordinates) {
    // notify observers
    this.notifyTrackHoverEventListener_(coordinates);
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

  clear() {
    this.source_.clear();
    this.trackData_.clear();
    this.onTrackChanged_();
  }

  /**
   * @param {Array.<ol.Feature>} features
   */
  restoreFeatures(features) {
    this.clear();
    this.trackData_.restoreFeatures(features);
    this.source_.addFeatures(features);
    this.mode_ = '';
    if (this.profiler_) {
      const segments = this.trackData_.getSegments();
      const profileRequests = segments.map(segment => this.profiler_.computeProfile(segment));
      Promise.all(profileRequests).then(() => {
        this.onTrackChanged_();
      });
    } else {
      this.onTrackChanged_();
    }
  }

  /**
   * @param {string=} type
   * @return {Array<ol.Feature>}
   */
  getFeatures(type) {
    const points = this.trackData_.getControlPoints().map((point, index) => {
      const clone = point.clone();
      clone.set('index', index);
      return clone;
    });
    const segments = this.trackData_.getSegments().map((segment, index) => {
      const clone = segment.clone();
      clone.set('index', index);
      return clone;
    });
    if (type === undefined) {
      return [...points, ...segments];
    } else if (type === 'controlPoint') {
      return points;
    } else if (type === 'segment') {
      return segments;
    }
    throw new Error('Unsupported type');
  }


  /**
   * Return the whole track as one line string in a feature.
   * @return {ol.Feature}
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
   * @param {ol.Coordinate} coordinates
   * @private
   */
  notifyTrackHoverEventListener_(coordinates) {
    this.trackHoverEventListeners_.forEach(handler => handler(coordinates));
  }
}

export default TrackManager;
