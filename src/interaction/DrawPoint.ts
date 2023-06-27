import PointerInteraction from 'ol/interaction/Pointer.js';
import VectorSource from 'ol/source/Vector';
import {DrawEvent} from 'ol/interaction/Draw';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import type MapBrowserEvent from 'ol/MapBrowserEvent';

type DrawPointOptions = {
  source: VectorSource;
  condition: (mapBrowserEvent: MapBrowserEvent<UIEvent>) => boolean;
};

export default class DrawPoint extends PointerInteraction {
  private source: VectorSource;
  private condition: (mapBrowserEvent: MapBrowserEvent<UIEvent>) => boolean;

  constructor(options: DrawPointOptions) {
    super();

    this.source = options.source;
    this.condition = options.condition;
  }

  handleEvent(event: MapBrowserEvent<UIEvent>): boolean {
    if (this.condition(event)) {
      const point = new Feature(new Point(event.coordinate));
      this.dispatchEvent(new DrawEvent('drawend', point));
      this.source.addFeature(point);
      return false;
    }
    return true;
  }
}
