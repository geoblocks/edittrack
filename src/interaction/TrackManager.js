import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';

import TrackData from './TrackData.ts';
import TrackUpdater from './TrackUpdater.js';
import TrackInteraction from './TrackInteraction.js';
import HistoryManager from './HistoryManager.ts';

import {findClosestPointInLines} from './closestfinder.ts';

import {debounce, setZ} from './util.ts';


/** @typedef {import('ol/geom/LineString').default} LineString */
/** @typedef {import('ol/source/Vector').default<any>} VectorSource */
/** @typedef {import('ol/MapBrowserEvent').default<any>} MapBrowserEvent */
/** @typedef {import('ol/style/Style').StyleLike} StyleLike */
/** @typedef {import('ol/style/flat').FlatStyleLike} FlatStyleLike */
/** @typedef {import('./closestfinder').ClosestPoint} ClosestPoint */
/** @typedef {import("ol/layer/Vector").default<VectorSource>} VectorLayer */

/** @typedef {'edit'|''} TrackMode */
/** @typedef {'addpoi'|'editpoi'|''} TrackSubMode */

/**
 * @typedef Options
 * @type {Object}
 * @property {import("ol/Map").default} map
 * @property {VectorLayer} trackLayer
 * @property {VectorLayer} [shadowTrackLayer]
 * @property {geoblocks.Router} router
 * @property {geoblocks.Profiler} profiler
 * @property {StyleLike | FlatStyleLike} style
 * @property {function(MapBrowserEvent, string): boolean} [deleteCondition] Condition to remove a point (control point or POI). Default is click.
 * @property {function(MapBrowserEvent): boolean} [addLastPointCondition] Condition to add a new last point to the track. Default is click.
 * @property {function(MapBrowserEvent): boolean} [addControlPointCondition] In addition to the drag sequence, an optional condition to add a new control point to the track. Default is never.
 * @property {number} [hitTolerance=20] Pixel tolerance for considering the pointer close enough to a segment for snapping.
 */

