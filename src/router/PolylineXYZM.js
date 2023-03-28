import Polyline, {decodeDeltas, encodeDeltas} from 'ol/format/Polyline.js';
import {inflateCoordinates} from 'ol/geom/flat/inflate.js';
import {flipXY} from 'ol/geom/flat/flip.js';
import LineString from 'ol/geom/LineString.js';
import {transformGeometryWithOptions} from 'ol/format/Feature.js';
import {getDistance} from 'ol/sphere.js';


/**
 * This format transforms a 3D polyline to/from a 4D linestring.
 * The extra dimension is the distance from the start of the line, in meters.
 * It is using a factor of 10⁵ for x an y and a factor of 10³ for z.
 */
export default class PolylineXYZM extends Polyline {
  constructor() {
    super({
      factor: 1e5,
      geometryLayout: 'XYZM'
    });
    this.zFactor = 1000;
  }

  /**
   * @param {string} text Text.
   * @param {import("ol/format/Feature.js").ReadOptions} [opt_options] Read options.
   * @protected
   * @return {LineString} Geometry with layout XYZM.
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
    const lineString = new LineString(coordinates, 'XYZM');

    const outGeometry = /** @type {LineString} */ (transformGeometryWithOptions(
      lineString,
      false,
      this.adaptOptions(opt_options)
    ));

    return outGeometry;
  }

  /**
   * @param {LineString} geometry 4D Geometry.
   * @param {import("ol/format/Feature.js").WriteOptions} [options] Write options.
   * @protected
   * @return {string} 3D polyline text.
   */
  writeGeometryText(geometry, options) {
    geometry =
      /** @type {LineString} */
      (transformGeometryWithOptions(
        geometry,
        true,
        this.adaptOptions(options)
      ));
    console.assert(geometry.getStride() === 4);
    const flatCoordinates = geometry.getFlatCoordinates();
    const end = flatCoordinates.length;
    const dest = new Array(end / 4 * 3);
    let i = 0;
    for (let j = 0; j < end; j += 4) {
      // need to flip X and Y
      dest[i++] = flatCoordinates[j + 1];
      dest[i++] = flatCoordinates[j];
      dest[i++] = flatCoordinates[j + 2] / this.zFactor;
    }
    const stride = 3;
    return encodeDeltas(dest, stride, 1e5);
  }
}
