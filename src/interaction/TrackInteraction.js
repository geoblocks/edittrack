import Interaction from 'ol/interaction/Interaction.js';

import Draw from 'ol/interaction/Draw.js';
import Select from 'ol/interaction/Select.js';
import Modify from './TrackInteractionModify.js';
import GeometryType from 'ol/geom/GeometryType';
import {click} from 'ol/events/condition.js';

/** @typedef {import('ol/source/Vector').default<any>} VectorSource */
/** @typedef {import('ol/MapBrowserEvent').default<any>} MapBrowserEvent */
/** @typedef {import('ol/style/Style').StyleFunction} StyleFunction */
/** @typedef {import("ol/layer/Vector").default<VectorSource>} VectorLayer */
/** @typedef {import('ol/Feature.js').default<any>} Feature */

/**
 * @typedef Options
 * @type {Object}
 * @property {import("ol/Map").default} map
 * @property {VectorLayer} trackLayer
 * @property {import('./TrackData').default} trackData
 * @property {StyleFunction} style
 * @property {function(MapBrowserEvent): boolean} [deleteCondition]
 */


export default class TrackInteraction extends Interaction {

  /**
   *
   * @param {import("ol/pixel.js").Pixel} pixel
   * @return {Feature}
   */
  controlPointAtPixel(pixel) {
    // @ts-ignore false cast error
    return this.getMap().forEachFeatureAtPixel(pixel,
      (f) => {
        if (f.get('type') === 'controlPoint') {
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
   * @param {StyleFunction} style
   * @return {Draw}
   */
  createDrawInteraction(source, style) {
    const draw = new Draw({
      type: GeometryType.POINT,
      source: source,
      style: style,
      // don't draw when deleteCondition is true
      // without condition, don't draw then there is a control point at this pixel
      condition: (event) => this.deleteCondition_ ?
       !this.deleteCondition_(event) : !this.controlPointAtPixel(event.pixel) // FIXME: analyze performance
    });
    draw.on('drawend', (evt) => {
      this.dispatchEvent(evt);
      this.modifyTrack_.updateSketchFeature();
    });
    return draw;
  }

  /**
   *
   * @param {import('./TrackData').default} trackData
   * @param {VectorSource} source
   * @param {StyleFunction} style
   * @return {Modify}
   */
  createModifyInteraction(trackData, source, style) {
    const modify = new Modify({
      trackData: trackData,
      source: source,
      style: style,
      condition: (event) => !this.deleteCondition_ || !this.deleteCondition_(event),
    });
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
      // only delete if alt-key is being pressed while clicking
      condition: (mapBrowserEvent) =>
        click(mapBrowserEvent) &&
        (!this.deleteCondition_ || this.deleteCondition_(mapBrowserEvent)),
      layers: [trackLayer],
      filter: (feature) => feature.get('type') === 'controlPoint',
    });
    select.on('select', (evt) => this.dispatchEvent(evt));
    return select;
  }

  /**
   *
   * @param {Options} options
   */
  constructor(options) {
    super();

    this.trackLayer_ = options.trackLayer;
    this.deleteCondition_ = options.deleteCondition;

    const source = options.trackLayer.getSource();

    /**
     * @private
     */
    this.drawTrack_ = this.createDrawInteraction(source, options.style);

    /**
     * @private
     */
    this.modifyTrack_ = this.createModifyInteraction(options.trackData, source, options.style);

    /**
     * @private
     */
    this.deletePoint_ = this.createSelectInteraction(options.trackLayer);

    this.setActive(false);

    // for simplicity we directly register the interactions
    // The draw interaction must be added after the modify
    // otherwise clicking on an existing segment or point doesn't add a new point
    const map = options.map;
    this.setMap(map);
    map.addInteraction(this.deletePoint_);
    map.addInteraction(this.modifyTrack_);
    map.addInteraction(this.drawTrack_);
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
