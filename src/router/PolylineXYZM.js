import Polyline, {decodeDeltas} from 'ol/format/Polyline.js';
import GeometryLayout from 'ol/geom/GeometryLayout.js';
import {inflateCoordinates} from 'ol/geom/flat/inflate.js';
import {flipXY} from 'ol/geom/flat/flip.js';
import LineString from 'ol/geom/LineString.js';
import {transformGeometryWithOptions} from 'ol/format/Feature.js';
import {getDistance} from 'ol/sphere.js';


export default class PolylineXYZM extends Polyline {
  constructor() {
    super({
      factor: 1e5,
      geometryLayout: GeometryLayout.XYZM
    });
    this.zFactor = 1000;
  }

  /**
   * @param {string} text Text.
   * @param {import("ol/format/Feature.js").ReadOptions} [opt_options] Read options.
   * @protected
   * @return {LineString} Geometry.
   */
  readGeometryFromText(text, opt_options) {
    const stride = 3;
    const flatCoordinates = decodeDeltas(text, stride, 1e5);
    flipXY(flatCoordinates, 0, flatCoordinates.length, stride, flatCoordinates);
    const coordinates = inflateCoordinates(
      flatCoordinates,
      0,
      flatCoordinates.length,
      stride
    );

    let accDistance = 0;
    coordinates.forEach((c, i, coos) => {
      const m = i === 0 ? 0 : getDistance(coos[i - 1], coos[i]);
      accDistance += m;
      c[2] *= this.zFactor;
      c[3] = accDistance;
    });
    const lineString = new LineString(coordinates, GeometryLayout.XYZM);

    const outGeometry = /** @type {LineString} */ (transformGeometryWithOptions(
      lineString,
      false,
      this.adaptOptions(opt_options)
    ));

    return outGeometry;
  }
}