/** @typedef {{name: string, description?: string, img?: File}} PoiMeta */


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
     * @type {number}
     * @private
     */
    this.hitTolerance_ = options.hitTolerance !== undefined ? options.hitTolerance : 20;

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
     * @private
     * @type {TrackSubMode}
     */
    this.submode_ = '';

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
     * @type {Array<Function>}
     * @private
     */
    this.poiAddedEventListeners_ = [];

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
      addLastPointCondition: options.addLastPointCondition,
      addControlPointCondition: options.addControlPointCondition,
      hitTolerance: this.hitTolerance_,
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
    this.historyManager_ = new HistoryManager();

    // @ts-ignore too complicate to declare proper events
    this.interaction_.on('drawend',
    /**
     *
     * @param {import ('ol/interaction/Draw').DrawEvent} event
     */
    async (event) => {
      console.assert(event.feature.getGeometry().getType() === 'Point');
      const feature = /** @type {Feature<Point>} */ (event.feature);
      const {pointFrom, pointTo, segment} = this.trackData_.pushControlPoint(feature);
      if (segment) {
        this.source_.addFeature(segment);
        let snapped = false;
        if (this.snapping) {
          snapped = await this.router_.snapSegment(segment, pointFrom, pointTo);
        }
        await this.profiler_.computeProfile(segment);
        if (!snapped) {
          const segmentProfile = segment.get('profile');
          if (segmentProfile) {
            setZ(segment, segmentProfile[0][2], segmentProfile[segmentProfile.length - 1][2]);
          }
        }
        this.onTrackChanged_();
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
        hitTolerance: this.hitTolerance_,
      });
      const cursor = (this.interaction_.getActive() && hover) ? 'pointer' : '';
      if (this.map_.getTargetElement().style.cursor !== cursor) {
        this.map_.getTargetElement().style.cursor = cursor;
      }
      if (!this.interaction_.getActive()) {
        debouncedMapToProfileUpdater(event.coordinate, hover);
      }
    });

    this.interaction_.on(
      // @ts-ignore too complicate to declare proper events
      'modifyend',
      /**
       *
       * @param {import ('./TrackInteractionModify').ModifyEvent} event
       */
      async (event) => {
        const feature = event.feature;
        const type = feature.get('type');

      if (type === 'POI') {
        this.trackData_.updatePOIIndexes();
        this.onTrackChanged_();
      } else if (type === 'controlPoint') {
        await this.updater_.updateAdjacentSegmentsGeometries(feature);
        this.updater_.changeAdjacentSegmentsStyling(feature, '');
        await this.updater_.computeAdjacentSegmentsProfile(feature);
        this.trackData_.updatePOIIndexes();
        this.onTrackChanged_();
      } else if (type === 'segment') {
        const indexOfSegment = this.trackData_.getSegments().indexOf(feature);

        console.assert(indexOfSegment >= 0);
        const controlPoint = new Feature({
          geometry: new Point(event.coordinate)
        });
        this.source_.addFeature(controlPoint);
        const removed = this.trackData_.insertControlPointAt(controlPoint, indexOfSegment + 1);
        console.assert(!!removed);
        this.source_.removeFeature(removed);

        const {before, after} = this.trackData_.getAdjacentSegments(controlPoint);
        console.assert(!!before && !!after);
        this.source_.addFeatures([before, after]);

        await this.updater_.updateAdjacentSegmentsGeometries(controlPoint);
        this.updater_.changeAdjacentSegmentsStyling(controlPoint, '');
        await this.updater_.computeAdjacentSegmentsProfile(controlPoint);
        this.trackData_.updatePOIIndexes();
        this.onTrackChanged_();
      }
    });

    this.interaction_.on(
      // @ts-ignore too complicate to declare proper events
      'select',
      /**
       *
       * @param {import ('ol/interaction/Select').SelectEvent} event
       */
      (event) => {
        event.mapBrowserEvent.stopPropagation();
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
   * @private
   */
  pushNewStateToHistoryManager_() {
    const segments = this.getSegments();
    const controlPoints = this.getControlPoints();
    const pois = this.getPOIs();
    this.historyManager_.add([...segments, ...controlPoints, ...pois]);
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
          this.source_.getFeatures().map(f => {
            const clone = f.clone();
            clone.setId(f.getId());
            return clone;
          })
        );
      }
    } else {
      this.historyManager_.clear();
      if (this.shadowTrackLayer_) {
        this.shadowTrackLayer_.getSource().clear();
      }
    }
    this.interaction_.setActive(edit);
    this.mode_ = mode || '';
    this.render();
  }

  /**
   * @return {TrackSubMode} submode
   */
  get submode() {
    return this.submode_;
  }

  /**
   * @param {TrackSubMode} submode
   */
  set submode(submode) {
    this.interaction_.setActive(!submode && this.mode === 'edit');
    this.submode_ = submode || '';
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
      if (this.trackData_.getControlPoints().length > 0) {
        const deletedFeatures = this.trackData_.deleteLastControlPoint();
        deletedFeatures.forEach(feature => this.source_.removeFeature(feature));
        this.onTrackChanged_();
      }
    }
  }

  reverse() {
    if (!this.trackData_.getSegments().length) {
      return;
    }
    this.trackData_.reverse();
    const points = this.trackData_.getControlPoints();
    for (let i = 1, ii = points.length; i < ii; i += 2) {
      const point = points[i];
      this.updater_.changeAdjacentSegmentsStyling(point, 'modifying');
      this.updater_.updateAdjacentSegmentsGeometries(point)
      .then(() => {
        this.updater_.changeAdjacentSegmentsStyling(point, '');
        this.updater_.computeAdjacentSegmentsProfile(point);
      })
      .then(() => {
        this.trackData_.updatePOIIndexes();
        this.onTrackChanged_()
      });
    }
  }

  /**
   * This function does not trigger track changed events.
   * @private
   */
  clearInternal_() {
    this.source_.clear();
    this.trackData_.clear();
  }

  /**
   */
    clear() {
      if (this.trackData_.hasData()) {
        this.clearInternal_()
        this.onTrackChanged_();
      }
    }

  /**
   * This function does not trigger track changed events.
   * @private
   * @param {Array<Feature<Point|LineString>>} features
   * @return {Promise<any>}
   */
  async restoreFeaturesInternal_(features) {
    // should parse features first, compute profile, and then replace the trackdata and add history
    const parsedFeatures = this.trackData_.parseFeatures(features);
    this.source_.addFeatures(features);
    const profileRequests = parsedFeatures.segments.map(segment => this.profiler_.computeProfile(segment));
    await Promise.all(profileRequests);
    this.trackData_.restoreParsedFeatures(parsedFeatures);
  }

  /**
   * @param {Array<Feature<Point|LineString>>} features
   * @return {Promise<any>}
   */
  async restoreFeatures(features) {
    this.clearInternal_();
    await this.restoreFeaturesInternal_(features);
    this.onTrackChanged_();
  }

  /**
   * @return {Feature<Point>[]}
   */
  getPOIs() {
    return this.trackData_.getPOIs().map((point) => {
      const clone = point.clone();
      clone.setId(point.getId());
      return clone;
    });
  }

  /**
   * @return {Feature<Point>[]}
   */
  getControlPoints() {
    return this.trackData_.getControlPoints().map((point, index) => {
      const clone = point.clone();
      clone.setId(point.getId());
      clone.set('index', index);
      return clone;
    });
  }

  /**
   * @return {Feature<LineString>[]}
   */
  getSegments() {
    return this.trackData_.getSegments().map((segment, index) => {
      const clone = segment.clone();
      clone.setId(segment.getId());
      clone.set('index', index);
      return clone;
    });
  }


  /**
   * Add a POI and notify track change listeners.
   * @param {number[]} coordinates
   * @param {Object} meta
   */
  addPOI(coordinates, meta) {
    const poi = new Feature({
      geometry: new Point(coordinates),
      type: 'POI',
      meta: meta,
    })
    this.source_.addFeature(poi);
    this.trackData_.addPOI(poi);
    this.trackData_.updatePOIIndexes();
    this.submode = '';
    this.notifyTrackChangeEventListeners_();
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
   * @param {boolean} notifyHistory Whether to notify history manager
   */
  notifyTrackChangeEventListeners_(notifyHistory = true) {
    this.trackChangeEventListeners_.forEach(handler => handler());
    if (notifyHistory) {
      this.pushNewStateToHistoryManager_();
    }
  }

  addManualHistoryEntry() {
    this.notifyTrackChangeEventListeners_();
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
   * @return {number} number of entries in history
   */
  get historySize() {
    return this.historyManager_.size();
  }

  /**
   * @return {number} current position in history
   */
  get historyPosition() {
    return this.historyManager_.position();
  }

  /**
   * Undo one drawing step
   */
  async undo() {
    if (this.mode === 'edit') {
      const features = this.historyManager_.undo();
      this.clearInternal_();
      if (features) {
        await this.restoreFeaturesInternal_(features.map(feature => {
          const clone = feature.clone();
          clone.setId(feature.getId());
          return clone;
        }
        ));
        this.notifyTrackChangeEventListeners_(false);
      }
    }
  }

  /**
   * Redo one drawing step
   */
  async redo() {
    if (this.mode === 'edit') {
      const features = this.historyManager_.redo();
      this.clearInternal_();
      if (features) {
        await this.restoreFeaturesInternal_(features.map(feature => {
          const clone = feature.clone();
          clone.setId(feature.getId());
          return clone;
        }));
        this.notifyTrackChangeEventListeners_(false);
      }
    }
  }

  render() {
    this.source_.changed();
    this.shadowTrackLayer_.getSource().changed();
  }
}

export default TrackManager;
