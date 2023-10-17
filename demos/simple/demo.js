
import TrackManager from '../../src/interaction/TrackManager';
import GraphHopperRouter from '../../src/router/GraphHopper';
import {ExtractFromSegmentProfiler, FallbackProfiler, SwisstopoProfiler} from '../../src/profiler/index';
import Profile from '../../src/Profile.ts';
import {styleFunction} from './style';
import {Style, Circle, Fill} from 'ol/style';
import {createMap} from './osm';
import {Overlay} from "ol";

const ROUTING_URL = 'https://graphhopper-all.schweizmobil.ch/route?vehicle=schmwander&type=json&weighting=fastest&elevation=true&way_point_max_distance=0&instructions=false&points_encoded=true';


function main() {
  const {map, trackLayer, shadowTrackLayer} = createMap('map');

  const router = new GraphHopperRouter({
    map: map,
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
    hitTolerance: 10,
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
  document.querySelector('#addPoi').addEventListener('click', () => {
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
    const onAddListener = () => {
      document.querySelector('#poiForm').style.display = 'block'
      const save = () => {
        trackManager.finishPOIDrawing({name: document.querySelector('#poiNameInput').value})
        document.querySelector('#poiSave').removeEventListener('click', save)
        document.querySelector('#poiForm').style.display = 'none'
      }
      const cancel = () => {
        trackManager.cancelPOIDrawing()
        document.querySelector('#poiCancel').removeEventListener('click', cancel)
        document.querySelector('#poiForm').style.display = 'none'
      }
      document.querySelector('#poiSave').addEventListener('click', save)
      document.querySelector('#poiCancel').addEventListener('click', cancel)
    }
    trackManager.addPOI(poiOverlay, onAddListener)
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
