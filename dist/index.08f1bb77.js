// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
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
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
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
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
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
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"7cpAt":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "14ca907046ac17e4bfe7e5e808f1bb77";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
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
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"365qn":[function(require,module,exports) {
(() => {
  const templates = {
    current: `
    <article class="weather_day">
      <div class="weather_graphic">
        <img
          class="weather_icon"
          data-attrib="icon"
          src=""
          width="200"
          alt=""
        />
        <div class="weather_condition" data-attrib="condition"></div>
      </div>
      <div class="weather_info">
        <div data-attrib="date"></div>
        <h1><span data-attrib="temp"></span>&#176;</h1>
        <div class="weather_feels_like">
          Feels like
          <span data-attrib="feels-like">89</span>&#176;
        </div>
      </div>
      <div class="additional-info">
        <div class="sunrise">
          <img src="https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/all/sunrise.svg" alt="" width="60">
          <span data-attrib="sunrise">5:35 AM</span>
        </div>
        <div class="sunset">
          <img src="https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/all/sunset.svg" alt="" width="60">
          <span data-attrib="sunset">8:35 PM</span>
        </div>
        <div class="humidity">
          <img src="https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/all/humidity.svg" alt="" width="60">
          <span data-attrib="humidity">70%</span>
        </div>
      </div>
    </article>
    `,
    hourly: `
    <div class="hourly">
      <div class="time" data-attrib="time"></div>
      <img data-attrib="icon" class="weather_icon" src="./src/svg/10d.svg" width="100" alt="">
      <div>
        <span data-attrib="temp"></span>&#176;
      </div>
    </div>
    `,
    daily: `
    <div class="daily">
      <div data-attrib="day" class="day">Sunday</div>
      <div class="icon"><img data-attrib="icon" src="./src/svg/13d.svg" width="50" alt="" /></div>
      <div data-attrib="high" class="temp high">89&#176;</div>
      <div data-attrib="low" class="temp low">65&#176;</div>
    </div>
    `,
    alert: `
    <article>
      <h3 data-attrib="event" class="event">Heat Advisory</h3>
      <div data-attrib="dates" class="dates">asdfas</div>
      <div data-attrib="sender" class="sender">NWS Philadelphia - Mount Holly (New Jersey, Delaware, Southeastern Pennsylvania)</div>
      <p data-attrib="description">...HEAT ADVISORY IN EFFECT FROM 11 AM TUESDAY TO 8 PM EDT
        WEDNESDAY...
        * WHAT...Heat index values up to 104 expected.
        * WHERE...In New Jersey, Ocean and Southeastern Burlington. In
        Pennsylvania, Western Montgomery and Upper Bucks.
        * WHEN...From 11 AM Tuesday to 8 PM EDT Wednesday.
        * IMPACTS...Hot temperatures and high humidity may cause heat
        illnesses to occur.</p>
      <div data-attrib="tags">
        <span class="tag">Extreme temperature value</span>
      </div>
    </article>
    `
  };

  const appEl = document.getElementById("search-section");
  const autoCompleteEl = appEl.querySelector(".auto-complete");
  const optionListEl = autoCompleteEl.querySelector(".option-list");
  const searchBoxEl = autoCompleteEl.querySelector(".search-box");
  const locationDetailsEl = appEl.querySelector("#location-details");
  const currentWeatherDayDetailsEl = appEl.querySelector(
    ".current-weather-day-details"
  );
  const hourlyDetailsEl = appEl.querySelector(".weather-hourly");
  const dailyDetailsEl = appEl.querySelector(".weather-daily");
  const unitConverter = appEl.querySelector(".unit-converter");
  const alertsEl = appEl.querySelector('.alerts')
  // const locationUrl = "http://localhost:8080/getLocations";
  // const detailsUrl = "http://localhost:8080/details";
  const locationUrl = "/getLocations";
  const detailsUrl = "/details";
  const tl = gsap.timeline();
  tl.to('.current-weather-day-details', { opacity: 1, duration: .6, x: 0, scale: 1, pointerEvent: 'auto' })
  tl.to('.stagger', { x:0, opacity:1, stagger: .2 }, "-=.3")
  tl.pause();
  const initalSelectedCity = {
    id: -1,
    name: "",
    state: "",
    country: "",
    coord: {
      lon: -1,
      lat: -1,
    },
  };
  let state = {
    cities: [],
    selectedUnit: sessionStorage.getItem('unit-measurement') || 'imperial',
    selectedCity: { ...initalSelectedCity },
    weatherDetails: {},
  };

  const initialize = () => {
    updateUnitButton();
  }

  const updateUnitButton = () => {    
    unitConverter.querySelectorAll('button').forEach(btn => {
      const unit = btn.getAttribute('data-attrib');
      if(unit === state.selectedUnit) {
        btn.classList.add('selected')
      } else {
        btn.classList.remove('selected')
      }
    })
  }

  const stringToHTML = (str) => {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, "text/html");
    return doc.body;
  };

  // Using Regex (from detectmobilebrowsers.com)
  const mobileCheck = () => {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  };  

  const getDate = (unix_timestamp, timezone) => {
    return moment.unix(unix_timestamp).tz(timezone);
  };

  const displayTemp = (temp) => Math.ceil(temp);

  const renderCurrentDay = () => {
    const template = templates.current;
    console.log(state.weatherDetails)
    const { current, timezone } = state.weatherDetails;
    const sunrise = getDate(current.sunrise, timezone);
    const sunset = getDate(current.sunset, timezone);
    const { weather } = current;
    const dom = stringToHTML(template).querySelector(".weather_day");   
    const iconEl =  dom.querySelector(
      'img[data-attrib="icon"]'
    )
    iconEl.src = `https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/openweathermap/${weather[0].icon}.svg`;
    if(mobileCheck()) {
      iconEl.setAttribute('width', 100) 
    }
    dom.querySelector('div[data-attrib="condition"]').innerText =
      weather[0].description.toUpperCase();
    dom.querySelector('div[data-attrib="date"]').innerText = getDate(
      current.dt, timezone
    ).format("dddd, MMMM Do YYYY");
    dom.querySelector('span[data-attrib="temp"]').innerText = displayTemp(
      current.temp
    );
    dom.querySelector('span[data-attrib="feels-like"]').innerText = displayTemp(
      current.feels_like
    );
    dom.querySelector('span[data-attrib="sunrise"]').innerText =
      sunrise.format('hh:mm A');
    dom.querySelector('span[data-attrib="sunset"]').innerText =
      sunset.format('hh:mm A');
    dom.querySelector(
      'span[data-attrib="humidity"]'
    ).innerText = `${current.humidity}%`;
    currentWeatherDayDetailsEl.appendChild(dom);
  };

  const renderHourly = () => {
    const { hourly, timezone } = state.weatherDetails;
    hourly.forEach((h, i) => {
      const { weather } = h;
      const template = templates.hourly;
      const hourlyDt = getDate(h.dt, timezone);
      const dom = stringToHTML(template).querySelector(".hourly");
      const iconEl =dom.querySelector(
        'img[data-attrib="icon"]'
      );
      dom.querySelector('div[data-attrib="time"]').innerText =
        i === 0
          ? "Now"
          : hourlyDt.format('h A');
      
      iconEl.src = `https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/openweathermap/${weather[0].icon}.svg`;
      if(mobileCheck()) {
        iconEl.setAttribute('width', 50) 
      }
      dom.querySelector('span[data-attrib="temp"]').innerText = displayTemp(
        h.temp
      );
      hourlyDetailsEl.appendChild(dom);
    });
  };

  renderDaily = () => {
    const { daily, timezone } = state.weatherDetails;
    daily.slice(1, daily.length).forEach((d) => {
      const { weather } = d;
      const { temp } = d;
      const template = templates.daily;
      const weekday = getDate(d.dt, timezone).format('dddd');
      const dom = stringToHTML(template).querySelector(".daily");
      dom.querySelector('div[data-attrib="day"]').innerText = weekday;
      dom.querySelector(
        'img[data-attrib="icon"]'
      ).src = `https://raw.githubusercontent.com/basmilius/weather-icons/master/production/line/openweathermap/${weather[0].icon}.svg`;
      dom.querySelector('div[data-attrib="high"]').innerText = displayTemp(
        temp.max
      );
      dom.querySelector('div[data-attrib="low"]').innerText = displayTemp(
        temp.min
      );
      dailyDetailsEl.appendChild(dom);
    });
  };

  renderAlerts = () => {
    const { alerts, timezone } = state.weatherDetails;    
    if(alerts) {
      alerts.forEach(a => {
        const template = templates.alert;
        const start = getDate(a.start, timezone).format("dddd, MMMM Do YYYY")
        const end = getDate(a.end, timezone).format("dddd, MMMM Do YYYY")
        const dom = stringToHTML(template).querySelector("article");
        dom.querySelector('h3[data-attrib="event"]').innerText = a.event;
        dom.querySelector('div[data-attrib="dates"]').innerText = `${start} - ${end}`;
        dom.querySelector('div[data-attrib="sender"]').innerText = a.sender_name;
        dom.querySelector('p[data-attrib="description"]').innerHTML = a.description;
        dom.querySelector('div[data-attrib="tags"]').innerHTML = a.tags.map(t => (`<span class="tag">${t}</span>`));
        alertsEl.appendChild(dom);
      })
    }
  }

  const clearList = () => {
    locationDetailsEl.innerHTML = "";
    optionListEl.innerHTML = "";
    currentWeatherDayDetailsEl.innerHTML = "";
    hourlyDetailsEl.innerHTML = "";
    dailyDetailsEl.innerHTML = "";
    autoCompleteEl.classList.add("no-options");
    alertsEl.innerHTML = '';
  };

  const clearSelectedCity = () => {
    appEl.classList.remove("selected");
  };

  const setSearchBoxValue = () => {
    appEl.classList.add("selected");
    searchBoxEl.value = state.selectedCity.name;
  };

  const setLocationDetails = (city) => {
    locationDetailsEl.innerHTML = getDisplayText(city, " ", [
      "state",
      "country",
    ]);
  };
  const clearIsLoading = () => {
    autoCompleteEl.classList.remove("is-loading");
  };

  const setIsLoading = () => {
    autoCompleteEl.classList.add("is-loading");
  };

  const getDisplayText = (
    city,
    splitBy,
    includeFields = ["name", "state", "country"]
  ) => {
    return includeFields
      .map((field) => city[field])
      .filter((v) => !!v)
      .map((v) => `<span>${v}</span>`)
      .join(splitBy);
  };

  const updateDropdown = () => {
    clearList();
    if (state.cities.length) {
      state.cities.forEach((city) => {
        let element = document.createElement("li");
        element.innerHTML = getDisplayText(city, " - ");
        element.setAttribute("data-id", city.id);
        optionListEl.appendChild(element);
      });
    } else {
      let element = document.createElement("li");
      element.innerHTML = "No matches";
      element.setAttribute("data-id", "-1");
      element.setAttribute("class", "no-matches");
      optionListEl.appendChild(element);
    }
    autoCompleteEl.classList.remove("no-options");
  };

  const fethCityNames = (str) => {
    setIsLoading();
    fetch(`${locationUrl}?location=${str}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        state = { ...state, cities: [...data.slice(0, 5)] };
        clearIsLoading();
        updateDropdown();
      });
  };

  const fetchDetails = (unit = 'imperial') => {
    const { coord } = state.selectedCity;
    const { lat, lon } = coord;
    fetch(`${detailsUrl}?lat=${lat}&lon=${lon}&unit=${unit}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        state = { ...state, weatherDetails: { ...data } };
        render();
      });
  };

  const render = () => {
    renderCurrentDay();
    renderHourly();
    renderDaily();
    renderAlerts();
  };

  const delay = (callback, ms) => {
    var timer = 0;
    return function() {
      var context = this, args = arguments;
      clearTimeout(timer);
      timer = setTimeout(function () {
        callback.apply(context, args);
      }, ms || 0);
    };
  }
  

  autoCompleteEl.addEventListener("keyup", delay((e) => {
    const value = e.target.value;
    if (value === state.selectedCity.title) {
      return;
    }
    if (value.length > 3) {
      fethCityNames(value);
    } else {
      tl.reverse();
      clearSelectedCity();
    }
  }, 500));

  optionListEl.addEventListener("click", (e) => {
    const id = parseInt(e.target.dataset.id);
    const unit = state.selectedUnit;
    if (id > 0) {
      state = {
        ...state,
        selectedCity: {
          ...state.cities.find((c) => c.id === id),
        },
      };
      setSearchBoxValue();
      clearList();
      setLocationDetails(state.selectedCity);
      fetchDetails(unit);
      tl.play();
    }
  });

  unitConverter.addEventListener('click', (e) => {
    const unit = e.target.getAttribute("data-attrib")
    sessionStorage.setItem('unit-measurement', unit)
    state = { ...state, selectedUnit: unit };
    clearList();
    setLocationDetails(state.selectedCity);
    fetchDetails(unit);
    updateUnitButton();
  })

  initialize();
  
})();

},{}]},["7cpAt","365qn"], "365qn", "parcelRequire2e27")

//# sourceMappingURL=index.08f1bb77.js.map
