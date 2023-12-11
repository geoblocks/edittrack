import GeoJSONFormat from 'ol/format/GeoJSON.js';
import {get as getProjection} from 'ol/proj.js';
import type {ProjectionLike} from 'ol/proj.js';
import type Feature from 'ol/Feature.js';
import type LineString from 'ol/geom/LineString.js';
import type {Profiler} from './profiler.d.ts';


// https://api3.geo.admin.ch/services/sdiservices.html#profile

type SwisstopoProfilerOptions = {
  projection: ProjectionLike;
};

type SwisstopoProfileItem = {
  dist: number;
  alts: {COMB: number};
  easting: number;
  northing: number;
};

export default class SwisstopoProfiler implements Profiler {
  private url = 'https://api3.geo.admin.ch/rest/services/profile.json';
  private geojsonFormat: GeoJSONFormat;

  constructor(options: SwisstopoProfilerOptions) {
    const proj = getProjection('EPSG:2056');
    console.assert(!!proj, 'Register projection first');

    this.geojsonFormat = new GeoJSONFormat({
      dataProjection: proj!,
      featureProjection: options.projection
    });
  }

  async computeProfile(segment: Feature<LineString>): Promise<void> {
    const geometry = segment.getGeometry();
    if (segment.get('profile_revision') === geometry.getRevision()) {
      return;
    }
    // TODO: round to coordinate to meter precision
    const geom = this.geojsonFormat.writeGeometry(geometry);

    const request = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `geom=${geom}&sr=2056&offset=1`
    });
    const profile = await request.json();
    segment.set('profile', profile.map(swisstopoToXYZM))
    segment.set('profile_revision', geometry.getRevision());
  }
}
// FIXME: don't compute distance
function swisstopoToXYZM(p: SwisstopoProfileItem): [number, number, number, number] {
  return [p.easting, p.northing, p.alts.COMB, p.dist];
}
