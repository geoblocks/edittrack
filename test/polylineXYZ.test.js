/* eslint-env node, mocha */

import {assert} from 'chai';
import GeometryLayout from 'ol/geom/GeometryLayout';
import LineString from 'ol/geom/LineString';
import PolylineXYZM, {reduceStrideFrom4To3} from '../src/router/PolylineXYZM.js';


describe('Flat coordinates operations', () => {
  it('reduces a 4D flat coordinates to 3D', () => {
    const flat = [0, 1, 2, 3, 4, 5, 6, 7];
    const out = reduceStrideFrom4To3(flat);
    assert.deepEqual(out, [0, 1, 2, 4, 5, 6]);
  });
});


describe('PolylineXYZM', () => {
  const format = new PolylineXYZM();

  it('writes features', () => {
    const p1 = [0, 0, 0, 0];
    const p2 = [1, 1, 1, 1];
    const po1 = format.writeGeometry(new LineString([p1, p2], GeometryLayout.XYZM));
    assert.equal(po1, '???_ibE_ibE_ibE');
  });

  it('reads 3D polyline', () => {
    const p1 = [0, 0, 0, 0];
    const p2 = [1, 1, 1000, 157249.59847404022];
    const geom = format.readGeometry('???_ibE_ibE_ibE');
    assert.deepEqual(geom.getCoordinates(), [p1, p2]);
  });
});
