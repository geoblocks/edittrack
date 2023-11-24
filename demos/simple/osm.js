import EPSG_2056, {proj as proj2056} from '@geoblocks/proj/src/EPSG_2056';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {View, Map as OLMap} from 'ol';

import {styleRules} from './style';
import {transform, transformExtent} from 'ol/proj';
import {createShadowLayer} from './shadowtrack';


export function createMap(target) {
  const trackSource = new VectorSource();
  const trackLayer = new VectorLayer({
    source: trackSource,
    style: styleRules,
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
