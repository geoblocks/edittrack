/* eslint-env node, mocha */

import 'mocha';
import {assert} from 'chai';
import GeometryLayout from 'ol/geom/GeometryLayout';
import LineString from 'ol/geom/LineString';
import PolylineXYZM from '../src/router/PolylineXYZM.js';


describe('PolylineXYZM', () => {
  const format = new PolylineXYZM();

  it('writes features', () => {
    const p1 = [0, 0, 0, 0];
    const p2 = [1, 1, 1, 1];
    const po1 = format.writeGeometry(new LineString([p1, p2], GeometryLayout.XYZM));
    assert.equal(po1, '???_ibE_ibEgE');
  });

  it('writes real-like polyline', () => {

    const coos = [
      [
        6.52587,
        46.63152,
        492.15999999999997,
        0], [
        6.52609,
        46.63195,
        492.51,
        50.67890127603154], [
        6.52635,
        46.63233,
        492.43,
        97.36433458899549], [
        6.5264999999999995,
        46.63228,
        492.11,
        110.0957304249026]
    ];
    const po1 = format.writeGeometry(new LineString(coos, GeometryLayout.XYZM));
    assert.equal(po1, '_vr{Guqyf@_c_BuAk@eAkAs@NH]~@');
  });

  it('reads 3D polyline', () => {
    const p1 = [0, 0, 0, 0];
    const p2 = [1, 1, 1, 157249.59847404022];
    const geom = /** @type {LineString} */(format.readGeometry('???_ibE_ibEgE'));
    assert.deepEqual(geom.getCoordinates(), [p1, p2]);
  });

  it('reads real like polyline', () => {
    const geom = /** @type {LineString} */(format.readGeometry('_vr{Guqyf@_c_BuAk@eAkAs@NH]~@'));
    // console.log(geom);
    const expected = [
      [
        6.52587,
        46.63152,
        492.15999999999997,
        0], [
        6.52609,
        46.63195,
        492.51,
        50.67890127603154], [
        6.52635,
        46.63233,
        492.43,
        97.36433458899549], [
        6.5264999999999995,
        46.63228,
        492.11,
        110.0957304249026]
    ];

    assert.deepEqual(expected, geom.getCoordinates());
  });
});
