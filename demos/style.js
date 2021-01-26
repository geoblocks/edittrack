import {Circle, Fill, Stroke, Style, Icon} from 'ol/style.js';


/**
 * @type {Style}
 */
export const controlPoint = new Style({
  image: new Circle({
    radius: 7,
    fill: new Fill({
      color: 'white'
    })
  })
});

/**
 * @type {Style}
 */
export const firstControlPoint = new Style({
  image: new Circle({
    radius: 7,
    fill: new Fill({
      color: 'green'
    })
  })
});


/**
 * @type {Style}
 */
export const lastControlPoint = new Style({
  image: new Circle({
    radius: 7,
    fill: new Fill({
      color: 'red'
    })
  })
});

/**
 * @type {Style}
 */
export const trackLine = new Style({
  stroke: new Stroke({
    color: 'purple',
    width: 6
  })
});

/**
 * @type {Style}
 */
export const trackLineModifying = new Style({
  stroke: new Stroke({
    color: 'blue',
    width: 3,
    lineDash: [0.5, 4]
  })
});


/**
 * @param {string} type
 * @param {string} subtype
 * @return {?Style}
 */
export function styleFromType(type, subtype) {
  switch (type) {
    case 'controlPoint':
      switch (subtype) {
        case 'first':
          return firstControlPoint;
        case 'last':
          return lastControlPoint;
        default:
          return controlPoint;
      }
    case 'segment':
      switch (subtype) {
        case 'modifying':
          return trackLineModifying;
        default:
          return trackLine;
      }
    default:
      return null;
  }
}

/**
 * @param {import("ol/Feature").FeatureLike} feature
 * @param {number} _
 * @return {?Style}
 */
export function styleFunction(feature, _) {
  return styleFromType(feature.get('type'), feature.get('subtype'));
}

/**
 * @param {string=} strokeColor
 * @return {Style}
 */
export function externalLayerStyle(strokeColor = '#e3ff00') {
  return new Style({
    stroke: new Stroke({
      color: strokeColor,
      width: 3
    })
  });
}

/**
 * @typedef {Object} TrackHoverUrlOptions
 * @property {string} src
 * @property {[number, number]} imgSize
 * @property {number} scale
 */

/**
 * @param {TrackHoverUrlOptions} options
 * @return {Style}
 */
export function createProfileHoverStyle(options) {
  return new Style({
    image: new Icon(options)
  });
}
