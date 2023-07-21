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
})({"M6Z7R":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
module.bundle.HMR_BUNDLE_ID = "f169c7218341b5a4";
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
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome;
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
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
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
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
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
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
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

},{}],"f4bRs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _trackManager = require("../../src/interaction/TrackManager");
var _trackManagerDefault = parcelHelpers.interopDefault(_trackManager);
var _graphHopper = require("../../src/router/GraphHopper");
var _graphHopperDefault = parcelHelpers.interopDefault(_graphHopper);
var _index = require("../../src/profiler/index");
var _profileTs = require("../../src/Profile.ts");
var _profileTsDefault = parcelHelpers.interopDefault(_profileTs);
var _style = require("./style");
var _style1 = require("ol/style");
var _osm = require("./osm");
const ROUTING_URL = "https://graphhopper-all.schweizmobil.ch/route?vehicle=schmwander&type=json&weighting=fastest&elevation=true&way_point_max_distance=0&instructions=false&points_encoded=true";
function main() {
    const { map, trackLayer, shadowTrackLayer } = (0, _osm.createMap)("map");
    const router = new (0, _graphHopperDefault.default)({
        map: map,
        url: ROUTING_URL,
        mapProjection: map.getView().getProjection()
    });
    const profiler = new (0, _index.FallbackProfiler)({
        profilers: [
            new (0, _index.ExtractFromSegmentProfiler)(),
            new (0, _index.SwisstopoProfiler)({
                projection: map.getView().getProjection()
            })
        ]
    });
    /**
   * @param {MapBrowserEvent} mapBrowserEvent
   * @return {boolean}
   */ const altKeyAndOptionallyShift = function(mapBrowserEvent) {
        const originalEvent = /** @type {MouseEvent} */ mapBrowserEvent.originalEvent;
        return originalEvent.altKey && !(originalEvent.metaKey || originalEvent.ctrlKey);
    };
    // by default there is no delete condition (clicking on a CP will delete it)
    // but it is still possible to pass a custom deleteCondition
    let deleteCondition = altKeyAndOptionallyShift;
    deleteCondition = undefined;
    const trackManager = new (0, _trackManagerDefault.default)({
        map: map,
        router: router,
        profiler: profiler,
        trackLayer: trackLayer,
        shadowTrackLayer: shadowTrackLayer,
        style: (0, _style.styleFunction),
        deleteCondition: deleteCondition,
        hitTolerance: 10
    });
    window.trackManager = trackManager;
    /**
   * @type {Profile}
   */ const d3Profile = new (0, _profileTsDefault.default)({
        map: map,
        profileTarget: "#profile"
    });
    trackManager.addTrackChangeEventListener(()=>{
        const segments = trackManager.getSegments();
        d3Profile.refreshProfile(segments);
    });
    trackManager.addTrackHoverEventListener((distance)=>{
        if (distance !== undefined) d3Profile.highlight(distance);
        else d3Profile.clearHighlight();
    });
    trackManager.mode = "edit";
    const tmEl = document.querySelector("#trackmode");
    tmEl.addEventListener("change", (evt)=>trackManager.mode = evt.target.value);
    document.querySelector("#snap").addEventListener("click", ()=>{
        trackManager.snapping = !trackManager.snapping;
    });
    document.querySelector("#delete").addEventListener("click", ()=>{
        trackManager.deleteLastPoint();
    });
    document.querySelector("#clear").addEventListener("click", ()=>{
        trackManager.clear();
    });
    document.querySelector("#undo").addEventListener("click", ()=>trackManager.undo());
    document.querySelector("#redo").addEventListener("click", ()=>trackManager.redo());
    document.querySelector("#getTrackData").addEventListener("click", ()=>{
        trackManager.getTrackFeature();
        const features = [
            ...trackManager.getControlPoints(),
            ...trackManager.getSegments(),
            ...trackManager.getPOIs()
        ];
        trackManager.restoreFeatures(features);
    });
    document.querySelector("#reverse").addEventListener("click", ()=>{
        trackManager.reverse();
    });
    d3Profile.setTrackHoverStyle(new (0, _style1.Style)({
        image: new (0, _style1.Circle)({
            fill: new (0, _style1.Fill)({
                color: "blue"
            }),
            radius: 9
        })
    }));
}
main();

},{"../../src/interaction/TrackManager":"bPLJ7","../../src/router/GraphHopper":"g55Xa","../../src/profiler/index":"d5CmD","../../src/Profile.ts":"i4hMD","./style":"bV6WG","ol/style":"hEQxF","./osm":"2SIll","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"i4hMD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _featureJs = require("ol/Feature.js");
var _featureJsDefault = parcelHelpers.interopDefault(_featureJs);
var _vectorJs = require("ol/source/Vector.js");
var _vectorJsDefault = parcelHelpers.interopDefault(_vectorJs);
var _pointJs = require("ol/geom/Point.js");
var _pointJsDefault = parcelHelpers.interopDefault(_pointJs);
var _vectorJs1 = require("ol/layer/Vector.js");
var _vectorJsDefault1 = parcelHelpers.interopDefault(_vectorJs1);
// @ts-ignore FIXME: introduce a type declaration
var _d3ElevationJs = require("@geoblocks/d3profile/src/d3Elevation.js");
var _d3ElevationJsDefault = parcelHelpers.interopDefault(_d3ElevationJs);
const defaultStyleDefs = `
.domain {
  color: rgb(0, 130, 205);
}
.y.axis .tick:first-of-type, .y.axis .tick:last-of-type {
  display: inline;
}
.x.axis .domain, .y.axis .domain {
  stroke: rgb(0, 130, 205) !important;
}
.x.label, .y.label {
  display: none;
}
.x.grid-hover line, .y.grid-hover line {
  stroke-dasharray: none !important;
  stroke: rgb(0, 130, 205) !important;
  stroke-width: 0.7 !important;
}
.line.elevation {
  stroke-width: 2;
}
.area {
  fill: #fff !important;
}`;
class Profile {
    constructor(options){
        this.hoverActive = true;
        this.map = options.map;
        this.profileTarget = options.profileTarget;
        this.styleDefs = options.styleDefs || defaultStyleDefs;
        const callbacks = this.createProfileCallbacks_();
        function distanceExtractor(item) {
            return item.dist;
        }
        function zExtractor(item) {
            return item.ele;
        }
        this.profile = (0, _d3ElevationJsDefault.default)({
            distanceExtractor,
            linesConfiguration: {
                elevation: {
                    zExtractor
                }
            },
            lightXAxis: options.lightXAxis,
            styleDefs: this.styleDefs,
            hoverCallback: callbacks.hoverCallback,
            outCallback: callbacks.outCallback
        });
    }
    createProfileCallbacks_() {
        const profileHoverGeometry = new (0, _pointJsDefault.default)([
            0,
            0
        ]);
        this.hoverFeature = new (0, _featureJsDefault.default)({
            geometry: profileHoverGeometry
        });
        const profileHoverVector = new (0, _vectorJsDefault1.default)({
            visible: false,
            source: new (0, _vectorJsDefault.default)({
                features: [
                    this.hoverFeature
                ]
            })
        });
        this.map.addLayer(profileHoverVector);
        const outCallback = ()=>{
            profileHoverVector.setVisible(false);
        };
        const hoverCallback = (item)=>{
            if (this.hoverActive) {
                // An item in the list of points given to the profile.
                profileHoverGeometry.setCoordinates([
                    item.x,
                    item.y
                ]);
                profileHoverVector.setVisible(true); // no notify if already visible
            }
        };
        return {
            outCallback,
            hoverCallback
        };
    }
    getTrackProfile(segments) {
        let profile = [];
        let previousDistance = 0;
        for (const segment of segments){
            const segmentProfile = segment.get("profile");
            if (segmentProfile.length > 0) {
                profile = profile.concat(segmentProfile.map((item)=>{
                    return {
                        x: item[0],
                        y: item[1],
                        ele: item[2],
                        dist: previousDistance + item[3]
                    };
                }));
                previousDistance = profile[profile.length - 1].dist;
            }
        }
        return profile;
    }
    refreshProfile(segments) {
        const trackProfile = this.getTrackProfile(segments);
        this.profile.refreshProfile(this.profileTarget, trackProfile.length > 0 ? trackProfile : undefined);
    }
    setTrackHoverStyle(style) {
        this.hoverFeature.setStyle(style);
    }
    /**
   * Remove any highlight.
   * Fire the outCallback callback.
   */ clearHighlight() {
        this.profile.clearHighlight();
    }
    /*
   * Highlight the given distance and corresponding elevation on chart.
   * Fire the hoverCallback callback with corresponding point.
   */ highlight(distance) {
        this.profile.highlight(distance);
    }
}
exports.default = Profile;

},{"ol/Feature.js":"liabO","ol/source/Vector.js":"9w7Fr","ol/geom/Point.js":"hx2Ar","ol/layer/Vector.js":"iTrAy","@geoblocks/d3profile/src/d3Elevation.js":"96MpX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"96MpX":[function(require,module,exports) {
// @ts-nocheck
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Provides a D3js component to be used to draw an elevation
 * profile chart.
 *
 *     let selection = d3.select('#element_id');
 *     let profile = ngeo.profile.d3Elevation({
 *       distanceExtractor: function (item) {return item['dist'];},
 *       linesConfiguration: {
 *         'lineZ1': {
 *           zExtractor: function (item) {return item['values']['z1'];}
 *         },
 *         'lineZ2': {
 *           color: '#00F',
 *           zExtractor: function (item) {return item['values']['z2'];}
 *         }
 *       },
 *       hoverCallback: function(point, dist, xUnits, elevations, yUnits) {
 *         console.log(point.x, point.y);
 *       },
 *       outCallback: function() {
 *         console.log("out");
 *       }
 *     });
 *     selection.datum(data).call(profile);
 *
 * The selection data must be an array.
 * The layout for the items of this array is unconstrained: the distance values
 * is extracted using the distanceExtractor config option and multiples z values
 * can be displayed by providing multiple linesConfiguration with its specific
 * zExtractor.
 * Optionally you can provide a color in your linesConfiguration. A line without
 * color will be red. Each linesConfiguration name is used as class for its
 * respective line. So you can pass a styleDefs config option (inline css) to
 * customize the line or all the chart.
 * Optionally, POIs can be displayed and depend on a poiExtractor
 * config option.
 *
 * The data below will work for the above example:
 *
 *     [
 *         {
 *             "y": 199340,
 *             "values": {"z1": 788.7, "z2": 774.2},
 *             "dist": 0.0,
 *             "x": 541620
 *         }, ...
 *     ]
 *
 * @return {Object} D3js component.
 * @param {ProfileOptions} options Profile options.
 * @export
 */ parcelHelpers.export(exports, "default", ()=>function(options) {
        /**
   * Whether the simplified profile should be shown.
   * @type {boolean}
   */ const light = options.light !== undefined ? options.light : false;
        /**
   * The values for margins around the chart defined in pixels.
   */ const margin = light ? {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        } : {
            top: 10,
            right: 20,
            bottom: 30,
            left: 40
        };
        /**
   * Hover callback function.
   * @type {function(Object, number, string, Object.<string, number>, string):void}
   */ const hoverCallback = options.hoverCallback !== undefined ? options.hoverCallback : ()=>{};
        /**
   * Out callback function.
   * @type {function():void}
   */ const outCallback = options.outCallback !== undefined ? options.outCallback : ()=>{};
        /**
   * Distance data extractor used to get the dist values.
   */ const distanceExtractor = options.distanceExtractor;
        /**
   * Line configuration object.
   */ const linesConfiguration = options.linesConfiguration;
        /**
   * Number of different configurations for the line.
   */ const numberOfLines = Object.keys(linesConfiguration).length;
        /**
   * Method to get the index of the closest distance.
   */ const closestDistance = (array, d)=>{
            let prevDist = Number.POSITIVE_INFINITY;
            for(let i = 0; i < array.length; ++i){
                const diff = Math.abs(d - distanceExtractor(array[i]));
                if (diff > prevDist) return i - 1;
                prevDist = diff;
            }
            return array.length - 1;
        };
        /**
   * POI data extractor.
   */ const poiExtractor = options.poiExtractor;
        /**
   * Optional SVG inline style.
   */ const styleDefs = options.styleDefs;
        /**
   * @type {number}
   */ const poiLabelAngle = options.poiLabelAngle !== undefined ? options.poiLabelAngle : -60;
        /**
   * @type {Object.<string, string>}
   */ const i18n = options.i18n || {};
        /**
   * @type {string}
   */ const xAxisLabel = i18n.xAxis || "Distance";
        /**
   * @type {string}
   */ const yAxisLabel = i18n.yAxis || "Elevation";
        /**
   * @type {ProfileFormatter}
   */ const formatter = {
            /**
     * @param {number} dist Distance.
     * @param {string} units Units.
     * @return {string} Distance.
     */ xhover (dist, units) {
                return `${parseFloat(dist.toPrecision(3))} ${units}`;
            },
            /**
     * @param {number} ele Elevation.
     * @param {string} units Units.
     * @return {string} Elevation.
     */ yhover (ele, units) {
                return `${Math.round(ele)} ${units}`;
            },
            /**
     * @param {number} dist Distance.
     * @param {string} _ Units.
     * @return {string|number} Distance.
     */ xtick (dist, _) {
                return dist;
            },
            /**
     * @param {number} ele Elevation.
     * @param {string} _ Units.
     * @return {string|number} Elevation.
     */ ytick (ele, _) {
                return ele;
            }
        };
        Object.assign(formatter, options.formatter);
        /**
   * @type {boolean}
   */ const lightXAxis = options.lightXAxis !== undefined ? options.lightXAxis : false;
        // Objects shared with the showPois function
        /**
   * @type {Object}
   */ let svg;
        /**
   * D3 x scale.
   */ let x;
        /**
   * D3 y scale.
   */ let y;
        /**
   * Scale modifier to allow customizing the x and y scales.
   */ const scaleModifier = options.scaleModifier;
        let g;
        /**
   * Height of the chart in pixels
   */ let height;
        /**
   * Width of the chart in pixels
   */ let width;
        /**
  * Factor to determine whether to use 'm' or 'km'.
  */ let xFactor;
        /**
  * Distance units. Either 'm' or 'km'.
  */ let xUnits;
        /**
   * D3 extent of the distance.
   */ let xDomain;
        const profile = function(selection) {
            selection.each(function(data) {
                d3.select(this).selectAll("svg").remove();
                if (data === undefined) return;
                width = Math.max(this.clientWidth - margin.right - margin.left, 0);
                x = d3.scaleLinear().range([
                    0,
                    width
                ]);
                height = Math.max(this.clientHeight - margin.top - margin.bottom, 0);
                y = d3.scaleLinear().range([
                    height,
                    0
                ]);
                const xAxis = d3.axisBottom(x);
                const yAxis = d3.axisLeft(y);
                let area;
                if (numberOfLines === 1) area = d3.area().x((d)=>x(distanceExtractor(d))).y0(height).y1((d)=>{
                    const firstLineName = Object.keys(linesConfiguration)[0];
                    return y(linesConfiguration[firstLineName].zExtractor(d));
                });
                // Select the svg element, if it exists.
                svg = d3.select(this).selectAll("svg").data([
                    data
                ]);
                // Otherwise, create the skeletal chart.
                const svgEnter = svg.enter().append("svg");
                // Then select it again to get the complete object.
                svg = d3.select(this).selectAll("svg").data([
                    data
                ]);
                if (styleDefs !== undefined) svgEnter.append("defs").append("style").attr("type", "text/css").text(styleDefs);
                const gEnter = svgEnter.append("g");
                clearPois();
                gEnter.style("font", "11px Arial");
                if (numberOfLines === 1) gEnter.append("path").attr("class", "area").style("fill", "rgba(222, 222, 222, 0.5)");
                gEnter.insert("g", ":first-child").attr("class", "grid-y");
                if (!light) {
                    gEnter.append("g").attr("class", "x axis").attr("transform", `translate(0,${height})`);
                    gEnter.append("text").attr("class", "x label").attr("text-anchor", "end").attr("x", width - 4).attr("y", height - 4);
                    gEnter.append("g").attr("class", "y axis");
                    gEnter.append("text").attr("class", "y label").attr("text-anchor", "end").attr("y", 6).attr("dy", ".75em").attr("transform", "rotate(-90)").style("fill", "grey").text(`${yAxisLabel} [m]`);
                    gEnter.append("g").attr("class", "metas").attr("transform", `translate(${width + 3}, 0)`);
                }
                gEnter.append("g").attr("class", "pois");
                const xHover = gEnter.append("g").attr("class", "x grid-hover");
                xHover.append("svg:line").attr("stroke-dasharray", "5,5");
                xHover.append("text");
                gEnter.append("rect").attr("class", "overlay").attr("width", width).attr("height", height).style("fill", "none").style("pointer-events", "all");
                // Update the outer dimensions.
                svg.attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom);
                // Update the inner dimensions.
                g = svg.select("g").attr("transform", `translate(${margin.left},${margin.top})`);
                xDomain = d3.extent(data, (d)=>distanceExtractor(d));
                x.domain(xDomain);
                // Return an array with the min and max value of the min/max values of
                // each lines.
                const yDomain = function() {
                    let elevationsValues = [];
                    let extent, name;
                    // Get min/max values (extent) of each lines.
                    for(name in linesConfiguration){
                        extent = d3.extent(data, (d)=>linesConfiguration[name].zExtractor(d));
                        elevationsValues = elevationsValues.concat(extent);
                    }
                    return [
                        Math.min.apply(null, elevationsValues),
                        Math.max.apply(null, elevationsValues)
                    ];
                }();
                y.domain(yDomain).nice();
                // set the ratio according to the horizontal distance
                if (scaleModifier !== undefined) scaleModifier(x, y, width, height);
                // Update the area path.
                if (numberOfLines === 1) g.select(".area").transition().attr("d", area);
                // Set style and update the lines paths and y hover guides for each lines.
                let line, name, yHover;
                for(name in linesConfiguration){
                    // Set style of each line and add a class with its respective name.
                    gEnter.append("path").attr("class", `line ${name}`).style("stroke", linesConfiguration[name].color || "#F00").style("fill", "none");
                    // Set y hover guides
                    yHover = gEnter.append("g").attr("class", `y grid-hover ${name}`);
                    yHover.append("svg:line").attr("stroke-dasharray", "5,5");
                    yHover.append("text");
                    // Configure the d3 line.
                    line = d3.line().x((d)=>x(distanceExtractor(d))).y((d)=>y(linesConfiguration[name].zExtractor(d)));
                    // Update path for the line.
                    g.select(`.line.${name}`).transition().attr("d", line);
                }
                if (xDomain[1] > 2000) {
                    xFactor = 1000;
                    xUnits = "km";
                } else {
                    xFactor = 1;
                    xUnits = "m";
                }
                if (!light) {
                    xAxis.tickFormat((d)=>formatter.xtick(d / xFactor, xUnits));
                    if (lightXAxis) {
                        xAxis.tickValues([
                            0,
                            x.domain()[1]
                        ]);
                        xAxis.tickSizeOuter(0);
                        yAxis.tickSizeOuter(0);
                        yAxis.tickSizeInner(0);
                    }
                    yAxis.tickFormat((d)=>formatter.ytick(d, "m"));
                    g.select(".x.axis").transition().call(xAxis);
                    g.select(".x.label").text(`${xAxisLabel} [${xUnits}]`).style("fill", "grey").style("shape-rendering", "crispEdges");
                    // Avoid too much lines with overlapping labels in small profiles
                    if (height / 15 < 10) yAxis.ticks(height / 15);
                    g.select(".y.axis").transition().call(yAxis);
                }
                g.select(".grid-y").transition().call(yAxis.tickSize(-width, 0).tickFormat("")).selectAll(".tick line").style("stroke", "#ccc").style("opacity", 0.7);
                g.selectAll(".axis").selectAll("path, line").style("fill", "none").style("stroke", "#000").style("shape-rendering", "crispEdges");
                g.select(".grid-y").select("path").style("stroke", "none");
                g.selectAll(".grid-hover line").style("stroke", "#222").style("opacity", 0.8);
                g.select(".overlay").on("mouseout", mouseout).on("mousemove", mousemove);
                function mousemove() {
                    const mouseX = d3.mouse(this)[0];
                    const x0 = x.invert(mouseX);
                    profile.highlight(x0);
                }
                function mouseout() {
                    profile.clearHighlight();
                }
            });
        };
        /**
   * Remove any highlight.
   * Fire the outCallback callback.
   */ profile.clearHighlight = function() {
            if (!g) return;
            g.selectAll(".grid-hover").style("display", "none");
            outCallback();
        };
        /**
   * @param {string|HTMLElement} target
   * @param {Array} datum
   */ profile.refreshProfile = function(target, datum) {
            d3.select(target).datum(datum).call(this);
        };
        /**
   * Highlight the given distance and corresponding elevation on chart.
   * Fire the hoverCallback callback with corresponding point.
   * @param {number} distance Distance.
   */ profile.highlight = function(distance) {
            if (!svg) return;
            const data = svg.datum();
            const i = closestDistance(data, distance);
            if (i >= data.length) return;
            const point = data[i];
            const dist = distanceExtractor(point);
            let elevation;
            const elevations = [];
            const elevationsRef = {};
            let lineName;
            for(lineName in linesConfiguration){
                elevation = linesConfiguration[lineName].zExtractor(point);
                elevations.push(elevation);
                elevationsRef[lineName] = elevation;
                g.select(`.y.grid-hover.${lineName}`).style("display", "inline").select("line").attr("x1", x(0)).attr("y1", y(elevation)).attr("x2", width).attr("y2", y(elevation));
            }
            g.select(".x.grid-hover").style("display", "inline").select("line").attr("x1", x(dist)).attr("y1", height).attr("x2", x(dist)).attr("y2", y(Math.max.apply(null, elevations)));
            const right = dist > xDomain[1] / 2;
            let xtranslate = x(dist);
            xtranslate += right ? -10 : 10;
            g.select(".x.grid-hover text").text(formatter.xhover(dist / xFactor, xUnits)).style("text-anchor", right ? "end" : "start").attr("transform", `translate(${xtranslate},${height - 10})`);
            const yUnits = "m";
            // Display altitude on guides only if there is one line.
            if (numberOfLines === 1) g.select(".y.grid-hover text").text(formatter.yhover(elevations[0], "m")).style("text-anchor", right ? "end" : "start").attr("transform", `translate(${xtranslate},${y(elevations[0]) - 10})`);
            hoverCallback(point, dist / xFactor, xUnits, elevationsRef, yUnits);
        };
        profile.showPois = function(pois) {
            pois = pois !== undefined ? pois : [];
            console.assert(pois.length === 0 || poiExtractor !== undefined);
            const pe = poiExtractor;
            const g = svg.select("g");
            const profileData = svg.datum();
            const ps = g.select(".pois");
            const p = ps.selectAll(".poi").data(pois, (d)=>{
                const i = closestDistance(profileData, Math.round(pe.dist(d) * 10) / 10, 1);
                const point = profileData[i];
                if (point) {
                    let lineName;
                    const elevations = [];
                    for(lineName in linesConfiguration)elevations.push(linesConfiguration[lineName].zExtractor(point));
                    const z = Math.max.apply(null, elevations);
                    pe.z(d, z);
                }
                return pe.id(d);
            });
            const poiEnterG = p.enter().append("g").attr("class", "poi");
            poiEnterG.append("text").attr("x", light ? 0 : 9).attr("dy", ".35em").attr("text-anchor", light ? "middle" : "start");
            poiEnterG.append("line").style("shape-rendering", "crispEdges");
            poiEnterG.style("opacity", 0).transition().duration(1000).delay(100).style("opacity", 1);
            poiEnterG.selectAll("text").attr("transform", (d)=>{
                if (light) return [
                    "translate(",
                    x(pe.dist(d)),
                    ",",
                    y(pe.z(d)) - 10,
                    ")"
                ].join("");
                else return [
                    "translate(",
                    x(pe.dist(d)),
                    ",",
                    y(pe.z(d)) - 20,
                    ") rotate(",
                    poiLabelAngle,
                    ")"
                ].join("");
            }).text((d)=>pe.sort(d) + (light ? "" : ` - ${pe.title(d)}`));
            poiEnterG.selectAll("line").style("stroke", "grey").attr("x1", (d)=>x(pe.dist(d))).attr("y1", (_)=>y(y.domain()[0])).attr("x2", (d)=>x(pe.dist(d))).attr("y2", (d)=>y(pe.z(d)));
            // remove unused pois
            poiEnterG.exit().remove();
        };
        function clearPois() {
            profile.showPois([]);
        }
        return profile;
    });
var _d3Transition = require("d3-transition");
var _d3Array = require("d3-array");
var _d3Axis = require("d3-axis");
var _d3Scale = require("d3-scale");
var _d3Selection = require("d3-selection");
var _d3Shape = require("d3-shape");
const d3 = {
    bisector: (0, _d3Array.bisector),
    extent: (0, _d3Array.extent),
    axisBottom: (0, _d3Axis.axisBottom),
    axisLeft: (0, _d3Axis.axisLeft),
    scaleLinear: (0, _d3Scale.scaleLinear),
    mouse: (0, _d3Selection.mouse),
    select: (0, _d3Selection.select),
    selectAll: (0, _d3Selection.selectAll),
    area: (0, _d3Shape.area),
    line: (0, _d3Shape.line)
};

},{"d3-transition":"4lorl","d3-array":"1yX2W","d3-axis":"2g6gM","d3-scale":"UQ8g3","d3-selection":"gn9gd","d3-shape":"SqrXv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4lorl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "transition", ()=>(0, _indexJsDefault.default));
parcelHelpers.export(exports, "active", ()=>(0, _activeJsDefault.default));
parcelHelpers.export(exports, "interrupt", ()=>(0, _interruptJsDefault.default));
var _indexJs = require("./selection/index.js");
var _indexJs1 = require("./transition/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs1);
var _activeJs = require("./active.js");
var _activeJsDefault = parcelHelpers.interopDefault(_activeJs);
var _interruptJs = require("./interrupt.js");
var _interruptJsDefault = parcelHelpers.interopDefault(_interruptJs);

},{"./selection/index.js":"heX1u","./transition/index.js":"h2Srb","./active.js":"a4qOn","./interrupt.js":"j3g05","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"heX1u":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _d3Selection = require("d3-selection");
var _interruptJs = require("./interrupt.js");
var _interruptJsDefault = parcelHelpers.interopDefault(_interruptJs);
var _transitionJs = require("./transition.js");
var _transitionJsDefault = parcelHelpers.interopDefault(_transitionJs);
(0, _d3Selection.selection).prototype.interrupt = (0, _interruptJsDefault.default);
(0, _d3Selection.selection).prototype.transition = (0, _transitionJsDefault.default);

},{"d3-selection":"gn9gd","./interrupt.js":"ecsW0","./transition.js":"aZzEX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gn9gd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "create", ()=>(0, _createDefault.default));
parcelHelpers.export(exports, "creator", ()=>(0, _creatorDefault.default));
parcelHelpers.export(exports, "local", ()=>(0, _localDefault.default));
parcelHelpers.export(exports, "matcher", ()=>(0, _matcherDefault.default));
parcelHelpers.export(exports, "mouse", ()=>(0, _mouseDefault.default));
parcelHelpers.export(exports, "namespace", ()=>(0, _namespaceDefault.default));
parcelHelpers.export(exports, "namespaces", ()=>(0, _namespacesDefault.default));
parcelHelpers.export(exports, "clientPoint", ()=>(0, _pointDefault.default));
parcelHelpers.export(exports, "select", ()=>(0, _selectDefault.default));
parcelHelpers.export(exports, "selectAll", ()=>(0, _selectAllDefault.default));
parcelHelpers.export(exports, "selection", ()=>(0, _indexDefault.default));
parcelHelpers.export(exports, "selector", ()=>(0, _selectorDefault.default));
parcelHelpers.export(exports, "selectorAll", ()=>(0, _selectorAllDefault.default));
parcelHelpers.export(exports, "style", ()=>(0, _style.styleValue));
parcelHelpers.export(exports, "touch", ()=>(0, _touchDefault.default));
parcelHelpers.export(exports, "touches", ()=>(0, _touchesDefault.default));
parcelHelpers.export(exports, "window", ()=>(0, _windowDefault.default));
parcelHelpers.export(exports, "event", ()=>(0, _on.event));
parcelHelpers.export(exports, "customEvent", ()=>(0, _on.customEvent));
var _create = require("./create");
var _createDefault = parcelHelpers.interopDefault(_create);
var _creator = require("./creator");
var _creatorDefault = parcelHelpers.interopDefault(_creator);
var _local = require("./local");
var _localDefault = parcelHelpers.interopDefault(_local);
var _matcher = require("./matcher");
var _matcherDefault = parcelHelpers.interopDefault(_matcher);
var _mouse = require("./mouse");
var _mouseDefault = parcelHelpers.interopDefault(_mouse);
var _namespace = require("./namespace");
var _namespaceDefault = parcelHelpers.interopDefault(_namespace);
var _namespaces = require("./namespaces");
var _namespacesDefault = parcelHelpers.interopDefault(_namespaces);
var _point = require("./point");
var _pointDefault = parcelHelpers.interopDefault(_point);
var _select = require("./select");
var _selectDefault = parcelHelpers.interopDefault(_select);
var _selectAll = require("./selectAll");
var _selectAllDefault = parcelHelpers.interopDefault(_selectAll);
var _index = require("./selection/index");
var _indexDefault = parcelHelpers.interopDefault(_index);
var _selector = require("./selector");
var _selectorDefault = parcelHelpers.interopDefault(_selector);
var _selectorAll = require("./selectorAll");
var _selectorAllDefault = parcelHelpers.interopDefault(_selectorAll);
var _style = require("./selection/style");
var _touch = require("./touch");
var _touchDefault = parcelHelpers.interopDefault(_touch);
var _touches = require("./touches");
var _touchesDefault = parcelHelpers.interopDefault(_touches);
var _window = require("./window");
var _windowDefault = parcelHelpers.interopDefault(_window);
var _on = require("./selection/on");

},{"./create":"e1dzW","./creator":"a6062","./local":"hcwa6","./matcher":"hovSo","./mouse":"chEM9","./namespace":"a23xG","./namespaces":"dDfgS","./point":"4SPKm","./select":"4pqgd","./selectAll":"eAYBy","./selection/index":"fK3Dl","./selector":"7VF9r","./selectorAll":"2SKTE","./selection/style":"GUHZ1","./touch":"fA5Ht","./touches":"acUc0","./window":"6di7h","./selection/on":"ktlxw","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"e1dzW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(name) {
        return (0, _selectDefault.default)((0, _creatorDefault.default)(name).call(document.documentElement));
    });
var _creator = require("./creator");
var _creatorDefault = parcelHelpers.interopDefault(_creator);
var _select = require("./select");
var _selectDefault = parcelHelpers.interopDefault(_select);

},{"./creator":"a6062","./select":"4pqgd","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"a6062":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(name) {
        var fullname = (0, _namespaceDefault.default)(name);
        return (fullname.local ? creatorFixed : creatorInherit)(fullname);
    });
var _namespace = require("./namespace");
var _namespaceDefault = parcelHelpers.interopDefault(_namespace);
var _namespaces = require("./namespaces");
function creatorInherit(name) {
    return function() {
        var document = this.ownerDocument, uri = this.namespaceURI;
        return uri === (0, _namespaces.xhtml) && document.documentElement.namespaceURI === (0, _namespaces.xhtml) ? document.createElement(name) : document.createElementNS(uri, name);
    };
}
function creatorFixed(fullname) {
    return function() {
        return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
}

},{"./namespace":"a23xG","./namespaces":"dDfgS","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"a23xG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(name) {
        var prefix = name += "", i = prefix.indexOf(":");
        if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
        return (0, _namespacesDefault.default).hasOwnProperty(prefix) ? {
            space: (0, _namespacesDefault.default)[prefix],
            local: name
        } : name;
    });
var _namespaces = require("./namespaces");
var _namespacesDefault = parcelHelpers.interopDefault(_namespaces);

},{"./namespaces":"dDfgS","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dDfgS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "xhtml", ()=>xhtml);
var xhtml = "http://www.w3.org/1999/xhtml";
exports.default = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: xhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4pqgd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(selector) {
        return typeof selector === "string" ? new (0, _index.Selection)([
            [
                document.querySelector(selector)
            ]
        ], [
            document.documentElement
        ]) : new (0, _index.Selection)([
            [
                selector
            ]
        ], (0, _index.root));
    });
var _index = require("./selection/index");

},{"./selection/index":"fK3Dl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fK3Dl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "root", ()=>root);
parcelHelpers.export(exports, "Selection", ()=>Selection);
var _select = require("./select");
var _selectDefault = parcelHelpers.interopDefault(_select);
var _selectAll = require("./selectAll");
var _selectAllDefault = parcelHelpers.interopDefault(_selectAll);
var _filter = require("./filter");
var _filterDefault = parcelHelpers.interopDefault(_filter);
var _data = require("./data");
var _dataDefault = parcelHelpers.interopDefault(_data);
var _enter = require("./enter");
var _enterDefault = parcelHelpers.interopDefault(_enter);
var _exit = require("./exit");
var _exitDefault = parcelHelpers.interopDefault(_exit);
var _join = require("./join");
var _joinDefault = parcelHelpers.interopDefault(_join);
var _merge = require("./merge");
var _mergeDefault = parcelHelpers.interopDefault(_merge);
var _order = require("./order");
var _orderDefault = parcelHelpers.interopDefault(_order);
var _sort = require("./sort");
var _sortDefault = parcelHelpers.interopDefault(_sort);
var _call = require("./call");
var _callDefault = parcelHelpers.interopDefault(_call);
var _nodes = require("./nodes");
var _nodesDefault = parcelHelpers.interopDefault(_nodes);
var _node = require("./node");
var _nodeDefault = parcelHelpers.interopDefault(_node);
var _size = require("./size");
var _sizeDefault = parcelHelpers.interopDefault(_size);
var _empty = require("./empty");
var _emptyDefault = parcelHelpers.interopDefault(_empty);
var _each = require("./each");
var _eachDefault = parcelHelpers.interopDefault(_each);
var _attr = require("./attr");
var _attrDefault = parcelHelpers.interopDefault(_attr);
var _style = require("./style");
var _styleDefault = parcelHelpers.interopDefault(_style);
var _property = require("./property");
var _propertyDefault = parcelHelpers.interopDefault(_property);
var _classed = require("./classed");
var _classedDefault = parcelHelpers.interopDefault(_classed);
var _text = require("./text");
var _textDefault = parcelHelpers.interopDefault(_text);
var _html = require("./html");
var _htmlDefault = parcelHelpers.interopDefault(_html);
var _raise = require("./raise");
var _raiseDefault = parcelHelpers.interopDefault(_raise);
var _lower = require("./lower");
var _lowerDefault = parcelHelpers.interopDefault(_lower);
var _append = require("./append");
var _appendDefault = parcelHelpers.interopDefault(_append);
var _insert = require("./insert");
var _insertDefault = parcelHelpers.interopDefault(_insert);
var _remove = require("./remove");
var _removeDefault = parcelHelpers.interopDefault(_remove);
var _clone = require("./clone");
var _cloneDefault = parcelHelpers.interopDefault(_clone);
var _datum = require("./datum");
var _datumDefault = parcelHelpers.interopDefault(_datum);
var _on = require("./on");
var _onDefault = parcelHelpers.interopDefault(_on);
var _dispatch = require("./dispatch");
var _dispatchDefault = parcelHelpers.interopDefault(_dispatch);
var root = [
    null
];
function Selection(groups, parents) {
    this._groups = groups;
    this._parents = parents;
}
function selection() {
    return new Selection([
        [
            document.documentElement
        ]
    ], root);
}
Selection.prototype = selection.prototype = {
    constructor: Selection,
    select: (0, _selectDefault.default),
    selectAll: (0, _selectAllDefault.default),
    filter: (0, _filterDefault.default),
    data: (0, _dataDefault.default),
    enter: (0, _enterDefault.default),
    exit: (0, _exitDefault.default),
    join: (0, _joinDefault.default),
    merge: (0, _mergeDefault.default),
    order: (0, _orderDefault.default),
    sort: (0, _sortDefault.default),
    call: (0, _callDefault.default),
    nodes: (0, _nodesDefault.default),
    node: (0, _nodeDefault.default),
    size: (0, _sizeDefault.default),
    empty: (0, _emptyDefault.default),
    each: (0, _eachDefault.default),
    attr: (0, _attrDefault.default),
    style: (0, _styleDefault.default),
    property: (0, _propertyDefault.default),
    classed: (0, _classedDefault.default),
    text: (0, _textDefault.default),
    html: (0, _htmlDefault.default),
    raise: (0, _raiseDefault.default),
    lower: (0, _lowerDefault.default),
    append: (0, _appendDefault.default),
    insert: (0, _insertDefault.default),
    remove: (0, _removeDefault.default),
    clone: (0, _cloneDefault.default),
    datum: (0, _datumDefault.default),
    on: (0, _onDefault.default),
    dispatch: (0, _dispatchDefault.default)
};
exports.default = selection;

},{"./select":"aK9lB","./selectAll":"8U28K","./filter":"i1GfU","./data":"jIP7J","./enter":"27tIy","./exit":"6ubri","./join":"g7QcH","./merge":"fXm9Z","./order":"cmxvd","./sort":"4UUI2","./call":"bsAaT","./nodes":"jjFrN","./node":"gPGkg","./size":"coOTw","./empty":"8ybxO","./each":"9Y1px","./attr":"k8cb1","./style":"GUHZ1","./property":"f4q4V","./classed":"jd3ig","./text":"dVAdB","./html":"egFAg","./raise":"4Xi1m","./lower":"l1I8n","./append":"1GNgv","./insert":"3Xphl","./remove":"iNsSa","./clone":"jfNc9","./datum":"lMowl","./on":"ktlxw","./dispatch":"eZMTj","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aK9lB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(select) {
        if (typeof select !== "function") select = (0, _selectorDefault.default)(select);
        for(var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j){
            for(var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i)if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
                if ("__data__" in node) subnode.__data__ = node.__data__;
                subgroup[i] = subnode;
            }
        }
        return new (0, _index.Selection)(subgroups, this._parents);
    });
var _index = require("./index");
var _selector = require("../selector");
var _selectorDefault = parcelHelpers.interopDefault(_selector);

},{"./index":"fK3Dl","../selector":"7VF9r","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7VF9r":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(selector) {
        return selector == null ? none : function() {
            return this.querySelector(selector);
        };
    });
function none() {}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8U28K":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(select) {
        if (typeof select !== "function") select = (0, _selectorAllDefault.default)(select);
        for(var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j){
            for(var group = groups[j], n = group.length, node, i = 0; i < n; ++i)if (node = group[i]) {
                subgroups.push(select.call(node, node.__data__, i, group));
                parents.push(node);
            }
        }
        return new (0, _index.Selection)(subgroups, parents);
    });
var _index = require("./index");
var _selectorAll = require("../selectorAll");
var _selectorAllDefault = parcelHelpers.interopDefault(_selectorAll);

},{"./index":"fK3Dl","../selectorAll":"2SKTE","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2SKTE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(selector) {
        return selector == null ? empty : function() {
            return this.querySelectorAll(selector);
        };
    });
function empty() {
    return [];
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"i1GfU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(match) {
        if (typeof match !== "function") match = (0, _matcherDefault.default)(match);
        for(var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j){
            for(var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i)if ((node = group[i]) && match.call(node, node.__data__, i, group)) subgroup.push(node);
        }
        return new (0, _index.Selection)(subgroups, this._parents);
    });
var _index = require("./index");
var _matcher = require("../matcher");
var _matcherDefault = parcelHelpers.interopDefault(_matcher);

},{"./index":"fK3Dl","../matcher":"hovSo","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hovSo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(selector) {
        return function() {
            return this.matches(selector);
        };
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jIP7J":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(value, key) {
        if (!value) {
            data = new Array(this.size()), j = -1;
            this.each(function(d) {
                data[++j] = d;
            });
            return data;
        }
        var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
        if (typeof value !== "function") value = (0, _constantDefault.default)(value);
        for(var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j){
            var parent = parents[j], group = groups[j], groupLength = group.length, data = value.call(parent, parent && parent.__data__, j, parents), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
            bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);
            // Now connect the enter nodes to their following update node, such that
            // appendChild can insert the materialized enter node before this node,
            // rather than at the end of the parent node.
            for(var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0)if (previous = enterGroup[i0]) {
                if (i0 >= i1) i1 = i0 + 1;
                while(!(next = updateGroup[i1]) && ++i1 < dataLength);
                previous._next = next || null;
            }
        }
        update = new (0, _index.Selection)(update, parents);
        update._enter = enter;
        update._exit = exit;
        return update;
    });
var _index = require("./index");
var _enter = require("./enter");
var _constant = require("../constant");
var _constantDefault = parcelHelpers.interopDefault(_constant);
var keyPrefix = "$"; // Protect against keys like “__proto__”.
function bindIndex(parent, group, enter, update, exit, data) {
    var i = 0, node, groupLength = group.length, dataLength = data.length;
    // Put any non-null nodes that fit into update.
    // Put any null nodes into enter.
    // Put any remaining data into enter.
    for(; i < dataLength; ++i)if (node = group[i]) {
        node.__data__ = data[i];
        update[i] = node;
    } else enter[i] = new (0, _enter.EnterNode)(parent, data[i]);
    // Put any non-null nodes that don’t fit into exit.
    for(; i < groupLength; ++i)if (node = group[i]) exit[i] = node;
}
function bindKey(parent, group, enter, update, exit, data, key) {
    var i, node, nodeByKeyValue = {}, groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
    // Compute the key for each node.
    // If multiple nodes have the same key, the duplicates are added to exit.
    for(i = 0; i < groupLength; ++i)if (node = group[i]) {
        keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
        if (keyValue in nodeByKeyValue) exit[i] = node;
        else nodeByKeyValue[keyValue] = node;
    }
    // Compute the key for each datum.
    // If there a node associated with this key, join and add it to update.
    // If there is not (or the key is a duplicate), add it to enter.
    for(i = 0; i < dataLength; ++i){
        keyValue = keyPrefix + key.call(parent, data[i], i, data);
        if (node = nodeByKeyValue[keyValue]) {
            update[i] = node;
            node.__data__ = data[i];
            nodeByKeyValue[keyValue] = null;
        } else enter[i] = new (0, _enter.EnterNode)(parent, data[i]);
    }
    // Add any remaining nodes that were not bound to data to exit.
    for(i = 0; i < groupLength; ++i)if ((node = group[i]) && nodeByKeyValue[keyValues[i]] === node) exit[i] = node;
}

},{"./index":"fK3Dl","./enter":"27tIy","../constant":"1wZol","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"27tIy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        return new (0, _index.Selection)(this._enter || this._groups.map((0, _sparseDefault.default)), this._parents);
    });
parcelHelpers.export(exports, "EnterNode", ()=>EnterNode);
var _sparse = require("./sparse");
var _sparseDefault = parcelHelpers.interopDefault(_sparse);
var _index = require("./index");
function EnterNode(parent, datum) {
    this.ownerDocument = parent.ownerDocument;
    this.namespaceURI = parent.namespaceURI;
    this._next = null;
    this._parent = parent;
    this.__data__ = datum;
}
EnterNode.prototype = {
    constructor: EnterNode,
    appendChild: function(child) {
        return this._parent.insertBefore(child, this._next);
    },
    insertBefore: function(child, next) {
        return this._parent.insertBefore(child, next);
    },
    querySelector: function(selector) {
        return this._parent.querySelector(selector);
    },
    querySelectorAll: function(selector) {
        return this._parent.querySelectorAll(selector);
    }
};

},{"./sparse":"juhNo","./index":"fK3Dl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"juhNo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(update) {
        return new Array(update.length);
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1wZol":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(x) {
        return function() {
            return x;
        };
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6ubri":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        return new (0, _index.Selection)(this._exit || this._groups.map((0, _sparseDefault.default)), this._parents);
    });
var _sparse = require("./sparse");
var _sparseDefault = parcelHelpers.interopDefault(_sparse);
var _index = require("./index");

},{"./sparse":"juhNo","./index":"fK3Dl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"g7QcH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(onenter, onupdate, onexit) {
        var enter = this.enter(), update = this, exit = this.exit();
        enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
        if (onupdate != null) update = onupdate(update);
        if (onexit == null) exit.remove();
        else onexit(exit);
        return enter && update ? enter.merge(update).order() : update;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fXm9Z":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(selection) {
        for(var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j){
            for(var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i)if (node = group0[i] || group1[i]) merge[i] = node;
        }
        for(; j < m0; ++j)merges[j] = groups0[j];
        return new (0, _index.Selection)(merges, this._parents);
    });
var _index = require("./index");

},{"./index":"fK3Dl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cmxvd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        for(var groups = this._groups, j = -1, m = groups.length; ++j < m;){
            for(var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;)if (node = group[i]) {
                if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
                next = node;
            }
        }
        return this;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4UUI2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(compare) {
        if (!compare) compare = ascending;
        function compareNode(a, b) {
            return a && b ? compare(a.__data__, b.__data__) : !a - !b;
        }
        for(var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j){
            for(var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i)if (node = group[i]) sortgroup[i] = node;
            sortgroup.sort(compareNode);
        }
        return new (0, _index.Selection)(sortgroups, this._parents).order();
    });
var _index = require("./index");
function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

},{"./index":"fK3Dl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bsAaT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        var callback = arguments[0];
        arguments[0] = this;
        callback.apply(null, arguments);
        return this;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jjFrN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        var nodes = new Array(this.size()), i = -1;
        this.each(function() {
            nodes[++i] = this;
        });
        return nodes;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gPGkg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        for(var groups = this._groups, j = 0, m = groups.length; j < m; ++j)for(var group = groups[j], i = 0, n = group.length; i < n; ++i){
            var node = group[i];
            if (node) return node;
        }
        return null;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"coOTw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        var size = 0;
        this.each(function() {
            ++size;
        });
        return size;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8ybxO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        return !this.node();
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9Y1px":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(callback) {
        for(var groups = this._groups, j = 0, m = groups.length; j < m; ++j){
            for(var group = groups[j], i = 0, n = group.length, node; i < n; ++i)if (node = group[i]) callback.call(node, node.__data__, i, group);
        }
        return this;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"k8cb1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(name, value) {
        var fullname = (0, _namespaceDefault.default)(name);
        if (arguments.length < 2) {
            var node = this.node();
            return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
        }
        return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
    });
var _namespace = require("../namespace");
var _namespaceDefault = parcelHelpers.interopDefault(_namespace);
function attrRemove(name) {
    return function() {
        this.removeAttribute(name);
    };
}
function attrRemoveNS(fullname) {
    return function() {
        this.removeAttributeNS(fullname.space, fullname.local);
    };
}
function attrConstant(name, value) {
    return function() {
        this.setAttribute(name, value);
    };
}
function attrConstantNS(fullname, value) {
    return function() {
        this.setAttributeNS(fullname.space, fullname.local, value);
    };
}
function attrFunction(name, value) {
    return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.removeAttribute(name);
        else this.setAttribute(name, v);
    };
}
function attrFunctionNS(fullname, value) {
    return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
        else this.setAttributeNS(fullname.space, fullname.local, v);
    };
}

},{"../namespace":"a23xG","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"GUHZ1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(name, value, priority) {
        return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
    });
parcelHelpers.export(exports, "styleValue", ()=>styleValue);
var _window = require("../window");
var _windowDefault = parcelHelpers.interopDefault(_window);
function styleRemove(name) {
    return function() {
        this.style.removeProperty(name);
    };
}
function styleConstant(name, value, priority) {
    return function() {
        this.style.setProperty(name, value, priority);
    };
}
function styleFunction(name, value, priority) {
    return function() {
        var v = value.apply(this, arguments);
        if (v == null) this.style.removeProperty(name);
        else this.style.setProperty(name, v, priority);
    };
}
function styleValue(node, name) {
    return node.style.getPropertyValue(name) || (0, _windowDefault.default)(node).getComputedStyle(node, null).getPropertyValue(name);
}

},{"../window":"6di7h","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6di7h":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(node) {
        return node.ownerDocument && node.ownerDocument.defaultView // node is a Node
         || node.document && node // node is a Window
         || node.defaultView; // node is a Document
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"f4q4V":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(name, value) {
        return arguments.length > 1 ? this.each((value == null ? propertyRemove : typeof value === "function" ? propertyFunction : propertyConstant)(name, value)) : this.node()[name];
    });
function propertyRemove(name) {
    return function() {
        delete this[name];
    };
}
function propertyConstant(name, value) {
    return function() {
        this[name] = value;
    };
}
function propertyFunction(name, value) {
    return function() {
        var v = value.apply(this, arguments);
        if (v == null) delete this[name];
        else this[name] = v;
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jd3ig":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(name, value) {
        var names = classArray(name + "");
        if (arguments.length < 2) {
            var list = classList(this.node()), i = -1, n = names.length;
            while(++i < n)if (!list.contains(names[i])) return false;
            return true;
        }
        return this.each((typeof value === "function" ? classedFunction : value ? classedTrue : classedFalse)(names, value));
    });
function classArray(string) {
    return string.trim().split(/^|\s+/);
}
function classList(node) {
    return node.classList || new ClassList(node);
}
function ClassList(node) {
    this._node = node;
    this._names = classArray(node.getAttribute("class") || "");
}
ClassList.prototype = {
    add: function(name) {
        var i = this._names.indexOf(name);
        if (i < 0) {
            this._names.push(name);
            this._node.setAttribute("class", this._names.join(" "));
        }
    },
    remove: function(name) {
        var i = this._names.indexOf(name);
        if (i >= 0) {
            this._names.splice(i, 1);
            this._node.setAttribute("class", this._names.join(" "));
        }
    },
    contains: function(name) {
        return this._names.indexOf(name) >= 0;
    }
};
function classedAdd(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while(++i < n)list.add(names[i]);
}
function classedRemove(node, names) {
    var list = classList(node), i = -1, n = names.length;
    while(++i < n)list.remove(names[i]);
}
function classedTrue(names) {
    return function() {
        classedAdd(this, names);
    };
}
function classedFalse(names) {
    return function() {
        classedRemove(this, names);
    };
}
function classedFunction(names, value) {
    return function() {
        (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dVAdB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(value) {
        return arguments.length ? this.each(value == null ? textRemove : (typeof value === "function" ? textFunction : textConstant)(value)) : this.node().textContent;
    });
function textRemove() {
    this.textContent = "";
}
function textConstant(value) {
    return function() {
        this.textContent = value;
    };
}
function textFunction(value) {
    return function() {
        var v = value.apply(this, arguments);
        this.textContent = v == null ? "" : v;
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"egFAg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(value) {
        return arguments.length ? this.each(value == null ? htmlRemove : (typeof value === "function" ? htmlFunction : htmlConstant)(value)) : this.node().innerHTML;
    });
function htmlRemove() {
    this.innerHTML = "";
}
function htmlConstant(value) {
    return function() {
        this.innerHTML = value;
    };
}
function htmlFunction(value) {
    return function() {
        var v = value.apply(this, arguments);
        this.innerHTML = v == null ? "" : v;
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4Xi1m":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        return this.each(raise);
    });
function raise() {
    if (this.nextSibling) this.parentNode.appendChild(this);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"l1I8n":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        return this.each(lower);
    });
function lower() {
    if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1GNgv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(name) {
        var create = typeof name === "function" ? name : (0, _creatorDefault.default)(name);
        return this.select(function() {
            return this.appendChild(create.apply(this, arguments));
        });
    });
var _creator = require("../creator");
var _creatorDefault = parcelHelpers.interopDefault(_creator);

},{"../creator":"a6062","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3Xphl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(name, before) {
        var create = typeof name === "function" ? name : (0, _creatorDefault.default)(name), select = before == null ? constantNull : typeof before === "function" ? before : (0, _selectorDefault.default)(before);
        return this.select(function() {
            return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
        });
    });
var _creator = require("../creator");
var _creatorDefault = parcelHelpers.interopDefault(_creator);
var _selector = require("../selector");
var _selectorDefault = parcelHelpers.interopDefault(_selector);
function constantNull() {
    return null;
}

},{"../creator":"a6062","../selector":"7VF9r","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iNsSa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        return this.each(remove);
    });
function remove() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jfNc9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(deep) {
        return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
    });
function selection_cloneShallow() {
    var clone = this.cloneNode(false), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}
function selection_cloneDeep() {
    var clone = this.cloneNode(true), parent = this.parentNode;
    return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lMowl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(value) {
        return arguments.length ? this.property("__data__", value) : this.node().__data__;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ktlxw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "event", ()=>event);
parcelHelpers.export(exports, "default", ()=>function(typename, value, capture) {
        var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
        if (arguments.length < 2) {
            var on = this.node().__on;
            if (on) for(var j = 0, m = on.length, o; j < m; ++j)for(i = 0, o = on[j]; i < n; ++i){
                if ((t = typenames[i]).type === o.type && t.name === o.name) return o.value;
            }
            return;
        }
        on = value ? onAdd : onRemove;
        if (capture == null) capture = false;
        for(i = 0; i < n; ++i)this.each(on(typenames[i], value, capture));
        return this;
    });
parcelHelpers.export(exports, "customEvent", ()=>customEvent);
var filterEvents = {};
var event = null;
if (typeof document !== "undefined") {
    var element = document.documentElement;
    if (!("onmouseenter" in element)) filterEvents = {
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    };
}
function filterContextListener(listener, index, group) {
    listener = contextListener(listener, index, group);
    return function(event) {
        var related = event.relatedTarget;
        if (!related || related !== this && !(related.compareDocumentPosition(this) & 8)) listener.call(this, event);
    };
}
function contextListener(listener, index, group) {
    return function(event1) {
        var event0 = event; // Events can be reentrant (e.g., focus).
        event = event1;
        try {
            listener.call(this, this.__data__, index, group);
        } finally{
            event = event0;
        }
    };
}
function parseTypenames(typenames) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
        var name = "", i = t.indexOf(".");
        if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
        return {
            type: t,
            name: name
        };
    });
}
function onRemove(typename) {
    return function() {
        var on = this.__on;
        if (!on) return;
        for(var j = 0, i = -1, m = on.length, o; j < m; ++j)if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) this.removeEventListener(o.type, o.listener, o.capture);
        else on[++i] = o;
        if (++i) on.length = i;
        else delete this.__on;
    };
}
function onAdd(typename, value, capture) {
    var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
    return function(d, i, group) {
        var on = this.__on, o, listener = wrap(value, i, group);
        if (on) {
            for(var j = 0, m = on.length; j < m; ++j)if ((o = on[j]).type === typename.type && o.name === typename.name) {
                this.removeEventListener(o.type, o.listener, o.capture);
                this.addEventListener(o.type, o.listener = listener, o.capture = capture);
                o.value = value;
                return;
            }
        }
        this.addEventListener(typename.type, listener, capture);
        o = {
            type: typename.type,
            name: typename.name,
            value: value,
            listener: listener,
            capture: capture
        };
        if (!on) this.__on = [
            o
        ];
        else on.push(o);
    };
}
function customEvent(event1, listener, that, args) {
    var event0 = event;
    event1.sourceEvent = event;
    event = event1;
    try {
        return listener.apply(that, args);
    } finally{
        event = event0;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eZMTj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(type, params) {
        return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
    });
var _window = require("../window");
var _windowDefault = parcelHelpers.interopDefault(_window);
function dispatchEvent(node, type, params) {
    var window = (0, _windowDefault.default)(node), event = window.CustomEvent;
    if (typeof event === "function") event = new event(type, params);
    else {
        event = window.document.createEvent("Event");
        if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
        else event.initEvent(type, false, false);
    }
    node.dispatchEvent(event);
}
function dispatchConstant(type, params) {
    return function() {
        return dispatchEvent(this, type, params);
    };
}
function dispatchFunction(type, params) {
    return function() {
        return dispatchEvent(this, type, params.apply(this, arguments));
    };
}

},{"../window":"6di7h","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hcwa6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>local);
var nextId = 0;
function local() {
    return new Local;
}
function Local() {
    this._ = "@" + (++nextId).toString(36);
}
Local.prototype = local.prototype = {
    constructor: Local,
    get: function(node) {
        var id = this._;
        while(!(id in node))if (!(node = node.parentNode)) return;
        return node[id];
    },
    set: function(node, value) {
        return node[this._] = value;
    },
    remove: function(node) {
        return this._ in node && delete node[this._];
    },
    toString: function() {
        return this._;
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"chEM9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(node) {
        var event = (0, _sourceEventDefault.default)();
        if (event.changedTouches) event = event.changedTouches[0];
        return (0, _pointDefault.default)(node, event);
    });
var _sourceEvent = require("./sourceEvent");
var _sourceEventDefault = parcelHelpers.interopDefault(_sourceEvent);
var _point = require("./point");
var _pointDefault = parcelHelpers.interopDefault(_point);

},{"./sourceEvent":"cDi5d","./point":"4SPKm","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cDi5d":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        var current = (0, _on.event), source;
        while(source = current.sourceEvent)current = source;
        return current;
    });
var _on = require("./selection/on");

},{"./selection/on":"ktlxw","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4SPKm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(node, event) {
        var svg = node.ownerSVGElement || node;
        if (svg.createSVGPoint) {
            var point = svg.createSVGPoint();
            point.x = event.clientX, point.y = event.clientY;
            point = point.matrixTransform(node.getScreenCTM().inverse());
            return [
                point.x,
                point.y
            ];
        }
        var rect = node.getBoundingClientRect();
        return [
            event.clientX - rect.left - node.clientLeft,
            event.clientY - rect.top - node.clientTop
        ];
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eAYBy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(selector) {
        return typeof selector === "string" ? new (0, _index.Selection)([
            document.querySelectorAll(selector)
        ], [
            document.documentElement
        ]) : new (0, _index.Selection)([
            selector == null ? [] : selector
        ], (0, _index.root));
    });
var _index = require("./selection/index");

},{"./selection/index":"fK3Dl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fA5Ht":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(node, touches, identifier) {
        if (arguments.length < 3) identifier = touches, touches = (0, _sourceEventDefault.default)().changedTouches;
        for(var i = 0, n = touches ? touches.length : 0, touch; i < n; ++i){
            if ((touch = touches[i]).identifier === identifier) return (0, _pointDefault.default)(node, touch);
        }
        return null;
    });
var _sourceEvent = require("./sourceEvent");
var _sourceEventDefault = parcelHelpers.interopDefault(_sourceEvent);
var _point = require("./point");
var _pointDefault = parcelHelpers.interopDefault(_point);

},{"./sourceEvent":"cDi5d","./point":"4SPKm","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"acUc0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(node, touches) {
        if (touches == null) touches = (0, _sourceEventDefault.default)().touches;
        for(var i = 0, n = touches ? touches.length : 0, points = new Array(n); i < n; ++i)points[i] = (0, _pointDefault.default)(node, touches[i]);
        return points;
    });
var _sourceEvent = require("./sourceEvent");
var _sourceEventDefault = parcelHelpers.interopDefault(_sourceEvent);
var _point = require("./point");
var _pointDefault = parcelHelpers.interopDefault(_point);

},{"./sourceEvent":"cDi5d","./point":"4SPKm","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ecsW0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(name) {
        return this.each(function() {
            (0, _interruptJsDefault.default)(this, name);
        });
    });
var _interruptJs = require("../interrupt.js");
var _interruptJsDefault = parcelHelpers.interopDefault(_interruptJs);

},{"../interrupt.js":"j3g05","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"j3g05":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(node, name) {
        var schedules = node.__transition, schedule, active, empty = true, i;
        if (!schedules) return;
        name = name == null ? null : name + "";
        for(i in schedules){
            if ((schedule = schedules[i]).name !== name) {
                empty = false;
                continue;
            }
            active = schedule.state > (0, _scheduleJs.STARTING) && schedule.state < (0, _scheduleJs.ENDING);
            schedule.state = (0, _scheduleJs.ENDED);
            schedule.timer.stop();
            schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
            delete schedules[i];
        }
        if (empty) delete node.__transition;
    });
var _scheduleJs = require("./transition/schedule.js");

},{"./transition/schedule.js":"de74c","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"de74c":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CREATED", ()=>CREATED);
parcelHelpers.export(exports, "SCHEDULED", ()=>SCHEDULED);
parcelHelpers.export(exports, "STARTING", ()=>STARTING);
parcelHelpers.export(exports, "STARTED", ()=>STARTED);
parcelHelpers.export(exports, "RUNNING", ()=>RUNNING);
parcelHelpers.export(exports, "ENDING", ()=>ENDING);
parcelHelpers.export(exports, "ENDED", ()=>ENDED);
parcelHelpers.export(exports, "default", ()=>function(node, name, id, index, group, timing) {
        var schedules = node.__transition;
        if (!schedules) node.__transition = {};
        else if (id in schedules) return;
        create(node, id, {
            name: name,
            index: index,
            group: group,
            on: emptyOn,
            tween: emptyTween,
            time: timing.time,
            delay: timing.delay,
            duration: timing.duration,
            ease: timing.ease,
            timer: null,
            state: CREATED
        });
    });
parcelHelpers.export(exports, "init", ()=>init);
parcelHelpers.export(exports, "set", ()=>set);
parcelHelpers.export(exports, "get", ()=>get);
var _d3Dispatch = require("d3-dispatch");
var _d3Timer = require("d3-timer");
var emptyOn = (0, _d3Dispatch.dispatch)("start", "end", "cancel", "interrupt");
var emptyTween = [];
var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;
function init(node, id) {
    var schedule = get(node, id);
    if (schedule.state > CREATED) throw new Error("too late; already scheduled");
    return schedule;
}
function set(node, id) {
    var schedule = get(node, id);
    if (schedule.state > STARTED) throw new Error("too late; already running");
    return schedule;
}
function get(node, id) {
    var schedule = node.__transition;
    if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
    return schedule;
}
function create(node, id, self) {
    var schedules = node.__transition, tween;
    // Initialize the self timer when the transition is created.
    // Note the actual delay is not known until the first callback!
    schedules[id] = self;
    self.timer = (0, _d3Timer.timer)(schedule, 0, self.time);
    function schedule(elapsed) {
        self.state = SCHEDULED;
        self.timer.restart(start, self.delay, self.time);
        // If the elapsed delay is less than our first sleep, start immediately.
        if (self.delay <= elapsed) start(elapsed - self.delay);
    }
    function start(elapsed) {
        var i, j, n, o;
        // If the state is not SCHEDULED, then we previously errored on start.
        if (self.state !== SCHEDULED) return stop();
        for(i in schedules){
            o = schedules[i];
            if (o.name !== self.name) continue;
            // While this element already has a starting transition during this frame,
            // defer starting an interrupting transition until that transition has a
            // chance to tick (and possibly end); see d3/d3-transition#54!
            if (o.state === STARTED) return (0, _d3Timer.timeout)(start);
            // Interrupt the active transition, if any.
            if (o.state === RUNNING) {
                o.state = ENDED;
                o.timer.stop();
                o.on.call("interrupt", node, node.__data__, o.index, o.group);
                delete schedules[i];
            } else if (+i < id) {
                o.state = ENDED;
                o.timer.stop();
                o.on.call("cancel", node, node.__data__, o.index, o.group);
                delete schedules[i];
            }
        }
        // Defer the first tick to end of the current frame; see d3/d3#1576.
        // Note the transition may be canceled after start and before the first tick!
        // Note this must be scheduled before the start event; see d3/d3-transition#16!
        // Assuming this is successful, subsequent callbacks go straight to tick.
        (0, _d3Timer.timeout)(function() {
            if (self.state === STARTED) {
                self.state = RUNNING;
                self.timer.restart(tick, self.delay, self.time);
                tick(elapsed);
            }
        });
        // Dispatch the start event.
        // Note this must be done before the tween are initialized.
        self.state = STARTING;
        self.on.call("start", node, node.__data__, self.index, self.group);
        if (self.state !== STARTING) return; // interrupted
        self.state = STARTED;
        // Initialize the tween, deleting null tween.
        tween = new Array(n = self.tween.length);
        for(i = 0, j = -1; i < n; ++i)if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) tween[++j] = o;
        tween.length = j + 1;
    }
    function tick(elapsed) {
        var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1), i = -1, n = tween.length;
        while(++i < n)tween[i].call(node, t);
        // Dispatch the end event.
        if (self.state === ENDING) {
            self.on.call("end", node, node.__data__, self.index, self.group);
            stop();
        }
    }
    function stop() {
        self.state = ENDED;
        self.timer.stop();
        delete schedules[id];
        for(var i in schedules)return; // eslint-disable-line no-unused-vars
        delete node.__transition;
    }
}

},{"d3-dispatch":"5WtHO","d3-timer":"7TEss","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5WtHO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "dispatch", ()=>(0, _dispatchJsDefault.default));
var _dispatchJs = require("./dispatch.js");
var _dispatchJsDefault = parcelHelpers.interopDefault(_dispatchJs);

},{"./dispatch.js":"8Hmyd","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8Hmyd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var noop = {
    value: function() {}
};
function dispatch() {
    for(var i = 0, n = arguments.length, _ = {}, t; i < n; ++i){
        if (!(t = arguments[i] + "") || t in _ || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
        _[t] = [];
    }
    return new Dispatch(_);
}
function Dispatch(_) {
    this._ = _;
}
function parseTypenames(typenames, types) {
    return typenames.trim().split(/^|\s+/).map(function(t) {
        var name = "", i = t.indexOf(".");
        if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
        if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
        return {
            type: t,
            name: name
        };
    });
}
Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function(typename, callback) {
        var _ = this._, T = parseTypenames(typename + "", _), t, i = -1, n = T.length;
        // If no callback was specified, return the callback of the given type and name.
        if (arguments.length < 2) {
            while(++i < n)if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
            return;
        }
        // If a type was specified, set the callback for the given type and name.
        // Otherwise, if a null callback was specified, remove callbacks of the given name.
        if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
        while(++i < n){
            if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
            else if (callback == null) for(t in _)_[t] = set(_[t], typename.name, null);
        }
        return this;
    },
    copy: function() {
        var copy = {}, _ = this._;
        for(var t in _)copy[t] = _[t].slice();
        return new Dispatch(copy);
    },
    call: function(type, that) {
        if ((n = arguments.length - 2) > 0) for(var args = new Array(n), i = 0, n, t; i < n; ++i)args[i] = arguments[i + 2];
        if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
        for(t = this._[type], i = 0, n = t.length; i < n; ++i)t[i].value.apply(that, args);
    },
    apply: function(type, that, args) {
        if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
        for(var t = this._[type], i = 0, n = t.length; i < n; ++i)t[i].value.apply(that, args);
    }
};
function get(type, name) {
    for(var i = 0, n = type.length, c; i < n; ++i){
        if ((c = type[i]).name === name) return c.value;
    }
}
function set(type, name, callback) {
    for(var i = 0, n = type.length; i < n; ++i)if (type[i].name === name) {
        type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
        break;
    }
    if (callback != null) type.push({
        name: name,
        value: callback
    });
    return type;
}
exports.default = dispatch;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7TEss":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "now", ()=>(0, _timerJs.now));
parcelHelpers.export(exports, "timer", ()=>(0, _timerJs.timer));
parcelHelpers.export(exports, "timerFlush", ()=>(0, _timerJs.timerFlush));
parcelHelpers.export(exports, "timeout", ()=>(0, _timeoutJsDefault.default));
parcelHelpers.export(exports, "interval", ()=>(0, _intervalJsDefault.default));
var _timerJs = require("./timer.js");
var _timeoutJs = require("./timeout.js");
var _timeoutJsDefault = parcelHelpers.interopDefault(_timeoutJs);
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);

},{"./timer.js":"bfF2F","./timeout.js":"ioM7O","./interval.js":false,"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bfF2F":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "now", ()=>now);
parcelHelpers.export(exports, "Timer", ()=>Timer);
parcelHelpers.export(exports, "timer", ()=>timer);
parcelHelpers.export(exports, "timerFlush", ()=>timerFlush);
var frame = 0, timeout = 0, interval = 0, pokeDelay = 1000, taskHead, taskTail, clockLast = 0, clockNow = 0, clockSkew = 0, clock = typeof performance === "object" && performance.now ? performance : Date, setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) {
    setTimeout(f, 17);
};
function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}
function clearNow() {
    clockNow = 0;
}
function Timer() {
    this._call = this._time = this._next = null;
}
Timer.prototype = timer.prototype = {
    constructor: Timer,
    restart: function(callback, delay, time) {
        if (typeof callback !== "function") throw new TypeError("callback is not a function");
        time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
        if (!this._next && taskTail !== this) {
            if (taskTail) taskTail._next = this;
            else taskHead = this;
            taskTail = this;
        }
        this._call = callback;
        this._time = time;
        sleep();
    },
    stop: function() {
        if (this._call) {
            this._call = null;
            this._time = Infinity;
            sleep();
        }
    }
};
function timer(callback, delay, time) {
    var t = new Timer;
    t.restart(callback, delay, time);
    return t;
}
function timerFlush() {
    now(); // Get the current time, if not already set.
    ++frame; // Pretend we’ve set an alarm, if we haven’t already.
    var t = taskHead, e;
    while(t){
        if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
        t = t._next;
    }
    --frame;
}
function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew;
    frame = timeout = 0;
    try {
        timerFlush();
    } finally{
        frame = 0;
        nap();
        clockNow = 0;
    }
}
function poke() {
    var now = clock.now(), delay = now - clockLast;
    if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}
function nap() {
    var t0, t1 = taskHead, t2, time = Infinity;
    while(t1)if (t1._call) {
        if (time > t1._time) time = t1._time;
        t0 = t1, t1 = t1._next;
    } else {
        t2 = t1._next, t1._next = null;
        t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
    taskTail = t0;
    sleep(time);
}
function sleep(time) {
    if (frame) return; // Soonest alarm already set, or will be.
    if (timeout) timeout = clearTimeout(timeout);
    var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
    if (delay > 24) {
        if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
        if (interval) interval = clearInterval(interval);
    } else {
        if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
        frame = 1, setFrame(wake);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ioM7O":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(callback, delay, time) {
        var t = new (0, _timerJs.Timer);
        delay = delay == null ? 0 : +delay;
        t.restart(function(elapsed) {
            t.stop();
            callback(elapsed + delay);
        }, delay, time);
        return t;
    });
var _timerJs = require("./timer.js");

},{"./timer.js":"bfF2F","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aZzEX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(name) {
        var id, timing;
        if (name instanceof (0, _indexJs.Transition)) id = name._id, name = name._name;
        else id = (0, _indexJs.newId)(), (timing = defaultTiming).time = (0, _d3Timer.now)(), name = name == null ? null : name + "";
        for(var groups = this._groups, m = groups.length, j = 0; j < m; ++j){
            for(var group = groups[j], n = group.length, node, i = 0; i < n; ++i)if (node = group[i]) (0, _scheduleJsDefault.default)(node, name, id, i, group, timing || inherit(node, id));
        }
        return new (0, _indexJs.Transition)(groups, this._parents, name, id);
    });
var _indexJs = require("../transition/index.js");
var _scheduleJs = require("../transition/schedule.js");
var _scheduleJsDefault = parcelHelpers.interopDefault(_scheduleJs);
var _d3Ease = require("d3-ease");
var _d3Timer = require("d3-timer");
var defaultTiming = {
    time: null,
    delay: 0,
    duration: 250,
    ease: (0, _d3Ease.easeCubicInOut)
};
function inherit(node, id) {
    var timing;
    while(!(timing = node.__transition) || !(timing = timing[id])){
        if (!(node = node.parentNode)) return defaultTiming.time = (0, _d3Timer.now)(), defaultTiming;
    }
    return timing;
}

},{"../transition/index.js":"h2Srb","../transition/schedule.js":"de74c","d3-ease":"8sCNl","d3-timer":"7TEss","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"h2Srb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Transition", ()=>Transition);
parcelHelpers.export(exports, "default", ()=>transition);
parcelHelpers.export(exports, "newId", ()=>newId);
var _d3Selection = require("d3-selection");
var _attrJs = require("./attr.js");
var _attrJsDefault = parcelHelpers.interopDefault(_attrJs);
var _attrTweenJs = require("./attrTween.js");
var _attrTweenJsDefault = parcelHelpers.interopDefault(_attrTweenJs);
var _delayJs = require("./delay.js");
var _delayJsDefault = parcelHelpers.interopDefault(_delayJs);
var _durationJs = require("./duration.js");
var _durationJsDefault = parcelHelpers.interopDefault(_durationJs);
var _easeJs = require("./ease.js");
var _easeJsDefault = parcelHelpers.interopDefault(_easeJs);
var _filterJs = require("./filter.js");
var _filterJsDefault = parcelHelpers.interopDefault(_filterJs);
var _mergeJs = require("./merge.js");
var _mergeJsDefault = parcelHelpers.interopDefault(_mergeJs);
var _onJs = require("./on.js");
var _onJsDefault = parcelHelpers.interopDefault(_onJs);
var _removeJs = require("./remove.js");
var _removeJsDefault = parcelHelpers.interopDefault(_removeJs);
var _selectJs = require("./select.js");
var _selectJsDefault = parcelHelpers.interopDefault(_selectJs);
var _selectAllJs = require("./selectAll.js");
var _selectAllJsDefault = parcelHelpers.interopDefault(_selectAllJs);
var _selectionJs = require("./selection.js");
var _selectionJsDefault = parcelHelpers.interopDefault(_selectionJs);
var _styleJs = require("./style.js");
var _styleJsDefault = parcelHelpers.interopDefault(_styleJs);
var _styleTweenJs = require("./styleTween.js");
var _styleTweenJsDefault = parcelHelpers.interopDefault(_styleTweenJs);
var _textJs = require("./text.js");
var _textJsDefault = parcelHelpers.interopDefault(_textJs);
var _textTweenJs = require("./textTween.js");
var _textTweenJsDefault = parcelHelpers.interopDefault(_textTweenJs);
var _transitionJs = require("./transition.js");
var _transitionJsDefault = parcelHelpers.interopDefault(_transitionJs);
var _tweenJs = require("./tween.js");
var _tweenJsDefault = parcelHelpers.interopDefault(_tweenJs);
var _endJs = require("./end.js");
var _endJsDefault = parcelHelpers.interopDefault(_endJs);
var id = 0;
function Transition(groups, parents, name, id) {
    this._groups = groups;
    this._parents = parents;
    this._name = name;
    this._id = id;
}
function transition(name) {
    return (0, _d3Selection.selection)().transition(name);
}
function newId() {
    return ++id;
}
var selection_prototype = (0, _d3Selection.selection).prototype;
Transition.prototype = transition.prototype = {
    constructor: Transition,
    select: (0, _selectJsDefault.default),
    selectAll: (0, _selectAllJsDefault.default),
    filter: (0, _filterJsDefault.default),
    merge: (0, _mergeJsDefault.default),
    selection: (0, _selectionJsDefault.default),
    transition: (0, _transitionJsDefault.default),
    call: selection_prototype.call,
    nodes: selection_prototype.nodes,
    node: selection_prototype.node,
    size: selection_prototype.size,
    empty: selection_prototype.empty,
    each: selection_prototype.each,
    on: (0, _onJsDefault.default),
    attr: (0, _attrJsDefault.default),
    attrTween: (0, _attrTweenJsDefault.default),
    style: (0, _styleJsDefault.default),
    styleTween: (0, _styleTweenJsDefault.default),
    text: (0, _textJsDefault.default),
    textTween: (0, _textTweenJsDefault.default),
    remove: (0, _removeJsDefault.default),
    tween: (0, _tweenJsDefault.default),
    delay: (0, _delayJsDefault.default),
    duration: (0, _durationJsDefault.default),
    ease: (0, _easeJsDefault.default),
    end: (0, _endJsDefault.default)
};

},{"d3-selection":"gn9gd","./attr.js":"9UgA3","./attrTween.js":"1hMpn","./delay.js":"2BzOF","./duration.js":"ei298","./ease.js":"lCGHM","./filter.js":"d3Uia","./merge.js":"9odBi","./on.js":"3XrBC","./remove.js":"aZLkz","./select.js":"bgUUX","./selectAll.js":"lqPi4","./selection.js":"iWTRA","./style.js":"44QDP","./styleTween.js":"42AvL","./text.js":"6mGEx","./textTween.js":"kqC5z","./transition.js":"50tVR","./tween.js":"1Kbbg","./end.js":"ev0ir","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9UgA3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(name, value) {
        var fullname = (0, _d3Selection.namespace)(name), i = fullname === "transform" ? (0, _d3Interpolate.interpolateTransformSvg) : (0, _interpolateJsDefault.default);
        return this.attrTween(name, typeof value === "function" ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, (0, _tweenJs.tweenValue)(this, "attr." + name, value)) : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname) : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
    });
var _d3Interpolate = require("d3-interpolate");
var _d3Selection = require("d3-selection");
var _tweenJs = require("./tween.js");
var _interpolateJs = require("./interpolate.js");
var _interpolateJsDefault = parcelHelpers.interopDefault(_interpolateJs);
function attrRemove(name) {
    return function() {
        this.removeAttribute(name);
    };
}
function attrRemoveNS(fullname) {
    return function() {
        this.removeAttributeNS(fullname.space, fullname.local);
    };
}
function attrConstant(name, interpolate, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
        var string0 = this.getAttribute(name);
        return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
}
function attrConstantNS(fullname, interpolate, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
        var string0 = this.getAttributeNS(fullname.space, fullname.local);
        return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
}
function attrFunction(name, interpolate, value) {
    var string00, string10, interpolate0;
    return function() {
        var string0, value1 = value(this), string1;
        if (value1 == null) return void this.removeAttribute(name);
        string0 = this.getAttribute(name);
        string1 = value1 + "";
        return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
}
function attrFunctionNS(fullname, interpolate, value) {
    var string00, string10, interpolate0;
    return function() {
        var string0, value1 = value(this), string1;
        if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
        string0 = this.getAttributeNS(fullname.space, fullname.local);
        string1 = value1 + "";
        return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
}

},{"d3-interpolate":"6jJyi","d3-selection":"gn9gd","./tween.js":"1Kbbg","./interpolate.js":"69lgs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6jJyi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "interpolate", ()=>(0, _valueJsDefault.default));
parcelHelpers.export(exports, "interpolateArray", ()=>(0, _arrayJsDefault.default));
parcelHelpers.export(exports, "interpolateBasis", ()=>(0, _basisJsDefault.default));
parcelHelpers.export(exports, "interpolateBasisClosed", ()=>(0, _basisClosedJsDefault.default));
parcelHelpers.export(exports, "interpolateDate", ()=>(0, _dateJsDefault.default));
parcelHelpers.export(exports, "interpolateDiscrete", ()=>(0, _discreteJsDefault.default));
parcelHelpers.export(exports, "interpolateHue", ()=>(0, _hueJsDefault.default));
parcelHelpers.export(exports, "interpolateNumber", ()=>(0, _numberJsDefault.default));
parcelHelpers.export(exports, "interpolateNumberArray", ()=>(0, _numberArrayJsDefault.default));
parcelHelpers.export(exports, "interpolateObject", ()=>(0, _objectJsDefault.default));
parcelHelpers.export(exports, "interpolateRound", ()=>(0, _roundJsDefault.default));
parcelHelpers.export(exports, "interpolateString", ()=>(0, _stringJsDefault.default));
parcelHelpers.export(exports, "interpolateTransformCss", ()=>(0, _indexJs.interpolateTransformCss));
parcelHelpers.export(exports, "interpolateTransformSvg", ()=>(0, _indexJs.interpolateTransformSvg));
parcelHelpers.export(exports, "interpolateZoom", ()=>(0, _zoomJsDefault.default));
parcelHelpers.export(exports, "interpolateRgb", ()=>(0, _rgbJsDefault.default));
parcelHelpers.export(exports, "interpolateRgbBasis", ()=>(0, _rgbJs.rgbBasis));
parcelHelpers.export(exports, "interpolateRgbBasisClosed", ()=>(0, _rgbJs.rgbBasisClosed));
parcelHelpers.export(exports, "interpolateHsl", ()=>(0, _hslJsDefault.default));
parcelHelpers.export(exports, "interpolateHslLong", ()=>(0, _hslJs.hslLong));
parcelHelpers.export(exports, "interpolateLab", ()=>(0, _labJsDefault.default));
parcelHelpers.export(exports, "interpolateHcl", ()=>(0, _hclJsDefault.default));
parcelHelpers.export(exports, "interpolateHclLong", ()=>(0, _hclJs.hclLong));
parcelHelpers.export(exports, "interpolateCubehelix", ()=>(0, _cubehelixJsDefault.default));
parcelHelpers.export(exports, "interpolateCubehelixLong", ()=>(0, _cubehelixJs.cubehelixLong));
parcelHelpers.export(exports, "piecewise", ()=>(0, _piecewiseJsDefault.default));
parcelHelpers.export(exports, "quantize", ()=>(0, _quantizeJsDefault.default));
var _valueJs = require("./value.js");
var _valueJsDefault = parcelHelpers.interopDefault(_valueJs);
var _arrayJs = require("./array.js");
var _arrayJsDefault = parcelHelpers.interopDefault(_arrayJs);
var _basisJs = require("./basis.js");
var _basisJsDefault = parcelHelpers.interopDefault(_basisJs);
var _basisClosedJs = require("./basisClosed.js");
var _basisClosedJsDefault = parcelHelpers.interopDefault(_basisClosedJs);
var _dateJs = require("./date.js");
var _dateJsDefault = parcelHelpers.interopDefault(_dateJs);
var _discreteJs = require("./discrete.js");
var _discreteJsDefault = parcelHelpers.interopDefault(_discreteJs);
var _hueJs = require("./hue.js");
var _hueJsDefault = parcelHelpers.interopDefault(_hueJs);
var _numberJs = require("./number.js");
var _numberJsDefault = parcelHelpers.interopDefault(_numberJs);
var _numberArrayJs = require("./numberArray.js");
var _numberArrayJsDefault = parcelHelpers.interopDefault(_numberArrayJs);
var _objectJs = require("./object.js");
var _objectJsDefault = parcelHelpers.interopDefault(_objectJs);
var _roundJs = require("./round.js");
var _roundJsDefault = parcelHelpers.interopDefault(_roundJs);
var _stringJs = require("./string.js");
var _stringJsDefault = parcelHelpers.interopDefault(_stringJs);
var _indexJs = require("./transform/index.js");
var _zoomJs = require("./zoom.js");
var _zoomJsDefault = parcelHelpers.interopDefault(_zoomJs);
var _rgbJs = require("./rgb.js");
var _rgbJsDefault = parcelHelpers.interopDefault(_rgbJs);
var _hslJs = require("./hsl.js");
var _hslJsDefault = parcelHelpers.interopDefault(_hslJs);
var _labJs = require("./lab.js");
var _labJsDefault = parcelHelpers.interopDefault(_labJs);
var _hclJs = require("./hcl.js");
var _hclJsDefault = parcelHelpers.interopDefault(_hclJs);
var _cubehelixJs = require("./cubehelix.js");
var _cubehelixJsDefault = parcelHelpers.interopDefault(_cubehelixJs);
var _piecewiseJs = require("./piecewise.js");
var _piecewiseJsDefault = parcelHelpers.interopDefault(_piecewiseJs);
var _quantizeJs = require("./quantize.js");
var _quantizeJsDefault = parcelHelpers.interopDefault(_quantizeJs);

},{"./value.js":"2GpMq","./array.js":false,"./basis.js":false,"./basisClosed.js":false,"./date.js":false,"./discrete.js":false,"./hue.js":false,"./number.js":"fZAq5","./numberArray.js":false,"./object.js":false,"./round.js":"8lHW7","./string.js":"Qre8m","./transform/index.js":"jDBQO","./zoom.js":false,"./rgb.js":"gHrgo","./hsl.js":false,"./lab.js":false,"./hcl.js":false,"./cubehelix.js":false,"./piecewise.js":"1W7eI","./quantize.js":false,"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2GpMq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(a, b) {
        var t = typeof b, c;
        return b == null || t === "boolean" ? (0, _constantJsDefault.default)(b) : (t === "number" ? (0, _numberJsDefault.default) : t === "string" ? (c = (0, _d3Color.color)(b)) ? (b = c, _rgbJsDefault.default) : (0, _stringJsDefault.default) : b instanceof (0, _d3Color.color) ? (0, _rgbJsDefault.default) : b instanceof Date ? (0, _dateJsDefault.default) : (0, _numberArrayJs.isNumberArray)(b) ? (0, _numberArrayJsDefault.default) : Array.isArray(b) ? (0, _arrayJs.genericArray) : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? (0, _objectJsDefault.default) : (0, _numberJsDefault.default))(a, b);
    });
var _d3Color = require("d3-color");
var _rgbJs = require("./rgb.js");
var _rgbJsDefault = parcelHelpers.interopDefault(_rgbJs);
var _arrayJs = require("./array.js");
var _dateJs = require("./date.js");
var _dateJsDefault = parcelHelpers.interopDefault(_dateJs);
var _numberJs = require("./number.js");
var _numberJsDefault = parcelHelpers.interopDefault(_numberJs);
var _objectJs = require("./object.js");
var _objectJsDefault = parcelHelpers.interopDefault(_objectJs);
var _stringJs = require("./string.js");
var _stringJsDefault = parcelHelpers.interopDefault(_stringJs);
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _numberArrayJs = require("./numberArray.js");
var _numberArrayJsDefault = parcelHelpers.interopDefault(_numberArrayJs);

},{"d3-color":"grhaa","./rgb.js":"gHrgo","./array.js":"bQXK0","./date.js":"cCKgJ","./number.js":"fZAq5","./object.js":"hdyKg","./string.js":"Qre8m","./constant.js":"aXv76","./numberArray.js":"l29YZ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"grhaa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "color", ()=>(0, _colorJsDefault.default));
parcelHelpers.export(exports, "rgb", ()=>(0, _colorJs.rgb));
parcelHelpers.export(exports, "hsl", ()=>(0, _colorJs.hsl));
parcelHelpers.export(exports, "lab", ()=>(0, _labJsDefault.default));
parcelHelpers.export(exports, "hcl", ()=>(0, _labJs.hcl));
parcelHelpers.export(exports, "lch", ()=>(0, _labJs.lch));
parcelHelpers.export(exports, "gray", ()=>(0, _labJs.gray));
parcelHelpers.export(exports, "cubehelix", ()=>(0, _cubehelixJsDefault.default));
var _colorJs = require("./color.js");
var _colorJsDefault = parcelHelpers.interopDefault(_colorJs);
var _labJs = require("./lab.js");
var _labJsDefault = parcelHelpers.interopDefault(_labJs);
var _cubehelixJs = require("./cubehelix.js");
var _cubehelixJsDefault = parcelHelpers.interopDefault(_cubehelixJs);

},{"./color.js":"cNCyv","./lab.js":false,"./cubehelix.js":false,"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cNCyv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Color", ()=>Color);
parcelHelpers.export(exports, "darker", ()=>darker);
parcelHelpers.export(exports, "brighter", ()=>brighter);
parcelHelpers.export(exports, "default", ()=>color);
parcelHelpers.export(exports, "rgbConvert", ()=>rgbConvert);
parcelHelpers.export(exports, "rgb", ()=>rgb);
parcelHelpers.export(exports, "Rgb", ()=>Rgb);
parcelHelpers.export(exports, "hslConvert", ()=>hslConvert);
parcelHelpers.export(exports, "hsl", ()=>hsl);
var _defineJs = require("./define.js");
var _defineJsDefault = parcelHelpers.interopDefault(_defineJs);
function Color() {}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*", reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*", reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*", reHex = /^#([0-9a-f]{3,8})$/, reRgbInteger = new RegExp("^rgb\\(" + [
    reI,
    reI,
    reI
] + "\\)$"), reRgbPercent = new RegExp("^rgb\\(" + [
    reP,
    reP,
    reP
] + "\\)$"), reRgbaInteger = new RegExp("^rgba\\(" + [
    reI,
    reI,
    reI,
    reN
] + "\\)$"), reRgbaPercent = new RegExp("^rgba\\(" + [
    reP,
    reP,
    reP,
    reN
] + "\\)$"), reHslPercent = new RegExp("^hsl\\(" + [
    reN,
    reP,
    reP
] + "\\)$"), reHslaPercent = new RegExp("^hsla\\(" + [
    reN,
    reP,
    reP,
    reN
] + "\\)$");
var named = {
    aliceblue: 0xf0f8ff,
    antiquewhite: 0xfaebd7,
    aqua: 0x00ffff,
    aquamarine: 0x7fffd4,
    azure: 0xf0ffff,
    beige: 0xf5f5dc,
    bisque: 0xffe4c4,
    black: 0x000000,
    blanchedalmond: 0xffebcd,
    blue: 0x0000ff,
    blueviolet: 0x8a2be2,
    brown: 0xa52a2a,
    burlywood: 0xdeb887,
    cadetblue: 0x5f9ea0,
    chartreuse: 0x7fff00,
    chocolate: 0xd2691e,
    coral: 0xff7f50,
    cornflowerblue: 0x6495ed,
    cornsilk: 0xfff8dc,
    crimson: 0xdc143c,
    cyan: 0x00ffff,
    darkblue: 0x00008b,
    darkcyan: 0x008b8b,
    darkgoldenrod: 0xb8860b,
    darkgray: 0xa9a9a9,
    darkgreen: 0x006400,
    darkgrey: 0xa9a9a9,
    darkkhaki: 0xbdb76b,
    darkmagenta: 0x8b008b,
    darkolivegreen: 0x556b2f,
    darkorange: 0xff8c00,
    darkorchid: 0x9932cc,
    darkred: 0x8b0000,
    darksalmon: 0xe9967a,
    darkseagreen: 0x8fbc8f,
    darkslateblue: 0x483d8b,
    darkslategray: 0x2f4f4f,
    darkslategrey: 0x2f4f4f,
    darkturquoise: 0x00ced1,
    darkviolet: 0x9400d3,
    deeppink: 0xff1493,
    deepskyblue: 0x00bfff,
    dimgray: 0x696969,
    dimgrey: 0x696969,
    dodgerblue: 0x1e90ff,
    firebrick: 0xb22222,
    floralwhite: 0xfffaf0,
    forestgreen: 0x228b22,
    fuchsia: 0xff00ff,
    gainsboro: 0xdcdcdc,
    ghostwhite: 0xf8f8ff,
    gold: 0xffd700,
    goldenrod: 0xdaa520,
    gray: 0x808080,
    green: 0x008000,
    greenyellow: 0xadff2f,
    grey: 0x808080,
    honeydew: 0xf0fff0,
    hotpink: 0xff69b4,
    indianred: 0xcd5c5c,
    indigo: 0x4b0082,
    ivory: 0xfffff0,
    khaki: 0xf0e68c,
    lavender: 0xe6e6fa,
    lavenderblush: 0xfff0f5,
    lawngreen: 0x7cfc00,
    lemonchiffon: 0xfffacd,
    lightblue: 0xadd8e6,
    lightcoral: 0xf08080,
    lightcyan: 0xe0ffff,
    lightgoldenrodyellow: 0xfafad2,
    lightgray: 0xd3d3d3,
    lightgreen: 0x90ee90,
    lightgrey: 0xd3d3d3,
    lightpink: 0xffb6c1,
    lightsalmon: 0xffa07a,
    lightseagreen: 0x20b2aa,
    lightskyblue: 0x87cefa,
    lightslategray: 0x778899,
    lightslategrey: 0x778899,
    lightsteelblue: 0xb0c4de,
    lightyellow: 0xffffe0,
    lime: 0x00ff00,
    limegreen: 0x32cd32,
    linen: 0xfaf0e6,
    magenta: 0xff00ff,
    maroon: 0x800000,
    mediumaquamarine: 0x66cdaa,
    mediumblue: 0x0000cd,
    mediumorchid: 0xba55d3,
    mediumpurple: 0x9370db,
    mediumseagreen: 0x3cb371,
    mediumslateblue: 0x7b68ee,
    mediumspringgreen: 0x00fa9a,
    mediumturquoise: 0x48d1cc,
    mediumvioletred: 0xc71585,
    midnightblue: 0x191970,
    mintcream: 0xf5fffa,
    mistyrose: 0xffe4e1,
    moccasin: 0xffe4b5,
    navajowhite: 0xffdead,
    navy: 0x000080,
    oldlace: 0xfdf5e6,
    olive: 0x808000,
    olivedrab: 0x6b8e23,
    orange: 0xffa500,
    orangered: 0xff4500,
    orchid: 0xda70d6,
    palegoldenrod: 0xeee8aa,
    palegreen: 0x98fb98,
    paleturquoise: 0xafeeee,
    palevioletred: 0xdb7093,
    papayawhip: 0xffefd5,
    peachpuff: 0xffdab9,
    peru: 0xcd853f,
    pink: 0xffc0cb,
    plum: 0xdda0dd,
    powderblue: 0xb0e0e6,
    purple: 0x800080,
    rebeccapurple: 0x663399,
    red: 0xff0000,
    rosybrown: 0xbc8f8f,
    royalblue: 0x4169e1,
    saddlebrown: 0x8b4513,
    salmon: 0xfa8072,
    sandybrown: 0xf4a460,
    seagreen: 0x2e8b57,
    seashell: 0xfff5ee,
    sienna: 0xa0522d,
    silver: 0xc0c0c0,
    skyblue: 0x87ceeb,
    slateblue: 0x6a5acd,
    slategray: 0x708090,
    slategrey: 0x708090,
    snow: 0xfffafa,
    springgreen: 0x00ff7f,
    steelblue: 0x4682b4,
    tan: 0xd2b48c,
    teal: 0x008080,
    thistle: 0xd8bfd8,
    tomato: 0xff6347,
    turquoise: 0x40e0d0,
    violet: 0xee82ee,
    wheat: 0xf5deb3,
    white: 0xffffff,
    whitesmoke: 0xf5f5f5,
    yellow: 0xffff00,
    yellowgreen: 0x9acd32
};
(0, _defineJsDefault.default)(Color, color, {
    copy: function(channels) {
        return Object.assign(new this.constructor, this, channels);
    },
    displayable: function() {
        return this.rgb().displayable();
    },
    hex: color_formatHex,
    formatHex: color_formatHex,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
});
function color_formatHex() {
    return this.rgb().formatHex();
}
function color_formatHsl() {
    return hslConvert(this).formatHsl();
}
function color_formatRgb() {
    return this.rgb().formatRgb();
}
function color(format) {
    var m, l;
    format = (format + "").trim().toLowerCase();
    return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
     : l === 3 ? new Rgb(m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, (m & 0xf) << 4 | m & 0xf, 1) // #f00
     : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
     : l === 4 ? rgba(m >> 12 & 0xf | m >> 8 & 0xf0, m >> 8 & 0xf | m >> 4 & 0xf0, m >> 4 & 0xf | m & 0xf0, ((m & 0xf) << 4 | m & 0xf) / 0xff) // #f000
     : null // invalid hex
    ) : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
     : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
     : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
     : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
     : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
     : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
     : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
     : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n) {
    return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}
function rgba(r, g, b, a) {
    if (a <= 0) r = g = b = NaN;
    return new Rgb(r, g, b, a);
}
function rgbConvert(o) {
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Rgb;
    o = o.rgb();
    return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb(r, g, b, opacity) {
    return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}
function Rgb(r, g, b, opacity) {
    this.r = +r;
    this.g = +g;
    this.b = +b;
    this.opacity = +opacity;
}
(0, _defineJsDefault.default)(Rgb, rgb, (0, _defineJs.extend)(Color, {
    brighter: function(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    darker: function(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
    },
    rgb: function() {
        return this;
    },
    displayable: function() {
        return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: rgb_formatHex,
    formatHex: rgb_formatHex,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
}));
function rgb_formatHex() {
    return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}
function rgb_formatRgb() {
    var a = this.opacity;
    a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "rgb(" : "rgba(") + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", " + Math.max(0, Math.min(255, Math.round(this.b) || 0)) + (a === 1 ? ")" : ", " + a + ")");
}
function hex(value) {
    value = Math.max(0, Math.min(255, Math.round(value) || 0));
    return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h, s, l, a) {
    if (a <= 0) h = s = l = NaN;
    else if (l <= 0 || l >= 1) h = s = NaN;
    else if (s <= 0) h = NaN;
    return new Hsl(h, s, l, a);
}
function hslConvert(o) {
    if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
    if (!(o instanceof Color)) o = color(o);
    if (!o) return new Hsl;
    if (o instanceof Hsl) return o;
    o = o.rgb();
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, min = Math.min(r, g, b), max = Math.max(r, g, b), h = NaN, s = max - min, l = (max + min) / 2;
    if (s) {
        if (r === max) h = (g - b) / s + (g < b) * 6;
        else if (g === max) h = (b - r) / s + 2;
        else h = (r - g) / s + 4;
        s /= l < 0.5 ? max + min : 2 - max - min;
        h *= 60;
    } else s = l > 0 && l < 1 ? 0 : h;
    return new Hsl(h, s, l, o.opacity);
}
function hsl(h, s, l, opacity) {
    return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}
function Hsl(h, s, l, opacity) {
    this.h = +h;
    this.s = +s;
    this.l = +l;
    this.opacity = +opacity;
}
(0, _defineJsDefault.default)(Hsl, hsl, (0, _defineJs.extend)(Color, {
    brighter: function(k) {
        k = k == null ? brighter : Math.pow(brighter, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    darker: function(k) {
        k = k == null ? darker : Math.pow(darker, k);
        return new Hsl(this.h, this.s, this.l * k, this.opacity);
    },
    rgb: function() {
        var h = this.h % 360 + (this.h < 0) * 360, s = isNaN(h) || isNaN(this.s) ? 0 : this.s, l = this.l, m2 = l + (l < 0.5 ? l : 1 - l) * s, m1 = 2 * l - m2;
        return new Rgb(hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2), hsl2rgb(h, m1, m2), hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2), this.opacity);
    },
    displayable: function() {
        return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
    },
    formatHsl: function() {
        var a = this.opacity;
        a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
        return (a === 1 ? "hsl(" : "hsla(") + (this.h || 0) + ", " + (this.s || 0) * 100 + "%, " + (this.l || 0) * 100 + "%" + (a === 1 ? ")" : ", " + a + ")");
    }
}));
/* From FvD 13.37, CSS Color Module Level 3 */ function hsl2rgb(h, m1, m2) {
    return (h < 60 ? m1 + (m2 - m1) * h / 60 : h < 180 ? m2 : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60 : m1) * 255;
}

},{"./define.js":"avQOe","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"avQOe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(constructor, factory, prototype) {
        constructor.prototype = factory.prototype = prototype;
        prototype.constructor = constructor;
    });
parcelHelpers.export(exports, "extend", ()=>extend);
function extend(parent, definition) {
    var prototype = Object.create(parent.prototype);
    for(var key in definition)prototype[key] = definition[key];
    return prototype;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gHrgo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "rgbBasis", ()=>rgbBasis);
parcelHelpers.export(exports, "rgbBasisClosed", ()=>rgbBasisClosed);
var _d3Color = require("d3-color");
var _basisJs = require("./basis.js");
var _basisJsDefault = parcelHelpers.interopDefault(_basisJs);
var _basisClosedJs = require("./basisClosed.js");
var _basisClosedJsDefault = parcelHelpers.interopDefault(_basisClosedJs);
var _colorJs = require("./color.js");
var _colorJsDefault = parcelHelpers.interopDefault(_colorJs);
exports.default = function rgbGamma(y) {
    var color = (0, _colorJs.gamma)(y);
    function rgb(start, end) {
        var r = color((start = (0, _d3Color.rgb)(start)).r, (end = (0, _d3Color.rgb)(end)).r), g = color(start.g, end.g), b = color(start.b, end.b), opacity = (0, _colorJsDefault.default)(start.opacity, end.opacity);
        return function(t) {
            start.r = r(t);
            start.g = g(t);
            start.b = b(t);
            start.opacity = opacity(t);
            return start + "";
        };
    }
    rgb.gamma = rgbGamma;
    return rgb;
}(1);
function rgbSpline(spline) {
    return function(colors) {
        var n = colors.length, r = new Array(n), g = new Array(n), b = new Array(n), i, color;
        for(i = 0; i < n; ++i){
            color = (0, _d3Color.rgb)(colors[i]);
            r[i] = color.r || 0;
            g[i] = color.g || 0;
            b[i] = color.b || 0;
        }
        r = spline(r);
        g = spline(g);
        b = spline(b);
        color.opacity = 1;
        return function(t) {
            color.r = r(t);
            color.g = g(t);
            color.b = b(t);
            return color + "";
        };
    };
}
var rgbBasis = rgbSpline((0, _basisJsDefault.default));
var rgbBasisClosed = rgbSpline((0, _basisClosedJsDefault.default));

},{"d3-color":"grhaa","./basis.js":"enhcL","./basisClosed.js":"gdZAO","./color.js":"1eZq9","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"enhcL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "basis", ()=>basis);
parcelHelpers.export(exports, "default", ()=>function(values) {
        var n = values.length - 1;
        return function(t) {
            var i = t <= 0 ? t = 0 : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n), v1 = values[i], v2 = values[i + 1], v0 = i > 0 ? values[i - 1] : 2 * v1 - v2, v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
            return basis((t - i / n) * n, v0, v1, v2, v3);
        };
    });
function basis(t1, v0, v1, v2, v3) {
    var t2 = t1 * t1, t3 = t2 * t1;
    return ((1 - 3 * t1 + 3 * t2 - t3) * v0 + (4 - 6 * t2 + 3 * t3) * v1 + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 + t3 * v3) / 6;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gdZAO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(values) {
        var n = values.length;
        return function(t) {
            var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n), v0 = values[(i + n - 1) % n], v1 = values[i % n], v2 = values[(i + 1) % n], v3 = values[(i + 2) % n];
            return (0, _basisJs.basis)((t - i / n) * n, v0, v1, v2, v3);
        };
    });
var _basisJs = require("./basis.js");

},{"./basis.js":"enhcL","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1eZq9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "hue", ()=>hue);
parcelHelpers.export(exports, "gamma", ()=>gamma);
parcelHelpers.export(exports, "default", ()=>nogamma);
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
function linear(a, d) {
    return function(t) {
        return a + t * d;
    };
}
function exponential(a, b, y) {
    return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
        return Math.pow(a + t * b, y);
    };
}
function hue(a, b) {
    var d = b - a;
    return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : (0, _constantJsDefault.default)(isNaN(a) ? b : a);
}
function gamma(y) {
    return (y = +y) === 1 ? nogamma : function(a, b) {
        return b - a ? exponential(a, b, y) : (0, _constantJsDefault.default)(isNaN(a) ? b : a);
    };
}
function nogamma(a, b) {
    var d = b - a;
    return d ? linear(a, d) : (0, _constantJsDefault.default)(isNaN(a) ? b : a);
}

},{"./constant.js":"aXv76","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aXv76":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(x) {
        return function() {
            return x;
        };
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bQXK0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(a, b) {
        return ((0, _numberArrayJs.isNumberArray)(b) ? (0, _numberArrayJsDefault.default) : genericArray)(a, b);
    });
parcelHelpers.export(exports, "genericArray", ()=>genericArray);
var _valueJs = require("./value.js");
var _valueJsDefault = parcelHelpers.interopDefault(_valueJs);
var _numberArrayJs = require("./numberArray.js");
var _numberArrayJsDefault = parcelHelpers.interopDefault(_numberArrayJs);
function genericArray(a, b) {
    var nb = b ? b.length : 0, na = a ? Math.min(nb, a.length) : 0, x = new Array(na), c = new Array(nb), i;
    for(i = 0; i < na; ++i)x[i] = (0, _valueJsDefault.default)(a[i], b[i]);
    for(; i < nb; ++i)c[i] = b[i];
    return function(t) {
        for(i = 0; i < na; ++i)c[i] = x[i](t);
        return c;
    };
}

},{"./value.js":"2GpMq","./numberArray.js":"l29YZ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"l29YZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(a, b) {
        if (!b) b = [];
        var n = a ? Math.min(b.length, a.length) : 0, c = b.slice(), i;
        return function(t) {
            for(i = 0; i < n; ++i)c[i] = a[i] * (1 - t) + b[i] * t;
            return c;
        };
    });
parcelHelpers.export(exports, "isNumberArray", ()=>isNumberArray);
function isNumberArray(x) {
    return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cCKgJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(a, b) {
        var d = new Date;
        return a = +a, b = +b, function(t) {
            return d.setTime(a * (1 - t) + b * t), d;
        };
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fZAq5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(a, b) {
        return a = +a, b = +b, function(t) {
            return a * (1 - t) + b * t;
        };
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hdyKg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(a, b) {
        var i = {}, c = {}, k;
        if (a === null || typeof a !== "object") a = {};
        if (b === null || typeof b !== "object") b = {};
        for(k in b)if (k in a) i[k] = (0, _valueJsDefault.default)(a[k], b[k]);
        else c[k] = b[k];
        return function(t) {
            for(k in i)c[k] = i[k](t);
            return c;
        };
    });
var _valueJs = require("./value.js");
var _valueJsDefault = parcelHelpers.interopDefault(_valueJs);

},{"./value.js":"2GpMq","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"Qre8m":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(a, b) {
        var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s = [], q = []; // number interpolators
        // Coerce inputs to strings.
        a = a + "", b = b + "";
        // Interpolate pairs of numbers in a & b.
        while((am = reA.exec(a)) && (bm = reB.exec(b))){
            if ((bs = bm.index) > bi) {
                bs = b.slice(bi, bs);
                if (s[i]) s[i] += bs; // coalesce with previous string
                else s[++i] = bs;
            }
            if ((am = am[0]) === (bm = bm[0])) {
                if (s[i]) s[i] += bm; // coalesce with previous string
                else s[++i] = bm;
            } else {
                s[++i] = null;
                q.push({
                    i: i,
                    x: (0, _numberJsDefault.default)(am, bm)
                });
            }
            bi = reB.lastIndex;
        }
        // Add remains of b.
        if (bi < b.length) {
            bs = b.slice(bi);
            if (s[i]) s[i] += bs; // coalesce with previous string
            else s[++i] = bs;
        }
        // Special optimization for only a single match.
        // Otherwise, interpolate each of the numbers and rejoin the string.
        return s.length < 2 ? q[0] ? one(q[0].x) : zero(b) : (b = q.length, function(t) {
            for(var i = 0, o; i < b; ++i)s[(o = q[i]).i] = o.x(t);
            return s.join("");
        });
    });
var _numberJs = require("./number.js");
var _numberJsDefault = parcelHelpers.interopDefault(_numberJs);
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, reB = new RegExp(reA.source, "g");
function zero(b) {
    return function() {
        return b;
    };
}
function one(b) {
    return function(t) {
        return b(t) + "";
    };
}

},{"./number.js":"fZAq5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8lHW7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(a, b) {
        return a = +a, b = +b, function(t) {
            return Math.round(a * (1 - t) + b * t);
        };
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jDBQO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "interpolateTransformCss", ()=>interpolateTransformCss);
parcelHelpers.export(exports, "interpolateTransformSvg", ()=>interpolateTransformSvg);
var _numberJs = require("../number.js");
var _numberJsDefault = parcelHelpers.interopDefault(_numberJs);
var _parseJs = require("./parse.js");
function interpolateTransform(parse, pxComma, pxParen, degParen) {
    function pop(s) {
        return s.length ? s.pop() + " " : "";
    }
    function translate(xa, ya, xb, yb, s, q) {
        if (xa !== xb || ya !== yb) {
            var i = s.push("translate(", null, pxComma, null, pxParen);
            q.push({
                i: i - 4,
                x: (0, _numberJsDefault.default)(xa, xb)
            }, {
                i: i - 2,
                x: (0, _numberJsDefault.default)(ya, yb)
            });
        } else if (xb || yb) s.push("translate(" + xb + pxComma + yb + pxParen);
    }
    function rotate(a, b, s, q) {
        if (a !== b) {
            if (a - b > 180) b += 360;
            else if (b - a > 180) a += 360; // shortest path
            q.push({
                i: s.push(pop(s) + "rotate(", null, degParen) - 2,
                x: (0, _numberJsDefault.default)(a, b)
            });
        } else if (b) s.push(pop(s) + "rotate(" + b + degParen);
    }
    function skewX(a, b, s, q) {
        if (a !== b) q.push({
            i: s.push(pop(s) + "skewX(", null, degParen) - 2,
            x: (0, _numberJsDefault.default)(a, b)
        });
        else if (b) s.push(pop(s) + "skewX(" + b + degParen);
    }
    function scale(xa, ya, xb, yb, s, q) {
        if (xa !== xb || ya !== yb) {
            var i = s.push(pop(s) + "scale(", null, ",", null, ")");
            q.push({
                i: i - 4,
                x: (0, _numberJsDefault.default)(xa, xb)
            }, {
                i: i - 2,
                x: (0, _numberJsDefault.default)(ya, yb)
            });
        } else if (xb !== 1 || yb !== 1) s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
    return function(a, b) {
        var s = [], q = []; // number interpolators
        a = parse(a), b = parse(b);
        translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
        rotate(a.rotate, b.rotate, s, q);
        skewX(a.skewX, b.skewX, s, q);
        scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
        a = b = null; // gc
        return function(t) {
            var i = -1, n = q.length, o;
            while(++i < n)s[(o = q[i]).i] = o.x(t);
            return s.join("");
        };
    };
}
var interpolateTransformCss = interpolateTransform((0, _parseJs.parseCss), "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform((0, _parseJs.parseSvg), ", ", ")", ")");

},{"../number.js":"fZAq5","./parse.js":"dwvtF","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dwvtF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "parseCss", ()=>parseCss);
parcelHelpers.export(exports, "parseSvg", ()=>parseSvg);
var _decomposeJs = require("./decompose.js");
var _decomposeJsDefault = parcelHelpers.interopDefault(_decomposeJs);
var cssNode, cssRoot, cssView, svgNode;
function parseCss(value) {
    if (value === "none") return 0, _decomposeJs.identity;
    if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
    cssNode.style.transform = value;
    value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
    cssRoot.removeChild(cssNode);
    value = value.slice(7, -1).split(",");
    return (0, _decomposeJsDefault.default)(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
}
function parseSvg(value) {
    if (value == null) return 0, _decomposeJs.identity;
    if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
    svgNode.setAttribute("transform", value);
    if (!(value = svgNode.transform.baseVal.consolidate())) return 0, _decomposeJs.identity;
    value = value.matrix;
    return (0, _decomposeJsDefault.default)(value.a, value.b, value.c, value.d, value.e, value.f);
}

},{"./decompose.js":"7Ejbr","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7Ejbr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "identity", ()=>identity);
parcelHelpers.export(exports, "default", ()=>function(a, b, c, d, e, f) {
        var scaleX, scaleY, skewX;
        if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
        if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
        if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
        if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
        return {
            translateX: e,
            translateY: f,
            rotate: Math.atan2(b, a) * degrees,
            skewX: Math.atan(skewX) * degrees,
            scaleX: scaleX,
            scaleY: scaleY
        };
    });
var degrees = 180 / Math.PI;
var identity = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1W7eI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>piecewise);
function piecewise(interpolate, values) {
    var i = 0, n = values.length - 1, v = values[0], I = new Array(n < 0 ? 0 : n);
    while(i < n)I[i] = interpolate(v, v = values[++i]);
    return function(t) {
        var i = Math.max(0, Math.min(n - 1, Math.floor(t *= n)));
        return I[i](t - i);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1Kbbg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(name, value) {
        var id = this._id;
        name += "";
        if (arguments.length < 2) {
            var tween = (0, _scheduleJs.get)(this.node(), id).tween;
            for(var i = 0, n = tween.length, t; i < n; ++i){
                if ((t = tween[i]).name === name) return t.value;
            }
            return null;
        }
        return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
    });
parcelHelpers.export(exports, "tweenValue", ()=>tweenValue);
var _scheduleJs = require("./schedule.js");
function tweenRemove(id, name) {
    var tween0, tween1;
    return function() {
        var schedule = (0, _scheduleJs.set)(this, id), tween = schedule.tween;
        // If this node shared tween with the previous node,
        // just assign the updated shared tween and we’re done!
        // Otherwise, copy-on-write.
        if (tween !== tween0) {
            tween1 = tween0 = tween;
            for(var i = 0, n = tween1.length; i < n; ++i)if (tween1[i].name === name) {
                tween1 = tween1.slice();
                tween1.splice(i, 1);
                break;
            }
        }
        schedule.tween = tween1;
    };
}
function tweenFunction(id, name, value) {
    var tween0, tween1;
    if (typeof value !== "function") throw new Error;
    return function() {
        var schedule = (0, _scheduleJs.set)(this, id), tween = schedule.tween;
        // If this node shared tween with the previous node,
        // just assign the updated shared tween and we’re done!
        // Otherwise, copy-on-write.
        if (tween !== tween0) {
            tween1 = (tween0 = tween).slice();
            for(var t = {
                name: name,
                value: value
            }, i = 0, n = tween1.length; i < n; ++i)if (tween1[i].name === name) {
                tween1[i] = t;
                break;
            }
            if (i === n) tween1.push(t);
        }
        schedule.tween = tween1;
    };
}
function tweenValue(transition, name, value) {
    var id = transition._id;
    transition.each(function() {
        var schedule = (0, _scheduleJs.set)(this, id);
        (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
    });
    return function(node) {
        return (0, _scheduleJs.get)(node, id).value[name];
    };
}

},{"./schedule.js":"de74c","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"69lgs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(a, b) {
        var c;
        return (typeof b === "number" ? (0, _d3Interpolate.interpolateNumber) : b instanceof (0, _d3Color.color) ? (0, _d3Interpolate.interpolateRgb) : (c = (0, _d3Color.color)(b)) ? (b = c, _d3Interpolate.interpolateRgb) : (0, _d3Interpolate.interpolateString))(a, b);
    });
var _d3Color = require("d3-color");
var _d3Interpolate = require("d3-interpolate");

},{"d3-color":"grhaa","d3-interpolate":"6jJyi","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1hMpn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(name, value) {
        var key = "attr." + name;
        if (arguments.length < 2) return (key = this.tween(key)) && key._value;
        if (value == null) return this.tween(key, null);
        if (typeof value !== "function") throw new Error;
        var fullname = (0, _d3Selection.namespace)(name);
        return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
    });
var _d3Selection = require("d3-selection");
function attrInterpolate(name, i) {
    return function(t) {
        this.setAttribute(name, i.call(this, t));
    };
}
function attrInterpolateNS(fullname, i) {
    return function(t) {
        this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
    };
}
function attrTweenNS(fullname, value) {
    var t0, i0;
    function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
        return t0;
    }
    tween._value = value;
    return tween;
}
function attrTween(name, value) {
    var t0, i0;
    function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
        return t0;
    }
    tween._value = value;
    return tween;
}

},{"d3-selection":"gn9gd","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2BzOF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(value) {
        var id = this._id;
        return arguments.length ? this.each((typeof value === "function" ? delayFunction : delayConstant)(id, value)) : (0, _scheduleJs.get)(this.node(), id).delay;
    });
var _scheduleJs = require("./schedule.js");
function delayFunction(id, value) {
    return function() {
        (0, _scheduleJs.init)(this, id).delay = +value.apply(this, arguments);
    };
}
function delayConstant(id, value) {
    return value = +value, function() {
        (0, _scheduleJs.init)(this, id).delay = value;
    };
}

},{"./schedule.js":"de74c","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ei298":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(value) {
        var id = this._id;
        return arguments.length ? this.each((typeof value === "function" ? durationFunction : durationConstant)(id, value)) : (0, _scheduleJs.get)(this.node(), id).duration;
    });
var _scheduleJs = require("./schedule.js");
function durationFunction(id, value) {
    return function() {
        (0, _scheduleJs.set)(this, id).duration = +value.apply(this, arguments);
    };
}
function durationConstant(id, value) {
    return value = +value, function() {
        (0, _scheduleJs.set)(this, id).duration = value;
    };
}

},{"./schedule.js":"de74c","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lCGHM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(value) {
        var id = this._id;
        return arguments.length ? this.each(easeConstant(id, value)) : (0, _scheduleJs.get)(this.node(), id).ease;
    });
var _scheduleJs = require("./schedule.js");
function easeConstant(id, value) {
    if (typeof value !== "function") throw new Error;
    return function() {
        (0, _scheduleJs.set)(this, id).ease = value;
    };
}

},{"./schedule.js":"de74c","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"d3Uia":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(match) {
        if (typeof match !== "function") match = (0, _d3Selection.matcher)(match);
        for(var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j){
            for(var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i)if ((node = group[i]) && match.call(node, node.__data__, i, group)) subgroup.push(node);
        }
        return new (0, _indexJs.Transition)(subgroups, this._parents, this._name, this._id);
    });
var _d3Selection = require("d3-selection");
var _indexJs = require("./index.js");

},{"d3-selection":"gn9gd","./index.js":"h2Srb","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9odBi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(transition) {
        if (transition._id !== this._id) throw new Error;
        for(var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j){
            for(var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i)if (node = group0[i] || group1[i]) merge[i] = node;
        }
        for(; j < m0; ++j)merges[j] = groups0[j];
        return new (0, _indexJs.Transition)(merges, this._parents, this._name, this._id);
    });
var _indexJs = require("./index.js");

},{"./index.js":"h2Srb","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3XrBC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(name, listener) {
        var id = this._id;
        return arguments.length < 2 ? (0, _scheduleJs.get)(this.node(), id).on.on(name) : this.each(onFunction(id, name, listener));
    });
var _scheduleJs = require("./schedule.js");
function start(name) {
    return (name + "").trim().split(/^|\s+/).every(function(t) {
        var i = t.indexOf(".");
        if (i >= 0) t = t.slice(0, i);
        return !t || t === "start";
    });
}
function onFunction(id, name, listener) {
    var on0, on1, sit = start(name) ? (0, _scheduleJs.init) : (0, _scheduleJs.set);
    return function() {
        var schedule = sit(this, id), on = schedule.on;
        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);
        schedule.on = on1;
    };
}

},{"./schedule.js":"de74c","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aZLkz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        return this.on("end.remove", removeFunction(this._id));
    });
function removeFunction(id) {
    return function() {
        var parent = this.parentNode;
        for(var i in this.__transition)if (+i !== id) return;
        if (parent) parent.removeChild(this);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bgUUX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(select) {
        var name = this._name, id = this._id;
        if (typeof select !== "function") select = (0, _d3Selection.selector)(select);
        for(var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j){
            for(var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i)if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
                if ("__data__" in node) subnode.__data__ = node.__data__;
                subgroup[i] = subnode;
                (0, _scheduleJsDefault.default)(subgroup[i], name, id, i, subgroup, (0, _scheduleJs.get)(node, id));
            }
        }
        return new (0, _indexJs.Transition)(subgroups, this._parents, name, id);
    });
var _d3Selection = require("d3-selection");
var _indexJs = require("./index.js");
var _scheduleJs = require("./schedule.js");
var _scheduleJsDefault = parcelHelpers.interopDefault(_scheduleJs);

},{"d3-selection":"gn9gd","./index.js":"h2Srb","./schedule.js":"de74c","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lqPi4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(select) {
        var name = this._name, id = this._id;
        if (typeof select !== "function") select = (0, _d3Selection.selectorAll)(select);
        for(var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j){
            for(var group = groups[j], n = group.length, node, i = 0; i < n; ++i)if (node = group[i]) {
                for(var children = select.call(node, node.__data__, i, group), child, inherit = (0, _scheduleJs.get)(node, id), k = 0, l = children.length; k < l; ++k)if (child = children[k]) (0, _scheduleJsDefault.default)(child, name, id, k, children, inherit);
                subgroups.push(children);
                parents.push(node);
            }
        }
        return new (0, _indexJs.Transition)(subgroups, parents, name, id);
    });
var _d3Selection = require("d3-selection");
var _indexJs = require("./index.js");
var _scheduleJs = require("./schedule.js");
var _scheduleJsDefault = parcelHelpers.interopDefault(_scheduleJs);

},{"d3-selection":"gn9gd","./index.js":"h2Srb","./schedule.js":"de74c","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iWTRA":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        return new Selection(this._groups, this._parents);
    });
var _d3Selection = require("d3-selection");
var Selection = (0, _d3Selection.selection).prototype.constructor;

},{"d3-selection":"gn9gd","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"44QDP":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(name, value, priority) {
        var i = (name += "") === "transform" ? (0, _d3Interpolate.interpolateTransformCss) : (0, _interpolateJsDefault.default);
        return value == null ? this.styleTween(name, styleNull(name, i)).on("end.style." + name, styleRemove(name)) : typeof value === "function" ? this.styleTween(name, styleFunction(name, i, (0, _tweenJs.tweenValue)(this, "style." + name, value))).each(styleMaybeRemove(this._id, name)) : this.styleTween(name, styleConstant(name, i, value), priority).on("end.style." + name, null);
    });
var _d3Interpolate = require("d3-interpolate");
var _d3Selection = require("d3-selection");
var _scheduleJs = require("./schedule.js");
var _tweenJs = require("./tween.js");
var _interpolateJs = require("./interpolate.js");
var _interpolateJsDefault = parcelHelpers.interopDefault(_interpolateJs);
function styleNull(name, interpolate) {
    var string00, string10, interpolate0;
    return function() {
        var string0 = (0, _d3Selection.style)(this, name), string1 = (this.style.removeProperty(name), (0, _d3Selection.style)(this, name));
        return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : interpolate0 = interpolate(string00 = string0, string10 = string1);
    };
}
function styleRemove(name) {
    return function() {
        this.style.removeProperty(name);
    };
}
function styleConstant(name, interpolate, value1) {
    var string00, string1 = value1 + "", interpolate0;
    return function() {
        var string0 = (0, _d3Selection.style)(this, name);
        return string0 === string1 ? null : string0 === string00 ? interpolate0 : interpolate0 = interpolate(string00 = string0, value1);
    };
}
function styleFunction(name, interpolate, value) {
    var string00, string10, interpolate0;
    return function() {
        var string0 = (0, _d3Selection.style)(this, name), value1 = value(this), string1 = value1 + "";
        if (value1 == null) string1 = value1 = (this.style.removeProperty(name), (0, _d3Selection.style)(this, name));
        return string0 === string1 ? null : string0 === string00 && string1 === string10 ? interpolate0 : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
    };
}
function styleMaybeRemove(id, name) {
    var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
    return function() {
        var schedule = (0, _scheduleJs.set)(this, id), on = schedule.on, listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;
        // If this node shared a dispatch with the previous node,
        // just assign the updated shared dispatch and we’re done!
        // Otherwise, copy-on-write.
        if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);
        schedule.on = on1;
    };
}

},{"d3-interpolate":"6jJyi","d3-selection":"gn9gd","./schedule.js":"de74c","./tween.js":"1Kbbg","./interpolate.js":"69lgs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"42AvL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(name, value, priority) {
        var key = "style." + (name += "");
        if (arguments.length < 2) return (key = this.tween(key)) && key._value;
        if (value == null) return this.tween(key, null);
        if (typeof value !== "function") throw new Error;
        return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
    });
function styleInterpolate(name, i, priority) {
    return function(t) {
        this.style.setProperty(name, i.call(this, t), priority);
    };
}
function styleTween(name, value, priority) {
    var t, i0;
    function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
        return t;
    }
    tween._value = value;
    return tween;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6mGEx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(value) {
        return this.tween("text", typeof value === "function" ? textFunction((0, _tweenJs.tweenValue)(this, "text", value)) : textConstant(value == null ? "" : value + ""));
    });
var _tweenJs = require("./tween.js");
function textConstant(value) {
    return function() {
        this.textContent = value;
    };
}
function textFunction(value) {
    return function() {
        var value1 = value(this);
        this.textContent = value1 == null ? "" : value1;
    };
}

},{"./tween.js":"1Kbbg","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kqC5z":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(value) {
        var key = "text";
        if (arguments.length < 1) return (key = this.tween(key)) && key._value;
        if (value == null) return this.tween(key, null);
        if (typeof value !== "function") throw new Error;
        return this.tween(key, textTween(value));
    });
function textInterpolate(i) {
    return function(t) {
        this.textContent = i.call(this, t);
    };
}
function textTween(value) {
    var t0, i0;
    function tween() {
        var i = value.apply(this, arguments);
        if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
        return t0;
    }
    tween._value = value;
    return tween;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"50tVR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        var name = this._name, id0 = this._id, id1 = (0, _indexJs.newId)();
        for(var groups = this._groups, m = groups.length, j = 0; j < m; ++j){
            for(var group = groups[j], n = group.length, node, i = 0; i < n; ++i)if (node = group[i]) {
                var inherit = (0, _scheduleJs.get)(node, id0);
                (0, _scheduleJsDefault.default)(node, name, id1, i, group, {
                    time: inherit.time + inherit.delay + inherit.duration,
                    delay: 0,
                    duration: inherit.duration,
                    ease: inherit.ease
                });
            }
        }
        return new (0, _indexJs.Transition)(groups, this._parents, name, id1);
    });
var _indexJs = require("./index.js");
var _scheduleJs = require("./schedule.js");
var _scheduleJsDefault = parcelHelpers.interopDefault(_scheduleJs);

},{"./index.js":"h2Srb","./schedule.js":"de74c","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ev0ir":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        var on0, on1, that = this, id = that._id, size = that.size();
        return new Promise(function(resolve, reject) {
            var cancel = {
                value: reject
            }, end = {
                value: function() {
                    if (--size === 0) resolve();
                }
            };
            that.each(function() {
                var schedule = (0, _scheduleJs.set)(this, id), on = schedule.on;
                // If this node shared a dispatch with the previous node,
                // just assign the updated shared dispatch and we’re done!
                // Otherwise, copy-on-write.
                if (on !== on0) {
                    on1 = (on0 = on).copy();
                    on1._.cancel.push(cancel);
                    on1._.interrupt.push(cancel);
                    on1._.end.push(end);
                }
                schedule.on = on1;
            });
        });
    });
var _scheduleJs = require("./schedule.js");

},{"./schedule.js":"de74c","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8sCNl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "easeLinear", ()=>(0, _linearJs.linear));
parcelHelpers.export(exports, "easeQuad", ()=>(0, _quadJs.quadInOut));
parcelHelpers.export(exports, "easeQuadIn", ()=>(0, _quadJs.quadIn));
parcelHelpers.export(exports, "easeQuadOut", ()=>(0, _quadJs.quadOut));
parcelHelpers.export(exports, "easeQuadInOut", ()=>(0, _quadJs.quadInOut));
parcelHelpers.export(exports, "easeCubic", ()=>(0, _cubicJs.cubicInOut));
parcelHelpers.export(exports, "easeCubicIn", ()=>(0, _cubicJs.cubicIn));
parcelHelpers.export(exports, "easeCubicOut", ()=>(0, _cubicJs.cubicOut));
parcelHelpers.export(exports, "easeCubicInOut", ()=>(0, _cubicJs.cubicInOut));
parcelHelpers.export(exports, "easePoly", ()=>(0, _polyJs.polyInOut));
parcelHelpers.export(exports, "easePolyIn", ()=>(0, _polyJs.polyIn));
parcelHelpers.export(exports, "easePolyOut", ()=>(0, _polyJs.polyOut));
parcelHelpers.export(exports, "easePolyInOut", ()=>(0, _polyJs.polyInOut));
parcelHelpers.export(exports, "easeSin", ()=>(0, _sinJs.sinInOut));
parcelHelpers.export(exports, "easeSinIn", ()=>(0, _sinJs.sinIn));
parcelHelpers.export(exports, "easeSinOut", ()=>(0, _sinJs.sinOut));
parcelHelpers.export(exports, "easeSinInOut", ()=>(0, _sinJs.sinInOut));
parcelHelpers.export(exports, "easeExp", ()=>(0, _expJs.expInOut));
parcelHelpers.export(exports, "easeExpIn", ()=>(0, _expJs.expIn));
parcelHelpers.export(exports, "easeExpOut", ()=>(0, _expJs.expOut));
parcelHelpers.export(exports, "easeExpInOut", ()=>(0, _expJs.expInOut));
parcelHelpers.export(exports, "easeCircle", ()=>(0, _circleJs.circleInOut));
parcelHelpers.export(exports, "easeCircleIn", ()=>(0, _circleJs.circleIn));
parcelHelpers.export(exports, "easeCircleOut", ()=>(0, _circleJs.circleOut));
parcelHelpers.export(exports, "easeCircleInOut", ()=>(0, _circleJs.circleInOut));
parcelHelpers.export(exports, "easeBounce", ()=>(0, _bounceJs.bounceOut));
parcelHelpers.export(exports, "easeBounceIn", ()=>(0, _bounceJs.bounceIn));
parcelHelpers.export(exports, "easeBounceOut", ()=>(0, _bounceJs.bounceOut));
parcelHelpers.export(exports, "easeBounceInOut", ()=>(0, _bounceJs.bounceInOut));
parcelHelpers.export(exports, "easeBack", ()=>(0, _backJs.backInOut));
parcelHelpers.export(exports, "easeBackIn", ()=>(0, _backJs.backIn));
parcelHelpers.export(exports, "easeBackOut", ()=>(0, _backJs.backOut));
parcelHelpers.export(exports, "easeBackInOut", ()=>(0, _backJs.backInOut));
parcelHelpers.export(exports, "easeElastic", ()=>(0, _elasticJs.elasticOut));
parcelHelpers.export(exports, "easeElasticIn", ()=>(0, _elasticJs.elasticIn));
parcelHelpers.export(exports, "easeElasticOut", ()=>(0, _elasticJs.elasticOut));
parcelHelpers.export(exports, "easeElasticInOut", ()=>(0, _elasticJs.elasticInOut));
var _linearJs = require("./linear.js");
var _quadJs = require("./quad.js");
var _cubicJs = require("./cubic.js");
var _polyJs = require("./poly.js");
var _sinJs = require("./sin.js");
var _expJs = require("./exp.js");
var _circleJs = require("./circle.js");
var _bounceJs = require("./bounce.js");
var _backJs = require("./back.js");
var _elasticJs = require("./elastic.js");

},{"./linear.js":false,"./quad.js":false,"./cubic.js":"cGjk7","./poly.js":false,"./sin.js":false,"./exp.js":false,"./circle.js":false,"./bounce.js":false,"./back.js":false,"./elastic.js":false,"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cGjk7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "cubicIn", ()=>cubicIn);
parcelHelpers.export(exports, "cubicOut", ()=>cubicOut);
parcelHelpers.export(exports, "cubicInOut", ()=>cubicInOut);
function cubicIn(t) {
    return t * t * t;
}
function cubicOut(t) {
    return --t * t * t + 1;
}
function cubicInOut(t) {
    return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"a4qOn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(node, name) {
        var schedules = node.__transition, schedule, i;
        if (schedules) {
            name = name == null ? null : name + "";
            for(i in schedules){
                if ((schedule = schedules[i]).state > (0, _scheduleJs.SCHEDULED) && schedule.name === name) return new (0, _indexJs.Transition)([
                    [
                        node
                    ]
                ], root, name, +i);
            }
        }
        return null;
    });
var _indexJs = require("./transition/index.js");
var _scheduleJs = require("./transition/schedule.js");
var root = [
    null
];

},{"./transition/index.js":"h2Srb","./transition/schedule.js":"de74c","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1yX2W":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bisect", ()=>(0, _bisectJsDefault.default));
parcelHelpers.export(exports, "bisectRight", ()=>(0, _bisectJs.bisectRight));
parcelHelpers.export(exports, "bisectLeft", ()=>(0, _bisectJs.bisectLeft));
parcelHelpers.export(exports, "bisectCenter", ()=>(0, _bisectJs.bisectCenter));
parcelHelpers.export(exports, "ascending", ()=>(0, _ascendingJsDefault.default));
parcelHelpers.export(exports, "bisector", ()=>(0, _bisectorJsDefault.default));
parcelHelpers.export(exports, "count", ()=>(0, _countJsDefault.default));
parcelHelpers.export(exports, "cross", ()=>(0, _crossJsDefault.default));
parcelHelpers.export(exports, "cumsum", ()=>(0, _cumsumJsDefault.default));
parcelHelpers.export(exports, "descending", ()=>(0, _descendingJsDefault.default));
parcelHelpers.export(exports, "deviation", ()=>(0, _deviationJsDefault.default));
parcelHelpers.export(exports, "extent", ()=>(0, _extentJsDefault.default));
parcelHelpers.export(exports, "Adder", ()=>(0, _fsumJs.Adder));
parcelHelpers.export(exports, "fsum", ()=>(0, _fsumJs.fsum));
parcelHelpers.export(exports, "fcumsum", ()=>(0, _fsumJs.fcumsum));
parcelHelpers.export(exports, "group", ()=>(0, _groupJsDefault.default));
parcelHelpers.export(exports, "groups", ()=>(0, _groupJs.groups));
parcelHelpers.export(exports, "index", ()=>(0, _groupJs.index));
parcelHelpers.export(exports, "indexes", ()=>(0, _groupJs.indexes));
parcelHelpers.export(exports, "rollup", ()=>(0, _groupJs.rollup));
parcelHelpers.export(exports, "rollups", ()=>(0, _groupJs.rollups));
parcelHelpers.export(exports, "groupSort", ()=>(0, _groupSortJsDefault.default));
parcelHelpers.export(exports, "bin", ()=>(0, _binJsDefault.default)) // Deprecated; use bin.
;
parcelHelpers.export(exports, "histogram", ()=>(0, _binJsDefault.default));
parcelHelpers.export(exports, "thresholdFreedmanDiaconis", ()=>(0, _freedmanDiaconisJsDefault.default));
parcelHelpers.export(exports, "thresholdScott", ()=>(0, _scottJsDefault.default));
parcelHelpers.export(exports, "thresholdSturges", ()=>(0, _sturgesJsDefault.default));
parcelHelpers.export(exports, "max", ()=>(0, _maxJsDefault.default));
parcelHelpers.export(exports, "maxIndex", ()=>(0, _maxIndexJsDefault.default));
parcelHelpers.export(exports, "mean", ()=>(0, _meanJsDefault.default));
parcelHelpers.export(exports, "median", ()=>(0, _medianJsDefault.default));
parcelHelpers.export(exports, "merge", ()=>(0, _mergeJsDefault.default));
parcelHelpers.export(exports, "min", ()=>(0, _minJsDefault.default));
parcelHelpers.export(exports, "minIndex", ()=>(0, _minIndexJsDefault.default));
parcelHelpers.export(exports, "nice", ()=>(0, _niceJsDefault.default));
parcelHelpers.export(exports, "pairs", ()=>(0, _pairsJsDefault.default));
parcelHelpers.export(exports, "permute", ()=>(0, _permuteJsDefault.default));
parcelHelpers.export(exports, "quantile", ()=>(0, _quantileJsDefault.default));
parcelHelpers.export(exports, "quantileSorted", ()=>(0, _quantileJs.quantileSorted));
parcelHelpers.export(exports, "quickselect", ()=>(0, _quickselectJsDefault.default));
parcelHelpers.export(exports, "range", ()=>(0, _rangeJsDefault.default));
parcelHelpers.export(exports, "least", ()=>(0, _leastJsDefault.default));
parcelHelpers.export(exports, "leastIndex", ()=>(0, _leastIndexJsDefault.default));
parcelHelpers.export(exports, "greatest", ()=>(0, _greatestJsDefault.default));
parcelHelpers.export(exports, "greatestIndex", ()=>(0, _greatestIndexJsDefault.default));
parcelHelpers.export(exports, "scan", ()=>(0, _scanJsDefault.default)) // Deprecated; use leastIndex.
;
parcelHelpers.export(exports, "shuffle", ()=>(0, _shuffleJsDefault.default));
parcelHelpers.export(exports, "shuffler", ()=>(0, _shuffleJs.shuffler));
parcelHelpers.export(exports, "sum", ()=>(0, _sumJsDefault.default));
parcelHelpers.export(exports, "ticks", ()=>(0, _ticksJsDefault.default));
parcelHelpers.export(exports, "tickIncrement", ()=>(0, _ticksJs.tickIncrement));
parcelHelpers.export(exports, "tickStep", ()=>(0, _ticksJs.tickStep));
parcelHelpers.export(exports, "transpose", ()=>(0, _transposeJsDefault.default));
parcelHelpers.export(exports, "variance", ()=>(0, _varianceJsDefault.default));
parcelHelpers.export(exports, "zip", ()=>(0, _zipJsDefault.default));
parcelHelpers.export(exports, "every", ()=>(0, _everyJsDefault.default));
parcelHelpers.export(exports, "some", ()=>(0, _someJsDefault.default));
parcelHelpers.export(exports, "filter", ()=>(0, _filterJsDefault.default));
parcelHelpers.export(exports, "map", ()=>(0, _mapJsDefault.default));
parcelHelpers.export(exports, "reduce", ()=>(0, _reduceJsDefault.default));
parcelHelpers.export(exports, "reverse", ()=>(0, _reverseJsDefault.default));
parcelHelpers.export(exports, "sort", ()=>(0, _sortJsDefault.default));
parcelHelpers.export(exports, "difference", ()=>(0, _differenceJsDefault.default));
parcelHelpers.export(exports, "disjoint", ()=>(0, _disjointJsDefault.default));
parcelHelpers.export(exports, "intersection", ()=>(0, _intersectionJsDefault.default));
parcelHelpers.export(exports, "subset", ()=>(0, _subsetJsDefault.default));
parcelHelpers.export(exports, "superset", ()=>(0, _supersetJsDefault.default));
parcelHelpers.export(exports, "union", ()=>(0, _unionJsDefault.default));
parcelHelpers.export(exports, "InternMap", ()=>(0, _internmap.InternMap));
parcelHelpers.export(exports, "InternSet", ()=>(0, _internmap.InternSet));
var _bisectJs = require("./bisect.js");
var _bisectJsDefault = parcelHelpers.interopDefault(_bisectJs);
var _ascendingJs = require("./ascending.js");
var _ascendingJsDefault = parcelHelpers.interopDefault(_ascendingJs);
var _bisectorJs = require("./bisector.js");
var _bisectorJsDefault = parcelHelpers.interopDefault(_bisectorJs);
var _countJs = require("./count.js");
var _countJsDefault = parcelHelpers.interopDefault(_countJs);
var _crossJs = require("./cross.js");
var _crossJsDefault = parcelHelpers.interopDefault(_crossJs);
var _cumsumJs = require("./cumsum.js");
var _cumsumJsDefault = parcelHelpers.interopDefault(_cumsumJs);
var _descendingJs = require("./descending.js");
var _descendingJsDefault = parcelHelpers.interopDefault(_descendingJs);
var _deviationJs = require("./deviation.js");
var _deviationJsDefault = parcelHelpers.interopDefault(_deviationJs);
var _extentJs = require("./extent.js");
var _extentJsDefault = parcelHelpers.interopDefault(_extentJs);
var _fsumJs = require("./fsum.js");
var _groupJs = require("./group.js");
var _groupJsDefault = parcelHelpers.interopDefault(_groupJs);
var _groupSortJs = require("./groupSort.js");
var _groupSortJsDefault = parcelHelpers.interopDefault(_groupSortJs);
var _binJs = require("./bin.js");
var _binJsDefault = parcelHelpers.interopDefault(_binJs);
var _freedmanDiaconisJs = require("./threshold/freedmanDiaconis.js");
var _freedmanDiaconisJsDefault = parcelHelpers.interopDefault(_freedmanDiaconisJs);
var _scottJs = require("./threshold/scott.js");
var _scottJsDefault = parcelHelpers.interopDefault(_scottJs);
var _sturgesJs = require("./threshold/sturges.js");
var _sturgesJsDefault = parcelHelpers.interopDefault(_sturgesJs);
var _maxJs = require("./max.js");
var _maxJsDefault = parcelHelpers.interopDefault(_maxJs);
var _maxIndexJs = require("./maxIndex.js");
var _maxIndexJsDefault = parcelHelpers.interopDefault(_maxIndexJs);
var _meanJs = require("./mean.js");
var _meanJsDefault = parcelHelpers.interopDefault(_meanJs);
var _medianJs = require("./median.js");
var _medianJsDefault = parcelHelpers.interopDefault(_medianJs);
var _mergeJs = require("./merge.js");
var _mergeJsDefault = parcelHelpers.interopDefault(_mergeJs);
var _minJs = require("./min.js");
var _minJsDefault = parcelHelpers.interopDefault(_minJs);
var _minIndexJs = require("./minIndex.js");
var _minIndexJsDefault = parcelHelpers.interopDefault(_minIndexJs);
var _niceJs = require("./nice.js");
var _niceJsDefault = parcelHelpers.interopDefault(_niceJs);
var _pairsJs = require("./pairs.js");
var _pairsJsDefault = parcelHelpers.interopDefault(_pairsJs);
var _permuteJs = require("./permute.js");
var _permuteJsDefault = parcelHelpers.interopDefault(_permuteJs);
var _quantileJs = require("./quantile.js");
var _quantileJsDefault = parcelHelpers.interopDefault(_quantileJs);
var _quickselectJs = require("./quickselect.js");
var _quickselectJsDefault = parcelHelpers.interopDefault(_quickselectJs);
var _rangeJs = require("./range.js");
var _rangeJsDefault = parcelHelpers.interopDefault(_rangeJs);
var _leastJs = require("./least.js");
var _leastJsDefault = parcelHelpers.interopDefault(_leastJs);
var _leastIndexJs = require("./leastIndex.js");
var _leastIndexJsDefault = parcelHelpers.interopDefault(_leastIndexJs);
var _greatestJs = require("./greatest.js");
var _greatestJsDefault = parcelHelpers.interopDefault(_greatestJs);
var _greatestIndexJs = require("./greatestIndex.js");
var _greatestIndexJsDefault = parcelHelpers.interopDefault(_greatestIndexJs);
var _scanJs = require("./scan.js");
var _scanJsDefault = parcelHelpers.interopDefault(_scanJs);
var _shuffleJs = require("./shuffle.js");
var _shuffleJsDefault = parcelHelpers.interopDefault(_shuffleJs);
var _sumJs = require("./sum.js");
var _sumJsDefault = parcelHelpers.interopDefault(_sumJs);
var _ticksJs = require("./ticks.js");
var _ticksJsDefault = parcelHelpers.interopDefault(_ticksJs);
var _transposeJs = require("./transpose.js");
var _transposeJsDefault = parcelHelpers.interopDefault(_transposeJs);
var _varianceJs = require("./variance.js");
var _varianceJsDefault = parcelHelpers.interopDefault(_varianceJs);
var _zipJs = require("./zip.js");
var _zipJsDefault = parcelHelpers.interopDefault(_zipJs);
var _everyJs = require("./every.js");
var _everyJsDefault = parcelHelpers.interopDefault(_everyJs);
var _someJs = require("./some.js");
var _someJsDefault = parcelHelpers.interopDefault(_someJs);
var _filterJs = require("./filter.js");
var _filterJsDefault = parcelHelpers.interopDefault(_filterJs);
var _mapJs = require("./map.js");
var _mapJsDefault = parcelHelpers.interopDefault(_mapJs);
var _reduceJs = require("./reduce.js");
var _reduceJsDefault = parcelHelpers.interopDefault(_reduceJs);
var _reverseJs = require("./reverse.js");
var _reverseJsDefault = parcelHelpers.interopDefault(_reverseJs);
var _sortJs = require("./sort.js");
var _sortJsDefault = parcelHelpers.interopDefault(_sortJs);
var _differenceJs = require("./difference.js");
var _differenceJsDefault = parcelHelpers.interopDefault(_differenceJs);
var _disjointJs = require("./disjoint.js");
var _disjointJsDefault = parcelHelpers.interopDefault(_disjointJs);
var _intersectionJs = require("./intersection.js");
var _intersectionJsDefault = parcelHelpers.interopDefault(_intersectionJs);
var _subsetJs = require("./subset.js");
var _subsetJsDefault = parcelHelpers.interopDefault(_subsetJs);
var _supersetJs = require("./superset.js");
var _supersetJsDefault = parcelHelpers.interopDefault(_supersetJs);
var _unionJs = require("./union.js");
var _unionJsDefault = parcelHelpers.interopDefault(_unionJs);
var _internmap = require("internmap");

},{"./bisect.js":"2jqf4","./ascending.js":"2iZSL","./bisector.js":"1BY0F","./count.js":"fdcqm","./cross.js":"7sblS","./cumsum.js":"2kpSh","./descending.js":"dpgkj","./deviation.js":"2qowT","./extent.js":"bpNTV","./fsum.js":"7NEFi","./group.js":"dY8VH","./groupSort.js":"7Ogmv","./bin.js":"18IDv","./threshold/freedmanDiaconis.js":"YzWbd","./threshold/scott.js":"84IpX","./threshold/sturges.js":"aAePr","./max.js":"6b1uv","./maxIndex.js":"1pqy7","./mean.js":"diWJS","./median.js":"3NuqZ","./merge.js":"hviMC","./min.js":"1KKa7","./minIndex.js":"g6uuQ","./nice.js":"hx3lC","./pairs.js":"krmK9","./permute.js":"72FE4","./quantile.js":"etiLw","./quickselect.js":"4sTUl","./range.js":"kH8Ba","./least.js":"69Q1F","./leastIndex.js":"9vype","./greatest.js":"4LoCm","./greatestIndex.js":"lg7Xr","./scan.js":"cKBNL","./shuffle.js":"iaAC9","./sum.js":"47K1s","./ticks.js":"iDfKX","./transpose.js":"jO6XX","./variance.js":"go0M5","./zip.js":"8wbOt","./every.js":"87TIV","./some.js":"1GQIB","./filter.js":"lrcfK","./map.js":"x1FBS","./reduce.js":"3Dobh","./reverse.js":"hee4j","./sort.js":"ApqXa","./difference.js":"l43vv","./disjoint.js":"jrbsK","./intersection.js":"cBy6r","./subset.js":"32tt1","./superset.js":"l8AhK","./union.js":"80KgN","internmap":"a6b0X","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2jqf4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bisectRight", ()=>bisectRight);
parcelHelpers.export(exports, "bisectLeft", ()=>bisectLeft);
parcelHelpers.export(exports, "bisectCenter", ()=>bisectCenter);
var _ascendingJs = require("./ascending.js");
var _ascendingJsDefault = parcelHelpers.interopDefault(_ascendingJs);
var _bisectorJs = require("./bisector.js");
var _bisectorJsDefault = parcelHelpers.interopDefault(_bisectorJs);
var _numberJs = require("./number.js");
var _numberJsDefault = parcelHelpers.interopDefault(_numberJs);
const ascendingBisect = (0, _bisectorJsDefault.default)((0, _ascendingJsDefault.default));
const bisectRight = ascendingBisect.right;
const bisectLeft = ascendingBisect.left;
const bisectCenter = (0, _bisectorJsDefault.default)((0, _numberJsDefault.default)).center;
exports.default = bisectRight;

},{"./ascending.js":"2iZSL","./bisector.js":"1BY0F","./number.js":"imr9T","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2iZSL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(a, b) {
        return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1BY0F":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(f) {
        let delta = f;
        let compare = f;
        if (f.length === 1) {
            delta = (d, x)=>f(d) - x;
            compare = ascendingComparator(f);
        }
        function left(a, x, lo, hi) {
            if (lo == null) lo = 0;
            if (hi == null) hi = a.length;
            while(lo < hi){
                const mid = lo + hi >>> 1;
                if (compare(a[mid], x) < 0) lo = mid + 1;
                else hi = mid;
            }
            return lo;
        }
        function right(a, x, lo, hi) {
            if (lo == null) lo = 0;
            if (hi == null) hi = a.length;
            while(lo < hi){
                const mid = lo + hi >>> 1;
                if (compare(a[mid], x) > 0) hi = mid;
                else lo = mid + 1;
            }
            return lo;
        }
        function center(a, x, lo, hi) {
            if (lo == null) lo = 0;
            if (hi == null) hi = a.length;
            const i = left(a, x, lo, hi - 1);
            return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
        }
        return {
            left,
            center,
            right
        };
    });
var _ascendingJs = require("./ascending.js");
var _ascendingJsDefault = parcelHelpers.interopDefault(_ascendingJs);
function ascendingComparator(f) {
    return (d, x)=>(0, _ascendingJsDefault.default)(f(d), x);
}

},{"./ascending.js":"2iZSL","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"imr9T":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(x) {
        return x === null ? NaN : +x;
    });
parcelHelpers.export(exports, "numbers", ()=>numbers);
function* numbers(values, valueof) {
    if (valueof === undefined) {
        for (let value of values)if (value != null && (value = +value) >= value) yield value;
    } else {
        let index = -1;
        for (let value of values)if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) yield value;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fdcqm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>count);
function count(values, valueof) {
    let count = 0;
    if (valueof === undefined) {
        for (let value of values)if (value != null && (value = +value) >= value) ++count;
    } else {
        let index = -1;
        for (let value of values)if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) ++count;
    }
    return count;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7sblS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>cross);
function length(array) {
    return array.length | 0;
}
function empty(length) {
    return !(length > 0);
}
function arrayify(values) {
    return typeof values !== "object" || "length" in values ? values : Array.from(values);
}
function reducer(reduce) {
    return (values)=>reduce(...values);
}
function cross(...values) {
    const reduce = typeof values[values.length - 1] === "function" && reducer(values.pop());
    values = values.map(arrayify);
    const lengths = values.map(length);
    const j = values.length - 1;
    const index = new Array(j + 1).fill(0);
    const product = [];
    if (j < 0 || lengths.some(empty)) return product;
    while(true){
        product.push(index.map((j, i)=>values[i][j]));
        let i = j;
        while(++index[i] === lengths[i]){
            if (i === 0) return reduce ? product.map(reduce) : product;
            index[i--] = 0;
        }
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2kpSh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>cumsum);
function cumsum(values, valueof) {
    var sum = 0, index = 0;
    return Float64Array.from(values, valueof === undefined ? (v)=>sum += +v || 0 : (v)=>sum += +valueof(v, index++, values) || 0);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dpgkj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(a, b) {
        return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2qowT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>deviation);
var _varianceJs = require("./variance.js");
var _varianceJsDefault = parcelHelpers.interopDefault(_varianceJs);
function deviation(values, valueof) {
    const v = (0, _varianceJsDefault.default)(values, valueof);
    return v ? Math.sqrt(v) : v;
}

},{"./variance.js":"go0M5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"go0M5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>variance);
function variance(values, valueof) {
    let count = 0;
    let delta;
    let mean = 0;
    let sum = 0;
    if (valueof === undefined) {
        for (let value of values)if (value != null && (value = +value) >= value) {
            delta = value - mean;
            mean += delta / ++count;
            sum += delta * (value - mean);
        }
    } else {
        let index = -1;
        for (let value of values)if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
            delta = value - mean;
            mean += delta / ++count;
            sum += delta * (value - mean);
        }
    }
    if (count > 1) return sum / (count - 1);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bpNTV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(values, valueof) {
        let min;
        let max;
        if (valueof === undefined) {
            for (const value of values)if (value != null) {
                if (min === undefined) {
                    if (value >= value) min = max = value;
                } else {
                    if (min > value) min = value;
                    if (max < value) max = value;
                }
            }
        } else {
            let index = -1;
            for (let value of values)if ((value = valueof(value, ++index, values)) != null) {
                if (min === undefined) {
                    if (value >= value) min = max = value;
                } else {
                    if (min > value) min = value;
                    if (max < value) max = value;
                }
            }
        }
        return [
            min,
            max
        ];
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7NEFi":[function(require,module,exports) {
// https://github.com/python/cpython/blob/a74eea238f5baba15797e2e8b570d153bc8690a7/Modules/mathmodule.c#L1423
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Adder", ()=>Adder);
parcelHelpers.export(exports, "fsum", ()=>fsum);
parcelHelpers.export(exports, "fcumsum", ()=>fcumsum);
class Adder {
    constructor(){
        this._partials = new Float64Array(32);
        this._n = 0;
    }
    add(x) {
        const p = this._partials;
        let i = 0;
        for(let j = 0; j < this._n && j < 32; j++){
            const y = p[j], hi = x + y, lo = Math.abs(x) < Math.abs(y) ? x - (hi - y) : y - (hi - x);
            if (lo) p[i++] = lo;
            x = hi;
        }
        p[i] = x;
        this._n = i + 1;
        return this;
    }
    valueOf() {
        const p = this._partials;
        let n = this._n, x, y, lo, hi = 0;
        if (n > 0) {
            hi = p[--n];
            while(n > 0){
                x = hi;
                y = p[--n];
                hi = x + y;
                lo = y - (hi - x);
                if (lo) break;
            }
            if (n > 0 && (lo < 0 && p[n - 1] < 0 || lo > 0 && p[n - 1] > 0)) {
                y = lo * 2;
                x = hi + y;
                if (y == x - hi) hi = x;
            }
        }
        return hi;
    }
}
function fsum(values, valueof) {
    const adder = new Adder();
    if (valueof === undefined) {
        for (let value of values)if (value = +value) adder.add(value);
    } else {
        let index = -1;
        for (let value of values)if (value = +valueof(value, ++index, values)) adder.add(value);
    }
    return +adder;
}
function fcumsum(values, valueof) {
    const adder = new Adder();
    let index = -1;
    return Float64Array.from(values, valueof === undefined ? (v)=>adder.add(+v || 0) : (v)=>adder.add(+valueof(v, ++index, values) || 0));
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dY8VH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>group);
parcelHelpers.export(exports, "groups", ()=>groups);
parcelHelpers.export(exports, "rollup", ()=>rollup);
parcelHelpers.export(exports, "rollups", ()=>rollups);
parcelHelpers.export(exports, "index", ()=>index);
parcelHelpers.export(exports, "indexes", ()=>indexes);
var _internmap = require("internmap");
var _identityJs = require("./identity.js");
var _identityJsDefault = parcelHelpers.interopDefault(_identityJs);
function group(values, ...keys) {
    return nest(values, (0, _identityJsDefault.default), (0, _identityJsDefault.default), keys);
}
function groups(values, ...keys) {
    return nest(values, Array.from, (0, _identityJsDefault.default), keys);
}
function rollup(values, reduce, ...keys) {
    return nest(values, (0, _identityJsDefault.default), reduce, keys);
}
function rollups(values, reduce, ...keys) {
    return nest(values, Array.from, reduce, keys);
}
function index(values, ...keys) {
    return nest(values, (0, _identityJsDefault.default), unique, keys);
}
function indexes(values, ...keys) {
    return nest(values, Array.from, unique, keys);
}
function unique(values) {
    if (values.length !== 1) throw new Error("duplicate key");
    return values[0];
}
function nest(values, map, reduce, keys) {
    return function regroup(values, i) {
        if (i >= keys.length) return reduce(values);
        const groups = new (0, _internmap.InternMap)();
        const keyof = keys[i++];
        let index = -1;
        for (const value of values){
            const key = keyof(value, ++index, values);
            const group = groups.get(key);
            if (group) group.push(value);
            else groups.set(key, [
                value
            ]);
        }
        for (const [key, values] of groups)groups.set(key, regroup(values, i));
        return map(groups);
    }(values, 0);
}

},{"internmap":"a6b0X","./identity.js":"gZYoG","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"a6b0X":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "InternMap", ()=>InternMap);
parcelHelpers.export(exports, "InternSet", ()=>InternSet);
class InternMap extends Map {
    constructor(entries, key = keyof){
        super();
        Object.defineProperties(this, {
            _intern: {
                value: new Map()
            },
            _key: {
                value: key
            }
        });
        if (entries != null) for (const [key, value] of entries)this.set(key, value);
    }
    get(key) {
        return super.get(intern_get(this, key));
    }
    has(key) {
        return super.has(intern_get(this, key));
    }
    set(key, value) {
        return super.set(intern_set(this, key), value);
    }
    delete(key) {
        return super.delete(intern_delete(this, key));
    }
}
class InternSet extends Set {
    constructor(values, key = keyof){
        super();
        Object.defineProperties(this, {
            _intern: {
                value: new Map()
            },
            _key: {
                value: key
            }
        });
        if (values != null) for (const value of values)this.add(value);
    }
    has(value) {
        return super.has(intern_get(this, value));
    }
    add(value) {
        return super.add(intern_set(this, value));
    }
    delete(value) {
        return super.delete(intern_delete(this, value));
    }
}
function intern_get({ _intern, _key }, value) {
    const key = _key(value);
    return _intern.has(key) ? _intern.get(key) : value;
}
function intern_set({ _intern, _key }, value) {
    const key = _key(value);
    if (_intern.has(key)) return _intern.get(key);
    _intern.set(key, value);
    return value;
}
function intern_delete({ _intern, _key }, value) {
    const key = _key(value);
    if (_intern.has(key)) {
        value = _intern.get(value);
        _intern.delete(key);
    }
    return value;
}
function keyof(value) {
    return value !== null && typeof value === "object" ? value.valueOf() : value;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gZYoG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(x) {
        return x;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7Ogmv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>groupSort);
var _ascendingJs = require("./ascending.js");
var _ascendingJsDefault = parcelHelpers.interopDefault(_ascendingJs);
var _groupJs = require("./group.js");
var _groupJsDefault = parcelHelpers.interopDefault(_groupJs);
var _sortJs = require("./sort.js");
var _sortJsDefault = parcelHelpers.interopDefault(_sortJs);
function groupSort(values, reduce, key) {
    return (reduce.length === 1 ? (0, _sortJsDefault.default)((0, _groupJs.rollup)(values, reduce, key), ([ak, av], [bk, bv])=>(0, _ascendingJsDefault.default)(av, bv) || (0, _ascendingJsDefault.default)(ak, bk)) : (0, _sortJsDefault.default)((0, _groupJsDefault.default)(values, key), ([ak, av], [bk, bv])=>reduce(av, bv) || (0, _ascendingJsDefault.default)(ak, bk))).map(([key])=>key);
}

},{"./ascending.js":"2iZSL","./group.js":"dY8VH","./sort.js":"ApqXa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ApqXa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>sort);
var _ascendingJs = require("./ascending.js");
var _ascendingJsDefault = parcelHelpers.interopDefault(_ascendingJs);
var _permuteJs = require("./permute.js");
var _permuteJsDefault = parcelHelpers.interopDefault(_permuteJs);
function sort(values, ...F) {
    if (typeof values[Symbol.iterator] !== "function") throw new TypeError("values is not iterable");
    values = Array.from(values);
    let [f = (0, _ascendingJsDefault.default)] = F;
    if (f.length === 1 || F.length > 1) {
        const index = Uint32Array.from(values, (d, i)=>i);
        if (F.length > 1) {
            F = F.map((f)=>values.map(f));
            index.sort((i, j)=>{
                for (const f of F){
                    const c = (0, _ascendingJsDefault.default)(f[i], f[j]);
                    if (c) return c;
                }
            });
        } else {
            f = values.map(f);
            index.sort((i, j)=>(0, _ascendingJsDefault.default)(f[i], f[j]));
        }
        return (0, _permuteJsDefault.default)(values, index);
    }
    return values.sort(f);
}

},{"./ascending.js":"2iZSL","./permute.js":"72FE4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"72FE4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(source, keys) {
        return Array.from(keys, (key)=>source[key]);
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"18IDv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        var value = (0, _identityJsDefault.default), domain = (0, _extentJsDefault.default), threshold = (0, _sturgesJsDefault.default);
        function histogram(data) {
            if (!Array.isArray(data)) data = Array.from(data);
            var i, n = data.length, x, values = new Array(n);
            for(i = 0; i < n; ++i)values[i] = value(data[i], i, data);
            var xz = domain(values), x0 = xz[0], x1 = xz[1], tz = threshold(values, x0, x1);
            // Convert number of thresholds into uniform thresholds, and nice the
            // default domain accordingly.
            if (!Array.isArray(tz)) {
                const max = x1, tn = +tz;
                if (domain === (0, _extentJsDefault.default)) [x0, x1] = (0, _niceJsDefault.default)(x0, x1, tn);
                tz = (0, _ticksJsDefault.default)(x0, x1, tn);
                // If the last threshold is coincident with the domain’s upper bound, the
                // last bin will be zero-width. If the default domain is used, and this
                // last threshold is coincident with the maximum input value, we can
                // extend the niced upper bound by one tick to ensure uniform bin widths;
                // otherwise, we simply remove the last threshold. Note that we don’t
                // coerce values or the domain to numbers, and thus must be careful to
                // compare order (>=) rather than strict equality (===)!
                if (tz[tz.length - 1] >= x1) {
                    if (max >= x1 && domain === (0, _extentJsDefault.default)) {
                        const step = (0, _ticksJs.tickIncrement)(x0, x1, tn);
                        if (isFinite(step)) {
                            if (step > 0) x1 = (Math.floor(x1 / step) + 1) * step;
                            else if (step < 0) x1 = (Math.ceil(x1 * -step) + 1) / -step;
                        }
                    } else tz.pop();
                }
            }
            // Remove any thresholds outside the domain.
            var m = tz.length;
            while(tz[0] <= x0)tz.shift(), --m;
            while(tz[m - 1] > x1)tz.pop(), --m;
            var bins = new Array(m + 1), bin;
            // Initialize bins.
            for(i = 0; i <= m; ++i){
                bin = bins[i] = [];
                bin.x0 = i > 0 ? tz[i - 1] : x0;
                bin.x1 = i < m ? tz[i] : x1;
            }
            // Assign data to bins by value, ignoring any outside the domain.
            for(i = 0; i < n; ++i){
                x = values[i];
                if (x0 <= x && x <= x1) bins[(0, _bisectJsDefault.default)(tz, x, 0, m)].push(data[i]);
            }
            return bins;
        }
        histogram.value = function(_) {
            return arguments.length ? (value = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(_), histogram) : value;
        };
        histogram.domain = function(_) {
            return arguments.length ? (domain = typeof _ === "function" ? _ : (0, _constantJsDefault.default)([
                _[0],
                _[1]
            ]), histogram) : domain;
        };
        histogram.thresholds = function(_) {
            return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? (0, _constantJsDefault.default)((0, _arrayJs.slice).call(_)) : (0, _constantJsDefault.default)(_), histogram) : threshold;
        };
        return histogram;
    });
var _arrayJs = require("./array.js");
var _bisectJs = require("./bisect.js");
var _bisectJsDefault = parcelHelpers.interopDefault(_bisectJs);
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _extentJs = require("./extent.js");
var _extentJsDefault = parcelHelpers.interopDefault(_extentJs);
var _identityJs = require("./identity.js");
var _identityJsDefault = parcelHelpers.interopDefault(_identityJs);
var _niceJs = require("./nice.js");
var _niceJsDefault = parcelHelpers.interopDefault(_niceJs);
var _ticksJs = require("./ticks.js");
var _ticksJsDefault = parcelHelpers.interopDefault(_ticksJs);
var _sturgesJs = require("./threshold/sturges.js");
var _sturgesJsDefault = parcelHelpers.interopDefault(_sturgesJs);

},{"./array.js":"9A0pE","./bisect.js":"2jqf4","./constant.js":"1EOU8","./extent.js":"bpNTV","./identity.js":"gZYoG","./nice.js":"hx3lC","./ticks.js":"iDfKX","./threshold/sturges.js":"aAePr","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9A0pE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "slice", ()=>slice);
parcelHelpers.export(exports, "map", ()=>map);
var array = Array.prototype;
var slice = array.slice;
var map = array.map;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1EOU8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(x) {
        return function() {
            return x;
        };
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hx3lC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>nice);
var _ticksJs = require("./ticks.js");
function nice(start, stop, count) {
    let prestep;
    while(true){
        const step = (0, _ticksJs.tickIncrement)(start, stop, count);
        if (step === prestep || step === 0 || !isFinite(step)) return [
            start,
            stop
        ];
        else if (step > 0) {
            start = Math.floor(start / step) * step;
            stop = Math.ceil(stop / step) * step;
        } else if (step < 0) {
            start = Math.ceil(start * step) / step;
            stop = Math.floor(stop * step) / step;
        }
        prestep = step;
    }
}

},{"./ticks.js":"iDfKX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iDfKX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(start, stop, count) {
        var reverse, i = -1, n, ticks, step;
        stop = +stop, start = +start, count = +count;
        if (start === stop && count > 0) return [
            start
        ];
        if (reverse = stop < start) n = start, start = stop, stop = n;
        if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];
        if (step > 0) {
            let r0 = Math.round(start / step), r1 = Math.round(stop / step);
            if (r0 * step < start) ++r0;
            if (r1 * step > stop) --r1;
            ticks = new Array(n = r1 - r0 + 1);
            while(++i < n)ticks[i] = (r0 + i) * step;
        } else {
            step = -step;
            let r0 = Math.round(start * step), r1 = Math.round(stop * step);
            if (r0 / step < start) ++r0;
            if (r1 / step > stop) --r1;
            ticks = new Array(n = r1 - r0 + 1);
            while(++i < n)ticks[i] = (r0 + i) / step;
        }
        if (reverse) ticks.reverse();
        return ticks;
    });
parcelHelpers.export(exports, "tickIncrement", ()=>tickIncrement);
parcelHelpers.export(exports, "tickStep", ()=>tickStep);
var e10 = Math.sqrt(50), e5 = Math.sqrt(10), e2 = Math.sqrt(2);
function tickIncrement(start, stop, count) {
    var step = (stop - start) / Math.max(0, count), power = Math.floor(Math.log(step) / Math.LN10), error = step / Math.pow(10, power);
    return power >= 0 ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power) : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}
function tickStep(start, stop, count) {
    var step0 = Math.abs(stop - start) / Math.max(0, count), step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)), error = step0 / step1;
    if (error >= e10) step1 *= 10;
    else if (error >= e5) step1 *= 5;
    else if (error >= e2) step1 *= 2;
    return stop < start ? -step1 : step1;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aAePr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(values) {
        return Math.ceil(Math.log((0, _countJsDefault.default)(values)) / Math.LN2) + 1;
    });
var _countJs = require("../count.js");
var _countJsDefault = parcelHelpers.interopDefault(_countJs);

},{"../count.js":"fdcqm","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"YzWbd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(values, min, max) {
        return Math.ceil((max - min) / (2 * ((0, _quantileJsDefault.default)(values, 0.75) - (0, _quantileJsDefault.default)(values, 0.25)) * Math.pow((0, _countJsDefault.default)(values), -1 / 3)));
    });
var _countJs = require("../count.js");
var _countJsDefault = parcelHelpers.interopDefault(_countJs);
var _quantileJs = require("../quantile.js");
var _quantileJsDefault = parcelHelpers.interopDefault(_quantileJs);

},{"../count.js":"fdcqm","../quantile.js":"etiLw","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"etiLw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>quantile);
parcelHelpers.export(exports, "quantileSorted", ()=>quantileSorted);
var _maxJs = require("./max.js");
var _maxJsDefault = parcelHelpers.interopDefault(_maxJs);
var _minJs = require("./min.js");
var _minJsDefault = parcelHelpers.interopDefault(_minJs);
var _quickselectJs = require("./quickselect.js");
var _quickselectJsDefault = parcelHelpers.interopDefault(_quickselectJs);
var _numberJs = require("./number.js");
var _numberJsDefault = parcelHelpers.interopDefault(_numberJs);
function quantile(values, p, valueof) {
    values = Float64Array.from((0, _numberJs.numbers)(values, valueof));
    if (!(n = values.length)) return;
    if ((p = +p) <= 0 || n < 2) return (0, _minJsDefault.default)(values);
    if (p >= 1) return (0, _maxJsDefault.default)(values);
    var n, i = (n - 1) * p, i0 = Math.floor(i), value0 = (0, _maxJsDefault.default)((0, _quickselectJsDefault.default)(values, i0).subarray(0, i0 + 1)), value1 = (0, _minJsDefault.default)(values.subarray(i0 + 1));
    return value0 + (value1 - value0) * (i - i0);
}
function quantileSorted(values, p, valueof = (0, _numberJsDefault.default)) {
    if (!(n = values.length)) return;
    if ((p = +p) <= 0 || n < 2) return +valueof(values[0], 0, values);
    if (p >= 1) return +valueof(values[n - 1], n - 1, values);
    var n, i = (n - 1) * p, i0 = Math.floor(i), value0 = +valueof(values[i0], i0, values), value1 = +valueof(values[i0 + 1], i0 + 1, values);
    return value0 + (value1 - value0) * (i - i0);
}

},{"./max.js":"6b1uv","./min.js":"1KKa7","./quickselect.js":"4sTUl","./number.js":"imr9T","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6b1uv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>max);
function max(values, valueof) {
    let max;
    if (valueof === undefined) {
        for (const value of values)if (value != null && (max < value || max === undefined && value >= value)) max = value;
    } else {
        let index = -1;
        for (let value of values)if ((value = valueof(value, ++index, values)) != null && (max < value || max === undefined && value >= value)) max = value;
    }
    return max;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1KKa7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>min);
function min(values, valueof) {
    let min;
    if (valueof === undefined) {
        for (const value of values)if (value != null && (min > value || min === undefined && value >= value)) min = value;
    } else {
        let index = -1;
        for (let value of values)if ((value = valueof(value, ++index, values)) != null && (min > value || min === undefined && value >= value)) min = value;
    }
    return min;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4sTUl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>quickselect);
var _ascendingJs = require("./ascending.js");
var _ascendingJsDefault = parcelHelpers.interopDefault(_ascendingJs);
function quickselect(array, k, left = 0, right = array.length - 1, compare = (0, _ascendingJsDefault.default)) {
    while(right > left){
        if (right - left > 600) {
            const n = right - left + 1;
            const m = k - left + 1;
            const z = Math.log(n);
            const s = 0.5 * Math.exp(2 * z / 3);
            const sd = 0.5 * Math.sqrt(z * s * (n - s) / n) * (m - n / 2 < 0 ? -1 : 1);
            const newLeft = Math.max(left, Math.floor(k - m * s / n + sd));
            const newRight = Math.min(right, Math.floor(k + (n - m) * s / n + sd));
            quickselect(array, k, newLeft, newRight, compare);
        }
        const t = array[k];
        let i = left;
        let j = right;
        swap(array, left, k);
        if (compare(array[right], t) > 0) swap(array, left, right);
        while(i < j){
            swap(array, i, j), ++i, --j;
            while(compare(array[i], t) < 0)++i;
            while(compare(array[j], t) > 0)--j;
        }
        if (compare(array[left], t) === 0) swap(array, left, j);
        else ++j, swap(array, j, right);
        if (j <= k) left = j + 1;
        if (k <= j) right = j - 1;
    }
    return array;
}
function swap(array, i, j) {
    const t = array[i];
    array[i] = array[j];
    array[j] = t;
}

},{"./ascending.js":"2iZSL","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"84IpX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(values, min, max) {
        return Math.ceil((max - min) / (3.5 * (0, _deviationJsDefault.default)(values) * Math.pow((0, _countJsDefault.default)(values), -1 / 3)));
    });
var _countJs = require("../count.js");
var _countJsDefault = parcelHelpers.interopDefault(_countJs);
var _deviationJs = require("../deviation.js");
var _deviationJsDefault = parcelHelpers.interopDefault(_deviationJs);

},{"../count.js":"fdcqm","../deviation.js":"2qowT","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1pqy7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>maxIndex);
function maxIndex(values, valueof) {
    let max;
    let maxIndex = -1;
    let index = -1;
    if (valueof === undefined) for (const value of values){
        ++index;
        if (value != null && (max < value || max === undefined && value >= value)) max = value, maxIndex = index;
    }
    else {
        for (let value of values)if ((value = valueof(value, ++index, values)) != null && (max < value || max === undefined && value >= value)) max = value, maxIndex = index;
    }
    return maxIndex;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"diWJS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>mean);
function mean(values, valueof) {
    let count = 0;
    let sum = 0;
    if (valueof === undefined) {
        for (let value of values)if (value != null && (value = +value) >= value) ++count, sum += value;
    } else {
        let index = -1;
        for (let value of values)if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) ++count, sum += value;
    }
    if (count) return sum / count;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3NuqZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(values, valueof) {
        return (0, _quantileJsDefault.default)(values, 0.5, valueof);
    });
var _quantileJs = require("./quantile.js");
var _quantileJsDefault = parcelHelpers.interopDefault(_quantileJs);

},{"./quantile.js":"etiLw","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hviMC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>merge);
function* flatten(arrays) {
    for (const array of arrays)yield* array;
}
function merge(arrays) {
    return Array.from(flatten(arrays));
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"g6uuQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>minIndex);
function minIndex(values, valueof) {
    let min;
    let minIndex = -1;
    let index = -1;
    if (valueof === undefined) for (const value of values){
        ++index;
        if (value != null && (min > value || min === undefined && value >= value)) min = value, minIndex = index;
    }
    else {
        for (let value of values)if ((value = valueof(value, ++index, values)) != null && (min > value || min === undefined && value >= value)) min = value, minIndex = index;
    }
    return minIndex;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"krmK9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>pairs);
parcelHelpers.export(exports, "pair", ()=>pair);
function pairs(values, pairof = pair) {
    const pairs = [];
    let previous;
    let first = false;
    for (const value of values){
        if (first) pairs.push(pairof(previous, value));
        previous = value;
        first = true;
    }
    return pairs;
}
function pair(a, b) {
    return [
        a,
        b
    ];
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kH8Ba":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(start, stop, step) {
        start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
        var i = -1, n = Math.max(0, Math.ceil((stop - start) / step)) | 0, range = new Array(n);
        while(++i < n)range[i] = start + i * step;
        return range;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"69Q1F":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>least);
var _ascendingJs = require("./ascending.js");
var _ascendingJsDefault = parcelHelpers.interopDefault(_ascendingJs);
function least(values, compare = (0, _ascendingJsDefault.default)) {
    let min;
    let defined = false;
    if (compare.length === 1) {
        let minValue;
        for (const element of values){
            const value = compare(element);
            if (defined ? (0, _ascendingJsDefault.default)(value, minValue) < 0 : (0, _ascendingJsDefault.default)(value, value) === 0) {
                min = element;
                minValue = value;
                defined = true;
            }
        }
    } else {
        for (const value of values)if (defined ? compare(value, min) < 0 : compare(value, value) === 0) {
            min = value;
            defined = true;
        }
    }
    return min;
}

},{"./ascending.js":"2iZSL","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9vype":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>leastIndex);
var _ascendingJs = require("./ascending.js");
var _ascendingJsDefault = parcelHelpers.interopDefault(_ascendingJs);
var _minIndexJs = require("./minIndex.js");
var _minIndexJsDefault = parcelHelpers.interopDefault(_minIndexJs);
function leastIndex(values, compare = (0, _ascendingJsDefault.default)) {
    if (compare.length === 1) return (0, _minIndexJsDefault.default)(values, compare);
    let minValue;
    let min = -1;
    let index = -1;
    for (const value of values){
        ++index;
        if (min < 0 ? compare(value, value) === 0 : compare(value, minValue) < 0) {
            minValue = value;
            min = index;
        }
    }
    return min;
}

},{"./ascending.js":"2iZSL","./minIndex.js":"g6uuQ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4LoCm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>greatest);
var _ascendingJs = require("./ascending.js");
var _ascendingJsDefault = parcelHelpers.interopDefault(_ascendingJs);
function greatest(values, compare = (0, _ascendingJsDefault.default)) {
    let max;
    let defined = false;
    if (compare.length === 1) {
        let maxValue;
        for (const element of values){
            const value = compare(element);
            if (defined ? (0, _ascendingJsDefault.default)(value, maxValue) > 0 : (0, _ascendingJsDefault.default)(value, value) === 0) {
                max = element;
                maxValue = value;
                defined = true;
            }
        }
    } else {
        for (const value of values)if (defined ? compare(value, max) > 0 : compare(value, value) === 0) {
            max = value;
            defined = true;
        }
    }
    return max;
}

},{"./ascending.js":"2iZSL","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lg7Xr":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>greatestIndex);
var _ascendingJs = require("./ascending.js");
var _ascendingJsDefault = parcelHelpers.interopDefault(_ascendingJs);
var _maxIndexJs = require("./maxIndex.js");
var _maxIndexJsDefault = parcelHelpers.interopDefault(_maxIndexJs);
function greatestIndex(values, compare = (0, _ascendingJsDefault.default)) {
    if (compare.length === 1) return (0, _maxIndexJsDefault.default)(values, compare);
    let maxValue;
    let max = -1;
    let index = -1;
    for (const value of values){
        ++index;
        if (max < 0 ? compare(value, value) === 0 : compare(value, maxValue) > 0) {
            maxValue = value;
            max = index;
        }
    }
    return max;
}

},{"./ascending.js":"2iZSL","./maxIndex.js":"1pqy7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cKBNL":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>scan);
var _leastIndexJs = require("./leastIndex.js");
var _leastIndexJsDefault = parcelHelpers.interopDefault(_leastIndexJs);
function scan(values, compare) {
    const index = (0, _leastIndexJsDefault.default)(values, compare);
    return index < 0 ? undefined : index;
}

},{"./leastIndex.js":"9vype","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iaAC9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "shuffler", ()=>shuffler);
exports.default = shuffler(Math.random);
function shuffler(random) {
    return function shuffle(array, i0 = 0, i1 = array.length) {
        let m = i1 - (i0 = +i0);
        while(m){
            const i = random() * m-- | 0, t = array[m + i0];
            array[m + i0] = array[i + i0];
            array[i + i0] = t;
        }
        return array;
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"47K1s":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>sum);
function sum(values, valueof) {
    let sum = 0;
    if (valueof === undefined) {
        for (let value of values)if (value = +value) sum += value;
    } else {
        let index = -1;
        for (let value of values)if (value = +valueof(value, ++index, values)) sum += value;
    }
    return sum;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jO6XX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(matrix) {
        if (!(n = matrix.length)) return [];
        for(var i = -1, m = (0, _minJsDefault.default)(matrix, length), transpose = new Array(m); ++i < m;)for(var j = -1, n, row = transpose[i] = new Array(n); ++j < n;)row[j] = matrix[j][i];
        return transpose;
    });
var _minJs = require("./min.js");
var _minJsDefault = parcelHelpers.interopDefault(_minJs);
function length(d) {
    return d.length;
}

},{"./min.js":"1KKa7","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8wbOt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        return (0, _transposeJsDefault.default)(arguments);
    });
var _transposeJs = require("./transpose.js");
var _transposeJsDefault = parcelHelpers.interopDefault(_transposeJs);

},{"./transpose.js":"jO6XX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"87TIV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>every);
function every(values, test) {
    if (typeof test !== "function") throw new TypeError("test is not a function");
    let index = -1;
    for (const value of values){
        if (!test(value, ++index, values)) return false;
    }
    return true;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1GQIB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>some);
function some(values, test) {
    if (typeof test !== "function") throw new TypeError("test is not a function");
    let index = -1;
    for (const value of values){
        if (test(value, ++index, values)) return true;
    }
    return false;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lrcfK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>filter);
function filter(values, test) {
    if (typeof test !== "function") throw new TypeError("test is not a function");
    const array = [];
    let index = -1;
    for (const value of values)if (test(value, ++index, values)) array.push(value);
    return array;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"x1FBS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>map);
function map(values, mapper) {
    if (typeof values[Symbol.iterator] !== "function") throw new TypeError("values is not iterable");
    if (typeof mapper !== "function") throw new TypeError("mapper is not a function");
    return Array.from(values, (value, index)=>mapper(value, index, values));
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3Dobh":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>reduce);
function reduce(values, reducer, value) {
    if (typeof reducer !== "function") throw new TypeError("reducer is not a function");
    const iterator = values[Symbol.iterator]();
    let done, next, index = -1;
    if (arguments.length < 3) {
        ({ done, value } = iterator.next());
        if (done) return;
        ++index;
    }
    while({ done, value: next } = iterator.next(), !done)value = reducer(value, next, ++index, values);
    return value;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hee4j":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>reverse);
function reverse(values) {
    if (typeof values[Symbol.iterator] !== "function") throw new TypeError("values is not iterable");
    return Array.from(values).reverse();
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"l43vv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>difference);
function difference(values, ...others) {
    values = new Set(values);
    for (const other of others)for (const value of other)values.delete(value);
    return values;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jrbsK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>disjoint);
function disjoint(values, other) {
    const iterator = other[Symbol.iterator](), set = new Set();
    for (const v of values){
        if (set.has(v)) return false;
        let value, done;
        while({ value, done } = iterator.next()){
            if (done) break;
            if (Object.is(v, value)) return false;
            set.add(value);
        }
    }
    return true;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cBy6r":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>intersection);
var _setJs = require("./set.js");
var _setJsDefault = parcelHelpers.interopDefault(_setJs);
function intersection(values, ...others) {
    values = new Set(values);
    others = others.map((0, _setJsDefault.default));
    out: for (const value of values){
        for (const other of others)if (!other.has(value)) {
            values.delete(value);
            continue out;
        }
    }
    return values;
}

},{"./set.js":"iZtsC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iZtsC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>set);
function set(values) {
    return values instanceof Set ? values : new Set(values);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"32tt1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>subset);
var _supersetJs = require("./superset.js");
var _supersetJsDefault = parcelHelpers.interopDefault(_supersetJs);
function subset(values, other) {
    return (0, _supersetJsDefault.default)(other, values);
}

},{"./superset.js":"l8AhK","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"l8AhK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>superset);
function superset(values, other) {
    const iterator = values[Symbol.iterator](), set = new Set();
    for (const o of other){
        if (set.has(o)) continue;
        let value, done;
        while({ value, done } = iterator.next()){
            if (done) return false;
            set.add(value);
            if (Object.is(o, value)) break;
        }
    }
    return true;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"80KgN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>union);
function union(...others) {
    const set = new Set();
    for (const other of others)for (const o of other)set.add(o);
    return set;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2g6gM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "axisTop", ()=>(0, _axis.axisTop));
parcelHelpers.export(exports, "axisRight", ()=>(0, _axis.axisRight));
parcelHelpers.export(exports, "axisBottom", ()=>(0, _axis.axisBottom));
parcelHelpers.export(exports, "axisLeft", ()=>(0, _axis.axisLeft));
var _axis = require("./axis");

},{"./axis":"lwARn","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lwARn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "axisTop", ()=>axisTop);
parcelHelpers.export(exports, "axisRight", ()=>axisRight);
parcelHelpers.export(exports, "axisBottom", ()=>axisBottom);
parcelHelpers.export(exports, "axisLeft", ()=>axisLeft);
var _array = require("./array");
var _identity = require("./identity");
var _identityDefault = parcelHelpers.interopDefault(_identity);
var top = 1, right = 2, bottom = 3, left = 4, epsilon = 1e-6;
function translateX(x) {
    return "translate(" + (x + 0.5) + ",0)";
}
function translateY(y) {
    return "translate(0," + (y + 0.5) + ")";
}
function number(scale) {
    return function(d) {
        return +scale(d);
    };
}
function center(scale) {
    var offset = Math.max(0, scale.bandwidth() - 1) / 2; // Adjust for 0.5px offset.
    if (scale.round()) offset = Math.round(offset);
    return function(d) {
        return +scale(d) + offset;
    };
}
function entering() {
    return !this.__axis;
}
function axis(orient, scale) {
    var tickArguments = [], tickValues = null, tickFormat = null, tickSizeInner = 6, tickSizeOuter = 6, tickPadding = 3, k = orient === top || orient === left ? -1 : 1, x = orient === left || orient === right ? "x" : "y", transform = orient === top || orient === bottom ? translateX : translateY;
    function axis(context) {
        var values = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain() : tickValues, format = tickFormat == null ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : (0, _identityDefault.default) : tickFormat, spacing = Math.max(tickSizeInner, 0) + tickPadding, range = scale.range(), range0 = +range[0] + 0.5, range1 = +range[range.length - 1] + 0.5, position = (scale.bandwidth ? center : number)(scale.copy()), selection = context.selection ? context.selection() : context, path = selection.selectAll(".domain").data([
            null
        ]), tick = selection.selectAll(".tick").data(values, scale).order(), tickExit = tick.exit(), tickEnter = tick.enter().append("g").attr("class", "tick"), line = tick.select("line"), text = tick.select("text");
        path = path.merge(path.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor"));
        tick = tick.merge(tickEnter);
        line = line.merge(tickEnter.append("line").attr("stroke", "currentColor").attr(x + "2", k * tickSizeInner));
        text = text.merge(tickEnter.append("text").attr("fill", "currentColor").attr(x, k * spacing).attr("dy", orient === top ? "0em" : orient === bottom ? "0.71em" : "0.32em"));
        if (context !== selection) {
            path = path.transition(context);
            tick = tick.transition(context);
            line = line.transition(context);
            text = text.transition(context);
            tickExit = tickExit.transition(context).attr("opacity", epsilon).attr("transform", function(d) {
                return isFinite(d = position(d)) ? transform(d) : this.getAttribute("transform");
            });
            tickEnter.attr("opacity", epsilon).attr("transform", function(d) {
                var p = this.parentNode.__axis;
                return transform(p && isFinite(p = p(d)) ? p : position(d));
            });
        }
        tickExit.remove();
        path.attr("d", orient === left || orient == right ? tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H0.5V" + range1 + "H" + k * tickSizeOuter : "M0.5," + range0 + "V" + range1 : tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V0.5H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + ",0.5H" + range1);
        tick.attr("opacity", 1).attr("transform", function(d) {
            return transform(position(d));
        });
        line.attr(x + "2", k * tickSizeInner);
        text.attr(x, k * spacing).text(format);
        selection.filter(entering).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", orient === right ? "start" : orient === left ? "end" : "middle");
        selection.each(function() {
            this.__axis = position;
        });
    }
    axis.scale = function(_) {
        return arguments.length ? (scale = _, axis) : scale;
    };
    axis.ticks = function() {
        return tickArguments = (0, _array.slice).call(arguments), axis;
    };
    axis.tickArguments = function(_) {
        return arguments.length ? (tickArguments = _ == null ? [] : (0, _array.slice).call(_), axis) : tickArguments.slice();
    };
    axis.tickValues = function(_) {
        return arguments.length ? (tickValues = _ == null ? null : (0, _array.slice).call(_), axis) : tickValues && tickValues.slice();
    };
    axis.tickFormat = function(_) {
        return arguments.length ? (tickFormat = _, axis) : tickFormat;
    };
    axis.tickSize = function(_) {
        return arguments.length ? (tickSizeInner = tickSizeOuter = +_, axis) : tickSizeInner;
    };
    axis.tickSizeInner = function(_) {
        return arguments.length ? (tickSizeInner = +_, axis) : tickSizeInner;
    };
    axis.tickSizeOuter = function(_) {
        return arguments.length ? (tickSizeOuter = +_, axis) : tickSizeOuter;
    };
    axis.tickPadding = function(_) {
        return arguments.length ? (tickPadding = +_, axis) : tickPadding;
    };
    return axis;
}
function axisTop(scale) {
    return axis(top, scale);
}
function axisRight(scale) {
    return axis(right, scale);
}
function axisBottom(scale) {
    return axis(bottom, scale);
}
function axisLeft(scale) {
    return axis(left, scale);
}

},{"./array":"kVqvJ","./identity":"aXZUf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kVqvJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "slice", ()=>slice);
var slice = Array.prototype.slice;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aXZUf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(x) {
        return x;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"UQ8g3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "scaleBand", ()=>(0, _bandJsDefault.default));
parcelHelpers.export(exports, "scalePoint", ()=>(0, _bandJs.point));
parcelHelpers.export(exports, "scaleIdentity", ()=>(0, _identityJsDefault.default));
parcelHelpers.export(exports, "scaleLinear", ()=>(0, _linearJsDefault.default));
parcelHelpers.export(exports, "scaleLog", ()=>(0, _logJsDefault.default));
parcelHelpers.export(exports, "scaleSymlog", ()=>(0, _symlogJsDefault.default));
parcelHelpers.export(exports, "scaleOrdinal", ()=>(0, _ordinalJsDefault.default));
parcelHelpers.export(exports, "scaleImplicit", ()=>(0, _ordinalJs.implicit));
parcelHelpers.export(exports, "scalePow", ()=>(0, _powJsDefault.default));
parcelHelpers.export(exports, "scaleSqrt", ()=>(0, _powJs.sqrt));
parcelHelpers.export(exports, "scaleRadial", ()=>(0, _radialJsDefault.default));
parcelHelpers.export(exports, "scaleQuantile", ()=>(0, _quantileJsDefault.default));
parcelHelpers.export(exports, "scaleQuantize", ()=>(0, _quantizeJsDefault.default));
parcelHelpers.export(exports, "scaleThreshold", ()=>(0, _thresholdJsDefault.default));
parcelHelpers.export(exports, "scaleTime", ()=>(0, _timeJsDefault.default));
parcelHelpers.export(exports, "scaleUtc", ()=>(0, _utcTimeJsDefault.default));
parcelHelpers.export(exports, "scaleSequential", ()=>(0, _sequentialJsDefault.default));
parcelHelpers.export(exports, "scaleSequentialLog", ()=>(0, _sequentialJs.sequentialLog));
parcelHelpers.export(exports, "scaleSequentialPow", ()=>(0, _sequentialJs.sequentialPow));
parcelHelpers.export(exports, "scaleSequentialSqrt", ()=>(0, _sequentialJs.sequentialSqrt));
parcelHelpers.export(exports, "scaleSequentialSymlog", ()=>(0, _sequentialJs.sequentialSymlog));
parcelHelpers.export(exports, "scaleSequentialQuantile", ()=>(0, _sequentialQuantileJsDefault.default));
parcelHelpers.export(exports, "scaleDiverging", ()=>(0, _divergingJsDefault.default));
parcelHelpers.export(exports, "scaleDivergingLog", ()=>(0, _divergingJs.divergingLog));
parcelHelpers.export(exports, "scaleDivergingPow", ()=>(0, _divergingJs.divergingPow));
parcelHelpers.export(exports, "scaleDivergingSqrt", ()=>(0, _divergingJs.divergingSqrt));
parcelHelpers.export(exports, "scaleDivergingSymlog", ()=>(0, _divergingJs.divergingSymlog));
parcelHelpers.export(exports, "tickFormat", ()=>(0, _tickFormatJsDefault.default));
var _bandJs = require("./band.js");
var _bandJsDefault = parcelHelpers.interopDefault(_bandJs);
var _identityJs = require("./identity.js");
var _identityJsDefault = parcelHelpers.interopDefault(_identityJs);
var _linearJs = require("./linear.js");
var _linearJsDefault = parcelHelpers.interopDefault(_linearJs);
var _logJs = require("./log.js");
var _logJsDefault = parcelHelpers.interopDefault(_logJs);
var _symlogJs = require("./symlog.js");
var _symlogJsDefault = parcelHelpers.interopDefault(_symlogJs);
var _ordinalJs = require("./ordinal.js");
var _ordinalJsDefault = parcelHelpers.interopDefault(_ordinalJs);
var _powJs = require("./pow.js");
var _powJsDefault = parcelHelpers.interopDefault(_powJs);
var _radialJs = require("./radial.js");
var _radialJsDefault = parcelHelpers.interopDefault(_radialJs);
var _quantileJs = require("./quantile.js");
var _quantileJsDefault = parcelHelpers.interopDefault(_quantileJs);
var _quantizeJs = require("./quantize.js");
var _quantizeJsDefault = parcelHelpers.interopDefault(_quantizeJs);
var _thresholdJs = require("./threshold.js");
var _thresholdJsDefault = parcelHelpers.interopDefault(_thresholdJs);
var _timeJs = require("./time.js");
var _timeJsDefault = parcelHelpers.interopDefault(_timeJs);
var _utcTimeJs = require("./utcTime.js");
var _utcTimeJsDefault = parcelHelpers.interopDefault(_utcTimeJs);
var _sequentialJs = require("./sequential.js");
var _sequentialJsDefault = parcelHelpers.interopDefault(_sequentialJs);
var _sequentialQuantileJs = require("./sequentialQuantile.js");
var _sequentialQuantileJsDefault = parcelHelpers.interopDefault(_sequentialQuantileJs);
var _divergingJs = require("./diverging.js");
var _divergingJsDefault = parcelHelpers.interopDefault(_divergingJs);
var _tickFormatJs = require("./tickFormat.js");
var _tickFormatJsDefault = parcelHelpers.interopDefault(_tickFormatJs);

},{"./band.js":"4oI5T","./identity.js":"4MvzB","./linear.js":"lob4K","./log.js":"z4t8s","./symlog.js":"4KiG8","./ordinal.js":"hNjKg","./pow.js":"jVG8A","./radial.js":"8e44u","./quantile.js":"cZUY5","./quantize.js":"6tbld","./threshold.js":"f8NNx","./time.js":"7UVid","./utcTime.js":"6ufv7","./sequential.js":"aMNy9","./sequentialQuantile.js":"esKgz","./diverging.js":"3BN2V","./tickFormat.js":"ahQef","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4oI5T":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>band);
parcelHelpers.export(exports, "point", ()=>point);
var _d3Array = require("d3-array");
var _initJs = require("./init.js");
var _ordinalJs = require("./ordinal.js");
var _ordinalJsDefault = parcelHelpers.interopDefault(_ordinalJs);
function band() {
    var scale = (0, _ordinalJsDefault.default)().unknown(undefined), domain = scale.domain, ordinalRange = scale.range, r0 = 0, r1 = 1, step, bandwidth, round = false, paddingInner = 0, paddingOuter = 0, align = 0.5;
    delete scale.unknown;
    function rescale() {
        var n = domain().length, reverse = r1 < r0, start = reverse ? r1 : r0, stop = reverse ? r0 : r1;
        step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
        if (round) step = Math.floor(step);
        start += (stop - start - step * (n - paddingInner)) * align;
        bandwidth = step * (1 - paddingInner);
        if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
        var values = (0, _d3Array.range)(n).map(function(i) {
            return start + step * i;
        });
        return ordinalRange(reverse ? values.reverse() : values);
    }
    scale.domain = function(_) {
        return arguments.length ? (domain(_), rescale()) : domain();
    };
    scale.range = function(_) {
        return arguments.length ? ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale()) : [
            r0,
            r1
        ];
    };
    scale.rangeRound = function(_) {
        return [r0, r1] = _, r0 = +r0, r1 = +r1, round = true, rescale();
    };
    scale.bandwidth = function() {
        return bandwidth;
    };
    scale.step = function() {
        return step;
    };
    scale.round = function(_) {
        return arguments.length ? (round = !!_, rescale()) : round;
    };
    scale.padding = function(_) {
        return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
    };
    scale.paddingInner = function(_) {
        return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
    };
    scale.paddingOuter = function(_) {
        return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
    };
    scale.align = function(_) {
        return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
    };
    scale.copy = function() {
        return band(domain(), [
            r0,
            r1
        ]).round(round).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
    };
    return (0, _initJs.initRange).apply(rescale(), arguments);
}
function pointish(scale) {
    var copy = scale.copy;
    scale.padding = scale.paddingOuter;
    delete scale.paddingInner;
    delete scale.paddingOuter;
    scale.copy = function() {
        return pointish(copy());
    };
    return scale;
}
function point() {
    return pointish(band.apply(null, arguments).paddingInner(1));
}

},{"d3-array":"1yX2W","./init.js":"kp8lc","./ordinal.js":"hNjKg","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kp8lc":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initRange", ()=>initRange);
parcelHelpers.export(exports, "initInterpolator", ()=>initInterpolator);
function initRange(domain, range) {
    switch(arguments.length){
        case 0:
            break;
        case 1:
            this.range(domain);
            break;
        default:
            this.range(range).domain(domain);
            break;
    }
    return this;
}
function initInterpolator(domain, interpolator) {
    switch(arguments.length){
        case 0:
            break;
        case 1:
            if (typeof domain === "function") this.interpolator(domain);
            else this.range(domain);
            break;
        default:
            this.domain(domain);
            if (typeof interpolator === "function") this.interpolator(interpolator);
            else this.range(interpolator);
            break;
    }
    return this;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hNjKg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "implicit", ()=>implicit);
parcelHelpers.export(exports, "default", ()=>ordinal);
var _initJs = require("./init.js");
const implicit = Symbol("implicit");
function ordinal() {
    var index = new Map(), domain = [], range = [], unknown = implicit;
    function scale(d) {
        var key = d + "", i = index.get(key);
        if (!i) {
            if (unknown !== implicit) return unknown;
            index.set(key, i = domain.push(d));
        }
        return range[(i - 1) % range.length];
    }
    scale.domain = function(_) {
        if (!arguments.length) return domain.slice();
        domain = [], index = new Map();
        for (const value of _){
            const key = value + "";
            if (index.has(key)) continue;
            index.set(key, domain.push(value));
        }
        return scale;
    };
    scale.range = function(_) {
        return arguments.length ? (range = Array.from(_), scale) : range.slice();
    };
    scale.unknown = function(_) {
        return arguments.length ? (unknown = _, scale) : unknown;
    };
    scale.copy = function() {
        return ordinal(domain, range).unknown(unknown);
    };
    (0, _initJs.initRange).apply(scale, arguments);
    return scale;
}

},{"./init.js":"kp8lc","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4MvzB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>identity);
var _linearJs = require("./linear.js");
var _numberJs = require("./number.js");
var _numberJsDefault = parcelHelpers.interopDefault(_numberJs);
function identity(domain) {
    var unknown;
    function scale(x) {
        return x == null || isNaN(x = +x) ? unknown : x;
    }
    scale.invert = scale;
    scale.domain = scale.range = function(_) {
        return arguments.length ? (domain = Array.from(_, (0, _numberJsDefault.default)), scale) : domain.slice();
    };
    scale.unknown = function(_) {
        return arguments.length ? (unknown = _, scale) : unknown;
    };
    scale.copy = function() {
        return identity(domain).unknown(unknown);
    };
    domain = arguments.length ? Array.from(domain, (0, _numberJsDefault.default)) : [
        0,
        1
    ];
    return (0, _linearJs.linearish)(scale);
}

},{"./linear.js":"lob4K","./number.js":"k9Lyx","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lob4K":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "linearish", ()=>linearish);
parcelHelpers.export(exports, "default", ()=>linear);
var _d3Array = require("d3-array");
var _continuousJs = require("./continuous.js");
var _continuousJsDefault = parcelHelpers.interopDefault(_continuousJs);
var _initJs = require("./init.js");
var _tickFormatJs = require("./tickFormat.js");
var _tickFormatJsDefault = parcelHelpers.interopDefault(_tickFormatJs);
function linearish(scale) {
    var domain = scale.domain;
    scale.ticks = function(count) {
        var d = domain();
        return (0, _d3Array.ticks)(d[0], d[d.length - 1], count == null ? 10 : count);
    };
    scale.tickFormat = function(count, specifier) {
        var d = domain();
        return (0, _tickFormatJsDefault.default)(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
    };
    scale.nice = function(count) {
        if (count == null) count = 10;
        var d = domain();
        var i0 = 0;
        var i1 = d.length - 1;
        var start = d[i0];
        var stop = d[i1];
        var prestep;
        var step;
        var maxIter = 10;
        if (stop < start) {
            step = start, start = stop, stop = step;
            step = i0, i0 = i1, i1 = step;
        }
        while(maxIter-- > 0){
            step = (0, _d3Array.tickIncrement)(start, stop, count);
            if (step === prestep) {
                d[i0] = start;
                d[i1] = stop;
                return domain(d);
            } else if (step > 0) {
                start = Math.floor(start / step) * step;
                stop = Math.ceil(stop / step) * step;
            } else if (step < 0) {
                start = Math.ceil(start * step) / step;
                stop = Math.floor(stop * step) / step;
            } else break;
            prestep = step;
        }
        return scale;
    };
    return scale;
}
function linear() {
    var scale = (0, _continuousJsDefault.default)();
    scale.copy = function() {
        return (0, _continuousJs.copy)(scale, linear());
    };
    (0, _initJs.initRange).apply(scale, arguments);
    return linearish(scale);
}

},{"d3-array":"1yX2W","./continuous.js":"1LsCM","./init.js":"kp8lc","./tickFormat.js":"ahQef","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1LsCM":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "identity", ()=>identity);
parcelHelpers.export(exports, "copy", ()=>copy);
parcelHelpers.export(exports, "transformer", ()=>transformer);
parcelHelpers.export(exports, "default", ()=>continuous);
var _d3Array = require("d3-array");
var _d3Interpolate = require("d3-interpolate");
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _numberJs = require("./number.js");
var _numberJsDefault = parcelHelpers.interopDefault(_numberJs);
var unit = [
    0,
    1
];
function identity(x) {
    return x;
}
function normalize(a, b) {
    return (b -= a = +a) ? function(x) {
        return (x - a) / b;
    } : (0, _constantJsDefault.default)(isNaN(b) ? NaN : 0.5);
}
function clamper(a, b) {
    var t;
    if (a > b) t = a, a = b, b = t;
    return function(x) {
        return Math.max(a, Math.min(b, x));
    };
}
// normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
function bimap(domain, range, interpolate) {
    var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
    if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
    else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
    return function(x) {
        return r0(d0(x));
    };
}
function polymap(domain, range, interpolate) {
    var j = Math.min(domain.length, range.length) - 1, d = new Array(j), r = new Array(j), i = -1;
    // Reverse descending domains.
    if (domain[j] < domain[0]) {
        domain = domain.slice().reverse();
        range = range.slice().reverse();
    }
    while(++i < j){
        d[i] = normalize(domain[i], domain[i + 1]);
        r[i] = interpolate(range[i], range[i + 1]);
    }
    return function(x) {
        var i = (0, _d3Array.bisect)(domain, x, 1, j) - 1;
        return r[i](d[i](x));
    };
}
function copy(source, target) {
    return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function transformer() {
    var domain = unit, range = unit, interpolate = (0, _d3Interpolate.interpolate), transform, untransform, unknown, clamp = identity, piecewise, output, input;
    function rescale() {
        var n = Math.min(domain.length, range.length);
        if (clamp !== identity) clamp = clamper(domain[0], domain[n - 1]);
        piecewise = n > 2 ? polymap : bimap;
        output = input = null;
        return scale;
    }
    function scale(x) {
        return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
    }
    scale.invert = function(y) {
        return clamp(untransform((input || (input = piecewise(range, domain.map(transform), (0, _d3Interpolate.interpolateNumber))))(y)));
    };
    scale.domain = function(_) {
        return arguments.length ? (domain = Array.from(_, (0, _numberJsDefault.default)), rescale()) : domain.slice();
    };
    scale.range = function(_) {
        return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
    };
    scale.rangeRound = function(_) {
        return range = Array.from(_), interpolate = (0, _d3Interpolate.interpolateRound), rescale();
    };
    scale.clamp = function(_) {
        return arguments.length ? (clamp = _ ? true : identity, rescale()) : clamp !== identity;
    };
    scale.interpolate = function(_) {
        return arguments.length ? (interpolate = _, rescale()) : interpolate;
    };
    scale.unknown = function(_) {
        return arguments.length ? (unknown = _, scale) : unknown;
    };
    return function(t, u) {
        transform = t, untransform = u;
        return rescale();
    };
}
function continuous() {
    return transformer()(identity, identity);
}

},{"d3-array":"1yX2W","d3-interpolate":"6jJyi","./constant.js":"kIv0D","./number.js":"k9Lyx","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kIv0D":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>constants);
function constants(x) {
    return function() {
        return x;
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"k9Lyx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>number);
function number(x) {
    return +x;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ahQef":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>tickFormat);
var _d3Array = require("d3-array");
var _d3Format = require("d3-format");
function tickFormat(start, stop, count, specifier) {
    var step = (0, _d3Array.tickStep)(start, stop, count), precision;
    specifier = (0, _d3Format.formatSpecifier)(specifier == null ? ",f" : specifier);
    switch(specifier.type){
        case "s":
            var value = Math.max(Math.abs(start), Math.abs(stop));
            if (specifier.precision == null && !isNaN(precision = (0, _d3Format.precisionPrefix)(step, value))) specifier.precision = precision;
            return (0, _d3Format.formatPrefix)(specifier, value);
        case "":
        case "e":
        case "g":
        case "p":
        case "r":
            if (specifier.precision == null && !isNaN(precision = (0, _d3Format.precisionRound)(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
            break;
        case "f":
        case "%":
            if (specifier.precision == null && !isNaN(precision = (0, _d3Format.precisionFixed)(step))) specifier.precision = precision - (specifier.type === "%") * 2;
            break;
    }
    return (0, _d3Format.format)(specifier);
}

},{"d3-array":"1yX2W","d3-format":"4XOv2","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4XOv2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "formatDefaultLocale", ()=>(0, _defaultLocaleJsDefault.default));
parcelHelpers.export(exports, "format", ()=>(0, _defaultLocaleJs.format));
parcelHelpers.export(exports, "formatPrefix", ()=>(0, _defaultLocaleJs.formatPrefix));
parcelHelpers.export(exports, "formatLocale", ()=>(0, _localeJsDefault.default));
parcelHelpers.export(exports, "formatSpecifier", ()=>(0, _formatSpecifierJsDefault.default));
parcelHelpers.export(exports, "FormatSpecifier", ()=>(0, _formatSpecifierJs.FormatSpecifier));
parcelHelpers.export(exports, "precisionFixed", ()=>(0, _precisionFixedJsDefault.default));
parcelHelpers.export(exports, "precisionPrefix", ()=>(0, _precisionPrefixJsDefault.default));
parcelHelpers.export(exports, "precisionRound", ()=>(0, _precisionRoundJsDefault.default));
var _defaultLocaleJs = require("./defaultLocale.js");
var _defaultLocaleJsDefault = parcelHelpers.interopDefault(_defaultLocaleJs);
var _localeJs = require("./locale.js");
var _localeJsDefault = parcelHelpers.interopDefault(_localeJs);
var _formatSpecifierJs = require("./formatSpecifier.js");
var _formatSpecifierJsDefault = parcelHelpers.interopDefault(_formatSpecifierJs);
var _precisionFixedJs = require("./precisionFixed.js");
var _precisionFixedJsDefault = parcelHelpers.interopDefault(_precisionFixedJs);
var _precisionPrefixJs = require("./precisionPrefix.js");
var _precisionPrefixJsDefault = parcelHelpers.interopDefault(_precisionPrefixJs);
var _precisionRoundJs = require("./precisionRound.js");
var _precisionRoundJsDefault = parcelHelpers.interopDefault(_precisionRoundJs);

},{"./defaultLocale.js":"g4Ai7","./locale.js":false,"./formatSpecifier.js":"4gfsY","./precisionFixed.js":"kCBOH","./precisionPrefix.js":"anfJX","./precisionRound.js":"djznD","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"g4Ai7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "format", ()=>format);
parcelHelpers.export(exports, "formatPrefix", ()=>formatPrefix);
parcelHelpers.export(exports, "default", ()=>defaultLocale);
var _localeJs = require("./locale.js");
var _localeJsDefault = parcelHelpers.interopDefault(_localeJs);
var locale;
var format;
var formatPrefix;
defaultLocale({
    decimal: ".",
    thousands: ",",
    grouping: [
        3
    ],
    currency: [
        "$",
        ""
    ],
    minus: "-"
});
function defaultLocale(definition) {
    locale = (0, _localeJsDefault.default)(definition);
    format = locale.format;
    formatPrefix = locale.formatPrefix;
    return locale;
}

},{"./locale.js":"8sic5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8sic5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(locale) {
        var group = locale.grouping === undefined || locale.thousands === undefined ? (0, _identityJsDefault.default) : (0, _formatGroupJsDefault.default)(map.call(locale.grouping, Number), locale.thousands + ""), currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "", currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "", decimal = locale.decimal === undefined ? "." : locale.decimal + "", numerals = locale.numerals === undefined ? (0, _identityJsDefault.default) : (0, _formatNumeralsJsDefault.default)(map.call(locale.numerals, String)), percent = locale.percent === undefined ? "%" : locale.percent + "", minus = locale.minus === undefined ? "-" : locale.minus + "", nan = locale.nan === undefined ? "NaN" : locale.nan + "";
        function newFormat(specifier) {
            specifier = (0, _formatSpecifierJsDefault.default)(specifier);
            var fill = specifier.fill, align = specifier.align, sign = specifier.sign, symbol = specifier.symbol, zero = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
            // The "n" type is an alias for ",g".
            if (type === "n") comma = true, type = "g";
            else if (!(0, _formatTypesJsDefault.default)[type]) precision === undefined && (precision = 12), trim = true, type = "g";
            // If zero fill is specified, padding goes after sign and before digits.
            if (zero || fill === "0" && align === "=") zero = true, fill = "0", align = "=";
            // Compute the prefix and suffix.
            // For SI-prefix, the suffix is lazily computed.
            var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";
            // What format function should we use?
            // Is this an integer type?
            // Can this type generate exponential notation?
            var formatType = (0, _formatTypesJsDefault.default)[type], maybeSuffix = /[defgprs%]/.test(type);
            // Set the default precision if not specified,
            // or clamp the specified precision to the supported range.
            // For significant precision, it must be in [1, 21].
            // For fixed precision, it must be in [0, 20].
            precision = precision === undefined ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
            function format(value) {
                var valuePrefix = prefix, valueSuffix = suffix, i, n, c;
                if (type === "c") {
                    valueSuffix = formatType(value) + valueSuffix;
                    value = "";
                } else {
                    value = +value;
                    // Determine the sign. -0 is not less than 0, but 1 / -0 is!
                    var valueNegative = value < 0 || 1 / value < 0;
                    // Perform the initial formatting.
                    value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
                    // Trim insignificant zeros.
                    if (trim) value = (0, _formatTrimJsDefault.default)(value);
                    // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
                    if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;
                    // Compute the prefix and suffix.
                    valuePrefix = (valueNegative ? sign === "(" ? sign : minus : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
                    valueSuffix = (type === "s" ? prefixes[8 + (0, _formatPrefixAutoJs.prefixExponent) / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");
                    // Break the formatted value into the integer “value” part that can be
                    // grouped, and fractional or exponential “suffix” part that is not.
                    if (maybeSuffix) {
                        i = -1, n = value.length;
                        while(++i < n)if (c = value.charCodeAt(i), 48 > c || c > 57) {
                            valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
                            value = value.slice(0, i);
                            break;
                        }
                    }
                }
                // If the fill character is not "0", grouping is applied before padding.
                if (comma && !zero) value = group(value, Infinity);
                // Compute the padding.
                var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
                // If the fill character is "0", grouping is applied after padding.
                if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
                // Reconstruct the final output based on the desired alignment.
                switch(align){
                    case "<":
                        value = valuePrefix + value + valueSuffix + padding;
                        break;
                    case "=":
                        value = valuePrefix + padding + value + valueSuffix;
                        break;
                    case "^":
                        value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
                        break;
                    default:
                        value = padding + valuePrefix + value + valueSuffix;
                        break;
                }
                return numerals(value);
            }
            format.toString = function() {
                return specifier + "";
            };
            return format;
        }
        function formatPrefix(specifier, value) {
            var f = newFormat((specifier = (0, _formatSpecifierJsDefault.default)(specifier), specifier.type = "f", specifier)), e = Math.max(-8, Math.min(8, Math.floor((0, _exponentJsDefault.default)(value) / 3))) * 3, k = Math.pow(10, -e), prefix = prefixes[8 + e / 3];
            return function(value) {
                return f(k * value) + prefix;
            };
        }
        return {
            format: newFormat,
            formatPrefix: formatPrefix
        };
    });
var _exponentJs = require("./exponent.js");
var _exponentJsDefault = parcelHelpers.interopDefault(_exponentJs);
var _formatGroupJs = require("./formatGroup.js");
var _formatGroupJsDefault = parcelHelpers.interopDefault(_formatGroupJs);
var _formatNumeralsJs = require("./formatNumerals.js");
var _formatNumeralsJsDefault = parcelHelpers.interopDefault(_formatNumeralsJs);
var _formatSpecifierJs = require("./formatSpecifier.js");
var _formatSpecifierJsDefault = parcelHelpers.interopDefault(_formatSpecifierJs);
var _formatTrimJs = require("./formatTrim.js");
var _formatTrimJsDefault = parcelHelpers.interopDefault(_formatTrimJs);
var _formatTypesJs = require("./formatTypes.js");
var _formatTypesJsDefault = parcelHelpers.interopDefault(_formatTypesJs);
var _formatPrefixAutoJs = require("./formatPrefixAuto.js");
var _identityJs = require("./identity.js");
var _identityJsDefault = parcelHelpers.interopDefault(_identityJs);
var map = Array.prototype.map, prefixes = [
    "y",
    "z",
    "a",
    "f",
    "p",
    "n",
    "\xb5",
    "m",
    "",
    "k",
    "M",
    "G",
    "T",
    "P",
    "E",
    "Z",
    "Y"
];

},{"./exponent.js":"7L05r","./formatGroup.js":"97wNI","./formatNumerals.js":"bnEku","./formatSpecifier.js":"4gfsY","./formatTrim.js":"cGiOx","./formatTypes.js":"aVp9c","./formatPrefixAuto.js":"lOwtK","./identity.js":"9nHXj","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7L05r":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(x) {
        return x = (0, _formatDecimalJs.formatDecimalParts)(Math.abs(x)), x ? x[1] : NaN;
    });
var _formatDecimalJs = require("./formatDecimal.js");

},{"./formatDecimal.js":"fkS16","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fkS16":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(x) {
        return Math.abs(x = Math.round(x)) >= 1e21 ? x.toLocaleString("en").replace(/,/g, "") : x.toString(10);
    });
// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimalParts(1.23) returns ["123", 0].
parcelHelpers.export(exports, "formatDecimalParts", ()=>formatDecimalParts);
function formatDecimalParts(x, p) {
    if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
    var i, coefficient = x.slice(0, i);
    // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
    // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
    return [
        coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
        +x.slice(i + 1)
    ];
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"97wNI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(grouping, thousands) {
        return function(value, width) {
            var i = value.length, t = [], j = 0, g = grouping[0], length = 0;
            while(i > 0 && g > 0){
                if (length + g + 1 > width) g = Math.max(1, width - length);
                t.push(value.substring(i -= g, i + g));
                if ((length += g + 1) > width) break;
                g = grouping[j = (j + 1) % grouping.length];
            }
            return t.reverse().join(thousands);
        };
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bnEku":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(numerals) {
        return function(value) {
            return value.replace(/[0-9]/g, function(i) {
                return numerals[+i];
            });
        };
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4gfsY":[function(require,module,exports) {
// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>formatSpecifier);
parcelHelpers.export(exports, "FormatSpecifier", ()=>FormatSpecifier);
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
    if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
    var match;
    return new FormatSpecifier({
        fill: match[1],
        align: match[2],
        sign: match[3],
        symbol: match[4],
        zero: match[5],
        width: match[6],
        comma: match[7],
        precision: match[8] && match[8].slice(1),
        trim: match[9],
        type: match[10]
    });
}
formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof
function FormatSpecifier(specifier) {
    this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
    this.align = specifier.align === undefined ? ">" : specifier.align + "";
    this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
    this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
    this.zero = !!specifier.zero;
    this.width = specifier.width === undefined ? undefined : +specifier.width;
    this.comma = !!specifier.comma;
    this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
    this.trim = !!specifier.trim;
    this.type = specifier.type === undefined ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function() {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === undefined ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cGiOx":[function(require,module,exports) {
// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(s) {
        out: for(var n = s.length, i = 1, i0 = -1, i1; i < n; ++i)switch(s[i]){
            case ".":
                i0 = i1 = i;
                break;
            case "0":
                if (i0 === 0) i0 = i;
                i1 = i;
                break;
            default:
                if (!+s[i]) break out;
                if (i0 > 0) i0 = 0;
                break;
        }
        return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aVp9c":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _formatDecimalJs = require("./formatDecimal.js");
var _formatDecimalJsDefault = parcelHelpers.interopDefault(_formatDecimalJs);
var _formatPrefixAutoJs = require("./formatPrefixAuto.js");
var _formatPrefixAutoJsDefault = parcelHelpers.interopDefault(_formatPrefixAutoJs);
var _formatRoundedJs = require("./formatRounded.js");
var _formatRoundedJsDefault = parcelHelpers.interopDefault(_formatRoundedJs);
exports.default = {
    "%": function(x, p) {
        return (x * 100).toFixed(p);
    },
    "b": function(x) {
        return Math.round(x).toString(2);
    },
    "c": function(x) {
        return x + "";
    },
    "d": (0, _formatDecimalJsDefault.default),
    "e": function(x, p) {
        return x.toExponential(p);
    },
    "f": function(x, p) {
        return x.toFixed(p);
    },
    "g": function(x, p) {
        return x.toPrecision(p);
    },
    "o": function(x) {
        return Math.round(x).toString(8);
    },
    "p": function(x, p) {
        return (0, _formatRoundedJsDefault.default)(x * 100, p);
    },
    "r": (0, _formatRoundedJsDefault.default),
    "s": (0, _formatPrefixAutoJsDefault.default),
    "X": function(x) {
        return Math.round(x).toString(16).toUpperCase();
    },
    "x": function(x) {
        return Math.round(x).toString(16);
    }
};

},{"./formatDecimal.js":"fkS16","./formatPrefixAuto.js":"lOwtK","./formatRounded.js":"gq71u","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lOwtK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "prefixExponent", ()=>prefixExponent);
parcelHelpers.export(exports, "default", ()=>function(x, p) {
        var d = (0, _formatDecimalJs.formatDecimalParts)(x, p);
        if (!d) return x + "";
        var coefficient = d[0], exponent = d[1], i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1, n = coefficient.length;
        return i === n ? coefficient : i > n ? coefficient + new Array(i - n + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + (0, _formatDecimalJs.formatDecimalParts)(x, Math.max(0, p + i - 1))[0]; // less than 1y!
    });
var _formatDecimalJs = require("./formatDecimal.js");
var prefixExponent;

},{"./formatDecimal.js":"fkS16","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gq71u":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(x, p) {
        var d = (0, _formatDecimalJs.formatDecimalParts)(x, p);
        if (!d) return x + "";
        var coefficient = d[0], exponent = d[1];
        return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1) : coefficient + new Array(exponent - coefficient.length + 2).join("0");
    });
var _formatDecimalJs = require("./formatDecimal.js");

},{"./formatDecimal.js":"fkS16","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9nHXj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(x) {
        return x;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kCBOH":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(step) {
        return Math.max(0, -(0, _exponentJsDefault.default)(Math.abs(step)));
    });
var _exponentJs = require("./exponent.js");
var _exponentJsDefault = parcelHelpers.interopDefault(_exponentJs);

},{"./exponent.js":"7L05r","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"anfJX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(step, value) {
        return Math.max(0, Math.max(-8, Math.min(8, Math.floor((0, _exponentJsDefault.default)(value) / 3))) * 3 - (0, _exponentJsDefault.default)(Math.abs(step)));
    });
var _exponentJs = require("./exponent.js");
var _exponentJsDefault = parcelHelpers.interopDefault(_exponentJs);

},{"./exponent.js":"7L05r","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"djznD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(step, max) {
        step = Math.abs(step), max = Math.abs(max) - step;
        return Math.max(0, (0, _exponentJsDefault.default)(max) - (0, _exponentJsDefault.default)(step)) + 1;
    });
var _exponentJs = require("./exponent.js");
var _exponentJsDefault = parcelHelpers.interopDefault(_exponentJs);

},{"./exponent.js":"7L05r","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"z4t8s":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "loggish", ()=>loggish);
parcelHelpers.export(exports, "default", ()=>log);
var _d3Array = require("d3-array");
var _d3Format = require("d3-format");
var _niceJs = require("./nice.js");
var _niceJsDefault = parcelHelpers.interopDefault(_niceJs);
var _continuousJs = require("./continuous.js");
var _initJs = require("./init.js");
function transformLog(x) {
    return Math.log(x);
}
function transformExp(x) {
    return Math.exp(x);
}
function transformLogn(x) {
    return -Math.log(-x);
}
function transformExpn(x) {
    return -Math.exp(-x);
}
function pow10(x) {
    return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
}
function powp(base) {
    return base === 10 ? pow10 : base === Math.E ? Math.exp : function(x) {
        return Math.pow(base, x);
    };
}
function logp(base) {
    return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), function(x) {
        return Math.log(x) / base;
    });
}
function reflect(f) {
    return function(x) {
        return -f(-x);
    };
}
function loggish(transform) {
    var scale = transform(transformLog, transformExp), domain = scale.domain, base = 10, logs, pows;
    function rescale() {
        logs = logp(base), pows = powp(base);
        if (domain()[0] < 0) {
            logs = reflect(logs), pows = reflect(pows);
            transform(transformLogn, transformExpn);
        } else transform(transformLog, transformExp);
        return scale;
    }
    scale.base = function(_) {
        return arguments.length ? (base = +_, rescale()) : base;
    };
    scale.domain = function(_) {
        return arguments.length ? (domain(_), rescale()) : domain();
    };
    scale.ticks = function(count) {
        var d = domain(), u = d[0], v = d[d.length - 1], r;
        if (r = v < u) i = u, u = v, v = i;
        var i = logs(u), j = logs(v), p, k, t, n = count == null ? 10 : +count, z = [];
        if (!(base % 1) && j - i < n) {
            i = Math.floor(i), j = Math.ceil(j);
            if (u > 0) for(; i <= j; ++i)for(k = 1, p = pows(i); k < base; ++k){
                t = p * k;
                if (t < u) continue;
                if (t > v) break;
                z.push(t);
            }
            else for(; i <= j; ++i)for(k = base - 1, p = pows(i); k >= 1; --k){
                t = p * k;
                if (t < u) continue;
                if (t > v) break;
                z.push(t);
            }
            if (z.length * 2 < n) z = (0, _d3Array.ticks)(u, v, n);
        } else z = (0, _d3Array.ticks)(i, j, Math.min(j - i, n)).map(pows);
        return r ? z.reverse() : z;
    };
    scale.tickFormat = function(count, specifier) {
        if (specifier == null) specifier = base === 10 ? ".0e" : ",";
        if (typeof specifier !== "function") specifier = (0, _d3Format.format)(specifier);
        if (count === Infinity) return specifier;
        if (count == null) count = 10;
        var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
        return function(d) {
            var i = d / pows(Math.round(logs(d)));
            if (i * base < base - 0.5) i *= base;
            return i <= k ? specifier(d) : "";
        };
    };
    scale.nice = function() {
        return domain((0, _niceJsDefault.default)(domain(), {
            floor: function(x) {
                return pows(Math.floor(logs(x)));
            },
            ceil: function(x) {
                return pows(Math.ceil(logs(x)));
            }
        }));
    };
    return scale;
}
function log() {
    var scale = loggish((0, _continuousJs.transformer)()).domain([
        1,
        10
    ]);
    scale.copy = function() {
        return (0, _continuousJs.copy)(scale, log()).base(scale.base());
    };
    (0, _initJs.initRange).apply(scale, arguments);
    return scale;
}

},{"d3-array":"1yX2W","d3-format":"4XOv2","./nice.js":"kAVeE","./continuous.js":"1LsCM","./init.js":"kp8lc","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kAVeE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>nice);
function nice(domain, interval) {
    domain = domain.slice();
    var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], t;
    if (x1 < x0) {
        t = i0, i0 = i1, i1 = t;
        t = x0, x0 = x1, x1 = t;
    }
    domain[i0] = interval.floor(x0);
    domain[i1] = interval.ceil(x1);
    return domain;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4KiG8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "symlogish", ()=>symlogish);
parcelHelpers.export(exports, "default", ()=>symlog);
var _linearJs = require("./linear.js");
var _continuousJs = require("./continuous.js");
var _initJs = require("./init.js");
function transformSymlog(c) {
    return function(x) {
        return Math.sign(x) * Math.log1p(Math.abs(x / c));
    };
}
function transformSymexp(c) {
    return function(x) {
        return Math.sign(x) * Math.expm1(Math.abs(x)) * c;
    };
}
function symlogish(transform) {
    var c = 1, scale = transform(transformSymlog(c), transformSymexp(c));
    scale.constant = function(_) {
        return arguments.length ? transform(transformSymlog(c = +_), transformSymexp(c)) : c;
    };
    return (0, _linearJs.linearish)(scale);
}
function symlog() {
    var scale = symlogish((0, _continuousJs.transformer)());
    scale.copy = function() {
        return (0, _continuousJs.copy)(scale, symlog()).constant(scale.constant());
    };
    return (0, _initJs.initRange).apply(scale, arguments);
}

},{"./linear.js":"lob4K","./continuous.js":"1LsCM","./init.js":"kp8lc","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jVG8A":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "powish", ()=>powish);
parcelHelpers.export(exports, "default", ()=>pow);
parcelHelpers.export(exports, "sqrt", ()=>sqrt);
var _linearJs = require("./linear.js");
var _continuousJs = require("./continuous.js");
var _initJs = require("./init.js");
function transformPow(exponent) {
    return function(x) {
        return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
    };
}
function transformSqrt(x) {
    return x < 0 ? -Math.sqrt(-x) : Math.sqrt(x);
}
function transformSquare(x) {
    return x < 0 ? -x * x : x * x;
}
function powish(transform) {
    var scale = transform((0, _continuousJs.identity), (0, _continuousJs.identity)), exponent = 1;
    function rescale() {
        return exponent === 1 ? transform((0, _continuousJs.identity), (0, _continuousJs.identity)) : exponent === 0.5 ? transform(transformSqrt, transformSquare) : transform(transformPow(exponent), transformPow(1 / exponent));
    }
    scale.exponent = function(_) {
        return arguments.length ? (exponent = +_, rescale()) : exponent;
    };
    return (0, _linearJs.linearish)(scale);
}
function pow() {
    var scale = powish((0, _continuousJs.transformer)());
    scale.copy = function() {
        return (0, _continuousJs.copy)(scale, pow()).exponent(scale.exponent());
    };
    (0, _initJs.initRange).apply(scale, arguments);
    return scale;
}
function sqrt() {
    return pow.apply(null, arguments).exponent(0.5);
}

},{"./linear.js":"lob4K","./continuous.js":"1LsCM","./init.js":"kp8lc","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8e44u":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>radial);
var _continuousJs = require("./continuous.js");
var _continuousJsDefault = parcelHelpers.interopDefault(_continuousJs);
var _initJs = require("./init.js");
var _linearJs = require("./linear.js");
var _numberJs = require("./number.js");
var _numberJsDefault = parcelHelpers.interopDefault(_numberJs);
function square(x) {
    return Math.sign(x) * x * x;
}
function unsquare(x) {
    return Math.sign(x) * Math.sqrt(Math.abs(x));
}
function radial() {
    var squared = (0, _continuousJsDefault.default)(), range = [
        0,
        1
    ], round = false, unknown;
    function scale(x) {
        var y = unsquare(squared(x));
        return isNaN(y) ? unknown : round ? Math.round(y) : y;
    }
    scale.invert = function(y) {
        return squared.invert(square(y));
    };
    scale.domain = function(_) {
        return arguments.length ? (squared.domain(_), scale) : squared.domain();
    };
    scale.range = function(_) {
        return arguments.length ? (squared.range((range = Array.from(_, (0, _numberJsDefault.default))).map(square)), scale) : range.slice();
    };
    scale.rangeRound = function(_) {
        return scale.range(_).round(true);
    };
    scale.round = function(_) {
        return arguments.length ? (round = !!_, scale) : round;
    };
    scale.clamp = function(_) {
        return arguments.length ? (squared.clamp(_), scale) : squared.clamp();
    };
    scale.unknown = function(_) {
        return arguments.length ? (unknown = _, scale) : unknown;
    };
    scale.copy = function() {
        return radial(squared.domain(), range).round(round).clamp(squared.clamp()).unknown(unknown);
    };
    (0, _initJs.initRange).apply(scale, arguments);
    return (0, _linearJs.linearish)(scale);
}

},{"./continuous.js":"1LsCM","./init.js":"kp8lc","./linear.js":"lob4K","./number.js":"k9Lyx","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cZUY5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>quantile);
var _d3Array = require("d3-array");
var _initJs = require("./init.js");
function quantile() {
    var domain = [], range = [], thresholds = [], unknown;
    function rescale() {
        var i = 0, n = Math.max(1, range.length);
        thresholds = new Array(n - 1);
        while(++i < n)thresholds[i - 1] = (0, _d3Array.quantileSorted)(domain, i / n);
        return scale;
    }
    function scale(x) {
        return x == null || isNaN(x = +x) ? unknown : range[(0, _d3Array.bisect)(thresholds, x)];
    }
    scale.invertExtent = function(y) {
        var i = range.indexOf(y);
        return i < 0 ? [
            NaN,
            NaN
        ] : [
            i > 0 ? thresholds[i - 1] : domain[0],
            i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
        ];
    };
    scale.domain = function(_) {
        if (!arguments.length) return domain.slice();
        domain = [];
        for (let d of _)if (d != null && !isNaN(d = +d)) domain.push(d);
        domain.sort((0, _d3Array.ascending));
        return rescale();
    };
    scale.range = function(_) {
        return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
    };
    scale.unknown = function(_) {
        return arguments.length ? (unknown = _, scale) : unknown;
    };
    scale.quantiles = function() {
        return thresholds.slice();
    };
    scale.copy = function() {
        return quantile().domain(domain).range(range).unknown(unknown);
    };
    return (0, _initJs.initRange).apply(scale, arguments);
}

},{"d3-array":"1yX2W","./init.js":"kp8lc","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6tbld":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>quantize);
var _d3Array = require("d3-array");
var _linearJs = require("./linear.js");
var _initJs = require("./init.js");
function quantize() {
    var x0 = 0, x1 = 1, n = 1, domain = [
        0.5
    ], range = [
        0,
        1
    ], unknown;
    function scale(x) {
        return x != null && x <= x ? range[(0, _d3Array.bisect)(domain, x, 0, n)] : unknown;
    }
    function rescale() {
        var i = -1;
        domain = new Array(n);
        while(++i < n)domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
        return scale;
    }
    scale.domain = function(_) {
        return arguments.length ? ([x0, x1] = _, x0 = +x0, x1 = +x1, rescale()) : [
            x0,
            x1
        ];
    };
    scale.range = function(_) {
        return arguments.length ? (n = (range = Array.from(_)).length - 1, rescale()) : range.slice();
    };
    scale.invertExtent = function(y) {
        var i = range.indexOf(y);
        return i < 0 ? [
            NaN,
            NaN
        ] : i < 1 ? [
            x0,
            domain[0]
        ] : i >= n ? [
            domain[n - 1],
            x1
        ] : [
            domain[i - 1],
            domain[i]
        ];
    };
    scale.unknown = function(_) {
        return arguments.length ? (unknown = _, scale) : scale;
    };
    scale.thresholds = function() {
        return domain.slice();
    };
    scale.copy = function() {
        return quantize().domain([
            x0,
            x1
        ]).range(range).unknown(unknown);
    };
    return (0, _initJs.initRange).apply((0, _linearJs.linearish)(scale), arguments);
}

},{"d3-array":"1yX2W","./linear.js":"lob4K","./init.js":"kp8lc","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"f8NNx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>threshold);
var _d3Array = require("d3-array");
var _initJs = require("./init.js");
function threshold() {
    var domain = [
        0.5
    ], range = [
        0,
        1
    ], unknown, n = 1;
    function scale(x) {
        return x != null && x <= x ? range[(0, _d3Array.bisect)(domain, x, 0, n)] : unknown;
    }
    scale.domain = function(_) {
        return arguments.length ? (domain = Array.from(_), n = Math.min(domain.length, range.length - 1), scale) : domain.slice();
    };
    scale.range = function(_) {
        return arguments.length ? (range = Array.from(_), n = Math.min(domain.length, range.length - 1), scale) : range.slice();
    };
    scale.invertExtent = function(y) {
        var i = range.indexOf(y);
        return [
            domain[i - 1],
            domain[i]
        ];
    };
    scale.unknown = function(_) {
        return arguments.length ? (unknown = _, scale) : unknown;
    };
    scale.copy = function() {
        return threshold().domain(domain).range(range).unknown(unknown);
    };
    return (0, _initJs.initRange).apply(scale, arguments);
}

},{"d3-array":"1yX2W","./init.js":"kp8lc","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7UVid":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "calendar", ()=>calendar);
parcelHelpers.export(exports, "default", ()=>time);
var _d3Time = require("d3-time");
var _d3TimeFormat = require("d3-time-format");
var _continuousJs = require("./continuous.js");
var _continuousJsDefault = parcelHelpers.interopDefault(_continuousJs);
var _initJs = require("./init.js");
var _niceJs = require("./nice.js");
var _niceJsDefault = parcelHelpers.interopDefault(_niceJs);
function date(t) {
    return new Date(t);
}
function number(t) {
    return t instanceof Date ? +t : +new Date(+t);
}
function calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format) {
    var scale = (0, _continuousJsDefault.default)(), invert = scale.invert, domain = scale.domain;
    var formatMillisecond = format(".%L"), formatSecond = format(":%S"), formatMinute = format("%I:%M"), formatHour = format("%I %p"), formatDay = format("%a %d"), formatWeek = format("%b %d"), formatMonth = format("%B"), formatYear = format("%Y");
    function tickFormat(date) {
        return (second(date) < date ? formatMillisecond : minute(date) < date ? formatSecond : hour(date) < date ? formatMinute : day(date) < date ? formatHour : month(date) < date ? week(date) < date ? formatDay : formatWeek : year(date) < date ? formatMonth : formatYear)(date);
    }
    scale.invert = function(y) {
        return new Date(invert(y));
    };
    scale.domain = function(_) {
        return arguments.length ? domain(Array.from(_, number)) : domain().map(date);
    };
    scale.ticks = function(interval) {
        var d = domain();
        return ticks(d[0], d[d.length - 1], interval == null ? 10 : interval);
    };
    scale.tickFormat = function(count, specifier) {
        return specifier == null ? tickFormat : format(specifier);
    };
    scale.nice = function(interval) {
        var d = domain();
        if (!interval || typeof interval.range !== "function") interval = tickInterval(d[0], d[d.length - 1], interval == null ? 10 : interval);
        return interval ? domain((0, _niceJsDefault.default)(d, interval)) : scale;
    };
    scale.copy = function() {
        return (0, _continuousJs.copy)(scale, calendar(ticks, tickInterval, year, month, week, day, hour, minute, second, format));
    };
    return scale;
}
function time() {
    return (0, _initJs.initRange).apply(calendar((0, _d3Time.timeTicks), (0, _d3Time.timeTickInterval), (0, _d3Time.timeYear), (0, _d3Time.timeMonth), (0, _d3Time.timeWeek), (0, _d3Time.timeDay), (0, _d3Time.timeHour), (0, _d3Time.timeMinute), (0, _d3Time.timeSecond), (0, _d3TimeFormat.timeFormat)).domain([
        new Date(2000, 0, 1),
        new Date(2000, 0, 2)
    ]), arguments);
}

},{"d3-time":"2Gldv","d3-time-format":"4FtNS","./continuous.js":"1LsCM","./init.js":"kp8lc","./nice.js":"kAVeE","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2Gldv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "timeInterval", ()=>(0, _intervalJsDefault.default));
parcelHelpers.export(exports, "timeMillisecond", ()=>(0, _millisecondJsDefault.default));
parcelHelpers.export(exports, "timeMilliseconds", ()=>(0, _millisecondJs.milliseconds));
parcelHelpers.export(exports, "utcMillisecond", ()=>(0, _millisecondJsDefault.default));
parcelHelpers.export(exports, "utcMilliseconds", ()=>(0, _millisecondJs.milliseconds));
parcelHelpers.export(exports, "timeSecond", ()=>(0, _secondJsDefault.default));
parcelHelpers.export(exports, "timeSeconds", ()=>(0, _secondJs.seconds));
parcelHelpers.export(exports, "utcSecond", ()=>(0, _secondJsDefault.default));
parcelHelpers.export(exports, "utcSeconds", ()=>(0, _secondJs.seconds));
parcelHelpers.export(exports, "timeMinute", ()=>(0, _minuteJsDefault.default));
parcelHelpers.export(exports, "timeMinutes", ()=>(0, _minuteJs.minutes));
parcelHelpers.export(exports, "timeHour", ()=>(0, _hourJsDefault.default));
parcelHelpers.export(exports, "timeHours", ()=>(0, _hourJs.hours));
parcelHelpers.export(exports, "timeDay", ()=>(0, _dayJsDefault.default));
parcelHelpers.export(exports, "timeDays", ()=>(0, _dayJs.days));
parcelHelpers.export(exports, "timeWeek", ()=>(0, _weekJs.sunday));
parcelHelpers.export(exports, "timeWeeks", ()=>(0, _weekJs.sundays));
parcelHelpers.export(exports, "timeSunday", ()=>(0, _weekJs.sunday));
parcelHelpers.export(exports, "timeSundays", ()=>(0, _weekJs.sundays));
parcelHelpers.export(exports, "timeMonday", ()=>(0, _weekJs.monday));
parcelHelpers.export(exports, "timeMondays", ()=>(0, _weekJs.mondays));
parcelHelpers.export(exports, "timeTuesday", ()=>(0, _weekJs.tuesday));
parcelHelpers.export(exports, "timeTuesdays", ()=>(0, _weekJs.tuesdays));
parcelHelpers.export(exports, "timeWednesday", ()=>(0, _weekJs.wednesday));
parcelHelpers.export(exports, "timeWednesdays", ()=>(0, _weekJs.wednesdays));
parcelHelpers.export(exports, "timeThursday", ()=>(0, _weekJs.thursday));
parcelHelpers.export(exports, "timeThursdays", ()=>(0, _weekJs.thursdays));
parcelHelpers.export(exports, "timeFriday", ()=>(0, _weekJs.friday));
parcelHelpers.export(exports, "timeFridays", ()=>(0, _weekJs.fridays));
parcelHelpers.export(exports, "timeSaturday", ()=>(0, _weekJs.saturday));
parcelHelpers.export(exports, "timeSaturdays", ()=>(0, _weekJs.saturdays));
parcelHelpers.export(exports, "timeMonth", ()=>(0, _monthJsDefault.default));
parcelHelpers.export(exports, "timeMonths", ()=>(0, _monthJs.months));
parcelHelpers.export(exports, "timeYear", ()=>(0, _yearJsDefault.default));
parcelHelpers.export(exports, "timeYears", ()=>(0, _yearJs.years));
parcelHelpers.export(exports, "utcMinute", ()=>(0, _utcMinuteJsDefault.default));
parcelHelpers.export(exports, "utcMinutes", ()=>(0, _utcMinuteJs.utcMinutes));
parcelHelpers.export(exports, "utcHour", ()=>(0, _utcHourJsDefault.default));
parcelHelpers.export(exports, "utcHours", ()=>(0, _utcHourJs.utcHours));
parcelHelpers.export(exports, "utcDay", ()=>(0, _utcDayJsDefault.default));
parcelHelpers.export(exports, "utcDays", ()=>(0, _utcDayJs.utcDays));
parcelHelpers.export(exports, "utcWeek", ()=>(0, _utcWeekJs.utcSunday));
parcelHelpers.export(exports, "utcWeeks", ()=>(0, _utcWeekJs.utcSundays));
parcelHelpers.export(exports, "utcSunday", ()=>(0, _utcWeekJs.utcSunday));
parcelHelpers.export(exports, "utcSundays", ()=>(0, _utcWeekJs.utcSundays));
parcelHelpers.export(exports, "utcMonday", ()=>(0, _utcWeekJs.utcMonday));
parcelHelpers.export(exports, "utcMondays", ()=>(0, _utcWeekJs.utcMondays));
parcelHelpers.export(exports, "utcTuesday", ()=>(0, _utcWeekJs.utcTuesday));
parcelHelpers.export(exports, "utcTuesdays", ()=>(0, _utcWeekJs.utcTuesdays));
parcelHelpers.export(exports, "utcWednesday", ()=>(0, _utcWeekJs.utcWednesday));
parcelHelpers.export(exports, "utcWednesdays", ()=>(0, _utcWeekJs.utcWednesdays));
parcelHelpers.export(exports, "utcThursday", ()=>(0, _utcWeekJs.utcThursday));
parcelHelpers.export(exports, "utcThursdays", ()=>(0, _utcWeekJs.utcThursdays));
parcelHelpers.export(exports, "utcFriday", ()=>(0, _utcWeekJs.utcFriday));
parcelHelpers.export(exports, "utcFridays", ()=>(0, _utcWeekJs.utcFridays));
parcelHelpers.export(exports, "utcSaturday", ()=>(0, _utcWeekJs.utcSaturday));
parcelHelpers.export(exports, "utcSaturdays", ()=>(0, _utcWeekJs.utcSaturdays));
parcelHelpers.export(exports, "utcMonth", ()=>(0, _utcMonthJsDefault.default));
parcelHelpers.export(exports, "utcMonths", ()=>(0, _utcMonthJs.utcMonths));
parcelHelpers.export(exports, "utcYear", ()=>(0, _utcYearJsDefault.default));
parcelHelpers.export(exports, "utcYears", ()=>(0, _utcYearJs.utcYears));
parcelHelpers.export(exports, "utcTicks", ()=>(0, _ticksJs.utcTicks));
parcelHelpers.export(exports, "utcTickInterval", ()=>(0, _ticksJs.utcTickInterval));
parcelHelpers.export(exports, "timeTicks", ()=>(0, _ticksJs.timeTicks));
parcelHelpers.export(exports, "timeTickInterval", ()=>(0, _ticksJs.timeTickInterval));
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);
var _millisecondJs = require("./millisecond.js");
var _millisecondJsDefault = parcelHelpers.interopDefault(_millisecondJs);
var _secondJs = require("./second.js");
var _secondJsDefault = parcelHelpers.interopDefault(_secondJs);
var _minuteJs = require("./minute.js");
var _minuteJsDefault = parcelHelpers.interopDefault(_minuteJs);
var _hourJs = require("./hour.js");
var _hourJsDefault = parcelHelpers.interopDefault(_hourJs);
var _dayJs = require("./day.js");
var _dayJsDefault = parcelHelpers.interopDefault(_dayJs);
var _weekJs = require("./week.js");
var _monthJs = require("./month.js");
var _monthJsDefault = parcelHelpers.interopDefault(_monthJs);
var _yearJs = require("./year.js");
var _yearJsDefault = parcelHelpers.interopDefault(_yearJs);
var _utcMinuteJs = require("./utcMinute.js");
var _utcMinuteJsDefault = parcelHelpers.interopDefault(_utcMinuteJs);
var _utcHourJs = require("./utcHour.js");
var _utcHourJsDefault = parcelHelpers.interopDefault(_utcHourJs);
var _utcDayJs = require("./utcDay.js");
var _utcDayJsDefault = parcelHelpers.interopDefault(_utcDayJs);
var _utcWeekJs = require("./utcWeek.js");
var _utcMonthJs = require("./utcMonth.js");
var _utcMonthJsDefault = parcelHelpers.interopDefault(_utcMonthJs);
var _utcYearJs = require("./utcYear.js");
var _utcYearJsDefault = parcelHelpers.interopDefault(_utcYearJs);
var _ticksJs = require("./ticks.js");

},{"./interval.js":false,"./millisecond.js":false,"./second.js":"4687i","./minute.js":"4fSM6","./hour.js":"hlgM0","./day.js":"6lz1o","./week.js":"ln8SQ","./month.js":"5gh3N","./year.js":"9QcRJ","./utcMinute.js":"1LaPd","./utcHour.js":"gjEyE","./utcDay.js":"5jkZB","./utcWeek.js":"1XS0i","./utcMonth.js":"iUSan","./utcYear.js":"jOGPn","./ticks.js":"lEkBt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"awz2q":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>newInterval);
var t0 = new Date, t1 = new Date;
function newInterval(floori, offseti, count, field) {
    function interval(date) {
        return floori(date = arguments.length === 0 ? new Date : new Date(+date)), date;
    }
    interval.floor = function(date) {
        return floori(date = new Date(+date)), date;
    };
    interval.ceil = function(date) {
        return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
    };
    interval.round = function(date) {
        var d0 = interval(date), d1 = interval.ceil(date);
        return date - d0 < d1 - date ? d0 : d1;
    };
    interval.offset = function(date, step) {
        return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
    };
    interval.range = function(start, stop, step) {
        var range = [], previous;
        start = interval.ceil(start);
        step = step == null ? 1 : Math.floor(step);
        if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
        do range.push(previous = new Date(+start)), offseti(start, step), floori(start);
        while (previous < start && start < stop);
        return range;
    };
    interval.filter = function(test) {
        return newInterval(function(date) {
            if (date >= date) while(floori(date), !test(date))date.setTime(date - 1);
        }, function(date, step) {
            if (date >= date) {
                if (step < 0) while(++step <= 0){
                    while(offseti(date, -1), !test(date)); // eslint-disable-line no-empty
                }
                else while(--step >= 0){
                    while(offseti(date, 1), !test(date)); // eslint-disable-line no-empty
                }
            }
        });
    };
    if (count) {
        interval.count = function(start, end) {
            t0.setTime(+start), t1.setTime(+end);
            floori(t0), floori(t1);
            return Math.floor(count(t0, t1));
        };
        interval.every = function(step) {
            step = Math.floor(step);
            return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? function(d) {
                return field(d) % step === 0;
            } : function(d) {
                return interval.count(0, d) % step === 0;
            });
        };
    }
    return interval;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9kVG9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "milliseconds", ()=>milliseconds);
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);
var millisecond = (0, _intervalJsDefault.default)(function() {
// noop
}, function(date, step) {
    date.setTime(+date + step);
}, function(start, end) {
    return end - start;
});
// An optimized implementation for this simple case.
millisecond.every = function(k) {
    k = Math.floor(k);
    if (!isFinite(k) || !(k > 0)) return null;
    if (!(k > 1)) return millisecond;
    return (0, _intervalJsDefault.default)(function(date) {
        date.setTime(Math.floor(date / k) * k);
    }, function(date, step) {
        date.setTime(+date + step * k);
    }, function(start, end) {
        return (end - start) / k;
    });
};
exports.default = millisecond;
var milliseconds = millisecond.range;

},{"./interval.js":"awz2q","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4687i":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "seconds", ()=>seconds);
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);
var _durationJs = require("./duration.js");
var second = (0, _intervalJsDefault.default)(function(date) {
    date.setTime(date - date.getMilliseconds());
}, function(date, step) {
    date.setTime(+date + step * (0, _durationJs.durationSecond));
}, function(start, end) {
    return (end - start) / (0, _durationJs.durationSecond);
}, function(date) {
    return date.getUTCSeconds();
});
exports.default = second;
var seconds = second.range;

},{"./interval.js":"awz2q","./duration.js":"7MzvX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7MzvX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "durationSecond", ()=>durationSecond);
parcelHelpers.export(exports, "durationMinute", ()=>durationMinute);
parcelHelpers.export(exports, "durationHour", ()=>durationHour);
parcelHelpers.export(exports, "durationDay", ()=>durationDay);
parcelHelpers.export(exports, "durationWeek", ()=>durationWeek);
parcelHelpers.export(exports, "durationMonth", ()=>durationMonth);
parcelHelpers.export(exports, "durationYear", ()=>durationYear);
const durationSecond = 1000;
const durationMinute = durationSecond * 60;
const durationHour = durationMinute * 60;
const durationDay = durationHour * 24;
const durationWeek = durationDay * 7;
const durationMonth = durationDay * 30;
const durationYear = durationDay * 365;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4fSM6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "minutes", ()=>minutes);
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);
var _durationJs = require("./duration.js");
var minute = (0, _intervalJsDefault.default)(function(date) {
    date.setTime(date - date.getMilliseconds() - date.getSeconds() * (0, _durationJs.durationSecond));
}, function(date, step) {
    date.setTime(+date + step * (0, _durationJs.durationMinute));
}, function(start, end) {
    return (end - start) / (0, _durationJs.durationMinute);
}, function(date) {
    return date.getMinutes();
});
exports.default = minute;
var minutes = minute.range;

},{"./interval.js":"awz2q","./duration.js":"7MzvX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hlgM0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "hours", ()=>hours);
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);
var _durationJs = require("./duration.js");
var hour = (0, _intervalJsDefault.default)(function(date) {
    date.setTime(date - date.getMilliseconds() - date.getSeconds() * (0, _durationJs.durationSecond) - date.getMinutes() * (0, _durationJs.durationMinute));
}, function(date, step) {
    date.setTime(+date + step * (0, _durationJs.durationHour));
}, function(start, end) {
    return (end - start) / (0, _durationJs.durationHour);
}, function(date) {
    return date.getHours();
});
exports.default = hour;
var hours = hour.range;

},{"./interval.js":"awz2q","./duration.js":"7MzvX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6lz1o":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "days", ()=>days);
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);
var _durationJs = require("./duration.js");
var day = (0, _intervalJsDefault.default)((date)=>date.setHours(0, 0, 0, 0), (date, step)=>date.setDate(date.getDate() + step), (start, end)=>(end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * (0, _durationJs.durationMinute)) / (0, _durationJs.durationDay), (date)=>date.getDate() - 1);
exports.default = day;
var days = day.range;

},{"./interval.js":"awz2q","./duration.js":"7MzvX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ln8SQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "sunday", ()=>sunday);
parcelHelpers.export(exports, "monday", ()=>monday);
parcelHelpers.export(exports, "tuesday", ()=>tuesday);
parcelHelpers.export(exports, "wednesday", ()=>wednesday);
parcelHelpers.export(exports, "thursday", ()=>thursday);
parcelHelpers.export(exports, "friday", ()=>friday);
parcelHelpers.export(exports, "saturday", ()=>saturday);
parcelHelpers.export(exports, "sundays", ()=>sundays);
parcelHelpers.export(exports, "mondays", ()=>mondays);
parcelHelpers.export(exports, "tuesdays", ()=>tuesdays);
parcelHelpers.export(exports, "wednesdays", ()=>wednesdays);
parcelHelpers.export(exports, "thursdays", ()=>thursdays);
parcelHelpers.export(exports, "fridays", ()=>fridays);
parcelHelpers.export(exports, "saturdays", ()=>saturdays);
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);
var _durationJs = require("./duration.js");
function weekday(i) {
    return (0, _intervalJsDefault.default)(function(date) {
        date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
        date.setHours(0, 0, 0, 0);
    }, function(date, step) {
        date.setDate(date.getDate() + step * 7);
    }, function(start, end) {
        return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * (0, _durationJs.durationMinute)) / (0, _durationJs.durationWeek);
    });
}
var sunday = weekday(0);
var monday = weekday(1);
var tuesday = weekday(2);
var wednesday = weekday(3);
var thursday = weekday(4);
var friday = weekday(5);
var saturday = weekday(6);
var sundays = sunday.range;
var mondays = monday.range;
var tuesdays = tuesday.range;
var wednesdays = wednesday.range;
var thursdays = thursday.range;
var fridays = friday.range;
var saturdays = saturday.range;

},{"./interval.js":"awz2q","./duration.js":"7MzvX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5gh3N":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "months", ()=>months);
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);
var month = (0, _intervalJsDefault.default)(function(date) {
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
}, function(date, step) {
    date.setMonth(date.getMonth() + step);
}, function(start, end) {
    return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, function(date) {
    return date.getMonth();
});
exports.default = month;
var months = month.range;

},{"./interval.js":"awz2q","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9QcRJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "years", ()=>years);
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);
var year = (0, _intervalJsDefault.default)(function(date) {
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
}, function(date, step) {
    date.setFullYear(date.getFullYear() + step);
}, function(start, end) {
    return end.getFullYear() - start.getFullYear();
}, function(date) {
    return date.getFullYear();
});
// An optimized implementation for this simple case.
year.every = function(k) {
    return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : (0, _intervalJsDefault.default)(function(date) {
        date.setFullYear(Math.floor(date.getFullYear() / k) * k);
        date.setMonth(0, 1);
        date.setHours(0, 0, 0, 0);
    }, function(date, step) {
        date.setFullYear(date.getFullYear() + step * k);
    });
};
exports.default = year;
var years = year.range;

},{"./interval.js":"awz2q","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1LaPd":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "utcMinutes", ()=>utcMinutes);
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);
var _durationJs = require("./duration.js");
var utcMinute = (0, _intervalJsDefault.default)(function(date) {
    date.setUTCSeconds(0, 0);
}, function(date, step) {
    date.setTime(+date + step * (0, _durationJs.durationMinute));
}, function(start, end) {
    return (end - start) / (0, _durationJs.durationMinute);
}, function(date) {
    return date.getUTCMinutes();
});
exports.default = utcMinute;
var utcMinutes = utcMinute.range;

},{"./interval.js":"awz2q","./duration.js":"7MzvX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gjEyE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "utcHours", ()=>utcHours);
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);
var _durationJs = require("./duration.js");
var utcHour = (0, _intervalJsDefault.default)(function(date) {
    date.setUTCMinutes(0, 0, 0);
}, function(date, step) {
    date.setTime(+date + step * (0, _durationJs.durationHour));
}, function(start, end) {
    return (end - start) / (0, _durationJs.durationHour);
}, function(date) {
    return date.getUTCHours();
});
exports.default = utcHour;
var utcHours = utcHour.range;

},{"./interval.js":"awz2q","./duration.js":"7MzvX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5jkZB":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "utcDays", ()=>utcDays);
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);
var _durationJs = require("./duration.js");
var utcDay = (0, _intervalJsDefault.default)(function(date) {
    date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step);
}, function(start, end) {
    return (end - start) / (0, _durationJs.durationDay);
}, function(date) {
    return date.getUTCDate() - 1;
});
exports.default = utcDay;
var utcDays = utcDay.range;

},{"./interval.js":"awz2q","./duration.js":"7MzvX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1XS0i":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "utcSunday", ()=>utcSunday);
parcelHelpers.export(exports, "utcMonday", ()=>utcMonday);
parcelHelpers.export(exports, "utcTuesday", ()=>utcTuesday);
parcelHelpers.export(exports, "utcWednesday", ()=>utcWednesday);
parcelHelpers.export(exports, "utcThursday", ()=>utcThursday);
parcelHelpers.export(exports, "utcFriday", ()=>utcFriday);
parcelHelpers.export(exports, "utcSaturday", ()=>utcSaturday);
parcelHelpers.export(exports, "utcSundays", ()=>utcSundays);
parcelHelpers.export(exports, "utcMondays", ()=>utcMondays);
parcelHelpers.export(exports, "utcTuesdays", ()=>utcTuesdays);
parcelHelpers.export(exports, "utcWednesdays", ()=>utcWednesdays);
parcelHelpers.export(exports, "utcThursdays", ()=>utcThursdays);
parcelHelpers.export(exports, "utcFridays", ()=>utcFridays);
parcelHelpers.export(exports, "utcSaturdays", ()=>utcSaturdays);
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);
var _durationJs = require("./duration.js");
function utcWeekday(i) {
    return (0, _intervalJsDefault.default)(function(date) {
        date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
        date.setUTCHours(0, 0, 0, 0);
    }, function(date, step) {
        date.setUTCDate(date.getUTCDate() + step * 7);
    }, function(start, end) {
        return (end - start) / (0, _durationJs.durationWeek);
    });
}
var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);
var utcSundays = utcSunday.range;
var utcMondays = utcMonday.range;
var utcTuesdays = utcTuesday.range;
var utcWednesdays = utcWednesday.range;
var utcThursdays = utcThursday.range;
var utcFridays = utcFriday.range;
var utcSaturdays = utcSaturday.range;

},{"./interval.js":"awz2q","./duration.js":"7MzvX","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iUSan":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "utcMonths", ()=>utcMonths);
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);
var utcMonth = (0, _intervalJsDefault.default)(function(date) {
    date.setUTCDate(1);
    date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
    date.setUTCMonth(date.getUTCMonth() + step);
}, function(start, end) {
    return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, function(date) {
    return date.getUTCMonth();
});
exports.default = utcMonth;
var utcMonths = utcMonth.range;

},{"./interval.js":"awz2q","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jOGPn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "utcYears", ()=>utcYears);
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);
var utcYear = (0, _intervalJsDefault.default)(function(date) {
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step);
}, function(start, end) {
    return end.getUTCFullYear() - start.getUTCFullYear();
}, function(date) {
    return date.getUTCFullYear();
});
// An optimized implementation for this simple case.
utcYear.every = function(k) {
    return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : (0, _intervalJsDefault.default)(function(date) {
        date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
        date.setUTCMonth(0, 1);
        date.setUTCHours(0, 0, 0, 0);
    }, function(date, step) {
        date.setUTCFullYear(date.getUTCFullYear() + step * k);
    });
};
exports.default = utcYear;
var utcYears = utcYear.range;

},{"./interval.js":"awz2q","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lEkBt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "utcTicks", ()=>utcTicks);
parcelHelpers.export(exports, "utcTickInterval", ()=>utcTickInterval);
parcelHelpers.export(exports, "timeTicks", ()=>timeTicks);
parcelHelpers.export(exports, "timeTickInterval", ()=>timeTickInterval);
var _d3Array = require("d3-array");
var _durationJs = require("./duration.js");
var _millisecondJs = require("./millisecond.js");
var _millisecondJsDefault = parcelHelpers.interopDefault(_millisecondJs);
var _secondJs = require("./second.js");
var _secondJsDefault = parcelHelpers.interopDefault(_secondJs);
var _minuteJs = require("./minute.js");
var _minuteJsDefault = parcelHelpers.interopDefault(_minuteJs);
var _hourJs = require("./hour.js");
var _hourJsDefault = parcelHelpers.interopDefault(_hourJs);
var _dayJs = require("./day.js");
var _dayJsDefault = parcelHelpers.interopDefault(_dayJs);
var _weekJs = require("./week.js");
var _monthJs = require("./month.js");
var _monthJsDefault = parcelHelpers.interopDefault(_monthJs);
var _yearJs = require("./year.js");
var _yearJsDefault = parcelHelpers.interopDefault(_yearJs);
var _utcMinuteJs = require("./utcMinute.js");
var _utcMinuteJsDefault = parcelHelpers.interopDefault(_utcMinuteJs);
var _utcHourJs = require("./utcHour.js");
var _utcHourJsDefault = parcelHelpers.interopDefault(_utcHourJs);
var _utcDayJs = require("./utcDay.js");
var _utcDayJsDefault = parcelHelpers.interopDefault(_utcDayJs);
var _utcWeekJs = require("./utcWeek.js");
var _utcMonthJs = require("./utcMonth.js");
var _utcMonthJsDefault = parcelHelpers.interopDefault(_utcMonthJs);
var _utcYearJs = require("./utcYear.js");
var _utcYearJsDefault = parcelHelpers.interopDefault(_utcYearJs);
function ticker(year, month, week, day, hour, minute) {
    const tickIntervals = [
        [
            (0, _secondJsDefault.default),
            1,
            (0, _durationJs.durationSecond)
        ],
        [
            (0, _secondJsDefault.default),
            5,
            5 * (0, _durationJs.durationSecond)
        ],
        [
            (0, _secondJsDefault.default),
            15,
            15 * (0, _durationJs.durationSecond)
        ],
        [
            (0, _secondJsDefault.default),
            30,
            30 * (0, _durationJs.durationSecond)
        ],
        [
            minute,
            1,
            (0, _durationJs.durationMinute)
        ],
        [
            minute,
            5,
            5 * (0, _durationJs.durationMinute)
        ],
        [
            minute,
            15,
            15 * (0, _durationJs.durationMinute)
        ],
        [
            minute,
            30,
            30 * (0, _durationJs.durationMinute)
        ],
        [
            hour,
            1,
            (0, _durationJs.durationHour)
        ],
        [
            hour,
            3,
            3 * (0, _durationJs.durationHour)
        ],
        [
            hour,
            6,
            6 * (0, _durationJs.durationHour)
        ],
        [
            hour,
            12,
            12 * (0, _durationJs.durationHour)
        ],
        [
            day,
            1,
            (0, _durationJs.durationDay)
        ],
        [
            day,
            2,
            2 * (0, _durationJs.durationDay)
        ],
        [
            week,
            1,
            (0, _durationJs.durationWeek)
        ],
        [
            month,
            1,
            (0, _durationJs.durationMonth)
        ],
        [
            month,
            3,
            3 * (0, _durationJs.durationMonth)
        ],
        [
            year,
            1,
            (0, _durationJs.durationYear)
        ]
    ];
    function ticks(start, stop, count) {
        const reverse = stop < start;
        if (reverse) [start, stop] = [
            stop,
            start
        ];
        const interval = count && typeof count.range === "function" ? count : tickInterval(start, stop, count);
        const ticks = interval ? interval.range(start, +stop + 1) : []; // inclusive stop
        return reverse ? ticks.reverse() : ticks;
    }
    function tickInterval(start, stop, count) {
        const target = Math.abs(stop - start) / count;
        const i = (0, _d3Array.bisector)(([, , step])=>step).right(tickIntervals, target);
        if (i === tickIntervals.length) return year.every((0, _d3Array.tickStep)(start / (0, _durationJs.durationYear), stop / (0, _durationJs.durationYear), count));
        if (i === 0) return (0, _millisecondJsDefault.default).every(Math.max((0, _d3Array.tickStep)(start, stop, count), 1));
        const [t, step] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
        return t.every(step);
    }
    return [
        ticks,
        tickInterval
    ];
}
const [utcTicks, utcTickInterval] = ticker((0, _utcYearJsDefault.default), (0, _utcMonthJsDefault.default), (0, _utcWeekJs.utcSunday), (0, _utcDayJsDefault.default), (0, _utcHourJsDefault.default), (0, _utcMinuteJsDefault.default));
const [timeTicks, timeTickInterval] = ticker((0, _yearJsDefault.default), (0, _monthJsDefault.default), (0, _weekJs.sunday), (0, _dayJsDefault.default), (0, _hourJsDefault.default), (0, _minuteJsDefault.default));

},{"d3-array":"1yX2W","./duration.js":"7MzvX","./millisecond.js":"9kVG9","./second.js":"4687i","./minute.js":"4fSM6","./hour.js":"hlgM0","./day.js":"6lz1o","./week.js":"ln8SQ","./month.js":"5gh3N","./year.js":"9QcRJ","./utcMinute.js":"1LaPd","./utcHour.js":"gjEyE","./utcDay.js":"5jkZB","./utcWeek.js":"1XS0i","./utcMonth.js":"iUSan","./utcYear.js":"jOGPn","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4FtNS":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "timeFormatDefaultLocale", ()=>(0, _defaultLocaleJsDefault.default));
parcelHelpers.export(exports, "timeFormat", ()=>(0, _defaultLocaleJs.timeFormat));
parcelHelpers.export(exports, "timeParse", ()=>(0, _defaultLocaleJs.timeParse));
parcelHelpers.export(exports, "utcFormat", ()=>(0, _defaultLocaleJs.utcFormat));
parcelHelpers.export(exports, "utcParse", ()=>(0, _defaultLocaleJs.utcParse));
parcelHelpers.export(exports, "timeFormatLocale", ()=>(0, _localeJsDefault.default));
parcelHelpers.export(exports, "isoFormat", ()=>(0, _isoFormatJsDefault.default));
parcelHelpers.export(exports, "isoParse", ()=>(0, _isoParseJsDefault.default));
var _defaultLocaleJs = require("./defaultLocale.js");
var _defaultLocaleJsDefault = parcelHelpers.interopDefault(_defaultLocaleJs);
var _localeJs = require("./locale.js");
var _localeJsDefault = parcelHelpers.interopDefault(_localeJs);
var _isoFormatJs = require("./isoFormat.js");
var _isoFormatJsDefault = parcelHelpers.interopDefault(_isoFormatJs);
var _isoParseJs = require("./isoParse.js");
var _isoParseJsDefault = parcelHelpers.interopDefault(_isoParseJs);

},{"./defaultLocale.js":"6OjO5","./locale.js":false,"./isoFormat.js":false,"./isoParse.js":false,"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6OjO5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "timeFormat", ()=>timeFormat);
parcelHelpers.export(exports, "timeParse", ()=>timeParse);
parcelHelpers.export(exports, "utcFormat", ()=>utcFormat);
parcelHelpers.export(exports, "utcParse", ()=>utcParse);
parcelHelpers.export(exports, "default", ()=>defaultLocale);
var _localeJs = require("./locale.js");
var _localeJsDefault = parcelHelpers.interopDefault(_localeJs);
var locale;
var timeFormat;
var timeParse;
var utcFormat;
var utcParse;
defaultLocale({
    dateTime: "%x, %X",
    date: "%-m/%-d/%Y",
    time: "%-I:%M:%S %p",
    periods: [
        "AM",
        "PM"
    ],
    days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ],
    shortDays: [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ],
    months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ],
    shortMonths: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
    ]
});
function defaultLocale(definition) {
    locale = (0, _localeJsDefault.default)(definition);
    timeFormat = locale.format;
    timeParse = locale.parse;
    utcFormat = locale.utcFormat;
    utcParse = locale.utcParse;
    return locale;
}

},{"./locale.js":"4m5qt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4m5qt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>formatLocale);
var _d3Time = require("d3-time");
function localDate(d) {
    if (0 <= d.y && d.y < 100) {
        var date = new Date(-1, d.m, d.d, d.H, d.M, d.S, d.L);
        date.setFullYear(d.y);
        return date;
    }
    return new Date(d.y, d.m, d.d, d.H, d.M, d.S, d.L);
}
function utcDate(d) {
    if (0 <= d.y && d.y < 100) {
        var date = new Date(Date.UTC(-1, d.m, d.d, d.H, d.M, d.S, d.L));
        date.setUTCFullYear(d.y);
        return date;
    }
    return new Date(Date.UTC(d.y, d.m, d.d, d.H, d.M, d.S, d.L));
}
function newDate(y, m, d) {
    return {
        y: y,
        m: m,
        d: d,
        H: 0,
        M: 0,
        S: 0,
        L: 0
    };
}
function formatLocale(locale) {
    var locale_dateTime = locale.dateTime, locale_date = locale.date, locale_time = locale.time, locale_periods = locale.periods, locale_weekdays = locale.days, locale_shortWeekdays = locale.shortDays, locale_months = locale.months, locale_shortMonths = locale.shortMonths;
    var periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths);
    var formats = {
        "a": formatShortWeekday,
        "A": formatWeekday,
        "b": formatShortMonth,
        "B": formatMonth,
        "c": null,
        "d": formatDayOfMonth,
        "e": formatDayOfMonth,
        "f": formatMicroseconds,
        "g": formatYearISO,
        "G": formatFullYearISO,
        "H": formatHour24,
        "I": formatHour12,
        "j": formatDayOfYear,
        "L": formatMilliseconds,
        "m": formatMonthNumber,
        "M": formatMinutes,
        "p": formatPeriod,
        "q": formatQuarter,
        "Q": formatUnixTimestamp,
        "s": formatUnixTimestampSeconds,
        "S": formatSeconds,
        "u": formatWeekdayNumberMonday,
        "U": formatWeekNumberSunday,
        "V": formatWeekNumberISO,
        "w": formatWeekdayNumberSunday,
        "W": formatWeekNumberMonday,
        "x": null,
        "X": null,
        "y": formatYear,
        "Y": formatFullYear,
        "Z": formatZone,
        "%": formatLiteralPercent
    };
    var utcFormats = {
        "a": formatUTCShortWeekday,
        "A": formatUTCWeekday,
        "b": formatUTCShortMonth,
        "B": formatUTCMonth,
        "c": null,
        "d": formatUTCDayOfMonth,
        "e": formatUTCDayOfMonth,
        "f": formatUTCMicroseconds,
        "g": formatUTCYearISO,
        "G": formatUTCFullYearISO,
        "H": formatUTCHour24,
        "I": formatUTCHour12,
        "j": formatUTCDayOfYear,
        "L": formatUTCMilliseconds,
        "m": formatUTCMonthNumber,
        "M": formatUTCMinutes,
        "p": formatUTCPeriod,
        "q": formatUTCQuarter,
        "Q": formatUnixTimestamp,
        "s": formatUnixTimestampSeconds,
        "S": formatUTCSeconds,
        "u": formatUTCWeekdayNumberMonday,
        "U": formatUTCWeekNumberSunday,
        "V": formatUTCWeekNumberISO,
        "w": formatUTCWeekdayNumberSunday,
        "W": formatUTCWeekNumberMonday,
        "x": null,
        "X": null,
        "y": formatUTCYear,
        "Y": formatUTCFullYear,
        "Z": formatUTCZone,
        "%": formatLiteralPercent
    };
    var parses = {
        "a": parseShortWeekday,
        "A": parseWeekday,
        "b": parseShortMonth,
        "B": parseMonth,
        "c": parseLocaleDateTime,
        "d": parseDayOfMonth,
        "e": parseDayOfMonth,
        "f": parseMicroseconds,
        "g": parseYear,
        "G": parseFullYear,
        "H": parseHour24,
        "I": parseHour24,
        "j": parseDayOfYear,
        "L": parseMilliseconds,
        "m": parseMonthNumber,
        "M": parseMinutes,
        "p": parsePeriod,
        "q": parseQuarter,
        "Q": parseUnixTimestamp,
        "s": parseUnixTimestampSeconds,
        "S": parseSeconds,
        "u": parseWeekdayNumberMonday,
        "U": parseWeekNumberSunday,
        "V": parseWeekNumberISO,
        "w": parseWeekdayNumberSunday,
        "W": parseWeekNumberMonday,
        "x": parseLocaleDate,
        "X": parseLocaleTime,
        "y": parseYear,
        "Y": parseFullYear,
        "Z": parseZone,
        "%": parseLiteralPercent
    };
    // These recursive directive definitions must be deferred.
    formats.x = newFormat(locale_date, formats);
    formats.X = newFormat(locale_time, formats);
    formats.c = newFormat(locale_dateTime, formats);
    utcFormats.x = newFormat(locale_date, utcFormats);
    utcFormats.X = newFormat(locale_time, utcFormats);
    utcFormats.c = newFormat(locale_dateTime, utcFormats);
    function newFormat(specifier, formats) {
        return function(date) {
            var string = [], i = -1, j = 0, n = specifier.length, c, pad, format;
            if (!(date instanceof Date)) date = new Date(+date);
            while(++i < n)if (specifier.charCodeAt(i) === 37) {
                string.push(specifier.slice(j, i));
                if ((pad = pads[c = specifier.charAt(++i)]) != null) c = specifier.charAt(++i);
                else pad = c === "e" ? " " : "0";
                if (format = formats[c]) c = format(date, pad);
                string.push(c);
                j = i + 1;
            }
            string.push(specifier.slice(j, i));
            return string.join("");
        };
    }
    function newParse(specifier, Z) {
        return function(string) {
            var d = newDate(1900, undefined, 1), i = parseSpecifier(d, specifier, string += "", 0), week, day;
            if (i != string.length) return null;
            // If a UNIX timestamp is specified, return it.
            if ("Q" in d) return new Date(d.Q);
            if ("s" in d) return new Date(d.s * 1000 + ("L" in d ? d.L : 0));
            // If this is utcParse, never use the local timezone.
            if (Z && !("Z" in d)) d.Z = 0;
            // The am-pm flag is 0 for AM, and 1 for PM.
            if ("p" in d) d.H = d.H % 12 + d.p * 12;
            // If the month was not specified, inherit from the quarter.
            if (d.m === undefined) d.m = "q" in d ? d.q : 0;
            // Convert day-of-week and week-of-year to day-of-year.
            if ("V" in d) {
                if (d.V < 1 || d.V > 53) return null;
                if (!("w" in d)) d.w = 1;
                if ("Z" in d) {
                    week = utcDate(newDate(d.y, 0, 1)), day = week.getUTCDay();
                    week = day > 4 || day === 0 ? (0, _d3Time.utcMonday).ceil(week) : (0, _d3Time.utcMonday)(week);
                    week = (0, _d3Time.utcDay).offset(week, (d.V - 1) * 7);
                    d.y = week.getUTCFullYear();
                    d.m = week.getUTCMonth();
                    d.d = week.getUTCDate() + (d.w + 6) % 7;
                } else {
                    week = localDate(newDate(d.y, 0, 1)), day = week.getDay();
                    week = day > 4 || day === 0 ? (0, _d3Time.timeMonday).ceil(week) : (0, _d3Time.timeMonday)(week);
                    week = (0, _d3Time.timeDay).offset(week, (d.V - 1) * 7);
                    d.y = week.getFullYear();
                    d.m = week.getMonth();
                    d.d = week.getDate() + (d.w + 6) % 7;
                }
            } else if ("W" in d || "U" in d) {
                if (!("w" in d)) d.w = "u" in d ? d.u % 7 : "W" in d ? 1 : 0;
                day = "Z" in d ? utcDate(newDate(d.y, 0, 1)).getUTCDay() : localDate(newDate(d.y, 0, 1)).getDay();
                d.m = 0;
                d.d = "W" in d ? (d.w + 6) % 7 + d.W * 7 - (day + 5) % 7 : d.w + d.U * 7 - (day + 6) % 7;
            }
            // If a time zone is specified, all fields are interpreted as UTC and then
            // offset according to the specified time zone.
            if ("Z" in d) {
                d.H += d.Z / 100 | 0;
                d.M += d.Z % 100;
                return utcDate(d);
            }
            // Otherwise, all fields are in local time.
            return localDate(d);
        };
    }
    function parseSpecifier(d, specifier, string, j) {
        var i = 0, n = specifier.length, m = string.length, c, parse;
        while(i < n){
            if (j >= m) return -1;
            c = specifier.charCodeAt(i++);
            if (c === 37) {
                c = specifier.charAt(i++);
                parse = parses[c in pads ? specifier.charAt(i++) : c];
                if (!parse || (j = parse(d, string, j)) < 0) return -1;
            } else if (c != string.charCodeAt(j++)) return -1;
        }
        return j;
    }
    function parsePeriod(d, string, i) {
        var n = periodRe.exec(string.slice(i));
        return n ? (d.p = periodLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }
    function parseShortWeekday(d, string, i) {
        var n = shortWeekdayRe.exec(string.slice(i));
        return n ? (d.w = shortWeekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }
    function parseWeekday(d, string, i) {
        var n = weekdayRe.exec(string.slice(i));
        return n ? (d.w = weekdayLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }
    function parseShortMonth(d, string, i) {
        var n = shortMonthRe.exec(string.slice(i));
        return n ? (d.m = shortMonthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }
    function parseMonth(d, string, i) {
        var n = monthRe.exec(string.slice(i));
        return n ? (d.m = monthLookup[n[0].toLowerCase()], i + n[0].length) : -1;
    }
    function parseLocaleDateTime(d, string, i) {
        return parseSpecifier(d, locale_dateTime, string, i);
    }
    function parseLocaleDate(d, string, i) {
        return parseSpecifier(d, locale_date, string, i);
    }
    function parseLocaleTime(d, string, i) {
        return parseSpecifier(d, locale_time, string, i);
    }
    function formatShortWeekday(d) {
        return locale_shortWeekdays[d.getDay()];
    }
    function formatWeekday(d) {
        return locale_weekdays[d.getDay()];
    }
    function formatShortMonth(d) {
        return locale_shortMonths[d.getMonth()];
    }
    function formatMonth(d) {
        return locale_months[d.getMonth()];
    }
    function formatPeriod(d) {
        return locale_periods[+(d.getHours() >= 12)];
    }
    function formatQuarter(d) {
        return 1 + ~~(d.getMonth() / 3);
    }
    function formatUTCShortWeekday(d) {
        return locale_shortWeekdays[d.getUTCDay()];
    }
    function formatUTCWeekday(d) {
        return locale_weekdays[d.getUTCDay()];
    }
    function formatUTCShortMonth(d) {
        return locale_shortMonths[d.getUTCMonth()];
    }
    function formatUTCMonth(d) {
        return locale_months[d.getUTCMonth()];
    }
    function formatUTCPeriod(d) {
        return locale_periods[+(d.getUTCHours() >= 12)];
    }
    function formatUTCQuarter(d) {
        return 1 + ~~(d.getUTCMonth() / 3);
    }
    return {
        format: function(specifier) {
            var f = newFormat(specifier += "", formats);
            f.toString = function() {
                return specifier;
            };
            return f;
        },
        parse: function(specifier) {
            var p = newParse(specifier += "", false);
            p.toString = function() {
                return specifier;
            };
            return p;
        },
        utcFormat: function(specifier) {
            var f = newFormat(specifier += "", utcFormats);
            f.toString = function() {
                return specifier;
            };
            return f;
        },
        utcParse: function(specifier) {
            var p = newParse(specifier += "", true);
            p.toString = function() {
                return specifier;
            };
            return p;
        }
    };
}
var pads = {
    "-": "",
    "_": " ",
    "0": "0"
}, numberRe = /^\s*\d+/, percentRe = /^%/, requoteRe = /[\\^$*+?|[\]().{}]/g;
function pad(value, fill, width) {
    var sign = value < 0 ? "-" : "", string = (sign ? -value : value) + "", length = string.length;
    return sign + (length < width ? new Array(width - length + 1).join(fill) + string : string);
}
function requote(s) {
    return s.replace(requoteRe, "\\$&");
}
function formatRe(names) {
    return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}
function formatLookup(names) {
    var map = {}, i = -1, n = names.length;
    while(++i < n)map[names[i].toLowerCase()] = i;
    return map;
}
function parseWeekdayNumberSunday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.w = +n[0], i + n[0].length) : -1;
}
function parseWeekdayNumberMonday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.u = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberSunday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.U = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberISO(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.V = +n[0], i + n[0].length) : -1;
}
function parseWeekNumberMonday(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.W = +n[0], i + n[0].length) : -1;
}
function parseFullYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 4));
    return n ? (d.y = +n[0], i + n[0].length) : -1;
}
function parseYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.y = +n[0] + (+n[0] > 68 ? 1900 : 2000), i + n[0].length) : -1;
}
function parseZone(d, string, i) {
    var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string.slice(i, i + 6));
    return n ? (d.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), i + n[0].length) : -1;
}
function parseQuarter(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 1));
    return n ? (d.q = n[0] * 3 - 3, i + n[0].length) : -1;
}
function parseMonthNumber(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.m = n[0] - 1, i + n[0].length) : -1;
}
function parseDayOfMonth(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.d = +n[0], i + n[0].length) : -1;
}
function parseDayOfYear(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.m = 0, d.d = +n[0], i + n[0].length) : -1;
}
function parseHour24(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.H = +n[0], i + n[0].length) : -1;
}
function parseMinutes(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.M = +n[0], i + n[0].length) : -1;
}
function parseSeconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 2));
    return n ? (d.S = +n[0], i + n[0].length) : -1;
}
function parseMilliseconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 3));
    return n ? (d.L = +n[0], i + n[0].length) : -1;
}
function parseMicroseconds(d, string, i) {
    var n = numberRe.exec(string.slice(i, i + 6));
    return n ? (d.L = Math.floor(n[0] / 1000), i + n[0].length) : -1;
}
function parseLiteralPercent(d, string, i) {
    var n = percentRe.exec(string.slice(i, i + 1));
    return n ? i + n[0].length : -1;
}
function parseUnixTimestamp(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.Q = +n[0], i + n[0].length) : -1;
}
function parseUnixTimestampSeconds(d, string, i) {
    var n = numberRe.exec(string.slice(i));
    return n ? (d.s = +n[0], i + n[0].length) : -1;
}
function formatDayOfMonth(d, p) {
    return pad(d.getDate(), p, 2);
}
function formatHour24(d, p) {
    return pad(d.getHours(), p, 2);
}
function formatHour12(d, p) {
    return pad(d.getHours() % 12 || 12, p, 2);
}
function formatDayOfYear(d, p) {
    return pad(1 + (0, _d3Time.timeDay).count((0, _d3Time.timeYear)(d), d), p, 3);
}
function formatMilliseconds(d, p) {
    return pad(d.getMilliseconds(), p, 3);
}
function formatMicroseconds(d, p) {
    return formatMilliseconds(d, p) + "000";
}
function formatMonthNumber(d, p) {
    return pad(d.getMonth() + 1, p, 2);
}
function formatMinutes(d, p) {
    return pad(d.getMinutes(), p, 2);
}
function formatSeconds(d, p) {
    return pad(d.getSeconds(), p, 2);
}
function formatWeekdayNumberMonday(d) {
    var day = d.getDay();
    return day === 0 ? 7 : day;
}
function formatWeekNumberSunday(d, p) {
    return pad((0, _d3Time.timeSunday).count((0, _d3Time.timeYear)(d) - 1, d), p, 2);
}
function dISO(d) {
    var day = d.getDay();
    return day >= 4 || day === 0 ? (0, _d3Time.timeThursday)(d) : (0, _d3Time.timeThursday).ceil(d);
}
function formatWeekNumberISO(d, p) {
    d = dISO(d);
    return pad((0, _d3Time.timeThursday).count((0, _d3Time.timeYear)(d), d) + ((0, _d3Time.timeYear)(d).getDay() === 4), p, 2);
}
function formatWeekdayNumberSunday(d) {
    return d.getDay();
}
function formatWeekNumberMonday(d, p) {
    return pad((0, _d3Time.timeMonday).count((0, _d3Time.timeYear)(d) - 1, d), p, 2);
}
function formatYear(d, p) {
    return pad(d.getFullYear() % 100, p, 2);
}
function formatYearISO(d, p) {
    d = dISO(d);
    return pad(d.getFullYear() % 100, p, 2);
}
function formatFullYear(d, p) {
    return pad(d.getFullYear() % 10000, p, 4);
}
function formatFullYearISO(d, p) {
    var day = d.getDay();
    d = day >= 4 || day === 0 ? (0, _d3Time.timeThursday)(d) : (0, _d3Time.timeThursday).ceil(d);
    return pad(d.getFullYear() % 10000, p, 4);
}
function formatZone(d) {
    var z = d.getTimezoneOffset();
    return (z > 0 ? "-" : (z *= -1, "+")) + pad(z / 60 | 0, "0", 2) + pad(z % 60, "0", 2);
}
function formatUTCDayOfMonth(d, p) {
    return pad(d.getUTCDate(), p, 2);
}
function formatUTCHour24(d, p) {
    return pad(d.getUTCHours(), p, 2);
}
function formatUTCHour12(d, p) {
    return pad(d.getUTCHours() % 12 || 12, p, 2);
}
function formatUTCDayOfYear(d, p) {
    return pad(1 + (0, _d3Time.utcDay).count((0, _d3Time.utcYear)(d), d), p, 3);
}
function formatUTCMilliseconds(d, p) {
    return pad(d.getUTCMilliseconds(), p, 3);
}
function formatUTCMicroseconds(d, p) {
    return formatUTCMilliseconds(d, p) + "000";
}
function formatUTCMonthNumber(d, p) {
    return pad(d.getUTCMonth() + 1, p, 2);
}
function formatUTCMinutes(d, p) {
    return pad(d.getUTCMinutes(), p, 2);
}
function formatUTCSeconds(d, p) {
    return pad(d.getUTCSeconds(), p, 2);
}
function formatUTCWeekdayNumberMonday(d) {
    var dow = d.getUTCDay();
    return dow === 0 ? 7 : dow;
}
function formatUTCWeekNumberSunday(d, p) {
    return pad((0, _d3Time.utcSunday).count((0, _d3Time.utcYear)(d) - 1, d), p, 2);
}
function UTCdISO(d) {
    var day = d.getUTCDay();
    return day >= 4 || day === 0 ? (0, _d3Time.utcThursday)(d) : (0, _d3Time.utcThursday).ceil(d);
}
function formatUTCWeekNumberISO(d, p) {
    d = UTCdISO(d);
    return pad((0, _d3Time.utcThursday).count((0, _d3Time.utcYear)(d), d) + ((0, _d3Time.utcYear)(d).getUTCDay() === 4), p, 2);
}
function formatUTCWeekdayNumberSunday(d) {
    return d.getUTCDay();
}
function formatUTCWeekNumberMonday(d, p) {
    return pad((0, _d3Time.utcMonday).count((0, _d3Time.utcYear)(d) - 1, d), p, 2);
}
function formatUTCYear(d, p) {
    return pad(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCYearISO(d, p) {
    d = UTCdISO(d);
    return pad(d.getUTCFullYear() % 100, p, 2);
}
function formatUTCFullYear(d, p) {
    return pad(d.getUTCFullYear() % 10000, p, 4);
}
function formatUTCFullYearISO(d, p) {
    var day = d.getUTCDay();
    d = day >= 4 || day === 0 ? (0, _d3Time.utcThursday)(d) : (0, _d3Time.utcThursday).ceil(d);
    return pad(d.getUTCFullYear() % 10000, p, 4);
}
function formatUTCZone() {
    return "+0000";
}
function formatLiteralPercent() {
    return "%";
}
function formatUnixTimestamp(d) {
    return +d;
}
function formatUnixTimestampSeconds(d) {
    return Math.floor(+d / 1000);
}

},{"d3-time":"1UOEe","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1UOEe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "timeInterval", ()=>(0, _intervalJsDefault.default));
parcelHelpers.export(exports, "timeMillisecond", ()=>(0, _millisecondJsDefault.default));
parcelHelpers.export(exports, "timeMilliseconds", ()=>(0, _millisecondJs.milliseconds));
parcelHelpers.export(exports, "utcMillisecond", ()=>(0, _millisecondJsDefault.default));
parcelHelpers.export(exports, "utcMilliseconds", ()=>(0, _millisecondJs.milliseconds));
parcelHelpers.export(exports, "timeSecond", ()=>(0, _secondJsDefault.default));
parcelHelpers.export(exports, "timeSeconds", ()=>(0, _secondJs.seconds));
parcelHelpers.export(exports, "utcSecond", ()=>(0, _secondJsDefault.default));
parcelHelpers.export(exports, "utcSeconds", ()=>(0, _secondJs.seconds));
parcelHelpers.export(exports, "timeMinute", ()=>(0, _minuteJsDefault.default));
parcelHelpers.export(exports, "timeMinutes", ()=>(0, _minuteJs.minutes));
parcelHelpers.export(exports, "timeHour", ()=>(0, _hourJsDefault.default));
parcelHelpers.export(exports, "timeHours", ()=>(0, _hourJs.hours));
parcelHelpers.export(exports, "timeDay", ()=>(0, _dayJsDefault.default));
parcelHelpers.export(exports, "timeDays", ()=>(0, _dayJs.days));
parcelHelpers.export(exports, "timeWeek", ()=>(0, _weekJs.sunday));
parcelHelpers.export(exports, "timeWeeks", ()=>(0, _weekJs.sundays));
parcelHelpers.export(exports, "timeSunday", ()=>(0, _weekJs.sunday));
parcelHelpers.export(exports, "timeSundays", ()=>(0, _weekJs.sundays));
parcelHelpers.export(exports, "timeMonday", ()=>(0, _weekJs.monday));
parcelHelpers.export(exports, "timeMondays", ()=>(0, _weekJs.mondays));
parcelHelpers.export(exports, "timeTuesday", ()=>(0, _weekJs.tuesday));
parcelHelpers.export(exports, "timeTuesdays", ()=>(0, _weekJs.tuesdays));
parcelHelpers.export(exports, "timeWednesday", ()=>(0, _weekJs.wednesday));
parcelHelpers.export(exports, "timeWednesdays", ()=>(0, _weekJs.wednesdays));
parcelHelpers.export(exports, "timeThursday", ()=>(0, _weekJs.thursday));
parcelHelpers.export(exports, "timeThursdays", ()=>(0, _weekJs.thursdays));
parcelHelpers.export(exports, "timeFriday", ()=>(0, _weekJs.friday));
parcelHelpers.export(exports, "timeFridays", ()=>(0, _weekJs.fridays));
parcelHelpers.export(exports, "timeSaturday", ()=>(0, _weekJs.saturday));
parcelHelpers.export(exports, "timeSaturdays", ()=>(0, _weekJs.saturdays));
parcelHelpers.export(exports, "timeMonth", ()=>(0, _monthJsDefault.default));
parcelHelpers.export(exports, "timeMonths", ()=>(0, _monthJs.months));
parcelHelpers.export(exports, "timeYear", ()=>(0, _yearJsDefault.default));
parcelHelpers.export(exports, "timeYears", ()=>(0, _yearJs.years));
parcelHelpers.export(exports, "utcMinute", ()=>(0, _utcMinuteJsDefault.default));
parcelHelpers.export(exports, "utcMinutes", ()=>(0, _utcMinuteJs.utcMinutes));
parcelHelpers.export(exports, "utcHour", ()=>(0, _utcHourJsDefault.default));
parcelHelpers.export(exports, "utcHours", ()=>(0, _utcHourJs.utcHours));
parcelHelpers.export(exports, "utcDay", ()=>(0, _utcDayJsDefault.default));
parcelHelpers.export(exports, "utcDays", ()=>(0, _utcDayJs.utcDays));
parcelHelpers.export(exports, "utcWeek", ()=>(0, _utcWeekJs.utcSunday));
parcelHelpers.export(exports, "utcWeeks", ()=>(0, _utcWeekJs.utcSundays));
parcelHelpers.export(exports, "utcSunday", ()=>(0, _utcWeekJs.utcSunday));
parcelHelpers.export(exports, "utcSundays", ()=>(0, _utcWeekJs.utcSundays));
parcelHelpers.export(exports, "utcMonday", ()=>(0, _utcWeekJs.utcMonday));
parcelHelpers.export(exports, "utcMondays", ()=>(0, _utcWeekJs.utcMondays));
parcelHelpers.export(exports, "utcTuesday", ()=>(0, _utcWeekJs.utcTuesday));
parcelHelpers.export(exports, "utcTuesdays", ()=>(0, _utcWeekJs.utcTuesdays));
parcelHelpers.export(exports, "utcWednesday", ()=>(0, _utcWeekJs.utcWednesday));
parcelHelpers.export(exports, "utcWednesdays", ()=>(0, _utcWeekJs.utcWednesdays));
parcelHelpers.export(exports, "utcThursday", ()=>(0, _utcWeekJs.utcThursday));
parcelHelpers.export(exports, "utcThursdays", ()=>(0, _utcWeekJs.utcThursdays));
parcelHelpers.export(exports, "utcFriday", ()=>(0, _utcWeekJs.utcFriday));
parcelHelpers.export(exports, "utcFridays", ()=>(0, _utcWeekJs.utcFridays));
parcelHelpers.export(exports, "utcSaturday", ()=>(0, _utcWeekJs.utcSaturday));
parcelHelpers.export(exports, "utcSaturdays", ()=>(0, _utcWeekJs.utcSaturdays));
parcelHelpers.export(exports, "utcMonth", ()=>(0, _utcMonthJsDefault.default));
parcelHelpers.export(exports, "utcMonths", ()=>(0, _utcMonthJs.utcMonths));
parcelHelpers.export(exports, "utcYear", ()=>(0, _utcYearJsDefault.default));
parcelHelpers.export(exports, "utcYears", ()=>(0, _utcYearJs.utcYears));
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);
var _millisecondJs = require("./millisecond.js");
var _millisecondJsDefault = parcelHelpers.interopDefault(_millisecondJs);
var _secondJs = require("./second.js");
var _secondJsDefault = parcelHelpers.interopDefault(_secondJs);
var _minuteJs = require("./minute.js");
var _minuteJsDefault = parcelHelpers.interopDefault(_minuteJs);
var _hourJs = require("./hour.js");
var _hourJsDefault = parcelHelpers.interopDefault(_hourJs);
var _dayJs = require("./day.js");
var _dayJsDefault = parcelHelpers.interopDefault(_dayJs);
var _weekJs = require("./week.js");
var _monthJs = require("./month.js");
var _monthJsDefault = parcelHelpers.interopDefault(_monthJs);
var _yearJs = require("./year.js");
var _yearJsDefault = parcelHelpers.interopDefault(_yearJs);
var _utcMinuteJs = require("./utcMinute.js");
var _utcMinuteJsDefault = parcelHelpers.interopDefault(_utcMinuteJs);
var _utcHourJs = require("./utcHour.js");
var _utcHourJsDefault = parcelHelpers.interopDefault(_utcHourJs);
var _utcDayJs = require("./utcDay.js");
var _utcDayJsDefault = parcelHelpers.interopDefault(_utcDayJs);
var _utcWeekJs = require("./utcWeek.js");
var _utcMonthJs = require("./utcMonth.js");
var _utcMonthJsDefault = parcelHelpers.interopDefault(_utcMonthJs);
var _utcYearJs = require("./utcYear.js");
var _utcYearJsDefault = parcelHelpers.interopDefault(_utcYearJs);

},{"./interval.js":false,"./millisecond.js":false,"./second.js":false,"./minute.js":false,"./hour.js":false,"./day.js":"1U9Pq","./week.js":"lmrQt","./month.js":false,"./year.js":"d9SS9","./utcMinute.js":false,"./utcHour.js":false,"./utcDay.js":"liE20","./utcWeek.js":"gAbkz","./utcMonth.js":false,"./utcYear.js":"9p6NU","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jfgl3":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>newInterval);
var t0 = new Date, t1 = new Date;
function newInterval(floori, offseti, count, field) {
    function interval(date) {
        return floori(date = arguments.length === 0 ? new Date : new Date(+date)), date;
    }
    interval.floor = function(date) {
        return floori(date = new Date(+date)), date;
    };
    interval.ceil = function(date) {
        return floori(date = new Date(date - 1)), offseti(date, 1), floori(date), date;
    };
    interval.round = function(date) {
        var d0 = interval(date), d1 = interval.ceil(date);
        return date - d0 < d1 - date ? d0 : d1;
    };
    interval.offset = function(date, step) {
        return offseti(date = new Date(+date), step == null ? 1 : Math.floor(step)), date;
    };
    interval.range = function(start, stop, step) {
        var range = [], previous;
        start = interval.ceil(start);
        step = step == null ? 1 : Math.floor(step);
        if (!(start < stop) || !(step > 0)) return range; // also handles Invalid Date
        do range.push(previous = new Date(+start)), offseti(start, step), floori(start);
        while (previous < start && start < stop);
        return range;
    };
    interval.filter = function(test) {
        return newInterval(function(date) {
            if (date >= date) while(floori(date), !test(date))date.setTime(date - 1);
        }, function(date, step) {
            if (date >= date) {
                if (step < 0) while(++step <= 0){
                    while(offseti(date, -1), !test(date)); // eslint-disable-line no-empty
                }
                else while(--step >= 0){
                    while(offseti(date, 1), !test(date)); // eslint-disable-line no-empty
                }
            }
        });
    };
    if (count) {
        interval.count = function(start, end) {
            t0.setTime(+start), t1.setTime(+end);
            floori(t0), floori(t1);
            return Math.floor(count(t0, t1));
        };
        interval.every = function(step) {
            step = Math.floor(step);
            return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? function(d) {
                return field(d) % step === 0;
            } : function(d) {
                return interval.count(0, d) % step === 0;
            });
        };
    }
    return interval;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1U9Pq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "days", ()=>days);
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);
var _durationJs = require("./duration.js");
var day = (0, _intervalJsDefault.default)(function(date) {
    date.setHours(0, 0, 0, 0);
}, function(date, step) {
    date.setDate(date.getDate() + step);
}, function(start, end) {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * (0, _durationJs.durationMinute)) / (0, _durationJs.durationDay);
}, function(date) {
    return date.getDate() - 1;
});
exports.default = day;
var days = day.range;

},{"./interval.js":"jfgl3","./duration.js":"iEiGQ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iEiGQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "durationSecond", ()=>durationSecond);
parcelHelpers.export(exports, "durationMinute", ()=>durationMinute);
parcelHelpers.export(exports, "durationHour", ()=>durationHour);
parcelHelpers.export(exports, "durationDay", ()=>durationDay);
parcelHelpers.export(exports, "durationWeek", ()=>durationWeek);
var durationSecond = 1e3;
var durationMinute = 6e4;
var durationHour = 36e5;
var durationDay = 864e5;
var durationWeek = 6048e5;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lmrQt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "sunday", ()=>sunday);
parcelHelpers.export(exports, "monday", ()=>monday);
parcelHelpers.export(exports, "tuesday", ()=>tuesday);
parcelHelpers.export(exports, "wednesday", ()=>wednesday);
parcelHelpers.export(exports, "thursday", ()=>thursday);
parcelHelpers.export(exports, "friday", ()=>friday);
parcelHelpers.export(exports, "saturday", ()=>saturday);
parcelHelpers.export(exports, "sundays", ()=>sundays);
parcelHelpers.export(exports, "mondays", ()=>mondays);
parcelHelpers.export(exports, "tuesdays", ()=>tuesdays);
parcelHelpers.export(exports, "wednesdays", ()=>wednesdays);
parcelHelpers.export(exports, "thursdays", ()=>thursdays);
parcelHelpers.export(exports, "fridays", ()=>fridays);
parcelHelpers.export(exports, "saturdays", ()=>saturdays);
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);
var _durationJs = require("./duration.js");
function weekday(i) {
    return (0, _intervalJsDefault.default)(function(date) {
        date.setDate(date.getDate() - (date.getDay() + 7 - i) % 7);
        date.setHours(0, 0, 0, 0);
    }, function(date, step) {
        date.setDate(date.getDate() + step * 7);
    }, function(start, end) {
        return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * (0, _durationJs.durationMinute)) / (0, _durationJs.durationWeek);
    });
}
var sunday = weekday(0);
var monday = weekday(1);
var tuesday = weekday(2);
var wednesday = weekday(3);
var thursday = weekday(4);
var friday = weekday(5);
var saturday = weekday(6);
var sundays = sunday.range;
var mondays = monday.range;
var tuesdays = tuesday.range;
var wednesdays = wednesday.range;
var thursdays = thursday.range;
var fridays = friday.range;
var saturdays = saturday.range;

},{"./interval.js":"jfgl3","./duration.js":"iEiGQ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"d9SS9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "years", ()=>years);
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);
var year = (0, _intervalJsDefault.default)(function(date) {
    date.setMonth(0, 1);
    date.setHours(0, 0, 0, 0);
}, function(date, step) {
    date.setFullYear(date.getFullYear() + step);
}, function(start, end) {
    return end.getFullYear() - start.getFullYear();
}, function(date) {
    return date.getFullYear();
});
// An optimized implementation for this simple case.
year.every = function(k) {
    return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : (0, _intervalJsDefault.default)(function(date) {
        date.setFullYear(Math.floor(date.getFullYear() / k) * k);
        date.setMonth(0, 1);
        date.setHours(0, 0, 0, 0);
    }, function(date, step) {
        date.setFullYear(date.getFullYear() + step * k);
    });
};
exports.default = year;
var years = year.range;

},{"./interval.js":"jfgl3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"liE20":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "utcDays", ()=>utcDays);
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);
var _durationJs = require("./duration.js");
var utcDay = (0, _intervalJsDefault.default)(function(date) {
    date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
    date.setUTCDate(date.getUTCDate() + step);
}, function(start, end) {
    return (end - start) / (0, _durationJs.durationDay);
}, function(date) {
    return date.getUTCDate() - 1;
});
exports.default = utcDay;
var utcDays = utcDay.range;

},{"./interval.js":"jfgl3","./duration.js":"iEiGQ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gAbkz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "utcSunday", ()=>utcSunday);
parcelHelpers.export(exports, "utcMonday", ()=>utcMonday);
parcelHelpers.export(exports, "utcTuesday", ()=>utcTuesday);
parcelHelpers.export(exports, "utcWednesday", ()=>utcWednesday);
parcelHelpers.export(exports, "utcThursday", ()=>utcThursday);
parcelHelpers.export(exports, "utcFriday", ()=>utcFriday);
parcelHelpers.export(exports, "utcSaturday", ()=>utcSaturday);
parcelHelpers.export(exports, "utcSundays", ()=>utcSundays);
parcelHelpers.export(exports, "utcMondays", ()=>utcMondays);
parcelHelpers.export(exports, "utcTuesdays", ()=>utcTuesdays);
parcelHelpers.export(exports, "utcWednesdays", ()=>utcWednesdays);
parcelHelpers.export(exports, "utcThursdays", ()=>utcThursdays);
parcelHelpers.export(exports, "utcFridays", ()=>utcFridays);
parcelHelpers.export(exports, "utcSaturdays", ()=>utcSaturdays);
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);
var _durationJs = require("./duration.js");
function utcWeekday(i) {
    return (0, _intervalJsDefault.default)(function(date) {
        date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 7 - i) % 7);
        date.setUTCHours(0, 0, 0, 0);
    }, function(date, step) {
        date.setUTCDate(date.getUTCDate() + step * 7);
    }, function(start, end) {
        return (end - start) / (0, _durationJs.durationWeek);
    });
}
var utcSunday = utcWeekday(0);
var utcMonday = utcWeekday(1);
var utcTuesday = utcWeekday(2);
var utcWednesday = utcWeekday(3);
var utcThursday = utcWeekday(4);
var utcFriday = utcWeekday(5);
var utcSaturday = utcWeekday(6);
var utcSundays = utcSunday.range;
var utcMondays = utcMonday.range;
var utcTuesdays = utcTuesday.range;
var utcWednesdays = utcWednesday.range;
var utcThursdays = utcThursday.range;
var utcFridays = utcFriday.range;
var utcSaturdays = utcSaturday.range;

},{"./interval.js":"jfgl3","./duration.js":"iEiGQ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9p6NU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "utcYears", ()=>utcYears);
var _intervalJs = require("./interval.js");
var _intervalJsDefault = parcelHelpers.interopDefault(_intervalJs);
var utcYear = (0, _intervalJsDefault.default)(function(date) {
    date.setUTCMonth(0, 1);
    date.setUTCHours(0, 0, 0, 0);
}, function(date, step) {
    date.setUTCFullYear(date.getUTCFullYear() + step);
}, function(start, end) {
    return end.getUTCFullYear() - start.getUTCFullYear();
}, function(date) {
    return date.getUTCFullYear();
});
// An optimized implementation for this simple case.
utcYear.every = function(k) {
    return !isFinite(k = Math.floor(k)) || !(k > 0) ? null : (0, _intervalJsDefault.default)(function(date) {
        date.setUTCFullYear(Math.floor(date.getUTCFullYear() / k) * k);
        date.setUTCMonth(0, 1);
        date.setUTCHours(0, 0, 0, 0);
    }, function(date, step) {
        date.setUTCFullYear(date.getUTCFullYear() + step * k);
    });
};
exports.default = utcYear;
var utcYears = utcYear.range;

},{"./interval.js":"jfgl3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6ufv7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>utcTime);
var _d3Time = require("d3-time");
var _d3TimeFormat = require("d3-time-format");
var _timeJs = require("./time.js");
var _initJs = require("./init.js");
function utcTime() {
    return (0, _initJs.initRange).apply((0, _timeJs.calendar)((0, _d3Time.utcTicks), (0, _d3Time.utcTickInterval), (0, _d3Time.utcYear), (0, _d3Time.utcMonth), (0, _d3Time.utcWeek), (0, _d3Time.utcDay), (0, _d3Time.utcHour), (0, _d3Time.utcMinute), (0, _d3Time.utcSecond), (0, _d3TimeFormat.utcFormat)).domain([
        Date.UTC(2000, 0, 1),
        Date.UTC(2000, 0, 2)
    ]), arguments);
}

},{"d3-time":"2Gldv","d3-time-format":"4FtNS","./time.js":"7UVid","./init.js":"kp8lc","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aMNy9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "copy", ()=>copy);
parcelHelpers.export(exports, "default", ()=>sequential);
parcelHelpers.export(exports, "sequentialLog", ()=>sequentialLog);
parcelHelpers.export(exports, "sequentialSymlog", ()=>sequentialSymlog);
parcelHelpers.export(exports, "sequentialPow", ()=>sequentialPow);
parcelHelpers.export(exports, "sequentialSqrt", ()=>sequentialSqrt);
var _d3Interpolate = require("d3-interpolate");
var _continuousJs = require("./continuous.js");
var _initJs = require("./init.js");
var _linearJs = require("./linear.js");
var _logJs = require("./log.js");
var _symlogJs = require("./symlog.js");
var _powJs = require("./pow.js");
function transformer() {
    var x0 = 0, x1 = 1, t0, t1, k10, transform, interpolator = (0, _continuousJs.identity), clamp = false, unknown;
    function scale(x) {
        return x == null || isNaN(x = +x) ? unknown : interpolator(k10 === 0 ? 0.5 : (x = (transform(x) - t0) * k10, clamp ? Math.max(0, Math.min(1, x)) : x));
    }
    scale.domain = function(_) {
        return arguments.length ? ([x0, x1] = _, t0 = transform(x0 = +x0), t1 = transform(x1 = +x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0), scale) : [
            x0,
            x1
        ];
    };
    scale.clamp = function(_) {
        return arguments.length ? (clamp = !!_, scale) : clamp;
    };
    scale.interpolator = function(_) {
        return arguments.length ? (interpolator = _, scale) : interpolator;
    };
    function range(interpolate) {
        return function(_) {
            var r0, r1;
            return arguments.length ? ([r0, r1] = _, interpolator = interpolate(r0, r1), scale) : [
                interpolator(0),
                interpolator(1)
            ];
        };
    }
    scale.range = range((0, _d3Interpolate.interpolate));
    scale.rangeRound = range((0, _d3Interpolate.interpolateRound));
    scale.unknown = function(_) {
        return arguments.length ? (unknown = _, scale) : unknown;
    };
    return function(t) {
        transform = t, t0 = t(x0), t1 = t(x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0);
        return scale;
    };
}
function copy(source, target) {
    return target.domain(source.domain()).interpolator(source.interpolator()).clamp(source.clamp()).unknown(source.unknown());
}
function sequential() {
    var scale = (0, _linearJs.linearish)(transformer()((0, _continuousJs.identity)));
    scale.copy = function() {
        return copy(scale, sequential());
    };
    return (0, _initJs.initInterpolator).apply(scale, arguments);
}
function sequentialLog() {
    var scale = (0, _logJs.loggish)(transformer()).domain([
        1,
        10
    ]);
    scale.copy = function() {
        return copy(scale, sequentialLog()).base(scale.base());
    };
    return (0, _initJs.initInterpolator).apply(scale, arguments);
}
function sequentialSymlog() {
    var scale = (0, _symlogJs.symlogish)(transformer());
    scale.copy = function() {
        return copy(scale, sequentialSymlog()).constant(scale.constant());
    };
    return (0, _initJs.initInterpolator).apply(scale, arguments);
}
function sequentialPow() {
    var scale = (0, _powJs.powish)(transformer());
    scale.copy = function() {
        return copy(scale, sequentialPow()).exponent(scale.exponent());
    };
    return (0, _initJs.initInterpolator).apply(scale, arguments);
}
function sequentialSqrt() {
    return sequentialPow.apply(null, arguments).exponent(0.5);
}

},{"d3-interpolate":"6jJyi","./continuous.js":"1LsCM","./init.js":"kp8lc","./linear.js":"lob4K","./log.js":"z4t8s","./symlog.js":"4KiG8","./pow.js":"jVG8A","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"esKgz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>sequentialQuantile);
var _d3Array = require("d3-array");
var _continuousJs = require("./continuous.js");
var _initJs = require("./init.js");
function sequentialQuantile() {
    var domain = [], interpolator = (0, _continuousJs.identity);
    function scale(x) {
        if (x != null && !isNaN(x = +x)) return interpolator(((0, _d3Array.bisect)(domain, x, 1) - 1) / (domain.length - 1));
    }
    scale.domain = function(_) {
        if (!arguments.length) return domain.slice();
        domain = [];
        for (let d of _)if (d != null && !isNaN(d = +d)) domain.push(d);
        domain.sort((0, _d3Array.ascending));
        return scale;
    };
    scale.interpolator = function(_) {
        return arguments.length ? (interpolator = _, scale) : interpolator;
    };
    scale.range = function() {
        return domain.map((d, i)=>interpolator(i / (domain.length - 1)));
    };
    scale.quantiles = function(n) {
        return Array.from({
            length: n + 1
        }, (_, i)=>(0, _d3Array.quantile)(domain, i / n));
    };
    scale.copy = function() {
        return sequentialQuantile(interpolator).domain(domain);
    };
    return (0, _initJs.initInterpolator).apply(scale, arguments);
}

},{"d3-array":"1yX2W","./continuous.js":"1LsCM","./init.js":"kp8lc","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3BN2V":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>diverging);
parcelHelpers.export(exports, "divergingLog", ()=>divergingLog);
parcelHelpers.export(exports, "divergingSymlog", ()=>divergingSymlog);
parcelHelpers.export(exports, "divergingPow", ()=>divergingPow);
parcelHelpers.export(exports, "divergingSqrt", ()=>divergingSqrt);
var _d3Interpolate = require("d3-interpolate");
var _continuousJs = require("./continuous.js");
var _initJs = require("./init.js");
var _linearJs = require("./linear.js");
var _logJs = require("./log.js");
var _sequentialJs = require("./sequential.js");
var _symlogJs = require("./symlog.js");
var _powJs = require("./pow.js");
function transformer() {
    var x0 = 0, x1 = 0.5, x2 = 1, s = 1, t0, t1, t2, k10, k21, interpolator = (0, _continuousJs.identity), transform, clamp = false, unknown;
    function scale(x) {
        return isNaN(x = +x) ? unknown : (x = 0.5 + ((x = +transform(x)) - t1) * (s * x < s * t1 ? k10 : k21), interpolator(clamp ? Math.max(0, Math.min(1, x)) : x));
    }
    scale.domain = function(_) {
        return arguments.length ? ([x0, x1, x2] = _, t0 = transform(x0 = +x0), t1 = transform(x1 = +x1), t2 = transform(x2 = +x2), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1), s = t1 < t0 ? -1 : 1, scale) : [
            x0,
            x1,
            x2
        ];
    };
    scale.clamp = function(_) {
        return arguments.length ? (clamp = !!_, scale) : clamp;
    };
    scale.interpolator = function(_) {
        return arguments.length ? (interpolator = _, scale) : interpolator;
    };
    function range(interpolate) {
        return function(_) {
            var r0, r1, r2;
            return arguments.length ? ([r0, r1, r2] = _, interpolator = (0, _d3Interpolate.piecewise)(interpolate, [
                r0,
                r1,
                r2
            ]), scale) : [
                interpolator(0),
                interpolator(0.5),
                interpolator(1)
            ];
        };
    }
    scale.range = range((0, _d3Interpolate.interpolate));
    scale.rangeRound = range((0, _d3Interpolate.interpolateRound));
    scale.unknown = function(_) {
        return arguments.length ? (unknown = _, scale) : unknown;
    };
    return function(t) {
        transform = t, t0 = t(x0), t1 = t(x1), t2 = t(x2), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1), s = t1 < t0 ? -1 : 1;
        return scale;
    };
}
function diverging() {
    var scale = (0, _linearJs.linearish)(transformer()((0, _continuousJs.identity)));
    scale.copy = function() {
        return (0, _sequentialJs.copy)(scale, diverging());
    };
    return (0, _initJs.initInterpolator).apply(scale, arguments);
}
function divergingLog() {
    var scale = (0, _logJs.loggish)(transformer()).domain([
        0.1,
        1,
        10
    ]);
    scale.copy = function() {
        return (0, _sequentialJs.copy)(scale, divergingLog()).base(scale.base());
    };
    return (0, _initJs.initInterpolator).apply(scale, arguments);
}
function divergingSymlog() {
    var scale = (0, _symlogJs.symlogish)(transformer());
    scale.copy = function() {
        return (0, _sequentialJs.copy)(scale, divergingSymlog()).constant(scale.constant());
    };
    return (0, _initJs.initInterpolator).apply(scale, arguments);
}
function divergingPow() {
    var scale = (0, _powJs.powish)(transformer());
    scale.copy = function() {
        return (0, _sequentialJs.copy)(scale, divergingPow()).exponent(scale.exponent());
    };
    return (0, _initJs.initInterpolator).apply(scale, arguments);
}
function divergingSqrt() {
    return divergingPow.apply(null, arguments).exponent(0.5);
}

},{"d3-interpolate":"6jJyi","./continuous.js":"1LsCM","./init.js":"kp8lc","./linear.js":"lob4K","./log.js":"z4t8s","./sequential.js":"aMNy9","./symlog.js":"4KiG8","./pow.js":"jVG8A","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"SqrXv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "arc", ()=>(0, _arcJsDefault.default));
parcelHelpers.export(exports, "area", ()=>(0, _areaJsDefault.default));
parcelHelpers.export(exports, "line", ()=>(0, _lineJsDefault.default));
parcelHelpers.export(exports, "pie", ()=>(0, _pieJsDefault.default));
parcelHelpers.export(exports, "areaRadial", ()=>(0, _areaRadialJsDefault.default)) // Note: radialArea is deprecated!
;
parcelHelpers.export(exports, "radialArea", ()=>(0, _areaRadialJsDefault.default));
parcelHelpers.export(exports, "lineRadial", ()=>(0, _lineRadialJsDefault.default)) // Note: radialLine is deprecated!
;
parcelHelpers.export(exports, "radialLine", ()=>(0, _lineRadialJsDefault.default));
parcelHelpers.export(exports, "pointRadial", ()=>(0, _pointRadialJsDefault.default));
parcelHelpers.export(exports, "linkHorizontal", ()=>(0, _indexJs.linkHorizontal));
parcelHelpers.export(exports, "linkVertical", ()=>(0, _indexJs.linkVertical));
parcelHelpers.export(exports, "linkRadial", ()=>(0, _indexJs.linkRadial));
parcelHelpers.export(exports, "symbol", ()=>(0, _symbolJsDefault.default));
parcelHelpers.export(exports, "symbols", ()=>(0, _symbolJs.symbols));
parcelHelpers.export(exports, "symbolCircle", ()=>(0, _circleJsDefault.default));
parcelHelpers.export(exports, "symbolCross", ()=>(0, _crossJsDefault.default));
parcelHelpers.export(exports, "symbolDiamond", ()=>(0, _diamondJsDefault.default));
parcelHelpers.export(exports, "symbolSquare", ()=>(0, _squareJsDefault.default));
parcelHelpers.export(exports, "symbolStar", ()=>(0, _starJsDefault.default));
parcelHelpers.export(exports, "symbolTriangle", ()=>(0, _triangleJsDefault.default));
parcelHelpers.export(exports, "symbolWye", ()=>(0, _wyeJsDefault.default));
parcelHelpers.export(exports, "curveBasisClosed", ()=>(0, _basisClosedJsDefault.default));
parcelHelpers.export(exports, "curveBasisOpen", ()=>(0, _basisOpenJsDefault.default));
parcelHelpers.export(exports, "curveBasis", ()=>(0, _basisJsDefault.default));
parcelHelpers.export(exports, "curveBundle", ()=>(0, _bundleJsDefault.default));
parcelHelpers.export(exports, "curveCardinalClosed", ()=>(0, _cardinalClosedJsDefault.default));
parcelHelpers.export(exports, "curveCardinalOpen", ()=>(0, _cardinalOpenJsDefault.default));
parcelHelpers.export(exports, "curveCardinal", ()=>(0, _cardinalJsDefault.default));
parcelHelpers.export(exports, "curveCatmullRomClosed", ()=>(0, _catmullRomClosedJsDefault.default));
parcelHelpers.export(exports, "curveCatmullRomOpen", ()=>(0, _catmullRomOpenJsDefault.default));
parcelHelpers.export(exports, "curveCatmullRom", ()=>(0, _catmullRomJsDefault.default));
parcelHelpers.export(exports, "curveLinearClosed", ()=>(0, _linearClosedJsDefault.default));
parcelHelpers.export(exports, "curveLinear", ()=>(0, _linearJsDefault.default));
parcelHelpers.export(exports, "curveMonotoneX", ()=>(0, _monotoneJs.monotoneX));
parcelHelpers.export(exports, "curveMonotoneY", ()=>(0, _monotoneJs.monotoneY));
parcelHelpers.export(exports, "curveNatural", ()=>(0, _naturalJsDefault.default));
parcelHelpers.export(exports, "curveStep", ()=>(0, _stepJsDefault.default));
parcelHelpers.export(exports, "curveStepAfter", ()=>(0, _stepJs.stepAfter));
parcelHelpers.export(exports, "curveStepBefore", ()=>(0, _stepJs.stepBefore));
parcelHelpers.export(exports, "stack", ()=>(0, _stackJsDefault.default));
parcelHelpers.export(exports, "stackOffsetExpand", ()=>(0, _expandJsDefault.default));
parcelHelpers.export(exports, "stackOffsetDiverging", ()=>(0, _divergingJsDefault.default));
parcelHelpers.export(exports, "stackOffsetNone", ()=>(0, _noneJsDefault.default));
parcelHelpers.export(exports, "stackOffsetSilhouette", ()=>(0, _silhouetteJsDefault.default));
parcelHelpers.export(exports, "stackOffsetWiggle", ()=>(0, _wiggleJsDefault.default));
parcelHelpers.export(exports, "stackOrderAppearance", ()=>(0, _appearanceJsDefault.default));
parcelHelpers.export(exports, "stackOrderAscending", ()=>(0, _ascendingJsDefault.default));
parcelHelpers.export(exports, "stackOrderDescending", ()=>(0, _descendingJsDefault.default));
parcelHelpers.export(exports, "stackOrderInsideOut", ()=>(0, _insideOutJsDefault.default));
parcelHelpers.export(exports, "stackOrderNone", ()=>(0, _noneJsDefault1.default));
parcelHelpers.export(exports, "stackOrderReverse", ()=>(0, _reverseJsDefault.default));
var _arcJs = require("./arc.js");
var _arcJsDefault = parcelHelpers.interopDefault(_arcJs);
var _areaJs = require("./area.js");
var _areaJsDefault = parcelHelpers.interopDefault(_areaJs);
var _lineJs = require("./line.js");
var _lineJsDefault = parcelHelpers.interopDefault(_lineJs);
var _pieJs = require("./pie.js");
var _pieJsDefault = parcelHelpers.interopDefault(_pieJs);
var _areaRadialJs = require("./areaRadial.js");
var _areaRadialJsDefault = parcelHelpers.interopDefault(_areaRadialJs);
var _lineRadialJs = require("./lineRadial.js");
var _lineRadialJsDefault = parcelHelpers.interopDefault(_lineRadialJs);
var _pointRadialJs = require("./pointRadial.js");
var _pointRadialJsDefault = parcelHelpers.interopDefault(_pointRadialJs);
var _indexJs = require("./link/index.js");
var _symbolJs = require("./symbol.js");
var _symbolJsDefault = parcelHelpers.interopDefault(_symbolJs);
var _circleJs = require("./symbol/circle.js");
var _circleJsDefault = parcelHelpers.interopDefault(_circleJs);
var _crossJs = require("./symbol/cross.js");
var _crossJsDefault = parcelHelpers.interopDefault(_crossJs);
var _diamondJs = require("./symbol/diamond.js");
var _diamondJsDefault = parcelHelpers.interopDefault(_diamondJs);
var _squareJs = require("./symbol/square.js");
var _squareJsDefault = parcelHelpers.interopDefault(_squareJs);
var _starJs = require("./symbol/star.js");
var _starJsDefault = parcelHelpers.interopDefault(_starJs);
var _triangleJs = require("./symbol/triangle.js");
var _triangleJsDefault = parcelHelpers.interopDefault(_triangleJs);
var _wyeJs = require("./symbol/wye.js");
var _wyeJsDefault = parcelHelpers.interopDefault(_wyeJs);
var _basisClosedJs = require("./curve/basisClosed.js");
var _basisClosedJsDefault = parcelHelpers.interopDefault(_basisClosedJs);
var _basisOpenJs = require("./curve/basisOpen.js");
var _basisOpenJsDefault = parcelHelpers.interopDefault(_basisOpenJs);
var _basisJs = require("./curve/basis.js");
var _basisJsDefault = parcelHelpers.interopDefault(_basisJs);
var _bundleJs = require("./curve/bundle.js");
var _bundleJsDefault = parcelHelpers.interopDefault(_bundleJs);
var _cardinalClosedJs = require("./curve/cardinalClosed.js");
var _cardinalClosedJsDefault = parcelHelpers.interopDefault(_cardinalClosedJs);
var _cardinalOpenJs = require("./curve/cardinalOpen.js");
var _cardinalOpenJsDefault = parcelHelpers.interopDefault(_cardinalOpenJs);
var _cardinalJs = require("./curve/cardinal.js");
var _cardinalJsDefault = parcelHelpers.interopDefault(_cardinalJs);
var _catmullRomClosedJs = require("./curve/catmullRomClosed.js");
var _catmullRomClosedJsDefault = parcelHelpers.interopDefault(_catmullRomClosedJs);
var _catmullRomOpenJs = require("./curve/catmullRomOpen.js");
var _catmullRomOpenJsDefault = parcelHelpers.interopDefault(_catmullRomOpenJs);
var _catmullRomJs = require("./curve/catmullRom.js");
var _catmullRomJsDefault = parcelHelpers.interopDefault(_catmullRomJs);
var _linearClosedJs = require("./curve/linearClosed.js");
var _linearClosedJsDefault = parcelHelpers.interopDefault(_linearClosedJs);
var _linearJs = require("./curve/linear.js");
var _linearJsDefault = parcelHelpers.interopDefault(_linearJs);
var _monotoneJs = require("./curve/monotone.js");
var _naturalJs = require("./curve/natural.js");
var _naturalJsDefault = parcelHelpers.interopDefault(_naturalJs);
var _stepJs = require("./curve/step.js");
var _stepJsDefault = parcelHelpers.interopDefault(_stepJs);
var _stackJs = require("./stack.js");
var _stackJsDefault = parcelHelpers.interopDefault(_stackJs);
var _expandJs = require("./offset/expand.js");
var _expandJsDefault = parcelHelpers.interopDefault(_expandJs);
var _divergingJs = require("./offset/diverging.js");
var _divergingJsDefault = parcelHelpers.interopDefault(_divergingJs);
var _noneJs = require("./offset/none.js");
var _noneJsDefault = parcelHelpers.interopDefault(_noneJs);
var _silhouetteJs = require("./offset/silhouette.js");
var _silhouetteJsDefault = parcelHelpers.interopDefault(_silhouetteJs);
var _wiggleJs = require("./offset/wiggle.js");
var _wiggleJsDefault = parcelHelpers.interopDefault(_wiggleJs);
var _appearanceJs = require("./order/appearance.js");
var _appearanceJsDefault = parcelHelpers.interopDefault(_appearanceJs);
var _ascendingJs = require("./order/ascending.js");
var _ascendingJsDefault = parcelHelpers.interopDefault(_ascendingJs);
var _descendingJs = require("./order/descending.js");
var _descendingJsDefault = parcelHelpers.interopDefault(_descendingJs);
var _insideOutJs = require("./order/insideOut.js");
var _insideOutJsDefault = parcelHelpers.interopDefault(_insideOutJs);
var _noneJs1 = require("./order/none.js");
var _noneJsDefault1 = parcelHelpers.interopDefault(_noneJs1);
var _reverseJs = require("./order/reverse.js");
var _reverseJsDefault = parcelHelpers.interopDefault(_reverseJs);

},{"./arc.js":"8EL3d","./area.js":"87W2h","./line.js":"hTFAN","./pie.js":"blNzn","./areaRadial.js":"aKyw6","./lineRadial.js":"4aSXI","./pointRadial.js":"gH3Nl","./link/index.js":"9OVls","./symbol.js":"12bBv","./symbol/circle.js":"jQjPb","./symbol/cross.js":"2CCQJ","./symbol/diamond.js":"afDKe","./symbol/square.js":"3Rovu","./symbol/star.js":"fqvh2","./symbol/triangle.js":"l2B6P","./symbol/wye.js":"6dhtz","./curve/basisClosed.js":"jK8tZ","./curve/basisOpen.js":"9nzjm","./curve/basis.js":"lmIyE","./curve/bundle.js":"9NCmN","./curve/cardinalClosed.js":"8btb4","./curve/cardinalOpen.js":"avKmC","./curve/cardinal.js":"brZ6e","./curve/catmullRomClosed.js":"3mnrZ","./curve/catmullRomOpen.js":"4v2qz","./curve/catmullRom.js":"j2hDs","./curve/linearClosed.js":"bZkPo","./curve/linear.js":"ajwdK","./curve/monotone.js":"akQ7S","./curve/natural.js":"ejsSN","./curve/step.js":"cenwN","./stack.js":"04Lp5","./offset/expand.js":"bE3nk","./offset/diverging.js":"7vGu2","./offset/none.js":"h0h85","./offset/silhouette.js":"ez0ZX","./offset/wiggle.js":"hJZrV","./order/appearance.js":"fDXA7","./order/ascending.js":"17HfK","./order/descending.js":"fTuOf","./order/insideOut.js":"4CNKk","./order/none.js":"30Qqt","./order/reverse.js":"4K6jR","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8EL3d":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        var innerRadius = arcInnerRadius, outerRadius = arcOuterRadius, cornerRadius = (0, _constantJsDefault.default)(0), padRadius = null, startAngle = arcStartAngle, endAngle = arcEndAngle, padAngle = arcPadAngle, context = null;
        function arc() {
            var buffer, r, r0 = +innerRadius.apply(this, arguments), r1 = +outerRadius.apply(this, arguments), a0 = startAngle.apply(this, arguments) - (0, _mathJs.halfPi), a1 = endAngle.apply(this, arguments) - (0, _mathJs.halfPi), da = (0, _mathJs.abs)(a1 - a0), cw = a1 > a0;
            if (!context) context = buffer = (0, _d3Path.path)();
            // Ensure that the outer radius is always larger than the inner radius.
            if (r1 < r0) r = r1, r1 = r0, r0 = r;
            // Is it a point?
            if (!(r1 > (0, _mathJs.epsilon))) context.moveTo(0, 0);
            else if (da > (0, _mathJs.tau) - (0, _mathJs.epsilon)) {
                context.moveTo(r1 * (0, _mathJs.cos)(a0), r1 * (0, _mathJs.sin)(a0));
                context.arc(0, 0, r1, a0, a1, !cw);
                if (r0 > (0, _mathJs.epsilon)) {
                    context.moveTo(r0 * (0, _mathJs.cos)(a1), r0 * (0, _mathJs.sin)(a1));
                    context.arc(0, 0, r0, a1, a0, cw);
                }
            } else {
                var a01 = a0, a11 = a1, a00 = a0, a10 = a1, da0 = da, da1 = da, ap = padAngle.apply(this, arguments) / 2, rp = ap > (0, _mathJs.epsilon) && (padRadius ? +padRadius.apply(this, arguments) : (0, _mathJs.sqrt)(r0 * r0 + r1 * r1)), rc = (0, _mathJs.min)((0, _mathJs.abs)(r1 - r0) / 2, +cornerRadius.apply(this, arguments)), rc0 = rc, rc1 = rc, t0, t1;
                // Apply padding? Note that since r1 ≥ r0, da1 ≥ da0.
                if (rp > (0, _mathJs.epsilon)) {
                    var p0 = (0, _mathJs.asin)(rp / r0 * (0, _mathJs.sin)(ap)), p1 = (0, _mathJs.asin)(rp / r1 * (0, _mathJs.sin)(ap));
                    if ((da0 -= p0 * 2) > (0, _mathJs.epsilon)) p0 *= cw ? 1 : -1, a00 += p0, a10 -= p0;
                    else da0 = 0, a00 = a10 = (a0 + a1) / 2;
                    if ((da1 -= p1 * 2) > (0, _mathJs.epsilon)) p1 *= cw ? 1 : -1, a01 += p1, a11 -= p1;
                    else da1 = 0, a01 = a11 = (a0 + a1) / 2;
                }
                var x01 = r1 * (0, _mathJs.cos)(a01), y01 = r1 * (0, _mathJs.sin)(a01), x10 = r0 * (0, _mathJs.cos)(a10), y10 = r0 * (0, _mathJs.sin)(a10);
                // Apply rounded corners?
                if (rc > (0, _mathJs.epsilon)) {
                    var x11 = r1 * (0, _mathJs.cos)(a11), y11 = r1 * (0, _mathJs.sin)(a11), x00 = r0 * (0, _mathJs.cos)(a00), y00 = r0 * (0, _mathJs.sin)(a00), oc;
                    // Restrict the corner radius according to the sector angle.
                    if (da < (0, _mathJs.pi) && (oc = intersect(x01, y01, x00, y00, x11, y11, x10, y10))) {
                        var ax = x01 - oc[0], ay = y01 - oc[1], bx = x11 - oc[0], by = y11 - oc[1], kc = 1 / (0, _mathJs.sin)((0, _mathJs.acos)((ax * bx + ay * by) / ((0, _mathJs.sqrt)(ax * ax + ay * ay) * (0, _mathJs.sqrt)(bx * bx + by * by))) / 2), lc = (0, _mathJs.sqrt)(oc[0] * oc[0] + oc[1] * oc[1]);
                        rc0 = (0, _mathJs.min)(rc, (r0 - lc) / (kc - 1));
                        rc1 = (0, _mathJs.min)(rc, (r1 - lc) / (kc + 1));
                    }
                }
                // Is the sector collapsed to a line?
                if (!(da1 > (0, _mathJs.epsilon))) context.moveTo(x01, y01);
                else if (rc1 > (0, _mathJs.epsilon)) {
                    t0 = cornerTangents(x00, y00, x01, y01, r1, rc1, cw);
                    t1 = cornerTangents(x11, y11, x10, y10, r1, rc1, cw);
                    context.moveTo(t0.cx + t0.x01, t0.cy + t0.y01);
                    // Have the corners merged?
                    if (rc1 < rc) context.arc(t0.cx, t0.cy, rc1, (0, _mathJs.atan2)(t0.y01, t0.x01), (0, _mathJs.atan2)(t1.y01, t1.x01), !cw);
                    else {
                        context.arc(t0.cx, t0.cy, rc1, (0, _mathJs.atan2)(t0.y01, t0.x01), (0, _mathJs.atan2)(t0.y11, t0.x11), !cw);
                        context.arc(0, 0, r1, (0, _mathJs.atan2)(t0.cy + t0.y11, t0.cx + t0.x11), (0, _mathJs.atan2)(t1.cy + t1.y11, t1.cx + t1.x11), !cw);
                        context.arc(t1.cx, t1.cy, rc1, (0, _mathJs.atan2)(t1.y11, t1.x11), (0, _mathJs.atan2)(t1.y01, t1.x01), !cw);
                    }
                } else context.moveTo(x01, y01), context.arc(0, 0, r1, a01, a11, !cw);
                // Is there no inner ring, and it’s a circular sector?
                // Or perhaps it’s an annular sector collapsed due to padding?
                if (!(r0 > (0, _mathJs.epsilon)) || !(da0 > (0, _mathJs.epsilon))) context.lineTo(x10, y10);
                else if (rc0 > (0, _mathJs.epsilon)) {
                    t0 = cornerTangents(x10, y10, x11, y11, r0, -rc0, cw);
                    t1 = cornerTangents(x01, y01, x00, y00, r0, -rc0, cw);
                    context.lineTo(t0.cx + t0.x01, t0.cy + t0.y01);
                    // Have the corners merged?
                    if (rc0 < rc) context.arc(t0.cx, t0.cy, rc0, (0, _mathJs.atan2)(t0.y01, t0.x01), (0, _mathJs.atan2)(t1.y01, t1.x01), !cw);
                    else {
                        context.arc(t0.cx, t0.cy, rc0, (0, _mathJs.atan2)(t0.y01, t0.x01), (0, _mathJs.atan2)(t0.y11, t0.x11), !cw);
                        context.arc(0, 0, r0, (0, _mathJs.atan2)(t0.cy + t0.y11, t0.cx + t0.x11), (0, _mathJs.atan2)(t1.cy + t1.y11, t1.cx + t1.x11), cw);
                        context.arc(t1.cx, t1.cy, rc0, (0, _mathJs.atan2)(t1.y11, t1.x11), (0, _mathJs.atan2)(t1.y01, t1.x01), !cw);
                    }
                } else context.arc(0, 0, r0, a10, a00, cw);
            }
            context.closePath();
            if (buffer) return context = null, buffer + "" || null;
        }
        arc.centroid = function() {
            var r = (+innerRadius.apply(this, arguments) + +outerRadius.apply(this, arguments)) / 2, a = (+startAngle.apply(this, arguments) + +endAngle.apply(this, arguments)) / 2 - (0, _mathJs.pi) / 2;
            return [
                (0, _mathJs.cos)(a) * r,
                (0, _mathJs.sin)(a) * r
            ];
        };
        arc.innerRadius = function(_) {
            return arguments.length ? (innerRadius = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), arc) : innerRadius;
        };
        arc.outerRadius = function(_) {
            return arguments.length ? (outerRadius = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), arc) : outerRadius;
        };
        arc.cornerRadius = function(_) {
            return arguments.length ? (cornerRadius = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), arc) : cornerRadius;
        };
        arc.padRadius = function(_) {
            return arguments.length ? (padRadius = _ == null ? null : typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), arc) : padRadius;
        };
        arc.startAngle = function(_) {
            return arguments.length ? (startAngle = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), arc) : startAngle;
        };
        arc.endAngle = function(_) {
            return arguments.length ? (endAngle = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), arc) : endAngle;
        };
        arc.padAngle = function(_) {
            return arguments.length ? (padAngle = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), arc) : padAngle;
        };
        arc.context = function(_) {
            return arguments.length ? (context = _ == null ? null : _, arc) : context;
        };
        return arc;
    });
var _d3Path = require("d3-path");
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _mathJs = require("./math.js");
function arcInnerRadius(d) {
    return d.innerRadius;
}
function arcOuterRadius(d) {
    return d.outerRadius;
}
function arcStartAngle(d) {
    return d.startAngle;
}
function arcEndAngle(d) {
    return d.endAngle;
}
function arcPadAngle(d) {
    return d && d.padAngle; // Note: optional!
}
function intersect(x0, y0, x1, y1, x2, y2, x3, y3) {
    var x10 = x1 - x0, y10 = y1 - y0, x32 = x3 - x2, y32 = y3 - y2, t = y32 * x10 - x32 * y10;
    if (t * t < (0, _mathJs.epsilon)) return;
    t = (x32 * (y0 - y2) - y32 * (x0 - x2)) / t;
    return [
        x0 + t * x10,
        y0 + t * y10
    ];
}
// Compute perpendicular offset line of length rc.
// http://mathworld.wolfram.com/Circle-LineIntersection.html
function cornerTangents(x0, y0, x1, y1, r1, rc, cw) {
    var x01 = x0 - x1, y01 = y0 - y1, lo = (cw ? rc : -rc) / (0, _mathJs.sqrt)(x01 * x01 + y01 * y01), ox = lo * y01, oy = -lo * x01, x11 = x0 + ox, y11 = y0 + oy, x10 = x1 + ox, y10 = y1 + oy, x00 = (x11 + x10) / 2, y00 = (y11 + y10) / 2, dx = x10 - x11, dy = y10 - y11, d2 = dx * dx + dy * dy, r = r1 - rc, D = x11 * y10 - x10 * y11, d = (dy < 0 ? -1 : 1) * (0, _mathJs.sqrt)((0, _mathJs.max)(0, r * r * d2 - D * D)), cx0 = (D * dy - dx * d) / d2, cy0 = (-D * dx - dy * d) / d2, cx1 = (D * dy + dx * d) / d2, cy1 = (-D * dx + dy * d) / d2, dx0 = cx0 - x00, dy0 = cy0 - y00, dx1 = cx1 - x00, dy1 = cy1 - y00;
    // Pick the closer of the two intersection points.
    // TODO Is there a faster way to determine which intersection to use?
    if (dx0 * dx0 + dy0 * dy0 > dx1 * dx1 + dy1 * dy1) cx0 = cx1, cy0 = cy1;
    return {
        cx: cx0,
        cy: cy0,
        x01: -ox,
        y01: -oy,
        x11: cx0 * (r1 / r - 1),
        y11: cy0 * (r1 / r - 1)
    };
}

},{"d3-path":"eY3pl","./constant.js":"dFe8v","./math.js":"4VX7v","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eY3pl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "path", ()=>(0, _pathJsDefault.default));
var _pathJs = require("./path.js");
var _pathJsDefault = parcelHelpers.interopDefault(_pathJs);

},{"./path.js":"jFeAg","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jFeAg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var pi = Math.PI, tau = 2 * pi, epsilon = 1e-6, tauEpsilon = tau - epsilon;
function Path() {
    this._x0 = this._y0 = this._x1 = this._y1 = null; // end of current subpath
    this._ = "";
}
function path() {
    return new Path;
}
Path.prototype = path.prototype = {
    constructor: Path,
    moveTo: function(x, y) {
        this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
    },
    closePath: function() {
        if (this._x1 !== null) {
            this._x1 = this._x0, this._y1 = this._y0;
            this._ += "Z";
        }
    },
    lineTo: function(x, y) {
        this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    quadraticCurveTo: function(x1, y1, x, y) {
        this._ += "Q" + +x1 + "," + +y1 + "," + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    bezierCurveTo: function(x1, y1, x2, y2, x, y) {
        this._ += "C" + +x1 + "," + +y1 + "," + +x2 + "," + +y2 + "," + (this._x1 = +x) + "," + (this._y1 = +y);
    },
    arcTo: function(x1, y1, x2, y2, r) {
        x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
        var x0 = this._x1, y0 = this._y1, x21 = x2 - x1, y21 = y2 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
        // Is the radius negative? Error.
        if (r < 0) throw new Error("negative radius: " + r);
        // Is this path empty? Move to (x1,y1).
        if (this._x1 === null) this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
        else if (!(l01_2 > epsilon)) ;
        else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
        else {
            var x20 = x2 - x0, y20 = y2 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l / l01, t21 = l / l21;
            // If the start tangent is not coincident with (x0,y0), line to.
            if (Math.abs(t01 - 1) > epsilon) this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
            this._ += "A" + r + "," + r + ",0,0," + +(y01 * x20 > x01 * y20) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
        }
    },
    arc: function(x, y, r, a0, a1, ccw) {
        x = +x, y = +y, r = +r, ccw = !!ccw;
        var dx = r * Math.cos(a0), dy = r * Math.sin(a0), x0 = x + dx, y0 = y + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
        // Is the radius negative? Error.
        if (r < 0) throw new Error("negative radius: " + r);
        // Is this path empty? Move to (x0,y0).
        if (this._x1 === null) this._ += "M" + x0 + "," + y0;
        else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) this._ += "L" + x0 + "," + y0;
        // Is this arc empty? We’re done.
        if (!r) return;
        // Does the angle go the wrong way? Flip the direction.
        if (da < 0) da = da % tau + tau;
        // Is this a complete circle? Draw two arcs to complete the circle.
        if (da > tauEpsilon) this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
        else if (da > epsilon) this._ += "A" + r + "," + r + ",0," + +(da >= pi) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    },
    rect: function(x, y, w, h) {
        this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + +w + "v" + +h + "h" + -w + "Z";
    },
    toString: function() {
        return this._;
    }
};
exports.default = path;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dFe8v":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(x) {
        return function constant() {
            return x;
        };
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4VX7v":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "abs", ()=>abs);
parcelHelpers.export(exports, "atan2", ()=>atan2);
parcelHelpers.export(exports, "cos", ()=>cos);
parcelHelpers.export(exports, "max", ()=>max);
parcelHelpers.export(exports, "min", ()=>min);
parcelHelpers.export(exports, "sin", ()=>sin);
parcelHelpers.export(exports, "sqrt", ()=>sqrt);
parcelHelpers.export(exports, "epsilon", ()=>epsilon);
parcelHelpers.export(exports, "pi", ()=>pi);
parcelHelpers.export(exports, "halfPi", ()=>halfPi);
parcelHelpers.export(exports, "tau", ()=>tau);
parcelHelpers.export(exports, "acos", ()=>acos);
parcelHelpers.export(exports, "asin", ()=>asin);
var abs = Math.abs;
var atan2 = Math.atan2;
var cos = Math.cos;
var max = Math.max;
var min = Math.min;
var sin = Math.sin;
var sqrt = Math.sqrt;
var epsilon = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var tau = 2 * pi;
function acos(x) {
    return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}
function asin(x) {
    return x >= 1 ? halfPi : x <= -1 ? -halfPi : Math.asin(x);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"87W2h":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        var x0 = (0, _pointJs.x), x1 = null, y0 = (0, _constantJsDefault.default)(0), y1 = (0, _pointJs.y), defined = (0, _constantJsDefault.default)(true), context = null, curve = (0, _linearJsDefault.default), output = null;
        function area(data) {
            var i, j, k, n = data.length, d, defined0 = false, buffer, x0z = new Array(n), y0z = new Array(n);
            if (context == null) output = curve(buffer = (0, _d3Path.path)());
            for(i = 0; i <= n; ++i){
                if (!(i < n && defined(d = data[i], i, data)) === defined0) {
                    if (defined0 = !defined0) {
                        j = i;
                        output.areaStart();
                        output.lineStart();
                    } else {
                        output.lineEnd();
                        output.lineStart();
                        for(k = i - 1; k >= j; --k)output.point(x0z[k], y0z[k]);
                        output.lineEnd();
                        output.areaEnd();
                    }
                }
                if (defined0) {
                    x0z[i] = +x0(d, i, data), y0z[i] = +y0(d, i, data);
                    output.point(x1 ? +x1(d, i, data) : x0z[i], y1 ? +y1(d, i, data) : y0z[i]);
                }
            }
            if (buffer) return output = null, buffer + "" || null;
        }
        function arealine() {
            return (0, _lineJsDefault.default)().defined(defined).curve(curve).context(context);
        }
        area.x = function(_) {
            return arguments.length ? (x0 = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), x1 = null, area) : x0;
        };
        area.x0 = function(_) {
            return arguments.length ? (x0 = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), area) : x0;
        };
        area.x1 = function(_) {
            return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), area) : x1;
        };
        area.y = function(_) {
            return arguments.length ? (y0 = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), y1 = null, area) : y0;
        };
        area.y0 = function(_) {
            return arguments.length ? (y0 = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), area) : y0;
        };
        area.y1 = function(_) {
            return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), area) : y1;
        };
        area.lineX0 = area.lineY0 = function() {
            return arealine().x(x0).y(y0);
        };
        area.lineY1 = function() {
            return arealine().x(x0).y(y1);
        };
        area.lineX1 = function() {
            return arealine().x(x1).y(y0);
        };
        area.defined = function(_) {
            return arguments.length ? (defined = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(!!_), area) : defined;
        };
        area.curve = function(_) {
            return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
        };
        area.context = function(_) {
            return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
        };
        return area;
    });
var _d3Path = require("d3-path");
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _linearJs = require("./curve/linear.js");
var _linearJsDefault = parcelHelpers.interopDefault(_linearJs);
var _lineJs = require("./line.js");
var _lineJsDefault = parcelHelpers.interopDefault(_lineJs);
var _pointJs = require("./point.js");

},{"d3-path":"eY3pl","./constant.js":"dFe8v","./curve/linear.js":"ajwdK","./line.js":"hTFAN","./point.js":"5bQ0r","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ajwdK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(context) {
        return new Linear(context);
    });
function Linear(context) {
    this._context = context;
}
Linear.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._point = 0;
    },
    lineEnd: function() {
        if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
        this._line = 1 - this._line;
    },
    point: function(x, y) {
        x = +x, y = +y;
        switch(this._point){
            case 0:
                this._point = 1;
                this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
                break;
            case 1:
                this._point = 2; // proceed
            default:
                this._context.lineTo(x, y);
                break;
        }
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hTFAN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        var x = (0, _pointJs.x), y = (0, _pointJs.y), defined = (0, _constantJsDefault.default)(true), context = null, curve = (0, _linearJsDefault.default), output = null;
        function line(data) {
            var i, n = data.length, d, defined0 = false, buffer;
            if (context == null) output = curve(buffer = (0, _d3Path.path)());
            for(i = 0; i <= n; ++i){
                if (!(i < n && defined(d = data[i], i, data)) === defined0) {
                    if (defined0 = !defined0) output.lineStart();
                    else output.lineEnd();
                }
                if (defined0) output.point(+x(d, i, data), +y(d, i, data));
            }
            if (buffer) return output = null, buffer + "" || null;
        }
        line.x = function(_) {
            return arguments.length ? (x = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), line) : x;
        };
        line.y = function(_) {
            return arguments.length ? (y = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), line) : y;
        };
        line.defined = function(_) {
            return arguments.length ? (defined = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(!!_), line) : defined;
        };
        line.curve = function(_) {
            return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
        };
        line.context = function(_) {
            return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
        };
        return line;
    });
var _d3Path = require("d3-path");
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _linearJs = require("./curve/linear.js");
var _linearJsDefault = parcelHelpers.interopDefault(_linearJs);
var _pointJs = require("./point.js");

},{"d3-path":"eY3pl","./constant.js":"dFe8v","./curve/linear.js":"ajwdK","./point.js":"5bQ0r","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5bQ0r":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "x", ()=>x);
parcelHelpers.export(exports, "y", ()=>y);
function x(p) {
    return p[0];
}
function y(p) {
    return p[1];
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"blNzn":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        var value = (0, _identityJsDefault.default), sortValues = (0, _descendingJsDefault.default), sort = null, startAngle = (0, _constantJsDefault.default)(0), endAngle = (0, _constantJsDefault.default)((0, _mathJs.tau)), padAngle = (0, _constantJsDefault.default)(0);
        function pie(data) {
            var i, n = data.length, j, k, sum = 0, index = new Array(n), arcs = new Array(n), a0 = +startAngle.apply(this, arguments), da = Math.min((0, _mathJs.tau), Math.max(-(0, _mathJs.tau), endAngle.apply(this, arguments) - a0)), a1, p = Math.min(Math.abs(da) / n, padAngle.apply(this, arguments)), pa = p * (da < 0 ? -1 : 1), v;
            for(i = 0; i < n; ++i)if ((v = arcs[index[i] = i] = +value(data[i], i, data)) > 0) sum += v;
            // Optionally sort the arcs by previously-computed values or by data.
            if (sortValues != null) index.sort(function(i, j) {
                return sortValues(arcs[i], arcs[j]);
            });
            else if (sort != null) index.sort(function(i, j) {
                return sort(data[i], data[j]);
            });
            // Compute the arcs! They are stored in the original data's order.
            for(i = 0, k = sum ? (da - n * pa) / sum : 0; i < n; ++i, a0 = a1)j = index[i], v = arcs[j], a1 = a0 + (v > 0 ? v * k : 0) + pa, arcs[j] = {
                data: data[j],
                index: i,
                value: v,
                startAngle: a0,
                endAngle: a1,
                padAngle: p
            };
            return arcs;
        }
        pie.value = function(_) {
            return arguments.length ? (value = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), pie) : value;
        };
        pie.sortValues = function(_) {
            return arguments.length ? (sortValues = _, sort = null, pie) : sortValues;
        };
        pie.sort = function(_) {
            return arguments.length ? (sort = _, sortValues = null, pie) : sort;
        };
        pie.startAngle = function(_) {
            return arguments.length ? (startAngle = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), pie) : startAngle;
        };
        pie.endAngle = function(_) {
            return arguments.length ? (endAngle = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), pie) : endAngle;
        };
        pie.padAngle = function(_) {
            return arguments.length ? (padAngle = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), pie) : padAngle;
        };
        return pie;
    });
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _descendingJs = require("./descending.js");
var _descendingJsDefault = parcelHelpers.interopDefault(_descendingJs);
var _identityJs = require("./identity.js");
var _identityJsDefault = parcelHelpers.interopDefault(_identityJs);
var _mathJs = require("./math.js");

},{"./constant.js":"dFe8v","./descending.js":"1wgeb","./identity.js":"ivc9L","./math.js":"4VX7v","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1wgeb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(a, b) {
        return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ivc9L":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(d) {
        return d;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aKyw6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        var a = (0, _areaJsDefault.default)().curve((0, _radialJs.curveRadialLinear)), c = a.curve, x0 = a.lineX0, x1 = a.lineX1, y0 = a.lineY0, y1 = a.lineY1;
        a.angle = a.x, delete a.x;
        a.startAngle = a.x0, delete a.x0;
        a.endAngle = a.x1, delete a.x1;
        a.radius = a.y, delete a.y;
        a.innerRadius = a.y0, delete a.y0;
        a.outerRadius = a.y1, delete a.y1;
        a.lineStartAngle = function() {
            return (0, _lineRadialJs.lineRadial)(x0());
        }, delete a.lineX0;
        a.lineEndAngle = function() {
            return (0, _lineRadialJs.lineRadial)(x1());
        }, delete a.lineX1;
        a.lineInnerRadius = function() {
            return (0, _lineRadialJs.lineRadial)(y0());
        }, delete a.lineY0;
        a.lineOuterRadius = function() {
            return (0, _lineRadialJs.lineRadial)(y1());
        }, delete a.lineY1;
        a.curve = function(_) {
            return arguments.length ? c((0, _radialJsDefault.default)(_)) : c()._curve;
        };
        return a;
    });
var _radialJs = require("./curve/radial.js");
var _radialJsDefault = parcelHelpers.interopDefault(_radialJs);
var _areaJs = require("./area.js");
var _areaJsDefault = parcelHelpers.interopDefault(_areaJs);
var _lineRadialJs = require("./lineRadial.js");

},{"./curve/radial.js":"7P2sE","./area.js":"87W2h","./lineRadial.js":"4aSXI","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7P2sE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "curveRadialLinear", ()=>curveRadialLinear);
parcelHelpers.export(exports, "default", ()=>curveRadial);
var _linearJs = require("./linear.js");
var _linearJsDefault = parcelHelpers.interopDefault(_linearJs);
var curveRadialLinear = curveRadial((0, _linearJsDefault.default));
function Radial(curve) {
    this._curve = curve;
}
Radial.prototype = {
    areaStart: function() {
        this._curve.areaStart();
    },
    areaEnd: function() {
        this._curve.areaEnd();
    },
    lineStart: function() {
        this._curve.lineStart();
    },
    lineEnd: function() {
        this._curve.lineEnd();
    },
    point: function(a, r) {
        this._curve.point(r * Math.sin(a), r * -Math.cos(a));
    }
};
function curveRadial(curve) {
    function radial(context) {
        return new Radial(curve(context));
    }
    radial._curve = curve;
    return radial;
}

},{"./linear.js":"ajwdK","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4aSXI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "lineRadial", ()=>lineRadial);
parcelHelpers.export(exports, "default", ()=>function() {
        return lineRadial((0, _lineJsDefault.default)().curve((0, _radialJs.curveRadialLinear)));
    });
var _radialJs = require("./curve/radial.js");
var _radialJsDefault = parcelHelpers.interopDefault(_radialJs);
var _lineJs = require("./line.js");
var _lineJsDefault = parcelHelpers.interopDefault(_lineJs);
function lineRadial(l) {
    var c = l.curve;
    l.angle = l.x, delete l.x;
    l.radius = l.y, delete l.y;
    l.curve = function(_) {
        return arguments.length ? c((0, _radialJsDefault.default)(_)) : c()._curve;
    };
    return l;
}

},{"./curve/radial.js":"7P2sE","./line.js":"hTFAN","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gH3Nl":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(x, y) {
        return [
            (y = +y) * Math.cos(x -= Math.PI / 2),
            y * Math.sin(x)
        ];
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9OVls":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "linkHorizontal", ()=>linkHorizontal);
parcelHelpers.export(exports, "linkVertical", ()=>linkVertical);
parcelHelpers.export(exports, "linkRadial", ()=>linkRadial);
var _d3Path = require("d3-path");
var _arrayJs = require("../array.js");
var _constantJs = require("../constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _pointJs = require("../point.js");
var _pointRadialJs = require("../pointRadial.js");
var _pointRadialJsDefault = parcelHelpers.interopDefault(_pointRadialJs);
function linkSource(d) {
    return d.source;
}
function linkTarget(d) {
    return d.target;
}
function link(curve) {
    var source = linkSource, target = linkTarget, x = (0, _pointJs.x), y = (0, _pointJs.y), context = null;
    function link() {
        var buffer, argv = (0, _arrayJs.slice).call(arguments), s = source.apply(this, argv), t = target.apply(this, argv);
        if (!context) context = buffer = (0, _d3Path.path)();
        curve(context, +x.apply(this, (argv[0] = s, argv)), +y.apply(this, argv), +x.apply(this, (argv[0] = t, argv)), +y.apply(this, argv));
        if (buffer) return context = null, buffer + "" || null;
    }
    link.source = function(_) {
        return arguments.length ? (source = _, link) : source;
    };
    link.target = function(_) {
        return arguments.length ? (target = _, link) : target;
    };
    link.x = function(_) {
        return arguments.length ? (x = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), link) : x;
    };
    link.y = function(_) {
        return arguments.length ? (y = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), link) : y;
    };
    link.context = function(_) {
        return arguments.length ? (context = _ == null ? null : _, link) : context;
    };
    return link;
}
function curveHorizontal(context, x0, y0, x1, y1) {
    context.moveTo(x0, y0);
    context.bezierCurveTo(x0 = (x0 + x1) / 2, y0, x0, y1, x1, y1);
}
function curveVertical(context, x0, y0, x1, y1) {
    context.moveTo(x0, y0);
    context.bezierCurveTo(x0, y0 = (y0 + y1) / 2, x1, y0, x1, y1);
}
function curveRadial(context, x0, y0, x1, y1) {
    var p0 = (0, _pointRadialJsDefault.default)(x0, y0), p1 = (0, _pointRadialJsDefault.default)(x0, y0 = (y0 + y1) / 2), p2 = (0, _pointRadialJsDefault.default)(x1, y0), p3 = (0, _pointRadialJsDefault.default)(x1, y1);
    context.moveTo(p0[0], p0[1]);
    context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
}
function linkHorizontal() {
    return link(curveHorizontal);
}
function linkVertical() {
    return link(curveVertical);
}
function linkRadial() {
    var l = link(curveRadial);
    l.angle = l.x, delete l.x;
    l.radius = l.y, delete l.y;
    return l;
}

},{"d3-path":"eY3pl","../array.js":"6SJ8v","../constant.js":"dFe8v","../point.js":"5bQ0r","../pointRadial.js":"gH3Nl","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6SJ8v":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "slice", ()=>slice);
var slice = Array.prototype.slice;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"12bBv":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "symbols", ()=>symbols);
parcelHelpers.export(exports, "default", ()=>function() {
        var type = (0, _constantJsDefault.default)((0, _circleJsDefault.default)), size = (0, _constantJsDefault.default)(64), context = null;
        function symbol() {
            var buffer;
            if (!context) context = buffer = (0, _d3Path.path)();
            type.apply(this, arguments).draw(context, +size.apply(this, arguments));
            if (buffer) return context = null, buffer + "" || null;
        }
        symbol.type = function(_) {
            return arguments.length ? (type = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(_), symbol) : type;
        };
        symbol.size = function(_) {
            return arguments.length ? (size = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), symbol) : size;
        };
        symbol.context = function(_) {
            return arguments.length ? (context = _ == null ? null : _, symbol) : context;
        };
        return symbol;
    });
var _d3Path = require("d3-path");
var _circleJs = require("./symbol/circle.js");
var _circleJsDefault = parcelHelpers.interopDefault(_circleJs);
var _crossJs = require("./symbol/cross.js");
var _crossJsDefault = parcelHelpers.interopDefault(_crossJs);
var _diamondJs = require("./symbol/diamond.js");
var _diamondJsDefault = parcelHelpers.interopDefault(_diamondJs);
var _starJs = require("./symbol/star.js");
var _starJsDefault = parcelHelpers.interopDefault(_starJs);
var _squareJs = require("./symbol/square.js");
var _squareJsDefault = parcelHelpers.interopDefault(_squareJs);
var _triangleJs = require("./symbol/triangle.js");
var _triangleJsDefault = parcelHelpers.interopDefault(_triangleJs);
var _wyeJs = require("./symbol/wye.js");
var _wyeJsDefault = parcelHelpers.interopDefault(_wyeJs);
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var symbols = [
    (0, _circleJsDefault.default),
    (0, _crossJsDefault.default),
    (0, _diamondJsDefault.default),
    (0, _squareJsDefault.default),
    (0, _starJsDefault.default),
    (0, _triangleJsDefault.default),
    (0, _wyeJsDefault.default)
];

},{"d3-path":"eY3pl","./symbol/circle.js":"jQjPb","./symbol/cross.js":"2CCQJ","./symbol/diamond.js":"afDKe","./symbol/star.js":"fqvh2","./symbol/square.js":"3Rovu","./symbol/triangle.js":"l2B6P","./symbol/wye.js":"6dhtz","./constant.js":"dFe8v","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jQjPb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _mathJs = require("../math.js");
exports.default = {
    draw: function(context, size) {
        var r = Math.sqrt(size / (0, _mathJs.pi));
        context.moveTo(r, 0);
        context.arc(0, 0, r, 0, (0, _mathJs.tau));
    }
};

},{"../math.js":"4VX7v","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2CCQJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = {
    draw: function(context, size) {
        var r = Math.sqrt(size / 5) / 2;
        context.moveTo(-3 * r, -r);
        context.lineTo(-r, -r);
        context.lineTo(-r, -3 * r);
        context.lineTo(r, -3 * r);
        context.lineTo(r, -r);
        context.lineTo(3 * r, -r);
        context.lineTo(3 * r, r);
        context.lineTo(r, r);
        context.lineTo(r, 3 * r);
        context.lineTo(-r, 3 * r);
        context.lineTo(-r, r);
        context.lineTo(-3 * r, r);
        context.closePath();
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"afDKe":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var tan30 = Math.sqrt(1 / 3), tan30_2 = tan30 * 2;
exports.default = {
    draw: function(context, size) {
        var y = Math.sqrt(size / tan30_2), x = y * tan30;
        context.moveTo(0, -y);
        context.lineTo(x, 0);
        context.lineTo(0, y);
        context.lineTo(-x, 0);
        context.closePath();
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fqvh2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _mathJs = require("../math.js");
var ka = 0.89081309152928522810, kr = Math.sin((0, _mathJs.pi) / 10) / Math.sin(7 * (0, _mathJs.pi) / 10), kx = Math.sin((0, _mathJs.tau) / 10) * kr, ky = -Math.cos((0, _mathJs.tau) / 10) * kr;
exports.default = {
    draw: function(context, size) {
        var r = Math.sqrt(size * ka), x = kx * r, y = ky * r;
        context.moveTo(0, -r);
        context.lineTo(x, y);
        for(var i = 1; i < 5; ++i){
            var a = (0, _mathJs.tau) * i / 5, c = Math.cos(a), s = Math.sin(a);
            context.lineTo(s * r, -c * r);
            context.lineTo(c * x - s * y, s * x + c * y);
        }
        context.closePath();
    }
};

},{"../math.js":"4VX7v","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3Rovu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
exports.default = {
    draw: function(context, size) {
        var w = Math.sqrt(size), x = -w / 2;
        context.rect(x, x, w, w);
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"l2B6P":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var sqrt3 = Math.sqrt(3);
exports.default = {
    draw: function(context, size) {
        var y = -Math.sqrt(size / (sqrt3 * 3));
        context.moveTo(0, y * 2);
        context.lineTo(-sqrt3 * y, -y);
        context.lineTo(sqrt3 * y, -y);
        context.closePath();
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6dhtz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var c = -0.5, s = Math.sqrt(3) / 2, k = 1 / Math.sqrt(12), a = (k / 2 + 1) * 3;
exports.default = {
    draw: function(context, size) {
        var r = Math.sqrt(size / a), x0 = r / 2, y0 = r * k, x1 = x0, y1 = r * k + r, x2 = -x1, y2 = y1;
        context.moveTo(x0, y0);
        context.lineTo(x1, y1);
        context.lineTo(x2, y2);
        context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
        context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
        context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
        context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
        context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
        context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
        context.closePath();
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jK8tZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(context) {
        return new BasisClosed(context);
    });
var _noopJs = require("../noop.js");
var _noopJsDefault = parcelHelpers.interopDefault(_noopJs);
var _basisJs = require("./basis.js");
function BasisClosed(context) {
    this._context = context;
}
BasisClosed.prototype = {
    areaStart: (0, _noopJsDefault.default),
    areaEnd: (0, _noopJsDefault.default),
    lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
        this._point = 0;
    },
    lineEnd: function() {
        switch(this._point){
            case 1:
                this._context.moveTo(this._x2, this._y2);
                this._context.closePath();
                break;
            case 2:
                this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
                this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
                this._context.closePath();
                break;
            case 3:
                this.point(this._x2, this._y2);
                this.point(this._x3, this._y3);
                this.point(this._x4, this._y4);
                break;
        }
    },
    point: function(x, y) {
        x = +x, y = +y;
        switch(this._point){
            case 0:
                this._point = 1;
                this._x2 = x, this._y2 = y;
                break;
            case 1:
                this._point = 2;
                this._x3 = x, this._y3 = y;
                break;
            case 2:
                this._point = 3;
                this._x4 = x, this._y4 = y;
                this._context.moveTo((this._x0 + 4 * this._x1 + x) / 6, (this._y0 + 4 * this._y1 + y) / 6);
                break;
            default:
                (0, _basisJs.point)(this, x, y);
                break;
        }
        this._x0 = this._x1, this._x1 = x;
        this._y0 = this._y1, this._y1 = y;
    }
};

},{"../noop.js":"f1azw","./basis.js":"lmIyE","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"f1azw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {});

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lmIyE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "point", ()=>point);
parcelHelpers.export(exports, "Basis", ()=>Basis);
parcelHelpers.export(exports, "default", ()=>function(context) {
        return new Basis(context);
    });
function point(that, x, y) {
    that._context.bezierCurveTo((2 * that._x0 + that._x1) / 3, (2 * that._y0 + that._y1) / 3, (that._x0 + 2 * that._x1) / 3, (that._y0 + 2 * that._y1) / 3, (that._x0 + 4 * that._x1 + x) / 6, (that._y0 + 4 * that._y1 + y) / 6);
}
function Basis(context) {
    this._context = context;
}
Basis.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x0 = this._x1 = this._y0 = this._y1 = NaN;
        this._point = 0;
    },
    lineEnd: function() {
        switch(this._point){
            case 3:
                point(this, this._x1, this._y1); // proceed
            case 2:
                this._context.lineTo(this._x1, this._y1);
                break;
        }
        if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
        this._line = 1 - this._line;
    },
    point: function(x, y) {
        x = +x, y = +y;
        switch(this._point){
            case 0:
                this._point = 1;
                this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
                break;
            case 1:
                this._point = 2;
                break;
            case 2:
                this._point = 3;
                this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6); // proceed
            default:
                point(this, x, y);
                break;
        }
        this._x0 = this._x1, this._x1 = x;
        this._y0 = this._y1, this._y1 = y;
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9nzjm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(context) {
        return new BasisOpen(context);
    });
var _basisJs = require("./basis.js");
function BasisOpen(context) {
    this._context = context;
}
BasisOpen.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x0 = this._x1 = this._y0 = this._y1 = NaN;
        this._point = 0;
    },
    lineEnd: function() {
        if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
        this._line = 1 - this._line;
    },
    point: function(x, y) {
        x = +x, y = +y;
        switch(this._point){
            case 0:
                this._point = 1;
                break;
            case 1:
                this._point = 2;
                break;
            case 2:
                this._point = 3;
                var x0 = (this._x0 + 4 * this._x1 + x) / 6, y0 = (this._y0 + 4 * this._y1 + y) / 6;
                this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
                break;
            case 3:
                this._point = 4; // proceed
            default:
                (0, _basisJs.point)(this, x, y);
                break;
        }
        this._x0 = this._x1, this._x1 = x;
        this._y0 = this._y1, this._y1 = y;
    }
};

},{"./basis.js":"lmIyE","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9NCmN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _basisJs = require("./basis.js");
function Bundle(context, beta) {
    this._basis = new (0, _basisJs.Basis)(context);
    this._beta = beta;
}
Bundle.prototype = {
    lineStart: function() {
        this._x = [];
        this._y = [];
        this._basis.lineStart();
    },
    lineEnd: function() {
        var x = this._x, y = this._y, j = x.length - 1;
        if (j > 0) {
            var x0 = x[0], y0 = y[0], dx = x[j] - x0, dy = y[j] - y0, i = -1, t;
            while(++i <= j){
                t = i / j;
                this._basis.point(this._beta * x[i] + (1 - this._beta) * (x0 + t * dx), this._beta * y[i] + (1 - this._beta) * (y0 + t * dy));
            }
        }
        this._x = this._y = null;
        this._basis.lineEnd();
    },
    point: function(x, y) {
        this._x.push(+x);
        this._y.push(+y);
    }
};
exports.default = function custom(beta) {
    function bundle(context) {
        return beta === 1 ? new (0, _basisJs.Basis)(context) : new Bundle(context, beta);
    }
    bundle.beta = function(beta) {
        return custom(+beta);
    };
    return bundle;
}(0.85);

},{"./basis.js":"lmIyE","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8btb4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CardinalClosed", ()=>CardinalClosed);
var _noopJs = require("../noop.js");
var _noopJsDefault = parcelHelpers.interopDefault(_noopJs);
var _cardinalJs = require("./cardinal.js");
function CardinalClosed(context, tension) {
    this._context = context;
    this._k = (1 - tension) / 6;
}
CardinalClosed.prototype = {
    areaStart: (0, _noopJsDefault.default),
    areaEnd: (0, _noopJsDefault.default),
    lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
        this._point = 0;
    },
    lineEnd: function() {
        switch(this._point){
            case 1:
                this._context.moveTo(this._x3, this._y3);
                this._context.closePath();
                break;
            case 2:
                this._context.lineTo(this._x3, this._y3);
                this._context.closePath();
                break;
            case 3:
                this.point(this._x3, this._y3);
                this.point(this._x4, this._y4);
                this.point(this._x5, this._y5);
                break;
        }
    },
    point: function(x, y) {
        x = +x, y = +y;
        switch(this._point){
            case 0:
                this._point = 1;
                this._x3 = x, this._y3 = y;
                break;
            case 1:
                this._point = 2;
                this._context.moveTo(this._x4 = x, this._y4 = y);
                break;
            case 2:
                this._point = 3;
                this._x5 = x, this._y5 = y;
                break;
            default:
                (0, _cardinalJs.point)(this, x, y);
                break;
        }
        this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
        this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
};
exports.default = function custom(tension) {
    function cardinal(context) {
        return new CardinalClosed(context, tension);
    }
    cardinal.tension = function(tension) {
        return custom(+tension);
    };
    return cardinal;
}(0);

},{"../noop.js":"f1azw","./cardinal.js":"brZ6e","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"brZ6e":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "point", ()=>point);
parcelHelpers.export(exports, "Cardinal", ()=>Cardinal);
function point(that, x, y) {
    that._context.bezierCurveTo(that._x1 + that._k * (that._x2 - that._x0), that._y1 + that._k * (that._y2 - that._y0), that._x2 + that._k * (that._x1 - x), that._y2 + that._k * (that._y1 - y), that._x2, that._y2);
}
function Cardinal(context, tension) {
    this._context = context;
    this._k = (1 - tension) / 6;
}
Cardinal.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
        this._point = 0;
    },
    lineEnd: function() {
        switch(this._point){
            case 2:
                this._context.lineTo(this._x2, this._y2);
                break;
            case 3:
                point(this, this._x1, this._y1);
                break;
        }
        if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
        this._line = 1 - this._line;
    },
    point: function(x, y) {
        x = +x, y = +y;
        switch(this._point){
            case 0:
                this._point = 1;
                this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
                break;
            case 1:
                this._point = 2;
                this._x1 = x, this._y1 = y;
                break;
            case 2:
                this._point = 3; // proceed
            default:
                point(this, x, y);
                break;
        }
        this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
        this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
};
exports.default = function custom(tension) {
    function cardinal(context) {
        return new Cardinal(context, tension);
    }
    cardinal.tension = function(tension) {
        return custom(+tension);
    };
    return cardinal;
}(0);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"avKmC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CardinalOpen", ()=>CardinalOpen);
var _cardinalJs = require("./cardinal.js");
function CardinalOpen(context, tension) {
    this._context = context;
    this._k = (1 - tension) / 6;
}
CardinalOpen.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
        this._point = 0;
    },
    lineEnd: function() {
        if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
        this._line = 1 - this._line;
    },
    point: function(x, y) {
        x = +x, y = +y;
        switch(this._point){
            case 0:
                this._point = 1;
                break;
            case 1:
                this._point = 2;
                break;
            case 2:
                this._point = 3;
                this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
                break;
            case 3:
                this._point = 4; // proceed
            default:
                (0, _cardinalJs.point)(this, x, y);
                break;
        }
        this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
        this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
};
exports.default = function custom(tension) {
    function cardinal(context) {
        return new CardinalOpen(context, tension);
    }
    cardinal.tension = function(tension) {
        return custom(+tension);
    };
    return cardinal;
}(0);

},{"./cardinal.js":"brZ6e","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3mnrZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _cardinalClosedJs = require("./cardinalClosed.js");
var _noopJs = require("../noop.js");
var _noopJsDefault = parcelHelpers.interopDefault(_noopJs);
var _catmullRomJs = require("./catmullRom.js");
function CatmullRomClosed(context, alpha) {
    this._context = context;
    this._alpha = alpha;
}
CatmullRomClosed.prototype = {
    areaStart: (0, _noopJsDefault.default),
    areaEnd: (0, _noopJsDefault.default),
    lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN;
        this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
    },
    lineEnd: function() {
        switch(this._point){
            case 1:
                this._context.moveTo(this._x3, this._y3);
                this._context.closePath();
                break;
            case 2:
                this._context.lineTo(this._x3, this._y3);
                this._context.closePath();
                break;
            case 3:
                this.point(this._x3, this._y3);
                this.point(this._x4, this._y4);
                this.point(this._x5, this._y5);
                break;
        }
    },
    point: function(x, y) {
        x = +x, y = +y;
        if (this._point) {
            var x23 = this._x2 - x, y23 = this._y2 - y;
            this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
        }
        switch(this._point){
            case 0:
                this._point = 1;
                this._x3 = x, this._y3 = y;
                break;
            case 1:
                this._point = 2;
                this._context.moveTo(this._x4 = x, this._y4 = y);
                break;
            case 2:
                this._point = 3;
                this._x5 = x, this._y5 = y;
                break;
            default:
                (0, _catmullRomJs.point)(this, x, y);
                break;
        }
        this._l01_a = this._l12_a, this._l12_a = this._l23_a;
        this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
        this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
        this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
};
exports.default = function custom(alpha) {
    function catmullRom(context) {
        return alpha ? new CatmullRomClosed(context, alpha) : new (0, _cardinalClosedJs.CardinalClosed)(context, 0);
    }
    catmullRom.alpha = function(alpha) {
        return custom(+alpha);
    };
    return catmullRom;
}(0.5);

},{"./cardinalClosed.js":"8btb4","../noop.js":"f1azw","./catmullRom.js":"j2hDs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"j2hDs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "point", ()=>point);
var _mathJs = require("../math.js");
var _cardinalJs = require("./cardinal.js");
function point(that, x, y) {
    var x1 = that._x1, y1 = that._y1, x2 = that._x2, y2 = that._y2;
    if (that._l01_a > (0, _mathJs.epsilon)) {
        var a = 2 * that._l01_2a + 3 * that._l01_a * that._l12_a + that._l12_2a, n = 3 * that._l01_a * (that._l01_a + that._l12_a);
        x1 = (x1 * a - that._x0 * that._l12_2a + that._x2 * that._l01_2a) / n;
        y1 = (y1 * a - that._y0 * that._l12_2a + that._y2 * that._l01_2a) / n;
    }
    if (that._l23_a > (0, _mathJs.epsilon)) {
        var b = 2 * that._l23_2a + 3 * that._l23_a * that._l12_a + that._l12_2a, m = 3 * that._l23_a * (that._l23_a + that._l12_a);
        x2 = (x2 * b + that._x1 * that._l23_2a - x * that._l12_2a) / m;
        y2 = (y2 * b + that._y1 * that._l23_2a - y * that._l12_2a) / m;
    }
    that._context.bezierCurveTo(x1, y1, x2, y2, that._x2, that._y2);
}
function CatmullRom(context, alpha) {
    this._context = context;
    this._alpha = alpha;
}
CatmullRom.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
        this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
    },
    lineEnd: function() {
        switch(this._point){
            case 2:
                this._context.lineTo(this._x2, this._y2);
                break;
            case 3:
                this.point(this._x2, this._y2);
                break;
        }
        if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
        this._line = 1 - this._line;
    },
    point: function(x, y) {
        x = +x, y = +y;
        if (this._point) {
            var x23 = this._x2 - x, y23 = this._y2 - y;
            this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
        }
        switch(this._point){
            case 0:
                this._point = 1;
                this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
                break;
            case 1:
                this._point = 2;
                break;
            case 2:
                this._point = 3; // proceed
            default:
                point(this, x, y);
                break;
        }
        this._l01_a = this._l12_a, this._l12_a = this._l23_a;
        this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
        this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
        this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
};
exports.default = function custom(alpha) {
    function catmullRom(context) {
        return alpha ? new CatmullRom(context, alpha) : new (0, _cardinalJs.Cardinal)(context, 0);
    }
    catmullRom.alpha = function(alpha) {
        return custom(+alpha);
    };
    return catmullRom;
}(0.5);

},{"../math.js":"4VX7v","./cardinal.js":"brZ6e","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4v2qz":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _cardinalOpenJs = require("./cardinalOpen.js");
var _catmullRomJs = require("./catmullRom.js");
function CatmullRomOpen(context, alpha) {
    this._context = context;
    this._alpha = alpha;
}
CatmullRomOpen.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN;
        this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
    },
    lineEnd: function() {
        if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
        this._line = 1 - this._line;
    },
    point: function(x, y) {
        x = +x, y = +y;
        if (this._point) {
            var x23 = this._x2 - x, y23 = this._y2 - y;
            this._l23_a = Math.sqrt(this._l23_2a = Math.pow(x23 * x23 + y23 * y23, this._alpha));
        }
        switch(this._point){
            case 0:
                this._point = 1;
                break;
            case 1:
                this._point = 2;
                break;
            case 2:
                this._point = 3;
                this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
                break;
            case 3:
                this._point = 4; // proceed
            default:
                (0, _catmullRomJs.point)(this, x, y);
                break;
        }
        this._l01_a = this._l12_a, this._l12_a = this._l23_a;
        this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a;
        this._x0 = this._x1, this._x1 = this._x2, this._x2 = x;
        this._y0 = this._y1, this._y1 = this._y2, this._y2 = y;
    }
};
exports.default = function custom(alpha) {
    function catmullRom(context) {
        return alpha ? new CatmullRomOpen(context, alpha) : new (0, _cardinalOpenJs.CardinalOpen)(context, 0);
    }
    catmullRom.alpha = function(alpha) {
        return custom(+alpha);
    };
    return catmullRom;
}(0.5);

},{"./cardinalOpen.js":"avKmC","./catmullRom.js":"j2hDs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bZkPo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(context) {
        return new LinearClosed(context);
    });
var _noopJs = require("../noop.js");
var _noopJsDefault = parcelHelpers.interopDefault(_noopJs);
function LinearClosed(context) {
    this._context = context;
}
LinearClosed.prototype = {
    areaStart: (0, _noopJsDefault.default),
    areaEnd: (0, _noopJsDefault.default),
    lineStart: function() {
        this._point = 0;
    },
    lineEnd: function() {
        if (this._point) this._context.closePath();
    },
    point: function(x, y) {
        x = +x, y = +y;
        if (this._point) this._context.lineTo(x, y);
        else this._point = 1, this._context.moveTo(x, y);
    }
};

},{"../noop.js":"f1azw","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"akQ7S":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "monotoneX", ()=>monotoneX);
parcelHelpers.export(exports, "monotoneY", ()=>monotoneY);
function sign(x) {
    return x < 0 ? -1 : 1;
}
// Calculate the slopes of the tangents (Hermite-type interpolation) based on
// the following paper: Steffen, M. 1990. A Simple Method for Monotonic
// Interpolation in One Dimension. Astronomy and Astrophysics, Vol. 239, NO.
// NOV(II), P. 443, 1990.
function slope3(that, x2, y2) {
    var h0 = that._x1 - that._x0, h1 = x2 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0), p = (s0 * h1 + s1 * h0) / (h0 + h1);
    return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p)) || 0;
}
// Calculate a one-sided slope.
function slope2(that, t) {
    var h = that._x1 - that._x0;
    return h ? (3 * (that._y1 - that._y0) / h - t) / 2 : t;
}
// According to https://en.wikipedia.org/wiki/Cubic_Hermite_spline#Representations
// "you can express cubic Hermite interpolation in terms of cubic Bézier curves
// with respect to the four values p0, p0 + m0 / 3, p1 - m1 / 3, p1".
function point(that, t0, t1) {
    var x0 = that._x0, y0 = that._y0, x1 = that._x1, y1 = that._y1, dx = (x1 - x0) / 3;
    that._context.bezierCurveTo(x0 + dx, y0 + dx * t0, x1 - dx, y1 - dx * t1, x1, y1);
}
function MonotoneX(context) {
    this._context = context;
}
MonotoneX.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
        this._point = 0;
    },
    lineEnd: function() {
        switch(this._point){
            case 2:
                this._context.lineTo(this._x1, this._y1);
                break;
            case 3:
                point(this, this._t0, slope2(this, this._t0));
                break;
        }
        if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
        this._line = 1 - this._line;
    },
    point: function(x, y) {
        var t1 = NaN;
        x = +x, y = +y;
        if (x === this._x1 && y === this._y1) return; // Ignore coincident points.
        switch(this._point){
            case 0:
                this._point = 1;
                this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
                break;
            case 1:
                this._point = 2;
                break;
            case 2:
                this._point = 3;
                point(this, slope2(this, t1 = slope3(this, x, y)), t1);
                break;
            default:
                point(this, this._t0, t1 = slope3(this, x, y));
                break;
        }
        this._x0 = this._x1, this._x1 = x;
        this._y0 = this._y1, this._y1 = y;
        this._t0 = t1;
    }
};
function MonotoneY(context) {
    this._context = new ReflectContext(context);
}
(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x, y) {
    MonotoneX.prototype.point.call(this, y, x);
};
function ReflectContext(context) {
    this._context = context;
}
ReflectContext.prototype = {
    moveTo: function(x, y) {
        this._context.moveTo(y, x);
    },
    closePath: function() {
        this._context.closePath();
    },
    lineTo: function(x, y) {
        this._context.lineTo(y, x);
    },
    bezierCurveTo: function(x1, y1, x2, y2, x, y) {
        this._context.bezierCurveTo(y1, x1, y2, x2, y, x);
    }
};
function monotoneX(context) {
    return new MonotoneX(context);
}
function monotoneY(context) {
    return new MonotoneY(context);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ejsSN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(context) {
        return new Natural(context);
    });
function Natural(context) {
    this._context = context;
}
Natural.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x = [];
        this._y = [];
    },
    lineEnd: function() {
        var x = this._x, y = this._y, n = x.length;
        if (n) {
            this._line ? this._context.lineTo(x[0], y[0]) : this._context.moveTo(x[0], y[0]);
            if (n === 2) this._context.lineTo(x[1], y[1]);
            else {
                var px = controlPoints(x), py = controlPoints(y);
                for(var i0 = 0, i1 = 1; i1 < n; ++i0, ++i1)this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x[i1], y[i1]);
            }
        }
        if (this._line || this._line !== 0 && n === 1) this._context.closePath();
        this._line = 1 - this._line;
        this._x = this._y = null;
    },
    point: function(x, y) {
        this._x.push(+x);
        this._y.push(+y);
    }
};
// See https://www.particleincell.com/2012/bezier-splines/ for derivation.
function controlPoints(x) {
    var i, n = x.length - 1, m, a = new Array(n), b = new Array(n), r = new Array(n);
    a[0] = 0, b[0] = 2, r[0] = x[0] + 2 * x[1];
    for(i = 1; i < n - 1; ++i)a[i] = 1, b[i] = 4, r[i] = 4 * x[i] + 2 * x[i + 1];
    a[n - 1] = 2, b[n - 1] = 7, r[n - 1] = 8 * x[n - 1] + x[n];
    for(i = 1; i < n; ++i)m = a[i] / b[i - 1], b[i] -= m, r[i] -= m * r[i - 1];
    a[n - 1] = r[n - 1] / b[n - 1];
    for(i = n - 2; i >= 0; --i)a[i] = (r[i] - a[i + 1]) / b[i];
    b[n - 1] = (x[n] + a[n - 1]) / 2;
    for(i = 0; i < n - 1; ++i)b[i] = 2 * x[i + 1] - a[i + 1];
    return [
        a,
        b
    ];
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cenwN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(context) {
        return new Step(context, 0.5);
    });
parcelHelpers.export(exports, "stepBefore", ()=>stepBefore);
parcelHelpers.export(exports, "stepAfter", ()=>stepAfter);
function Step(context, t) {
    this._context = context;
    this._t = t;
}
Step.prototype = {
    areaStart: function() {
        this._line = 0;
    },
    areaEnd: function() {
        this._line = NaN;
    },
    lineStart: function() {
        this._x = this._y = NaN;
        this._point = 0;
    },
    lineEnd: function() {
        if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
        if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
        if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
    },
    point: function(x, y) {
        x = +x, y = +y;
        switch(this._point){
            case 0:
                this._point = 1;
                this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
                break;
            case 1:
                this._point = 2; // proceed
            default:
                if (this._t <= 0) {
                    this._context.lineTo(this._x, y);
                    this._context.lineTo(x, y);
                } else {
                    var x1 = this._x * (1 - this._t) + x * this._t;
                    this._context.lineTo(x1, this._y);
                    this._context.lineTo(x1, y);
                }
                break;
        }
        this._x = x, this._y = y;
    }
};
function stepBefore(context) {
    return new Step(context, 0);
}
function stepAfter(context) {
    return new Step(context, 1);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"04Lp5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        var keys = (0, _constantJsDefault.default)([]), order = (0, _noneJsDefault1.default), offset = (0, _noneJsDefault.default), value = stackValue;
        function stack(data) {
            var kz = keys.apply(this, arguments), i, m = data.length, n = kz.length, sz = new Array(n), oz;
            for(i = 0; i < n; ++i){
                for(var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j){
                    si[j] = sij = [
                        0,
                        +value(data[j], ki, j, data)
                    ];
                    sij.data = data[j];
                }
                si.key = ki;
            }
            for(i = 0, oz = order(sz); i < n; ++i)sz[oz[i]].index = i;
            offset(sz, oz);
            return sz;
        }
        stack.keys = function(_) {
            return arguments.length ? (keys = typeof _ === "function" ? _ : (0, _constantJsDefault.default)((0, _arrayJs.slice).call(_)), stack) : keys;
        };
        stack.value = function(_) {
            return arguments.length ? (value = typeof _ === "function" ? _ : (0, _constantJsDefault.default)(+_), stack) : value;
        };
        stack.order = function(_) {
            return arguments.length ? (order = _ == null ? (0, _noneJsDefault1.default) : typeof _ === "function" ? _ : (0, _constantJsDefault.default)((0, _arrayJs.slice).call(_)), stack) : order;
        };
        stack.offset = function(_) {
            return arguments.length ? (offset = _ == null ? (0, _noneJsDefault.default) : _, stack) : offset;
        };
        return stack;
    });
var _arrayJs = require("./array.js");
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _noneJs = require("./offset/none.js");
var _noneJsDefault = parcelHelpers.interopDefault(_noneJs);
var _noneJs1 = require("./order/none.js");
var _noneJsDefault1 = parcelHelpers.interopDefault(_noneJs1);
function stackValue(d, key) {
    return d[key];
}

},{"./array.js":"6SJ8v","./constant.js":"dFe8v","./offset/none.js":"h0h85","./order/none.js":"30Qqt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"h0h85":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(series, order) {
        if (!((n = series.length) > 1)) return;
        for(var i = 1, j, s0, s1 = series[order[0]], n, m = s1.length; i < n; ++i){
            s0 = s1, s1 = series[order[i]];
            for(j = 0; j < m; ++j)s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
        }
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"30Qqt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(series) {
        var n = series.length, o = new Array(n);
        while(--n >= 0)o[n] = n;
        return o;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bE3nk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(series, order) {
        if (!((n = series.length) > 0)) return;
        for(var i, n, j = 0, m = series[0].length, y; j < m; ++j){
            for(y = i = 0; i < n; ++i)y += series[i][j][1] || 0;
            if (y) for(i = 0; i < n; ++i)series[i][j][1] /= y;
        }
        (0, _noneJsDefault.default)(series, order);
    });
var _noneJs = require("./none.js");
var _noneJsDefault = parcelHelpers.interopDefault(_noneJs);

},{"./none.js":"h0h85","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7vGu2":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(series, order) {
        if (!((n = series.length) > 0)) return;
        for(var i, j = 0, d, dy, yp, yn, n, m = series[order[0]].length; j < m; ++j)for(yp = yn = 0, i = 0; i < n; ++i){
            if ((dy = (d = series[order[i]][j])[1] - d[0]) > 0) d[0] = yp, d[1] = yp += dy;
            else if (dy < 0) d[1] = yn, d[0] = yn += dy;
            else d[0] = 0, d[1] = dy;
        }
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ez0ZX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(series, order) {
        if (!((n = series.length) > 0)) return;
        for(var j = 0, s0 = series[order[0]], n, m = s0.length; j < m; ++j){
            for(var i = 0, y = 0; i < n; ++i)y += series[i][j][1] || 0;
            s0[j][1] += s0[j][0] = -y / 2;
        }
        (0, _noneJsDefault.default)(series, order);
    });
var _noneJs = require("./none.js");
var _noneJsDefault = parcelHelpers.interopDefault(_noneJs);

},{"./none.js":"h0h85","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hJZrV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(series, order) {
        if (!((n = series.length) > 0) || !((m = (s0 = series[order[0]]).length) > 0)) return;
        for(var y = 0, j = 1, s0, m, n; j < m; ++j){
            for(var i = 0, s1 = 0, s2 = 0; i < n; ++i){
                var si = series[order[i]], sij0 = si[j][1] || 0, sij1 = si[j - 1][1] || 0, s3 = (sij0 - sij1) / 2;
                for(var k = 0; k < i; ++k){
                    var sk = series[order[k]], skj0 = sk[j][1] || 0, skj1 = sk[j - 1][1] || 0;
                    s3 += skj0 - skj1;
                }
                s1 += sij0, s2 += s3 * sij0;
            }
            s0[j - 1][1] += s0[j - 1][0] = y;
            if (s1) y -= s2 / s1;
        }
        s0[j - 1][1] += s0[j - 1][0] = y;
        (0, _noneJsDefault.default)(series, order);
    });
var _noneJs = require("./none.js");
var _noneJsDefault = parcelHelpers.interopDefault(_noneJs);

},{"./none.js":"h0h85","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fDXA7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(series) {
        var peaks = series.map(peak);
        return (0, _noneJsDefault.default)(series).sort(function(a, b) {
            return peaks[a] - peaks[b];
        });
    });
var _noneJs = require("./none.js");
var _noneJsDefault = parcelHelpers.interopDefault(_noneJs);
function peak(series) {
    var i = -1, j = 0, n = series.length, vi, vj = -Infinity;
    while(++i < n)if ((vi = +series[i][1]) > vj) vj = vi, j = i;
    return j;
}

},{"./none.js":"30Qqt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"17HfK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(series) {
        var sums = series.map(sum);
        return (0, _noneJsDefault.default)(series).sort(function(a, b) {
            return sums[a] - sums[b];
        });
    });
parcelHelpers.export(exports, "sum", ()=>sum);
var _noneJs = require("./none.js");
var _noneJsDefault = parcelHelpers.interopDefault(_noneJs);
function sum(series) {
    var s = 0, i = -1, n = series.length, v;
    while(++i < n)if (v = +series[i][1]) s += v;
    return s;
}

},{"./none.js":"30Qqt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fTuOf":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(series) {
        return (0, _ascendingJsDefault.default)(series).reverse();
    });
var _ascendingJs = require("./ascending.js");
var _ascendingJsDefault = parcelHelpers.interopDefault(_ascendingJs);

},{"./ascending.js":"17HfK","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4CNKk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(series) {
        var n = series.length, i, j, sums = series.map((0, _ascendingJs.sum)), order = (0, _appearanceJsDefault.default)(series), top = 0, bottom = 0, tops = [], bottoms = [];
        for(i = 0; i < n; ++i){
            j = order[i];
            if (top < bottom) {
                top += sums[j];
                tops.push(j);
            } else {
                bottom += sums[j];
                bottoms.push(j);
            }
        }
        return bottoms.reverse().concat(tops);
    });
var _appearanceJs = require("./appearance.js");
var _appearanceJsDefault = parcelHelpers.interopDefault(_appearanceJs);
var _ascendingJs = require("./ascending.js");

},{"./appearance.js":"fDXA7","./ascending.js":"17HfK","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4K6jR":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(series) {
        return (0, _noneJsDefault.default)(series).reverse();
    });
var _noneJs = require("./none.js");
var _noneJsDefault = parcelHelpers.interopDefault(_noneJs);

},{"./none.js":"30Qqt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bV6WG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "controlPoint", ()=>controlPoint);
parcelHelpers.export(exports, "firstControlPoint", ()=>firstControlPoint);
parcelHelpers.export(exports, "poiPoint", ()=>poiPoint);
parcelHelpers.export(exports, "lastControlPoint", ()=>lastControlPoint);
parcelHelpers.export(exports, "numberedControlPoint", ()=>numberedControlPoint);
parcelHelpers.export(exports, "sketchControlPoint", ()=>sketchControlPoint);
parcelHelpers.export(exports, "trackLine", ()=>trackLine);
parcelHelpers.export(exports, "trackLineModifying", ()=>trackLineModifying);
/**
 * @param {import("ol/Feature").FeatureLike} feature
 * @return {?Style}
 */ parcelHelpers.export(exports, "styleFunction", ()=>styleFunction);
/**
 * @param {?string} strokeColor
 * @return {Style}
 */ parcelHelpers.export(exports, "externalLayerStyle", ()=>externalLayerStyle);
/**
 * @typedef {Object} TrackHoverUrlOptions
 * @property {string} src
 * @property {[number, number]} imgSize
 * @property {number} scale
 */ /**
 * @param {TrackHoverUrlOptions} options
 * @return {Style}
 */ parcelHelpers.export(exports, "createProfileHoverStyle", ()=>createProfileHoverStyle);
var _styleJs = require("ol/style.js");
const controlPoint = new (0, _styleJs.Style)({
    zIndex: 10,
    image: new (0, _styleJs.Circle)({
        radius: 8,
        fill: new (0, _styleJs.Fill)({
            color: "white"
        })
    })
});
const firstControlPoint = new (0, _styleJs.Style)({
    zIndex: 10,
    image: new (0, _styleJs.Circle)({
        radius: 8,
        fill: new (0, _styleJs.Fill)({
            color: "green"
        })
    })
});
const poiPoint = new (0, _styleJs.Style)({
    zIndex: 100,
    image: new (0, _styleJs.Circle)({
        radius: 8,
        fill: new (0, _styleJs.Fill)({
            color: "yellow"
        })
    })
});
const lastControlPoint = new (0, _styleJs.Style)({
    zIndex: 10,
    image: new (0, _styleJs.Circle)({
        radius: 8,
        fill: new (0, _styleJs.Fill)({
            color: "red"
        })
    })
});
const numberedControlPoint = new (0, _styleJs.Style)({
    zIndex: 10,
    image: new (0, _styleJs.Circle)({
        radius: 8,
        fill: new (0, _styleJs.Fill)({
            color: "#ffffffdd"
        })
    }),
    text: new (0, _styleJs.Text)({
        fill: new (0, _styleJs.Fill)({
            color: "blue"
        })
    })
});
const sketchControlPoint = new (0, _styleJs.Style)({
    image: new (0, _styleJs.Circle)({
        radius: 5,
        fill: new (0, _styleJs.Fill)({
            color: "#ffffffdd"
        })
    })
});
const sketchLabel = {
    "POI": new (0, _styleJs.Style)({
        text: new (0, _styleJs.Text)({
            font: "20px sans-serif",
            offsetX: 20,
            textAlign: "left",
            backgroundFill: new (0, _styleJs.Fill)({
                color: "#ffffffaa"
            }),
            text: "click to delete\ndrag to move POI"
        })
    }),
    "cp": new (0, _styleJs.Style)({
        text: new (0, _styleJs.Text)({
            font: "20px sans-serif",
            offsetX: 20,
            textAlign: "left",
            backgroundFill: new (0, _styleJs.Fill)({
                color: "#ffffffaa"
            }),
            text: "click to delete\ndrag to move point"
        })
    }),
    "segment": new (0, _styleJs.Style)({
        text: new (0, _styleJs.Text)({
            backgroundFill: new (0, _styleJs.Fill)({
                color: "#ffffffaa"
            }),
            offsetX: 20,
            textAlign: "left",
            font: "20px sans-serif",
            text: "drag to create point"
        })
    })
};
const trackLine = new (0, _styleJs.Style)({
    stroke: new (0, _styleJs.Stroke)({
        color: "purple",
        width: 6
    })
});
const trackLineModifying = new (0, _styleJs.Style)({
    stroke: new (0, _styleJs.Stroke)({
        color: "purple",
        width: 3,
        lineDash: [
            5,
            9
        ]
    })
});
function styleFunction(feature) {
    const type = feature.get("type");
    const subtype = feature.get("subtype");
    const index = feature.get("index");
    switch(type){
        case "sketch":
            if (subtype) return [
                sketchControlPoint,
                sketchLabel[subtype]
            ];
            return sketchControlPoint;
        case "POI":
            return poiPoint;
        case "controlPoint":
            switch(subtype){
                case "first":
                    return firstControlPoint;
                case "last":
                    return lastControlPoint;
                default:
                    if (index !== undefined) {
                        numberedControlPoint.getText().setText(index.toString());
                        return numberedControlPoint;
                    }
                    return controlPoint;
            }
        case "segment":
            switch(subtype){
                case "modifying":
                    return trackLineModifying;
                default:
                    return trackLine;
            }
        default:
            return null;
    }
}
function externalLayerStyle(strokeColor = "#e3ff00") {
    return new (0, _styleJs.Style)({
        stroke: new (0, _styleJs.Stroke)({
            color: strokeColor,
            width: 3
        })
    });
}
function createProfileHoverStyle(options) {
    return new (0, _styleJs.Style)({
        image: new (0, _styleJs.Icon)(options)
    });
}

},{"ol/style.js":"hEQxF","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2SIll":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "createMap", ()=>createMap);
var _epsg2056 = require("@geoblocks/proj/src/EPSG_2056");
var _epsg2056Default = parcelHelpers.interopDefault(_epsg2056);
var _tile = require("ol/layer/Tile");
var _tileDefault = parcelHelpers.interopDefault(_tile);
var _osm = require("ol/source/OSM");
var _osmDefault = parcelHelpers.interopDefault(_osm);
var _vector = require("ol/layer/Vector");
var _vectorDefault = parcelHelpers.interopDefault(_vector);
var _vector1 = require("ol/source/Vector");
var _vectorDefault1 = parcelHelpers.interopDefault(_vector1);
var _ol = require("ol");
var _style = require("./style");
var _proj = require("ol/proj");
var _shadowtrack = require("./shadowtrack");
function createMap(target) {
    const trackSource = new (0, _vectorDefault1.default)();
    const trackLayer = new (0, _vectorDefault.default)({
        source: trackSource,
        style: (0, _style.styleFunction)
    });
    const extent = (0, _proj.transformExtent)((0, _epsg2056.proj).getExtent(), (0, _epsg2056Default.default), "EPSG:3857");
    const view = new (0, _ol.View)({
        extent: extent,
        center: (0, _proj.transform)([
            2532661.0,
            1151654.0
        ], (0, _epsg2056Default.default), "EPSG:3857"),
        zoom: 10
    });
    const bgLayer = new (0, _tileDefault.default)({
        source: new (0, _osmDefault.default)()
    });
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

},{"@geoblocks/proj/src/EPSG_2056":"9pCNe","ol/layer/Tile":"3ytzs","ol/source/OSM":"dmxOv","ol/layer/Vector":"iTrAy","ol/source/Vector":"9w7Fr","ol":"3a1E4","./style":"bV6WG","ol/proj":"SznqC","./shadowtrack":"gmvf6","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dmxOv":[function(require,module,exports) {
/**
 * @module ol/source/OSM
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ATTRIBUTION", ()=>ATTRIBUTION);
var _xyzJs = require("./XYZ.js");
var _xyzJsDefault = parcelHelpers.interopDefault(_xyzJs);
const ATTRIBUTION = '&#169; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors.';
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
 * @property {null|string} [crossOrigin='anonymous'] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {number} [maxZoom=19] Max zoom.
 * @property {boolean} [opaque=true] Whether the layer is opaque.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {number} [transition=250] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {string} [url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'] URL template.
 * Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */ /**
 * @classdesc
 * Layer source for the OpenStreetMap tile server.
 * @api
 */ class OSM extends (0, _xyzJsDefault.default) {
    /**
   * @param {Options} [options] Open Street Map options.
   */ constructor(options){
        options = options || {};
        let attributions;
        if (options.attributions !== undefined) attributions = options.attributions;
        else attributions = [
            ATTRIBUTION
        ];
        const crossOrigin = options.crossOrigin !== undefined ? options.crossOrigin : "anonymous";
        const url = options.url !== undefined ? options.url : "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
        super({
            attributions: attributions,
            attributionsCollapsible: false,
            cacheSize: options.cacheSize,
            crossOrigin: crossOrigin,
            interpolate: options.interpolate,
            maxZoom: options.maxZoom !== undefined ? options.maxZoom : 19,
            opaque: options.opaque !== undefined ? options.opaque : true,
            reprojectionErrorThreshold: options.reprojectionErrorThreshold,
            tileLoadFunction: options.tileLoadFunction,
            transition: options.transition,
            url: url,
            wrapX: options.wrapX,
            zDirection: options.zDirection
        });
    }
}
exports.default = OSM;

},{"./XYZ.js":"7BJTx","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7BJTx":[function(require,module,exports) {
/**
 * @module ol/source/XYZ
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _tileImageJs = require("./TileImage.js");
var _tileImageJsDefault = parcelHelpers.interopDefault(_tileImageJs);
var _tilegridJs = require("../tilegrid.js");
/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize] Initial tile cache size. Will auto-grow to hold at least the number of tiles in the viewport.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you want to access pixel data with the Canvas renderer.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [interpolate=true] Use interpolated values when resampling.  By default,
 * linear interpolation is used when resampling.  Set to false to use the nearest neighbor instead.
 * @property {boolean} [opaque=false] Whether the layer is opaque.
 * @property {import("../proj.js").ProjectionLike} [projection='EPSG:3857'] Projection.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {number} [maxZoom=42] Optional max zoom level. Not used if `tileGrid` is provided.
 * @property {number} [minZoom=0] Optional min zoom level. Not used if `tileGrid` is provided.
 * @property {number} [maxResolution] Optional tile grid resolution at level zero. Not used if `tileGrid` is provided.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {number} [tilePixelRatio=1] The pixel ratio used by the tile service.
 * For example, if the tile service advertizes 256px by 256px tiles but actually sends 512px
 * by 512px images (for retina/hidpi devices) then `tilePixelRatio`
 * should be set to `2`.
 * @property {number|import("../size.js").Size} [tileSize=[256, 256]] The tile size used by the tile service.
 * Not used if `tileGrid` is provided.
 * @property {number} [gutter=0] The size in pixels of the gutter around image tiles to ignore.
 * This allows artifacts of rendering at tile edges to be ignored.
 * Supported images should be wider and taller than the tile size by a value of `2 x gutter`.
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction] Optional function to get
 * tile URL given a tile coordinate and the projection.
 * Required if `url` or `urls` are not provided.
 * @property {string} [url] URL template. Must include `{x}`, `{y}` or `{-y}`,
 * and `{z}` placeholders. A `{?-?}` template pattern, for example `subdomain{a-f}.domain.com`,
 * may be used instead of defining each one separately in the `urls` option.
 * @property {Array<string>} [urls] An array of URL templates.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number} [transition=250] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {number|import("../array.js").NearestDirectionFunction} [zDirection=0]
 * Choose whether to use tiles with a higher or lower zoom level when between integer
 * zoom levels. See {@link module:ol/tilegrid/TileGrid~TileGrid#getZForResolution}.
 */ /**
 * @classdesc
 * Layer source for tile data with URLs in a set XYZ format that are
 * defined in a URL template. By default, this follows the widely-used
 * Google grid where `x` 0 and `y` 0 are in the top left. Grids like
 * TMS where `x` 0 and `y` 0 are in the bottom left can be used by
 * using the `{-y}` placeholder in the URL template, so long as the
 * source does not have a custom tile grid. In this case
 * a `tileUrlFunction` can be used, such as:
 * ```js
 *  tileUrlFunction: function(coordinate) {
 *    return 'http://mapserver.com/' + coordinate[0] + '/' +
 *      coordinate[1] + '/' + (-coordinate[2] - 1) + '.png';
 *  }
 * ```
 * @api
 */ class XYZ extends (0, _tileImageJsDefault.default) {
    /**
   * @param {Options} [options] XYZ options.
   */ constructor(options){
        options = options || {};
        const projection = options.projection !== undefined ? options.projection : "EPSG:3857";
        const tileGrid = options.tileGrid !== undefined ? options.tileGrid : (0, _tilegridJs.createXYZ)({
            extent: (0, _tilegridJs.extentFromProjection)(projection),
            maxResolution: options.maxResolution,
            maxZoom: options.maxZoom,
            minZoom: options.minZoom,
            tileSize: options.tileSize
        });
        super({
            attributions: options.attributions,
            cacheSize: options.cacheSize,
            crossOrigin: options.crossOrigin,
            interpolate: options.interpolate,
            opaque: options.opaque,
            projection: projection,
            reprojectionErrorThreshold: options.reprojectionErrorThreshold,
            tileGrid: tileGrid,
            tileLoadFunction: options.tileLoadFunction,
            tilePixelRatio: options.tilePixelRatio,
            tileUrlFunction: options.tileUrlFunction,
            url: options.url,
            urls: options.urls,
            wrapX: options.wrapX !== undefined ? options.wrapX : true,
            transition: options.transition,
            attributionsCollapsible: options.attributionsCollapsible,
            zDirection: options.zDirection
        });
        /**
     * @private
     * @type {number}
     */ this.gutter_ = options.gutter !== undefined ? options.gutter : 0;
    }
    /**
   * @return {number} Gutter.
   */ getGutter() {
        return this.gutter_;
    }
}
exports.default = XYZ;

},{"./TileImage.js":"2cBKP","../tilegrid.js":"1Yr4i","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gmvf6":[function(require,module,exports) {
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

},{"ol/style":"hEQxF","ol/source/Vector.js":"9w7Fr","ol/layer/Vector.js":"iTrAy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["M6Z7R","f4bRs"], "f4bRs", "parcelRequireed82")

//# sourceMappingURL=simple.8341b5a4.js.map
