import {Circle, Fill, Stroke, Style, Icon, Text} from 'ol/style.js';


/**
 * @type {Style}
 */
export const controlPoint = new Style({
  zIndex: 10,
  image: new Circle({
    radius: 8,
    fill: new Fill({
      color: 'white'
    })
  })
});

/**
 * @type {Style}
 */
export const firstControlPoint = new Style({
  zIndex: 10,
  image: new Circle({
    radius: 8,
    fill: new Fill({
      color: 'green'
    })
  })
});


/**
 * @type {Style}
 */
export const lastControlPoint = new Style({
  zIndex: 10,
  image: new Circle({
    radius: 8,
    fill: new Fill({
      color: 'red'
    })
  })
});


/**
 * @type {Style}
 */
 export const numberedControlPoint = new Style({
  zIndex: 10,
  image: new Circle({
    radius: 8,
    fill: new Fill({
      color: '#ffffffdd'
    })
  }),
  text: new Text({
    fill: new Fill({
      color: 'blue'
    })
  })
});


/**
 * @type {Style}
 */
 export const sketchControlPoint = new Style({
  image: new Circle({
    radius: 8,
    fill: new Fill({
      color: '#ffffffaa'
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
    color: 'purple',
    width: 3,
    lineDash: [5, 9]
  })
});


/**
 * @param {string} type
 * @param {string} subtype
 * @param {number} index
 * @return {?Style}
 */
export function styleFromType(type, subtype, index) {
  switch (type) {
    case 'controlPoint':
      switch (subtype) {
        case 'first':
          return firstControlPoint;
        case 'last':
          return lastControlPoint;
        case 'sketch':
          return sketchControlPoint;
        default:
          if (index !== undefined) {
            numberedControlPoint.getText().setText(index.toString());
            return numberedControlPoint;
          }
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
  return styleFromType(feature.get('type'), feature.get('subtype'), feature.get('index'));
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
