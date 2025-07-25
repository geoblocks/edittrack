import {distance} from 'ol/coordinate.js';
import type Map from 'ol/Map.js';
import type {Coordinate} from 'ol/coordinate';
import type Feature from 'ol/Feature';
import type {LineString, Point} from 'ol/geom';
import type {Router} from './index';
import type {Projection} from 'ol/proj';

export type RouterBaseOptions = {
  map: Map;
  maxRoutingTolerance?: number;
};

export type Surface = {
  start: number;
  end: number;
  type: string;
}

export type RouteInfo = {
  coordinates: Coordinate[];
  surfaces?: Surface[]
}

export default abstract class RouterBase implements Router {
  private map: Map;
  protected maxRoutingTolerance: number;

  constructor(options: RouterBaseOptions) {
    this.map = options.map;
    this.maxRoutingTolerance = options.maxRoutingTolerance ?? Infinity;
  }

  protected getMapProjection(): Projection {
    return this.map.getView().getProjection()
  }

  abstract getRoute(pointFromCoordinates: Coordinate, pointToCoordinates: Coordinate): Promise<RouteInfo>;

  async snapSegment(segment: Feature<LineString>, pointFrom: Feature<Point>, pointTo: Feature<Point>): Promise<boolean> {
    const pointFromSnapped = pointFrom.get('snapped');
    const pointToSnapped = pointTo.get('snapped');
    const pointFromGeometry = pointFrom.getGeometry();
    const pointToGeometry = pointTo.getGeometry();
    const pointFromCoordinates = pointFromGeometry!.getCoordinates();
    const pointToCoordinates = pointToGeometry!.getCoordinates();

    if (pointFromSnapped == false || pointToSnapped === false) {
      segment.getGeometry()!.setCoordinates([pointFromCoordinates, pointToCoordinates], 'XY');
      segment.set('snapped', false);
      segment.set('surfaces', []);
      return false;
    }

    const routeInfo = await this.getRoute(pointFromCoordinates, pointToCoordinates);
    const surfaces = routeInfo.surfaces || [];
    const resultCoordinates = routeInfo.coordinates;
    if (resultCoordinates.length === 0) {
      segment.getGeometry()!.setCoordinates([pointFromCoordinates, pointToCoordinates], 'XY');
      segment.set('snapped', false);
      segment.set('surfaces', surfaces);
      return false;
    }
    const resultFromCoordinates = resultCoordinates[0].slice(0, 2);
    const resultToCoordinates = resultCoordinates[resultCoordinates.length - 1].slice(0, 2);

    if (pointFromSnapped === undefined) {
      pointFrom.set('snapped', this.isInTolerance(pointFromCoordinates, resultFromCoordinates));
    }
    if (pointToSnapped === undefined) {
      pointTo.set('snapped', this.isInTolerance(pointToCoordinates, resultToCoordinates));
    }
    const snapped = pointFrom.get('snapped') && pointTo.get('snapped');

    if (snapped) {
      segment.getGeometry()!.setCoordinates(resultCoordinates, 'XYZ');
      pointFromGeometry!.setCoordinates(resultFromCoordinates);
      pointToGeometry!.setCoordinates(resultToCoordinates);
    } else {
      segment.getGeometry()!.setCoordinates([pointFromCoordinates, pointToCoordinates], 'XY');
    }
    segment.set('snapped', snapped);
    segment.set('surfaces', surfaces);

    return snapped;
  }

  isInTolerance(pointA: Coordinate, pointB: Coordinate): boolean {
    const pointAPixel = this.map.getPixelFromCoordinate(pointA);
    const pointBPixel = this.map.getPixelFromCoordinate(pointB);
    return distance(pointAPixel, pointBPixel) < this.maxRoutingTolerance;
  }
}
