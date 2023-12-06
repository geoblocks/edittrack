import type Feature from 'ol/Feature.js';
import type LineString from 'ol/geom/LineString.js';
import type {Profiler} from './profiler.d.ts';

type FallbackOptions = {
  profilers: Profiler[];
};

export default class Fallback implements Profiler {
  private profilers: Profiler[];

  constructor(options: FallbackOptions) {
    this.profilers = options.profilers;
  }

  computeProfile(segment: Feature<LineString>): Promise<void> {
    // array of computeProfile functions.
    const functions = this.profilers.map(profiler => () => profiler.computeProfile(segment));

    // execute the promises in sequence, the first resolved will be returned. All the following
    // will execute "identity" function instead of the real function.
    // @ts-ignore don't know why TSC is unhappy with this nice code
    return functions.reduce((cur, nextFn) => cur.then(val => val, nextFn), Promise.reject());
  }
}
