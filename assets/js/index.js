var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
/*!
 * Glide.js v3.6.0
 * (c) 2013-2022 Jędrzej Chałubek (https://github.com/jedrzejchalubek/)
 * Released under the MIT License.
 */
function _typeof(obj) {
  "@babel/helpers - typeof";
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function(obj2) {
      return typeof obj2;
    };
  } else {
    _typeof = function(obj2) {
      return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
    };
  }
  return _typeof(obj);
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null)
      break;
  }
  return object;
}
function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get2(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base)
        return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return _get.apply(this, arguments);
}
var defaults$1 = {
  /**
   * Type of the movement.
   *
   * Available types:
   * `slider` - Rewinds slider to the start/end when it reaches the first or last slide.
   * `carousel` - Changes slides without starting over when it reaches the first or last slide.
   *
   * @type {String}
   */
  type: "slider",
  /**
   * Start at specific slide number defined with zero-based index.
   *
   * @type {Number}
   */
  startAt: 0,
  /**
   * A number of slides visible on the single viewport.
   *
   * @type {Number}
   */
  perView: 1,
  /**
   * Focus currently active slide at a specified position in the track.
   *
   * Available inputs:
   * `center` - Current slide will be always focused at the center of a track.
   * `0,1,2,3...` - Current slide will be focused on the specified zero-based index.
   *
   * @type {String|Number}
   */
  focusAt: 0,
  /**
   * A size of the gap added between slides.
   *
   * @type {Number}
   */
  gap: 10,
  /**
   * Change slides after a specified interval. Use `false` for turning off autoplay.
   *
   * @type {Number|Boolean}
   */
  autoplay: false,
  /**
   * Stop autoplay on mouseover event.
   *
   * @type {Boolean}
   */
  hoverpause: true,
  /**
   * Allow for changing slides with left and right keyboard arrows.
   *
   * @type {Boolean}
   */
  keyboard: true,
  /**
   * Stop running `perView` number of slides from the end. Use this
   * option if you don't want to have an empty space after
   * a slider. Works only with `slider` type and a
   * non-centered `focusAt` setting.
   *
   * @type {Boolean}
   */
  bound: false,
  /**
   * Minimal swipe distance needed to change the slide. Use `false` for turning off a swiping.
   *
   * @type {Number|Boolean}
   */
  swipeThreshold: 80,
  /**
   * Minimal mouse drag distance needed to change the slide. Use `false` for turning off a dragging.
   *
   * @type {Number|Boolean}
   */
  dragThreshold: 120,
  /**
   * A number of slides moved on single swipe.
   *
   * Available types:
   * `` - Moves slider by one slide per swipe
   * `|` - Moves slider between views per swipe (number of slides defined in `perView` options)
   *
   * @type {String}
   */
  perSwipe: "",
  /**
   * Moving distance ratio of the slides on a swiping and dragging.
   *
   * @type {Number}
   */
  touchRatio: 0.5,
  /**
   * Angle required to activate slides moving on swiping or dragging.
   *
   * @type {Number}
   */
  touchAngle: 45,
  /**
   * Duration of the animation in milliseconds.
   *
   * @type {Number}
   */
  animationDuration: 400,
  /**
   * Allows looping the `slider` type. Slider will rewind to the first/last slide when it's at the start/end.
   *
   * @type {Boolean}
   */
  rewind: true,
  /**
   * Duration of the rewinding animation of the `slider` type in milliseconds.
   *
   * @type {Number}
   */
  rewindDuration: 800,
  /**
   * Easing function for the animation.
   *
   * @type {String}
   */
  animationTimingFunc: "cubic-bezier(.165, .840, .440, 1)",
  /**
   * Wait for the animation to finish until the next user input can be processed
   *
   * @type {boolean}
   */
  waitForTransition: true,
  /**
   * Throttle costly events at most once per every wait milliseconds.
   *
   * @type {Number}
   */
  throttle: 10,
  /**
   * Moving direction mode.
   *
   * Available inputs:
   * - 'ltr' - left to right movement,
   * - 'rtl' - right to left movement.
   *
   * @type {String}
   */
  direction: "ltr",
  /**
   * The distance value of the next and previous viewports which
   * have to peek in the current view. Accepts number and
   * pixels as a string. Left and right peeking can be
   * set up separately with a directions object.
   *
   * For example:
   * `100` - Peek 100px on the both sides.
   * { before: 100, after: 50 }` - Peek 100px on the left side and 50px on the right side.
   *
   * @type {Number|String|Object}
   */
  peek: 0,
  /**
   * Defines how many clones of current viewport will be generated.
   *
   * @type {Number}
   */
  cloningRatio: 1,
  /**
   * Collection of options applied at specified media breakpoints.
   * For example: display two slides per view under 800px.
   * `{
   *   '800px': {
   *     perView: 2
   *   }
   * }`
   */
  breakpoints: {},
  /**
   * Collection of internally used HTML classes.
   *
   * @todo Refactor `slider` and `carousel` properties to single `type: { slider: '', carousel: '' }` object
   * @type {Object}
   */
  classes: {
    swipeable: "glide--swipeable",
    dragging: "glide--dragging",
    direction: {
      ltr: "glide--ltr",
      rtl: "glide--rtl"
    },
    type: {
      slider: "glide--slider",
      carousel: "glide--carousel"
    },
    slide: {
      clone: "glide__slide--clone",
      active: "glide__slide--active"
    },
    arrow: {
      disabled: "glide__arrow--disabled"
    },
    nav: {
      active: "glide__bullet--active"
    }
  }
};
function warn(msg) {
  console.error("[Glide warn]: ".concat(msg));
}
function toInt(value) {
  return parseInt(value);
}
function toFloat(value) {
  return parseFloat(value);
}
function isString$1(value) {
  return typeof value === "string";
}
function isObject(value) {
  var type = _typeof(value);
  return type === "function" || type === "object" && !!value;
}
function isFunction$1(value) {
  return typeof value === "function";
}
function isUndefined(value) {
  return typeof value === "undefined";
}
function isArray(value) {
  return value.constructor === Array;
}
function mount(glide, extensions, events) {
  var components = {};
  for (var name in extensions) {
    if (isFunction$1(extensions[name])) {
      components[name] = extensions[name](glide, components, events);
    } else {
      warn("Extension must be a function");
    }
  }
  for (var _name in components) {
    if (isFunction$1(components[_name].mount)) {
      components[_name].mount();
    }
  }
  return components;
}
function define(obj, prop, definition) {
  Object.defineProperty(obj, prop, definition);
}
function sortKeys(obj) {
  return Object.keys(obj).sort().reduce(function(r, k) {
    r[k] = obj[k];
    return r[k], r;
  }, {});
}
function mergeOptions(defaults2, settings) {
  var options = Object.assign({}, defaults2, settings);
  if (settings.hasOwnProperty("classes")) {
    options.classes = Object.assign({}, defaults2.classes, settings.classes);
    if (settings.classes.hasOwnProperty("direction")) {
      options.classes.direction = Object.assign({}, defaults2.classes.direction, settings.classes.direction);
    }
    if (settings.classes.hasOwnProperty("type")) {
      options.classes.type = Object.assign({}, defaults2.classes.type, settings.classes.type);
    }
    if (settings.classes.hasOwnProperty("slide")) {
      options.classes.slide = Object.assign({}, defaults2.classes.slide, settings.classes.slide);
    }
    if (settings.classes.hasOwnProperty("arrow")) {
      options.classes.arrow = Object.assign({}, defaults2.classes.arrow, settings.classes.arrow);
    }
    if (settings.classes.hasOwnProperty("nav")) {
      options.classes.nav = Object.assign({}, defaults2.classes.nav, settings.classes.nav);
    }
  }
  if (settings.hasOwnProperty("breakpoints")) {
    options.breakpoints = Object.assign({}, defaults2.breakpoints, settings.breakpoints);
  }
  return options;
}
var EventsBus = /* @__PURE__ */ function() {
  function EventsBus2() {
    var events = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _classCallCheck(this, EventsBus2);
    this.events = events;
    this.hop = events.hasOwnProperty;
  }
  _createClass(EventsBus2, [{
    key: "on",
    value: function on(event, handler) {
      if (isArray(event)) {
        for (var i = 0; i < event.length; i++) {
          this.on(event[i], handler);
        }
        return;
      }
      if (!this.hop.call(this.events, event)) {
        this.events[event] = [];
      }
      var index = this.events[event].push(handler) - 1;
      return {
        remove: function remove() {
          delete this.events[event][index];
        }
      };
    }
    /**
     * Runs registered handlers for specified event.
     *
     * @param {String|Array} event
     * @param {Object=} context
     */
  }, {
    key: "emit",
    value: function emit(event, context) {
      if (isArray(event)) {
        for (var i = 0; i < event.length; i++) {
          this.emit(event[i], context);
        }
        return;
      }
      if (!this.hop.call(this.events, event)) {
        return;
      }
      this.events[event].forEach(function(item) {
        item(context || {});
      });
    }
  }]);
  return EventsBus2;
}();
var Glide$1 = /* @__PURE__ */ function() {
  function Glide2(selector) {
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    _classCallCheck(this, Glide2);
    this._c = {};
    this._t = [];
    this._e = new EventsBus();
    this.disabled = false;
    this.selector = selector;
    this.settings = mergeOptions(defaults$1, options);
    this.index = this.settings.startAt;
  }
  _createClass(Glide2, [{
    key: "mount",
    value: function mount$1() {
      var extensions = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      this._e.emit("mount.before");
      if (isObject(extensions)) {
        this._c = mount(this, extensions, this._e);
      } else {
        warn("You need to provide a object on `mount()`");
      }
      this._e.emit("mount.after");
      return this;
    }
    /**
     * Collects an instance `translate` transformers.
     *
     * @param  {Array} transformers Collection of transformers.
     * @return {Void}
     */
  }, {
    key: "mutate",
    value: function mutate() {
      var transformers = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      if (isArray(transformers)) {
        this._t = transformers;
      } else {
        warn("You need to provide a array on `mutate()`");
      }
      return this;
    }
    /**
     * Updates glide with specified settings.
     *
     * @param {Object} settings
     * @return {Glide}
     */
  }, {
    key: "update",
    value: function update() {
      var settings = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      this.settings = mergeOptions(this.settings, settings);
      if (settings.hasOwnProperty("startAt")) {
        this.index = settings.startAt;
      }
      this._e.emit("update");
      return this;
    }
    /**
     * Change slide with specified pattern. A pattern must be in the special format:
     * `>` - Move one forward
     * `<` - Move one backward
     * `={i}` - Go to {i} zero-based slide (eq. '=1', will go to second slide)
     * `>>` - Rewinds to end (last slide)
     * `<<` - Rewinds to start (first slide)
     * `|>` - Move one viewport forward
     * `|<` - Move one viewport backward
     *
     * @param {String} pattern
     * @return {Glide}
     */
  }, {
    key: "go",
    value: function go(pattern) {
      this._c.Run.make(pattern);
      return this;
    }
    /**
     * Move track by specified distance.
     *
     * @param {String} distance
     * @return {Glide}
     */
  }, {
    key: "move",
    value: function move(distance) {
      this._c.Transition.disable();
      this._c.Move.make(distance);
      return this;
    }
    /**
     * Destroy instance and revert all changes done by this._c.
     *
     * @return {Glide}
     */
  }, {
    key: "destroy",
    value: function destroy() {
      this._e.emit("destroy");
      return this;
    }
    /**
     * Start instance autoplaying.
     *
     * @param {Boolean|Number} interval Run autoplaying with passed interval regardless of `autoplay` settings
     * @return {Glide}
     */
  }, {
    key: "play",
    value: function play() {
      var interval = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
      if (interval) {
        this.settings.autoplay = interval;
      }
      this._e.emit("play");
      return this;
    }
    /**
     * Stop instance autoplaying.
     *
     * @return {Glide}
     */
  }, {
    key: "pause",
    value: function pause() {
      this._e.emit("pause");
      return this;
    }
    /**
     * Sets glide into a idle status.
     *
     * @return {Glide}
     */
  }, {
    key: "disable",
    value: function disable() {
      this.disabled = true;
      return this;
    }
    /**
     * Sets glide into a active status.
     *
     * @return {Glide}
     */
  }, {
    key: "enable",
    value: function enable() {
      this.disabled = false;
      return this;
    }
    /**
     * Adds cuutom event listener with handler.
     *
     * @param  {String|Array} event
     * @param  {Function} handler
     * @return {Glide}
     */
  }, {
    key: "on",
    value: function on(event, handler) {
      this._e.on(event, handler);
      return this;
    }
    /**
     * Checks if glide is a precised type.
     *
     * @param  {String} name
     * @return {Boolean}
     */
  }, {
    key: "isType",
    value: function isType(name) {
      return this.settings.type === name;
    }
    /**
     * Gets value of the core options.
     *
     * @return {Object}
     */
  }, {
    key: "settings",
    get: function get() {
      return this._o;
    },
    set: function set(o) {
      if (isObject(o)) {
        this._o = o;
      } else {
        warn("Options must be an `object` instance.");
      }
    }
    /**
     * Gets current index of the slider.
     *
     * @return {Object}
     */
  }, {
    key: "index",
    get: function get() {
      return this._i;
    },
    set: function set(i) {
      this._i = toInt(i);
    }
    /**
     * Gets type name of the slider.
     *
     * @return {String}
     */
  }, {
    key: "type",
    get: function get() {
      return this.settings.type;
    }
    /**
     * Gets value of the idle status.
     *
     * @return {Boolean}
     */
  }, {
    key: "disabled",
    get: function get() {
      return this._d;
    },
    set: function set(status) {
      this._d = !!status;
    }
  }]);
  return Glide2;
}();
function Run(Glide2, Components, Events) {
  var Run2 = {
    /**
     * Initializes autorunning of the glide.
     *
     * @return {Void}
     */
    mount: function mount2() {
      this._o = false;
    },
    /**
     * Makes glides running based on the passed moving schema.
     *
     * @param {String} move
     */
    make: function make(move) {
      var _this = this;
      if (!Glide2.disabled) {
        !Glide2.settings.waitForTransition || Glide2.disable();
        this.move = move;
        Events.emit("run.before", this.move);
        this.calculate();
        Events.emit("run", this.move);
        Components.Transition.after(function() {
          if (_this.isStart()) {
            Events.emit("run.start", _this.move);
          }
          if (_this.isEnd()) {
            Events.emit("run.end", _this.move);
          }
          if (_this.isOffset()) {
            _this._o = false;
            Events.emit("run.offset", _this.move);
          }
          Events.emit("run.after", _this.move);
          Glide2.enable();
        });
      }
    },
    /**
     * Calculates current index based on defined move.
     *
     * @return {Number|Undefined}
     */
    calculate: function calculate() {
      var move = this.move, length = this.length;
      var steps2 = move.steps, direction = move.direction;
      var viewSize = 1;
      if (direction === "=") {
        if (Glide2.settings.bound && toInt(steps2) > length) {
          Glide2.index = length;
          return;
        }
        Glide2.index = steps2;
        return;
      }
      if (direction === ">" && steps2 === ">") {
        Glide2.index = length;
        return;
      }
      if (direction === "<" && steps2 === "<") {
        Glide2.index = 0;
        return;
      }
      if (direction === "|") {
        viewSize = Glide2.settings.perView || 1;
      }
      if (direction === ">" || direction === "|" && steps2 === ">") {
        var index = calculateForwardIndex(viewSize);
        if (index > length) {
          this._o = true;
        }
        Glide2.index = normalizeForwardIndex(index, viewSize);
        return;
      }
      if (direction === "<" || direction === "|" && steps2 === "<") {
        var _index = calculateBackwardIndex(viewSize);
        if (_index < 0) {
          this._o = true;
        }
        Glide2.index = normalizeBackwardIndex(_index, viewSize);
        return;
      }
      warn("Invalid direction pattern [".concat(direction).concat(steps2, "] has been used"));
    },
    /**
     * Checks if we are on the first slide.
     *
     * @return {Boolean}
     */
    isStart: function isStart() {
      return Glide2.index <= 0;
    },
    /**
     * Checks if we are on the last slide.
     *
     * @return {Boolean}
     */
    isEnd: function isEnd() {
      return Glide2.index >= this.length;
    },
    /**
     * Checks if we are making a offset run.
     *
     * @param {String} direction
     * @return {Boolean}
     */
    isOffset: function isOffset() {
      var direction = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : void 0;
      if (!direction) {
        return this._o;
      }
      if (!this._o) {
        return false;
      }
      if (direction === "|>") {
        return this.move.direction === "|" && this.move.steps === ">";
      }
      if (direction === "|<") {
        return this.move.direction === "|" && this.move.steps === "<";
      }
      return this.move.direction === direction;
    },
    /**
     * Checks if bound mode is active
     *
     * @return {Boolean}
     */
    isBound: function isBound() {
      return Glide2.isType("slider") && Glide2.settings.focusAt !== "center" && Glide2.settings.bound;
    }
  };
  function calculateForwardIndex(viewSize) {
    var index = Glide2.index;
    if (Glide2.isType("carousel")) {
      return index + viewSize;
    }
    return index + (viewSize - index % viewSize);
  }
  function normalizeForwardIndex(index, viewSize) {
    var length = Run2.length;
    if (index <= length) {
      return index;
    }
    if (Glide2.isType("carousel")) {
      return index - (length + 1);
    }
    if (Glide2.settings.rewind) {
      if (Run2.isBound() && !Run2.isEnd()) {
        return length;
      }
      return 0;
    }
    if (Run2.isBound()) {
      return length;
    }
    return Math.floor(length / viewSize) * viewSize;
  }
  function calculateBackwardIndex(viewSize) {
    var index = Glide2.index;
    if (Glide2.isType("carousel")) {
      return index - viewSize;
    }
    var view = Math.ceil(index / viewSize);
    return (view - 1) * viewSize;
  }
  function normalizeBackwardIndex(index, viewSize) {
    var length = Run2.length;
    if (index >= 0) {
      return index;
    }
    if (Glide2.isType("carousel")) {
      return index + (length + 1);
    }
    if (Glide2.settings.rewind) {
      if (Run2.isBound() && Run2.isStart()) {
        return length;
      }
      return Math.floor(length / viewSize) * viewSize;
    }
    return 0;
  }
  define(Run2, "move", {
    /**
     * Gets value of the move schema.
     *
     * @returns {Object}
     */
    get: function get() {
      return this._m;
    },
    /**
     * Sets value of the move schema.
     *
     * @returns {Object}
     */
    set: function set(value) {
      var step = value.substr(1);
      this._m = {
        direction: value.substr(0, 1),
        steps: step ? toInt(step) ? toInt(step) : step : 0
      };
    }
  });
  define(Run2, "length", {
    /**
     * Gets value of the running distance based
     * on zero-indexing number of slides.
     *
     * @return {Number}
     */
    get: function get() {
      var settings = Glide2.settings;
      var length = Components.Html.slides.length;
      if (this.isBound()) {
        return length - 1 - (toInt(settings.perView) - 1) + toInt(settings.focusAt);
      }
      return length - 1;
    }
  });
  define(Run2, "offset", {
    /**
     * Gets status of the offsetting flag.
     *
     * @return {Boolean}
     */
    get: function get() {
      return this._o;
    }
  });
  return Run2;
}
function now() {
  return (/* @__PURE__ */ new Date()).getTime();
}
function throttle(func, wait, options) {
  var timeout, context, args, result;
  var previous = 0;
  if (!options)
    options = {};
  var later = function later2() {
    previous = options.leading === false ? 0 : now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout)
      context = args = null;
  };
  var throttled = function throttled2() {
    var at = now();
    if (!previous && options.leading === false)
      previous = at;
    var remaining = wait - (at - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = at;
      result = func.apply(context, args);
      if (!timeout)
        context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
  throttled.cancel = function() {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };
  return throttled;
}
var MARGIN_TYPE = {
  ltr: ["marginLeft", "marginRight"],
  rtl: ["marginRight", "marginLeft"]
};
function Gaps(Glide2, Components, Events) {
  var Gaps2 = {
    /**
     * Applies gaps between slides. First and last
     * slides do not receive it's edge margins.
     *
     * @param {HTMLCollection} slides
     * @return {Void}
     */
    apply: function apply(slides) {
      for (var i = 0, len = slides.length; i < len; i++) {
        var style2 = slides[i].style;
        var direction = Components.Direction.value;
        if (i !== 0) {
          style2[MARGIN_TYPE[direction][0]] = "".concat(this.value / 2, "px");
        } else {
          style2[MARGIN_TYPE[direction][0]] = "";
        }
        if (i !== slides.length - 1) {
          style2[MARGIN_TYPE[direction][1]] = "".concat(this.value / 2, "px");
        } else {
          style2[MARGIN_TYPE[direction][1]] = "";
        }
      }
    },
    /**
     * Removes gaps from the slides.
     *
     * @param {HTMLCollection} slides
     * @returns {Void}
    */
    remove: function remove(slides) {
      for (var i = 0, len = slides.length; i < len; i++) {
        var style2 = slides[i].style;
        style2.marginLeft = "";
        style2.marginRight = "";
      }
    }
  };
  define(Gaps2, "value", {
    /**
     * Gets value of the gap.
     *
     * @returns {Number}
     */
    get: function get() {
      return toInt(Glide2.settings.gap);
    }
  });
  define(Gaps2, "grow", {
    /**
     * Gets additional dimensions value caused by gaps.
     * Used to increase width of the slides wrapper.
     *
     * @returns {Number}
     */
    get: function get() {
      return Gaps2.value * Components.Sizes.length;
    }
  });
  define(Gaps2, "reductor", {
    /**
     * Gets reduction value caused by gaps.
     * Used to subtract width of the slides.
     *
     * @returns {Number}
     */
    get: function get() {
      var perView = Glide2.settings.perView;
      return Gaps2.value * (perView - 1) / perView;
    }
  });
  Events.on(["build.after", "update"], throttle(function() {
    Gaps2.apply(Components.Html.wrapper.children);
  }, 30));
  Events.on("destroy", function() {
    Gaps2.remove(Components.Html.wrapper.children);
  });
  return Gaps2;
}
function siblings(node) {
  if (node && node.parentNode) {
    var n = node.parentNode.firstChild;
    var matched = [];
    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== node) {
        matched.push(n);
      }
    }
    return matched;
  }
  return [];
}
function exist(node) {
  if (node && node instanceof window.HTMLElement) {
    return true;
  }
  return false;
}
function toArray(nodeList) {
  return Array.prototype.slice.call(nodeList);
}
var TRACK_SELECTOR = '[data-glide-el="track"]';
function Html(Glide2, Components, Events) {
  var Html2 = {
    /**
     * Setup slider HTML nodes.
     *
     * @param {Glide} glide
     */
    mount: function mount2() {
      this.root = Glide2.selector;
      this.track = this.root.querySelector(TRACK_SELECTOR);
      this.collectSlides();
    },
    /**
     * Collect slides
     */
    collectSlides: function collectSlides() {
      this.slides = toArray(this.wrapper.children).filter(function(slide) {
        return !slide.classList.contains(Glide2.settings.classes.slide.clone);
      });
    }
  };
  define(Html2, "root", {
    /**
     * Gets node of the glide main element.
     *
     * @return {Object}
     */
    get: function get() {
      return Html2._r;
    },
    /**
     * Sets node of the glide main element.
     *
     * @return {Object}
     */
    set: function set(r) {
      if (isString$1(r)) {
        r = document.querySelector(r);
      }
      if (exist(r)) {
        Html2._r = r;
      } else {
        warn("Root element must be a existing Html node");
      }
    }
  });
  define(Html2, "track", {
    /**
     * Gets node of the glide track with slides.
     *
     * @return {Object}
     */
    get: function get() {
      return Html2._t;
    },
    /**
     * Sets node of the glide track with slides.
     *
     * @return {Object}
     */
    set: function set(t) {
      if (exist(t)) {
        Html2._t = t;
      } else {
        warn("Could not find track element. Please use ".concat(TRACK_SELECTOR, " attribute."));
      }
    }
  });
  define(Html2, "wrapper", {
    /**
     * Gets node of the slides wrapper.
     *
     * @return {Object}
     */
    get: function get() {
      return Html2.track.children[0];
    }
  });
  Events.on("update", function() {
    Html2.collectSlides();
  });
  return Html2;
}
function Peek(Glide2, Components, Events) {
  var Peek2 = {
    /**
     * Setups how much to peek based on settings.
     *
     * @return {Void}
     */
    mount: function mount2() {
      this.value = Glide2.settings.peek;
    }
  };
  define(Peek2, "value", {
    /**
     * Gets value of the peek.
     *
     * @returns {Number|Object}
     */
    get: function get() {
      return Peek2._v;
    },
    /**
     * Sets value of the peek.
     *
     * @param {Number|Object} value
     * @return {Void}
     */
    set: function set(value) {
      if (isObject(value)) {
        value.before = toInt(value.before);
        value.after = toInt(value.after);
      } else {
        value = toInt(value);
      }
      Peek2._v = value;
    }
  });
  define(Peek2, "reductor", {
    /**
     * Gets reduction value caused by peek.
     *
     * @returns {Number}
     */
    get: function get() {
      var value = Peek2.value;
      var perView = Glide2.settings.perView;
      if (isObject(value)) {
        return value.before / perView + value.after / perView;
      }
      return value * 2 / perView;
    }
  });
  Events.on(["resize", "update"], function() {
    Peek2.mount();
  });
  return Peek2;
}
function Move(Glide2, Components, Events) {
  var Move2 = {
    /**
     * Constructs move component.
     *
     * @returns {Void}
     */
    mount: function mount2() {
      this._o = 0;
    },
    /**
     * Calculates a movement value based on passed offset and currently active index.
     *
     * @param  {Number} offset
     * @return {Void}
     */
    make: function make() {
      var _this = this;
      var offset = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
      this.offset = offset;
      Events.emit("move", {
        movement: this.value
      });
      Components.Transition.after(function() {
        Events.emit("move.after", {
          movement: _this.value
        });
      });
    }
  };
  define(Move2, "offset", {
    /**
     * Gets an offset value used to modify current translate.
     *
     * @return {Object}
     */
    get: function get() {
      return Move2._o;
    },
    /**
     * Sets an offset value used to modify current translate.
     *
     * @return {Object}
     */
    set: function set(value) {
      Move2._o = !isUndefined(value) ? toInt(value) : 0;
    }
  });
  define(Move2, "translate", {
    /**
     * Gets a raw movement value.
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Sizes.slideWidth * Glide2.index;
    }
  });
  define(Move2, "value", {
    /**
     * Gets an actual movement value corrected by offset.
     *
     * @return {Number}
     */
    get: function get() {
      var offset = this.offset;
      var translate = this.translate;
      if (Components.Direction.is("rtl")) {
        return translate + offset;
      }
      return translate - offset;
    }
  });
  Events.on(["build.before", "run"], function() {
    Move2.make();
  });
  return Move2;
}
function Sizes(Glide2, Components, Events) {
  var Sizes2 = {
    /**
     * Setups dimensions of slides.
     *
     * @return {Void}
     */
    setupSlides: function setupSlides() {
      var width = "".concat(this.slideWidth, "px");
      var slides = Components.Html.slides;
      for (var i = 0; i < slides.length; i++) {
        slides[i].style.width = width;
      }
    },
    /**
     * Setups dimensions of slides wrapper.
     *
     * @return {Void}
     */
    setupWrapper: function setupWrapper() {
      Components.Html.wrapper.style.width = "".concat(this.wrapperSize, "px");
    },
    /**
     * Removes applied styles from HTML elements.
     *
     * @returns {Void}
     */
    remove: function remove() {
      var slides = Components.Html.slides;
      for (var i = 0; i < slides.length; i++) {
        slides[i].style.width = "";
      }
      Components.Html.wrapper.style.width = "";
    }
  };
  define(Sizes2, "length", {
    /**
     * Gets count number of the slides.
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Html.slides.length;
    }
  });
  define(Sizes2, "width", {
    /**
     * Gets width value of the slider (visible area).
     *
     * @return {Number}
     */
    get: function get() {
      return Components.Html.track.offsetWidth;
    }
  });
  define(Sizes2, "wrapperSize", {
    /**
     * Gets size of the slides wrapper.
     *
     * @return {Number}
     */
    get: function get() {
      return Sizes2.slideWidth * Sizes2.length + Components.Gaps.grow + Components.Clones.grow;
    }
  });
  define(Sizes2, "slideWidth", {
    /**
     * Gets width value of a single slide.
     *
     * @return {Number}
     */
    get: function get() {
      return Sizes2.width / Glide2.settings.perView - Components.Peek.reductor - Components.Gaps.reductor;
    }
  });
  Events.on(["build.before", "resize", "update"], function() {
    Sizes2.setupSlides();
    Sizes2.setupWrapper();
  });
  Events.on("destroy", function() {
    Sizes2.remove();
  });
  return Sizes2;
}
function Build(Glide2, Components, Events) {
  var Build2 = {
    /**
     * Init glide building. Adds classes, sets
     * dimensions and setups initial state.
     *
     * @return {Void}
     */
    mount: function mount2() {
      Events.emit("build.before");
      this.typeClass();
      this.activeClass();
      Events.emit("build.after");
    },
    /**
     * Adds `type` class to the glide element.
     *
     * @return {Void}
     */
    typeClass: function typeClass() {
      Components.Html.root.classList.add(Glide2.settings.classes.type[Glide2.settings.type]);
    },
    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    activeClass: function activeClass() {
      var classes = Glide2.settings.classes;
      var slide = Components.Html.slides[Glide2.index];
      if (slide) {
        slide.classList.add(classes.slide.active);
        siblings(slide).forEach(function(sibling) {
          sibling.classList.remove(classes.slide.active);
        });
      }
    },
    /**
     * Removes HTML classes applied at building.
     *
     * @return {Void}
     */
    removeClasses: function removeClasses() {
      var _Glide$settings$class = Glide2.settings.classes, type = _Glide$settings$class.type, slide = _Glide$settings$class.slide;
      Components.Html.root.classList.remove(type[Glide2.settings.type]);
      Components.Html.slides.forEach(function(sibling) {
        sibling.classList.remove(slide.active);
      });
    }
  };
  Events.on(["destroy", "update"], function() {
    Build2.removeClasses();
  });
  Events.on(["resize", "update"], function() {
    Build2.mount();
  });
  Events.on("move.after", function() {
    Build2.activeClass();
  });
  return Build2;
}
function Clones(Glide2, Components, Events) {
  var Clones2 = {
    /**
     * Create pattern map and collect slides to be cloned.
     */
    mount: function mount2() {
      this.items = [];
      if (Glide2.isType("carousel")) {
        this.items = this.collect();
      }
    },
    /**
     * Collect clones with pattern.
     *
     * @return {[]}
     */
    collect: function collect() {
      var items = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
      var slides = Components.Html.slides;
      var _Glide$settings = Glide2.settings, perView = _Glide$settings.perView, classes = _Glide$settings.classes, cloningRatio = _Glide$settings.cloningRatio;
      if (slides.length !== 0) {
        var peekIncrementer = +!!Glide2.settings.peek;
        var cloneCount = perView + peekIncrementer + Math.round(perView / 2);
        var append = slides.slice(0, cloneCount).reverse();
        var prepend = slides.slice(cloneCount * -1);
        for (var r = 0; r < Math.max(cloningRatio, Math.floor(perView / slides.length)); r++) {
          for (var i = 0; i < append.length; i++) {
            var clone = append[i].cloneNode(true);
            clone.classList.add(classes.slide.clone);
            items.push(clone);
          }
          for (var _i = 0; _i < prepend.length; _i++) {
            var _clone = prepend[_i].cloneNode(true);
            _clone.classList.add(classes.slide.clone);
            items.unshift(_clone);
          }
        }
      }
      return items;
    },
    /**
     * Append cloned slides with generated pattern.
     *
     * @return {Void}
     */
    append: function append() {
      var items = this.items;
      var _Components$Html = Components.Html, wrapper = _Components$Html.wrapper, slides = _Components$Html.slides;
      var half = Math.floor(items.length / 2);
      var prepend = items.slice(0, half).reverse();
      var append2 = items.slice(half * -1).reverse();
      var width = "".concat(Components.Sizes.slideWidth, "px");
      for (var i = 0; i < append2.length; i++) {
        wrapper.appendChild(append2[i]);
      }
      for (var _i2 = 0; _i2 < prepend.length; _i2++) {
        wrapper.insertBefore(prepend[_i2], slides[0]);
      }
      for (var _i3 = 0; _i3 < items.length; _i3++) {
        items[_i3].style.width = width;
      }
    },
    /**
     * Remove all cloned slides.
     *
     * @return {Void}
     */
    remove: function remove() {
      var items = this.items;
      for (var i = 0; i < items.length; i++) {
        Components.Html.wrapper.removeChild(items[i]);
      }
    }
  };
  define(Clones2, "grow", {
    /**
     * Gets additional dimensions value caused by clones.
     *
     * @return {Number}
     */
    get: function get() {
      return (Components.Sizes.slideWidth + Components.Gaps.value) * Clones2.items.length;
    }
  });
  Events.on("update", function() {
    Clones2.remove();
    Clones2.mount();
    Clones2.append();
  });
  Events.on("build.before", function() {
    if (Glide2.isType("carousel")) {
      Clones2.append();
    }
  });
  Events.on("destroy", function() {
    Clones2.remove();
  });
  return Clones2;
}
var EventsBinder = /* @__PURE__ */ function() {
  function EventsBinder2() {
    var listeners = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    _classCallCheck(this, EventsBinder2);
    this.listeners = listeners;
  }
  _createClass(EventsBinder2, [{
    key: "on",
    value: function on(events, el, closure) {
      var capture = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
      if (isString$1(events)) {
        events = [events];
      }
      for (var i = 0; i < events.length; i++) {
        this.listeners[events[i]] = closure;
        el.addEventListener(events[i], this.listeners[events[i]], capture);
      }
    }
    /**
     * Removes event listeners from arrows HTML elements.
     *
     * @param  {String|Array} events
     * @param  {Element|Window|Document} el
     * @param  {Boolean|Object} capture
     * @return {Void}
     */
  }, {
    key: "off",
    value: function off(events, el) {
      var capture = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      if (isString$1(events)) {
        events = [events];
      }
      for (var i = 0; i < events.length; i++) {
        el.removeEventListener(events[i], this.listeners[events[i]], capture);
      }
    }
    /**
     * Destroy collected listeners.
     *
     * @returns {Void}
     */
  }, {
    key: "destroy",
    value: function destroy() {
      delete this.listeners;
    }
  }]);
  return EventsBinder2;
}();
function Resize(Glide2, Components, Events) {
  var Binder = new EventsBinder();
  var Resize2 = {
    /**
     * Initializes window bindings.
     */
    mount: function mount2() {
      this.bind();
    },
    /**
     * Binds `rezsize` listener to the window.
     * It's a costly event, so we are debouncing it.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on("resize", window, throttle(function() {
        Events.emit("resize");
      }, Glide2.settings.throttle));
    },
    /**
     * Unbinds listeners from the window.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off("resize", window);
    }
  };
  Events.on("destroy", function() {
    Resize2.unbind();
    Binder.destroy();
  });
  return Resize2;
}
var VALID_DIRECTIONS = ["ltr", "rtl"];
var FLIPED_MOVEMENTS = {
  ">": "<",
  "<": ">",
  "=": "="
};
function Direction(Glide2, Components, Events) {
  var Direction2 = {
    /**
     * Setups gap value based on settings.
     *
     * @return {Void}
     */
    mount: function mount2() {
      this.value = Glide2.settings.direction;
    },
    /**
     * Resolves pattern based on direction value
     *
     * @param {String} pattern
     * @returns {String}
     */
    resolve: function resolve(pattern) {
      var token = pattern.slice(0, 1);
      if (this.is("rtl")) {
        return pattern.split(token).join(FLIPED_MOVEMENTS[token]);
      }
      return pattern;
    },
    /**
     * Checks value of direction mode.
     *
     * @param {String} direction
     * @returns {Boolean}
     */
    is: function is(direction) {
      return this.value === direction;
    },
    /**
     * Applies direction class to the root HTML element.
     *
     * @return {Void}
     */
    addClass: function addClass() {
      Components.Html.root.classList.add(Glide2.settings.classes.direction[this.value]);
    },
    /**
     * Removes direction class from the root HTML element.
     *
     * @return {Void}
     */
    removeClass: function removeClass() {
      Components.Html.root.classList.remove(Glide2.settings.classes.direction[this.value]);
    }
  };
  define(Direction2, "value", {
    /**
     * Gets value of the direction.
     *
     * @returns {Number}
     */
    get: function get() {
      return Direction2._v;
    },
    /**
     * Sets value of the direction.
     *
     * @param {String} value
     * @return {Void}
     */
    set: function set(value) {
      if (VALID_DIRECTIONS.indexOf(value) > -1) {
        Direction2._v = value;
      } else {
        warn("Direction value must be `ltr` or `rtl`");
      }
    }
  });
  Events.on(["destroy", "update"], function() {
    Direction2.removeClass();
  });
  Events.on("update", function() {
    Direction2.mount();
  });
  Events.on(["build.before", "update"], function() {
    Direction2.addClass();
  });
  return Direction2;
}
function Rtl(Glide2, Components) {
  return {
    /**
     * Negates the passed translate if glide is in RTL option.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      if (Components.Direction.is("rtl")) {
        return -translate;
      }
      return translate;
    }
  };
}
function Gap(Glide2, Components) {
  return {
    /**
     * Modifies passed translate value with number in the `gap` settings.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      var multiplier = Math.floor(translate / Components.Sizes.slideWidth);
      return translate + Components.Gaps.value * multiplier;
    }
  };
}
function Grow(Glide2, Components) {
  return {
    /**
     * Adds to the passed translate width of the half of clones.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      return translate + Components.Clones.grow / 2;
    }
  };
}
function Peeking(Glide2, Components) {
  return {
    /**
     * Modifies passed translate value with a `peek` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      if (Glide2.settings.focusAt >= 0) {
        var peek = Components.Peek.value;
        if (isObject(peek)) {
          return translate - peek.before;
        }
        return translate - peek;
      }
      return translate;
    }
  };
}
function Focusing(Glide2, Components) {
  return {
    /**
     * Modifies passed translate value with index in the `focusAt` setting.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    modify: function modify(translate) {
      var gap = Components.Gaps.value;
      var width = Components.Sizes.width;
      var focusAt = Glide2.settings.focusAt;
      var slideWidth = Components.Sizes.slideWidth;
      if (focusAt === "center") {
        return translate - (width / 2 - slideWidth / 2);
      }
      return translate - slideWidth * focusAt - gap * focusAt;
    }
  };
}
function mutator(Glide2, Components, Events) {
  var TRANSFORMERS = [Gap, Grow, Peeking, Focusing].concat(Glide2._t, [Rtl]);
  return {
    /**
     * Piplines translate value with registered transformers.
     *
     * @param  {Number} translate
     * @return {Number}
     */
    mutate: function mutate(translate) {
      for (var i = 0; i < TRANSFORMERS.length; i++) {
        var transformer = TRANSFORMERS[i];
        if (isFunction$1(transformer) && isFunction$1(transformer().modify)) {
          translate = transformer(Glide2, Components, Events).modify(translate);
        } else {
          warn("Transformer should be a function that returns an object with `modify()` method");
        }
      }
      return translate;
    }
  };
}
function Translate(Glide2, Components, Events) {
  var Translate2 = {
    /**
     * Sets value of translate on HTML element.
     *
     * @param {Number} value
     * @return {Void}
     */
    set: function set(value) {
      var transform = mutator(Glide2, Components).mutate(value);
      var translate3d = "translate3d(".concat(-1 * transform, "px, 0px, 0px)");
      Components.Html.wrapper.style.mozTransform = translate3d;
      Components.Html.wrapper.style.webkitTransform = translate3d;
      Components.Html.wrapper.style.transform = translate3d;
    },
    /**
     * Removes value of translate from HTML element.
     *
     * @return {Void}
     */
    remove: function remove() {
      Components.Html.wrapper.style.transform = "";
    },
    /**
     * @return {number}
     */
    getStartIndex: function getStartIndex() {
      var length = Components.Sizes.length;
      var index = Glide2.index;
      var perView = Glide2.settings.perView;
      if (Components.Run.isOffset(">") || Components.Run.isOffset("|>")) {
        return length + (index - perView);
      }
      return (index + perView) % length;
    },
    /**
     * @return {number}
     */
    getTravelDistance: function getTravelDistance() {
      var travelDistance = Components.Sizes.slideWidth * Glide2.settings.perView;
      if (Components.Run.isOffset(">") || Components.Run.isOffset("|>")) {
        return travelDistance * -1;
      }
      return travelDistance;
    }
  };
  Events.on("move", function(context) {
    if (!Glide2.isType("carousel") || !Components.Run.isOffset()) {
      return Translate2.set(context.movement);
    }
    Components.Transition.after(function() {
      Events.emit("translate.jump");
      Translate2.set(Components.Sizes.slideWidth * Glide2.index);
    });
    var startWidth = Components.Sizes.slideWidth * Components.Translate.getStartIndex();
    return Translate2.set(startWidth - Components.Translate.getTravelDistance());
  });
  Events.on("destroy", function() {
    Translate2.remove();
  });
  return Translate2;
}
function Transition(Glide2, Components, Events) {
  var disabled = false;
  var Transition2 = {
    /**
     * Composes string of the CSS transition.
     *
     * @param {String} property
     * @return {String}
     */
    compose: function compose(property) {
      var settings = Glide2.settings;
      if (!disabled) {
        return "".concat(property, " ").concat(this.duration, "ms ").concat(settings.animationTimingFunc);
      }
      return "".concat(property, " 0ms ").concat(settings.animationTimingFunc);
    },
    /**
     * Sets value of transition on HTML element.
     *
     * @param {String=} property
     * @return {Void}
     */
    set: function set() {
      var property = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "transform";
      Components.Html.wrapper.style.transition = this.compose(property);
    },
    /**
     * Removes value of transition from HTML element.
     *
     * @return {Void}
     */
    remove: function remove() {
      Components.Html.wrapper.style.transition = "";
    },
    /**
     * Runs callback after animation.
     *
     * @param  {Function} callback
     * @return {Void}
     */
    after: function after(callback) {
      setTimeout(function() {
        callback();
      }, this.duration);
    },
    /**
     * Enable transition.
     *
     * @return {Void}
     */
    enable: function enable() {
      disabled = false;
      this.set();
    },
    /**
     * Disable transition.
     *
     * @return {Void}
     */
    disable: function disable() {
      disabled = true;
      this.set();
    }
  };
  define(Transition2, "duration", {
    /**
     * Gets duration of the transition based
     * on currently running animation type.
     *
     * @return {Number}
     */
    get: function get() {
      var settings = Glide2.settings;
      if (Glide2.isType("slider") && Components.Run.offset) {
        return settings.rewindDuration;
      }
      return settings.animationDuration;
    }
  });
  Events.on("move", function() {
    Transition2.set();
  });
  Events.on(["build.before", "resize", "translate.jump"], function() {
    Transition2.disable();
  });
  Events.on("run", function() {
    Transition2.enable();
  });
  Events.on("destroy", function() {
    Transition2.remove();
  });
  return Transition2;
}
var supportsPassive = false;
try {
  var opts = Object.defineProperty({}, "passive", {
    get: function get() {
      supportsPassive = true;
    }
  });
  window.addEventListener("testPassive", null, opts);
  window.removeEventListener("testPassive", null, opts);
} catch (e) {
}
var supportsPassive$1 = supportsPassive;
var START_EVENTS = ["touchstart", "mousedown"];
var MOVE_EVENTS = ["touchmove", "mousemove"];
var END_EVENTS = ["touchend", "touchcancel", "mouseup", "mouseleave"];
var MOUSE_EVENTS = ["mousedown", "mousemove", "mouseup", "mouseleave"];
function Swipe(Glide2, Components, Events) {
  var Binder = new EventsBinder();
  var swipeSin = 0;
  var swipeStartX = 0;
  var swipeStartY = 0;
  var disabled = false;
  var capture = supportsPassive$1 ? {
    passive: true
  } : false;
  var Swipe2 = {
    /**
     * Initializes swipe bindings.
     *
     * @return {Void}
     */
    mount: function mount2() {
      this.bindSwipeStart();
    },
    /**
     * Handler for `swipestart` event. Calculates entry points of the user's tap.
     *
     * @param {Object} event
     * @return {Void}
     */
    start: function start(event) {
      if (!disabled && !Glide2.disabled) {
        this.disable();
        var swipe = this.touches(event);
        swipeSin = null;
        swipeStartX = toInt(swipe.pageX);
        swipeStartY = toInt(swipe.pageY);
        this.bindSwipeMove();
        this.bindSwipeEnd();
        Events.emit("swipe.start");
      }
    },
    /**
     * Handler for `swipemove` event. Calculates user's tap angle and distance.
     *
     * @param {Object} event
     */
    move: function move(event) {
      if (!Glide2.disabled) {
        var _Glide$settings = Glide2.settings, touchAngle = _Glide$settings.touchAngle, touchRatio = _Glide$settings.touchRatio, classes = _Glide$settings.classes;
        var swipe = this.touches(event);
        var subExSx = toInt(swipe.pageX) - swipeStartX;
        var subEySy = toInt(swipe.pageY) - swipeStartY;
        var powEX = Math.abs(subExSx << 2);
        var powEY = Math.abs(subEySy << 2);
        var swipeHypotenuse = Math.sqrt(powEX + powEY);
        var swipeCathetus = Math.sqrt(powEY);
        swipeSin = Math.asin(swipeCathetus / swipeHypotenuse);
        if (swipeSin * 180 / Math.PI < touchAngle) {
          event.stopPropagation();
          Components.Move.make(subExSx * toFloat(touchRatio));
          Components.Html.root.classList.add(classes.dragging);
          Events.emit("swipe.move");
        } else {
          return false;
        }
      }
    },
    /**
     * Handler for `swipeend` event. Finitializes user's tap and decides about glide move.
     *
     * @param {Object} event
     * @return {Void}
     */
    end: function end(event) {
      if (!Glide2.disabled) {
        var _Glide$settings2 = Glide2.settings, perSwipe = _Glide$settings2.perSwipe, touchAngle = _Glide$settings2.touchAngle, classes = _Glide$settings2.classes;
        var swipe = this.touches(event);
        var threshold = this.threshold(event);
        var swipeDistance = swipe.pageX - swipeStartX;
        var swipeDeg = swipeSin * 180 / Math.PI;
        this.enable();
        if (swipeDistance > threshold && swipeDeg < touchAngle) {
          Components.Run.make(Components.Direction.resolve("".concat(perSwipe, "<")));
        } else if (swipeDistance < -threshold && swipeDeg < touchAngle) {
          Components.Run.make(Components.Direction.resolve("".concat(perSwipe, ">")));
        } else {
          Components.Move.make();
        }
        Components.Html.root.classList.remove(classes.dragging);
        this.unbindSwipeMove();
        this.unbindSwipeEnd();
        Events.emit("swipe.end");
      }
    },
    /**
     * Binds swipe's starting event.
     *
     * @return {Void}
     */
    bindSwipeStart: function bindSwipeStart() {
      var _this = this;
      var _Glide$settings3 = Glide2.settings, swipeThreshold = _Glide$settings3.swipeThreshold, dragThreshold = _Glide$settings3.dragThreshold;
      if (swipeThreshold) {
        Binder.on(START_EVENTS[0], Components.Html.wrapper, function(event) {
          _this.start(event);
        }, capture);
      }
      if (dragThreshold) {
        Binder.on(START_EVENTS[1], Components.Html.wrapper, function(event) {
          _this.start(event);
        }, capture);
      }
    },
    /**
     * Unbinds swipe's starting event.
     *
     * @return {Void}
     */
    unbindSwipeStart: function unbindSwipeStart() {
      Binder.off(START_EVENTS[0], Components.Html.wrapper, capture);
      Binder.off(START_EVENTS[1], Components.Html.wrapper, capture);
    },
    /**
     * Binds swipe's moving event.
     *
     * @return {Void}
     */
    bindSwipeMove: function bindSwipeMove() {
      var _this2 = this;
      Binder.on(MOVE_EVENTS, Components.Html.wrapper, throttle(function(event) {
        _this2.move(event);
      }, Glide2.settings.throttle), capture);
    },
    /**
     * Unbinds swipe's moving event.
     *
     * @return {Void}
     */
    unbindSwipeMove: function unbindSwipeMove() {
      Binder.off(MOVE_EVENTS, Components.Html.wrapper, capture);
    },
    /**
     * Binds swipe's ending event.
     *
     * @return {Void}
     */
    bindSwipeEnd: function bindSwipeEnd() {
      var _this3 = this;
      Binder.on(END_EVENTS, Components.Html.wrapper, function(event) {
        _this3.end(event);
      });
    },
    /**
     * Unbinds swipe's ending event.
     *
     * @return {Void}
     */
    unbindSwipeEnd: function unbindSwipeEnd() {
      Binder.off(END_EVENTS, Components.Html.wrapper);
    },
    /**
     * Normalizes event touches points accorting to different types.
     *
     * @param {Object} event
     */
    touches: function touches(event) {
      if (MOUSE_EVENTS.indexOf(event.type) > -1) {
        return event;
      }
      return event.touches[0] || event.changedTouches[0];
    },
    /**
     * Gets value of minimum swipe distance settings based on event type.
     *
     * @return {Number}
     */
    threshold: function threshold(event) {
      var settings = Glide2.settings;
      if (MOUSE_EVENTS.indexOf(event.type) > -1) {
        return settings.dragThreshold;
      }
      return settings.swipeThreshold;
    },
    /**
     * Enables swipe event.
     *
     * @return {self}
     */
    enable: function enable() {
      disabled = false;
      Components.Transition.enable();
      return this;
    },
    /**
     * Disables swipe event.
     *
     * @return {self}
     */
    disable: function disable() {
      disabled = true;
      Components.Transition.disable();
      return this;
    }
  };
  Events.on("build.after", function() {
    Components.Html.root.classList.add(Glide2.settings.classes.swipeable);
  });
  Events.on("destroy", function() {
    Swipe2.unbindSwipeStart();
    Swipe2.unbindSwipeMove();
    Swipe2.unbindSwipeEnd();
    Binder.destroy();
  });
  return Swipe2;
}
function Images(Glide2, Components, Events) {
  var Binder = new EventsBinder();
  var Images2 = {
    /**
     * Binds listener to glide wrapper.
     *
     * @return {Void}
     */
    mount: function mount2() {
      this.bind();
    },
    /**
     * Binds `dragstart` event on wrapper to prevent dragging images.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on("dragstart", Components.Html.wrapper, this.dragstart);
    },
    /**
     * Unbinds `dragstart` event on wrapper.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off("dragstart", Components.Html.wrapper);
    },
    /**
     * Event handler. Prevents dragging.
     *
     * @return {Void}
     */
    dragstart: function dragstart(event) {
      event.preventDefault();
    }
  };
  Events.on("destroy", function() {
    Images2.unbind();
    Binder.destroy();
  });
  return Images2;
}
function Anchors(Glide2, Components, Events) {
  var Binder = new EventsBinder();
  var detached = false;
  var prevented = false;
  var Anchors2 = {
    /**
     * Setups a initial state of anchors component.
     *
     * @returns {Void}
     */
    mount: function mount2() {
      this._a = Components.Html.wrapper.querySelectorAll("a");
      this.bind();
    },
    /**
     * Binds events to anchors inside a track.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on("click", Components.Html.wrapper, this.click);
    },
    /**
     * Unbinds events attached to anchors inside a track.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off("click", Components.Html.wrapper);
    },
    /**
     * Handler for click event. Prevents clicks when glide is in `prevent` status.
     *
     * @param  {Object} event
     * @return {Void}
     */
    click: function click(event) {
      if (prevented) {
        event.stopPropagation();
        event.preventDefault();
      }
    },
    /**
     * Detaches anchors click event inside glide.
     *
     * @return {self}
     */
    detach: function detach() {
      prevented = true;
      if (!detached) {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].draggable = false;
        }
        detached = true;
      }
      return this;
    },
    /**
     * Attaches anchors click events inside glide.
     *
     * @return {self}
     */
    attach: function attach() {
      prevented = false;
      if (detached) {
        for (var i = 0; i < this.items.length; i++) {
          this.items[i].draggable = true;
        }
        detached = false;
      }
      return this;
    }
  };
  define(Anchors2, "items", {
    /**
     * Gets collection of the arrows HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get: function get() {
      return Anchors2._a;
    }
  });
  Events.on("swipe.move", function() {
    Anchors2.detach();
  });
  Events.on("swipe.end", function() {
    Components.Transition.after(function() {
      Anchors2.attach();
    });
  });
  Events.on("destroy", function() {
    Anchors2.attach();
    Anchors2.unbind();
    Binder.destroy();
  });
  return Anchors2;
}
var NAV_SELECTOR = '[data-glide-el="controls[nav]"]';
var CONTROLS_SELECTOR = '[data-glide-el^="controls"]';
var PREVIOUS_CONTROLS_SELECTOR = "".concat(CONTROLS_SELECTOR, ' [data-glide-dir*="<"]');
var NEXT_CONTROLS_SELECTOR = "".concat(CONTROLS_SELECTOR, ' [data-glide-dir*=">"]');
function Controls(Glide2, Components, Events) {
  var Binder = new EventsBinder();
  var capture = supportsPassive$1 ? {
    passive: true
  } : false;
  var Controls2 = {
    /**
     * Inits arrows. Binds events listeners
     * to the arrows HTML elements.
     *
     * @return {Void}
     */
    mount: function mount2() {
      this._n = Components.Html.root.querySelectorAll(NAV_SELECTOR);
      this._c = Components.Html.root.querySelectorAll(CONTROLS_SELECTOR);
      this._arrowControls = {
        previous: Components.Html.root.querySelectorAll(PREVIOUS_CONTROLS_SELECTOR),
        next: Components.Html.root.querySelectorAll(NEXT_CONTROLS_SELECTOR)
      };
      this.addBindings();
    },
    /**
     * Sets active class to current slide.
     *
     * @return {Void}
     */
    setActive: function setActive() {
      for (var i = 0; i < this._n.length; i++) {
        this.addClass(this._n[i].children);
      }
    },
    /**
     * Removes active class to current slide.
     *
     * @return {Void}
     */
    removeActive: function removeActive() {
      for (var i = 0; i < this._n.length; i++) {
        this.removeClass(this._n[i].children);
      }
    },
    /**
     * Toggles active class on items inside navigation.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */
    addClass: function addClass(controls2) {
      var settings = Glide2.settings;
      var item = controls2[Glide2.index];
      if (!item) {
        return;
      }
      if (item) {
        item.classList.add(settings.classes.nav.active);
        siblings(item).forEach(function(sibling) {
          sibling.classList.remove(settings.classes.nav.active);
        });
      }
    },
    /**
     * Removes active class from active control.
     *
     * @param  {HTMLElement} controls
     * @return {Void}
     */
    removeClass: function removeClass(controls2) {
      var item = controls2[Glide2.index];
      if (item) {
        item.classList.remove(Glide2.settings.classes.nav.active);
      }
    },
    /**
     * Calculates, removes or adds `Glide.settings.classes.disabledArrow` class on the control arrows
     */
    setArrowState: function setArrowState() {
      if (Glide2.settings.rewind) {
        return;
      }
      var next = Controls2._arrowControls.next;
      var previous = Controls2._arrowControls.previous;
      this.resetArrowState(next, previous);
      if (Glide2.index === 0) {
        this.disableArrow(previous);
      }
      if (Glide2.index === Components.Run.length) {
        this.disableArrow(next);
      }
    },
    /**
     * Removes `Glide.settings.classes.disabledArrow` from given NodeList elements
     *
     * @param {NodeList[]} lists
     */
    resetArrowState: function resetArrowState() {
      var settings = Glide2.settings;
      for (var _len = arguments.length, lists = new Array(_len), _key = 0; _key < _len; _key++) {
        lists[_key] = arguments[_key];
      }
      lists.forEach(function(list) {
        toArray(list).forEach(function(element) {
          element.classList.remove(settings.classes.arrow.disabled);
        });
      });
    },
    /**
     * Adds `Glide.settings.classes.disabledArrow` to given NodeList elements
     *
     * @param {NodeList[]} lists
     */
    disableArrow: function disableArrow() {
      var settings = Glide2.settings;
      for (var _len2 = arguments.length, lists = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        lists[_key2] = arguments[_key2];
      }
      lists.forEach(function(list) {
        toArray(list).forEach(function(element) {
          element.classList.add(settings.classes.arrow.disabled);
        });
      });
    },
    /**
     * Adds handles to the each group of controls.
     *
     * @return {Void}
     */
    addBindings: function addBindings() {
      for (var i = 0; i < this._c.length; i++) {
        this.bind(this._c[i].children);
      }
    },
    /**
     * Removes handles from the each group of controls.
     *
     * @return {Void}
     */
    removeBindings: function removeBindings() {
      for (var i = 0; i < this._c.length; i++) {
        this.unbind(this._c[i].children);
      }
    },
    /**
     * Binds events to arrows HTML elements.
     *
     * @param {HTMLCollection} elements
     * @return {Void}
     */
    bind: function bind(elements) {
      for (var i = 0; i < elements.length; i++) {
        Binder.on("click", elements[i], this.click);
        Binder.on("touchstart", elements[i], this.click, capture);
      }
    },
    /**
     * Unbinds events binded to the arrows HTML elements.
     *
     * @param {HTMLCollection} elements
     * @return {Void}
     */
    unbind: function unbind(elements) {
      for (var i = 0; i < elements.length; i++) {
        Binder.off(["click", "touchstart"], elements[i]);
      }
    },
    /**
     * Handles `click` event on the arrows HTML elements.
     * Moves slider in direction given via the
     * `data-glide-dir` attribute.
     *
     * @param {Object} event
     * @return {void}
     */
    click: function click(event) {
      if (!supportsPassive$1 && event.type === "touchstart") {
        event.preventDefault();
      }
      var direction = event.currentTarget.getAttribute("data-glide-dir");
      Components.Run.make(Components.Direction.resolve(direction));
    }
  };
  define(Controls2, "items", {
    /**
     * Gets collection of the controls HTML elements.
     *
     * @return {HTMLElement[]}
     */
    get: function get() {
      return Controls2._c;
    }
  });
  Events.on(["mount.after", "move.after"], function() {
    Controls2.setActive();
  });
  Events.on(["mount.after", "run"], function() {
    Controls2.setArrowState();
  });
  Events.on("destroy", function() {
    Controls2.removeBindings();
    Controls2.removeActive();
    Binder.destroy();
  });
  return Controls2;
}
function Keyboard(Glide2, Components, Events) {
  var Binder = new EventsBinder();
  var Keyboard2 = {
    /**
     * Binds keyboard events on component mount.
     *
     * @return {Void}
     */
    mount: function mount2() {
      if (Glide2.settings.keyboard) {
        this.bind();
      }
    },
    /**
     * Adds keyboard press events.
     *
     * @return {Void}
     */
    bind: function bind() {
      Binder.on("keyup", document, this.press);
    },
    /**
     * Removes keyboard press events.
     *
     * @return {Void}
     */
    unbind: function unbind() {
      Binder.off("keyup", document);
    },
    /**
     * Handles keyboard's arrows press and moving glide foward and backward.
     *
     * @param  {Object} event
     * @return {Void}
     */
    press: function press(event) {
      var perSwipe = Glide2.settings.perSwipe;
      if (event.code === "ArrowRight") {
        Components.Run.make(Components.Direction.resolve("".concat(perSwipe, ">")));
      }
      if (event.code === "ArrowLeft") {
        Components.Run.make(Components.Direction.resolve("".concat(perSwipe, "<")));
      }
    }
  };
  Events.on(["destroy", "update"], function() {
    Keyboard2.unbind();
  });
  Events.on("update", function() {
    Keyboard2.mount();
  });
  Events.on("destroy", function() {
    Binder.destroy();
  });
  return Keyboard2;
}
function Autoplay(Glide2, Components, Events) {
  var Binder = new EventsBinder();
  var Autoplay2 = {
    /**
     * Initializes autoplaying and events.
     *
     * @return {Void}
     */
    mount: function mount2() {
      this.enable();
      this.start();
      if (Glide2.settings.hoverpause) {
        this.bind();
      }
    },
    /**
     * Enables autoplaying
     *
     * @returns {Void}
     */
    enable: function enable() {
      this._e = true;
    },
    /**
     * Disables autoplaying.
     *
     * @returns {Void}
     */
    disable: function disable() {
      this._e = false;
    },
    /**
     * Starts autoplaying in configured interval.
     *
     * @param {Boolean|Number} force Run autoplaying with passed interval regardless of `autoplay` settings
     * @return {Void}
     */
    start: function start() {
      var _this = this;
      if (!this._e) {
        return;
      }
      this.enable();
      if (Glide2.settings.autoplay) {
        if (isUndefined(this._i)) {
          this._i = setInterval(function() {
            _this.stop();
            Components.Run.make(">");
            _this.start();
            Events.emit("autoplay");
          }, this.time);
        }
      }
    },
    /**
     * Stops autorunning of the glide.
     *
     * @return {Void}
     */
    stop: function stop() {
      this._i = clearInterval(this._i);
    },
    /**
     * Stops autoplaying while mouse is over glide's area.
     *
     * @return {Void}
     */
    bind: function bind() {
      var _this2 = this;
      Binder.on("mouseover", Components.Html.root, function() {
        if (_this2._e) {
          _this2.stop();
        }
      });
      Binder.on("mouseout", Components.Html.root, function() {
        if (_this2._e) {
          _this2.start();
        }
      });
    },
    /**
     * Unbind mouseover events.
     *
     * @returns {Void}
     */
    unbind: function unbind() {
      Binder.off(["mouseover", "mouseout"], Components.Html.root);
    }
  };
  define(Autoplay2, "time", {
    /**
     * Gets time period value for the autoplay interval. Prioritizes
     * times in `data-glide-autoplay` attrubutes over options.
     *
     * @return {Number}
     */
    get: function get() {
      var autoplay = Components.Html.slides[Glide2.index].getAttribute("data-glide-autoplay");
      if (autoplay) {
        return toInt(autoplay);
      }
      return toInt(Glide2.settings.autoplay);
    }
  });
  Events.on(["destroy", "update"], function() {
    Autoplay2.unbind();
  });
  Events.on(["run.before", "swipe.start", "update"], function() {
    Autoplay2.stop();
  });
  Events.on(["pause", "destroy"], function() {
    Autoplay2.disable();
    Autoplay2.stop();
  });
  Events.on(["run.after", "swipe.end"], function() {
    Autoplay2.start();
  });
  Events.on(["play"], function() {
    Autoplay2.enable();
    Autoplay2.start();
  });
  Events.on("update", function() {
    Autoplay2.mount();
  });
  Events.on("destroy", function() {
    Binder.destroy();
  });
  return Autoplay2;
}
function sortBreakpoints(points) {
  if (isObject(points)) {
    return sortKeys(points);
  } else {
    warn("Breakpoints option must be an object");
  }
  return {};
}
function Breakpoints(Glide2, Components, Events) {
  var Binder = new EventsBinder();
  var settings = Glide2.settings;
  var points = sortBreakpoints(settings.breakpoints);
  var defaults2 = Object.assign({}, settings);
  var Breakpoints2 = {
    /**
     * Matches settings for currectly matching media breakpoint.
     *
     * @param {Object} points
     * @returns {Object}
     */
    match: function match(points2) {
      if (typeof window.matchMedia !== "undefined") {
        for (var point in points2) {
          if (points2.hasOwnProperty(point)) {
            if (window.matchMedia("(max-width: ".concat(point, "px)")).matches) {
              return points2[point];
            }
          }
        }
      }
      return defaults2;
    }
  };
  Object.assign(settings, Breakpoints2.match(points));
  Binder.on("resize", window, throttle(function() {
    Glide2.settings = mergeOptions(settings, Breakpoints2.match(points));
  }, Glide2.settings.throttle));
  Events.on("update", function() {
    points = sortBreakpoints(points);
    defaults2 = Object.assign({}, settings);
  });
  Events.on("destroy", function() {
    Binder.off("resize", window);
  });
  return Breakpoints2;
}
var COMPONENTS = {
  // Required
  Html,
  Translate,
  Transition,
  Direction,
  Peek,
  Sizes,
  Gaps,
  Move,
  Clones,
  Resize,
  Build,
  Run,
  // Optional
  Swipe,
  Images,
  Anchors,
  Controls,
  Keyboard,
  Autoplay,
  Breakpoints
};
var Glide = /* @__PURE__ */ function(_Core) {
  _inherits(Glide2, _Core);
  var _super = _createSuper(Glide2);
  function Glide2() {
    _classCallCheck(this, Glide2);
    return _super.apply(this, arguments);
  }
  _createClass(Glide2, [{
    key: "mount",
    value: function mount2() {
      var extensions = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      return _get(_getPrototypeOf(Glide2.prototype), "mount", this).call(this, Object.assign({}, COMPONENTS, extensions));
    }
  }]);
  return Glide2;
}(Glide$1);
class HeroSlider {
  constructor() {
    const slider = document.querySelector(".glide");
    if (slider) {
      let slides = slider.querySelectorAll(".glide__slide");
      let dotsMarkup = "";
      for (let i = 0; i < slides.length; i++) {
        dotsMarkup += `<button class="glide__bullet" data-glide-dir="=${i}"></button>`;
      }
      let bullet = slider.querySelector(".glide__bullets");
      if (bullet) {
        bullet.insertAdjacentHTML("beforeend", dotsMarkup);
      }
      var glide = new Glide(".glide", {
        type: "carousel",
        perView: 1,
        autoplay: 4e3
      });
      glide.mount();
    } else {
      console.log("NO PLACE FOR SLIDER");
    }
  }
}
function addUniqueItem(array, item) {
  array.indexOf(item) === -1 && array.push(item);
}
const clamp = (min, max, v) => Math.min(Math.max(v, min), max);
const defaults = {
  duration: 0.3,
  delay: 0,
  endDelay: 0,
  repeat: 0,
  easing: "ease"
};
const isNumber = (value) => typeof value === "number";
const isEasingList = (easing) => Array.isArray(easing) && !isNumber(easing[0]);
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((v - min) % rangeSize + rangeSize) % rangeSize + min;
};
function getEasingForSegment(easing, i) {
  return isEasingList(easing) ? easing[wrap(0, easing.length, i)] : easing;
}
const mix = (min, max, progress2) => -progress2 * min + progress2 * max + min;
const noop = () => {
};
const noopReturn = (v) => v;
const progress = (min, max, value) => max - min === 0 ? 1 : (value - min) / (max - min);
function fillOffset(offset, remaining) {
  const min = offset[offset.length - 1];
  for (let i = 1; i <= remaining; i++) {
    const offsetProgress = progress(0, remaining, i);
    offset.push(mix(min, 1, offsetProgress));
  }
}
function defaultOffset(length) {
  const offset = [0];
  fillOffset(offset, length - 1);
  return offset;
}
function interpolate(output, input = defaultOffset(output.length), easing = noopReturn) {
  const length = output.length;
  const remainder = length - input.length;
  remainder > 0 && fillOffset(input, remainder);
  return (t) => {
    let i = 0;
    for (; i < length - 2; i++) {
      if (t < input[i + 1])
        break;
    }
    let progressInRange = clamp(0, 1, progress(input[i], input[i + 1], t));
    const segmentEasing = getEasingForSegment(easing, i);
    progressInRange = segmentEasing(progressInRange);
    return mix(output[i], output[i + 1], progressInRange);
  };
}
const isCubicBezier = (easing) => Array.isArray(easing) && isNumber(easing[0]);
const isEasingGenerator = (easing) => typeof easing === "object" && Boolean(easing.createAnimation);
const isFunction = (value) => typeof value === "function";
const isString = (value) => typeof value === "string";
const time = {
  ms: (seconds) => seconds * 1e3,
  s: (milliseconds) => milliseconds / 1e3
};
const calcBezier = (t, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t + 3 * a1) * t;
const subdivisionPrecision = 1e-7;
const subdivisionMaxIterations = 12;
function binarySubdivide(x, lowerBound, upperBound, mX1, mX2) {
  let currentX;
  let currentT;
  let i = 0;
  do {
    currentT = lowerBound + (upperBound - lowerBound) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - x;
    if (currentX > 0) {
      upperBound = currentT;
    } else {
      lowerBound = currentT;
    }
  } while (Math.abs(currentX) > subdivisionPrecision && ++i < subdivisionMaxIterations);
  return currentT;
}
function cubicBezier(mX1, mY1, mX2, mY2) {
  if (mX1 === mY1 && mX2 === mY2)
    return noopReturn;
  const getTForX = (aX) => binarySubdivide(aX, 0, 1, mX1, mX2);
  return (t) => t === 0 || t === 1 ? t : calcBezier(getTForX(t), mY1, mY2);
}
const steps = (steps2, direction = "end") => (progress2) => {
  progress2 = direction === "end" ? Math.min(progress2, 0.999) : Math.max(progress2, 1e-3);
  const expanded = progress2 * steps2;
  const rounded = direction === "end" ? Math.floor(expanded) : Math.ceil(expanded);
  return clamp(0, 1, rounded / steps2);
};
const namedEasings = {
  ease: cubicBezier(0.25, 0.1, 0.25, 1),
  "ease-in": cubicBezier(0.42, 0, 1, 1),
  "ease-in-out": cubicBezier(0.42, 0, 0.58, 1),
  "ease-out": cubicBezier(0, 0, 0.58, 1)
};
const functionArgsRegex = /\((.*?)\)/;
function getEasingFunction(definition) {
  if (isFunction(definition))
    return definition;
  if (isCubicBezier(definition))
    return cubicBezier(...definition);
  if (namedEasings[definition])
    return namedEasings[definition];
  if (definition.startsWith("steps")) {
    const args = functionArgsRegex.exec(definition);
    if (args) {
      const argsArray = args[1].split(",");
      return steps(parseFloat(argsArray[0]), argsArray[1].trim());
    }
  }
  return noopReturn;
}
class Animation {
  constructor(output, keyframes = [0, 1], { easing, duration: initialDuration = defaults.duration, delay = defaults.delay, endDelay = defaults.endDelay, repeat = defaults.repeat, offset, direction = "normal" } = {}) {
    this.startTime = null;
    this.rate = 1;
    this.t = 0;
    this.cancelTimestamp = null;
    this.easing = noopReturn;
    this.duration = 0;
    this.totalDuration = 0;
    this.repeat = 0;
    this.playState = "idle";
    this.finished = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
    easing = easing || defaults.easing;
    if (isEasingGenerator(easing)) {
      const custom = easing.createAnimation(keyframes);
      easing = custom.easing;
      keyframes = custom.keyframes || keyframes;
      initialDuration = custom.duration || initialDuration;
    }
    this.repeat = repeat;
    this.easing = isEasingList(easing) ? noopReturn : getEasingFunction(easing);
    this.updateDuration(initialDuration);
    const interpolate$1 = interpolate(keyframes, offset, isEasingList(easing) ? easing.map(getEasingFunction) : noopReturn);
    this.tick = (timestamp) => {
      var _a;
      delay = delay;
      let t = 0;
      if (this.pauseTime !== void 0) {
        t = this.pauseTime;
      } else {
        t = (timestamp - this.startTime) * this.rate;
      }
      this.t = t;
      t /= 1e3;
      t = Math.max(t - delay, 0);
      if (this.playState === "finished" && this.pauseTime === void 0) {
        t = this.totalDuration;
      }
      const progress2 = t / this.duration;
      let currentIteration = Math.floor(progress2);
      let iterationProgress = progress2 % 1;
      if (!iterationProgress && progress2 >= 1) {
        iterationProgress = 1;
      }
      iterationProgress === 1 && currentIteration--;
      const iterationIsOdd = currentIteration % 2;
      if (direction === "reverse" || direction === "alternate" && iterationIsOdd || direction === "alternate-reverse" && !iterationIsOdd) {
        iterationProgress = 1 - iterationProgress;
      }
      const p = t >= this.totalDuration ? 1 : Math.min(iterationProgress, 1);
      const latest = interpolate$1(this.easing(p));
      output(latest);
      const isAnimationFinished = this.pauseTime === void 0 && (this.playState === "finished" || t >= this.totalDuration + endDelay);
      if (isAnimationFinished) {
        this.playState = "finished";
        (_a = this.resolve) === null || _a === void 0 ? void 0 : _a.call(this, latest);
      } else if (this.playState !== "idle") {
        this.frameRequestId = requestAnimationFrame(this.tick);
      }
    };
    this.play();
  }
  play() {
    const now2 = performance.now();
    this.playState = "running";
    if (this.pauseTime !== void 0) {
      this.startTime = now2 - this.pauseTime;
    } else if (!this.startTime) {
      this.startTime = now2;
    }
    this.cancelTimestamp = this.startTime;
    this.pauseTime = void 0;
    this.frameRequestId = requestAnimationFrame(this.tick);
  }
  pause() {
    this.playState = "paused";
    this.pauseTime = this.t;
  }
  finish() {
    this.playState = "finished";
    this.tick(0);
  }
  stop() {
    var _a;
    this.playState = "idle";
    if (this.frameRequestId !== void 0) {
      cancelAnimationFrame(this.frameRequestId);
    }
    (_a = this.reject) === null || _a === void 0 ? void 0 : _a.call(this, false);
  }
  cancel() {
    this.stop();
    this.tick(this.cancelTimestamp);
  }
  reverse() {
    this.rate *= -1;
  }
  commitStyles() {
  }
  updateDuration(duration) {
    this.duration = duration;
    this.totalDuration = duration * (this.repeat + 1);
  }
  get currentTime() {
    return this.t;
  }
  set currentTime(t) {
    if (this.pauseTime !== void 0 || this.rate === 0) {
      this.pauseTime = t;
    } else {
      this.startTime = performance.now() - t / this.rate;
    }
  }
  get playbackRate() {
    return this.rate;
  }
  set playbackRate(rate) {
    this.rate = rate;
  }
}
class MotionValue {
  setAnimation(animation) {
    this.animation = animation;
    animation === null || animation === void 0 ? void 0 : animation.finished.then(() => this.clearAnimation()).catch(() => {
    });
  }
  clearAnimation() {
    this.animation = this.generator = void 0;
  }
}
const data = /* @__PURE__ */ new WeakMap();
function getAnimationData(element) {
  if (!data.has(element)) {
    data.set(element, {
      transforms: [],
      values: /* @__PURE__ */ new Map()
    });
  }
  return data.get(element);
}
function getMotionValue(motionValues, name) {
  if (!motionValues.has(name)) {
    motionValues.set(name, new MotionValue());
  }
  return motionValues.get(name);
}
const axes = ["", "X", "Y", "Z"];
const order = ["translate", "scale", "rotate", "skew"];
const transformAlias = {
  x: "translateX",
  y: "translateY",
  z: "translateZ"
};
const rotation = {
  syntax: "<angle>",
  initialValue: "0deg",
  toDefaultUnit: (v) => v + "deg"
};
const baseTransformProperties = {
  translate: {
    syntax: "<length-percentage>",
    initialValue: "0px",
    toDefaultUnit: (v) => v + "px"
  },
  rotate: rotation,
  scale: {
    syntax: "<number>",
    initialValue: 1,
    toDefaultUnit: noopReturn
  },
  skew: rotation
};
const transformDefinitions = /* @__PURE__ */ new Map();
const asTransformCssVar = (name) => `--motion-${name}`;
const transforms = ["x", "y", "z"];
order.forEach((name) => {
  axes.forEach((axis) => {
    transforms.push(name + axis);
    transformDefinitions.set(asTransformCssVar(name + axis), baseTransformProperties[name]);
  });
});
const compareTransformOrder = (a, b) => transforms.indexOf(a) - transforms.indexOf(b);
const transformLookup = new Set(transforms);
const isTransform = (name) => transformLookup.has(name);
const addTransformToElement = (element, name) => {
  if (transformAlias[name])
    name = transformAlias[name];
  const { transforms: transforms2 } = getAnimationData(element);
  addUniqueItem(transforms2, name);
  element.style.transform = buildTransformTemplate(transforms2);
};
const buildTransformTemplate = (transforms2) => transforms2.sort(compareTransformOrder).reduce(transformListToString, "").trim();
const transformListToString = (template, name) => `${template} ${name}(var(${asTransformCssVar(name)}))`;
const isCssVar = (name) => name.startsWith("--");
const registeredProperties = /* @__PURE__ */ new Set();
function registerCssVariable(name) {
  if (registeredProperties.has(name))
    return;
  registeredProperties.add(name);
  try {
    const { syntax, initialValue } = transformDefinitions.has(name) ? transformDefinitions.get(name) : {};
    CSS.registerProperty({
      name,
      inherits: false,
      syntax,
      initialValue
    });
  } catch (e) {
  }
}
const testAnimation = (keyframes, options) => document.createElement("div").animate(keyframes, options);
const featureTests = {
  cssRegisterProperty: () => typeof CSS !== "undefined" && Object.hasOwnProperty.call(CSS, "registerProperty"),
  waapi: () => Object.hasOwnProperty.call(Element.prototype, "animate"),
  partialKeyframes: () => {
    try {
      testAnimation({ opacity: [1] });
    } catch (e) {
      return false;
    }
    return true;
  },
  finished: () => Boolean(testAnimation({ opacity: [0, 1] }, { duration: 1e-3 }).finished),
  linearEasing: () => {
    try {
      testAnimation({ opacity: 0 }, { easing: "linear(0, 1)" });
    } catch (e) {
      return false;
    }
    return true;
  }
};
const results = {};
const supports = {};
for (const key in featureTests) {
  supports[key] = () => {
    if (results[key] === void 0)
      results[key] = featureTests[key]();
    return results[key];
  };
}
const resolution = 0.015;
const generateLinearEasingPoints = (easing, duration) => {
  let points = "";
  const numPoints = Math.round(duration / resolution);
  for (let i = 0; i < numPoints; i++) {
    points += easing(progress(0, numPoints - 1, i)) + ", ";
  }
  return points.substring(0, points.length - 2);
};
const convertEasing = (easing, duration) => {
  if (isFunction(easing)) {
    return supports.linearEasing() ? `linear(${generateLinearEasingPoints(easing, duration)})` : defaults.easing;
  } else {
    return isCubicBezier(easing) ? cubicBezierAsString(easing) : easing;
  }
};
const cubicBezierAsString = ([a, b, c, d]) => `cubic-bezier(${a}, ${b}, ${c}, ${d})`;
function hydrateKeyframes(keyframes, readInitialValue) {
  for (let i = 0; i < keyframes.length; i++) {
    if (keyframes[i] === null) {
      keyframes[i] = i ? keyframes[i - 1] : readInitialValue();
    }
  }
  return keyframes;
}
const keyframesList = (keyframes) => Array.isArray(keyframes) ? keyframes : [keyframes];
function getStyleName(key) {
  if (transformAlias[key])
    key = transformAlias[key];
  return isTransform(key) ? asTransformCssVar(key) : key;
}
const style = {
  get: (element, name) => {
    name = getStyleName(name);
    let value = isCssVar(name) ? element.style.getPropertyValue(name) : getComputedStyle(element)[name];
    if (!value && value !== 0) {
      const definition = transformDefinitions.get(name);
      if (definition)
        value = definition.initialValue;
    }
    return value;
  },
  set: (element, name, value) => {
    name = getStyleName(name);
    if (isCssVar(name)) {
      element.style.setProperty(name, value);
    } else {
      element.style[name] = value;
    }
  }
};
function stopAnimation(animation, needsCommit = true) {
  if (!animation || animation.playState === "finished")
    return;
  try {
    if (animation.stop) {
      animation.stop();
    } else {
      needsCommit && animation.commitStyles();
      animation.cancel();
    }
  } catch (e) {
  }
}
function getUnitConverter(keyframes, definition) {
  var _a;
  let toUnit = (definition === null || definition === void 0 ? void 0 : definition.toDefaultUnit) || noopReturn;
  const finalKeyframe = keyframes[keyframes.length - 1];
  if (isString(finalKeyframe)) {
    const unit = ((_a = finalKeyframe.match(/(-?[\d.]+)([a-z%]*)/)) === null || _a === void 0 ? void 0 : _a[2]) || "";
    if (unit)
      toUnit = (value) => value + unit;
  }
  return toUnit;
}
function getDevToolsRecord() {
  return window.__MOTION_DEV_TOOLS_RECORD;
}
function animateStyle(element, key, keyframesDefinition, options = {}, AnimationPolyfill) {
  const record = getDevToolsRecord();
  const isRecording = options.record !== false && record;
  let animation;
  let { duration = defaults.duration, delay = defaults.delay, endDelay = defaults.endDelay, repeat = defaults.repeat, easing = defaults.easing, persist = false, direction, offset, allowWebkitAcceleration = false } = options;
  const data2 = getAnimationData(element);
  const valueIsTransform = isTransform(key);
  let canAnimateNatively = supports.waapi();
  valueIsTransform && addTransformToElement(element, key);
  const name = getStyleName(key);
  const motionValue = getMotionValue(data2.values, name);
  const definition = transformDefinitions.get(name);
  stopAnimation(motionValue.animation, !(isEasingGenerator(easing) && motionValue.generator) && options.record !== false);
  return () => {
    const readInitialValue = () => {
      var _a, _b;
      return (_b = (_a = style.get(element, name)) !== null && _a !== void 0 ? _a : definition === null || definition === void 0 ? void 0 : definition.initialValue) !== null && _b !== void 0 ? _b : 0;
    };
    let keyframes = hydrateKeyframes(keyframesList(keyframesDefinition), readInitialValue);
    const toUnit = getUnitConverter(keyframes, definition);
    if (isEasingGenerator(easing)) {
      const custom = easing.createAnimation(keyframes, key !== "opacity", readInitialValue, name, motionValue);
      easing = custom.easing;
      keyframes = custom.keyframes || keyframes;
      duration = custom.duration || duration;
    }
    if (isCssVar(name)) {
      if (supports.cssRegisterProperty()) {
        registerCssVariable(name);
      } else {
        canAnimateNatively = false;
      }
    }
    if (valueIsTransform && !supports.linearEasing() && (isFunction(easing) || isEasingList(easing) && easing.some(isFunction))) {
      canAnimateNatively = false;
    }
    if (canAnimateNatively) {
      if (definition) {
        keyframes = keyframes.map((value) => isNumber(value) ? definition.toDefaultUnit(value) : value);
      }
      if (keyframes.length === 1 && (!supports.partialKeyframes() || isRecording)) {
        keyframes.unshift(readInitialValue());
      }
      const animationOptions = {
        delay: time.ms(delay),
        duration: time.ms(duration),
        endDelay: time.ms(endDelay),
        easing: !isEasingList(easing) ? convertEasing(easing, duration) : void 0,
        direction,
        iterations: repeat + 1,
        fill: "both"
      };
      animation = element.animate({
        [name]: keyframes,
        offset,
        easing: isEasingList(easing) ? easing.map((thisEasing) => convertEasing(thisEasing, duration)) : void 0
      }, animationOptions);
      if (!animation.finished) {
        animation.finished = new Promise((resolve, reject) => {
          animation.onfinish = resolve;
          animation.oncancel = reject;
        });
      }
      const target = keyframes[keyframes.length - 1];
      animation.finished.then(() => {
        if (persist)
          return;
        style.set(element, name, target);
        animation.cancel();
      }).catch(noop);
      if (!allowWebkitAcceleration)
        animation.playbackRate = 1.000001;
    } else if (AnimationPolyfill && valueIsTransform) {
      keyframes = keyframes.map((value) => typeof value === "string" ? parseFloat(value) : value);
      if (keyframes.length === 1) {
        keyframes.unshift(parseFloat(readInitialValue()));
      }
      animation = new AnimationPolyfill((latest) => {
        style.set(element, name, toUnit ? toUnit(latest) : latest);
      }, keyframes, Object.assign(Object.assign({}, options), {
        duration,
        easing
      }));
    } else {
      const target = keyframes[keyframes.length - 1];
      style.set(element, name, definition && isNumber(target) ? definition.toDefaultUnit(target) : target);
    }
    if (isRecording) {
      record(element, key, keyframes, {
        duration,
        delay,
        easing,
        repeat,
        offset
      }, "motion-one");
    }
    motionValue.setAnimation(animation);
    return animation;
  };
}
const getOptions = (options, key) => (
  /**
   * TODO: Make test for this
   * Always return a new object otherwise delay is overwritten by results of stagger
   * and this results in no stagger
   */
  options[key] ? Object.assign(Object.assign({}, options), options[key]) : Object.assign({}, options)
);
function resolveElements(elements, selectorCache) {
  var _a;
  if (typeof elements === "string") {
    if (selectorCache) {
      (_a = selectorCache[elements]) !== null && _a !== void 0 ? _a : selectorCache[elements] = document.querySelectorAll(elements);
      elements = selectorCache[elements];
    } else {
      elements = document.querySelectorAll(elements);
    }
  } else if (elements instanceof Element) {
    elements = [elements];
  }
  return Array.from(elements || []);
}
const createAnimation = (factory) => factory();
const withControls = (animationFactory, options, duration = defaults.duration) => {
  return new Proxy({
    animations: animationFactory.map(createAnimation).filter(Boolean),
    duration,
    options
  }, controls);
};
const getActiveAnimation = (state) => state.animations[0];
const controls = {
  get: (target, key) => {
    const activeAnimation = getActiveAnimation(target);
    switch (key) {
      case "duration":
        return target.duration;
      case "currentTime":
        return time.s((activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key]) || 0);
      case "playbackRate":
      case "playState":
        return activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key];
      case "finished":
        if (!target.finished) {
          target.finished = Promise.all(target.animations.map(selectFinished)).catch(noop);
        }
        return target.finished;
      case "stop":
        return () => {
          target.animations.forEach((animation) => stopAnimation(animation));
        };
      case "forEachNative":
        return (callback) => {
          target.animations.forEach((animation) => callback(animation, target));
        };
      default:
        return typeof (activeAnimation === null || activeAnimation === void 0 ? void 0 : activeAnimation[key]) === "undefined" ? void 0 : () => target.animations.forEach((animation) => animation[key]());
    }
  },
  set: (target, key, value) => {
    switch (key) {
      case "currentTime":
        value = time.ms(value);
      case "playbackRate":
        for (let i = 0; i < target.animations.length; i++) {
          target.animations[i][key] = value;
        }
        return true;
    }
    return false;
  }
};
const selectFinished = (animation) => animation.finished;
function resolveOption(option, i, total) {
  return isFunction(option) ? option(i, total) : option;
}
function createAnimate(AnimatePolyfill) {
  return function animate2(elements, keyframes, options = {}) {
    elements = resolveElements(elements);
    const numElements = elements.length;
    const animationFactories = [];
    for (let i = 0; i < numElements; i++) {
      const element = elements[i];
      for (const key in keyframes) {
        const valueOptions = getOptions(options, key);
        valueOptions.delay = resolveOption(valueOptions.delay, i, numElements);
        const animation = animateStyle(element, key, keyframes[key], valueOptions, AnimatePolyfill);
        animationFactories.push(animation);
      }
    }
    return withControls(
      animationFactories,
      options,
      /**
       * TODO:
       * If easing is set to spring or glide, duration will be dynamically
       * generated. Ideally we would dynamically generate this from
       * animation.effect.getComputedTiming().duration but this isn't
       * supported in iOS13 or our number polyfill. Perhaps it's possible
       * to Proxy animations returned from animateStyle that has duration
       * as a getter.
       */
      options.duration
    );
  };
}
const animate$1 = createAnimate(Animation);
function animateProgress(target, options = {}) {
  return withControls([
    () => {
      const animation = new Animation(target, [0, 1], options);
      animation.finished.catch(() => {
      });
      return animation;
    }
  ], options, options.duration);
}
function animate(target, keyframesOrOptions, options) {
  const factory = isFunction(target) ? animateProgress : animate$1;
  return factory(target, keyframesOrOptions, options);
}
class AnimatedLinks {
  constructor({ elementsClass }) {
    /**флаг анимации, если true, то вправо, если false, то влево */
    __publicField(this, "direction", true);
    this.element = document.querySelector(elementsClass);
    if (!this.element) {
      return null;
    }
    if (this.element.scrollWidth && this.element.clientWidth && this.element.scrollWidth - this.element.clientWidth <= 0) {
      return null;
    }
    if (this.isMobileDevice()) {
      return null;
    }
    this.slides = this.element.querySelectorAll(`${elementsClass}>*`).length;
    console.log({ slides: this.slides });
    this.element.addEventListener("pointerenter", () => {
      if (this.cancel) {
        this.cancel();
        this.cancel = null;
        this.status = null;
      }
    });
    this.element.addEventListener("pointerleave", () => {
      if (this.status)
        return;
      this.createAnimation();
    });
    this.createAnimation();
  }
  //функция для создания анимации
  //проверить доступен ли DOM эдемент, если нет, то просто выйти
  //высчитать разницу между scrollLeftMax и scrollLeft
  //в зависимости от направления создаем анимацию, будем scrollLeft менять
  //в this.animate присваиваем значением вызова функции animaate
  createAnimation() {
    if (this.element && this.element instanceof HTMLElement) {
      this.status = true;
      let startScrollLeft = this.element.scrollLeft;
      let scrollLeftMax = this.element.scrollWidth - this.element.clientWidth || window.innerWidth;
      let { stop, finished } = animate((progress2) => {
        this.element.scrollLeft = this.direction ? startScrollLeft + (scrollLeftMax - startScrollLeft) * progress2 : startScrollLeft - startScrollLeft * progress2;
      }, {
        duration: 6
      });
      finished.then(() => {
        if (this.status) {
          this.direction = !this.direction;
          this.createAnimation();
        }
      });
      this.cancel = stop;
    }
  }
  isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
}
(function() {
  const mobileButton = document.querySelector(".mobile_bottom__button");
  const menu = document.querySelector(".main_flow__aside") || document.querySelector(".menu");
  let menuOpen = false;
  function toggleMenu() {
    if (menuOpen) {
      menu.style.transform = "translateX(-150%)";
    } else {
      menu.style.transform = "translateX(-50%)";
    }
    menuOpen = !menuOpen;
  }
  mobileButton.addEventListener("click", toggleMenu);
})();
(function goUpButton() {
  var element = document.createElement("div");
  element.classList.add("goUp");
  element.setAttribute("aria-label", "перейти вверх страницы");
  element.setAttribute("tabindex", 0);
  setupElement();
  addRulingScripts();
  document.body.appendChild(element);
  function setupElement() {
    element.innerHTML = `<svg aria-label="hidden" viewBox="0 0 41 22" fill="none">
                                <path d="M3 19L20.5 3L38 19" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                           </svg>`;
  }
  function addRulingScripts() {
    if (!element)
      return;
    element.addEventListener("click", () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    });
    document.addEventListener("scroll", () => {
      let windowHeight = window.innerHeight;
      let scrollTop = document.documentElement.scrollTop;
      let scrollRemain = document.documentElement.offsetHeight - document.documentElement.scrollTop - windowHeight;
      if (scrollTop > windowHeight / 2) {
        element.style.display = "flex";
      } else {
        element.style.display = "none";
      }
      if (scrollRemain < windowHeight / 3) {
        element.classList.add("stop-scroll");
      } else {
        element.classList.remove("stop-scroll");
      }
    });
  }
})();
(function controllscroll() {
  if (isMobileDevice())
    return;
  const element = document.querySelector(".header") || document.querySelector(".header-post");
  if (!element)
    return;
  function controllTopScroll() {
    if (window.scrollY > 0) {
      element.classList.add("header--dark");
    } else {
      element.classList.remove("header--dark");
    }
  }
  const freezed = /* @__PURE__ */ (() => {
    let freezed2 = false;
    return () => {
      if (freezed2)
        return;
      freezed2 = true;
      setTimeout(() => {
        freezed2 = false;
        controllTopScroll();
      }, 100);
    };
  })();
  document.addEventListener("scroll", freezed);
})();
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
(function() {
  const cancelElement = document.getElementById("cancel");
  const HIGHCONTRAST = "highcontrast";
  const MAXWIDTH2 = 801;
  const hitBox = cancelElement.closest(".header-post__icon_wrapper") || cancelElement.closest(".header__icon_wrapper");
  let controlBar;
  let open = false;
  if (!cancelElement || !hitBox) {
    console.log("Нет контейнера для кнопки высокого констраста");
    return;
  }
  hitBox.addEventListener("click", () => {
    animation();
  });
  createControlBar();
  addEventListenerForControl();
  function animation() {
    const duration = 0.5;
    if (!open) {
      open = true;
      displayControlBar();
      animate(cancelElement, {
        transform: ["translate(200%, -200%)", "translate(0, 0)"],
        opacity: [0.4, 1]
      }, {
        duration
      });
      document.documentElement.classList.add(HIGHCONTRAST);
      if (controlBar) {
        animate(controlBar, {
          opacity: [0, 1],
          transform: "translate(-50%, 110%)"
        }, {
          duration
        });
      }
    } else {
      open = false;
      animate(cancelElement, {
        transform: ["translate(0, 0)", "translate(200%, -200%)"],
        opacity: [1, 0.4]
      }, {
        duration
      });
      document.documentElement.classList.remove(HIGHCONTRAST);
      if (controlBar) {
        animate(controlBar, {
          opacity: [1, 0],
          transform: "translate(-50%, 0%)"
        }, {
          duration
        });
      }
      setTimeout(() => controlBar.style.display = "none", duration * 1e3);
    }
  }
  function createControlBar() {
    controlBar = document.createElement("div");
    controlBar.classList.add("highcontrast__control");
    controlBar.innerHTML = `
            <span id="fontSize">Выберите размер текста</span>
            <div class="highcontrast__buttons">
                <button data-size="standart" class="highcontrast__btn">стандарт</button>
                <button data-size="medium" class="highcontrast__btn">средний</button>
                <button data-size="big" class="highcontrast__btn">большой</button>
            </div>`;
    addToHeader(controlBar);
  }
  function addToHeader(controlBar2) {
    const header = hitBox.closest("header");
    if (!header) {
      console.error("Не удалось найти элемент для созданий меню HIGHCONTRAST");
      return;
    }
    header.append(controlBar2);
  }
  function addEventListenerForControl() {
    if (!controlBar)
      return;
    controlBar.addEventListener("click", function clickContrastControll(e) {
      const target = e.target;
      if (target.tagName !== "BUTTON")
        return;
      const label = target.dataset.size;
      if (!label)
        return;
      switch (label) {
        case "standart":
          document.documentElement.style.fontSize = "16px";
          break;
        case "medium":
          document.documentElement.style.fontSize = "20px";
          break;
        case "big":
          document.documentElement.style.fontSize = "24px";
          break;
        default:
          document.documentElement.style.fontSize = "16px";
      }
    });
  }
  function displayControlBar() {
    if (Math.max(window.innerWidth < MAXWIDTH2 || document.documentElement.offsetWidth < 801)) {
      controlBar.querySelector(".highcontrast__buttons");
      controlBar.style.display = "block";
    } else {
      controlBar.style.display = "block";
    }
  }
})();
let closeButton = null;
class CloseButton {
  constructor(elementToClose) {
    if (closeButton && closeButton instanceof HTMLButtonElement) {
      return closeButton;
    }
    this.elementToClose = elementToClose;
    closeButton = document.createElement("button");
    closeButton.classList.add("close-button");
    closeButton.textContent = "Закрыть";
    return closeButton;
  }
}
const foldersTreeButton = `<div class="sub-menu__folders_tree" role="button" aria-label="Открыть подменю">
                <svg aria-hidden="true" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.976745 0C0.783563 0 0.59472 0.0703789 0.434095 0.202237C0.27347 0.334094 0.148278 0.521509 0.0743507 0.74078C0.000423205 0.960051 -0.0189196 1.20133 0.0187683 1.43411C0.0564562 1.66689 0.149482 1.8807 0.286082 2.04853C0.422682 2.21635 0.596722 2.33064 0.786191 2.37694C0.975661 2.42324 1.17205 2.39948 1.35053 2.30866C1.52901 2.21783 1.68155 2.06402 1.78888 1.86668C1.8962 1.66935 1.95349 1.43734 1.95349 1.2C1.95349 0.88174 1.85058 0.576516 1.66741 0.351472C1.48423 0.126428 1.23579 0 0.976745 0ZM4.88372 2.4H18.5581C18.8172 2.4 19.0656 2.27357 19.2488 2.04853C19.432 1.82348 19.5349 1.51826 19.5349 1.2C19.5349 0.88174 19.432 0.576516 19.2488 0.351472C19.0656 0.126428 18.8172 0 18.5581 0H4.88372C4.62467 0 4.37623 0.126428 4.19306 0.351472C4.00988 0.576516 3.90698 0.88174 3.90698 1.2C3.90698 1.51826 4.00988 1.82348 4.19306 2.04853C4.37623 2.27357 4.62467 2.4 4.88372 2.4ZM4.88372 6C4.69054 6 4.5017 6.07038 4.34107 6.20224C4.18045 6.33409 4.05525 6.52151 3.98133 6.74078C3.9074 6.96005 3.88806 7.20133 3.92574 7.43411C3.96343 7.66689 4.05646 7.8807 4.19306 8.04853C4.32966 8.21635 4.5037 8.33064 4.69317 8.37694C4.88264 8.42324 5.07903 8.39948 5.25751 8.30866C5.43598 8.21783 5.58853 8.06402 5.69585 7.86668C5.80318 7.66935 5.86047 7.43734 5.86047 7.2C5.86047 6.88174 5.75756 6.57652 5.57438 6.35147C5.39121 6.12643 5.14277 6 4.88372 6ZM8.7907 12C8.59752 12 8.40867 12.0704 8.24805 12.2022C8.08742 12.3341 7.96223 12.5215 7.8883 12.7408C7.81438 12.9601 7.79503 13.2013 7.83272 13.4341C7.87041 13.6669 7.96344 13.8807 8.10004 14.0485C8.23664 14.2164 8.41068 14.3306 8.60015 14.3769C8.78962 14.4232 8.98601 14.3995 9.16448 14.3087C9.34296 14.2178 9.49551 14.064 9.60283 13.8667C9.71016 13.6693 9.76744 13.4373 9.76744 13.2C9.76744 12.8817 9.66454 12.5765 9.48136 12.3515C9.29819 12.1264 9.04975 12 8.7907 12ZM18.5581 6H8.7907C8.53165 6 8.28321 6.12643 8.10004 6.35147C7.91686 6.57652 7.81395 6.88174 7.81395 7.2C7.81395 7.51826 7.91686 7.82348 8.10004 8.04853C8.28321 8.27357 8.53165 8.4 8.7907 8.4H18.5581C18.8172 8.4 19.0656 8.27357 19.2488 8.04853C19.432 7.82348 19.5349 7.51826 19.5349 7.2C19.5349 6.88174 19.432 6.57652 19.2488 6.35147C19.0656 6.12643 18.8172 6 18.5581 6ZM18.5581 12H12.6977C12.4386 12 12.1902 12.1264 12.007 12.3515C11.8238 12.5765 11.7209 12.8817 11.7209 13.2C11.7209 13.5183 11.8238 13.8235 12.007 14.0485C12.1902 14.2736 12.4386 14.4 12.6977 14.4H18.5581C18.8172 14.4 19.0656 14.2736 19.2488 14.0485C19.432 13.8235 19.5349 13.5183 19.5349 13.2C19.5349 12.8817 19.432 12.5765 19.2488 12.3515C19.0656 12.1264 18.8172 12 18.5581 12Z"/>
                </svg>
                </div>`;
