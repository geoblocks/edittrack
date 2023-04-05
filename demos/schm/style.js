import { Fill, Stroke, Style, Icon, Text, RegularShape } from "ol/style";
import { toString } from "ol/color";

const color = [227, 6, 19];
const lightColor = [...color, 0.6];

const poiSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="33">
  <path d="M10 0C5 0 .5 3 .5 9c0 4 9.5 24 9.5 24s9.5-20 9.5-24c0-6-4.5-9-9.5-9z" fill="${toString(color)}"/>
</svg>
`;

export const controlPoint = new Style({
  image: new RegularShape({
    fill: new Fill({
      color: lightColor,
    }),
    stroke: new Stroke({
      width: 2,
      color: color,
    }),
    points: 4,
    radius: 8,
    angle: Math.PI / 4,
  }),
  text: new Text({
    fill: new Fill({
      color: "#fff",
    }),
  }),
});

export const sketchControlPoint = controlPoint.clone();

export const numberedControlPoint = controlPoint.clone();

export const firstControlPoint = controlPoint.clone();
firstControlPoint.getText().setText("A");

export const lastControlPoint = controlPoint.clone();
lastControlPoint.getText().setText("B");

export const poiPoint = new Style({
  zIndex: 100,
  image: new Icon({
    src: `data:image/svg+xml;utf8,${poiSvg}`,
    // anchor: [0.5, 1]
  }),
});

const sketchLabel = {
  POI: new Style({
    text: new Text({
      font: "20px sans-serif",
      offsetX: 20,
      textAlign: "left",
      backgroundFill: new Fill({
        color: "#ffffffaa",
      }),
      text: "click to delete\ndrag to move POI",
    }),
  }),
  cp: new Style({
    text: new Text({
      font: "20px sans-serif",
      offsetX: 20,
      textAlign: "left",
      backgroundFill: new Fill({
        color: "#ffffffaa",
      }),
      text: "click to delete\ndrag to move point",
    }),
  }),
  segment: new Style({
    text: new Text({
      backgroundFill: new Fill({
        color: "#ffffffaa",
      }),
      offsetX: 20,
      textAlign: "left",
      font: "20px sans-serif",
      text: "drag to create point",
    }),
  }),
};

export const trackLine = new Style({
  stroke: new Stroke({
    color: color,
    width: 6,
  }),
});

export const trackLineModifying = trackLine.clone();
trackLineModifying.getStroke().setColor(lightColor);
trackLineModifying.getStroke().setLineDash([1, 12]);

/**
 * @param {import("ol/Feature").FeatureLike} feature
 * @param {number} _
 * @return {?Style}
 */
export function styleFunction(feature, _) {
  const type = feature.get("type");
  const subtype = feature.get("subtype");
  const index = feature.get("index");

  switch (type) {
    case "sketch": {
      if (subtype) {
        return [sketchControlPoint, sketchLabel[subtype]];
      }
      return sketchControlPoint;
    }
    case "POI":
      return poiPoint;
    case "controlPoint":
      switch (subtype) {
        case "first":
          return firstControlPoint;
        case "last":
          return lastControlPoint;
        default:
          if (index !== undefined) {
            numberedControlPoint.getText().setText((index + 1).toString());
            return numberedControlPoint;
          }
          return controlPoint;
      }
    case "segment":
      switch (subtype) {
        case "modifying":
          return trackLineModifying;
        default:
          return trackLine;
      }
    default:
      return null;
  }
}
