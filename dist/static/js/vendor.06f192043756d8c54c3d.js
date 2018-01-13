webpackJsonp([1],{

/***/ "162o":
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__("mypn");
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),

/***/ "3EgV":
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Vuetify"] = factory();
	else
		root["Vuetify"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 45);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    dark: Boolean,
    light: Boolean
  },

  computed: {
    themeClasses: function themeClasses() {
      return {
        'theme--light': this.light,
        'theme--dark': this.dark
      };
    }
  }
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["d"] = createSimpleFunctional;
/* harmony export (immutable) */ __webpack_exports__["e"] = createSimpleTransition;
/* harmony export (immutable) */ __webpack_exports__["b"] = createJavaScriptTransition;
/* unused harmony export directiveConfig */
/* harmony export (immutable) */ __webpack_exports__["a"] = addOnceEventListener;
/* harmony export (immutable) */ __webpack_exports__["f"] = getObjectValueByPath;
/* harmony export (immutable) */ __webpack_exports__["c"] = createRange;
/* harmony export (immutable) */ __webpack_exports__["g"] = getZIndex;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createSimpleFunctional(c) {
  var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'div';
  var name = arguments[2];

  name = name || c.replace(/__/g, '-');

  return {
    name: 'v-' + name,
    functional: true,

    render: function render(h, _ref) {
      var data = _ref.data,
          children = _ref.children;

      data.staticClass = (c + ' ' + (data.staticClass || '')).trim();

      return h(el, data, children);
    }
  };
}

function createSimpleTransition(name) {
  var origin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top center 0';
  var mode = arguments[2];

  return {
    name: name,

    functional: true,

    props: {
      origin: {
        type: String,
        default: origin
      }
    },

    render: function render(h, context) {
      context.data = context.data || {};
      context.data.props = { name: name };
      context.data.on = context.data.on || {};
      if (!Object.isExtensible(context.data.on)) {
        context.data.on = _extends({}, context.data.on);
      }

      if (mode) context.data.props.mode = mode;

      context.data.on.beforeEnter = function (el) {
        el.style.transformOrigin = context.props.origin;
        el.style.webkitTransformOrigin = context.props.origin;
      };

      return h('transition', context.data, context.children);
    }
  };
}

function createJavaScriptTransition(name, functions) {
  var css = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var mode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'in-out';

  return {
    name: name,

    functional: true,

    props: {
      css: {
        type: Boolean,
        default: css
      },
      mode: {
        type: String,
        default: mode
      }
    },

    render: function render(h, context) {
      var data = {
        props: _extends({}, context.props, {
          name: name
        }),
        on: functions
      };

      return h('transition', data, context.children);
    }
  };
}

function directiveConfig(binding) {
  var defaults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return Object.assign({}, defaults, binding.modifiers, { value: binding.arg }, binding.value || {});
}

function addOnceEventListener(el, event, cb) {
  var once = function once() {
    cb();
    el.removeEventListener(event, once, false);
  };

  el.addEventListener(event, once, false);
}

function getObjectValueByPath(obj, path) {
  // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (!path || path.constructor !== String) return;
  path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  path = path.replace(/^\./, ''); // strip a leading dot
  var a = path.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
    var k = a[i];
    if (obj instanceof Object && k in obj) {
      obj = obj[k];
    } else {
      return;
    }
  }
  return obj;
}

function createRange(length) {
  return [].concat(_toConsumableArray(Array.from({ length: length }, function (v, k) {
    return k;
  })));
}

function getZIndex(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return 0;
  var zi = document.defaultView.getComputedStyle(el).getPropertyValue('z-index');
  if (isNaN(zi)) return getZIndex(el.parentNode);

  return zi;
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    color: String
  },
  methods: {
    addBackgroundColorClassChecks: function addBackgroundColorClassChecks(classes) {
      var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'color';

      if (this[prop]) {
        classes[this[prop]] = true;
      }
      return classes;
    },
    addTextColorClassChecks: function addTextColorClassChecks(classes) {
      var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'color';

      var parts = this[prop] ? this[prop].trim().split(' ') : [''];
      var color = parts[0] + '--text';
      if (parts.length > 1) color += ' text--' + parts[1];
      classes[color] = !!this[prop];
      return classes;
    }
  }
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VIcon__ = __webpack_require__(61);


__WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */]);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = factory;
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function factory() {
  var _watch;

  var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'value';
  var event = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'input';

  return {
    model: { prop: prop, event: event },

    props: _defineProperty({}, prop, { required: false }),

    data: function data() {
      return {
        isActive: !!this[prop]
      };
    },


    watch: (_watch = {}, _defineProperty(_watch, prop, function (val) {
      this.isActive = !!val;
    }), _defineProperty(_watch, 'isActive', function isActive(val) {
      !!val !== this[prop] && this.$emit(event, val);
    }), _watch)
  };
}

var Toggleable = factory();

/* harmony default export */ __webpack_exports__["a"] = (Toggleable);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export VBottomSheetTranstion */
/* unused harmony export VCarouselTransition */
/* unused harmony export VCarouselReverseTransition */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return VTabTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return VTabReverseTransition; });
/* unused harmony export VMenuTransition */
/* unused harmony export VFabTransition */
/* unused harmony export VDialogTransition */
/* unused harmony export VDialogBottomTransition */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return VFadeTransition; });
/* unused harmony export VScaleTransition */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return VSlideXTransition; });
/* unused harmony export VSlideXReverseTransition */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return VSlideYTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return VSlideYReverseTransition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VExpandTransition; });
/* unused harmony export VRowExpandTransition */
/* harmony export (immutable) */ __webpack_exports__["h"] = install;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__expand_transition__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__row_expand_transition__ = __webpack_require__(30);





// Component specific transitions
var VBottomSheetTranstion = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('bottom-sheet-transition');
var VCarouselTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('carousel-transition');
var VCarouselReverseTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('carousel-reverse-transition');
var VTabTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('tab-transition');
var VTabReverseTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('tab-reverse-transition');
var VMenuTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('menu-transition');
var VFabTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('fab-transition', 'center center', 'out-in');

// Generic transitions
var VDialogTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('dialog-transition');
var VDialogBottomTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('dialog-bottom-transition');
var VFadeTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('fade-transition');
var VScaleTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('scale-transition');
var VSlideXTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('slide-x-transition');
var VSlideXReverseTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('slide-x-reverse-transition');
var VSlideYTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('slide-y-transition');
var VSlideYReverseTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["e" /* createSimpleTransition */])('slide-y-reverse-transition');

// JavaScript transitions
var VExpandTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createJavaScriptTransition */])('expand-transition', __WEBPACK_IMPORTED_MODULE_1__expand_transition__["a" /* default */]);
var VRowExpandTransition = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["b" /* createJavaScriptTransition */])('row-expand-transition', __WEBPACK_IMPORTED_MODULE_2__row_expand_transition__["a" /* default */]);

function install(Vue) {
  Vue.component('v-bottom-sheet-transition', VBottomSheetTranstion);
  Vue.component('v-carousel-transition', VCarouselTransition);
  Vue.component('v-carousel-reverse-transition', VCarouselReverseTransition);
  Vue.component('v-dialog-transition', VDialogTransition);
  Vue.component('v-dialog-bottom-transition', VDialogBottomTransition);
  Vue.component('v-fab-transition', VFabTransition);
  Vue.component('v-fade-transition', VFadeTransition);
  Vue.component('v-menu-transition', VMenuTransition);
  Vue.component('v-scale-transition', VScaleTransition);
  Vue.component('v-slide-x-transition', VSlideXTransition);
  Vue.component('v-slide-x-reverse-transition', VSlideXReverseTransition);
  Vue.component('v-slide-y-transition', VSlideYTransition);
  Vue.component('v-slide-y-reverse-transition', VSlideYReverseTransition);
  Vue.component('v-tab-reverse-transition', VTabReverseTransition);
  Vue.component('v-tab-transition', VTabTransition);
  Vue.component('v-expand-transition', VExpandTransition);
  Vue.component('v-row-expand-transition', VRowExpandTransition);
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function directive(e, el, binding, v) {
  // The include element callbacks below can be expensive
  // so we should avoid calling them when we're not active.
  // Explicitly check for false to allow fallback compatibility 
  // with non-toggleable components
  if (!e || v.context.isActive === false) return;

  // Get value passed to directive
  var val = binding.value || function () {
    return true;
  };
  // Check if callback was passed in object or as the value
  var cb = val.callback || val;
  // Check if additional elements were passed to be included in check
  // (click must be outside all included elements, if any)
  var elements = (val.include || function () {
    return [];
  })();
  // Add the root element for the component this directive was defined on
  elements.push(el);

  // Check if it's a click outside our elements, and then if our callback returns true.
  // Non-toggleable components should take action in their callback and return falsy.
  // Toggleable can return true if it wants to deactivate.
  // Note that, because we're in the capture phase, this callback will occure before
  // the bubbling click event on any outside elements. 
  if (!clickedInEls(e, elements) && cb(e)) {
    // Delay setting toggleable inactive to avoid conflicting 
    // with an outside click on any activator toggling our state.
    setTimeout(function () {
      return v.context.isActive = false;
    }, 0);
  }
}

function clickedInEls(e, elements) {
  // Get position of click
  var x = e.clientX,
      y = e.clientY;
  // Loop over all included elements to see if click was in any of them

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = elements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var el = _step.value;

      if (clickedInEl(el, x, y)) return true;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return false;
}

function clickedInEl(el, x, y) {
  // Get bounding rect for element 
  // (we're in capturing event and we want to check for multiple elements,
  //  so can't use target.)
  var b = el.getBoundingClientRect();
  // Check if the click was in the element's bounding rect

  return x >= b.left && x <= b.right && y >= b.top && y <= b.bottom;
}

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'click-outside',

  bind: function bind(el, binding, v) {
    v.context.$vuetify.load(function () {
      var onClick = function onClick(e) {
        return directive(e, el, binding, v);
      };
      // iOS does not recognize click events on document
      // or body, this is the entire purpose of the v-app
      // component and [data-app], stop removing this
      var app = document.querySelector('[data-app]') || document.body; // This is only for unit tests
      app.addEventListener('click', onClick, true);
      el._clickOutside = onClick;
    });
  },
  unbind: function unbind(el) {
    var app = document.querySelector('[data-app]') || document.body; // This is only for unit tests
    app && app.removeEventListener('click', el._clickOutside, true);
  }
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function inserted(el, binding) {
  var cb = binding.value;
  var debounce = 200;

  if (typeof binding.value !== 'function') {
    cb = binding.value.value;
    debounce = binding.value.debounce;
  }

  var debounceTimeout = setTimeout(cb, debounce);
  var onResize = function onResize() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(cb, debounce);
  };

  window.addEventListener('resize', onResize, { passive: true });
  el._onResize = onResize;

  onResize();
}

function unbind(el, binding) {
  window.removeEventListener('resize', el._onResize);
}

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'resize',
  inserted: inserted,
  unbind: unbind
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var touchstart = function touchstart(event, wrapper) {
  var touch = event.changedTouches[0];
  wrapper.touchstartX = touch.clientX;
  wrapper.touchstartY = touch.clientY;

  wrapper.start && wrapper.start(Object.assign(event, wrapper));
};

var touchend = function touchend(event, wrapper) {
  var touch = event.changedTouches[0];
  wrapper.touchendX = touch.clientX;
  wrapper.touchendY = touch.clientY;

  wrapper.end && wrapper.end(Object.assign(event, wrapper));

  handleGesture(wrapper);
};

var touchmove = function touchmove(event, wrapper) {
  var touch = event.changedTouches[0];
  wrapper.touchmoveX = touch.clientX;
  wrapper.touchmoveY = touch.clientY;

  wrapper.move && wrapper.move(Object.assign(event, wrapper));
};

var handleGesture = function handleGesture(wrapper) {
  var touchstartX = wrapper.touchstartX,
      touchendX = wrapper.touchendX,
      touchstartY = wrapper.touchstartY,
      touchendY = wrapper.touchendY;

  var dirRatio = 0.5;
  var minDistance = 16;
  wrapper.offsetX = touchendX - touchstartX;
  wrapper.offsetY = touchendY - touchstartY;

  if (Math.abs(wrapper.offsetY) < dirRatio * Math.abs(wrapper.offsetX)) {
    wrapper.left && touchendX < touchstartX - minDistance && wrapper.left(wrapper);
    wrapper.right && touchendX > touchstartX + minDistance && wrapper.right(wrapper);
  }

  if (Math.abs(wrapper.offsetX) < dirRatio * Math.abs(wrapper.offsetY)) {
    wrapper.up && touchendY < touchstartY - minDistance && wrapper.up(wrapper);
    wrapper.down && touchendY > touchstartY + minDistance && wrapper.down(wrapper);
  }
};

function inserted(el, _ref) {
  var value = _ref.value;

  var wrapper = {
    touchstartX: 0,
    touchstartY: 0,
    touchendX: 0,
    touchendY: 0,
    touchmoveX: 0,
    touchmoveY: 0,
    offsetX: 0,
    offsetY: 0,
    left: value.left,
    right: value.right,
    up: value.up,
    down: value.down,
    start: value.start,
    move: value.move,
    end: value.end
  };

  var target = value.parent ? el.parentNode : el;
  var options = value.options || { passive: true

    // Needed to pass unit tests
  };if (!target) return;
  target.addEventListener('touchstart', function (e) {
    return touchstart(e, wrapper);
  }, options);
  target.addEventListener('touchend', function (e) {
    return touchend(e, wrapper);
  }, options);
  target.addEventListener('touchmove', function (e) {
    return touchmove(e, wrapper);
  }, options);
}

function unbind(el, _ref2) {
  var value = _ref2.value;

  var target = value.parent ? el.parentNode : el;

  if (!target) return;

  target.removeEventListener('touchstart', touchstart);
  target.removeEventListener('touchend', touchend);
  target.removeEventListener('touchmove', touchmove);
}

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'touch',
  inserted: inserted,
  unbind: unbind
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function style(el, value) {
  ['transform', 'webkitTransform'].forEach(function (i) {
    el.style[i] = value;
  });
}

var RippleDataAttribute = 'data-ripple';

var ripple = {
  show: function show(e, el, _ref) {
    var _ref$value = _ref.value,
        value = _ref$value === undefined ? {} : _ref$value;

    if (el.getAttribute(RippleDataAttribute) !== 'true') {
      return;
    }

    var container = document.createElement('span');
    var animation = document.createElement('span');

    container.appendChild(animation);
    container.className = 'ripple__container';

    if (value.class) {
      container.className += ' ' + value.class;
    }

    var size = el.clientWidth > el.clientHeight ? el.clientWidth : el.clientHeight;
    animation.className = 'ripple__animation';
    animation.style.width = size * (value.center ? 1 : 2) + 'px';
    animation.style.height = animation.style.width;

    el.appendChild(container);
    var computed = window.getComputedStyle(el);
    if (computed.position !== 'absolute' && computed.position !== 'fixed') el.style.position = 'relative';

    var offset = el.getBoundingClientRect();
    var x = value.center ? '50%' : e.clientX - offset.left + 'px';
    var y = value.center ? '50%' : e.clientY - offset.top + 'px';

    animation.classList.add('ripple__animation--enter');
    animation.classList.add('ripple__animation--visible');
    style(animation, 'translate(-50%, -50%) translate(' + x + ', ' + y + ') scale3d(0.01,0.01,0.01)');
    animation.dataset.activated = Date.now();

    setTimeout(function () {
      animation.classList.remove('ripple__animation--enter');
      style(animation, 'translate(-50%, -50%) translate(' + x + ', ' + y + ')  scale3d(0.99,0.99,0.99)');
    }, 0);
  },

  hide: function hide(el) {
    if (el.getAttribute(RippleDataAttribute) !== 'true') {
      return;
    }

    var ripples = el.getElementsByClassName('ripple__animation');

    if (ripples.length === 0) return;
    var animation = ripples[ripples.length - 1];
    var diff = Date.now() - Number(animation.dataset.activated);
    var delay = 400 - diff;

    delay = delay < 0 ? 0 : delay;

    setTimeout(function () {
      animation.classList.remove('ripple__animation--visible');

      setTimeout(function () {
        // Need to figure out a new way to do this
        try {
          if (ripples.length < 1) el.style.position = null;
          animation.parentNode && el.removeChild(animation.parentNode);
        } catch (e) {}
      }, 300);
    }, delay);
  }
};

function directive(el, binding) {
  el.setAttribute(RippleDataAttribute, !!binding.value);

  if ('ontouchstart' in window) {
    el.addEventListener('touchend', function () {
      return ripple.hide(el);
    }, false);
    el.addEventListener('touchcancel', function () {
      return ripple.hide(el);
    }, false);
  }

  el.addEventListener('mousedown', function (e) {
    return ripple.show(e, el, binding);
  }, false);
  el.addEventListener('mouseup', function () {
    return ripple.hide(el);
  }, false);
  el.addEventListener('mouseleave', function () {
    return ripple.hide(el);
  }, false);
  // Anchor tags can be dragged, causes other hides to fail - #1537
  el.addEventListener('dragstart', function () {
    return ripple.hide(el);
  }, false);
}

function unbind(el, binding) {
  el.removeEventListener('touchstart', function (e) {
    return ripple.show(e, el, binding);
  }, false);
  el.removeEventListener('mousedown', function (e) {
    return ripple.show(e, el, binding);
  }, false);
  el.removeEventListener('touchend', function () {
    return ripple.hide(el);
  }, false);
  el.removeEventListener('touchcancel', function () {
    return ripple.hide(el);
  }, false);
  el.removeEventListener('mouseup', function () {
    return ripple.hide(el);
  }, false);
  el.removeEventListener('mouseleave', function () {
    return ripple.hide(el);
  }, false);
  el.removeEventListener('dragstart', function () {
    return ripple.hide(el);
  }, false);
}

function update(el, binding) {
  if (binding.value === binding.oldValue) {
    return;
  }

  el.setAttribute(RippleDataAttribute, !!binding.value);
}

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'ripple',
  bind: directive,
  unbind: unbind,
  update: update
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VBtn__ = __webpack_require__(82);


__WEBPACK_IMPORTED_MODULE_0__VBtn__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VBtn__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VBtn__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VBtn__["a" /* default */]);

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Bootable
 * @mixin
 *
 * Used to add lazy content functionality to components
 * Looks for change in "isActive" to automatically boot
 * Otherwise can be set manually
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      isBooted: false
    };
  },

  props: {
    lazy: Boolean
  },

  watch: {
    isActive: function isActive() {
      this.isBooted = true;
    }
  },

  methods: {
    showLazyContent: function showLazyContent(content) {
      return this.isBooted || !this.lazy ? content : null;
    }
  }
});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_ripple__ = __webpack_require__(9);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/* harmony default export */ __webpack_exports__["a"] = ({
  directives: {
    Ripple: __WEBPACK_IMPORTED_MODULE_0__directives_ripple__["a" /* default */]
  },

  props: {
    activeClass: String,
    append: Boolean,
    disabled: Boolean,
    exact: Boolean,
    href: [String, Object],
    to: [String, Object],
    nuxt: Boolean,
    replace: Boolean,
    ripple: Boolean,
    tag: String,
    target: String
  },

  methods: {
    click: function click() {},
    generateRouteLink: function generateRouteLink() {
      var exact = this.exact;
      var tag = void 0;

      var data = {
        attrs: { disabled: this.disabled },
        class: this.classes,
        props: {},
        directives: [{
          name: 'ripple',
          value: this.ripple || false
        }],
        on: _extends({}, this.$listeners || {}, {
          click: this.click
        })
      };

      if (typeof this.exact === 'undefined') {
        exact = this.to === '/' || this.to === Object(this.to) && this.to.path === '/';
      }

      if (this.to) {
        tag = this.nuxt ? 'nuxt-link' : 'router-link';
        data.props.to = this.to;
        data.props.exact = exact;
        data.props.activeClass = this.activeClass;
        data.props.append = this.append;
        data.props.replace = this.replace;
      } else {
        tag = this.href && 'a' || this.tag || 'a';

        if (tag === 'a') {
          data.attrs.href = this.href || 'javascript:;';
          if (this.target) data.attrs.target = this.target;
        }
      }

      return { tag: tag, data: data };
    }
  }
});

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__loadable__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__themeable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__validatable__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_VIcon__ = __webpack_require__(3);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    VIcon: __WEBPACK_IMPORTED_MODULE_3__components_VIcon__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_0__loadable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__themeable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__validatable__["a" /* default */]],

  data: function data() {
    return {
      isFocused: false,
      tabFocused: false,
      internalTabIndex: null,
      lazyValue: this.value
    };
  },


  props: {
    appendIcon: String,
    appendIconCb: Function,
    disabled: Boolean,
    hint: String,
    hideDetails: Boolean,
    label: String,
    persistentHint: Boolean,
    placeholder: String,
    prependIcon: String,
    prependIconCb: Function,
    readonly: Boolean,
    required: Boolean,
    tabindex: {
      default: 0
    },
    toggleKeys: {
      type: Array,
      default: function _default() {
        return [13, 32];
      }
    },
    value: {
      required: false
    }
  },

  computed: {
    inputGroupClasses: function inputGroupClasses() {
      return Object.assign({
        'input-group': true,
        'input-group--async-loading': this.loading !== false,
        'input-group--focused': this.isFocused,
        'input-group--dirty': this.isDirty,
        'input-group--tab-focused': this.tabFocused,
        'input-group--disabled': this.disabled,
        'input-group--error': this.hasError,
        'input-group--append-icon': this.appendIcon,
        'input-group--prepend-icon': this.prependIcon,
        'input-group--required': this.required,
        'input-group--hide-details': this.hideDetails,
        'input-group--placeholder': !!this.placeholder,
        'theme--dark': this.dark,
        'theme--light': this.light
      }, this.classes);
    },
    isDirty: function isDirty() {
      return !!this.inputValue;
    }
  },

  methods: {
    groupFocus: function groupFocus(e) {},
    groupBlur: function groupBlur(e) {
      this.tabFocused = false;
    },
    genLabel: function genLabel() {
      return this.$createElement('label', {
        attrs: {
          for: this.$attrs.id
        }
      }, this.$slots.label || this.label);
    },
    genMessages: function genMessages() {
      var _this = this;

      var messages = [];

      if ((this.hint && this.isFocused || this.hint && this.persistentHint) && this.validations.length === 0) {
        messages = [this.genHint()];
      } else if (this.validations.length) {
        messages = this.validations.map(function (v) {
          return _this.genError(v);
        });
      }

      return this.$createElement('transition-group', {
        'class': 'input-group__messages',
        props: {
          tag: 'div',
          name: 'slide-y-transition'
        }
      }, messages);
    },
    genHint: function genHint() {
      return this.$createElement('div', {
        'class': 'input-group__hint',
        key: this.hint,
        domProps: { innerHTML: this.hint }
      });
    },
    genError: function genError(error) {
      return this.$createElement('div', {
        'class': 'input-group__error',
        key: error
      }, error);
    },
    genIcon: function genIcon(type) {
      var _class;

      var defaultCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var shouldClear = type === 'append' && this.clearable && this.isDirty;
      var icon = shouldClear ? 'clear' : this[type + 'Icon'];
      var callback = shouldClear ? this.clearableCallback : this[type + 'IconCb'] || defaultCallback;

      return this.$createElement('v-icon', {
        attrs: {
          'aria-hidden': true
        },
        'class': (_class = {}, _defineProperty(_class, 'input-group__' + type + '-icon', true), _defineProperty(_class, 'input-group__icon-cb', !!callback), _defineProperty(_class, 'input-group__icon-clearable', shouldClear), _class),
        props: {
          disabled: this.disabled
        },
        on: {
          click: function click(e) {
            if (!callback) return;

            e.stopPropagation();
            callback();
          }
        }
      }, icon);
    },
    genInputGroup: function genInputGroup(input) {
      var _this2 = this;

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var defaultAppendCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var children = [];
      var wrapperChildren = [];
      var detailsChildren = [];

      data = Object.assign({}, {
        'class': this.inputGroupClasses,
        attrs: {
          tabindex: this.disabled ? -1 : this.internalTabIndex || this.tabindex
        },
        on: {
          focus: this.groupFocus,
          blur: this.groupBlur,
          click: function click() {
            return _this2.tabFocused = false;
          },
          keyup: function keyup(e) {
            if ([9, 16].includes(e.keyCode)) {
              _this2.tabFocused = true;
            }
          },
          keydown: function keydown(e) {
            if (!_this2.toggle) return;

            if (_this2.toggleKeys.includes(e.keyCode)) {
              e.preventDefault();
              _this2.toggle();
            }
          }
        }
      }, data);

      if (this.$slots.label || this.label) {
        children.push(this.genLabel());
      }

      wrapperChildren.push(input);

      if (this.prependIcon) {
        wrapperChildren.unshift(this.genIcon('prepend'));
      }

      if (this.appendIcon || this.clearable) {
        wrapperChildren.push(this.genIcon('append', defaultAppendCallback));
      }

      var progress = this.genProgress();
      progress && detailsChildren.push(progress);

      children.push(this.$createElement('div', {
        'class': 'input-group__input'
      }, wrapperChildren));
      detailsChildren.push(this.genMessages());

      if (this.counter) {
        detailsChildren.push(this.genCounter());
      }

      children.push(this.$createElement('div', {
        'class': 'input-group__details'
      }, detailsChildren));

      return this.$createElement('div', data, children);
    }
  }
});

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function searchChildren(children) {
  var results = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var child = _step.value;

      if (child.isActive && child.isDependent) {
        results.push(child);
      } else {
        results.push.apply(results, _toConsumableArray(searchChildren(child.$children)));
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return results;
}

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      closeDependents: true,
      isDependent: true
    };
  },


  methods: {
    getOpenDependents: function getOpenDependents() {
      if (this.closeDependents) return searchChildren(this.$children);

      return [];
    },
    getOpenDependentElements: function getOpenDependentElements() {
      var result = [];

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.getOpenDependents()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var dependent = _step2.value;

          result.push.apply(result, _toConsumableArray(dependent.getClickableDependentElements()));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return result;
    },
    getClickableDependentElements: function getClickableDependentElements() {
      var result = [this.$el];
      if (this.$refs.content) result.push(this.$refs.content);
      result.push.apply(result, _toConsumableArray(this.getOpenDependentElements()));

      return result;
    }
  },

  watch: {
    isActive: function isActive(val) {
      if (val) return;

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.getOpenDependents()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var dependent = _step3.value;

          dependent.isActive = false;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }
});

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VCard__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VCardMedia__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VCardTitle__ = __webpack_require__(90);
/* unused harmony reexport VCard */
/* unused harmony reexport VCardMedia */
/* unused harmony reexport VCardTitle */







__WEBPACK_IMPORTED_MODULE_1__VCard__["a" /* default */].install = function install(Vue) {
  var VCardActions = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('card__actions');
  var VCardText = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('card__text');

  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VCard__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VCard__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_2__VCardMedia__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__VCardMedia__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_3__VCardTitle__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_3__VCardTitle__["a" /* default */]);
  Vue.component('v-card-actions', VCardActions);
  Vue.component('v-card-text', VCardText);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__VCard__["a" /* default */]);

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    app: Boolean
  },

  created: function created() {
    this.updateApplication();
  }
});

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__bootable__ = __webpack_require__(11);


/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_0__bootable__["a" /* default */]],

  props: {
    contentClass: {
      default: ''
    }
  },

  mounted: function mounted() {
    this.$vuetify.load(this.initDetach);
  },
  beforeDestroy: function beforeDestroy() {
    if (!this.$refs.content) return;

    // IE11 Fix
    try {
      this.$refs.content.parentNode.removeChild(this.$refs.content);
    } catch (e) {}
  },


  methods: {
    initDetach: function initDetach() {
      if (this._isDestroyed) return;

      var app = document.querySelector('[data-app]');

      if (!app) {
        return console.warn('Application is missing <v-app> component.');
      }

      // If child has already been removed, bail
      if (!this.$refs.content) return;

      app.insertBefore(this.$refs.content, app.firstChild);
    }
  }
});

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    absolute: Boolean,
    bottom: Boolean,
    fixed: Boolean,
    left: Boolean,
    right: Boolean,
    top: Boolean
  }
});

/***/ }),
/* 20 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_ripple__ = __webpack_require__(9);


/** @mixin */
/* harmony default export */ __webpack_exports__["a"] = ({
  directives: { Ripple: __WEBPACK_IMPORTED_MODULE_0__directives_ripple__["a" /* default */] },

  methods: {
    genRipple: function genRipple() {
      return this.$createElement('div', {
        'class': this.rippleClasses || 'input-group--selection-controls__ripple',
        on: Object.assign({}, {
          click: this.toggle
        }, this.$listeners),
        directives: [{
          name: 'ripple',
          value: !this.disabled && { center: true }
        }]
      });
    }
  }
});

/***/ }),
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Grid;
function Grid(name) {
  return {
    name: 'v-' + name,

    functional: true,

    props: {
      id: String,
      tag: {
        type: String,
        default: 'div'
      }
    },

    render: function render(h, _ref) {
      var props = _ref.props,
          data = _ref.data,
          children = _ref.children;

      data.staticClass = (name + ' ' + (data.staticClass || '')).trim();

      if (data.attrs) {
        var classes = [];

        Object.keys(data.attrs).forEach(function (key) {
          var value = data.attrs[key];

          if (typeof value === 'string') classes.push(key);else if (value) classes.push(key);
        });

        if (classes.length) data.staticClass += ' ' + classes.join(' ');
        delete data.attrs;
      }

      if (props.id) {
        data.domProps = data.domProps || {};
        data.domProps.id = props.id;
      }

      return h(props.tag, data, children);
    }
  };
}

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    primary: Boolean,
    secondary: Boolean,
    success: Boolean,
    info: Boolean,
    warning: Boolean,
    error: Boolean
  }
});

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      buttons: [],
      listeners: []
    };
  },


  methods: {
    getValue: function getValue(i) {
      if (this.buttons[i].value != null) {
        return this.buttons[i].value;
      }

      // Fix for testing, this should always be false in the browser
      if (this.buttons[i].$el.value != null && this.buttons[i].$el.value !== '') {
        return this.buttons[i].$el.value;
      }

      return i;
    },
    update: function update() {
      var _this = this;

      var selected = [];

      this.buttons.forEach(function (button, i) {
        var elm = button.$el;

        // Fix for testing, dataset does not exist on elm?
        if (!elm.dataset) elm.dataset = {};

        elm.removeAttribute('data-only-child');

        if (_this.isSelected(i)) {
          elm.setAttribute('data-selected', true);

          if (!elm.classList.contains('btn--router')) {
            elm.classList.add('btn--active');
          }

          selected.push(i);
        } else {
          elm.removeAttribute('data-selected');

          if (!elm.classList.contains('btn--router')) {
            elm.classList.remove('btn--active');
          }
        }

        elm.dataset.index = i;
      });

      if (selected.length === 1) {
        this.buttons[selected[0]].$el.setAttribute('data-only-child', true);
      }
    }
  },

  mounted: function mounted() {
    var _this2 = this;

    this.$vuetify.load(function () {
      _this2.buttons = _this2.$children;

      _this2.buttons.forEach(function (button, i) {
        _this2.listeners.push(_this2.updateValue.bind(_this2, i));
        button.$on('click', _this2.listeners[i]);
      });

      _this2.update();
    });
  },
  beforeDestroy: function beforeDestroy() {
    var _this3 = this;

    this.buttons.forEach(function (button, i) {
      button.$off('click', _this3.listeners[i]);
    });
  }
});

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_dependent__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_detachable__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_overlayable__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_stackable__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_toggleable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_click_outside__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_helpers__ = __webpack_require__(1);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

__webpack_require__(76);

// Mixins






// Directives


// Helpers


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-dialog',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_dependent__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_detachable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_overlayable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_stackable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_toggleable__["a" /* default */]],

  directives: {
    ClickOutside: __WEBPACK_IMPORTED_MODULE_5__directives_click_outside__["a" /* default */]
  },

  data: function data() {
    return {
      isDependent: false,
      stackClass: 'dialog__content__active',
      stackMinZIndex: 200
    };
  },


  props: {
    disabled: Boolean,
    persistent: Boolean,
    fullscreen: Boolean,
    fullWidth: Boolean,
    maxWidth: {
      type: [String, Number],
      default: 290
    },
    origin: {
      type: String,
      default: 'center center'
    },
    width: [String, Number],
    scrollable: Boolean,
    transition: {
      type: [String, Boolean],
      default: 'dialog-transition'
    }
  },

  computed: {
    classes: function classes() {
      var _ref;

      return _ref = {}, _defineProperty(_ref, ('dialog ' + this.contentClass).trim(), true), _defineProperty(_ref, 'dialog--active', this.isActive), _defineProperty(_ref, 'dialog--persistent', this.persistent), _defineProperty(_ref, 'dialog--fullscreen', this.fullscreen), _defineProperty(_ref, 'dialog--stacked-actions', this.stackedActions && !this.fullscreen), _defineProperty(_ref, 'dialog--scrollable', this.scrollable), _ref;
    },
    contentClasses: function contentClasses() {
      return {
        'dialog__content': true,
        'dialog__content__active': this.isActive
      };
    }
  },

  watch: {
    isActive: function isActive(val) {
      if (val) {
        this.show();
      } else {
        this.removeOverlay();
        this.unbind();
      }
    }
  },

  mounted: function mounted() {
    this.isBooted = this.isActive;
    this.$vuetify.load(this.init);
  },
  beforeDestroy: function beforeDestroy() {
    if (typeof window !== 'undefined') this.unbind();
  },


  methods: {
    closeConditional: function closeConditional(e) {
      // close dialog if !persistent, clicked outside and we're the topmost dialog.
      // Since this should only be called in a capture event (bottom up), we shouldn't need to stop propagation
      return !this.persistent && Object(__WEBPACK_IMPORTED_MODULE_6__util_helpers__["g" /* getZIndex */])(this.$refs.content) >= this.getMaxZIndex();
    },
    init: function init() {
      this.isActive && this.show();
    },
    show: function show() {
      !this.fullscreen && !this.hideOverlay && this.genOverlay();
      this.fullscreen && this.hideScroll();
      this.$refs.content.focus();
      this.$listeners.keydown && this.bind();
    },
    bind: function bind() {
      window.addEventListener('keydown', this.onKeydown);
    },
    unbind: function unbind() {
      window.removeEventListener('keydown', this.onKeydown);
    },
    onKeydown: function onKeydown(e) {
      this.$emit('keydown', e);
    }
  },

  render: function render(h) {
    var _this = this;

    var children = [];
    var data = {
      'class': this.classes,
      ref: 'dialog',
      directives: [{
        name: 'click-outside',
        value: {
          callback: this.closeConditional,
          include: this.getOpenDependentElements
        }
      }, { name: 'show', value: this.isActive }],
      on: { click: function click(e) {
          return e.stopPropagation();
        } }
    };

    if (!this.fullscreen) {
      var width = this.maxWidth;

      if (this.width) {
        console.log('The {width} property is being deprecated, please use {max-width}.');
        // TODO: Deprecate
        width = this.width;
      }

      data.style = {
        maxWidth: isNaN(width) ? width : width + 'px'
      };
    }

    if (this.$slots.activator) {
      children.push(h('div', {
        'class': 'dialog__activator',
        on: {
          click: function click(e) {
            if (!_this.disabled) _this.isActive = !_this.isActive;
          }
        }
      }, [this.$slots.activator]));
    }

    var dialog = h('transition', {
      props: {
        name: this.transition || '', // If false, show nothing
        origin: this.origin
      }
    }, [h('div', data, this.showLazyContent(this.$slots.default))]);

    children.push(h('div', {
      'class': this.contentClasses,
      style: { zIndex: this.activeZIndex },
      ref: 'content'
    }, [dialog]));

    return h('div', {
      'class': 'dialog__container',
      style: {
        display: !this.$slots.activator && 'none' || this.fullWidth ? 'block' : 'inline-block'
      }
    }, children);
  }
});

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__(77);

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      overlay: null,
      overlayOffset: 0,
      overlayTimeout: null,
      overlayTransitionDuration: 500 + 150 // transition + delay
    };
  },


  props: {
    hideOverlay: Boolean
  },

  beforeDestroy: function beforeDestroy() {
    this.removeOverlay();
  },


  methods: {
    genOverlay: function genOverlay() {
      var _this = this;

      // If fn is called and timeout is active
      // or overlay already exists
      // cancel removal of overlay and re-add active
      if (!this.isActive || this.hideOverlay || this.isActive && this.overlayTimeout || this.overlay) {
        clearTimeout(this.overlayTimeout);

        return this.overlay && this.overlay.classList.add('overlay--active');
      }

      this.overlay = document.createElement('div');
      this.overlay.className = 'overlay';

      if (this.absolute) this.overlay.className += ' overlay--absolute';

      this.hideScroll();

      var parent = this.absolute ? this.$el.parentNode : document.querySelector('[data-app]');

      parent.insertBefore(this.overlay, parent.firstChild);

      this.overlay.clientHeight; // Force repaint
      requestAnimationFrame(function () {
        _this.overlay.className += ' overlay--active';

        if (_this.activeZIndex !== undefined) {
          _this.overlay.style.zIndex = _this.activeZIndex - 1;
        }
      });

      return true;
    },
    removeOverlay: function removeOverlay() {
      var _this2 = this;

      if (!this.overlay) {
        return this.showScroll();
      }

      this.overlay.classList.remove('overlay--active');

      this.overlayTimeout = setTimeout(function () {
        // IE11 Fix
        try {
          _this2.overlay.parentNode.removeChild(_this2.overlay);
          _this2.overlay = null;
          _this2.showScroll();
        } catch (e) {}

        clearTimeout(_this2.overlayTimeout);
        _this2.overlayTimeout = null;
      }, this.overlayTransitionDuration);
    },

    /**
     * @param {Event} e
     * @returns void
     */
    scrollListener: function scrollListener(e) {
      if (e.type === 'keydown') {
        var up = [38, 33];
        var down = [40, 34];

        if (up.includes(e.keyCode)) {
          e.deltaY = -1;
        } else if (down.includes(e.keyCode)) {
          e.deltaY = 1;
        } else {
          return;
        }
      }

      if (e.target === this.overlay || e.type !== 'keydown' && e.target === document.body || this.checkPath(e)) e.preventDefault();
    },
    hasScrollbar: function hasScrollbar(el) {
      var style = window.getComputedStyle(el);
      return ['auto', 'scroll'].includes(style['overflow-y']) && el.scrollHeight > el.clientHeight;
    },
    shouldScroll: function shouldScroll(el, delta) {
      if (el.scrollTop === 0 && delta < 0) return true;
      return el.scrollTop + el.clientHeight === el.scrollHeight && delta > 0;
    },
    isInside: function isInside(el, parent) {
      if (el === parent) {
        return true;
      } else if (el === null || el === document.body) {
        return false;
      } else {
        return this.isInside(el.parentNode, parent);
      }
    },

    /**
     * @param {Event} e
     * @returns boolean
     */
    checkPath: function checkPath(e) {
      var path = e.path || this.composedPath(e);
      var delta = e.deltaY || -e.wheelDelta;

      if (e.type === 'keydown' && path[0] === document.body) {
        var dialog = this.$refs.dialog;
        var selected = window.getSelection().anchorNode;
        if (this.hasScrollbar(dialog) && this.isInside(selected, dialog)) {
          return this.shouldScroll(dialog, delta);
        }
        return true;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = path[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var el = _step.value;

          if ([document, document.documentElement, this.$refs.content].includes(el)) return true;
          if (this.hasScrollbar(el)) return this.shouldScroll(el, delta);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return true;
    },

    /**
     * Polyfill for Event.prototype.composedPath
     * @param {Event} e
     * @returns Element[]
     */
    composedPath: function composedPath(e) {
      if (e.composedPath) return e.composedPath();

      var path = [];
      var el = e.target;

      while (el) {
        path.push(el);

        if (el.tagName === 'HTML') {
          path.push(document);
          path.push(window);

          return path;
        }

        el = el.parentElement;
      }
    },
    hideScroll: function hideScroll() {
      if (this.$vuetify.breakpoint.mdAndDown) {
        document.documentElement.classList.add('overflow-y-hidden');
      } else {
        window.addEventListener('wheel', this.scrollListener);
        window.addEventListener('keydown', this.scrollListener);
      }
    },
    showScroll: function showScroll() {
      document.documentElement.classList.remove('overflow-y-hidden');
      window.removeEventListener('wheel', this.scrollListener);
      window.removeEventListener('keydown', this.scrollListener);
    }
  }
});

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(1);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }



/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      stackBase: null,
      stackClass: 'unpecified',
      stackElement: null,
      stackExclude: null,
      stackMinZIndex: 0
    };
  },

  computed: {
    activeZIndex: function activeZIndex() {
      var content = this.stackElement || this.$refs.content;
      // Return current zindex if not active
      if (!this.isActive) return Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["g" /* getZIndex */])(content);

      // Return max current z-index (excluding self) + 2
      // (2 to leave room for an overlay below, if needed)
      return this.getMaxZIndex(this.stackExclude || [content]) + 2;
    }
  },
  methods: {
    getMaxZIndex: function getMaxZIndex() {
      var exclude = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var base = this.stackBase || this.$el;
      // Start with lowest allowed z-index or z-index of
      // base component's element, whichever is greater
      var zis = [this.stackMinZIndex, Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["g" /* getZIndex */])(base)];
      // Convert the NodeList to an array to
      // prevent an Edge bug with Symbol.iterator
      // https://github.com/vuetifyjs/vuetify/issues/2146
      var activeElements = [].concat(_toConsumableArray(document.getElementsByClassName(this.stackClass)));

      // Get z-index for all active dialogs
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = activeElements[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var activeElement = _step.value;

          if (!exclude.includes(activeElement)) {
            zis.push(Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["g" /* getZIndex */])(activeElement));
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return Math.max.apply(Math, zis);
    }
  }
});

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VCheckbox__ = __webpack_require__(95);


__WEBPACK_IMPORTED_MODULE_0__VCheckbox__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VCheckbox__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VCheckbox__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VCheckbox__["a" /* default */]);

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["a"] = ({
  enter: function enter(el, done) {
    el.td = el.parentNode;

    Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* addOnceEventListener */])(el, 'transitionend', done);

    // Get height that is to be scrolled
    var height = el.dataset.height || el.clientHeight;
    el.dataset.height = height;
    el.style.overflow = 'hidden';
    el.style.height = 0;
    el.td.style['border-bottom'] = '1px solid rgba(0,0,0,0.12)';

    setTimeout(function () {
      el.dataset.height = el.style.height = el.scrollHeight + 'px';
    }, 50);
  },
  afterEnter: function afterEnter(el) {
    el.style.overflow = null;
  },
  leave: function leave(el, done) {
    // Remove initial transition
    Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* addOnceEventListener */])(el, 'transitionend', done);

    // Set height before we transition to 0
    el.style.overflow = 'hidden';
    el.style.height = el.dataset.height + 'px';

    setTimeout(function () {
      el.style.height = 0;
    }, 50);
  },
  afterLeave: function afterLeave(el) {
    el.td.style['border-bottom'] = null;
  }
});

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__colorable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__input__ = __webpack_require__(14);



/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_1__input__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__colorable__["a" /* default */]],

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  props: {
    id: String,
    inputValue: null,
    falseValue: null,
    trueValue: null
  },

  computed: {
    isActive: function isActive() {
      if (Array.isArray(this.inputValue)) {
        return this.inputValue.indexOf(this.value) !== -1;
      }

      if (!this.trueValue || !this.falseValue) {
        return this.value ? this.value === this.inputValue : Boolean(this.inputValue);
      }

      return this.inputValue === this.trueValue;
    },
    isDirty: function isDirty() {
      return this.isActive;
    }
  },

  watch: {
    indeterminate: function indeterminate(val) {
      this.inputIndeterminate = val;
    }
  },

  methods: {
    genLabel: function genLabel() {
      return this.$createElement('label', {
        on: { click: this.toggle },
        attrs: {
          for: this.id
        }
      }, this.$slots.label || this.label);
    },
    toggle: function toggle() {
      if (this.disabled) {
        return;
      }

      var input = this.inputValue;
      if (Array.isArray(input)) {
        input = input.slice();
        var i = input.indexOf(this.value);

        if (i === -1) {
          input.push(this.value);
        } else {
          input.splice(i, 1);
        }
      } else if (this.trueValue || this.falseValue) {
        input = input === this.trueValue ? this.falseValue : this.trueValue;
      } else if (this.value) {
        input = this.value === this.inputValue ? null : this.value;
      } else {
        input = !input;
      }

      this.validate(true, input);

      this.$emit('change', input);
    }
  }
});

/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Loadable
 *
 * @mixin
 *
 * Used to add linear progress bar to components
 * Can use a default bar with a specific color
 * or designate a custom progress linear bar
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    loading: {
      type: [Boolean, String],
      default: false
    }
  },

  methods: {
    genProgress: function genProgress() {
      if (this.loading === false) return null;

      return this.$slots.progress || this.$createElement('v-progress-linear', {
        props: {
          color: this.loading === true || this.loading === '' ? this.color || 'primary' : this.loading,
          height: 2,
          indeterminate: true
        }
      });
    }
  }
});

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VProgressLinear__ = __webpack_require__(105);


__WEBPACK_IMPORTED_MODULE_0__VProgressLinear__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VProgressLinear__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VProgressLinear__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VProgressLinear__["a" /* default */]);

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VSelect__ = __webpack_require__(107);


__WEBPACK_IMPORTED_MODULE_0__VSelect__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSelect__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VSelect__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VSelect__["a" /* default */]);

/***/ }),
/* 35 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export VListTileActionText */
/* unused harmony export VListTileAvatar */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return VListTileContent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return VListTileTitle; });
/* unused harmony export VListTileSubTitle */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VList__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VListGroup__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VListTile__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__VListTileAction__ = __webpack_require__(113);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__VList__["a"]; });
/* unused harmony reexport VListGroup */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__VListTile__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__VListTileAction__["a"]; });








var VListTileActionText = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('list__tile__action-text', 'span');
var VListTileAvatar = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('list__tile__avatar', 'v-avatar');
var VListTileContent = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('list__tile__content', 'div');
var VListTileTitle = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('list__tile__title', 'div');
var VListTileSubTitle = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('list__tile__sub-title', 'div');

__WEBPACK_IMPORTED_MODULE_1__VList__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VList__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VList__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_2__VListGroup__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__VListGroup__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_3__VListTile__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_3__VListTile__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_4__VListTileAction__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_4__VListTileAction__["a" /* default */]);
  Vue.component('v-list-tile-action-text', VListTileActionText);
  Vue.component('v-list-tile-avatar', VListTileAvatar);
  Vue.component('v-list-tile-content', VListTileContent);
  Vue.component('v-list-tile-sub-title', VListTileSubTitle);
  Vue.component('v-list-tile-title', VListTileTitle);
};

/* harmony default export */ __webpack_exports__["f"] = (__WEBPACK_IMPORTED_MODULE_1__VList__["a" /* default */]);

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VMenu__ = __webpack_require__(114);


__WEBPACK_IMPORTED_MODULE_0__VMenu__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VMenu__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VMenu__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VMenu__["a" /* default */]);

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Delayable
 *
 * @mixin
 *
 * Changes the open or close
 * delay time for elements
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      openTimeout: null,
      closeTimeout: null
    };
  },

  props: {
    openDelay: {
      type: [Number, String],
      default: 0
    },
    closeDelay: {
      type: [Number, String],
      default: 200
    }
  },

  methods: {
    /**
     * Clear any pending delay
     * timers from executing
     * 
     * @return {void}
     */
    clearDelay: function clearDelay() {
      clearTimeout(this.openTimeout);
      clearTimeout(this.closeTimeout);
    },

    /**
     * Runs callback after
     * a specified delay
     * 
     * @param  {String}   type
     * @param  {Function} cb
     * 
     * @return {void}
     */
    runDelay: function runDelay(type, cb) {
      this.clearDelay();

      var delay = parseInt(this[type + "Delay"], 10);

      this[type + "Timeout"] = setTimeout(cb, delay);
    }
  }
});

/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__positionable__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stackable__ = __webpack_require__(28);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };





var dimensions = {
  activator: {
    top: 0, left: 0,
    bottom: 0, right: 0,
    width: 0, height: 0,
    offsetTop: 0, scrollHeight: 0
  },
  content: {
    top: 0, left: 0,
    bottom: 0, right: 0,
    width: 0, height: 0,
    offsetTop: 0, scrollHeight: 0
  },
  hasWindow: false

  /**
   * Menuable
   *
   * @mixin
   *
   * Used for fixed or absolutely positioning
   * elements within the DOM
   * Can calculate X and Y axis overflows
   * As well as be manually positioned
   */
};/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_0__positionable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__stackable__["a" /* default */]],

  data: function data() {
    return {
      absoluteX: 0,
      absoluteY: 0,
      dimensions: Object.assign({}, dimensions),
      isContentActive: false,
      pageYOffset: 0,
      stackClass: 'menuable__content__active',
      stackMinZIndex: 6
    };
  },

  props: {
    activator: {
      default: null,
      validate: function validate(val) {
        return ['string', 'object'].includes(typeof val === 'undefined' ? 'undefined' : _typeof(val));
      }
    },
    allowOverflow: Boolean,
    maxWidth: {
      type: [Number, String],
      default: 'auto'
    },
    minWidth: [Number, String],
    nudgeBottom: {
      type: Number,
      default: 0
    },
    nudgeLeft: {
      type: Number,
      default: 0
    },
    nudgeRight: {
      type: Number,
      default: 0
    },
    nudgeTop: {
      type: Number,
      default: 0
    },
    nudgeWidth: {
      type: Number,
      default: 0
    },
    offsetOverflow: Boolean,
    positionX: {
      type: Number,
      default: null
    },
    positionY: {
      type: Number,
      default: null
    },
    zIndex: {
      type: [Number, String],
      default: null
    }
  },

  computed: {
    hasActivator: function hasActivator() {
      return !!this.$slots.activator || this.activator;
    }
  },

  watch: {
    disabled: function disabled(val) {
      val && this.callDeactivate();
    },
    isActive: function isActive(val) {
      if (this.disabled) return;

      val && this.callActivate() || this.callDeactivate();
    }
  },

  methods: {
    absolutePosition: function absolutePosition() {
      return {
        offsetTop: 0,
        scrollHeight: 0,
        top: this.positionY || this.absoluteY,
        bottom: this.positionY || this.absoluteY,
        left: this.positionX || this.absoluteX,
        right: this.positionX || this.absoluteX,
        height: 0,
        width: 0
      };
    },
    activate: function activate() {},
    calcLeft: function calcLeft() {
      var a = this.dimensions.activator;
      var c = this.dimensions.content;
      var left = this.left ? a.right - c.width : a.left;

      if (this.offsetX) left += this.left ? -a.width : a.width;
      if (this.nudgeLeft) left -= this.nudgeLeft;
      if (this.nudgeRight) left += this.nudgeRight;

      return left;
    },
    calcTop: function calcTop() {
      this.checkForWindow();

      var a = this.dimensions.activator;
      var c = this.dimensions.content;
      var top = this.top ? a.bottom - c.height : a.top;

      if (this.offsetY) top += this.top ? -a.height : a.height;
      if (this.nudgeTop) top -= this.nudgeTop;
      if (this.nudgeBottom) top += this.nudgeBottom;

      return top + this.pageYOffset;
    },
    calcXOverflow: function calcXOverflow(left) {
      var parsedMaxWidth = isNaN(parseInt(this.maxWidth)) ? 0 : parseInt(this.maxWidth);
      var innerWidth = this.getInnerWidth();
      var maxWidth = Math.max(this.dimensions.content.width, parsedMaxWidth);
      var totalWidth = left + maxWidth;
      var availableWidth = totalWidth - innerWidth;

      if ((!this.left || this.right) && availableWidth > 0) {
        left = innerWidth - maxWidth - (innerWidth > 600 ? 30 : 12) // Account for scrollbar
        ;
      }

      if (left < 0) left = 12;

      return left;
    },
    calcYOverflow: function calcYOverflow(top) {
      var documentHeight = this.getInnerHeight();
      var toTop = this.pageYOffset + documentHeight;
      var activator = this.dimensions.activator;
      var contentHeight = this.dimensions.content.height;
      var totalHeight = top + contentHeight;
      var isOverflowing = toTop < totalHeight;

      // If overflowing bottom and offset
      if (isOverflowing && this.offsetOverflow) {
        top = this.pageYOffset + (activator.top - contentHeight);
        // If overflowing bottom
      } else if (isOverflowing && !this.allowOverflow) {
        top = toTop - contentHeight - 12;
        // If overflowing top
      } else if (top < this.pageYOffset && !this.allowOverflow) {
        top = this.pageYOffset + 12;
      }

      return top < 12 ? 12 : top;
    },
    callActivate: function callActivate() {
      this.checkForWindow();
      if (!this.hasWindow) return;

      this.activate();
    },
    callDeactivate: function callDeactivate() {
      this.isContentActive = false;

      this.deactivate();
    },
    checkForWindow: function checkForWindow() {
      this.hasWindow = typeof window !== 'undefined';

      if (this.hasWindow) {
        this.pageYOffset = this.getOffsetTop();
      }
    },
    deactivate: function deactivate() {},
    getActivator: function getActivator() {
      if (this.activator) {
        return typeof this.activator === 'string' ? document.querySelector(this.activator) : this.activator;
      }

      return this.$refs.activator.children ? this.$refs.activator.children[0] : this.$refs.activator;
    },
    getInnerHeight: function getInnerHeight() {
      if (!this.hasWindow) return 0;

      return window.innerHeight || document.documentElement.clientHeight;
    },
    getInnerWidth: function getInnerWidth() {
      if (!this.hasWindow) return 0;

      return window.innerWidth;
    },
    getOffsetTop: function getOffsetTop() {
      if (!this.hasWindow) return 0;

      return window.pageYOffset || document.documentElement.scrollTop;
    },
    measure: function measure(el, selector) {
      el = selector ? el.querySelector(selector) : el;

      if (!el) return null;

      var _el$getBoundingClient = el.getBoundingClientRect(),
          top = _el$getBoundingClient.top,
          bottom = _el$getBoundingClient.bottom,
          left = _el$getBoundingClient.left,
          right = _el$getBoundingClient.right,
          height = _el$getBoundingClient.height,
          width = _el$getBoundingClient.width;

      return {
        offsetTop: el.offsetTop,
        scrollHeight: el.scrollHeight,
        top: top, bottom: bottom, left: left, right: right, height: height, width: width
      };
    },
    sneakPeek: function sneakPeek(cb) {
      var _this = this;

      requestAnimationFrame(function () {
        var el = _this.$refs.content;

        if (_this.isShown(el)) return cb();

        el.style.display = 'inline-block';
        cb();
        el.style.display = 'none';
      });
    },
    startTransition: function startTransition() {
      var _this2 = this;

      requestAnimationFrame(function () {
        return _this2.isContentActive = true;
      });
    },
    isShown: function isShown(el) {
      return el.style.display !== 'none';
    },
    resetDimensions: function resetDimensions() {
      this.dimensions = Object.assign({}, dimensions);
    },
    updateDimensions: function updateDimensions() {
      var _this3 = this;

      // Ensure that overflow calculation
      // can work properly every update
      this.resetDimensions();

      var dimensions = {};

      // Activate should already be shown
      dimensions.activator = !this.hasActivator || this.absolute ? this.absolutePosition() : this.measure(this.getActivator());

      // Display and hide to get dimensions
      this.sneakPeek(function () {
        dimensions.content = _this3.measure(_this3.$refs.content);

        _this3.dimensions = dimensions;
      });
    }
  }
});

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    noDataText: {
      type: String,
      default: 'No data available'
    }
  }
});

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_mask__ = __webpack_require__(42);
/**
 * Maskable
 *
 * @mixin
 *
 * Creates an input mask that is
 * generated from a masked str
 *
 * Example: mask="#### #### #### ####"
 */



/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      selection: 0,
      preDefined: {
        'credit-card': '#### - #### - #### - ####',
        'date': '##/##/####',
        'date-with-time': '##/##/#### ##:##',
        'phone': '(###) ### - ####',
        'social': '###-##-####',
        'time': '##:##',
        'time-with-seconds': '##:##:##'
      }
    };
  },

  props: {
    dontFillMaskBlanks: Boolean,
    mask: {
      type: [Object, String],
      default: null
    },
    returnMaskedValue: Boolean
  },

  computed: {
    masked: function masked() {
      var preDefined = this.preDefined[this.mask];
      var mask = preDefined || this.mask || '';

      return mask.split('');
    }
  },

  watch: {
    /**
     * Make sure the cursor is in the correct
     * location when the mask changes
     */
    mask: function mask() {
      if (!this.$refs.input) return;

      var oldText = this.$refs.input.value;
      var newText = this.maskText(this.lazyValue);
      var position = 0;
      var selection = this.selection;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = oldText.substr(0, selection)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var char = _step.value;

          Object(__WEBPACK_IMPORTED_MODULE_0__util_mask__["a" /* isMaskDelimiter */])(char) || position++;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      selection = 0;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = newText[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _char = _step2.value;

          Object(__WEBPACK_IMPORTED_MODULE_0__util_mask__["a" /* isMaskDelimiter */])(_char) || position--;
          selection++;
          if (position <= 0) break;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      this.setCaretPosition(selection);
    }
  },

  methods: {
    setCaretPosition: function setCaretPosition(selection) {
      var _this = this;

      this.selection = selection;
      window.setTimeout(function () {
        _this.$refs.input && _this.$refs.input.setSelectionRange(_this.selection, _this.selection);
      }, 0);
    },
    updateRange: function updateRange() {
      if (!this.$refs.input) return;

      var newValue = this.maskText(this.lazyValue);
      var selection = 0;

      this.$refs.input.value = newValue;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = newValue[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var char = _step3.value;

          if (this.lazySelection <= 0) break;
          Object(__WEBPACK_IMPORTED_MODULE_0__util_mask__["a" /* isMaskDelimiter */])(char) || this.lazySelection--;
          selection++;
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      this.setCaretPosition(selection);
    },
    maskText: function maskText(text) {
      if (!this.mask) return text;

      return Object(__WEBPACK_IMPORTED_MODULE_0__util_mask__["b" /* maskText */])(text, this.masked, this.dontFillMaskBlanks);
    },
    unmaskText: function unmaskText(text) {
      if (this.returnMaskedValue || !this.mask) return text;

      return Object(__WEBPACK_IMPORTED_MODULE_0__util_mask__["c" /* unmaskText */])(text);
    },

    // When the input changes and is
    // re-created, ensure that the
    // caret location is correct
    setSelectionRange: function setSelectionRange() {
      this.$nextTick(this.updateRange);
    }
  }
});

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export defaultDelimiters */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return isMaskDelimiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return maskText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return unmaskText; });
/**
 * Mask keys
 *
 * @type {Object}
 */
var allowedMasks = {
  '#': {
    test: function test(char) {
      return char.match(/[0-9]/);
    }
  },
  'A': {
    test: function test(char) {
      return char.match(/[A-Z]/i);
    },
    convert: function convert(char) {
      return char.toUpperCase();
    }
  },
  'a': {
    test: function test(char) {
      return char.match(/[a-z]/i);
    },
    convert: function convert(char) {
      return char.toLowerCase();
    }
  },
  'N': {
    test: function test(char) {
      return char.match(/[0-9A-Z]/i);
    },
    convert: function convert(char) {
      return char.toUpperCase();
    }
  },
  'n': {
    test: function test(char) {
      return char.match(/[0-9a-z]/i);
    },
    convert: function convert(char) {
      return char.toLowerCase();
    }
  },
  'X': {
    test: isMaskDelimiter
  }

  /**
   * Default delimiter RegExp
   *
   * @type {RegExp}
   */
};var defaultDelimiters = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/\\ ]/;

/**
 * Is Character mask
 *
 * @param  {String} char
 *
 * @return {Boolean}
 */
var isMask = function isMask(char) {
  return allowedMasks.hasOwnProperty(char);
};

/**
 * Automatically convert char case
 *
 * @param  {String} mask
 * @param  {String} char
 *
 * @return {String}
 */
var convert = function convert(mask, char) {
  return allowedMasks[mask].convert ? allowedMasks[mask].convert(char) : char;
};

/**
 *
 * @param {String} char
 *
 * @return {Boolean}
 */
var isMaskDelimiter = function isMaskDelimiter(char) {
  return char && char.match(defaultDelimiters);
};

/**
 * Mask Validation
 *
 * @param  {String} mask
 * @param  {String} char
 *
 * @return {Boolean}
 */
var maskValidates = function maskValidates(mask, char) {
  if (char == null || !isMask(mask)) return false;
  return allowedMasks[mask].test(char);
};

/**
 * Mask Text
 *
 * Takes an array of characters
 * and returns a compiled str
 *
 * @param {*} text
 * @param {Array|String} masked
 * @param {Boolean} [dontFillMaskBlanks]
 *
 * @return {String}
 */
var maskText = function maskText(text, masked, dontFillMaskBlanks) {
  if (text == null) return '';
  text = String(text);
  if (!masked.length || !text.length) return text;
  if (!Array.isArray(masked)) masked = masked.split('');

  var textIndex = 0;
  var maskIndex = 0;
  var newText = '';
  while (maskIndex < masked.length) {
    var mask = masked[maskIndex];

    // Assign the next character
    var char = text[textIndex];

    // Check if mask is delimiter
    // and current char matches
    if (!isMask(mask) && char === mask) {
      newText += mask;
      textIndex++;
      // Check if not mask
    } else if (!isMask(mask) && !dontFillMaskBlanks) {
      newText += mask;
      // Check if is mask and validates
    } else if (maskValidates(mask, char)) {
      newText += convert(mask, char);
      textIndex++;
    } else {
      return newText;
    }

    maskIndex++;
  }

  return newText;
};

/**
 * Unmask Text
 *
 * @param {String} text
 *
 * @return {String}
 */
var unmaskText = function unmaskText(text) {
  return text.replace(new RegExp(defaultDelimiters, 'g'), '');
};

/***/ }),
/* 43 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__themeable__ = __webpack_require__(0);


/* harmony default export */ __webpack_exports__["a"] = ({
  mixins: [__WEBPACK_IMPORTED_MODULE_0__themeable__["a" /* default */]],

  data: function data() {
    return {
      isSaving: false
    };
  },


  props: {
    actions: Boolean,
    autosave: Boolean,
    landscape: Boolean,
    noTitle: Boolean,
    scrollable: Boolean,
    value: {
      required: true
    },
    light: Boolean,
    dark: Boolean
  },

  methods: {
    save: function save() {},
    cancel: function cancel() {},
    genSlot: function genSlot() {
      return this.$scopedSlots.default({
        save: this.save,
        cancel: this.cancel
      });
    }
  }
});

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_semver__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_semver___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_semver__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__package_json__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__package_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__package_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives__ = __webpack_require__(218);
__webpack_require__(46);





function Vuetify(Vue) {
  var Vuetify = __WEBPACK_IMPORTED_MODULE_2__components__["Vuetify"];

  Vue.use(Vuetify, {
    components: __WEBPACK_IMPORTED_MODULE_2__components__,
    directives: __WEBPACK_IMPORTED_MODULE_3__directives__
  });
}

Vuetify.version = __WEBPACK_IMPORTED_MODULE_1__package_json__["version"];

function checkVueVersion() {
  var vueDep = __WEBPACK_IMPORTED_MODULE_1__package_json__["devDependencies"].vue;
  if (!__WEBPACK_IMPORTED_MODULE_0_semver___default.a.satisfies(window.Vue.version, vueDep)) {
    console.warn('Vuetify requires Vue version ' + vueDep);
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.version && checkVueVersion();
  window.Vue.use(Vuetify);
}

/* harmony default export */ __webpack_exports__["default"] = (Vuetify);

/***/ }),
/* 46 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {exports = module.exports = SemVer;

// The debug function is excluded entirely from the minified version.
/* nomin */ var debug;
/* nomin */ if (typeof process === 'object' &&
    /* nomin */ process.env &&
    /* nomin */ process.env.NODE_DEBUG &&
    /* nomin */ /\bsemver\b/i.test(process.env.NODE_DEBUG))
  /* nomin */ debug = function() {
    /* nomin */ var args = Array.prototype.slice.call(arguments, 0);
    /* nomin */ args.unshift('SEMVER');
    /* nomin */ console.log.apply(console, args);
    /* nomin */ };
/* nomin */ else
  /* nomin */ debug = function() {};

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0';

var MAX_LENGTH = 256;
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;

// The actual regexps go on exports.re
var re = exports.re = [];
var src = exports.src = [];
var R = 0;

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

var NUMERICIDENTIFIER = R++;
src[NUMERICIDENTIFIER] = '0|[1-9]\\d*';
var NUMERICIDENTIFIERLOOSE = R++;
src[NUMERICIDENTIFIERLOOSE] = '[0-9]+';


// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

var NONNUMERICIDENTIFIER = R++;
src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*';


// ## Main Version
// Three dot-separated numeric identifiers.

var MAINVERSION = R++;
src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')';

var MAINVERSIONLOOSE = R++;
src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')';

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

var PRERELEASEIDENTIFIER = R++;
src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
                            '|' + src[NONNUMERICIDENTIFIER] + ')';

var PRERELEASEIDENTIFIERLOOSE = R++;
src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[NONNUMERICIDENTIFIER] + ')';


// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

var PRERELEASE = R++;
src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))';

var PRERELEASELOOSE = R++;
src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))';

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

var BUILDIDENTIFIER = R++;
src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+';

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

var BUILD = R++;
src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
             '(?:\\.' + src[BUILDIDENTIFIER] + ')*))';


// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

var FULL = R++;
var FULLPLAIN = 'v?' + src[MAINVERSION] +
                src[PRERELEASE] + '?' +
                src[BUILD] + '?';

src[FULL] = '^' + FULLPLAIN + '$';

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
                 src[PRERELEASELOOSE] + '?' +
                 src[BUILD] + '?';

var LOOSE = R++;
src[LOOSE] = '^' + LOOSEPLAIN + '$';

var GTLT = R++;
src[GTLT] = '((?:<|>)?=?)';

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
var XRANGEIDENTIFIERLOOSE = R++;
src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*';
var XRANGEIDENTIFIER = R++;
src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*';

var XRANGEPLAIN = R++;
src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[PRERELEASE] + ')?' +
                   src[BUILD] + '?' +
                   ')?)?';

var XRANGEPLAINLOOSE = R++;
src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[PRERELEASELOOSE] + ')?' +
                        src[BUILD] + '?' +
                        ')?)?';

var XRANGE = R++;
src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$';
var XRANGELOOSE = R++;
src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$';

// Tilde ranges.
// Meaning is "reasonably at or greater than"
var LONETILDE = R++;
src[LONETILDE] = '(?:~>?)';

var TILDETRIM = R++;
src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+';
re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g');
var tildeTrimReplace = '$1~';

var TILDE = R++;
src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$';
var TILDELOOSE = R++;
src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$';

// Caret ranges.
// Meaning is "at least and backwards compatible with"
var LONECARET = R++;
src[LONECARET] = '(?:\\^)';

var CARETTRIM = R++;
src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+';
re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g');
var caretTrimReplace = '$1^';

var CARET = R++;
src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$';
var CARETLOOSE = R++;
src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$';

// A simple gt/lt/eq thing, or just "" to indicate "any version"
var COMPARATORLOOSE = R++;
src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$';
var COMPARATOR = R++;
src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$';


// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
var COMPARATORTRIM = R++;
src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
                      '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')';

// this one has to use the /g flag
re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g');
var comparatorTrimReplace = '$1$2$3';


// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
var HYPHENRANGE = R++;
src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[XRANGEPLAIN] + ')' +
                   '\\s*$';

var HYPHENRANGELOOSE = R++;
src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s*$';

// Star ranges basically just allow anything at all.
var STAR = R++;
src[STAR] = '(<|>)?=?\\s*\\*';

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i]);
  if (!re[i])
    re[i] = new RegExp(src[i]);
}

exports.parse = parse;
function parse(version, loose) {
  if (version instanceof SemVer)
    return version;

  if (typeof version !== 'string')
    return null;

  if (version.length > MAX_LENGTH)
    return null;

  var r = loose ? re[LOOSE] : re[FULL];
  if (!r.test(version))
    return null;

  try {
    return new SemVer(version, loose);
  } catch (er) {
    return null;
  }
}

exports.valid = valid;
function valid(version, loose) {
  var v = parse(version, loose);
  return v ? v.version : null;
}


exports.clean = clean;
function clean(version, loose) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), loose);
  return s ? s.version : null;
}

exports.SemVer = SemVer;

function SemVer(version, loose) {
  if (version instanceof SemVer) {
    if (version.loose === loose)
      return version;
    else
      version = version.version;
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version);
  }

  if (version.length > MAX_LENGTH)
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')

  if (!(this instanceof SemVer))
    return new SemVer(version, loose);

  debug('SemVer', version, loose);
  this.loose = loose;
  var m = version.trim().match(loose ? re[LOOSE] : re[FULL]);

  if (!m)
    throw new TypeError('Invalid Version: ' + version);

  this.raw = version;

  // these are actually numbers
  this.major = +m[1];
  this.minor = +m[2];
  this.patch = +m[3];

  if (this.major > MAX_SAFE_INTEGER || this.major < 0)
    throw new TypeError('Invalid major version')

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0)
    throw new TypeError('Invalid minor version')

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0)
    throw new TypeError('Invalid patch version')

  // numberify any prerelease numeric ids
  if (!m[4])
    this.prerelease = [];
  else
    this.prerelease = m[4].split('.').map(function(id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id;
        if (num >= 0 && num < MAX_SAFE_INTEGER)
          return num;
      }
      return id;
    });

  this.build = m[5] ? m[5].split('.') : [];
  this.format();
}

SemVer.prototype.format = function() {
  this.version = this.major + '.' + this.minor + '.' + this.patch;
  if (this.prerelease.length)
    this.version += '-' + this.prerelease.join('.');
  return this.version;
};

SemVer.prototype.toString = function() {
  return this.version;
};

SemVer.prototype.compare = function(other) {
  debug('SemVer.compare', this.version, this.loose, other);
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  return this.compareMain(other) || this.comparePre(other);
};

SemVer.prototype.compareMain = function(other) {
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch);
};

SemVer.prototype.comparePre = function(other) {
  if (!(other instanceof SemVer))
    other = new SemVer(other, this.loose);

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length)
    return -1;
  else if (!this.prerelease.length && other.prerelease.length)
    return 1;
  else if (!this.prerelease.length && !other.prerelease.length)
    return 0;

  var i = 0;
  do {
    var a = this.prerelease[i];
    var b = other.prerelease[i];
    debug('prerelease compare', i, a, b);
    if (a === undefined && b === undefined)
      return 0;
    else if (b === undefined)
      return 1;
    else if (a === undefined)
      return -1;
    else if (a === b)
      continue;
    else
      return compareIdentifiers(a, b);
  } while (++i);
};

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function(release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0;
      this.patch = 0;
      this.minor = 0;
      this.major++;
      this.inc('pre', identifier);
      break;
    case 'preminor':
      this.prerelease.length = 0;
      this.patch = 0;
      this.minor++;
      this.inc('pre', identifier);
      break;
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0;
      this.inc('patch', identifier);
      this.inc('pre', identifier);
      break;
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0)
        this.inc('patch', identifier);
      this.inc('pre', identifier);
      break;

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0)
        this.major++;
      this.minor = 0;
      this.patch = 0;
      this.prerelease = [];
      break;
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0)
        this.minor++;
      this.patch = 0;
      this.prerelease = [];
      break;
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0)
        this.patch++;
      this.prerelease = [];
      break;
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0)
        this.prerelease = [0];
      else {
        var i = this.prerelease.length;
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++;
            i = -2;
          }
        }
        if (i === -1) // didn't increment anything
          this.prerelease.push(0);
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1]))
            this.prerelease = [identifier, 0];
        } else
          this.prerelease = [identifier, 0];
      }
      break;

    default:
      throw new Error('invalid increment argument: ' + release);
  }
  this.format();
  this.raw = this.version;
  return this;
};

exports.inc = inc;
function inc(version, release, loose, identifier) {
  if (typeof(loose) === 'string') {
    identifier = loose;
    loose = undefined;
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version;
  } catch (er) {
    return null;
  }
}

exports.diff = diff;
function diff(version1, version2) {
  if (eq(version1, version2)) {
    return null;
  } else {
    var v1 = parse(version1);
    var v2 = parse(version2);
    if (v1.prerelease.length || v2.prerelease.length) {
      for (var key in v1) {
        if (key === 'major' || key === 'minor' || key === 'patch') {
          if (v1[key] !== v2[key]) {
            return 'pre'+key;
          }
        }
      }
      return 'prerelease';
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return key;
        }
      }
    }
  }
}

exports.compareIdentifiers = compareIdentifiers;

var numeric = /^[0-9]+$/;
function compareIdentifiers(a, b) {
  var anum = numeric.test(a);
  var bnum = numeric.test(b);

  if (anum && bnum) {
    a = +a;
    b = +b;
  }

  return (anum && !bnum) ? -1 :
         (bnum && !anum) ? 1 :
         a < b ? -1 :
         a > b ? 1 :
         0;
}

exports.rcompareIdentifiers = rcompareIdentifiers;
function rcompareIdentifiers(a, b) {
  return compareIdentifiers(b, a);
}

exports.major = major;
function major(a, loose) {
  return new SemVer(a, loose).major;
}

exports.minor = minor;
function minor(a, loose) {
  return new SemVer(a, loose).minor;
}

exports.patch = patch;
function patch(a, loose) {
  return new SemVer(a, loose).patch;
}

exports.compare = compare;
function compare(a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose));
}

exports.compareLoose = compareLoose;
function compareLoose(a, b) {
  return compare(a, b, true);
}

exports.rcompare = rcompare;
function rcompare(a, b, loose) {
  return compare(b, a, loose);
}

exports.sort = sort;
function sort(list, loose) {
  return list.sort(function(a, b) {
    return exports.compare(a, b, loose);
  });
}

exports.rsort = rsort;
function rsort(list, loose) {
  return list.sort(function(a, b) {
    return exports.rcompare(a, b, loose);
  });
}

exports.gt = gt;
function gt(a, b, loose) {
  return compare(a, b, loose) > 0;
}

exports.lt = lt;
function lt(a, b, loose) {
  return compare(a, b, loose) < 0;
}

exports.eq = eq;
function eq(a, b, loose) {
  return compare(a, b, loose) === 0;
}

exports.neq = neq;
function neq(a, b, loose) {
  return compare(a, b, loose) !== 0;
}

exports.gte = gte;
function gte(a, b, loose) {
  return compare(a, b, loose) >= 0;
}

exports.lte = lte;
function lte(a, b, loose) {
  return compare(a, b, loose) <= 0;
}

exports.cmp = cmp;
function cmp(a, op, b, loose) {
  var ret;
  switch (op) {
    case '===':
      if (typeof a === 'object') a = a.version;
      if (typeof b === 'object') b = b.version;
      ret = a === b;
      break;
    case '!==':
      if (typeof a === 'object') a = a.version;
      if (typeof b === 'object') b = b.version;
      ret = a !== b;
      break;
    case '': case '=': case '==': ret = eq(a, b, loose); break;
    case '!=': ret = neq(a, b, loose); break;
    case '>': ret = gt(a, b, loose); break;
    case '>=': ret = gte(a, b, loose); break;
    case '<': ret = lt(a, b, loose); break;
    case '<=': ret = lte(a, b, loose); break;
    default: throw new TypeError('Invalid operator: ' + op);
  }
  return ret;
}

exports.Comparator = Comparator;
function Comparator(comp, loose) {
  if (comp instanceof Comparator) {
    if (comp.loose === loose)
      return comp;
    else
      comp = comp.value;
  }

  if (!(this instanceof Comparator))
    return new Comparator(comp, loose);

  debug('comparator', comp, loose);
  this.loose = loose;
  this.parse(comp);

  if (this.semver === ANY)
    this.value = '';
  else
    this.value = this.operator + this.semver.version;

  debug('comp', this);
}

var ANY = {};
Comparator.prototype.parse = function(comp) {
  var r = this.loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
  var m = comp.match(r);

  if (!m)
    throw new TypeError('Invalid comparator: ' + comp);

  this.operator = m[1];
  if (this.operator === '=')
    this.operator = '';

  // if it literally is just '>' or '' then allow anything.
  if (!m[2])
    this.semver = ANY;
  else
    this.semver = new SemVer(m[2], this.loose);
};

Comparator.prototype.toString = function() {
  return this.value;
};

Comparator.prototype.test = function(version) {
  debug('Comparator.test', version, this.loose);

  if (this.semver === ANY)
    return true;

  if (typeof version === 'string')
    version = new SemVer(version, this.loose);

  return cmp(version, this.operator, this.semver, this.loose);
};

Comparator.prototype.intersects = function(comp, loose) {
  if (!(comp instanceof Comparator)) {
    throw new TypeError('a Comparator is required');
  }

  var rangeTmp;

  if (this.operator === '') {
    rangeTmp = new Range(comp.value, loose);
    return satisfies(this.value, rangeTmp, loose);
  } else if (comp.operator === '') {
    rangeTmp = new Range(this.value, loose);
    return satisfies(comp.semver, rangeTmp, loose);
  }

  var sameDirectionIncreasing =
    (this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '>=' || comp.operator === '>');
  var sameDirectionDecreasing =
    (this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '<=' || comp.operator === '<');
  var sameSemVer = this.semver.version === comp.semver.version;
  var differentDirectionsInclusive =
    (this.operator === '>=' || this.operator === '<=') &&
    (comp.operator === '>=' || comp.operator === '<=');
  var oppositeDirectionsLessThan =
    cmp(this.semver, '<', comp.semver, loose) &&
    ((this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '<=' || comp.operator === '<'));
  var oppositeDirectionsGreaterThan =
    cmp(this.semver, '>', comp.semver, loose) &&
    ((this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '>=' || comp.operator === '>'));

  return sameDirectionIncreasing || sameDirectionDecreasing ||
    (sameSemVer && differentDirectionsInclusive) ||
    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
};


exports.Range = Range;
function Range(range, loose) {
  if (range instanceof Range) {
    if (range.loose === loose) {
      return range;
    } else {
      return new Range(range.raw, loose);
    }
  }

  if (range instanceof Comparator) {
    return new Range(range.value, loose);
  }

  if (!(this instanceof Range))
    return new Range(range, loose);

  this.loose = loose;

  // First, split based on boolean or ||
  this.raw = range;
  this.set = range.split(/\s*\|\|\s*/).map(function(range) {
    return this.parseRange(range.trim());
  }, this).filter(function(c) {
    // throw out any that are not relevant for whatever reason
    return c.length;
  });

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range);
  }

  this.format();
}

Range.prototype.format = function() {
  this.range = this.set.map(function(comps) {
    return comps.join(' ').trim();
  }).join('||').trim();
  return this.range;
};

Range.prototype.toString = function() {
  return this.range;
};

Range.prototype.parseRange = function(range) {
  var loose = this.loose;
  range = range.trim();
  debug('range', range, loose);
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE];
  range = range.replace(hr, hyphenReplace);
  debug('hyphen replace', range);
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace);
  debug('comparator trim', range, re[COMPARATORTRIM]);

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[TILDETRIM], tildeTrimReplace);

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[CARETTRIM], caretTrimReplace);

  // normalize spaces
  range = range.split(/\s+/).join(' ');

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR];
  var set = range.split(' ').map(function(comp) {
    return parseComparator(comp, loose);
  }).join(' ').split(/\s+/);
  if (this.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function(comp) {
      return !!comp.match(compRe);
    });
  }
  set = set.map(function(comp) {
    return new Comparator(comp, loose);
  });

  return set;
};

Range.prototype.intersects = function(range, loose) {
  if (!(range instanceof Range)) {
    throw new TypeError('a Range is required');
  }

  return this.set.some(function(thisComparators) {
    return thisComparators.every(function(thisComparator) {
      return range.set.some(function(rangeComparators) {
        return rangeComparators.every(function(rangeComparator) {
          return thisComparator.intersects(rangeComparator, loose);
        });
      });
    });
  });
};

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators;
function toComparators(range, loose) {
  return new Range(range, loose).set.map(function(comp) {
    return comp.map(function(c) {
      return c.value;
    }).join(' ').trim().split(' ');
  });
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator(comp, loose) {
  debug('comp', comp);
  comp = replaceCarets(comp, loose);
  debug('caret', comp);
  comp = replaceTildes(comp, loose);
  debug('tildes', comp);
  comp = replaceXRanges(comp, loose);
  debug('xrange', comp);
  comp = replaceStars(comp, loose);
  debug('stars', comp);
  return comp;
}

function isX(id) {
  return !id || id.toLowerCase() === 'x' || id === '*';
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes(comp, loose) {
  return comp.trim().split(/\s+/).map(function(comp) {
    return replaceTilde(comp, loose);
  }).join(' ');
}

function replaceTilde(comp, loose) {
  var r = loose ? re[TILDELOOSE] : re[TILDE];
  return comp.replace(r, function(_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr);
    var ret;

    if (isX(M))
      ret = '';
    else if (isX(m))
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    else if (isX(p))
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
    else if (pr) {
      debug('replaceTilde pr', pr);
      if (pr.charAt(0) !== '-')
        pr = '-' + pr;
      ret = '>=' + M + '.' + m + '.' + p + pr +
            ' <' + M + '.' + (+m + 1) + '.0';
    } else
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0';

    debug('tilde return', ret);
    return ret;
  });
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets(comp, loose) {
  return comp.trim().split(/\s+/).map(function(comp) {
    return replaceCaret(comp, loose);
  }).join(' ');
}

function replaceCaret(comp, loose) {
  debug('caret', comp, loose);
  var r = loose ? re[CARETLOOSE] : re[CARET];
  return comp.replace(r, function(_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr);
    var ret;

    if (isX(M))
      ret = '';
    else if (isX(m))
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    else if (isX(p)) {
      if (M === '0')
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
      else
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0';
    } else if (pr) {
      debug('replaceCaret pr', pr);
      if (pr.charAt(0) !== '-')
        pr = '-' + pr;
      if (M === '0') {
        if (m === '0')
          ret = '>=' + M + '.' + m + '.' + p + pr +
                ' <' + M + '.' + m + '.' + (+p + 1);
        else
          ret = '>=' + M + '.' + m + '.' + p + pr +
                ' <' + M + '.' + (+m + 1) + '.0';
      } else
        ret = '>=' + M + '.' + m + '.' + p + pr +
              ' <' + (+M + 1) + '.0.0';
    } else {
      debug('no pr');
      if (M === '0') {
        if (m === '0')
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1);
        else
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0';
      } else
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0';
    }

    debug('caret return', ret);
    return ret;
  });
}

function replaceXRanges(comp, loose) {
  debug('replaceXRanges', comp, loose);
  return comp.split(/\s+/).map(function(comp) {
    return replaceXRange(comp, loose);
  }).join(' ');
}

function replaceXRange(comp, loose) {
  comp = comp.trim();
  var r = loose ? re[XRANGELOOSE] : re[XRANGE];
  return comp.replace(r, function(ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr);
    var xM = isX(M);
    var xm = xM || isX(m);
    var xp = xm || isX(p);
    var anyX = xp;

    if (gtlt === '=' && anyX)
      gtlt = '';

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0';
      } else {
        // nothing is forbidden
        ret = '*';
      }
    } else if (gtlt && anyX) {
      // replace X with 0
      if (xm)
        m = 0;
      if (xp)
        p = 0;

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>=';
        if (xm) {
          M = +M + 1;
          m = 0;
          p = 0;
        } else if (xp) {
          m = +m + 1;
          p = 0;
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<';
        if (xm)
          M = +M + 1;
        else
          m = +m + 1;
      }

      ret = gtlt + M + '.' + m + '.' + p;
    } else if (xm) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0';
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0';
    }

    debug('xRange return', ret);

    return ret;
  });
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars(comp, loose) {
  debug('replaceStars', comp, loose);
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[STAR], '');
}

// This function is passed to string.replace(re[HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace($0,
                       from, fM, fm, fp, fpr, fb,
                       to, tM, tm, tp, tpr, tb) {

  if (isX(fM))
    from = '';
  else if (isX(fm))
    from = '>=' + fM + '.0.0';
  else if (isX(fp))
    from = '>=' + fM + '.' + fm + '.0';
  else
    from = '>=' + from;

  if (isX(tM))
    to = '';
  else if (isX(tm))
    to = '<' + (+tM + 1) + '.0.0';
  else if (isX(tp))
    to = '<' + tM + '.' + (+tm + 1) + '.0';
  else if (tpr)
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr;
  else
    to = '<=' + to;

  return (from + ' ' + to).trim();
}


// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function(version) {
  if (!version)
    return false;

  if (typeof version === 'string')
    version = new SemVer(version, this.loose);

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version))
      return true;
  }
  return false;
};

function testSet(set, version) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version))
      return false;
  }

  if (version.prerelease.length) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (var i = 0; i < set.length; i++) {
      debug(set[i].semver);
      if (set[i].semver === ANY)
        continue;

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver;
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch)
          return true;
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false;
  }

  return true;
}

exports.satisfies = satisfies;
function satisfies(version, range, loose) {
  try {
    range = new Range(range, loose);
  } catch (er) {
    return false;
  }
  return range.test(version);
}

exports.maxSatisfying = maxSatisfying;
function maxSatisfying(versions, range, loose) {
  var max = null;
  var maxSV = null;
  try {
    var rangeObj = new Range(range, loose);
  } catch (er) {
    return null;
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) { // satisfies(v, range, loose)
      if (!max || maxSV.compare(v) === -1) { // compare(max, v, true)
        max = v;
        maxSV = new SemVer(max, loose);
      }
    }
  })
  return max;
}

exports.minSatisfying = minSatisfying;
function minSatisfying(versions, range, loose) {
  var min = null;
  var minSV = null;
  try {
    var rangeObj = new Range(range, loose);
  } catch (er) {
    return null;
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) { // satisfies(v, range, loose)
      if (!min || minSV.compare(v) === 1) { // compare(min, v, true)
        min = v;
        minSV = new SemVer(min, loose);
      }
    }
  })
  return min;
}

exports.validRange = validRange;
function validRange(range, loose) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, loose).range || '*';
  } catch (er) {
    return null;
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr;
function ltr(version, range, loose) {
  return outside(version, range, '<', loose);
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr;
function gtr(version, range, loose) {
  return outside(version, range, '>', loose);
}

exports.outside = outside;
function outside(version, range, hilo, loose) {
  version = new SemVer(version, loose);
  range = new Range(range, loose);

  var gtfn, ltefn, ltfn, comp, ecomp;
  switch (hilo) {
    case '>':
      gtfn = gt;
      ltefn = lte;
      ltfn = lt;
      comp = '>';
      ecomp = '>=';
      break;
    case '<':
      gtfn = lt;
      ltefn = gte;
      ltfn = gt;
      comp = '<';
      ecomp = '<=';
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, loose)) {
    return false;
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i];

    var high = null;
    var low = null;

    comparators.forEach(function(comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator;
      low = low || comparator;
      if (gtfn(comparator.semver, high.semver, loose)) {
        high = comparator;
      } else if (ltfn(comparator.semver, low.semver, loose)) {
        low = comparator;
      }
    });

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false;
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false;
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false;
    }
  }
  return true;
}

exports.prerelease = prerelease;
function prerelease(version, loose) {
  var parsed = parse(version, loose);
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null;
}

exports.intersects = intersects;
function intersects(r1, r2, loose) {
  r1 = new Range(r1, loose)
  r2 = new Range(r2, loose)
  return r1.intersects(r2)
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(48)))

/***/ }),
/* 48 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = {"name":"vuetify","version":"0.16.9","author":{"name":"John Leider","email":"john@vuetifyjs.com"},"license":"MIT","homepage":"http://vuetifyjs.com","main":"dist/vuetify.js","unpkg":"dist/vuetify.js","types":"index.d.ts","scripts":{"watch":"cross-env TARGET=development webpack --config build/config.js --progress --hide-modules --watch","dev":"cross-env NODE_ENV=development webpack-dev-server --config build/webpack.dev.config.js --open --hot","build":"npm run build:dist && npm run build:es5","build:dev":"cross-env NODE_ENV=production node build/webpack.dev.config.js","build:dist":"rimraf dist && cross-env NODE_ENV=production webpack --config build/config.js --progress --hide-modules","build:es5":"rimraf es5 && cross-env NODE_ENV=es5 babel src --out-dir es5","debug-build":"node --inspect --debug-brk build/config.js","debug:test":"./node_modules/.bin/cross-env NODE_ENV=test node --inspect --inspect-brk ./node_modules/jest/bin/jest.js --no-cache --runInBand --verbose","test":"cross-env NODE_ENV=test jest -i","lint":"eslint --ext .js,.vue src","preparecommitmsg":"node dev/prepare-commit-message.js","precommit":"yarn run lint && yarn test","prepush":"yarn run lint && yarn test"},"description":"Vue.js 2 Semantic Component Framework","devDependencies":{"autoprefixer":"^7.1.4","avoriaz":"^4.1.0","babel-cli":"^6.26.0","babel-core":"^6.26.0","babel-eslint":"^8.0.0","babel-jest":"^21.0.2","babel-loader":"^7.1.2","babel-plugin-add-filehash":"^6.9.4","babel-plugin-detective":"^2.0.0","babel-plugin-module-resolver":"^2.7.1","babel-plugin-transform-async-to-generator":"^6.24.1","babel-plugin-transform-runtime":"^6.23.0","babel-polyfill":"^6.26.0","babel-preset-env":"^1.5.1","babel-preset-es2015":"^6.24.1","babel-preset-stage-2":"^6.24.1","cross-env":"^5.0.5","cross-spawn":"^5.1.0","css-loader":"^0.28.7","css-mqpacker":"^6.0.1","cssnano":"^3.10.0","eslint":"^4.6.1","eslint-config-standard":"^10.2.1","eslint-config-vue":"^2.0.2","eslint-friendly-formatter":"^3.0.0","eslint-loader":"^1.6.1","eslint-plugin-html":"^3.2.1","eslint-plugin-import":"^2.7.0","eslint-plugin-node":"^5.1.1","eslint-plugin-promise":"^3.4.0","eslint-plugin-pug":"^1.0.0","eslint-plugin-standard":"^3.0.1","eslint-plugin-vue":"^2.1.0","eventsource-polyfill":"^0.9.6","extract-text-webpack-plugin":"^3.0.0","friendly-errors-webpack-plugin":"^1.6.1","function-bind":"^1.1.1","husky":"^0.14.3","jest":"^21.1.0","jest-cli":"^21.1.0","jest-css-modules":"^1.1.0","jest-serializer-html":"^4.0.0","jest-vue-preprocessor":"^1.1.0","optimize-css-assets-webpack-plugin":"^3.2.0","optimize-js-plugin":"^0.0.4","postcss-loader":"^1.3.3","progress-bar-webpack-plugin":"^1.10.0","pug":"^2.0.0-rc.4","pug-loader":"^2.3.0","ress":"^1.1.1","rimraf":"^2.6.2","semver":"^5.4.1","serialize-javascript":"^1.3.0","style-loader":"^0.18.2","stylus":"^0.54.5","stylus-loader":"^3.0.1","uglifyjs-webpack-plugin":"^0.4.6","vue":"^2.4.4","vue-loader":"^13.0.4","vue-router":"^2.7.0","vue-server-renderer":"^2.4.4","vue-template-compiler":"^2.4.4","webpack":"^3.6.0","webpack-bundle-analyzer":"^2.9.0","webpack-bundle-size-analyzer":"^2.7.0","webpack-dev-server":"^2.8.2","webpack-merge":"^4.1.0","write-file-webpack-plugin":"^4.1.0"},"dependencies":{},"peerDependencies":{"vue":"^2.4.3"},"engines":{"node":">= 4.0.0","npm":">= 3.0.0"},"jest":{"verbose":false,"roots":["<rootDir>/src"],"moduleFileExtensions":["js","vue"],"moduleDirectories":["node_modules"],"moduleNameMapper":{"src/(.*)":"<rootDir>/src/$1"},"transform":{".*\\.(vue)$":"<rootDir>/node_modules/jest-vue-preprocessor","\\.(styl)$":"<rootDir>/node_modules/jest-css-modules",".*\\.(vue|js)$":"<rootDir>/node_modules/babel-jest"},"transformIgnorePatterns":["node_modules/(?!vue-router)"],"snapshotSerializers":["jest-serializer-html"]}}

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Vuetify__ = __webpack_require__(51);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Vuetify", function() { return __WEBPACK_IMPORTED_MODULE_0__Vuetify__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VApp__ = __webpack_require__(53);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VApp", function() { return __WEBPACK_IMPORTED_MODULE_1__VApp__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VAlert__ = __webpack_require__(58);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VAlert", function() { return __WEBPACK_IMPORTED_MODULE_2__VAlert__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VAvatar__ = __webpack_require__(64);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VAvatar", function() { return __WEBPACK_IMPORTED_MODULE_3__VAvatar__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__VBadge__ = __webpack_require__(67);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VBadge", function() { return __WEBPACK_IMPORTED_MODULE_4__VBadge__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__VBottomNav__ = __webpack_require__(70);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VBottomNav", function() { return __WEBPACK_IMPORTED_MODULE_5__VBottomNav__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__VBottomSheet__ = __webpack_require__(73);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VBottomSheet", function() { return __WEBPACK_IMPORTED_MODULE_6__VBottomSheet__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__VBreadcrumbs__ = __webpack_require__(78);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VBreadcrumbs", function() { return __WEBPACK_IMPORTED_MODULE_7__VBreadcrumbs__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__VBtn__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VBtn", function() { return __WEBPACK_IMPORTED_MODULE_8__VBtn__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__VBtnToggle__ = __webpack_require__(84);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VBtnToggle", function() { return __WEBPACK_IMPORTED_MODULE_9__VBtnToggle__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__VCard__ = __webpack_require__(16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VCard", function() { return __WEBPACK_IMPORTED_MODULE_10__VCard__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__VCarousel__ = __webpack_require__(91);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VCarousel", function() { return __WEBPACK_IMPORTED_MODULE_11__VCarousel__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__VCheckbox__ = __webpack_require__(29);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VCheckbox", function() { return __WEBPACK_IMPORTED_MODULE_12__VCheckbox__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__VChip__ = __webpack_require__(98);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VChip", function() { return __WEBPACK_IMPORTED_MODULE_13__VChip__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__VDataTable__ = __webpack_require__(101);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VDataTable", function() { return __WEBPACK_IMPORTED_MODULE_14__VDataTable__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__VDatePicker__ = __webpack_require__(128);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VDatePicker", function() { return __WEBPACK_IMPORTED_MODULE_15__VDatePicker__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__VDialog__ = __webpack_require__(136);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VDialog", function() { return __WEBPACK_IMPORTED_MODULE_16__VDialog__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__VDivider__ = __webpack_require__(137);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VDivider", function() { return __WEBPACK_IMPORTED_MODULE_17__VDivider__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__VExpansionPanel__ = __webpack_require__(140);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VExpansionPanel", function() { return __WEBPACK_IMPORTED_MODULE_18__VExpansionPanel__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__VFooter__ = __webpack_require__(144);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VFooter", function() { return __WEBPACK_IMPORTED_MODULE_19__VFooter__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__VForm__ = __webpack_require__(147);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VForm", function() { return __WEBPACK_IMPORTED_MODULE_20__VForm__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__VGrid__ = __webpack_require__(149);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VGrid", function() { return __WEBPACK_IMPORTED_MODULE_21__VGrid__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__VIcon__ = __webpack_require__(3);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VIcon", function() { return __WEBPACK_IMPORTED_MODULE_22__VIcon__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__VList__ = __webpack_require__(36);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VList", function() { return __WEBPACK_IMPORTED_MODULE_23__VList__["f"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__VMenu__ = __webpack_require__(37);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VMenu", function() { return __WEBPACK_IMPORTED_MODULE_24__VMenu__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__VNavigationDrawer__ = __webpack_require__(155);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VNavigationDrawer", function() { return __WEBPACK_IMPORTED_MODULE_25__VNavigationDrawer__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__VPagination__ = __webpack_require__(158);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VPagination", function() { return __WEBPACK_IMPORTED_MODULE_26__VPagination__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__VParallax__ = __webpack_require__(161);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VParallax", function() { return __WEBPACK_IMPORTED_MODULE_27__VParallax__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__VProgressCircular__ = __webpack_require__(165);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VProgressCircular", function() { return __WEBPACK_IMPORTED_MODULE_28__VProgressCircular__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__VProgressLinear__ = __webpack_require__(33);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VProgressLinear", function() { return __WEBPACK_IMPORTED_MODULE_29__VProgressLinear__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__VRadioGroup__ = __webpack_require__(168);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VRadioGroup", function() { return __WEBPACK_IMPORTED_MODULE_30__VRadioGroup__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__VSelect__ = __webpack_require__(34);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VSelect", function() { return __WEBPACK_IMPORTED_MODULE_31__VSelect__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__VSlider__ = __webpack_require__(173);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VSlider", function() { return __WEBPACK_IMPORTED_MODULE_32__VSlider__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__VSnackbar__ = __webpack_require__(176);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VSnackbar", function() { return __WEBPACK_IMPORTED_MODULE_33__VSnackbar__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__VSpeedDial__ = __webpack_require__(179);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VSpeedDial", function() { return __WEBPACK_IMPORTED_MODULE_34__VSpeedDial__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__VStepper__ = __webpack_require__(182);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VStepper", function() { return __WEBPACK_IMPORTED_MODULE_35__VStepper__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__VSubheader__ = __webpack_require__(187);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VSubheader", function() { return __WEBPACK_IMPORTED_MODULE_36__VSubheader__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__VSwitch__ = __webpack_require__(190);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VSwitch", function() { return __WEBPACK_IMPORTED_MODULE_37__VSwitch__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__VSystemBar__ = __webpack_require__(193);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VSystemBar", function() { return __WEBPACK_IMPORTED_MODULE_38__VSystemBar__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__VTabs__ = __webpack_require__(196);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VTabs", function() { return __WEBPACK_IMPORTED_MODULE_39__VTabs__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__VTextField__ = __webpack_require__(204);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VTextField", function() { return __WEBPACK_IMPORTED_MODULE_40__VTextField__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__VTimePicker__ = __webpack_require__(206);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VTimePicker", function() { return __WEBPACK_IMPORTED_MODULE_41__VTimePicker__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__VToolbar__ = __webpack_require__(211);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VToolbar", function() { return __WEBPACK_IMPORTED_MODULE_42__VToolbar__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__VTooltip__ = __webpack_require__(215);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "VTooltip", function() { return __WEBPACK_IMPORTED_MODULE_43__VTooltip__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__transitions__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Transitions", function() { return __WEBPACK_IMPORTED_MODULE_44__transitions__["h"]; });














































/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_load__ = __webpack_require__(52);


var Vuetify = {
  install: function install(Vue) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var $vuetify = {
      load: __WEBPACK_IMPORTED_MODULE_0__util_load__["a" /* default */],
      application: {
        bar: 0,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      breakpoint: {},
      touchSupport: false
    };

    Vue.util.defineReactive({}, 'breakpoint', $vuetify);
    Vue.util.defineReactive({}, 'application', $vuetify);

    Vue.prototype.$vuetify = $vuetify;

    if (opts.transitions) {
      Object.keys(opts.transitions).forEach(function (key) {
        var t = opts.transitions[key];
        if (t.name !== undefined && t.name.startsWith('v-')) {
          Vue.component(t.name, t);
        }
      });
    }

    if (opts.directives) {
      Object.keys(opts.directives).forEach(function (key) {
        var d = opts.directives[key];
        Vue.directive(d.name, d);
      });
    }

    if (opts.components) {
      Object.keys(opts.components).forEach(function (key) {
        var c = opts.components[key];
        Vue.use(c);
      });
    }
  }
};

/* harmony default export */ __webpack_exports__["a"] = (Vuetify);

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function load(cb) {
  var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (!document._loadCallbacks) {
    document._loadCallbacks = [];
  }

  if (document.readyState === 'complete') {
    return cb();
  }

  document._loadCallbacks.push(cb);
}

/* harmony default export */ __webpack_exports__["a"] = (load);

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VApp__ = __webpack_require__(54);


__WEBPACK_IMPORTED_MODULE_0__VApp__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VApp__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VApp__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VApp__["a" /* default */]);

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_breakpoint__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_touchSupport__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_resize__ = __webpack_require__(7);
__webpack_require__(55);







/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-app',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__util_breakpoint__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__util_touchSupport__["a" /* default */]],

  directives: {
    Resize: __WEBPACK_IMPORTED_MODULE_3__directives_resize__["a" /* default */]
  },

  data: function data() {
    return {
      resizeTimeout: {}
    };
  },

  props: {
    id: {
      type: String,
      default: 'app'
    }
  },

  mounted: function mounted() {
    this.$vuetify.breakpoint = this.breakpoint;
    window.addEventListener('load', this.runCallbacks);
  },


  methods: {
    // Run all load callbacks created
    // from the load helper utility
    runCallbacks: function runCallbacks() {
      // For unit tests
      if (!document._loadCallbacks) return;

      while (document._loadCallbacks.length) {
        document._loadCallbacks.pop()();
      }
    }
  },

  render: function render(h) {
    var data = {
      staticClass: 'application',
      'class': {
        'application--dark': this.dark,
        'application--light': !this.dark
      },
      attrs: { 'data-app': true },
      domProps: { id: this.id },
      directives: [{
        name: 'resize',
        value: this.onResize
      }]
    };

    return h('div', data, this.$slots.default);
  }
});

/***/ }),
/* 55 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * A modified version of https://gist.github.com/cb109/b074a65f7595cffc21cea59ce8d15f9b
 */

/**
 * A Vue mixin to get the current width/height and the associated breakpoint.
 *
 * Useful to e.g. adapt the user interface from inside a Vue component
 * as opposed to using CSS classes. The breakpoint pixel values and
 * range names are taken from Vuetify (https://github.com/vuetifyjs).
 *
 * Use within a component:
 *
 *   import breakpoint from './breakpoint.js'
 *
 *   export default {
 *     name: 'my-component',
 *     mixins: [breakpoint],
 *     ...
 *
 * Then inside a template:
 *
 *   <div v-if="$breakpoint.smAndDown">...</div>
 */
var breakpoint = {
  data: function data() {
    return {
      clientWidth: clientDimensions.getWidth(),
      clientHeight: clientDimensions.getHeight()
    };
  },


  computed: {
    breakpoint: function breakpoint() {
      var xs = this.clientWidth < 600;
      var sm = this.clientWidth < 960 && !xs;
      var md = this.clientWidth < 1280 - 16 && !(sm || xs);
      var lg = this.clientWidth < 1920 - 16 && !(md || sm || xs);
      var xl = this.clientWidth >= 1920 - 16 && !(lg || md || sm || xs);

      var xsOnly = xs;
      var smOnly = sm;
      var smAndDown = (xs || sm) && !(md || lg || xl);
      var smAndUp = !xs && (sm || md || lg || xl);
      var mdOnly = md;
      var mdAndDown = (xs || sm || md) && !(lg || xl);
      var mdAndUp = !(xs || sm) && (md || lg || xl);
      var lgOnly = lg;
      var lgAndDown = (xs || sm || md || lg) && !xl;
      var lgAndUp = !(xs || sm || md) && (lg || xl);
      var xlOnly = xl;

      var name = void 0;
      switch (true) {
        case xs:
          name = 'xs';
          break;
        case sm:
          name = 'sm';
          break;
        case md:
          name = 'md';
          break;
        case lg:
          name = 'lg';
          break;
        default:
          name = 'xl';
          break;
      }

      var result = {
        // Definite breakpoint.
        xs: xs,
        sm: sm,
        md: md,
        lg: lg,
        xl: xl,

        // Useful e.g. to construct CSS class names dynamically.
        name: name,

        // Breakpoint ranges.
        xsOnly: xsOnly,
        smOnly: smOnly,
        smAndDown: smAndDown,
        smAndUp: smAndUp,
        mdOnly: mdOnly,
        mdAndDown: mdAndDown,
        mdAndUp: mdAndUp,
        lgOnly: lgOnly,
        lgAndDown: lgAndDown,
        lgAndUp: lgAndUp,
        xlOnly: xlOnly,

        // For custom breakpoint logic.
        width: this.clientWidth,
        height: this.clientHeight
      };

      return result;
    }
  },

  watch: {
    breakpoint: function breakpoint(val) {
      this.$vuetify.breakpoint = val;
    }
  },

  methods: {
    onResize: function onResize() {
      this.clientWidth = clientDimensions.getWidth();
      this.clientHeight = clientDimensions.getHeight();
    }
  }

  // Cross-browser support as described in:
  // https://stackoverflow.com/questions/1248081
};var clientDimensions = {
  getWidth: function getWidth() {
    if (typeof document === 'undefined') return 0; // SSR
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  },
  getHeight: function getHeight() {
    if (typeof document === 'undefined') return 0; // SSR
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }
};

/* harmony default export */ __webpack_exports__["a"] = (breakpoint);

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__helpers__ = __webpack_require__(1);


/**
 * @mixin
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  mounted: function mounted() {
    var _this = this;

    Object(__WEBPACK_IMPORTED_MODULE_0__helpers__["a" /* addOnceEventListener */])(window, 'touchstart', function () {
      _this.$vuetify.touchSupport = true;
    });
  }
});

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VAlert__ = __webpack_require__(59);


__WEBPACK_IMPORTED_MODULE_0__VAlert__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VAlert__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VAlert__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VAlert__["a" /* default */]);

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_transitionable__ = __webpack_require__(63);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

__webpack_require__(60);







/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-alert',

  components: {
    VIcon: __WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_transitionable__["a" /* default */]],

  props: {
    dismissible: Boolean,
    icon: String
  },

  computed: {
    classes: function classes() {
      return _defineProperty({
        'alert--dismissible': this.dismissible
      }, this.color || 'error', true);
    }
  },

  render: function render(h) {
    var _this = this;

    var children = [h('div', this.$slots.default)];

    if (this.icon) {
      children.unshift(h('v-icon', {
        'class': 'alert__icon'
      }, this.icon));
    }

    if (this.dismissible) {
      var close = h('a', {
        'class': 'alert__dismissible',
        domProps: { href: 'javascript:;' },
        on: { click: function click() {
            return _this.$emit('input', false);
          } }
      }, [h(__WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */], {
        props: {
          right: true
        }
      }, 'cancel')]);

      children.push(close);
    }

    var alert = h('div', {
      staticClass: 'alert',
      'class': this.classes,
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      on: this.$listeners
    }, children);

    if (!this.transition) return alert;

    return h('transition', {
      props: {
        name: this.transition,
        origin: this.origin,
        mode: this.mode
      }
    }, [alert]);
  }
});

/***/ }),
/* 60 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_contextualable__ = __webpack_require__(24);
__webpack_require__(62);





/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-icon',

  functional: true,

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_contextualable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__["a" /* default */]],

  props: {
    disabled: Boolean,
    large: Boolean,
    left: Boolean,
    medium: Boolean,
    right: Boolean,
    xLarge: Boolean
  },

  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        _ref$children = _ref.children,
        children = _ref$children === undefined ? [] : _ref$children;

    Object.keys(__WEBPACK_IMPORTED_MODULE_2__mixins_contextualable__["a" /* default */].props).forEach(function (prop) {
      if (props[prop]) {
        console.warn('Context prop \'' + prop + '\' for VIcon component has been deprecated. Use \'color\' prop instead.');
      }
    });

    if (props.fa || props.mdi) console.warn('The v-icon prop \'fa\' and \'mdi\' will be deprecated in the next release. Use \'fa\' or \'mdi\' prefix in icon name instead.');
    var iconName = '';
    var iconType = 'material-icons';

    if (children.length) {
      iconName = children.pop().text;
    } else if (data.domProps && data.domProps.textContent) {
      iconName = data.domProps.textContent;
      delete data.domProps.textContent;
    } else if (data.domProps && data.domProps.innerHTML) {
      iconName = data.domProps.innerHTML;
      delete data.domProps.innerHTML;
    }

    var thirdPartyIcon = iconName.indexOf('-') > -1;
    if (thirdPartyIcon) iconType = iconName.slice(0, iconName.indexOf('-'));

    // To keep things backwards compatible for now
    iconType = props.fa ? 'fa' : props.mdi ? 'mdi' : iconType;

    data.staticClass = (iconType + ' icon ' + (data.staticClass || '')).trim();
    data.attrs = data.attrs || {};

    var classes = Object.assign({
      'icon--disabled': props.disabled,
      'icon--large': props.large,
      'icon--left': props.left,
      'icon--medium': props.medium,
      'icon--right': props.right,
      'icon--x-large': props.xLarge,
      'theme--dark': props.dark,
      'theme--light': props.light
    }, props.color ? __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a" /* default */].methods.addTextColorClassChecks.call(props, {}) : {
      'primary--text': props.primary,
      'secondary--text': props.secondary,
      'success--text': props.success,
      'info--text': props.info,
      'warning--text': props.warning,
      'error--text': props.error
    });

    var iconClasses = Object.keys(classes).filter(function (k) {
      return classes[k];
    }).join(' ');
    iconClasses && (data.staticClass += ' ' + iconClasses);

    // To keep things backwards compatible for now
    if (props.fa || props.mdi) {
      var comparison = props.fa ? 'fa' : 'mdi';

      if (iconName.indexOf(' ') > -1) data.staticClass += ' ' + comparison + '-' + iconName;else data.staticClass += ' ' + comparison + '-' + iconName.split(' ').join('-');
    }

    if (thirdPartyIcon) data.staticClass += ' ' + iconName;
    !(thirdPartyIcon || props.fa || props.mdi) && children.push(iconName);

    return h('i', data, children);
  }
});

/***/ }),
/* 62 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    mode: String,
    origin: String,
    transition: String
  }
});

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VAvatar__ = __webpack_require__(65);


__WEBPACK_IMPORTED_MODULE_0__VAvatar__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VAvatar__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VAvatar__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VAvatar__["a" /* default */]);

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__(66);

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-avatar',

  functional: true,

  props: {
    size: {
      type: String,
      default: '48px'
    },
    tile: Boolean
  },

  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children;

    data.staticClass = ('avatar ' + (data.staticClass || '')).trim();
    data.style = data.style || {};

    if (props.tile) data.staticClass += ' avatar--tile';

    data.style.height = props.size;
    data.style.width = props.size;

    return h('div', data, children);
  }
});

/***/ }),
/* 66 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VBadge__ = __webpack_require__(68);


__WEBPACK_IMPORTED_MODULE_0__VBadge__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VBadge__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VBadge__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VBadge__["a" /* default */]);

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_colorable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__ = __webpack_require__(4);
__webpack_require__(69);

// Mixins



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-badge',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__["a" /* default */]],

  props: {
    bottom: Boolean,
    color: {
      type: String,
      default: 'primary'
    },
    left: Boolean,
    overlap: Boolean,
    transition: {
      type: String,
      default: 'fab-transition'
    },
    value: {
      default: true
    }
  },

  computed: {
    classes: function classes() {
      return {
        'badge--bottom': this.bottom,
        'badge--left': this.left,
        'badge--overlap': this.overlap
      };
    }
  },

  render: function render(h) {
    var badge = this.$slots.badge ? [h('span', {
      staticClass: 'badge__badge',
      'class': this.addBackgroundColorClassChecks({}),
      attrs: this.attrs,
      directives: [{
        name: 'show',
        value: this.isActive
      }]
    }, this.$slots.badge)] : null;

    return h('span', {
      staticClass: 'badge',
      'class': this.classes
    }, [this.$slots.default, h('transition', {
      props: {
        name: this.transition
      }
    }, badge)]);
  }
});

/***/ }),
/* 69 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VBottomNav__ = __webpack_require__(71);


__WEBPACK_IMPORTED_MODULE_0__VBottomNav__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VBottomNav__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VBottomNav__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VBottomNav__["a" /* default */]);

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_button_group__ = __webpack_require__(25);
__webpack_require__(72);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-bottom-nav',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_button_group__["a" /* default */]],

  props: {
    absolute: Boolean,
    active: [Number, String],
    shift: Boolean,
    value: { required: false }
  },

  watch: {
    active: function active() {
      this.update();
    }
  },

  computed: {
    classes: function classes() {
      return {
        'bottom-nav': true,
        'bottom-nav--absolute': this.absolute,
        'bottom-nav--shift': this.shift,
        'bottom-nav--active': this.value
      };
    }
  },

  methods: {
    isSelected: function isSelected(i) {
      var item = this.getValue(i);
      return this.active === item;
    },
    updateValue: function updateValue(i) {
      var item = this.getValue(i);
      this.$emit('update:active', item);
    }
  },

  render: function render(h) {
    return h('div', {
      class: this.classes
    }, this.$slots.default);
  }
});

/***/ }),
/* 72 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VBottomSheet__ = __webpack_require__(74);


__WEBPACK_IMPORTED_MODULE_0__VBottomSheet__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VBottomSheet__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VBottomSheet__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VBottomSheet__["a" /* default */]);

/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VDialog_VDialog__ = __webpack_require__(26);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

__webpack_require__(75);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-bottom-sheet',

  components: {
    VDialog: __WEBPACK_IMPORTED_MODULE_0__VDialog_VDialog__["a" /* default */]
  },

  props: {
    inset: Boolean,
    value: null
  },

  render: function render(h) {
    var activator = h('template', {
      slot: 'activator'
    }, this.$slots.activator);

    var contentClass = ['bottom-sheet', this.inset ? 'bottom-sheet--inset' : ''].join(' ');

    return h(__WEBPACK_IMPORTED_MODULE_0__VDialog_VDialog__["a" /* default */], {
      attrs: _extends({}, this.$attrs),
      on: _extends({}, this.$listeners),
      props: {
        contentClass: contentClass,
        transition: 'bottom-sheet-transition',
        value: this.value
      }
    }, [activator, this.$slots.default]);
  }
});

/***/ }),
/* 75 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 76 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 77 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VBreadcrumbs__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VBreadcrumbsItem__ = __webpack_require__(81);
/* unused harmony reexport VBreadcrumbs */
/* unused harmony reexport VBreadcrumbsItem */





__WEBPACK_IMPORTED_MODULE_0__VBreadcrumbs__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VBreadcrumbs__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VBreadcrumbs__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VBreadcrumbsItem__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VBreadcrumbsItem__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VBreadcrumbs__["a" /* default */]);

/***/ }),
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__(80);

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-breadcrumbs',

  provide: function provide() {
    return {
      divider: this.divider
    };
  },


  props: {
    divider: {
      type: String,
      default: '/'
    },
    icons: Boolean
  },

  computed: {
    classes: function classes() {
      return {
        'breadcrumbs': true,
        'breadcrumbs--with-icons': this.icons
      };
    }
  },

  render: function render(h) {
    return h('ul', {
      'class': this.classes,
      props: { items: this.items }
    }, this.$slots.default);
  }
});

/***/ }),
/* 80 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_routable__ = __webpack_require__(12);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-breadcrumbs-item',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_routable__["a" /* default */]],

  inject: ['divider'],

  props: {
    activeClass: {
      type: String,
      default: 'breadcrumbs__item--disabled'
    }
  },

  computed: {
    classes: function classes() {
      var classes = {
        'breadcrumbs__item': true
      };

      classes[this.activeClass] = this.disabled;

      return classes;
    }
  },

  render: function render(h) {
    var _generateRouteLink = this.generateRouteLink(),
        tag = _generateRouteLink.tag,
        data = _generateRouteLink.data;

    return h('li', {
      attrs: { 'data-divider': this.divider }
    }, [h(tag, data, this.$slots.default)]);
  }
});

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_colorable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_contextualable__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_positionable__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_routable__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_themeable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_toggleable__ = __webpack_require__(4);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

__webpack_require__(83);








/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-btn',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_contextualable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_routable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_positionable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_themeable__["a" /* default */], Object(__WEBPACK_IMPORTED_MODULE_5__mixins_toggleable__["b" /* factory */])('inputValue')],

  props: {
    activeClass: {
      type: String,
      default: 'btn--active'
    },
    block: Boolean,
    fab: Boolean,
    flat: Boolean,
    icon: Boolean,
    large: Boolean,
    loading: Boolean,
    outline: Boolean,
    raised: {
      type: Boolean,
      default: true
    },
    ripple: {
      type: [Boolean, Object],
      default: true
    },
    round: Boolean,
    small: Boolean,
    tag: {
      type: String,
      default: 'button'
    },
    type: {
      type: String,
      default: 'button'
    },
    value: null
  },

  computed: {
    classes: function classes() {
      var colorBackground = !this.outline && !this.flat;
      var colorText = !this.disabled && !colorBackground;

      var classes = _extends({
        'btn': true,
        'btn--active': this.isActive,
        'btn--absolute': this.absolute,
        'btn--block': this.block,
        'btn--bottom': this.bottom,
        'btn--disabled': this.disabled,
        'btn--flat': this.flat,
        'btn--floating': this.fab,
        'btn--fixed': this.fixed,
        'btn--hover': this.hover,
        'btn--icon': this.icon,
        'btn--large': this.large,
        'btn--left': this.left,
        'btn--loader': this.loading,
        'btn--outline': this.outline,
        'btn--raised': !this.flat || this.raised,
        'btn--right': this.right,
        'btn--round': this.round,
        'btn--router': this.to,
        'btn--small': this.small,
        'btn--top': this.top
      }, this.themeClasses);

      if (!this.color) {
        return Object.assign(classes, {
          'primary': this.primary && colorBackground,
          'secondary': this.secondary && colorBackground,
          'success': this.success && colorBackground,
          'info': this.info && colorBackground,
          'warning': this.warning && colorBackground,
          'error': this.error && colorBackground,
          'primary--text': this.primary && colorText,
          'secondary--text': this.secondary && colorText,
          'success--text': this.success && colorText,
          'info--text': this.info && colorText,
          'warning--text': this.warning && colorText,
          'error--text': this.error && colorText
        });
      }

      return colorBackground ? this.addBackgroundColorClassChecks(classes) : this.addTextColorClassChecks(classes);
    }
  },

  methods: {
    // Prevent focus to match md spec
    click: function click(e) {
      !this.fab && e.detail && this.$el.blur();

      this.$emit('click', e);
    },
    genContent: function genContent() {
      return this.$createElement('div', { 'class': 'btn__content' }, [this.$slots.default]);
    },
    genLoader: function genLoader() {
      var children = [];

      if (!this.$slots.loader) {
        children.push(this.$createElement('v-progress-circular', {
          props: {
            indeterminate: true,
            size: 26
          }
        }));
      } else {
        children.push(this.$slots.loader);
      }

      return this.$createElement('span', { 'class': 'btn__loading' }, children);
    }
  },

  mounted: function mounted() {
    var _this = this;

    Object.keys(__WEBPACK_IMPORTED_MODULE_1__mixins_contextualable__["a" /* default */].props).forEach(function (prop) {
      if (_this[prop]) {
        console.warn('Context prop \'' + prop + '\' for VBtn component has been deprecated. Use \'color\' prop instead.');
      }
    });
  },
  render: function render(h) {
    var _generateRouteLink = this.generateRouteLink(),
        tag = _generateRouteLink.tag,
        data = _generateRouteLink.data;

    var children = [this.genContent()];

    tag === 'button' && (data.attrs.type = this.type);
    this.loading && children.push(this.genLoader());

    data.attrs.value = ['string', 'number'].includes(_typeof(this.value)) ? this.value : JSON.stringify(this.value);

    return h(tag, data, children);
  }
});

/***/ }),
/* 83 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VBtnToggle__ = __webpack_require__(85);


__WEBPACK_IMPORTED_MODULE_0__VBtnToggle__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VBtnToggle__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VBtnToggle__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VBtnToggle__["a" /* default */]);

/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_button_group__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__ = __webpack_require__(0);
__webpack_require__(86);




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-btn-toggle',

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_button_group__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_themeable__["a" /* default */]],

  props: {
    inputValue: {
      required: false
    },
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    mandatory: Boolean,
    multiple: Boolean
  },

  computed: {
    classes: function classes() {
      return {
        'btn-toggle': true,
        'btn-toggle--selected': this.hasValue,
        'theme--light': this.light,
        'theme--dark': this.dark
      };
    },
    hasValue: function hasValue() {
      return this.multiple && this.inputValue.length || !this.multiple && this.inputValue !== null && typeof this.inputValue !== 'undefined';
    }
  },

  watch: {
    inputValue: {
      handler: function handler() {
        this.update();
      },

      deep: true
    }
  },

  methods: {
    isSelected: function isSelected(i) {
      var item = this.getValue(i);
      if (!this.multiple) {
        return this.inputValue === item;
      }

      return this.inputValue.includes(item);
    },
    updateValue: function updateValue(i) {
      var item = this.getValue(i);
      if (!this.multiple) {
        if (this.mandatory && this.inputValue === item) return;
        return this.$emit('change', this.inputValue === item ? null : item);
      }

      var items = this.inputValue.slice();

      var index = items.indexOf(item);
      if (index > -1) {
        if (this.mandatory && items.length === 1) return;
        items.length >= 1 && items.splice(index, 1);
      } else {
        items.push(item);
      }

      this.$emit('change', items);
    }
  },

  mounted: function mounted() {
    if (this.items.length > 0) {
      console.warn('The \'items\' props has been deprecated. v-btn-toggle now has a default slot where you can place buttons.');
    }
  },
  render: function render(h) {
    return h('div', { class: this.classes }, this.$slots.default);
  }
});

/***/ }),
/* 86 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_colorable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_routable__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_themeable__ = __webpack_require__(0);
__webpack_require__(88);





/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-card',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_routable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_themeable__["a" /* default */]],

  props: {
    flat: Boolean,
    height: {
      type: String,
      default: 'auto'
    },
    hover: Boolean,
    img: String,
    raised: Boolean,
    tag: {
      type: String,
      default: 'div'
    },
    tile: Boolean
  },

  computed: {
    classes: function classes() {
      return this.addBackgroundColorClassChecks({
        'card': true,
        'card--flat': this.flat,
        'card--horizontal': this.horizontal,
        'card--hover': this.hover,
        'card--raised': this.raised,
        'card--tile': this.tile,
        'theme--light': this.light,
        'theme--dark': this.dark
      });
    },
    styles: function styles() {
      var style = {
        height: isNaN(this.height) ? this.height : this.height + 'px'
      };

      if (this.img) {
        style.background = 'url(' + this.img + ') center center / cover no-repeat';
      }

      return style;
    }
  },

  render: function render(h) {
    var _generateRouteLink = this.generateRouteLink(),
        tag = _generateRouteLink.tag,
        data = _generateRouteLink.data;

    data.style = this.styles;

    return h(tag, data, this.$slots.default);
  }
});

/***/ }),
/* 88 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-card-media',

  props: {
    contain: Boolean,
    height: {
      type: [Number, String],
      default: 'auto'
    },
    src: {
      type: String
    }
  },

  render: function render(h) {
    var data = {
      'class': 'card__media',
      style: {
        height: !isNaN(this.height) ? this.height + 'px' : this.height
      },
      on: this.$listeners
    };

    var children = [];

    if (this.src) {
      children.push(h('div', {
        'class': 'card__media__background',
        style: {
          background: 'url(' + this.src + ') center center / ' + (this.contain ? 'contain' : 'cover') + ' no-repeat'
        }
      }));
    }

    children.push(h('div', {
      'class': 'card__media__content'
    }, this.$slots.default));

    return h('div', data, children);
  }
});

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-card-title',

  functional: true,

  props: {
    primaryTitle: Boolean
  },

  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children;

    data.staticClass = ('card__title ' + (data.staticClass || '')).trim();

    if (props.primaryTitle) data.staticClass += ' card__title--primary';

    return h('div', data, children);
  }
});

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VCarousel__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VCarouselItem__ = __webpack_require__(94);
/* unused harmony reexport VCarousel */
/* unused harmony reexport VCarouselItem */





__WEBPACK_IMPORTED_MODULE_0__VCarousel__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VCarousel__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VCarousel__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VCarouselItem__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VCarouselItem__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VCarousel__["a" /* default */]);

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VBtn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_bootable__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_touch__ = __webpack_require__(8);
__webpack_require__(93);









/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-carousel',

  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_bootable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_themeable__["a" /* default */]],

  directives: { Touch: __WEBPACK_IMPORTED_MODULE_4__directives_touch__["a" /* default */] },

  data: function data() {
    return {
      inputValue: null,
      items: [],
      slideTimeout: null,
      reverse: false
    };
  },


  props: {
    cycle: {
      type: Boolean,
      default: true
    },
    hideControls: Boolean,
    icon: {
      type: String,
      default: 'fiber_manual_record'
    },
    interval: {
      type: [Number, String],
      default: 6000,
      validator: function validator(value) {
        return value > 0;
      }
    },
    leftControlIcon: {
      type: [Boolean, String],
      default: 'chevron_left'
    },
    rightControlIcon: {
      type: [Boolean, String],
      default: 'chevron_right'
    },
    value: Number
  },

  watch: {
    inputValue: function inputValue() {
      var _this = this;

      // Evaluate items when inputValue changes to account for
      // dynamic changing of children
      this.items = this.$children.filter(function (i) {
        return i.$el.classList && i.$el.classList.contains('carousel__item');
      });

      this.items.forEach(function (i) {
        return i.open(_this.items[_this.inputValue]._uid, _this.reverse);
      });

      this.$emit('input', this.inputValue);
      this.restartTimeout();
    },
    value: function value(val) {
      this.inputValue = val;
    },
    interval: function interval() {
      this.restartTimeout();
    },
    cycle: function cycle(val) {
      if (val) {
        this.restartTimeout();
      } else {
        clearTimeout(this.slideTimeout);
        this.slideTimeout = null;
      }
    }
  },

  mounted: function mounted() {
    this.init();
  },


  methods: {
    genControls: function genControls() {
      return this.$createElement('div', {
        staticClass: 'carousel__controls'
      }, this.genItems());
    },
    genIcon: function genIcon(direction, icon, fn) {
      if (!icon) return null;

      return this.$createElement('div', {
        staticClass: 'carousel__' + direction
      }, [this.$createElement(__WEBPACK_IMPORTED_MODULE_0__VBtn__["a" /* default */], {
        props: {
          icon: true,
          dark: this.dark || !this.light,
          light: this.light
        },
        on: { click: fn }
      }, [this.$createElement(__WEBPACK_IMPORTED_MODULE_1__VIcon__["a" /* default */], icon)])]);
    },
    genItems: function genItems() {
      var _this2 = this;

      return this.items.map(function (item, index) {
        return _this2.$createElement(__WEBPACK_IMPORTED_MODULE_0__VBtn__["a" /* default */], {
          class: {
            'carousel__controls__item': true,
            'carousel__controls__item--active': index === _this2.inputValue
          },
          props: {
            icon: true,
            dark: _this2.dark || !_this2.light,
            light: _this2.light
          },
          key: index,
          on: { click: _this2.select.bind(_this2, index) }
        }, [_this2.$createElement(__WEBPACK_IMPORTED_MODULE_1__VIcon__["a" /* default */], _this2.icon)]);
      });
    },
    restartTimeout: function restartTimeout() {
      this.slideTimeout && clearTimeout(this.slideTimeout);
      this.slideTimeout = null;

      var raf = requestAnimationFrame || setTimeout;
      raf(this.startTimeout);
    },
    init: function init() {
      this.inputValue = this.value || 0;
    },
    next: function next() {
      this.reverse = false;
      this.inputValue = (this.inputValue + 1) % this.items.length;
    },
    prev: function prev() {
      this.reverse = true;
      this.inputValue = (this.inputValue + this.items.length - 1) % this.items.length;
    },
    select: function select(index) {
      this.reverse = index < this.inputValue;
      this.inputValue = index;
    },
    startTimeout: function startTimeout() {
      var _this3 = this;

      if (!this.cycle) return;

      this.slideTimeout = setTimeout(function () {
        return _this3.next();
      }, this.interval > 0 ? this.interval : 6000);
    }
  },

  render: function render(h) {
    return h('div', {
      staticClass: 'carousel',
      directives: [{
        name: 'touch',
        value: {
          left: this.next,
          right: this.prev
        }
      }]
    }, [this.genIcon('left', this.leftControlIcon, this.prev), this.genIcon('right', this.rightControlIcon, this.next), this.hideControls ? null : this.genControls(), this.$slots.default]);
  }
});

/***/ }),
/* 93 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 94 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-carousel-item',

  data: function data() {
    return {
      active: false,
      reverse: false
    };
  },


  props: {
    src: {
      type: String,
      required: true
    },

    transition: {
      type: String,
      default: 'tab-transition'
    },

    reverseTransition: {
      type: String,
      default: 'tab-reverse-transition'
    }
  },

  computed: {
    computedTransition: function computedTransition() {
      return this.reverse ? this.reverseTransition : this.transition;
    },
    styles: function styles() {
      return {
        backgroundImage: 'url(' + this.src + ')'
      };
    }
  },

  methods: {
    open: function open(id, reverse) {
      this.active = this._uid === id;
      this.reverse = reverse;
    }
  },

  render: function render(h) {
    var item = h('div', {
      class: {
        'carousel__item': true,
        'reverse': this.reverse
      },
      style: this.styles,
      on: this.$listeners,
      directives: [{
        name: 'show',
        value: this.active
      }]
    }, [this.$slots.default]);

    return h('transition', { props: { name: this.computedTransition } }, [item]);
  }
});

/***/ }),
/* 95 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transitions__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_rippleable__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_selectable__ = __webpack_require__(31);
__webpack_require__(13);
__webpack_require__(20);






/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-checkbox',

  components: {
    VFadeTransition: __WEBPACK_IMPORTED_MODULE_1__transitions__["b" /* VFadeTransition */],
    VIcon: __WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_rippleable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_selectable__["a" /* default */]],

  data: function data() {
    return {
      inputIndeterminate: this.indeterminate
    };
  },


  props: {
    indeterminate: Boolean
  },

  computed: {
    classes: function classes() {
      var classes = {
        'checkbox': true,
        'input-group--selection-controls': true,
        'input-group--active': this.isActive
      };

      if (this.hasError) {
        classes['error--text'] = true;
      } else {
        return this.addTextColorClassChecks(classes);
      }

      return classes;
    },
    icon: function icon() {
      if (this.inputIndeterminate) {
        return 'indeterminate_check_box';
      } else if (this.isActive) {
        return 'check_box';
      } else {
        return 'check_box_outline_blank';
      }
    }
  },

  methods: {
    groupFocus: function groupFocus(e) {
      this.isFocused = true;
      this.$emit('focus', e);
    },
    groupBlur: function groupBlur(e) {
      this.isFocused = false;
      this.tabFocused = false;
      this.$emit('blur', this.inputValue);
    }
  },

  render: function render(h) {
    var transition = h('v-fade-transition', [h('v-icon', {
      staticClass: 'icon--selection-control',
      'class': {
        'icon--checkbox': this.icon === 'check_box'
      },
      key: this.icon
    }, this.icon)]);

    var data = {
      attrs: {
        tabindex: this.disabled ? -1 : this.internalTabIndex || this.tabindex,
        role: 'checkbox',
        'aria-checked': this.inputIndeterminate && 'mixed' || this.isActive && 'true' || 'false',
        'aria-label': this.label
      }
    };

    return this.genInputGroup([transition, this.genRipple()], data);
  }
});

/***/ }),
/* 96 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(1);


/* harmony default export */ __webpack_exports__["a"] = ({
  enter: function enter(el, done) {
    // Remove initial transition
    el.style.transition = 'none';
    Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* addOnceEventListener */])(el, 'transitionend', done);

    // Get height that is to be scrolled
    el.style.overflow = 'hidden';
    el.style.height = null;
    el.style.display = 'block';
    var height = el.clientHeight + 'px';
    el.style.height = 0;
    el.style.transition = null;

    setTimeout(function () {
      return el.style.height = height;
    }, 100);
  },
  afterEnter: function afterEnter(el) {
    el.style.height = 'auto';
    el.style.overflow = null;
  },
  leave: function leave(el, done) {
    Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* addOnceEventListener */])(el, 'transitionend', done);

    // Set height before we transition to 0
    el.style.overflow = 'hidden';
    el.style.height = el.clientHeight + 'px';

    setTimeout(function () {
      return el.style.height = 0;
    }, 100);
  }
});

/***/ }),
/* 97 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      errorBucket: [],
      hasFocused: false,
      hasInput: false,
      shouldValidate: false,
      valid: false
    };
  },


  props: {
    error: {
      type: Boolean
    },
    errorMessages: {
      type: [String, Array],
      default: function _default() {
        return [];
      }
    },
    rules: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    validateOnBlur: Boolean
  },

  computed: {
    validations: function validations() {
      if (!Array.isArray(this.errorMessages)) {
        return [this.errorMessages];
      } else if (this.errorMessages.length > 0) {
        return this.errorMessages;
      } else if (this.shouldValidate) {
        return this.errorBucket;
      } else {
        return [];
      }
    },
    hasError: function hasError() {
      return this.validations.length > 0 || this.errorMessages.length > 0 || this.error;
    }
  },

  watch: {
    rules: {
      handler: function handler(newVal, oldVal) {
        // TODO: This handler seems to trigger when input changes, even though
        // rules array stays the same? Solved it like this for now
        if (newVal.length === oldVal.length) return;

        this.validate();
      },

      deep: true
    },
    inputValue: function inputValue(val) {
      // If it's the first time we're setting input,
      // mark it with hasInput
      if (!!val && !this.hasInput) this.hasInput = true;

      if (this.hasInput && !this.validateOnBlur) this.shouldValidate = true;
    },
    isFocused: function isFocused(val) {
      // If we're not focused, and it's the first time
      // we're defocusing, set shouldValidate to true
      if (!val && !this.hasFocused) {
        this.hasFocused = true;
        this.shouldValidate = true;

        this.$emit('update:error', this.errorBucket.length > 0);
      }
    },
    hasError: function hasError(val) {
      if (this.shouldValidate) {
        this.$emit('update:error', val);
      }
    },
    error: function error(val) {
      this.shouldValidate = !!val;
    }
  },

  mounted: function mounted() {
    this.shouldValidate = !!this.error;
    this.validate();
  },


  methods: {
    reset: function reset() {
      var _this = this;

      // TODO: Do this another way!
      // This is so that we can reset all types of inputs
      this.$emit('input', this.isMultiple ? [] : null);
      this.$emit('change', null);

      this.$nextTick(function () {
        _this.shouldValidate = false;
        _this.hasFocused = false;
        _this.validate();
      });
    },
    validate: function validate() {
      var _this2 = this;

      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.inputValue;

      if (force) this.shouldValidate = true;

      this.errorBucket = [];

      this.rules.forEach(function (rule) {
        var valid = typeof rule === 'function' ? rule(value) : rule;

        if (valid !== true && !['string', 'boolean'].includes(typeof valid === 'undefined' ? 'undefined' : _typeof(valid))) {
          throw new TypeError('Rules should return a string or boolean, received \'' + (typeof valid === 'undefined' ? 'undefined' : _typeof(valid)) + '\' instead');
        }

        if (valid !== true) {
          _this2.errorBucket.push(valid);
        }
      });

      this.valid = this.errorBucket.length === 0;

      return this.valid;
    }
  }
});

/***/ }),
/* 98 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VChip__ = __webpack_require__(99);


__WEBPACK_IMPORTED_MODULE_0__VChip__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VChip__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VChip__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VChip__["a" /* default */]);

/***/ }),
/* 99 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_themeable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_toggleable__ = __webpack_require__(4);
__webpack_require__(100);






/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-chip',

  components: {
    VIcon: __WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_themeable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_toggleable__["a" /* default */]],

  props: {
    close: Boolean,
    disabled: Boolean,
    label: Boolean,
    outline: Boolean,
    // Used for selects/tagging
    selected: Boolean,
    small: Boolean,
    textColor: String,
    value: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    classes: function classes() {
      var classes = this.addBackgroundColorClassChecks({
        'chip': true,
        'chip--disabled': this.disabled,
        'chip--selected': this.selected,
        'chip--label': this.label,
        'chip--outline': this.outline,
        'chip--small': this.small,
        'chip--removable': this.close,
        'theme--light': this.light,
        'theme--dark': this.dark
      });

      return this.textColor || this.outline ? this.addTextColorClassChecks(classes, this.textColor ? 'textColor' : 'color') : classes;
    }
  },

  render: function render(h) {
    var _this = this;

    var children = [this.$slots.default];
    var data = {
      'class': this.classes,
      attrs: { tabindex: this.disabled ? -1 : 0 },
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      on: this.$listeners
    };

    if (this.close) {
      var _data = {
        staticClass: 'chip__close',
        on: {
          click: function click(e) {
            e.stopPropagation();

            _this.$emit('input', false);
          }
        }
      };

      children.push(h('div', _data, [h(__WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */], { props: { right: true } }, 'cancel')]));
    }

    return h('span', data, children);
  }
});

/***/ }),
/* 100 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 101 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VDataTable__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VEditDialog__ = __webpack_require__(126);





__WEBPACK_IMPORTED_MODULE_1__VDataTable__["a" /* default */].install = function install(Vue) {
  var VTableOverflow = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('table__overflow');

  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VDataTable__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VDataTable__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_2__VEditDialog__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__VEditDialog__["a" /* default */]);
  Vue.component('v-table-overflow', VTableOverflow);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__VDataTable__["a" /* default */]);

/***/ }),
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VBtn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VProgressLinear__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VSelect__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_filterable__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_themeable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mixins_loadable__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mixins_head__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mixins_body__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__mixins_foot__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__mixins_progress__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__util_helpers__ = __webpack_require__(1);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

__webpack_require__(103);
__webpack_require__(104);
















/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-data-table',

  components: {
    VBtn: __WEBPACK_IMPORTED_MODULE_0__VBtn__["a" /* default */],
    VIcon: __WEBPACK_IMPORTED_MODULE_1__VIcon__["a" /* default */],
    VProgressLinear: __WEBPACK_IMPORTED_MODULE_2__VProgressLinear__["a" /* default */],
    VSelect: __WEBPACK_IMPORTED_MODULE_3__VSelect__["a" /* default */],
    // Importing does not work properly
    'v-table-overflow': Object(__WEBPACK_IMPORTED_MODULE_11__util_helpers__["d" /* createSimpleFunctional */])('table__overflow')
  },

  data: function data() {
    return {
      all: false,
      searchLength: 0,
      defaultPagination: {
        descending: false,
        page: 1,
        rowsPerPage: 5,
        sortBy: null,
        totalItems: 0
      },
      expanded: {}
    };
  },


  mixins: [__WEBPACK_IMPORTED_MODULE_7__mixins_head__["a" /* default */], __WEBPACK_IMPORTED_MODULE_8__mixins_body__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_filterable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_9__mixins_foot__["a" /* default */], __WEBPACK_IMPORTED_MODULE_6__mixins_loadable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_10__mixins_progress__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__mixins_themeable__["a" /* default */]],

  props: {
    expand: {
      type: Boolean
    },
    headers: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    headerText: {
      type: String,
      default: 'text'
    },
    hideActions: Boolean,
    hideHeaders: Boolean,
    mustSort: Boolean,
    noResultsText: {
      type: String,
      default: 'No matching records found'
    },
    rowsPerPageItems: {
      type: Array,
      default: function _default() {
        return [5, 10, 25, { text: 'All', value: -1 }];
      }
    },
    rowsPerPageText: {
      type: String,
      default: 'Rows per page:'
    },
    selectAll: [Boolean, String],
    search: {
      required: false
    },
    filter: {
      type: Function,
      default: function _default(val, search) {
        return val !== null && ['undefined', 'boolean'].indexOf(typeof val === 'undefined' ? 'undefined' : _typeof(val)) === -1 && val.toString().toLowerCase().indexOf(search) !== -1;
      }
    },
    customFilter: {
      type: Function,
      default: function _default(items, search, filter) {
        search = search.toString().toLowerCase();
        return items.filter(function (i) {
          return Object.keys(i).some(function (j) {
            return filter(i[j], search);
          });
        });
      }
    },
    customSort: {
      type: Function,
      default: function _default(items, index, isDescending) {
        if (index === null) return items;

        return items.sort(function (a, b) {
          var sortA = Object(__WEBPACK_IMPORTED_MODULE_11__util_helpers__["f" /* getObjectValueByPath */])(a, index);
          var sortB = Object(__WEBPACK_IMPORTED_MODULE_11__util_helpers__["f" /* getObjectValueByPath */])(b, index);

          if (isDescending) {
            var _ref = [sortB, sortA];
            sortA = _ref[0];
            sortB = _ref[1];
          }

          // Check if both are numbers
          if (!isNaN(sortA) && !isNaN(sortB)) {
            return sortA - sortB;
          }

          // Check if both cannot be evaluated
          if (sortA === null && sortB === null) {
            return 0;
          }

          var _map = [sortA, sortB].map(function (s) {
            return (s || '').toString().toLocaleLowerCase();
          });

          var _map2 = _slicedToArray(_map, 2);

          sortA = _map2[0];
          sortB = _map2[1];


          if (sortA > sortB) return 1;
          if (sortA < sortB) return -1;

          return 0;
        });
      }
    },
    value: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    items: {
      type: Array,
      required: true,
      default: function _default() {
        return [];
      }
    },
    totalItems: {
      type: Number,
      default: null
    },
    itemKey: {
      type: String,
      default: 'id'
    },
    pagination: {
      type: Object,
      default: function _default() {}
    }
  },

  computed: {
    classes: function classes() {
      return {
        'datatable table': true,
        'datatable--select-all': this.selectAll !== false,
        'theme--dark': this.dark,
        'theme--light': this.light
      };
    },
    computedPagination: function computedPagination() {
      return this.hasPagination ? this.pagination : this.defaultPagination;
    },
    hasPagination: function hasPagination() {
      var pagination = this.pagination || {};

      return Object.keys(pagination).length > 0;
    },
    hasSelectAll: function hasSelectAll() {
      return this.selectAll !== undefined && this.selectAll !== false;
    },
    itemsLength: function itemsLength() {
      if (this.search) return this.searchLength;
      return this.totalItems || this.items.length;
    },
    indeterminate: function indeterminate() {
      return this.hasSelectAll && this.someItems && !this.everyItem;
    },
    everyItem: function everyItem() {
      var _this = this;

      return this.filteredItems.length && this.filteredItems.every(function (i) {
        return _this.isSelected(i);
      });
    },
    someItems: function someItems() {
      var _this2 = this;

      return this.filteredItems.some(function (i) {
        return _this2.isSelected(i);
      });
    },
    getPage: function getPage() {
      var rowsPerPage = this.computedPagination.rowsPerPage;


      return rowsPerPage === Object(rowsPerPage) ? rowsPerPage.value : rowsPerPage;
    },
    pageStart: function pageStart() {
      return this.getPage === -1 ? 0 : (this.computedPagination.page - 1) * this.getPage;
    },
    pageStop: function pageStop() {
      return this.getPage === -1 ? this.itemsLength : this.computedPagination.page * this.getPage;
    },
    filteredItems: function filteredItems() {
      if (this.totalItems) return this.items;

      var items = this.items.slice();
      var hasSearch = typeof this.search !== 'undefined' && this.search !== null;

      if (hasSearch) {
        items = this.customFilter(items, this.search, this.filter);
        this.searchLength = items.length;
      }

      items = this.customSort(items, this.computedPagination.sortBy, this.computedPagination.descending);

      return this.hideActions && !this.hasPagination ? items : items.slice(this.pageStart, this.pageStop);
    },
    selected: function selected() {
      var _this3 = this;

      var selected = {};
      this.value.forEach(function (i) {
        return selected[i[_this3.itemKey]] = true;
      });
      return selected;
    }
  },

  watch: {
    indeterminate: function indeterminate(val) {
      if (val) this.all = true;
    },
    someItems: function someItems(val) {
      if (!val) this.all = false;
    },
    search: function search() {
      this.updatePagination({ page: 1, totalItems: this.itemsLength });
    },
    everyItem: function everyItem(val) {
      if (val) this.all = true;
    }
  },

  methods: {
    updatePagination: function updatePagination(val) {
      var pagination = this.hasPagination ? this.pagination : this.defaultPagination;
      var updatedPagination = Object.assign({}, pagination, val);
      this.$emit('update:pagination', updatedPagination);

      if (!this.hasPagination) {
        this.defaultPagination = updatedPagination;
      }
    },
    isSelected: function isSelected(item) {
      return this.selected[item[this.itemKey]];
    },
    isExpanded: function isExpanded(item) {
      return this.expanded[item[this.itemKey]];
    },
    sort: function sort(index) {
      var _computedPagination = this.computedPagination,
          sortBy = _computedPagination.sortBy,
          descending = _computedPagination.descending;

      if (sortBy === null) {
        this.updatePagination({ sortBy: index, descending: false });
      } else if (sortBy === index && !descending) {
        this.updatePagination({ descending: true });
      } else if (sortBy !== index) {
        this.updatePagination({ sortBy: index, descending: false });
      } else if (!this.mustSort) {
        this.updatePagination({ sortBy: null, descending: null });
      } else {
        this.updatePagination({ sortBy: index, descending: false });
      }
    },
    needsTR: function needsTR(row) {
      return row.length && row.find(function (c) {
        return c.tag === 'td';
      });
    },
    genTR: function genTR(children) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.$createElement('tr', data, children);
    },
    toggle: function toggle(value) {
      var _this4 = this;

      var selected = Object.assign({}, this.selected);
      this.filteredItems.forEach(function (i) {
        return selected[i[_this4.itemKey]] = value;
      });

      this.$emit('input', this.items.filter(function (i) {
        return selected[i[_this4.itemKey]];
      }));
    }
  },

  created: function created() {
    var firstSortable = this.headers.find(function (h) {
      return !('sortable' in h) || h.sortable;
    });

    this.defaultPagination.sortBy = firstSortable ? firstSortable.value : null;

    if (!this.rowsPerPageItems.length) {
      console.warn('The prop \'rows-per-page-items\' in v-data-table can not be empty.');
    } else {
      this.defaultPagination.rowsPerPage = this.rowsPerPageItems[0];
    }

    this.defaultPagination.totalItems = this.itemsLength;

    this.updatePagination(Object.assign({}, this.defaultPagination, this.pagination));
  },
  render: function render(h) {
    return h('v-table-overflow', {}, [h('table', {
      'class': this.classes
    }, [this.genTHead(), this.genTProgress(), this.genTBody(), this.genTFoot()])]);
  }
});

/***/ }),
/* 103 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 104 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 105 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_colorable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transitions__ = __webpack_require__(5);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

__webpack_require__(106);





/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-progress-linear',

  components: {
    VFadeTransition: __WEBPACK_IMPORTED_MODULE_1__transitions__["b" /* VFadeTransition */],
    VSlideXTransition: __WEBPACK_IMPORTED_MODULE_1__transitions__["c" /* VSlideXTransition */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_colorable__["a" /* default */]],

  props: {
    active: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: null
    },
    backgroundOpacity: {
      type: [Number, String],
      default: null
    },
    bufferValue: {
      type: [Number, String],
      default: 100
    },
    color: {
      type: String,
      default: 'primary'
    },
    height: {
      type: [Number, String],
      default: 7
    },
    indeterminate: Boolean,
    query: Boolean,
    value: {
      type: [Number, String],
      default: 0
    }
  },

  computed: {
    styles: function styles() {
      var styles = {};

      if (!this.active) {
        styles.height = 0;
      }

      if (!this.indeterminate && parseInt(this.bufferValue, 10) !== 100) {
        styles.width = this.bufferValue + '%';
      }

      return styles;
    },
    effectiveWidth: function effectiveWidth() {
      if (!this.bufferValue) {
        return 0;
      }

      return this.value * 100 / this.bufferValue;
    },
    bufferStyles: function bufferStyles() {
      var styles = {};

      if (!this.active) {
        styles.height = 0;
      }

      return styles;
    },
    backgroundStyle: function backgroundStyle() {
      var backgroundOpacity = this.backgroundOpacity == null ? this.backgroundColor ? 1 : 0.3 : parseFloat(this.backgroundOpacity);

      return {
        height: this.active ? 'auto' : 0,
        opacity: backgroundOpacity,
        width: this.bufferValue + '%'
      };
    }
  },

  methods: {
    genDeterminate: function genDeterminate(h) {
      return h('div', {
        ref: 'front',
        staticClass: 'progress-linear__bar__determinate',
        class: this.addBackgroundColorClassChecks({}),
        style: {
          width: this.effectiveWidth + '%'
        }
      });
    },
    genBar: function genBar(h, name) {
      return h('div', {
        staticClass: 'progress-linear__bar__indeterminate',
        class: this.addBackgroundColorClassChecks(_defineProperty({}, name, true))
      });
    },
    genIndeterminate: function genIndeterminate(h) {
      return h('div', {
        ref: 'front',
        staticClass: 'progress-linear__bar__indeterminate',
        class: {
          'progress-linear__bar__indeterminate--active': this.active
        }
      }, [this.genBar(h, 'long'), this.genBar(h, 'short')]);
    }
  },

  render: function render(h) {
    var fade = h('v-fade-transition', [this.indeterminate && this.genIndeterminate(h)]);
    var slide = h('v-slide-x-transition', [!this.indeterminate && this.genDeterminate(h)]);

    var bar = h('div', {
      staticClass: 'progress-linear__bar',
      style: this.styles
    }, [fade, slide]);
    var background = h('div', {
      staticClass: 'progress-linear__background',
      class: [this.backgroundColor || this.color],
      style: this.backgroundStyle
    });

    return h('div', {
      staticClass: 'progress-linear',
      class: {
        'progress-linear--query': this.query
      },
      style: {
        height: this.height + 'px'
      },
      on: this.$listeners
    }, [background, bar]);
  }
});

/***/ }),
/* 106 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VCard__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VCheckbox__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VList__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VMenu__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__VBtn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_colorable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mixins_dependent__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mixins_filterable__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mixins_input__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__mixins_maskable__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__mixins_select_autocomplete__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__mixins_select_generators__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__directives_click_outside__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__util_helpers__ = __webpack_require__(1);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

__webpack_require__(35);
__webpack_require__(13);
__webpack_require__(108);

// Components






// Mixins






// Component level mixins



// Directives


// Helpers


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-select',

  inheritAttrs: false,

  components: {
    VCard: __WEBPACK_IMPORTED_MODULE_0__VCard__["a" /* default */],
    VCheckbox: __WEBPACK_IMPORTED_MODULE_1__VCheckbox__["a" /* default */],
    VList: __WEBPACK_IMPORTED_MODULE_2__VList__["a" /* VList */],
    VListTile: __WEBPACK_IMPORTED_MODULE_2__VList__["b" /* VListTile */],
    VListTileAction: __WEBPACK_IMPORTED_MODULE_2__VList__["c" /* VListTileAction */],
    VListTileContent: __WEBPACK_IMPORTED_MODULE_2__VList__["d" /* VListTileContent */],
    VListTileTitle: __WEBPACK_IMPORTED_MODULE_2__VList__["e" /* VListTileTitle */],
    VMenu: __WEBPACK_IMPORTED_MODULE_3__VMenu__["a" /* default */],
    VBtn: __WEBPACK_IMPORTED_MODULE_4__VBtn__["a" /* default */]
  },

  directives: {
    ClickOutside: __WEBPACK_IMPORTED_MODULE_12__directives_click_outside__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_10__mixins_select_autocomplete__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_6__mixins_dependent__["a" /* default */], __WEBPACK_IMPORTED_MODULE_7__mixins_filterable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_11__mixins_select_generators__["a" /* default */], __WEBPACK_IMPORTED_MODULE_8__mixins_input__["a" /* default */], __WEBPACK_IMPORTED_MODULE_9__mixins_maskable__["a" /* default */]],

  data: function data() {
    return {
      cachedItems: [],
      content: {},
      inputValue: (this.multiple || this.tags) && !this.value ? [] : this.value,
      isBooted: false,
      lastItem: 20,
      lazySearch: null,
      isActive: false,
      menuIsActive: false,
      searchTimeout: null,
      selectedIndex: -1,
      selectedItems: [],
      shouldBreak: false
    };
  },


  props: {
    appendIcon: {
      type: String,
      default: 'arrow_drop_down'
    },
    appendIconCb: Function,
    auto: Boolean,
    autocomplete: Boolean,
    cacheItems: Boolean,
    chips: Boolean,
    clearable: Boolean,
    color: {
      type: String,
      default: 'primary'
    },
    combobox: Boolean,
    debounceSearch: {
      type: [Number, String],
      default: 200
    },
    browserAutocomplete: {
      type: String,
      default: 'on'
    },
    items: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    itemAvatar: {
      type: String,
      default: 'avatar'
    },
    itemText: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    itemDisabled: {
      type: String,
      default: 'disabled'
    },
    maxHeight: {
      type: [Number, String],
      default: 300
    },
    minWidth: {
      type: [Boolean, Number, String],
      default: false
    },
    multiple: Boolean,
    multiLine: Boolean,
    solo: Boolean,
    searchInput: {
      default: null
    },
    singleLine: Boolean,
    tags: Boolean,
    returnObject: Boolean,
    overflow: Boolean,
    segmented: Boolean,
    editable: Boolean
  },

  computed: {
    classes: function classes() {
      var classes = {
        'input-group--text-field input-group--select': true,
        'input-group--auto': this.auto,
        'input-group--overflow': this.overflow,
        'input-group--segmented': this.segmented,
        'input-group--editable': this.editable,
        'input-group--autocomplete': this.isAutocomplete,
        'input-group--single-line': this.singleLine || this.isDropdown,
        'input-group--multi-line': this.multiLine,
        'input-group--chips': this.chips,
        'input-group--solo': this.solo,
        'input-group--multiple': this.multiple
      };

      if (this.hasError) {
        classes['error--text'] = true;
      } else {
        return this.addTextColorClassChecks(classes);
      }

      return classes;
    },
    computedContentClass: function computedContentClass() {
      var children = ['menu__content--select', this.auto ? 'menu__content--auto' : '', this.isDropdown ? 'menu__content--dropdown' : '', this.isAutocomplete ? 'menu__content--autocomplete' : ''];

      return children.join(' ');
    },
    computedItems: function computedItems() {
      return this.filterDuplicates(this.cachedItems.concat(this.items));
    },

    /**
     * The range of the current input text
     *
     * @return {Number}
     */
    currentRange: function currentRange() {
      return this.getText(this.selectedItem || '').length;
    },
    filteredItems: function filteredItems() {
      // If we are not actively filtering
      // Show all available items
      var items = this.isNotFiltering ? this.computedItems : this.filterSearch();

      return !this.auto ? items.slice(0, this.lastItem) : items;
    },
    hideSelections: function hideSelections() {
      return this.isAutocomplete && !this.isMultiple && this.isFocused && !this.chips;
    },
    isNotFiltering: function isNotFiltering() {
      return this.isAutocomplete && this.isDirty && this.searchValue === this.getText(this.selectedItem);
    },
    isAutocomplete: function isAutocomplete() {
      return this.autocomplete || this.editable || this.tags || this.combobox;
    },
    isDirty: function isDirty() {
      return this.selectedItems.length > 0;
    },
    isDropdown: function isDropdown() {
      return this.segmented || this.overflow || this.editable || this.solo;
    },
    isMultiple: function isMultiple() {
      return this.multiple || this.tags;
    },

    searchValue: {
      get: function get() {
        return this.lazySearch;
      },
      set: function set(val) {
        var _this = this;

        if (!this.isAutocomplete || this.selectedIndex > -1) return;

        this.lazySearch = val;

        clearTimeout(this.searchTimeout);

        this.searchTimeout = setTimeout(function () {
          _this.$emit('update:searchInput', val);
        }, this.debounceSearch);
      }
    },
    selectedItem: function selectedItem() {
      var _this2 = this;

      if (this.isMultiple) return null;

      return this.selectedItems.find(function (i) {
        return _this2.getValue(i) === _this2.getValue(_this2.inputValue);
      }) || null;
    }
  },

  watch: {
    inputValue: function inputValue(val) {
      // Populate selected items
      this.genSelectedItems(val);

      this.$emit('input', val);

      // When inputValue is changed
      // and combobox is true set
      // menu property to false
      if (this.combobox) this.menuIsActive = false;
    },
    isActive: function isActive(val) {
      if (!val) {
        this.searchValue = null;
        this.menuIsActive = false;
        this.isFocused = false;
        this.selectedIndex = -1;
      } else {
        this.searchValue = this.getText(this.selectedItem);
      }

      // this.lastItem += !val ? 20 : 0
    },
    isBooted: function isBooted() {
      var _this3 = this;

      this.$nextTick(function () {
        if (_this3.content && _this3.content.addEventListener) {
          _this3.content.addEventListener('scroll', _this3.onScroll, false);
        }
      });
    },
    isFocused: function isFocused(val) {
      var _this4 = this;

      // When focusing the input
      // re-set the caret position
      if (this.isAutocomplete && !this.mask && !this.isMultiple && val) {
        this.setCaretPosition(this.currentRange);
        this.shouldBreak && this.$nextTick(function () {
          _this4.$refs.input.scrollLeft = _this4.$refs.input.scrollWidth;
        });
      }
    },
    items: function items(val) {
      var _this5 = this;

      if (this.cacheItems) {
        this.cachedItems = this.filterDuplicates(this.cachedItems.concat(val));
      }

      this.$refs.menu.listIndex = -1;

      this.searchValue && this.$nextTick(function () {
        _this5.$refs.menu && (_this5.$refs.menu.listIndex = 0);
      });

      this.genSelectedItems();
    },
    menuIsActive: function menuIsActive(val) {
      if (!val) return;

      this.isBooted = true;
      this.isActive = true;
    },
    isMultiple: function isMultiple(val) {
      this.inputValue = val ? [] : null;
    },
    searchInput: function searchInput(val) {
      this.searchValue = val;
    },
    searchValue: function searchValue(val) {
      var _this6 = this;

      // Wrap input to next line if overflowing
      if (this.$refs.input.scrollWidth > this.$refs.input.clientWidth) {
        this.shouldBreak = true;
        this.$nextTick(this.$refs.menu.updateDimensions);
      } else if (val === null) {
        this.shouldBreak = false;
      }

      // Activate menu if inactive and searching
      if (this.isActive && !this.menuIsActive && val !== this.getValue(this.selectedItem)) {
        this.menuIsActive = true;
      }

      this.$refs.menu.listIndex = null;

      this.$nextTick(function () {
        _this6.$refs.menu && (_this6.$refs.menu.listIndex = val ? 0 : -1);
      });
    },
    selectedItems: function selectedItems() {
      clearTimeout(this.searchTimeout);

      if (this.isAutocomplete) {
        this.$nextTick(this.$refs.menu.updateDimensions);
      }
    },
    value: function value(val) {
      this.inputValue = val;
      this.validate();
    }
  },

  mounted: function mounted() {
    // If instance is being destroyed
    // do not run mounted functions
    if (this._isDestroyed) return;

    // Evaluate the selected items immediately
    // to avoid a unnecessary label transition
    this.genSelectedItems();

    this.content = this.$refs.menu.$refs.content;
  },
  beforeDestroy: function beforeDestroy() {
    if (this.isBooted) {
      if (this.content) {
        this.content.removeEventListener('scroll', this.onScroll, false);
      }
    }
  },


  methods: {
    blur: function blur() {
      var _this7 = this;

      this.$emit('blur');
      if (this.isAutocomplete && this.$refs.input) this.$refs.input.blur();
      this.$nextTick(function () {
        return _this7.isActive = false;
      });
    },
    changeSelectedIndex: function changeSelectedIndex(keyCode) {
      // backspace, left, right, delete
      if (![8, 37, 39, 46].includes(keyCode)) return;

      var indexes = this.selectedItems.length - 1;

      if (keyCode === 37) {
        // Left arrow
        this.selectedIndex = this.selectedIndex === -1 ? indexes : this.selectedIndex - 1;
      } else if (keyCode === 39) {
        // Right arrow
        this.selectedIndex = this.selectedIndex >= indexes ? -1 : this.selectedIndex + 1;
      } else if (this.selectedIndex === -1) {
        this.selectedIndex = indexes;
        return;
      }

      // backspace/delete
      if ([8, 46].includes(keyCode)) {
        var newIndex = this.selectedIndex === indexes ? this.selectedIndex - 1 : this.selectedItems[this.selectedIndex + 1] ? this.selectedIndex : -1;

        this.selectItem(this.selectedItems[this.selectedIndex]);
        this.selectedIndex = newIndex;
      }
    },
    compareObjects: function compareObjects(a, b) {
      var aProps = Object.keys(a);
      var bProps = Object.keys(b);

      if (aProps.length !== bProps.length) return false;

      for (var i = 0, length = aProps.length; i < length; i++) {
        var propName = aProps[i];

        if (a[propName] !== b[propName]) return false;
      }

      return true;
    },
    filterDuplicates: function filterDuplicates(arr) {
      var values = arr.map(this.getValue);
      return arr.filter(function (el, i) {
        return i === values.indexOf(values[i]);
      });
    },
    focus: function focus() {
      this.isActive = true;
      this.isFocused = true;

      if (this.$refs.input && this.isAutocomplete) {
        this.$refs.input.focus();
      } else {
        this.$el.focus();
      }

      this.$emit('focus');
    },
    genDirectives: function genDirectives() {
      var _this8 = this;

      return [{
        name: 'click-outside',
        value: function value(e) {
          return _this8.$refs.menu && !_this8.$refs.menu.$refs.content.contains(e.target);
        }
      }];
    },
    genListeners: function genListeners() {
      var _this9 = this;

      var listeners = Object.assign({}, this.$listeners);
      delete listeners.input;

      return _extends({}, listeners, {
        click: function click() {
          if (_this9.disabled || _this9.readonly) return;
          _this9.showMenuItems();
          _this9.selectedIndex = -1;
        },
        focus: function focus() {
          if (_this9.disabled || _this9.readonly) return;

          !_this9.isFocused && _this9.focus();
        },
        keydown: this.onKeyDown // Located in mixins/select-autocomplete.js
      });
    },
    genLabel: function genLabel() {
      var singleLine = this.singleLine || this.isDropdown;
      if (singleLine && this.isDirty || singleLine && this.isFocused && this.searchValue) return null;

      var data = {};

      if (this.id) data.attrs = { for: this.id };

      return this.$createElement('label', data, this.$slots.label || this.label);
    },
    getPropertyFromItem: function getPropertyFromItem(item, field) {
      if (item !== Object(item)) return item;

      var value = Object(__WEBPACK_IMPORTED_MODULE_13__util_helpers__["f" /* getObjectValueByPath */])(item, field);

      return typeof value === 'undefined' ? item : value;
    },
    genSelectedItems: function genSelectedItems() {
      var _this10 = this;

      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.inputValue;

      // If we are using tags, don't filter results
      if (this.tags) return this.selectedItems = val;

      // Combobox is the single version
      // of a taggable select element
      if (this.combobox) return this.selectedItems = val ? [val] : [];

      var selectedItems = this.computedItems.filter(function (i) {
        if (!_this10.isMultiple) {
          return _this10.getValue(i) === _this10.getValue(val);
        } else {
          // Always return Boolean
          return val.find(function (j) {
            var a = _this10.getValue(j);
            var b = _this10.getValue(i);

            if (a !== Object(a)) return a === b;

            return _this10.compareObjects(a, b);
          }) !== undefined;
        }
      });

      if (!selectedItems.length && val != null && this.tags) {
        selectedItems = Array.isArray(val) ? val : [val];
      }

      this.selectedItems = selectedItems;
    },
    getText: function getText(item) {
      return this.getPropertyFromItem(item, this.itemText);
    },
    getValue: function getValue(item) {
      return this.getPropertyFromItem(item, this.itemValue);
    },
    clearableCallback: function clearableCallback() {
      var inputValue = this.isMultiple ? [] : null;

      this.inputValue = inputValue;
      this.searchValue = null;
      this.$emit('change', inputValue);
      this.genSelectedItems();
      this.showMenu();
    },
    showMenu: function showMenu() {
      this.showMenuItems();
      this.isAutocomplete && this.focus();
    },
    onScroll: function onScroll() {
      var _this11 = this;

      if (!this.isActive) {
        requestAnimationFrame(function () {
          return _this11.content.scrollTop = 0;
        });
      } else {
        if (this.lastItem >= this.computedItems.length) return;

        var showMoreItems = this.content.scrollHeight - (this.content.scrollTop + this.content.clientHeight) < 200;

        if (showMoreItems) {
          this.lastItem += 20;
        }
      }
    },
    selectItem: function selectItem(item) {
      var _this12 = this;

      if (!this.isMultiple) {
        this.inputValue = this.returnObject ? item : this.getValue(item);
        this.selectedItems = [item];
      } else {
        var selectedItems = [];
        var inputValue = this.inputValue.slice();
        var i = this.inputValue.findIndex(function (i) {
          var a = _this12.getValue(i);
          var b = _this12.getValue(item);

          if (a !== Object(a)) return a === b;

          return _this12.compareObjects(a, b);
        });

        i !== -1 && inputValue.splice(i, 1) || inputValue.push(item);
        this.inputValue = inputValue.map(function (i) {
          selectedItems.push(i);
          return _this12.returnObject ? i : _this12.getValue(i);
        });

        this.selectedItems = selectedItems;
      }

      this.searchValue = !this.isMultiple || this.chips ? this.getText(this.selectedItem) : '';

      this.$emit('change', this.inputValue);

      // List tile will re-render, reset index to
      // maintain highlighting
      var savedIndex = this.$refs.menu.listIndex;
      this.$refs.menu.listIndex = -1;

      // After selecting an item
      // refocus the input and
      // reset the caret pos
      this.$nextTick(function () {
        _this12.focus();
        _this12.setCaretPosition(_this12.currentRange);
        _this12.$refs.menu && (_this12.$refs.menu.listIndex = savedIndex);
      });
    },
    showMenuItems: function showMenuItems() {
      this.isActive = true;
      this.menuIsActive = true;
      this.chips && (this.$refs.menu.listIndex = -1);
    }
  },

  render: function render(h) {
    var _this13 = this;

    var data = {
      attrs: _extends({
        tabindex: this.isAutocomplete || this.disabled ? -1 : this.tabindex
      }, this.isAutocomplete ? null : this.$attrs, {
        role: this.isAutocomplete ? null : 'combobox'
      })
    };

    if (!this.isAutocomplete) {
      data.on = this.genListeners();
      data.directives = this.genDirectives();
    } else {
      data.on = {
        click: function click() {
          if (_this13.disabled || _this13.readonly) return;

          // Workaround for clicking select
          // when using autocomplete
          // and click doesn't target the input
          setTimeout(function () {
            if (_this13.menuIsActive) return;

            _this13.focus();
            _this13.menuIsActive = true;
          }, 100);
        }
      };
    }

    return this.genInputGroup([this.genSelectionsAndSearch(), this.genMenu()], data, function () {
      return _this13.showMenu();
    });
  }
});

/***/ }),
/* 108 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 109 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__ = __webpack_require__(0);
__webpack_require__(110);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-list',

  provide: function provide() {
    return {
      listClick: this.listClick,
      listClose: this.listClose
    };
  },


  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_themeable__["a" /* default */]],

  data: function data() {
    return {
      uid: null,
      groups: []
    };
  },


  props: {
    dense: Boolean,
    subheader: Boolean,
    threeLine: Boolean,
    twoLine: Boolean
  },

  computed: {
    classes: function classes() {
      return {
        'list': true,
        'list--two-line': this.twoLine,
        'list--dense': this.dense,
        'list--three-line': this.threeLine,
        'list--subheader': this.subheader,
        'theme--dark dark--bg': this.dark,
        'theme--light light--bg': this.light
      };
    }
  },

  watch: {
    uid: function uid() {
      var _this = this;

      this.$children.filter(function (i) {
        return i.$options._componentTag === 'v-list-group';
      }).forEach(function (i) {
        return i.toggle(_this.uid);
      });
    }
  },

  methods: {
    listClick: function listClick(uid, force) {
      if (force) {
        this.uid = uid;
      } else {
        this.uid = this.uid === uid ? null : uid;
      }
    },
    listClose: function listClose(uid) {
      if (this.uid === uid) {
        this.uid = null;
      }
    }
  },

  render: function render(h) {
    var data = {
      'class': this.classes,
      attrs: { 'data-uid': this._uid }
    };

    return h('ul', data, [this.$slots.default]);
  }
});

/***/ }),
/* 110 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transitions__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_bootable__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__ = __webpack_require__(4);





/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-list-group',

  inject: ['listClick', 'listClose'],

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_bootable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__["a" /* default */]],

  props: {
    group: String,
    noAction: Boolean
  },

  computed: {
    classes: function classes() {
      return {
        'list--group__header': true,
        'list--group__header--active': this.isActive,
        'list--group__header--no-action': this.noAction
      };
    }
  },

  watch: {
    isActive: function isActive() {
      this.isBooted = true;

      if (!this.isActive) {
        this.listClose(this._uid);
      }
    },
    $route: function $route(to) {
      var isActive = this.matchRoute(to.path);

      if (this.group) {
        if (isActive && this.isActive !== isActive) {
          this.listClick(this._uid);
        }
        this.isActive = isActive;
      }
    }
  },

  mounted: function mounted() {
    this.isBooted = this.isActive;

    if (this.group) {
      this.isActive = this.matchRoute(this.$route.path);
    }

    if (this.isActive) {
      this.listClick(this._uid);
    }
  },


  methods: {
    click: function click() {
      var _this = this;

      if (!this.$refs.item.querySelector('.list__tile--disabled')) {
        requestAnimationFrame(function () {
          return _this.listClick(_this._uid);
        });
      }
    },
    toggle: function toggle(uid) {
      this.isActive = this._uid === uid;
    },
    matchRoute: function matchRoute(to) {
      if (!this.group) return false;
      return to.match(this.group) !== null;
    }
  },

  render: function render(h) {
    var group = h('ul', {
      'class': 'list list--group',
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      ref: 'group'
    }, this.showLazyContent(this.$slots.default));

    var item = h('div', {
      'class': this.classes,
      on: Object.assign({}, { click: this.click }, this.$listeners),
      ref: 'item'
    }, [this.$slots.item]);

    var transition = h(__WEBPACK_IMPORTED_MODULE_0__transitions__["a" /* VExpandTransition */], [group]);

    return h('div', { 'class': 'list--group__container' }, [item, transition]);
  }
});

/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_routable__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_ripple__ = __webpack_require__(9);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-list-tile',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_routable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_toggleable__["a" /* default */]],

  directives: {
    Ripple: __WEBPACK_IMPORTED_MODULE_2__directives_ripple__["a" /* default */]
  },

  inheritAttrs: false,

  props: {
    activeClass: {
      type: String,
      default: 'list__tile--active'
    },
    avatar: Boolean,
    inactive: Boolean,
    tag: String
  },

  computed: {
    classes: function classes() {
      return _defineProperty({
        'list__tile': true,
        'list__tile--link': this.isLink && !this.inactive,
        'list__tile--avatar': this.avatar,
        'list__tile--disabled': this.disabled
      }, this.activeClass, this.isActive);
    },
    isLink: function isLink() {
      return this.href || this.to || this.$listeners && (this.$listeners.click || this.$listeners['!click']);
    }
  },

  render: function render(h) {
    var isRouteLink = !this.inactive && this.isLink;

    var _ref2 = isRouteLink ? this.generateRouteLink() : {
      tag: this.tag || 'div',
      data: {
        class: this.classes
      }
    },
        tag = _ref2.tag,
        data = _ref2.data;

    data.attrs = Object.assign({}, data.attrs, this.$attrs);

    return h('li', {
      attrs: {
        disabled: this.disabled
      },
      on: _extends({}, this.$listeners)
    }, [h(tag, data, this.$slots.default)]);
  }
});

/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  functional: true,

  name: 'v-list-tile-action',

  render: function render(h, _ref) {
    var data = _ref.data,
        children = _ref.children;

    data.staticClass = data.staticClass ? 'list__tile__action ' + (data.staticClass || '') : 'list__tile__action';
    if ((children || []).length > 1) data.staticClass += ' list__tile__action--stack';

    return h('div', data, children);
  }
});

/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_delayable__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_dependent__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_detachable__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_menuable_js__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_toggleable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_menu_activator__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mixins_menu_generators__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__mixins_menu_keyable__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__mixins_menu_position__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__directives_click_outside__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__directives_resize__ = __webpack_require__(7);
__webpack_require__(115);

// Mixins






// Component level mixins





// Directives



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-menu',

  mixins: [__WEBPACK_IMPORTED_MODULE_5__mixins_menu_activator__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_dependent__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__mixins_delayable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_detachable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_6__mixins_menu_generators__["a" /* default */], __WEBPACK_IMPORTED_MODULE_7__mixins_menu_keyable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_menuable_js__["a" /* default */], __WEBPACK_IMPORTED_MODULE_8__mixins_menu_position__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_toggleable__["a" /* default */]],

  directives: {
    ClickOutside: __WEBPACK_IMPORTED_MODULE_9__directives_click_outside__["a" /* default */],
    Resize: __WEBPACK_IMPORTED_MODULE_10__directives_resize__["a" /* default */]
  },

  data: function data() {
    return {
      defaultOffset: 8,
      maxHeightAutoDefault: '200px',
      startIndex: 3,
      stopIndex: 0,
      hasJustFocused: false,
      resizeTimeout: null
    };
  },


  props: {
    auto: Boolean,
    closeOnClick: {
      type: Boolean,
      default: true
    },
    closeOnContentClick: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    fullWidth: Boolean,
    maxHeight: { default: 'auto' },
    offsetX: Boolean,
    offsetY: Boolean,
    openOnClick: {
      type: Boolean,
      default: true
    },
    openOnHover: Boolean,
    origin: {
      type: String,
      default: 'top left'
    },
    transition: {
      type: [Boolean, String],
      default: 'menu-transition'
    }
  },

  computed: {
    calculatedLeft: function calculatedLeft() {
      var left = this.calcLeft;
      if (this.auto) left = this.calcLeftAuto;

      return this.calcXOverflow(left()) + 'px';
    },
    calculatedMaxHeight: function calculatedMaxHeight() {
      return this.auto ? '200px' : isNaN(this.maxHeight) ? this.maxHeight : this.maxHeight + 'px';
    },
    calculatedMaxWidth: function calculatedMaxWidth() {
      return isNaN(this.maxWidth) ? this.maxWidth : this.maxWidth + 'px';
    },
    calculatedMinWidth: function calculatedMinWidth() {
      if (this.minWidth) {
        return isNaN(this.minWidth) ? this.minWidth : this.minWidth + 'px';
      }

      var minWidth = this.dimensions.activator.width + this.nudgeWidth + (this.auto ? 16 : 0);

      var calculatedMaxWidth = isNaN(parseInt(this.calculatedMaxWidth)) ? minWidth : parseInt(this.calculatedMaxWidth);

      return Math.min(calculatedMaxWidth, minWidth) + 'px';
    },
    calculatedTop: function calculatedTop() {
      var top = this.auto ? this.calcTopAuto : this.calcTop;

      return this.calcYOverflow(top()) + 'px';
    },
    styles: function styles() {
      return {
        maxHeight: this.calculatedMaxHeight,
        minWidth: this.calculatedMinWidth,
        maxWidth: this.calculatedMaxWidth,
        top: this.calculatedTop,
        left: this.calculatedLeft,
        transformOrigin: this.origin,
        zIndex: this.zIndex || this.activeZIndex
      };
    }
  },

  watch: {
    activator: function activator(newActivator, oldActivator) {
      this.removeActivatorEvents(oldActivator);
      this.addActivatorEvents(newActivator);
    },
    isContentActive: function isContentActive(val) {
      this.hasJustFocused = val;
    }
  },

  methods: {
    activate: function activate() {
      // This exists primarily for v-select
      // helps determine which tiles to activate
      this.getTiles();
      // Update coordinates and dimensions of menu
      // and its activator
      this.updateDimensions();
      // Start the transition
      requestAnimationFrame(this.startTransition);
      // Once transitioning, calculate scroll position
      setTimeout(this.calculateScroll, 50);
    },
    onResize: function onResize() {
      if (!this.isActive) return;

      // Account for screen resize
      // and orientation change
      this.$refs.content.offsetWidth;
      this.updateDimensions();

      // When resizing to a smaller width
      // content width is evaluated before
      // the new activator width has been
      // set, causing it to not size properly
      // hacky but will revisit in the future
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(this.updateDimensions, 100);
    }
  },

  render: function render(h) {
    var data = {
      staticClass: 'menu',
      class: {
        'menu--disabled': this.disabled
      },
      style: {
        display: this.fullWidth ? 'block' : 'inline-block'
      },
      directives: [{
        name: 'resize',
        value: {
          debounce: 500,
          value: this.onResize
        }
      }],
      on: {
        keydown: this.changeListIndex
      }
    };

    return h('div', data, [this.genActivator(), this.genTransition()]);
  }
});

/***/ }),
/* 115 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Menu activator
 *
 * @mixin
 *
 * Handles the click and hover activation
 * Supports slotted and detached activators
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    activatorClickHandler: function activatorClickHandler(e) {
      if (this.disabled) return;
      if (this.openOnClick && !this.isActive) {
        this.getActivator().focus();
        this.isActive = true;
        this.absoluteX = e.clientX;
        this.absoluteY = e.clientY;
      } else if (this.closeOnClick && this.isActive) {
        this.getActivator().blur();
        this.isActive = false;
      }
    },
    mouseEnterHandler: function mouseEnterHandler(e) {
      var _this = this;

      this.runDelay('open', function () {
        if (_this.hasJustFocused) return;

        _this.hasJustFocused = true;
        _this.isActive = true;
      });
    },
    mouseLeaveHandler: function mouseLeaveHandler(e) {
      var _this2 = this;

      // Prevent accidental re-activation
      this.runDelay('close', function () {
        if (_this2.$refs.content.contains(e.relatedTarget)) return;

        requestAnimationFrame(function () {
          _this2.isActive = false;
          _this2.callDeactivate();
        });
      });
    },
    addActivatorEvents: function addActivatorEvents() {
      var activator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!activator) return;
      activator.addEventListener('click', this.activatorClickHandler);
    },
    removeActivatorEvents: function removeActivatorEvents() {
      var activator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!activator) return;
      activator.removeEventListener('click', this.activatorClickHandler);
    }
  }
});

/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Menu generators
 *
 * @mixin
 *
 * Used for creating the DOM elements for VMenu
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genActivator: function genActivator() {
      if (!this.$slots.activator) return null;

      var options = {
        staticClass: 'menu__activator',
        'class': {
          'menu__activator--active': this.hasJustFocused || this.isActive
        },
        ref: 'activator',
        on: {}
      };

      if (this.openOnHover) {
        options.on['mouseenter'] = this.mouseEnterHandler;
        options.on['mouseleave'] = this.mouseLeaveHandler;
      } else if (this.openOnClick) {
        options.on['click'] = this.activatorClickHandler;
      }

      return this.$createElement('div', options, this.$slots.activator);
    },
    genTransition: function genTransition() {
      if (!this.transition) return this.genContent();

      return this.$createElement('transition', {
        props: {
          name: this.transition
        }
      }, [this.genContent()]);
    },
    genDirectives: function genDirectives() {
      var _this = this;

      // Do not add click outside for hover menu
      var directives = !this.openOnHover ? [{
        name: 'click-outside',
        value: {
          callback: function callback() {
            return _this.closeOnClick;
          },
          include: function include() {
            return [_this.$el].concat(_toConsumableArray(_this.getOpenDependentElements()));
          }
        }
      }] : [];

      directives.push({
        name: 'show',
        value: this.isContentActive
      });

      return directives;
    },
    genContent: function genContent() {
      var _this2 = this;

      var options = {
        'class': [('menu__content ' + this.contentClass).trim(), { 'menuable__content__active': this.isActive }],
        style: this.styles,
        directives: this.genDirectives(),
        ref: 'content',
        on: {
          click: function click(e) {
            e.stopPropagation();
            if (e.target.getAttribute('disabled')) return;
            if (_this2.closeOnContentClick) _this2.isActive = false;
          }
        }
      };

      !this.disabled && this.openOnHover && (options.on.mouseenter = this.mouseEnterHandler);
      this.openOnHover && (options.on.mouseleave = this.mouseLeaveHandler);

      return this.$createElement('div', options, this.showLazyContent(this.$slots.default));
    }
  }
});

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Menu keyable
 *
 * @mixin
 *
 * Primarily used to support VSelect
 * Handles opening and closing of VMenu from keystrokes
 * Will conditionally highlight VListTiles for VSelect
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      listIndex: -1,
      tiles: []
    };
  },

  watch: {
    isActive: function isActive(val) {
      if (!val) this.listIndex = -1;
    },
    listIndex: function listIndex(next, prev) {
      // For infinite scroll and autocomplete, re-evaluate children
      this.getTiles();

      if (next in this.tiles) {
        this.tiles[next].classList.add('list__tile--highlighted');
        this.$refs.content.scrollTop = next * 48;
      }

      prev in this.tiles && this.tiles[prev].classList.remove('list__tile--highlighted');
    }
  },

  methods: {
    changeListIndex: function changeListIndex(e) {
      // Up, Down, Enter, Space
      if ([40, 38, 13].includes(e.keyCode) || e.keyCode === 32 && !this.isActive) {
        e.preventDefault();
      }

      // Esc, Tab
      if ([27, 9].includes(e.keyCode)) return this.isActive = false;else if (!this.isActive &&
      // Enter, Space
      [13, 32].includes(e.keyCode) && this.openOnClick) {
        return this.isActive = true;
      }

      // Down
      if (e.keyCode === 40 && this.listIndex < this.tiles.length - 1) {
        this.listIndex++;
        // Up
      } else if (e.keyCode === 38 && this.listIndex > 0) {
        this.listIndex--;
        // Enter
      } else if (e.keyCode === 13 && this.listIndex !== -1) {
        this.tiles[this.listIndex].click();
      }
    },
    getTiles: function getTiles() {
      this.tiles = this.$refs.content.querySelectorAll('.list__tile');
    }
  }
});

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Menu position
 * 
 * @mixin
 *
 * Used for calculating an automatic position (used for VSelect)
 * Will position the VMenu content properly over the VSelect
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    // Revisit this
    calculateScroll: function calculateScroll() {
      if (this.selectedIndex === null) return;

      var scrollTop = 0;

      if (this.selectedIndex >= this.stopIndex) {
        scrollTop = this.$refs.content.scrollHeight;
      } else if (this.selectedIndex > this.startIndex) {
        scrollTop = this.selectedIndex * (this.defaultOffset * 6) - this.defaultOffset * 7;
      }

      this.$refs.content.scrollTop = scrollTop;
    },
    calcLeftAuto: function calcLeftAuto() {
      var a = this.dimensions.activator;

      return parseInt(a.left - this.defaultOffset * 2);
    },
    calcTopAuto: function calcTopAuto() {
      if (!this.hasActivator) return this.calcTop();

      var selectedIndex = Array.from(this.tiles).findIndex(function (n) {
        return n.classList.contains('list__tile--active');
      });

      if (selectedIndex === -1) {
        this.selectedIndex = null;

        return this.calcTop();
      }

      this.selectedIndex = selectedIndex;
      var actingIndex = selectedIndex;

      var offsetPadding = -(this.defaultOffset * 2);
      // #708 Stop index should vary by tile length
      this.stopIndex = this.tiles.length > 4 ? this.tiles.length - 4 : this.tiles.length;

      if (selectedIndex > this.startIndex && selectedIndex < this.stopIndex) {
        actingIndex = 2;
        offsetPadding = this.defaultOffset * 3;
      } else if (selectedIndex >= this.stopIndex) {
        offsetPadding = -this.defaultOffset;
        actingIndex = selectedIndex - this.stopIndex;
      }

      // Is always off by 1 pixel, send help (┛ಠ_ಠ)┛彡┻━┻
      offsetPadding--;

      return this.calcTop() + offsetPadding - actingIndex * (this.defaultOffset * 6);
    }
  }
});

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Select autocomplete
 *
 * @mixin
 *
 * Handles logic when using the "autocomplete" prop
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  props: {
    filter: {
      type: Function,
      default: function _default(item, queryText, itemText) {
        var hasValue = function hasValue(val) {
          return [undefined, null].includes(val);
        };

        var text = hasValue(itemText) ? '' : itemText;
        var query = hasValue(queryText) ? '' : queryText;

        return text.toString().toLowerCase().indexOf(query.toString().toLowerCase()) > -1;
      }
    }
  },

  methods: {
    genFiltered: function genFiltered(text) {
      if (!this.isAutocomplete || !this.searchValue || this.filteredItems.length < 1) return text;

      text = (text || '').toString();

      var _getMaskedCharacters = this.getMaskedCharacters(text),
          start = _getMaskedCharacters.start,
          middle = _getMaskedCharacters.middle,
          end = _getMaskedCharacters.end;

      return '' + start + this.genHighlight(middle) + end;
    },
    genHighlight: function genHighlight(text) {
      if (this.isNotFiltering) return text;

      return '<span class="list__tile__mask">' + text + '</span>';
    },
    getMaskedCharacters: function getMaskedCharacters(text) {
      var searchValue = (this.searchValue || '').toString().toLowerCase();
      var index = text.toLowerCase().indexOf(searchValue);

      if (index < 0) return { start: '', middle: text, end: '' };

      var start = text.slice(0, index);
      var middle = text.slice(index, index + searchValue.length);
      var end = text.slice(index + searchValue.length);
      return { start: start, middle: middle, end: end };
    },
    filterSearch: function filterSearch() {
      var _this = this;

      if (!this.isAutocomplete) return this.computedItems;

      return this.computedItems.filter(function (i) {
        return _this.filter(i, _this.searchValue, _this.getText(i));
      });
    },
    onKeyDown: function onKeyDown(e) {
      var _this2 = this;

      // If enter, space, up, or down is pressed, open menu
      if (!this.menuIsActive && [13, 32, 38, 40].includes(e.keyCode)) {
        e.preventDefault();
        return this.showMenuItems();
      }

      // If escape or tab with no search, blur
      if (e.keyCode === 27 || e.keyCode === 9 && !this.searchValue) {
        return this.blur();
      }

      // Tab shouldn't switch inputs
      if (e.keyCode === 9) {
        this.tags ? e.preventDefault() : this.blur();
      }

      if (!this.isAutocomplete || ![32].includes(e.keyCode) // space
      ) this.$refs.menu.changeListIndex(e);

      // Up or down
      if ([38, 40].includes(e.keyCode)) this.selectedIndex = -1;

      if (this.isAutocomplete && !this.hideSelections && !this.searchValue) this.changeSelectedIndex(e.keyCode);

      if (!this.tags || !this.searchValue) return;

      // Tab, enter
      if ([9, 13].includes(e.keyCode)) {
        var newItem = this.filteredItems.length && this.$refs.menu.listIndex >= 0 ? this.filteredItems[this.$refs.menu.listIndex] : this.searchValue;
        this.addTag(newItem);
      }

      // Left arrow
      if (e.keyCode === 37 && this.$refs.input.selectionStart === 0 && this.selectedItems.length) {
        this.addTag(this.searchValue);
        this.$nextTick(function () {
          _this2.selectedIndex = Math.max(_this2.selectedItems.length - 2, 0);
        });
      }

      // Right arrow
      if (e.keyCode === 39 && this.$refs.input.selectionEnd === this.searchValue.length) {
        this.$refs.menu.listIndex = -1;
      }
    },
    addTag: function addTag(content) {
      var _this3 = this;

      if (this.selectedItems.includes(content)) {
        this.$delete(this.selectedItems, this.selectedItems.indexOf(content));
      } else {
        this.selectedItems.push(content);
      }
      this.$nextTick(function () {
        _this3.searchValue = null;
        _this3.$emit('change', _this3.selectedItems);
      });
    }
  }
});

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(1);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }



/**
 * Select generators
 *
 * @mixin
 *
 * Used for creating the DOM elements for VSelect
 */
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genMenu: function genMenu() {
      var _this = this;

      var offsetY = this.isAutocomplete || this.offset || this.isDropdown;
      var nudgeTop = 0;

      if (this.auto) nudgeTop = -18;else if (this.solo) nudgeTop = 0;else if (this.isDropdown) nudgeTop = 26;else if (offsetY) nudgeTop = 24;

      var data = {
        ref: 'menu',
        props: {
          activator: this.$el,
          auto: this.auto,
          closeOnClick: false,
          closeOnContentClick: !this.isMultiple,
          contentClass: this.computedContentClass,
          disabled: this.disabled,
          maxHeight: this.maxHeight,
          nudgeTop: nudgeTop,
          offsetY: offsetY,
          offsetOverflow: this.isAutocomplete,
          openOnClick: false,
          value: this.menuIsActive && (!this.tags || this.filteredItems.length > 0) && (!this.combobox || this.filteredItems.length > 0),
          zIndex: this.menuZIndex
        },
        on: {
          input: function input(val) {
            if (!val) {
              _this.menuIsActive = false;
            }
          }
        }
      };

      if (this.isAutocomplete) data.props.transition = '';

      this.minWidth && (data.props.minWidth = this.minWidth);

      return this.$createElement('v-menu', data, [this.genList()]);
    },
    genSelectionsAndSearch: function genSelectionsAndSearch() {
      return this.$createElement('div', {
        'class': 'input-group__selections',
        style: { 'overflow': 'hidden' },
        ref: 'activator'
      }, [].concat(_toConsumableArray(this.genSelections()), [this.genSearch()]));
    },
    genSelections: function genSelections() {
      var _this2 = this;

      if (this.hideSelections) return [];

      var children = [];
      var chips = this.chips;
      var slots = this.$scopedSlots.selection;
      var length = this.selectedItems.length;
      this.selectedItems.forEach(function (item, i) {
        if (slots) {
          children.push(_this2.genSlotSelection(item, i));
        } else if (chips) {
          children.push(_this2.genChipSelection(item, i));
        } else if (_this2.segmented) {
          children.push(_this2.genSegmentedBtn(item, i));
        } else {
          children.push(_this2.genCommaSelection(item, i < length - 1, i));
        }
      });

      return children;
    },
    genSearch: function genSearch() {
      var _this3 = this;

      var data = {
        staticClass: 'input-group--select__autocomplete',
        'class': {
          'input-group--select__autocomplete--index': this.selectedIndex > -1
        },
        style: {
          flex: this.shouldBreak ? '1 0 100%' : null
        },
        attrs: _extends({}, this.$attrs, {
          disabled: this.disabled || !this.isAutocomplete,
          readonly: this.readonly,
          tabindex: this.disabled || !this.isAutocomplete ? -1 : this.tabindex
        }),
        domProps: {
          value: this.maskText(this.lazySearch || '')
        },
        directives: [{
          name: 'show',
          value: this.isAutocomplete || this.placeholder && !this.selectedItems.length
        }],
        ref: 'input',
        key: 'input'
      };

      if (this.isAutocomplete) {
        data.attrs.role = 'combobox';
        data.domProps.autocomplete = this.browserAutocomplete;

        data.on = _extends({}, this.genListeners(), {
          input: function input(e) {
            _this3.searchValue = _this3.unmaskText(e.target.value);
          }
        });

        if (this.combobox) {
          // When using the combobox
          // update inputValue and
          // set the menu status
          data.on.blur = function () {
            _this3.inputValue = _this3.lazySearch;
          };
        }

        data.directives = data.directives.concat(this.genDirectives());
      }

      if (this.placeholder) data.domProps.placeholder = this.placeholder;

      return this.$createElement('input', data);
    },
    genSegmentedBtn: function genSegmentedBtn(item) {
      if (!item.text || !item.callback) {
        console.warn('[Vuetify] Warn: When using the v-select component with \'segmented\' prop without a selection slot, items must contain both a text and callback property');
        return null;
      }

      return this.$createElement('v-btn', {
        props: {
          flat: true
        },
        on: {
          click: function click(e) {
            e.stopPropagation();
            item.callback(e);
          }
        }
      }, [item.text]);
    },
    genSlotSelection: function genSlotSelection(item, index) {
      return this.$scopedSlots.selection({
        parent: this,
        item: item,
        index: index,
        selected: index === this.selectedIndex,
        disabled: this.disabled || this.readonly
      });
    },
    genChipSelection: function genChipSelection(item, index) {
      var _this4 = this;

      var isDisabled = this.disabled || this.readonly;
      var click = function click(e) {
        if (isDisabled) return;

        e.stopPropagation();
        _this4.focus();
        _this4.selectedIndex = index;
      };

      return this.$createElement('v-chip', {
        staticClass: 'chip--select-multi',
        attrs: { tabindex: '-1' },
        props: {
          close: !isDisabled,
          dark: this.dark,
          disabled: isDisabled,
          selected: index === this.selectedIndex
        },
        on: {
          click: click,
          focus: click,
          input: function input() {
            return _this4.selectItem(item);
          }
        },
        key: this.getValue(item)
      }, this.getText(item));
    },
    genCommaSelection: function genCommaSelection(item, comma, index) {
      return this.$createElement('div', {
        staticClass: 'input-group__selections__comma',
        'class': {
          'input-group__selections__comma--active': index === this.selectedIndex
        },
        key: JSON.stringify(this.getValue(item)) // Item may be an object
      }, '' + this.getText(item) + (comma ? ', ' : ''));
    },
    genList: function genList() {
      var _this5 = this;

      var children = this.filteredItems.map(function (o) {
        if (o.header) return _this5.genHeader(o);
        if (o.divider) return _this5.genDivider(o);else return _this5.genTile(o);
      });

      if (!children.length) {
        var noData = this.$slots['no-data'];
        if (noData) {
          children.push(noData);
        } else {
          children.push(this.genTile(this.noDataText, true));
        }
      }

      return this.$createElement('v-card', [this.$createElement('v-list', {
        ref: 'list'
      }, children)]);
    },
    genHeader: function genHeader(item) {
      return this.$createElement('v-subheader', {
        props: item
      }, item.header);
    },
    genDivider: function genDivider(item) {
      return this.$createElement('v-divider', {
        props: item
      });
    },
    genTile: function genTile(item, disabled) {
      var _this6 = this;

      var active = this.selectedItems.indexOf(item) !== -1;

      if (typeof disabled === 'undefined') {
        disabled = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["f" /* getObjectValueByPath */])(item, this.itemDisabled);
      }

      var data = {
        on: {
          click: function click(e) {
            if (disabled) return;

            _this6.selectItem(item);
          }
        },
        props: {
          avatar: item === Object(item) && this.itemAvatar in item,
          ripple: true,
          value: active
        }
      };

      if (disabled) {
        data.props.disabled = disabled;
      }

      if (this.$scopedSlots.item) {
        return this.$createElement('v-list-tile', data, [this.$scopedSlots.item({ parent: this, item: item })]);
      }

      return this.$createElement('v-list-tile', data, [this.genAction(item, active), this.genContent(item)]);
    },
    genAction: function genAction(item, active) {
      var _this7 = this;

      if (!this.isMultiple) return null;

      var data = {
        staticClass: 'list__tile__action--select-multi',
        on: {
          click: function click(e) {
            e.stopPropagation();
            _this7.selectItem(item);
          }
        }
      };

      return this.$createElement('v-list-tile-action', data, [this.$createElement('v-checkbox', { props: { inputValue: active } })]);
    },
    genContent: function genContent(item) {
      var text = this.getText(item);

      return this.$createElement('v-list-tile-content', [this.$createElement('v-list-tile-title', {
        domProps: {
          innerHTML: this.genFiltered(text)
        }
      })]);
    }
  }
});

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genTHead: function genTHead() {
      var _this = this;

      if (this.hideHeaders) return; // Exit Early since no headers are needed.

      var children = [];

      if (this.$scopedSlots.headers) {
        var row = this.$scopedSlots.headers({
          headers: this.headers,
          indeterminate: this.indeterminate,
          all: this.all
        });

        children = this.needsTR(row) ? this.genTR(row) : row;
      } else {
        var _row = this.headers.map(function (o) {
          return _this.genHeader(o);
        });
        var checkbox = this.$createElement('v-checkbox', {
          props: {
            dark: this.dark,
            light: this.light,
            color: this.selectAll === true ? '' : this.selectAll,
            hideDetails: true,
            inputValue: this.all,
            indeterminate: this.indeterminate
          },
          on: { change: this.toggle }
        });

        this.hasSelectAll && _row.unshift(this.$createElement('th', [checkbox]));

        children = this.genTR(_row);
      }

      return this.$createElement('thead', [children]);
    },
    genHeader: function genHeader(header) {
      var array = [this.$scopedSlots.headerCell ? this.$scopedSlots.headerCell({ header: header }) : header[this.headerText]];

      return this.$createElement.apply(this, ['th'].concat(_toConsumableArray(this.genHeaderData(header, array))));
    },
    genHeaderData: function genHeaderData(header, children) {
      var classes = ['column'];
      var data = {
        attrs: {
          role: 'columnheader',
          scope: 'col',
          'aria-label': header[this.headerText] || '',
          'aria-sort': 'none'
        }
      };

      if ('sortable' in header && header.sortable || !('sortable' in header)) {
        this.genHeaderSortingData(header, children, data, classes);
      } else {
        data.attrs['aria-label'] += ': Not sorted.'; // TODO: Localization
      }

      classes.push('text-xs-' + (header.align || 'right'));
      if (Array.isArray(header.class)) {
        classes.push.apply(classes, _toConsumableArray(header.class));
      } else if (header.class) {
        classes.push(header.class);
      }
      data.class = classes;

      return [data, children];
    },
    genHeaderSortingData: function genHeaderSortingData(header, children, data, classes) {
      var _this2 = this;

      if (!('value' in header)) {
        console.warn('Data table headers must have a value property that corresponds to a value in the v-model array');
      }

      data.attrs.tabIndex = 0;
      data.on = {
        click: function click() {
          _this2.expanded = [];
          _this2.sort(header.value);
        },
        keydown: function keydown(e) {
          // check for space
          if (e.keyCode === 32) {
            e.preventDefault();
            _this2.sort(header.value);
          }
        }
      };

      classes.push('sortable');
      var icon = this.$createElement('v-icon', { attrs: { 'aria-hidden': true } }, 'arrow_upward');
      if (header.align && header.align === 'left') {
        children.push(icon);
      } else {
        children.unshift(icon);
      }

      var pagination = this.computedPagination;
      var beingSorted = pagination.sortBy === header.value;
      if (beingSorted) {
        classes.push('active');
        if (pagination.descending) {
          classes.push('desc');
          data.attrs['aria-sort'] = 'descending';
          data.attrs['aria-label'] += ': Sorted descending. Activate to remove sorting.'; // TODO: Localization
        } else {
          classes.push('asc');
          data.attrs['aria-sort'] = 'ascending';
          data.attrs['aria-label'] += ': Sorted ascending. Activate to sort descending.'; // TODO: Localization
        }
      } else {
        data.attrs['aria-label'] += ': Not sorted. Activate to sort ascending.'; // TODO: Localization
      }
    }
  }
});

/***/ }),
/* 123 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transitions_row_expand_transition__ = __webpack_require__(30);


/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genTBody: function genTBody() {
      var children = [];

      if (!this.itemsLength) {
        children.push(this.genEmptyBody(this.noDataText));
      } else if (!this.filteredItems.length) {
        children.push(this.genEmptyBody(this.noResultsText));
      } else {
        children.push(this.genFilteredItems());
      }

      return this.$createElement('tbody', children);
    },
    genExpandedRow: function genExpandedRow(props) {
      var children = [];

      if (this.isExpanded(props.item)) {
        var expand = this.$createElement('div', {
          class: 'datatable__expand-content',
          key: props.item[this.itemKey]
        }, this.$scopedSlots.expand(props));

        children.push(expand);
      }

      var transition = this.$createElement('transition-group', {
        class: 'datatable__expand-col',
        attrs: { colspan: '100%' },
        props: {
          tag: 'td'
        },
        on: __WEBPACK_IMPORTED_MODULE_0__transitions_row_expand_transition__["a" /* default */]
      }, children);

      return this.genTR([transition], { class: 'datatable__expand-row' });
    },
    createProps: function createProps(item, index) {
      var _this = this;

      var props = { item: item, index: index };
      var key = this.itemKey;

      Object.defineProperty(props, 'selected', {
        get: function get() {
          return _this.selected[item[_this.itemKey]];
        },
        set: function set(value) {
          var selected = _this.value.slice();
          if (value) selected.push(item);else selected = selected.filter(function (i) {
            return i[key] !== item[key];
          });
          _this.$emit('input', selected);
        }
      });

      Object.defineProperty(props, 'expanded', {
        get: function get() {
          return _this.expanded[item[_this.itemKey]];
        },
        set: function set(value) {
          if (!_this.expand) {
            Object.keys(_this.expanded).forEach(function (key) {
              _this.$set(_this.expanded, key, false);
            });
          }
          _this.$set(_this.expanded, item[_this.itemKey], value);
        }
      });

      return props;
    },
    genFilteredItems: function genFilteredItems() {
      var _this2 = this;

      var rows = [];
      this.filteredItems.forEach(function (item, index) {
        var props = _this2.createProps(item, index);
        var row = _this2.$scopedSlots.items ? _this2.$scopedSlots.items(props) : [];

        rows.push(_this2.needsTR(row) ? _this2.genTR(row, {
          attrs: { active: _this2.isSelected(item) }
        }) : row);

        if (_this2.$scopedSlots.expand) {
          var expandRow = _this2.genExpandedRow(props);
          rows.push(expandRow);
        }
      });

      return rows;
    },
    genEmptyBody: function genEmptyBody(text) {
      return this.genTR([this.$createElement('td', {
        'class': 'text-xs-center',
        attrs: { colspan: '100%' }
      }, text)]);
    }
  }
});

/***/ }),
/* 124 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genPrevIcon: function genPrevIcon() {
      var _this = this;

      return this.$createElement('v-btn', {
        props: {
          disabled: this.computedPagination.page === 1,
          icon: true,
          flat: true,
          dark: this.dark,
          light: this.light
        },
        on: {
          click: function click() {
            var page = _this.computedPagination.page;
            _this.updatePagination({ page: page - 1 });
          }
        },
        attrs: {
          'aria-label': 'Previous page' // TODO: Localization
        }
      }, [this.$createElement('v-icon', 'chevron_left')]);
    },
    genNextIcon: function genNextIcon() {
      var _this2 = this;

      var pagination = this.computedPagination;
      var disabled = pagination.rowsPerPage < 0 || pagination.page * pagination.rowsPerPage >= this.itemsLength || this.pageStop < 0;

      return this.$createElement('v-btn', {
        props: {
          disabled: disabled,
          icon: true,
          flat: true,
          dark: this.dark,
          light: this.light
        },
        on: {
          click: function click() {
            var page = _this2.computedPagination.page;
            _this2.updatePagination({ page: page + 1 });
          }
        },
        attrs: {
          'aria-label': 'Next page' // TODO: Localization
        }
      }, [this.$createElement('v-icon', 'chevron_right')]);
    },
    genSelect: function genSelect() {
      var _this3 = this;

      return this.$createElement('div', {
        'class': 'datatable__actions__select'
      }, [this.rowsPerPageText, this.$createElement('v-select', {
        attrs: {
          'aria-label': this.rowsPerPageText
        },
        props: {
          items: this.rowsPerPageItems,
          value: this.computedPagination.rowsPerPage,
          hideDetails: true,
          auto: true,
          minWidth: '75px'
        },
        on: {
          input: function input(val) {
            _this3.updatePagination({
              page: 1,
              rowsPerPage: val
            });
          }
        }
      })]);
    },
    genPagination: function genPagination() {
      var pagination = '–';

      if (this.itemsLength) {
        var stop = this.itemsLength < this.pageStop || this.pageStop < 0 ? this.itemsLength : this.pageStop;

        pagination = this.$scopedSlots.pageText ? this.$scopedSlots.pageText({
          pageStart: this.pageStart + 1,
          pageStop: stop,
          itemsLength: this.itemsLength
        }) : this.pageStart + 1 + '-' + stop + ' of ' + this.itemsLength;
      }

      return this.$createElement('div', {
        'class': 'datatable__actions__pagination'
      }, [pagination]);
    },
    genActions: function genActions() {
      return [this.$createElement('div', {
        'class': 'datatable__actions'
      }, [this.genSelect(), this.genPagination(), this.genPrevIcon(), this.genNextIcon()])];
    },
    genTFoot: function genTFoot() {
      var children = [];

      if (this.$slots.footer) {
        var footer = this.$slots.footer;
        var row = this.needsTR(footer) ? this.genTR(footer) : footer;

        children.push(row);
      }

      if (!this.hideActions) {
        children.push(this.genTR([this.$createElement('td', {
          attrs: { colspan: '100%' }
        }, this.genActions())]));
      }

      if (!children.length) return null;
      return this.$createElement('tfoot', children);
    }
  }
});

/***/ }),
/* 125 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genTProgress: function genTProgress() {
      var col = this.$createElement('th', {
        staticClass: 'column',
        attrs: {
          colspan: '100%'
        }
      }, [this.genProgress()]);

      return this.$createElement('thead', {
        staticClass: 'datatable__progress'
      }, [this.genTR([col])]);
    }
  }
});

/***/ }),
/* 126 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__(127);

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-edit-dialog',

  data: function data() {
    return {
      isActive: false,
      isSaving: false
    };
  },


  props: {
    cancelText: {
      default: 'Cancel'
    },
    large: Boolean,
    lazy: Boolean,
    saveText: {
      default: 'Save'
    },
    transition: {
      type: String,
      default: 'slide-x-reverse-transition'
    }
  },

  watch: {
    isActive: function isActive(val) {
      val && this.$emit('open') && setTimeout(this.focus, 50); // Give DOM time to paint

      if (!val) {
        !this.isSaving && this.$emit('cancel');
        this.isSaving && this.$emit('close');
        this.isSaving = false;
      }
    }
  },

  methods: {
    cancel: function cancel() {
      this.isActive = false;
    },
    focus: function focus() {
      var input = this.$refs.content.querySelector('input');
      input && input.focus();
    },
    save: function save() {
      this.isSaving = true;
      this.isActive = false;
      this.$emit('save');
    },
    genButton: function genButton(fn, text) {
      return this.$createElement('v-btn', {
        props: {
          flat: true,
          color: 'primary',
          light: true
        },
        on: { click: fn }
      }, text);
    },
    genActions: function genActions() {
      return this.$createElement('div', {
        'class': 'small-dialog__actions'
      }, [this.genButton(this.cancel, this.cancelText), this.genButton(this.save, this.saveText)]);
    },
    genContent: function genContent() {
      var _this = this;

      return this.$createElement('div', {
        on: {
          keydown: function keydown(e) {
            e.keyCode === 27 && _this.cancel();
            e.keyCode === 13 && _this.save();
          }
        },
        ref: 'content'
      }, [this.$slots.input]);
    }
  },

  render: function render(h) {
    var _this2 = this;

    return h('v-menu', {
      'class': 'small-dialog',
      props: {
        contentClass: 'small-dialog__content',
        transition: this.transition,
        origin: 'top right',
        right: true,
        value: this.isActive,
        closeOnContentClick: false,
        lazy: this.lazy
      },
      on: {
        input: function input(val) {
          return _this2.isActive = val;
        }
      }
    }, [h('a', {
      domProps: { href: 'javascript:;' },
      slot: 'activator'
    }, this.$slots.default), this.genContent(), this.large ? this.genActions() : null]);
  }
});

/***/ }),
/* 127 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 128 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VDatePicker__ = __webpack_require__(129);


__WEBPACK_IMPORTED_MODULE_0__VDatePicker__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VDatePicker__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VDatePicker__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VDatePicker__["a" /* default */]);

/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_picker__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_date_years__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_date_title__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_date_header__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_date_table__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mixins_month_table__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__VBtn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__VCard__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__directives_touch__ = __webpack_require__(8);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

__webpack_require__(43);
__webpack_require__(130);















var createDefaultDateFormat = function createDefaultDateFormat(type) {
  return function (date) {
    var pad = function pad(n) {
      return n < 10 ? '0' + n : '' + n;
    };
    var isoString = date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
    return isoString.substr(0, { date: 10, month: 7, year: 4 }[type]);
  };
};

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-date-picker',

  components: {
    VBtn: __WEBPACK_IMPORTED_MODULE_7__VBtn__["a" /* default */],
    VCard: __WEBPACK_IMPORTED_MODULE_8__VCard__["a" /* default */],
    VIcon: __WEBPACK_IMPORTED_MODULE_9__VIcon__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_picker__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_date_years__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_date_title__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_date_header__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__mixins_date_table__["a" /* default */], __WEBPACK_IMPORTED_MODULE_6__mixins_month_table__["a" /* default */]],

  directives: { Touch: __WEBPACK_IMPORTED_MODULE_10__directives_touch__["a" /* default */] },

  data: function data() {
    return {
      tableDate: new Date(),
      originalDate: this.value,
      currentDay: null,
      currentMonth: null,
      currentYear: null,
      isReversing: false,
      narrowDays: [],
      activePicker: this.type.toUpperCase()
    };
  },


  props: {
    locale: {
      type: String,
      default: 'en-us'
    },
    type: {
      type: String,
      default: 'date',
      validator: function validator(type) {
        return ['date', 'month' /*, 'year'*/].includes(type);
      }
    },
    dateFormat: {
      type: Function,
      default: null
    },
    titleDateFormat: {
      type: [Object, Function],
      default: null
    },
    headerDateFormat: {
      type: [Object, Function],
      default: function _default() {
        return { month: 'long', year: 'numeric' };
      }
    },
    monthFormat: {
      type: [Object, Function],
      default: function _default() {
        return { month: 'short' };
      }
    },
    formattedValue: {
      required: false
    },
    allowedDates: {
      type: [Array, Object, Function],
      default: function _default() {
        return null;
      }
    },
    firstDayOfWeek: {
      type: [String, Number],
      default: 0
    },
    yearIcon: String
  },

  computed: {
    timeZone: function timeZone() {
      try {
        var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        new Date('2000-01-15').toLocaleDateString('en', {
          day: 'numeric',
          timeZone: timeZone
        });
        return timeZone;
      } catch (e) {
        return 'UTC';
      }
    },
    supportsLocaleFormat: function supportsLocaleFormat() {
      return 'toLocaleDateString' in Date.prototype && new Date('2000-01-15').toLocaleDateString('en', {
        day: 'numeric',
        timeZone: 'UTC'
      }) === '15';
    },
    firstAllowedDate: function firstAllowedDate() {
      var date = new Date();

      if (this.type === 'month') {
        date.setDate(1);
        date.setHours(1);

        if (this.allowedDates) {
          var valid = new Date(date);
          for (var month = 0; month < 12; month++) {
            valid.setMonth(month);
            if (this.isAllowed(valid)) {
              return valid;
            }
          }
        }
      } else if (this.type === 'date') {
        date.setHours(1);
        var _month = date.getMonth();

        if (this.allowedDates) {
          var _valid = new Date(date);
          for (var i = 0; i < 31; i++) {
            if (date.getMonth() === _month && this.isAllowed(_valid)) return _valid;
            _valid.setDate(i);
          }
        }
      }

      return date;
    },

    inputDate: {
      get: function get() {
        var date = this.makeDate(this.value);
        return date == null ? this.firstAllowedDate : date;
      },
      set: function set(value) {
        var date = this.makeDate(value);
        var pickerDateFormat = createDefaultDateFormat(this.type);
        this.$emit('input', date == null ? this.originalDate : pickerDateFormat(date));
        this.$emit('update:formattedValue', (this.dateFormat || pickerDateFormat)(date == null ? this.makeDate(this.originalDate) || this.firstAllowedDate : date));
      }
    },
    day: function day() {
      return this.inputDate.getDate();
    },
    month: function month() {
      return this.inputDate.getMonth();
    },
    year: function year() {
      return this.inputDate.getFullYear();
    },
    tableMonth: function tableMonth() {
      return this.tableDate.getMonth();
    },
    tableYear: function tableYear() {
      return this.tableDate.getFullYear();
    },
    computedTransition: function computedTransition() {
      return this.isReversing ? 'tab-reverse-transition' : 'tab-transition';
    },
    titleText: function titleText() {
      var date = this.normalizeDate(this.year, this.month, this.day);

      var defaultTitleDateFormat = this.type === 'year' ? {
        year: 'numeric'
      } : this.type === 'month' ? {
        month: 'long'
      } : {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      };

      var titleText = void 0;
      if (typeof this.titleDateFormat === 'function') {
        titleText = this.titleDateFormat(date);
      } else if (this.supportsLocaleFormat) {
        titleText = date.toLocaleDateString(this.locale, Object.assign(this.titleDateFormat || defaultTitleDateFormat, {
          timeZone: this.timeZone
        }));
      } else if ('toLocaleDateString' in Date.prototype) {
        titleText = createDefaultDateFormat(this.type)(date);
      }

      if (this.landscape) {
        if (titleText.indexOf(',') > -1) titleText = titleText.replace(',', ',<br>');else if (titleText.indexOf(' ') > -1) titleText = titleText.replace(' ', '<br>');
      }

      return titleText;
    }
  },

  watch: {
    activePicker: function activePicker(val, prev) {
      var _this = this;

      if (val !== 'YEAR') return;

      // That's a quirk, setting timeout stopped working after fixing #1649
      // It worked but for timeouts significantly longer than the transition duration
      var interval = setInterval(function () {
        if (_this.$refs.years) {
          _this.$refs.years.scrollTop = _this.$refs.years.scrollHeight / 2 - 125;
          clearInterval(interval);
        }
      }, 100);
    },
    tableDate: function tableDate(val, prev) {
      this.isReversing = val < prev;
    },
    value: function value(val) {
      if (val) this.tableDate = this.inputDate;
    },
    type: function type(val) {
      if (val === 'month' && this.activePicker === 'DATE') {
        this.activePicker = 'MONTH';
      } else if (val === 'year') {
        this.activePicker = 'YEAR';
      }
    },
    firstDayOfWeek: function firstDayOfWeek() {
      this.getWeekDays();
    }
  },

  methods: {
    save: function save() {
      if (this.originalDate) {
        this.originalDate = this.value;
      } else {
        this.originalDate = this.inputDate;
      }

      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false;
    },
    cancel: function cancel() {
      this.inputDate = this.originalDate;
      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false;
    },
    getWeekDays: function getWeekDays() {
      var _this2 = this;

      var first = parseInt(this.firstDayOfWeek, 10);
      if (this.supportsLocaleFormat) {
        var date = this.normalizeDate(2000, 1, 7);
        var day = date.getDate() - date.getDay() + first;
        var format = { weekday: 'narrow' };
        this.narrowDays = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createRange */])(7).map(function (i) {
          return _this2.normalizeDate(2000, 1, day + i).toLocaleDateString(_this2.locale, format);
        });
      } else {
        this.narrowDays = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createRange */])(7).map(function (i) {
          return ['S', 'M', 'T', 'W', 'T', 'F', 'S'][(i + first) % 7];
        });
      }
    },
    isAllowed: function isAllowed(date) {
      var _this3 = this;

      if (!this.allowedDates) return true;

      if (Array.isArray(this.allowedDates)) {
        var format = createDefaultDateFormat(this.activePicker === 'MONTH' ? 'month' : 'date');
        date = format(this.makeDate(date));
        return !!this.allowedDates.find(function (allowedDate) {
          allowedDate = _this3.makeDate(allowedDate);
          return allowedDate && format(allowedDate) === date;
        });
      } else if (this.allowedDates instanceof Function) {
        return this.allowedDates(date);
      } else if (this.allowedDates instanceof Object) {
        var _format = createDefaultDateFormat(this.activePicker === 'MONTH' ? 'month' : 'date');
        var min = _format(this.makeDate(this.allowedDates.min));
        var max = _format(this.makeDate(this.allowedDates.max));
        date = _format(date);
        return (!min || min <= date) && (!max || max >= date);
      }

      return true;
    },
    genTableTouch: function genTableTouch(touchCallback) {
      return {
        name: 'touch',
        value: {
          left: function left(e) {
            return e.offsetX < -15 && touchCallback(1);
          },
          right: function right(e) {
            return e.offsetX > 15 && touchCallback(-1);
          }
        }
      };
    },
    genTable: function genTable(tableChildren, touchCallback) {
      var wheel = this.activePicker === 'MONTH' ? this.monthWheelScroll : this.dateWheelScroll;
      var options = {
        staticClass: 'picker--date__table',
        'class': {
          'picker--month__table': this.activePicker === 'MONTH'
        },
        on: this.scrollable ? { wheel: wheel } : undefined,
        directives: [this.genTableTouch(touchCallback)]
      };

      var table = this.$createElement('table', {
        key: this.activePicker === 'MONTH' ? this.tableYear : this.tableMonth
      }, tableChildren);

      return this.$createElement('div', options, [this.$createElement('transition', {
        props: { name: this.computedTransition }
      }, [table])]);
    },
    genPickerBody: function genPickerBody(h) {
      var _this4 = this;

      var pickerBodyChildren = [];
      if (this.activePicker === 'DATE') {
        pickerBodyChildren.push(h('div', { staticClass: 'picker--date__header' }, [this.genSelector()]));
        pickerBodyChildren.push(this.genTable([this.dateGenTHead(), this.dateGenTBody()], function (value) {
          return _this4.tableDate = _this4.normalizeDate(_this4.tableYear, _this4.tableMonth + value);
        }));
      } else if (this.activePicker === 'MONTH') {
        pickerBodyChildren.push(h('div', { staticClass: 'picker--date__header' }, [this.genSelector()]));
        pickerBodyChildren.push(this.genTable([this.monthGenTBody()], function (value) {
          return _this4.tableDate = _this4.normalizeDate(_this4.tableYear + value);
        }));
      } else if (this.activePicker === 'YEAR') {
        pickerBodyChildren.push(this.genYears());
      }

      return pickerBodyChildren;
    },
    makeDate: function makeDate(val) {
      if (val == null) return val;
      if (val instanceof Date) return val;
      if (!isNaN(val)) return new Date(val);

      var _val$trim$split$0$spl = val.trim().split(' ')[0].split('-'),
          _val$trim$split$0$spl2 = _slicedToArray(_val$trim$split$0$spl, 3),
          year = _val$trim$split$0$spl2[0],
          month = _val$trim$split$0$spl2[1],
          date = _val$trim$split$0$spl2[2];

      return this.normalizeDate(year, month ? month - 1 : 0, date ? date * 1 : 1);
    },
    normalizeDate: function normalizeDate(year) {
      var month = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var date = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      return new Date(year, month, date, 1 /* Workaround for #1409 */);
    }
  },

  created: function created() {
    this.getWeekDays();
    this.tableDate = this.inputDate;
  },
  mounted: function mounted() {
    var date = new Date();
    this.currentDay = date.getDate();
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();
  },
  render: function render(h) {
    var children = [];

    !this.noTitle && children.push(this.genTitle(this.titleText));

    children.push(h('transition', {
      props: {
        origin: 'center center',
        mode: 'out-in',
        name: 'scale-transition'
      }
    }, [h('div', {
      staticClass: 'picker__body',
      key: this.activePicker
    }, this.genPickerBody(h))]));

    this.$scopedSlots.default && children.push(this.genSlot());

    return h('v-card', {
      staticClass: 'picker picker--date',
      'class': _extends({
        'picker--landscape': this.landscape
      }, this.themeClasses)
    }, children);
  }
});

/***/ }),
/* 130 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genYears: function genYears() {
      return this.$createElement('ul', {
        staticClass: 'picker--date__years',
        key: 'year',
        ref: 'years'
      }, this.genYearItems());
    },
    yearClick: function yearClick(year) {
      var _this = this;

      this.inputDate = this.normalizeDate(year, this.tableMonth, this.day);

      if (this.type === 'year') {
        this.$nextTick(function () {
          return _this.autosave && _this.save();
        });
      } else {
        this.activePicker = 'MONTH';
      }
    },
    genYearItems: function genYearItems() {
      var _this2 = this;

      var children = [];

      var _loop = function _loop(year, length) {
        var date = _this2.normalizeDate(year, _this2.month, _this2.day);
        var buttonText = _this2.supportsLocaleFormat ? date.toLocaleDateString(_this2.locale, {
          year: 'numeric',
          timeZone: _this2.timeZone
        }) : year;

        children.push(_this2.$createElement('li', {
          'class': {
            active: _this2.year === year
          },
          on: {
            click: function click() {
              return _this2.yearClick(year);
            }
          }
        }, buttonText));
      };

      for (var year = this.year + 100, length = this.year - 100; year > length; year--) {
        _loop(year, length);
      }
      return children;
    }
  }
});

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genYearIcon: function genYearIcon() {
      return this.yearIcon ? this.$createElement('v-icon', {
        props: {
          dark: true
        }
      }, this.yearIcon) : null;
    },
    getYearBtn: function getYearBtn() {
      var _this = this;

      var titleDate = this.normalizeDate(this.year, this.month, this.day);
      return this.$createElement('div', {
        'class': {
          'picker--date__title-year': true,
          'active': this.activePicker === 'YEAR'
        },
        on: {
          click: function click(e) {
            e.stopPropagation();
            _this.activePicker = 'YEAR';
          }
        }
      }, [this.supportsLocaleFormat ? titleDate.toLocaleDateString(this.locale, {
        year: 'numeric',
        timeZone: this.timeZone
      }) : this.year, this.genYearIcon()]);
    },
    genTitleText: function genTitleText(title) {
      return this.$createElement('transition', {
        props: {
          name: 'slide-y-reverse-transition',
          mode: 'out-in'
        }
      }, [this.$createElement('div', {
        domProps: { innerHTML: title },
        key: title
      })]);
    },
    genTitleDate: function genTitleDate(title) {
      var _this2 = this;

      return this.$createElement('div', {
        staticClass: 'picker--date__title-date',
        'class': {
          'active': this.activePicker === this.type.toUpperCase()
        },
        on: {
          click: function click(e) {
            e.stopPropagation();
            _this2.activePicker = _this2.type.toUpperCase();
          }
        }
      }, [this.genTitleText(title)]);
    },
    genTitle: function genTitle(title) {
      return this.$createElement('div', {
        'class': 'picker__title'
      }, [this.getYearBtn(), this.genTitleDate(title)]);
    }
  }
});

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genBtn: function genBtn(change, children) {
      var _this = this;

      return this.$createElement('v-btn', {
        props: {
          dark: this.dark,
          icon: true
        },
        nativeOn: {
          click: function click(e) {
            e.stopPropagation();
            if (_this.activePicker === 'DATE') {
              _this.tableDate = _this.normalizeDate(_this.tableYear, change);
            } else if (_this.activePicker === 'MONTH') {
              _this.tableDate = _this.normalizeDate(change, _this.tableMonth);
            }
          }
        }
      }, children);
    },
    genHeader: function genHeader(keyValue, selectorText) {
      var _this2 = this;

      var header = this.$createElement('strong', {
        key: keyValue,
        on: {
          click: function click() {
            return _this2.activePicker = _this2.activePicker === 'DATE' ? 'MONTH' : 'YEAR';
          }
        }
      }, selectorText);

      var transition = this.$createElement('transition', {
        props: { name: this.computedTransition }
      }, [header]);

      return this.$createElement('div', {
        'class': 'picker--date__header-selector-date'
      }, [transition]);
    },
    genSelector: function genSelector() {
      var keyValue = this.activePicker === 'DATE' ? this.tableMonth : this.tableYear;
      var selectorDate = this.normalizeDate(this.tableYear, this.tableMonth);

      var selectorText = '';
      if (typeof this.headerDateFormat === 'function' && this.activePicker === 'DATE') {
        selectorText = this.headerDateFormat(selectorDate, this.activePicker);
      } else if (this.supportsLocaleFormat) {
        var format = this.activePicker === 'DATE' ? this.headerDateFormat : { year: 'numeric' };
        selectorText = selectorDate.toLocaleDateString(this.locale, Object.assign(format, {
          timeZone: this.timeZone
        }));
      } else if (this.activePicker === 'DATE') {
        selectorText = selectorDate.getFullYear() + '/';
        if (selectorDate.getMonth() < 9) selectorText += '0';
        selectorText += 1 + selectorDate.getMonth();
      } else if (this.activePicker === 'MONTH') {
        selectorText = selectorDate.getFullYear();
      }

      return this.$createElement('div', {
        'class': 'picker--date__header-selector'
      }, [this.genBtn(keyValue - 1, [this.$createElement('v-icon', 'chevron_left')]), this.genHeader(keyValue, selectorText), this.genBtn(keyValue + 1, [this.$createElement('v-icon', 'chevron_right')])]);
    }
  }
});

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    dateWheelScroll: function dateWheelScroll(e) {
      e.preventDefault();

      var month = this.tableMonth;

      if (e.deltaY < 0) month++;else month--;

      this.tableDate = this.normalizeDate(this.tableYear, month);
    },
    dateGenTHead: function dateGenTHead() {
      var _this = this;

      var days = this.narrowDays.map(function (day) {
        return _this.$createElement('th', day);
      });
      return this.$createElement('thead', this.dateGenTR(days));
    },
    dateClick: function dateClick(day) {
      var _this2 = this;

      this.inputDate = this.normalizeDate(this.tableYear, this.tableMonth, day);
      this.$nextTick(function () {
        return _this2.autosave && _this2.save();
      });
    },
    dateGenButtonText: function dateGenButtonText(date, day) {
      return this.supportsLocaleFormat ? date.toLocaleDateString(this.locale, {
        day: 'numeric',
        timeZone: this.timeZone
      }) : day;
    },
    dateGenTD: function dateGenTD(day) {
      var _this3 = this;

      var date = this.normalizeDate(this.tableYear, this.tableMonth, day);
      var buttonText = this.dateGenButtonText(date, day);
      var button = this.$createElement('button', {
        staticClass: 'btn btn--date-picker btn--floating btn--small btn--flat',
        'class': {
          'btn--active': this.dateIsActive(day),
          'btn--outline': this.dateIsCurrent(day) && !this.dateIsActive(day),
          'btn--disabled': !this.isAllowed(date)
        },
        attrs: {
          type: 'button'
        },
        domProps: {
          innerHTML: '<span class="btn__content">' + buttonText + '</span>'
        },
        on: {
          click: function click() {
            return _this3.dateClick(day);
          }
        }
      });

      return this.$createElement('td', [button]);
    },
    dateGenTBody: function dateGenTBody() {
      var children = [];
      var daysInMonth = this.normalizeDate(this.tableYear, this.tableMonth + 1, 0).getDate();
      var rows = [];
      var day = (this.normalizeDate(this.tableYear, this.tableMonth).getDay() - parseInt(this.firstDayOfWeek) + 7) % 7;

      for (var i = 0; i < day; i++) {
        rows.push(this.$createElement('td'));
      }

      for (var _i = 1; _i <= daysInMonth; _i++) {
        rows.push(this.dateGenTD(_i));

        if (rows.length % 7 === 0) {
          children.push(this.dateGenTR(rows));
          rows = [];
        }
      }

      if (rows.length) {
        children.push(this.dateGenTR(rows));
      }

      children.length < 6 && children.push(this.dateGenTR([this.$createElement('td', { domProps: { innerHTML: '&nbsp;' } })]));

      return this.$createElement('tbody', children);
    },
    dateGenTR: function dateGenTR() {
      var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return [this.$createElement('tr', data, children)];
    },
    dateIsActive: function dateIsActive(i) {
      return this.tableYear === this.year && this.tableMonth === this.month && this.day === i;
    },
    dateIsCurrent: function dateIsCurrent(i) {
      return this.currentYear === this.tableYear && this.currentMonth === this.tableMonth && this.currentDay === i;
    }
  }
});

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    monthWheelScroll: function monthWheelScroll(e) {
      e.preventDefault();

      var year = this.tableYear;

      if (e.deltaY < 0) year++;else year--;

      this.tableDate = this.normalizeDate(year);
    },
    monthClick: function monthClick(month) {
      var _this = this;

      this.inputDate = this.normalizeDate(this.tableYear, month, this.day);
      if (this.type === 'date') {
        this.activePicker = 'DATE';
      } else {
        this.$nextTick(function () {
          return _this.autosave && _this.save();
        });
      }
    },
    monthGenTD: function monthGenTD(month) {
      var _this2 = this;

      var date = this.normalizeDate(this.tableYear, month);
      var monthName = void 0;

      if (typeof this.monthFormat === 'function') {
        monthName = this.monthFormat(date);
      } else if (this.supportsLocaleFormat) {
        monthName = date.toLocaleDateString(this.locale, Object.assign(this.monthFormat, {
          timeZone: this.timeZone
        }));
      } else {
        monthName = date.getMonth() + 1;
        if (monthName < 10) {
          monthName = '0' + monthName;
        }
      }

      return this.$createElement('td', [this.$createElement('button', {
        'class': {
          'btn btn--date-picker': true,
          'btn--raised': this.monthIsActive(month),
          'btn--flat': true,
          'btn--active': this.monthIsActive(month),
          'btn--outline': this.monthIsCurrent(month) && !this.monthIsActive(month),
          'btn--disabled': this.type === 'month' && !this.isAllowed(date)
        },
        attrs: {
          type: 'button'
        },
        domProps: {
          innerHTML: '<span class="btn__content">' + monthName + '</span>'
        },
        on: {
          click: function click() {
            return _this2.monthClick(month);
          }
        }
      })]);
    },
    monthGenTBody: function monthGenTBody() {
      var _this3 = this;

      var children = [];
      var cols = Array(3).fill(null);
      var rows = 12 / cols.length;

      var _loop = function _loop(row) {
        children.push(_this3.$createElement('tr', cols.map(function (_, col) {
          return _this3.monthGenTD(row * cols.length + col);
        })));
      };

      for (var row = 0; row < rows; row++) {
        _loop(row);
      }

      return this.$createElement('tbody', children);
    },
    monthIsActive: function monthIsActive(i) {
      return this.tableYear === this.year && this.month === i;
    },
    monthIsCurrent: function monthIsCurrent(i) {
      return this.currentYear === this.tableYear && this.currentMonth === i;
    }
  }
});

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VDialog__ = __webpack_require__(26);


__WEBPACK_IMPORTED_MODULE_0__VDialog__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VDialog__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VDialog__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VDialog__["a" /* default */]);

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VDivider__ = __webpack_require__(138);


__WEBPACK_IMPORTED_MODULE_0__VDivider__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VDivider__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VDivider__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VDivider__["a" /* default */]);

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__ = __webpack_require__(0);
__webpack_require__(139);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-divider',

  functional: true,

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_themeable__["a" /* default */]],

  props: {
    inset: Boolean
  },

  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children;

    data.staticClass = ('divider ' + (data.staticClass || '')).trim();

    if (props.inset) data.staticClass += ' divider--inset';
    if (props.light) data.staticClass += ' theme--light';
    if (props.dark) data.staticClass += ' theme--dark';

    return h('hr', data);
  }
});

/***/ }),
/* 139 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VExpansionPanel__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VExpansionPanelContent__ = __webpack_require__(143);



__WEBPACK_IMPORTED_MODULE_0__VExpansionPanel__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VExpansionPanel__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VExpansionPanel__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VExpansionPanelContent__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VExpansionPanelContent__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VExpansionPanel__["a" /* default */]);

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

__webpack_require__(142);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-expansion-panel',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_themeable__["a" /* default */]],

  provide: function provide() {
    return {
      panelClick: this.panelClick,
      focusable: this.focusable
    };
  },


  props: {
    expand: Boolean,
    focusable: Boolean,
    inset: Boolean,
    popout: Boolean
  },

  methods: {
    getChildren: function getChildren() {
      return this.$children.filter(function (c) {
        if (!c.$options) return;

        return c.$options._componentTag === 'v-expansion-panel-content';
      });
    },
    panelClick: function panelClick(uid) {
      if (!this.expand) {
        return this.getChildren().forEach(function (e) {
          return e.toggle(uid);
        });
      }

      var panel = this.$children.find(function (e) {
        return e._uid === uid;
      });

      panel && panel.toggle(uid);
    }
  },

  render: function render(h) {
    return h('ul', {
      staticClass: 'expansion-panel',
      'class': _extends({
        'expansion-panel--focusable': this.focusable,
        'expansion-panel--popout': this.popout,
        'expansion-panel--inset': this.inset
      }, this.themeClasses)
    }, this.$slots.default);
  }
});

/***/ }),
/* 142 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transitions__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_bootable__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_ripple__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_click_outside__ = __webpack_require__(6);










/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-expansion-panel-content',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_bootable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__["a" /* default */]],

  components: {
    VIcon: __WEBPACK_IMPORTED_MODULE_3__VIcon__["a" /* default */]
  },

  directives: {
    Ripple: __WEBPACK_IMPORTED_MODULE_4__directives_ripple__["a" /* default */],
    ClickOutside: __WEBPACK_IMPORTED_MODULE_5__directives_click_outside__["a" /* default */]
  },

  inject: ['focusable', 'panelClick'],

  data: function data() {
    return {
      height: 'auto'
    };
  },


  props: {
    hideActions: Boolean,
    ripple: Boolean
  },

  methods: {
    genBody: function genBody() {
      return this.$createElement('div', {
        ref: 'body',
        class: 'expansion-panel__body',
        directives: [{
          name: 'show',
          value: this.isActive
        }]
      }, this.showLazyContent(this.$slots.default));
    },
    genHeader: function genHeader() {
      var _this = this;

      return this.$createElement('div', {
        staticClass: 'expansion-panel__header',
        directives: [{
          name: 'ripple',
          value: this.ripple
        }],
        on: {
          click: function click() {
            return _this.panelClick(_this._uid);
          }
        }
      }, [this.$slots.header, this.genIcon()]);
    },
    genIcon: function genIcon(h) {
      if (this.hideActions) return null;

      var icon = this.$slots.actions || this.$createElement('v-icon', 'keyboard_arrow_down');

      return this.$createElement('div', {
        staticClass: 'header__icon'
      }, [icon]);
    },
    toggle: function toggle(uid) {
      var _this2 = this;

      var isActive = this._uid === uid && !this.isActive;

      if (isActive) this.isBooted = true;

      // We treat bootable differently
      // Needs time to calc height
      this.$nextTick(function () {
        return _this2.isActive = isActive;
      });
    }
  },

  render: function render(h) {
    var _this3 = this;

    var children = [];

    this.$slots.header && children.push(this.genHeader());
    children.push(h(__WEBPACK_IMPORTED_MODULE_0__transitions__["a" /* VExpandTransition */], [this.genBody()]));

    return h('li', {
      staticClass: 'expansion-panel__container',
      'class': {
        'expansion-panel__container--active': this.isActive
      },
      attrs: {
        tabindex: 0
      },
      on: {
        keydown: function keydown(e) {
          // Ensure element is focusable and the activeElement
          if (_this3.focusable && _this3.$el === document.activeElement && e.keyCode === 13) _this3.panelClick(_this3._uid);
        }
      }
    }, children);
  }
});

/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VFooter__ = __webpack_require__(145);


__WEBPACK_IMPORTED_MODULE_0__VFooter__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VFooter__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VFooter__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VFooter__["a" /* default */]);

/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_applicationable__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_themeable__ = __webpack_require__(0);
__webpack_require__(146);





/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-footer',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_applicationable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_themeable__["a" /* default */]],

  props: {
    absolute: Boolean,
    fixed: Boolean
  },

  computed: {
    paddingLeft: function paddingLeft() {
      return this.fixed || !this.app ? 0 : this.$vuetify.application.left;
    },
    paddingRight: function paddingRight() {
      return this.fixed || !this.app ? 0 : this.$vuetify.application.right;
    }
  },

  destroyed: function destroyed() {
    if (this.app) this.$vuetify.application.bottom = 0;
  },


  methods: {
    updateApplication: function updateApplication() {
      if (!this.app) return;

      this.$vuetify.application.bottom = this.fixed ? this.$el && this.$el.clientHeight : 0;
    }
  },

  mounted: function mounted() {
    this.updateApplication();
  },
  render: function render(h) {
    this.updateApplication();

    var data = {
      staticClass: 'footer',
      'class': this.addBackgroundColorClassChecks({
        'footer--absolute': this.absolute,
        'footer--fixed': this.fixed,
        'theme--dark': this.dark,
        'theme--light': this.light
      }),
      style: {
        paddingLeft: this.paddingLeft + 'px',
        paddingRight: this.paddingRight + 'px'
      }
    };

    return h('footer', data, this.$slots.default);
  }
});

/***/ }),
/* 146 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VForm__ = __webpack_require__(148);


__WEBPACK_IMPORTED_MODULE_0__VForm__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VForm__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VForm__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VForm__["a" /* default */]);

/***/ }),
/* 148 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-form',

  inheritAttrs: false,

  data: function data() {
    return {
      inputs: [],
      errorBag: {}
    };
  },


  props: {
    value: Boolean,
    lazyValidation: Boolean
  },

  watch: {
    errorBag: {
      handler: function handler() {
        var errors = Object.values(this.errorBag).includes(true);

        this.$emit('input', !errors);

        return !errors;
      },

      deep: true
    }
  },

  methods: {
    getInputs: function getInputs() {
      var results = [];

      var search = function search(children) {
        var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var child = _step.value;

            if (child.errorBucket !== undefined) {
              results.push(child);
            } else {
              search(child.$children, depth + 1);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (depth === 0) return results;
      };

      return search(this.$children);
    },
    watchInputs: function watchInputs() {
      var inputs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.getInputs();
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = inputs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var child = _step2.value;

          if (this.inputs.includes(child)) {
            continue; // We already know about this input
          }

          this.inputs.push(child);
          this.watchChild(child);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    },
    watchChild: function watchChild(child) {
      var _this = this;

      var watcher = function watcher(child) {
        child.$watch('valid', function (val) {
          _this.$set(_this.errorBag, child._uid, !val);
        }, { immediate: true });
      };

      if (!this.lazyValidation) return watcher(child);

      // Only start watching inputs if we need to
      child.$watch('shouldValidate', function (val) {
        if (!val) return;

        // Only watch if we're not already doing it
        if (_this.errorBag.hasOwnProperty(child._uid)) return;

        watcher(child);
      });
    },
    validate: function validate() {
      var errors = this.inputs.filter(function (input) {
        return !input.validate(true);
      }).length;
      return !errors;
    },
    reset: function reset() {
      var _this2 = this;

      this.inputs.forEach(function (input) {
        return input.reset();
      });
      if (this.lazyValidation) {
        Object.keys(this.errorBag).forEach(function (key) {
          return _this2.$delete(_this2.errorBag, key);
        });
      }
    }
  },

  mounted: function mounted() {
    var _this3 = this;

    this.$vuetify.load(function () {
      return _this3.watchInputs();
    });
  },
  updated: function updated() {
    var inputs = this.getInputs();

    if (inputs.length < this.inputs.length) {
      // Something was removed, we don't want it in the errorBag any more
      var removed = this.inputs.filter(function (i) {
        return !inputs.includes(i);
      });

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = removed[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var input = _step3.value;

          this.$delete(this.errorBag, input._uid);
          this.$delete(this.inputs, this.inputs.indexOf(input));
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }

    this.watchInputs(inputs);
  },
  render: function render(h) {
    var _this4 = this;

    return h('form', {
      attrs: this.$attrs,
      on: {
        submit: function submit(e) {
          return _this4.$emit('submit', e);
        }
      }
    }, this.$slots.default);
  }
});

/***/ }),
/* 149 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export VSpacer */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VContent__ = __webpack_require__(150);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VContainer__ = __webpack_require__(152);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VFlex__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__VLayout__ = __webpack_require__(154);
/* unused harmony reexport VContainer */
/* unused harmony reexport VContent */
/* unused harmony reexport VFlex */
/* unused harmony reexport VLayout */






var VSpacer = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('spacer');


var VGrid = {};

VGrid.install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VContent__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VContent__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_2__VContainer__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__VContainer__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_3__VFlex__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_3__VFlex__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_4__VLayout__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_4__VLayout__["a" /* default */]);
  Vue.component(VSpacer.name, VSpacer);
};

/* harmony default export */ __webpack_exports__["a"] = (VGrid);

/***/ }),
/* 150 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__(151);

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-content',

  computed: {
    styles: function styles() {
      var _$vuetify$application = this.$vuetify.application,
          bar = _$vuetify$application.bar,
          top = _$vuetify$application.top,
          right = _$vuetify$application.right,
          bottom = _$vuetify$application.bottom,
          left = _$vuetify$application.left;


      return {
        paddingTop: top + bar + 'px',
        paddingRight: right + 'px',
        paddingBottom: bottom + 'px',
        paddingLeft: left + 'px'
      };
    }
  },

  render: function render(h) {
    var data = {
      staticClass: 'content',
      style: this.styles
    };

    return h('div', data, this.$slots.default);
  }
});

/***/ }),
/* 151 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 152 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__grid__ = __webpack_require__(23);
__webpack_require__(22);



/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__grid__["a" /* default */])('container'));

/***/ }),
/* 153 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__grid__ = __webpack_require__(23);
__webpack_require__(22);



/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__grid__["a" /* default */])('flex'));

/***/ }),
/* 154 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__grid__ = __webpack_require__(23);
__webpack_require__(22);



/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_0__grid__["a" /* default */])('layout'));

/***/ }),
/* 155 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VNavigationDrawer__ = __webpack_require__(156);


__WEBPACK_IMPORTED_MODULE_0__VNavigationDrawer__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VNavigationDrawer__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VNavigationDrawer__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VNavigationDrawer__["a" /* default */]);

/***/ }),
/* 156 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_applicationable__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_overlayable__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_themeable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__directives_click_outside__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__directives_resize__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__directives_touch__ = __webpack_require__(8);
__webpack_require__(157);









/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-navigation-drawer',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_applicationable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_overlayable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_themeable__["a" /* default */]],

  directives: {
    ClickOutside: __WEBPACK_IMPORTED_MODULE_3__directives_click_outside__["a" /* default */],
    Resize: __WEBPACK_IMPORTED_MODULE_4__directives_resize__["a" /* default */],
    Touch: __WEBPACK_IMPORTED_MODULE_5__directives_touch__["a" /* default */]
  },

  data: function data() {
    return {
      isActive: this.value,
      isBooted: false,
      isMobile: false,
      touchArea: {
        left: 0,
        right: 0
      }
    };
  },


  props: {
    absolute: Boolean,
    clipped: Boolean,
    disableRouteWatcher: Boolean,
    enableResizeWatcher: Boolean,
    height: String,
    floating: Boolean,
    miniVariant: Boolean,
    miniVariantWidth: {
      type: [Number, String],
      default: 80
    },
    mobileBreakPoint: {
      type: Number,
      default: 1264
    },
    permanent: Boolean,
    persistent: Boolean,
    right: Boolean,
    temporary: Boolean,
    touchless: Boolean,
    width: {
      type: [Number, String],
      default: 300
    },
    value: { required: false }
  },

  computed: {
    calculatedHeight: function calculatedHeight() {
      return this.height || '100%';
    },
    calculatedWidth: function calculatedWidth() {
      return this.miniVariant ? this.miniVariantWidth : this.width;
    },
    classes: function classes() {
      return {
        'navigation-drawer': true,
        'navigation-drawer--absolute': this.absolute,
        'navigation-drawer--clipped': this.clipped,
        'navigation-drawer--close': !this.isBooted || !this.isActive,
        'navigation-drawer--floating': this.floating,
        'navigation-drawer--is-booted': this.isBooted,
        'navigation-drawer--is-mobile': this.isMobile,
        'navigation-drawer--mini-variant': this.miniVariant,
        'navigation-drawer--open': this.isActive && this.isBooted,
        'navigation-drawer--permanent': this.permanent,
        'navigation-drawer--persistent': this.persistent,
        'navigation-drawer--right': this.right,
        'navigation-drawer--temporary': this.temporary,
        'theme--dark': this.dark,
        'theme--light': this.light
      };
    },
    marginTop: function marginTop() {
      if (!this.app) return 0;
      var marginTop = this.$vuetify.application.bar;

      marginTop += this.clipped ? this.$vuetify.application.top : 0;

      return marginTop;
    },
    maxHeight: function maxHeight() {
      if (!this.app) return '100%';

      return this.clipped ? this.$vuetify.application.top + this.$vuetify.application.bottom : this.$vuetify.application.bottom;
    },
    showOverlay: function showOverlay() {
      return !this.permanent && this.isActive && (this.temporary || this.isMobile);
    },
    styles: function styles() {
      return {
        height: this.calculatedHeight,
        marginTop: this.marginTop + 'px',
        maxHeight: 'calc(100% - ' + this.maxHeight + 'px)',
        width: this.calculatedWidth + 'px'
      };
    }
  },

  watch: {
    $route: function $route() {
      if (!this.disableRouteWatcher) {
        this.isActive = !this.closeConditional();
      }
    },
    isActive: function isActive(val) {
      this.$emit('input', val);
      this.showOverlay && val && this.genOverlay() || this.removeOverlay();
      this.$el.scrollTop = 0;
    },
    isMobile: function isMobile(val) {
      !val && this.removeOverlay();
    },
    permanent: function permanent(val) {
      this.$emit('input', val);
    },
    value: function value(val) {
      if (this.permanent) return;
      if (val !== this.isActive) this.isActive = val;
    }
  },

  mounted: function mounted() {
    this.$vuetify.load(this.init);
  },


  methods: {
    init: function init() {
      var _this = this;

      if (this.value != null) this.isActive = this.value;else if (this.permanent) this.isActive = true;else if (this.isMobile) this.isActive = false;else if (!this.value && (this.persistent || this.temporary)) this.isActive = false;else this.isActive = true;

      setTimeout(function () {
        return _this.isBooted = true;
      }, 0);
    },
    calculateTouchArea: function calculateTouchArea() {
      if (!this.$el.parentNode) return;
      var parentRect = this.$el.parentNode.getBoundingClientRect();

      this.touchArea = {
        left: parentRect.left + 50,
        right: parentRect.right - 50
      };
    },
    checkIfMobile: function checkIfMobile() {
      this.isMobile = window.innerWidth < parseInt(this.mobileBreakPoint);
    },
    closeConditional: function closeConditional() {
      return !this.permanent && (this.temporary || this.isMobile);
    },
    genDirectives: function genDirectives() {
      var directives = [{
        name: 'click-outside',
        value: this.closeConditional
      }, {
        name: 'resize',
        value: this.onResize
      }];

      !this.touchless && directives.push({
        name: 'touch',
        value: {
          parent: true,
          left: this.swipeLeft,
          right: this.swipeRight
        }
      });

      return directives;
    },
    onResize: function onResize() {
      if (!this.enableResizeWatcher || this.permanent || this.temporary) return;

      this.checkIfMobile();

      this.isActive = !this.isMobile;
    },
    swipeRight: function swipeRight(e) {
      if (this.isActive && !this.right) return;
      this.calculateTouchArea();

      if (Math.abs(e.touchendX - e.touchstartX) < 100) return;else if (!this.right && e.touchstartX <= this.touchArea.left) this.isActive = true;else if (this.right && this.isActive) this.isActive = false;
    },
    swipeLeft: function swipeLeft(e) {
      if (this.isActive && this.right) return;
      this.calculateTouchArea();

      if (Math.abs(e.touchendX - e.touchstartX) < 100) return;else if (this.right && e.touchstartX >= this.touchArea.right) this.isActive = true;else if (!this.right && this.isActive) this.isActive = false;
    },
    updateApplication: function updateApplication() {
      if (!this.app) return;

      var width = !this.isActive || !this.isBooted || !this.permanent && this.$vuetify.breakpoint.width < this.mobileBreakPoint ? 0 : this.calculatedWidth;

      if (this.right) {
        this.$vuetify.application.right = width;
      } else {
        this.$vuetify.application.left = width;
      }
    }
  },

  render: function render(h) {
    var _this2 = this;

    this.updateApplication();

    var data = {
      'class': this.classes,
      style: this.styles,
      directives: this.genDirectives(),
      on: {
        click: function click() {
          return _this2.$emit('update:miniVariant', false);
        }
      }
    };

    return h('aside', data, [this.$slots.default, h('div', { 'class': 'navigation-drawer__border' })]);
  }
});

/***/ }),
/* 157 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 158 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VPagination__ = __webpack_require__(159);


__WEBPACK_IMPORTED_MODULE_0__VPagination__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VPagination__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VPagination__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VPagination__["a" /* default */]);

/***/ }),
/* 159 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_resize__ = __webpack_require__(7);
function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

__webpack_require__(160);





/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-pagination',

  directives: { Resize: __WEBPACK_IMPORTED_MODULE_1__directives_resize__["a" /* default */] },

  props: {
    circle: Boolean,
    disabled: Boolean,
    length: {
      type: Number,
      default: 0,
      validator: function validator(val) {
        return val % 1 === 0;
      }
    },
    totalVisible: [Number, String],
    nextIcon: {
      type: String,
      default: 'chevron_right'
    },
    prevIcon: {
      type: String,
      default: 'chevron_left'
    },
    value: {
      type: Number,
      default: 0
    }
  },

  data: function data() {
    return {
      maxButtons: 0
    };
  },


  watch: {
    value: function value() {
      this.init();
    }
  },

  computed: {
    classes: function classes() {
      return {
        'pagination': true,
        'pagination--circle': this.circle,
        'pagination--disabled': this.disabled
      };
    },
    items: function items() {
      var maxLength = this.totalVisible || this.maxButtons;
      if (this.length <= maxLength) {
        return this.range(1, this.length);
      }

      var even = maxLength % 2 === 0 ? 1 : 0;
      var left = Math.floor(maxLength / 2);
      var right = this.length - left + 1 + even;

      if (this.value >= left && this.value <= right) {
        var start = this.value - left + 2;
        var end = this.value + left - 2 - even;

        return [1, '...'].concat(_toConsumableArray(this.range(start, end)), ['...', this.length]);
      } else {
        return [].concat(_toConsumableArray(this.range(1, left)), ['...'], _toConsumableArray(this.range(this.length - left + 1 + even, this.length)));
      }
    }
  },

  mounted: function mounted() {
    this.$vuetify.load.call(this, this.init);
  },


  methods: {
    onResize: function onResize() {
      var width = this.$el && this.$el.parentNode ? this.$el.parentNode.clientWidth : window.innerWidth;

      this.maxButtons = Math.floor((width - 96) / 42);
    },
    init: function init() {
      var _this = this;

      this.selected = null;

      // Change this
      setTimeout(function () {
        return _this.selected = _this.value;
      }, 100);
    },
    next: function next(e) {
      e.preventDefault();
      this.$emit('input', this.value + 1);
      this.$emit('next');
    },
    previous: function previous(e) {
      e.preventDefault();
      this.$emit('input', this.value - 1);
      this.$emit('previous');
    },
    range: function range(from, to) {
      var range = [];

      from = from > 0 ? from : 1;

      for (var i = from; i <= to; i++) {
        range.push(i);
      }

      return range;
    },
    genIcon: function genIcon(h, icon, disabled, fn) {
      return h('li', [h('a', {
        class: {
          'pagination__navigation': true,
          'pagination__navigation--disabled': disabled
        },
        attrs: { href: '#!' },
        on: { click: fn }
      }, [h(__WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */], [icon])])]);
    },
    genItem: function genItem(h, i) {
      var _this2 = this;

      return h('a', {
        class: {
          'pagination__item': true,
          'pagination__item--active': i === this.value
        },
        attrs: { href: '#!' },
        on: {
          click: function click(e) {
            e.preventDefault();
            _this2.$emit('input', i);
          }
        }
      }, [i]);
    },
    genItems: function genItems(h) {
      var _this3 = this;

      return this.items.map(function (i) {
        return h('li', [isNaN(i) && h('span', { class: 'pagination__more' }, [i]) || _this3.genItem(h, i)]);
      });
    }
  },

  render: function render(h) {
    var children = [this.genIcon(h, this.prevIcon, this.value === 1, this.previous), this.genItems(h), this.genIcon(h, this.nextIcon, this.value === this.length, this.next)];

    return h('ul', {
      directives: [{ name: 'resize', value: this.onResize }],
      class: this.classes
    }, children);
  }
});

/***/ }),
/* 160 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 161 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VParallax__ = __webpack_require__(162);


__WEBPACK_IMPORTED_MODULE_0__VParallax__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VParallax__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VParallax__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VParallax__["a" /* default */]);

/***/ }),
/* 162 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_translatable__ = __webpack_require__(164);
__webpack_require__(163);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-parallax',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_translatable__["a" /* default */]],

  data: function data() {
    return {
      isBooted: false
    };
  },


  props: {
    alt: String,
    height: {
      type: [String, Number],
      default: 500
    },
    jumbotron: Boolean,
    src: String
  },

  computed: {
    styles: function styles() {
      return {
        display: 'block',
        opacity: this.isBooted ? 1 : 0,
        transform: 'translate3d(-50%, ' + (this.jumbotron ? 0 : this.parallax + 'px') + ', 0)'
      };
    }
  },

  watch: {
    parallax: function parallax() {
      this.isBooted = true;
    }
  },

  methods: {
    init: function init() {
      var _this = this;

      if (!this.$refs.img) return;

      if (this.$refs.img.complete) {
        this.translate();
        this.listeners();
      } else {
        this.$refs.img.addEventListener('load', function () {
          _this.translate();
          _this.listeners();
        }, false);
      }
    },
    objHeight: function objHeight() {
      return this.$refs.img.naturalHeight;
    },
    elOffsetTop: function elOffsetTop() {
      return this.$el.offsetTop;
    }
  },

  render: function render(h) {
    var imgData = {
      staticClass: 'parallax__image',
      'class': {
        'parallax__image--jumbotron': this.jumbotron
      },
      style: this.styles,
      attrs: {
        src: this.src
      },
      ref: 'img'
    };

    if (this.alt) imgData.attrs.alt = this.alt;

    var container = h('div', {
      staticClass: 'parallax__image-container'
    }, [h('img', imgData)]);

    var content = h('div', {
      staticClass: 'parallax__content'
    }, this.$slots.default);

    return h('div', {
      staticClass: 'parallax',
      style: {
        height: this.jumbotron ? this.normalizedHeight : this.normalizedHeight + 'px'
      },
      on: this.$listeners
    }, [container, content]);
  }
});

/***/ }),
/* 163 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 164 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      parallax: null,
      parallaxDist: null,
      percentScrolled: null,
      scrollTop: null,
      windowHeight: null,
      windowBottom: null
    };
  },


  computed: {
    normalizedHeight: function normalizedHeight() {
      if (this.jumbotron) {
        return isNaN(this.height) ? this.height : this.height + 'px';
      }

      return Number(this.height.toString().replace(/(^[0-9]*$)/, '$1'));
    },
    imgHeight: function imgHeight() {
      return this.objHeight();
    }
  },

  mounted: function mounted() {
    this.$vuetify.load(this.init);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('scroll', this.translate, false);
    window.removeEventListener('resize', this.translate, false);
  },


  methods: {
    listeners: function listeners() {
      window.addEventListener('scroll', this.translate, false);
      window.addEventListener('resize', this.translate, false);
    },
    translate: function translate() {
      this.calcDimensions();

      this.percentScrolled = (this.windowBottom - this.elOffsetTop) / (this.normalizedHeight + this.windowHeight);

      this.parallax = Math.round(this.parallaxDist * this.percentScrolled);

      if (this.translated) {
        this.translated();
      }
    },
    calcDimensions: function calcDimensions() {
      var offset = this.$el.getBoundingClientRect();

      this.scrollTop = window.pageYOffset;
      this.parallaxDist = this.imgHeight - this.normalizedHeight;
      this.elOffsetTop = offset.top + this.scrollTop;
      this.windowHeight = window.innerHeight;
      this.windowBottom = this.scrollTop + this.windowHeight;
    }
  }
});

/***/ }),
/* 165 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VProgressCircular__ = __webpack_require__(166);


__WEBPACK_IMPORTED_MODULE_0__VProgressCircular__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VProgressCircular__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VProgressCircular__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VProgressCircular__["a" /* default */]);

/***/ }),
/* 166 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_colorable__ = __webpack_require__(2);
__webpack_require__(167);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-progress-circular',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_colorable__["a" /* default */]],

  props: {
    button: Boolean,

    fill: {
      type: String,
      default: function _default() {
        return this.indeterminate ? 'none' : 'transparent';
      }
    },

    indeterminate: Boolean,

    rotate: {
      type: Number,
      default: 0
    },

    size: {
      type: [Number, String],
      default: 32
    },

    width: {
      type: Number,
      default: 4
    },

    value: {
      type: Number,
      default: 0
    }
  },

  computed: {
    calculatedSize: function calculatedSize() {
      var size = Number(this.size);

      if (this.button) {
        size += 8;
      }

      return size;
    },
    circumference: function circumference() {
      return 2 * Math.PI * this.radius;
    },
    classes: function classes() {
      return this.addTextColorClassChecks({
        'progress-circular': true,
        'progress-circular--indeterminate': this.indeterminate,
        'progress-circular--button': this.button
      });
    },
    cxy: function cxy() {
      return this.indeterminate && !this.button ? 50 : this.calculatedSize / 2;
    },
    normalizedValue: function normalizedValue() {
      if (this.value < 0) {
        return 0;
      }

      if (this.value > 100) {
        return 100;
      }

      return this.value;
    },
    radius: function radius() {
      return this.indeterminate && !this.button ? 20 : (this.calculatedSize - this.width) / 2;
    },
    strokeDashArray: function strokeDashArray() {
      return Math.round(this.circumference * 1000) / 1000;
    },
    strokeDashOffset: function strokeDashOffset() {
      return (100 - this.normalizedValue) / 100 * this.circumference + 'px';
    },
    styles: function styles() {
      return {
        height: this.calculatedSize + 'px',
        width: this.calculatedSize + 'px'
      };
    },
    svgSize: function svgSize() {
      return this.indeterminate ? false : this.calculatedSize;
    },
    svgStyles: function svgStyles() {
      return {
        transform: 'rotate(' + this.rotate + 'deg)'
      };
    },
    viewBox: function viewBox() {
      return this.indeterminate ? '25 25 50 50' : false;
    }
  },

  methods: {
    genCircle: function genCircle(h, name, offset) {
      return h('circle', {
        class: 'progress-circular__' + name,
        attrs: {
          fill: 'transparent',
          cx: this.cxy,
          cy: this.cxy,
          r: this.radius,
          'stroke-width': this.width,
          'stroke-dasharray': this.strokeDashArray,
          'stroke-dashoffset': offset
        }
      });
    },
    genSvg: function genSvg(h) {
      var children = [!this.indeterminate && this.genCircle(h, 'underlay', 0), this.genCircle(h, 'overlay', this.strokeDashOffset)];

      return h('svg', {
        style: this.svgStyles,
        attrs: {
          xmlns: 'http://www.w3.org/2000/svg',
          height: this.svgSize,
          width: this.svgSize,
          viewBox: this.viewBox
        }
      }, children);
    }
  },

  render: function render(h) {
    var info = h('div', { class: 'progress-circular__info' }, [this.$slots.default]);
    var svg = this.genSvg(h);

    return h('div', {
      class: this.classes,
      style: this.styles,
      on: this.$listeners
    }, [svg, info]);
  }
});

/***/ }),
/* 167 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 168 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VRadioGroup__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VRadio__ = __webpack_require__(171);
/* unused harmony reexport VRadioGroup */
/* unused harmony reexport VRadio */





__WEBPACK_IMPORTED_MODULE_0__VRadioGroup__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VRadioGroup__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VRadioGroup__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VRadio__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VRadio__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VRadioGroup__["a" /* default */]);

/***/ }),
/* 169 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_input__ = __webpack_require__(14);
__webpack_require__(13);
__webpack_require__(20);
__webpack_require__(170);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-radio-group',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_input__["a" /* default */]],

  model: {
    prop: 'inputValue',
    event: 'change'
  },

  provide: function provide() {
    var _this = this;

    return {
      isMandatory: function isMandatory() {
        return _this.mandatory;
      },
      name: function name() {
        return _this.name;
      },
      registerChild: this.registerChild,
      unregisterChild: this.unregisterChild
    };
  },


  props: {
    column: {
      type: Boolean,
      default: true
    },
    inputValue: null,
    mandatory: {
      type: Boolean,
      default: true
    },
    name: String,
    row: Boolean
  },

  data: function data() {
    return {
      internalTabIndex: -1
    };
  },


  watch: {
    inputValue: function inputValue(val) {
      this.getRadios().forEach(function (radio) {
        radio.isActive = val === radio.value;
      });
    }
  },

  computed: {
    classes: function classes() {
      return {
        'radio-group': true,
        'radio-group--column': this.column && !this.row,
        'radio-group--row': this.row
      };
    }
  },

  methods: {
    getRadios: function getRadios() {
      return this.$children.filter(function (child) {
        return child.$el.classList.contains('radio');
      });
    },
    toggleRadio: function toggleRadio(value) {
      var _this2 = this;

      if (this.disabled) {
        return;
      }

      this.shouldValidate = true;
      this.$emit('change', value);
      this.$nextTick(function () {
        return _this2.validate();
      });

      this.getRadios().filter(function (r) {
        return r.value !== value;
      }).forEach(function (r) {
        return r.isActive = false;
      });
    },
    radioBlur: function radioBlur(e) {
      if (!e.relatedTarget || !e.relatedTarget.classList.contains('radio')) {
        this.shouldValidate = true;
        this.$emit('blur', this.inputValue);
      }
    },
    registerChild: function registerChild(radio) {
      radio.isActive = this.inputValue === radio.value;
      radio.$el.tabIndex = radio.$el.tabIndex > 0 ? radio.$el.tabIndex : 0;
      radio.$on('change', this.toggleRadio);
      radio.$on('blur', this.radioBlur);
      radio.$on('focus', this.radioFocus);
    },
    unregisterChild: function unregisterChild(radio) {
      radio.$off('change', this.toggleRadio);
      radio.$off('blur', this.radioBlur);
      radio.$off('focus', this.radioFocus);
    }
  },

  mounted: function mounted() {
    var _this3 = this;

    this.getRadios().forEach(function (radio) {
      return _this3.registerChild(radio);
    });
  },
  beforeDestroy: function beforeDestroy() {
    var _this4 = this;

    this.getRadios().forEach(function (radio) {
      return _this4.unregisterChild(radio);
    });
  },
  render: function render(h) {
    var data = {
      attrs: {
        role: 'radiogroup'
      }
    };
    return this.genInputGroup(this.$slots.default, data);
  }
});

/***/ }),
/* 170 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 171 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transitions__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_colorable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_rippleable__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_tab_focusable__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_themeable__ = __webpack_require__(0);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };









/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-radio',

  inheritAttrs: false,

  inject: ['isMandatory', 'name', 'registerChild', 'unregisterChild'],

  components: {
    VFadeTransition: __WEBPACK_IMPORTED_MODULE_0__transitions__["b" /* VFadeTransition */],
    VIcon: __WEBPACK_IMPORTED_MODULE_1__VIcon__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_rippleable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_tab_focusable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__mixins_themeable__["a" /* default */]],

  props: {
    disabled: Boolean,
    value: null,
    label: String
  },

  data: function data() {
    return {
      isActive: false
    };
  },


  computed: {
    classes: function classes() {
      return this.addTextColorClassChecks({
        'input-group': true,
        'input-group--active': this.isActive,
        'input-group--disabled': this.disabled,
        'input-group--selection-controls': true,
        'input-group--tab-focused': this.tabFocused,
        'radio': true,
        'theme--dark': this.dark,
        'theme--light': this.light
      });
    },
    icon: function icon() {
      return this.isActive ? 'radio_button_checked' : 'radio_button_unchecked';
    }
  },

  methods: {
    genInput: function genInput(radio) {
      var value = ['string', 'number'].includes(_typeof(this.value)) ? this.value : JSON.stringify(this.value);
      var input = this.$createElement('input', {
        ref: 'input',
        style: {
          display: 'none'
        },
        attrs: Object.assign({
          name: this.name && this.name(),
          id: this.id,
          type: 'radio',
          value: value
        }, this.$attrs)
      }, [value]);

      radio.push(input);

      return this.$createElement('div', {
        class: 'input-group__input'
      }, radio);
    },
    genWrapper: function genWrapper(radio) {
      var _this = this;

      var children = [];

      children.push(this.genLabel());
      children.push(this.genInput(radio));

      return this.$createElement('div', {
        class: this.classes,
        attrs: {
          role: 'radio',
          'aria-checked': this.isActive && 'true' || 'false',
          'aria-label': this.label
        },
        on: {
          keydown: function keydown(e) {
            if ([13, 32].includes(e.keyCode)) {
              e.preventDefault();
              _this.toggle();
            }
          },
          blur: function blur(e) {
            _this.$emit('blur', e);
            _this.tabFocused = false;
          }
        }
      }, children);
    },
    genLabel: function genLabel() {
      return this.$createElement('label', {
        on: {
          click: this.toggle
        }
      }, this.$slots.label || this.label);
    },
    toggle: function toggle() {
      var mandatory = this.isMandatory && this.isMandatory() || false;

      if (!this.disabled && (!this.isActive || !mandatory)) {
        this.$refs.input.checked = true;
        this.isActive = true;
        this.$emit('change', this.value);
      }
    }
  },

  created: function created() {
    // Semantic check to help people identify the reason for the inject error above it.
    if (!this.$parent || !this.$parent.$vnode || !this.$parent.$vnode.tag || !this.$parent.$vnode.tag.endsWith('v-radio-group')) {
      console.warn('[Vuetify] Warn: The v-radio component must have an immediate parent of v-radio-group.');
    }
  },
  mounted: function mounted() {
    this.registerChild(this);
  },
  beforeDestroy: function beforeDestroy() {
    this.unregisterChild(this);
  },
  render: function render(h) {
    var transition = h('v-fade-transition', {}, [h('v-icon', {
      staticClass: 'icon--selection-control',
      'class': {
        'icon--radio': this.isActive
      },
      key: this.icon
    }, this.icon)]);

    return this.genWrapper([transition, this.genRipple()]);
  }
});

/***/ }),
/* 172 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      tabFocused: false
    };
  }
});

/***/ }),
/* 173 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VSlider__ = __webpack_require__(174);


__WEBPACK_IMPORTED_MODULE_0__VSlider__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSlider__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VSlider__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VSlider__["a" /* default */]);

/***/ }),
/* 174 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_input__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_click_outside__ = __webpack_require__(6);
__webpack_require__(175);







/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-slider',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_input__["a" /* default */]],

  directives: { ClickOutside: __WEBPACK_IMPORTED_MODULE_2__directives_click_outside__["a" /* default */] },

  data: function data() {
    return {
      app: {},
      isActive: false,
      keyPressed: 0
    };
  },


  props: {
    color: {
      type: String,
      default: null
    },
    min: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: [Number, String],
      default: 100
    },
    step: {
      type: [Number, String],
      default: null
    },
    thumbColor: {
      type: String,
      default: null
    },
    thumbLabel: Boolean,
    value: [Number, String],
    snap: Boolean,
    trackColor: {
      type: String,
      default: null
    }
  },

  computed: {
    classes: function classes() {
      return {
        'input-group--slider': true,
        'input-group--active': this.isActive,
        'input-group--dirty': this.inputWidth > 0,
        'input-group--disabled': this.disabled,
        'input-group--ticks': !this.disabled && this.step
      };
    },

    inputValue: {
      get: function get() {
        return this.value;
      },
      set: function set(val) {
        var min = this.min,
            max = this.max,
            step = this.step,
            snap = this.snap;

        val = val < min && min || val > max && max || val;

        // Round value to ensure the
        // entire slider range can
        // be selected with step
        var value = snap ? Math.round(val / step) * step : Math.round(val);
        this.lazyValue = value;

        if (value !== this.value) {
          this.$emit('input', value);
        }
      }
    },
    interval: function interval() {
      return 100 / (this.max - this.min) * this.step;
    },
    thumbContainerClasses: function thumbContainerClasses() {
      return {
        'slider__thumb-container': true,
        'slider__thumb-container--label': this.thumbLabel
      };
    },
    thumbStyles: function thumbStyles() {
      return {
        transition: this.keyPressed >= 2 ? 'none' : '',
        left: this.inputWidth + '%'
      };
    },
    tickContainerStyles: function tickContainerStyles() {
      return {
        transform: 'translate3d(0, -50%, 0)'
      };
    },
    trackStyles: function trackStyles() {
      var scaleX = this.calculateScale(1 - this.inputWidth / 100);
      var offsetX = this.thumbLabel ? 0 : !this.isActive ? 8 : 12;
      var translateX = offsetX + 'px';
      return {
        transition: this.keyPressed >= 2 ? 'none' : '',
        transform: 'scaleX(' + scaleX + ') translateX(' + translateX + ')'
      };
    },
    trackFillStyles: function trackFillStyles() {
      var inputWidth = this.inputWidth;
      var scaleX = this.calculateScale(inputWidth / 100);
      var translateX = inputWidth > 99 && !this.thumbLabel ? -8 + 'px' : 0;
      return {
        transition: this.keyPressed >= 2 ? 'none' : '',
        transform: 'scaleX(' + scaleX + ') translateX(' + translateX + ')'
      };
    },
    numTicks: function numTicks() {
      return parseInt((this.max - this.min) / this.step);
    },
    inputWidth: function inputWidth() {
      var val = this.inputValue;
      if (this.snap) {
        val = Math.round(val / this.step) * this.step;
      }

      val = (val - this.min) / (this.max - this.min) * 100;

      return val < 0.15 ? 0 : val;
    }
  },

  watch: {
    isActive: function isActive(val) {
      this.isFocused = val;
    },
    min: function min(val) {
      val > this.inputValue && this.$emit('input', val);
    },
    max: function max(val) {
      val < this.inputValue && this.$emit('input', val);
    },
    value: function value(val) {
      this.inputValue = val;
    }
  },

  mounted: function mounted() {
    this.inputValue = this.value;

    // Without a v-app, iOS does not work with body selectors
    this.app = document.querySelector('[data-app]') || console.warn('The v-slider component requires the presence of v-app or a non-body wrapping element with the [data-app] attribute.');
  },


  methods: {
    calculateScale: function calculateScale(scale) {
      return this.disabled ? scale - 0.015 : scale;
    },
    onMouseDown: function onMouseDown(e) {
      this.keyPressed = 2;
      var options = { passive: true };
      this.isActive = true;

      if ('touches' in e) {
        this.app.addEventListener('touchmove', this.onMouseMove, options);
        Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* addOnceEventListener */])(this.app, 'touchend', this.onMouseUp);
      } else {
        this.app.addEventListener('mousemove', this.onMouseMove, options);
        Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["a" /* addOnceEventListener */])(this.app, 'mouseup', this.onMouseUp);
      }
    },
    onMouseUp: function onMouseUp() {
      this.keyPressed = 0;
      var options = { passive: true };
      this.isActive = false;
      this.app.removeEventListener('touchmove', this.onMouseMove, options);
      this.app.removeEventListener('mousemove', this.onMouseMove, options);
    },
    onMouseMove: function onMouseMove(e) {
      var _$refs$track$getBound = this.$refs.track.getBoundingClientRect(),
          offsetLeft = _$refs$track$getBound.left,
          trackWidth = _$refs$track$getBound.width;

      var clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      var left = (clientX - offsetLeft) / trackWidth * 100;

      if (left >= 0 && left <= 100) {
        this.inputValue = parseInt(this.min, 10) + left / 100 * (this.max - this.min);
      }
    },
    onKeyDown: function onKeyDown(e) {
      if (e.keyCode === 37 || e.keyCode === 39) {
        this.keyPressed += 1;

        var direction = e.keyCode === 37 && -1 || e.keyCode === 39 && 1 || 0;
        var multiplier = e.shiftKey && 3 || e.ctrlKey && 2 || 1;
        var amount = this.snap && this.step || 1;

        this.inputValue = this.inputValue + direction * amount * multiplier;
      }
    },
    onKeyUp: function onKeyUp(e) {
      this.keyPressed = 0;
    },
    sliderMove: function sliderMove(e) {
      if (!this.isActive) {
        this.onMouseMove(e);
      }
    },
    genThumbLabel: function genThumbLabel(h) {
      return h('v-scale-transition', {
        props: { origin: 'bottom center' }
      }, [h('div', {
        'class': 'slider__thumb--label__container',
        directives: [{
          name: 'show',
          value: this.isActive
        }]
      }, [h('div', { 'class': ['slider__thumb--label', this.thumbColor || this.color] }, [h('span', {}, parseInt(this.inputValue))])])]);
    },
    genThumbContainer: function genThumbContainer(h) {
      var children = [];
      children.push(h('div', { 'class': ['slider__thumb', this.thumbColor || this.color] }));

      this.thumbLabel && children.push(this.genThumbLabel(h));

      return h('div', {
        'class': this.thumbContainerClasses,
        style: this.thumbStyles,
        on: {
          touchstart: this.onMouseDown,
          mousedown: this.onMouseDown
        },
        ref: 'thumb'
      }, children);
    },
    genSteps: function genSteps(h) {
      var _this = this;

      var ticks = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createRange */])(this.numTicks + 1).map(function (i) {
        var span = h('span', {
          class: 'slider__tick',
          style: {
            left: i * (100 / _this.numTicks) + '%'
          }
        });

        return span;
      });

      return h('div', {
        'class': 'slider__ticks-container',
        style: this.tickContainerStyles
      }, ticks);
    },
    genTrackContainer: function genTrackContainer(h) {
      var children = [h('div', {
        'class': ['slider__track', this.trackColor],
        style: this.trackStyles
      }), h('div', {
        'class': ['slider__track-fill', this.color],
        style: this.trackFillStyles
      })];

      return h('div', {
        'class': 'slider__track__container',
        ref: 'track'
      }, children);
    }
  },

  render: function render(h) {
    var children = [];

    children.push(this.genTrackContainer(h));
    this.step && children.push(this.genSteps(h));
    children.push(this.genThumbContainer(h));

    var slider = h('div', { 'class': 'slider' }, children);

    return this.genInputGroup([slider], {
      attrs: {
        role: 'slider',
        tabindex: this.tabindex
      },
      on: Object.assign({}, {
        mouseup: this.sliderMove,
        keydown: this.onKeyDown,
        keyup: this.onKeyUp
      }, this.$listeners),
      directives: [{
        name: 'click-outside'
      }]
    });
  }
});

/***/ }),
/* 175 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 176 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VSnackbar__ = __webpack_require__(177);


__WEBPACK_IMPORTED_MODULE_0__VSnackbar__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSnackbar__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VSnackbar__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VSnackbar__["a" /* default */]);

/***/ }),
/* 177 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transitions__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__ = __webpack_require__(4);
__webpack_require__(178);






/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-snackbar',

  components: {
    VSlideYTransition: __WEBPACK_IMPORTED_MODULE_0__transitions__["e" /* VSlideYTransition */],
    VSlideYReverseTransition: __WEBPACK_IMPORTED_MODULE_0__transitions__["d" /* VSlideYReverseTransition */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_toggleable__["a" /* default */]],

  data: function data() {
    return {
      activeTimeout: {}
    };
  },


  props: {
    absolute: Boolean,
    bottom: Boolean,
    left: Boolean,
    multiLine: Boolean,
    right: Boolean,
    top: Boolean,
    // TODO: change this to closeDelay to match other API in delayable.js
    timeout: {
      type: Number,
      default: 6000
    },
    vertical: Boolean
  },

  computed: {
    classes: function classes() {
      return this.addBackgroundColorClassChecks({
        'snack--active': this.isActive,
        'snack--absolute': this.absolute,
        'snack--bottom': this.bottom || !this.top,
        'snack--left': this.left,
        'snack--multi-line': this.multiLine && !this.vertical,
        'snack--right': this.right,
        'snack--top': this.top,
        'snack--vertical': this.vertical
      });
    },
    computedTransition: function computedTransition() {
      return this.top ? 'v-slide-y-transition' : 'v-slide-y-reverse-transition';
    }
  },

  watch: {
    isActive: function isActive() {
      this.setTimeout();
    }
  },

  methods: {
    setTimeout: function (_setTimeout) {
      function setTimeout() {
        return _setTimeout.apply(this, arguments);
      }

      setTimeout.toString = function () {
        return _setTimeout.toString();
      };

      return setTimeout;
    }(function () {
      var _this = this;

      clearTimeout(this.activeTimeout);

      if (this.isActive && this.timeout) {
        this.activeTimeout = setTimeout(function () {
          _this.isActive = false;
        }, this.timeout);
      }
    })
  },

  mounted: function mounted() {
    this.setTimeout();
  },
  render: function render(h) {
    var children = [];

    if (this.isActive) {
      children.push(h('div', {
        staticClass: 'snack__content'
      }, this.$slots.default));
    }

    return h('div', {
      staticClass: 'snack',
      'class': this.classes,
      on: this.$listeners
    }, [h(this.computedTransition, children)]);
  }
});

/***/ }),
/* 178 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VSpeedDial__ = __webpack_require__(180);


__WEBPACK_IMPORTED_MODULE_0__VSpeedDial__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSpeedDial__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VSpeedDial__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VSpeedDial__["a" /* default */]);

/***/ }),
/* 180 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_positionable__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_click_outside__ = __webpack_require__(6);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

__webpack_require__(181);






/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-speed-dial',

  mixins: [__WEBPACK_IMPORTED_MODULE_1__mixins_positionable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__mixins_toggleable__["a" /* default */]],

  directives: { ClickOutside: __WEBPACK_IMPORTED_MODULE_2__directives_click_outside__["a" /* default */] },

  props: {
    direction: {
      type: String,
      default: 'top',
      validator: function validator(val) {
        return ['top', 'right', 'bottom', 'left'].includes(val);
      }
    },
    hover: Boolean,
    transition: {
      type: String,
      default: 'scale-transition'
    }
  },

  computed: {
    classes: function classes() {
      return _defineProperty({
        'speed-dial': true,
        'speed-dial--top': this.top,
        'speed-dial--right': this.right,
        'speed-dial--bottom': this.bottom,
        'speed-dial--left': this.left,
        'speed-dial--absolute': this.absolute,
        'speed-dial--fixed': this.fixed
      }, 'speed-dial--direction-' + this.direction, true);
    }
  },

  render: function render(h) {
    var _this = this;

    var children = [];
    var data = {
      'class': this.classes,
      directives: [{
        name: 'click-outside'
      }],
      on: {
        click: function click() {
          return _this.isActive = !_this.isActive;
        }
      }
    };

    if (this.hover) {
      data.on.mouseenter = function () {
        return _this.isActive = true;
      };
      data.on.mouseleave = function () {
        return _this.isActive = false;
      };
    }

    if (this.isActive) {
      children = (this.$slots.default || []).map(function (b, i) {
        b.key = i;

        return b;
      });
    }

    var list = h('transition-group', {
      'class': 'speed-dial__list',
      props: {
        name: this.transition,
        tag: 'div'
      }
    }, children);

    return h('div', data, [this.$slots.activator, list]);
  }
});

/***/ }),
/* 181 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 182 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VStepper__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VStepperStep__ = __webpack_require__(185);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VStepperContent__ = __webpack_require__(186);





__WEBPACK_IMPORTED_MODULE_1__VStepper__["a" /* default */].install = function install(Vue) {
  var VStepperHeader = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('stepper__header');
  var VStepperItems = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('stepper__items');

  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VStepper__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VStepper__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_3__VStepperContent__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_3__VStepperContent__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_2__VStepperStep__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__VStepperStep__["a" /* default */]);
  Vue.component(VStepperHeader.name, VStepperHeader);
  Vue.component(VStepperItems.name, VStepperItems);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__VStepper__["a" /* default */]);

/***/ }),
/* 183 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__ = __webpack_require__(0);
__webpack_require__(184);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-stepper',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_themeable__["a" /* default */]],

  provide: function provide() {
    return {
      stepClick: this.stepClick
    };
  },
  data: function data() {
    return {
      inputValue: null,
      isBooted: false,
      steps: [],
      content: [],
      isReverse: false
    };
  },


  props: {
    nonLinear: Boolean,
    altLabels: Boolean,
    vertical: Boolean,
    value: [Number, String]
  },

  computed: {
    classes: function classes() {
      return {
        'stepper': true,
        'stepper--is-booted': this.isBooted,
        'stepper--vertical': this.vertical,
        'stepper--alt-labels': this.altLabels,
        'stepper--non-linear': this.nonLinear,
        'theme--dark': this.dark,
        'theme--light': this.light
      };
    }
  },

  watch: {
    inputValue: function inputValue(val, prev) {
      var _this = this;

      this.isReverse = Number(val) < Number(prev);
      this.steps.forEach(function (i) {
        return i.toggle(_this.inputValue);
      });
      this.content.forEach(function (i) {
        return i.toggle(_this.inputValue, _this.isReverse);
      });

      this.$emit('input', this.inputValue);
      prev && (this.isBooted = true);
    },
    value: function value() {
      var _this2 = this;

      this.getSteps();
      this.$nextTick(function () {
        return _this2.inputValue = _this2.value;
      });
    }
  },

  mounted: function mounted() {
    this.$vuetify.load(this.init);
  },


  methods: {
    init: function init() {
      this.getSteps();

      this.inputValue = this.value || this.steps[0].step || 1;
    },
    getSteps: function getSteps() {
      var _this3 = this;

      this.steps = [];
      this.content = [];
      this.$children.forEach(function (i) {
        if (i.$options._componentTag === 'v-stepper-step') {
          _this3.steps.push(i);
        } else if (i.$options._componentTag === 'v-stepper-content') {
          i.isVertical = _this3.vertical;
          _this3.content.push(i);
        }
      });
    },
    stepClick: function stepClick(step) {
      var _this4 = this;

      this.getSteps();
      this.$nextTick(function () {
        return _this4.inputValue = step;
      });
    }
  },

  render: function render(h) {
    return h('div', {
      'class': this.classes
    }, this.$slots.default);
  }
});

/***/ }),
/* 184 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 185 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_ripple__ = __webpack_require__(9);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-stepper-step',

  components: { VIcon: __WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */] },

  directives: { Ripple: __WEBPACK_IMPORTED_MODULE_1__directives_ripple__["a" /* default */] },

  inject: ['stepClick'],

  data: function data() {
    return {
      isActive: false,
      isInactive: true
    };
  },


  props: {
    complete: Boolean,
    completeIcon: {
      type: String,
      default: 'check'
    },
    editIcon: {
      type: String,
      default: 'edit'
    },
    errorIcon: {
      type: String,
      default: 'warning'
    },
    editable: Boolean,
    rules: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    step: [Number, String]
  },

  computed: {
    classes: function classes() {
      return {
        'stepper__step': true,
        'stepper__step--active': this.isActive,
        'stepper__step--editable': this.editable,
        'stepper__step--inactive': this.isInactive,
        'stepper__step--error': this.hasError,
        'stepper__step--complete': this.complete
      };
    },
    hasError: function hasError() {
      return this.rules.some(function (i) {
        return i() !== true;
      });
    }
  },

  methods: {
    click: function click(e) {
      e.stopPropagation();

      if (this.editable) {
        this.stepClick(this.step);
      }
    },
    toggle: function toggle(step) {
      this.isActive = step.toString() === this.step.toString();
      this.isInactive = Number(step) < Number(this.step);
    }
  },

  render: function render(h) {
    var data = {
      'class': this.classes,
      directives: [{
        name: 'ripple',
        value: this.editable
      }],
      on: { click: this.click }
    };
    var stepContent = void 0;

    if (this.hasError) {
      stepContent = [h('v-icon', {}, this.errorIcon)];
    } else if (this.complete) {
      if (this.editable) {
        stepContent = [h('v-icon', {}, this.editIcon)];
      } else {
        stepContent = [h('v-icon', {}, this.completeIcon)];
      }
    } else {
      stepContent = this.step;
    }

    var step = h('span', { 'class': 'stepper__step__step' }, stepContent);
    var label = h('div', { 'class': 'stepper__label' }, this.$slots.default);

    return h('div', data, [step, label]);
  }
});

/***/ }),
/* 186 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__transitions__ = __webpack_require__(5);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-stepper-content',

  components: {
    VTabTransition: __WEBPACK_IMPORTED_MODULE_0__transitions__["g" /* VTabTransition */],
    VTabReverseTransition: __WEBPACK_IMPORTED_MODULE_0__transitions__["f" /* VTabReverseTransition */]
  },

  data: function data() {
    return {
      height: 0,
      isActive: false,
      isReverse: false,
      isVertical: false
    };
  },


  props: {
    step: {
      type: [Number, String],
      required: true
    }
  },

  computed: {
    classes: function classes() {
      return {
        'stepper__content': true
      };
    },
    computedTransition: function computedTransition() {
      return this.isReverse ? 'v-tab-reverse-transition' : 'v-tab-transition';
    },
    styles: function styles() {
      if (!this.isVertical) return {};

      return {
        height: !isNaN(this.height) ? this.height + 'px' : this.height
      };
    },
    wrapperClasses: function wrapperClasses() {
      return {
        'stepper__wrapper': true
      };
    }
  },

  watch: {
    isActive: function isActive() {
      if (!this.isVertical) {
        return;
      }

      if (this.isActive) {
        this.enter();
      } else {
        this.leave();
      }
    }
  },

  mounted: function mounted() {
    this.$refs.wrapper.addEventListener('transitionend', this.onTransition, false);
  },
  beforeDestroy: function beforeDestroy() {
    this.$refs.wrapper.removeEventListener('transitionend', this.onTransition, false);
  },


  methods: {
    onTransition: function onTransition() {
      if (!this.isActive) return;

      this.height = 'auto';
    },
    enter: function enter() {
      var _this = this;

      var scrollHeight = 0;

      // Render bug with height
      setTimeout(function () {
        scrollHeight = _this.$refs.wrapper.scrollHeight;
      }, 0);

      this.height = 0;

      // Give the collapsing element time to collapse
      setTimeout(function () {
        return _this.height = scrollHeight || 'auto';
      }, 450);
    },
    leave: function leave() {
      var _this2 = this;

      this.height = this.$refs.wrapper.clientHeight;
      setTimeout(function () {
        return _this2.height = 0;
      }, 0);
    },
    toggle: function toggle(step, reverse) {
      this.isActive = step.toString() === this.step.toString();
      this.isReverse = reverse;
    }
  },

  render: function render(h) {
    var contentData = {
      'class': this.classes
    };
    var wrapperData = {
      'class': this.wrapperClasses,
      style: this.styles,
      ref: 'wrapper'
    };

    if (!this.isVertical) {
      contentData.directives = [{
        name: 'show',
        value: this.isActive
      }];
    }

    var wrapper = h('div', wrapperData, [this.$slots.default]);
    var content = h('div', contentData, [wrapper]);

    return h(this.computedTransition, {
      on: this.$listeners
    }, [content]);
  }
});

/***/ }),
/* 187 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VSubheader__ = __webpack_require__(188);


__WEBPACK_IMPORTED_MODULE_0__VSubheader__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSubheader__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VSubheader__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VSubheader__["a" /* default */]);

/***/ }),
/* 188 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__ = __webpack_require__(0);
__webpack_require__(189);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-subheader',

  functional: true,

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_themeable__["a" /* default */]],

  props: {
    inset: Boolean
  },

  render: function render(h, _ref) {
    var data = _ref.data,
        children = _ref.children,
        props = _ref.props;

    data.staticClass = ('subheader ' + (data.staticClass || '')).trim();

    if (props.inset) data.staticClass += ' subheader--inset';
    if (props.light) data.staticClass += ' theme--light';
    if (props.dark) data.staticClass += ' theme--dark';

    return h('li', data, children);
  }
});

/***/ }),
/* 189 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 190 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VSwitch__ = __webpack_require__(191);


__WEBPACK_IMPORTED_MODULE_0__VSwitch__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSwitch__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VSwitch__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VSwitch__["a" /* default */]);

/***/ }),
/* 191 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_rippleable__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_selectable__ = __webpack_require__(31);
__webpack_require__(13);
__webpack_require__(20);
__webpack_require__(192);




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-switch',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_rippleable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_selectable__["a" /* default */]],

  computed: {
    classes: function classes() {
      var classes = {
        'input-group--selection-controls switch': true
      };

      if (this.hasError) {
        classes['error--text'] = true;
      } else {
        return this.addTextColorClassChecks(classes);
      }

      return classes;
    },
    rippleClasses: function rippleClasses() {
      return {
        'input-group--selection-controls__ripple': true,
        'input-group--selection-controls__ripple--active': this.isActive
      };
    },
    containerClasses: function containerClasses() {
      return {
        'input-group--selection-controls__container': true,
        'input-group--selection-controls__container--light': this.light,
        'input-group--selection-controls__container--disabled': this.disabled
      };
    },
    toggleClasses: function toggleClasses() {
      return {
        'input-group--selection-controls__toggle': true,
        'input-group--selection-controls__toggle--active': this.isActive
      };
    }
  },

  render: function render(h) {
    var container = h('div', {
      'class': this.containerClasses
    }, [h('div', { 'class': this.toggleClasses }), this.genRipple()]);

    return this.genInputGroup([container]);
  }
});

/***/ }),
/* 192 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 193 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VSystemBar__ = __webpack_require__(194);


__WEBPACK_IMPORTED_MODULE_0__VSystemBar__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VSystemBar__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VSystemBar__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VSystemBar__["a" /* default */]);

/***/ }),
/* 194 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_applicationable__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_themeable__ = __webpack_require__(0);
__webpack_require__(195);





/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-system-bar',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_applicationable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_themeable__["a" /* default */]],

  props: {
    lightsOut: Boolean,
    status: Boolean,
    window: Boolean
  },

  computed: {
    classes: function classes() {
      return this.addBackgroundColorClassChecks({
        'system-bar': true,
        'system-bar--lights-out': this.lightsOut,
        'system-bar--status': this.status,
        'system-bar--window': this.window,
        'theme--dark': this.dark,
        'theme--light': this.light
      });
    },
    computedHeight: function computedHeight() {
      if (this.window) return 32;

      return 24;
    }
  },

  methods: {
    updateApplication: function updateApplication() {
      if (!this.app) return;

      this.$vuetify.application.bar = this.computedHeight;
    }
  },

  render: function render(h) {
    var data = {
      'class': this.classes,
      style: {
        height: this.computedHeight + 'px'
      }
    };

    return h('div', data, this.$slots.default);
  }
});

/***/ }),
/* 195 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 196 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VTabs__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VTabsBar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VTabsContent__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__VTabsItem__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__VTabsItems__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__VTabsSlider__ = __webpack_require__(203);







__WEBPACK_IMPORTED_MODULE_0__VTabs__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VTabs__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VTabs__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_1__VTabsBar__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_1__VTabsBar__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_2__VTabsContent__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_2__VTabsContent__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_3__VTabsItem__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_3__VTabsItem__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_4__VTabsItems__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_4__VTabsItems__["a" /* default */]);
  Vue.component(__WEBPACK_IMPORTED_MODULE_5__VTabsSlider__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_5__VTabsSlider__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VTabs__["a" /* default */]);

/***/ }),
/* 197 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_themeable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_resize__ = __webpack_require__(7);
__webpack_require__(198);




/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-tabs',

  directives: {
    Resize: __WEBPACK_IMPORTED_MODULE_1__directives_resize__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_themeable__["a" /* default */]],

  provide: function provide() {
    var _this = this;

    return {
      registerContent: this.registerContent,
      unregisterContent: this.unregisterContent,
      registerTabItem: this.registerTabItem,
      unregisterTabItem: this.unregisterTabItem,
      next: this.next,
      prev: this.prev,
      slider: this.slider,
      tabClick: this.tabClick,
      isScrollable: function isScrollable() {
        return _this.scrollable;
      },
      isMobile: function isMobile() {
        return _this.isMobile;
      }
    };
  },
  data: function data() {
    return {
      content: [],
      tabItems: [],
      activeIndex: null,
      isBooted: false,
      isMobile: false,
      resizeTimeout: null,
      reverse: false,
      target: null,
      tabsSlider: null,
      targetEl: null,
      tabsContainer: null,
      transitionTime: 300
    };
  },


  props: {
    centered: Boolean,
    fixed: Boolean,
    grow: Boolean,
    icons: Boolean,
    mobileBreakPoint: {
      type: [Number, String],
      default: 1280
    },
    value: String,
    scrollable: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    classes: function classes() {
      return {
        'tabs': true,
        'tabs--centered': this.centered,
        'tabs--fixed': this.fixed,
        'tabs--grow': this.grow,
        'tabs--icons': this.icons,
        'tabs--mobile': this.isMobile,
        'tabs--scroll-bars': this.scrollable,
        'theme--dark': this.dark,
        'theme--light': this.light
      };
    }
  },

  watch: {
    value: function value() {
      this.tabClick(this.value);
    },
    activeIndex: function activeIndex() {
      var _this2 = this;

      this.updateTabs();
      this.$nextTick(function () {
        return _this2.isBooted = true;
      });
    },
    tabItems: function tabItems(newItems, oldItems) {
      var _this3 = this;

      // Tab item got removed
      if (oldItems.length > newItems.length) {
        if (!newItems.find(function (o) {
          return o.id === _this3.target;
        })) {
          var i = oldItems.findIndex(function (o) {
            return o.id === _this3.target;
          });

          this.$nextTick(function () {
            _this3.activeIndex = _this3.tabItems[i > 0 ? i - 1 : 0].id;
            _this3.target = _this3.activeIndex;
          });
        }
      }
      this.slider();
    },
    '$vuetify.application.left': function $vuetifyApplicationLeft() {
      this.onContainerResize();
    },
    '$vuetify.application.right': function $vuetifyApplicationRight() {
      this.onContainerResize();
    }
  },

  mounted: function mounted() {
    var _this4 = this;

    this.$vuetify.load(function () {
      // // This is a workaround to detect if link is active
      // // when being used as a router or nuxt link
      var i = _this4.tabItems.findIndex(function (_ref) {
        var el = _ref.el;

        return el.firstChild.classList.contains('tabs__item--active');
      });

      var tab = _this4.value || (_this4.tabItems[i !== -1 ? i : 0] || {}).id;

      tab && _this4.tabClick(tab) && _this4.onResize();
    });
  },


  methods: {
    registerContent: function registerContent(id, toggle) {
      this.content.push({ id: id, toggle: toggle });
    },
    registerTabItem: function registerTabItem(id, toggle, el) {
      this.tabItems.push({ id: id, toggle: toggle, el: el });
    },
    unregisterContent: function unregisterContent(id) {
      this.content = this.content.filter(function (o) {
        return o.id !== id;
      });
    },
    unregisterTabItem: function unregisterTabItem(id) {
      this.tabItems = this.tabItems.filter(function (o) {
        return o.id !== id;
      });
    },
    next: function next(cycle) {
      var nextIndex = this.activeIndex + 1;

      if (!this.content[nextIndex]) {
        if (!cycle) return;
        nextIndex = 0;
      }

      this.tabClick(this.tabItems[nextIndex].id);
    },
    prev: function prev(cycle) {
      var prevIndex = this.activeIndex - 1;

      if (!this.content[prevIndex]) {
        if (!cycle) return;
        prevIndex = this.content.length - 1;
      }

      this.tabClick(this.tabItems[prevIndex].id);
    },
    onResize: function onResize() {
      this.isMobile = window.innerWidth < this.mobileBreakPoint;
      this.slider();
    },

    /**
     * When v-navigation-drawer changes the
     * width of the container, call resize
     * after the transition is complete
     * 
     * @return {Void}
     */
    onContainerResize: function onContainerResize() {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(this.onResize, this.transitionTime);
    },
    slider: function slider(el) {
      var _this5 = this;

      this.tabsSlider = this.tabsSlider || this.$el.querySelector('.tabs__slider');

      this.tabsContainer = this.tabsContainer || this.$el.querySelector('.tabs__container');

      if (!this.tabsSlider || !this.tabsContainer) return;

      this.targetEl = el || this.targetEl;

      if (!this.targetEl) return;

      // Gives DOM time to paint when
      // processing slider for
      // dynamic tabs
      this.$nextTick(function () {
        // #684 Calculate width as %
        var width = _this5.targetEl.scrollWidth / _this5.tabsContainer.clientWidth * 100;

        _this5.tabsSlider.style.width = width + '%';
        _this5.tabsSlider.style.left = _this5.targetEl.offsetLeft + 'px';
      });
    },
    tabClick: function tabClick(target) {
      var _this6 = this;

      var setActiveIndex = function setActiveIndex(index) {
        if (_this6.activeIndex === index) {
          // #762 update tabs display
          // In case tabs count got changed but activeIndex didn't
          _this6.updateTabs();
        } else {
          _this6.activeIndex = index;
        }
      };

      this.target = target;

      this.$nextTick(function () {
        var nextIndex = _this6.content.findIndex(function (o) {
          return o.id === target;
        });
        _this6.reverse = nextIndex < _this6.activeIndex;
        setActiveIndex(nextIndex);

        _this6.$emit('input', _this6.target);
      });
    },
    updateTabs: function updateTabs() {
      var _this7 = this;

      this.content.forEach(function (_ref2) {
        var toggle = _ref2.toggle;

        toggle(_this7.target, _this7.reverse, _this7.isBooted);
      });

      this.tabItems.forEach(function (_ref3) {
        var toggle = _ref3.toggle;

        toggle(_this7.target);
      });
    }
  },

  render: function render(h) {
    return h('div', {
      'class': this.classes,
      directives: [{
        name: 'resize',
        value: this.onResize
      }]
    }, this.$slots.default);
  }
});

/***/ }),
/* 198 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 199 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VIcon__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__directives_resize__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_touch__ = __webpack_require__(8);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-tabs-bar',

  directives: {
    Resize: __WEBPACK_IMPORTED_MODULE_1__directives_resize__["a" /* default */],
    Touch: __WEBPACK_IMPORTED_MODULE_2__directives_touch__["a" /* default */]
  },

  provide: function provide() {
    var _this = this;

    return {
      addTabItem: function addTabItem(action, toggle, el) {
        _this.registerTabItem(action, toggle, el);
        _this.onResize();
      },
      removeTabItem: function removeTabItem(action) {
        _this.unregisterTabItem(action);
        _this.onResize();
      }
    };
  },


  inject: ['isScrollable', 'isMobile', 'registerTabItem', 'unregisterTabItem'],

  data: function data() {
    return {
      isOverflowing: false,
      scrollOffset: 0,
      itemOffset: 0,
      startX: 0
    };
  },


  computed: {
    classes: function classes() {
      return {
        'tabs__bar': true
      };
    },
    containerClasses: function containerClasses() {
      return {
        'tabs__container': true
      };
    },
    wrapperClasses: function wrapperClasses() {
      return {
        'tabs__wrapper': true,
        'tabs__wrapper--scrollable': this.isScrollable(),
        'tabs__wrapper--overflow': this.isOverflowing
      };
    },
    containerStyles: function containerStyles() {
      return {
        'transform': 'translateX(' + -this.scrollOffset + 'px)'
      };
    },
    leftIconVisible: function leftIconVisible() {
      return !this.isMobile() && this.isScrollable() && this.isOverflowing && this.scrollOffset > 0;
    },
    rightIconVisible: function rightIconVisible() {
      if (this.isMobile() || !this.isScrollable() || !this.isOverflowing) return;

      // Check one scroll ahead to know the width of right-most item
      var container = this.$refs.container;
      var item = this.newOffsetRight(this.scrollOffset, this.itemOffset);
      var itemWidth = item && container.children[item.index].clientWidth || 0;
      var scrollOffset = this.scrollOffset + container.clientWidth;

      return container.scrollWidth - scrollOffset > itemWidth * 0.30;
    }
  },

  methods: {
    genContainer: function genContainer() {
      return this.$createElement('ul', {
        'class': this.containerClasses,
        'style': this.containerStyles,
        ref: 'container'
      }, this.$slots.default);
    },
    genIcon: function genIcon(direction) {
      var capitalize = direction.charAt(0).toUpperCase() + direction.slice(1);
      return this.$createElement(__WEBPACK_IMPORTED_MODULE_0__VIcon__["a" /* default */], {
        props: _defineProperty({}, '' + direction, true),
        style: { display: 'inline-flex' },
        on: {
          click: this['scroll' + capitalize]
        }
      }, 'chevron_' + direction);
    },
    genWrapper: function genWrapper() {
      return this.$createElement('div', {
        class: this.wrapperClasses,
        directives: [{
          name: 'touch',
          value: {
            start: this.start,
            move: this.move,
            end: this.end
          }
        }]
      }, [this.genContainer()]);
    },
    start: function start(e) {
      this.startX = this.scrollOffset + e.touchstartX;
      this.$refs.container.style.transition = 'none';
    },
    move: function move(e) {
      var offset = this.startX - e.touchmoveX;
      this.scrollOffset = offset;
    },
    end: function end(e) {
      this.onResize();
      var container = this.$refs.container;
      var scrollWidth = container.scrollWidth - this.$el.clientWidth / 2;
      container.style.transition = null;

      if (this.scrollOffset < 0 || !this.isOverflowing) {
        this.scrollOffset = 0;
      } else if (this.scrollOffset >= scrollWidth) {
        var lastItem = container.children[container.children.length - 1];
        this.scrollOffset = scrollWidth - lastItem.clientWidth;
      }
    },
    scrollLeft: function scrollLeft() {
      var _newOffset = this.newOffset('Left'),
          offset = _newOffset.offset,
          index = _newOffset.index;

      this.scrollOffset = offset;
      this.itemOffset = index;
    },
    scrollRight: function scrollRight() {
      var _newOffset2 = this.newOffset('Right'),
          offset = _newOffset2.offset,
          index = _newOffset2.index;

      this.scrollOffset = offset;
      this.itemOffset = index;
    },
    onResize: function onResize() {
      if (this._isDestroyed) return;

      var container = this.$refs.container;
      this.isOverflowing = container.clientWidth < container.scrollWidth;
    },
    newOffset: function newOffset(direction) {
      return this['newOffset' + direction](this.scrollOffset, this.itemOffset);
    },
    newOffsetLeft: function newOffsetLeft(currentOffset, currentIndex) {
      var container = this.$refs.container;
      var items = container.children;
      var offset = 0;

      for (var index = currentIndex - 1; index >= 0; index--) {
        if (!items[index].classList.contains('tabs__slider')) {
          var newOffset = offset + items[index].clientWidth;
          if (newOffset >= container.clientWidth) {
            return { offset: currentOffset - offset, index: index + 1 };
          }
          offset = newOffset;
        }
      }

      return { offset: 0, index: 0 };
    },
    newOffsetRight: function newOffsetRight(currentOffset, currentIndex) {
      var container = this.$refs.container;
      var items = container.children;
      var offset = currentOffset;

      for (var index = currentIndex; index < items.length; index++) {
        if (!items[index].classList.contains('tabs__slider')) {
          var newOffset = offset + items[index].clientWidth;
          if (newOffset > currentOffset + container.clientWidth) {
            return { offset: offset, index: index };
          }
          offset = newOffset;
        }
      }

      return null;
    }
  },

  render: function render(h) {
    return h('div', {
      'class': this.classes,
      directives: [{
        name: 'resize',
        value: this.onResize
      }]
    }, [this.genWrapper(), this.leftIconVisible ? this.genIcon('left') : null, this.rightIconVisible ? this.genIcon('right') : null]);
  }
});

/***/ }),
/* 200 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_bootable__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__transitions__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__directives_touch__ = __webpack_require__(8);






/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-tabs-content',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_bootable__["a" /* default */]],

  inject: ['registerContent', 'unregisterContent'],

  components: {
    VTabTransition: __WEBPACK_IMPORTED_MODULE_1__transitions__["g" /* VTabTransition */],
    VTabReverseTransition: __WEBPACK_IMPORTED_MODULE_1__transitions__["f" /* VTabReverseTransition */]
  },

  directives: {
    Touch: __WEBPACK_IMPORTED_MODULE_2__directives_touch__["a" /* default */]
  },

  data: function data() {
    return {
      isActive: false,
      reverse: false
    };
  },


  props: {
    id: {
      type: String,
      required: true
    },
    transition: {
      type: [Boolean, String],
      default: 'tab-transition'
    },
    reverseTransition: {
      type: [Boolean, String],
      default: 'tab-reverse-transition'
    }
  },

  computed: {
    computedTransition: function computedTransition() {
      return this.reverse ? this.reverseTransition : this.transition;
    }
  },

  methods: {
    toggle: function toggle(target, reverse, showTransition) {
      this.$el.style.transition = !showTransition ? 'none' : null;
      this.reverse = reverse;
      this.isActive = this.id === target;
    }
  },

  mounted: function mounted() {
    this.registerContent(this.id, this.toggle);
  },
  beforeDestroy: function beforeDestroy() {
    this.unregisterContent(this.id);
  },
  render: function render(h) {
    var data = {
      staticClass: 'tabs__content',
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      on: this.$listeners
    };

    if (this.id) data.domProps = { id: this.id };

    var div = h('div', data, this.showLazyContent(this.$slots.default));

    if (!this.computedTransition) return div;

    return h('transition', {
      props: { name: this.computedTransition }
    }, [div]);
  }
});

/***/ }),
/* 201 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_routable__ = __webpack_require__(12);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-tabs-item',

  inject: ['slider', 'tabClick', 'addTabItem', 'removeTabItem'],

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_routable__["a" /* default */]],

  data: function data() {
    return {
      isActive: false
    };
  },


  props: {
    activeClass: {
      type: String,
      default: 'tabs__item--active'
    }
  },

  computed: {
    classes: function classes() {
      var classes = {
        'tabs__item': true,
        'tabs__item--disabled': this.disabled
      };

      classes[this.activeClass] = !this.to && this.isActive;

      return classes;
    },
    action: function action() {
      var to = this.to || this.href;

      if (!to || to === Object(to)) return this._uid;

      return to.replace('#', '');
    }
  },

  watch: {
    $route: function $route() {
      this.to && this.callSlider();
    }
  },

  mounted: function mounted() {
    this.addTabItem(this.action, this.toggle, this.$el);
    this.callSlider();
  },
  beforeDestroy: function beforeDestroy() {
    this.removeTabItem(this.action);
  },


  methods: {
    callSlider: function callSlider() {
      var _this = this;

      setTimeout(function () {
        _this.$el.firstChild.classList.contains('tabs__item--active') && _this.slider(_this.$el);
      }, 0);
    },
    click: function click(e) {
      e.preventDefault();
      this.$emit('click', e);

      if (!this.to && !this.href) return;

      if (!this.to) {
        this.tabClick(this.action);
      }

      this.callSlider();
    },
    toggle: function toggle(action) {
      var _this2 = this;

      this.isActive = this.action === action;

      this.$nextTick(function () {
        _this2.isActive && _this2.slider(_this2.$el);
      });
    }
  },

  render: function render(h) {
    var link = this.generateRouteLink();
    var data = link.data;

    // If disabled, use div as anchor tags do not support
    // being disabled

    var tag = this.disabled ? 'div' : link.tag;

    return h('li', {
      'class': 'tabs__li'
    }, [h(tag, data, this.$slots.default)]);
  }
});

/***/ }),
/* 202 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__directives_touch__ = __webpack_require__(8);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-tabs-items',

  directives: { Touch: __WEBPACK_IMPORTED_MODULE_0__directives_touch__["a" /* default */] },

  inject: ['next', 'prev'],

  props: {
    cycle: Boolean,
    touchless: Boolean
  },

  methods: {
    swipeLeft: function swipeLeft() {
      this.next(this.cycle);
    },
    swipeRight: function swipeRight() {
      this.prev(this.cycle);
    }
  },

  render: function render(h) {
    var data = {
      staticClass: 'tabs__items',
      directives: []
    };

    !this.touchless && data.directives.push({
      name: 'touch',
      value: {
        left: this.swipeLeft,
        right: this.swipeRight
      }
    });

    return h('div', data, this.$slots.default);
  }
});

/***/ }),
/* 203 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_colorable__ = __webpack_require__(2);


/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-tabs-slider',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_colorable__["a" /* default */]],

  render: function render(h) {
    return h('li', {
      staticClass: 'tabs__slider',
      class: this.addBackgroundColorClassChecks({})
    });
  }
});

/***/ }),
/* 204 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VTextField__ = __webpack_require__(205);


__WEBPACK_IMPORTED_MODULE_0__VTextField__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VTextField__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VTextField__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VTextField__["a" /* default */]);

/***/ }),
/* 205 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_colorable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_input__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_maskable__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_mask__ = __webpack_require__(42);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

__webpack_require__(13);
__webpack_require__(35);






/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-text-field',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_input__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_maskable__["a" /* default */]],

  inheritAttrs: false,

  data: function data() {
    return {
      initialValue: null,
      inputHeight: null,
      badInput: false,
      lazySelection: 0
    };
  },


  props: {
    autofocus: Boolean,
    autoGrow: Boolean,
    box: Boolean,
    clearable: Boolean,
    color: {
      type: String,
      default: 'primary'
    },
    counter: [Boolean, Number, String],
    fullWidth: Boolean,
    multiLine: Boolean,
    placeholder: String,
    prefix: String,
    rows: {
      default: 5
    },
    singleLine: Boolean,
    solo: Boolean,
    suffix: String,
    textarea: Boolean,
    type: {
      type: String,
      default: 'text'
    }
  },

  computed: {
    classes: function classes() {
      var classes = {
        'input-group--text-field': true,
        'input-group--text-field-box': this.box,
        'input-group--single-line': this.singleLine || this.solo,
        'input-group--solo': this.solo,
        'input-group--multi-line': this.multiLine,
        'input-group--full-width': this.fullWidth,
        'input-group--prefix': this.prefix,
        'input-group--suffix': this.suffix,
        'input-group--textarea': this.textarea
      };

      if (this.hasError) {
        classes['error--text'] = true;
      } else {
        return this.addTextColorClassChecks(classes);
      }

      return classes;
    },
    count: function count() {
      var inputLength = void 0;
      if (this.inputValue) inputLength = this.inputValue.toString().length;else inputLength = 0;

      return inputLength + ' / ' + this.counterLength;
    },
    counterLength: function counterLength() {
      var parsedLength = parseInt(this.counter, 10);
      return isNaN(parsedLength) ? 25 : parsedLength;
    },

    inputValue: {
      get: function get() {
        return this.value;
      },
      set: function set(val) {
        this.lazyValue = val;
        this.mask && this.setSelectionRange();
        this.$emit('input', val);
      }
    },
    isDirty: function isDirty() {
      return this.lazyValue != null && this.lazyValue.toString().length > 0 || this.badInput || ['time', 'date', 'datetime-local', 'week', 'month'].includes(this.type);
    },
    shouldAutoGrow: function shouldAutoGrow() {
      return (this.multiLine || this.textarea) && this.autoGrow;
    }
  },

  watch: {
    isFocused: function isFocused(val) {
      if (val) {
        this.initialValue = this.lazyValue;
      } else if (this.initialValue !== this.lazyValue) {
        this.$emit('change', this.lazyValue);
      }
    },
    value: function value(val) {
      // Value was changed externally, update lazy
      this.lazyValue = val;

      !this.validateOnBlur && this.validate();
      this.shouldAutoGrow && this.calculateInputHeight();
    }
  },

  mounted: function mounted() {
    var _this = this;

    this.$vuetify.load(function () {
      _this.shouldAutoGrow && _this.calculateInputHeight();
      _this.autofocus && _this.focus();
    });
  },


  methods: {
    calculateInputHeight: function calculateInputHeight() {
      var _this2 = this;

      this.inputHeight = null;

      this.$nextTick(function () {
        var height = _this2.$refs.input ? _this2.$refs.input.scrollHeight : 0;
        var minHeight = _this2.rows * 24;
        var inputHeight = height < minHeight ? minHeight : height;
        _this2.inputHeight = inputHeight + (_this2.textarea ? 4 : 0);
      });
    },
    onInput: function onInput(e) {
      this.resetSelections(e.target);
      this.inputValue = this.unmaskText(e.target.value);
      this.badInput = e.target.validity && e.target.validity.badInput;
      this.shouldAutoGrow && this.calculateInputHeight();
    },
    blur: function blur(e) {
      var _this3 = this;

      this.isFocused = false;

      this.$nextTick(function () {
        _this3.validate();
      });
      this.$emit('blur', e);
    },
    focus: function focus(e) {
      if (!this.$refs.input) return;

      this.isFocused = true;
      if (document.activeElement !== this.$refs.input) {
        this.$refs.input.focus();
      }
      this.$emit('focus', e);
    },
    genCounter: function genCounter() {
      return this.$createElement('div', {
        'class': {
          'input-group__counter': true,
          'input-group__counter--error': this.hasError
        }
      }, this.count);
    },
    genInput: function genInput() {
      var tag = this.multiLine || this.textarea ? 'textarea' : 'input';
      var listeners = Object.assign({}, this.$listeners);
      delete listeners['change']; // Change should not be bound externally

      var data = {
        style: {},
        domProps: {
          autofocus: this.autofocus,
          disabled: this.disabled,
          required: this.required,
          value: this.maskText(this.lazyValue)
        },
        attrs: _extends({}, this.$attrs, {
          readonly: this.readonly,
          tabindex: this.tabindex,
          'aria-label': (!this.$attrs || !this.$attrs.id) && this.label // Label `for` will be set if we have an id
        }),
        on: Object.assign(listeners, {
          blur: this.blur,
          input: this.onInput,
          focus: this.focus
        }),
        ref: 'input'
      };

      if (this.shouldAutoGrow) {
        data.style.height = this.inputHeight && this.inputHeight + 'px';
      }

      if (this.placeholder) data.domProps.placeholder = this.placeholder;

      if (!this.textarea && !this.multiLine) {
        data.domProps.type = this.type;
      } else {
        data.domProps.rows = this.rows;
      }

      if (this.mask) {
        data.attrs.maxlength = this.masked.length;
      }

      var children = [this.$createElement(tag, data)];

      this.prefix && children.unshift(this.genFix('prefix'));
      this.suffix && children.push(this.genFix('suffix'));

      return children;
    },
    genFix: function genFix(type) {
      return this.$createElement('span', {
        'class': 'input-group--text-field__' + type
      }, this[type]);
    },
    clearableCallback: function clearableCallback() {
      var _this4 = this;

      this.inputValue = null;
      this.$nextTick(function () {
        return _this4.$refs.input.focus();
      });
    },
    resetSelections: function resetSelections(input) {
      this.selection = input.selectionEnd;
      this.lazySelection = 0;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = input.value.substr(0, this.selection)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var char = _step.value;

          Object(__WEBPACK_IMPORTED_MODULE_3__util_mask__["a" /* isMaskDelimiter */])(char) || this.lazySelection++;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  },

  render: function render() {
    return this.genInputGroup(this.genInput(), { attrs: { tabindex: false } });
  }
});

/***/ }),
/* 206 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VTimePicker__ = __webpack_require__(207);


__WEBPACK_IMPORTED_MODULE_0__VTimePicker__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VTimePicker__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VTimePicker__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VTimePicker__["a" /* default */]);

/***/ }),
/* 207 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VCard__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_picker__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_time_title__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_time_body__ = __webpack_require__(210);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

__webpack_require__(43);
__webpack_require__(208);









/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-time-picker',

  components: {
    VCard: __WEBPACK_IMPORTED_MODULE_1__VCard__["a" /* default */]
  },

  mixins: [__WEBPACK_IMPORTED_MODULE_2__mixins_picker__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_time_body__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_time_title__["a" /* default */]],

  data: function data() {
    return {
      isDragging: false,
      rotate: 0,
      originalTime: this.value,
      period: 'am',
      selectingHour: true,
      ranges: {
        hours: Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createRange */])(24),
        minutes: Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["c" /* createRange */])(60)
      }
    };
  },


  props: {
    format: {
      type: String,
      default: 'ampm',
      validator: function validator(val) {
        return ['ampm', '24hr'].includes(val);
      }
    },
    allowedHours: {
      type: [Array, Object, Function],
      default: function _default() {
        return null;
      }
    },
    allowedMinutes: {
      type: [Array, Object, Function],
      default: function _default() {
        return null;
      }
    }
  },

  computed: {
    is24hr: function is24hr() {
      return this.format !== 'ampm';
    },
    is24hrAfter12: function is24hrAfter12() {
      return this.selectingHour && this.is24hr && this.hour >= 12;
    },
    divider: function divider() {
      return this.selectingHour ? 12 : 60;
    },
    degrees: function degrees() {
      return this.degreesPerUnit * Math.PI / 180;
    },
    degreesPerUnit: function degreesPerUnit() {
      return 360 / this.divider;
    },

    inputTime: {
      get: function get() {
        if (this.value && !(this.value instanceof Date)) {
          if (!this.is24hr) {
            this.period = this.value.match(/pm/i) ? 'pm' : 'am';
          }

          return this.value;
        }
        var value = new Date();

        if (this.value instanceof Date) {
          value = this.value;
        }

        var hour = value.getHours();
        var minute = value.getMinutes();
        var period = '';

        if (!this.is24hr) {
          period = hour >= 12 ? 'pm' : 'am';
          hour = hour > 12 ? hour - 12 : hour;
          hour = hour === 0 ? 12 : hour;
        }

        period && (this.period = period);

        hour = this.firstAllowed('hour', hour);
        minute = this.firstAllowed('minute', minute);

        minute = minute < 10 ? '0' + minute : minute > 59 ? '00' : minute;

        return hour + ':' + minute + period;
      },
      set: function set(val) {
        return this.$emit('input', val);
      }
    },
    timeArray: function timeArray() {
      return this.inputTime.replace(/(am|pm)/, '').split(':');
    },

    hour: {
      get: function get() {
        return parseInt(this.timeArray[0]);
      },
      set: function set(val) {
        if (!this.is24hr) {
          val = val > 12 ? val - 12 : val < 1 ? 12 : val;
        } else {
          val = val < 10 ? '0' + val : val > 23 ? '00' : val;
        }

        this.inputTime = val + ':' + this.minute + (!this.is24hr ? this.period : '');
      }
    },
    minute: {
      get: function get() {
        var minute = parseInt(this.timeArray[1]);

        return minute < 10 ? '0' + minute : minute > 59 ? '00' : minute;
      },
      set: function set(val) {
        val = val < 10 ? '0' + parseInt(val) : val > 59 ? '00' : val;
        var hour = this.hour;

        if (this.is24hr && hour < 10) {
          hour = '0' + hour;
        }

        this.inputTime = hour + ':' + val + (!this.is24hr ? this.period : '');
      }
    },
    clockHand: function clockHand() {
      if (this.selectingHour) return this.degreesPerUnit * this.hour;
      return this.degreesPerUnit * this.minute;
    },
    radius: function radius() {
      return this.clockSize / 2;
    },

    clockSize: {
      get: function get() {
        return this.size;
      },
      set: function set(val) {
        this.size = val;
      }
    },
    size: function size() {
      return this.landscape ? 250 : 280;
    }
  },

  watch: {
    period: function period(val) {
      var hour = !!this.allowedHours && this.selectingHour ? this.firstAllowed('hour', this.hour - 1) : this.hour;
      this.inputTime = hour + ':' + this.minute + val;
    },
    value: function value(val) {
      if (this.isSaving) {
        this.originalTime = this.inputTime;
        this.isSaving = false;
      }
    }
  },

  methods: {
    save: function save() {
      var _this = this;

      if (this.originalTime) {
        this.originalTime = this.value;
      } else {
        this.inputTime = this.inputTime;
        this.originalTime = this.inputTime;
      }

      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false;

      // Fix for #1818
      // Wait for data to persist
      // then set selectingHour
      this.$nextTick(function () {
        return _this.selectingHour = true;
      });
    },
    cancel: function cancel() {
      var _this2 = this;

      this.inputTime = this.originalTime;
      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false;

      // Fix for #1818
      // Wait for data to persist
      // then set selectingHour
      this.$nextTick(function () {
        return _this2.selectingHour = true;
      });
    },
    isAllowed: function isAllowed(type, value) {
      var allowed = this['allowed' + (type.charAt(0).toUpperCase() + type.slice(1)) + 's'];

      if (!allowed) return true;

      if (Array.isArray(allowed)) {
        return !!allowed.some(function (v) {
          return v === value;
        });
      } else if (allowed instanceof Function) {
        return allowed(value);
      } else if (allowed === Object(allowed)) {
        var range = type === 'minute' ? this.ranges.minutes : this.ranges.hours;
        var mod = type === 'minute' ? 60 : 24;

        if (allowed.min === String(allowed.min)) {
          allowed.min = this.convert12to24hr(allowed.min);
        }

        if (allowed.max === String(allowed.max)) {
          allowed.max = this.convert12to24hr(allowed.max);
        }

        var steps = allowed.max - allowed.min;
        value = type === 'hour' && !this.is24hr && this.period === 'pm' ? value + 12 : value;

        for (var i = 0; i <= steps; i++) {
          var index = (allowed.min + i) % mod;
          if (range[index] === value) return true;
        }

        return false;
      }

      return true;
    },
    convert12to24hr: function convert12to24hr(input) {
      input = input.toLowerCase();
      var pm = input.indexOf('pm') !== -1;
      var hour = parseInt(input.slice(0, input.indexOf(pm ? 'pm' : 'am')));

      return pm ? hour + 12 : hour;
    },
    generateRange: function generateRange(type, start) {
      var range = type === 'hour' ? this.ranges.hours : this.ranges.minutes;
      var offset = 1;

      if (type === 'hour' && !this.is24hr) {
        range = range.slice(1, 13);
        offset = 0;
      }

      return range.slice(start + offset, range.length).concat(range.slice(0, start + offset));
    },
    firstAllowed: function firstAllowed(type, value) {
      var _this3 = this;

      var allowed = this['allowed' + (type.charAt(0).toUpperCase() + type.slice(1)) + 's'];

      if (!allowed) return value;

      var range = this.generateRange(type, value);

      var first = range.find(function (v) {
        return _this3.isAllowed(type, v);
      });

      return first || value;
    }
  },

  render: function render(h) {
    var children = [this.genBody()];

    !this.noTitle && children.unshift(this.genTitle());
    this.$scopedSlots.default && children.push(this.genSlot());

    return h('v-card', {
      'class': _extends({
        'picker picker--time': true,
        'picker--landscape': this.landscape,
        'picker--time--hours': this.selectingHour
      }, this.themeClasses)
    }, children);
  }
});

/***/ }),
/* 208 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 209 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  methods: {
    genTitle: function genTitle() {
      var children = [this.genTime()];

      if (this.format === 'ampm') {
        children.push(this.genAMPM());
      }

      return this.$createElement('div', {
        'class': 'picker__title'
      }, children);
    },
    genTime: function genTime() {
      var _this = this;

      var hour = this.hour;

      if (this.is24hr && hour < 10) {
        hour = '0' + hour;
      }

      return this.$createElement('div', {
        'class': 'picker--time__title'
      }, [this.$createElement('span', {
        'class': { active: this.selectingHour },
        on: {
          click: function click() {
            return _this.selectingHour = true;
          }
        }
      }, hour), this.$createElement('span', {
        'class': { active: !this.selectingHour },
        on: {
          click: function click() {
            return _this.selectingHour = false;
          }
        }
      }, ':' + this.minute)]);
    },
    genAMPM: function genAMPM() {
      return this.$createElement('div', [this.genPeriod('am'), this.genPeriod('pm')]);
    },
    genPeriod: function genPeriod(period) {
      var _this2 = this;

      return this.$createElement('span', {
        'class': { active: this.period === period },
        on: { click: function click() {
            return _this2.period = period;
          } }
      }, period.toUpperCase());
    }
  }
});

/***/ }),
/* 210 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  data: function data() {
    return {
      hasChanged: false
    };
  },

  methods: {
    genBody: function genBody() {
      var _this = this;

      var children = [this.genHand(this.selectingHour ? 'hour' : 'minute')];
      var data = {
        'class': 'picker--time__clock',
        on: {
          mousedown: this.onMouseDown,
          mouseup: this.onMouseUp,
          mouseleave: function mouseleave() {
            _this.isDragging && _this.onMouseUp();
          },
          touchstart: this.onMouseDown,
          touchend: this.onMouseUp,
          mousemove: this.onDragMove,
          touchmove: this.onDragMove
        },
        key: this.selectingHour ? 'hour' : 'minute',
        ref: 'clock'
      };

      this.selectingHour && children.push(this.genHours()) || children.push(this.genMinutes());

      if (this.scrollable) {
        data.on.wheel = function (e) {
          e.preventDefault();

          var diff = e.wheelDelta > 0 ? 1 : -1;
          var changing = _this.selectingHour ? 'changeHour' : 'changeMinute';

          _this[changing](diff);
        };
      }

      return this.$createElement('div', {
        'class': 'picker__body'
      }, [this.$createElement('transition', {
        props: {
          name: 'fade-transition',
          mode: 'out-in'
        }
      }, [this.$createElement('div', data, children)])]);
    },
    genHand: function genHand(type) {
      var scale = this.is24hrAfter12 ? 'scaleY(0.6)' : '';
      return [this.$createElement('div', {
        'class': 'picker--time__clock-hand ' + type,
        style: {
          transform: 'rotate(' + this.clockHand + 'deg) ' + scale
        }
      })];
    },
    genHours: function genHours() {
      var hours = this.is24hr ? 24 : 12;
      var children = [];
      var start = 0;

      if (hours === 12) {
        hours++;
        start = 1;
      }

      for (var i = start; i < hours; i++) {
        children.push(this.$createElement('span', {
          'class': {
            'active': i === this.hour,
            'disabled': !this.isAllowed('hour', i)
          },
          style: this.getTransform(i),
          domProps: { innerHTML: '<span>' + i + '</span>' }
        }));
      }

      return children;
    },
    genMinutes: function genMinutes() {
      var children = [];

      for (var i = 0; i < 60; i = i + 5) {
        var num = i;

        if (num < 10) num = '0' + num;
        if (num === 60) num = '00';

        children.push(this.$createElement('span', {
          'class': {
            'active': num.toString() === this.minute.toString(),
            'disabled': !this.isAllowed('minute', i)
          },
          style: this.getTransform(i),
          domProps: { innerHTML: '<span>' + num + '</span>' }
        }));
      }

      return children;
    },
    getTransform: function getTransform(i) {
      var _getPosition = this.getPosition(i),
          x = _getPosition.x,
          y = _getPosition.y;

      return { transform: 'translate(' + x + 'px, ' + y + 'px)' };
    },
    getPosition: function getPosition(i) {
      var radiusPercentage = this.selectingHour && this.is24hr && i >= 12 ? 0.5 : 0.8;
      var r = this.radius * radiusPercentage;
      i = this.selectingHour && this.is24hr ? i % 12 : i;
      return {
        x: Math.round(Math.sin(i * this.degrees) * r),
        y: Math.round(-Math.cos(i * this.degrees) * r)
      };
    },
    changeHour: function changeHour(time) {
      var _this2 = this;

      var range = this.generateRange('hour', this.hour);

      time < 0 && (range = range.reverse().slice(1));
      this.hour = range.find(function (h) {
        return _this2.allowedHours ? _this2.isAllowed('hour', h) : true;
      });

      return true;
    },
    changeMinute: function changeMinute(time) {
      var _this3 = this;

      var current = Number(this.minute);
      var range = this.generateRange('minute', current);

      time < 0 && (range = range.reverse().slice(1));
      var minute = range.find(function (m) {
        return _this3.allowedMinutes ? _this3.isAllowed('minute', m) : true;
      });

      this.minute = minute < 10 ? '0' + minute : minute;

      return true;
    },
    onMouseDown: function onMouseDown(e) {
      e.preventDefault();

      this.isDragging = true;
      this.onDragMove(e);
    },
    onMouseUp: function onMouseUp() {
      this.isDragging = false;
      !this.selectingHour && this.autosave && this.save();
      if (this.hasChanged) {
        this.selectingHour = false;
        this.hasChanged = false;
      }
    },
    onDragMove: function onDragMove(e) {
      e.preventDefault();
      if (!this.isDragging && e.type !== 'click') return;

      var rect = this.$refs.clock.getBoundingClientRect();
      var center = { x: rect.width / 2, y: 0 - rect.width / 2 };
      var clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      var clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      var coords = {
        y: rect.top - clientY,
        x: clientX - rect.left
      };

      var selecting = this.selectingHour ? 'hour' : 'minute';
      var value = Math.round(this.angle(center, coords) / this.degreesPerUnit);

      if (this.selectingHour && this.is24hr) {
        var insideClick = this.euclidean(center, coords) / this.radius < 0.65;
        value = insideClick ? value + 12 : value;

        // Necessary to fix edge case when selecting left part of 0 and 12
        value = this.angle(center, coords) >= 345 ? (value + 12) % 24 : value;
      }

      if (this.isAllowed(selecting, value)) {
        this[selecting] = value;
        this.hasChanged = true;
      }
    },
    euclidean: function euclidean(p0, p1) {
      var dx = Math.abs(p1.x - p0.x);
      var dy = Math.abs(p1.y - p0.y);

      return Math.sqrt(dx * dx + dy * dy);
    },
    angle: function angle(center, p1) {
      var p0 = {
        x: center.x,
        y: center.y + Math.sqrt(Math.abs(p1.x - center.x) * Math.abs(p1.x - center.x) + Math.abs(p1.y - center.y) * Math.abs(p1.y - center.y))
      };

      var value = 2 * Math.atan2(p1.y - p0.y, p1.x - p0.x);
      return Math.abs(value * 180 / Math.PI);
    }
  }
});

/***/ }),
/* 211 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export VToolbarTitle */
/* unused harmony export VToolbarItems */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_helpers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__VToolbar__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__VToolbarSideIcon__ = __webpack_require__(214);
/* unused harmony reexport VToolbar */
/* unused harmony reexport VToolbarSideIcon */






var VToolbarTitle = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('toolbar__title');
var VToolbarItems = Object(__WEBPACK_IMPORTED_MODULE_0__util_helpers__["d" /* createSimpleFunctional */])('toolbar__items');

__WEBPACK_IMPORTED_MODULE_1__VToolbar__["a" /* default */].install = function install(Vue) {
  Vue.component('v-toolbar', __WEBPACK_IMPORTED_MODULE_1__VToolbar__["a" /* default */]);
  Vue.component('v-toolbar-items', VToolbarItems);
  Vue.component('v-toolbar-title', VToolbarTitle);
  Vue.component('v-toolbar-side-icon', __WEBPACK_IMPORTED_MODULE_2__VToolbarSideIcon__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_1__VToolbar__["a" /* default */]);

/***/ }),
/* 212 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_applicationable__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_themeable__ = __webpack_require__(0);
__webpack_require__(213);





/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-toolbar',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_applicationable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_themeable__["a" /* default */]],

  data: function data() {
    return {
      heights: {
        mobileLandscape: 48,
        mobile: 56,
        desktop: 64,
        dense: 48
      },
      denseHeight: 48,
      defaultHeight: 56,
      prominentHeight: 64,
      isExtended: false,
      isScrollingProxy: false,
      marginTop: 0,
      previousScroll: null,
      target: null
    };
  },

  props: {
    absolute: Boolean,
    card: Boolean,
    clippedLeft: Boolean,
    clippedRight: Boolean,
    dense: Boolean,
    extended: Boolean,
    fixed: Boolean,
    flat: Boolean,
    floating: Boolean,
    height: [Number, String],
    manualScroll: {
      type: Boolean,
      default: null
    },
    prominent: Boolean,
    scrollOffScreen: Boolean,
    scrollTarget: String,
    scrollThreshold: {
      type: Number,
      default: 100
    }
  },

  computed: {
    computedHeight: function computedHeight() {
      if (this.height) return parseInt(this.height);
      if (this.dense) return this.heights.dense;
      if (this.prominent || this.$vuetify.breakpoint.mdAndUp) return this.heights.desktop;
      if (this.$vuetify.breakpoint.width > this.$vuetify.breakpoint.height) return this.mobileLandscape;

      return this.heights.mobile;
    },
    computedMarginTop: function computedMarginTop() {
      return this.marginTop + this.$vuetify.application.bar;
    },
    classes: function classes() {
      return this.addBackgroundColorClassChecks({
        'toolbar': true,
        'elevation-0': this.flat,
        'toolbar--absolute': this.absolute,
        'toolbar--card': this.card,
        'toolbar--clipped': this.clippedLeft || this.clippedRight,
        'toolbar--dense': this.dense,
        'toolbar--fixed': this.fixed,
        'toolbar--floating': this.floating,
        'toolbar--prominent': this.prominent,
        'toolbar--extended': this.isExtended,
        'theme--dark': this.dark,
        'theme--light': this.light
      });
    },

    isScrolling: {
      get: function get() {
        return this.manualScroll != null ? this.manualScroll : this.isScrollingProxy;
      },
      set: function set(val) {
        this.isScrollingProxy = val;
      }
    },
    paddingLeft: function paddingLeft() {
      if (!this.app || this.clippedLeft) return 0;

      return this.$vuetify.application.left;
    },
    paddingRight: function paddingRight() {
      if (!this.app || this.clippedRight) return 0;

      return this.$vuetify.application.right;
    },
    styles: function styles() {
      return this.app && {
        marginTop: this.computedMarginTop + 'px',
        paddingLeft: this.paddingLeft + 'px',
        paddingRight: this.paddingRight + 'px'
      };
    }
  },

  watch: {
    isScrolling: function isScrolling(val) {
      this.whenScrolled(val);
    }
  },

  mounted: function mounted() {
    this.whenScrolled(this.isScrolling);
  },
  destroyed: function destroyed() {
    if (this.app) this.$vuetify.application.top = 0;
  },


  methods: {
    onScroll: function onScroll() {
      if (typeof window === 'undefined') return;

      if (!this.target) {
        this.target = this.scrollTarget ? document.querySelector(this.scrollTarget) : window;
      }

      var currentScroll = this.scrollTarget ? this.target.scrollTop : this.target.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll < this.scrollThreshold) return;

      if (this.previousScroll === null) {
        this.previousScroll = currentScroll;
      }

      this.isScrollingProxy = this.previousScroll < currentScroll;

      this.previousScroll = currentScroll;
    },
    updateApplication: function updateApplication() {
      if (!this.app) return;

      this.$vuetify.application.top = !this.fixed && !this.absolute ? 0 : this.isExtended && !this.isScrolling ? this.computedHeight * 2 : this.computedHeight;
    },
    whenScrolled: function whenScrolled(val) {
      this.marginTop = val ? -this.$refs.content.clientHeight - 6 : 0;

      this.updateApplication();
    }
  },

  render: function render(h) {
    this.isExtended = this.extended || !!this.$slots.extension;
    this.updateApplication();

    var children = [];
    var data = {
      'class': this.classes,
      style: this.styles,
      on: this.$listeners
    };

    if (this.scrollOffScreen) {
      data.directives = [{
        name: 'scroll',
        value: {
          callback: this.onScroll,
          target: this.scrollTarget
        }
      }];
    }

    children.push(h('div', {
      staticClass: 'toolbar__content',
      style: { height: this.computedHeight + 'px' },
      ref: 'content'
    }, this.$slots.default));

    if (this.isExtended) {
      children.push(h('div', {
        staticClass: 'toolbar__extension',
        style: { height: this.computedHeight + 'px' }
      }, this.$slots.extension));
    }

    return h('nav', data, children);
  }
});

/***/ }),
/* 213 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 214 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_VBtn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_VIcon__ = __webpack_require__(3);



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-toolbar-side-icon',

  functional: true,

  render: function render(h, _ref) {
    var slots = _ref.slots,
        listeners = _ref.listeners,
        props = _ref.props,
        data = _ref.data;

    var classes = data.staticClass ? data.staticClass + ' toolbar__side-icon' : 'toolbar__side-icon';

    var d = Object.assign(data, {
      staticClass: classes,
      props: Object.assign(props, {
        icon: true
      }),
      on: listeners
    });

    var defaultSlot = slots().default;

    return h(__WEBPACK_IMPORTED_MODULE_0__components_VBtn__["a" /* default */], d, defaultSlot || [h(__WEBPACK_IMPORTED_MODULE_1__components_VIcon__["a" /* default */], 'menu')]);
  }
});

/***/ }),
/* 215 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__VTooltip__ = __webpack_require__(216);


__WEBPACK_IMPORTED_MODULE_0__VTooltip__["a" /* default */].install = function install(Vue) {
  Vue.component(__WEBPACK_IMPORTED_MODULE_0__VTooltip__["a" /* default */].name, __WEBPACK_IMPORTED_MODULE_0__VTooltip__["a" /* default */]);
};

/* harmony default export */ __webpack_exports__["a"] = (__WEBPACK_IMPORTED_MODULE_0__VTooltip__["a" /* default */]);

/***/ }),
/* 216 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mixins_colorable__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__mixins_delayable__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mixins_dependent__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins_detachable__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mixins_menuable__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mixins_toggleable__ = __webpack_require__(4);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

__webpack_require__(217);

// Mixins







/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'v-tooltip',

  mixins: [__WEBPACK_IMPORTED_MODULE_0__mixins_colorable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__mixins_delayable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_2__mixins_dependent__["a" /* default */], __WEBPACK_IMPORTED_MODULE_3__mixins_detachable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_4__mixins_menuable__["a" /* default */], __WEBPACK_IMPORTED_MODULE_5__mixins_toggleable__["a" /* default */]],

  data: function data() {
    return {
      calculatedMinWidth: 0,
      closeDependents: false
    };
  },

  props: {
    debounce: {
      type: [Number, String],
      default: 0
    },
    fixed: {
      type: Boolean,
      default: true
    },
    tag: {
      type: String,
      default: 'span'
    },
    transition: String,
    zIndex: {
      default: null
    }
  },

  computed: {
    calculatedLeft: function calculatedLeft() {
      var _dimensions = this.dimensions,
          activator = _dimensions.activator,
          content = _dimensions.content;

      var left = 0;

      if (this.top || this.bottom) {
        left = activator.left + activator.width / 2 - content.width / 2;
      } else if (this.left || this.right) {
        left = activator.left + (this.right ? activator.width : -content.width) + (this.right ? 10 : -10);
      }

      return this.calcXOverflow(left) + 'px';
    },
    calculatedTop: function calculatedTop() {
      var _dimensions2 = this.dimensions,
          activator = _dimensions2.activator,
          content = _dimensions2.content;

      var top = 0;

      if (this.top || this.bottom) {
        top = activator.top - (this.top ? activator.height : -activator.height) - (this.top ? 0 : -10);
      } else if (this.left || this.right) {
        top = activator.top + activator.height / 2 - content.height / 2;
      }

      return this.calcYOverflow(top + this.pageYOffset) + 'px';
    },
    classes: function classes() {
      return {
        'tooltip--top': this.top,
        'tooltip--right': this.right,
        'tooltip--bottom': this.bottom,
        'tooltip--left': this.left
      };
    },
    computedTransition: function computedTransition() {
      if (this.transition) return this.transition;
      if (this.top) return 'slide-y-reverse-transition';
      if (this.right) return 'slide-x-transition';
      if (this.bottom) return 'slide-y-transition';
      if (this.left) return 'slide-x-reverse-transition';
    },
    offsetY: function offsetY() {
      return this.top || this.bottom;
    },
    offsetX: function offsetX() {
      return this.left || this.right;
    },
    styles: function styles() {
      return {
        left: this.calculatedLeft,
        maxWidth: isNaN(this.maxWidth) ? this.maxWidth : this.maxWidth + 'px',
        opacity: this.isActive ? 0.9 : 0,
        top: this.calculatedTop,
        zIndex: this.zIndex || this.activeZIndex
      };
    }
  },

  methods: {
    activate: function activate() {
      // Update coordinates and dimensions of menu
      // and its activator
      this.updateDimensions();
      // Start the transition
      requestAnimationFrame(this.startTransition);
    }
  },

  render: function render(h) {
    var _addBackgroundColorCl,
        _this = this;

    var tooltip = h('div', {
      staticClass: 'tooltip__content',
      'class': this.addBackgroundColorClassChecks((_addBackgroundColorCl = {}, _defineProperty(_addBackgroundColorCl, this.contentClass, true), _defineProperty(_addBackgroundColorCl, 'menuable__content__active', this.isActive), _addBackgroundColorCl)),
      style: this.styles,
      attrs: this.attrs,
      directives: [{
        name: 'show',
        value: this.isContentActive
      }],
      ref: 'content'
    }, this.$slots.default);

    return h(this.tag, {
      staticClass: 'tooltip',
      'class': this.classes
    }, [h('transition', {
      props: {
        name: this.computedTransition
      }
    }, [tooltip]), h('span', {
      on: {
        mouseenter: function mouseenter() {
          _this.runDelay('open', function () {
            return _this.isActive = true;
          });
        },
        mouseleave: function mouseleave() {
          _this.runDelay('close', function () {
            return _this.isActive = false;
          });
        }
      },
      ref: 'activator'
    }, this.$slots.activator)]);
  }
});

/***/ }),
/* 217 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 218 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = install;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__click_outside__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__resize__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ripple__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__scroll__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__touch__ = __webpack_require__(8);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ClickOutside", function() { return __WEBPACK_IMPORTED_MODULE_0__click_outside__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Ripple", function() { return __WEBPACK_IMPORTED_MODULE_2__ripple__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Resize", function() { return __WEBPACK_IMPORTED_MODULE_1__resize__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Scroll", function() { return __WEBPACK_IMPORTED_MODULE_3__scroll__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Touch", function() { return __WEBPACK_IMPORTED_MODULE_4__touch__["a"]; });








function install(Vue) {
  Vue.directive('click-outside', __WEBPACK_IMPORTED_MODULE_0__click_outside__["a" /* default */]);
  Vue.directive('ripple', __WEBPACK_IMPORTED_MODULE_2__ripple__["a" /* default */]);
  Vue.directive('resize', __WEBPACK_IMPORTED_MODULE_1__resize__["a" /* default */]);
  Vue.directive('scroll', __WEBPACK_IMPORTED_MODULE_3__scroll__["a" /* default */]);
  Vue.directive('touch', __WEBPACK_IMPORTED_MODULE_4__touch__["a" /* default */]);
}

/***/ }),
/* 219 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function inserted(el, binding) {
  var callback = typeof binding.value === 'function' ? binding.value : binding.value.callback;
  var options = binding.value.options || { passive: true };
  var target = binding.value.target || window;
  if (target === 'undefined') return;

  if (target !== window) {
    target = document.querySelector(target);
  }

  target.addEventListener('scroll', callback, options);

  el._onScroll = {
    target: target,
    options: options
  };
}

function unbind(el, binding) {
  var _el$_onScroll = el._onScroll,
      target = _el$_onScroll.target,
      options = _el$_onScroll.options;


  target.removeEventListener('scroll', binding.callback, options);
}

/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'scroll',
  inserted: inserted,
  unbind: unbind
});

/***/ })
/******/ ]);
});
//# sourceMappingURL=vuetify.js.map

/***/ }),

/***/ "7+uW":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.5.3
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "production" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "production" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

var emptyObject = Object.freeze({});

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (false) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.functionalOptions = undefined;
  this.functionalScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode, deep) {
  var componentOptions = vnode.componentOptions;
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.isCloned = true;
  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }
    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true);
    }
  }
  return cloned
}

function cloneVNodes (vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (false) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (false) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "production" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    "production" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (false) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "production" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (false) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (false) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (false) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (false) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (false) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (false) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (false) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (false) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if (inBrowser && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

if (false) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (false) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      "production" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (false) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "production" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                 false
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (false) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
      data && data.slot != null
    ) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return node.isComment || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (false) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (false) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  vm._watcher = new Watcher(vm, updateComponent, noop);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (false) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (false) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (false) {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (false) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  false
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "production" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (false) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "production" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (false) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      "production" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (false) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (false) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if (false) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (false) {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (false) {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (false) {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
        ? Reflect.ownKeys(inject).filter(function (key) {
          /* istanbul ignore next */
          return Object.getOwnPropertyDescriptor(inject, key).enumerable
        })
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (false) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (false) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if (false) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias,
  eventKeyName
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (keyCodes) {
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      "production" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  // static trees can be rendered once and cached on the contructor options
  // so every instance shares the same cached trees
  var options = this.$options;
  var cached = options.cached || (options.cached = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = options.staticRenderFns[index].call(this._renderProxy, null, this);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "production" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm = Object.create(parent);
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode) {
        vnode.functionalScopeId = options._scopeId;
        vnode.functionalContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    vnode.functionalContext = contextVm;
    vnode.functionalOptions = options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }

  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (false) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "production" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (false
  ) {
    warn(
      'Avoid using non-primitive value as key, ' +
      'use string/number value instead.',
      context
    );
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
        applyNS(child, ns, force);
      }
    }
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (false) {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        if (slot._rendered) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (false) {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (false) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$1 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (false) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (false) {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (false) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (false
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (false) {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (false) {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && cached$$1 !== current) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.exclude && matches(this.exclude, name)) ||
        (this.include && !matches(this.include, name))
      )) {
        return vnode
      }

      var ref = this;
      var cache = ref.cache;
      var keys = ref.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (false) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.5.3';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "production" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (false) {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(
            config.ignoredElements.length &&
            config.ignoredElements.some(function (ignore) {
              return isRegExp(ignore)
                ? ignore.test(tag)
                : ignore === tag
            })
          ) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (false) {
        inPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.functionalScopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.functionalContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          vnodeToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (false) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.elm = elm;
      vnode.isAsyncPlaceholder = true;
      return true
    }
    if (false) {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (false
              ) {
                bailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (false
              ) {
                bailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (isDef(vnode.tag)) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (false) {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE9 || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    false
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }
  // check capture modifier
  if (modifiers && modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers && modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers && modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }
  var events;
  if (modifiers && modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }
  var newHandler = { value: value, modifiers: modifiers };
  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;



function parseModel (val) {
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (false) {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (false) {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + value + "=$$a.concat([$$v]))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;
  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers) && modifiers.number) {
    return toNumber(value) !== toNumber(newVal)
  }
  if (isDef(modifiers) && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (false) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (false) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "production" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$options._renderChildren;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (false) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (false
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (false) {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
Vue$3.nextTick(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (false) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if (false
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if (false) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (false) {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if (false) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if (false
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function endPre (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "production" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints (el) {
        if (false) {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (false) {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        endPre(element);
      }
      // apply post-transforms
      for (var i$1 = 0; i$1 < postTransforms.length; i$1++) {
        postTransforms[i$1](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (false) {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if (false) {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      "production" !== 'production' && warn$2(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias;
    }
  }
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (false) {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if (false) {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if (false) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if (false) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if (false) {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (false) {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      false
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

/**
 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (map['v-model'] && (map['v-bind:type'] || map[':type'])) {
      var typeBinding = getBindingAttr(el, 'type');
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

var model$2 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$2
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    var handler = events[name];
    // #5330: warn click.right, since right clicks do not actually fire click events.
    if (false
    ) {
      warn(
        "Use \"contextmenu\" instead of \"click.right\" since right clicks " +
        "do not actually fire \"click\" events."
      );
    }
    res += "\"" + name + "\":" + (genHandler(name, handler)) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    return isMethodPath || isFunctionExpression
      ? handler.value
      : ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var code = keyCodes[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(code)) + "," +
    "$event.key)"
  )
}

/*  */

function on (el, dir) {
  if (false) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "production" !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if (false
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if (false) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// check valid identifier for v-for
var identRE = /[A-Za-z_$][\w$]*/;

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (ident, type, text, errors) {
  if (typeof ident === 'string' && !identRE.test(ident)) {
    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (false) {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (false) {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (false) {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      if (false) {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "production" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if (false) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (false) {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if (false) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if (false) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

/* harmony default export */ __webpack_exports__["a"] = (Vue$3);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__("DuR2"), __webpack_require__("162o").setImmediate))

/***/ }),

/***/ "DAYN":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

(function () {
  "use strict";

  if (!Array.from) {
    Array.from = function (object) {
      return [].slice.call(object);
    };
  }

  function buildAttribute(object, propName, value) {
    if (value == undefined) {
      return object;
    }
    object = object == null ? {} : object;
    object[propName] = value;
    return object;
  }

  function buildDraggable(Sortable) {
    function removeNode(node) {
      node.parentElement.removeChild(node);
    }

    function insertNodeAt(fatherNode, node, position) {
      var refNode = position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling;
      fatherNode.insertBefore(node, refNode);
    }

    function computeVmIndex(vnodes, element) {
      return vnodes.map(function (elt) {
        return elt.elm;
      }).indexOf(element);
    }

    function _computeIndexes(slots, children, isTransition) {
      if (!slots) {
        return [];
      }

      var elmFromNodes = slots.map(function (elt) {
        return elt.elm;
      });
      var rawIndexes = [].concat(_toConsumableArray(children)).map(function (elt) {
        return elmFromNodes.indexOf(elt);
      });
      return isTransition ? rawIndexes.filter(function (ind) {
        return ind !== -1;
      }) : rawIndexes;
    }

    function emit(evtName, evtData) {
      var _this = this;

      this.$nextTick(function () {
        return _this.$emit(evtName.toLowerCase(), evtData);
      });
    }

    function delegateAndEmit(evtName) {
      var _this2 = this;

      return function (evtData) {
        if (_this2.realList !== null) {
          _this2['onDrag' + evtName](evtData);
        }
        emit.call(_this2, evtName, evtData);
      };
    }

    var eventsListened = ['Start', 'Add', 'Remove', 'Update', 'End'];
    var eventsToEmit = ['Choose', 'Sort', 'Filter', 'Clone'];
    var readonlyProperties = ['Move'].concat(eventsListened, eventsToEmit).map(function (evt) {
      return 'on' + evt;
    });
    var draggingElement = null;

    var props = {
      options: Object,
      list: {
        type: Array,
        required: false,
        default: null
      },
      value: {
        type: Array,
        required: false,
        default: null
      },
      noTransitionOnDrag: {
        type: Boolean,
        default: false
      },
      clone: {
        type: Function,
        default: function _default(original) {
          return original;
        }
      },
      element: {
        type: String,
        default: 'div'
      },
      move: {
        type: Function,
        default: null
      },
      componentData: {
        type: Object,
        required: false,
        default: null
      }
    };

    var draggableComponent = {
      name: 'draggable',

      props: props,

      data: function data() {
        return {
          transitionMode: false,
          noneFunctionalComponentMode: false,
          init: false
        };
      },
      render: function render(h) {
        var slots = this.$slots.default;
        if (slots && slots.length === 1) {
          var child = slots[0];
          if (child.componentOptions && child.componentOptions.tag === "transition-group") {
            this.transitionMode = true;
          }
        }
        var children = slots;
        var footer = this.$slots.footer;

        if (footer) {
          children = slots ? [].concat(_toConsumableArray(slots), _toConsumableArray(footer)) : [].concat(_toConsumableArray(footer));
        }
        var attributes = null;
        var update = function update(name, value) {
          attributes = buildAttribute(attributes, name, value);
        };
        update('attrs', this.$attrs);
        if (this.componentData) {
          var _componentData = this.componentData,
              on = _componentData.on,
              _props = _componentData.props;

          update('on', on);
          update('props', _props);
        }
        return h(this.element, attributes, children);
      },
      mounted: function mounted() {
        var _this3 = this;

        this.noneFunctionalComponentMode = this.element.toLowerCase() !== this.$el.nodeName.toLowerCase();
        if (this.noneFunctionalComponentMode && this.transitionMode) {
          throw new Error('Transition-group inside component is not supported. Please alter element value or remove transition-group. Current element value: ' + this.element);
        }
        var optionsAdded = {};
        eventsListened.forEach(function (elt) {
          optionsAdded['on' + elt] = delegateAndEmit.call(_this3, elt);
        });

        eventsToEmit.forEach(function (elt) {
          optionsAdded['on' + elt] = emit.bind(_this3, elt);
        });

        var options = _extends({}, this.options, optionsAdded, { onMove: function onMove(evt, originalEvent) {
            return _this3.onDragMove(evt, originalEvent);
          } });
        !('draggable' in options) && (options.draggable = '>*');
        this._sortable = new Sortable(this.rootContainer, options);
        this.computeIndexes();
      },
      beforeDestroy: function beforeDestroy() {
        this._sortable.destroy();
      },


      computed: {
        rootContainer: function rootContainer() {
          return this.transitionMode ? this.$el.children[0] : this.$el;
        },
        isCloning: function isCloning() {
          return !!this.options && !!this.options.group && this.options.group.pull === 'clone';
        },
        realList: function realList() {
          return !!this.list ? this.list : this.value;
        }
      },

      watch: {
        options: {
          handler: function handler(newOptionValue) {
            for (var property in newOptionValue) {
              if (readonlyProperties.indexOf(property) == -1) {
                this._sortable.option(property, newOptionValue[property]);
              }
            }
          },

          deep: true
        },

        realList: function realList() {
          this.computeIndexes();
        }
      },

      methods: {
        getChildrenNodes: function getChildrenNodes() {
          if (!this.init) {
            this.noneFunctionalComponentMode = this.noneFunctionalComponentMode && this.$children.length == 1;
            this.init = true;
          }

          if (this.noneFunctionalComponentMode) {
            return this.$children[0].$slots.default;
          }
          var rawNodes = this.$slots.default;
          return this.transitionMode ? rawNodes[0].child.$slots.default : rawNodes;
        },
        computeIndexes: function computeIndexes() {
          var _this4 = this;

          this.$nextTick(function () {
            _this4.visibleIndexes = _computeIndexes(_this4.getChildrenNodes(), _this4.rootContainer.children, _this4.transitionMode);
          });
        },
        getUnderlyingVm: function getUnderlyingVm(htmlElt) {
          var index = computeVmIndex(this.getChildrenNodes() || [], htmlElt);
          if (index === -1) {
            //Edge case during move callback: related element might be
            //an element different from collection
            return null;
          }
          var element = this.realList[index];
          return { index: index, element: element };
        },
        getUnderlyingPotencialDraggableComponent: function getUnderlyingPotencialDraggableComponent(_ref) {
          var __vue__ = _ref.__vue__;

          if (!__vue__ || !__vue__.$options || __vue__.$options._componentTag !== "transition-group") {
            return __vue__;
          }
          return __vue__.$parent;
        },
        emitChanges: function emitChanges(evt) {
          var _this5 = this;

          this.$nextTick(function () {
            _this5.$emit('change', evt);
          });
        },
        alterList: function alterList(onList) {
          if (!!this.list) {
            onList(this.list);
          } else {
            var newList = [].concat(_toConsumableArray(this.value));
            onList(newList);
            this.$emit('input', newList);
          }
        },
        spliceList: function spliceList() {
          var _arguments = arguments;

          var spliceList = function spliceList(list) {
            return list.splice.apply(list, _arguments);
          };
          this.alterList(spliceList);
        },
        updatePosition: function updatePosition(oldIndex, newIndex) {
          var updatePosition = function updatePosition(list) {
            return list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
          };
          this.alterList(updatePosition);
        },
        getRelatedContextFromMoveEvent: function getRelatedContextFromMoveEvent(_ref2) {
          var to = _ref2.to,
              related = _ref2.related;

          var component = this.getUnderlyingPotencialDraggableComponent(to);
          if (!component) {
            return { component: component };
          }
          var list = component.realList;
          var context = { list: list, component: component };
          if (to !== related && list && component.getUnderlyingVm) {
            var destination = component.getUnderlyingVm(related);
            if (destination) {
              return _extends(destination, context);
            }
          }

          return context;
        },
        getVmIndex: function getVmIndex(domIndex) {
          var indexes = this.visibleIndexes;
          var numberIndexes = indexes.length;
          return domIndex > numberIndexes - 1 ? numberIndexes : indexes[domIndex];
        },
        getComponent: function getComponent() {
          return this.$slots.default[0].componentInstance;
        },
        resetTransitionData: function resetTransitionData(index) {
          if (!this.noTransitionOnDrag || !this.transitionMode) {
            return;
          }
          var nodes = this.getChildrenNodes();
          nodes[index].data = null;
          var transitionContainer = this.getComponent();
          transitionContainer.children = [];
          transitionContainer.kept = undefined;
        },
        onDragStart: function onDragStart(evt) {
          this.context = this.getUnderlyingVm(evt.item);
          evt.item._underlying_vm_ = this.clone(this.context.element);
          draggingElement = evt.item;
        },
        onDragAdd: function onDragAdd(evt) {
          var element = evt.item._underlying_vm_;
          if (element === undefined) {
            return;
          }
          removeNode(evt.item);
          var newIndex = this.getVmIndex(evt.newIndex);
          this.spliceList(newIndex, 0, element);
          this.computeIndexes();
          var added = { element: element, newIndex: newIndex };
          this.emitChanges({ added: added });
        },
        onDragRemove: function onDragRemove(evt) {
          insertNodeAt(this.rootContainer, evt.item, evt.oldIndex);
          if (this.isCloning) {
            removeNode(evt.clone);
            return;
          }
          var oldIndex = this.context.index;
          this.spliceList(oldIndex, 1);
          var removed = { element: this.context.element, oldIndex: oldIndex };
          this.resetTransitionData(oldIndex);
          this.emitChanges({ removed: removed });
        },
        onDragUpdate: function onDragUpdate(evt) {
          removeNode(evt.item);
          insertNodeAt(evt.from, evt.item, evt.oldIndex);
          var oldIndex = this.context.index;
          var newIndex = this.getVmIndex(evt.newIndex);
          this.updatePosition(oldIndex, newIndex);
          var moved = { element: this.context.element, oldIndex: oldIndex, newIndex: newIndex };
          this.emitChanges({ moved: moved });
        },
        computeFutureIndex: function computeFutureIndex(relatedContext, evt) {
          if (!relatedContext.element) {
            return 0;
          }
          var domChildren = [].concat(_toConsumableArray(evt.to.children)).filter(function (el) {
            return el.style['display'] !== 'none';
          });
          var currentDOMIndex = domChildren.indexOf(evt.related);
          var currentIndex = relatedContext.component.getVmIndex(currentDOMIndex);
          var draggedInList = domChildren.indexOf(draggingElement) != -1;
          return draggedInList || !evt.willInsertAfter ? currentIndex : currentIndex + 1;
        },
        onDragMove: function onDragMove(evt, originalEvent) {
          var onMove = this.move;
          if (!onMove || !this.realList) {
            return true;
          }

          var relatedContext = this.getRelatedContextFromMoveEvent(evt);
          var draggedContext = this.context;
          var futureIndex = this.computeFutureIndex(relatedContext, evt);
          _extends(draggedContext, { futureIndex: futureIndex });
          _extends(evt, { relatedContext: relatedContext, draggedContext: draggedContext });
          return onMove(evt, originalEvent);
        },
        onDragEnd: function onDragEnd(evt) {
          this.computeIndexes();
          draggingElement = null;
        }
      }
    };
    return draggableComponent;
  }

  if (true) {
    var Sortable = __webpack_require__("Lokx");
    module.exports = buildDraggable(Sortable);
  } else if (typeof define == "function" && define.amd) {
    define(['sortablejs'], function (Sortable) {
      return buildDraggable(Sortable);
    });
  } else if (window && window.Vue && window.Sortable) {
    var draggable = buildDraggable(window.Sortable);
    Vue.component('draggable', draggable);
  }
})();

/***/ }),

/***/ "DuR2":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "FZ+f":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "Lokx":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @license MIT
 */

(function sortableModule(factory) {
	"use strict";

	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	else if (typeof module != "undefined" && typeof module.exports != "undefined") {
		module.exports = factory();
	}
	else {
		/* jshint sub:true */
		window["Sortable"] = factory();
	}
})(function sortableFactory() {
	"use strict";

	if (typeof window === "undefined" || !window.document) {
		return function sortableError() {
			throw new Error("Sortable.js requires a window with a document");
		};
	}

	var dragEl,
		parentEl,
		ghostEl,
		cloneEl,
		rootEl,
		nextEl,
		lastDownEl,

		scrollEl,
		scrollParentEl,
		scrollCustomFn,

		lastEl,
		lastCSS,
		lastParentCSS,

		oldIndex,
		newIndex,

		activeGroup,
		putSortable,

		autoScroll = {},

		tapEvt,
		touchEvt,

		moved,

		/** @const */
		R_SPACE = /\s+/g,
		R_FLOAT = /left|right|inline/,

		expando = 'Sortable' + (new Date).getTime(),

		win = window,
		document = win.document,
		parseInt = win.parseInt,
		setTimeout = win.setTimeout,

		$ = win.jQuery || win.Zepto,
		Polymer = win.Polymer,

		captureMode = false,
		passiveMode = false,

		supportDraggable = ('draggable' in document.createElement('div')),
		supportCssPointerEvents = (function (el) {
			// false when IE11
			if (!!navigator.userAgent.match(/(?:Trident.*rv[ :]?11\.|msie)/i)) {
				return false;
			}
			el = document.createElement('x');
			el.style.cssText = 'pointer-events:auto';
			return el.style.pointerEvents === 'auto';
		})(),

		_silent = false,

		abs = Math.abs,
		min = Math.min,

		savedInputChecked = [],
		touchDragOverListeners = [],

		_autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl) {
			// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
			if (rootEl && options.scroll) {
				var _this = rootEl[expando],
					el,
					rect,
					sens = options.scrollSensitivity,
					speed = options.scrollSpeed,

					x = evt.clientX,
					y = evt.clientY,

					winWidth = window.innerWidth,
					winHeight = window.innerHeight,

					vx,
					vy,

					scrollOffsetX,
					scrollOffsetY
				;

				// Delect scrollEl
				if (scrollParentEl !== rootEl) {
					scrollEl = options.scroll;
					scrollParentEl = rootEl;
					scrollCustomFn = options.scrollFn;

					if (scrollEl === true) {
						scrollEl = rootEl;

						do {
							if ((scrollEl.offsetWidth < scrollEl.scrollWidth) ||
								(scrollEl.offsetHeight < scrollEl.scrollHeight)
							) {
								break;
							}
							/* jshint boss:true */
						} while (scrollEl = scrollEl.parentNode);
					}
				}

				if (scrollEl) {
					el = scrollEl;
					rect = scrollEl.getBoundingClientRect();
					vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
					vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
				}


				if (!(vx || vy)) {
					vx = (winWidth - x <= sens) - (x <= sens);
					vy = (winHeight - y <= sens) - (y <= sens);

					/* jshint expr:true */
					(vx || vy) && (el = win);
				}


				if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
					autoScroll.el = el;
					autoScroll.vx = vx;
					autoScroll.vy = vy;

					clearInterval(autoScroll.pid);

					if (el) {
						autoScroll.pid = setInterval(function () {
							scrollOffsetY = vy ? vy * speed : 0;
							scrollOffsetX = vx ? vx * speed : 0;

							if ('function' === typeof(scrollCustomFn)) {
								return scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt);
							}

							if (el === win) {
								win.scrollTo(win.pageXOffset + scrollOffsetX, win.pageYOffset + scrollOffsetY);
							} else {
								el.scrollTop += scrollOffsetY;
								el.scrollLeft += scrollOffsetX;
							}
						}, 24);
					}
				}
			}
		}, 30),

		_prepareGroup = function (options) {
			function toFn(value, pull) {
				if (value === void 0 || value === true) {
					value = group.name;
				}

				if (typeof value === 'function') {
					return value;
				} else {
					return function (to, from) {
						var fromGroup = from.options.group.name;

						return pull
							? value
							: value && (value.join
								? value.indexOf(fromGroup) > -1
								: (fromGroup == value)
							);
					};
				}
			}

			var group = {};
			var originalGroup = options.group;

			if (!originalGroup || typeof originalGroup != 'object') {
				originalGroup = {name: originalGroup};
			}

			group.name = originalGroup.name;
			group.checkPull = toFn(originalGroup.pull, true);
			group.checkPut = toFn(originalGroup.put);
			group.revertClone = originalGroup.revertClone;

			options.group = group;
		}
	;

	// Detect support a passive mode
	try {
		window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
			get: function () {
				// `false`, because everything starts to work incorrectly and instead of d'n'd,
				// begins the page has scrolled.
				passiveMode = false;
				captureMode = {
					capture: false,
					passive: passiveMode
				};
			}
		}));
	} catch (err) {}

	/**
	 * @class  Sortable
	 * @param  {HTMLElement}  el
	 * @param  {Object}       [options]
	 */
	function Sortable(el, options) {
		if (!(el && el.nodeType && el.nodeType === 1)) {
			throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
		}

		this.el = el; // root element
		this.options = options = _extend({}, options);


		// Export instance
		el[expando] = this;

		// Default options
		var defaults = {
			group: Math.random(),
			sort: true,
			disabled: false,
			store: null,
			handle: null,
			scroll: true,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			dragClass: 'sortable-drag',
			ignore: 'a, img',
			filter: null,
			preventOnFilter: true,
			animation: 0,
			setData: function (dataTransfer, dragEl) {
				dataTransfer.setData('Text', dragEl.textContent);
			},
			dropBubble: false,
			dragoverBubble: false,
			dataIdAttr: 'data-id',
			delay: 0,
			forceFallback: false,
			fallbackClass: 'sortable-fallback',
			fallbackOnBody: false,
			fallbackTolerance: 0,
			fallbackOffset: {x: 0, y: 0},
			supportPointer: Sortable.supportPointer !== false
		};


		// Set default options
		for (var name in defaults) {
			!(name in options) && (options[name] = defaults[name]);
		}

		_prepareGroup(options);

		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
				this[fn] = this[fn].bind(this);
			}
		}

		// Setup drag mode
		this.nativeDraggable = options.forceFallback ? false : supportDraggable;

		// Bind events
		_on(el, 'mousedown', this._onTapStart);
		_on(el, 'touchstart', this._onTapStart);
		options.supportPointer && _on(el, 'pointerdown', this._onTapStart);

		if (this.nativeDraggable) {
			_on(el, 'dragover', this);
			_on(el, 'dragenter', this);
		}

		touchDragOverListeners.push(this._onDragOver);

		// Restore sorting
		options.store && this.sort(options.store.get(this));
	}


	Sortable.prototype = /** @lends Sortable.prototype */ {
		constructor: Sortable,

		_onTapStart: function (/** Event|TouchEvent */evt) {
			var _this = this,
				el = this.el,
				options = this.options,
				preventOnFilter = options.preventOnFilter,
				type = evt.type,
				touch = evt.touches && evt.touches[0],
				target = (touch || evt).target,
				originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0]) || target,
				filter = options.filter,
				startIndex;

			_saveInputCheckedState(el);


			// Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
			if (dragEl) {
				return;
			}

			if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
				return; // only left button or enabled
			}

			// cancel dnd if original target is content editable
			if (originalTarget.isContentEditable) {
				return;
			}

			target = _closest(target, options.draggable, el);

			if (!target) {
				return;
			}

			if (lastDownEl === target) {
				// Ignoring duplicate `down`
				return;
			}

			// Get the index of the dragged element within its parent
			startIndex = _index(target, options.draggable);

			// Check filter
			if (typeof filter === 'function') {
				if (filter.call(this, evt, target, this)) {
					_dispatchEvent(_this, originalTarget, 'filter', target, el, el, startIndex);
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}
			else if (filter) {
				filter = filter.split(',').some(function (criteria) {
					criteria = _closest(originalTarget, criteria.trim(), el);

					if (criteria) {
						_dispatchEvent(_this, criteria, 'filter', target, el, el, startIndex);
						return true;
					}
				});

				if (filter) {
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}

			if (options.handle && !_closest(originalTarget, options.handle, el)) {
				return;
			}

			// Prepare `dragstart`
			this._prepareDragStart(evt, touch, target, startIndex);
		},

		_prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target, /** Number */startIndex) {
			var _this = this,
				el = _this.el,
				options = _this.options,
				ownerDocument = el.ownerDocument,
				dragStartFn;

			if (target && !dragEl && (target.parentNode === el)) {
				tapEvt = evt;

				rootEl = el;
				dragEl = target;
				parentEl = dragEl.parentNode;
				nextEl = dragEl.nextSibling;
				lastDownEl = target;
				activeGroup = options.group;
				oldIndex = startIndex;

				this._lastX = (touch || evt).clientX;
				this._lastY = (touch || evt).clientY;

				dragEl.style['will-change'] = 'all';

				dragStartFn = function () {
					// Delayed drag has been triggered
					// we can re-enable the events: touchmove/mousemove
					_this._disableDelayedDrag();

					// Make the element draggable
					dragEl.draggable = _this.nativeDraggable;

					// Chosen item
					_toggleClass(dragEl, options.chosenClass, true);

					// Bind the events: dragstart/dragend
					_this._triggerDragStart(evt, touch);

					// Drag start event
					_dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, rootEl, oldIndex);
				};

				// Disable "draggable"
				options.ignore.split(',').forEach(function (criteria) {
					_find(dragEl, criteria.trim(), _disableDraggable);
				});

				_on(ownerDocument, 'mouseup', _this._onDrop);
				_on(ownerDocument, 'touchend', _this._onDrop);
				_on(ownerDocument, 'touchcancel', _this._onDrop);
				_on(ownerDocument, 'selectstart', _this);
				options.supportPointer && _on(ownerDocument, 'pointercancel', _this._onDrop);

				if (options.delay) {
					// If the user moves the pointer or let go the click or touch
					// before the delay has been reached:
					// disable the delayed drag
					_on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchend', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
					_on(ownerDocument, 'mousemove', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchmove', _this._disableDelayedDrag);
					options.supportPointer && _on(ownerDocument, 'pointermove', _this._disableDelayedDrag);

					_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
				} else {
					dragStartFn();
				}


			}
		},

		_disableDelayedDrag: function () {
			var ownerDocument = this.el.ownerDocument;

			clearTimeout(this._dragStartTimer);
			_off(ownerDocument, 'mouseup', this._disableDelayedDrag);
			_off(ownerDocument, 'touchend', this._disableDelayedDrag);
			_off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
			_off(ownerDocument, 'mousemove', this._disableDelayedDrag);
			_off(ownerDocument, 'touchmove', this._disableDelayedDrag);
			_off(ownerDocument, 'pointermove', this._disableDelayedDrag);
		},

		_triggerDragStart: function (/** Event */evt, /** Touch */touch) {
			touch = touch || (evt.pointerType == 'touch' ? evt : null);

			if (touch) {
				// Touch device support
				tapEvt = {
					target: dragEl,
					clientX: touch.clientX,
					clientY: touch.clientY
				};

				this._onDragStart(tapEvt, 'touch');
			}
			else if (!this.nativeDraggable) {
				this._onDragStart(tapEvt, true);
			}
			else {
				_on(dragEl, 'dragend', this);
				_on(rootEl, 'dragstart', this._onDragStart);
			}

			try {
				if (document.selection) {
					// Timeout neccessary for IE9
					_nextTick(function () {
						document.selection.empty();
					});
				} else {
					window.getSelection().removeAllRanges();
				}
			} catch (err) {
			}
		},

		_dragStarted: function () {
			if (rootEl && dragEl) {
				var options = this.options;

				// Apply effect
				_toggleClass(dragEl, options.ghostClass, true);
				_toggleClass(dragEl, options.dragClass, false);

				Sortable.active = this;

				// Drag start event
				_dispatchEvent(this, rootEl, 'start', dragEl, rootEl, rootEl, oldIndex);
			} else {
				this._nulling();
			}
		},

		_emulateDragOver: function () {
			if (touchEvt) {
				if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY) {
					return;
				}

				this._lastX = touchEvt.clientX;
				this._lastY = touchEvt.clientY;

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', 'none');
				}

				var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
				var parent = target;
				var i = touchDragOverListeners.length;

				if (target && target.shadowRoot) {
					target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
					parent = target;
				}

				if (parent) {
					do {
						if (parent[expando]) {
							while (i--) {
								touchDragOverListeners[i]({
									clientX: touchEvt.clientX,
									clientY: touchEvt.clientY,
									target: target,
									rootEl: parent
								});
							}

							break;
						}

						target = parent; // store last element
					}
					/* jshint boss:true */
					while (parent = parent.parentNode);
				}

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', '');
				}
			}
		},


		_onTouchMove: function (/**TouchEvent*/evt) {
			if (tapEvt) {
				var	options = this.options,
					fallbackTolerance = options.fallbackTolerance,
					fallbackOffset = options.fallbackOffset,
					touch = evt.touches ? evt.touches[0] : evt,
					dx = (touch.clientX - tapEvt.clientX) + fallbackOffset.x,
					dy = (touch.clientY - tapEvt.clientY) + fallbackOffset.y,
					translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

				// only set the status to dragging, when we are actually dragging
				if (!Sortable.active) {
					if (fallbackTolerance &&
						min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) < fallbackTolerance
					) {
						return;
					}

					this._dragStarted();
				}

				// as well as creating the ghost element on the document body
				this._appendGhost();

				moved = true;
				touchEvt = touch;

				_css(ghostEl, 'webkitTransform', translate3d);
				_css(ghostEl, 'mozTransform', translate3d);
				_css(ghostEl, 'msTransform', translate3d);
				_css(ghostEl, 'transform', translate3d);

				evt.preventDefault();
			}
		},

		_appendGhost: function () {
			if (!ghostEl) {
				var rect = dragEl.getBoundingClientRect(),
					css = _css(dragEl),
					options = this.options,
					ghostRect;

				ghostEl = dragEl.cloneNode(true);

				_toggleClass(ghostEl, options.ghostClass, false);
				_toggleClass(ghostEl, options.fallbackClass, true);
				_toggleClass(ghostEl, options.dragClass, true);

				_css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));
				_css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
				_css(ghostEl, 'width', rect.width);
				_css(ghostEl, 'height', rect.height);
				_css(ghostEl, 'opacity', '0.8');
				_css(ghostEl, 'position', 'fixed');
				_css(ghostEl, 'zIndex', '100000');
				_css(ghostEl, 'pointerEvents', 'none');

				options.fallbackOnBody && document.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);

				// Fixing dimensions.
				ghostRect = ghostEl.getBoundingClientRect();
				_css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
				_css(ghostEl, 'height', rect.height * 2 - ghostRect.height);
			}
		},

		_onDragStart: function (/**Event*/evt, /**boolean*/useFallback) {
			var _this = this;
			var dataTransfer = evt.dataTransfer;
			var options = _this.options;

			_this._offUpEvents();

			if (activeGroup.checkPull(_this, _this, dragEl, evt)) {
				cloneEl = _clone(dragEl);

				cloneEl.draggable = false;
				cloneEl.style['will-change'] = '';

				_css(cloneEl, 'display', 'none');
				_toggleClass(cloneEl, _this.options.chosenClass, false);

				// #1143: IFrame support workaround
				_this._cloneId = _nextTick(function () {
					rootEl.insertBefore(cloneEl, dragEl);
					_dispatchEvent(_this, rootEl, 'clone', dragEl);
				});
			}

			_toggleClass(dragEl, options.dragClass, true);

			if (useFallback) {
				if (useFallback === 'touch') {
					// Bind touch events
					_on(document, 'touchmove', _this._onTouchMove);
					_on(document, 'touchend', _this._onDrop);
					_on(document, 'touchcancel', _this._onDrop);

					if (options.supportPointer) {
						_on(document, 'pointermove', _this._onTouchMove);
						_on(document, 'pointerup', _this._onDrop);
					}
				} else {
					// Old brwoser
					_on(document, 'mousemove', _this._onTouchMove);
					_on(document, 'mouseup', _this._onDrop);
				}

				_this._loopId = setInterval(_this._emulateDragOver, 50);
			}
			else {
				if (dataTransfer) {
					dataTransfer.effectAllowed = 'move';
					options.setData && options.setData.call(_this, dataTransfer, dragEl);
				}

				_on(document, 'drop', _this);

				// #1143: Бывает элемент с IFrame внутри блокирует `drop`,
				// поэтому если вызвался `mouseover`, значит надо отменять весь d'n'd.
				// Breaking Chrome 62+
				// _on(document, 'mouseover', _this);

				_this._dragStartId = _nextTick(_this._dragStarted);
			}
		},

		_onDragOver: function (/**Event*/evt) {
			var el = this.el,
				target,
				dragRect,
				targetRect,
				revert,
				options = this.options,
				group = options.group,
				activeSortable = Sortable.active,
				isOwner = (activeGroup === group),
				isMovingBetweenSortable = false,
				canSort = options.sort;

			if (evt.preventDefault !== void 0) {
				evt.preventDefault();
				!options.dragoverBubble && evt.stopPropagation();
			}

			if (dragEl.animated) {
				return;
			}

			moved = true;

			if (activeSortable && !options.disabled &&
				(isOwner
					? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
					: (
						putSortable === this ||
						(
							(activeSortable.lastPullMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) &&
							group.checkPut(this, activeSortable, dragEl, evt)
						)
					)
				) &&
				(evt.rootEl === void 0 || evt.rootEl === this.el) // touch fallback
			) {
				// Smart auto-scrolling
				_autoScroll(evt, options, this.el);

				if (_silent) {
					return;
				}

				target = _closest(evt.target, options.draggable, el);
				dragRect = dragEl.getBoundingClientRect();

				if (putSortable !== this) {
					putSortable = this;
					isMovingBetweenSortable = true;
				}

				if (revert) {
					_cloneHide(activeSortable, true);
					parentEl = rootEl; // actualization

					if (cloneEl || nextEl) {
						rootEl.insertBefore(dragEl, cloneEl || nextEl);
					}
					else if (!canSort) {
						rootEl.appendChild(dragEl);
					}

					return;
				}


				if ((el.children.length === 0) || (el.children[0] === ghostEl) ||
					(el === evt.target) && (_ghostIsLast(el, evt))
				) {
					//assign target only if condition is true
					if (el.children.length !== 0 && el.children[0] !== ghostEl && el === evt.target) {
						target = el.lastElementChild;
					}

					if (target) {
						if (target.animated) {
							return;
						}

						targetRect = target.getBoundingClientRect();
					}

					_cloneHide(activeSortable, isOwner);

					if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt) !== false) {
						if (!dragEl.contains(el)) {
							el.appendChild(dragEl);
							parentEl = el; // actualization
						}

						this._animate(dragRect, dragEl);
						target && this._animate(targetRect, target);
					}
				}
				else if (target && !target.animated && target !== dragEl && (target.parentNode[expando] !== void 0)) {
					if (lastEl !== target) {
						lastEl = target;
						lastCSS = _css(target);
						lastParentCSS = _css(target.parentNode);
					}

					targetRect = target.getBoundingClientRect();

					var width = targetRect.right - targetRect.left,
						height = targetRect.bottom - targetRect.top,
						floating = R_FLOAT.test(lastCSS.cssFloat + lastCSS.display)
							|| (lastParentCSS.display == 'flex' && lastParentCSS['flex-direction'].indexOf('row') === 0),
						isWide = (target.offsetWidth > dragEl.offsetWidth),
						isLong = (target.offsetHeight > dragEl.offsetHeight),
						halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5,
						nextSibling = target.nextElementSibling,
						after = false
					;

					if (floating) {
						var elTop = dragEl.offsetTop,
							tgTop = target.offsetTop;

						if (elTop === tgTop) {
							after = (target.previousElementSibling === dragEl) && !isWide || halfway && isWide;
						}
						else if (target.previousElementSibling === dragEl || dragEl.previousElementSibling === target) {
							after = (evt.clientY - targetRect.top) / height > 0.5;
						} else {
							after = tgTop > elTop;
						}
						} else if (!isMovingBetweenSortable) {
						after = (nextSibling !== dragEl) && !isLong || halfway && isLong;
					}

					var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

					if (moveVector !== false) {
						if (moveVector === 1 || moveVector === -1) {
							after = (moveVector === 1);
						}

						_silent = true;
						setTimeout(_unsilent, 30);

						_cloneHide(activeSortable, isOwner);

						if (!dragEl.contains(el)) {
							if (after && !nextSibling) {
								el.appendChild(dragEl);
							} else {
								target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
							}
						}

						parentEl = dragEl.parentNode; // actualization

						this._animate(dragRect, dragEl);
						this._animate(targetRect, target);
					}
				}
			}
		},

		_animate: function (prevRect, target) {
			var ms = this.options.animation;

			if (ms) {
				var currentRect = target.getBoundingClientRect();

				if (prevRect.nodeType === 1) {
					prevRect = prevRect.getBoundingClientRect();
				}

				_css(target, 'transition', 'none');
				_css(target, 'transform', 'translate3d('
					+ (prevRect.left - currentRect.left) + 'px,'
					+ (prevRect.top - currentRect.top) + 'px,0)'
				);

				target.offsetWidth; // repaint

				_css(target, 'transition', 'all ' + ms + 'ms');
				_css(target, 'transform', 'translate3d(0,0,0)');

				clearTimeout(target.animated);
				target.animated = setTimeout(function () {
					_css(target, 'transition', '');
					_css(target, 'transform', '');
					target.animated = false;
				}, ms);
			}
		},

		_offUpEvents: function () {
			var ownerDocument = this.el.ownerDocument;

			_off(document, 'touchmove', this._onTouchMove);
			_off(document, 'pointermove', this._onTouchMove);
			_off(ownerDocument, 'mouseup', this._onDrop);
			_off(ownerDocument, 'touchend', this._onDrop);
			_off(ownerDocument, 'pointerup', this._onDrop);
			_off(ownerDocument, 'touchcancel', this._onDrop);
			_off(ownerDocument, 'pointercancel', this._onDrop);
			_off(ownerDocument, 'selectstart', this);
		},

		_onDrop: function (/**Event*/evt) {
			var el = this.el,
				options = this.options;

			clearInterval(this._loopId);
			clearInterval(autoScroll.pid);
			clearTimeout(this._dragStartTimer);

			_cancelNextTick(this._cloneId);
			_cancelNextTick(this._dragStartId);

			// Unbind events
			_off(document, 'mouseover', this);
			_off(document, 'mousemove', this._onTouchMove);

			if (this.nativeDraggable) {
				_off(document, 'drop', this);
				_off(el, 'dragstart', this._onDragStart);
			}

			this._offUpEvents();

			if (evt) {
				if (moved) {
					evt.preventDefault();
					!options.dropBubble && evt.stopPropagation();
				}

				ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

				if (rootEl === parentEl || Sortable.active.lastPullMode !== 'clone') {
					// Remove clone
					cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
				}

				if (dragEl) {
					if (this.nativeDraggable) {
						_off(dragEl, 'dragend', this);
					}

					_disableDraggable(dragEl);
					dragEl.style['will-change'] = '';

					// Remove class's
					_toggleClass(dragEl, this.options.ghostClass, false);
					_toggleClass(dragEl, this.options.chosenClass, false);

					// Drag stop event
					_dispatchEvent(this, rootEl, 'unchoose', dragEl, parentEl, rootEl, oldIndex);

					if (rootEl !== parentEl) {
						newIndex = _index(dragEl, options.draggable);

						if (newIndex >= 0) {
							// Add event
							_dispatchEvent(null, parentEl, 'add', dragEl, parentEl, rootEl, oldIndex, newIndex);

							// Remove event
							_dispatchEvent(this, rootEl, 'remove', dragEl, parentEl, rootEl, oldIndex, newIndex);

							// drag from one list and drop into another
							_dispatchEvent(null, parentEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
							_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
						}
					}
					else {
						if (dragEl.nextSibling !== nextEl) {
							// Get the index of the dragged element within its parent
							newIndex = _index(dragEl, options.draggable);

							if (newIndex >= 0) {
								// drag & drop within the same list
								_dispatchEvent(this, rootEl, 'update', dragEl, parentEl, rootEl, oldIndex, newIndex);
								_dispatchEvent(this, rootEl, 'sort', dragEl, parentEl, rootEl, oldIndex, newIndex);
							}
						}
					}

					if (Sortable.active) {
						/* jshint eqnull:true */
						if (newIndex == null || newIndex === -1) {
							newIndex = oldIndex;
						}

						_dispatchEvent(this, rootEl, 'end', dragEl, parentEl, rootEl, oldIndex, newIndex);

						// Save sorting
						this.save();
					}
				}

			}

			this._nulling();
		},

		_nulling: function() {
			rootEl =
			dragEl =
			parentEl =
			ghostEl =
			nextEl =
			cloneEl =
			lastDownEl =

			scrollEl =
			scrollParentEl =

			tapEvt =
			touchEvt =

			moved =
			newIndex =

			lastEl =
			lastCSS =

			putSortable =
			activeGroup =
			Sortable.active = null;

			savedInputChecked.forEach(function (el) {
				el.checked = true;
			});
			savedInputChecked.length = 0;
		},

		handleEvent: function (/**Event*/evt) {
			switch (evt.type) {
				case 'drop':
				case 'dragend':
					this._onDrop(evt);
					break;

				case 'dragover':
				case 'dragenter':
					if (dragEl) {
						this._onDragOver(evt);
						_globalDragOver(evt);
					}
					break;

				case 'mouseover':
					this._onDrop(evt);
					break;

				case 'selectstart':
					evt.preventDefault();
					break;
			}
		},


		/**
		 * Serializes the item into an array of string.
		 * @returns {String[]}
		 */
		toArray: function () {
			var order = [],
				el,
				children = this.el.children,
				i = 0,
				n = children.length,
				options = this.options;

			for (; i < n; i++) {
				el = children[i];
				if (_closest(el, options.draggable, this.el)) {
					order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
				}
			}

			return order;
		},


		/**
		 * Sorts the elements according to the array.
		 * @param  {String[]}  order  order of the items
		 */
		sort: function (order) {
			var items = {}, rootEl = this.el;

			this.toArray().forEach(function (id, i) {
				var el = rootEl.children[i];

				if (_closest(el, this.options.draggable, rootEl)) {
					items[id] = el;
				}
			}, this);

			order.forEach(function (id) {
				if (items[id]) {
					rootEl.removeChild(items[id]);
					rootEl.appendChild(items[id]);
				}
			});
		},


		/**
		 * Save the current sorting
		 */
		save: function () {
			var store = this.options.store;
			store && store.set(this);
		},


		/**
		 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
		 * @param   {HTMLElement}  el
		 * @param   {String}       [selector]  default: `options.draggable`
		 * @returns {HTMLElement|null}
		 */
		closest: function (el, selector) {
			return _closest(el, selector || this.options.draggable, this.el);
		},


		/**
		 * Set/get option
		 * @param   {string} name
		 * @param   {*}      [value]
		 * @returns {*}
		 */
		option: function (name, value) {
			var options = this.options;

			if (value === void 0) {
				return options[name];
			} else {
				options[name] = value;

				if (name === 'group') {
					_prepareGroup(options);
				}
			}
		},


		/**
		 * Destroy
		 */
		destroy: function () {
			var el = this.el;

			el[expando] = null;

			_off(el, 'mousedown', this._onTapStart);
			_off(el, 'touchstart', this._onTapStart);
			_off(el, 'pointerdown', this._onTapStart);

			if (this.nativeDraggable) {
				_off(el, 'dragover', this);
				_off(el, 'dragenter', this);
			}

			// Remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);

			this._onDrop();

			this.el = el = null;
		}
	};


	function _cloneHide(sortable, state) {
		if (sortable.lastPullMode !== 'clone') {
			state = true;
		}

		if (cloneEl && (cloneEl.state !== state)) {
			_css(cloneEl, 'display', state ? 'none' : '');

			if (!state) {
				if (cloneEl.state) {
					if (sortable.options.group.revertClone) {
						rootEl.insertBefore(cloneEl, nextEl);
						sortable._animate(dragEl, cloneEl);
					} else {
						rootEl.insertBefore(cloneEl, dragEl);
					}
				}
			}

			cloneEl.state = state;
		}
	}


	function _closest(/**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx) {
		if (el) {
			ctx = ctx || document;

			do {
				if ((selector === '>*' && el.parentNode === ctx) || _matches(el, selector)) {
					return el;
				}
				/* jshint boss:true */
			} while (el = _getParentOrHost(el));
		}

		return null;
	}


	function _getParentOrHost(el) {
		var parent = el.host;

		return (parent && parent.nodeType) ? parent : el.parentNode;
	}


	function _globalDragOver(/**Event*/evt) {
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = 'move';
		}
		evt.preventDefault();
	}


	function _on(el, event, fn) {
		el.addEventListener(event, fn, captureMode);
	}


	function _off(el, event, fn) {
		el.removeEventListener(event, fn, captureMode);
	}


	function _toggleClass(el, name, state) {
		if (el) {
			if (el.classList) {
				el.classList[state ? 'add' : 'remove'](name);
			}
			else {
				var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
				el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
			}
		}
	}


	function _css(el, prop, val) {
		var style = el && el.style;

		if (style) {
			if (val === void 0) {
				if (document.defaultView && document.defaultView.getComputedStyle) {
					val = document.defaultView.getComputedStyle(el, '');
				}
				else if (el.currentStyle) {
					val = el.currentStyle;
				}

				return prop === void 0 ? val : val[prop];
			}
			else {
				if (!(prop in style)) {
					prop = '-webkit-' + prop;
				}

				style[prop] = val + (typeof val === 'string' ? '' : 'px');
			}
		}
	}


	function _find(ctx, tagName, iterator) {
		if (ctx) {
			var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;

			if (iterator) {
				for (; i < n; i++) {
					iterator(list[i], i);
				}
			}

			return list;
		}

		return [];
	}



	function _dispatchEvent(sortable, rootEl, name, targetEl, toEl, fromEl, startIndex, newIndex) {
		sortable = (sortable || rootEl[expando]);

		var evt = document.createEvent('Event'),
			options = sortable.options,
			onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);

		evt.initEvent(name, true, true);

		evt.to = toEl || rootEl;
		evt.from = fromEl || rootEl;
		evt.item = targetEl || rootEl;
		evt.clone = cloneEl;

		evt.oldIndex = startIndex;
		evt.newIndex = newIndex;

		rootEl.dispatchEvent(evt);

		if (options[onName]) {
			options[onName].call(sortable, evt);
		}
	}


	function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt, willInsertAfter) {
		var evt,
			sortable = fromEl[expando],
			onMoveFn = sortable.options.onMove,
			retVal;

		evt = document.createEvent('Event');
		evt.initEvent('move', true, true);

		evt.to = toEl;
		evt.from = fromEl;
		evt.dragged = dragEl;
		evt.draggedRect = dragRect;
		evt.related = targetEl || toEl;
		evt.relatedRect = targetRect || toEl.getBoundingClientRect();
		evt.willInsertAfter = willInsertAfter;

		fromEl.dispatchEvent(evt);

		if (onMoveFn) {
			retVal = onMoveFn.call(sortable, evt, originalEvt);
		}

		return retVal;
	}


	function _disableDraggable(el) {
		el.draggable = false;
	}


	function _unsilent() {
		_silent = false;
	}


	/** @returns {HTMLElement|false} */
	function _ghostIsLast(el, evt) {
		var lastEl = el.lastElementChild,
			rect = lastEl.getBoundingClientRect();

		// 5 — min delta
		// abs — нельзя добавлять, а то глюки при наведении сверху
		return (evt.clientY - (rect.top + rect.height) > 5) ||
			(evt.clientX - (rect.left + rect.width) > 5);
	}


	/**
	 * Generate id
	 * @param   {HTMLElement} el
	 * @returns {String}
	 * @private
	 */
	function _generateId(el) {
		var str = el.tagName + el.className + el.src + el.href + el.textContent,
			i = str.length,
			sum = 0;

		while (i--) {
			sum += str.charCodeAt(i);
		}

		return sum.toString(36);
	}

	/**
	 * Returns the index of an element within its parent for a selected set of
	 * elements
	 * @param  {HTMLElement} el
	 * @param  {selector} selector
	 * @return {number}
	 */
	function _index(el, selector) {
		var index = 0;

		if (!el || !el.parentNode) {
			return -1;
		}

		while (el && (el = el.previousElementSibling)) {
			if ((el.nodeName.toUpperCase() !== 'TEMPLATE') && (selector === '>*' || _matches(el, selector))) {
				index++;
			}
		}

		return index;
	}

	function _matches(/**HTMLElement*/el, /**String*/selector) {
		if (el) {
			selector = selector.split('.');

			var tag = selector.shift().toUpperCase(),
				re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g');

			return (
				(tag === '' || el.nodeName.toUpperCase() == tag) &&
				(!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length)
			);
		}

		return false;
	}

	function _throttle(callback, ms) {
		var args, _this;

		return function () {
			if (args === void 0) {
				args = arguments;
				_this = this;

				setTimeout(function () {
					if (args.length === 1) {
						callback.call(_this, args[0]);
					} else {
						callback.apply(_this, args);
					}

					args = void 0;
				}, ms);
			}
		};
	}

	function _extend(dst, src) {
		if (dst && src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dst[key] = src[key];
				}
			}
		}

		return dst;
	}

	function _clone(el) {
		if (Polymer && Polymer.dom) {
			return Polymer.dom(el).cloneNode(true);
		}
		else if ($) {
			return $(el).clone(true)[0];
		}
		else {
			return el.cloneNode(true);
		}
	}

	function _saveInputCheckedState(root) {
		var inputs = root.getElementsByTagName('input');
		var idx = inputs.length;

		while (idx--) {
			var el = inputs[idx];
			el.checked && savedInputChecked.push(el);
		}
	}

	function _nextTick(fn) {
		return setTimeout(fn, 0);
	}

	function _cancelNextTick(id) {
		return clearTimeout(id);
	}

	// Fixed #973:
	_on(document, 'touchmove', function (evt) {
		if (Sortable.active) {
			evt.preventDefault();
		}
	});

	// Export utils
	Sortable.utils = {
		on: _on,
		off: _off,
		css: _css,
		find: _find,
		is: function (el, selector) {
			return !!_closest(el, selector, el);
		},
		extend: _extend,
		throttle: _throttle,
		closest: _closest,
		toggleClass: _toggleClass,
		clone: _clone,
		index: _index,
		nextTick: _nextTick,
		cancelNextTick: _cancelNextTick
	};


	/**
	 * Create sortable instance
	 * @param {HTMLElement}  el
	 * @param {Object}      [options]
	 */
	Sortable.create = function (el, options) {
		return new Sortable(el, options);
	};


	// Export
	Sortable.version = '1.7.0';
	return Sortable;
});


/***/ }),

/***/ "VU/8":
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "W2nU":
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "cVUK":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	This is rot.js, the ROguelike Toolkit in JavaScript.
	Version 0.7~dev, generated on Mon Aug 28 15:11:22 CEST 2017.
*/
/**
 * Add objects for Node.js environment
 */
global.requestAnimationFrame = function(cb) {
	return setTimeout(cb, 1000/60);
};

global.document = {
	body: {
		appendChild: function(child) {},
		scrollLeft: 0,
		scrollTop: 0
	},
	createElement: function(type) {
		var canvas;
		return canvas = {
			getBoundingClientRect: function() {
				var rect;
				return rect = {
					left: 0,
					top: 0
				};
			},
			getContext: function(type) {
				var context;
				return context = {
					_termcolor: null,
					beginPath: function() {},
					canvas: canvas,
					clearRect: function(x, y, w, h) {
						if(this._termcolor !== null) {
							var clearCmd = this._termcolor.clearToAnsi(this.fillStyle);
							process.stdout.write(clearCmd);
						}
					},
					drawImage: function(a, b, c, d, e, f, g, h, i) {},
					fill: function() {},
					fillRect: function(x, y, w, h) {
						if(this._termcolor !== null) {
							var clearCmd = this._termcolor.clearToAnsi(this.fillStyle);
							process.stdout.write(clearCmd);
						}
					},
					fillStyle: "#000",
					fillText: function(chs, x, y) {},
					font: "monospace",
					lineTo: function(x, y) {},
					measureText: function(ch) {
						var result;
						return result = {
							width: 12
						};
					},
					moveTo: function(x, y) {},
					textAlign: "center",
					textBaseline: "middle"
				};
			},
			height: 0,
			style: {
				left: "100px",
				position: "absolute",
				top: "100px",
				visibility: "hidden"
			},
			width: 0
		};
	},
	documentElement: {
		scrollLeft: 0,
		scrollTop: 0
	}
};
(function (root, factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.ROT = factory();
    }
}(this, function() {
/**
 * @namespace Top-level ROT namespace
 */
var ROT = {
	/**
	 * @returns {bool} Is rot.js supported by this browser?
	 */
	isSupported: function() {
		return !!(document.createElement("canvas").getContext && Function.prototype.bind);
	},

	/** Default with for display and map generators */
	DEFAULT_WIDTH: 80,
	/** Default height for display and map generators */
	DEFAULT_HEIGHT: 25,

	/** Directional constants. Ordering is important! */
	DIRS: {
		"4": [
			[ 0, -1],
			[ 1,  0],
			[ 0,  1],
			[-1,  0]
		],
		"8": [
			[ 0, -1],
			[ 1, -1],
			[ 1,  0],
			[ 1,  1],
			[ 0,  1],
			[-1,  1],
			[-1,  0],
			[-1, -1]
		],
		"6": [
			[-1, -1],
			[ 1, -1],
			[ 2,  0],
			[ 1,  1],
			[-1,  1],
			[-2,  0]
		]
	},

	/** Cancel key. */
	VK_CANCEL: 3, 
	/** Help key. */
	VK_HELP: 6, 
	/** Backspace key. */
	VK_BACK_SPACE: 8, 
	/** Tab key. */
	VK_TAB: 9, 
	/** 5 key on Numpad when NumLock is unlocked. Or on Mac, clear key which is positioned at NumLock key. */
	VK_CLEAR: 12, 
	/** Return/enter key on the main keyboard. */
	VK_RETURN: 13, 
	/** Reserved, but not used. */
	VK_ENTER: 14, 
	/** Shift key. */
	VK_SHIFT: 16, 
	/** Control key. */
	VK_CONTROL: 17, 
	/** Alt (Option on Mac) key. */
	VK_ALT: 18, 
	/** Pause key. */
	VK_PAUSE: 19, 
	/** Caps lock. */
	VK_CAPS_LOCK: 20, 
	/** Escape key. */
	VK_ESCAPE: 27, 
	/** Space bar. */
	VK_SPACE: 32, 
	/** Page Up key. */
	VK_PAGE_UP: 33, 
	/** Page Down key. */
	VK_PAGE_DOWN: 34, 
	/** End key. */
	VK_END: 35, 
	/** Home key. */
	VK_HOME: 36, 
	/** Left arrow. */
	VK_LEFT: 37, 
	/** Up arrow. */
	VK_UP: 38, 
	/** Right arrow. */
	VK_RIGHT: 39, 
	/** Down arrow. */
	VK_DOWN: 40, 
	/** Print Screen key. */
	VK_PRINTSCREEN: 44, 
	/** Ins(ert) key. */
	VK_INSERT: 45, 
	/** Del(ete) key. */
	VK_DELETE: 46, 
	/***/
	VK_0: 48,
	/***/
	VK_1: 49,
	/***/
	VK_2: 50,
	/***/
	VK_3: 51,
	/***/
	VK_4: 52,
	/***/
	VK_5: 53,
	/***/
	VK_6: 54,
	/***/
	VK_7: 55,
	/***/
	VK_8: 56,
	/***/
	VK_9: 57,
	/** Colon (:) key. Requires Gecko 15.0 */
	VK_COLON: 58, 
	/** Semicolon (;) key. */
	VK_SEMICOLON: 59, 
	/** Less-than (<) key. Requires Gecko 15.0 */
	VK_LESS_THAN: 60, 
	/** Equals (=) key. */
	VK_EQUALS: 61, 
	/** Greater-than (>) key. Requires Gecko 15.0 */
	VK_GREATER_THAN: 62, 
	/** Question mark (?) key. Requires Gecko 15.0 */
	VK_QUESTION_MARK: 63, 
	/** Atmark (@) key. Requires Gecko 15.0 */
	VK_AT: 64, 
	/***/
	VK_A: 65,
	/***/
	VK_B: 66,
	/***/
	VK_C: 67,
	/***/
	VK_D: 68,
	/***/
	VK_E: 69,
	/***/
	VK_F: 70,
	/***/
	VK_G: 71,
	/***/
	VK_H: 72,
	/***/
	VK_I: 73,
	/***/
	VK_J: 74,
	/***/
	VK_K: 75,
	/***/
	VK_L: 76,
	/***/
	VK_M: 77,
	/***/
	VK_N: 78,
	/***/
	VK_O: 79,
	/***/
	VK_P: 80,
	/***/
	VK_Q: 81,
	/***/
	VK_R: 82,
	/***/
	VK_S: 83,
	/***/
	VK_T: 84,
	/***/
	VK_U: 85,
	/***/
	VK_V: 86,
	/***/
	VK_W: 87,
	/***/
	VK_X: 88,
	/***/
	VK_Y: 89,
	/***/
	VK_Z: 90,
	/***/
	VK_CONTEXT_MENU: 93,
	/** 0 on the numeric keypad. */
	VK_NUMPAD0: 96, 
	/** 1 on the numeric keypad. */
	VK_NUMPAD1: 97, 
	/** 2 on the numeric keypad. */
	VK_NUMPAD2: 98, 
	/** 3 on the numeric keypad. */
	VK_NUMPAD3: 99, 
	/** 4 on the numeric keypad. */
	VK_NUMPAD4: 100, 
	/** 5 on the numeric keypad. */
	VK_NUMPAD5: 101, 
	/** 6 on the numeric keypad. */
	VK_NUMPAD6: 102, 
	/** 7 on the numeric keypad. */
	VK_NUMPAD7: 103, 
	/** 8 on the numeric keypad. */
	VK_NUMPAD8: 104, 
	/** 9 on the numeric keypad. */
	VK_NUMPAD9: 105, 
	/** * on the numeric keypad. */
	VK_MULTIPLY: 106,
	/** + on the numeric keypad. */
	VK_ADD: 107, 
	/***/
	VK_SEPARATOR: 108,
	/** - on the numeric keypad. */
	VK_SUBTRACT: 109, 
	/** Decimal point on the numeric keypad. */
	VK_DECIMAL: 110, 
	/** / on the numeric keypad. */
	VK_DIVIDE: 111, 
	/** F1 key. */
	VK_F1: 112, 
	/** F2 key. */
	VK_F2: 113, 
	/** F3 key. */
	VK_F3: 114, 
	/** F4 key. */
	VK_F4: 115, 
	/** F5 key. */
	VK_F5: 116, 
	/** F6 key. */
	VK_F6: 117, 
	/** F7 key. */
	VK_F7: 118, 
	/** F8 key. */
	VK_F8: 119, 
	/** F9 key. */
	VK_F9: 120, 
	/** F10 key. */
	VK_F10: 121, 
	/** F11 key. */
	VK_F11: 122, 
	/** F12 key. */
	VK_F12: 123, 
	/** F13 key. */
	VK_F13: 124, 
	/** F14 key. */
	VK_F14: 125, 
	/** F15 key. */
	VK_F15: 126, 
	/** F16 key. */
	VK_F16: 127, 
	/** F17 key. */
	VK_F17: 128, 
	/** F18 key. */
	VK_F18: 129, 
	/** F19 key. */
	VK_F19: 130, 
	/** F20 key. */
	VK_F20: 131, 
	/** F21 key. */
	VK_F21: 132, 
	/** F22 key. */
	VK_F22: 133, 
	/** F23 key. */
	VK_F23: 134, 
	/** F24 key. */
	VK_F24: 135, 
	/** Num Lock key. */
	VK_NUM_LOCK: 144, 
	/** Scroll Lock key. */
	VK_SCROLL_LOCK: 145, 
	/** Circumflex (^) key. Requires Gecko 15.0 */
	VK_CIRCUMFLEX: 160, 
	/** Exclamation (!) key. Requires Gecko 15.0 */
	VK_EXCLAMATION: 161, 
	/** Double quote () key. Requires Gecko 15.0 */
	VK_DOUBLE_QUOTE: 162, 
	/** Hash (#) key. Requires Gecko 15.0 */
	VK_HASH: 163, 
	/** Dollar sign ($) key. Requires Gecko 15.0 */
	VK_DOLLAR: 164, 
	/** Percent (%) key. Requires Gecko 15.0 */
	VK_PERCENT: 165, 
	/** Ampersand (&) key. Requires Gecko 15.0 */
	VK_AMPERSAND: 166, 
	/** Underscore (_) key. Requires Gecko 15.0 */
	VK_UNDERSCORE: 167, 
	/** Open parenthesis (() key. Requires Gecko 15.0 */
	VK_OPEN_PAREN: 168, 
	/** Close parenthesis ()) key. Requires Gecko 15.0 */
	VK_CLOSE_PAREN: 169, 
	/* Asterisk (*) key. Requires Gecko 15.0 */
	VK_ASTERISK: 170,
	/** Plus (+) key. Requires Gecko 15.0 */
	VK_PLUS: 171, 
	/** Pipe (|) key. Requires Gecko 15.0 */
	VK_PIPE: 172, 
	/** Hyphen-US/docs/Minus (-) key. Requires Gecko 15.0 */
	VK_HYPHEN_MINUS: 173, 
	/** Open curly bracket ({) key. Requires Gecko 15.0 */
	VK_OPEN_CURLY_BRACKET: 174, 
	/** Close curly bracket (}) key. Requires Gecko 15.0 */
	VK_CLOSE_CURLY_BRACKET: 175, 
	/** Tilde (~) key. Requires Gecko 15.0 */
	VK_TILDE: 176, 
	/** Comma (,) key. */
	VK_COMMA: 188, 
	/** Period (.) key. */
	VK_PERIOD: 190, 
	/** Slash (/) key. */
	VK_SLASH: 191, 
	/** Back tick (`) key. */
	VK_BACK_QUOTE: 192, 
	/** Open square bracket ([) key. */
	VK_OPEN_BRACKET: 219, 
	/** Back slash (\) key. */
	VK_BACK_SLASH: 220, 
	/** Close square bracket (]) key. */
	VK_CLOSE_BRACKET: 221, 
	/** Quote (''') key. */
	VK_QUOTE: 222, 
	/** Meta key on Linux, Command key on Mac. */
	VK_META: 224, 
	/** AltGr key on Linux. Requires Gecko 15.0 */
	VK_ALTGR: 225, 
	/** Windows logo key on Windows. Or Super or Hyper key on Linux. Requires Gecko 15.0 */
	VK_WIN: 91, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_KANA: 21, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_HANGUL: 21, 
	/** 英数 key on Japanese Mac keyboard. Requires Gecko 15.0 */
	VK_EISU: 22, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_JUNJA: 23, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_FINAL: 24, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_HANJA: 25, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_KANJI: 25, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_CONVERT: 28, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_NONCONVERT: 29, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_ACCEPT: 30, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_MODECHANGE: 31, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_SELECT: 41, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_PRINT: 42, 
	/** Linux support for this keycode was added in Gecko 4.0. */
	VK_EXECUTE: 43, 
	/** Linux support for this keycode was added in Gecko 4.0.	 */
	VK_SLEEP: 95 
};
/**
 * @namespace
 * Contains text tokenization and breaking routines
 */
ROT.Text = {
	RE_COLORS: /%([bc]){([^}]*)}/g,

	/* token types */
	TYPE_TEXT:		0,
	TYPE_NEWLINE:	1,
	TYPE_FG:		2,
	TYPE_BG:		3,

	/**
	 * Measure size of a resulting text block
	 */
	measure: function(str, maxWidth) {
		var result = {width:0, height:1};
		var tokens = this.tokenize(str, maxWidth);
		var lineWidth = 0;

		for (var i=0;i<tokens.length;i++) {
			var token = tokens[i];
			switch (token.type) {
				case this.TYPE_TEXT:
					lineWidth += token.value.length;
				break;

				case this.TYPE_NEWLINE:
					result.height++;
					result.width = Math.max(result.width, lineWidth);
					lineWidth = 0;
				break;
			}
		}
		result.width = Math.max(result.width, lineWidth);

		return result;
	},

	/**
	 * Convert string to a series of a formatting commands
	 */
	tokenize: function(str, maxWidth) {
		var result = [];

		/* first tokenization pass - split texts and color formatting commands */
		var offset = 0;
		str.replace(this.RE_COLORS, function(match, type, name, index) {
			/* string before */
			var part = str.substring(offset, index);
			if (part.length) {
				result.push({
					type: ROT.Text.TYPE_TEXT,
					value: part
				});
			}

			/* color command */
			result.push({
				type: (type == "c" ? ROT.Text.TYPE_FG : ROT.Text.TYPE_BG),
				value: name.trim()
			});

			offset = index + match.length;
			return "";
		});

		/* last remaining part */
		var part = str.substring(offset);
		if (part.length) {
			result.push({
				type: ROT.Text.TYPE_TEXT,
				value: part
			});
		}

		return this._breakLines(result, maxWidth);
	},

	/* insert line breaks into first-pass tokenized data */
	_breakLines: function(tokens, maxWidth) {
		if (!maxWidth) { maxWidth = Infinity; }

		var i = 0;
		var lineLength = 0;
		var lastTokenWithSpace = -1;

		while (i < tokens.length) { /* take all text tokens, remove space, apply linebreaks */
			var token = tokens[i];
			if (token.type == ROT.Text.TYPE_NEWLINE) { /* reset */
				lineLength = 0; 
				lastTokenWithSpace = -1;
			}
			if (token.type != ROT.Text.TYPE_TEXT) { /* skip non-text tokens */
				i++;
				continue; 
			}

			/* remove spaces at the beginning of line */
			while (lineLength == 0 && token.value.charAt(0) == " ") { token.value = token.value.substring(1); }

			/* forced newline? insert two new tokens after this one */
			var index = token.value.indexOf("\n");
			if (index != -1) { 
				token.value = this._breakInsideToken(tokens, i, index, true); 

				/* if there are spaces at the end, we must remove them (we do not want the line too long) */
				var arr = token.value.split("");
				while (arr.length && arr[arr.length-1] == " ") { arr.pop(); }
				token.value = arr.join("");
			}

			/* token degenerated? */
			if (!token.value.length) {
				tokens.splice(i, 1);
				continue;
			}

			if (lineLength + token.value.length > maxWidth) { /* line too long, find a suitable breaking spot */

				/* is it possible to break within this token? */
				var index = -1;
				while (1) {
					var nextIndex = token.value.indexOf(" ", index+1);
					if (nextIndex == -1) { break; }
					if (lineLength + nextIndex > maxWidth) { break; }
					index = nextIndex;
				}

				if (index != -1) { /* break at space within this one */
					token.value = this._breakInsideToken(tokens, i, index, true);
				} else if (lastTokenWithSpace != -1) { /* is there a previous token where a break can occur? */
					var token = tokens[lastTokenWithSpace];
					var breakIndex = token.value.lastIndexOf(" ");
					token.value = this._breakInsideToken(tokens, lastTokenWithSpace, breakIndex, true);
					i = lastTokenWithSpace;
				} else { /* force break in this token */
					token.value = this._breakInsideToken(tokens, i, maxWidth-lineLength, false);
				}

			} else { /* line not long, continue */
				lineLength += token.value.length;
				if (token.value.indexOf(" ") != -1) { lastTokenWithSpace = i; }
			}
			
			i++; /* advance to next token */
		}


		tokens.push({type: ROT.Text.TYPE_NEWLINE}); /* insert fake newline to fix the last text line */

		/* remove trailing space from text tokens before newlines */
		var lastTextToken = null;
		for (var i=0;i<tokens.length;i++) {
			var token = tokens[i];
			switch (token.type) {
				case ROT.Text.TYPE_TEXT: lastTextToken = token; break;
				case ROT.Text.TYPE_NEWLINE: 
					if (lastTextToken) { /* remove trailing space */
						var arr = lastTextToken.value.split("");
						while (arr.length && arr[arr.length-1] == " ") { arr.pop(); }
						lastTextToken.value = arr.join("");
					}
					lastTextToken = null;
				break;
			}
		}

		tokens.pop(); /* remove fake token */

		return tokens;
	},

	/**
	 * Create new tokens and insert them into the stream
	 * @param {object[]} tokens
	 * @param {int} tokenIndex Token being processed
	 * @param {int} breakIndex Index within current token's value
	 * @param {bool} removeBreakChar Do we want to remove the breaking character?
	 * @returns {string} remaining unbroken token value
	 */
	_breakInsideToken: function(tokens, tokenIndex, breakIndex, removeBreakChar) {
		var newBreakToken = {
			type: ROT.Text.TYPE_NEWLINE
		};
		var newTextToken = {
			type: ROT.Text.TYPE_TEXT,
			value: tokens[tokenIndex].value.substring(breakIndex + (removeBreakChar ? 1 : 0))
		};
		tokens.splice(tokenIndex+1, 0, newBreakToken, newTextToken);
		return tokens[tokenIndex].value.substring(0, breakIndex);
	}
};
/**
 * @returns {any} Randomly picked item, null when length=0
 */
Array.prototype.random = Array.prototype.random || function() {
	if (!this.length) { return null; }
	return this[Math.floor(ROT.RNG.getUniform() * this.length)];
};

/**
 * @returns {array} New array with randomized items
 */
Array.prototype.randomize = Array.prototype.randomize || function() {
  var result = [];
  var clone = this.slice();
  while (clone.length) {
    var index = clone.indexOf(clone.random());
    result.push(clone.splice(index, 1)[0]);
  }
  return result;
};
/**
 * Always positive modulus
 * @param {int} n Modulus
 * @returns {int} this modulo n
 */
Number.prototype.mod = Number.prototype.mod || function(n) {
	return ((this%n)+n)%n;
};
/**
 * @returns {string} First letter capitalized
 */
String.prototype.capitalize = String.prototype.capitalize || function() {
	return this.charAt(0).toUpperCase() + this.substring(1);
};

/** 
 * Left pad
 * @param {string} [character="0"]
 * @param {int} [count=2]
 */
String.prototype.lpad = String.prototype.lpad || function(character, count) {
	var ch = character || "0";
	var cnt = count || 2;

	var s = "";
	while (s.length < (cnt - this.length)) { s += ch; }
	s = s.substring(0, cnt-this.length);
	return s+this;
};

/** 
 * Right pad
 * @param {string} [character="0"]
 * @param {int} [count=2]
 */
String.prototype.rpad = String.prototype.rpad || function(character, count) {
	var ch = character || "0";
	var cnt = count || 2;

	var s = "";
	while (s.length < (cnt - this.length)) { s += ch; }
	s = s.substring(0, cnt-this.length);
	return this+s;
};

/**
 * Format a string in a flexible way. Scans for %s strings and replaces them with arguments. List of patterns is modifiable via String.format.map.
 * @param {string} template
 * @param {any} [argv]
 */
String.format = String.format || function(template) {
	var map = String.format.map;
	var args = Array.prototype.slice.call(arguments, 1);

	var replacer = function(match, group1, group2, index) {
		if (template.charAt(index-1) == "%") { return match.substring(1); }
		if (!args.length) { return match; }
		var obj = args[0];

		var group = group1 || group2;
		var parts = group.split(",");
		var name = parts.shift();
		var method = map[name.toLowerCase()];
		if (!method) { return match; }

		var obj = args.shift();
		var replaced = obj[method].apply(obj, parts);

		var first = name.charAt(0);
		if (first != first.toLowerCase()) { replaced = replaced.capitalize(); }

		return replaced;
	};
	return template.replace(/%(?:([a-z]+)|(?:{([^}]+)}))/gi, replacer);
};

String.format.map = String.format.map || {
	"s": "toString"
};

/**
 * Convenience shortcut to String.format(this)
 */
String.prototype.format = String.prototype.format || function() {
	var args = Array.prototype.slice.call(arguments);
	args.unshift(this);
	return String.format.apply(String, args);
};

if (!Object.create) {  
	/**
	 * ES5 Object.create
	 */
	Object.create = function(o) {  
		var tmp = function() {};
		tmp.prototype = o;
		return new tmp();
	};  
}  
/**
 * Sets prototype of this function to an instance of parent function
 * @param {function} parent
 */
Function.prototype.extend = Function.prototype.extend || function(parent) {
	this.prototype = Object.create(parent.prototype);
	this.prototype.constructor = this;
	return this;
};
if (typeof window != "undefined") {
	window.requestAnimationFrame =
		window.requestAnimationFrame
		|| window.mozRequestAnimationFrame
		|| window.webkitRequestAnimationFrame
		|| window.oRequestAnimationFrame
		|| window.msRequestAnimationFrame
		|| function(cb) { return setTimeout(cb, 1000/60); };

	window.cancelAnimationFrame =
		window.cancelAnimationFrame
		|| window.mozCancelAnimationFrame
		|| window.webkitCancelAnimationFrame
		|| window.oCancelAnimationFrame
		|| window.msCancelAnimationFrame
		|| function(id) { return clearTimeout(id); };
}
/**
 * @class Visual map display
 * @param {object} [options]
 * @param {int} [options.width=ROT.DEFAULT_WIDTH]
 * @param {int} [options.height=ROT.DEFAULT_HEIGHT]
 * @param {int} [options.fontSize=15]
 * @param {string} [options.fontFamily="monospace"]
 * @param {string} [options.fontStyle=""] bold/italic/none/both
 * @param {string} [options.fg="#ccc"]
 * @param {string} [options.bg="#000"]
 * @param {float} [options.spacing=1]
 * @param {float} [options.border=0]
 * @param {string} [options.layout="rect"]
 * @param {bool} [options.forceSquareRatio=false]
 * @param {int} [options.tileWidth=32]
 * @param {int} [options.tileHeight=32]
 * @param {object} [options.tileMap={}]
 * @param {image} [options.tileSet=null]
 * @param {image} [options.tileColorize=false]
 */
ROT.Display = function(options) {
	var canvas = document.createElement("canvas");
	this._context = canvas.getContext("2d");
	this._data = {};
	this._dirty = false; /* false = nothing, true = all, object = dirty cells */
	this._options = {};
	this._backend = null;
	
	var defaultOptions = {
		width: ROT.DEFAULT_WIDTH,
		height: ROT.DEFAULT_HEIGHT,
		transpose: false,
		layout: "rect",
		fontSize: 15,
		spacing: 1,
		border: 0,
		forceSquareRatio: false,
		fontFamily: "monospace",
		fontStyle: "",
		fg: "#ccc",
		bg: "#000",
		tileWidth: 32,
		tileHeight: 32,
		tileMap: {},
		tileSet: null,
		tileColorize: false,
		termColor: "xterm"
	};
	for (var p in options) { defaultOptions[p] = options[p]; }
	this.setOptions(defaultOptions);
	this.DEBUG = this.DEBUG.bind(this);

	this._tick = this._tick.bind(this);
	requestAnimationFrame(this._tick);
};

/**
 * Debug helper, ideal as a map generator callback. Always bound to this.
 * @param {int} x
 * @param {int} y
 * @param {int} what
 */
ROT.Display.prototype.DEBUG = function(x, y, what) {
	var colors = [this._options.bg, this._options.fg];
	this.draw(x, y, null, null, colors[what % colors.length]);
};

/**
 * Clear the whole display (cover it with background color)
 */
ROT.Display.prototype.clear = function() {
	this._data = {};
	this._dirty = true;
};

/**
 * @see ROT.Display
 */
ROT.Display.prototype.setOptions = function(options) {
	for (var p in options) { this._options[p] = options[p]; }
	if (options.width || options.height || options.fontSize || options.fontFamily || options.spacing || options.layout) {
		if (options.layout) { 
			this._backend = new ROT.Display[options.layout.capitalize()](this._context);
		}

		var font = (this._options.fontStyle ? this._options.fontStyle + " " : "") + this._options.fontSize + "px " + this._options.fontFamily;
		this._context.font = font;
		this._backend.compute(this._options);
		this._context.font = font;
		this._context.textAlign = "center";
		this._context.textBaseline = "middle";
		this._dirty = true;
	}
	return this;
};

/**
 * Returns currently set options
 * @returns {object} Current options object 
 */
ROT.Display.prototype.getOptions = function() {
	return this._options;
};

/**
 * Returns the DOM node of this display
 * @returns {node} DOM node
 */
ROT.Display.prototype.getContainer = function() {
	return this._context.canvas;
};

/**
 * Compute the maximum width/height to fit into a set of given constraints
 * @param {int} availWidth Maximum allowed pixel width
 * @param {int} availHeight Maximum allowed pixel height
 * @returns {int[2]} cellWidth,cellHeight
 */
ROT.Display.prototype.computeSize = function(availWidth, availHeight) {
	return this._backend.computeSize(availWidth, availHeight, this._options);
};

/**
 * Compute the maximum font size to fit into a set of given constraints
 * @param {int} availWidth Maximum allowed pixel width
 * @param {int} availHeight Maximum allowed pixel height
 * @returns {int} fontSize
 */
ROT.Display.prototype.computeFontSize = function(availWidth, availHeight) {
	return this._backend.computeFontSize(availWidth, availHeight, this._options);
};

/**
 * Convert a DOM event (mouse or touch) to map coordinates. Uses first touch for multi-touch.
 * @param {Event} e event
 * @returns {int[2]} -1 for values outside of the canvas
 */
ROT.Display.prototype.eventToPosition = function(e) {
	if (e.touches) {
		var x = e.touches[0].clientX;
		var y = e.touches[0].clientY;
	} else {
		var x = e.clientX;
		var y = e.clientY;
	}

	var rect = this._context.canvas.getBoundingClientRect();
	x -= rect.left;
	y -= rect.top;
	
	x *= this._context.canvas.width / this._context.canvas.clientWidth;
	y *= this._context.canvas.height / this._context.canvas.clientHeight;

	if (x < 0 || y < 0 || x >= this._context.canvas.width || y >= this._context.canvas.height) { return [-1, -1]; }

	return this._backend.eventToPosition(x, y);
};

/**
 * @param {int} x
 * @param {int} y
 * @param {string || string[]} ch One or more chars (will be overlapping themselves)
 * @param {string} [fg] foreground color
 * @param {string} [bg] background color
 */
ROT.Display.prototype.draw = function(x, y, ch, fg, bg) {
	if (!fg) { fg = this._options.fg; }
	if (!bg) { bg = this._options.bg; }
	this._data[x+","+y] = [x, y, ch, fg, bg];
	
	if (this._dirty === true) { return; } /* will already redraw everything */
	if (!this._dirty) { this._dirty = {}; } /* first! */
	this._dirty[x+","+y] = true;
};

/**
 * Draws a text at given position. Optionally wraps at a maximum length. Currently does not work with hex layout.
 * @param {int} x
 * @param {int} y
 * @param {string} text May contain color/background format specifiers, %c{name}/%b{name}, both optional. %c{}/%b{} resets to default.
 * @param {int} [maxWidth] wrap at what width?
 * @returns {int} lines drawn
 */
ROT.Display.prototype.drawText = function(x, y, text, maxWidth) {
	var fg = null;
	var bg = null;
	var cx = x;
	var cy = y;
	var lines = 1;
	if (!maxWidth) { maxWidth = this._options.width-x; }

	var tokens = ROT.Text.tokenize(text, maxWidth);

	while (tokens.length) { /* interpret tokenized opcode stream */
		var token = tokens.shift();
		switch (token.type) {
			case ROT.Text.TYPE_TEXT:
				var isSpace = false, isPrevSpace = false, isFullWidth = false, isPrevFullWidth = false;
				for (var i=0;i<token.value.length;i++) {
					var cc = token.value.charCodeAt(i);
					var c = token.value.charAt(i);
					// Assign to `true` when the current char is full-width.
					isFullWidth = (cc > 0xff00 && cc < 0xff61) || (cc > 0xffdc && cc < 0xffe8) || cc > 0xffee;
					// Current char is space, whatever full-width or half-width both are OK.
					isSpace = (c.charCodeAt(0) == 0x20 || c.charCodeAt(0) == 0x3000);
					// The previous char is full-width and
					// current char is nether half-width nor a space.
					if (isPrevFullWidth && !isFullWidth && !isSpace) { cx++; } // add an extra position
					// The current char is full-width and
					// the previous char is not a space.
					if(isFullWidth && !isPrevSpace) { cx++; } // add an extra position
					this.draw(cx++, cy, c, fg, bg);
					isPrevSpace = isSpace;
					isPrevFullWidth = isFullWidth;
				}
			break;

			case ROT.Text.TYPE_FG:
				fg = token.value || null;
			break;

			case ROT.Text.TYPE_BG:
				bg = token.value || null;
			break;

			case ROT.Text.TYPE_NEWLINE:
				cx = x;
				cy++;
				lines++;
			break;
		}
	}

	return lines;
};

/**
 * Timer tick: update dirty parts
 */
ROT.Display.prototype._tick = function() {
	requestAnimationFrame(this._tick);

	if (!this._dirty) { return; }

	if (this._dirty === true) { /* draw all */
		this._context.fillStyle = this._options.bg;
		this._context.fillRect(0, 0, this._context.canvas.width, this._context.canvas.height);

		for (var id in this._data) { /* redraw cached data */
			this._draw(id, false);
		}

	} else { /* draw only dirty */
		for (var key in this._dirty) {
			this._draw(key, true);
		}
	}

	this._dirty = false;
};

/**
 * @param {string} key What to draw
 * @param {bool} clearBefore Is it necessary to clean before?
 */
ROT.Display.prototype._draw = function(key, clearBefore) {
	var data = this._data[key];
	if (data[4] != this._options.bg) { clearBefore = true; }

	this._backend.draw(data, clearBefore);
};
/**
 * @class Abstract display backend module
 * @private
 */
ROT.Display.Backend = function(context) {
	this._context = context;
};

ROT.Display.Backend.prototype.compute = function(options) {
};

ROT.Display.Backend.prototype.draw = function(data, clearBefore) {
};

ROT.Display.Backend.prototype.computeSize = function(availWidth, availHeight) {
};

ROT.Display.Backend.prototype.computeFontSize = function(availWidth, availHeight) {
};

ROT.Display.Backend.prototype.eventToPosition = function(x, y) {
};
/**
 * @class Rectangular backend
 * @private
 */
ROT.Display.Rect = function(context) {
	ROT.Display.Backend.call(this, context);
	
	this._spacingX = 0;
	this._spacingY = 0;
	this._canvasCache = {};
	this._options = {};
};
ROT.Display.Rect.extend(ROT.Display.Backend);

ROT.Display.Rect.cache = false;

ROT.Display.Rect.prototype.compute = function(options) {
	this._canvasCache = {};
	this._options = options;

	var charWidth = Math.ceil(this._context.measureText("W").width);
	this._spacingX = Math.ceil(options.spacing * charWidth);
	this._spacingY = Math.ceil(options.spacing * options.fontSize);

	if (this._options.forceSquareRatio) {
		this._spacingX = this._spacingY = Math.max(this._spacingX, this._spacingY);
	}

	this._context.canvas.width = options.width * this._spacingX;
	this._context.canvas.height = options.height * this._spacingY;
};

ROT.Display.Rect.prototype.draw = function(data, clearBefore) {
	if (this.constructor.cache) {
		this._drawWithCache(data, clearBefore);
	} else {
		this._drawNoCache(data, clearBefore);
	}
};

ROT.Display.Rect.prototype._drawWithCache = function(data, clearBefore) {
	var x = data[0];
	var y = data[1];
	var ch = data[2];
	var fg = data[3];
	var bg = data[4];

	var hash = ""+ch+fg+bg;
	if (hash in this._canvasCache) {
		var canvas = this._canvasCache[hash];
	} else {
		var b = this._options.border;
		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext("2d");
		canvas.width = this._spacingX;
		canvas.height = this._spacingY;
		ctx.fillStyle = bg;
		ctx.fillRect(b, b, canvas.width-b, canvas.height-b);
		
		if (ch) {
			ctx.fillStyle = fg;
			ctx.font = this._context.font;
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";

			var chars = [].concat(ch);
			for (var i=0;i<chars.length;i++) {
				ctx.fillText(chars[i], this._spacingX/2, Math.ceil(this._spacingY/2));
			}
		}
		this._canvasCache[hash] = canvas;
	}
	
	this._context.drawImage(canvas, x*this._spacingX, y*this._spacingY);
};

ROT.Display.Rect.prototype._drawNoCache = function(data, clearBefore) {
	var x = data[0];
	var y = data[1];
	var ch = data[2];
	var fg = data[3];
	var bg = data[4];

	if (clearBefore) { 
		var b = this._options.border;
		this._context.fillStyle = bg;
		this._context.fillRect(x*this._spacingX + b, y*this._spacingY + b, this._spacingX - b, this._spacingY - b);
	}
	
	if (!ch) { return; }

	this._context.fillStyle = fg;

	var chars = [].concat(ch);
	for (var i=0;i<chars.length;i++) {
		this._context.fillText(chars[i], (x+0.5) * this._spacingX, Math.ceil((y+0.5) * this._spacingY));
	}
};

ROT.Display.Rect.prototype.computeSize = function(availWidth, availHeight) {
	var width = Math.floor(availWidth / this._spacingX);
	var height = Math.floor(availHeight / this._spacingY);
	return [width, height];
};

ROT.Display.Rect.prototype.computeFontSize = function(availWidth, availHeight) {
	var boxWidth = Math.floor(availWidth / this._options.width);
	var boxHeight = Math.floor(availHeight / this._options.height);

	/* compute char ratio */
	var oldFont = this._context.font;
	this._context.font = "100px " + this._options.fontFamily;
	var width = Math.ceil(this._context.measureText("W").width);
	this._context.font = oldFont;
	var ratio = width / 100;
		
	var widthFraction = ratio * boxHeight / boxWidth;
	if (widthFraction > 1) { /* too wide with current aspect ratio */
		boxHeight = Math.floor(boxHeight / widthFraction);
	}
	return Math.floor(boxHeight / this._options.spacing);
};

ROT.Display.Rect.prototype.eventToPosition = function(x, y) {
	return [Math.floor(x/this._spacingX), Math.floor(y/this._spacingY)];
};
/**
 * @class Hexagonal backend
 * @private
 */
ROT.Display.Hex = function(context) {
	ROT.Display.Backend.call(this, context);

	this._spacingX = 0;
	this._spacingY = 0;
	this._hexSize = 0;
	this._options = {};
};
ROT.Display.Hex.extend(ROT.Display.Backend);

ROT.Display.Hex.prototype.compute = function(options) {
	this._options = options;

	/* FIXME char size computation does not respect transposed hexes */
	var charWidth = Math.ceil(this._context.measureText("W").width);
	this._hexSize = Math.floor(options.spacing * (options.fontSize + charWidth/Math.sqrt(3)) / 2);
	this._spacingX = this._hexSize * Math.sqrt(3) / 2;
	this._spacingY = this._hexSize * 1.5;

	if (options.transpose) {
		var xprop = "height";
		var yprop = "width";
	} else {
		var xprop = "width";
		var yprop = "height";
	}
	this._context.canvas[xprop] = Math.ceil( (options.width + 1) * this._spacingX );
	this._context.canvas[yprop] = Math.ceil( (options.height - 1) * this._spacingY + 2*this._hexSize );
};

ROT.Display.Hex.prototype.draw = function(data, clearBefore) {
	var x = data[0];
	var y = data[1];
	var ch = data[2];
	var fg = data[3];
	var bg = data[4];

	var px = [
		(x+1) * this._spacingX,
		y * this._spacingY + this._hexSize
	];
	if (this._options.transpose) { px.reverse(); }

	if (clearBefore) {
		this._context.fillStyle = bg;
		this._fill(px[0], px[1]);
	}

	if (!ch) { return; }

	this._context.fillStyle = fg;

	var chars = [].concat(ch);
	for (var i=0;i<chars.length;i++) {
		this._context.fillText(chars[i], px[0], Math.ceil(px[1]));
	}
};

ROT.Display.Hex.prototype.computeSize = function(availWidth, availHeight) {
	if (this._options.transpose) {
		availWidth += availHeight;
		availHeight = availWidth - availHeight;
		availWidth -= availHeight;
	}

	var width = Math.floor(availWidth / this._spacingX) - 1;
	var height = Math.floor((availHeight - 2*this._hexSize) / this._spacingY + 1);
	return [width, height];
};

ROT.Display.Hex.prototype.computeFontSize = function(availWidth, availHeight) {
	if (this._options.transpose) {
		availWidth += availHeight;
		availHeight = availWidth - availHeight;
		availWidth -= availHeight;
	}

	var hexSizeWidth = 2*availWidth / ((this._options.width+1) * Math.sqrt(3)) - 1;
	var hexSizeHeight = availHeight / (2 + 1.5*(this._options.height-1));
	var hexSize = Math.min(hexSizeWidth, hexSizeHeight);

	/* compute char ratio */
	var oldFont = this._context.font;
	this._context.font = "100px " + this._options.fontFamily;
	var width = Math.ceil(this._context.measureText("W").width);
	this._context.font = oldFont;
	var ratio = width / 100;

	hexSize = Math.floor(hexSize)+1; /* closest larger hexSize */

	/* FIXME char size computation does not respect transposed hexes */
	var fontSize = 2*hexSize / (this._options.spacing * (1 + ratio / Math.sqrt(3)));

	/* closest smaller fontSize */
	return Math.ceil(fontSize)-1;
};

ROT.Display.Hex.prototype.eventToPosition = function(x, y) {
	if (this._options.transpose) {
		x += y;
		y = x-y;
		x -= y;
		var nodeSize = this._context.canvas.width;
	} else {
		var nodeSize = this._context.canvas.height;
	}
	var size = nodeSize / this._options.height;
	y = Math.floor(y/size);

	if (y.mod(2)) { /* odd row */
		x -= this._spacingX;
		x = 1 + 2*Math.floor(x/(2*this._spacingX));
	} else {
		x = 2*Math.floor(x/(2*this._spacingX));
	}

	return [x, y];
};

/**
 * Arguments are pixel values. If "transposed" mode is enabled, then these two are already swapped.
 */
ROT.Display.Hex.prototype._fill = function(cx, cy) {
	var a = this._hexSize;
	var b = this._options.border;

	this._context.beginPath();

	if (this._options.transpose) {
		this._context.moveTo(cx-a+b,	cy);
		this._context.lineTo(cx-a/2+b,	cy+this._spacingX-b);
		this._context.lineTo(cx+a/2-b,	cy+this._spacingX-b);
		this._context.lineTo(cx+a-b,	cy);
		this._context.lineTo(cx+a/2-b,	cy-this._spacingX+b);
		this._context.lineTo(cx-a/2+b,	cy-this._spacingX+b);
		this._context.lineTo(cx-a+b,	cy);
	} else {
		this._context.moveTo(cx,					cy-a+b);
		this._context.lineTo(cx+this._spacingX-b,	cy-a/2+b);
		this._context.lineTo(cx+this._spacingX-b,	cy+a/2-b);
		this._context.lineTo(cx,					cy+a-b);
		this._context.lineTo(cx-this._spacingX+b,	cy+a/2-b);
		this._context.lineTo(cx-this._spacingX+b,	cy-a/2+b);
		this._context.lineTo(cx,					cy-a+b);
	}
	this._context.fill();
};
/**
 * @class Tile backend
 * @private
 */
ROT.Display.Tile = function(context) {
	ROT.Display.Rect.call(this, context);
	
	this._options = {};
	this._colorCanvas = document.createElement("canvas");
};
ROT.Display.Tile.extend(ROT.Display.Rect);

ROT.Display.Tile.prototype.compute = function(options) {
	this._options = options;
	this._context.canvas.width = options.width * options.tileWidth;
	this._context.canvas.height = options.height * options.tileHeight;
	this._colorCanvas.width = options.tileWidth;
	this._colorCanvas.height = options.tileHeight;
};

ROT.Display.Tile.prototype.draw = function(data, clearBefore) {
	var x = data[0];
	var y = data[1];
	var ch = data[2];
	var fg = data[3];
	var bg = data[4];

	var tileWidth = this._options.tileWidth;
	var tileHeight = this._options.tileHeight;

	if (clearBefore) {
		if (this._options.tileColorize) {
			this._context.clearRect(x*tileWidth, y*tileHeight, tileWidth, tileHeight);
		} else {
			this._context.fillStyle = bg;
			this._context.fillRect(x*tileWidth, y*tileHeight, tileWidth, tileHeight);
		}
	}

	if (!ch) { return; }

	var chars = [].concat(ch);
	for (var i=0;i<chars.length;i++) {
		var tile = this._options.tileMap[chars[i]];
		if (!tile) { throw new Error("Char '" + chars[i] + "' not found in tileMap"); }
		
		if (this._options.tileColorize) { /* apply colorization */
			var canvas = this._colorCanvas;
			var context = canvas.getContext("2d");
			context.clearRect(0, 0, tileWidth, tileHeight);

			context.drawImage(
				this._options.tileSet,
				tile[0], tile[1], tileWidth, tileHeight,
				0, 0, tileWidth, tileHeight
			);

			if (fg != "transparent") {
				context.fillStyle = fg;
				context.globalCompositeOperation = "source-atop";
				context.fillRect(0, 0, tileWidth, tileHeight);
			}

			if (bg != "transparent") {
				context.fillStyle = bg;
				context.globalCompositeOperation = "destination-over";
				context.fillRect(0, 0, tileWidth, tileHeight);
			}

			this._context.drawImage(canvas, x*tileWidth, y*tileHeight, tileWidth, tileHeight);

		} else { /* no colorizing, easy */
			this._context.drawImage(
				this._options.tileSet,
				tile[0], tile[1], tileWidth, tileHeight,
				x*tileWidth, y*tileHeight, tileWidth, tileHeight
			);
		}
	}
};

ROT.Display.Tile.prototype.computeSize = function(availWidth, availHeight) {
	var width = Math.floor(availWidth / this._options.tileWidth);
	var height = Math.floor(availHeight / this._options.tileHeight);
	return [width, height];
};

ROT.Display.Tile.prototype.computeFontSize = function(availWidth, availHeight) {
	var width = Math.floor(availWidth / this._options.width);
	var height = Math.floor(availHeight / this._options.height);
	return [width, height];
};

ROT.Display.Tile.prototype.eventToPosition = function(x, y) {
	return [Math.floor(x/this._options.tileWidth), Math.floor(y/this._options.tileHeight)];
};
/**
 * @namespace
 * This code is an implementation of Alea algorithm; (C) 2010 Johannes Baagøe.
 * Alea is licensed according to the http://en.wikipedia.org/wiki/MIT_License.
 */
ROT.RNG = {
	/**
	 * @returns {number} 
	 */
	getSeed: function() {
		return this._seed;
	},

	/**
	 * @param {number} seed Seed the number generator
	 */
	setSeed: function(seed) {
		seed = (seed < 1 ? 1/seed : seed);

		this._seed = seed;
		this._s0 = (seed >>> 0) * this._frac;

		seed = (seed*69069 + 1) >>> 0;
		this._s1 = seed * this._frac;

		seed = (seed*69069 + 1) >>> 0;
		this._s2 = seed * this._frac;

		this._c = 1;
		return this;
	},

	/**
	 * @returns {float} Pseudorandom value [0,1), uniformly distributed
	 */
	getUniform: function() {
		var t = 2091639 * this._s0 + this._c * this._frac;
		this._s0 = this._s1;
		this._s1 = this._s2;
		this._c = t | 0;
		this._s2 = t - this._c;
		return this._s2;
	},

	/**
	 * @param {int} lowerBound The lower end of the range to return a value from, inclusive
	 * @param {int} upperBound The upper end of the range to return a value from, inclusive
	 * @returns {int} Pseudorandom value [lowerBound, upperBound], using ROT.RNG.getUniform() to distribute the value
	 */
	getUniformInt: function(lowerBound, upperBound) {
		var max = Math.max(lowerBound, upperBound);
		var min = Math.min(lowerBound, upperBound);
		return Math.floor(this.getUniform() * (max - min + 1)) + min;
	},

	/**
	 * @param {float} [mean=0] Mean value
	 * @param {float} [stddev=1] Standard deviation. ~95% of the absolute values will be lower than 2*stddev.
	 * @returns {float} A normally distributed pseudorandom value
	 */
	getNormal: function(mean, stddev) {
		do {
			var u = 2*this.getUniform()-1;
			var v = 2*this.getUniform()-1;
			var r = u*u + v*v;
		} while (r > 1 || r == 0);

		var gauss = u * Math.sqrt(-2*Math.log(r)/r);
		return (mean || 0) + gauss*(stddev || 1);
	},

	/**
	 * @returns {int} Pseudorandom value [1,100] inclusive, uniformly distributed
	 */
	getPercentage: function() {
		return 1 + Math.floor(this.getUniform()*100);
	},
	
	/**
	 * @param {object} data key=whatever, value=weight (relative probability)
	 * @returns {string} whatever
	 */
	getWeightedValue: function(data) {
		var total = 0;
		
		for (var id in data) {
			total += data[id];
		}
		var random = this.getUniform()*total;
		
		var part = 0;
		for (var id in data) {
			part += data[id];
			if (random < part) { return id; }
		}

		// If by some floating-point annoyance we have
		// random >= total, just return the last id.
		return id;
	},

	/**
	 * Get RNG state. Useful for storing the state and re-setting it via setState.
	 * @returns {?} Internal state
	 */
	getState: function() {
		return [this._s0, this._s1, this._s2, this._c];
	},

	/**
	 * Set a previously retrieved state.
	 * @param {?} state
	 */
	setState: function(state) {
		this._s0 = state[0];
		this._s1 = state[1];
		this._s2 = state[2];
		this._c  = state[3];
		return this;
	},

	/**
	 * Returns a cloned RNG
	 */
	clone: function() {
		var clone = Object.create(this);
		clone.setState(this.getState());
		return clone;
	},

	_s0: 0,
	_s1: 0,
	_s2: 0,
	_c: 0,
	_frac: 2.3283064365386963e-10 /* 2^-32 */
};

ROT.RNG.setSeed(Date.now());
/**
 * @class (Markov process)-based string generator. 
 * Copied from a <a href="http://www.roguebasin.roguelikedevelopment.org/index.php?title=Names_from_a_high_order_Markov_Process_and_a_simplified_Katz_back-off_scheme">RogueBasin article</a>. 
 * Offers configurable order and prior.
 * @param {object} [options]
 * @param {bool} [options.words=false] Use word mode?
 * @param {int} [options.order=3]
 * @param {float} [options.prior=0.001]
 */
ROT.StringGenerator = function(options) {
	this._options = {
		words: false,
		order: 3,
		prior: 0.001
	};
	for (var p in options) { this._options[p] = options[p]; }

	this._boundary = String.fromCharCode(0);
	this._suffix = this._boundary;
	this._prefix = [];
	for (var i=0;i<this._options.order;i++) { this._prefix.push(this._boundary); }

	this._priorValues = {};
	this._priorValues[this._boundary] = this._options.prior;

	this._data = {};
};

/**
 * Remove all learning data
 */
ROT.StringGenerator.prototype.clear = function() {
	this._data = {};
	this._priorValues = {};
};

/**
 * @returns {string} Generated string
 */
ROT.StringGenerator.prototype.generate = function() {
	var result = [this._sample(this._prefix)];
	while (result[result.length-1] != this._boundary) {
		result.push(this._sample(result));
	}
	return this._join(result.slice(0, -1));
};

/**
 * Observe (learn) a string from a training set
 */
ROT.StringGenerator.prototype.observe = function(string) {
	var tokens = this._split(string);

	for (var i=0; i<tokens.length; i++) {
		this._priorValues[tokens[i]] = this._options.prior;
	}

	tokens = this._prefix.concat(tokens).concat(this._suffix); /* add boundary symbols */

	for (var i=this._options.order; i<tokens.length; i++) {
		var context = tokens.slice(i-this._options.order, i);
		var event = tokens[i];
		for (var j=0; j<context.length; j++) {
			var subcontext = context.slice(j);
			this._observeEvent(subcontext, event);
		}
	}
};

ROT.StringGenerator.prototype.getStats = function() {
	var parts = [];

	var priorCount = 0;
	for (var p in this._priorValues) { priorCount++; }
	priorCount--; /* boundary */
	parts.push("distinct samples: " + priorCount);

	var dataCount = 0;
	var eventCount = 0;
	for (var p in this._data) { 
		dataCount++; 
		for (var key in this._data[p]) {
			eventCount++;
		}
	}
	parts.push("dictionary size (contexts): " + dataCount);
	parts.push("dictionary size (events): " + eventCount);

	return parts.join(", ");
};

/**
 * @param {string}
 * @returns {string[]}
 */
ROT.StringGenerator.prototype._split = function(str) {
	return str.split(this._options.words ? /\s+/ : "");
};

/**
 * @param {string[]}
 * @returns {string} 
 */
ROT.StringGenerator.prototype._join = function(arr) {
	return arr.join(this._options.words ? " " : "");
};

/**
 * @param {string[]} context
 * @param {string} event
 */
ROT.StringGenerator.prototype._observeEvent = function(context, event) {
	var key = this._join(context);
	if (!(key in this._data)) { this._data[key] = {}; }
	var data = this._data[key];

	if (!(event in data)) { data[event] = 0; }
	data[event]++;
};

/**
 * @param {string[]}
 * @returns {string}
 */
ROT.StringGenerator.prototype._sample = function(context) {
	context = this._backoff(context);
	var key = this._join(context);
	var data = this._data[key];

	var available = {};

	if (this._options.prior) {
		for (var event in this._priorValues) { available[event] = this._priorValues[event]; }
		for (var event in data) { available[event] += data[event]; }
	} else { 
		available = data;
	}

	return ROT.RNG.getWeightedValue(available);
};

/**
 * @param {string[]}
 * @returns {string[]}
 */
ROT.StringGenerator.prototype._backoff = function(context) {
	if (context.length > this._options.order) {
		context = context.slice(-this._options.order);
	} else if (context.length < this._options.order) {
		context = this._prefix.slice(0, this._options.order - context.length).concat(context);
	}

	while (!(this._join(context) in this._data) && context.length > 0) { context = context.slice(1); }

	return context;
};
/**
 * @class Generic event queue: stores events and retrieves them based on their time
 */
ROT.EventQueue = function() {
	this._time = 0;
	this._events = [];
	this._eventTimes = [];
};

/**
 * @returns {number} Elapsed time
 */
ROT.EventQueue.prototype.getTime = function() {
	return this._time;
};

/**
 * Clear all scheduled events
 */
ROT.EventQueue.prototype.clear = function() {
	this._events = [];
	this._eventTimes = [];
	return this;
};

/**
 * @param {?} event
 * @param {number} time
 */
ROT.EventQueue.prototype.add = function(event, time) {
	var index = this._events.length;
	for (var i=0;i<this._eventTimes.length;i++) {
		if (this._eventTimes[i] > time) {
			index = i;
			break;
		}
	}

	this._events.splice(index, 0, event);
	this._eventTimes.splice(index, 0, time);
};

/**
 * Locates the nearest event, advances time if necessary. Returns that event and removes it from the queue.
 * @returns {? || null} The event previously added by addEvent, null if no event available
 */
ROT.EventQueue.prototype.get = function() {
	if (!this._events.length) { return null; }

	var time = this._eventTimes.splice(0, 1)[0];
	if (time > 0) { /* advance */
		this._time += time;
		for (var i=0;i<this._eventTimes.length;i++) { this._eventTimes[i] -= time; }
	}

	return this._events.splice(0, 1)[0];
};

/**
 * Get the time associated with the given event
 * @param {?} event
 * @returns {number} time
 */
ROT.EventQueue.prototype.getEventTime = function(event) {
	var index = this._events.indexOf(event);
	if (index == -1) { return undefined }
	return this._eventTimes[index];
};

/**
 * Remove an event from the queue
 * @param {?} event
 * @returns {bool} success?
 */
ROT.EventQueue.prototype.remove = function(event) {
	var index = this._events.indexOf(event);
	if (index == -1) { return false }
	this._remove(index);
	return true;
};

/**
 * Remove an event from the queue
 * @param {int} index
 */
ROT.EventQueue.prototype._remove = function(index) {
	this._events.splice(index, 1);
	this._eventTimes.splice(index, 1);
};
/**
 * @class Abstract scheduler
 */
ROT.Scheduler = function() {
	this._queue = new ROT.EventQueue();
	this._repeat = [];
	this._current = null;
};

/**
 * @see ROT.EventQueue#getTime
 */
ROT.Scheduler.prototype.getTime = function() {
	return this._queue.getTime();
};

/**
 * @param {?} item
 * @param {bool} repeat
 */
ROT.Scheduler.prototype.add = function(item, repeat) {
	if (repeat) { this._repeat.push(item); }
	return this;
};

/**
 * Get the time the given item is scheduled for
 * @param {?} item
 * @returns {number} time
 */
ROT.Scheduler.prototype.getTimeOf = function(item) {
	return this._queue.getEventTime(item);
};

/**
 * Clear all items
 */
ROT.Scheduler.prototype.clear = function() {
	this._queue.clear();
	this._repeat = [];
	this._current = null;
	return this;
};

/**
 * Remove a previously added item
 * @param {?} item
 * @returns {bool} successful?
 */
ROT.Scheduler.prototype.remove = function(item) {
	var result = this._queue.remove(item);

	var index = this._repeat.indexOf(item);
	if (index != -1) { this._repeat.splice(index, 1); }

	if (this._current == item) { this._current = null; }

	return result;
};

/**
 * Schedule next item
 * @returns {?}
 */
ROT.Scheduler.prototype.next = function() {
	this._current = this._queue.get();
	return this._current;
};
/**
 * @class Simple fair scheduler (round-robin style)
 * @augments ROT.Scheduler
 */
ROT.Scheduler.Simple = function() {
	ROT.Scheduler.call(this);
};
ROT.Scheduler.Simple.extend(ROT.Scheduler);

/**
 * @see ROT.Scheduler#add
 */
ROT.Scheduler.Simple.prototype.add = function(item, repeat) {
	this._queue.add(item, 0);
	return ROT.Scheduler.prototype.add.call(this, item, repeat);
};

/**
 * @see ROT.Scheduler#next
 */
ROT.Scheduler.Simple.prototype.next = function() {
	if (this._current && this._repeat.indexOf(this._current) != -1) {
		this._queue.add(this._current, 0);
	}
	return ROT.Scheduler.prototype.next.call(this);
};
/**
 * @class Speed-based scheduler
 * @augments ROT.Scheduler
 */
ROT.Scheduler.Speed = function() {
	ROT.Scheduler.call(this);
};
ROT.Scheduler.Speed.extend(ROT.Scheduler);

/**
 * @param {object} item anything with "getSpeed" method
 * @param {bool} repeat
 * @param {number} [time=1/item.getSpeed()]
 * @see ROT.Scheduler#add
 */
ROT.Scheduler.Speed.prototype.add = function(item, repeat, time) {
	this._queue.add(item, time !== undefined ? time : 1/item.getSpeed());
	return ROT.Scheduler.prototype.add.call(this, item, repeat);
};

/**
 * @see ROT.Scheduler#next
 */
ROT.Scheduler.Speed.prototype.next = function() {
	if (this._current && this._repeat.indexOf(this._current) != -1) {
		this._queue.add(this._current, 1/this._current.getSpeed());
	}
	return ROT.Scheduler.prototype.next.call(this);
};
/**
 * @class Action-based scheduler
 * @augments ROT.Scheduler
 */
ROT.Scheduler.Action = function() {
	ROT.Scheduler.call(this);
	this._defaultDuration = 1; /* for newly added */
	this._duration = this._defaultDuration; /* for this._current */
};
ROT.Scheduler.Action.extend(ROT.Scheduler);

/**
 * @param {object} item
 * @param {bool} repeat
 * @param {number} [time=1]
 * @see ROT.Scheduler#add
 */
ROT.Scheduler.Action.prototype.add = function(item, repeat, time) {
	this._queue.add(item, time || this._defaultDuration);
	return ROT.Scheduler.prototype.add.call(this, item, repeat);
};

ROT.Scheduler.Action.prototype.clear = function() {
	this._duration = this._defaultDuration;
	return ROT.Scheduler.prototype.clear.call(this);
};

ROT.Scheduler.Action.prototype.remove = function(item) {
	if (item == this._current) { this._duration = this._defaultDuration; }
	return ROT.Scheduler.prototype.remove.call(this, item);
};

/**
 * @see ROT.Scheduler#next
 */
ROT.Scheduler.Action.prototype.next = function() {
	if (this._current && this._repeat.indexOf(this._current) != -1) {
		this._queue.add(this._current, this._duration || this._defaultDuration);
		this._duration = this._defaultDuration;
	}
	return ROT.Scheduler.prototype.next.call(this);
};

/**
 * Set duration for the active item
 */
ROT.Scheduler.Action.prototype.setDuration = function(time) {
	if (this._current) { this._duration = time; }
	return this;
};
/**
 * @class Asynchronous main loop
 * @param {ROT.Scheduler} scheduler
 */
ROT.Engine = function(scheduler) {
	this._scheduler = scheduler;
	this._lock = 1;
};

/**
 * Start the main loop. When this call returns, the loop is locked.
 */
ROT.Engine.prototype.start = function() {
	return this.unlock();
};

/**
 * Interrupt the engine by an asynchronous action
 */
ROT.Engine.prototype.lock = function() {
	this._lock++;
	return this;
};

/**
 * Resume execution (paused by a previous lock)
 */
ROT.Engine.prototype.unlock = function() {
	if (!this._lock) { throw new Error("Cannot unlock unlocked engine"); }
	this._lock--;

	while (!this._lock) {
		var actor = this._scheduler.next();
		if (!actor) { return this.lock(); } /* no actors */
		var result = actor.act();
		if (result && result.then) { /* actor returned a "thenable", looks like a Promise */
			this.lock();
			result.then(this.unlock.bind(this));
		}
	}

	return this;
};
/**
 * @class Base map generator
 * @param {int} [width=ROT.DEFAULT_WIDTH]
 * @param {int} [height=ROT.DEFAULT_HEIGHT]
 */
ROT.Map = function(width, height) {
	this._width = width || ROT.DEFAULT_WIDTH;
	this._height = height || ROT.DEFAULT_HEIGHT;
};

ROT.Map.prototype.create = function(callback) {};

ROT.Map.prototype._fillMap = function(value) {
	var map = [];
	for (var i=0;i<this._width;i++) {
		map.push([]);
		for (var j=0;j<this._height;j++) { map[i].push(value); }
	}
	return map;
};
/**
 * @class Simple empty rectangular room
 * @augments ROT.Map
 */
ROT.Map.Arena = function(width, height) {
	ROT.Map.call(this, width, height);
};
ROT.Map.Arena.extend(ROT.Map);

ROT.Map.Arena.prototype.create = function(callback) {
	var w = this._width-1;
	var h = this._height-1;
	for (var i=0;i<=w;i++) {
		for (var j=0;j<=h;j++) {
			var empty = (i && j && i<w && j<h);
			callback(i, j, empty ? 0 : 1);
		}
	}
	return this;
};
/**
 * @class Recursively divided maze, http://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method
 * @augments ROT.Map
 */
ROT.Map.DividedMaze = function(width, height) {
	ROT.Map.call(this, width, height);
	this._stack = [];
};
ROT.Map.DividedMaze.extend(ROT.Map);

ROT.Map.DividedMaze.prototype.create = function(callback) {
	var w = this._width;
	var h = this._height;
	
	this._map = [];
	
	for (var i=0;i<w;i++) {
		this._map.push([]);
		for (var j=0;j<h;j++) {
			var border = (i == 0 || j == 0 || i+1 == w || j+1 == h);
			this._map[i].push(border ? 1 : 0);
		}
	}
	
	this._stack = [
		[1, 1, w-2, h-2]
	];
	this._process();
	
	for (var i=0;i<w;i++) {
		for (var j=0;j<h;j++) {
			callback(i, j, this._map[i][j]);
		}
	}
	this._map = null;
	return this;
};

ROT.Map.DividedMaze.prototype._process = function() {
	while (this._stack.length) {
		var room = this._stack.shift(); /* [left, top, right, bottom] */
		this._partitionRoom(room);
	}
};

ROT.Map.DividedMaze.prototype._partitionRoom = function(room) {
	var availX = [];
	var availY = [];
	
	for (var i=room[0]+1;i<room[2];i++) {
		var top = this._map[i][room[1]-1];
		var bottom = this._map[i][room[3]+1];
		if (top && bottom && !(i % 2)) { availX.push(i); }
	}
	
	for (var j=room[1]+1;j<room[3];j++) {
		var left = this._map[room[0]-1][j];
		var right = this._map[room[2]+1][j];
		if (left && right && !(j % 2)) { availY.push(j); }
	}

	if (!availX.length || !availY.length) { return; }

	var x = availX.random();
	var y = availY.random();
	
	this._map[x][y] = 1;
	
	var walls = [];
	
	var w = []; walls.push(w); /* left part */
	for (var i=room[0]; i<x; i++) { 
		this._map[i][y] = 1;
		w.push([i, y]); 
	}
	
	var w = []; walls.push(w); /* right part */
	for (var i=x+1; i<=room[2]; i++) { 
		this._map[i][y] = 1;
		w.push([i, y]); 
	}

	var w = []; walls.push(w); /* top part */
	for (var j=room[1]; j<y; j++) { 
		this._map[x][j] = 1;
		w.push([x, j]); 
	}
	
	var w = []; walls.push(w); /* bottom part */
	for (var j=y+1; j<=room[3]; j++) { 
		this._map[x][j] = 1;
		w.push([x, j]); 
	}
		
	var solid = walls.random();
	for (var i=0;i<walls.length;i++) {
		var w = walls[i];
		if (w == solid) { continue; }
		
		var hole = w.random();
		this._map[hole[0]][hole[1]] = 0;
	}

	this._stack.push([room[0], room[1], x-1, y-1]); /* left top */
	this._stack.push([x+1, room[1], room[2], y-1]); /* right top */
	this._stack.push([room[0], y+1, x-1, room[3]]); /* left bottom */
	this._stack.push([x+1, y+1, room[2], room[3]]); /* right bottom */
};
/**
 * @class Icey's Maze generator
 * See http://www.roguebasin.roguelikedevelopment.org/index.php?title=Simple_maze for explanation
 * @augments ROT.Map
 */
ROT.Map.IceyMaze = function(width, height, regularity) {
	ROT.Map.call(this, width, height);
	this._regularity = regularity || 0;
};
ROT.Map.IceyMaze.extend(ROT.Map);

ROT.Map.IceyMaze.prototype.create = function(callback) {
	var width = this._width;
	var height = this._height;
	
	var map = this._fillMap(1);
	
	width -= (width % 2 ? 1 : 2);
	height -= (height % 2 ? 1 : 2);

	var cx = 0;
	var cy = 0;
	var nx = 0;
	var ny = 0;

	var done = 0;
	var blocked = false;
	var dirs = [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0]
	];
	do {
		cx = 1 + 2*Math.floor(ROT.RNG.getUniform()*(width-1) / 2);
		cy = 1 + 2*Math.floor(ROT.RNG.getUniform()*(height-1) / 2);

		if (!done) { map[cx][cy] = 0; }
		
		if (!map[cx][cy]) {
			this._randomize(dirs);
			do {
				if (Math.floor(ROT.RNG.getUniform()*(this._regularity+1)) == 0) { this._randomize(dirs); }
				blocked = true;
				for (var i=0;i<4;i++) {
					nx = cx + dirs[i][0]*2;
					ny = cy + dirs[i][1]*2;
					if (this._isFree(map, nx, ny, width, height)) {
						map[nx][ny] = 0;
						map[cx + dirs[i][0]][cy + dirs[i][1]] = 0;
						
						cx = nx;
						cy = ny;
						blocked = false;
						done++;
						break;
					}
				}
			} while (!blocked);
		}
	} while (done+1 < width*height/4);
	
	for (var i=0;i<this._width;i++) {
		for (var j=0;j<this._height;j++) {
			callback(i, j, map[i][j]);
		}
	}
	this._map = null;
	return this;
};

ROT.Map.IceyMaze.prototype._randomize = function(dirs) {
	for (var i=0;i<4;i++) {
		dirs[i][0] = 0;
		dirs[i][1] = 0;
	}
	
	switch (Math.floor(ROT.RNG.getUniform()*4)) {
		case 0:
			dirs[0][0] = -1; dirs[1][0] = 1;
			dirs[2][1] = -1; dirs[3][1] = 1;
		break;
		case 1:
			dirs[3][0] = -1; dirs[2][0] = 1;
			dirs[1][1] = -1; dirs[0][1] = 1;
		break;
		case 2:
			dirs[2][0] = -1; dirs[3][0] = 1;
			dirs[0][1] = -1; dirs[1][1] = 1;
		break;
		case 3:
			dirs[1][0] = -1; dirs[0][0] = 1;
			dirs[3][1] = -1; dirs[2][1] = 1;
		break;
	}
};

ROT.Map.IceyMaze.prototype._isFree = function(map, x, y, width, height) {
	if (x < 1 || y < 1 || x >= width || y >= height) { return false; }
	return map[x][y];
};
/**
 * @class Maze generator - Eller's algorithm
 * See http://homepages.cwi.nl/~tromp/maze.html for explanation
 * @augments ROT.Map
 */
ROT.Map.EllerMaze = function(width, height) {
	ROT.Map.call(this, width, height);
};
ROT.Map.EllerMaze.extend(ROT.Map);

ROT.Map.EllerMaze.prototype.create = function(callback) {
	var map = this._fillMap(1);
	var w = Math.ceil((this._width-2)/2);
	
	var rand = 9/24;
	
	var L = [];
	var R = [];
	
	for (var i=0;i<w;i++) {
		L.push(i);
		R.push(i);
	}
	L.push(w-1); /* fake stop-block at the right side */

	for (var j=1;j+3<this._height;j+=2) {
		/* one row */
		for (var i=0;i<w;i++) {
			/* cell coords (will be always empty) */
			var x = 2*i+1;
			var y = j;
			map[x][y] = 0;
			
			/* right connection */
			if (i != L[i+1] && ROT.RNG.getUniform() > rand) {
				this._addToList(i, L, R);
				map[x+1][y] = 0;
			}
			
			/* bottom connection */
			if (i != L[i] && ROT.RNG.getUniform() > rand) {
				/* remove connection */
				this._removeFromList(i, L, R);
			} else {
				/* create connection */
				map[x][y+1] = 0;
			}
		}
	}

	/* last row */
	for (var i=0;i<w;i++) {
		/* cell coords (will be always empty) */
		var x = 2*i+1;
		var y = j;
		map[x][y] = 0;
		
		/* right connection */
		if (i != L[i+1] && (i == L[i] || ROT.RNG.getUniform() > rand)) {
			/* dig right also if the cell is separated, so it gets connected to the rest of maze */
			this._addToList(i, L, R);
			map[x+1][y] = 0;
		}
		
		this._removeFromList(i, L, R);
	}
	
	for (var i=0;i<this._width;i++) {
		for (var j=0;j<this._height;j++) {
			callback(i, j, map[i][j]);
		}
	}
	
	return this;
};

/**
 * Remove "i" from its list
 */
ROT.Map.EllerMaze.prototype._removeFromList = function(i, L, R) {
	R[L[i]] = R[i];
	L[R[i]] = L[i];
	R[i] = i;
	L[i] = i;
};

/**
 * Join lists with "i" and "i+1"
 */
ROT.Map.EllerMaze.prototype._addToList = function(i, L, R) {
	R[L[i+1]] = R[i];
	L[R[i]] = L[i+1];
	R[i] = i+1;
	L[i+1] = i;
};
/**
 * @class Cellular automaton map generator
 * @augments ROT.Map
 * @param {int} [width=ROT.DEFAULT_WIDTH]
 * @param {int} [height=ROT.DEFAULT_HEIGHT]
 * @param {object} [options] Options
 * @param {int[]} [options.born] List of neighbor counts for a new cell to be born in empty space
 * @param {int[]} [options.survive] List of neighbor counts for an existing  cell to survive
 * @param {int} [options.topology] Topology 4 or 6 or 8
 */
ROT.Map.Cellular = function(width, height, options) {
	ROT.Map.call(this, width, height);
	this._options = {
		born: [5, 6, 7, 8],
		survive: [4, 5, 6, 7, 8],
		topology: 8
	};
	this.setOptions(options);

	this._dirs = ROT.DIRS[this._options.topology];
	this._map = this._fillMap(0);
};
ROT.Map.Cellular.extend(ROT.Map);

/**
 * Fill the map with random values
 * @param {float} probability Probability for a cell to become alive; 0 = all empty, 1 = all full
 */
ROT.Map.Cellular.prototype.randomize = function(probability) {
	for (var i=0;i<this._width;i++) {
		for (var j=0;j<this._height;j++) {
			this._map[i][j] = (ROT.RNG.getUniform() < probability ? 1 : 0);
		}
	}
	return this;
};

/**
 * Change options.
 * @see ROT.Map.Cellular
 */
ROT.Map.Cellular.prototype.setOptions = function(options) {
	for (var p in options) { this._options[p] = options[p]; }
};

ROT.Map.Cellular.prototype.set = function(x, y, value) {
	this._map[x][y] = value;
};

ROT.Map.Cellular.prototype.create = function(callback) {
	var newMap = this._fillMap(0);
	var born = this._options.born;
	var survive = this._options.survive;


	for (var j=0;j<this._height;j++) {
		var widthStep = 1;
		var widthStart = 0;
		if (this._options.topology == 6) {
			widthStep = 2;
			widthStart = j%2;
		}

		for (var i=widthStart; i<this._width; i+=widthStep) {

			var cur = this._map[i][j];
			var ncount = this._getNeighbors(i, j);

			if (cur && survive.indexOf(ncount) != -1) { /* survive */
				newMap[i][j] = 1;
			} else if (!cur && born.indexOf(ncount) != -1) { /* born */
				newMap[i][j] = 1;
			}
		}
	}

	this._map = newMap;

	this.serviceCallback(callback);
};

ROT.Map.Cellular.prototype.serviceCallback = function(callback) {
	if (!callback) { return; }

	for (var j=0;j<this._height;j++) {
		var widthStep = 1;
		var widthStart = 0;
		if (this._options.topology == 6) {
			widthStep = 2;
			widthStart = j%2;
		}
		for (var i=widthStart; i<this._width; i+=widthStep) {
			callback(i, j, this._map[i][j]);
		}
	}
};

/**
 * Get neighbor count at [i,j] in this._map
 */
ROT.Map.Cellular.prototype._getNeighbors = function(cx, cy) {
	var result = 0;
	for (var i=0;i<this._dirs.length;i++) {
		var dir = this._dirs[i];
		var x = cx + dir[0];
		var y = cy + dir[1];

		if (x < 0 || x >= this._width || y < 0 || y >= this._height) { continue; }
		result += (this._map[x][y] == 1 ? 1 : 0);
	}

	return result;
};

/**
 * Make sure every non-wall space is accessible.
 * @param {function} callback to call to display map when do
 * @param {int} value to consider empty space - defaults to 0
 * @param {function} callback to call when a new connection is made
 */
ROT.Map.Cellular.prototype.connect = function(callback, value, connectionCallback) {
	if (!value) value = 0;

	var allFreeSpace = [];
	var notConnected = {};
	// find all free space
	for (var x = 0; x < this._width; x++) {
		for (var y = 0; y < this._height; y++) {
			if (this._freeSpace(x, y, value)) {
				var p = [x, y];
				notConnected[this._pointKey(p)] = p;
				allFreeSpace.push([x, y]);
			}
		}
	}
	var start = allFreeSpace[ROT.RNG.getUniformInt(0, allFreeSpace.length - 1)];

	var key = this._pointKey(start);
	var connected = {};
	connected[key] = start;
	delete notConnected[key];

	// find what's connected to the starting point
	this._findConnected(connected, notConnected, [start], false, value);

	while (Object.keys(notConnected).length > 0) {

		// find two points from notConnected to connected
		var p = this._getFromTo(connected, notConnected);
		var from = p[0]; // notConnected
		var to = p[1]; // connected

		// find everything connected to the starting point
		var local = {};
		local[this._pointKey(from)] = from;
		this._findConnected(local, notConnected, [from], true, value);

		// connect to a connected square
		this._tunnelToConnected(to, from, connected, notConnected, value, connectionCallback);

		// now all of local is connected
		for (var k in local) {
			var pp = local[k];
			this._map[pp[0]][pp[1]] = value;
			connected[k] = pp;
			delete notConnected[k];
		}
	}

	this.serviceCallback(callback);
};

/**
 * Find random points to connect. Search for the closest point in the larger space.
 * This is to minimize the length of the passage while maintaining good performance.
 */
ROT.Map.Cellular.prototype._getFromTo = function(connected, notConnected) {
	var from, to, d;
	var connectedKeys = Object.keys(connected);
	var notConnectedKeys = Object.keys(notConnected);
	for (var i = 0; i < 5; i++) {
		if (connectedKeys.length < notConnectedKeys.length) {
			var keys = connectedKeys;
			to = connected[keys[ROT.RNG.getUniformInt(0, keys.length - 1)]];
			from = this._getClosest(to, notConnected);
		} else {
			var keys = notConnectedKeys;
			from = notConnected[keys[ROT.RNG.getUniformInt(0, keys.length - 1)]];
			to = this._getClosest(from, connected);
		}
		d = (from[0] - to[0]) * (from[0] - to[0]) + (from[1] - to[1]) * (from[1] - to[1]);
		if (d < 64) {
			break;
		}
	}
	// console.log(">>> connected=" + to + " notConnected=" + from + " dist=" + d);
	return [from, to];
};

ROT.Map.Cellular.prototype._getClosest = function(point, space) {
	var minPoint = null;
	var minDist = null;
	for (k in space) {
		var p = space[k];
		var d = (p[0] - point[0]) * (p[0] - point[0]) + (p[1] - point[1]) * (p[1] - point[1]);
		if (minDist == null || d < minDist) {
			minDist = d;
			minPoint = p;
		}
	}
	return minPoint;
};

ROT.Map.Cellular.prototype._findConnected = function(connected, notConnected, stack, keepNotConnected, value) {
	while(stack.length > 0) {
		var p = stack.splice(0, 1)[0];
		var tests = [
			[p[0] + 1, p[1]],
			[p[0] - 1, p[1]],
			[p[0],     p[1] + 1],
			[p[0],     p[1] - 1]
		];
		for (var i = 0; i < tests.length; i++) {
			var key = this._pointKey(tests[i]);
			if (connected[key] == null && this._freeSpace(tests[i][0], tests[i][1], value)) {
				connected[key] = tests[i];
				if (!keepNotConnected) {
					delete notConnected[key];
				}
				stack.push(tests[i]);
			}
		}
	}
};

ROT.Map.Cellular.prototype._tunnelToConnected = function(to, from, connected, notConnected, value, connectionCallback) {
	var key = this._pointKey(from);
	var a, b;
	if (from[0] < to[0]) {
		a = from;
		b = to;
	} else {
		a = to;
		b = from;
	}
	for (var xx = a[0]; xx <= b[0]; xx++) {
		this._map[xx][a[1]] = value;
		var p = [xx, a[1]];
		var pkey = this._pointKey(p);
		connected[pkey] = p;
		delete notConnected[pkey];
	}
	if (connectionCallback && a[0] < b[0]) {
		connectionCallback(a, [b[0], a[1]]);
	}

	// x is now fixed
	var x = b[0];

	if (from[1] < to[1]) {
		a = from;
		b = to;
	} else {
		a = to;
		b = from;
	}
	for (var yy = a[1]; yy < b[1]; yy++) {
		this._map[x][yy] = value;
		var p = [x, yy];
		var pkey = this._pointKey(p);
		connected[pkey] = p;
		delete notConnected[pkey];
	}
	if (connectionCallback && a[1] < b[1]) {
		connectionCallback([b[0], a[1]], [b[0], b[1]]);
	}
};

ROT.Map.Cellular.prototype._freeSpace = function(x, y, value) {
	return x >= 0 && x < this._width && y >= 0 && y < this._height && this._map[x][y] == value;
};

ROT.Map.Cellular.prototype._pointKey = function(p) {
	return p[0] + "." + p[1];
};
/**
 * @class Dungeon map: has rooms and corridors
 * @augments ROT.Map
 */
ROT.Map.Dungeon = function(width, height) {
	ROT.Map.call(this, width, height);
	this._rooms = []; /* list of all rooms */
	this._corridors = [];
};
ROT.Map.Dungeon.extend(ROT.Map);

/**
 * Get all generated rooms
 * @returns {ROT.Map.Feature.Room[]}
 */
ROT.Map.Dungeon.prototype.getRooms = function() {
	return this._rooms;
};

/**
 * Get all generated corridors
 * @returns {ROT.Map.Feature.Corridor[]}
 */
ROT.Map.Dungeon.prototype.getCorridors = function() {
	return this._corridors;
};
/**
 * @class Random dungeon generator using human-like digging patterns.
 * Heavily based on Mike Anderson's ideas from the "Tyrant" algo, mentioned at 
 * http://www.roguebasin.roguelikedevelopment.org/index.php?title=Dungeon-Building_Algorithm.
 * @augments ROT.Map.Dungeon
 */
ROT.Map.Digger = function(width, height, options) {
	ROT.Map.Dungeon.call(this, width, height);
	
	this._options = {
		roomWidth: [3, 9], /* room minimum and maximum width */
		roomHeight: [3, 5], /* room minimum and maximum height */
		corridorLength: [3, 10], /* corridor minimum and maximum length */
		dugPercentage: 0.2, /* we stop after this percentage of level area has been dug out */
		timeLimit: 1000 /* we stop after this much time has passed (msec) */
	};
	for (var p in options) { this._options[p] = options[p]; }
	
	this._features = {
		"Room": 4,
		"Corridor": 4
	};
	this._featureAttempts = 20; /* how many times do we try to create a feature on a suitable wall */
	this._walls = {}; /* these are available for digging */
	
	this._digCallback = this._digCallback.bind(this);
	this._canBeDugCallback = this._canBeDugCallback.bind(this);
	this._isWallCallback = this._isWallCallback.bind(this);
	this._priorityWallCallback = this._priorityWallCallback.bind(this);
};
ROT.Map.Digger.extend(ROT.Map.Dungeon);

/**
 * Create a map
 * @see ROT.Map#create
 */
ROT.Map.Digger.prototype.create = function(callback) {
	this._rooms = [];
	this._corridors = [];
	this._map = this._fillMap(1);
	this._walls = {};
	this._dug = 0;
	var area = (this._width-2) * (this._height-2);

	this._firstRoom();
	
	var t1 = Date.now();

	do {
		var t2 = Date.now();
		if (t2 - t1 > this._options.timeLimit) { break; }

		/* find a good wall */
		var wall = this._findWall();
		if (!wall) { break; } /* no more walls */
		
		var parts = wall.split(",");
		var x = parseInt(parts[0]);
		var y = parseInt(parts[1]);
		var dir = this._getDiggingDirection(x, y);
		if (!dir) { continue; } /* this wall is not suitable */
		
//		console.log("wall", x, y);

		/* try adding a feature */
		var featureAttempts = 0;
		do {
			featureAttempts++;
			if (this._tryFeature(x, y, dir[0], dir[1])) { /* feature added */
				//if (this._rooms.length + this._corridors.length == 2) { this._rooms[0].addDoor(x, y); } /* first room oficially has doors */
				this._removeSurroundingWalls(x, y);
				this._removeSurroundingWalls(x-dir[0], y-dir[1]);
				break; 
			}
		} while (featureAttempts < this._featureAttempts);
		
		var priorityWalls = 0;
		for (var id in this._walls) { 
			if (this._walls[id] > 1) { priorityWalls++; }
		}

	} while (this._dug/area < this._options.dugPercentage || priorityWalls); /* fixme number of priority walls */

	this._addDoors();

	if (callback) {
		for (var i=0;i<this._width;i++) {
			for (var j=0;j<this._height;j++) {
				callback(i, j, this._map[i][j]);
			}
		}
	}
	
	this._walls = {};
	this._map = null;

	return this;
};

ROT.Map.Digger.prototype._digCallback = function(x, y, value) {
	if (value == 0 || value == 2) { /* empty */
		this._map[x][y] = 0;
		this._dug++;
	} else { /* wall */
		this._walls[x+","+y] = 1;
	}
};

ROT.Map.Digger.prototype._isWallCallback = function(x, y) {
	if (x < 0 || y < 0 || x >= this._width || y >= this._height) { return false; }
	return (this._map[x][y] == 1);
};

ROT.Map.Digger.prototype._canBeDugCallback = function(x, y) {
	if (x < 1 || y < 1 || x+1 >= this._width || y+1 >= this._height) { return false; }
	return (this._map[x][y] == 1);
};

ROT.Map.Digger.prototype._priorityWallCallback = function(x, y) {
	this._walls[x+","+y] = 2;
};

ROT.Map.Digger.prototype._firstRoom = function() {
	var cx = Math.floor(this._width/2);
	var cy = Math.floor(this._height/2);
	var room = ROT.Map.Feature.Room.createRandomCenter(cx, cy, this._options);
	this._rooms.push(room);
	room.create(this._digCallback);
};

/**
 * Get a suitable wall
 */
ROT.Map.Digger.prototype._findWall = function() {
	var prio1 = [];
	var prio2 = [];
	for (var id in this._walls) {
		var prio = this._walls[id];
		if (prio == 2) { 
			prio2.push(id); 
		} else {
			prio1.push(id);
		}
	}
	
	var arr = (prio2.length ? prio2 : prio1);
	if (!arr.length) { return null; } /* no walls :/ */
	
	var id = arr.sort().random(); // sort to make the order deterministic
	delete this._walls[id];

	return id;
};

/**
 * Tries adding a feature
 * @returns {bool} was this a successful try?
 */
ROT.Map.Digger.prototype._tryFeature = function(x, y, dx, dy) {
	var feature = ROT.RNG.getWeightedValue(this._features);
	feature = ROT.Map.Feature[feature].createRandomAt(x, y, dx, dy, this._options);
	
	if (!feature.isValid(this._isWallCallback, this._canBeDugCallback)) {
//		console.log("not valid");
//		feature.debug();
		return false;
	}
	
	feature.create(this._digCallback);
//	feature.debug();

	if (feature instanceof ROT.Map.Feature.Room) { this._rooms.push(feature); }
	if (feature instanceof ROT.Map.Feature.Corridor) { 
		feature.createPriorityWalls(this._priorityWallCallback);
		this._corridors.push(feature); 
	}
	
	return true;
};

ROT.Map.Digger.prototype._removeSurroundingWalls = function(cx, cy) {
	var deltas = ROT.DIRS[4];

	for (var i=0;i<deltas.length;i++) {
		var delta = deltas[i];
		var x = cx + delta[0];
		var y = cy + delta[1];
		delete this._walls[x+","+y];
		var x = cx + 2*delta[0];
		var y = cy + 2*delta[1];
		delete this._walls[x+","+y];
	}
};

/**
 * Returns vector in "digging" direction, or false, if this does not exist (or is not unique)
 */
ROT.Map.Digger.prototype._getDiggingDirection = function(cx, cy) {
	if (cx <= 0 || cy <= 0 || cx >= this._width - 1 || cy >= this._height - 1) { return null; }

	var result = null;
	var deltas = ROT.DIRS[4];
	
	for (var i=0;i<deltas.length;i++) {
		var delta = deltas[i];
		var x = cx + delta[0];
		var y = cy + delta[1];
		
		if (!this._map[x][y]) { /* there already is another empty neighbor! */
			if (result) { return null; }
			result = delta;
		}
	}
	
	/* no empty neighbor */
	if (!result) { return null; }
	
	return [-result[0], -result[1]];
};

/**
 * Find empty spaces surrounding rooms, and apply doors.
 */
ROT.Map.Digger.prototype._addDoors = function() {
	var data = this._map;
	var isWallCallback = function(x, y) {
		return (data[x][y] == 1);
	};
	for (var i = 0; i < this._rooms.length; i++ ) {
		var room = this._rooms[i];
		room.clearDoors();
		room.addDoors(isWallCallback);
	}
};
/**
 * @class Dungeon generator which tries to fill the space evenly. Generates independent rooms and tries to connect them.
 * @augments ROT.Map.Dungeon
 */
ROT.Map.Uniform = function(width, height, options) {
	ROT.Map.Dungeon.call(this, width, height);

	this._options = {
		roomWidth: [3, 9], /* room minimum and maximum width */
		roomHeight: [3, 5], /* room minimum and maximum height */
		roomDugPercentage: 0.1, /* we stop after this percentage of level area has been dug out by rooms */
		timeLimit: 1000 /* we stop after this much time has passed (msec) */
	};
	for (var p in options) { this._options[p] = options[p]; }

	this._roomAttempts = 20; /* new room is created N-times until is considered as impossible to generate */
	this._corridorAttempts = 20; /* corridors are tried N-times until the level is considered as impossible to connect */

	this._connected = []; /* list of already connected rooms */
	this._unconnected = []; /* list of remaining unconnected rooms */
	
	this._digCallback = this._digCallback.bind(this);
	this._canBeDugCallback = this._canBeDugCallback.bind(this);
	this._isWallCallback = this._isWallCallback.bind(this);
};
ROT.Map.Uniform.extend(ROT.Map.Dungeon);

/**
 * Create a map. If the time limit has been hit, returns null.
 * @see ROT.Map#create
 */
ROT.Map.Uniform.prototype.create = function(callback) {
	var t1 = Date.now();
	while (1) {
		var t2 = Date.now();
		if (t2 - t1 > this._options.timeLimit) { return null; } /* time limit! */
	
		this._map = this._fillMap(1);
		this._dug = 0;
		this._rooms = [];
		this._unconnected = [];
		this._generateRooms();
		if (this._rooms.length < 2) { continue; }
		if (this._generateCorridors()) { break; }
	}
	
	if (callback) {
		for (var i=0;i<this._width;i++) {
			for (var j=0;j<this._height;j++) {
				callback(i, j, this._map[i][j]);
			}
		}
	}
	
	return this;
};

/**
 * Generates a suitable amount of rooms
 */
ROT.Map.Uniform.prototype._generateRooms = function() {
	var w = this._width-2;
	var h = this._height-2;

	do {
		var room = this._generateRoom();
		if (this._dug/(w*h) > this._options.roomDugPercentage) { break; } /* achieved requested amount of free space */
	} while (room);

	/* either enough rooms, or not able to generate more of them :) */
};

/**
 * Try to generate one room
 */
ROT.Map.Uniform.prototype._generateRoom = function() {
	var count = 0;
	while (count < this._roomAttempts) {
		count++;
		
		var room = ROT.Map.Feature.Room.createRandom(this._width, this._height, this._options);
		if (!room.isValid(this._isWallCallback, this._canBeDugCallback)) { continue; }
		
		room.create(this._digCallback);
		this._rooms.push(room);
		return room;
	} 

	/* no room was generated in a given number of attempts */
	return null;
};

/**
 * Generates connectors beween rooms
 * @returns {bool} success Was this attempt successfull?
 */
ROT.Map.Uniform.prototype._generateCorridors = function() {
	var cnt = 0;
	while (cnt < this._corridorAttempts) {
		cnt++;
		this._corridors = [];

		/* dig rooms into a clear map */
		this._map = this._fillMap(1);
		for (var i=0;i<this._rooms.length;i++) { 
			var room = this._rooms[i];
			room.clearDoors();
			room.create(this._digCallback); 
		}

		this._unconnected = this._rooms.slice().randomize();
		this._connected = [];
		if (this._unconnected.length) { this._connected.push(this._unconnected.pop()); } /* first one is always connected */
		
		while (1) {
			/* 1. pick random connected room */
			var connected = this._connected.random();
			
			/* 2. find closest unconnected */
			var room1 = this._closestRoom(this._unconnected, connected);
			
			/* 3. connect it to closest connected */
			var room2 = this._closestRoom(this._connected, room1);
			
			var ok = this._connectRooms(room1, room2);
			if (!ok) { break; } /* stop connecting, re-shuffle */
			
			if (!this._unconnected.length) { return true; } /* done; no rooms remain */
		}
	}
	return false;
};

/**
 * For a given room, find the closest one from the list
 */
ROT.Map.Uniform.prototype._closestRoom = function(rooms, room) {
	var dist = Infinity;
	var center = room.getCenter();
	var result = null;
	
	for (var i=0;i<rooms.length;i++) {
		var r = rooms[i];
		var c = r.getCenter();
		var dx = c[0]-center[0];
		var dy = c[1]-center[1];
		var d = dx*dx+dy*dy;
		
		if (d < dist) {
			dist = d;
			result = r;
		}
	}
	
	return result;
};

ROT.Map.Uniform.prototype._connectRooms = function(room1, room2) {
	/*
		room1.debug();
		room2.debug();
	*/

	var center1 = room1.getCenter();
	var center2 = room2.getCenter();

	var diffX = center2[0] - center1[0];
	var diffY = center2[1] - center1[1];

	if (Math.abs(diffX) < Math.abs(diffY)) { /* first try connecting north-south walls */
		var dirIndex1 = (diffY > 0 ? 2 : 0);
		var dirIndex2 = (dirIndex1 + 2) % 4;
		var min = room2.getLeft();
		var max = room2.getRight();
		var index = 0;
	} else { /* first try connecting east-west walls */
		var dirIndex1 = (diffX > 0 ? 1 : 3);
		var dirIndex2 = (dirIndex1 + 2) % 4;
		var min = room2.getTop();
		var max = room2.getBottom();
		var index = 1;
	}

	var start = this._placeInWall(room1, dirIndex1); /* corridor will start here */
	if (!start) { return false; }

	if (start[index] >= min && start[index] <= max) { /* possible to connect with straight line (I-like) */
		var end = start.slice();
		var value = null;
		switch (dirIndex2) {
			case 0: value = room2.getTop()-1; break;
			case 1: value = room2.getRight()+1; break;
			case 2: value = room2.getBottom()+1; break;
			case 3: value = room2.getLeft()-1; break;
		}
		end[(index+1)%2] = value;
		this._digLine([start, end]);
		
	} else if (start[index] < min-1 || start[index] > max+1) { /* need to switch target wall (L-like) */

		var diff = start[index] - center2[index];
		switch (dirIndex2) {
			case 0:
			case 1:	var rotation = (diff < 0 ? 3 : 1); break;
			case 2:
			case 3:	var rotation = (diff < 0 ? 1 : 3); break;
		}
		dirIndex2 = (dirIndex2 + rotation) % 4;
		
		var end = this._placeInWall(room2, dirIndex2);
		if (!end) { return false; }

		var mid = [0, 0];
		mid[index] = start[index];
		var index2 = (index+1)%2;
		mid[index2] = end[index2];
		this._digLine([start, mid, end]);
		
	} else { /* use current wall pair, but adjust the line in the middle (S-like) */
	
		var index2 = (index+1)%2;
		var end = this._placeInWall(room2, dirIndex2);
		if (!end) { return false; }
		var mid = Math.round((end[index2] + start[index2])/2);

		var mid1 = [0, 0];
		var mid2 = [0, 0];
		mid1[index] = start[index];
		mid1[index2] = mid;
		mid2[index] = end[index];
		mid2[index2] = mid;
		this._digLine([start, mid1, mid2, end]);
	}

	room1.addDoor(start[0], start[1]);
	room2.addDoor(end[0], end[1]);
	
	var index = this._unconnected.indexOf(room1);
	if (index != -1) {
		this._unconnected.splice(index, 1);
		this._connected.push(room1);
	}

	var index = this._unconnected.indexOf(room2);
	if (index != -1) {
		this._unconnected.splice(index, 1);
		this._connected.push(room2);
	}
	
	return true;
};

ROT.Map.Uniform.prototype._placeInWall = function(room, dirIndex) {
	var start = [0, 0];
	var dir = [0, 0];
	var length = 0;
	
	switch (dirIndex) {
		case 0:
			dir = [1, 0];
			start = [room.getLeft(), room.getTop()-1];
			length = room.getRight()-room.getLeft()+1;
		break;
		case 1:
			dir = [0, 1];
			start = [room.getRight()+1, room.getTop()];
			length = room.getBottom()-room.getTop()+1;
		break;
		case 2:
			dir = [1, 0];
			start = [room.getLeft(), room.getBottom()+1];
			length = room.getRight()-room.getLeft()+1;
		break;
		case 3:
			dir = [0, 1];
			start = [room.getLeft()-1, room.getTop()];
			length = room.getBottom()-room.getTop()+1;
		break;
	}
	
	var avail = [];
	var lastBadIndex = -2;

	for (var i=0;i<length;i++) {
		var x = start[0] + i*dir[0];
		var y = start[1] + i*dir[1];
		avail.push(null);
		
		var isWall = (this._map[x][y] == 1);
		if (isWall) {
			if (lastBadIndex != i-1) { avail[i] = [x, y]; }
		} else {
			lastBadIndex = i;
			if (i) { avail[i-1] = null; }
		}
	}
	
	for (var i=avail.length-1; i>=0; i--) {
		if (!avail[i]) { avail.splice(i, 1); }
	}
	return (avail.length ? avail.random() : null);
};

/**
 * Dig a polyline.
 */
ROT.Map.Uniform.prototype._digLine = function(points) {
	for (var i=1;i<points.length;i++) {
		var start = points[i-1];
		var end = points[i];
		var corridor = new ROT.Map.Feature.Corridor(start[0], start[1], end[0], end[1]);
		corridor.create(this._digCallback);
		this._corridors.push(corridor);
	}
};

ROT.Map.Uniform.prototype._digCallback = function(x, y, value) {
	this._map[x][y] = value;
	if (value == 0) { this._dug++; }
};

ROT.Map.Uniform.prototype._isWallCallback = function(x, y) {
	if (x < 0 || y < 0 || x >= this._width || y >= this._height) { return false; }
	return (this._map[x][y] == 1);
};

ROT.Map.Uniform.prototype._canBeDugCallback = function(x, y) {
	if (x < 1 || y < 1 || x+1 >= this._width || y+1 >= this._height) { return false; }
	return (this._map[x][y] == 1);
};

/**
 * @author hyakugei
 * @class Dungeon generator which uses the "orginal" Rogue dungeon generation algorithm. See http://kuoi.com/~kamikaze/GameDesign/art07_rogue_dungeon.php
 * @augments ROT.Map
 * @param {int} [width=ROT.DEFAULT_WIDTH]
 * @param {int} [height=ROT.DEFAULT_HEIGHT]
 * @param {object} [options] Options
 * @param {int[]} [options.cellWidth=3] Number of cells to create on the horizontal (number of rooms horizontally)
 * @param {int[]} [options.cellHeight=3] Number of cells to create on the vertical (number of rooms vertically)
 * @param {int} [options.roomWidth] Room min and max width - normally set auto-magically via the constructor.
 * @param {int} [options.roomHeight] Room min and max height - normally set auto-magically via the constructor.
 */
ROT.Map.Rogue = function (width, height, options) {
	ROT.Map.call(this, width, height);

	this._options = {
		cellWidth: 3,  // NOTE to self, these could probably work the same as the roomWidth/room Height values
		cellHeight: 3  //     ie. as an array with min-max values for each direction....
	};

	for (var p in options) { this._options[p] = options[p]; }

	/*
	Set the room sizes according to the over-all width of the map,
	and the cell sizes.
	*/
	if (!this._options.hasOwnProperty("roomWidth")) {
		this._options["roomWidth"] = this._calculateRoomSize(this._width, this._options["cellWidth"]);
	}
	if (!this._options.hasOwnProperty("roomHeight")) {
		this._options["roomHeight"] = this._calculateRoomSize(this._height, this._options["cellHeight"]);
	}

};

ROT.Map.Rogue.extend(ROT.Map);

/**
 * @see ROT.Map#create
 */
ROT.Map.Rogue.prototype.create = function (callback) {
	this.map = this._fillMap(1);
	this.rooms = [];
	this.connectedCells = [];

	this._initRooms();
	this._connectRooms();
	this._connectUnconnectedRooms();
	this._createRandomRoomConnections();
	this._createRooms();
	this._createCorridors();

	if (callback) {
		for (var i = 0; i < this._width; i++) {
			for (var j = 0; j < this._height; j++) {
				callback(i, j, this.map[i][j]);
			}
		}
	}

	return this;
};

ROT.Map.Rogue.prototype._calculateRoomSize = function (size, cell) {
	var max = Math.floor((size/cell) * 0.8);
	var min = Math.floor((size/cell) * 0.25);
	if (min < 2) { min = 2; }
	if (max < 2) { max = 2; }
	return [min, max];
};

ROT.Map.Rogue.prototype._initRooms = function () {
	// create rooms array. This is the "grid" list from the algo.
	for (var i = 0; i < this._options.cellWidth; i++) {
		this.rooms.push([]);
		for(var j = 0; j < this._options.cellHeight; j++) {
			this.rooms[i].push({"x":0, "y":0, "width":0, "height":0, "connections":[], "cellx":i, "celly":j});
		}
	}
};

ROT.Map.Rogue.prototype._connectRooms = function () {
	//pick random starting grid
	var cgx = ROT.RNG.getUniformInt(0, this._options.cellWidth-1);
	var cgy = ROT.RNG.getUniformInt(0, this._options.cellHeight-1);

	var idx;
	var ncgx;
	var ncgy;

	var found = false;
	var room;
	var otherRoom;

	// find  unconnected neighbour cells
	do {

		//var dirToCheck = [0, 1, 2, 3, 4, 5, 6, 7];
		var dirToCheck = [0, 2, 4, 6];
		dirToCheck = dirToCheck.randomize();

		do {
			found = false;
			idx = dirToCheck.pop();

			ncgx = cgx + ROT.DIRS[8][idx][0];
			ncgy = cgy + ROT.DIRS[8][idx][1];

			if (ncgx < 0 || ncgx >= this._options.cellWidth) { continue; }
			if (ncgy < 0 || ncgy >= this._options.cellHeight) { continue; }

			room = this.rooms[cgx][cgy];

			if (room["connections"].length > 0) {
				// as long as this room doesn't already coonect to me, we are ok with it.
				if (room["connections"][0][0] == ncgx && room["connections"][0][1] == ncgy) {
					break;
				}
			}

			otherRoom = this.rooms[ncgx][ncgy];

			if (otherRoom["connections"].length == 0) {
				otherRoom["connections"].push([cgx, cgy]);

				this.connectedCells.push([ncgx, ncgy]);
				cgx = ncgx;
				cgy = ncgy;
				found = true;
			}

		} while (dirToCheck.length > 0 && found == false);

	} while (dirToCheck.length > 0);

};

ROT.Map.Rogue.prototype._connectUnconnectedRooms = function () {
	//While there are unconnected rooms, try to connect them to a random connected neighbor
	//(if a room has no connected neighbors yet, just keep cycling, you'll fill out to it eventually).
	var cw = this._options.cellWidth;
	var ch = this._options.cellHeight;

	this.connectedCells = this.connectedCells.randomize();
	var room;
	var otherRoom;
	var validRoom;

	for (var i = 0; i < this._options.cellWidth; i++) {
		for (var j = 0; j < this._options.cellHeight; j++)  {

			room = this.rooms[i][j];

			if (room["connections"].length == 0) {
				var directions = [0, 2, 4, 6];
				directions = directions.randomize();

				validRoom = false;

				do {

					var dirIdx = directions.pop();
					var newI = i + ROT.DIRS[8][dirIdx][0];
					var newJ = j + ROT.DIRS[8][dirIdx][1];

					if (newI < 0 || newI >= cw || newJ < 0 || newJ >= ch) { continue; }

					otherRoom = this.rooms[newI][newJ];

					validRoom = true;

					if (otherRoom["connections"].length == 0) { break; }

					for (var k = 0; k < otherRoom["connections"].length; k++) {
						if (otherRoom["connections"][k][0] == i && otherRoom["connections"][k][1] == j) {
							validRoom = false;
							break;
						}
					}

					if (validRoom) { break; }

				} while (directions.length);

				if (validRoom) {
					room["connections"].push([otherRoom["cellx"], otherRoom["celly"]]);
				} else {
					console.log("-- Unable to connect room.");
				}
			}
		}
	}
};

ROT.Map.Rogue.prototype._createRandomRoomConnections = function (connections) {
	// Empty for now.
};


ROT.Map.Rogue.prototype._createRooms = function () {
	// Create Rooms

	var w = this._width;
	var h = this._height;

	var cw = this._options.cellWidth;
	var ch = this._options.cellHeight;

	var cwp = Math.floor(this._width / cw);
	var chp = Math.floor(this._height / ch);

	var roomw;
	var roomh;
	var roomWidth = this._options["roomWidth"];
	var roomHeight = this._options["roomHeight"];
	var sx;
	var sy;
	var otherRoom;

	for (var i = 0; i < cw; i++) {
		for (var j = 0; j < ch; j++) {
			sx = cwp * i;
			sy = chp * j;

			if (sx == 0) { sx = 1; }
			if (sy == 0) { sy = 1; }

			roomw = ROT.RNG.getUniformInt(roomWidth[0], roomWidth[1]);
			roomh = ROT.RNG.getUniformInt(roomHeight[0], roomHeight[1]);

			if (j > 0) {
				otherRoom = this.rooms[i][j-1];
				while (sy - (otherRoom["y"] + otherRoom["height"] ) < 3) {
					sy++;
				}
			}

			if (i > 0) {
				otherRoom = this.rooms[i-1][j];
				while(sx - (otherRoom["x"] + otherRoom["width"]) < 3) {
					sx++;
				}
			}

			var sxOffset = Math.round(ROT.RNG.getUniformInt(0, cwp-roomw)/2);
			var syOffset = Math.round(ROT.RNG.getUniformInt(0, chp-roomh)/2);

			while (sx + sxOffset + roomw >= w) {
				if(sxOffset) {
					sxOffset--;
				} else {
					roomw--;
				}
			}

			while (sy + syOffset + roomh >= h) {
				if(syOffset) {
					syOffset--;
				} else {
					roomh--;
				}
			}

			sx = sx + sxOffset;
			sy = sy + syOffset;

			this.rooms[i][j]["x"] = sx;
			this.rooms[i][j]["y"] = sy;
			this.rooms[i][j]["width"] = roomw;
			this.rooms[i][j]["height"] = roomh;

			for (var ii = sx; ii < sx + roomw; ii++) {
				for (var jj = sy; jj < sy + roomh; jj++) {
					this.map[ii][jj] = 0;
				}
			}
		}
	}
};

ROT.Map.Rogue.prototype._getWallPosition = function (aRoom, aDirection) {
	var rx;
	var ry;
	var door;

	if (aDirection == 1 || aDirection == 3) {
		rx = ROT.RNG.getUniformInt(aRoom["x"] + 1, aRoom["x"] + aRoom["width"] - 2);
		if (aDirection == 1) {
			ry = aRoom["y"] - 2;
			door = ry + 1;
		} else {
			ry = aRoom["y"] + aRoom["height"] + 1;
			door = ry -1;
		}

		this.map[rx][door] = 0; // i'm not setting a specific 'door' tile value right now, just empty space.

	} else if (aDirection == 2 || aDirection == 4) {
		ry = ROT.RNG.getUniformInt(aRoom["y"] + 1, aRoom["y"] + aRoom["height"] - 2);
		if(aDirection == 2) {
			rx = aRoom["x"] + aRoom["width"] + 1;
			door = rx - 1;
		} else {
			rx = aRoom["x"] - 2;
			door = rx + 1;
		}

		this.map[door][ry] = 0; // i'm not setting a specific 'door' tile value right now, just empty space.

	}
	return [rx, ry];
};

/***
* @param startPosition a 2 element array
* @param endPosition a 2 element array
*/
ROT.Map.Rogue.prototype._drawCorridor = function (startPosition, endPosition) {
	var xOffset = endPosition[0] - startPosition[0];
	var yOffset = endPosition[1] - startPosition[1];

	var xpos = startPosition[0];
	var ypos = startPosition[1];

	var tempDist;
	var xDir;
	var yDir;

	var move; // 2 element array, element 0 is the direction, element 1 is the total value to move.
	var moves = []; // a list of 2 element arrays

	var xAbs = Math.abs(xOffset);
	var yAbs = Math.abs(yOffset);

	var percent = ROT.RNG.getUniform(); // used to split the move at different places along the long axis
	var firstHalf = percent;
	var secondHalf = 1 - percent;

	xDir = xOffset > 0 ? 2 : 6;
	yDir = yOffset > 0 ? 4 : 0;

	if (xAbs < yAbs) {
		// move firstHalf of the y offset
		tempDist = Math.ceil(yAbs * firstHalf);
		moves.push([yDir, tempDist]);
		// move all the x offset
		moves.push([xDir, xAbs]);
		// move sendHalf of the  y offset
		tempDist = Math.floor(yAbs * secondHalf);
		moves.push([yDir, tempDist]);
	} else {
		//  move firstHalf of the x offset
		tempDist = Math.ceil(xAbs * firstHalf);
		moves.push([xDir, tempDist]);
		// move all the y offset
		moves.push([yDir, yAbs]);
		// move secondHalf of the x offset.
		tempDist = Math.floor(xAbs * secondHalf);
		moves.push([xDir, tempDist]);
	}

	this.map[xpos][ypos] = 0;

	while (moves.length > 0) {
		move = moves.pop();
		while (move[1] > 0) {
			xpos += ROT.DIRS[8][move[0]][0];
			ypos += ROT.DIRS[8][move[0]][1];
			this.map[xpos][ypos] = 0;
			move[1] = move[1] - 1;
		}
	}
};

ROT.Map.Rogue.prototype._createCorridors = function () {
	// Draw Corridors between connected rooms

	var cw = this._options.cellWidth;
	var ch = this._options.cellHeight;
	var room;
	var connection;
	var otherRoom;
	var wall;
	var otherWall;

	for (var i = 0; i < cw; i++) {
		for (var j = 0; j < ch; j++) {
			room = this.rooms[i][j];

			for (var k = 0; k < room["connections"].length; k++) {

				connection = room["connections"][k];

				otherRoom = this.rooms[connection[0]][connection[1]];

				// figure out what wall our corridor will start one.
				// figure out what wall our corridor will end on.
				if (otherRoom["cellx"] > room["cellx"]) {
					wall = 2;
					otherWall = 4;
				} else if (otherRoom["cellx"] < room["cellx"]) {
					wall = 4;
					otherWall = 2;
				} else if(otherRoom["celly"] > room["celly"]) {
					wall = 3;
					otherWall = 1;
				} else if(otherRoom["celly"] < room["celly"]) {
					wall = 1;
					otherWall = 3;
				}

				this._drawCorridor(this._getWallPosition(room, wall), this._getWallPosition(otherRoom, otherWall));
			}
		}
	}
};
/**
 * @class Dungeon feature; has own .create() method
 */
ROT.Map.Feature = function() {};
ROT.Map.Feature.prototype.isValid = function(canBeDugCallback) {};
ROT.Map.Feature.prototype.create = function(digCallback) {};
ROT.Map.Feature.prototype.debug = function() {};
ROT.Map.Feature.createRandomAt = function(x, y, dx, dy, options) {};

/**
 * @class Room
 * @augments ROT.Map.Feature
 * @param {int} x1
 * @param {int} y1
 * @param {int} x2
 * @param {int} y2
 * @param {int} [doorX]
 * @param {int} [doorY]
 */
ROT.Map.Feature.Room = function(x1, y1, x2, y2, doorX, doorY) {
	this._x1 = x1;
	this._y1 = y1;
	this._x2 = x2;
	this._y2 = y2;
	this._doors = {};
	if (arguments.length > 4) { this.addDoor(doorX, doorY); }
};
ROT.Map.Feature.Room.extend(ROT.Map.Feature);

/**
 * Room of random size, with a given doors and direction
 */
ROT.Map.Feature.Room.createRandomAt = function(x, y, dx, dy, options) {
	var min = options.roomWidth[0];
	var max = options.roomWidth[1];
	var width = ROT.RNG.getUniformInt(min, max);
	
	var min = options.roomHeight[0];
	var max = options.roomHeight[1];
	var height = ROT.RNG.getUniformInt(min, max);
	
	if (dx == 1) { /* to the right */
		var y2 = y - Math.floor(ROT.RNG.getUniform() * height);
		return new this(x+1, y2, x+width, y2+height-1, x, y);
	}
	
	if (dx == -1) { /* to the left */
		var y2 = y - Math.floor(ROT.RNG.getUniform() * height);
		return new this(x-width, y2, x-1, y2+height-1, x, y);
	}

	if (dy == 1) { /* to the bottom */
		var x2 = x - Math.floor(ROT.RNG.getUniform() * width);
		return new this(x2, y+1, x2+width-1, y+height, x, y);
	}

	if (dy == -1) { /* to the top */
		var x2 = x - Math.floor(ROT.RNG.getUniform() * width);
		return new this(x2, y-height, x2+width-1, y-1, x, y);
	}

        throw new Error("dx or dy must be 1 or -1");
};

/**
 * Room of random size, positioned around center coords
 */
ROT.Map.Feature.Room.createRandomCenter = function(cx, cy, options) {
	var min = options.roomWidth[0];
	var max = options.roomWidth[1];
	var width = ROT.RNG.getUniformInt(min, max);
	
	var min = options.roomHeight[0];
	var max = options.roomHeight[1];
	var height = ROT.RNG.getUniformInt(min, max);

	var x1 = cx - Math.floor(ROT.RNG.getUniform()*width);
	var y1 = cy - Math.floor(ROT.RNG.getUniform()*height);
	var x2 = x1 + width - 1;
	var y2 = y1 + height - 1;

	return new this(x1, y1, x2, y2);
};

/**
 * Room of random size within a given dimensions
 */
ROT.Map.Feature.Room.createRandom = function(availWidth, availHeight, options) {
	var min = options.roomWidth[0];
	var max = options.roomWidth[1];
	var width = ROT.RNG.getUniformInt(min, max);
	
	var min = options.roomHeight[0];
	var max = options.roomHeight[1];
	var height = ROT.RNG.getUniformInt(min, max);
	
	var left = availWidth - width - 1;
	var top = availHeight - height - 1;

	var x1 = 1 + Math.floor(ROT.RNG.getUniform()*left);
	var y1 = 1 + Math.floor(ROT.RNG.getUniform()*top);
	var x2 = x1 + width - 1;
	var y2 = y1 + height - 1;

	return new this(x1, y1, x2, y2);
};

ROT.Map.Feature.Room.prototype.addDoor = function(x, y) {
	this._doors[x+","+y] = 1;
	return this;
};

/**
 * @param {function}
 */
ROT.Map.Feature.Room.prototype.getDoors = function(callback) {
	for (var key in this._doors) {
		var parts = key.split(",");
		callback(parseInt(parts[0]), parseInt(parts[1]));
	}
	return this;
};

ROT.Map.Feature.Room.prototype.clearDoors = function() {
	this._doors = {};
	return this;
};

ROT.Map.Feature.Room.prototype.addDoors = function(isWallCallback) {
	var left = this._x1-1;
	var right = this._x2+1;
	var top = this._y1-1;
	var bottom = this._y2+1;

	for (var x=left; x<=right; x++) {
		for (var y=top; y<=bottom; y++) {
			if (x != left && x != right && y != top && y != bottom) { continue; }
			if (isWallCallback(x, y)) { continue; }

			this.addDoor(x, y);
		}
	}

	return this;
};

ROT.Map.Feature.Room.prototype.debug = function() {
	console.log("room", this._x1, this._y1, this._x2, this._y2);
};

ROT.Map.Feature.Room.prototype.isValid = function(isWallCallback, canBeDugCallback) { 
	var left = this._x1-1;
	var right = this._x2+1;
	var top = this._y1-1;
	var bottom = this._y2+1;
	
	for (var x=left; x<=right; x++) {
		for (var y=top; y<=bottom; y++) {
			if (x == left || x == right || y == top || y == bottom) {
				if (!isWallCallback(x, y)) { return false; }
			} else {
				if (!canBeDugCallback(x, y)) { return false; }
			}
		}
	}

	return true;
};

/**
 * @param {function} digCallback Dig callback with a signature (x, y, value). Values: 0 = empty, 1 = wall, 2 = door. Multiple doors are allowed.
 */
ROT.Map.Feature.Room.prototype.create = function(digCallback) { 
	var left = this._x1-1;
	var right = this._x2+1;
	var top = this._y1-1;
	var bottom = this._y2+1;
	
	var value = 0;
	for (var x=left; x<=right; x++) {
		for (var y=top; y<=bottom; y++) {
			if (x+","+y in this._doors) {
				value = 2;
			} else if (x == left || x == right || y == top || y == bottom) {
				value = 1;
			} else {
				value = 0;
			}
			digCallback(x, y, value);
		}
	}
};

ROT.Map.Feature.Room.prototype.getCenter = function() {
	return [Math.round((this._x1 + this._x2)/2), Math.round((this._y1 + this._y2)/2)];
};

ROT.Map.Feature.Room.prototype.getLeft = function() {
	return this._x1;
};

ROT.Map.Feature.Room.prototype.getRight = function() {
	return this._x2;
};

ROT.Map.Feature.Room.prototype.getTop = function() {
	return this._y1;
};

ROT.Map.Feature.Room.prototype.getBottom = function() {
	return this._y2;
};

/**
 * @class Corridor
 * @augments ROT.Map.Feature
 * @param {int} startX
 * @param {int} startY
 * @param {int} endX
 * @param {int} endY
 */
ROT.Map.Feature.Corridor = function(startX, startY, endX, endY) {
	this._startX = startX;
	this._startY = startY;
	this._endX = endX; 
	this._endY = endY;
	this._endsWithAWall = true;
};
ROT.Map.Feature.Corridor.extend(ROT.Map.Feature);

ROT.Map.Feature.Corridor.createRandomAt = function(x, y, dx, dy, options) {
	var min = options.corridorLength[0];
	var max = options.corridorLength[1];
	var length = ROT.RNG.getUniformInt(min, max);
	
	return new this(x, y, x + dx*length, y + dy*length);
};

ROT.Map.Feature.Corridor.prototype.debug = function() {
	console.log("corridor", this._startX, this._startY, this._endX, this._endY);
};

ROT.Map.Feature.Corridor.prototype.isValid = function(isWallCallback, canBeDugCallback){ 
	var sx = this._startX;
	var sy = this._startY;
	var dx = this._endX-sx;
	var dy = this._endY-sy;
	var length = 1 + Math.max(Math.abs(dx), Math.abs(dy));
	
	if (dx) { dx = dx/Math.abs(dx); }
	if (dy) { dy = dy/Math.abs(dy); }
	var nx = dy;
	var ny = -dx;
	
	var ok = true;
	for (var i=0; i<length; i++) {
		var x = sx + i*dx;
		var y = sy + i*dy;

		if (!canBeDugCallback(     x,      y)) { ok = false; }
		if (!isWallCallback  (x + nx, y + ny)) { ok = false; }
		if (!isWallCallback  (x - nx, y - ny)) { ok = false; }
		
		if (!ok) {
			length = i;
			this._endX = x-dx;
			this._endY = y-dy;
			break;
		}
	}
	
	/**
	 * If the length degenerated, this corridor might be invalid
	 */
	 
	/* not supported */
	if (length == 0) { return false; } 
	
	 /* length 1 allowed only if the next space is empty */
	if (length == 1 && isWallCallback(this._endX + dx, this._endY + dy)) { return false; }
	
	/**
	 * We do not want the corridor to crash into a corner of a room;
	 * if any of the ending corners is empty, the N+1th cell of this corridor must be empty too.
	 * 
	 * Situation:
	 * #######1
	 * .......?
	 * #######2
	 * 
	 * The corridor was dug from left to right.
	 * 1, 2 - problematic corners, ? = N+1th cell (not dug)
	 */
	var firstCornerBad = !isWallCallback(this._endX + dx + nx, this._endY + dy + ny);
	var secondCornerBad = !isWallCallback(this._endX + dx - nx, this._endY + dy - ny);
	this._endsWithAWall = isWallCallback(this._endX + dx, this._endY + dy);
	if ((firstCornerBad || secondCornerBad) && this._endsWithAWall) { return false; }

	return true;
};

/**
 * @param {function} digCallback Dig callback with a signature (x, y, value). Values: 0 = empty.
 */
ROT.Map.Feature.Corridor.prototype.create = function(digCallback) { 
	var sx = this._startX;
	var sy = this._startY;
	var dx = this._endX-sx;
	var dy = this._endY-sy;
	var length = 1+Math.max(Math.abs(dx), Math.abs(dy));
	
	if (dx) { dx = dx/Math.abs(dx); }
	if (dy) { dy = dy/Math.abs(dy); }
	var nx = dy;
	var ny = -dx;
	
	for (var i=0; i<length; i++) {
		var x = sx + i*dx;
		var y = sy + i*dy;
		digCallback(x, y, 0);
	}
	
	return true;
};

ROT.Map.Feature.Corridor.prototype.createPriorityWalls = function(priorityWallCallback) {
	if (!this._endsWithAWall) { return; }

	var sx = this._startX;
	var sy = this._startY;

	var dx = this._endX-sx;
	var dy = this._endY-sy;
	if (dx) { dx = dx/Math.abs(dx); }
	if (dy) { dy = dy/Math.abs(dy); }
	var nx = dy;
	var ny = -dx;

	priorityWallCallback(this._endX + dx, this._endY + dy);
	priorityWallCallback(this._endX + nx, this._endY + ny);
	priorityWallCallback(this._endX - nx, this._endY - ny);
};
/**
 * @class Base noise generator
 */
ROT.Noise = function() {
};

ROT.Noise.prototype.get = function(x, y) {};
/**
 * A simple 2d implementation of simplex noise by Ondrej Zara
 *
 * Based on a speed-improved simplex noise algorithm for 2D, 3D and 4D in Java.
 * Which is based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * With Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 */

/**
 * @class 2D simplex noise generator
 * @param {int} [gradients=256] Random gradients
 */
ROT.Noise.Simplex = function(gradients) {
	ROT.Noise.call(this);

	this._F2 = 0.5 * (Math.sqrt(3) - 1);
	this._G2 = (3 - Math.sqrt(3)) / 6;

	this._gradients = [
		[ 0, -1],
		[ 1, -1],
		[ 1,  0],
		[ 1,  1],
		[ 0,  1],
		[-1,  1],
		[-1,  0],
		[-1, -1]
	];

	var permutations = [];
	var count = gradients || 256;
	for (var i=0;i<count;i++) { permutations.push(i); }
	permutations = permutations.randomize();

	this._perms = [];
	this._indexes = [];

	for (var i=0;i<2*count;i++) {
		this._perms.push(permutations[i % count]);
		this._indexes.push(this._perms[i] % this._gradients.length);
	}

};
ROT.Noise.Simplex.extend(ROT.Noise);

ROT.Noise.Simplex.prototype.get = function(xin, yin) {
	var perms = this._perms;
	var indexes = this._indexes;
	var count = perms.length/2;
	var G2 = this._G2;

	var n0 =0, n1 = 0, n2 = 0, gi; // Noise contributions from the three corners

	// Skew the input space to determine which simplex cell we're in
	var s = (xin + yin) * this._F2; // Hairy factor for 2D
	var i = Math.floor(xin + s);
	var j = Math.floor(yin + s);
	var t = (i + j) * G2;
	var X0 = i - t; // Unskew the cell origin back to (x,y) space
	var Y0 = j - t;
	var x0 = xin - X0; // The x,y distances from the cell origin
	var y0 = yin - Y0;

	// For the 2D case, the simplex shape is an equilateral triangle.
	// Determine which simplex we are in.
	var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
	if (x0 > y0) {
		i1 = 1;
		j1 = 0;
	} else { // lower triangle, XY order: (0,0)->(1,0)->(1,1)
		i1 = 0;
		j1 = 1;
	} // upper triangle, YX order: (0,0)->(0,1)->(1,1)

	// A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
	// a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
	// c = (3-sqrt(3))/6
	var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords
	var y1 = y0 - j1 + G2;
	var x2 = x0 - 1 + 2*G2; // Offsets for last corner in (x,y) unskewed coords
	var y2 = y0 - 1 + 2*G2;

	// Work out the hashed gradient indices of the three simplex corners
	var ii = i.mod(count);
	var jj = j.mod(count);

	// Calculate the contribution from the three corners
	var t0 = 0.5 - x0*x0 - y0*y0;
	if (t0 >= 0) {
		t0 *= t0;
		gi = indexes[ii+perms[jj]];
		var grad = this._gradients[gi];
		n0 = t0 * t0 * (grad[0] * x0 + grad[1] * y0);
	}
	
	var t1 = 0.5 - x1*x1 - y1*y1;
	if (t1 >= 0) {
		t1 *= t1;
		gi = indexes[ii+i1+perms[jj+j1]];
		var grad = this._gradients[gi];
		n1 = t1 * t1 * (grad[0] * x1 + grad[1] * y1);
	}
	
	var t2 = 0.5 - x2*x2 - y2*y2;
	if (t2 >= 0) {
		t2 *= t2;
		gi = indexes[ii+1+perms[jj+1]];
		var grad = this._gradients[gi];
		n2 = t2 * t2 * (grad[0] * x2 + grad[1] * y2);
	}

	// Add contributions from each corner to get the final noise value.
	// The result is scaled to return values in the interval [-1,1].
	return 70 * (n0 + n1 + n2);
}
/**
 * @class Abstract FOV algorithm
 * @param {function} lightPassesCallback Does the light pass through x,y?
 * @param {object} [options]
 * @param {int} [options.topology=8] 4/6/8
 */
ROT.FOV = function(lightPassesCallback, options) {
	this._lightPasses = lightPassesCallback;
	this._options = {
		topology: 8
	};
	for (var p in options) { this._options[p] = options[p]; }
};

/**
 * Compute visibility for a 360-degree circle
 * @param {int} x
 * @param {int} y
 * @param {int} R Maximum visibility radius
 * @param {function} callback
 */
ROT.FOV.prototype.compute = function(x, y, R, callback) {};

/**
 * Return all neighbors in a concentric ring
 * @param {int} cx center-x
 * @param {int} cy center-y
 * @param {int} r range
 */
ROT.FOV.prototype._getCircle = function(cx, cy, r) {
	var result = [];
	var dirs, countFactor, startOffset;

	switch (this._options.topology) {
		case 4:
			countFactor = 1;
			startOffset = [0, 1];
			dirs = [
				ROT.DIRS[8][7],
				ROT.DIRS[8][1],
				ROT.DIRS[8][3],
				ROT.DIRS[8][5]
			];
		break;

		case 6:
			dirs = ROT.DIRS[6];
			countFactor = 1;
			startOffset = [-1, 1];
		break;

		case 8:
			dirs = ROT.DIRS[4];
			countFactor = 2;
			startOffset = [-1, 1];
		break;
	}

	/* starting neighbor */
	var x = cx + startOffset[0]*r;
	var y = cy + startOffset[1]*r;

	/* circle */
	for (var i=0;i<dirs.length;i++) {
		for (var j=0;j<r*countFactor;j++) {
			result.push([x, y]);
			x += dirs[i][0];
			y += dirs[i][1];

		}
	}

	return result;
};
/**
 * @class Discrete shadowcasting algorithm. Obsoleted by Precise shadowcasting.
 * @augments ROT.FOV
 */
ROT.FOV.DiscreteShadowcasting = function(lightPassesCallback, options) {
	ROT.FOV.call(this, lightPassesCallback, options);
};
ROT.FOV.DiscreteShadowcasting.extend(ROT.FOV);

/**
 * @see ROT.FOV#compute
 */
ROT.FOV.DiscreteShadowcasting.prototype.compute = function(x, y, R, callback) {
	var center = this._coords;
	var map = this._map;

	/* this place is always visible */
	callback(x, y, 0, 1);

	/* standing in a dark place. FIXME is this a good idea?  */
	if (!this._lightPasses(x, y)) { return; }
	
	/* start and end angles */
	var DATA = [];
	
	var A, B, cx, cy, blocks;

	/* analyze surrounding cells in concentric rings, starting from the center */
	for (var r=1; r<=R; r++) {
		var neighbors = this._getCircle(x, y, r);
		var angle = 360 / neighbors.length;

		for (var i=0;i<neighbors.length;i++) {
			cx = neighbors[i][0];
			cy = neighbors[i][1];
			A = angle * (i - 0.5);
			B = A + angle;
			
			blocks = !this._lightPasses(cx, cy);
			if (this._visibleCoords(Math.floor(A), Math.ceil(B), blocks, DATA)) { callback(cx, cy, r, 1); }
			
			if (DATA.length == 2 && DATA[0] == 0 && DATA[1] == 360) { return; } /* cutoff? */

		} /* for all cells in this ring */
	} /* for all rings */
};

/**
 * @param {int} A start angle
 * @param {int} B end angle
 * @param {bool} blocks Does current cell block visibility?
 * @param {int[][]} DATA shadowed angle pairs
 */
ROT.FOV.DiscreteShadowcasting.prototype._visibleCoords = function(A, B, blocks, DATA) {
	if (A < 0) { 
		var v1 = this._visibleCoords(0, B, blocks, DATA);
		var v2 = this._visibleCoords(360+A, 360, blocks, DATA);
		return v1 || v2;
	}
	
	var index = 0;
	while (index < DATA.length && DATA[index] < A) { index++; }
	
	if (index == DATA.length) { /* completely new shadow */
		if (blocks) { DATA.push(A, B); } 
		return true;
	}
	
	var count = 0;
	
	if (index % 2) { /* this shadow starts in an existing shadow, or within its ending boundary */
		while (index < DATA.length && DATA[index] < B) {
			index++;
			count++;
		}
		
		if (count == 0) { return false; }
		
		if (blocks) { 
			if (count % 2) {
				DATA.splice(index-count, count, B);
			} else {
				DATA.splice(index-count, count);
			}
		}
		
		return true;

	} else { /* this shadow starts outside an existing shadow, or within a starting boundary */
		while (index < DATA.length && DATA[index] < B) {
			index++;
			count++;
		}
		
		/* visible when outside an existing shadow, or when overlapping */
		if (A == DATA[index-count] && count == 1) { return false; }
		
		if (blocks) { 
			if (count % 2) {
				DATA.splice(index-count, count, A);
			} else {
				DATA.splice(index-count, count, A, B);
			}
		}
			
		return true;
	}
};
/**
 * @class Precise shadowcasting algorithm
 * @augments ROT.FOV
 */
ROT.FOV.PreciseShadowcasting = function(lightPassesCallback, options) {
	ROT.FOV.call(this, lightPassesCallback, options);
};
ROT.FOV.PreciseShadowcasting.extend(ROT.FOV);

/**
 * @see ROT.FOV#compute
 */
ROT.FOV.PreciseShadowcasting.prototype.compute = function(x, y, R, callback) {
	/* this place is always visible */
	callback(x, y, 0, 1);

	/* standing in a dark place. FIXME is this a good idea?  */
	if (!this._lightPasses(x, y)) { return; }
	
	/* list of all shadows */
	var SHADOWS = [];
	
	var cx, cy, blocks, A1, A2, visibility;

	/* analyze surrounding cells in concentric rings, starting from the center */
	for (var r=1; r<=R; r++) {
		var neighbors = this._getCircle(x, y, r);
		var neighborCount = neighbors.length;

		for (var i=0;i<neighborCount;i++) {
			cx = neighbors[i][0];
			cy = neighbors[i][1];
			/* shift half-an-angle backwards to maintain consistency of 0-th cells */
			A1 = [i ? 2*i-1 : 2*neighborCount-1, 2*neighborCount];
			A2 = [2*i+1, 2*neighborCount]; 
			
			blocks = !this._lightPasses(cx, cy);
			visibility = this._checkVisibility(A1, A2, blocks, SHADOWS);
			if (visibility) { callback(cx, cy, r, visibility); }

			if (SHADOWS.length == 2 && SHADOWS[0][0] == 0 && SHADOWS[1][0] == SHADOWS[1][1]) { return; } /* cutoff? */

		} /* for all cells in this ring */
	} /* for all rings */
};

/**
 * @param {int[2]} A1 arc start
 * @param {int[2]} A2 arc end
 * @param {bool} blocks Does current arc block visibility?
 * @param {int[][]} SHADOWS list of active shadows
 */
ROT.FOV.PreciseShadowcasting.prototype._checkVisibility = function(A1, A2, blocks, SHADOWS) {
	if (A1[0] > A2[0]) { /* split into two sub-arcs */
		var v1 = this._checkVisibility(A1, [A1[1], A1[1]], blocks, SHADOWS);
		var v2 = this._checkVisibility([0, 1], A2, blocks, SHADOWS);
		return (v1+v2)/2;
	}

	/* index1: first shadow >= A1 */
	var index1 = 0, edge1 = false;
	while (index1 < SHADOWS.length) {
		var old = SHADOWS[index1];
		var diff = old[0]*A1[1] - A1[0]*old[1];
		if (diff >= 0) { /* old >= A1 */
			if (diff == 0 && !(index1 % 2)) { edge1 = true; }
			break;
		}
		index1++;
	}

	/* index2: last shadow <= A2 */
	var index2 = SHADOWS.length, edge2 = false;
	while (index2--) {
		var old = SHADOWS[index2];
		var diff = A2[0]*old[1] - old[0]*A2[1];
		if (diff >= 0) { /* old <= A2 */
			if (diff == 0 && (index2 % 2)) { edge2 = true; }
			break;
		}
	}

	var visible = true;
	if (index1 == index2 && (edge1 || edge2)) {  /* subset of existing shadow, one of the edges match */
		visible = false; 
	} else if (edge1 && edge2 && index1+1==index2 && (index2 % 2)) { /* completely equivalent with existing shadow */
		visible = false;
	} else if (index1 > index2 && (index1 % 2)) { /* subset of existing shadow, not touching */
		visible = false;
	}
	
	if (!visible) { return 0; } /* fast case: not visible */
	
	var visibleLength, P;

	/* compute the length of visible arc, adjust list of shadows (if blocking) */
	var remove = index2-index1+1;
	if (remove % 2) {
		if (index1 % 2) { /* first edge within existing shadow, second outside */
			var P = SHADOWS[index1];
			visibleLength = (A2[0]*P[1] - P[0]*A2[1]) / (P[1] * A2[1]);
			if (blocks) { SHADOWS.splice(index1, remove, A2); }
		} else { /* second edge within existing shadow, first outside */
			var P = SHADOWS[index2];
			visibleLength = (P[0]*A1[1] - A1[0]*P[1]) / (A1[1] * P[1]);
			if (blocks) { SHADOWS.splice(index1, remove, A1); }
		}
	} else {
		if (index1 % 2) { /* both edges within existing shadows */
			var P1 = SHADOWS[index1];
			var P2 = SHADOWS[index2];
			visibleLength = (P2[0]*P1[1] - P1[0]*P2[1]) / (P1[1] * P2[1]);
			if (blocks) { SHADOWS.splice(index1, remove); }
		} else { /* both edges outside existing shadows */
			if (blocks) { SHADOWS.splice(index1, remove, A1, A2); }
			return 1; /* whole arc visible! */
		}
	}

	var arcLength = (A2[0]*A1[1] - A1[0]*A2[1]) / (A1[1] * A2[1]);

	return visibleLength/arcLength;
};
/**
 * @class Recursive shadowcasting algorithm
 * Currently only supports 4/8 topologies, not hexagonal.
 * Based on Peter Harkins' implementation of Björn Bergström's algorithm described here: http://www.roguebasin.com/index.php?title=FOV_using_recursive_shadowcasting
 * @augments ROT.FOV
 */
ROT.FOV.RecursiveShadowcasting = function(lightPassesCallback, options) {
	ROT.FOV.call(this, lightPassesCallback, options);
};
ROT.FOV.RecursiveShadowcasting.extend(ROT.FOV);

/** Octants used for translating recursive shadowcasting offsets */
ROT.FOV.RecursiveShadowcasting.OCTANTS = [
	[-1,  0,  0,  1],
	[ 0, -1,  1,  0],
	[ 0, -1, -1,  0],
	[-1,  0,  0, -1],
	[ 1,  0,  0, -1],
	[ 0,  1, -1,  0],
	[ 0,  1,  1,  0],
	[ 1,  0,  0,  1]
];

/**
 * Compute visibility for a 360-degree circle
 * @param {int} x
 * @param {int} y
 * @param {int} R Maximum visibility radius
 * @param {function} callback
 */
ROT.FOV.RecursiveShadowcasting.prototype.compute = function(x, y, R, callback) {
	//You can always see your own tile
	callback(x, y, 0, 1);
	for(var i = 0; i < ROT.FOV.RecursiveShadowcasting.OCTANTS.length; i++) {
		this._renderOctant(x, y, ROT.FOV.RecursiveShadowcasting.OCTANTS[i], R, callback);
	}
};

/**
 * Compute visibility for a 180-degree arc
 * @param {int} x
 * @param {int} y
 * @param {int} R Maximum visibility radius
 * @param {int} dir Direction to look in (expressed in a ROT.DIRS value);
 * @param {function} callback
 */
ROT.FOV.RecursiveShadowcasting.prototype.compute180 = function(x, y, R, dir, callback) {
	//You can always see your own tile
	callback(x, y, 0, 1);
	var previousOctant = (dir - 1 + 8) % 8; //Need to retrieve the previous octant to render a full 180 degrees
	var nextPreviousOctant = (dir - 2 + 8) % 8; //Need to retrieve the previous two octants to render a full 180 degrees
	var nextOctant = (dir+ 1 + 8) % 8; //Need to grab to next octant to render a full 180 degrees
	this._renderOctant(x, y, ROT.FOV.RecursiveShadowcasting.OCTANTS[nextPreviousOctant], R, callback);
	this._renderOctant(x, y, ROT.FOV.RecursiveShadowcasting.OCTANTS[previousOctant], R, callback);
	this._renderOctant(x, y, ROT.FOV.RecursiveShadowcasting.OCTANTS[dir], R, callback);
	this._renderOctant(x, y, ROT.FOV.RecursiveShadowcasting.OCTANTS[nextOctant], R, callback);
};

/**
 * Compute visibility for a 90-degree arc
 * @param {int} x
 * @param {int} y
 * @param {int} R Maximum visibility radius
 * @param {int} dir Direction to look in (expressed in a ROT.DIRS value);
 * @param {function} callback
 */
ROT.FOV.RecursiveShadowcasting.prototype.compute90 = function(x, y, R, dir, callback) {
	//You can always see your own tile
	callback(x, y, 0, 1);
	var previousOctant = (dir - 1 + 8) % 8; //Need to retrieve the previous octant to render a full 90 degrees
	this._renderOctant(x, y, ROT.FOV.RecursiveShadowcasting.OCTANTS[dir], R, callback);
	this._renderOctant(x, y, ROT.FOV.RecursiveShadowcasting.OCTANTS[previousOctant], R, callback);
};

/**
 * Render one octant (45-degree arc) of the viewshed
 * @param {int} x
 * @param {int} y
 * @param {int} octant Octant to be rendered
 * @param {int} R Maximum visibility radius
 * @param {function} callback
 */
ROT.FOV.RecursiveShadowcasting.prototype._renderOctant = function(x, y, octant, R, callback) {
	//Radius incremented by 1 to provide same coverage area as other shadowcasting radiuses
	this._castVisibility(x, y, 1, 1.0, 0.0, R + 1, octant[0], octant[1], octant[2], octant[3], callback);
};

/**
 * Actually calculates the visibility
 * @param {int} startX The starting X coordinate
 * @param {int} startY The starting Y coordinate
 * @param {int} row The row to render
 * @param {float} visSlopeStart The slope to start at
 * @param {float} visSlopeEnd The slope to end at
 * @param {int} radius The radius to reach out to
 * @param {int} xx 
 * @param {int} xy 
 * @param {int} yx 
 * @param {int} yy 
 * @param {function} callback The callback to use when we hit a block that is visible
 */
ROT.FOV.RecursiveShadowcasting.prototype._castVisibility = function(startX, startY, row, visSlopeStart, visSlopeEnd, radius, xx, xy, yx, yy, callback) {
	if(visSlopeStart < visSlopeEnd) { return; }
	for(var i = row; i <= radius; i++) {
		var dx = -i - 1;
		var dy = -i;
		var blocked = false;
		var newStart = 0;

		//'Row' could be column, names here assume octant 0 and would be flipped for half the octants
		while(dx <= 0) {
			dx += 1;

			//Translate from relative coordinates to map coordinates
			var mapX = startX + dx * xx + dy * xy;
			var mapY = startY + dx * yx + dy * yy;

			//Range of the row
			var slopeStart = (dx - 0.5) / (dy + 0.5);
			var slopeEnd = (dx + 0.5) / (dy - 0.5);
		
			//Ignore if not yet at left edge of Octant
			if(slopeEnd > visSlopeStart) { continue; }
			
			//Done if past right edge
			if(slopeStart < visSlopeEnd) { break; }
				
			//If it's in range, it's visible
			if((dx * dx + dy * dy) < (radius * radius)) {
				callback(mapX, mapY, i, 1);
			}
	
			if(!blocked) {
				//If tile is a blocking tile, cast around it
				if(!this._lightPasses(mapX, mapY) && i < radius) {
					blocked = true;
					this._castVisibility(startX, startY, i + 1, visSlopeStart, slopeStart, radius, xx, xy, yx, yy, callback);
					newStart = slopeEnd;
				}
			} else {
				//Keep narrowing if scanning across a block
				if(!this._lightPasses(mapX, mapY)) {
					newStart = slopeEnd;
					continue;
				}
			
				//Block has ended
				blocked = false;
				visSlopeStart = newStart;
			}
		}
		if(blocked) { break; }
	}
};
/**
 * @namespace Color operations
 */
ROT.Color = {
	fromString: function(str) {
		var cached, r;
		if (str in this._cache) {
			cached = this._cache[str];
		} else {
			if (str.charAt(0) == "#") { /* hex rgb */

				var values = str.match(/[0-9a-f]/gi).map(function(x) { return parseInt(x, 16); });
				if (values.length == 3) {
					cached = values.map(function(x) { return x*17; });
				} else {
					for (var i=0;i<3;i++) {
						values[i+1] += 16*values[i];
						values.splice(i, 1);
					}
					cached = values;
				}

			} else if ((r = str.match(/rgb\(([0-9, ]+)\)/i))) { /* decimal rgb */
				cached = r[1].split(/\s*,\s*/).map(function(x) { return parseInt(x); });
			} else { /* html name */
				cached = [0, 0, 0];
			}

			this._cache[str] = cached;
		}

		return cached.slice();
	},

	/**
	 * Add two or more colors
	 * @param {number[]} color1
	 * @param {number[]} color2
	 * @returns {number[]}
	 */
	add: function(color1, color2) {
		var result = color1.slice();
		for (var i=0;i<3;i++) {
			for (var j=1;j<arguments.length;j++) {
				result[i] += arguments[j][i];
			}
		}
		return result;
	},

	/**
	 * Add two or more colors, MODIFIES FIRST ARGUMENT
	 * @param {number[]} color1
	 * @param {number[]} color2
	 * @returns {number[]}
	 */
	add_: function(color1, color2) {
		for (var i=0;i<3;i++) {
			for (var j=1;j<arguments.length;j++) {
				color1[i] += arguments[j][i];
			}
		}
		return color1;
	},

	/**
	 * Multiply (mix) two or more colors
	 * @param {number[]} color1
	 * @param {number[]} color2
	 * @returns {number[]}
	 */
	multiply: function(color1, color2) {
		var result = color1.slice();
		for (var i=0;i<3;i++) {
			for (var j=1;j<arguments.length;j++) {
				result[i] *= arguments[j][i] / 255;
			}
			result[i] = Math.round(result[i]);
		}
		return result;
	},

	/**
	 * Multiply (mix) two or more colors, MODIFIES FIRST ARGUMENT
	 * @param {number[]} color1
	 * @param {number[]} color2
	 * @returns {number[]}
	 */
	multiply_: function(color1, color2) {
		for (var i=0;i<3;i++) {
			for (var j=1;j<arguments.length;j++) {
				color1[i] *= arguments[j][i] / 255;
			}
			color1[i] = Math.round(color1[i]);
		}
		return color1;
	},

	/**
	 * Interpolate (blend) two colors with a given factor
	 * @param {number[]} color1
	 * @param {number[]} color2
	 * @param {float} [factor=0.5] 0..1
	 * @returns {number[]}
	 */
	interpolate: function(color1, color2, factor) {
		if (arguments.length < 3) { factor = 0.5; }
		var result = color1.slice();
		for (var i=0;i<3;i++) {
			result[i] = Math.round(result[i] + factor*(color2[i]-color1[i]));
		}
		return result;
	},

	/**
	 * Interpolate (blend) two colors with a given factor in HSL mode
	 * @param {number[]} color1
	 * @param {number[]} color2
	 * @param {float} [factor=0.5] 0..1
	 * @returns {number[]}
	 */
	interpolateHSL: function(color1, color2, factor) {
		if (arguments.length < 3) { factor = 0.5; }
		var hsl1 = this.rgb2hsl(color1);
		var hsl2 = this.rgb2hsl(color2);
		for (var i=0;i<3;i++) {
			hsl1[i] += factor*(hsl2[i]-hsl1[i]);
		}
		return this.hsl2rgb(hsl1);
	},

	/**
	 * Create a new random color based on this one
	 * @param {number[]} color
	 * @param {number[]} diff Set of standard deviations
	 * @returns {number[]}
	 */
	randomize: function(color, diff) {
		if (!(diff instanceof Array)) { diff = Math.round(ROT.RNG.getNormal(0, diff)); }
		var result = color.slice();
		for (var i=0;i<3;i++) {
			result[i] += (diff instanceof Array ? Math.round(ROT.RNG.getNormal(0, diff[i])) : diff);
		}
		return result;
	},

	/**
	 * Converts an RGB color value to HSL. Expects 0..255 inputs, produces 0..1 outputs.
	 * @param {number[]} color
	 * @returns {number[]}
	 */
	rgb2hsl: function(color) {
		var r = color[0]/255;
		var g = color[1]/255;
		var b = color[2]/255;

		var max = Math.max(r, g, b), min = Math.min(r, g, b);
		var h, s, l = (max + min) / 2;

		if (max == min) {
			h = s = 0; // achromatic
		} else {
			var d = max - min;
			s = (l > 0.5 ? d / (2 - max - min) : d / (max + min));
			switch(max) {
				case r: h = (g - b) / d + (g < b ? 6 : 0); break;
				case g: h = (b - r) / d + 2; break;
				case b: h = (r - g) / d + 4; break;
			}
			h /= 6;
		}

		return [h, s, l];
	},

	/**
	 * Converts an HSL color value to RGB. Expects 0..1 inputs, produces 0..255 outputs.
	 * @param {number[]} color
	 * @returns {number[]}
	 */
	hsl2rgb: function(color) {
		var l = color[2];

		if (color[1] == 0) {
			l = Math.round(l*255);
			return [l, l, l];
		} else {
			var hue2rgb = function(p, q, t) {
				if (t < 0) t += 1;
				if (t > 1) t -= 1;
				if (t < 1/6) return p + (q - p) * 6 * t;
				if (t < 1/2) return q;
				if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
				return p;
			}

			var s = color[1];
			var q = (l < 0.5 ? l * (1 + s) : l + s - l * s);
			var p = 2 * l - q;
			var r = hue2rgb(p, q, color[0] + 1/3);
			var g = hue2rgb(p, q, color[0]);
			var b = hue2rgb(p, q, color[0] - 1/3);
			return [Math.round(r*255), Math.round(g*255), Math.round(b*255)];
		}
	},

	toRGB: function(color) {
		return "rgb(" + this._clamp(color[0]) + "," + this._clamp(color[1]) + "," + this._clamp(color[2]) + ")";
	},

	toHex: function(color) {
		var parts = [];
		for (var i=0;i<3;i++) {
			parts.push(this._clamp(color[i]).toString(16).lpad("0", 2));
		}
		return "#" + parts.join("");
	},

	_clamp: function(num) {
		if (num < 0) {
			return 0;
		} else if (num > 255) {
			return 255;
		} else {
			return num;
		}
	},

	_cache: {
		"black": [0,0,0],
		"navy": [0,0,128],
		"darkblue": [0,0,139],
		"mediumblue": [0,0,205],
		"blue": [0,0,255],
		"darkgreen": [0,100,0],
		"green": [0,128,0],
		"teal": [0,128,128],
		"darkcyan": [0,139,139],
		"deepskyblue": [0,191,255],
		"darkturquoise": [0,206,209],
		"mediumspringgreen": [0,250,154],
		"lime": [0,255,0],
		"springgreen": [0,255,127],
		"aqua": [0,255,255],
		"cyan": [0,255,255],
		"midnightblue": [25,25,112],
		"dodgerblue": [30,144,255],
		"forestgreen": [34,139,34],
		"seagreen": [46,139,87],
		"darkslategray": [47,79,79],
		"darkslategrey": [47,79,79],
		"limegreen": [50,205,50],
		"mediumseagreen": [60,179,113],
		"turquoise": [64,224,208],
		"royalblue": [65,105,225],
		"steelblue": [70,130,180],
		"darkslateblue": [72,61,139],
		"mediumturquoise": [72,209,204],
		"indigo": [75,0,130],
		"darkolivegreen": [85,107,47],
		"cadetblue": [95,158,160],
		"cornflowerblue": [100,149,237],
		"mediumaquamarine": [102,205,170],
		"dimgray": [105,105,105],
		"dimgrey": [105,105,105],
		"slateblue": [106,90,205],
		"olivedrab": [107,142,35],
		"slategray": [112,128,144],
		"slategrey": [112,128,144],
		"lightslategray": [119,136,153],
		"lightslategrey": [119,136,153],
		"mediumslateblue": [123,104,238],
		"lawngreen": [124,252,0],
		"chartreuse": [127,255,0],
		"aquamarine": [127,255,212],
		"maroon": [128,0,0],
		"purple": [128,0,128],
		"olive": [128,128,0],
		"gray": [128,128,128],
		"grey": [128,128,128],
		"skyblue": [135,206,235],
		"lightskyblue": [135,206,250],
		"blueviolet": [138,43,226],
		"darkred": [139,0,0],
		"darkmagenta": [139,0,139],
		"saddlebrown": [139,69,19],
		"darkseagreen": [143,188,143],
		"lightgreen": [144,238,144],
		"mediumpurple": [147,112,216],
		"darkviolet": [148,0,211],
		"palegreen": [152,251,152],
		"darkorchid": [153,50,204],
		"yellowgreen": [154,205,50],
		"sienna": [160,82,45],
		"brown": [165,42,42],
		"darkgray": [169,169,169],
		"darkgrey": [169,169,169],
		"lightblue": [173,216,230],
		"greenyellow": [173,255,47],
		"paleturquoise": [175,238,238],
		"lightsteelblue": [176,196,222],
		"powderblue": [176,224,230],
		"firebrick": [178,34,34],
		"darkgoldenrod": [184,134,11],
		"mediumorchid": [186,85,211],
		"rosybrown": [188,143,143],
		"darkkhaki": [189,183,107],
		"silver": [192,192,192],
		"mediumvioletred": [199,21,133],
		"indianred": [205,92,92],
		"peru": [205,133,63],
		"chocolate": [210,105,30],
		"tan": [210,180,140],
		"lightgray": [211,211,211],
		"lightgrey": [211,211,211],
		"palevioletred": [216,112,147],
		"thistle": [216,191,216],
		"orchid": [218,112,214],
		"goldenrod": [218,165,32],
		"crimson": [220,20,60],
		"gainsboro": [220,220,220],
		"plum": [221,160,221],
		"burlywood": [222,184,135],
		"lightcyan": [224,255,255],
		"lavender": [230,230,250],
		"darksalmon": [233,150,122],
		"violet": [238,130,238],
		"palegoldenrod": [238,232,170],
		"lightcoral": [240,128,128],
		"khaki": [240,230,140],
		"aliceblue": [240,248,255],
		"honeydew": [240,255,240],
		"azure": [240,255,255],
		"sandybrown": [244,164,96],
		"wheat": [245,222,179],
		"beige": [245,245,220],
		"whitesmoke": [245,245,245],
		"mintcream": [245,255,250],
		"ghostwhite": [248,248,255],
		"salmon": [250,128,114],
		"antiquewhite": [250,235,215],
		"linen": [250,240,230],
		"lightgoldenrodyellow": [250,250,210],
		"oldlace": [253,245,230],
		"red": [255,0,0],
		"fuchsia": [255,0,255],
		"magenta": [255,0,255],
		"deeppink": [255,20,147],
		"orangered": [255,69,0],
		"tomato": [255,99,71],
		"hotpink": [255,105,180],
		"coral": [255,127,80],
		"darkorange": [255,140,0],
		"lightsalmon": [255,160,122],
		"orange": [255,165,0],
		"lightpink": [255,182,193],
		"pink": [255,192,203],
		"gold": [255,215,0],
		"peachpuff": [255,218,185],
		"navajowhite": [255,222,173],
		"moccasin": [255,228,181],
		"bisque": [255,228,196],
		"mistyrose": [255,228,225],
		"blanchedalmond": [255,235,205],
		"papayawhip": [255,239,213],
		"lavenderblush": [255,240,245],
		"seashell": [255,245,238],
		"cornsilk": [255,248,220],
		"lemonchiffon": [255,250,205],
		"floralwhite": [255,250,240],
		"snow": [255,250,250],
		"yellow": [255,255,0],
		"lightyellow": [255,255,224],
		"ivory": [255,255,240],
		"white": [255,255,255]
	}
};
/**
 * @class Lighting computation, based on a traditional FOV for multiple light sources and multiple passes.
 * @param {function} reflectivityCallback Callback to retrieve cell reflectivity (0..1)
 * @param {object} [options]
 * @param {int} [options.passes=1] Number of passes. 1 equals to simple FOV of all light sources, >1 means a *highly simplified* radiosity-like algorithm.
 * @param {int} [options.emissionThreshold=100] Cells with emissivity > threshold will be treated as light source in the next pass.
 * @param {int} [options.range=10] Max light range
 */
ROT.Lighting = function(reflectivityCallback, options) {
	this._reflectivityCallback = reflectivityCallback;
	this._options = {
		passes: 1,
		emissionThreshold: 100,
		range: 10
	};
	this._fov = null;

	this._lights = {};
	this._reflectivityCache = {};
	this._fovCache = {};

	this.setOptions(options);
};

/**
 * Adjust options at runtime
 * @see ROT.Lighting
 * @param {object} [options]
 */
ROT.Lighting.prototype.setOptions = function(options) {
	for (var p in options) { this._options[p] = options[p]; }
	if (options && options.range) { this.reset(); }
	return this;
};

/**
 * Set the used Field-Of-View algo
 * @param {ROT.FOV} fov
 */
ROT.Lighting.prototype.setFOV = function(fov) {
	this._fov = fov;
	this._fovCache = {};
	return this;
};

/**
 * Set (or remove) a light source
 * @param {int} x
 * @param {int} y
 * @param {null || string || number[3]} color
 */
ROT.Lighting.prototype.setLight = function(x, y, color) {
  var key = x + "," + y;

  if (color) {
    this._lights[key] = (typeof(color) == "string" ? ROT.Color.fromString(color) : color);
  } else {
    delete this._lights[key];
  }
  return this;
};

/**
 * Remove all light sources
 */
ROT.Lighting.prototype.clearLights = function() {
    this._lights = {};
};

/**
 * Reset the pre-computed topology values. Call whenever the underlying map changes its light-passability.
 */
ROT.Lighting.prototype.reset = function() {
	this._reflectivityCache = {};
	this._fovCache = {};

	return this;
};

/**
 * Compute the lighting
 * @param {function} lightingCallback Will be called with (x, y, color) for every lit cell
 */
ROT.Lighting.prototype.compute = function(lightingCallback) {
	var doneCells = {};
	var emittingCells = {};
	var litCells = {};

	for (var key in this._lights) { /* prepare emitters for first pass */
		var light = this._lights[key];
		emittingCells[key] = [0, 0, 0];
		ROT.Color.add_(emittingCells[key], light);
	}

	for (var i=0;i<this._options.passes;i++) { /* main loop */
		this._emitLight(emittingCells, litCells, doneCells);
		if (i+1 == this._options.passes) { continue; } /* not for the last pass */
		emittingCells = this._computeEmitters(litCells, doneCells);
	}

	for (var litKey in litCells) { /* let the user know what and how is lit */
		var parts = litKey.split(",");
		var x = parseInt(parts[0]);
		var y = parseInt(parts[1]);
		lightingCallback(x, y, litCells[litKey]);
	}

	return this;
};

/**
 * Compute one iteration from all emitting cells
 * @param {object} emittingCells These emit light
 * @param {object} litCells Add projected light to these
 * @param {object} doneCells These already emitted, forbid them from further calculations
 */
ROT.Lighting.prototype._emitLight = function(emittingCells, litCells, doneCells) {
	for (var key in emittingCells) {
		var parts = key.split(",");
		var x = parseInt(parts[0]);
		var y = parseInt(parts[1]);
		this._emitLightFromCell(x, y, emittingCells[key], litCells);
		doneCells[key] = 1;
	}
	return this;
};

/**
 * Prepare a list of emitters for next pass
 * @param {object} litCells
 * @param {object} doneCells
 * @returns {object}
 */
ROT.Lighting.prototype._computeEmitters = function(litCells, doneCells) {
	var result = {};

	for (var key in litCells) {
		if (key in doneCells) { continue; } /* already emitted */

		var color = litCells[key];

		if (key in this._reflectivityCache) {
			var reflectivity = this._reflectivityCache[key];
		} else {
			var parts = key.split(",");
			var x = parseInt(parts[0]);
			var y = parseInt(parts[1]);
			var reflectivity = this._reflectivityCallback(x, y);
			this._reflectivityCache[key] = reflectivity;
		}

		if (reflectivity == 0) { continue; } /* will not reflect at all */

		/* compute emission color */
		var emission = [];
		var intensity = 0;
		for (var i=0;i<3;i++) {
			var part = Math.round(color[i]*reflectivity);
			emission[i] = part;
			intensity += part;
		}
		if (intensity > this._options.emissionThreshold) { result[key] = emission; }
	}

	return result;
};

/**
 * Compute one iteration from one cell
 * @param {int} x
 * @param {int} y
 * @param {number[]} color
 * @param {object} litCells Cell data to by updated
 */
ROT.Lighting.prototype._emitLightFromCell = function(x, y, color, litCells) {
	var key = x+","+y;
	if (key in this._fovCache) {
		var fov = this._fovCache[key];
	} else {
		var fov = this._updateFOV(x, y);
	}

	for (var fovKey in fov) {
		var formFactor = fov[fovKey];

		if (fovKey in litCells) { /* already lit */
			var result = litCells[fovKey];
		} else { /* newly lit */
			var result = [0, 0, 0];
			litCells[fovKey] = result;
		}

		for (var i=0;i<3;i++) { result[i] += Math.round(color[i]*formFactor); } /* add light color */
	}

	return this;
};

/**
 * Compute FOV ("form factor") for a potential light source at [x,y]
 * @param {int} x
 * @param {int} y
 * @returns {object}
 */
ROT.Lighting.prototype._updateFOV = function(x, y) {
	var key1 = x+","+y;
	var cache = {};
	this._fovCache[key1] = cache;
	var range = this._options.range;
	var cb = function(x, y, r, vis) {
		var key2 = x+","+y;
		var formFactor = vis * (1-r/range);
		if (formFactor == 0) { return; }
		cache[key2] = formFactor;
	};
	this._fov.compute(x, y, range, cb.bind(this));

	return cache;
};
/**
 * @class Abstract pathfinder
 * @param {int} toX Target X coord
 * @param {int} toY Target Y coord
 * @param {function} passableCallback Callback to determine map passability
 * @param {object} [options]
 * @param {int} [options.topology=8]
 */
ROT.Path = function(toX, toY, passableCallback, options) {
	this._toX = toX;
	this._toY = toY;
	this._fromX = null;
	this._fromY = null;
	this._passableCallback = passableCallback;
	this._options = {
		topology: 8
	};
	for (var p in options) { this._options[p] = options[p]; }

	this._dirs = ROT.DIRS[this._options.topology];
	if (this._options.topology == 8) { /* reorder dirs for more aesthetic result (vertical/horizontal first) */
		this._dirs = [
			this._dirs[0],
			this._dirs[2],
			this._dirs[4],
			this._dirs[6],
			this._dirs[1],
			this._dirs[3],
			this._dirs[5],
			this._dirs[7]
		]
	}
};

/**
 * Compute a path from a given point
 * @param {int} fromX
 * @param {int} fromY
 * @param {function} callback Will be called for every path item with arguments "x" and "y"
 */
ROT.Path.prototype.compute = function(fromX, fromY, callback) {
};

ROT.Path.prototype._getNeighbors = function(cx, cy) {
	var result = [];
	for (var i=0;i<this._dirs.length;i++) {
		var dir = this._dirs[i];
		var x = cx + dir[0];
		var y = cy + dir[1];
		
		if (!this._passableCallback(x, y)) { continue; }
		result.push([x, y]);
	}
	
	return result;
};
/**
 * @class Simplified Dijkstra's algorithm: all edges have a value of 1
 * @augments ROT.Path
 * @see ROT.Path
 */
ROT.Path.Dijkstra = function(toX, toY, passableCallback, options) {
	ROT.Path.call(this, toX, toY, passableCallback, options);

	this._computed = {};
	this._todo = [];
	this._add(toX, toY, null);
};
ROT.Path.Dijkstra.extend(ROT.Path);

/**
 * Compute a path from a given point
 * @see ROT.Path#compute
 */
ROT.Path.Dijkstra.prototype.compute = function(fromX, fromY, callback) {
	var key = fromX+","+fromY;
	if (!(key in this._computed)) { this._compute(fromX, fromY); }
	if (!(key in this._computed)) { return; }
	
	var item = this._computed[key];
	while (item) {
		callback(item.x, item.y);
		item = item.prev;
	}
};

/**
 * Compute a non-cached value
 */
ROT.Path.Dijkstra.prototype._compute = function(fromX, fromY) {
	while (this._todo.length) {
		var item = this._todo.shift();
		if (item.x == fromX && item.y == fromY) { return; }
		
		var neighbors = this._getNeighbors(item.x, item.y);
		
		for (var i=0;i<neighbors.length;i++) {
			var neighbor = neighbors[i];
			var x = neighbor[0];
			var y = neighbor[1];
			var id = x+","+y;
			if (id in this._computed) { continue; } /* already done */	
			this._add(x, y, item); 
		}
	}
};

ROT.Path.Dijkstra.prototype._add = function(x, y, prev) {
	var obj = {
		x: x,
		y: y,
		prev: prev
	};
	this._computed[x+","+y] = obj;
	this._todo.push(obj);
};
/**
 * @class Simplified A* algorithm: all edges have a value of 1
 * @augments ROT.Path
 * @see ROT.Path
 */
ROT.Path.AStar = function(toX, toY, passableCallback, options) {
	ROT.Path.call(this, toX, toY, passableCallback, options);

	this._todo = [];
	this._done = {};
	this._fromX = null;
	this._fromY = null;
};
ROT.Path.AStar.extend(ROT.Path);

/**
 * Compute a path from a given point
 * @see ROT.Path#compute
 */
ROT.Path.AStar.prototype.compute = function(fromX, fromY, callback) {
	this._todo = [];
	this._done = {};
	this._fromX = fromX;
	this._fromY = fromY;
	this._add(this._toX, this._toY, null);

	while (this._todo.length) {
		var item = this._todo.shift();
		var id = item.x+","+item.y;
		if (id in this._done) { continue; }
		this._done[id] = item;
		if (item.x == fromX && item.y == fromY) { break; }

		var neighbors = this._getNeighbors(item.x, item.y);

		for (var i=0;i<neighbors.length;i++) {
			var neighbor = neighbors[i];
			var x = neighbor[0];
			var y = neighbor[1];
			var id = x+","+y;
			if (id in this._done) { continue; }
			this._add(x, y, item); 
		}
	}
	
	var item = this._done[fromX+","+fromY];
	if (!item) { return; }
	
	while (item) {
		callback(item.x, item.y);
		item = item.prev;
	}
};

ROT.Path.AStar.prototype._add = function(x, y, prev) {
	var h = this._distance(x, y);
	var obj = {
		x: x,
		y: y,
		prev: prev,
		g: (prev ? prev.g+1 : 0),
		h: h
	};
	
	/* insert into priority queue */
	
	var f = obj.g + obj.h;
	for (var i=0;i<this._todo.length;i++) {
		var item = this._todo[i];
		var itemF = item.g + item.h;
		if (f < itemF || (f == itemF && h < item.h)) {
			this._todo.splice(i, 0, obj);
			return;
		}
	}
	
	this._todo.push(obj);
};

ROT.Path.AStar.prototype._distance = function(x, y) {
	switch (this._options.topology) {
		case 4:
			return (Math.abs(x-this._fromX) + Math.abs(y-this._fromY));
		break;

		case 6:
			var dx = Math.abs(x - this._fromX);
			var dy = Math.abs(y - this._fromY);
			return dy + Math.max(0, (dx-dy)/2);
		break;

		case 8: 
			return Math.max(Math.abs(x-this._fromX), Math.abs(y-this._fromY));
		break;
	}

        throw new Error("Illegal topology");
};
/**
 * @class Terminal backend
 * @private
 */
ROT.Display.Term = function(context) {
	ROT.Display.Backend.call(this, context);
	this._cx = -1;
	this._cy = -1;
	this._lastColor = "";
	this._options = {};
	this._ox = 0;
	this._oy = 0;
	this._termcolor = {};
}
ROT.Display.Term.extend(ROT.Display.Backend);

ROT.Display.Term.prototype.compute = function(options) {
	this._options = options;
	this._ox = Math.floor((process.stdout.columns - options.width) / 2);
	this._oy = Math.floor((process.stdout.rows - options.height) / 2);
	this._termcolor = new ROT.Display.Term[options.termColor.capitalize()](this._context);
	this._context._termcolor = this._termcolor;
}

ROT.Display.Term.prototype.draw = function(data, clearBefore) {
	// determine where to draw what with what colors
	var x = data[0];
	var y = data[1];
	var ch = data[2];
	var fg = data[3];
	var bg = data[4];

	// determine if we need to move the terminal cursor
	var dx = this._ox + x;
	var dy = this._oy + y;
	if (dx < 0 || dx >= process.stdout.columns) { return; }
	if (dy < 0 || dy >= process.stdout.rows) { return; }
	if (dx !== this._cx || dy !== this._cy) {
		process.stdout.write(this._termcolor.positionToAnsi(dx,dy));
		this._cx = dx;
		this._cy = dy;
	}

	// terminals automatically clear, but if we're clearing when we're
	// not otherwise provided with a character, just use a space instead
	if (clearBefore) {
		if (!ch) {
			ch = " ";
		}
	}
		
	// if we're not clearing and not provided with a character, do nothing
	if (!ch) { return; }

	// determine if we need to change colors
	var newColor = this._termcolor.colorToAnsi(fg,bg);
	if (newColor !== this._lastColor) {
		process.stdout.write(newColor);
		this._lastColor = newColor;
	}

	// write the provided symbol to the display
	var chars = [].concat(ch);
	process.stdout.write(chars[0]);

	// update our position, given that we wrote a character
	this._cx++;
	if (this._cx >= process.stdout.columns) {
		this._cx = 0;
		this._cy++;
	}
}

ROT.Display.Term.prototype.computeSize = function(availWidth, availHeight) {
	return [process.stdout.columns, process.stdout.rows];
}

ROT.Display.Term.prototype.computeFontSize = function(availWidth, availHeight) {
	return 12;
}

ROT.Display.Term.prototype.eventToPosition = function(x, y) {
	return [x,y]
}
/**
 * @class Abstract terminal code module
 * @private
 */
ROT.Display.Term.Color = function(context) {
	this._context = context;
}

ROT.Display.Term.Color.prototype.clearToAnsi = function(bg) {
}

ROT.Display.Term.Color.prototype.colorToAnsi = function(fg, bg) {
}

ROT.Display.Term.Color.prototype.positionToAnsi = function(x, y) {
}
/**
 * @class xterm terminal code module
 * @private
 */
ROT.Display.Term.Xterm = function(context) {
	ROT.Display.Term.Color.call(this, context);
}
ROT.Display.Term.Xterm.extend(ROT.Display.Term.Color);

ROT.Display.Term.Xterm.prototype.clearToAnsi = function(bg) {
	return "\x1b[0;48;5;"
		+ this._termcolor(bg)
		+ "m\x1b[2J";
}

ROT.Display.Term.Xterm.prototype.colorToAnsi = function(fg, bg) {
	return "\x1b[0;38;5;"
		+ this._termcolor(fg)
		+ ";48;5;"
		+ this._termcolor(bg)
		+ "m";
}

ROT.Display.Term.Xterm.prototype.positionToAnsi = function(x, y) {
	return "\x1b[" + (y+1) + ";" + (x+1) + "H";
}

ROT.Display.Term.Xterm.prototype._termcolor = function(color) {
	var SRC_COLORS = 256.0;
	var DST_COLORS = 6.0;
	var COLOR_RATIO = DST_COLORS / SRC_COLORS;
	var rgb = ROT.Color.fromString(color);
	var r = Math.floor(rgb[0] * COLOR_RATIO);
	var g = Math.floor(rgb[1] * COLOR_RATIO);
	var b = Math.floor(rgb[2] * COLOR_RATIO);
	return r*36 + g*6 + b*1 + 16;
}
/**
 * Export to Node.js module
 */
for (var p in ROT) {
	exports[p] = ROT[p];
}
  return ROT;
}));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("DuR2"), __webpack_require__("W2nU")))

/***/ }),

/***/ "mypn":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("DuR2"), __webpack_require__("W2nU")))

/***/ }),

/***/ "rjj0":
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__("tTVk")

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "tTVk":
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })

});
//# sourceMappingURL=vendor.06f192043756d8c54c3d.js.map