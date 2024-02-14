import VectorSource from 'ol/source/Vector.js';
import VectorLayer from 'ol/layer/Vector.js';
/**
 *
 * @return {VectorLayer}
 */
export function createShadowLayer() {
  return new VectorLayer({
    source: new VectorSource(),
    style: {
      'stroke-color': '#00cc33aa',
      'stroke-width': 6,
    },
  });
}
