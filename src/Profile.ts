import Feature from 'ol/Feature.js';
import VectorSource from 'ol/source/Vector.js';
import Point from 'ol/geom/Point.js';
import VectorLayer from 'ol/layer/Vector.js';

// @ts-ignore FIXME: introduce a type declaration
import d3Elevation from '@geoblocks/d3profile/src/d3Elevation.js';
import Style from 'ol/style/Style.js';
import LineString from 'ol/geom/LineString.js';
import type Map from 'ol/Map.js';

interface ProfileItem {
  x: number;
  y: number;
  dist: number;
  ele: number;
}

interface Options {
  map: Map;
  profileTarget: string|HTMLElement;
  lightXAxis?: boolean;
  styleDefs?: string;
}

interface Callbacks {
  outCallback: () => void;
  hoverCallback: (item: ProfileItem) => void;
}

const defaultStyleDefs = `
.domain {
  color: rgb(0, 130, 205);
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
  hoverActive: boolean;
  map_: Map;
  private profileTarget_: string | HTMLElement;
  styleDefs_: string;
  private hoverFeature_: Feature<Point>;
  private profile_: any; // FIXME: d3js component

  constructor(options: Options) {

    this.hoverActive = true;
    this.map_ = options.map;
    this.profileTarget_ = options.profileTarget;
    this.styleDefs_ = options.styleDefs || defaultStyleDefs;

    const callbacks = this.createProfileCallbacks_();

    function distanceExtractor(item: ProfileItem): number {
      return item.dist;
    }

    function zExtractor(item: ProfileItem): number {
      return item.ele;
    }

    this.profile_ = d3Elevation({
      distanceExtractor,
      linesConfiguration: {
        elevation: {
          zExtractor,
        }
      },
      lightXAxis: options.lightXAxis,
      styleDefs: this.styleDefs_,
      hoverCallback: callbacks.hoverCallback,
      outCallback: callbacks.outCallback
    });
  }

  private createProfileCallbacks_(): Callbacks {
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

    const hoverCallback = (item: ProfileItem) => {
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

  getTrackProfile(segments: Feature<LineString>[]): ProfileItem[] {
    let profile: ProfileItem[] = [];
    let previousDistance = 0;
    for (const segment of segments) {
      const segmentProfile: [number, number, number, number] = segment.get('profile');
      if (segmentProfile.length > 0) {
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

  refreshProfile(segments: Feature<LineString>[]) {
    const trackProfile = this.getTrackProfile(segments);
    this.profile_.refreshProfile(this.profileTarget_, trackProfile.length > 0 ? trackProfile : undefined);
  }

  setTrackHoverStyle(style: Style) {
    this.hoverFeature_.setStyle(style);
  }

  /**
   * Remove any highlight.
   * Fire the outCallback callback.
   */
  clearHighlight() {
    this.profile_.clearHighlight();
  }

  /*
   * Highlight the given distance and corresponding elevation on chart.
   * Fire the hoverCallback callback with corresponding point.
   */
  highlight(distance: number) {
    this.profile_.highlight(distance);
  }
}

export default Profile;
