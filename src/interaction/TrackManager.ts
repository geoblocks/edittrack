import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';

import TrackData from './TrackData';
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
import type {Snapper} from 'src/snapper';
import { Densifier } from 'src/densifier';
import {Extent} from "ol/extent";
import {EventsKey} from 'ol/events';
import RenderEvent from "ol/render/Event";
import {unByKey} from "ol/Observable";

export type TrackMode = 'edit' | '';
export type TrackSubMode = 'addpoi' | 'editpoi' | '';

export interface Options {
  map: Map;
  /**
   * Vector layer where the track, control points and POIs are created.
   */
  trackLayer: VectorLayer<VectorSource>
  /**
   * Optional layer to display a shadow of the track has it was when entering edit mode.
   */
  shadowTrackLayer?: VectorLayer<VectorSource>
  /**
   * The router instance to create snapped segments on the network.
   */
  router: Router
  /**
   * The optional snapper instance to snap control points on the network.
   * If this is not provided, the control points will be lazily snapped during segment snapping.
   */
  snapper?: Snapper
  /**
   * The profiler instance to add 3d coordinates to segments.
   */
  profiler: Profiler
  /**
   * The densifier to use to modify the line geometries
   * If not provided, the track will not be densified.
   */
  densifier?: Densifier;
  style: StyleLike | FlatStyleLike;
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

  /**
   * Drawing area extent.
   */
  drawExtent?: Extent;

  /**
   * Drawing mask color. CSS string
   */
  drawMaskColor?: string;
}


export default class TrackManager<POIMeta> {

  private map_: Map;
  get map(): Map {
    return this.map;
  }
  private source_: VectorSource;
  private trackLayer_: VectorLayer<VectorSource>;
  get trackLayer(): VectorLayer<VectorSource> {
    return this.trackLayer_;
  }
  private shadowTrackLayer_: VectorLayer<VectorSource>;
  private hitTolerance_: number;
  public snapping = true;
  private mode_: TrackMode = '';
  private submode_: TrackSubMode = '';
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  private trackChangeEventListeners_: Function[] = [];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  private trackHoverEventListeners_: Function[] = [];
  private trackData_ = new TrackData();
  private router_: Router;
  get router(): Router {
    return this.router_;
  }
  private snapper_: Snapper;
  private densifier_: Densifier | undefined;
  get snapper(): Snapper {
    return this.snapper_;
  }
  private profiler_: Profiler;
  get profiler(): Profiler {
    return this.profiler_;
  }
  private updater_: TrackUpdater;
  private interaction_: TrackInteraction;
  private historyManager_ = new HistoryManager<Feature<Point|LineString>[]>();

  private drawExtent_: Extent | undefined;
  private drawMaskColor_: string = 'rgba(241, 245, 249, 1)';
  private addDrawingMaskKey_: EventsKey | undefined;

