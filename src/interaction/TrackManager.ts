import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';

import TrackData, {parseFeatures} from './TrackData';
import TrackUpdater from './TrackUpdater';
import TrackInteraction from './TrackInteraction';
import HistoryManager from './HistoryManager';

import {ClosestPoint, findClosestPointInLines} from './closestfinder';

import {debounce} from './util';
import {Map, MapBrowserEvent} from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Router} from '../router/index';
import {Profiler} from '../profiler/index';
import type {StyleLike} from 'ol/style/Style';
import type {FlatStyleLike} from 'ol/style/flat';
import {LineString} from 'ol/geom';
import {DrawEvent} from 'ol/interaction/Draw';
import {ModifyEvent} from './TrackInteractionModify';
import {SelectEvent} from 'ol/interaction/Select';
import type {Coordinate} from 'ol/coordinate';
import type {FeatureType} from './TrackData';

export type TrackMode = 'edit' | '';
export type TrackSubMode = 'addpoi' | 'editpoi' | '';

export interface Options {
  map: Map;
  trackLayer: VectorLayer<VectorSource>
  shadowTrackLayer?: VectorLayer<VectorSource>
  router: Router
  profiler: Profiler
  style: StyleLike | FlatStyleLike
  /**
   * Condition to remove a point (control point or POI). Default is click.
   */
  deleteCondition?: (mbe: MapBrowserEvent<UIEvent>, type: string) => boolean;
  /**
   * Condition to add a new last point to the track. Default is click.
   */
  addLastPointCondition?: (mbe: MapBrowserEvent<UIEvent>) => boolean;
  /**
   * In addition to the drag sequence, an optional condition to add a new control point to the track. Default is never.
   */
  addControlPointCondition?: (mbe: MapBrowserEvent<UIEvent>) => boolean;

  /**
   * Pixel tolerance for considering the pointer close enough to a segment for snapping.
   */
  hitTolerance: number;
}


export default class TrackManager<POIMeta> {

  private map_: Map;
  private source_: VectorSource;
  private trackLayer_: VectorLayer<VectorSource>;
  private shadowTrackLayer_: VectorLayer<VectorSource>;
  private hitTolerance_: number;
  public snapping = true;
  private mode_: TrackMode = '';
  private submode_: TrackSubMode = '';
  // eslint-disable-next-line @typescript-eslint/ban-types
  private trackChangeEventListeners_: Function[] = [];
  // eslint-disable-next-line @typescript-eslint/ban-types
  private trackHoverEventListeners_: Function[] = [];
  private trackData_ = new TrackData();
  private router_: Router;
  private profiler_: Profiler;
  private updater_: TrackUpdater;
  private interaction_: TrackInteraction;
  private historyManager_ = new HistoryManager<Feature<Point|LineString>[]>();

