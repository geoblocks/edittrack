import Interaction from 'ol/interaction/Interaction.js';

import Select from 'ol/interaction/Select.js';
import Modify from './TrackInteractionModify.js';
import {click} from 'ol/events/condition.js';
import DrawPoint from './DrawPoint.ts';

/** @typedef {import('ol/source/Vector').default<any>} VectorSource */
/** @typedef {import('ol/MapBrowserEvent').default<any>} MapBrowserEvent */
/** @typedef {import('ol/style/Style').StyleFunction} StyleFunction */
/** @typedef {import("ol/layer/Vector").default<VectorSource>} VectorLayer */
/** @typedef {import('ol/Feature.js').FeatureLike} FeatureLike */

/**
 * @typedef Options
 * @type {Object}
 * @property {import("ol/Map").default} map
 * @property {VectorLayer} trackLayer
 * @property {import('./TrackData').default} trackData
 * @property {StyleFunction} style
 * @property {function(MapBrowserEvent, string): boolean} [deleteCondition] Default is to delete control points and pois on click
 * @property {function(MapBrowserEvent): boolean} [addLastPointCondition] Default is to add a new point on click
 * @property {number} hitTolerance Pixel tolerance for considering the pointer close enough to a segment for snapping.
 */


export default class TrackInteraction extends Interaction {

  /**
   *
   * @param {import("ol/pixel.js").Pixel} pixel
   * @return {FeatureLike|false}
   */
  controlPointOrPOIAtPixel(pixel) {
    return this.getMap().forEachFeatureAtPixel(pixel,
      (f) => {
        const t = f.get('type');
        if (t === 'controlPoint' || t === 'POI') {
          return f;
        }
        return false;
      }, {
      layerFilter: l => l === this.trackLayer_,
    });
  }
  /**
   *
   * @param {VectorSource} source
   * @return {DrawPoint}
   */
  createDrawInteraction(source) {
    const draw = new DrawPoint({
      source: source,
      condition: (event) => this.userAddLastPointCondition_(event) && !this.controlPointOrPOIAtPixel(event.pixel)
    });
    // @ts-ignore too complicate to declare proper events
    draw.on('drawend', (evt) => this.dispatchEvent(evt));
    return draw;
  }

  /**
   *
   * @param {import('./TrackData').default} trackData
   * @param {VectorSource} source
   * @param {StyleFunction} style
   * @param {number} hitTolerance
   * @return {Modify}
   */
  createModifyInteraction(trackData, source, style, hitTolerance) {
    const modify = new Modify({
      trackData: trackData,
      source: source,
      style: style,
      condition: (event) => !this.deleteCondition_(event),
      hitTolerance: hitTolerance,
    });
    source.addFeature(modify.overlayFeature);
    // @ts-ignore too complicate to declare proper events
    modify.on('modifyend', (evt) => this.dispatchEvent(evt));
    return modify;
  }

  /**
   *
   * @param {import('ol/layer/Vector').default<any>} trackLayer
   * @return {Select}
   */
  createSelectInteraction(trackLayer) {
    const select = new Select({
      condition: (event) => this.deleteCondition_(event),
      layers: [trackLayer],
      filter: (feature) => {
        const t = feature.get('type');
        return t === 'controlPoint' || t === 'POI';
      },
    });
    select.on('select', (evt) => this.dispatchEvent(evt));
    return select;
  }

  /**
   * @param {MapBrowserEvent} event
   * @return {boolean}
   */
  deleteCondition_(event) {
    const point = this.controlPointOrPOIAtPixel(event.pixel);
    if (point) {
      return this.userDeleteCondition_(event, point.get('type'));
    }
    return false;
  }

  /**
   *
   * @param {Options} options
   */
  constructor(options) {
    super();

    this.trackLayer_ = options.trackLayer;

    this.userDeleteCondition_ = options.deleteCondition === undefined ? click : options.deleteCondition;
    this.userAddLastPointCondition_ = options.addLastPointCondition === undefined ? click : options.addLastPointCondition;

    const source = options.trackLayer.getSource();
    // FIXME should debounce
    source.on('addfeature', () => requestAnimationFrame(() => this.modifyTrack_.updateSketchFeature()));
    source.on('removefeature', () => requestAnimationFrame(() => this.modifyTrack_.updateSketchFeature()));

    /**
     * @private
     */
    this.drawTrack_ = this.createDrawInteraction(source);

    /**
     * @private
     */
    this.modifyTrack_ = this.createModifyInteraction(options.trackData, source, options.style, options.hitTolerance);

    /**
     * @private
     */
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

  /**
   *
   * @param {boolean} active
   */
  setActive(active) {
    // Hack: the Interaction constructor calls setActive...
    if (this.drawTrack_) {
      this.drawTrack_.setActive(active);
      this.modifyTrack_.setActive(active);
      this.deletePoint_.setActive(active);
    }
    super.setActive(active);
  }
}
