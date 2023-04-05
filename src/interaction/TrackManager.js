import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';

import TrackData from './TrackData.js';
import TrackUpdater from './TrackUpdater.js';
import TrackInteraction from './TrackInteraction.js';
import HistoryManager from './HistoryManager.js';

import {findClosestPointInLines} from './closestfinder.js';

import {debounce, setZ} from './util.js';


/** @typedef {import('ol/geom/LineString').default} LineString */
/** @typedef {import('ol/source/Vector').default<any>} VectorSource */
/** @typedef {import('ol/MapBrowserEvent').default<any>} MapBrowserEvent */
/** @typedef {import('ol/style/Style').StyleFunction} StyleFunction */
/** @typedef {import('./closestfinder').ClosestPoint} ClosestPoint */
/** @typedef {import("ol/layer/Vector").default<VectorSource>} VectorLayer */

/** @typedef {'edit'|''} TrackMode */

/**
 * @typedef Options
 * @type {Object}
 * @property {import("ol/Map").default} map
 * @property {VectorLayer} trackLayer
 * @property {VectorLayer} [shadowTrackLayer]
 * @property {geoblocks.Router} router
 * @property {geoblocks.Profiler} profiler
 * @property {StyleFunction} style
 * @property {function(MapBrowserEvent): boolean} [deleteCondition]
 */


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
     * @type {import("ol/source/Vector").default<any>}
     * @private
     */
    this.source_ = options.trackLayer.getSource();

    /**
     * @type {VectorLayer}
     * @private
     */
    this.trackLayer_ = options.trackLayer;

    /**
     * @type {VectorLayer}
     * @private
     */
    this.shadowTrackLayer_ = options.shadowTrackLayer;

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

    this.interaction_ = new TrackInteraction({
      style: options.style,
      trackData: this.trackData_,
      trackLayer: this.trackLayer_,
      map: this.map_,
      deleteCondition: options.deleteCondition,
    });

    // Hack to test profile synchro
    // this.closestPointGeom_ = new Point([0, 0]);
    // this.interaction_.modifyTrack_.overlay_.getSource().addFeature(new Feature({
    //   geometry: this.closestPointGeom_,
    //   type: 'controlPoint',
    //   subtype: 'first',
    // }));

    /**
     * @type {HistoryManager<Feature<Point|LineString>[]>}
     */
    this.history_ = new HistoryManager();

    /**
     * @type {boolean}
     */
    this.historyChanged_ = false;

    this.addTrackChangeEventListener(() => {
      const segments = this.getSegments();
      if (!this.historyChanged_) {
        const controlPoints = this.getControlPoints();
        const pois = this.getPOIs();
        this.history_.add([...segments, ...controlPoints, ...pois]);
      } else {
        // skip the update, it originated from a undo or redo.
        this.historyChanged_ = false;
      }
    });

    // @ts-ignore too complicate to declare proper events
    this.interaction_.on('drawend',
    /**
     *
     * @param {import ('ol/interaction/Draw').DrawEvent} event
     */
    (event) => {
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
     * @type {boolean}
     */
    this.modifyInProgress_ = false;

    const debouncedMapToProfileUpdater = debounce(
      /**
       *
       * @param {import('ol/coordinate').Coordinate} coordinate
       * @param {boolean} hover
       */
      (coordinate, hover) => {
      if (hover && this.trackData_.getSegments().length > 0) {
        const segments = this.trackData_.getSegments().map(feature => feature.getGeometry());
        const best = findClosestPointInLines(segments, coordinate, {tolerance: 1, interpolate: true});
        this.onTrackHovered_(best);
      } else {
        this.onTrackHovered_(undefined);
      }
    }, 10);

    this.map_.on('pointermove', (event) => {
      const hover = this.map_.hasFeatureAtPixel(event.pixel, {
        layerFilter: l => l === options.trackLayer,
        hitTolerance: 20,
      });
      const cursor = (this.interaction_.getActive() && hover) ? 'pointer' : '';
      if (this.map_.getTargetElement().style.cursor !== cursor) {
        this.map_.getTargetElement().style.cursor = cursor;
      }
      if (!this.interaction_.getActive()) {
        debouncedMapToProfileUpdater(event.coordinate, hover);
      }
    });

    // @ts-ignore too complicate to declare proper events
    this.interaction_.on('modifyend',
    /**
     *
     * @param {import ('./TrackInteractionModify').ModifyEvent} event
     */
    (event) => {
      const feature = event.feature;
      const type = feature.get('type');

      if (type === 'POI') {
        this.onTrackChanged_();
      } else if (type === 'controlPoint') {
        this.updater_.updateAdjacentSegmentsGeometries(feature).then(() => {
          this.updater_.changeAdjacentSegmentsStyling(feature, '');
          this.updater_.computeAdjacentSegmentsProfile(feature).then(() => this.onTrackChanged_());
        });
      } else if (type === 'segment') {
        const indexOfSegment = this.trackData_.getSegments().indexOf(feature);

        console.assert(indexOfSegment >= 0);
        const controlPoint = /** @type {Feature<Point>} */ (new Feature({
          geometry: new Point(event.coordinate)
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
    });

    // @ts-ignore too complicate to declare proper events
    this.interaction_.on('select',
    /**
     *
     * @param {import ('ol/interaction/Select').SelectEvent} event
     */
    (event) => {
      const selected = /** @type {Feature<Point>} */ (event.selected[0]);
      console.assert(selected.getGeometry().getType() === 'Point');
      const type = selected.get('type');
      if (type === 'POI') {
        this.trackData_.deletePOI(selected);
        this.source_.removeFeature(selected);
        this.onTrackChanged_();
      } else {
        // control point
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
      }

      // unselect deleted feature
      this.interaction_.clearSelected();
    });
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
    const edit = mode === 'edit';
    if (edit) {
      if (this.shadowTrackLayer_) {
        this.shadowTrackLayer_.getSource().addFeatures(
          this.source_.getFeatures().map(f => f.clone())
        );
      }
    } else {
      this.history_.clear();
      if (this.shadowTrackLayer_) {
        this.shadowTrackLayer_.getSource().clear();
      }
    }
    this.interaction_.setActive(edit);
    this.mode_ = mode || '';
  }

  onTrackChanged_() {
    // notify observers
    this.notifyTrackChangeEventListeners_();
  }

  /**
   * @param {ClosestPoint} point
   */
  onTrackHovered_(point) {
    // notify observers
    // if (point) {
    //   this.closestPointGeom_.setCoordinates(point.coordinates);
    // }
    this.notifyTrackHoverEventListener_(point?.distanceFromStart);
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
   * @param {Array<Feature<Point|LineString>>} features
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
    getPOIs() {
      return this.trackData_.getPOIs().map(point => point.clone());
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
   * @return {Feature<LineString>}
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


  /**
   * Undo one drawing step
   */
   undo() {
    if (this.mode === 'edit') {
      const features = this.history_.undo();
      if (features) {
        this.restoreFeatures(features.map(feature => feature.clone()));
        this.historyChanged_ = true;
      } else {
        this.clear();
      }
    }
  }

  /**
   * Redo one drawing step
   */
  redo() {
    if (this.mode === 'edit') {
      const features = this.history_.redo();
      if (features) {
        this.restoreFeatures(features.map(feature => feature.clone()));
        this.historyChanged_ = true;
      }
    }
  }
}

export default TrackManager;
