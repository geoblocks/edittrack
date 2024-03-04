export const controlPoint = {
  "z-index": 10,
  "circle-radius": 8,
  "circle-fill-color": "white",
};

export const sketchControlPoint = {
  "circle-radius": 5,
  "circle-fill-color": "#ffffffdd",
};

export const trackLine = {
  "stroke-width": 6,
  "stroke-color": ["case", ["==", ["get", "active"], false], "#00883c80", "#00883cff"],
  "text-value": ["concat", "", ["get", "part"]],
  "text-fill-color": "#fff",
};

export const trackLineModifying = {
  ...trackLine,
  "stroke-width": 3,
  "stroke-line-dash": [5, 9],
};

export const poiPoint = {
  "z-index": 100,
  "circle-radius": 8,
  "circle-fill-color": "yellow",
  "text-font": "bold 11px Inter",
  "text-fill-color": "#000",
  // use 'concat' to convert number to string
  "text-value": ["concat", "", ["get", "part"]],
};

export const numberedControlPoint = {
  ...controlPoint,
  "circle-fill-color": "#ffffffdd",
  "text-color": "blue",
  // use 'concat' to convert number to string
  "text-value": ["concat", "", ["get", "part"]],
};

export const snappedTrue = {
  ...controlPoint,
  "circle-fill-color": ["case", ["==", ["get", "active"], false], "#0071ec80", "#0071ecff"],
};

export const snappedFalse = {
  ...controlPoint,
  "circle-fill-color": ["case", ["==", ["get", "active"], false], "#b45f0480", "#b45f04ff"],
};

export const sketchLabel = {
  "text-font": "20px sans-serif",
  "text-offset-x": 20,
  "text-align": "left",
  "text-background-fill-color": "#ffffffaa",
};

export const sketchLabelPOI = {
  ...sketchLabel,
  "text-value": "click to delete\ndrag to move POI",
};

export const sketchLabelControlPoint = {
  ...sketchLabel,
  "text-value": "click to delete\ndrag to move point",
};

export const sketchLabelSegment = {
  ...sketchLabel,
  "text-value": "drag to create point",
};

export const styleRules = [
  {
    filter: ["==", ["get", "type"], "sketch"],
    style: sketchControlPoint,
  },
  {
    filter: ["all", ["==", ["get", "type"], "sketch"], ["==", ["get", "subtype"], "POI"]],
    style: sketchLabelPOI,
  },
  {
    filter: ["all", ["==", ["get", "type"], "sketch"], ["==", ["get", "subtype"], "controlPoint"]],
    style: sketchLabelControlPoint,
  },
  {
    filter: ["all", ["==", ["get", "type"], "sketch"], ["==", ["get", "subtype"], "segment"]],
    style: sketchLabelSegment,
  },
  {
    filter: ["==", ["get", "type"], "POI"],
    style: poiPoint,
  },
  {
    filter: ["==", ["get", "type"], "controlPoint"],
    style: numberedControlPoint,
  },
  {
    filter: ["all", ["==", ["get", "type"], "controlPoint"], ["==", ["get", "snapped"], true]],
    style: snappedTrue,
  },
  {
    filter: ["all", ["==", ["get", "type"], "controlPoint"], ["==", ["get", "snapped"], false]],
    style: snappedFalse,
  },
  {
    filter: ["all", ["==", ["get", "type"], "segment"], ["!=", ["get", "subtype"], "modifying"]],
    style: trackLine,
  },
  {
    filter: ["all", ["==", ["get", "type"], "segment"], ["==", ["get", "subtype"], "modifying"]],
    style: trackLineModifying,
  },
];
