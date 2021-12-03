import Interaction from 'ol/interaction/Interaction.js';

import Draw from 'ol/interaction/Draw.js';
import Select from 'ol/interaction/Select.js';
import Modify from './TrackInteractionModify.js';
import GeometryType from 'ol/geom/GeometryType';
import {click} from 'ol/events/condition.js';


/**
 * @param {import("ol/MapBrowserEvent").default<any>} mapBrowserEvent
 * @return {boolean}
 */
const altKeyAndOptionallyShift = function(mapBrowserEvent) {
  const originalEvent = /** @type {MouseEvent} */ (mapBrowserEvent.originalEvent);
  return originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey);
};


export default class TrackInteraction extends Interaction {

  createDrawInteraction(source, style) {
    const draw = new Draw({
      type: GeometryType.POINT,
      source: source,
      style: style,
      // don't draw when trying to delete a feature
      condition: (mapBrowserEvent) => !altKeyAndOptionallyShift(mapBrowserEvent),
    });
    draw.on('drawend', (evt) => this.dispatchEvent(evt));
    return draw;
  }

  createModifyInteraction(trackData, source, style) {
    const modify = new Modify({
      trackData: trackData,
      source: source,
      style: style,
      // don't modify when trying to delete a feature
      condition: (mapBrowserEvent) => !altKeyAndOptionallyShift(mapBrowserEvent),
      // deleteCondition: () => false,
    });
    modify.on('modifyend', (evt) => this.dispatchEvent(evt));
    return modify;
  }

  createSelectInteraction(trackLayer) {
    const select = new Select({
      // only delete if alt-key is being pressed while clicking
      condition: (mapBrowserEvent) => click(mapBrowserEvent) && altKeyAndOptionallyShift(mapBrowserEvent),
      layers: [trackLayer],
      filter: (feature) => feature.get('type') === 'controlPoint',
    });
    select.on('select', (evt) => this.dispatchEvent(evt));
    return select;
  }

  constructor(options) {
    super();

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
    map.addInteraction(this.modifyTrack_);
    map.addInteraction(this.drawTrack_);
    map.addInteraction(this.deletePoint_);
  }

  clearSelected() {
    this.deletePoint_.getFeatures().clear();
  }

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