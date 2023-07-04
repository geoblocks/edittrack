import type Map from 'ol/Map';
import { distance } from 'ol/coordinate';
import type { Coordinate } from 'ol/coordinate';

type RouterBaseOptions = {
  map: Map;
  maxRoutingTolerance?: number;
};

export default class RouterBase {
  map: Map;
  maxRoutingTolerance: number;

  constructor(options: RouterBaseOptions) {
    this.map = options.map;
    this.maxRoutingTolerance = options.maxRoutingTolerance !== undefined ? options.maxRoutingTolerance : Infinity;
  }

  isInTolerance(pointA: Coordinate, pointB: Coordinate): boolean {
    const pointAPixel = this.map.getPixelFromCoordinate(pointA);
    const pointBPixel = this.map.getPixelFromCoordinate(pointB);
    return distance(pointAPixel, pointBPixel) < this.maxRoutingTolerance;
  }
}
