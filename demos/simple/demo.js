
import TrackManager from '../../src/interaction/TrackManager';
import GraphHopperRouter from '../../src/router/GraphHopper';
import {ExtractFromSegmentProfiler, FallbackProfiler, SwisstopoProfiler} from '../../src/profiler/index';
import Profile from '../../src/Profile';
import {styleFunction} from './style';
import {Style, Circle, Fill} from 'ol/style';
import {createMap} from './osm';

const ROUTING_URL = 'https://graphhopper-all.schweizmobil.ch/route?vehicle=schmwander&type=json&weighting=fastest&elevation=true&way_point_max_distance=0&instructions=false&points_encoded=true';


function main() {
  const {map, trackLayer, shadowTrackLayer} = createMap('map');

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
  const altKeyAndOptionallyShift = function (mapBrowserEvent) {
    const originalEvent = /** @type {MouseEvent} */ (mapBrowserEvent.originalEvent);
    return originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey);
  };

  // by default there is no delete condition (clicking on a CP will delete it)
  // but it is still possible to pass a custom deleteCondition
  let deleteCondition = altKeyAndOptionallyShift;
  deleteCondition = undefined;
  const trackManager = new TrackManager({
    map: map,
    router: router,
    profiler: profiler,
    trackLayer: trackLayer,
    shadowTrackLayer: shadowTrackLayer,
    style: styleFunction,
    deleteCondition: deleteCondition,
  });

  window.trackManager = trackManager;

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
  tmEl.addEventListener('change', evt => trackManager.mode = evt.target.value);

  document.querySelector('#snap').addEventListener('click', () => {
    trackManager.snapping = !trackManager.snapping;
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
      ...trackManager.getSegments(),
      ...trackManager.getPOIs(),
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
