
import TrackManager from '../../src/interaction/TrackManager.ts';
import GraphHopperRouter from '../../src/router/GraphHopperRouter.ts';
import {ExtractFromSegmentProfiler, FallbackProfiler, SwisstopoProfiler} from '../../src/profiler/index.ts';
import {styleRules} from './style';
import {createMap} from './osm';
import {Overlay} from "ol";
import {unByKey} from 'ol/Observable';
import '@geoblocks/elevation-profile';
import SnappedDensifier from '../../src/densifier/SnappedDensifier'

const ROUTING_URL = 'https://graphhopper-all.schweizmobil.ch/route?profile=schmwander&type=json&elevation=true&way_point_max_distance=0&instructions=false&points_encoded=true&details=surface&details=hiking_category&details=structure';



function main() {
  const {map, trackLayer, shadowTrackLayer} = createMap('map');

  const router = new GraphHopperRouter({
    map: map,
    url: ROUTING_URL,
    maxRoutingTolerance: 15,
  });

  const profiler = new FallbackProfiler({
    profilers: [
      new ExtractFromSegmentProfiler({
        projection: map.getView().getProjection()
      }),
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
  const densifier = new SnappedDensifier({
    optimalPointDistance: 10,
    maxPointDistance: 80,
    maxPoints: 9980, // twice the limit for swisstopo calls -> 2 calls
  });
  const trackManager = new TrackManager({
    map: map,
    router: router,
    profiler: profiler,
    trackLayer: trackLayer,
    shadowTrackLayer: shadowTrackLayer,
    style: styleRules,
    deleteCondition: deleteCondition,
    hitTolerance: 10,
    densifier,
    switchPartOnDrag: true,
  });

  window.trackManager = trackManager;

  const profileElement = document.querySelector('#profile');
  profileElement.pointerEvents = false;
  trackManager.addTrackChangeEventListener(() => {
    trackManager.trackData_.assertValid();
    const fullProfile = [];
    let distance = 0;
    for (const segment of trackManager.getSegments()) {
      const profile = segment.get('profile');
      fullProfile.push(...profile.map(c => [c[0], c[1], c[2], c[3] + distance]));
      distance += profile.at(-1).at(3);
    }
    profileElement.lines = [fullProfile];
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
  document.querySelector('#reverse_no_routing').addEventListener('click', () => {
    trackManager.reverse(false);
  });

  const elem = document.createElement('div');
  elem.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" id="i_location" width="24" height="24" viewBox="0 0 24 24">\n' +
      '        <rect id="Rechteck_3117" data-name="Rechteck 3117" width="24" height="24" fill="none"/>\n' +
      '        <path id="icons8-location" d="M12,2.01A7,7,0,0,0,5.008,9c0,4.483,5.967,11.765,6.221,12.072l.771.936.771-.936c.254-.308,6.221-7.589,6.221-12.072A7,7,0,0,0,12,2.01Zm0,2A5,5,0,0,1,16.992,9c0,2.7-3.114,7.357-4.992,9.822C10.122,16.363,7.008,11.713,7.008,9A5,5,0,0,1,12,4.01ZM12,6.5A2.5,2.5,0,1,0,14.5,9,2.5,2.5,0,0,0,12,6.5Z" transform="translate(0.992 -1.01)"/>\n' +
      '      </svg>'
  const poiOverlay  = new Overlay({
    positioning: 'center-center',
    offset: [0, -16],
    position: null,
    element: elem,
  });
  map.addOverlay(poiOverlay);

  document.querySelector('#addPoi').addEventListener('click', () => {
    trackManager.submode = 'addpoi';
    const moveKey = map.on('pointermove', (event) => poiOverlay.setPosition(event.coordinate));
    map.once('click', (event) => {
      event.stopPropagation();
      unByKey(moveKey);
      poiOverlay.setPosition(null);
      trackManager.addPOI(event.coordinate);
    });
  });

  document.querySelector('#createNewPart').addEventListener('click', () => {
    trackManager.createNewPart();
  });
  document.querySelector('#changeActivePart').addEventListener('click', () => {
    const nextPart = (trackManager.activePart() + 1) % trackManager.partsCount();
    trackManager.workOnPart(nextPart);
  });
}

main();
