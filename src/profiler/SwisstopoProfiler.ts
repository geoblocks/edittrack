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
    const geometry = segment.getGeometry();
    if (geometry.getCoordinates().length != 2) {
      throw new Error('SwisstopoProfiler requires a segment with exactly 2 coordinates');
    }
    const geom = this.geojsonFormat.writeGeometry(geometry);

    const request = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `geom=${geom}&sr=2056&offset=1&distinct_points=true`
    });

    const profile = (await request.json()).map(swisstopoToXYZM.bind(null, this.projection));

    // Despite the fact that the distinct_points parameter is set and the passed coordinates
    // must not be modified, the API rounds the coordinates.
    // Therefore, we need to update the first and last coordinates of the profile with the
    // original coordinates.
    profile.at(0).splice(0, 2, ...geometry.getCoordinateAt(0));
    profile.at(-1).splice(0, 2, ...geometry.getCoordinateAt(-1));

    segment.set('profile', profile);
  }
}

function swisstopoToXYZM(projection: ProjectionLike, p: SwisstopoProfileItem): Coordinate {
  return transform([p.easting, p.northing, p.alts.COMB, p.dist], 'EPSG:2056', projection);
}
