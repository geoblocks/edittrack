// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"i6XE1":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "6c2ecaa690888e37";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws;
    try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        if (e.message) console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"8GBxa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _trackManager = require("../../src/interaction/TrackManager");
var _trackManagerDefault = parcelHelpers.interopDefault(_trackManager);
var _graphHopperTs = require("../../src/router/GraphHopper.ts");
var _graphHopperTsDefault = parcelHelpers.interopDefault(_graphHopperTs);
var _index = require("../../src/profiler/index");
var _style = require("./style");
var _swisstopo = require("./swisstopo");
var _track = require("./track");
var _condition = require("ol/events/condition");
const ROUTING_URL = "https://graphhopper-all.schweizmobil.ch/route?vehicle=schmneutral&type=json&weighting=fastest&elevation=true&way_point_max_distance=0&instructions=false&points_encoded=true";
async function main() {
    const { map, trackLayer, shadowTrackLayer } = (0, _swisstopo.createMap)("map");
    const projection = map.getView().getProjection();
    const router = new (0, _graphHopperTsDefault.default)({
        map: map,
        url: ROUTING_URL,
        maxRoutingTolerance: 15
    });
    const profiler = new (0, _index.FallbackProfiler)({
        profilers: [
            new (0, _index.ExtractFromSegmentProfiler)(),
            new (0, _index.SwisstopoProfiler)({
                projection: projection
            })
        ]
    });
    /**
   * @param {MapBrowserEvent} mapBrowserEvent
   * @param {string} pointType
   * @return {boolean}
   */ const deleteCondition = function(mapBrowserEvent, pointType) {
        return (0, _condition.doubleClick)(mapBrowserEvent) && pointType !== "POI";
    };
    const trackManager = new (0, _trackManagerDefault.default)({
        map: map,
        router: router,
        profiler: profiler,
        trackLayer: trackLayer,
        shadowTrackLayer: shadowTrackLayer,
        style: (0, _style.styleFunction),
        deleteCondition: deleteCondition,
        addLastPointCondition: (0, _condition.singleClick),
        addControlPointCondition: (0, _condition.doubleClick),
        hitTolerance: 15
    });
    const search = new URLSearchParams(document.location.search);
    const trackId = search.get("trackId");
    if (trackId) {
        trackManager.restoreFeatures([
            ...await (0, _track.getTrack)(trackId, projection),
            ...await (0, _track.getPOIs)(trackId, projection)
        ]);
        map.getView().fit(trackLayer.getSource().getExtent(), {
            padding: [
                50,
                50,
                50,
                50
            ]
        });
    }
    trackManager.mode = "edit";
}
main();

},{"../../src/interaction/TrackManager":"bPLJ7","../../src/router/GraphHopper.ts":"fak2b","../../src/profiler/index":"d5CmD","./style":"lUZ9u","./swisstopo":"hYgvG","./track":"eJ2Wz","ol/events/condition":"iQTYY","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lUZ9u":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "controlPoint", ()=>controlPoint);
parcelHelpers.export(exports, "sketchControlPoint", ()=>sketchControlPoint);
parcelHelpers.export(exports, "controlPointSketchHit", ()=>controlPointSketchHit);
parcelHelpers.export(exports, "sketchControlPointHint", ()=>sketchControlPointHint);
parcelHelpers.export(exports, "segmentIntermediatePoint", ()=>segmentIntermediatePoint);
parcelHelpers.export(exports, "firstControlPoint", ()=>firstControlPoint);
parcelHelpers.export(exports, "lastControlPoint", ()=>lastControlPoint);
parcelHelpers.export(exports, "profileHover", ()=>profileHover);
parcelHelpers.export(exports, "poiPoint", ()=>poiPoint);
parcelHelpers.export(exports, "poiPointSketchHit", ()=>poiPointSketchHit);
parcelHelpers.export(exports, "trackLine", ()=>trackLine);
parcelHelpers.export(exports, "trackLineModifying", ()=>trackLineModifying);
/**
 * @param {import("ol/Feature").FeatureLike} feature
 * @return {?Style}
 */ parcelHelpers.export(exports, "styleFunction", ()=>styleFunction);
var _style = require("ol/style");
var _color = require("ol/color");
var _point = require("ol/geom/Point");
var _pointDefault = parcelHelpers.interopDefault(_point);
const tourColor = [
    55,
    97,
    164
];
const lightTourColor = [
    ...tourColor,
    0.6
];
const focusRed = [
    173,
    9,
    29
];
const lightFocusRed = [
    ...focusRed,
    0.3
];
const poiSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="60">
  <path fill="${(0, _color.toString)(tourColor)}" stroke="white" stroke-width="2" paint-oder="stroke" d="M18 8.177c-5 0-9.5 3-9.5 9 0 4 9.5 24 9.5 24s9.5-20 9.5-24c0-6-4.5-9-9.5-9Z"/>
</svg>
`;
const poiSvgSketchHit = `
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="60">
  <path fill="${(0, _color.toString)(focusRed)}" stroke="${(0, _color.toString)(lightFocusRed)}" stroke-width="16" paint-oder="stroke" d="M18 8.177c-5 0-9.5 3-9.5 9 0 4 9.5 24 9.5 24s9.5-20 9.5-24c0-6-4.5-9-9.5-9Z"/>
  <path fill="${(0, _color.toString)(focusRed)}" stroke="white" stroke-width="2" paint-oder="stroke" d="M18 8.177c-5 0-9.5 3-9.5 9 0 4 9.5 24 9.5 24s9.5-20 9.5-24c0-6-4.5-9-9.5-9Z"/>
