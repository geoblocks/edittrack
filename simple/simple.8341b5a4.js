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
})({"ijkuy":[function(require,module,exports) {
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

},{}],"f4bRs":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
var _trackManager = require("../../src/interaction/TrackManager");
var _trackManagerDefault = parcelHelpers.interopDefault(_trackManager);
var _graphHopperTs = require("../../src/router/GraphHopper.ts");
var _graphHopperTsDefault = parcelHelpers.interopDefault(_graphHopperTs);
var _indexTs = require("../../src/profiler/index.ts");
var _style = require("./style");
var _osm = require("./osm");
var _ol = require("ol");
var _elevationProfile = require("@geoblocks/elevation-profile");
const ROUTING_URL = "https://graphhopper-all.schweizmobil.ch/route?vehicle=schmwander&type=json&weighting=fastest&elevation=true&way_point_max_distance=0&instructions=false&points_encoded=true";
function main() {
    const { map, trackLayer, shadowTrackLayer } = (0, _osm.createMap)("map");
    const router = new (0, _graphHopperTsDefault.default)({
        map: map,
        url: ROUTING_URL,
        maxRoutingTolerance: 15
    });
    const profiler = new (0, _indexTs.FallbackProfiler)({
        profilers: [
            new (0, _indexTs.ExtractFromSegmentProfiler)(),
            new (0, _indexTs.SwisstopoProfiler)({
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
        style: (0, _style.styleRules),
        deleteCondition: deleteCondition,
        hitTolerance: 10
    });
    window.trackManager = trackManager;
    const profileElement = document.querySelector("#profile");
    trackManager.addTrackChangeEventListener(()=>{
        trackManager.trackData_.assertValid();
        const fullProfile = [];
        let distance = 0;
        for (const segment of trackManager.getSegments()){
            const profile = segment.get("profile");
            fullProfile.push(...profile.map((c)=>[
                    c[0],
                    c[1],
                    c[2],
                    c[3] + distance
                ]));
            distance += profile.at(-1).at(3);
        }
        profileElement.lines = [
            fullProfile
        ];
    });
    // trackManager.addTrackHoverEventListener((distance) => {
    //   if (distance !== undefined) {
    //     d3Profile.highlight(distance);
    //   } else {
    //     d3Profile.clearHighlight();
    //   }
    // });
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
    document.querySelector("#addPoi").addEventListener("click", ()=>{
        const elem = document.createElement("div");
        elem.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" id="i_location" width="24" height="24" viewBox="0 0 24 24">\n        <rect id="Rechteck_3117" data-name="Rechteck 3117" width="24" height="24" fill="none"/>\n        <path id="icons8-location" d="M12,2.01A7,7,0,0,0,5.008,9c0,4.483,5.967,11.765,6.221,12.072l.771.936.771-.936c.254-.308,6.221-7.589,6.221-12.072A7,7,0,0,0,12,2.01Zm0,2A5,5,0,0,1,16.992,9c0,2.7-3.114,7.357-4.992,9.822C10.122,16.363,7.008,11.713,7.008,9A5,5,0,0,1,12,4.01ZM12,6.5A2.5,2.5,0,1,0,14.5,9,2.5,2.5,0,0,0,12,6.5Z" transform="translate(0.992 -1.01)"/>\n      </svg>';
        const poiOverlay = new (0, _ol.Overlay)({
            positioning: "center-center",
            offset: [
                0,
                -16
            ],
            position: null,
            element: elem
        });
        const onAddListener = ()=>{
            document.querySelector("#poiForm").style.display = "block";
            const save = ()=>{
                trackManager.finishPOIDrawing({
                    name: document.querySelector("#poiNameInput").value
                });
                document.querySelector("#poiSave").removeEventListener("click", save);
                document.querySelector("#poiForm").style.display = "none";
            };
            const cancel = ()=>{
                trackManager.cancelPOIDrawing();
                document.querySelector("#poiCancel").removeEventListener("click", cancel);
                document.querySelector("#poiForm").style.display = "none";
            };
            document.querySelector("#poiSave").addEventListener("click", save);
            document.querySelector("#poiCancel").addEventListener("click", cancel);
        };
        trackManager.addPOI(poiOverlay, onAddListener);
    });
}
main();

},{"../../src/interaction/TrackManager":"bPLJ7","../../src/router/GraphHopper.ts":"fak2b","../../src/profiler/index.ts":"1rK0e","./style":"bV6WG","./osm":"2SIll","ol":"3a1E4","@geoblocks/elevation-profile":"fmUZ9","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bV6WG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "controlPoint", ()=>controlPoint);
parcelHelpers.export(exports, "sketchControlPoint", ()=>sketchControlPoint);
parcelHelpers.export(exports, "trackLine", ()=>trackLine);
parcelHelpers.export(exports, "trackLineModifying", ()=>trackLineModifying);
parcelHelpers.export(exports, "poiPoint", ()=>poiPoint);
parcelHelpers.export(exports, "numberedControlPoint", ()=>numberedControlPoint);
parcelHelpers.export(exports, "snappedTrue", ()=>snappedTrue);
parcelHelpers.export(exports, "snappedFalse", ()=>snappedFalse);
parcelHelpers.export(exports, "sketchLabel", ()=>sketchLabel);
parcelHelpers.export(exports, "sketchLabelPOI", ()=>sketchLabelPOI);
parcelHelpers.export(exports, "sketchLabelControlPoint", ()=>sketchLabelControlPoint);
parcelHelpers.export(exports, "sketchLabelSegment", ()=>sketchLabelSegment);
parcelHelpers.export(exports, "styleRules", ()=>styleRules);
const controlPoint = {
    "z-index": 10,
    "circle-radius": 8,
    "circle-fill-color": "white"
};
const sketchControlPoint = {
    "circle-radius": 5,
    "circle-fill-color": "#ffffffdd"
};
const trackLine = {
    "stroke-width": 6,
    "stroke-color": "purple"
};
const trackLineModifying = {
    ...trackLine,
    "stroke-width": 3,
    "stroke-line-dash": [
        5,
        9
    ]
};
const poiPoint = {
    "z-index": 100,
    "circle-radius": 8,
    "circle-fill-color": "yellow",
    "text-font": "bold 11px Inter",
    "text-fill-color": "#000",
    // use 'concat' to convert number to string
    "text-value": [
        "concat",
        [
            "get",
            "index"
        ],
        ""
    ]
};
const numberedControlPoint = {
    ...controlPoint,
    "circle-fill-color": "#ffffffdd",
    "text-color": "blue",
    // use 'concat' to convert number to string
    "text-value": [
        "concat",
        [
            "get",
            "index"
        ],
        ""
    ]
};
const snappedTrue = {
    ...controlPoint,
    "circle-fill-color": "green"
};
const snappedFalse = {
    ...controlPoint,
    "circle-fill-color": "red"
};
const sketchLabel = {
    "text-font": "20px sans-serif",
    "text-offset-x": 20,
    "text-align": "left",
    "text-background-fill-color": "#ffffffaa"
};
const sketchLabelPOI = {
    ...sketchLabel,
    "text-value": "click to delete\ndrag to move POI"
};
const sketchLabelControlPoint = {
    ...sketchLabel,
    "text-value": "click to delete\ndrag to move point"
};
const sketchLabelSegment = {
    ...sketchLabel,
    "text-value": "drag to create point"
};
const styleRules = [
    {
        filter: [
            "==",
            [
                "get",
                "type"
            ],
            "sketch"
        ],
        style: sketchControlPoint
    },
    {
        filter: [
            "all",
            [
                "==",
                [
                    "get",
                    "type"
                ],
                "sketch"
            ],
            [
                "==",
                [
                    "get",
                    "subtype"
                ],
                "POI"
            ]
        ],
        style: sketchLabelPOI
    },
    {
        filter: [
            "all",
            [
                "==",
                [
                    "get",
                    "type"
                ],
                "sketch"
            ],
            [
                "==",
                [
                    "get",
                    "subtype"
                ],
                "controlPoint"
            ]
        ],
        style: sketchLabelControlPoint
    },
    {
        filter: [
            "all",
            [
                "==",
                [
                    "get",
                    "type"
                ],
                "sketch"
            ],
            [
                "==",
                [
                    "get",
                    "subtype"
                ],
                "segment"
            ]
        ],
        style: sketchLabelSegment
    },
    {
        filter: [
            "==",
            [
                "get",
                "type"
            ],
            "POI"
        ],
        style: poiPoint
    },
    {
        filter: [
            "==",
            [
                "get",
                "type"
            ],
            "controlPoint"
        ],
        style: numberedControlPoint
    },
    {
        filter: [
            "all",
            [
                "==",
                [
                    "get",
                    "type"
                ],
                "controlPoint"
            ],
            [
                "==",
                [
                    "get",
                    "snapped"
                ],
                true
            ]
        ],
        style: snappedTrue
    },
    {
        filter: [
            "all",
            [
                "==",
                [
                    "get",
                    "type"
                ],
                "controlPoint"
            ],
            [
                "==",
                [
                    "get",
                    "snapped"
                ],
                false
            ]
        ],
        style: snappedFalse
    },
    {
        filter: [
            "all",
            [
                "==",
                [
                    "get",
                    "type"
                ],
                "segment"
            ],
            [
                "!=",
                [
                    "get",
                    "subtype"
                ],
                "modifying"
            ]
        ],
        style: trackLine
    },
    {
        filter: [
            "all",
            [
                "==",
                [
                    "get",
                    "type"
                ],
                "segment"
            ],
            [
                "==",
                [
                    "get",
                    "subtype"
                ],
                "modifying"
            ]
        ],
        style: trackLineModifying
    }
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2SIll":[function(require,module,exports) {
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
        style: (0, _style.styleRules)
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
/**
 *
 * @return {VectorLayer}
 */ parcelHelpers.export(exports, "createShadowLayer", ()=>createShadowLayer);
var _vectorJs = require("ol/source/Vector.js");
var _vectorJsDefault = parcelHelpers.interopDefault(_vectorJs);
var _vectorJs1 = require("ol/layer/Vector.js");
var _vectorJsDefault1 = parcelHelpers.interopDefault(_vectorJs1);
function createShadowLayer() {
    return new (0, _vectorJsDefault1.default)({
        source: new (0, _vectorJsDefault.default)(),
        style: {
            "stroke-color": "#00cc33aa",
            "stroke-width": 6
        }
    });
}

},{"ol/source/Vector.js":"9w7Fr","ol/layer/Vector.js":"iTrAy","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fmUZ9":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>$916babf1e6dc2c08$export$2e2bcd8739ae039);
var _lit = require("lit");
var _decoratorsJs = require("lit/decorators.js");
var _resizeControllerJs = require("@lit-labs/observers/resize-controller.js");
var _d3Array = require("d3-array");
var _d3Scale = require("d3-scale");
var _d3Shape = require("d3-shape");
var _d3Axis = require("d3-axis");
var _d3Selection = require("d3-selection");
var _simplifyJs = require("simplify-js");
var _simplifyJsDefault = parcelHelpers.interopDefault(_simplifyJs);
var $916babf1e6dc2c08$var$__decorate = function(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let $916babf1e6dc2c08$var$ElevationProfile = class ElevationProfile extends (0, _lit.LitElement) {
    constructor(){
        super(...arguments);
        this.tolerance = 1;
        this.locale = navigator.language;
        this.lines = [];
        this.updateScale = (x, y, width, height)=>{};
        this.margin = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 40
        };
        this.tickSize = {
            x: 100,
            y: 40
        };
        this.pointer = {
            x: 0,
            y: 0
        };
        this._resizeController = new (0, _resizeControllerJs.ResizeController)(this, {});
        this.plotData = [];
        this.scaleX = (0, _d3Scale.scaleLinear)();
        this.scaleY = (0, _d3Scale.scaleLinear)();
        this.bisectDistance = (0, _d3Array.bisector)((point)=>point.x);
        this.line = (0, _d3Shape.line)().defined((point)=>!isNaN(point.y)).x((point)=>this.scaleX(point.x)).y((point)=>this.scaleY(point.y));
        this.area = (0, _d3Shape.area)().defined((point)=>!isNaN(point.y)).x((point)=>this.scaleX(point.x)).y1((point)=>this.scaleY(point.y));
        this.xAxis = (0, _d3Axis.axisBottom)(this.scaleX).tickFormat((value)=>this.tickFormat(value));
        this.yAxis = (0, _d3Axis.axisLeft)(this.scaleY).tickFormat((value)=>this.meterFormat.format(value));
        this.xGrid = (0, _d3Axis.axisBottom)(this.scaleX).tickFormat(()=>"");
        this.yGrid = (0, _d3Axis.axisLeft)(this.scaleY).tickFormat(()=>"");
        this.meterFormat = null;
        this.kilometerFormat = null;
    }
    updated(changedProperties) {
        if (changedProperties.has("locale")) {
            this.meterFormat = new Intl.NumberFormat(this.locale, {
                style: "unit",
                unit: "meter"
            });
            this.kilometerFormat = new Intl.NumberFormat(this.locale, {
                style: "unit",
                unit: "kilometer"
            });
        }
    }
    willUpdate(changedProperties) {
        if (changedProperties.has("lines")) {
            this.plotData.length = 0;
            for (const line of this.lines){
                const data = line.map((coordinate)=>({
                        x: coordinate[3],
                        y: coordinate[2],
                        coordinate: coordinate
                    }));
                this.plotData.push(...(0, _simplifyJsDefault.default)(data, this.tolerance));
                this.plotData.push({
                    x: line[line.length - 1][3],
                    y: NaN,
                    coordinate: []
                });
            }
            this.scaleX.domain((0, _d3Array.extent)(this.plotData, (data)=>data.x));
            this.scaleY.domain((0, _d3Array.extent)(this.plotData, (data)=>data.y)).nice();
            this.updateScale(this.scaleX, this.scaleY, this.offsetWidth, this.offsetHeight);
        }
    }
    render() {
        const width = this.offsetWidth;
        const height = this.offsetHeight;
        this.scaleX.range([
            this.margin.left,
            width - this.margin.right
        ]);
        this.scaleY.range([
            height - this.margin.bottom,
            this.margin.top
        ]);
        this.area.y0(height - this.margin.bottom);
        this.yGrid.tickSize(-width + this.margin.left + this.margin.right);
        this.xGrid.tickSize(height - this.margin.top - this.margin.bottom);
        const xTicks = width / this.tickSize.x;
        const yTicks = height / this.tickSize.y;
        this.xAxis.ticks(xTicks);
        this.xGrid.ticks(xTicks);
        this.yAxis.ticks(yTicks);
        this.yGrid.ticks(yTicks);
        (0, _d3Selection.select)(this.querySelector(".axis.x")).call(this.xAxis);
        (0, _d3Selection.select)(this.querySelector(".axis.y")).call(this.yAxis);
        (0, _d3Selection.select)(this.querySelector(".grid.x")).call(this.xGrid);
        (0, _d3Selection.select)(this.querySelector(".grid.y")).call(this.yGrid);
        return (0, _lit.svg)`
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <g class="grid y" transform="translate(${this.margin.left}, 0)" />
        <g class="grid x" transform="translate(0, ${this.margin.bottom})" />
        <g class="axis x" transform="translate(0, ${height - this.margin.bottom})" />
        <g class="axis y" transform="translate(${this.margin.left}, 0)" />
        <path class="area" d="${this.area(this.plotData)}" />
        <path class="elevation" d="${this.line(this.plotData)}" fill="none" />
        <g style="visibility: ${this.pointer.x > 0 ? "visible" : "hidden"}">
          <path class="elevation highlight" d="${this.line(this.plotData)}" fill="none"
            clip-path="polygon(0 0, ${this.pointer.x - this.margin.left} 0, ${this.pointer.x - this.margin.left} 100%, 0 100%)"
          />
          <line
            class="pointer-line y"
            x1="${this.pointer.x}"
            y1="${this.margin.top}"
            x2="${this.pointer.x}"
            y2="${height - this.margin.bottom}"
          />
          <circle class="pointer-circle-outline" cx="${this.pointer.x}" cy="${this.pointer.y}" r="16"/>
          <circle class="pointer-circle" cx="${this.pointer.x}" cy="${this.pointer.y}" r="6"/>
        </g>
        <rect
          width="${width}"
          height="${height}"
          fill="none"
          pointer-events="all"
          style="display: block; touch-action: none;"
          @pointermove="${this.pointerMove}"
          @pointerout="${this.pointerOut}"
        />
      </svg>
    `;
    }
    tickFormat(value) {
        if (value < 1000) return this.meterFormat.format(value);
        else return this.kilometerFormat.format(value / 1000);
    }
    firstUpdated() {
        // FIXME: because the ref element are used before render is done, we need to force an update
        this.requestUpdate();
    }
    pointerMove(event) {
        const pointerDistance = this.scaleX.invert((0, _d3Selection.pointer)(event)[0]);
        const index = Math.min(this.bisectDistance.left(this.plotData, pointerDistance), this.plotData.length - 1);
        if (index < 0) return;
        // FIXME:
        // var d0 = this.plotData[index - 1]
        // var d1 = this.plotData[index];
        // // work out which date value is closest to the mouse
        // var d = mouseDate - d0[0] > d1[0] - mouseDate ? d1 : d0;
        const data = this.plotData[index];
        if (isNaN(data.y)) return;
        this.pointer = {
            x: this.scaleX(data.x),
            y: this.scaleY(data.y)
        };
        this.dispatchEvent(new CustomEvent("over", {
            detail: {
                coordinate: this.plotData[index].coordinate,
                position: this.pointer
            }
        }));
    }
    pointerOut() {
        this.pointer = {
            x: 0,
            y: 0
        };
        this.dispatchEvent(new CustomEvent("out"));
    }
    createRenderRoot() {
        return this;
    }
};
$916babf1e6dc2c08$var$__decorate([
    (0, _decoratorsJs.property)({
        type: Number
    })
], $916babf1e6dc2c08$var$ElevationProfile.prototype, "tolerance", void 0);
$916babf1e6dc2c08$var$__decorate([
    (0, _decoratorsJs.property)({
        type: String
    })
], $916babf1e6dc2c08$var$ElevationProfile.prototype, "locale", void 0);
$916babf1e6dc2c08$var$__decorate([
    (0, _decoratorsJs.property)({
        type: Array
    })
], $916babf1e6dc2c08$var$ElevationProfile.prototype, "lines", void 0);
$916babf1e6dc2c08$var$__decorate([
    (0, _decoratorsJs.property)()
], $916babf1e6dc2c08$var$ElevationProfile.prototype, "updateScale", void 0);
$916babf1e6dc2c08$var$__decorate([
    (0, _decoratorsJs.property)({
        type: Object
    })
], $916babf1e6dc2c08$var$ElevationProfile.prototype, "margin", void 0);
$916babf1e6dc2c08$var$__decorate([
    (0, _decoratorsJs.property)({
        type: Object
    })
], $916babf1e6dc2c08$var$ElevationProfile.prototype, "tickSize", void 0);
$916babf1e6dc2c08$var$__decorate([
    (0, _decoratorsJs.state)()
], $916babf1e6dc2c08$var$ElevationProfile.prototype, "pointer", void 0);
$916babf1e6dc2c08$var$ElevationProfile = $916babf1e6dc2c08$var$__decorate([
    (0, _decoratorsJs.customElement)("elevation-profile")
], $916babf1e6dc2c08$var$ElevationProfile);
var $916babf1e6dc2c08$export$2e2bcd8739ae039 = $916babf1e6dc2c08$var$ElevationProfile;

},{"lit":"4antt","lit/decorators.js":"bCPKi","@lit-labs/observers/resize-controller.js":"567XO","d3-array":"aerWx","d3-scale":"3mOB2","d3-shape":"lOZb8","d3-axis":"7kYfy","d3-selection":"4Vxhm","simplify-js":"6057L","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4antt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _reactiveElement = require("@lit/reactive-element");
var _litHtml = require("lit-html");
var _litElementJs = require("lit-element/lit-element.js");
parcelHelpers.exportAll(_litElementJs, exports);
var _isServerJs = require("lit-html/is-server.js");
parcelHelpers.exportAll(_isServerJs, exports);

},{"@lit/reactive-element":"hypet","lit-html":"1cmQt","lit-element/lit-element.js":"9YxkX","lit-html/is-server.js":"e2OXP","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hypet":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CSSResult", ()=>(0, _cssTagJs.CSSResult));
parcelHelpers.export(exports, "adoptStyles", ()=>(0, _cssTagJs.adoptStyles));
parcelHelpers.export(exports, "css", ()=>(0, _cssTagJs.css));
parcelHelpers.export(exports, "getCompatibleStyle", ()=>(0, _cssTagJs.getCompatibleStyle));
parcelHelpers.export(exports, "supportsAdoptingStyleSheets", ()=>(0, _cssTagJs.supportsAdoptingStyleSheets));
parcelHelpers.export(exports, "unsafeCSS", ()=>(0, _cssTagJs.unsafeCSS));
parcelHelpers.export(exports, "ReactiveElement", ()=>b);
parcelHelpers.export(exports, "defaultConverter", ()=>u);
parcelHelpers.export(exports, "notEqual", ()=>f);
var _cssTagJs = require("./css-tag.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const { is: i, defineProperty: e, getOwnPropertyDescriptor: r, getOwnPropertyNames: h, getOwnPropertySymbols: o, getPrototypeOf: n } = Object, a = globalThis, c = a.trustedTypes, l = c ? c.emptyScript : "", p = a.reactiveElementPolyfillSupport, d = (t, s)=>t, u = {
    toAttribute (t, s) {
        switch(s){
            case Boolean:
                t = t ? l : null;
                break;
            case Object:
            case Array:
                t = null == t ? t : JSON.stringify(t);
        }
        return t;
    },
    fromAttribute (t, s) {
        let i = t;
        switch(s){
            case Boolean:
                i = null !== t;
                break;
            case Number:
                i = null === t ? null : Number(t);
                break;
            case Object:
            case Array:
                try {
                    i = JSON.parse(t);
                } catch (t) {
                    i = null;
                }
        }
        return i;
    }
}, f = (t, s)=>!i(t, s), y = {
    attribute: !0,
    type: String,
    converter: u,
    reflect: !1,
    hasChanged: f
};
Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= new WeakMap;
class b extends HTMLElement {
    static addInitializer(t) {
        this._$Ei(), (this.l ??= []).push(t);
    }
    static get observedAttributes() {
        return this.finalize(), this._$Eh && [
            ...this._$Eh.keys()
        ];
    }
    static createProperty(t, s = y) {
        if (s.state && (s.attribute = !1), this._$Ei(), this.elementProperties.set(t, s), !s.noAccessor) {
            const i = Symbol(), r = this.getPropertyDescriptor(t, i, s);
            void 0 !== r && e(this.prototype, t, r);
        }
    }
    static getPropertyDescriptor(t, s, i) {
        const { get: e, set: h } = r(this.prototype, t) ?? {
            get () {
                return this[s];
            },
            set (t) {
                this[s] = t;
            }
        };
        return {
            get () {
                return e?.call(this);
            },
            set (s) {
                const r = e?.call(this);
                h.call(this, s), this.requestUpdate(t, r, i);
            },
            configurable: !0,
            enumerable: !0
        };
    }
    static getPropertyOptions(t) {
        return this.elementProperties.get(t) ?? y;
    }
    static _$Ei() {
        if (this.hasOwnProperty(d("elementProperties"))) return;
        const t = n(this);
        t.finalize(), void 0 !== t.l && (this.l = [
            ...t.l
        ]), this.elementProperties = new Map(t.elementProperties);
    }
    static finalize() {
        if (this.hasOwnProperty(d("finalized"))) return;
        if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(d("properties"))) {
            const t = this.properties, s = [
                ...h(t),
                ...o(t)
            ];
            for (const i of s)this.createProperty(i, t[i]);
        }
        const t = this[Symbol.metadata];
        if (null !== t) {
            const s = litPropertyMetadata.get(t);
            if (void 0 !== s) for (const [t, i] of s)this.elementProperties.set(t, i);
        }
        this._$Eh = new Map;
        for (const [t, s] of this.elementProperties){
            const i = this._$Eu(t, s);
            void 0 !== i && this._$Eh.set(i, t);
        }
        this.elementStyles = this.finalizeStyles(this.styles);
    }
    static finalizeStyles(s) {
        const i = [];
        if (Array.isArray(s)) {
            const e = new Set(s.flat(1 / 0).reverse());
            for (const s of e)i.unshift((0, _cssTagJs.getCompatibleStyle)(s));
        } else void 0 !== s && i.push((0, _cssTagJs.getCompatibleStyle)(s));
        return i;
    }
    static _$Eu(t, s) {
        const i = s.attribute;
        return !1 === i ? void 0 : "string" == typeof i ? i : "string" == typeof t ? t.toLowerCase() : void 0;
    }
    constructor(){
        super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
    }
    _$Ev() {
        this._$Eg = new Promise((t)=>this.enableUpdating = t), this._$AL = new Map, this._$ES(), this.requestUpdate(), this.constructor.l?.forEach((t)=>t(this));
    }
    addController(t) {
        (this._$E_ ??= new Set).add(t), void 0 !== this.renderRoot && this.isConnected && t.hostConnected?.();
    }
    removeController(t) {
        this._$E_?.delete(t);
    }
    _$ES() {
        const t = new Map, s = this.constructor.elementProperties;
        for (const i of s.keys())this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
        t.size > 0 && (this._$Ep = t);
    }
    createRenderRoot() {
        const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
        return (0, _cssTagJs.adoptStyles)(t, this.constructor.elementStyles), t;
    }
    connectedCallback() {
        this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$E_?.forEach((t)=>t.hostConnected?.());
    }
    enableUpdating(t) {}
    disconnectedCallback() {
        this._$E_?.forEach((t)=>t.hostDisconnected?.());
    }
    attributeChangedCallback(t, s, i) {
        this._$AK(t, i);
    }
    _$EO(t, s) {
        const i = this.constructor.elementProperties.get(t), e = this.constructor._$Eu(t, i);
        if (void 0 !== e && !0 === i.reflect) {
            const r = (void 0 !== i.converter?.toAttribute ? i.converter : u).toAttribute(s, i.type);
            this._$Em = t, null == r ? this.removeAttribute(e) : this.setAttribute(e, r), this._$Em = null;
        }
    }
    _$AK(t, s) {
        const i = this.constructor, e = i._$Eh.get(t);
        if (void 0 !== e && this._$Em !== e) {
            const t = i.getPropertyOptions(e), r = "function" == typeof t.converter ? {
                fromAttribute: t.converter
            } : void 0 !== t.converter?.fromAttribute ? t.converter : u;
            this._$Em = e, this[e] = r.fromAttribute(s, t.type), this._$Em = null;
        }
    }
    requestUpdate(t, s, i, e = !1, r) {
        if (void 0 !== t) {
            if (i ??= this.constructor.getPropertyOptions(t), !(i.hasChanged ?? f)(e ? r : this[t], s)) return;
            this.C(t, s, i);
        }
        !1 === this.isUpdatePending && (this._$Eg = this._$EP());
    }
    C(t, s, i) {
        this._$AL.has(t) || this._$AL.set(t, s), !0 === i.reflect && this._$Em !== t && (this._$Ej ??= new Set).add(t);
    }
    async _$EP() {
        this.isUpdatePending = !0;
        try {
            await this._$Eg;
        } catch (t) {
            Promise.reject(t);
        }
        const t = this.scheduleUpdate();
        return null != t && await t, !this.isUpdatePending;
    }
    scheduleUpdate() {
        return this.performUpdate();
    }
    performUpdate() {
        if (!this.isUpdatePending) return;
        if (!this.hasUpdated) {
            if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
                for (const [t, s] of this._$Ep)this[t] = s;
                this._$Ep = void 0;
            }
            const t = this.constructor.elementProperties;
            if (t.size > 0) for (const [s, i] of t)!0 !== i.wrapped || this._$AL.has(s) || void 0 === this[s] || this.C(s, this[s], i);
        }
        let t = !1;
        const s = this._$AL;
        try {
            t = this.shouldUpdate(s), t ? (this.willUpdate(s), this._$E_?.forEach((t)=>t.hostUpdate?.()), this.update(s)) : this._$ET();
        } catch (s) {
            throw t = !1, this._$ET(), s;
        }
        t && this._$AE(s);
    }
    willUpdate(t) {}
    _$AE(t) {
        this._$E_?.forEach((t)=>t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
    }
    _$ET() {
        this._$AL = new Map, this.isUpdatePending = !1;
    }
    get updateComplete() {
        return this.getUpdateComplete();
    }
    getUpdateComplete() {
        return this._$Eg;
    }
    shouldUpdate(t) {
        return !0;
    }
    update(t) {
        this._$Ej &&= this._$Ej.forEach((t)=>this._$EO(t, this[t])), this._$ET();
    }
    updated(t) {}
    firstUpdated(t) {}
}
b.elementStyles = [], b.shadowRootOptions = {
    mode: "open"
}, b[d("elementProperties")] = new Map, b[d("finalized")] = new Map, p?.({
    ReactiveElement: b
}), (a.reactiveElementVersions ??= []).push("2.0.2");

},{"./css-tag.js":"gkZsf","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkZsf":[function(require,module,exports) {
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CSSResult", ()=>n);
parcelHelpers.export(exports, "adoptStyles", ()=>S);
parcelHelpers.export(exports, "css", ()=>i);
parcelHelpers.export(exports, "getCompatibleStyle", ()=>c);
parcelHelpers.export(exports, "supportsAdoptingStyleSheets", ()=>e);
parcelHelpers.export(exports, "unsafeCSS", ()=>r);
const t = globalThis, e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, s = Symbol(), o = new WeakMap;
class n {
    constructor(t, e, o){
        if (this._$cssResult$ = !0, o !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
        this.cssText = t, this.t = e;
    }
    get styleSheet() {
        let t = this.o;
        const s = this.t;
        if (e && void 0 === t) {
            const e = void 0 !== s && 1 === s.length;
            e && (t = o.get(s)), void 0 === t && ((this.o = t = new CSSStyleSheet).replaceSync(this.cssText), e && o.set(s, t));
        }
        return t;
    }
    toString() {
        return this.cssText;
    }
}
const r = (t)=>new n("string" == typeof t ? t : t + "", void 0, s), i = (t, ...e)=>{
    const o = 1 === t.length ? t[0] : e.reduce((e, s, o)=>e + ((t)=>{
            if (!0 === t._$cssResult$) return t.cssText;
            if ("number" == typeof t) return t;
            throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
        })(s) + t[o + 1], t[0]);
    return new n(o, t, s);
}, S = (s, o)=>{
    if (e) s.adoptedStyleSheets = o.map((t)=>t instanceof CSSStyleSheet ? t : t.styleSheet);
    else for (const e of o){
        const o = document.createElement("style"), n = t.litNonce;
        void 0 !== n && o.setAttribute("nonce", n), o.textContent = e.cssText, s.appendChild(o);
    }
}, c = e ? (t)=>t : (t)=>t instanceof CSSStyleSheet ? ((t)=>{
        let e = "";
        for (const s of t.cssRules)e += s.cssText;
        return r(e);
    })(t) : t;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1cmQt":[function(require,module,exports) {
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "_$LH", ()=>z);
parcelHelpers.export(exports, "html", ()=>x);
parcelHelpers.export(exports, "noChange", ()=>w);
parcelHelpers.export(exports, "nothing", ()=>T);
parcelHelpers.export(exports, "render", ()=>j);
parcelHelpers.export(exports, "svg", ()=>b);
const t = globalThis, i = t.trustedTypes, s = i ? i.createPolicy("lit-html", {
    createHTML: (t)=>t
}) : void 0, e = "$lit$", h = `lit$${(Math.random() + "").slice(9)}$`, o = "?" + h, n = `<${o}>`, r = document, l = ()=>r.createComment(""), c = (t)=>null === t || "object" != typeof t && "function" != typeof t, a = Array.isArray, u = (t)=>a(t) || "function" == typeof t?.[Symbol.iterator], d = "[ 	\n\f\r]", f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, _ = />/g, m = RegExp(`>|${d}(?:([^\\s"'>=/]+)(${d}*=${d}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`, "g"), p = /'/g, g = /"/g, $ = /^(?:script|style|textarea|title)$/i, y = (t)=>(i, ...s)=>({
            _$litType$: t,
            strings: i,
            values: s
        }), x = y(1), b = y(2), w = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), A = new WeakMap, E = r.createTreeWalker(r, 129);
function C(t, i) {
    if (!Array.isArray(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
    return void 0 !== s ? s.createHTML(i) : i;
}
const P = (t, i)=>{
    const s = t.length - 1, o = [];
    let r, l = 2 === i ? "<svg>" : "", c = f;
    for(let i = 0; i < s; i++){
        const s = t[i];
        let a, u, d = -1, y = 0;
        for(; y < s.length && (c.lastIndex = y, u = c.exec(s), null !== u);)y = c.lastIndex, c === f ? "!--" === u[1] ? c = v : void 0 !== u[1] ? c = _ : void 0 !== u[2] ? ($.test(u[2]) && (r = RegExp("</" + u[2], "g")), c = m) : void 0 !== u[3] && (c = m) : c === m ? ">" === u[0] ? (c = r ?? f, d = -1) : void 0 === u[1] ? d = -2 : (d = c.lastIndex - u[2].length, a = u[1], c = void 0 === u[3] ? m : '"' === u[3] ? g : p) : c === g || c === p ? c = m : c === v || c === _ ? c = f : (c = m, r = void 0);
        const x = c === m && t[i + 1].startsWith("/>") ? " " : "";
        l += c === f ? s + n : d >= 0 ? (o.push(a), s.slice(0, d) + e + s.slice(d) + h + x) : s + h + (-2 === d ? i : x);
    }
    return [
        C(t, l + (t[s] || "<?>") + (2 === i ? "</svg>" : "")),
        o
    ];
};
class V {
    constructor({ strings: t, _$litType$: s }, n){
        let r;
        this.parts = [];
        let c = 0, a = 0;
        const u = t.length - 1, d = this.parts, [f, v] = P(t, s);
        if (this.el = V.createElement(f, n), E.currentNode = this.el.content, 2 === s) {
            const t = this.el.content.firstChild;
            t.replaceWith(...t.childNodes);
        }
        for(; null !== (r = E.nextNode()) && d.length < u;){
            if (1 === r.nodeType) {
                if (r.hasAttributes()) for (const t of r.getAttributeNames())if (t.endsWith(e)) {
                    const i = v[a++], s = r.getAttribute(t).split(h), e = /([.?@])?(.*)/.exec(i);
                    d.push({
                        type: 1,
                        index: c,
                        name: e[2],
                        strings: s,
                        ctor: "." === e[1] ? k : "?" === e[1] ? H : "@" === e[1] ? I : R
                    }), r.removeAttribute(t);
                } else t.startsWith(h) && (d.push({
                    type: 6,
                    index: c
                }), r.removeAttribute(t));
                if ($.test(r.tagName)) {
                    const t = r.textContent.split(h), s = t.length - 1;
                    if (s > 0) {
                        r.textContent = i ? i.emptyScript : "";
                        for(let i = 0; i < s; i++)r.append(t[i], l()), E.nextNode(), d.push({
                            type: 2,
                            index: ++c
                        });
                        r.append(t[s], l());
                    }
                }
            } else if (8 === r.nodeType) {
                if (r.data === o) d.push({
                    type: 2,
                    index: c
                });
                else {
                    let t = -1;
                    for(; -1 !== (t = r.data.indexOf(h, t + 1));)d.push({
                        type: 7,
                        index: c
                    }), t += h.length - 1;
                }
            }
            c++;
        }
    }
    static createElement(t, i) {
        const s = r.createElement("template");
        return s.innerHTML = t, s;
    }
}
function N(t, i, s = t, e) {
    if (i === w) return i;
    let h = void 0 !== e ? s._$Co?.[e] : s._$Cl;
    const o = c(i) ? void 0 : i._$litDirective$;
    return h?.constructor !== o && (h?._$AO?.(!1), void 0 === o ? h = void 0 : (h = new o(t), h._$AT(t, s, e)), void 0 !== e ? (s._$Co ??= [])[e] = h : s._$Cl = h), void 0 !== h && (i = N(t, h._$AS(t, i.values), h, e)), i;
}
class S {
    constructor(t, i){
        this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = i;
    }
    get parentNode() {
        return this._$AM.parentNode;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    u(t) {
        const { el: { content: i }, parts: s } = this._$AD, e = (t?.creationScope ?? r).importNode(i, !0);
        E.currentNode = e;
        let h = E.nextNode(), o = 0, n = 0, l = s[0];
        for(; void 0 !== l;){
            if (o === l.index) {
                let i;
                2 === l.type ? i = new M(h, h.nextSibling, this, t) : 1 === l.type ? i = new l.ctor(h, l.name, l.strings, this, t) : 6 === l.type && (i = new L(h, this, t)), this._$AV.push(i), l = s[++n];
            }
            o !== l?.index && (h = E.nextNode(), o++);
        }
        return E.currentNode = r, e;
    }
    p(t) {
        let i = 0;
        for (const s of this._$AV)void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), i += s.strings.length - 2) : s._$AI(t[i])), i++;
    }
}
class M {
    get _$AU() {
        return this._$AM?._$AU ?? this._$Cv;
    }
    constructor(t, i, s, e){
        this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t, this._$AB = i, this._$AM = s, this.options = e, this._$Cv = e?.isConnected ?? !0;
    }
    get parentNode() {
        let t = this._$AA.parentNode;
        const i = this._$AM;
        return void 0 !== i && 11 === t?.nodeType && (t = i.parentNode), t;
    }
    get startNode() {
        return this._$AA;
    }
    get endNode() {
        return this._$AB;
    }
    _$AI(t, i = this) {
        t = N(this, t, i), c(t) ? t === T || null == t || "" === t ? (this._$AH !== T && this._$AR(), this._$AH = T) : t !== this._$AH && t !== w && this._(t) : void 0 !== t._$litType$ ? this.g(t) : void 0 !== t.nodeType ? this.$(t) : u(t) ? this.T(t) : this._(t);
    }
    k(t) {
        return this._$AA.parentNode.insertBefore(t, this._$AB);
    }
    $(t) {
        this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
    }
    _(t) {
        this._$AH !== T && c(this._$AH) ? this._$AA.nextSibling.data = t : this.$(r.createTextNode(t)), this._$AH = t;
    }
    g(t) {
        const { values: i, _$litType$: s } = t, e = "number" == typeof s ? this._$AC(t) : (void 0 === s.el && (s.el = V.createElement(C(s.h, s.h[0]), this.options)), s);
        if (this._$AH?._$AD === e) this._$AH.p(i);
        else {
            const t = new S(e, this), s = t.u(this.options);
            t.p(i), this.$(s), this._$AH = t;
        }
    }
    _$AC(t) {
        let i = A.get(t.strings);
        return void 0 === i && A.set(t.strings, i = new V(t)), i;
    }
    T(t) {
        a(this._$AH) || (this._$AH = [], this._$AR());
        const i = this._$AH;
        let s, e = 0;
        for (const h of t)e === i.length ? i.push(s = new M(this.k(l()), this.k(l()), this, this.options)) : s = i[e], s._$AI(h), e++;
        e < i.length && (this._$AR(s && s._$AB.nextSibling, e), i.length = e);
    }
    _$AR(t = this._$AA.nextSibling, i) {
        for(this._$AP?.(!1, !0, i); t && t !== this._$AB;){
            const i = t.nextSibling;
            t.remove(), t = i;
        }
    }
    setConnected(t) {
        void 0 === this._$AM && (this._$Cv = t, this._$AP?.(t));
    }
}
class R {
    get tagName() {
        return this.element.tagName;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    constructor(t, i, s, e, h){
        this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t, this.name = i, this._$AM = e, this.options = h, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this._$AH = Array(s.length - 1).fill(new String), this.strings = s) : this._$AH = T;
    }
    _$AI(t, i = this, s, e) {
        const h = this.strings;
        let o = !1;
        if (void 0 === h) t = N(this, t, i, 0), o = !c(t) || t !== this._$AH && t !== w, o && (this._$AH = t);
        else {
            const e = t;
            let n, r;
            for(t = h[0], n = 0; n < h.length - 1; n++)r = N(this, e[s + n], i, n), r === w && (r = this._$AH[n]), o ||= !c(r) || r !== this._$AH[n], r === T ? t = T : t !== T && (t += (r ?? "") + h[n + 1]), this._$AH[n] = r;
        }
        o && !e && this.O(t);
    }
    O(t) {
        t === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
    }
}
class k extends R {
    constructor(){
        super(...arguments), this.type = 3;
    }
    O(t) {
        this.element[this.name] = t === T ? void 0 : t;
    }
}
class H extends R {
    constructor(){
        super(...arguments), this.type = 4;
    }
    O(t) {
        this.element.toggleAttribute(this.name, !!t && t !== T);
    }
}
class I extends R {
    constructor(t, i, s, e, h){
        super(t, i, s, e, h), this.type = 5;
    }
    _$AI(t, i = this) {
        if ((t = N(this, t, i, 0) ?? T) === w) return;
        const s = this._$AH, e = t === T && s !== T || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, h = t !== T && (s === T || e);
        e && this.element.removeEventListener(this.name, this, s), h && this.element.addEventListener(this.name, this, t), this._$AH = t;
    }
    handleEvent(t) {
        "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
    }
}
class L {
    constructor(t, i, s){
        this.element = t, this.type = 6, this._$AN = void 0, this._$AM = i, this.options = s;
    }
    get _$AU() {
        return this._$AM._$AU;
    }
    _$AI(t) {
        N(this, t);
    }
}
const z = {
    j: e,
    P: h,
    A: o,
    C: 1,
    M: P,
    L: S,
    R: u,
    V: N,
    D: M,
    I: R,
    H,
    N: I,
    U: k,
    B: L
}, Z = t.litHtmlPolyfillSupport;
Z?.(V, M), (t.litHtmlVersions ??= []).push("3.1.0");
const j = (t, i, s)=>{
    const e = s?.renderBefore ?? i;
    let h = e._$litPart$;
    if (void 0 === h) {
        const t = s?.renderBefore ?? null;
        e._$litPart$ = h = new M(i.insertBefore(l(), t), t, void 0, s ?? {});
    }
    return h._$AI(t), h;
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9YxkX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LitElement", ()=>s);
parcelHelpers.export(exports, "_$LE", ()=>o);
var _reactiveElement = require("@lit/reactive-element");
parcelHelpers.exportAll(_reactiveElement, exports);
var _litHtml = require("lit-html");
parcelHelpers.exportAll(_litHtml, exports);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ class s extends (0, _reactiveElement.ReactiveElement) {
    constructor(){
        super(...arguments), this.renderOptions = {
            host: this
        }, this._$Do = void 0;
    }
    createRenderRoot() {
        const t = super.createRenderRoot();
        return this.renderOptions.renderBefore ??= t.firstChild, t;
    }
    update(t) {
        const i = this.render();
        this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = (0, _litHtml.render)(i, this.renderRoot, this.renderOptions);
    }
    connectedCallback() {
        super.connectedCallback(), this._$Do?.setConnected(!0);
    }
    disconnectedCallback() {
        super.disconnectedCallback(), this._$Do?.setConnected(!1);
    }
    render() {
        return 0, _litHtml.noChange;
    }
}
s._$litElement$ = !0, s["finalized"] = !0, globalThis.litElementHydrateSupport?.({
    LitElement: s
});
const r = globalThis.litElementPolyfillSupport;
r?.({
    LitElement: s
});
const o = {
    _$AK: (t, e, i)=>{
        t._$AK(e, i);
    },
    _$AL: (t)=>t._$AL
};
(globalThis.litElementVersions ??= []).push("4.0.2");

},{"@lit/reactive-element":"hypet","lit-html":"1cmQt","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"e2OXP":[function(require,module,exports) {
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "isServer", ()=>o);
const o = !1;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bCPKi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _customElementJs = require("@lit/reactive-element/decorators/custom-element.js");
parcelHelpers.exportAll(_customElementJs, exports);
var _propertyJs = require("@lit/reactive-element/decorators/property.js");
parcelHelpers.exportAll(_propertyJs, exports);
var _stateJs = require("@lit/reactive-element/decorators/state.js");
parcelHelpers.exportAll(_stateJs, exports);
var _eventOptionsJs = require("@lit/reactive-element/decorators/event-options.js");
parcelHelpers.exportAll(_eventOptionsJs, exports);
var _queryJs = require("@lit/reactive-element/decorators/query.js");
parcelHelpers.exportAll(_queryJs, exports);
var _queryAllJs = require("@lit/reactive-element/decorators/query-all.js");
parcelHelpers.exportAll(_queryAllJs, exports);
var _queryAsyncJs = require("@lit/reactive-element/decorators/query-async.js");
parcelHelpers.exportAll(_queryAsyncJs, exports);
var _queryAssignedElementsJs = require("@lit/reactive-element/decorators/query-assigned-elements.js");
parcelHelpers.exportAll(_queryAssignedElementsJs, exports);
var _queryAssignedNodesJs = require("@lit/reactive-element/decorators/query-assigned-nodes.js");
parcelHelpers.exportAll(_queryAssignedNodesJs, exports);

},{"@lit/reactive-element/decorators/custom-element.js":"cMf50","@lit/reactive-element/decorators/property.js":"ipYYa","@lit/reactive-element/decorators/state.js":"goyf7","@lit/reactive-element/decorators/event-options.js":"8b5ex","@lit/reactive-element/decorators/query.js":"kzuRy","@lit/reactive-element/decorators/query-all.js":"krNkJ","@lit/reactive-element/decorators/query-async.js":"a6gRJ","@lit/reactive-element/decorators/query-assigned-elements.js":"kKpwU","@lit/reactive-element/decorators/query-assigned-nodes.js":"2F824","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cMf50":[function(require,module,exports) {
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "customElement", ()=>t);
const t = (t)=>(e, o)=>{
        void 0 !== o ? o.addInitializer(()=>{
            customElements.define(t, e);
        }) : customElements.define(t, e);
    };

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ipYYa":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "property", ()=>n);
parcelHelpers.export(exports, "standardProperty", ()=>r);
var _reactiveElementJs = require("../reactive-element.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ const o = {
    attribute: !0,
    type: String,
    converter: (0, _reactiveElementJs.defaultConverter),
    reflect: !1,
    hasChanged: (0, _reactiveElementJs.notEqual)
}, r = (t = o, e, r)=>{
    const { kind: n, metadata: i } = r;
    let s = globalThis.litPropertyMetadata.get(i);
    if (void 0 === s && globalThis.litPropertyMetadata.set(i, s = new Map), s.set(r.name, t), "accessor" === n) {
        const { name: o } = r;
        return {
            set (r) {
                const n = e.get.call(this);
                e.set.call(this, r), this.requestUpdate(o, n, t);
            },
            init (e) {
                return void 0 !== e && this.C(o, void 0, t), e;
            }
        };
    }
    if ("setter" === n) {
        const { name: o } = r;
        return function(r) {
            const n = this[o];
            e.call(this, r), this.requestUpdate(o, n, t);
        };
    }
    throw Error("Unsupported decorator location: " + n);
};
function n(t) {
    return (e, o)=>"object" == typeof o ? r(t, e, o) : ((t, e, o)=>{
            const r = e.hasOwnProperty(o);
            return e.constructor.createProperty(o, r ? {
                ...t,
                wrapped: !0
            } : t), r ? Object.getOwnPropertyDescriptor(e, o) : void 0;
        })(t, e, o);
}

},{"../reactive-element.js":"hypet","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"goyf7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "state", ()=>r);
var _propertyJs = require("./property.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function r(r) {
    return (0, _propertyJs.property)({
        ...r,
        state: !0,
        attribute: !1
    });
}

},{"./property.js":"ipYYa","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8b5ex":[function(require,module,exports) {
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "eventOptions", ()=>t);
function t(t) {
    return (n, o)=>{
        const c = "function" == typeof n ? n : n[o];
        Object.assign(c, t);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kzuRy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "query", ()=>e);
var _baseJs = require("./base.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function e(e, r) {
    return (n, s, i)=>{
        const o = (t)=>t.renderRoot?.querySelector(e) ?? null;
        if (r) {
            const { get: e, set: r } = "object" == typeof s ? n : i ?? (()=>{
                const t = Symbol();
                return {
                    get () {
                        return this[t];
                    },
                    set (e) {
                        this[t] = e;
                    }
                };
            })();
            return (0, _baseJs.desc)(n, s, {
                get () {
                    let t = e.call(this);
                    return void 0 === t && (t = o(this), (null !== t || this.hasUpdated) && r.call(this, t)), t;
                }
            });
        }
        return (0, _baseJs.desc)(n, s, {
            get () {
                return o(this);
            }
        });
    };
}

},{"./base.js":"d0R9Y","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"d0R9Y":[function(require,module,exports) {
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "desc", ()=>e);
const e = (e, t, c)=>(c.configurable = !0, c.enumerable = !0, Reflect.decorate && "object" != typeof t && Object.defineProperty(e, t, c), c);

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"krNkJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "queryAll", ()=>r);
var _baseJs = require("./base.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ let e;
function r(r) {
    return (n, o)=>(0, _baseJs.desc)(n, o, {
            get () {
                return (this.renderRoot ?? (e ??= document.createDocumentFragment())).querySelectorAll(r);
            }
        });
}

},{"./base.js":"d0R9Y","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"a6gRJ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "queryAsync", ()=>r);
var _baseJs = require("./base.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function r(r) {
    return (n, e)=>(0, _baseJs.desc)(n, e, {
            async get () {
                return await this.updateComplete, this.renderRoot?.querySelector(r) ?? null;
            }
        });
}

},{"./base.js":"d0R9Y","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kKpwU":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "queryAssignedElements", ()=>o);
var _baseJs = require("./base.js");
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function o(o) {
    return (e, n)=>{
        const { slot: r, selector: s } = o ?? {}, c = "slot" + (r ? `[name=${r}]` : ":not([name])");
        return (0, _baseJs.desc)(e, n, {
            get () {
                const t = this.renderRoot?.querySelector(c), e = t?.assignedElements(o) ?? [];
                return void 0 === s ? e : e.filter((t)=>t.matches(s));
            }
        });
    };
}

},{"./base.js":"d0R9Y","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2F824":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "queryAssignedNodes", ()=>n);
var _baseJs = require("./base.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ function n(n) {
    return (o, r)=>{
        const { slot: e } = n ?? {}, s = "slot" + (e ? `[name=${e}]` : ":not([name])");
        return (0, _baseJs.desc)(o, r, {
            get () {
                const t = this.renderRoot?.querySelector(s);
                return t?.assignedNodes(n) ?? [];
            }
        });
    };
}

},{"./base.js":"d0R9Y","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"567XO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ResizeController", ()=>s);
class s {
    constructor(s, { target: t, config: i, callback: h, skipInitial: e }){
        this.t = new Set, this.o = !1, this.i = !1, this.h = s, null !== t && this.t.add(t ?? s), this.l = i, this.o = e ?? this.o, this.callback = h, window.ResizeObserver ? (this.u = new ResizeObserver((s)=>{
            this.handleChanges(s), this.h.requestUpdate();
        }), s.addController(this)) : console.warn("ResizeController error: browser does not support ResizeObserver.");
    }
    handleChanges(s) {
        this.value = this.callback?.(s, this.u);
    }
    hostConnected() {
        for (const s of this.t)this.observe(s);
    }
    hostDisconnected() {
        this.disconnect();
    }
    async hostUpdated() {
        !this.o && this.i && this.handleChanges([]), this.i = !1;
    }
    observe(s) {
        this.t.add(s), this.u.observe(s, this.l), this.i = !0, this.h.requestUpdate();
    }
    unobserve(s) {
        this.t.delete(s), this.u.unobserve(s);
    }
    disconnect() {
        this.u.disconnect();
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aerWx":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "bisect", ()=>(0, _bisectJsDefault.default));
parcelHelpers.export(exports, "bisectRight", ()=>(0, _bisectJs.bisectRight));
parcelHelpers.export(exports, "bisectLeft", ()=>(0, _bisectJs.bisectLeft));
parcelHelpers.export(exports, "bisectCenter", ()=>(0, _bisectJs.bisectCenter));
parcelHelpers.export(exports, "ascending", ()=>(0, _ascendingJsDefault.default));
parcelHelpers.export(exports, "bisector", ()=>(0, _bisectorJsDefault.default));
parcelHelpers.export(exports, "blur", ()=>(0, _blurJs.blur));
parcelHelpers.export(exports, "blur2", ()=>(0, _blurJs.blur2));
parcelHelpers.export(exports, "blurImage", ()=>(0, _blurJs.blurImage));
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
parcelHelpers.export(exports, "flatGroup", ()=>(0, _groupJs.flatGroup));
parcelHelpers.export(exports, "flatRollup", ()=>(0, _groupJs.flatRollup));
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
parcelHelpers.export(exports, "medianIndex", ()=>(0, _medianJs.medianIndex));
parcelHelpers.export(exports, "merge", ()=>(0, _mergeJsDefault.default));
parcelHelpers.export(exports, "min", ()=>(0, _minJsDefault.default));
parcelHelpers.export(exports, "minIndex", ()=>(0, _minIndexJsDefault.default));
parcelHelpers.export(exports, "mode", ()=>(0, _modeJsDefault.default));
parcelHelpers.export(exports, "nice", ()=>(0, _niceJsDefault.default));
parcelHelpers.export(exports, "pairs", ()=>(0, _pairsJsDefault.default));
parcelHelpers.export(exports, "permute", ()=>(0, _permuteJsDefault.default));
parcelHelpers.export(exports, "quantile", ()=>(0, _quantileJsDefault.default));
parcelHelpers.export(exports, "quantileIndex", ()=>(0, _quantileJs.quantileIndex));
parcelHelpers.export(exports, "quantileSorted", ()=>(0, _quantileJs.quantileSorted));
parcelHelpers.export(exports, "quickselect", ()=>(0, _quickselectJsDefault.default));
parcelHelpers.export(exports, "range", ()=>(0, _rangeJsDefault.default));
parcelHelpers.export(exports, "rank", ()=>(0, _rankJsDefault.default));
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
var _blurJs = require("./blur.js");
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
var _modeJs = require("./mode.js");
var _modeJsDefault = parcelHelpers.interopDefault(_modeJs);
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
var _rankJs = require("./rank.js");
var _rankJsDefault = parcelHelpers.interopDefault(_rankJs);
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

},{"./bisect.js":"j8xa8","./ascending.js":false,"./bisector.js":"iGdKY","./blur.js":false,"./count.js":false,"./cross.js":false,"./cumsum.js":false,"./descending.js":false,"./deviation.js":false,"./extent.js":"6j9dC","./fsum.js":false,"./group.js":false,"./groupSort.js":false,"./bin.js":false,"./threshold/freedmanDiaconis.js":false,"./threshold/scott.js":false,"./threshold/sturges.js":false,"./max.js":false,"./maxIndex.js":false,"./mean.js":false,"./median.js":false,"./merge.js":false,"./min.js":false,"./minIndex.js":false,"./mode.js":false,"./nice.js":false,"./pairs.js":false,"./permute.js":false,"./quantile.js":false,"./quickselect.js":false,"./range.js":false,"./rank.js":false,"./least.js":false,"./leastIndex.js":false,"./greatest.js":false,"./greatestIndex.js":false,"./scan.js":false,"./shuffle.js":false,"./sum.js":false,"./ticks.js":"4mcdF","./transpose.js":false,"./variance.js":false,"./zip.js":false,"./every.js":false,"./some.js":false,"./filter.js":false,"./map.js":false,"./reduce.js":false,"./reverse.js":false,"./sort.js":false,"./difference.js":false,"./disjoint.js":false,"./intersection.js":false,"./subset.js":false,"./superset.js":false,"./union.js":false,"internmap":false,"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"j8xa8":[function(require,module,exports) {
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

},{"./ascending.js":"97wsw","./bisector.js":"iGdKY","./number.js":"6GA1X","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"97wsw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>ascending);
function ascending(a, b) {
    return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iGdKY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>bisector);
var _ascendingJs = require("./ascending.js");
var _ascendingJsDefault = parcelHelpers.interopDefault(_ascendingJs);
var _descendingJs = require("./descending.js");
var _descendingJsDefault = parcelHelpers.interopDefault(_descendingJs);
function bisector(f) {
    let compare1, compare2, delta;
    // If an accessor is specified, promote it to a comparator. In this case we
    // can test whether the search value is (self-) comparable. We can’t do this
    // for a comparator (except for specific, known comparators) because we can’t
    // tell if the comparator is symmetric, and an asymmetric comparator can’t be
    // used to test whether a single value is comparable.
    if (f.length !== 2) {
        compare1 = (0, _ascendingJsDefault.default);
        compare2 = (d, x)=>(0, _ascendingJsDefault.default)(f(d), x);
        delta = (d, x)=>f(d) - x;
    } else {
        compare1 = f === (0, _ascendingJsDefault.default) || f === (0, _descendingJsDefault.default) ? f : zero;
        compare2 = f;
        delta = f;
    }
    function left(a, x, lo = 0, hi = a.length) {
        if (lo < hi) {
            if (compare1(x, x) !== 0) return hi;
            do {
                const mid = lo + hi >>> 1;
                if (compare2(a[mid], x) < 0) lo = mid + 1;
                else hi = mid;
            }while (lo < hi);
        }
        return lo;
    }
    function right(a, x, lo = 0, hi = a.length) {
        if (lo < hi) {
            if (compare1(x, x) !== 0) return hi;
            do {
                const mid = lo + hi >>> 1;
                if (compare2(a[mid], x) <= 0) lo = mid + 1;
                else hi = mid;
            }while (lo < hi);
        }
        return lo;
    }
    function center(a, x, lo = 0, hi = a.length) {
        const i = left(a, x, lo, hi - 1);
        return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
    }
    return {
        left,
        center,
        right
    };
}
function zero() {
    return 0;
}

},{"./ascending.js":"97wsw","./descending.js":"9cuqQ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9cuqQ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>descending);
function descending(a, b) {
    return a == null || b == null ? NaN : b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6GA1X":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>number);
parcelHelpers.export(exports, "numbers", ()=>numbers);
function number(x) {
    return x === null ? NaN : +x;
}
function* numbers(values, valueof) {
    if (valueof === undefined) {
        for (let value of values)if (value != null && (value = +value) >= value) yield value;
    } else {
        let index = -1;
        for (let value of values)if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) yield value;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6j9dC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>extent);
function extent(values, valueof) {
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
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4mcdF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>ticks);
parcelHelpers.export(exports, "tickIncrement", ()=>tickIncrement);
parcelHelpers.export(exports, "tickStep", ()=>tickStep);
const e10 = Math.sqrt(50), e5 = Math.sqrt(10), e2 = Math.sqrt(2);
function tickSpec(start, stop, count) {
    const step = (stop - start) / Math.max(0, count), power = Math.floor(Math.log10(step)), error = step / Math.pow(10, power), factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
    let i1, i2, inc;
    if (power < 0) {
        inc = Math.pow(10, -power) / factor;
        i1 = Math.round(start * inc);
        i2 = Math.round(stop * inc);
        if (i1 / inc < start) ++i1;
        if (i2 / inc > stop) --i2;
        inc = -inc;
    } else {
        inc = Math.pow(10, power) * factor;
        i1 = Math.round(start / inc);
        i2 = Math.round(stop / inc);
        if (i1 * inc < start) ++i1;
        if (i2 * inc > stop) --i2;
    }
    if (i2 < i1 && 0.5 <= count && count < 2) return tickSpec(start, stop, count * 2);
    return [
        i1,
        i2,
        inc
    ];
}
function ticks(start, stop, count) {
    stop = +stop, start = +start, count = +count;
    if (!(count > 0)) return [];
    if (start === stop) return [
        start
    ];
    const reverse = stop < start, [i1, i2, inc] = reverse ? tickSpec(stop, start, count) : tickSpec(start, stop, count);
    if (!(i2 >= i1)) return [];
    const n = i2 - i1 + 1, ticks = new Array(n);
    if (reverse) {
        if (inc < 0) for(let i = 0; i < n; ++i)ticks[i] = (i2 - i) / -inc;
        else for(let i = 0; i < n; ++i)ticks[i] = (i2 - i) * inc;
    } else {
        if (inc < 0) for(let i = 0; i < n; ++i)ticks[i] = (i1 + i) / -inc;
        else for(let i = 0; i < n; ++i)ticks[i] = (i1 + i) * inc;
    }
    return ticks;
}
function tickIncrement(start, stop, count) {
    stop = +stop, start = +start, count = +count;
    return tickSpec(start, stop, count)[2];
}
function tickStep(start, stop, count) {
    stop = +stop, start = +start, count = +count;
    const reverse = stop < start, inc = reverse ? tickIncrement(stop, start, count) : tickIncrement(start, stop, count);
    return (reverse ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3mOB2":[function(require,module,exports) {
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

},{"./band.js":false,"./identity.js":false,"./linear.js":"aBa5M","./log.js":false,"./symlog.js":false,"./ordinal.js":false,"./pow.js":false,"./radial.js":false,"./quantile.js":false,"./quantize.js":false,"./threshold.js":false,"./time.js":false,"./utcTime.js":false,"./sequential.js":false,"./sequentialQuantile.js":false,"./diverging.js":false,"./tickFormat.js":false,"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"aBa5M":[function(require,module,exports) {
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

},{"d3-array":"aerWx","./continuous.js":"lAXcf","./init.js":"5bjmJ","./tickFormat.js":"agHUz","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lAXcf":[function(require,module,exports) {
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

},{"d3-array":"aerWx","d3-interpolate":"6jJyi","./constant.js":"5NUS4","./number.js":"4dxeq","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6jJyi":[function(require,module,exports) {
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

},{"./value.js":"2GpMq","./array.js":false,"./basis.js":false,"./basisClosed.js":false,"./date.js":false,"./discrete.js":false,"./hue.js":false,"./number.js":"fZAq5","./numberArray.js":false,"./object.js":false,"./round.js":"8lHW7","./string.js":false,"./transform/index.js":false,"./zoom.js":false,"./rgb.js":false,"./hsl.js":false,"./lab.js":false,"./hcl.js":false,"./cubehelix.js":false,"./piecewise.js":false,"./quantize.js":false,"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2GpMq":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5NUS4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>constants);
function constants(x) {
    return function() {
        return x;
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4dxeq":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>number);
function number(x) {
    return +x;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5bjmJ":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"agHUz":[function(require,module,exports) {
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

},{"d3-array":"aerWx","d3-format":"4XOv2","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4XOv2":[function(require,module,exports) {
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

},{"./exponent.js":"7L05r","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lOZb8":[function(require,module,exports) {
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
parcelHelpers.export(exports, "link", ()=>(0, _linkJs.link));
parcelHelpers.export(exports, "linkHorizontal", ()=>(0, _linkJs.linkHorizontal));
parcelHelpers.export(exports, "linkVertical", ()=>(0, _linkJs.linkVertical));
parcelHelpers.export(exports, "linkRadial", ()=>(0, _linkJs.linkRadial));
parcelHelpers.export(exports, "symbol", ()=>(0, _symbolJsDefault.default));
parcelHelpers.export(exports, "symbolsStroke", ()=>(0, _symbolJs.symbolsStroke));
parcelHelpers.export(exports, "symbolsFill", ()=>(0, _symbolJs.symbolsFill));
parcelHelpers.export(exports, "symbols", ()=>(0, _symbolJs.symbolsFill));
parcelHelpers.export(exports, "symbolAsterisk", ()=>(0, _asteriskJsDefault.default));
parcelHelpers.export(exports, "symbolCircle", ()=>(0, _circleJsDefault.default));
parcelHelpers.export(exports, "symbolCross", ()=>(0, _crossJsDefault.default));
parcelHelpers.export(exports, "symbolDiamond", ()=>(0, _diamondJsDefault.default));
parcelHelpers.export(exports, "symbolDiamond2", ()=>(0, _diamond2JsDefault.default));
parcelHelpers.export(exports, "symbolPlus", ()=>(0, _plusJsDefault.default));
parcelHelpers.export(exports, "symbolSquare", ()=>(0, _squareJsDefault.default));
parcelHelpers.export(exports, "symbolSquare2", ()=>(0, _square2JsDefault.default));
parcelHelpers.export(exports, "symbolStar", ()=>(0, _starJsDefault.default));
parcelHelpers.export(exports, "symbolTriangle", ()=>(0, _triangleJsDefault.default));
parcelHelpers.export(exports, "symbolTriangle2", ()=>(0, _triangle2JsDefault.default));
parcelHelpers.export(exports, "symbolWye", ()=>(0, _wyeJsDefault.default));
parcelHelpers.export(exports, "symbolTimes", ()=>(0, _timesJsDefault.default));
parcelHelpers.export(exports, "symbolX", ()=>(0, _timesJsDefault.default));
parcelHelpers.export(exports, "curveBasisClosed", ()=>(0, _basisClosedJsDefault.default));
parcelHelpers.export(exports, "curveBasisOpen", ()=>(0, _basisOpenJsDefault.default));
parcelHelpers.export(exports, "curveBasis", ()=>(0, _basisJsDefault.default));
parcelHelpers.export(exports, "curveBumpX", ()=>(0, _bumpJs.bumpX));
parcelHelpers.export(exports, "curveBumpY", ()=>(0, _bumpJs.bumpY));
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
var _linkJs = require("./link.js");
var _symbolJs = require("./symbol.js");
var _symbolJsDefault = parcelHelpers.interopDefault(_symbolJs);
var _asteriskJs = require("./symbol/asterisk.js");
var _asteriskJsDefault = parcelHelpers.interopDefault(_asteriskJs);
var _circleJs = require("./symbol/circle.js");
var _circleJsDefault = parcelHelpers.interopDefault(_circleJs);
var _crossJs = require("./symbol/cross.js");
var _crossJsDefault = parcelHelpers.interopDefault(_crossJs);
var _diamondJs = require("./symbol/diamond.js");
var _diamondJsDefault = parcelHelpers.interopDefault(_diamondJs);
var _diamond2Js = require("./symbol/diamond2.js");
var _diamond2JsDefault = parcelHelpers.interopDefault(_diamond2Js);
var _plusJs = require("./symbol/plus.js");
var _plusJsDefault = parcelHelpers.interopDefault(_plusJs);
var _squareJs = require("./symbol/square.js");
var _squareJsDefault = parcelHelpers.interopDefault(_squareJs);
var _square2Js = require("./symbol/square2.js");
var _square2JsDefault = parcelHelpers.interopDefault(_square2Js);
var _starJs = require("./symbol/star.js");
var _starJsDefault = parcelHelpers.interopDefault(_starJs);
var _triangleJs = require("./symbol/triangle.js");
var _triangleJsDefault = parcelHelpers.interopDefault(_triangleJs);
var _triangle2Js = require("./symbol/triangle2.js");
var _triangle2JsDefault = parcelHelpers.interopDefault(_triangle2Js);
var _wyeJs = require("./symbol/wye.js");
var _wyeJsDefault = parcelHelpers.interopDefault(_wyeJs);
var _timesJs = require("./symbol/times.js");
var _timesJsDefault = parcelHelpers.interopDefault(_timesJs);
var _basisClosedJs = require("./curve/basisClosed.js");
var _basisClosedJsDefault = parcelHelpers.interopDefault(_basisClosedJs);
var _basisOpenJs = require("./curve/basisOpen.js");
var _basisOpenJsDefault = parcelHelpers.interopDefault(_basisOpenJs);
var _basisJs = require("./curve/basis.js");
var _basisJsDefault = parcelHelpers.interopDefault(_basisJs);
var _bumpJs = require("./curve/bump.js");
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

},{"./arc.js":false,"./area.js":"7dNar","./line.js":"jplr6","./pie.js":false,"./areaRadial.js":false,"./lineRadial.js":false,"./pointRadial.js":false,"./link.js":false,"./symbol.js":false,"./symbol/asterisk.js":false,"./symbol/circle.js":false,"./symbol/cross.js":false,"./symbol/diamond.js":false,"./symbol/diamond2.js":false,"./symbol/plus.js":false,"./symbol/square.js":false,"./symbol/square2.js":false,"./symbol/star.js":false,"./symbol/triangle.js":false,"./symbol/triangle2.js":false,"./symbol/wye.js":false,"./symbol/times.js":false,"./curve/basisClosed.js":false,"./curve/basisOpen.js":false,"./curve/basis.js":false,"./curve/bump.js":false,"./curve/bundle.js":false,"./curve/cardinalClosed.js":false,"./curve/cardinalOpen.js":false,"./curve/cardinal.js":false,"./curve/catmullRomClosed.js":false,"./curve/catmullRomOpen.js":false,"./curve/catmullRom.js":false,"./curve/linearClosed.js":false,"./curve/linear.js":false,"./curve/monotone.js":false,"./curve/natural.js":false,"./curve/step.js":false,"./stack.js":false,"./offset/expand.js":false,"./offset/diverging.js":false,"./offset/none.js":false,"./offset/silhouette.js":false,"./offset/wiggle.js":false,"./order/appearance.js":false,"./order/ascending.js":false,"./order/descending.js":false,"./order/insideOut.js":false,"./order/none.js":false,"./order/reverse.js":false,"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7dNar":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(x0, y0, y1) {
        var x1 = null, defined = (0, _constantJsDefault.default)(true), context = null, curve = (0, _linearJsDefault.default), output = null, path = (0, _pathJs.withPath)(area);
        x0 = typeof x0 === "function" ? x0 : x0 === undefined ? (0, _pointJs.x) : (0, _constantJsDefault.default)(+x0);
        y0 = typeof y0 === "function" ? y0 : y0 === undefined ? (0, _constantJsDefault.default)(0) : (0, _constantJsDefault.default)(+y0);
        y1 = typeof y1 === "function" ? y1 : y1 === undefined ? (0, _pointJs.y) : (0, _constantJsDefault.default)(+y1);
        function area(data) {
            var i, j, k, n = (data = (0, _arrayJsDefault.default)(data)).length, d, defined0 = false, buffer, x0z = new Array(n), y0z = new Array(n);
            if (context == null) output = curve(buffer = path());
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
var _arrayJs = require("./array.js");
var _arrayJsDefault = parcelHelpers.interopDefault(_arrayJs);
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _linearJs = require("./curve/linear.js");
var _linearJsDefault = parcelHelpers.interopDefault(_linearJs);
var _lineJs = require("./line.js");
var _lineJsDefault = parcelHelpers.interopDefault(_lineJs);
var _pathJs = require("./path.js");
var _pointJs = require("./point.js");

},{"./array.js":"kpsgI","./constant.js":"b6wSb","./curve/linear.js":"8xv10","./line.js":"jplr6","./path.js":"bUrjE","./point.js":"7uEQv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kpsgI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "slice", ()=>slice);
parcelHelpers.export(exports, "default", ()=>function(x) {
        return typeof x === "object" && "length" in x ? x // Array, TypedArray, NodeList, array-like
         : Array.from(x); // Map, Set, iterable, string, or anything else
    });
var slice = Array.prototype.slice;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"b6wSb":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(x) {
        return function constant() {
            return x;
        };
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8xv10":[function(require,module,exports) {
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
                this._point = 2; // falls through
            default:
                this._context.lineTo(x, y);
                break;
        }
    }
};

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"jplr6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(x, y) {
        var defined = (0, _constantJsDefault.default)(true), context = null, curve = (0, _linearJsDefault.default), output = null, path = (0, _pathJs.withPath)(line);
        x = typeof x === "function" ? x : x === undefined ? (0, _pointJs.x) : (0, _constantJsDefault.default)(x);
        y = typeof y === "function" ? y : y === undefined ? (0, _pointJs.y) : (0, _constantJsDefault.default)(y);
        function line(data) {
            var i, n = (data = (0, _arrayJsDefault.default)(data)).length, d, defined0 = false, buffer;
            if (context == null) output = curve(buffer = path());
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
var _arrayJs = require("./array.js");
var _arrayJsDefault = parcelHelpers.interopDefault(_arrayJs);
var _constantJs = require("./constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
var _linearJs = require("./curve/linear.js");
var _linearJsDefault = parcelHelpers.interopDefault(_linearJs);
var _pathJs = require("./path.js");
var _pointJs = require("./point.js");

},{"./array.js":"kpsgI","./constant.js":"b6wSb","./curve/linear.js":"8xv10","./path.js":"bUrjE","./point.js":"7uEQv","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bUrjE":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "withPath", ()=>withPath);
var _d3Path = require("d3-path");
function withPath(shape) {
    let digits = 3;
    shape.digits = function(_) {
        if (!arguments.length) return digits;
        if (_ == null) digits = null;
        else {
            const d = Math.floor(_);
            if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
            digits = d;
        }
        return shape;
    };
    return ()=>new (0, _d3Path.Path)(digits);
}

},{"d3-path":"2eCDY","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2eCDY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Path", ()=>(0, _pathJs.Path));
parcelHelpers.export(exports, "path", ()=>(0, _pathJs.path));
parcelHelpers.export(exports, "pathRound", ()=>(0, _pathJs.pathRound));
var _pathJs = require("./path.js");

},{"./path.js":"gPmfw","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gPmfw":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Path", ()=>Path);
parcelHelpers.export(exports, "path", ()=>path);
parcelHelpers.export(exports, "pathRound", ()=>pathRound);
const pi = Math.PI, tau = 2 * pi, epsilon = 1e-6, tauEpsilon = tau - epsilon;
function append(strings) {
    this._ += strings[0];
    for(let i = 1, n = strings.length; i < n; ++i)this._ += arguments[i] + strings[i];
}
function appendRound(digits) {
    let d = Math.floor(digits);
    if (!(d >= 0)) throw new Error(`invalid digits: ${digits}`);
    if (d > 15) return append;
    const k = 10 ** d;
    return function(strings) {
        this._ += strings[0];
        for(let i = 1, n = strings.length; i < n; ++i)this._ += Math.round(arguments[i] * k) / k + strings[i];
    };
}
class Path {
    constructor(digits){
        this._x0 = this._y0 = this._x1 = this._y1 = null; // end of current subpath
        this._ = "";
        this._append = digits == null ? append : appendRound(digits);
    }
    moveTo(x, y) {
        this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}`;
    }
    closePath() {
        if (this._x1 !== null) {
            this._x1 = this._x0, this._y1 = this._y0;
            this._append`Z`;
        }
    }
    lineTo(x, y) {
        this._append`L${this._x1 = +x},${this._y1 = +y}`;
    }
    quadraticCurveTo(x1, y1, x, y) {
        this._append`Q${+x1},${+y1},${this._x1 = +x},${this._y1 = +y}`;
    }
    bezierCurveTo(x1, y1, x2, y2, x, y) {
        this._append`C${+x1},${+y1},${+x2},${+y2},${this._x1 = +x},${this._y1 = +y}`;
    }
    arcTo(x1, y1, x2, y2, r) {
        x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
        // Is the radius negative? Error.
        if (r < 0) throw new Error(`negative radius: ${r}`);
        let x0 = this._x1, y0 = this._y1, x21 = x2 - x1, y21 = y2 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
        // Is this path empty? Move to (x1,y1).
        if (this._x1 === null) this._append`M${this._x1 = x1},${this._y1 = y1}`;
        else if (!(l01_2 > epsilon)) ;
        else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) this._append`L${this._x1 = x1},${this._y1 = y1}`;
        else {
            let x20 = x2 - x0, y20 = y2 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l / l01, t21 = l / l21;
            // If the start tangent is not coincident with (x0,y0), line to.
            if (Math.abs(t01 - 1) > epsilon) this._append`L${x1 + t01 * x01},${y1 + t01 * y01}`;
            this._append`A${r},${r},0,0,${+(y01 * x20 > x01 * y20)},${this._x1 = x1 + t21 * x21},${this._y1 = y1 + t21 * y21}`;
        }
    }
    arc(x, y, r, a0, a1, ccw) {
        x = +x, y = +y, r = +r, ccw = !!ccw;
        // Is the radius negative? Error.
        if (r < 0) throw new Error(`negative radius: ${r}`);
        let dx = r * Math.cos(a0), dy = r * Math.sin(a0), x0 = x + dx, y0 = y + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
        // Is this path empty? Move to (x0,y0).
        if (this._x1 === null) this._append`M${x0},${y0}`;
        else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) this._append`L${x0},${y0}`;
        // Is this arc empty? We’re done.
        if (!r) return;
        // Does the angle go the wrong way? Flip the direction.
        if (da < 0) da = da % tau + tau;
        // Is this a complete circle? Draw two arcs to complete the circle.
        if (da > tauEpsilon) this._append`A${r},${r},0,1,${cw},${x - dx},${y - dy}A${r},${r},0,1,${cw},${this._x1 = x0},${this._y1 = y0}`;
        else if (da > epsilon) this._append`A${r},${r},0,${+(da >= pi)},${cw},${this._x1 = x + r * Math.cos(a1)},${this._y1 = y + r * Math.sin(a1)}`;
    }
    rect(x, y, w, h) {
        this._append`M${this._x0 = this._x1 = +x},${this._y0 = this._y1 = +y}h${w = +w}v${+h}h${-w}Z`;
    }
    toString() {
        return this._;
    }
}
function path() {
    return new Path;
}
// Allow instanceof d3.path
path.prototype = Path.prototype;
function pathRound(digits = 3) {
    return new Path(+digits);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7uEQv":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7kYfy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "axisTop", ()=>(0, _axisJs.axisTop));
parcelHelpers.export(exports, "axisRight", ()=>(0, _axisJs.axisRight));
parcelHelpers.export(exports, "axisBottom", ()=>(0, _axisJs.axisBottom));
parcelHelpers.export(exports, "axisLeft", ()=>(0, _axisJs.axisLeft));
var _axisJs = require("./axis.js");

},{"./axis.js":"eCzHZ","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eCzHZ":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "axisTop", ()=>axisTop);
parcelHelpers.export(exports, "axisRight", ()=>axisRight);
parcelHelpers.export(exports, "axisBottom", ()=>axisBottom);
parcelHelpers.export(exports, "axisLeft", ()=>axisLeft);
var _identityJs = require("./identity.js");
var _identityJsDefault = parcelHelpers.interopDefault(_identityJs);
var top = 1, right = 2, bottom = 3, left = 4, epsilon = 1e-6;
function translateX(x) {
    return "translate(" + x + ",0)";
}
function translateY(y) {
    return "translate(0," + y + ")";
}
function number(scale) {
    return (d)=>+scale(d);
}
function center(scale, offset) {
    offset = Math.max(0, scale.bandwidth() - offset * 2) / 2;
    if (scale.round()) offset = Math.round(offset);
    return (d)=>+scale(d) + offset;
}
function entering() {
    return !this.__axis;
}
function axis(orient, scale) {
    var tickArguments = [], tickValues = null, tickFormat = null, tickSizeInner = 6, tickSizeOuter = 6, tickPadding = 3, offset = typeof window !== "undefined" && window.devicePixelRatio > 1 ? 0 : 0.5, k = orient === top || orient === left ? -1 : 1, x = orient === left || orient === right ? "x" : "y", transform = orient === top || orient === bottom ? translateX : translateY;
    function axis(context) {
        var values = tickValues == null ? scale.ticks ? scale.ticks.apply(scale, tickArguments) : scale.domain() : tickValues, format = tickFormat == null ? scale.tickFormat ? scale.tickFormat.apply(scale, tickArguments) : (0, _identityJsDefault.default) : tickFormat, spacing = Math.max(tickSizeInner, 0) + tickPadding, range = scale.range(), range0 = +range[0] + offset, range1 = +range[range.length - 1] + offset, position = (scale.bandwidth ? center : number)(scale.copy(), offset), selection = context.selection ? context.selection() : context, path = selection.selectAll(".domain").data([
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
                return isFinite(d = position(d)) ? transform(d + offset) : this.getAttribute("transform");
            });
            tickEnter.attr("opacity", epsilon).attr("transform", function(d) {
                var p = this.parentNode.__axis;
                return transform((p && isFinite(p = p(d)) ? p : position(d)) + offset);
            });
        }
        tickExit.remove();
        path.attr("d", orient === left || orient === right ? tickSizeOuter ? "M" + k * tickSizeOuter + "," + range0 + "H" + offset + "V" + range1 + "H" + k * tickSizeOuter : "M" + offset + "," + range0 + "V" + range1 : tickSizeOuter ? "M" + range0 + "," + k * tickSizeOuter + "V" + offset + "H" + range1 + "V" + k * tickSizeOuter : "M" + range0 + "," + offset + "H" + range1);
        tick.attr("opacity", 1).attr("transform", function(d) {
            return transform(position(d) + offset);
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
        return tickArguments = Array.from(arguments), axis;
    };
    axis.tickArguments = function(_) {
        return arguments.length ? (tickArguments = _ == null ? [] : Array.from(_), axis) : tickArguments.slice();
    };
    axis.tickValues = function(_) {
        return arguments.length ? (tickValues = _ == null ? null : Array.from(_), axis) : tickValues && tickValues.slice();
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
    axis.offset = function(_) {
        return arguments.length ? (offset = +_, axis) : offset;
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

},{"./identity.js":"cGFc4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cGFc4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(x) {
        return x;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4Vxhm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "create", ()=>(0, _createJsDefault.default));
parcelHelpers.export(exports, "creator", ()=>(0, _creatorJsDefault.default));
parcelHelpers.export(exports, "local", ()=>(0, _localJsDefault.default));
parcelHelpers.export(exports, "matcher", ()=>(0, _matcherJsDefault.default));
parcelHelpers.export(exports, "namespace", ()=>(0, _namespaceJsDefault.default));
parcelHelpers.export(exports, "namespaces", ()=>(0, _namespacesJsDefault.default));
parcelHelpers.export(exports, "pointer", ()=>(0, _pointerJsDefault.default));
parcelHelpers.export(exports, "pointers", ()=>(0, _pointersJsDefault.default));
parcelHelpers.export(exports, "select", ()=>(0, _selectJsDefault.default));
parcelHelpers.export(exports, "selectAll", ()=>(0, _selectAllJsDefault.default));
parcelHelpers.export(exports, "selection", ()=>(0, _indexJsDefault.default));
parcelHelpers.export(exports, "selector", ()=>(0, _selectorJsDefault.default));
parcelHelpers.export(exports, "selectorAll", ()=>(0, _selectorAllJsDefault.default));
parcelHelpers.export(exports, "style", ()=>(0, _styleJs.styleValue));
parcelHelpers.export(exports, "window", ()=>(0, _windowJsDefault.default));
var _createJs = require("./create.js");
var _createJsDefault = parcelHelpers.interopDefault(_createJs);
var _creatorJs = require("./creator.js");
var _creatorJsDefault = parcelHelpers.interopDefault(_creatorJs);
var _localJs = require("./local.js");
var _localJsDefault = parcelHelpers.interopDefault(_localJs);
var _matcherJs = require("./matcher.js");
var _matcherJsDefault = parcelHelpers.interopDefault(_matcherJs);
var _namespaceJs = require("./namespace.js");
var _namespaceJsDefault = parcelHelpers.interopDefault(_namespaceJs);
var _namespacesJs = require("./namespaces.js");
var _namespacesJsDefault = parcelHelpers.interopDefault(_namespacesJs);
var _pointerJs = require("./pointer.js");
var _pointerJsDefault = parcelHelpers.interopDefault(_pointerJs);
var _pointersJs = require("./pointers.js");
var _pointersJsDefault = parcelHelpers.interopDefault(_pointersJs);
var _selectJs = require("./select.js");
var _selectJsDefault = parcelHelpers.interopDefault(_selectJs);
var _selectAllJs = require("./selectAll.js");
var _selectAllJsDefault = parcelHelpers.interopDefault(_selectAllJs);
var _indexJs = require("./selection/index.js");
var _indexJsDefault = parcelHelpers.interopDefault(_indexJs);
var _selectorJs = require("./selector.js");
var _selectorJsDefault = parcelHelpers.interopDefault(_selectorJs);
var _selectorAllJs = require("./selectorAll.js");
var _selectorAllJsDefault = parcelHelpers.interopDefault(_selectorAllJs);
var _styleJs = require("./selection/style.js");
var _windowJs = require("./window.js");
var _windowJsDefault = parcelHelpers.interopDefault(_windowJs);

},{"./create.js":false,"./creator.js":false,"./local.js":false,"./matcher.js":false,"./namespace.js":false,"./namespaces.js":false,"./pointer.js":"6j2mW","./pointers.js":false,"./select.js":"iqfs8","./selectAll.js":false,"./selection/index.js":false,"./selector.js":false,"./selectorAll.js":false,"./selection/style.js":false,"./window.js":false,"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kJCC5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(name) {
        var fullname = (0, _namespaceJsDefault.default)(name);
        return (fullname.local ? creatorFixed : creatorInherit)(fullname);
    });
var _namespaceJs = require("./namespace.js");
var _namespaceJsDefault = parcelHelpers.interopDefault(_namespaceJs);
var _namespacesJs = require("./namespaces.js");
function creatorInherit(name) {
    return function() {
        var document = this.ownerDocument, uri = this.namespaceURI;
        return uri === (0, _namespacesJs.xhtml) && document.documentElement.namespaceURI === (0, _namespacesJs.xhtml) ? document.createElement(name) : document.createElementNS(uri, name);
    };
}
function creatorFixed(fullname) {
    return function() {
        return this.ownerDocument.createElementNS(fullname.space, fullname.local);
    };
}

},{"./namespace.js":"eafwg","./namespaces.js":"3EfaU","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"eafwg":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(name) {
        var prefix = name += "", i = prefix.indexOf(":");
        if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
        return (0, _namespacesJsDefault.default).hasOwnProperty(prefix) ? {
            space: (0, _namespacesJsDefault.default)[prefix],
            local: name
        } : name; // eslint-disable-line no-prototype-builtins
    });
var _namespacesJs = require("./namespaces.js");
var _namespacesJsDefault = parcelHelpers.interopDefault(_namespacesJs);

},{"./namespaces.js":"3EfaU","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3EfaU":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1mU1W":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(selector) {
        return function() {
            return this.matches(selector);
        };
    });
parcelHelpers.export(exports, "childMatcher", ()=>childMatcher);
function childMatcher(selector) {
    return function(node) {
        return node.matches(selector);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6j2mW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(event, node) {
        event = (0, _sourceEventJsDefault.default)(event);
        if (node === undefined) node = event.currentTarget;
        if (node) {
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
            if (node.getBoundingClientRect) {
                var rect = node.getBoundingClientRect();
                return [
                    event.clientX - rect.left - node.clientLeft,
                    event.clientY - rect.top - node.clientTop
                ];
            }
        }
        return [
            event.pageX,
            event.pageY
        ];
    });
var _sourceEventJs = require("./sourceEvent.js");
var _sourceEventJsDefault = parcelHelpers.interopDefault(_sourceEventJs);

},{"./sourceEvent.js":"lUUuO","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lUUuO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(event) {
        let sourceEvent;
        while(sourceEvent = event.sourceEvent)event = sourceEvent;
        return event;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iqfs8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(selector) {
        return typeof selector === "string" ? new (0, _indexJs.Selection)([
            [
                document.querySelector(selector)
            ]
        ], [
            document.documentElement
        ]) : new (0, _indexJs.Selection)([
            [
                selector
            ]
        ], (0, _indexJs.root));
    });
var _indexJs = require("./selection/index.js");

},{"./selection/index.js":"j90xj","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"j90xj":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "root", ()=>root);
parcelHelpers.export(exports, "Selection", ()=>Selection);
var _selectJs = require("./select.js");
var _selectJsDefault = parcelHelpers.interopDefault(_selectJs);
var _selectAllJs = require("./selectAll.js");
var _selectAllJsDefault = parcelHelpers.interopDefault(_selectAllJs);
var _selectChildJs = require("./selectChild.js");
var _selectChildJsDefault = parcelHelpers.interopDefault(_selectChildJs);
var _selectChildrenJs = require("./selectChildren.js");
var _selectChildrenJsDefault = parcelHelpers.interopDefault(_selectChildrenJs);
var _filterJs = require("./filter.js");
var _filterJsDefault = parcelHelpers.interopDefault(_filterJs);
var _dataJs = require("./data.js");
var _dataJsDefault = parcelHelpers.interopDefault(_dataJs);
var _enterJs = require("./enter.js");
var _enterJsDefault = parcelHelpers.interopDefault(_enterJs);
var _exitJs = require("./exit.js");
var _exitJsDefault = parcelHelpers.interopDefault(_exitJs);
var _joinJs = require("./join.js");
var _joinJsDefault = parcelHelpers.interopDefault(_joinJs);
var _mergeJs = require("./merge.js");
var _mergeJsDefault = parcelHelpers.interopDefault(_mergeJs);
var _orderJs = require("./order.js");
var _orderJsDefault = parcelHelpers.interopDefault(_orderJs);
var _sortJs = require("./sort.js");
var _sortJsDefault = parcelHelpers.interopDefault(_sortJs);
var _callJs = require("./call.js");
var _callJsDefault = parcelHelpers.interopDefault(_callJs);
var _nodesJs = require("./nodes.js");
var _nodesJsDefault = parcelHelpers.interopDefault(_nodesJs);
var _nodeJs = require("./node.js");
var _nodeJsDefault = parcelHelpers.interopDefault(_nodeJs);
var _sizeJs = require("./size.js");
var _sizeJsDefault = parcelHelpers.interopDefault(_sizeJs);
var _emptyJs = require("./empty.js");
var _emptyJsDefault = parcelHelpers.interopDefault(_emptyJs);
var _eachJs = require("./each.js");
var _eachJsDefault = parcelHelpers.interopDefault(_eachJs);
var _attrJs = require("./attr.js");
var _attrJsDefault = parcelHelpers.interopDefault(_attrJs);
var _styleJs = require("./style.js");
var _styleJsDefault = parcelHelpers.interopDefault(_styleJs);
var _propertyJs = require("./property.js");
var _propertyJsDefault = parcelHelpers.interopDefault(_propertyJs);
var _classedJs = require("./classed.js");
var _classedJsDefault = parcelHelpers.interopDefault(_classedJs);
var _textJs = require("./text.js");
var _textJsDefault = parcelHelpers.interopDefault(_textJs);
var _htmlJs = require("./html.js");
var _htmlJsDefault = parcelHelpers.interopDefault(_htmlJs);
var _raiseJs = require("./raise.js");
var _raiseJsDefault = parcelHelpers.interopDefault(_raiseJs);
var _lowerJs = require("./lower.js");
var _lowerJsDefault = parcelHelpers.interopDefault(_lowerJs);
var _appendJs = require("./append.js");
var _appendJsDefault = parcelHelpers.interopDefault(_appendJs);
var _insertJs = require("./insert.js");
var _insertJsDefault = parcelHelpers.interopDefault(_insertJs);
var _removeJs = require("./remove.js");
var _removeJsDefault = parcelHelpers.interopDefault(_removeJs);
var _cloneJs = require("./clone.js");
var _cloneJsDefault = parcelHelpers.interopDefault(_cloneJs);
var _datumJs = require("./datum.js");
var _datumJsDefault = parcelHelpers.interopDefault(_datumJs);
var _onJs = require("./on.js");
var _onJsDefault = parcelHelpers.interopDefault(_onJs);
var _dispatchJs = require("./dispatch.js");
var _dispatchJsDefault = parcelHelpers.interopDefault(_dispatchJs);
var _iteratorJs = require("./iterator.js");
var _iteratorJsDefault = parcelHelpers.interopDefault(_iteratorJs);
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
function selection_selection() {
    return this;
}
Selection.prototype = selection.prototype = {
    constructor: Selection,
    select: (0, _selectJsDefault.default),
    selectAll: (0, _selectAllJsDefault.default),
    selectChild: (0, _selectChildJsDefault.default),
    selectChildren: (0, _selectChildrenJsDefault.default),
    filter: (0, _filterJsDefault.default),
    data: (0, _dataJsDefault.default),
    enter: (0, _enterJsDefault.default),
    exit: (0, _exitJsDefault.default),
    join: (0, _joinJsDefault.default),
    merge: (0, _mergeJsDefault.default),
    selection: selection_selection,
    order: (0, _orderJsDefault.default),
    sort: (0, _sortJsDefault.default),
    call: (0, _callJsDefault.default),
    nodes: (0, _nodesJsDefault.default),
    node: (0, _nodeJsDefault.default),
    size: (0, _sizeJsDefault.default),
    empty: (0, _emptyJsDefault.default),
    each: (0, _eachJsDefault.default),
    attr: (0, _attrJsDefault.default),
    style: (0, _styleJsDefault.default),
    property: (0, _propertyJsDefault.default),
    classed: (0, _classedJsDefault.default),
    text: (0, _textJsDefault.default),
    html: (0, _htmlJsDefault.default),
    raise: (0, _raiseJsDefault.default),
    lower: (0, _lowerJsDefault.default),
    append: (0, _appendJsDefault.default),
    insert: (0, _insertJsDefault.default),
    remove: (0, _removeJsDefault.default),
    clone: (0, _cloneJsDefault.default),
    datum: (0, _datumJsDefault.default),
    on: (0, _onJsDefault.default),
    dispatch: (0, _dispatchJsDefault.default),
    [Symbol.iterator]: (0, _iteratorJsDefault.default)
};
exports.default = selection;

},{"./select.js":"EYlyt","./selectAll.js":"kbniV","./selectChild.js":"1Ks9s","./selectChildren.js":"28fJK","./filter.js":"iw0Qo","./data.js":"iH2cu","./enter.js":"3X1HI","./exit.js":"7LgSm","./join.js":"4EjcX","./merge.js":"hXG0D","./order.js":"3CaTV","./sort.js":"61JD7","./call.js":"8fJM4","./nodes.js":"4DAU1","./node.js":"lo6UY","./size.js":"haXag","./empty.js":"9Wcg6","./each.js":"2hp4M","./attr.js":"buGcI","./style.js":"gh7oy","./property.js":"dnxcr","./classed.js":"2xmU1","./text.js":"5tyq0","./html.js":"bI4bk","./raise.js":"g9Fj8","./lower.js":"fMzO1","./append.js":"ceF7W","./insert.js":"1jf7i","./remove.js":"iBizO","./clone.js":"dblCQ","./datum.js":"ha2d4","./on.js":"dFa0s","./dispatch.js":"hE2BK","./iterator.js":"2HnAp","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"EYlyt":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(select) {
        if (typeof select !== "function") select = (0, _selectorJsDefault.default)(select);
        for(var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j){
            for(var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i)if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
                if ("__data__" in node) subnode.__data__ = node.__data__;
                subgroup[i] = subnode;
            }
        }
        return new (0, _indexJs.Selection)(subgroups, this._parents);
    });
var _indexJs = require("./index.js");
var _selectorJs = require("../selector.js");
var _selectorJsDefault = parcelHelpers.interopDefault(_selectorJs);

},{"./index.js":"j90xj","../selector.js":"27lrD","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"27lrD":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(selector) {
        return selector == null ? none : function() {
            return this.querySelector(selector);
        };
    });
function none() {}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kbniV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(select) {
        if (typeof select === "function") select = arrayAll(select);
        else select = (0, _selectorAllJsDefault.default)(select);
        for(var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j){
            for(var group = groups[j], n = group.length, node, i = 0; i < n; ++i)if (node = group[i]) {
                subgroups.push(select.call(node, node.__data__, i, group));
                parents.push(node);
            }
        }
        return new (0, _indexJs.Selection)(subgroups, parents);
    });
var _indexJs = require("./index.js");
var _arrayJs = require("../array.js");
var _arrayJsDefault = parcelHelpers.interopDefault(_arrayJs);
var _selectorAllJs = require("../selectorAll.js");
var _selectorAllJsDefault = parcelHelpers.interopDefault(_selectorAllJs);
function arrayAll(select) {
    return function() {
        return (0, _arrayJsDefault.default)(select.apply(this, arguments));
    };
}

},{"./index.js":"j90xj","../array.js":"2pvRs","../selectorAll.js":"2Px2o","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2pvRs":[function(require,module,exports) {
// Given something array like (or null), returns something that is strictly an
// array. This is used to ensure that array-like objects passed to d3.selectAll
// or selection.selectAll are converted into proper arrays when creating a
// selection; we don’t ever want to create a selection backed by a live
// HTMLCollection or NodeList. However, note that selection.selectAll will use a
// static NodeList as a group, since it safely derived from querySelectorAll.
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>array);
function array(x) {
    return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2Px2o":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1Ks9s":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(match) {
        return this.select(match == null ? childFirst : childFind(typeof match === "function" ? match : (0, _matcherJs.childMatcher)(match)));
    });
var _matcherJs = require("../matcher.js");
var find = Array.prototype.find;
function childFind(match) {
    return function() {
        return find.call(this.children, match);
    };
}
function childFirst() {
    return this.firstElementChild;
}

},{"../matcher.js":"1mU1W","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"28fJK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(match) {
        return this.selectAll(match == null ? children : childrenFilter(typeof match === "function" ? match : (0, _matcherJs.childMatcher)(match)));
    });
var _matcherJs = require("../matcher.js");
var filter = Array.prototype.filter;
function children() {
    return Array.from(this.children);
}
function childrenFilter(match) {
    return function() {
        return filter.call(this.children, match);
    };
}

},{"../matcher.js":"1mU1W","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iw0Qo":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(match) {
        if (typeof match !== "function") match = (0, _matcherJsDefault.default)(match);
        for(var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j){
            for(var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i)if ((node = group[i]) && match.call(node, node.__data__, i, group)) subgroup.push(node);
        }
        return new (0, _indexJs.Selection)(subgroups, this._parents);
    });
var _indexJs = require("./index.js");
var _matcherJs = require("../matcher.js");
var _matcherJsDefault = parcelHelpers.interopDefault(_matcherJs);

},{"./index.js":"j90xj","../matcher.js":"1mU1W","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iH2cu":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(value, key) {
        if (!arguments.length) return Array.from(this, datum);
        var bind = key ? bindKey : bindIndex, parents = this._parents, groups = this._groups;
        if (typeof value !== "function") value = (0, _constantJsDefault.default)(value);
        for(var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j){
            var parent = parents[j], group = groups[j], groupLength = group.length, data = arraylike(value.call(parent, parent && parent.__data__, j, parents)), dataLength = data.length, enterGroup = enter[j] = new Array(dataLength), updateGroup = update[j] = new Array(dataLength), exitGroup = exit[j] = new Array(groupLength);
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
        update = new (0, _indexJs.Selection)(update, parents);
        update._enter = enter;
        update._exit = exit;
        return update;
    });
var _indexJs = require("./index.js");
var _enterJs = require("./enter.js");
var _constantJs = require("../constant.js");
var _constantJsDefault = parcelHelpers.interopDefault(_constantJs);
function bindIndex(parent, group, enter, update, exit, data) {
    var i = 0, node, groupLength = group.length, dataLength = data.length;
    // Put any non-null nodes that fit into update.
    // Put any null nodes into enter.
    // Put any remaining data into enter.
    for(; i < dataLength; ++i)if (node = group[i]) {
        node.__data__ = data[i];
        update[i] = node;
    } else enter[i] = new (0, _enterJs.EnterNode)(parent, data[i]);
    // Put any non-null nodes that don’t fit into exit.
    for(; i < groupLength; ++i)if (node = group[i]) exit[i] = node;
}
function bindKey(parent, group, enter, update, exit, data, key) {
    var i, node, nodeByKeyValue = new Map, groupLength = group.length, dataLength = data.length, keyValues = new Array(groupLength), keyValue;
    // Compute the key for each node.
    // If multiple nodes have the same key, the duplicates are added to exit.
    for(i = 0; i < groupLength; ++i)if (node = group[i]) {
        keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
        if (nodeByKeyValue.has(keyValue)) exit[i] = node;
        else nodeByKeyValue.set(keyValue, node);
    }
    // Compute the key for each datum.
    // If there a node associated with this key, join and add it to update.
    // If there is not (or the key is a duplicate), add it to enter.
    for(i = 0; i < dataLength; ++i){
        keyValue = key.call(parent, data[i], i, data) + "";
        if (node = nodeByKeyValue.get(keyValue)) {
            update[i] = node;
            node.__data__ = data[i];
            nodeByKeyValue.delete(keyValue);
        } else enter[i] = new (0, _enterJs.EnterNode)(parent, data[i]);
    }
    // Add any remaining nodes that were not bound to data to exit.
    for(i = 0; i < groupLength; ++i)if ((node = group[i]) && nodeByKeyValue.get(keyValues[i]) === node) exit[i] = node;
}
function datum(node) {
    return node.__data__;
}
// Given some data, this returns an array-like view of it: an object that
// exposes a length property and allows numeric indexing. Note that unlike
// selectAll, this isn’t worried about “live” collections because the resulting
// array will only be used briefly while data is being bound. (It is possible to
// cause the data to change while iterating by using a key function, but please
// don’t; we’d rather avoid a gratuitous copy.)
function arraylike(data) {
    return typeof data === "object" && "length" in data ? data // Array, TypedArray, NodeList, array-like
     : Array.from(data); // Map, Set, iterable, string, or anything else
}

},{"./index.js":"j90xj","./enter.js":"3X1HI","../constant.js":"fCO4w","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3X1HI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        return new (0, _indexJs.Selection)(this._enter || this._groups.map((0, _sparseJsDefault.default)), this._parents);
    });
parcelHelpers.export(exports, "EnterNode", ()=>EnterNode);
var _sparseJs = require("./sparse.js");
var _sparseJsDefault = parcelHelpers.interopDefault(_sparseJs);
var _indexJs = require("./index.js");
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

},{"./sparse.js":"cGtxX","./index.js":"j90xj","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"cGtxX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(update) {
        return new Array(update.length);
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fCO4w":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(x) {
        return function() {
            return x;
        };
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7LgSm":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        return new (0, _indexJs.Selection)(this._exit || this._groups.map((0, _sparseJsDefault.default)), this._parents);
    });
var _sparseJs = require("./sparse.js");
var _sparseJsDefault = parcelHelpers.interopDefault(_sparseJs);
var _indexJs = require("./index.js");

},{"./sparse.js":"cGtxX","./index.js":"j90xj","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4EjcX":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(onenter, onupdate, onexit) {
        var enter = this.enter(), update = this, exit = this.exit();
        if (typeof onenter === "function") {
            enter = onenter(enter);
            if (enter) enter = enter.selection();
        } else enter = enter.append(onenter + "");
        if (onupdate != null) {
            update = onupdate(update);
            if (update) update = update.selection();
        }
        if (onexit == null) exit.remove();
        else onexit(exit);
        return enter && update ? enter.merge(update).order() : update;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hXG0D":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(context) {
        var selection = context.selection ? context.selection() : context;
        for(var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j){
            for(var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i)if (node = group0[i] || group1[i]) merge[i] = node;
        }
        for(; j < m0; ++j)merges[j] = groups0[j];
        return new (0, _indexJs.Selection)(merges, this._parents);
    });
var _indexJs = require("./index.js");

},{"./index.js":"j90xj","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3CaTV":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"61JD7":[function(require,module,exports) {
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
        return new (0, _indexJs.Selection)(sortgroups, this._parents).order();
    });
var _indexJs = require("./index.js");
function ascending(a, b) {
    return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

},{"./index.js":"j90xj","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8fJM4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        var callback = arguments[0];
        arguments[0] = this;
        callback.apply(null, arguments);
        return this;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"4DAU1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        return Array.from(this);
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lo6UY":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        for(var groups = this._groups, j = 0, m = groups.length; j < m; ++j)for(var group = groups[j], i = 0, n = group.length; i < n; ++i){
            var node = group[i];
            if (node) return node;
        }
        return null;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"haXag":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        let size = 0;
        for (const node of this)++size; // eslint-disable-line no-unused-vars
        return size;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9Wcg6":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        return !this.node();
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2hp4M":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(callback) {
        for(var groups = this._groups, j = 0, m = groups.length; j < m; ++j){
            for(var group = groups[j], i = 0, n = group.length, node; i < n; ++i)if (node = group[i]) callback.call(node, node.__data__, i, group);
        }
        return this;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"buGcI":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(name, value) {
        var fullname = (0, _namespaceJsDefault.default)(name);
        if (arguments.length < 2) {
            var node = this.node();
            return fullname.local ? node.getAttributeNS(fullname.space, fullname.local) : node.getAttribute(fullname);
        }
        return this.each((value == null ? fullname.local ? attrRemoveNS : attrRemove : typeof value === "function" ? fullname.local ? attrFunctionNS : attrFunction : fullname.local ? attrConstantNS : attrConstant)(fullname, value));
    });
var _namespaceJs = require("../namespace.js");
var _namespaceJsDefault = parcelHelpers.interopDefault(_namespaceJs);
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

},{"../namespace.js":"eafwg","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gh7oy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(name, value, priority) {
        return arguments.length > 1 ? this.each((value == null ? styleRemove : typeof value === "function" ? styleFunction : styleConstant)(name, value, priority == null ? "" : priority)) : styleValue(this.node(), name);
    });
parcelHelpers.export(exports, "styleValue", ()=>styleValue);
var _windowJs = require("../window.js");
var _windowJsDefault = parcelHelpers.interopDefault(_windowJs);
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
    return node.style.getPropertyValue(name) || (0, _windowJsDefault.default)(node).getComputedStyle(node, null).getPropertyValue(name);
}

},{"../window.js":"6uPo4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6uPo4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(node) {
        return node.ownerDocument && node.ownerDocument.defaultView // node is a Node
         || node.document && node // node is a Window
         || node.defaultView; // node is a Document
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dnxcr":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2xmU1":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5tyq0":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"bI4bk":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"g9Fj8":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        return this.each(raise);
    });
function raise() {
    if (this.nextSibling) this.parentNode.appendChild(this);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fMzO1":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        return this.each(lower);
    });
function lower() {
    if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ceF7W":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(name) {
        var create = typeof name === "function" ? name : (0, _creatorJsDefault.default)(name);
        return this.select(function() {
            return this.appendChild(create.apply(this, arguments));
        });
    });
var _creatorJs = require("../creator.js");
var _creatorJsDefault = parcelHelpers.interopDefault(_creatorJs);

},{"../creator.js":"kJCC5","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1jf7i":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(name, before) {
        var create = typeof name === "function" ? name : (0, _creatorJsDefault.default)(name), select = before == null ? constantNull : typeof before === "function" ? before : (0, _selectorJsDefault.default)(before);
        return this.select(function() {
            return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
        });
    });
var _creatorJs = require("../creator.js");
var _creatorJsDefault = parcelHelpers.interopDefault(_creatorJs);
var _selectorJs = require("../selector.js");
var _selectorJsDefault = parcelHelpers.interopDefault(_selectorJs);
function constantNull() {
    return null;
}

},{"../creator.js":"kJCC5","../selector.js":"27lrD","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iBizO":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function() {
        return this.each(remove);
    });
function remove() {
    var parent = this.parentNode;
    if (parent) parent.removeChild(this);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dblCQ":[function(require,module,exports) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"ha2d4":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(value) {
        return arguments.length ? this.property("__data__", value) : this.node().__data__;
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dFa0s":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(typename, value, options) {
        var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;
        if (arguments.length < 2) {
            var on = this.node().__on;
            if (on) for(var j = 0, m = on.length, o; j < m; ++j)for(i = 0, o = on[j]; i < n; ++i){
                if ((t = typenames[i]).type === o.type && t.name === o.name) return o.value;
            }
            return;
        }
        on = value ? onAdd : onRemove;
        for(i = 0; i < n; ++i)this.each(on(typenames[i], value, options));
        return this;
    });
function contextListener(listener) {
    return function(event) {
        listener.call(this, event, this.__data__);
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
        for(var j = 0, i = -1, m = on.length, o; j < m; ++j)if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) this.removeEventListener(o.type, o.listener, o.options);
        else on[++i] = o;
        if (++i) on.length = i;
        else delete this.__on;
    };
}
function onAdd(typename, value, options) {
    return function() {
        var on = this.__on, o, listener = contextListener(value);
        if (on) {
            for(var j = 0, m = on.length; j < m; ++j)if ((o = on[j]).type === typename.type && o.name === typename.name) {
                this.removeEventListener(o.type, o.listener, o.options);
                this.addEventListener(o.type, o.listener = listener, o.options = options);
                o.value = value;
                return;
            }
        }
        this.addEventListener(typename.type, listener, options);
        o = {
            type: typename.type,
            name: typename.name,
            value: value,
            listener: listener,
            options: options
        };
        if (!on) this.__on = [
            o
        ];
        else on.push(o);
    };
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"hE2BK":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function(type, params) {
        return this.each((typeof params === "function" ? dispatchFunction : dispatchConstant)(type, params));
    });
var _windowJs = require("../window.js");
var _windowJsDefault = parcelHelpers.interopDefault(_windowJs);
function dispatchEvent(node, type, params) {
    var window = (0, _windowJsDefault.default)(node), event = window.CustomEvent;
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

},{"../window.js":"6uPo4","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2HnAp":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>function*() {
        for(var groups = this._groups, j = 0, m = groups.length; j < m; ++j){
            for(var group = groups[j], i = 0, n = group.length, node; i < n; ++i)if (node = group[i]) yield node;
        }
    });

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6057L":[function(require,module,exports) {
/*
 (c) 2017, Vladimir Agafonkin
 Simplify.js, a high-performance JS polyline simplification library
 mourner.github.io/simplify-js
*/ (function() {
    "use strict";
    // to suit your point format, run search/replace for '.x' and '.y';
    // for 3D version, see 3d branch (configurability would draw significant performance overhead)
    // square distance between 2 points
    function getSqDist(p1, p2) {
        var dx = p1.x - p2.x, dy = p1.y - p2.y;
        return dx * dx + dy * dy;
    }
    // square distance from a point to a segment
    function getSqSegDist(p, p1, p2) {
        var x = p1.x, y = p1.y, dx = p2.x - x, dy = p2.y - y;
        if (dx !== 0 || dy !== 0) {
            var t = ((p.x - x) * dx + (p.y - y) * dy) / (dx * dx + dy * dy);
            if (t > 1) {
                x = p2.x;
                y = p2.y;
            } else if (t > 0) {
                x += dx * t;
                y += dy * t;
            }
        }
        dx = p.x - x;
        dy = p.y - y;
        return dx * dx + dy * dy;
    }
    // rest of the code doesn't care about point format
    // basic distance-based simplification
    function simplifyRadialDist(points, sqTolerance) {
        var prevPoint = points[0], newPoints = [
            prevPoint
        ], point;
        for(var i = 1, len = points.length; i < len; i++){
            point = points[i];
            if (getSqDist(point, prevPoint) > sqTolerance) {
                newPoints.push(point);
                prevPoint = point;
            }
        }
        if (prevPoint !== point) newPoints.push(point);
        return newPoints;
    }
    function simplifyDPStep(points, first, last, sqTolerance, simplified) {
        var maxSqDist = sqTolerance, index;
        for(var i = first + 1; i < last; i++){
            var sqDist = getSqSegDist(points[i], points[first], points[last]);
            if (sqDist > maxSqDist) {
                index = i;
                maxSqDist = sqDist;
            }
        }
        if (maxSqDist > sqTolerance) {
            if (index - first > 1) simplifyDPStep(points, first, index, sqTolerance, simplified);
            simplified.push(points[index]);
            if (last - index > 1) simplifyDPStep(points, index, last, sqTolerance, simplified);
        }
    }
    // simplification using Ramer-Douglas-Peucker algorithm
    function simplifyDouglasPeucker(points, sqTolerance) {
        var last = points.length - 1;
        var simplified = [
            points[0]
        ];
        simplifyDPStep(points, 0, last, sqTolerance, simplified);
        simplified.push(points[last]);
        return simplified;
    }
    // both algorithms combined for awesome performance
    function simplify(points, tolerance, highestQuality) {
        if (points.length <= 2) return points;
        var sqTolerance = tolerance !== undefined ? tolerance * tolerance : 1;
        points = highestQuality ? points : simplifyRadialDist(points, sqTolerance);
        points = simplifyDouglasPeucker(points, sqTolerance);
        return points;
    }
    // export as AMD module / Node module / browser or worker variable
    if (typeof define === "function" && define.amd) define(function() {
        return simplify;
    });
    else {
        module.exports = simplify;
        module.exports.default = simplify;
    }
})();

},{}]},["ijkuy","f4bRs"], "f4bRs", "parcelRequireed82")

//# sourceMappingURL=simple.8341b5a4.js.map
