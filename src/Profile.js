import Feature from 'ol/Feature.js';
import VectorSource from 'ol/source/Vector.js';
import Point from 'ol/geom/Point.js';
import VectorLayer from 'ol/layer/Vector.js';

// @ts-ignore FIXME: introduce a type declaration
import d3Elevation from '@geoblocks/d3profile/src/d3Elevation.js';

/**
 * @typedef {import('ol/geom/LineString').default} LineString
 * @typedef {import('ol/Map').default} OLMap
 */

/**
 * @typedef {Object} ProfileItem
 * @property {number} x
 * @property {number} y
 * @property {number} dist
 * @property {number} ele
 */

/**
 * @typedef {Object} Options
 * @property {OLMap} map
 * @property {string|HTMLElement} profileTarget
 * @property {string} [styleDefs]
 */

const defaultStyleDefs = `
.domain {
  color: rgb(0, 130, 205);
}
.x.axis .tick, .y.axis .tick {
  display: none;
}
.y.axis .tick:first-of-type, .y.axis .tick:last-of-type {
  display: inline;
}
.x.axis .domain, .y.axis .domain {
  stroke: rgb(0, 130, 205) !important;
}
.x.label, .y.label {
  display: none;
}
.x.grid-hover line, .y.grid-hover line {
  stroke-dasharray: none !important;
  stroke: rgb(0, 130, 205) !important;
  stroke-width: 0.7 !important;
}
.line.elevation {
  stroke-width: 2;
}
.area {
  fill: #fff !important;
}`;

class Profile {

  /**
   * @param {Options} options
   */
  constructor(options) {

    /**
     * @type {boolean}
     */
    this.hoverActive = true;

    /**
     * @type {OLMap}
     * @private
     */
    this.map_ = options.map;

    /**
     * @type {string|HTMLElement}
     * @private
     */
    this.profileTarget_ = options.profileTarget;

    this.styleDefs_ = options.styleDefs || defaultStyleDefs;

    /**
     * @private
     * @type {Feature<Point>}
     */
    this.hoverFeature_ = undefined;

    const callbacks = this.createProfileCallbacks_();

    /**
     * @param {ProfileItem} item
     * @return {number} dist
     */
    function distanceExtractor(item) {
      return item.dist;
    }

    /**
     * @param {ProfileItem} item
     * @return {number} elevation
     */
    function zExtractor(item) {
      return item.ele;
    }

    /**
     * @private
     */
    this.profile_ = d3Elevation({
      distanceExtractor,
      linesConfiguration: {
        elevation: {
          zExtractor,
        }
      },
      lightXAxis: true,
      styleDefs: this.styleDefs_,
      hoverCallback: callbacks.hoverCallback,
      outCallback: callbacks.outCallback
    });
  }

  /**
   * @private
   * @return {{outCallback: Function, hoverCallback: function(ProfileItem)}}
   */
  createProfileCallbacks_() {
    const profileHoverGeometry = new Point([0, 0]);
    this.hoverFeature_ = new Feature({
      geometry: profileHoverGeometry
    });

    const profileHoverVector = new VectorLayer({
      visible: false,
      source: new VectorSource({
        features: [this.hoverFeature_]
      })
    });
    this.map_.addLayer(profileHoverVector);

    const outCallback = () => {
      profileHoverVector.setVisible(false);
    };

    /**
     * @param {ProfileItem} item
     */
    const hoverCallback = item => {
      if (this.hoverActive) {
        // An item in the list of points given to the profile.
        profileHoverGeometry.setCoordinates([item.x, item.y]);
        profileHoverVector.setVisible(true); // no notify if already visible
      }
    };

    return {
      outCallback,
      hoverCallback
    };
  }

  /**
   * @param {Feature<LineString>[]} segments
   * @return {ProfileItem[]}
   */
  getTrackProfile(segments) {
    /**
     * @type {ProfileItem[]}
     */
    let profile = [];
    let previousDistance = 0;
    for (const segment of segments) {
      /**
       * @type {[number, number, number, number][]}
       */
      const segmentProfile = segment.get('profile');
      if (segmentProfile) {
        profile = profile.concat(segmentProfile.map(item => {
          return {
            x: item[0],
            y: item[1],
            ele: item[2],
            dist: previousDistance + item[3]
          };
        }));
        previousDistance = profile[profile.length - 1].dist;
      }
    }
    return profile;
  }

  /**
   * @param {Feature<LineString>[]} segments
   */
  refreshProfile(segments) {
    const trackProfile = this.getTrackProfile(segments);
    this.profile_.refreshProfile(this.profileTarget_, trackProfile.length > 0 ? trackProfile : undefined);
  }

  /**
   * @param {import("ol/style/Style").default} style
   */
  setTrackHoverStyle(style) {
    this.hoverFeature_.setStyle(style);
  }

  /**
   * Remove any highlight.
   * Fire the outCallback callback.
   */
  clearHighlight() {
    this.profile_.clearHighlight();
  }

  /**
   * Highlight the given distance and corresponding elevation on chart.
   * Fire the hoverCallback callback with corresponding point.
   * @param {number} distance Distance.
   */
  highlight(distance) {
    this.profile_.highlight(distance);
  }
}

export default Profile;
