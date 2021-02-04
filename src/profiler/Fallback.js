/** @typedef {import('ol/geom/LineString').default} LineString */

/**
 * @typedef {Object} Options
 * @property {Array<geoblocks.Profiler>} profilers
 */


/**
 * @implements {geoblocks.Profiler}
 */
export default class Fallback {

  /**
   * @param {Options} options
   */
  constructor(options) {
    /**
     * @private
     */
    this.profilers_ = options.profilers;
  }

  /**
   * @param {import("ol/Feature").default<LineString>} segment
   * @return {Promise<void>}
   */
  computeProfile(segment) {
    // array of computeProfile functions.
    const functions = this.profilers_.map(profiler => () => profiler.computeProfile(segment));

    // execute the promises in sequence, the first resolved will be returned. All the following
    // will execute "identity" function instead of the real function.
    // @ts-ignore don't know why TSC is unhappy with this nice code
    return functions.reduce((cur, nextFn) => cur.then(val => val, nextFn), Promise.reject());
  }
}
