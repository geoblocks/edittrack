import SwisstopoSource from '@geoblocks/sources/src/Swisstopo';
import EPSG_2056, {proj as proj2056} from '@geoblocks/proj/src/EPSG_2056';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {View, Map as OLMap} from 'ol';
import {styleFunction} from './style';
import {createShadowLayer} from './shadowtrack';

const RESOLUTIONS = [650, 500, 250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1];


function createSwisstopoLayer(layer, format = 'image/jpeg') {
  const swisstopoLayer = new SwisstopoSource({
    layer,
    format,
    timestamp: 'current',
    projection: EPSG_2056,
    crossOrigin: 'anonymous'
  });
  return new TileLayer({source: swisstopoLayer});
}

export function createMap(target) {
  const trackSource = new VectorSource();
  const trackLayer = new VectorLayer({
    source: trackSource,
    style: styleFunction,
    updateWhileAnimating: true,
    updateWhileInteracting: true,
  });

  const extent = proj2056.getExtent();
  const view = new View({
    projection: EPSG_2056,
    resolutions: RESOLUTIONS,
    extent: extent,
    center: [2532661.0, 1151654.0],
    zoom: 10,
    constrainOnlyCenter: true,
  });

  const bgLayer = createSwisstopoLayer('ch.swisstopo.pixelkarte-farbe');

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
