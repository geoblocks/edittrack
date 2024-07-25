import GeoJSONFormat from 'ol/format/GeoJSON.js';
import {get as getProjection, transform} from 'ol/proj.js';
import type {Coordinate} from 'ol/coordinate';
import type {ProjectionLike} from 'ol/proj.js';
import type Feature from 'ol/Feature.js';
import LineString from 'ol/geom/LineString.js';
import type {Profiler} from './index';
import {densifyTrack} from '../interaction/TrackDensifyer';


// https://api3.geo.admin.ch/services/sdiservices.html#profile
export const MAX_POINTS_PER_REQUEST = 4990; // this is a Swisstopo hard limit

type SwisstopoProfilerOptions = {
  projection: ProjectionLike;
  optimalPointDistance?: number;
  maxPointDistance?: number;
  maxPoints?: number;
  extraDistance?: number;
  nDigits?: number;
  maxRequests?: number;
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
  private optimalPointDistance?: number; 
  private maxPointDistance?: number;
  private maxPoints?: number;
  private extraDistance?: number;
  private coordinateDigits?: number;

  constructor(options: SwisstopoProfilerOptions) {
    this.projection = options.projection;
    this.optimalPointDistance = options.optimalPointDistance;
    this.maxPointDistance = options.optimalPointDistance;
    this.maxPoints = options.maxPoints
    this.extraDistance = options.extraDistance;
    this.coordinateDigits = options.nDigits;

    console.assert(getProjection('EPSG:2056'), 'Register EPSG:2056 projection first');

    this.geojsonFormat = new GeoJSONFormat({
      dataProjection: 'EPSG:2056',
      featureProjection: this.projection
    });
  }

  async computeProfile(segment: Feature<LineString>): Promise<void> {
    const geometry = segment.getGeometry();
    if (this.optimalPointDistance) {
        const coordinates = densifyTrack(
        geometry.getCoordinates(),
        this.optimalPointDistance,
        this.maxPointDistance,
        this.maxPoints,
        this.extraDistance,
        this.coordinateDigits
      );
      geometry.setCoordinates(coordinates);
    }

    const profile = [];
    const geometries = splitGeometry(geometry, MAX_POINTS_PER_REQUEST);
    for (const segment of geometries) {
      const geom = this.geojsonFormat.writeGeometry(segment);
      const request = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `geom=${geom}&sr=2056&offset=1&distinct_points=true`
      });
      const profileSegment = (await request.json()).map(swisstopoToXYZM.bind(null, this.projection));
      if(profile.length > 0 && profile[profile.length - 1].length > 3) {
        const additionalDistance = profile[profile.length - 1][3];
        profileSegment.map((ps: Coordinate) => 
          ps[3] += additionalDistance
        );
      }
      profile.push(...profileSegment);
    }

    // Despite the fact that the distinct_points parameter is set and the passed coordinates
    // must not be modified, the API rounds the coordinates.
    // Therefore, we need to update the first and last coordinates of the profile with the
    // original coordinates.
    profile.with(0, profile.at(0).slice(0, 2, ...geometry.getCoordinateAt(0)));
    profile.with(-1, profile.at(-1).slice(0, 2, ...geometry.getCoordinateAt(-1)));

    segment.set('profile', profile);
  }
}

function splitGeometry(geometry: LineString, maxPoints: number): LineString[] {
  const originalCoordinates = geometry.getCoordinates();
  const segments: LineString[] = [];

  for (let i = 0; i < originalCoordinates.length; i += maxPoints) {
      const end = Math.min(i + maxPoints, originalCoordinates.length);
      const segmentCoordinates = originalCoordinates.slice(i, end);
      const segmentGeometry = new LineString(segmentCoordinates);
      segments.push(segmentGeometry);
  }
  return segments;
}

function swisstopoToXYZM(projection: ProjectionLike, p: SwisstopoProfileItem): Coordinate {
  return transform([p.easting, p.northing, p.alts.COMB, p.dist], 'EPSG:2056', projection);
}