  constructor(options: Options) {
    this.map_ = options.map;
    this.source_ = options.trackLayer.getSource();
    this.trackLayer_ = options.trackLayer;
    this.shadowTrackLayer_ = options.shadowTrackLayer;
    this.hitTolerance_ = options.hitTolerance !== undefined ? options.hitTolerance : 20;
    console.assert(!!options.router);

    this.router_ = options.router;
    this.profiler_ = options.profiler;
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


    // Add a control point at the end of the track
    // @ts-ignore too complicate to declare proper events
    this.interaction_.on('drawend',
    async (event: DrawEvent) => {
      console.assert(event.feature.getGeometry().getType() === 'Point');
      const feature = (event.feature as Feature<Point>);
      if (!this.snapping) {
        feature.set('snapped', false);
      }
      const {pointFrom, pointTo, segment} = this.trackData_.pushControlPoint(feature);
      if (segment) {
        this.source_.addFeature(segment);
        await this.router_.snapSegment(segment, pointFrom, pointTo);
        this.updater_.equalizeCoordinates(pointFrom);
        await this.profiler_.computeProfile(segment);
        // FIXME: setZ ?
        this.onTrackChanged_();
      }
    });


    const debouncedMapToProfileUpdater = debounce(
      (coordinate: Coordinate, hover: boolean) => {
      if (hover && this.trackData_.getSegments().length > 0) {
        const segments = this.trackData_.getSegments().map(feature => feature.get('profile'));
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
      if (!this.interaction_.getActive() && this.trackHoverEventListeners_.length > 0) {
        debouncedMapToProfileUpdater(event.coordinate, hover);
      }
    });

    // Move an existing poi, control point or segment
    this.interaction_.on(
      // @ts-ignore too complicate to declare proper events
      'modifyend',
      async (event: ModifyEvent) => {
        const type = event.feature.get('type') as FeatureType;

        if (type === 'POI') {
          this.trackData_.updatePOIIndexes();
          this.onTrackChanged_();
        } else if (type === 'controlPoint') {
          const feature = event.feature as Feature<Point>;
          await this.updater_.updateAdjacentSegmentsGeometries(feature, this.snapping);
          this.updater_.changeAdjacentSegmentsStyling(feature, '');
          await this.updater_.computeAdjacentSegmentsProfile(feature);
          this.trackData_.updatePOIIndexes();
          this.onTrackChanged_();
        } else if (type === 'segment') {
          const feature = event.feature as Feature<LineString>;
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

          await this.updater_.updateAdjacentSegmentsGeometries(controlPoint, this.snapping);
          this.updater_.changeAdjacentSegmentsStyling(controlPoint, '');
          await this.updater_.computeAdjacentSegmentsProfile(controlPoint);
          this.trackData_.updatePOIIndexes();
          this.onTrackChanged_();
        }
    });

    // Delete a control point or a POI
    this.interaction_.on(
      // @ts-ignore too complicate to declare proper events
      'select',
      (event: SelectEvent) => {
        event.mapBrowserEvent.stopPropagation();
        const selected = event.selected[0] as Feature<Point>;
        console.assert(selected.getGeometry().getType() === 'Point');
        const type = selected.get('type') as FeatureType;
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
              geometryUpdates.push(this.updater_.updateAdjacentSegmentsGeometries(pointBefore, this.snapping));
            }
            if (pointAfter) {
              geometryUpdates.push(this.updater_.updateAdjacentSegmentsGeometries(pointAfter, this.snapping));
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

  get map(): Map {
    return this.map;
  }

  get trackLayer(): VectorLayer<VectorSource> {
    return this.trackLayer_;
  }

  get router(): Router {
    return this.router_;
  }

  get profiler(): Profiler {
    return this.profiler_;
  }

  private pushNewStateToHistoryManager_() {
    const segments = this.getSegments();
    const controlPoints = this.getControlPoints();
    const pois = this.getPOIs();
    const features = [...segments, ...controlPoints, ...pois];
    const clonedFeatures = features.map(f => {
      const nf = f.clone();
      nf.setId(f.getId());
      return nf;
    })
    this.historyManager_.add(clonedFeatures);
  }

  get mode(): TrackMode {
    return this.mode_;
  }


  set mode(mode: TrackMode) {
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

  get submode(): TrackSubMode {
    return this.submode_;
  }

  set submode(submode: TrackSubMode) {
    this.interaction_.setActive(!submode && this.mode === 'edit');
    this.submode_ = submode || '';
  }

  onTrackChanged_() {
    // notify observers
    this.notifyTrackChangeEventListeners_();
  }

  onTrackHovered_(point: ClosestPoint) {
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
      this.updater_.updateAdjacentSegmentsGeometries(point, this.snapping)
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
   */
  private clearInternal_() {
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
   */
  private async restoreFeaturesInternal_(features: Feature<Point|LineString>[]): Promise<void> {
    // should parse features first, compute profile, and then replace the trackdata and add history
    const parsedFeatures = parseFeatures(features);
    this.source_.addFeatures(features);
    const profileRequests = parsedFeatures.segments.map(segment => this.profiler_.computeProfile(segment));
    await Promise.all(profileRequests);
    this.trackData_.restoreParsedFeatures(parsedFeatures);
  }

  async restoreFeatures(features: Feature<Point|LineString>[]): Promise<void> {
    this.clearInternal_();
    await this.restoreFeaturesInternal_(features);
    this.onTrackChanged_();
  }

  /**
   * See `addPOI`, `deletePOI`, updatePOIMeta`.
   * The library maintains the POI indexes and geometries so don't modify them.
   * @return the internal POIs as a readonly array
   */
  getPOIs(): readonly Feature<Point>[] {
    return this.trackData_.getPOIs();
  }

  /**
   * The library creates and keeps the control points consistently with the segments.
   * It is generally a bad idea to update control points manually.
   * @return the internal control points as a readonly array
   */
  getControlPoints(): readonly Feature<Point>[] {
    return this.trackData_.getControlPoints();
  }

  /**
   * The library manages the segments together with the control points.
   * It is probably a bad idea to update segments manually.
   * @return the internal segments as a readonly array
   */
  getSegments(): readonly Feature<LineString>[] {
    return this.trackData_.getSegments().map((segment, index) => {
      const clone = segment.clone();
      clone.setId(segment.getId());
      clone.set('index', index);
      return clone;
    });
  }


  /**
   * Add a POI and notify track change listeners.
   */
  addPOI(coordinates: number[], meta: POIMeta) {
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
   * Delete a POI and notify track change listeners.
   */
  deletePOI(index: number) {
    const poi = this.trackData_.getPOIs().find(feature => feature.get('index') === index);
    const feature = this.source_.getFeatures().find(feature => feature.get('type') === 'POI' && feature.get('index') === index);
    this.source_.removeFeature(feature);
    this.trackData_.deletePOI(poi);
    this.trackData_.updatePOIIndexes();
    this.notifyTrackChangeEventListeners_();
  }

  /**
   * Update the meta of a POI given by its index
   */
  updatePOIMeta(index: number, meta: POIMeta) {
    const poi = this.trackData_.getPOIs().find(feature => feature.get('index') === index);
    poi.set('meta', meta);
    this.addManualHistoryEntry();
  }

  /**
   * Add new event listener to be notified on track changes.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  addTrackChangeEventListener(fn: Function) {
    this.trackChangeEventListeners_.push(fn);
  }

  /**
   * Remove registered event listener.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  removeTrackChangeEventListener(fn: Function) {
    this.trackChangeEventListeners_ = this.trackChangeEventListeners_.filter(item => item !== fn);
  }

  /**
   * @param notifyHistory Whether to notify history manager
   */
  private notifyTrackChangeEventListeners_(notifyHistory: boolean = true) {
    if (notifyHistory) {
      this.pushNewStateToHistoryManager_();
    }
    this.trackChangeEventListeners_.forEach(handler => handler());
  }

  addManualHistoryEntry() {
    this.notifyTrackChangeEventListeners_();
  }

  /**
   * Add new event listener to be notified on track hover.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  addTrackHoverEventListener(fn: Function) {
    this.trackHoverEventListeners_.push(fn);
  }

  /**
   * Remove registered event listener.
   */
  // eslint-disable-next-line @typescript-eslint/ban-types
  removeTrackHoverEventListener(fn: Function) {
    this.trackHoverEventListeners_ = this.trackHoverEventListeners_.filter(item => item !== fn);
  }

  private notifyTrackHoverEventListener_(distance: number) {
    this.trackHoverEventListeners_.forEach(handler => handler(distance));
  }

  /**
   * @return number of entries in history
   */
  get historySize(): number {
    return this.historyManager_.size();
  }

  /**
   * @return current position in history
   */
  get historyPosition(): number {
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
          // we need to clone the features, otherwise they could be changed in the history state from outside
          const clone = feature.clone();
          clone.setId(feature.getId());
          return clone;
        }
        ));
      }
      this.notifyTrackChangeEventListeners_(false);
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
          // we need to clone the features, otherwise they could be changed in the history state from outside
          const clone = feature.clone();
          clone.setId(feature.getId());
          return clone;
        }));
      }
      this.notifyTrackChangeEventListeners_(false);
    }
  }

  render() {
    this.source_.changed();
    this.shadowTrackLayer_.getSource().changed();
  }
}