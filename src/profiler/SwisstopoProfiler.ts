import GeoJSONFormat from 'ol/format/GeoJSON.js';
import {get as getProjection, transform} from 'ol/proj.js';
import type {Coordinate} from 'ol/coordinate';
import type {ProjectionLike} from 'ol/proj.js';
import type Feature from 'ol/Feature.js';
import type LineString from 'ol/geom/LineString.js';
import type {Profiler} from './index';


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
  private projection: ProjectionLike;
  private geojsonFormat: GeoJSONFormat;

  constructor(options: SwisstopoProfilerOptions) {
    this.projection = options.projection;

    console.assert(getProjection('EPSG:2056'), 'Register EPSG:2056 projection first');

    this.geojsonFormat = new GeoJSONFormat({
      dataProjection: 'EPSG:2056',
      featureProjection: this.projection
    });
  }

  async computeProfile(segment: Feature<LineString>): Promise<void> {
    // TODO: round to coordinate to meter precision
    const geom = this.geojsonFormat.writeGeometry(segment.getGeometry());

    const request = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `geom=${geom}&sr=2056&offset=1`
    });
    const profile = await request.json();
    segment.set('profile', profile.map(swisstopoToXYZM.bind(null, this.projection)));
    const profileCoordinates = profile.map(swisstopoToXYZM.bind(null, this.projection));
    // check if there is an undefined altitude in the coordinates
    for (let i = 0, ii = profileCoordinates.length; i < ii; i++) {
      if (profileCoordinates[i][2] === undefined) {
        console.error('undefined altitude', profileCoordinates[i]);
      }
    }
  }
}

function swisstopoToXYZM(projection: ProjectionLike, p: SwisstopoProfileItem): Coordinate {
  return transform([p.easting, p.northing, p.alts.COMB, p.dist], 'EPSG:2056', projection);
}
