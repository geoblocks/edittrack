import {Style, Stroke} from 'ol/style';
import VectorSource from 'ol/source/Vector.js';
import VectorLayer from 'ol/layer/Vector.js';

/**
 * @type {Style}
 */
export const style = new Style({
  stroke: new Stroke({
    color: '#00cc33aa',
    width: 6,
  }),
});

/**
 *
 * @return {VectorLayer}
 */
export function createShadowLayer() {
  const source = new VectorSource();
  const layer = new VectorLayer({source, style});
  return layer;
}
