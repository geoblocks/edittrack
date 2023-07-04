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
export const poiPoint = new Style({
  zIndex: 100,
  image: new Circle({
    radius: 8,
    fill: new Fill({
      color: 'yellow'
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
    radius: 5,
    fill: new Fill({
      color: '#ffffffdd'
    })
  })
});

const sketchLabel = {
  'POI': new Style({
    text: new Text({
      font: '20px sans-serif',
      offsetX: 20,
      textAlign: 'left',
      backgroundFill: new Fill({
        color: '#ffffffaa'
      }),
      text: 'click to delete\ndrag to move POI'
    }),
  }),
  'cp': new Style({
    text: new Text({
      font: '20px sans-serif',
      offsetX: 20,
      textAlign: 'left',
      backgroundFill: new Fill({
        color: '#ffffffaa'
      }),
      text: 'click to delete\ndrag to move point'
    }),
  }),
  'segment': new Style({
    text: new Text({
      backgroundFill: new Fill({
        color: '#ffffffaa'
      }),
      offsetX: 20,
      textAlign: 'left',
      font: '20px sans-serif',
      text: 'drag to create point'
    }),
  })
};


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
 * @param {import("ol/Feature").FeatureLike} feature
 * @return {?Style}
 */
export function styleFunction(feature) {
  const type = feature.get('type');
  const subtype = feature.get('subtype');
  const index = feature.get('index');

  switch (type) {
    case 'sketch': {
      if (subtype) {
        return [sketchControlPoint, sketchLabel[subtype]];
      }
      return sketchControlPoint;
    }
    case 'POI':
      return poiPoint;
    case 'controlPoint':
      switch (subtype) {
        case 'first':
          return firstControlPoint;
        case 'last':
          return lastControlPoint;
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
 * @param {?string} strokeColor
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
