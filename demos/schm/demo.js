
import TrackManager from '../../src/interaction/TrackManager';
import GraphHopperRouter from '../../src/router/GraphHopper.ts';
import {styleFunction} from './style';
import {createMap} from './swisstopo';
import {getTrack, getPOIs} from './track';
import {doubleClick, singleClick} from 'ol/events/condition';

const ROUTING_URL = 'https://graphhopper-all.schweizmobil.ch/route?vehicle=schmneutral&type=json&weighting=fastest&elevation=true&way_point_max_distance=0&instructions=false&points_encoded=true';


async function main() {

  const {map, trackLayer, shadowTrackLayer} = createMap('map');

  const projection = map.getView().getProjection();
  const router = new GraphHopperRouter({
    map: map,
    url: ROUTING_URL,
    maxRoutingTolerance: 15,
  });

  /**
   * @param {MapBrowserEvent} mapBrowserEvent
   * @param {string} pointType
   * @return {boolean}
   */
  const deleteCondition = function(mapBrowserEvent, pointType) {
    return doubleClick(mapBrowserEvent) && pointType !== 'POI';
  };

  const trackManager = new TrackManager({
    map: map,
    router: router,
    trackLayer: trackLayer,
    shadowTrackLayer: shadowTrackLayer,
    style: styleFunction,
    deleteCondition: deleteCondition,
    addLastPointCondition: singleClick,  // we have to use single click otherwise the double click is not fired
    addControlPointCondition: doubleClick,
    hitTolerance: 15,
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

  trackManager.mode = 'edit';
}

main();
