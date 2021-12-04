import SwisstopoSource from '@geoblocks/sources/src/Swisstopo.js';
import EPSG_2056, {proj as proj2056} from '@geoblocks/proj/src/EPSG_2056.js';
import TileLayer from 'ol/layer/Tile.js';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import {View, Map as OLMap} from 'ol';
import TrackManager from '../src/interaction/TrackManager.js';
import GraphHopperRouter from '../src/router/GraphHopper.js';
import {ExtractFromSegmentProfiler, FallbackProfiler, SwisstopoProfiler} from '../src/profiler/index.js';
import Profile from '../src/Profile.js';
import {controlPoint, styleFunction} from './style.js';
import {Style, Circle, Fill} from 'ol/style';

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
    style: styleFunction
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

  const map = new OLMap({
    target,
    view,
    layers: [
      bgLayer,
      trackLayer
    ]
  });
  window['mymap'] = map;

  return {map, trackLayer};
}


function main() {
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

  /**
   * @param {MapBrowserEvent} mapBrowserEvent
   * @return {boolean}
   */
  const altKeyAndOptionallyShift = function(mapBrowserEvent) {
    const originalEvent = /** @type {MouseEvent} */ (mapBrowserEvent.originalEvent);
    return originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey);
  };

  // by default there is no delete condition (clickingg on a CP will delete it)
  // but it is still possible to pass a custom deleteCondition
  let deleteCondition = altKeyAndOptionallyShift;
  deleteCondition = undefined;
  const trackManager = new TrackManager({
    map: map,
    router: router,
    profiler: profiler,
    trackLayer: trackLayer,
    style: styleFunction,
    deleteCondition: deleteCondition,
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
  const tmEl = document.querySelector('#trackmode');
  // @ts-ignore
  tmEl.addEventListener('change', evt => trackManager.mode = evt.target.value);

  document.querySelector('#snap').addEventListener('click', () => {
    trackManager.snapping = ! trackManager.snapping;
  });
  document.querySelector('#delete').addEventListener('click', () => {
    trackManager.deleteLastPoint();
  });
  document.querySelector('#clear').addEventListener('click', () => {
    trackManager.clear();
  });

  document.querySelector('#undo').addEventListener('click', () => trackManager.undo());
  document.querySelector('#redo').addEventListener('click', () => trackManager.redo());
  document.querySelector('#getTrackData').addEventListener('click', () => {
    trackManager.getTrackFeature();
    const features = [
      ...trackManager.getControlPoints(),
      ...trackManager.getSegments()
    ];
    trackManager.restoreFeatures(features)
  });
  document.querySelector('#reverse').addEventListener('click', () => {
    trackManager.reverse();
  });

  d3Profile.setTrackHoverStyle(new Style({
    image: new Circle({
      fill: new Fill({
        color: 'blue',
      }),
      radius: 9
    })
  }));
}

main();
