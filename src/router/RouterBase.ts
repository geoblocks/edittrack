import {distance} from 'ol/coordinate.js';
import type Map from 'ol/Map.js';
import type {Coordinate} from 'ol/coordinate';
import type Feature from 'ol/Feature';
import type {LineString, Point} from 'ol/geom';
import type {Router} from './index.ts';

export type RouterBaseOptions = {
  map: Map;
  maxRoutingTolerance?: number;
};

export default abstract class RouterBase implements Router {
  map: Map;
  maxRoutingTolerance: number;

  constructor(options: RouterBaseOptions) {
    this.map = options.map;
    this.maxRoutingTolerance = options.maxRoutingTolerance !== undefined ? options.maxRoutingTolerance : Infinity;
  }

  abstract getRoute(pointFromCoordinates: Coordinate, pointToCoordinates: Coordinate): Promise<Coordinate[]>;

  async snapSegment(segment: Feature<LineString>, pointFrom: Feature<Point>, pointTo: Feature<Point>): Promise<boolean> {
    const pointFromSnapped = pointFrom.get('snapped');
    const pointToSnapped = pointTo.get('snapped');
    const pointFromGeometry = pointFrom.getGeometry();
    const pointToGeometry = pointTo.getGeometry();
    const pointFromCoordinates = pointFromGeometry!.getCoordinates();
    const pointToCoordinates = pointToGeometry!.getCoordinates();

    if (pointFromSnapped == false || pointToSnapped === false) {
      segment.getGeometry()!.setCoordinates([pointFromCoordinates, pointToCoordinates], 'XY');
      return false;
    }

    const resultCoordinates = await this.getRoute(pointFromCoordinates, pointToCoordinates);
    if (resultCoordinates.length === 0) {
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

    return snapped;
  }

  isInTolerance(pointA: Coordinate, pointB: Coordinate): boolean {
    const pointAPixel = this.map.getPixelFromCoordinate(pointA);
    const pointBPixel = this.map.getPixelFromCoordinate(pointB);
    return distance(pointAPixel, pointBPixel) < this.maxRoutingTolerance;
  }
}
