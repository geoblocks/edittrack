import { equals } from "ol/coordinate";
import GeoJSON from "ol/format/GeoJSON";
import Feature from "ol/Feature";
import { LineString, Point } from "ol/geom";
import { proj as proj21781 } from "@geoblocks/proj/src/EPSG_21781";

const geojson = new GeoJSON();

function coordinateIndex(coordinates, coordinate) {
  return coordinates.findIndex((c) => equals(c, coordinate));
}

export async function getTrack(id, projection) {
  const response = await fetch(`https://map.veloland.ch/api/4/tracks/${id}`);
  const track = geojson.readFeature(await response.json());

  const viaPoints = JSON.parse(track.get("via_points"));
  console.assert(viaPoints.length >= 2);
  const coordinates = track.getGeometry().getCoordinates();
  const features = viaPoints.map((viaPoint, index) => {
    return new Feature({
      geometry: new Point(viaPoint).transform(proj21781, projection),
      type: "controlPoint",
      snapped: true,
      index: index,
    });
  });
  features.at(0).set("subtype", "first");
  features.at(-1).set("subtype", "last");
  for (let i = 0; i < viaPoints.length - 1; i++) {
    const indexFrom = coordinateIndex(coordinates, viaPoints[i]);
    const indexTo = coordinateIndex(coordinates, viaPoints[i + 1]);
    features.push(
      new Feature({
        geometry: new LineString(
          coordinates.slice(indexFrom, indexTo)
        ).transform(proj21781, projection),
        type: "segment",
        snapped: true,
      })
    );
  }
  return features;
}

export async function getPOIs(id, projection) {
  const response = await fetch(
    `https://map.veloland.ch/api/4/tracks/${id}/pois`
  );
  const pois = geojson.readFeatures(await response.json());
  return pois.map((poi) => {
    poi.getGeometry().transform(proj21781, projection);
    poi.set("type", "POI");
    return poi;
  });
}
