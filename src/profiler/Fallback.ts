import type Feature from 'ol/Feature.js';
import type LineString from 'ol/geom/LineString.js';
import type {Profiler} from './index';

type FallbackOptions = {
  profilers: Profiler[];
};

/**
 * This class takes a list of profilers as fallback options.
 * it executes their `computeProfile` function in sequence, and the first resolved promise
 * will be returned.
 */
export default class Fallback implements Profiler {
  private profilers: Profiler[];

  constructor(options: FallbackOptions) {
    this.profilers = options.profilers;
  }

  computeProfile(segment: Feature<LineString>): Promise<void> {
    // array of computeProfile functions.
    const functions = this.profilers.map(profiler => () => profiler.computeProfile(segment));

    // All the following will execute "identity" function instead of the real function.
    // @ts-ignore don't know why TSC is unhappy with this nice code
    return functions.reduce((cur, nextFn) => cur.then(val => val, nextFn), Promise.reject());
  }
}