  constructor(options: Options) {
    this.map_ = options.map;
    this.source_ = options.trackLayer.getSource();
    this.trackLayer_ = options.trackLayer;
    this.shadowTrackLayer_ = options.shadowTrackLayer;
    this.hitTolerance_ = options.hitTolerance !== undefined ? options.hitTolerance : 20;
    console.assert(!!options.router);

    this.router_ = options.router;
    this.snapper_ = options.snapper;
    this.profiler_ = options.profiler;
    this.densifier_ = options.densifier;
    this.updater_ = new TrackUpdater({
      profiler: this.profiler_,
      densifier: this.densifier_,
      router: this.router_,
      trackData: this.trackData_
    });

    this.drawExtent_ = options.drawExtent;
    if (options.drawMaskColor) {
      this.drawMaskColor_ = options.drawMaskColor;
    }

    this.interaction_ = new TrackInteraction({
      style: options.style,
      trackData: this.trackData_,
      trackLayer: this.trackLayer_,
      map: this.map_,
      deleteCondition: options.deleteCondition,
      addLastPointCondition: options.addLastPointCondition,
      addControlPointCondition: options.addControlPointCondition,
      hitTolerance: this.hitTolerance_,
      drawExtent: options.drawExtent,
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
      // Next line we don't care if the control point will be snapped, or not.
      const {pointFrom, pointTo, segment} = this.trackData_.pushControlPoint(feature);
      if (this.snapping && this.snapper_) {
        await this.snapper_.snapPoint(pointTo);
      }
      if (segment) {
        this.source_.addFeature(segment);
        await this.router_.snapSegment(segment, pointFrom, pointTo);
        this.updater_.equalizeCoordinates(pointFrom);

        if (this.densifier_) this.densifier_.densify(segment);
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
          this.deleteControlPoint(selected);
        }

        // unselect deleted feature
        this.interaction_.clearSelected();
    });
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
      this.map_.once("postrender", () => {
        this.interaction_.addMapInOutEventListeners(this.map_.getViewport());
      });

      if (this.drawExtent_) {
        this.addDrawingMaskKey_ = this.map_.on('postcompose', (evt) => this.addDrawingMask(evt, this.drawExtent_));
      }
    } else {
      this.historyManager_.clear();
      if (this.shadowTrackLayer_) {
        this.shadowTrackLayer_.getSource().clear();
      }
      if (this.map_?.getViewport()) {
        this.interaction_.removeMapInOutEventListeners(this.map_.getViewport());
      }
      if (this.addDrawingMaskKey_) {
        unByKey(this.addDrawingMaskKey_);
        this.addDrawingMaskKey_ = undefined;
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

  async reverse() {
    if (!this.trackData_.hasData()) {
      return;
    }
    this.trackData_.reverse();
    const points = this.trackData_.getControlPoints();
    for (let i = 1, ii = points.length; i < ii; i += 2) {
      const point = points[i];

      this.updater_.changeAdjacentSegmentsStyling(point, 'modifying');
      await this.updater_.updateAdjacentSegmentsGeometries(point, this.snapping)
      this.updater_.changeAdjacentSegmentsStyling(point, '');

      await this.updater_.computeAdjacentSegmentsProfile(point);
    }
    this.trackData_.updatePOIIndexes();
    this.onTrackChanged_();
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
    const parsedFeatures = this.trackData_.parseFeatures(features);
    this.source_.addFeatures(features);
    const profileRequests = parsedFeatures.segments.map((segment) =>
      this.profiler_.computeProfile(segment)
    );
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
   * Delete a control point and notify track change listeners.
   */
  deleteControlPoint(point: Feature<Point>) {
    // control point
    const {deleted, pointBefore, pointAfter, newSegment} = this.trackData_.deleteControlPoint(point);

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

  /**
   * Add new event listener to be notified on track changes.
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  addTrackChangeEventListener(fn: Function) {
    this.trackChangeEventListeners_.push(fn);
  }

  /**
   * Remove registered event listener.
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
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
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  addTrackHoverEventListener(fn: Function) {
    this.trackHoverEventListeners_.push(fn);
  }

  /**
   * Remove registered event listener.
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
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

  get historyEntryCount(): number {
    return this.historyManager_.entryCount();
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

 addDrawingMask(event: RenderEvent, extent: Extent) {
    if (!extent?.length) return;
    const viewport = event.target.getViewport();
    const canvases = viewport.getElementsByTagName('canvas');
    const frameState = event.frameState;
    const viewportWidth = Math.round(frameState.size[0] * frameState.pixelRatio);
    const viewportHeight = Math.round(frameState.size[1] * frameState.pixelRatio);

    const canvas = canvases.item(canvases.length - 1);

    const canvasViewportRatio = (canvas.width / viewportWidth) * frameState.pixelRatio;
    console.assert(
        canvasViewportRatio === (canvas.height / viewportHeight) * frameState.pixelRatio,
    );

   const coordinates = [
     [extent[0], extent[1]], // Bottom-left
     [extent[0], extent[3]], // Top-left
     [extent[2], extent[3]], // Top-right
     [extent[2], extent[1]], // Bottom-right
   ];

   const pixelCoordinates = coordinates.map((coord) => this.map_.getPixelFromCoordinate(coord));

   const width = (pixelCoordinates[3][0] - pixelCoordinates[0][0]) * canvasViewportRatio;
   const height = (pixelCoordinates[1][1] - pixelCoordinates[0][1]) * canvasViewportRatio;


    const context = canvas.getContext('2d');
    context.beginPath();

    // outer rectangle
    context.rect(0, 0, canvas.width, canvas.height);

    // inner rectangle
    context.rect(pixelCoordinates[0][0] * canvasViewportRatio, pixelCoordinates[0][1] * canvasViewportRatio, width, height);

    context.closePath();
    context.fillStyle = this.drawMaskColor_;
    context.fill('evenodd');
  }
}
