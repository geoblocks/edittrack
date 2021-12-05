import EPSG_2056, {proj as proj2056} from '@geoblocks/proj/src/EPSG_2056.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import {View, Map as OLMap} from 'ol';

import {styleFunction} from './style.js';
import {transform, transformExtent} from 'ol/proj.js';
import {createShadowLayer} from './shadowtrack.js';


export function createMap(target) {
  const trackSource = new VectorSource();
  const trackLayer = new VectorLayer({
    source: trackSource,
    style: styleFunction,
  });

  const extent = transformExtent(proj2056.getExtent(), EPSG_2056, 'EPSG:3857');
  const view = new View({
    extent: extent,
    center: transform([2532661.0, 1151654.0], EPSG_2056, 'EPSG:3857'),
    zoom: 10,
  });

  const bgLayer = new TileLayer({
    source: new OSM()
  });

  const shadowTrackLayer = createShadowLayer();
  const map = new OLMap({
    target,
    view,
    layers: [
      bgLayer,
      shadowTrackLayer,
      trackLayer
    ]
  });
  window['mymap'] = map;

  return {map, trackLayer, shadowTrackLayer};
}
