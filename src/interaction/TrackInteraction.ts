import Interaction from 'ol/interaction/Interaction.js';

import Select from 'ol/interaction/Select.js';
import Modify from './TrackInteractionModify';
import {click} from 'ol/events/condition.js';
import DrawPoint from './DrawPoint';
import {FALSE} from 'ol/functions';
import type {Feature, Map, MapBrowserEvent} from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import TrackData from './TrackData';
import type {StyleLike} from 'ol/style/Style';
import type {FlatStyleLike} from 'ol/style/flat';
import type {Pixel} from 'ol/pixel';
import type {FeatureType} from './TrackData';
import {Point} from 'ol/geom';
import {containsCoordinate} from 'ol/extent.js';
import {Extent} from "ol/extent";
import {Coordinate} from "ol/coordinate.js";

export interface Options {
  map: Map;
  trackLayer: VectorLayer<VectorSource>
  trackData: TrackData
  style: StyleLike | FlatStyleLike

  /**
   * Default is to delete control points and pois on click
   */
  deleteCondition?: (mbe: MapBrowserEvent<UIEvent>, type: FeatureType) => boolean;
  /**
   * Default is to add a new point on click
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
   * Drawing outside extent will not be possible
   */
  drawExtent?: Extent;
}


export default class TrackInteraction extends Interaction {

  private trackLayer_: VectorLayer<VectorSource>;
  private drawExtent_?: Extent;
  pointerOutListener?: () => void;
  pointerOverListener?: () => void;

  /**
   * Default is to delete control points and pois on click
   */
  private userDeleteCondition_?: Options['deleteCondition'];
  /**
   * Default is to add a new point on click
   */
  private userAddLastPointCondition_?: Options['addLastPointCondition'];
  /**
   * In addition to the drag sequence, an optional condition to add a new control point to the track. Default is never.
   */
  private userAddControlPointCondition_?: Options['addControlPointCondition'];

  private drawTrack_: DrawPoint;
  private modifyTrack_: Modify;
  private deletePoint_: Select;

  controlPointOrPOIAtPixel(pixel: Pixel): Feature<Point>|false {
    return this.getMap().forEachFeatureAtPixel(pixel,
      (f) => {
        const t = f.get('type') as FeatureType;
        if (t === 'controlPoint' || t === 'POI') {
          console.assert(f.getGeometry().getType() === 'Point');
          return f as Feature<Point>;
        }
        return false;
      }, {
      layerFilter: l => l === this.trackLayer_,
    });
  }

  pixelAtDrawingExtent(coordinate: Coordinate): boolean {
    if (!this.drawExtent_?.length) return true;
    return containsCoordinate(this.drawExtent_, coordinate);
  }

  createDrawInteraction(source: VectorSource): DrawPoint {
    const draw = new DrawPoint({
      source: source,
      condition: (event) => this.pixelAtDrawingExtent(event.coordinate) && this.userAddLastPointCondition_(event) && !this.controlPointOrPOIAtPixel(event.pixel)
    });
    // @ts-ignore too complicate to declare proper events
    draw.on('drawend', (evt) => this.dispatchEvent(evt));
    return draw;
  }

  createModifyInteraction(trackData: TrackData, source: VectorSource, style: StyleLike | FlatStyleLike, hitTolerance: number): Modify {
    const modify = new Modify({
      trackData: trackData,
      source: source,
      style: style,
      condition: (event) => this.pixelAtDrawingExtent(event.coordinate) && !this.deleteCondition_(event),
      addControlPointCondition: (event) => this.pixelAtDrawingExtent(event.coordinate) && this.userAddControlPointCondition_(event),
      sketchPointCondition: (event) => this.pixelAtDrawingExtent(event.coordinate),
      hitTolerance: hitTolerance,
    });
    // @ts-ignore too complicate to declare proper events
    modify.on('modifystart', () => {
      source.addFeature(modify.overlayFeature);
    });
    // @ts-ignore too complicate to declare proper events
    modify.on('modifyend', (evt) => {
      source.removeFeature(modify.overlayFeature);
      this.dispatchEvent(evt);
    });
    return modify;
  }


  createSelectInteraction(trackLayer: VectorLayer<VectorSource>): Select {
    const select = new Select({
      condition: (event) => this.deleteCondition_(event),
      layers: [trackLayer],
      filter: (feature) => {
        const t = feature.get('type') as FeatureType;
        return t === 'controlPoint' || t === 'POI';
      },
    });
    select.on('select', (evt) => this.dispatchEvent(evt));
    return select;
  }


  deleteCondition_(event: MapBrowserEvent<UIEvent>): boolean {
    const point = this.controlPointOrPOIAtPixel(event.pixel);
    if (point) {
      return this.userDeleteCondition_(event, point.get('type'));
    }
    return false;
  }


  constructor(options: Options) {
    super();

    this.trackLayer_ = options.trackLayer;
    this.drawExtent_ = options.drawExtent;

    this.pointerOutListener = () => {
      this.modifyTrack_.pointAtCursorFeature.set("type", undefined);
    };

    this.pointerOverListener = () => {
      this.modifyTrack_.pointAtCursorFeature.set("type", "sketch");
    };

    this.userDeleteCondition_ = options.deleteCondition === undefined ? click : options.deleteCondition;
    this.userAddLastPointCondition_ = options.addLastPointCondition === undefined ? click : options.addLastPointCondition;
    this.userAddControlPointCondition_ = options.addControlPointCondition === undefined ? FALSE : options.addControlPointCondition;

    const source = options.trackLayer.getSource();
    // FIXME should debounce
    source.on('addfeature', () => requestAnimationFrame(() => this.modifyTrack_.updateSketchFeature()));
    source.on('removefeature', () => requestAnimationFrame(() => this.modifyTrack_.updateSketchFeature()));

    this.drawTrack_ = this.createDrawInteraction(source);
    this.modifyTrack_ = this.createModifyInteraction(options.trackData, source, options.style, options.hitTolerance);
    this.deletePoint_ = this.createSelectInteraction(options.trackLayer);

    this.setActive(false);

    // for simplicity we directly register the interactions
    // The draw interaction must be added after the modify
    // otherwise clicking on an existing segment or point doesn't add a new point
    // The delete interaction must be added after the draw otherwise the draw is not passing
    // the double click event to the delete interaction.
    const map = options.map;
    this.setMap(map);
    map.addInteraction(this.modifyTrack_);
    map.addInteraction(this.drawTrack_);
    map.addInteraction(this.deletePoint_);
  }

  clearSelected() {
    this.deletePoint_.getFeatures().clear();
  }

  addMapInOutEventListeners(mapElement: HTMLElement) {
    mapElement.addEventListener("pointerout", this.pointerOutListener);
    mapElement.addEventListener("pointerover", this.pointerOverListener);
  }

  removeMapInOutEventListeners(mapElement: HTMLElement) {
    mapElement.removeEventListener("pointerout", this.pointerOutListener);
    mapElement.removeEventListener("pointerover", this.pointerOverListener);
  }

  setActive(active: boolean) {
    // Hack: the Interaction constructor calls setActive...
    if (this.drawTrack_) {
      this.drawTrack_.setActive(active);
      this.modifyTrack_.setActive(active);
      this.deletePoint_.setActive(active);

      this.trackLayer_.getSource().changed();
    }
    super.setActive(active);
  }
}
