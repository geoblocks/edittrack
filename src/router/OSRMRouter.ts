import {fromLonLat, toLonLat} from 'ol/proj.js';
import RouterBase, {RouterBaseOptions} from './RouterBase';
import type {Coordinate} from 'ol/coordinate.js';

export const OSM_CH_ROUTED_FOOT_PROFILE_URL = 'https://routing.osm.ch/routed-foot/route/v1/driving';
export const OSRM_DEFAULT_PROFILE_URL = 'https://router.project-osrm.org/route/v1/driving';


type OSRMRouterOptions = RouterBaseOptions & {
  url: string;
  extraParams: string;
  radius: number;
};

export default class OSRMRouter extends RouterBase {
  public url: string;
  public radius: number;
  public extraParams: string;

  constructor(options: OSRMRouterOptions) {
    super(options);

    this.url = options.url;

    this.radius = options.radius || 10000;

    this.extraParams = options.extraParams;
  }

  async getRoute(pointFromCoordinates: Coordinate, pointToCoordinates: Coordinate): Promise<Coordinate[]> {
    const mapProjection = this.getMapProjection();
    const coordinates = [pointFromCoordinates, pointToCoordinates].map(cc => toLonLat(cc.slice(0, 2), mapProjection));

    // [ [a,b] , [c,d] ] -> 'a,b;c,d'
    const coordinateString = coordinates.map(c => c.join(',')).join(';');
    const radiuses = coordinates.map(() => this.radius).join(';');

    let url = `${this.url}/${coordinateString}?radiuses=${radiuses}&geometries=geojson`;
    if (this.extraParams) {
      url += `&${this.extraParams}`;
    }
    const response = await fetch(url);
    const jsonResponse = await response.json();
    console.assert(jsonResponse.code === 'Ok');
    console.assert(jsonResponse.routes.length === 1);
    const route = jsonResponse.routes[0];
    return route.geometry.coordinates.map((cc: number[]) => fromLonLat(cc, mapProjection));
  }
}
