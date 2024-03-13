# Edittrack geoblock

## Description

Edittrack is a Javascript UI library to draw tracks along a network.
It has the following concepts:

- segments: straight lines or snapped linestrings;
- POIs: points with arbitrary position and meta data;
- control points: points along between segments that drives the modification of segments;
- routers: objects transforming a straight line to a snapped linestring along a network;
- profilers: objects adding 3d dimension to segments.

Current [router implementations](https://geoblocks.github.io/edittrack/api/modules/router.html):

- Graphhopper;
- OSRM.

Current [profiler implementations](https://geoblocks.github.io/edittrack/api/modules/profiler.html):

- Swisstopo;
- ExtractFromSegment.

The main class is the [TrackManager](https://geoblocks.github.io/edittrack/api/classes/interaction_TrackManager.default.html)

## Online doc and demos

- [Documentation](https://geoblocks.github.io/edittrack/api/);
- [simple](https://geoblocks.github.io/edittrack/simple.html);
- [schm](https://geoblocks.github.io/edittrack/schm.html).

## Local development

For local developpement we use a few demos.

```bash
npm install
npm run start
open http://localhost:1234/schm/schm.html?trackId=1250755006
open http://localhost:1234/simple/simple.html
```

## Publish a new version to npm

The source is transpiled to standard ES modules and published on npm.

```bash
# update CHANGES.md
npm version patch
npm publish
git push --tags origin master
npm run gh-pages
```
