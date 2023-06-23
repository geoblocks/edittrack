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
var _profile = require("../../src/Profile");
var _profileDefault = parcelHelpers.interopDefault(_profile);
var _style = require("./style");
var _style1 = require("ol/style");
var _osm = require("./osm");
const ROUTING_URL = "https://graphhopper-all.schweizmobil.ch/route?vehicle=schmwander&type=json&weighting=fastest&elevation=true&way_point_max_distance=0&instructions=false&points_encoded=true";
function main() {
    const { map , trackLayer , shadowTrackLayer  } = (0, _osm.createMap)("map");
    const router = new (0, _graphHopperDefault.default)({
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
   */ const d3Profile = new (0, _profileDefault.default)({
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

},{"ol/style":"hEQxF","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","../../src/interaction/TrackManager":"bPLJ7","../../src/router/GraphHopper":"g55Xa","../../src/profiler/index":"d5CmD","../../src/Profile":"i4hMD","./style":"bV6WG","./osm":"2SIll"}],"bV6WG":[function(require,module,exports) {
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
 * @param {number} _
 * @return {?Style}
 */ parcelHelpers.export(exports, "styleFunction", ()=>styleFunction);
/**
 * @param {string=} strokeColor
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
function styleFunction(feature, _) {
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
