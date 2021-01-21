import SwisstopoSource from '@geoblocks/sources/src/Swisstopo.js';
import EPSG_2056, {proj as proj2056} from '@geoblocks/proj/src/EPSG_2056.js';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import {View, Map as OLMap} from 'ol';
import TrackManager from '../src/interaction/TrackManager';
import GraphHopperRouter from '../src/router/GraphHopper';
import {ExtractFromSegmentProfiler, FallbackProfiler, SwisstopoProfiler} from '../src/profiler/index';
import Profile from './Profile';


const RESOLUTIONS = [650, 500, 250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1];
const ROUTING_URL = 'https://graphhopper-wander.schweizmobil.ch/route?vehicle=schmwander&type=json&weighting=fastest&elevation=true&way_point_max_distance=0&instructions=false&points_encoded=true';


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


function createSwisstopoMap(target) {
  const trackSource = new VectorSource();
  const trackLayer = new VectorLayer({
    source: trackSource,
  });

  const extent = proj2056.getExtent();
  const view = new View({
    projection: EPSG_2056,
    resolutions: RESOLUTIONS,
    extent: extent,
    center: [2532661.0, 1151654.0],
    zoom: 10,
  });

  const bgLayer = createSwisstopoLayer('ch.swisstopo.pixelkarte-farbe');

  const map = window['mymap'] = new OLMap({
    //controls: [],
    target,
    view,
    layers: [
      bgLayer,
      trackLayer
    ]
  });

  return {map, trackLayer};

}

const {map, trackLayer} = createSwisstopoMap('map');

const router = new GraphHopperRouter({
  url: ROUTING_URL,
  mapProjection: map.getView().getProjection()
});

const profiler = new FallbackProfiler({
  profilers: [
    new ExtractFromSegmentProfiler(),
    new SwisstopoProfiler({
      projection: map.getView().getProjection()
    })
  ]
});


const trackManager = new TrackManager({
  map: map,
  router: router,
  profiler: profiler,
  trackLayer: trackLayer,
  //style: controlPoint
});

/**
 * @type {Profile}
 */
const d3Profile = new Profile({
  map: map,
  profileTarget: '#profile',
});


trackManager.addTrackChangeEventListener(() => {
  const segments = trackManager.getSegments();
  d3Profile.refreshProfile(segments);
});

trackManager.addTrackHoverEventListener((distance) => {
  if (distance !== undefined) {
    d3Profile.highlight(distance);
  } else {
    d3Profile.clearHighlight();
  }
});

trackManager.mode = 'edit';