</svg>
`;
const withPointerDevice = window.matchMedia("(pointer: coarse)").matches;
const controlPoint = new (0, _style.Style)({
    zIndex: 100,
    image: new (0, _style.Circle)({
        fill: new (0, _style.Fill)({
            color: tourColor
        }),
        stroke: new (0, _style.Stroke)({
            width: 2,
            color: "#fff"
        }),
        radius: 8
    }),
    text: new (0, _style.Text)({
        font: "bold 11px Inter",
        fill: new (0, _style.Fill)({
            color: "#fff"
        })
    })
});
const sketchControlPoint = [
    new (0, _style.Style)({
        zIndex: 200,
        image: new (0, _style.Circle)({
            fill: new (0, _style.Fill)({
                color: lightFocusRed
            }),
            radius: 16
        })
    }),
    new (0, _style.Style)({
        zIndex: 200,
        image: new (0, _style.Circle)({
            fill: new (0, _style.Fill)({
                color: focusRed
            }),
            radius: 8
        })
    })
];
const controlPointSketchHit = controlPoint.clone();
controlPointSketchHit.getImage().getFill().setColor(focusRed);
const sketchControlPointHint = sketchControlPoint.map((style)=>style.clone());
sketchControlPointHint[1].getImage().setStroke(new (0, _style.Stroke)({
    width: 2,
    color: "#fff"
}));
const segmentIntermediatePoint = controlPoint.clone();
segmentIntermediatePoint.getImage().setRadius(4);
const firstControlPoint = controlPoint.clone();
firstControlPoint.getText().setText("A");
const lastControlPoint = controlPoint.clone();
lastControlPoint.getText().setText("B");
const profileHover = sketchControlPointHint.map((style)=>style.clone());
profileHover[1].getImage().setRadius(6);
profileHover[0].getImage().getFill().setColor([
    0,
    0,
    0,
    0.3
]);
const poiPoint = new (0, _style.Style)({
    image: new (0, _style.Icon)({
        src: `data:image/svg+xml;utf8,${poiSvg}`
    }),
    text: new (0, _style.Text)({
        font: "11px Inter",
        offsetY: -10,
        fill: new (0, _style.Fill)({
            color: "#fff"
        })
    })
});
const poiPointSketchHit = new (0, _style.Style)({
    zIndex: 200,
    image: new (0, _style.Icon)({
        src: `data:image/svg+xml;utf8,${poiSvgSketchHit}`
    }),
    text: new (0, _style.Text)({
        font: "11px Inter",
        offsetY: -10,
        fill: new (0, _style.Fill)({
            color: "#fff"
        })
    })
});
const sketchLabel = new (0, _style.Style)({
    text: new (0, _style.Text)({
        font: "16px Inter",
        padding: [
            4,
            4,
            4,
            4
        ],
        offsetX: 24,
        textAlign: "left",
        backgroundFill: new (0, _style.Fill)({
            color: "#fff"
        })
    })
});
const sketchLabelText = {
    POI: "drag to move POI",
    controlPoint: "double click to delete\ndrag to move point",
    segment: "drag to create point"
};
const trackLine = new (0, _style.Style)({
    stroke: new (0, _style.Stroke)({
        color: tourColor,
        width: 6
    })
});
const trackLineModifying = trackLine.clone();
trackLineModifying.getStroke().setColor(lightTourColor);
trackLineModifying.getStroke().setLineDash([
    1,
    12
]);
function styleFunction(feature) {
    const type = feature.get("type");
    const subtype = feature.get("subtype");
    const sketchHitGeometry = feature.get("sketchHitGeometry");
    switch(type){
        case "sketch":
            if (!withPointerDevice && subtype) {
                sketchLabel.getText().setText(sketchLabelText[subtype]);
                return sketchLabel;
            }
            return withPointerDevice ? null : sketchControlPoint;
        case "POI":
            if (sketchHitGeometry) return poiPointSketchHit;
            const index = feature.get("index");
            if (index !== undefined) poiPoint.getText().setText((index + 1).toString());
            return poiPoint;
        case "controlPoint":
            if (!withPointerDevice && sketchHitGeometry) return sketchControlPointHint;
            switch(subtype){
                case "first":
                    return firstControlPoint;
                case "last":
                    return lastControlPoint;
                default:
                    return controlPoint;
            }
        case "segment":
            switch(subtype){
                case "modifying":
                    return trackLineModifying;
                default:
                    const intermediatePoint = segmentIntermediatePoint.clone();
                    intermediatePoint.setGeometry(new (0, _pointDefault.default)(feature.getGeometry().getFlatMidpoint()));
                    const styles = [
                        trackLine,
                        intermediatePoint
                    ];
                    if (!withPointerDevice && sketchHitGeometry) {
                        const dragging = feature.get("dragging");
                        const pointStyle = (dragging ? sketchControlPointHint : sketchControlPoint).map((style)=>style.clone());
                        pointStyle.forEach((style)=>style.setGeometry(sketchHitGeometry));
                        styles.push(...pointStyle);
                    }
                    return styles;
            }
        default:
            // console.assert(false, "unknown feature type");
            return null;
    }
}

},{"ol/style":"hEQxF","ol/color":"4tahz","ol/geom/Point":"hx2Ar","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hYgvG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createMap", ()=>createMap);
var _swisstopo = require("@geoblocks/sources/src/Swisstopo");
var _swisstopoDefault = parcelHelpers.interopDefault(_swisstopo);
var _epsg2056 = require("@geoblocks/proj/src/EPSG_2056");
var _epsg2056Default = parcelHelpers.interopDefault(_epsg2056);
var _tile = require("ol/layer/Tile");
var _tileDefault = parcelHelpers.interopDefault(_tile);
var _vector = require("ol/layer/Vector");
var _vectorDefault = parcelHelpers.interopDefault(_vector);
var _vector1 = require("ol/source/Vector");
var _vectorDefault1 = parcelHelpers.interopDefault(_vector1);
var _ol = require("ol");
var _style = require("./style");
var _shadowtrack = require("./shadowtrack");
const RESOLUTIONS = [
    650,
    500,
    250,
    100,
    50,
    20,
    10,
    5,
    2.5,
    2,
    1.5,
    1
];
function createSwisstopoLayer(layer, format = "image/jpeg") {
    const swisstopoLayer = new (0, _swisstopoDefault.default)({
        layer,
        format,
        timestamp: "current",
        projection: (0, _epsg2056Default.default),
        crossOrigin: "anonymous"
    });
    return new (0, _tileDefault.default)({
        source: swisstopoLayer
    });
}
function createMap(target) {
    const trackSource = new (0, _vectorDefault1.default)();
    const trackLayer = new (0, _vectorDefault.default)({
        source: trackSource,
        style: (0, _style.styleFunction),
        updateWhileAnimating: true,
        updateWhileInteracting: true
    });
    const extent = (0, _epsg2056.proj).getExtent();
    const view = new (0, _ol.View)({
        projection: (0, _epsg2056Default.default),
        resolutions: RESOLUTIONS,
        extent: extent,
        center: [
            2532661.0,
            1151654.0
        ],
        zoom: 10
    });
    const bgLayer = createSwisstopoLayer("ch.swisstopo.pixelkarte-farbe");
    const shadowTrackLayer = (0, _shadowtrack.createShadowLayer)();
    const map = new (0, _ol.Map)({
        target,
        view,
        layers: [
            bgLayer,
            shadowTrackLayer,
            trackLayer
        ]
    });
    window["mymap"] = map;
    return {
        map,
        trackLayer,
        shadowTrackLayer
    };
}

},{"@geoblocks/sources/src/Swisstopo":"8D6Vl","@geoblocks/proj/src/EPSG_2056":"9pCNe","ol/layer/Tile":"3ytzs","ol/layer/Vector":"iTrAy","ol/source/Vector":"9w7Fr","ol":"3a1E4","./style":"lUZ9u","./shadowtrack":"62tDj","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8D6Vl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "RESOLUTIONS", ()=>RESOLUTIONS);
parcelHelpers.export(exports, "createSwisstopoMatrixSet", ()=>createSwisstopoMatrixSet);
/**
 * Create a Configure tilematrix set 26 (maximum zoomlevel without interpolation).
 * See ch.swisstopo.pixelkarte-farbe from
 * https://wmts10.geo.admin.ch/EPSG/2056/1.0.0/WMTSCapabilities.xml
 * and notes in https://api3.geo.admin.ch/services/sdiservices.html#wmts.
 * @param {string} projection projection
 * @param {number} level The zoomlevel
 * @return {!import('ol/tilegrid/WMTS.js').default} tilegrid
 */ parcelHelpers.export(exports, "createTileGrid", ()=>createTileGrid);
var _wmtsJs = require("ol/source/WMTS.js");
var _wmtsJsDefault = parcelHelpers.interopDefault(_wmtsJs);
var _wmtsJs1 = require("ol/tilegrid/WMTS.js");
var _wmtsJsDefault1 = parcelHelpers.interopDefault(_wmtsJs1);
const RESOLUTIONS = [
    4000,
    3750,
    3500,
    3250,
    3000,
    2750,
    2500,
    2250,
    2000,
    1750,
    1500,
    1250,
    1000,
    750,
    650,
    500,
    250,
    100,
    50,
    20,
    10,
    5,
    2.5,
    2,
    1.5,
    1,
    0.5,
    0.25,
    0.1
];
/**
 * @type {string}
 */ const DEFAULT_BASE_URL = "https://wmts{0-9}.geo.admin.ch";
/**
 * @type {string}
 */ const DEFAULT_ATTRIBUTIONS = '&copy; <a href="https://www.swisstopo.admin.ch">swisstopo</a>';
const createSwisstopoMatrixSet = function(level) {
    console.assert(level < RESOLUTIONS.length);
    const matrixSet = new Array(level);
    for(let i = 0; i <= level; ++i)matrixSet[i] = String(i);
    return matrixSet;
};
/**
 * Extents of Swiss projections.
 */ const extents = {
    ["EPSG:2056"]: [
        2420000,
        1030000,
        2900000,
        1350000
    ],
    ["EPSG:21781"]: [
        420000,
        30000,
        900000,
        350000
    ]
};
function createTileGrid(projection, level) {
    return new (0, _wmtsJsDefault1.default)({
        extent: extents[projection],
        resolutions: RESOLUTIONS.slice(0, level + 1),
        matrixIds: createSwisstopoMatrixSet(level)
    });
}
/**
 * @param {string} baseUrl The base url
 * @param {string} projection The projection.
 * @param {string} format The format.
 * @return {string} the url.
 */ function createUrl(baseUrl, projection, format) {
    if (baseUrl.includes("{Layer}")) return baseUrl;
    let url = `${baseUrl}/1.0.0/{Layer}/default/{Time}`;
    if (projection === "EPSG:2056") url += `/2056/{TileMatrix}/{TileCol}/{TileRow}.${format}`;
    else if (projection === "EPSG:21781") url += `/21781/{TileMatrix}/{TileRow}/{TileCol}.${format}`;
    else throw new Error(`Unsupported projection ${projection}`);
    return url;
}
class SwisstopoSource extends (0, _wmtsJsDefault.default) {
    /**
   * @param {Options} options WMTS options.
   */ constructor(options){
        const format = options.format || "image/png";
        const projection = options.projection;
        console.assert(projection === "EPSG:21781" || projection === "EPSG:2056");
        const tilegrid = createTileGrid(projection, options.level || 27);
        const projectionCode = projection.split(":")[1];
        const extension = format.split("/")[1];
        console.assert(!!projectionCode);
        console.assert(!!extension);
        super({
            attributions: options.attributions || DEFAULT_ATTRIBUTIONS,
            url: createUrl(options.baseUrl || DEFAULT_BASE_URL, projection, extension),
            dimensions: {
                "Time": options.timestamp || "current"
            },
            projection: projection,
            requestEncoding: "REST",
            layer: options.layer,
            style: "default",
            matrixSet: projectionCode,
            format: format,
            tileGrid: tilegrid,
            crossOrigin: options.crossOrigin || "anonymous"
        });
        /**
     * @const {string}
     * @private
     */ this.projectionCode_ = projection;
    }
    getProjectionExtent() {
        return extents[this.projectionCode_];
    }
}
exports.default = SwisstopoSource;

},{"ol/source/WMTS.js":"d4nWL","ol/tilegrid/WMTS.js":"jT45v","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"d4nWL":[function(require,module,exports) {
/**
 * @module ol/source/WMTS
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Generate source options from a capabilities object.
 * @param {Object} wmtsCap An object representing the capabilities document.
 * @param {!Object} config Configuration properties for the layer.  Defaults for
 *                  the layer will apply if not provided.
 *
 * Required config properties:
 *  - layer - {string} The layer identifier.
 *
 * Optional config properties:
 *  - matrixSet - {string} The matrix set identifier, required if there is
 *       more than one matrix set in the layer capabilities.
 *  - projection - {string} The desired CRS when no matrixSet is specified.
 *       eg: "EPSG:3857". If the desired projection is not available,
 *       an error is thrown.
 *  - requestEncoding - {string} url encoding format for the layer. Default is
 *       the first tile url format found in the GetCapabilities response.
 *  - style - {string} The name of the style
 *  - format - {string} Image format for the layer. Default is the first
 *       format returned in the GetCapabilities response.
 *  - crossOrigin - {string|null|undefined} Cross origin. Default is `undefined`.
 * @return {Options|null} WMTS source options object or `null` if the layer was not found.
 * @api
 */ parcelHelpers.export(exports, "optionsFromCapabilities", ()=>optionsFromCapabilities);
var _tileImageJs = require("./TileImage.js");
var _tileImageJsDefault = parcelHelpers.interopDefault(_tileImageJs);
var _uriJs = require("../uri.js");
var _extentJs = require("../extent.js");
var _wmtsJs = require("../tilegrid/WMTS.js");
var _tileurlfunctionJs = require("../tileurlfunction.js");
var _projJs = require("../proj.js");
/**
 * Request encoding. One of 'KVP', 'REST'.
 * @typedef {'KVP' | 'REST'} RequestEncoding
 */ /**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {import("../tilegrid/WMTS.js").default} tileGrid Tile grid.
 * @property {import("../proj.js").ProjectionLike} [projection] Projection. Default is the view projection.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {RequestEncoding} [requestEncoding='KVP'] Request encoding.
 * @property {string} layer Layer name as advertised in the WMTS capabilities.
 * @property {string} style Style name as advertised in the WMTS capabilities.
 * @property {typeof import("../ImageTile.js").default} [tileClass]  Class used to instantiate image tiles. Default is {@link module:ol/ImageTile~ImageTile}.
 * @property {number} [tilePixelRatio=1] The pixel ratio used by the tile service.
 * For example, if the tile service advertizes 256px by 256px tiles but actually sends 512px
 * by 512px images (for retina/hidpi devices) then `tilePixelRatio`
 * should be set to `2`.
 * @property {string} [format='image/jpeg'] Image format. Only used when `requestEncoding` is `'KVP'`.
 * @property {string} [version='1.0.0'] WMTS version.
 * @property {string} matrixSet Matrix set.
 * @property {!Object} [dimensions] Additional "dimensions" for tile requests.
 * This is an object with properties named like the advertised WMTS dimensions.
 * @property {string} [url]  A URL for the service.
 * For the RESTful request encoding, this is a URL
 * template.  For KVP encoding, it is normal URL. A `{?-?}` template pattern,
 * for example `subdomain{a-f}.domain.com`, may be used instead of defining
 * each one separately in the `urls` option.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {Array<string>} [urls] An array of URLs.
 * Requests will be distributed among the URLs in this array.
 * @property {boolean} [wrapX=false] Whether to wrap the world horizontally.
 * @property {number} [transition] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */ /**
 * @classdesc
 * Layer source for tile data from WMTS servers.
 * @api
 */ class WMTS extends (0, _tileImageJsDefault.default) {
    /**
   * @param {Options} options WMTS options.
   */ constructor(options){
        // TODO: add support for TileMatrixLimits
        const requestEncoding = options.requestEncoding !== undefined ? options.requestEncoding : "KVP";
        // FIXME: should we create a default tileGrid?
        // we could issue a getCapabilities xhr to retrieve missing configuration
        const tileGrid = options.tileGrid;
        let urls = options.urls;
        if (urls === undefined && options.url !== undefined) urls = (0, _tileurlfunctionJs.expandUrl)(options.url);
        super({
            attributions: options.attributions,
            attributionsCollapsible: options.attributionsCollapsible,
            cacheSize: options.cacheSize,
            crossOrigin: options.crossOrigin,
            interpolate: options.interpolate,
            projection: options.projection,
            reprojectionErrorThreshold: options.reprojectionErrorThreshold,
            tileClass: options.tileClass,
            tileGrid: tileGrid,
            tileLoadFunction: options.tileLoadFunction,
            tilePixelRatio: options.tilePixelRatio,
            urls: urls,
            wrapX: options.wrapX !== undefined ? options.wrapX : false,
            transition: options.transition,
            zDirection: options.zDirection
        });
        /**
     * @private
     * @type {string}
     */ this.version_ = options.version !== undefined ? options.version : "1.0.0";
        /**
     * @private
     * @type {string}
     */ this.format_ = options.format !== undefined ? options.format : "image/jpeg";
        /**
     * @private
     * @type {!Object}
     */ this.dimensions_ = options.dimensions !== undefined ? options.dimensions : {};
        /**
     * @private
     * @type {string}
     */ this.layer_ = options.layer;
        /**
     * @private
     * @type {string}
     */ this.matrixSet_ = options.matrixSet;
        /**
     * @private
     * @type {string}
     */ this.style_ = options.style;
        // FIXME: should we guess this requestEncoding from options.url(s)
        //        structure? that would mean KVP only if a template is not provided.
        /**
     * @private
     * @type {RequestEncoding}
     */ this.requestEncoding_ = requestEncoding;
        this.setKey(this.getKeyForDimensions_());
        if (urls && urls.length > 0) this.tileUrlFunction = (0, _tileurlfunctionJs.createFromTileUrlFunctions)(urls.map(this.createFromWMTSTemplate.bind(this)));
    }
    /**
   * Set the URLs to use for requests.
   * URLs may contain OGC conform URL Template Variables: {TileMatrix}, {TileRow}, {TileCol}.
   * @param {Array<string>} urls URLs.
   */ setUrls(urls) {
        this.urls = urls;
        const key = urls.join("\n");
        this.setTileUrlFunction((0, _tileurlfunctionJs.createFromTileUrlFunctions)(urls.map(this.createFromWMTSTemplate.bind(this))), key);
    }
    /**
   * Get the dimensions, i.e. those passed to the constructor through the
   * "dimensions" option, and possibly updated using the updateDimensions
   * method.
   * @return {!Object} Dimensions.
   * @api
   */ getDimensions() {
        return this.dimensions_;
    }
    /**
   * Return the image format of the WMTS source.
   * @return {string} Format.
   * @api
   */ getFormat() {
        return this.format_;
    }
    /**
   * Return the layer of the WMTS source.
   * @return {string} Layer.
   * @api
   */ getLayer() {
        return this.layer_;
    }
    /**
   * Return the matrix set of the WMTS source.
   * @return {string} MatrixSet.
   * @api
   */ getMatrixSet() {
        return this.matrixSet_;
    }
    /**
   * Return the request encoding, either "KVP" or "REST".
   * @return {RequestEncoding} Request encoding.
   * @api
   */ getRequestEncoding() {
        return this.requestEncoding_;
    }
    /**
   * Return the style of the WMTS source.
   * @return {string} Style.
   * @api
   */ getStyle() {
        return this.style_;
    }
    /**
   * Return the version of the WMTS source.
   * @return {string} Version.
   * @api
   */ getVersion() {
        return this.version_;
    }
    /**
   * @private
   * @return {string} The key for the current dimensions.
   */ getKeyForDimensions_() {
        const res = this.urls ? this.urls.slice(0) : [];
        for(const key in this.dimensions_)res.push(key + "-" + this.dimensions_[key]);
        return res.join("/");
    }
    /**
   * Update the dimensions.
   * @param {Object} dimensions Dimensions.
   * @api
   */ updateDimensions(dimensions) {
        Object.assign(this.dimensions_, dimensions);
        this.setKey(this.getKeyForDimensions_());
    }
    /**
   * @param {string} template Template.
   * @return {import("../Tile.js").UrlFunction} Tile URL function.
   */ createFromWMTSTemplate(template) {
        const requestEncoding = this.requestEncoding_;
        // context property names are lower case to allow for a case insensitive
        // replacement as some services use different naming conventions
        const context = {
            "layer": this.layer_,
            "style": this.style_,
            "tilematrixset": this.matrixSet_
        };
        if (requestEncoding == "KVP") Object.assign(context, {
            "Service": "WMTS",
            "Request": "GetTile",
            "Version": this.version_,
            "Format": this.format_
        });
        // TODO: we may want to create our own appendParams function so that params
        // order conforms to wmts spec guidance, and so that we can avoid to escape
        // special template params
        template = requestEncoding == "KVP" ? (0, _uriJs.appendParams)(template, context) : template.replace(/\{(\w+?)\}/g, function(m, p) {
            return p.toLowerCase() in context ? context[p.toLowerCase()] : m;
        });
        const tileGrid = /** @type {import("../tilegrid/WMTS.js").default} */ this.tileGrid;
        const dimensions = this.dimensions_;
        return(/**
       * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
       * @param {number} pixelRatio Pixel ratio.
       * @param {import("../proj/Projection.js").default} projection Projection.
       * @return {string|undefined} Tile URL.
       */ function(tileCoord, pixelRatio, projection) {
            if (!tileCoord) return undefined;
            const localContext = {
                "TileMatrix": tileGrid.getMatrixId(tileCoord[0]),
                "TileCol": tileCoord[1],
                "TileRow": tileCoord[2]
            };
            Object.assign(localContext, dimensions);
            let url = template;
            if (requestEncoding == "KVP") url = (0, _uriJs.appendParams)(url, localContext);
            else url = url.replace(/\{(\w+?)\}/g, function(m, p) {
                return localContext[p];
            });
            return url;
        });
    }
}
exports.default = WMTS;
function optionsFromCapabilities(wmtsCap, config) {
    const layers = wmtsCap["Contents"]["Layer"];
    const l = layers.find(function(elt) {
        return elt["Identifier"] == config["layer"];
    });
    if (!l) return null;
    const tileMatrixSets = wmtsCap["Contents"]["TileMatrixSet"];
    let idx;
    if (l["TileMatrixSetLink"].length > 1) {
        if ("projection" in config) idx = l["TileMatrixSetLink"].findIndex(function(elt) {
            const tileMatrixSet = tileMatrixSets.find(function(el) {
                return el["Identifier"] == elt["TileMatrixSet"];
            });
            const supportedCRS = tileMatrixSet["SupportedCRS"];
            const proj1 = (0, _projJs.get)(supportedCRS);
            const proj2 = (0, _projJs.get)(config["projection"]);
            if (proj1 && proj2) return (0, _projJs.equivalent)(proj1, proj2);
            return supportedCRS == config["projection"];
        });
        else idx = l["TileMatrixSetLink"].findIndex(function(elt) {
            return elt["TileMatrixSet"] == config["matrixSet"];
        });
    } else idx = 0;
    if (idx < 0) idx = 0;
    const matrixSet = /** @type {string} */ l["TileMatrixSetLink"][idx]["TileMatrixSet"];
    const matrixLimits = /** @type {Array<Object>} */ l["TileMatrixSetLink"][idx]["TileMatrixSetLimits"];
    let format = /** @type {string} */ l["Format"][0];
    if ("format" in config) format = config["format"];
    idx = l["Style"].findIndex(function(elt) {
        if ("style" in config) return elt["Title"] == config["style"];
        return elt["isDefault"];
    });
    if (idx < 0) idx = 0;
    const style = /** @type {string} */ l["Style"][idx]["Identifier"];
    const dimensions = {};
    if ("Dimension" in l) l["Dimension"].forEach(function(elt, index, array) {
        const key = elt["Identifier"];
        let value = elt["Default"];
        if (value === undefined) value = elt["Value"][0];
        dimensions[key] = value;
    });
    const matrixSets = wmtsCap["Contents"]["TileMatrixSet"];
    const matrixSetObj = matrixSets.find(function(elt) {
        return elt["Identifier"] == matrixSet;
    });
    let projection;
    const code = matrixSetObj["SupportedCRS"];
    if (code) projection = (0, _projJs.get)(code);
    if ("projection" in config) {
        const projConfig = (0, _projJs.get)(config["projection"]);
        if (projConfig) {
            if (!projection || (0, _projJs.equivalent)(projConfig, projection)) projection = projConfig;
        }
    }
    let wrapX = false;
    const switchXY = projection.getAxisOrientation().substr(0, 2) == "ne";
    let matrix = matrixSetObj.TileMatrix[0];
    // create default matrixLimit
    let selectedMatrixLimit = {
        MinTileCol: 0,
        MinTileRow: 0,
        // subtract one to end up at tile top left
        MaxTileCol: matrix.MatrixWidth - 1,
        MaxTileRow: matrix.MatrixHeight - 1
    };
    //in case of matrix limits, use matrix limits to calculate extent
    if (matrixLimits) {
        selectedMatrixLimit = matrixLimits[matrixLimits.length - 1];
        const m = matrixSetObj.TileMatrix.find((tileMatrixValue)=>tileMatrixValue.Identifier === selectedMatrixLimit.TileMatrix || matrixSetObj.Identifier + ":" + tileMatrixValue.Identifier === selectedMatrixLimit.TileMatrix);
        if (m) matrix = m;
    }
    const resolution = matrix.ScaleDenominator * 0.00028 / projection.getMetersPerUnit(); // WMTS 1.0.0: standardized rendering pixel size
    const origin = switchXY ? [
        matrix.TopLeftCorner[1],
        matrix.TopLeftCorner[0]
    ] : matrix.TopLeftCorner;
    const tileSpanX = matrix.TileWidth * resolution;
    const tileSpanY = matrix.TileHeight * resolution;
    let matrixSetExtent = matrixSetObj["BoundingBox"];
    if (matrixSetExtent && switchXY) matrixSetExtent = [
        matrixSetExtent[1],
        matrixSetExtent[0],
        matrixSetExtent[3],
        matrixSetExtent[2]
    ];
    let extent = [
        origin[0] + tileSpanX * selectedMatrixLimit.MinTileCol,
        // add one to get proper bottom/right coordinate
        origin[1] - tileSpanY * (1 + selectedMatrixLimit.MaxTileRow),
        origin[0] + tileSpanX * (1 + selectedMatrixLimit.MaxTileCol),
        origin[1] - tileSpanY * selectedMatrixLimit.MinTileRow
    ];
    if (matrixSetExtent !== undefined && !(0, _extentJs.containsExtent)(matrixSetExtent, extent)) {
        const wgs84BoundingBox = l["WGS84BoundingBox"];
        const wgs84ProjectionExtent = (0, _projJs.get)("EPSG:4326").getExtent();
        extent = matrixSetExtent;
        if (wgs84BoundingBox) wrapX = wgs84BoundingBox[0] === wgs84ProjectionExtent[0] && wgs84BoundingBox[2] === wgs84ProjectionExtent[2];
        else {
            const wgs84MatrixSetExtent = (0, _projJs.transformExtent)(matrixSetExtent, matrixSetObj["SupportedCRS"], "EPSG:4326");
            // Ignore slight deviation from the correct x limits
            wrapX = wgs84MatrixSetExtent[0] - 1e-10 <= wgs84ProjectionExtent[0] && wgs84MatrixSetExtent[2] + 1e-10 >= wgs84ProjectionExtent[2];
        }
    }
    const tileGrid = (0, _wmtsJs.createFromCapabilitiesMatrixSet)(matrixSetObj, extent, matrixLimits);
    /** @type {!Array<string>} */ const urls = [];
    let requestEncoding = config["requestEncoding"];
    requestEncoding = requestEncoding !== undefined ? requestEncoding : "";
    if ("OperationsMetadata" in wmtsCap && "GetTile" in wmtsCap["OperationsMetadata"]) {
        const gets = wmtsCap["OperationsMetadata"]["GetTile"]["DCP"]["HTTP"]["Get"];
        for(let i = 0, ii = gets.length; i < ii; ++i){
            if (gets[i]["Constraint"]) {
                const constraint = gets[i]["Constraint"].find(function(element) {
                    return element["name"] == "GetEncoding";
                });
                const encodings = constraint["AllowedValues"]["Value"];
                if (requestEncoding === "") // requestEncoding not provided, use the first encoding from the list
                requestEncoding = encodings[0];
                if (requestEncoding === "KVP") {
                    if (encodings.includes("KVP")) urls.push(/** @type {string} */ gets[i]["href"]);
                } else break;
            } else if (gets[i]["href"]) {
                requestEncoding = "KVP";
                urls.push(/** @type {string} */ gets[i]["href"]);
            }
        }
    }
    if (urls.length === 0) {
        requestEncoding = "REST";
        l["ResourceURL"].forEach(function(element) {
            if (element["resourceType"] === "tile") {
                format = element["format"];
                urls.push(/** @type {string} */ element["template"]);
            }
        });
    }
    return {
        urls: urls,
        layer: config["layer"],
        matrixSet: matrixSet,
        format: format,
        projection: projection,
        requestEncoding: requestEncoding,
        tileGrid: tileGrid,
        style: style,
        dimensions: dimensions,
        wrapX: wrapX,
        crossOrigin: config["crossOrigin"]
    };
}

},{"./TileImage.js":"2cBKP","../uri.js":"ewQ9r","../extent.js":"6YrVc","../tilegrid/WMTS.js":"jT45v","../tileurlfunction.js":"gOwFC","../proj.js":"SznqC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ewQ9r":[function(require,module,exports) {
/**
 * @module ol/uri
 */ /**
 * Appends query parameters to a URI.
 *
 * @param {string} uri The original URI, which may already have query data.
 * @param {!Object} params An object where keys are URI-encoded parameter keys,
 *     and the values are arbitrary types or arrays.
 * @return {string} The new URI.
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "appendParams", ()=>appendParams);
function appendParams(uri, params) {
    /** @type {Array<string>} */ const keyParams = [];
    // Skip any null or undefined parameter values
    Object.keys(params).forEach(function(k) {
        if (params[k] !== null && params[k] !== undefined) keyParams.push(k + "=" + encodeURIComponent(params[k]));
    });
    const qs = keyParams.join("&");
    // remove any trailing ? or &
    uri = uri.replace(/[?&]$/, "");
    // append ? or & depending on whether uri has existing parameters
    uri += uri.includes("?") ? "&" : "?";
    return uri + qs;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jT45v":[function(require,module,exports) {
/**
 * @module ol/tilegrid/WMTS
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Create a tile grid from a WMTS capabilities matrix set and an
 * optional TileMatrixSetLimits.
 * @param {Object} matrixSet An object representing a matrixSet in the
 *     capabilities document.
 * @param {import("../extent.js").Extent} [extent] An optional extent to restrict the tile
 *     ranges the server provides.
 * @param {Array<Object>} [matrixLimits] An optional object representing
 *     the available matrices for tileGrid.
 * @return {WMTSTileGrid} WMTS tileGrid instance.
 * @api
 */ parcelHelpers.export(exports, "createFromCapabilitiesMatrixSet", ()=>createFromCapabilitiesMatrixSet);
var _tileGridJs = require("./TileGrid.js");
var _tileGridJsDefault = parcelHelpers.interopDefault(_tileGridJs);
var _projJs = require("../proj.js");
/**
 * @typedef {Object} Options
 * @property {import("../extent.js").Extent} [extent] Extent for the tile grid. No tiles
 * outside this extent will be requested by {@link module:ol/source/Tile~TileSource} sources.
 * When no `origin` or `origins` are configured, the `origin` will be set to the
 * top-left corner of the extent.
 * @property {import("../coordinate.js").Coordinate} [origin] The tile grid origin, i.e.
 * where the `x` and `y` axes meet (`[z, 0, 0]`). Tile coordinates increase left
 * to right and downwards. If not specified, `extent` or `origins` must be provided.
 * @property {Array<import("../coordinate.js").Coordinate>} [origins] Tile grid origins,
 * i.e. where the `x` and `y` axes meet (`[z, 0, 0]`), for each zoom level. If
 * given, the array length should match the length of the `resolutions` array, i.e.
 * each resolution can have a different origin. Tile coordinates increase left to
 * right and downwards. If not specified, `extent` or `origin` must be provided.
 * @property {!Array<number>} resolutions Resolutions. The array index of each
 * resolution needs to match the zoom level. This means that even if a `minZoom`
 * is configured, the resolutions array will have a length of `maxZoom + 1`
 * @property {!Array<string>} matrixIds matrix IDs. The length of this array needs
 * to match the length of the `resolutions` array.
 * @property {Array<import("../size.js").Size>} [sizes] Number of tile rows and columns
 * of the grid for each zoom level. The values here are the `TileMatrixWidth` and
 * `TileMatrixHeight` advertised in the GetCapabilities response of the WMTS, and
 * define each zoom level's extent together with the `origin` or `origins`.
 * A grid `extent` can be configured in addition, and will further limit the extent for
 * which tile requests are made by sources. If the bottom-left corner of
 * an extent is used as `origin` or `origins`, then the `y` value must be
 * negative because OpenLayers tile coordinates use the top left as the origin.
 * @property {number|import("../size.js").Size} [tileSize] Tile size.
 * @property {Array<number|import("../size.js").Size>} [tileSizes] Tile sizes. The length of
 * this array needs to match the length of the `resolutions` array.
 */ /**
 * @classdesc
 * Set the grid pattern for sources accessing WMTS tiled-image servers.
 * @api
 */ class WMTSTileGrid extends (0, _tileGridJsDefault.default) {
    /**
   * @param {Options} options WMTS options.
   */ constructor(options){
        super({
            extent: options.extent,
            origin: options.origin,
            origins: options.origins,
            resolutions: options.resolutions,
            tileSize: options.tileSize,
            tileSizes: options.tileSizes,
            sizes: options.sizes
        });
        /**
     * @private
     * @type {!Array<string>}
     */ this.matrixIds_ = options.matrixIds;
    }
    /**
   * @param {number} z Z.
   * @return {string} MatrixId..
   */ getMatrixId(z) {
        return this.matrixIds_[z];
    }
    /**
   * Get the list of matrix identifiers.
   * @return {Array<string>} MatrixIds.
   * @api
   */ getMatrixIds() {
        return this.matrixIds_;
    }
}
exports.default = WMTSTileGrid;
function createFromCapabilitiesMatrixSet(matrixSet, extent, matrixLimits) {
    /** @type {!Array<number>} */ const resolutions = [];
    /** @type {!Array<string>} */ const matrixIds = [];
    /** @type {!Array<import("../coordinate.js").Coordinate>} */ const origins = [];
    /** @type {!Array<number|import("../size.js").Size>} */ const tileSizes = [];
    /** @type {!Array<import("../size.js").Size>} */ const sizes = [];
    matrixLimits = matrixLimits !== undefined ? matrixLimits : [];
    const supportedCRSPropName = "SupportedCRS";
    const matrixIdsPropName = "TileMatrix";
    const identifierPropName = "Identifier";
    const scaleDenominatorPropName = "ScaleDenominator";
    const topLeftCornerPropName = "TopLeftCorner";
    const tileWidthPropName = "TileWidth";
    const tileHeightPropName = "TileHeight";
    const code = matrixSet[supportedCRSPropName];
    const projection = (0, _projJs.get)(code);
    const metersPerUnit = projection.getMetersPerUnit();
    // swap origin x and y coordinates if axis orientation is lat/long
    const switchOriginXY = projection.getAxisOrientation().substr(0, 2) == "ne";
    matrixSet[matrixIdsPropName].sort(function(a, b) {
        return b[scaleDenominatorPropName] - a[scaleDenominatorPropName];
    });
    matrixSet[matrixIdsPropName].forEach(function(elt) {
        let matrixAvailable;
        // use of matrixLimits to filter TileMatrices from GetCapabilities
        // TileMatrixSet from unavailable matrix levels.
        if (matrixLimits.length > 0) matrixAvailable = matrixLimits.find(function(elt_ml) {
            if (elt[identifierPropName] == elt_ml[matrixIdsPropName]) return true;
            // Fallback for tileMatrix identifiers that don't get prefixed
            // by their tileMatrixSet identifiers.
            if (!elt[identifierPropName].includes(":")) return matrixSet[identifierPropName] + ":" + elt[identifierPropName] === elt_ml[matrixIdsPropName];
            return false;
        });
        else matrixAvailable = true;
        if (matrixAvailable) {
            matrixIds.push(elt[identifierPropName]);
            const resolution = elt[scaleDenominatorPropName] * 0.28e-3 / metersPerUnit;
            const tileWidth = elt[tileWidthPropName];
            const tileHeight = elt[tileHeightPropName];
            if (switchOriginXY) origins.push([
                elt[topLeftCornerPropName][1],
                elt[topLeftCornerPropName][0]
            ]);
            else origins.push(elt[topLeftCornerPropName]);
            resolutions.push(resolution);
            tileSizes.push(tileWidth == tileHeight ? tileWidth : [
                tileWidth,
                tileHeight
            ]);
            sizes.push([
                elt["MatrixWidth"],
                elt["MatrixHeight"]
            ]);
        }
    });
    return new WMTSTileGrid({
        extent: extent,
        origins: origins,
        resolutions: resolutions,
        matrixIds: matrixIds,
        tileSizes: tileSizes,
        sizes: sizes
    });
}

},{"./TileGrid.js":"cZOJJ","../proj.js":"SznqC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"62tDj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "style", ()=>style);
/**
 *
 * @return {VectorLayer}
 */ parcelHelpers.export(exports, "createShadowLayer", ()=>createShadowLayer);
var _style = require("ol/style");
var _vectorJs = require("ol/source/Vector.js");
var _vectorJsDefault = parcelHelpers.interopDefault(_vectorJs);
var _vectorJs1 = require("ol/layer/Vector.js");
var _vectorJsDefault1 = parcelHelpers.interopDefault(_vectorJs1);
const style = new (0, _style.Style)({
    stroke: new (0, _style.Stroke)({
        color: "#00cc33aa",
        width: 6
    })
});
function createShadowLayer() {
    const source = new (0, _vectorJsDefault.default)();
    const layer = new (0, _vectorJsDefault1.default)({
        source,
        style
    });
    return layer;
}

},{"ol/style":"hEQxF","ol/source/Vector.js":"9w7Fr","ol/layer/Vector.js":"iTrAy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eJ2Wz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getTrack", ()=>getTrack);
parcelHelpers.export(exports, "getPOIs", ()=>getPOIs);
var _coordinate = require("ol/coordinate");
var _geoJSON = require("ol/format/GeoJSON");
var _geoJSONDefault = parcelHelpers.interopDefault(_geoJSON);
var _feature = require("ol/Feature");
var _featureDefault = parcelHelpers.interopDefault(_feature);
var _geom = require("ol/geom");
var _epsg21781 = require("@geoblocks/proj/src/EPSG_21781");
const geojson = new (0, _geoJSONDefault.default)();
function coordinateIndex(coordinates, coordinate) {
    return coordinates.findIndex((c)=>(0, _coordinate.equals)(c, coordinate));
}
async function getTrack(id, projection) {
    const response = await fetch(`https://map.veloland.ch/api/4/tracks/${id}`);
    const track = geojson.readFeature(await response.json());
    const viaPoints = JSON.parse(track.get("via_points"));
    console.assert(viaPoints.length >= 2);
    const coordinates = track.getGeometry().getCoordinates();
    const features = viaPoints.map((viaPoint, index)=>{
        return new (0, _featureDefault.default)({
            geometry: new (0, _geom.Point)(viaPoint).transform((0, _epsg21781.proj), projection),
            type: "controlPoint",
            snapped: true,
            index: index
        });
    });
    features.at(0).set("subtype", "first");
    features.at(-1).set("subtype", "last");
    for(let i = 0; i < viaPoints.length - 1; i++){
        const indexFrom = coordinateIndex(coordinates, viaPoints[i]);
        const indexTo = coordinateIndex(coordinates, viaPoints[i + 1]);
        features.push(new (0, _featureDefault.default)({
            geometry: new (0, _geom.LineString)(coordinates.slice(indexFrom, indexTo)).transform((0, _epsg21781.proj), projection),
            type: "segment",
            snapped: true
        }));
    }
    return features;
}
async function getPOIs(id, projection) {
    const response = await fetch(`https://map.veloland.ch/api/4/tracks/${id}/pois`);
    const pois = geojson.readFeatures(await response.json());
    return pois.map((poi)=>{
        poi.getGeometry().transform((0, _epsg21781.proj), projection);
        poi.set("type", "POI");
        return poi;
    });
}

},{"ol/coordinate":"85Vu7","ol/format/GeoJSON":"1bsdX","ol/Feature":"liabO","ol/geom":"8Nc7o","@geoblocks/proj/src/EPSG_21781":"6TlJ1","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6TlJ1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "code", ()=>code);
parcelHelpers.export(exports, "proj", ()=>proj);
var _somercJs = require("./somerc.js");
var _somercJsDefault = parcelHelpers.interopDefault(_somercJs);
var _utilsJs = require("./utils.js");
const code = "EPSG:21781";
const def = `
  +proj=${(0, _somercJsDefault.default)}
  +lat_0=46.95240555555556
  +lon_0=7.439583333333333
  +k_0=1
  +x_0=600000
  +y_0=200000
  +ellps=bessel
  +towgs84=674.374,15.056,405.346,0,0,0,0
  +units=m
  +no_defs
`;
const extent = [
    420000,
    30000,
    900000,
    350000
];
const proj = (0, _utilsJs.create)(code, def, extent);
exports.default = code;

},{"./somerc.js":"6Pnfv","./utils.js":"eP837","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["i6XE1","8GBxa"], "8GBxa", "parcelRequireed82")

//# sourceMappingURL=schm.90888e37.js.map
