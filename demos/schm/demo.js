
import TrackManager from '../../src/interaction/TrackManager';
import GraphHopperRouter from '../../src/router/GraphHopper';
import {ExtractFromSegmentProfiler, FallbackProfiler, SwisstopoProfiler} from '../../src/profiler/index';
import Profile from '../../src/Profile';
import {styleFunction, profileHover} from './style';
import {createMap} from './swisstopo';
import {getTrack, getPOIs} from './track';
import {doubleClick} from 'ol/events/condition';

const ROUTING_URL = 'https://graphhopper-all.schweizmobil.ch/route?vehicle=schmwander&type=json&weighting=fastest&elevation=true&way_point_max_distance=0&instructions=false&points_encoded=true';


async function main() {

  const {map, trackLayer, shadowTrackLayer} = createMap('map');

  const projection = map.getView().getProjection();
  const router = new GraphHopperRouter({
    url: ROUTING_URL,
    mapProjection: projection,
    maxRoutingDistance: 15,
  });

  const profiler = new FallbackProfiler({
    profilers: [
      new ExtractFromSegmentProfiler(),
      new SwisstopoProfiler({
        projection: projection
      })
    ]
  });

  /**
   * @param {MapBrowserEvent} mapBrowserEvent
   * @param {string} pointType
   * @return {boolean}
   */
  const deleteCondition = function(mapBrowserEvent, pointType) {
    return doubleClick(mapBrowserEvent) && pointType !== 'POI';
  };

  const addLastPointCondition = function(mapBrowserEvent) {
    return doubleClick(mapBrowserEvent);
  };

  const trackManager = new TrackManager({
    map: map,
    router: router,
    profiler: profiler,
    trackLayer: trackLayer,
    shadowTrackLayer: shadowTrackLayer,
    style: styleFunction,
    deleteCondition: deleteCondition,
    addLastPointCondition: addLastPointCondition,
  });

  const search = new URLSearchParams(document.location.search);
  const trackId = search.get('trackId');
  if (trackId) {
    trackManager.restoreFeatures([
      ...await getTrack(trackId, projection),
      ...await getPOIs(trackId, projection),
    ]);
    map.getView().fit(trackLayer.getSource().getExtent(), {
      padding: [50, 50, 50, 50],
    });
  }

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

  d3Profile.setTrackHoverStyle(profileHover);
}

main();
