export const controlPoint = {
  "z-index": 10,
  "circle-radius": 8,
  "circle-fill-color": "white",
};

export const firstControlPoint = {
  ...controlPoint,
  "circle-fill-color": "green",
};

export const lastControlPoint = {
  ...controlPoint,
  "circle-fill-color": "red",
};

export const sketchControlPoint = {
  "circle-radius": 5,
  "circle-fill-color": "#ffffffdd",
};

export const trackLine = {
  "stroke-width": 6,
  "stroke-color": "purple",
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
  "text-value": ["concat", ["get", "index"], ""],
};

export const numberedControlPoint = {
  ...controlPoint,
  "circle-fill-color": "#ffffffdd",
  "text-color": "blue",
  // use 'concat' to convert number to string
  "text-value": ["concat", ["get", "index"], ""],
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
    // FIXME: shorter filter?
    filter: ["all", ["==", ["get", "type"], "controlPoint"], ["!=", ["get", "subtype"], "first"], ["!=", ["get", "subtype"], "last"]],
    style: numberedControlPoint,
  },
  {
    filter: ["all", ["==", ["get", "type"], "controlPoint"], ["==", ["get", "subtype"], "first"]],
    style: firstControlPoint,
  },
  {
    filter: ["all", ["==", ["get", "type"], "controlPoint"], ["==", ["get", "subtype"], "last"]],
    style: lastControlPoint,
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
