export {default as TrackManager} from './interaction/TrackManager';

export {default as ExtractFromSegmentProfiler} from './profiler/ExtractFromSegment';
export {default as FallbackProfiler} from './profiler/Fallback';
export {default as SwisstopoProfiler} from './profiler/SwisstopoProfiler';

export {default as GraphHopperRouter} from './router/GraphHopper';
export {default as OSRMRouter} from './router/OSRMRouter';
import proj4 from 'proj4';
import { register } from "ol/proj/proj4";

proj4.defs(
    "EPSG:2056",
    "+proj=somerc +lat_0=46.9524055555556 +lon_0=7.43958333333333 +k_0=1 +x_0=2600000 +y_0=1200000 +ellps=bessel +towgs84=674.374,15.056,405.346,0,0,0,0 +units=m +no_defs +type=crs",
);
register(proj4);