const MAXWIDTH = 801;
const subMenuClass = "sub-menu";
const menuItemWrapper = ".menu__main-item-wrapper";
const subMenuMobileClass = "sub-menu__mobile";
let isMobile = false;
let isMenuOpen = false;
(function subMenus() {
  if (Math.max(window.innerWidth, document.documentElement.offsetWidth) < MAXWIDTH) {
    isMobile = true;
  }
  const mainMenu = document.querySelector(".menu__main");
  if (isMobile) {
    generateSubMenuOpenButtons();
  } else {
    const mainMenuItems = Array.from(mainMenu.querySelectorAll(".menu__main-item"));
    mainMenuItems.forEach((item) => {
      item.addEventListener("pointerenter", pointerEntersMainMenu);
    });
    mainMenu.addEventListener("pointerleave", pointerLeavesMainMenu);
  }
  function pointerEntersMainMenu(e) {
    const target = e.target;
    if (target.classList.contains("menu__main-item") || target.closest(".menu__main-item")) {
      disableActiveSubMenus(subMenuClass);
      const subMenu = getSubMenu(target);
      if (!subMenu)
        return;
      animateSubMenuIn(subMenu);
      subMenu.addEventListener("pointerleave", function pointerLeavesSubMenu() {
        animateSubMenuOut(subMenu);
      }, { once: true });
    }
  }
  function pointerLeavesMainMenu() {
    const elementToHide = mainMenu.querySelector(".sub-menu--active");
    if (!elementToHide)
      return;
    animateSubMenuOut(elementToHide);
  }
  function createSubMenuButton(item) {
    item.insertAdjacentHTML("beforeend", foldersTreeButton);
  }
  function closeSubMenu(e) {
    const target = e.target;
    const duration = 0.4;
    if (!target.classList.contains("close-button"))
      return;
    e.stopPropagation();
    const subMenu = getSubMenu(target);
    if (!subMenu)
      return;
    animate(subMenu, {
      opacity: [1, 0],
      y: ["-50%", "-30%"],
      x: ["-50%", "0%"],
      duration
    });
    setTimeout(() => subMenu.classList.remove(subMenuMobileClass), duration * 1e3);
  }
  function generateSubMenuOpenButtons() {
    const menuList = Array.from(mainMenu.querySelectorAll(menuItemWrapper));
    menuList.forEach((item) => {
      if (item.querySelector(`.${subMenuClass}`)) {
        createSubMenuButton(item);
        let button = item.querySelector(".sub-menu__folders_tree");
        if (!button)
          return;
        button.addEventListener("click", mobileClickOnMainMenu);
      }
    });
  }
  function mobileClickOnMainMenu(e) {
    const target = e.target;
    const menuElementWrapper = target.closest(menuItemWrapper);
    if (!menuElementWrapper)
      return;
    const subMenu = getSubMenu(menuElementWrapper);
    if (!subMenu)
      return false;
    subMenu.classList.add(subMenuMobileClass);
    animate(subMenu, {
      opacity: [0, 1],
      x: ["-50%"],
      y: ["-30%", "-50%"],
      duration: 0.4
    });
    const button = new CloseButton();
    if (button)
      subMenu.appendChild(button);
    button.addEventListener("click", closeSubMenu);
  }
  function getSubMenu(target) {
    const menuItemWrapper2 = target.closest(".menu__main-item-wrapper");
    if (!menuItemWrapper2)
      return false;
    return menuItemWrapper2.querySelector(".sub-menu");
  }
  function disableActiveSubMenus(className) {
    let activeSubmenu = mainMenu.querySelector(`.${className}`);
    if (!activeSubmenu)
      return;
    animateSubMenuOut(activeSubmenu);
  }
  function animateSubMenuIn(subMenuElement) {
    if (isMenuOpen)
      return;
    subMenuElement.style.display = "block";
    subMenuElement.classList.add("sub-menu--active");
    isMenuOpen = true;
    animate(subMenuElement, {
      opacity: [0, 1],
      y: ["-30%", "-50%"],
      duration: 0.4
    });
  }
  function animateSubMenuOut(subMenuElement) {
    const timeout = 0.4;
    if (!isMenuOpen)
      return;
    animate(subMenuElement, {
      opacity: [1, 0],
      y: ["-50%", "-30%"],
      duration: timeout
    });
    setTimeout(() => {
      subMenuElement.style.display = "none";
      subMenuElement.classList.remove("sub-menu--active");
      isMenuOpen = false;
    }, timeout * 1e3);
  }
})();
new HeroSlider();
new AnimatedLinks({ elementsClass: ".links" });
