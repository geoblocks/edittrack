import { distance } from 'ol/coordinate';
import type Map from 'ol/Map';
import type { Coordinate } from 'ol/coordinate';
import type Feature from 'ol/Feature';
import type { LineString, Point } from 'ol/geom';

type RouterBaseOptions = {
  map: Map;
  maxRoutingTolerance?: number;
};

export default abstract class RouterBase {
  map: Map;
  maxRoutingTolerance: number;

  constructor(options: RouterBaseOptions) {
    this.map = options.map;
    this.maxRoutingTolerance = options.maxRoutingTolerance !== undefined ? options.maxRoutingTolerance : Infinity;
  }

  abstract snapSegment(segment: Feature<LineString>, pointFrom: Feature<Point>, pointTo: Feature<Point>): Promise<boolean>;

  isInTolerance(pointA: Coordinate, pointB: Coordinate): boolean {
    const pointAPixel = this.map.getPixelFromCoordinate(pointA);
    const pointBPixel = this.map.getPixelFromCoordinate(pointB);
    return distance(pointAPixel, pointBPixel) < this.maxRoutingTolerance;
  }
}
