import { Fill, Stroke, Style, Icon, Text, Circle } from "ol/style";
import { toString } from "ol/color";
import Point from "ol/geom/Point";

const tourColor = [55, 97, 164];
const lightTourColor = [...tourColor, 0.6];

const focusRed = [173, 9, 29];
const lightFocusRed = [...focusRed, 0.3];

const poiSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="60">
  <path fill="${toString(tourColor)}" stroke="white" stroke-width="2" paint-oder="stroke" d="M18 8.177c-5 0-9.5 3-9.5 9 0 4 9.5 24 9.5 24s9.5-20 9.5-24c0-6-4.5-9-9.5-9Z"/>
</svg>
`;

const poiSvgSketchHit = `
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="60">
  <path fill="${toString(focusRed)}" stroke="${toString(lightFocusRed)}" stroke-width="16" paint-oder="stroke" d="M18 8.177c-5 0-9.5 3-9.5 9 0 4 9.5 24 9.5 24s9.5-20 9.5-24c0-6-4.5-9-9.5-9Z"/>
  <path fill="${toString(focusRed)}" stroke="white" stroke-width="2" paint-oder="stroke" d="M18 8.177c-5 0-9.5 3-9.5 9 0 4 9.5 24 9.5 24s9.5-20 9.5-24c0-6-4.5-9-9.5-9Z"/>
</svg>
`;

export const controlPoint = new Style({
  zIndex: 100,
  image: new Circle({
    fill: new Fill({
      color: tourColor,
    }),
    stroke: new Stroke({
      width: 2,
      color: "#fff",
    }),
    radius: 8,
  }),
  text: new Text({
    font: "bold 11px Inter",
    fill: new Fill({
      color: "#fff",
    }),
  }),
});

export const sketchControlPoint = [
  new Style({
    zIndex: 200,
    image: new Circle({
      fill: new Fill({
        color: lightFocusRed,
      }),
      radius: 16,
    }),
  }),
  new Style({
    zIndex: 200,
    image: new Circle({
      fill: new Fill({
        color: focusRed,
      }),
      radius: 8,
    }),
  }),
];

export const controlPointSketchHit = controlPoint.clone();
controlPointSketchHit.getImage().getFill().setColor(focusRed);

// mouse over a control point or dragging a new control point on a segment
export const sketchControlPointHint = sketchControlPoint.map((style) => style.clone());
sketchControlPointHint[1].getImage().setStroke(new Stroke({
  width: 2,
  color: "#fff",
}));

export const segmentIntermediatePoint = controlPoint.clone();
segmentIntermediatePoint.getImage().setRadius(4);

export const firstControlPoint = controlPoint.clone();
firstControlPoint.getText().setText("A");

export const lastControlPoint = controlPoint.clone();
lastControlPoint.getText().setText("B");

export const profileHover = sketchControlPointHint.map((style) => style.clone());
profileHover[1].getImage().setRadius(6);
profileHover[0].getImage().getFill().setColor([0, 0, 0, 0.3]);


export const poiPoint = new Style({
  image: new Icon({
    src: `data:image/svg+xml;utf8,${poiSvg}`,
  }),
  text: new Text({
    font: "11px Inter",
    text: "99",
    offsetY: -10,
    fill: new Fill({
      color: "#fff",
    }),
  }),
});

export const poiPointSketchHit = new Style({
  zIndex: 200,
  image: new Icon({
    src: `data:image/svg+xml;utf8,${poiSvgSketchHit}`,
  }),
  text: new Text({
    font: "11px Inter",
    text: "99",
    offsetY: -10,
    fill: new Fill({
      color: "#fff",
    }),
  }),
});

const sketchLabel = new Style({
  text: new Text({
    font: "16px Inter",
    padding: [4, 4, 4, 4],
    offsetX: 24,
    textAlign: "left",
    backgroundFill: new Fill({
      color: "#fff",
    }),
  }),
})


const sketchLabelText = {
  POI: "drag to move POI",
  controlPoint: "double click to delete\ndrag to move point",
  segment: "drag to create point",
};

export const trackLine = new Style({
  stroke: new Stroke({
    color: tourColor,
    width: 6,
  }),
});

export const trackLineModifying = trackLine.clone();
trackLineModifying.getStroke().setColor(lightTourColor);
trackLineModifying.getStroke().setLineDash([1, 12]);

/**
 * @param {import("ol/Feature").FeatureLike} feature
 * @param {number} _
 * @return {?Style}
 */
export function styleFunction(feature, _) {
  const type = feature.get("type");
  const subtype = feature.get("subtype");
  const sketchHitGeometry = feature.get("sketchHitGeometry");

  switch (type) {
    case "sketch":
      if (subtype) {
        sketchLabel.getText().setText(sketchLabelText[subtype]);
        return sketchLabel;
      }
      return sketchControlPoint;
    case "POI":
      return sketchHitGeometry ? poiPointSketchHit : poiPoint;
    case "controlPoint":
      if (sketchHitGeometry) {
        return sketchControlPointHint;
      }
      switch (subtype) {
        case "first":
          return firstControlPoint;
        case "last":
          return lastControlPoint;
        default:
          return controlPoint;
      }
    case "segment":
      switch (subtype) {
        case "modifying":
          return trackLineModifying;
        default:
          const intermediatePoint = segmentIntermediatePoint.clone();
          intermediatePoint.setGeometry(new Point(feature.getGeometry().getFlatMidpoint()));
          const styles = [trackLine, intermediatePoint];
          if (sketchHitGeometry) {
            const dragging = feature.get("dragging");
            const pointStyle = (dragging ? sketchControlPointHint : sketchControlPoint).map((style) => style.clone());
            pointStyle.forEach((style) => style.setGeometry(sketchHitGeometry));
            styles.push(...pointStyle);
          }
          return styles;
      }
    default:
      // console.assert(false, "unknown feature type");
      return null;
  }
}
