(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  it: {
    query: {
      actions: {
        showelevation: "Visualizza elevazione"
      }
    },
    chart: {
      title: 'Elevazione',
      tooltip: {
        title: 'Distanza'
      },
      labels: {
        x: 'Distanza (m)',
        y: 'Altezza (m)'
      }
    }
  },
  en: {
    query: {
      actions: {
        showelevation: "Show elevation"
      }
    },
    chart: {
      title: "Elevation",
      tooltip: {
        title: "Distance"
      },
      labels: {
        x: 'Distance (m)',
        y: 'Height (m)'
      }
    }
  }
};

},{}],2:[function(require,module,exports){
Object.defineProperty(exports, "__esModule", {
  value: true
});

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  i18n: _i18n2.default
};

},{"./i18n":1}],3:[function(require,module,exports){
var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inherit = g3wsdk.core.utils.inherit;
var base = g3wsdk.core.utils.base;
var Plugin = g3wsdk.core.plugin.Plugin;
var Service = require('./pluginservice');
var addI18nPlugin = g3wsdk.core.i18n.addI18nPlugin;

var _Plugin = function _Plugin() {
  base(this);
  this.name = 'eleprofile';
  this.init = function () {
    // add i18n of the plugin
    addI18nPlugin({
      name: this.name,
      config: _config2.default.i18n
    });
    // set catalog initial tab
    this.config = this.getConfig();
    this.setService(Service);
    this.service.init(this.config);
    this.registerPlugin(this.config.gid);
    // create API
    this.setReady(true);
  };
  //called when plugin is removed
  this.unload = function () {
    this.service.clear();
  };
};

inherit(_Plugin, Plugin);

(function (plugin) {
  plugin.init();
})(new _Plugin());

},{"./config":2,"./pluginservice":86}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":10}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/is-iterable"), __esModule: true };
},{"core-js/library/fn/is-iterable":11}],6:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/promise"), __esModule: true };
},{"core-js/library/fn/promise":12}],7:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _promise = require("../core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _promise2.default(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return _promise2.default.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};
},{"../core-js/promise":6}],8:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _isIterable2 = require("../core-js/is-iterable");

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = require("../core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();
},{"../core-js/get-iterator":4,"../core-js/is-iterable":5}],9:[function(require,module,exports){
module.exports = require("regenerator-runtime");

},{"regenerator-runtime":84}],10:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');

},{"../modules/core.get-iterator":75,"../modules/es6.string.iterator":80,"../modules/web.dom.iterable":83}],11:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.is-iterable');

},{"../modules/core.is-iterable":76,"../modules/es6.string.iterator":80,"../modules/web.dom.iterable":83}],12:[function(require,module,exports){
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
require('../modules/es7.promise.finally');
require('../modules/es7.promise.try');
module.exports = require('../modules/_core').Promise;

},{"../modules/_core":20,"../modules/es6.object.to-string":78,"../modules/es6.promise":79,"../modules/es6.string.iterator":80,"../modules/es7.promise.finally":81,"../modules/es7.promise.try":82,"../modules/web.dom.iterable":83}],13:[function(require,module,exports){
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],14:[function(require,module,exports){
module.exports = function () { /* empty */ };

},{}],15:[function(require,module,exports){
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],16:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":37}],17:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-absolute-index":65,"./_to-iobject":67,"./_to-length":68}],18:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":19,"./_wks":73}],19:[function(require,module,exports){
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],20:[function(require,module,exports){
var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],21:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":13}],22:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],23:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":27}],24:[function(require,module,exports){
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_global":29,"./_is-object":37}],25:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],26:[function(require,module,exports){
var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var has = require('./_has');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_core":20,"./_ctx":21,"./_global":29,"./_has":30,"./_hide":31}],27:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],28:[function(require,module,exports){
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_an-object":16,"./_ctx":21,"./_is-array-iter":36,"./_iter-call":38,"./_to-length":68,"./core.get-iterator-method":74}],29:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],30:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],31:[function(require,module,exports){
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_descriptors":23,"./_object-dp":48,"./_property-desc":55}],32:[function(require,module,exports){
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":29}],33:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":23,"./_dom-create":24,"./_fails":27}],34:[function(require,module,exports){
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],35:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":19}],36:[function(require,module,exports){
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":43,"./_wks":73}],37:[function(require,module,exports){
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],38:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":16}],39:[function(require,module,exports){
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_hide":31,"./_object-create":47,"./_property-desc":55,"./_set-to-string-tag":59,"./_wks":73}],40:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_export":26,"./_hide":31,"./_iter-create":39,"./_iterators":43,"./_library":44,"./_object-gpo":50,"./_redefine":57,"./_set-to-string-tag":59,"./_wks":73}],41:[function(require,module,exports){
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":73}],42:[function(require,module,exports){
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],43:[function(require,module,exports){
module.exports = {};

},{}],44:[function(require,module,exports){
module.exports = true;

},{}],45:[function(require,module,exports){
var global = require('./_global');
var macrotask = require('./_task').set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = require('./_cof')(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

},{"./_cof":19,"./_global":29,"./_task":64}],46:[function(require,module,exports){
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":13}],47:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":16,"./_dom-create":24,"./_enum-bug-keys":25,"./_html":32,"./_object-dps":49,"./_shared-key":60}],48:[function(require,module,exports){
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":16,"./_descriptors":23,"./_ie8-dom-define":33,"./_to-primitive":70}],49:[function(require,module,exports){
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_an-object":16,"./_descriptors":23,"./_object-dp":48,"./_object-keys":52}],50:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":30,"./_shared-key":60,"./_to-object":69}],51:[function(require,module,exports){
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_array-includes":17,"./_has":30,"./_shared-key":60,"./_to-iobject":67}],52:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_enum-bug-keys":25,"./_object-keys-internal":51}],53:[function(require,module,exports){
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],54:[function(require,module,exports){
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":16,"./_is-object":37,"./_new-promise-capability":46}],55:[function(require,module,exports){
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],56:[function(require,module,exports){
var hide = require('./_hide');
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

},{"./_hide":31}],57:[function(require,module,exports){
module.exports = require('./_hide');

},{"./_hide":31}],58:[function(require,module,exports){
'use strict';
var global = require('./_global');
var core = require('./_core');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_core":20,"./_descriptors":23,"./_global":29,"./_object-dp":48,"./_wks":73}],59:[function(require,module,exports){
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_has":30,"./_object-dp":48,"./_wks":73}],60:[function(require,module,exports){
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":61,"./_uid":71}],61:[function(require,module,exports){
var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":20,"./_global":29,"./_library":44}],62:[function(require,module,exports){
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_a-function":13,"./_an-object":16,"./_wks":73}],63:[function(require,module,exports){
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_defined":22,"./_to-integer":66}],64:[function(require,module,exports){
var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_cof":19,"./_ctx":21,"./_dom-create":24,"./_global":29,"./_html":32,"./_invoke":34}],65:[function(require,module,exports){
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":66}],66:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],67:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_defined":22,"./_iobject":35}],68:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":66}],69:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":22}],70:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":37}],71:[function(require,module,exports){
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],72:[function(require,module,exports){
var global = require('./_global');
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

},{"./_global":29}],73:[function(require,module,exports){
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_global":29,"./_shared":61,"./_uid":71}],74:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":18,"./_core":20,"./_iterators":43,"./_wks":73}],75:[function(require,module,exports){
var anObject = require('./_an-object');
var get = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

},{"./_an-object":16,"./_core":20,"./core.get-iterator-method":74}],76:[function(require,module,exports){
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};

},{"./_classof":18,"./_core":20,"./_iterators":43,"./_wks":73}],77:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":14,"./_iter-define":40,"./_iter-step":42,"./_iterators":43,"./_to-iobject":67}],78:[function(require,module,exports){

},{}],79:[function(require,module,exports){
'use strict';
var LIBRARY = require('./_library');
var global = require('./_global');
var ctx = require('./_ctx');
var classof = require('./_classof');
var $export = require('./_export');
var isObject = require('./_is-object');
var aFunction = require('./_a-function');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var speciesConstructor = require('./_species-constructor');
var task = require('./_task').set;
var microtask = require('./_microtask')();
var newPromiseCapabilityModule = require('./_new-promise-capability');
var perform = require('./_perform');
var userAgent = require('./_user-agent');
var promiseResolve = require('./_promise-resolve');
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"./_a-function":13,"./_an-instance":15,"./_classof":18,"./_core":20,"./_ctx":21,"./_export":26,"./_for-of":28,"./_global":29,"./_is-object":37,"./_iter-detect":41,"./_library":44,"./_microtask":45,"./_new-promise-capability":46,"./_perform":53,"./_promise-resolve":54,"./_redefine-all":56,"./_set-species":58,"./_set-to-string-tag":59,"./_species-constructor":62,"./_task":64,"./_user-agent":72,"./_wks":73}],80:[function(require,module,exports){
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_iter-define":40,"./_string-at":63}],81:[function(require,module,exports){
// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = require('./_export');
var core = require('./_core');
var global = require('./_global');
var speciesConstructor = require('./_species-constructor');
var promiseResolve = require('./_promise-resolve');

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

},{"./_core":20,"./_export":26,"./_global":29,"./_promise-resolve":54,"./_species-constructor":62}],82:[function(require,module,exports){
'use strict';
// https://github.com/tc39/proposal-promise-try
var $export = require('./_export');
var newPromiseCapability = require('./_new-promise-capability');
var perform = require('./_perform');

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });

},{"./_export":26,"./_new-promise-capability":46,"./_perform":53}],83:[function(require,module,exports){
require('./es6.array.iterator');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var TO_STRING_TAG = require('./_wks')('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

},{"./_global":29,"./_hide":31,"./_iterators":43,"./_wks":73,"./es6.array.iterator":77}],84:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() { return this })() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = require("./runtime");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}

},{"./runtime":85}],85:[function(require,module,exports){
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() { return this })() || Function("return this")()
);

},{}],86:[function(require,module,exports){
var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inherit = g3wsdk.core.utils.inherit;
var base = g3wsdk.core.utils.base;
var XHR = g3wsdk.core.utils.XHR;
var PluginService = g3wsdk.core.plugin.PluginService;
var t = g3wsdk.core.i18n.tPlugin;
var GUI = g3wsdk.gui.GUI;
var ComponentsFactory = g3wsdk.gui.ComponentsFactory;
var ChartsFactory = g3wsdk.gui.vue.Charts.ChartsFactory;

function ElevationProfileService() {
  base(this);
  this.init = function () {
    var _this = this;

    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.chartColor = GUI.skinColor;
    this.config = config;
    this._mapService = GUI.getComponent('map').getService();
    this.keySetters = {};
    var queryresultsComponent = GUI.getComponent('queryresults');
    this.queryresultsService = queryresultsComponent.getService();
    //usefult to register layer under law
    this.keySetters.addActionLayers = this.queryresultsService.onbefore('addActionsForLayers', function () {
      var actions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _this.config.layers.forEach(function (layerObj) {
        var layerId = layerObj.layer_id;

        if (!actions[layerId]) actions[layerId] = [];
        var layerActions = actions[layerId];
        layerActions.push({
          id: 'showelevation',
          class: GUI.getFontClass('chart'),
          hint: 'plugins.eleprofile.query.actions.showelevation',
          cbk: function cbk(layer, feature) {
            _this.showChartComponent({
              layerObj: layerObj,
              fid: feature.attributes['g3w_fid']
            });
          }
        });
      });
    });
  };

  this.getConfig = function () {
    return this.config;
  };

  this.getUrls = function () {
    return this.config.urls;
  };

  this.showChartComponent = function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        layerObj = _ref.layerObj,
        fid = _ref.fid;

    var api = layerObj.api,
        layerId = layerObj.layer_id;

    this.getChartComponent({ api: api, layerId: layerId, fid: fid }).then(function (_ref2) {
      var fid = _ref2.fid,
          vueComponentObject = _ref2.component,
          error = _ref2.error;

      if (error) return;else GUI.pushContent({
        id: 'elevation',
        content: ComponentsFactory.build({
          vueComponentObject: vueComponentObject
        }),
        perc: 50,
        closable: false
      });
    });
  };

  this.getChartComponent = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          api = _ref4.api,
          layerId = _ref4.layerId,
          fid = _ref4.fid;

      var response, data, graphData, i, _data, x, y, self, map, hideHightlightFnc;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return this.getElevationData({ api: api, layerId: layerId, fid: fid });

            case 3:
              response = _context.sent;
              data = response.result && response.profile;

              if (!data) {
                _context.next = 12;
                break;
              }

              graphData = {
                x: ['x'],
                y: ['y'],
                minX: 9999999,
                maxX: -9999999,
                minY: 9999999,
                maxY: -9999999
              };

              for (i = 0; i < data.length; i++) {
                _data = data[i];
                x = _data[3];
                y = _data[2];

                graphData.minX = x < graphData.minX ? x : graphData.minX;
                graphData.minY = y < graphData.minY ? y : graphData.minY;
                graphData.maxX = x > graphData.maxX ? x : graphData.maxX;
                graphData.maxY = y > graphData.maxY ? y : graphData.maxY;
                graphData.x.push(x);
                graphData.y.push(y);
              }
              self = this;
              map = this._mapService.getMap();

              hideHightlightFnc = function hideHightlightFnc() {};

              return _context.abrupt('return', {
                data: data,
                id: t('eleprofile.chart.title'),
                component: ChartsFactory.build({
                  type: 'c3:lineXY',
                  hooks: {
                    created: function created() {
                      this.setConfig({
                        onmouseout: function onmouseout() {
                          hideHightlightFnc();
                        },

                        title: {
                          text: t('eleprofile.chart.title'),
                          position: 'top-center'
                        },
                        padding: {
                          top: 40,
                          bottom: 30,
                          right: 30
                        },
                        zoom: {
                          enabled: true,
                          rescale: true
                        },
                        data: {
                          selection: {
                            enabled: false,
                            draggable: true
                          },
                          x: 'x',
                          y: 'y',
                          types: {
                            y: 'area'
                          },
                          colors: {
                            x: self.chartColor,
                            y: self.chartColor
                          },
                          columns: [graphData.x, graphData.y],
                          onmouseout: function onmouseout(evt) {
                            hideHightlightFnc();
                          },
                          onclick: function onclick(_ref5) {
                            var index = _ref5.index;

                            var _data$index = (0, _slicedToArray3.default)(data[index], 2),
                                x = _data$index[0],
                                y = _data$index[1];

                            map.getView().setCenter([x, y]);
                          }
                        },
                        legend: {
                          show: false
                        },
                        tooltip: {
                          format: {
                            title: function title(d) {
                              return t('eleprofile.chart.tooltip.title') + ': ' + data[d][3];
                            }
                          },
                          contents: function contents(_data, color) {
                            var index = _data[0].index;

                            var _data$index2 = (0, _slicedToArray3.default)(data[index], 3),
                                x = _data$index2[0],
                                y = _data$index2[1],
                                value = _data$index2[2];

                            var point_geom = new ol.geom.Point([x, y]);
                            self._mapService.highlightGeometry(point_geom, {
                              zoom: false,
                              hide: function hide(callback) {
                                hideHightlightFnc = callback;
                              },
                              style: new ol.style.Style({
                                image: new ol.style.RegularShape({
                                  fill: new ol.style.Fill({ color: 'white' }),
                                  stroke: new ol.style.Stroke({ color: self.chartColor, width: 3 }),
                                  points: 3,
                                  radius: 12,
                                  angle: 0
                                })
                              })
                            });
                            return '<div style="font-weight: bold; border:2px solid; background-color: #ffffff; padding: 3px;border-radius: 3px;" \n                          class="skin-border-color skin-color">' + value.toFixed(2) + '(m)</div>';
                          }
                        },
                        axis: {
                          x: {
                            max: graphData.maxX + 2,
                            min: graphData.minX - 2,
                            label: {
                              text: t('eleprofile.chart.labels.x'),
                              position: 'outer-center'
                            },
                            tick: {
                              fit: false,
                              count: 4,
                              format: function format(value) {
                                return value.toFixed(2);
                              }
                            }
                          },
                          y: {
                            max: graphData.maxY + 5,
                            min: graphData.minY - 5,
                            label: {
                              text: t('eleprofile.chart.labels.y'),
                              position: 'outer-middle'
                            },
                            tick: {
                              count: 5,
                              format: function format(value) {
                                return value.toFixed(2);
                              }
                            }
                          }
                        }
                      });
                    }
                  }
                })
              });

            case 12:
              _context.next = 17;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context['catch'](0);
              return _context.abrupt('return', {
                error: true
              });

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 14]]);
    }));

    return function () {
      return _ref3.apply(this, arguments);
    };
  }();

  this.getElevationData = function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          api = _ref7.api,
          layerId = _ref7.layerId,
          fid = _ref7.fid;

      var url, data, response;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              url = '' + api + layerId + '/' + fid;
              data = {
                result: false
              };
              _context2.prev = 2;
              _context2.next = 5;
              return XHR.get({
                url: url
              });

            case 5:
              response = _context2.sent;

              data.profile = response.profile;
              data.result = true;
              _context2.next = 12;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2['catch'](2);

            case 12:
              return _context2.abrupt('return', data);

            case 13:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[2, 10]]);
    }));

    return function () {
      return _ref6.apply(this, arguments);
    };
  }();

  this.clear = function () {
    this.queryresultsService.un('addActionLayers', this.keySetters.addActionLayers);
  };
}

inherit(ElevationProfileService, PluginService);

module.exports = new ElevationProfileService();

},{"babel-runtime/helpers/asyncToGenerator":7,"babel-runtime/helpers/slicedToArray":8,"babel-runtime/regenerator":9}]},{},[3])

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcvaTE4bi9pbmRleC5qcyIsImNvbmZpZy9pbmRleC5qcyIsImluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9nZXQtaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2lzLWl0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9wcm9taXNlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3Byb21pc2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4taW5zdGFuY2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NsYXNzb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZm9yLW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ludm9rZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXktaXRlci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZXRlY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19taWNyb3Rhc2suanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX25ldy1wcm9taXNlLWNhcGFiaWxpdHkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdwby5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wZXJmb3JtLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9taXNlLXJlc29sdmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLWFsbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcmVkZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC1zcGVjaWVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zcGVjaWVzLWNvbnN0cnVjdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Rhc2suanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWFic29sdXRlLWluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VzZXItYWdlbnQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnByb21pc2UuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcucHJvbWlzZS5maW5hbGx5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5wcm9taXNlLnRyeS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS1tb2R1bGUuanMiLCJub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwicGx1Z2luc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztrQkNBZTtBQUNiLE1BQUk7QUFDRixXQUFPO0FBQ0wsZUFBUztBQUNQLHVCQUFlO0FBRFI7QUFESixLQURMO0FBTUYsV0FBTztBQUNMLGFBQU8sWUFERjtBQUVMLGVBQVM7QUFDUCxlQUFPO0FBREEsT0FGSjtBQUtMLGNBQVE7QUFDTixXQUFHLGNBREc7QUFFTixXQUFFO0FBRkk7QUFMSDtBQU5MLEdBRFM7QUFrQmIsTUFBSTtBQUNGLFdBQU87QUFDTCxlQUFTO0FBQ1AsdUJBQWU7QUFEUjtBQURKLEtBREw7QUFNRixXQUFPO0FBQ0wsYUFBTyxXQURGO0FBRUwsZUFBUztBQUNQLGVBQU87QUFEQSxPQUZKO0FBS0wsY0FBUTtBQUNOLFdBQUcsY0FERztBQUVOLFdBQUU7QUFGSTtBQUxIO0FBTkw7QUFsQlMsQzs7Ozs7OztBQ0FmOzs7Ozs7a0JBQ2U7QUFDYjtBQURhLEM7OztBQ0RmOzs7Ozs7QUFDQSxJQUFNLFVBQVUsT0FBTyxJQUFQLENBQVksS0FBWixDQUFrQixPQUFsQztBQUNBLElBQU0sT0FBTyxPQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLElBQS9CO0FBQ0EsSUFBTSxTQUFTLE9BQU8sSUFBUCxDQUFZLE1BQVosQ0FBbUIsTUFBbEM7QUFDQSxJQUFNLFVBQVUsUUFBUSxpQkFBUixDQUFoQjtBQUNBLElBQU0sZ0JBQWdCLE9BQU8sSUFBUCxDQUFZLElBQVosQ0FBaUIsYUFBdkM7O0FBRUEsSUFBTSxVQUFVLFNBQVYsT0FBVSxHQUFXO0FBQ3pCLE9BQUssSUFBTDtBQUNBLE9BQUssSUFBTCxHQUFZLFlBQVo7QUFDQSxPQUFLLElBQUwsR0FBWSxZQUFXO0FBQ3JCO0FBQ0Esa0JBQWM7QUFDWixZQUFNLEtBQUssSUFEQztBQUVaLGNBQVEsaUJBQWE7QUFGVCxLQUFkO0FBSUE7QUFDQSxTQUFLLE1BQUwsR0FBYyxLQUFLLFNBQUwsRUFBZDtBQUNBLFNBQUssVUFBTCxDQUFnQixPQUFoQjtBQUNBLFNBQUssT0FBTCxDQUFhLElBQWIsQ0FBa0IsS0FBSyxNQUF2QjtBQUNBLFNBQUssY0FBTCxDQUFvQixLQUFLLE1BQUwsQ0FBWSxHQUFoQztBQUNBO0FBQ0EsU0FBSyxRQUFMLENBQWMsSUFBZDtBQUNELEdBYkQ7QUFjQTtBQUNBLE9BQUssTUFBTCxHQUFjLFlBQVc7QUFDdkIsU0FBSyxPQUFMLENBQWEsS0FBYjtBQUNELEdBRkQ7QUFHRCxDQXJCRDs7QUF1QkEsUUFBUSxPQUFSLEVBQWlCLE1BQWpCOztBQUVBLENBQUMsVUFBUyxNQUFULEVBQWdCO0FBQ2YsU0FBTyxJQUFQO0FBQ0QsQ0FGRCxFQUVHLElBQUksT0FBSixFQUZIOzs7QUNoQ0E7O0FDQUE7O0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5UkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ3Z0QkEsSUFBTSxVQUFVLE9BQU8sSUFBUCxDQUFZLEtBQVosQ0FBa0IsT0FBbEM7QUFDQSxJQUFNLE9BQU8sT0FBTyxJQUFQLENBQVksS0FBWixDQUFrQixJQUEvQjtBQUNBLElBQU0sTUFBTSxPQUFPLElBQVAsQ0FBWSxLQUFaLENBQWtCLEdBQTlCO0FBQ0EsSUFBTSxnQkFBZ0IsT0FBTyxJQUFQLENBQVksTUFBWixDQUFtQixhQUF6QztBQUNBLElBQU0sSUFBSSxPQUFPLElBQVAsQ0FBWSxJQUFaLENBQWlCLE9BQTNCO0FBQ0EsSUFBTSxNQUFNLE9BQU8sR0FBUCxDQUFXLEdBQXZCO0FBQ0EsSUFBTSxvQkFBb0IsT0FBTyxHQUFQLENBQVcsaUJBQXJDO0FBQ0EsSUFBTSxnQkFBZ0IsT0FBTyxHQUFQLENBQVcsR0FBWCxDQUFlLE1BQWYsQ0FBc0IsYUFBNUM7O0FBRUEsU0FBUyx1QkFBVCxHQUFtQztBQUNqQyxPQUFLLElBQUw7QUFDQSxPQUFLLElBQUwsR0FBWSxZQUFvQjtBQUFBOztBQUFBLFFBQVgsTUFBVyx1RUFBSixFQUFJOztBQUM5QixTQUFLLFVBQUwsR0FBa0IsSUFBSSxTQUF0QjtBQUNBLFNBQUssTUFBTCxHQUFjLE1BQWQ7QUFDQSxTQUFLLFdBQUwsR0FBbUIsSUFBSSxZQUFKLENBQWlCLEtBQWpCLEVBQXdCLFVBQXhCLEVBQW5CO0FBQ0EsU0FBSyxVQUFMLEdBQWtCLEVBQWxCO0FBQ0EsUUFBTSx3QkFBd0IsSUFBSSxZQUFKLENBQWlCLGNBQWpCLENBQTlCO0FBQ0EsU0FBSyxtQkFBTCxHQUEyQixzQkFBc0IsVUFBdEIsRUFBM0I7QUFDQTtBQUNBLFNBQUssVUFBTCxDQUFnQixlQUFoQixHQUFrQyxLQUFLLG1CQUFMLENBQXlCLFFBQXpCLENBQWtDLHFCQUFsQyxFQUF5RCxZQUFnQjtBQUFBLFVBQWYsT0FBZSx1RUFBUCxFQUFPOztBQUN6RyxZQUFLLE1BQUwsQ0FBWSxNQUFaLENBQW1CLE9BQW5CLENBQTJCLG9CQUFZO0FBQUEsWUFDcEIsT0FEb0IsR0FDVCxRQURTLENBQzlCLFFBRDhCOztBQUVyQyxZQUFJLENBQUMsUUFBUSxPQUFSLENBQUwsRUFBdUIsUUFBUSxPQUFSLElBQW1CLEVBQW5CO0FBQ3ZCLFlBQU0sZUFBZSxRQUFRLE9BQVIsQ0FBckI7QUFDQSxxQkFBYSxJQUFiLENBQWtCO0FBQ2hCLGNBQUksZUFEWTtBQUVoQixpQkFBTyxJQUFJLFlBQUosQ0FBaUIsT0FBakIsQ0FGUztBQUdoQixnQkFBTSxnREFIVTtBQUloQixlQUFLLGFBQUMsS0FBRCxFQUFRLE9BQVIsRUFBb0I7QUFDdkIsa0JBQUssa0JBQUwsQ0FBd0I7QUFDdEIsZ0NBRHNCO0FBRXRCLG1CQUFLLFFBQVEsVUFBUixDQUFtQixTQUFuQjtBQUZpQixhQUF4QjtBQUlEO0FBVGUsU0FBbEI7QUFXRCxPQWZEO0FBZ0JELEtBakJpQyxDQUFsQztBQWtCRCxHQTFCRDs7QUE0QkEsT0FBSyxTQUFMLEdBQWlCLFlBQVU7QUFDekIsV0FBTyxLQUFLLE1BQVo7QUFDRCxHQUZEOztBQUlBLE9BQUssT0FBTCxHQUFlLFlBQVc7QUFDeEIsV0FBTyxLQUFLLE1BQUwsQ0FBWSxJQUFuQjtBQUNELEdBRkQ7O0FBSUEsT0FBSyxrQkFBTCxHQUEwQixZQUE2QjtBQUFBLG1GQUFKLEVBQUk7QUFBQSxRQUFuQixRQUFtQixRQUFuQixRQUFtQjtBQUFBLFFBQVQsR0FBUyxRQUFULEdBQVM7O0FBQUEsUUFDOUMsR0FEOEMsR0FDcEIsUUFEb0IsQ0FDOUMsR0FEOEM7QUFBQSxRQUMvQixPQUQrQixHQUNwQixRQURvQixDQUN6QyxRQUR5Qzs7QUFFckQsU0FBSyxpQkFBTCxDQUF1QixFQUFDLFFBQUQsRUFBTSxnQkFBTixFQUFlLFFBQWYsRUFBdkIsRUFDRyxJQURILENBQ1EsaUJBQWdEO0FBQUEsVUFBOUMsR0FBOEMsU0FBOUMsR0FBOEM7QUFBQSxVQUEvQixrQkFBK0IsU0FBekMsU0FBeUM7QUFBQSxVQUFYLEtBQVcsU0FBWCxLQUFXOztBQUNwRCxVQUFJLEtBQUosRUFBVyxPQUFYLEtBQ0ssSUFBSSxXQUFKLENBQWdCO0FBQ25CLFlBQUksV0FEZTtBQUVuQixpQkFBUyxrQkFBa0IsS0FBbEIsQ0FBd0I7QUFDL0I7QUFEK0IsU0FBeEIsQ0FGVTtBQUtuQixjQUFNLEVBTGE7QUFNbkIsa0JBQVU7QUFOUyxPQUFoQjtBQVFOLEtBWEg7QUFZRCxHQWREOztBQWdCQSxPQUFLLGlCQUFMO0FBQUEseUZBQXlCO0FBQUEsc0ZBQW1DLEVBQW5DO0FBQUEsVUFBZ0IsR0FBaEIsU0FBZ0IsR0FBaEI7QUFBQSxVQUFxQixPQUFyQixTQUFxQixPQUFyQjtBQUFBLFVBQThCLEdBQTlCLFNBQThCLEdBQTlCOztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHFCQUVFLEtBQUssZ0JBQUwsQ0FBc0IsRUFBQyxRQUFELEVBQU0sZ0JBQU4sRUFBZSxRQUFmLEVBQXRCLENBRkY7O0FBQUE7QUFFZixzQkFGZTtBQUdmLGtCQUhlLEdBR1IsU0FBUyxNQUFULElBQW1CLFNBQVMsT0FIcEI7O0FBQUEsbUJBSWpCLElBSmlCO0FBQUE7QUFBQTtBQUFBOztBQUtiLHVCQUxhLEdBS0Q7QUFDaEIsbUJBQUcsQ0FBQyxHQUFELENBRGE7QUFFaEIsbUJBQUcsQ0FBQyxHQUFELENBRmE7QUFHaEIsc0JBQU8sT0FIUztBQUloQixzQkFBTSxDQUFDLE9BSlM7QUFLaEIsc0JBQU8sT0FMUztBQU1oQixzQkFBTSxDQUFDO0FBTlMsZUFMQzs7QUFhbkIsbUJBQVMsQ0FBVCxHQUFXLENBQVgsRUFBYyxJQUFJLEtBQUssTUFBdkIsRUFBK0IsR0FBL0IsRUFBb0M7QUFDNUIscUJBRDRCLEdBQ3BCLEtBQUssQ0FBTCxDQURvQjtBQUU1QixpQkFGNEIsR0FFeEIsTUFBTSxDQUFOLENBRndCO0FBRzVCLGlCQUg0QixHQUd4QixNQUFNLENBQU4sQ0FId0I7O0FBSWxDLDBCQUFVLElBQVYsR0FBaUIsSUFBSSxVQUFVLElBQWQsR0FBcUIsQ0FBckIsR0FBeUIsVUFBVSxJQUFwRDtBQUNBLDBCQUFVLElBQVYsR0FBaUIsSUFBSSxVQUFVLElBQWQsR0FBcUIsQ0FBckIsR0FBeUIsVUFBVSxJQUFwRDtBQUNBLDBCQUFVLElBQVYsR0FBaUIsSUFBSSxVQUFVLElBQWQsR0FBcUIsQ0FBckIsR0FBeUIsVUFBVSxJQUFwRDtBQUNBLDBCQUFVLElBQVYsR0FBaUIsSUFBSSxVQUFVLElBQWQsR0FBcUIsQ0FBckIsR0FBeUIsVUFBVSxJQUFwRDtBQUNBLDBCQUFVLENBQVYsQ0FBWSxJQUFaLENBQWlCLENBQWpCO0FBQ0EsMEJBQVUsQ0FBVixDQUFZLElBQVosQ0FBaUIsQ0FBakI7QUFDRDtBQUNLLGtCQXhCYSxHQXdCTixJQXhCTTtBQXlCYixpQkF6QmEsR0F5QlAsS0FBSyxXQUFMLENBQWlCLE1BQWpCLEVBekJPOztBQTBCZiwrQkExQmUsR0EwQkssNkJBQU0sQ0FBRSxDQTFCYjs7QUFBQSwrQ0EyQlo7QUFDTCwwQkFESztBQUVMLG9CQUFJLEVBQUUsd0JBQUYsQ0FGQztBQUdMLDJCQUFXLGNBQWMsS0FBZCxDQUFvQjtBQUM3Qix3QkFBTSxXQUR1QjtBQUU3Qix5QkFBTztBQUNMLDJCQURLLHFCQUNLO0FBQ1IsMkJBQUssU0FBTCxDQUFlO0FBQ2Isa0NBRGEsd0JBQ0E7QUFDWDtBQUNELHlCQUhZOztBQUliLCtCQUFPO0FBQ0wsZ0NBQU0sRUFBRSx3QkFBRixDQUREO0FBRUwsb0NBQVU7QUFGTCx5QkFKTTtBQVFiLGlDQUFTO0FBQ1AsK0JBQUssRUFERTtBQUVQLGtDQUFRLEVBRkQ7QUFHUCxpQ0FBTztBQUhBLHlCQVJJO0FBYWIsOEJBQU07QUFDSixtQ0FBUyxJQURMO0FBRUosbUNBQVM7QUFGTCx5QkFiTztBQWlCYiw4QkFBTTtBQUNKLHFDQUFXO0FBQ1QscUNBQVMsS0FEQTtBQUVULHVDQUFXO0FBRkYsMkJBRFA7QUFLSiw2QkFBRyxHQUxDO0FBTUosNkJBQUcsR0FOQztBQU9KLGlDQUFPO0FBQ0wsK0JBQUc7QUFERSwyQkFQSDtBQVVKLGtDQUFRO0FBQ04sK0JBQUcsS0FBSyxVQURGO0FBRU4sK0JBQUcsS0FBSztBQUZGLDJCQVZKO0FBY0osbUNBQVMsQ0FDUCxVQUFVLENBREgsRUFFUCxVQUFVLENBRkgsQ0FkTDtBQWtCSixvQ0FsQkksc0JBa0JPLEdBbEJQLEVBa0JZO0FBQ2Q7QUFDRCwyQkFwQkc7QUFxQkosaUNBckJJLDBCQXFCYTtBQUFBLGdDQUFSLEtBQVEsU0FBUixLQUFROztBQUFBLDJFQUNBLEtBQUssS0FBTCxDQURBO0FBQUEsZ0NBQ1IsQ0FEUTtBQUFBLGdDQUNMLENBREs7O0FBRWYsZ0NBQUksT0FBSixHQUFjLFNBQWQsQ0FBd0IsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUF4QjtBQUNEO0FBeEJHLHlCQWpCTztBQTJDYixnQ0FBUTtBQUNOLGdDQUFNO0FBREEseUJBM0NLO0FBOENiLGlDQUFRO0FBQ04sa0NBQVE7QUFDTixpQ0FETSxpQkFDQSxDQURBLEVBQ0c7QUFDUCxxQ0FBVSxFQUFFLGdDQUFGLENBQVYsVUFBa0QsS0FBSyxDQUFMLEVBQVEsQ0FBUixDQUFsRDtBQUNEO0FBSEssMkJBREY7QUFNTixvQ0FBVSxrQkFBVSxLQUFWLEVBQWlCLEtBQWpCLEVBQXdCO0FBQ2hDLGdDQUFNLFFBQVEsTUFBTSxDQUFOLEVBQVMsS0FBdkI7O0FBRGdDLDRFQUVWLEtBQUssS0FBTCxDQUZVO0FBQUEsZ0NBRXpCLENBRnlCO0FBQUEsZ0NBRXRCLENBRnNCO0FBQUEsZ0NBRW5CLEtBRm1COztBQUdoQyxnQ0FBTSxhQUFhLElBQUksR0FBRyxJQUFILENBQVEsS0FBWixDQUNqQixDQUFDLENBQUQsRUFBSSxDQUFKLENBRGlCLENBQW5CO0FBR0EsaUNBQUssV0FBTCxDQUFpQixpQkFBakIsQ0FBbUMsVUFBbkMsRUFBK0M7QUFDN0Msb0NBQU0sS0FEdUM7QUFFN0Msb0NBQU0sY0FBUyxRQUFULEVBQW1CO0FBQ3ZCLG9EQUFvQixRQUFwQjtBQUNELCtCQUo0QztBQUs3QyxxQ0FBTyxJQUFJLEdBQUcsS0FBSCxDQUFTLEtBQWIsQ0FBbUI7QUFDeEIsdUNBQU8sSUFBSSxHQUFHLEtBQUgsQ0FBUyxZQUFiLENBQTBCO0FBQy9CLHdDQUFNLElBQUksR0FBRyxLQUFILENBQVMsSUFBYixDQUFrQixFQUFDLE9BQU8sT0FBUixFQUFsQixDQUR5QjtBQUUvQiwwQ0FBUSxJQUFJLEdBQUcsS0FBSCxDQUFTLE1BQWIsQ0FBb0IsRUFBQyxPQUFPLEtBQUssVUFBYixFQUF5QixPQUFPLENBQWhDLEVBQXBCLENBRnVCO0FBRy9CLDBDQUFRLENBSHVCO0FBSS9CLDBDQUFRLEVBSnVCO0FBSy9CLHlDQUFPO0FBTHdCLGlDQUExQjtBQURpQiwrQkFBbkI7QUFMc0MsNkJBQS9DO0FBZUEsdU5BQzJDLE1BQU0sT0FBTixDQUFjLENBQWQsQ0FEM0M7QUFFRDtBQTdCSyx5QkE5Q0s7QUE2RWIsOEJBQU07QUFDSiw2QkFBRztBQUNELGlDQUFLLFVBQVUsSUFBVixHQUFpQixDQURyQjtBQUVELGlDQUFLLFVBQVUsSUFBVixHQUFpQixDQUZyQjtBQUdELG1DQUFPO0FBQ0wsb0NBQU0sRUFBRSwyQkFBRixDQUREO0FBRUwsd0NBQVU7QUFGTCw2QkFITjtBQU9ELGtDQUFNO0FBQ0osbUNBQUssS0FERDtBQUVKLHFDQUFPLENBRkg7QUFHSixzQ0FBUSxnQkFBVSxLQUFWLEVBQWlCO0FBQ3ZCLHVDQUFPLE1BQU0sT0FBTixDQUFjLENBQWQsQ0FBUDtBQUNEO0FBTEc7QUFQTCwyQkFEQztBQWdCSiw2QkFBRztBQUNELGlDQUFLLFVBQVUsSUFBVixHQUFpQixDQURyQjtBQUVELGlDQUFLLFVBQVUsSUFBVixHQUFpQixDQUZyQjtBQUdELG1DQUFPO0FBQ0wsb0NBQU0sRUFBRSwyQkFBRixDQUREO0FBRUwsd0NBQVU7QUFGTCw2QkFITjtBQU9ELGtDQUFNO0FBQ0oscUNBQU8sQ0FESDtBQUVKLHNDQUFRLGdCQUFVLEtBQVYsRUFBaUI7QUFDdkIsdUNBQU8sTUFBTSxPQUFOLENBQWMsQ0FBZCxDQUFQO0FBQ0Q7QUFKRztBQVBMO0FBaEJDO0FBN0VPLHVCQUFmO0FBNkdEO0FBL0dJO0FBRnNCLGlCQUFwQjtBQUhOLGVBM0JZOztBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQSwrQ0FxSmQ7QUFDTCx1QkFBTztBQURGLGVBckpjOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQXpCOztBQUFBO0FBQUE7QUFBQTtBQUFBOztBQTJKQSxPQUFLLGdCQUFMO0FBQUEseUZBQXdCO0FBQUEsc0ZBQW1DLEVBQW5DO0FBQUEsVUFBZ0IsR0FBaEIsU0FBZ0IsR0FBaEI7QUFBQSxVQUFxQixPQUFyQixTQUFxQixPQUFyQjtBQUFBLFVBQThCLEdBQTlCLFNBQThCLEdBQTlCOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDaEIsaUJBRGdCLFFBQ1AsR0FETyxHQUNELE9BREMsU0FDVSxHQURWO0FBRWhCLGtCQUZnQixHQUVUO0FBQ1gsd0JBQVE7QUFERyxlQUZTO0FBQUE7QUFBQTtBQUFBLHFCQU1HLElBQUksR0FBSixDQUFRO0FBQzdCO0FBRDZCLGVBQVIsQ0FOSDs7QUFBQTtBQU1kLHNCQU5jOztBQVNwQixtQkFBSyxPQUFMLEdBQWUsU0FBUyxPQUF4QjtBQUNBLG1CQUFLLE1BQUwsR0FBYyxJQUFkO0FBVm9CO0FBQUE7O0FBQUE7QUFBQTtBQUFBOztBQUFBO0FBQUEsZ0RBWWYsSUFaZTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUF4Qjs7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFlQSxPQUFLLEtBQUwsR0FBYSxZQUFXO0FBQ3RCLFNBQUssbUJBQUwsQ0FBeUIsRUFBekIsQ0FBNEIsaUJBQTVCLEVBQStDLEtBQUssVUFBTCxDQUFnQixlQUEvRDtBQUNELEdBRkQ7QUFHRDs7QUFHRCxRQUFRLHVCQUFSLEVBQWlDLGFBQWpDOztBQUVBLE9BQU8sT0FBUCxHQUFpQixJQUFJLHVCQUFKLEVBQWpCIiwiZmlsZSI6ImJ1aWxkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImV4cG9ydCBkZWZhdWx0IHtcbiAgaXQ6IHtcbiAgICBxdWVyeToge1xuICAgICAgYWN0aW9uczoge1xuICAgICAgICBzaG93ZWxldmF0aW9uOiBcIlZpc3VhbGl6emEgZWxldmF6aW9uZVwiLFxuICAgICAgfVxuICAgIH0sXG4gICAgY2hhcnQ6IHtcbiAgICAgIHRpdGxlOiAnRWxldmF6aW9uZScsXG4gICAgICB0b29sdGlwOiB7XG4gICAgICAgIHRpdGxlOiAnRGlzdGFuemEnXG4gICAgICB9LFxuICAgICAgbGFiZWxzOiB7XG4gICAgICAgIHg6ICdEaXN0YW56YSAobSknLFxuICAgICAgICB5OidBbHRlenphIChtKSdcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGVuOiB7XG4gICAgcXVlcnk6IHtcbiAgICAgIGFjdGlvbnM6IHtcbiAgICAgICAgc2hvd2VsZXZhdGlvbjogXCJTaG93IGVsZXZhdGlvblwiLFxuICAgICAgfVxuICAgIH0sXG4gICAgY2hhcnQ6IHtcbiAgICAgIHRpdGxlOiBcIkVsZXZhdGlvblwiLFxuICAgICAgdG9vbHRpcDoge1xuICAgICAgICB0aXRsZTogXCJEaXN0YW5jZVwiXG4gICAgICB9LFxuICAgICAgbGFiZWxzOiB7XG4gICAgICAgIHg6ICdEaXN0YW5jZSAobSknLFxuICAgICAgICB5OidIZWlnaHQgKG0pJ1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IGkxOG4gZnJvbSAnLi9pMThuJ1xuZXhwb3J0IGRlZmF1bHQge1xuICBpMThuXG59XG4iLCJpbXBvcnQgcGx1Z2luQ29uZmlnIGZyb20gJy4vY29uZmlnJztcbmNvbnN0IGluaGVyaXQgPSBnM3dzZGsuY29yZS51dGlscy5pbmhlcml0O1xuY29uc3QgYmFzZSA9IGczd3Nkay5jb3JlLnV0aWxzLmJhc2U7XG5jb25zdCBQbHVnaW4gPSBnM3dzZGsuY29yZS5wbHVnaW4uUGx1Z2luO1xuY29uc3QgU2VydmljZSA9IHJlcXVpcmUoJy4vcGx1Z2luc2VydmljZScpO1xuY29uc3QgYWRkSTE4blBsdWdpbiA9IGczd3Nkay5jb3JlLmkxOG4uYWRkSTE4blBsdWdpbjtcblxuY29uc3QgX1BsdWdpbiA9IGZ1bmN0aW9uKCkge1xuICBiYXNlKHRoaXMpO1xuICB0aGlzLm5hbWUgPSAnZWxlcHJvZmlsZSc7XG4gIHRoaXMuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIGFkZCBpMThuIG9mIHRoZSBwbHVnaW5cbiAgICBhZGRJMThuUGx1Z2luKHtcbiAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgIGNvbmZpZzogcGx1Z2luQ29uZmlnLmkxOG5cbiAgICB9KTtcbiAgICAvLyBzZXQgY2F0YWxvZyBpbml0aWFsIHRhYlxuICAgIHRoaXMuY29uZmlnID0gdGhpcy5nZXRDb25maWcoKTtcbiAgICB0aGlzLnNldFNlcnZpY2UoU2VydmljZSk7XG4gICAgdGhpcy5zZXJ2aWNlLmluaXQodGhpcy5jb25maWcpO1xuICAgIHRoaXMucmVnaXN0ZXJQbHVnaW4odGhpcy5jb25maWcuZ2lkKTtcbiAgICAvLyBjcmVhdGUgQVBJXG4gICAgdGhpcy5zZXRSZWFkeSh0cnVlKTtcbiAgfTtcbiAgLy9jYWxsZWQgd2hlbiBwbHVnaW4gaXMgcmVtb3ZlZFxuICB0aGlzLnVubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2VydmljZS5jbGVhcigpO1xuICB9O1xufTtcblxuaW5oZXJpdChfUGx1Z2luLCBQbHVnaW4pO1xuXG4oZnVuY3Rpb24ocGx1Z2luKXtcbiAgcGx1Z2luLmluaXQoKTtcbn0pKG5ldyBfUGx1Z2luKTtcblxuXG5cbiIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vcHJvbWlzZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3Byb21pc2UgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9wcm9taXNlXCIpO1xuXG52YXIgX3Byb21pc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcHJvbWlzZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBnZW4gPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHJldHVybiBuZXcgX3Byb21pc2UyLmRlZmF1bHQoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgZnVuY3Rpb24gc3RlcChrZXksIGFyZykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICAgICAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBfcHJvbWlzZTIuZGVmYXVsdC5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgc3RlcChcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHN0ZXAoXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzdGVwKFwibmV4dFwiKTtcbiAgICB9KTtcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXNJdGVyYWJsZTIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9pcy1pdGVyYWJsZVwiKTtcblxudmFyIF9pc0l0ZXJhYmxlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzSXRlcmFibGUyKTtcblxudmFyIF9nZXRJdGVyYXRvcjIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9nZXQtaXRlcmF0b3JcIik7XG5cbnZhciBfZ2V0SXRlcmF0b3IzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0SXRlcmF0b3IyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkge1xuICAgIHZhciBfYXJyID0gW107XG4gICAgdmFyIF9uID0gdHJ1ZTtcbiAgICB2YXIgX2QgPSBmYWxzZTtcbiAgICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2kgPSAoMCwgX2dldEl0ZXJhdG9yMy5kZWZhdWx0KShhcnIpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gdHJ1ZTtcbiAgICAgIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX2FycjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKCgwLCBfaXNJdGVyYWJsZTMuZGVmYXVsdCkoT2JqZWN0KGFycikpKSB7XG4gICAgICByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9XG4gIH07XG59KCk7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicmVnZW5lcmF0b3ItcnVudGltZVwiKTtcbiIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3InKTtcbiIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZScpO1xuIiwicmVxdWlyZSgnLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnByb21pc2UnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM3LnByb21pc2UuZmluYWxseScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczcucHJvbWlzZS50cnknKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9fY29yZScpLlByb21pc2U7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSwgZm9yYmlkZGVuRmllbGQpIHtcbiAgaWYgKCEoaXQgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikgfHwgKGZvcmJpZGRlbkZpZWxkICE9PSB1bmRlZmluZWQgJiYgZm9yYmlkZGVuRmllbGQgaW4gaXQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKG5hbWUgKyAnOiBpbmNvcnJlY3QgaW52b2NhdGlvbiEnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSkgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuL190by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuL190by1hYnNvbHV0ZS1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pIHtcbiAgICAgIGlmIChPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG4iLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xudmFyIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuLy8gRVMzIHdyb25nIGhlcmVcbnZhciBBUkcgPSBjb2YoZnVuY3Rpb24gKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uIChpdCwga2V5KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2ggKGUpIHsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG4iLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0geyB2ZXJzaW9uOiAnMi42LjExJyB9O1xuaWYgKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpIF9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCB0aGF0LCBsZW5ndGgpIHtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYgKHRoYXQgPT09IHVuZGVmaW5lZCkgcmV0dXJuIGZuO1xuICBzd2l0Y2ggKGxlbmd0aCkge1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uIChhKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbiAoLyogLi4uYXJncyAqLykge1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcbiIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoaXQgPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07XG4iLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7IGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gNzsgfSB9KS5hICE9IDc7XG59KTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG4vLyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0JyBpbiBvbGQgSUVcbnZhciBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuIiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBoaWRlID0gcmVxdWlyZSgnLi9faGlkZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uICh0eXBlLCBuYW1lLCBzb3VyY2UpIHtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkY7XG4gIHZhciBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HO1xuICB2YXIgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuUztcbiAgdmFyIElTX1BST1RPID0gdHlwZSAmICRleHBvcnQuUDtcbiAgdmFyIElTX0JJTkQgPSB0eXBlICYgJGV4cG9ydC5CO1xuICB2YXIgSVNfV1JBUCA9IHR5cGUgJiAkZXhwb3J0Llc7XG4gIHZhciBleHBvcnRzID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XG4gIHZhciBleHBQcm90byA9IGV4cG9ydHNbUFJPVE9UWVBFXTtcbiAgdmFyIHRhcmdldCA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV07XG4gIHZhciBrZXksIG93biwgb3V0O1xuICBpZiAoSVNfR0xPQkFMKSBzb3VyY2UgPSBuYW1lO1xuICBmb3IgKGtleSBpbiBzb3VyY2UpIHtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmIChvd24gJiYgaGFzKGV4cG9ydHMsIGtleSkpIGNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24gKEMpIHtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24gKGEsIGIsIGMpIHtcbiAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBDKSB7XG4gICAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQygpO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZiAoSVNfUFJPVE8pIHtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZiAodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSkgaGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcbiIsInZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBjYWxsID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJyk7XG52YXIgaXNBcnJheUl0ZXIgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpO1xudmFyIGdldEl0ZXJGbiA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG52YXIgQlJFQUsgPSB7fTtcbnZhciBSRVRVUk4gPSB7fTtcbnZhciBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmFibGUsIGVudHJpZXMsIGZuLCB0aGF0LCBJVEVSQVRPUikge1xuICB2YXIgaXRlckZuID0gSVRFUkFUT1IgPyBmdW5jdGlvbiAoKSB7IHJldHVybiBpdGVyYWJsZTsgfSA6IGdldEl0ZXJGbihpdGVyYWJsZSk7XG4gIHZhciBmID0gY3R4KGZuLCB0aGF0LCBlbnRyaWVzID8gMiA6IDEpO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGVuZ3RoLCBzdGVwLCBpdGVyYXRvciwgcmVzdWx0O1xuICBpZiAodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoaXRlcmFibGUgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgLy8gZmFzdCBjYXNlIGZvciBhcnJheXMgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yXG4gIGlmIChpc0FycmF5SXRlcihpdGVyRm4pKSBmb3IgKGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgcmVzdWx0ID0gZW50cmllcyA/IGYoYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pIDogZihpdGVyYWJsZVtpbmRleF0pO1xuICAgIGlmIChyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKSByZXR1cm4gcmVzdWx0O1xuICB9IGVsc2UgZm9yIChpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKGl0ZXJhYmxlKTsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOykge1xuICAgIHJlc3VsdCA9IGNhbGwoaXRlcmF0b3IsIGYsIHN0ZXAudmFsdWUsIGVudHJpZXMpO1xuICAgIGlmIChyZXN1bHQgPT09IEJSRUFLIHx8IHJlc3VsdCA9PT0gUkVUVVJOKSByZXR1cm4gcmVzdWx0O1xuICB9XG59O1xuZXhwb3J0cy5CUkVBSyA9IEJSRUFLO1xuZXhwb3J0cy5SRVRVUk4gPSBSRVRVUk47XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1uZXctZnVuY1xuICA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZiAodHlwZW9mIF9fZyA9PSAnbnVtYmVyJykgX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4iLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59O1xuIiwidmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuIiwidmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQ7XG5tb2R1bGUuZXhwb3J0cyA9IGRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywgeyBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDc7IH0gfSkuYSAhPSA3O1xufSk7XG4iLCIvLyBmYXN0IGFwcGx5LCBodHRwOi8vanNwZXJmLmxua2l0LmNvbS9mYXN0LWFwcGx5LzVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGZuLCBhcmdzLCB0aGF0KSB7XG4gIHZhciB1biA9IHRoYXQgPT09IHVuZGVmaW5lZDtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIHVuID8gZm4oKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0KTtcbiAgICBjYXNlIDE6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIHVuID8gZm4oYXJnc1swXSwgYXJnc1sxXSlcbiAgICAgICAgICAgICAgICAgICAgICA6IGZuLmNhbGwodGhhdCwgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gdW4gPyBmbihhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKVxuICAgICAgICAgICAgICAgICAgICAgIDogZm4uY2FsbCh0aGF0LCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICBjYXNlIDQ6IHJldHVybiB1biA/IGZuKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pXG4gICAgICAgICAgICAgICAgICAgICAgOiBmbi5jYWxsKHRoYXQsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0sIGFyZ3NbM10pO1xuICB9IHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmdzKTtcbn07XG4iLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59O1xuIiwiLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b1tJVEVSQVRPUl0gPT09IGl0KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcbiIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcykge1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmIChyZXQgIT09IHVuZGVmaW5lZCkgYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKTtcbnZhciBkZXNjcmlwdG9yID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KSB7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwgeyBuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKTtcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuL19yZWRlZmluZScpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgJGl0ZXJDcmVhdGUgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpOyAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG52YXIgRkZfSVRFUkFUT1IgPSAnQEBpdGVyYXRvcic7XG52YXIgS0VZUyA9ICdrZXlzJztcbnZhciBWQUxVRVMgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpIHtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24gKGtpbmQpIHtcbiAgICBpZiAoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pIHJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2ggKGtpbmQpIHtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKSB7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCkgeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHID0gTkFNRSArICcgSXRlcmF0b3InO1xuICB2YXIgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTO1xuICB2YXIgVkFMVUVTX0JVRyA9IGZhbHNlO1xuICB2YXIgcHJvdG8gPSBCYXNlLnByb3RvdHlwZTtcbiAgdmFyICRuYXRpdmUgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF07XG4gIHZhciAkZGVmYXVsdCA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpO1xuICB2YXIgJGVudHJpZXMgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkO1xuICB2YXIgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmU7XG4gIHZhciBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmICgkYW55TmF0aXZlKSB7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UoKSkpO1xuICAgIGlmIChJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSAmJiBJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYgKCFMSUJSQVJZICYmIHR5cGVvZiBJdGVyYXRvclByb3RvdHlwZVtJVEVSQVRPUl0gIT0gJ2Z1bmN0aW9uJykgaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmIChERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpIHtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpIHsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYgKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKSB7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSA9IHJldHVyblRoaXM7XG4gIGlmIChERUZBVUxUKSB7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiBJU19TRVQgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZiAoRk9SQ0VEKSBmb3IgKGtleSBpbiBtZXRob2RzKSB7XG4gICAgICBpZiAoIShrZXkgaW4gcHJvdG8pKSByZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuIiwidmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtJVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24gKCkgeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdGhyb3ctbGl0ZXJhbFxuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbiAoKSB7IHRocm93IDI7IH0pO1xufSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMsIHNraXBDbG9zaW5nKSB7XG4gIGlmICghc2tpcENsb3NpbmcgJiYgIVNBRkVfQ0xPU0lORykgcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBbN107XG4gICAgdmFyIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4geyBkb25lOiBzYWZlID0gdHJ1ZSB9OyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGRvbmUsIHZhbHVlKSB7XG4gIHJldHVybiB7IHZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7fTtcbiIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBtYWNyb3Rhc2sgPSByZXF1aXJlKCcuL190YXNrJykuc2V0O1xudmFyIE9ic2VydmVyID0gZ2xvYmFsLk11dGF0aW9uT2JzZXJ2ZXIgfHwgZ2xvYmFsLldlYktpdE11dGF0aW9uT2JzZXJ2ZXI7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIFByb21pc2UgPSBnbG9iYWwuUHJvbWlzZTtcbnZhciBpc05vZGUgPSByZXF1aXJlKCcuL19jb2YnKShwcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaGVhZCwgbGFzdCwgbm90aWZ5O1xuXG4gIHZhciBmbHVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcGFyZW50LCBmbjtcbiAgICBpZiAoaXNOb2RlICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpIHBhcmVudC5leGl0KCk7XG4gICAgd2hpbGUgKGhlYWQpIHtcbiAgICAgIGZuID0gaGVhZC5mbjtcbiAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgICB0cnkge1xuICAgICAgICBmbigpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZiAoaGVhZCkgbm90aWZ5KCk7XG4gICAgICAgIGVsc2UgbGFzdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhyb3cgZTtcbiAgICAgIH1cbiAgICB9IGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHBhcmVudCkgcGFyZW50LmVudGVyKCk7XG4gIH07XG5cbiAgLy8gTm9kZS5qc1xuICBpZiAoaXNOb2RlKSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gICAgfTtcbiAgLy8gYnJvd3NlcnMgd2l0aCBNdXRhdGlvbk9ic2VydmVyLCBleGNlcHQgaU9TIFNhZmFyaSAtIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8zMzlcbiAgfSBlbHNlIGlmIChPYnNlcnZlciAmJiAhKGdsb2JhbC5uYXZpZ2F0b3IgJiYgZ2xvYmFsLm5hdmlnYXRvci5zdGFuZGFsb25lKSkge1xuICAgIHZhciB0b2dnbGUgPSB0cnVlO1xuICAgIHZhciBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgIG5ldyBPYnNlcnZlcihmbHVzaCkub2JzZXJ2ZShub2RlLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gIXRvZ2dsZTtcbiAgICB9O1xuICAvLyBlbnZpcm9ubWVudHMgd2l0aCBtYXliZSBub24tY29tcGxldGVseSBjb3JyZWN0LCBidXQgZXhpc3RlbnQgUHJvbWlzZVxuICB9IGVsc2UgaWYgKFByb21pc2UgJiYgUHJvbWlzZS5yZXNvbHZlKSB7XG4gICAgLy8gUHJvbWlzZS5yZXNvbHZlIHdpdGhvdXQgYW4gYXJndW1lbnQgdGhyb3dzIGFuIGVycm9yIGluIExHIFdlYk9TIDJcbiAgICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSh1bmRlZmluZWQpO1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHByb21pc2UudGhlbihmbHVzaCk7XG4gICAgfTtcbiAgLy8gZm9yIG90aGVyIGVudmlyb25tZW50cyAtIG1hY3JvdGFzayBiYXNlZCBvbjpcbiAgLy8gLSBzZXRJbW1lZGlhdGVcbiAgLy8gLSBNZXNzYWdlQ2hhbm5lbFxuICAvLyAtIHdpbmRvdy5wb3N0TWVzc2FnXG4gIC8vIC0gb25yZWFkeXN0YXRlY2hhbmdlXG4gIC8vIC0gc2V0VGltZW91dFxuICB9IGVsc2Uge1xuICAgIG5vdGlmeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vIHN0cmFuZ2UgSUUgKyB3ZWJwYWNrIGRldiBzZXJ2ZXIgYnVnIC0gdXNlIC5jYWxsKGdsb2JhbClcbiAgICAgIG1hY3JvdGFzay5jYWxsKGdsb2JhbCwgZmx1c2gpO1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGZuKSB7XG4gICAgdmFyIHRhc2sgPSB7IGZuOiBmbiwgbmV4dDogdW5kZWZpbmVkIH07XG4gICAgaWYgKGxhc3QpIGxhc3QubmV4dCA9IHRhc2s7XG4gICAgaWYgKCFoZWFkKSB7XG4gICAgICBoZWFkID0gdGFzaztcbiAgICAgIG5vdGlmeSgpO1xuICAgIH0gbGFzdCA9IHRhc2s7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gMjUuNC4xLjUgTmV3UHJvbWlzZUNhcGFiaWxpdHkoQylcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5cbmZ1bmN0aW9uIFByb21pc2VDYXBhYmlsaXR5KEMpIHtcbiAgdmFyIHJlc29sdmUsIHJlamVjdDtcbiAgdGhpcy5wcm9taXNlID0gbmV3IEMoZnVuY3Rpb24gKCQkcmVzb2x2ZSwgJCRyZWplY3QpIHtcbiAgICBpZiAocmVzb2x2ZSAhPT0gdW5kZWZpbmVkIHx8IHJlamVjdCAhPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoJ0JhZCBQcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgcmVzb2x2ZSA9ICQkcmVzb2x2ZTtcbiAgICByZWplY3QgPSAkJHJlamVjdDtcbiAgfSk7XG4gIHRoaXMucmVzb2x2ZSA9IGFGdW5jdGlvbihyZXNvbHZlKTtcbiAgdGhpcy5yZWplY3QgPSBhRnVuY3Rpb24ocmVqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIChDKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZUNhcGFiaWxpdHkoQyk7XG59O1xuIiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBkUHMgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgSUVfUFJPVE8gPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG52YXIgRW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24gKCkge1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKTtcbiAgdmFyIGkgPSBlbnVtQnVnS2V5cy5sZW5ndGg7XG4gIHZhciBsdCA9ICc8JztcbiAgdmFyIGd0ID0gJz4nO1xuICB2YXIgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUgKGktLSkgZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKE8gIT09IG51bGwpIHtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5KCk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJyk7XG52YXIgZFAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZiAoSUU4X0RPTV9ERUZJTkUpIHRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoIChlKSB7IC8qIGVtcHR5ICovIH1cbiAgaWYgKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcykgdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYgKCd2YWx1ZScgaW4gQXR0cmlidXRlcykgT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcbiIsInZhciBkUCA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKSB7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyA9IGdldEtleXMoUHJvcGVydGllcyk7XG4gIHZhciBsZW5ndGggPSBrZXlzLmxlbmd0aDtcbiAgdmFyIGkgPSAwO1xuICB2YXIgUDtcbiAgd2hpbGUgKGxlbmd0aCA+IGkpIGRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTtcbiIsIi8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcbnZhciBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uIChPKSB7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYgKGhhcyhPLCBJRV9QUk9UTykpIHJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYgKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG59O1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpO1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbnZhciBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKTtcbnZhciBJRV9QUk9UTyA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBuYW1lcykge1xuICB2YXIgTyA9IHRvSU9iamVjdChvYmplY3QpO1xuICB2YXIgaSA9IDA7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGtleTtcbiAgZm9yIChrZXkgaW4gTykgaWYgKGtleSAhPSBJRV9QUk9UTykgaGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG4iLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJyk7XG52YXIgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKSB7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiB7IGU6IGZhbHNlLCB2OiBleGVjKCkgfTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiB7IGU6IHRydWUsIHY6IGUgfTtcbiAgfVxufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEMsIHgpIHtcbiAgYW5PYmplY3QoQyk7XG4gIGlmIChpc09iamVjdCh4KSAmJiB4LmNvbnN0cnVjdG9yID09PSBDKSByZXR1cm4geDtcbiAgdmFyIHByb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkuZihDKTtcbiAgdmFyIHJlc29sdmUgPSBwcm9taXNlQ2FwYWJpbGl0eS5yZXNvbHZlO1xuICByZXNvbHZlKHgpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwidmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh0YXJnZXQsIHNyYywgc2FmZSkge1xuICBmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG4gICAgaWYgKHNhZmUgJiYgdGFyZ2V0W2tleV0pIHRhcmdldFtrZXldID0gc3JjW2tleV07XG4gICAgZWxzZSBoaWRlKHRhcmdldCwga2V5LCBzcmNba2V5XSk7XG4gIH0gcmV0dXJuIHRhcmdldDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2hpZGUnKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGRQID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpO1xudmFyIFNQRUNJRVMgPSByZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChLRVkpIHtcbiAgdmFyIEMgPSB0eXBlb2YgY29yZVtLRVldID09ICdmdW5jdGlvbicgPyBjb3JlW0tFWV0gOiBnbG9iYWxbS0VZXTtcbiAgaWYgKERFU0NSSVBUT1JTICYmIEMgJiYgIUNbU1BFQ0lFU10pIGRQLmYoQywgU1BFQ0lFUywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH1cbiAgfSk7XG59O1xuIiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG52YXIgaGFzID0gcmVxdWlyZSgnLi9faGFzJyk7XG52YXIgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCB0YWcsIHN0YXQpIHtcbiAgaWYgKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpIGRlZihpdCwgVEFHLCB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZyB9KTtcbn07XG4iLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTtcbiIsInZhciBjb3JlID0gcmVxdWlyZSgnLi9fY29yZScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nO1xudmFyIHN0b3JlID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHZhbHVlICE9PSB1bmRlZmluZWQgPyB2YWx1ZSA6IHt9KTtcbn0pKCd2ZXJzaW9ucycsIFtdKS5wdXNoKHtcbiAgdmVyc2lvbjogY29yZS52ZXJzaW9uLFxuICBtb2RlOiByZXF1aXJlKCcuL19saWJyYXJ5JykgPyAncHVyZScgOiAnZ2xvYmFsJyxcbiAgY29weXJpZ2h0OiAnwqkgMjAxOSBEZW5pcyBQdXNoa2FyZXYgKHpsb2lyb2NrLnJ1KSdcbn0pO1xuIiwiLy8gNy4zLjIwIFNwZWNpZXNDb25zdHJ1Y3RvcihPLCBkZWZhdWx0Q29uc3RydWN0b3IpXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG52YXIgU1BFQ0lFUyA9IHJlcXVpcmUoJy4vX3drcycpKCdzcGVjaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChPLCBEKSB7XG4gIHZhciBDID0gYW5PYmplY3QoTykuY29uc3RydWN0b3I7XG4gIHZhciBTO1xuICByZXR1cm4gQyA9PT0gdW5kZWZpbmVkIHx8IChTID0gYW5PYmplY3QoQylbU1BFQ0lFU10pID09IHVuZGVmaW5lZCA/IEQgOiBhRnVuY3Rpb24oUyk7XG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKTtcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKFRPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKHRoYXQsIHBvcykge1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpO1xuICAgIHZhciBpID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIGwgPSBzLmxlbmd0aDtcbiAgICB2YXIgYSwgYjtcbiAgICBpZiAoaSA8IDAgfHwgaSA+PSBsKSByZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcbiIsInZhciBjdHggPSByZXF1aXJlKCcuL19jdHgnKTtcbnZhciBpbnZva2UgPSByZXF1aXJlKCcuL19pbnZva2UnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi9faHRtbCcpO1xudmFyIGNlbCA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgc2V0VGFzayA9IGdsb2JhbC5zZXRJbW1lZGlhdGU7XG52YXIgY2xlYXJUYXNrID0gZ2xvYmFsLmNsZWFySW1tZWRpYXRlO1xudmFyIE1lc3NhZ2VDaGFubmVsID0gZ2xvYmFsLk1lc3NhZ2VDaGFubmVsO1xudmFyIERpc3BhdGNoID0gZ2xvYmFsLkRpc3BhdGNoO1xudmFyIGNvdW50ZXIgPSAwO1xudmFyIHF1ZXVlID0ge307XG52YXIgT05SRUFEWVNUQVRFQ0hBTkdFID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG52YXIgZGVmZXIsIGNoYW5uZWwsIHBvcnQ7XG52YXIgcnVuID0gZnVuY3Rpb24gKCkge1xuICB2YXIgaWQgPSArdGhpcztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICBpZiAocXVldWUuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgdmFyIGZuID0gcXVldWVbaWRdO1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gICAgZm4oKTtcbiAgfVxufTtcbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBydW4uY2FsbChldmVudC5kYXRhKTtcbn07XG4vLyBOb2RlLmpzIDAuOSsgJiBJRTEwKyBoYXMgc2V0SW1tZWRpYXRlLCBvdGhlcndpc2U6XG5pZiAoIXNldFRhc2sgfHwgIWNsZWFyVGFzaykge1xuICBzZXRUYXNrID0gZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGZuKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICB2YXIgaSA9IDE7XG4gICAgd2hpbGUgKGFyZ3VtZW50cy5sZW5ndGggPiBpKSBhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHF1ZXVlWysrY291bnRlcl0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmV3LWZ1bmNcbiAgICAgIGludm9rZSh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyA/IGZuIDogRnVuY3Rpb24oZm4pLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhclRhc2sgPSBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShpZCkge1xuICAgIGRlbGV0ZSBxdWV1ZVtpZF07XG4gIH07XG4gIC8vIE5vZGUuanMgMC44LVxuICBpZiAocmVxdWlyZSgnLi9fY29mJykocHJvY2VzcykgPT0gJ3Byb2Nlc3MnKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHByb2Nlc3MubmV4dFRpY2soY3R4KHJ1biwgaWQsIDEpKTtcbiAgICB9O1xuICAvLyBTcGhlcmUgKEpTIGdhbWUgZW5naW5lKSBEaXNwYXRjaCBBUElcbiAgfSBlbHNlIGlmIChEaXNwYXRjaCAmJiBEaXNwYXRjaC5ub3cpIHtcbiAgICBkZWZlciA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgRGlzcGF0Y2gubm93KGN0eChydW4sIGlkLCAxKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICB9IGVsc2UgaWYgKE1lc3NhZ2VDaGFubmVsKSB7XG4gICAgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgIHBvcnQgPSBjaGFubmVsLnBvcnQyO1xuICAgIGNoYW5uZWwucG9ydDEub25tZXNzYWdlID0gbGlzdGVuZXI7XG4gICAgZGVmZXIgPSBjdHgocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBnbG9iYWwucG9zdE1lc3NhZ2UoaWQgKyAnJywgJyonKTtcbiAgICB9O1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgbGlzdGVuZXIsIGZhbHNlKTtcbiAgLy8gSUU4LVxuICB9IGVsc2UgaWYgKE9OUkVBRFlTVEFURUNIQU5HRSBpbiBjZWwoJ3NjcmlwdCcpKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY2VsKCdzY3JpcHQnKSlbT05SRUFEWVNUQVRFQ0hBTkdFXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaHRtbC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgICAgICAgcnVuLmNhbGwoaWQpO1xuICAgICAgfTtcbiAgICB9O1xuICAvLyBSZXN0IG9sZCBicm93c2Vyc1xuICB9IGVsc2Uge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBzZXRUaW1lb3V0KGN0eChydW4sIGlkLCAxKSwgMCk7XG4gICAgfTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogc2V0VGFzayxcbiAgY2xlYXI6IGNsZWFyVGFza1xufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJyk7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpbmRleCwgbGVuZ3RoKSB7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59O1xuIiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCA9IE1hdGguY2VpbDtcbnZhciBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07XG4iLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpO1xudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59O1xuIiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpO1xudmFyIG1pbiA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07XG4iLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTtcbiIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBTKSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSByZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciBpZCA9IDA7XG52YXIgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIG5hdmlnYXRvciA9IGdsb2JhbC5uYXZpZ2F0b3I7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF2aWdhdG9yICYmIG5hdmlnYXRvci51c2VyQWdlbnQgfHwgJyc7XG4iLCJ2YXIgc3RvcmUgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi9fdWlkJyk7XG52YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sO1xudmFyIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7XG4iLCJ2YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKTtcbnZhciBJVEVSQVRPUiA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ICE9IHVuZGVmaW5lZCkgcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGdldCA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uIChpdCkge1xuICB2YXIgaXRlckZuID0gZ2V0KGl0KTtcbiAgaWYgKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJykgdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIHJldHVybiBhbk9iamVjdChpdGVyRm4uY2FsbChpdCkpO1xufTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpO1xudmFyIElURVJBVE9SID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5pc0l0ZXJhYmxlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPID0gT2JqZWN0KGl0KTtcbiAgcmV0dXJuIE9bSVRFUkFUT1JdICE9PSB1bmRlZmluZWRcbiAgICB8fCAnQEBpdGVyYXRvcicgaW4gT1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgICB8fCBJdGVyYXRvcnMuaGFzT3duUHJvcGVydHkoY2xhc3NvZihPKSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKTtcbnZhciBzdGVwID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uIChpdGVyYXRlZCwga2luZCkge1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIE8gPSB0aGlzLl90O1xuICB2YXIga2luZCA9IHRoaXMuX2s7XG4gIHZhciBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYgKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKSB7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZiAoa2luZCA9PSAna2V5cycpIHJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYgKGtpbmQgPT0gJ3ZhbHVlcycpIHJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTtcbiIsIiIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZID0gcmVxdWlyZSgnLi9fbGlicmFyeScpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGN0eCA9IHJlcXVpcmUoJy4vX2N0eCcpO1xudmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuL19jbGFzc29mJyk7XG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xudmFyIGFuSW5zdGFuY2UgPSByZXF1aXJlKCcuL19hbi1pbnN0YW5jZScpO1xudmFyIGZvck9mID0gcmVxdWlyZSgnLi9fZm9yLW9mJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi9fc3BlY2llcy1jb25zdHJ1Y3RvcicpO1xudmFyIHRhc2sgPSByZXF1aXJlKCcuL190YXNrJykuc2V0O1xudmFyIG1pY3JvdGFzayA9IHJlcXVpcmUoJy4vX21pY3JvdGFzaycpKCk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUgPSByZXF1aXJlKCcuL19uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG52YXIgcGVyZm9ybSA9IHJlcXVpcmUoJy4vX3BlcmZvcm0nKTtcbnZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuL191c2VyLWFnZW50Jyk7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuL19wcm9taXNlLXJlc29sdmUnKTtcbnZhciBQUk9NSVNFID0gJ1Byb21pc2UnO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIHZlcnNpb25zID0gcHJvY2VzcyAmJiBwcm9jZXNzLnZlcnNpb25zO1xudmFyIHY4ID0gdmVyc2lvbnMgJiYgdmVyc2lvbnMudjggfHwgJyc7XG52YXIgJFByb21pc2UgPSBnbG9iYWxbUFJPTUlTRV07XG52YXIgaXNOb2RlID0gY2xhc3NvZihwcm9jZXNzKSA9PSAncHJvY2Vzcyc7XG52YXIgZW1wdHkgPSBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH07XG52YXIgSW50ZXJuYWwsIG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSwgT3duUHJvbWlzZUNhcGFiaWxpdHksIFdyYXBwZXI7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mO1xuXG52YXIgVVNFX05BVElWRSA9ICEhZnVuY3Rpb24gKCkge1xuICB0cnkge1xuICAgIC8vIGNvcnJlY3Qgc3ViY2xhc3Npbmcgd2l0aCBAQHNwZWNpZXMgc3VwcG9ydFxuICAgIHZhciBwcm9taXNlID0gJFByb21pc2UucmVzb2x2ZSgxKTtcbiAgICB2YXIgRmFrZVByb21pc2UgPSAocHJvbWlzZS5jb25zdHJ1Y3RvciA9IHt9KVtyZXF1aXJlKCcuL193a3MnKSgnc3BlY2llcycpXSA9IGZ1bmN0aW9uIChleGVjKSB7XG4gICAgICBleGVjKGVtcHR5LCBlbXB0eSk7XG4gICAgfTtcbiAgICAvLyB1bmhhbmRsZWQgcmVqZWN0aW9ucyB0cmFja2luZyBzdXBwb3J0LCBOb2RlSlMgUHJvbWlzZSB3aXRob3V0IGl0IGZhaWxzIEBAc3BlY2llcyB0ZXN0XG4gICAgcmV0dXJuIChpc05vZGUgfHwgdHlwZW9mIFByb21pc2VSZWplY3Rpb25FdmVudCA9PSAnZnVuY3Rpb24nKVxuICAgICAgJiYgcHJvbWlzZS50aGVuKGVtcHR5KSBpbnN0YW5jZW9mIEZha2VQcm9taXNlXG4gICAgICAvLyB2OCA2LjYgKE5vZGUgMTAgYW5kIENocm9tZSA2NikgaGF2ZSBhIGJ1ZyB3aXRoIHJlc29sdmluZyBjdXN0b20gdGhlbmFibGVzXG4gICAgICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD04MzA1NjVcbiAgICAgIC8vIHdlIGNhbid0IGRldGVjdCBpdCBzeW5jaHJvbm91c2x5LCBzbyBqdXN0IGNoZWNrIHZlcnNpb25zXG4gICAgICAmJiB2OC5pbmRleE9mKCc2LjYnKSAhPT0gMFxuICAgICAgJiYgdXNlckFnZW50LmluZGV4T2YoJ0Nocm9tZS82NicpID09PSAtMTtcbiAgfSBjYXRjaCAoZSkgeyAvKiBlbXB0eSAqLyB9XG59KCk7XG5cbi8vIGhlbHBlcnNcbnZhciBpc1RoZW5hYmxlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciB0aGVuO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmIHR5cGVvZiAodGhlbiA9IGl0LnRoZW4pID09ICdmdW5jdGlvbicgPyB0aGVuIDogZmFsc2U7XG59O1xudmFyIG5vdGlmeSA9IGZ1bmN0aW9uIChwcm9taXNlLCBpc1JlamVjdCkge1xuICBpZiAocHJvbWlzZS5fbikgcmV0dXJuO1xuICBwcm9taXNlLl9uID0gdHJ1ZTtcbiAgdmFyIGNoYWluID0gcHJvbWlzZS5fYztcbiAgbWljcm90YXNrKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92O1xuICAgIHZhciBvayA9IHByb21pc2UuX3MgPT0gMTtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIHJ1biA9IGZ1bmN0aW9uIChyZWFjdGlvbikge1xuICAgICAgdmFyIGhhbmRsZXIgPSBvayA/IHJlYWN0aW9uLm9rIDogcmVhY3Rpb24uZmFpbDtcbiAgICAgIHZhciByZXNvbHZlID0gcmVhY3Rpb24ucmVzb2x2ZTtcbiAgICAgIHZhciByZWplY3QgPSByZWFjdGlvbi5yZWplY3Q7XG4gICAgICB2YXIgZG9tYWluID0gcmVhY3Rpb24uZG9tYWluO1xuICAgICAgdmFyIHJlc3VsdCwgdGhlbiwgZXhpdGVkO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgICBpZiAoIW9rKSB7XG4gICAgICAgICAgICBpZiAocHJvbWlzZS5faCA9PSAyKSBvbkhhbmRsZVVuaGFuZGxlZChwcm9taXNlKTtcbiAgICAgICAgICAgIHByb21pc2UuX2ggPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaGFuZGxlciA9PT0gdHJ1ZSkgcmVzdWx0ID0gdmFsdWU7XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZG9tYWluKSBkb21haW4uZW50ZXIoKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IGhhbmRsZXIodmFsdWUpOyAvLyBtYXkgdGhyb3dcbiAgICAgICAgICAgIGlmIChkb21haW4pIHtcbiAgICAgICAgICAgICAgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgICAgICAgZXhpdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PT0gcmVhY3Rpb24ucHJvbWlzZSkge1xuICAgICAgICAgICAgcmVqZWN0KFR5cGVFcnJvcignUHJvbWlzZS1jaGFpbiBjeWNsZScpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRoZW4gPSBpc1RoZW5hYmxlKHJlc3VsdCkpIHtcbiAgICAgICAgICAgIHRoZW4uY2FsbChyZXN1bHQsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSBlbHNlIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHJlamVjdCh2YWx1ZSk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmIChkb21haW4gJiYgIWV4aXRlZCkgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgcmVqZWN0KGUpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2hpbGUgKGNoYWluLmxlbmd0aCA+IGkpIHJ1bihjaGFpbltpKytdKTsgLy8gdmFyaWFibGUgbGVuZ3RoIC0gY2FuJ3QgdXNlIGZvckVhY2hcbiAgICBwcm9taXNlLl9jID0gW107XG4gICAgcHJvbWlzZS5fbiA9IGZhbHNlO1xuICAgIGlmIChpc1JlamVjdCAmJiAhcHJvbWlzZS5faCkgb25VbmhhbmRsZWQocHJvbWlzZSk7XG4gIH0pO1xufTtcbnZhciBvblVuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdmFsdWUgPSBwcm9taXNlLl92O1xuICAgIHZhciB1bmhhbmRsZWQgPSBpc1VuaGFuZGxlZChwcm9taXNlKTtcbiAgICB2YXIgcmVzdWx0LCBoYW5kbGVyLCBjb25zb2xlO1xuICAgIGlmICh1bmhhbmRsZWQpIHtcbiAgICAgIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoaXNOb2RlKSB7XG4gICAgICAgICAgcHJvY2Vzcy5lbWl0KCd1bmhhbmRsZWRSZWplY3Rpb24nLCB2YWx1ZSwgcHJvbWlzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFuZGxlciA9IGdsb2JhbC5vbnVuaGFuZGxlZHJlamVjdGlvbikge1xuICAgICAgICAgIGhhbmRsZXIoeyBwcm9taXNlOiBwcm9taXNlLCByZWFzb246IHZhbHVlIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKChjb25zb2xlID0gZ2xvYmFsLmNvbnNvbGUpICYmIGNvbnNvbGUuZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdVbmhhbmRsZWQgcHJvbWlzZSByZWplY3Rpb24nLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gQnJvd3NlcnMgc2hvdWxkIG5vdCB0cmlnZ2VyIGByZWplY3Rpb25IYW5kbGVkYCBldmVudCBpZiBpdCB3YXMgaGFuZGxlZCBoZXJlLCBOb2RlSlMgLSBzaG91bGRcbiAgICAgIHByb21pc2UuX2ggPSBpc05vZGUgfHwgaXNVbmhhbmRsZWQocHJvbWlzZSkgPyAyIDogMTtcbiAgICB9IHByb21pc2UuX2EgPSB1bmRlZmluZWQ7XG4gICAgaWYgKHVuaGFuZGxlZCAmJiByZXN1bHQuZSkgdGhyb3cgcmVzdWx0LnY7XG4gIH0pO1xufTtcbnZhciBpc1VuaGFuZGxlZCA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gIHJldHVybiBwcm9taXNlLl9oICE9PSAxICYmIChwcm9taXNlLl9hIHx8IHByb21pc2UuX2MpLmxlbmd0aCA9PT0gMDtcbn07XG52YXIgb25IYW5kbGVVbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSkge1xuICB0YXNrLmNhbGwoZ2xvYmFsLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGhhbmRsZXI7XG4gICAgaWYgKGlzTm9kZSkge1xuICAgICAgcHJvY2Vzcy5lbWl0KCdyZWplY3Rpb25IYW5kbGVkJywgcHJvbWlzZSk7XG4gICAgfSBlbHNlIGlmIChoYW5kbGVyID0gZ2xvYmFsLm9ucmVqZWN0aW9uaGFuZGxlZCkge1xuICAgICAgaGFuZGxlcih7IHByb21pc2U6IHByb21pc2UsIHJlYXNvbjogcHJvbWlzZS5fdiB9KTtcbiAgICB9XG4gIH0pO1xufTtcbnZhciAkcmVqZWN0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIHZhciBwcm9taXNlID0gdGhpcztcbiAgaWYgKHByb21pc2UuX2QpIHJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICBwcm9taXNlLl92ID0gdmFsdWU7XG4gIHByb21pc2UuX3MgPSAyO1xuICBpZiAoIXByb21pc2UuX2EpIHByb21pc2UuX2EgPSBwcm9taXNlLl9jLnNsaWNlKCk7XG4gIG5vdGlmeShwcm9taXNlLCB0cnVlKTtcbn07XG52YXIgJHJlc29sdmUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgdmFyIHByb21pc2UgPSB0aGlzO1xuICB2YXIgdGhlbjtcbiAgaWYgKHByb21pc2UuX2QpIHJldHVybjtcbiAgcHJvbWlzZS5fZCA9IHRydWU7XG4gIHByb21pc2UgPSBwcm9taXNlLl93IHx8IHByb21pc2U7IC8vIHVud3JhcFxuICB0cnkge1xuICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSkgdGhyb3cgVHlwZUVycm9yKFwiUHJvbWlzZSBjYW4ndCBiZSByZXNvbHZlZCBpdHNlbGZcIik7XG4gICAgaWYgKHRoZW4gPSBpc1RoZW5hYmxlKHZhbHVlKSkge1xuICAgICAgbWljcm90YXNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHdyYXBwZXIgPSB7IF93OiBwcm9taXNlLCBfZDogZmFsc2UgfTsgLy8gd3JhcFxuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoZW4uY2FsbCh2YWx1ZSwgY3R4KCRyZXNvbHZlLCB3cmFwcGVyLCAxKSwgY3R4KCRyZWplY3QsIHdyYXBwZXIsIDEpKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICRyZWplY3QuY2FsbCh3cmFwcGVyLCBlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb21pc2UuX3YgPSB2YWx1ZTtcbiAgICAgIHByb21pc2UuX3MgPSAxO1xuICAgICAgbm90aWZ5KHByb21pc2UsIGZhbHNlKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICAkcmVqZWN0LmNhbGwoeyBfdzogcHJvbWlzZSwgX2Q6IGZhbHNlIH0sIGUpOyAvLyB3cmFwXG4gIH1cbn07XG5cbi8vIGNvbnN0cnVjdG9yIHBvbHlmaWxsXG5pZiAoIVVTRV9OQVRJVkUpIHtcbiAgLy8gMjUuNC4zLjEgUHJvbWlzZShleGVjdXRvcilcbiAgJFByb21pc2UgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgYW5JbnN0YW5jZSh0aGlzLCAkUHJvbWlzZSwgUFJPTUlTRSwgJ19oJyk7XG4gICAgYUZ1bmN0aW9uKGV4ZWN1dG9yKTtcbiAgICBJbnRlcm5hbC5jYWxsKHRoaXMpO1xuICAgIHRyeSB7XG4gICAgICBleGVjdXRvcihjdHgoJHJlc29sdmUsIHRoaXMsIDEpLCBjdHgoJHJlamVjdCwgdGhpcywgMSkpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgJHJlamVjdC5jYWxsKHRoaXMsIGVycik7XG4gICAgfVxuICB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgSW50ZXJuYWwgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgdGhpcy5fYyA9IFtdOyAgICAgICAgICAgICAvLyA8LSBhd2FpdGluZyByZWFjdGlvbnNcbiAgICB0aGlzLl9hID0gdW5kZWZpbmVkOyAgICAgIC8vIDwtIGNoZWNrZWQgaW4gaXNVbmhhbmRsZWQgcmVhY3Rpb25zXG4gICAgdGhpcy5fcyA9IDA7ICAgICAgICAgICAgICAvLyA8LSBzdGF0ZVxuICAgIHRoaXMuX2QgPSBmYWxzZTsgICAgICAgICAgLy8gPC0gZG9uZVxuICAgIHRoaXMuX3YgPSB1bmRlZmluZWQ7ICAgICAgLy8gPC0gdmFsdWVcbiAgICB0aGlzLl9oID0gMDsgICAgICAgICAgICAgIC8vIDwtIHJlamVjdGlvbiBzdGF0ZSwgMCAtIGRlZmF1bHQsIDEgLSBoYW5kbGVkLCAyIC0gdW5oYW5kbGVkXG4gICAgdGhpcy5fbiA9IGZhbHNlOyAgICAgICAgICAvLyA8LSBub3RpZnlcbiAgfTtcbiAgSW50ZXJuYWwucHJvdG90eXBlID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUtYWxsJykoJFByb21pc2UucHJvdG90eXBlLCB7XG4gICAgLy8gMjUuNC41LjMgUHJvbWlzZS5wcm90b3R5cGUudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZClcbiAgICB0aGVuOiBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgICB2YXIgcmVhY3Rpb24gPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgJFByb21pc2UpKTtcbiAgICAgIHJlYWN0aW9uLm9rID0gdHlwZW9mIG9uRnVsZmlsbGVkID09ICdmdW5jdGlvbicgPyBvbkZ1bGZpbGxlZCA6IHRydWU7XG4gICAgICByZWFjdGlvbi5mYWlsID0gdHlwZW9mIG9uUmVqZWN0ZWQgPT0gJ2Z1bmN0aW9uJyAmJiBvblJlamVjdGVkO1xuICAgICAgcmVhY3Rpb24uZG9tYWluID0gaXNOb2RlID8gcHJvY2Vzcy5kb21haW4gOiB1bmRlZmluZWQ7XG4gICAgICB0aGlzLl9jLnB1c2gocmVhY3Rpb24pO1xuICAgICAgaWYgKHRoaXMuX2EpIHRoaXMuX2EucHVzaChyZWFjdGlvbik7XG4gICAgICBpZiAodGhpcy5fcykgbm90aWZ5KHRoaXMsIGZhbHNlKTtcbiAgICAgIHJldHVybiByZWFjdGlvbi5wcm9taXNlO1xuICAgIH0sXG4gICAgLy8gMjUuNC41LjEgUHJvbWlzZS5wcm90b3R5cGUuY2F0Y2gob25SZWplY3RlZClcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbiAob25SZWplY3RlZCkge1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfSk7XG4gIE93blByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9taXNlID0gbmV3IEludGVybmFsKCk7XG4gICAgdGhpcy5wcm9taXNlID0gcHJvbWlzZTtcbiAgICB0aGlzLnJlc29sdmUgPSBjdHgoJHJlc29sdmUsIHByb21pc2UsIDEpO1xuICAgIHRoaXMucmVqZWN0ID0gY3R4KCRyZWplY3QsIHByb21pc2UsIDEpO1xuICB9O1xuICBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBmdW5jdGlvbiAoQykge1xuICAgIHJldHVybiBDID09PSAkUHJvbWlzZSB8fCBDID09PSBXcmFwcGVyXG4gICAgICA/IG5ldyBPd25Qcm9taXNlQ2FwYWJpbGl0eShDKVxuICAgICAgOiBuZXdHZW5lcmljUHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gIH07XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHsgUHJvbWlzZTogJFByb21pc2UgfSk7XG5yZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpKCRQcm9taXNlLCBQUk9NSVNFKTtcbnJlcXVpcmUoJy4vX3NldC1zcGVjaWVzJykoUFJPTUlTRSk7XG5XcmFwcGVyID0gcmVxdWlyZSgnLi9fY29yZScpW1BST01JU0VdO1xuXG4vLyBzdGF0aWNzXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCBQUk9NSVNFLCB7XG4gIC8vIDI1LjQuNC41IFByb21pc2UucmVqZWN0KHIpXG4gIHJlamVjdDogZnVuY3Rpb24gcmVqZWN0KHIpIHtcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KHRoaXMpO1xuICAgIHZhciAkJHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgICQkcmVqZWN0KHIpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoTElCUkFSWSB8fCAhVVNFX05BVElWRSksIFBST01JU0UsIHtcbiAgLy8gMjUuNC40LjYgUHJvbWlzZS5yZXNvbHZlKHgpXG4gIHJlc29sdmU6IGZ1bmN0aW9uIHJlc29sdmUoeCkge1xuICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShMSUJSQVJZICYmIHRoaXMgPT09IFdyYXBwZXIgPyAkUHJvbWlzZSA6IHRoaXMsIHgpO1xuICB9XG59KTtcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIShVU0VfTkFUSVZFICYmIHJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24gKGl0ZXIpIHtcbiAgJFByb21pc2UuYWxsKGl0ZXIpWydjYXRjaCddKGVtcHR5KTtcbn0pKSwgUFJPTUlTRSwge1xuICAvLyAyNS40LjQuMSBQcm9taXNlLmFsbChpdGVyYWJsZSlcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVzb2x2ZSA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgIHZhciByZW1haW5pbmcgPSAxO1xuICAgICAgZm9yT2YoaXRlcmFibGUsIGZhbHNlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICB2YXIgJGluZGV4ID0gaW5kZXgrKztcbiAgICAgICAgdmFyIGFscmVhZHlDYWxsZWQgPSBmYWxzZTtcbiAgICAgICAgdmFsdWVzLnB1c2godW5kZWZpbmVkKTtcbiAgICAgICAgcmVtYWluaW5nKys7XG4gICAgICAgIEMucmVzb2x2ZShwcm9taXNlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIGlmIChhbHJlYWR5Q2FsbGVkKSByZXR1cm47XG4gICAgICAgICAgYWxyZWFkeUNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgdmFsdWVzWyRpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgICB9KTtcbiAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmUpIHJlamVjdChyZXN1bHQudik7XG4gICAgcmV0dXJuIGNhcGFiaWxpdHkucHJvbWlzZTtcbiAgfSxcbiAgLy8gMjUuNC40LjQgUHJvbWlzZS5yYWNlKGl0ZXJhYmxlKVxuICByYWNlOiBmdW5jdGlvbiByYWNlKGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkoQyk7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIGZvck9mKGl0ZXJhYmxlLCBmYWxzZSwgZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgQy5yZXNvbHZlKHByb21pc2UpLnRoZW4oY2FwYWJpbGl0eS5yZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaWYgKHJlc3VsdC5lKSByZWplY3QocmVzdWx0LnYpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uIChpdGVyYXRlZCkge1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbiAoKSB7XG4gIHZhciBPID0gdGhpcy5fdDtcbiAgdmFyIGluZGV4ID0gdGhpcy5faTtcbiAgdmFyIHBvaW50O1xuICBpZiAoaW5kZXggPj0gTy5sZW5ndGgpIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHsgdmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZSB9O1xufSk7XG4iLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLWZpbmFsbHlcbid1c2Ugc3RyaWN0JztcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG52YXIgY29yZSA9IHJlcXVpcmUoJy4vX2NvcmUnKTtcbnZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKTtcbnZhciBzcGVjaWVzQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuL19zcGVjaWVzLWNvbnN0cnVjdG9yJyk7XG52YXIgcHJvbWlzZVJlc29sdmUgPSByZXF1aXJlKCcuL19wcm9taXNlLXJlc29sdmUnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LlIsICdQcm9taXNlJywgeyAnZmluYWxseSc6IGZ1bmN0aW9uIChvbkZpbmFsbHkpIHtcbiAgdmFyIEMgPSBzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgY29yZS5Qcm9taXNlIHx8IGdsb2JhbC5Qcm9taXNlKTtcbiAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2Ygb25GaW5hbGx5ID09ICdmdW5jdGlvbic7XG4gIHJldHVybiB0aGlzLnRoZW4oXG4gICAgaXNGdW5jdGlvbiA/IGZ1bmN0aW9uICh4KSB7XG4gICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoQywgb25GaW5hbGx5KCkpLnRoZW4oZnVuY3Rpb24gKCkgeyByZXR1cm4geDsgfSk7XG4gICAgfSA6IG9uRmluYWxseSxcbiAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShDLCBvbkZpbmFsbHkoKSkudGhlbihmdW5jdGlvbiAoKSB7IHRocm93IGU7IH0pO1xuICAgIH0gOiBvbkZpbmFsbHlcbiAgKTtcbn0gfSk7XG4iLCIndXNlIHN0cmljdCc7XG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcm9taXNlLXRyeVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IHJlcXVpcmUoJy4vX25ldy1wcm9taXNlLWNhcGFiaWxpdHknKTtcbnZhciBwZXJmb3JtID0gcmVxdWlyZSgnLi9fcGVyZm9ybScpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ1Byb21pc2UnLCB7ICd0cnknOiBmdW5jdGlvbiAoY2FsbGJhY2tmbikge1xuICB2YXIgcHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eS5mKHRoaXMpO1xuICB2YXIgcmVzdWx0ID0gcGVyZm9ybShjYWxsYmFja2ZuKTtcbiAgKHJlc3VsdC5lID8gcHJvbWlzZUNhcGFiaWxpdHkucmVqZWN0IDogcHJvbWlzZUNhcGFiaWxpdHkucmVzb2x2ZSkocmVzdWx0LnYpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn0gfSk7XG4iLCJyZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpO1xudmFyIGhpZGUgPSByZXF1aXJlKCcuL19oaWRlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG52YXIgVE9fU1RSSU5HX1RBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG52YXIgRE9NSXRlcmFibGVzID0gKCdDU1NSdWxlTGlzdCxDU1NTdHlsZURlY2xhcmF0aW9uLENTU1ZhbHVlTGlzdCxDbGllbnRSZWN0TGlzdCxET01SZWN0TGlzdCxET01TdHJpbmdMaXN0LCcgK1xuICAnRE9NVG9rZW5MaXN0LERhdGFUcmFuc2Zlckl0ZW1MaXN0LEZpbGVMaXN0LEhUTUxBbGxDb2xsZWN0aW9uLEhUTUxDb2xsZWN0aW9uLEhUTUxGb3JtRWxlbWVudCxIVE1MU2VsZWN0RWxlbWVudCwnICtcbiAgJ01lZGlhTGlzdCxNaW1lVHlwZUFycmF5LE5hbWVkTm9kZU1hcCxOb2RlTGlzdCxQYWludFJlcXVlc3RMaXN0LFBsdWdpbixQbHVnaW5BcnJheSxTVkdMZW5ndGhMaXN0LFNWR051bWJlckxpc3QsJyArXG4gICdTVkdQYXRoU2VnTGlzdCxTVkdQb2ludExpc3QsU1ZHU3RyaW5nTGlzdCxTVkdUcmFuc2Zvcm1MaXN0LFNvdXJjZUJ1ZmZlckxpc3QsU3R5bGVTaGVldExpc3QsVGV4dFRyYWNrQ3VlTGlzdCwnICtcbiAgJ1RleHRUcmFja0xpc3QsVG91Y2hMaXN0Jykuc3BsaXQoJywnKTtcblxuZm9yICh2YXIgaSA9IDA7IGkgPCBET01JdGVyYWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgdmFyIE5BTUUgPSBET01JdGVyYWJsZXNbaV07XG4gIHZhciBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdO1xuICB2YXIgcHJvdG8gPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZiAocHJvdG8gJiYgIXByb3RvW1RPX1NUUklOR19UQUddKSBoaWRlKHByb3RvLCBUT19TVFJJTkdfVEFHLCBOQU1FKTtcbiAgSXRlcmF0b3JzW05BTUVdID0gSXRlcmF0b3JzLkFycmF5O1xufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4vLyBUaGlzIG1ldGhvZCBvZiBvYnRhaW5pbmcgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QgbmVlZHMgdG8gYmVcbi8vIGtlcHQgaWRlbnRpY2FsIHRvIHRoZSB3YXkgaXQgaXMgb2J0YWluZWQgaW4gcnVudGltZS5qc1xudmFyIGcgPSAoZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzIH0pKCkgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xuXG4vLyBVc2UgYGdldE93blByb3BlcnR5TmFtZXNgIGJlY2F1c2Ugbm90IGFsbCBicm93c2VycyBzdXBwb3J0IGNhbGxpbmdcbi8vIGBoYXNPd25Qcm9wZXJ0eWAgb24gdGhlIGdsb2JhbCBgc2VsZmAgb2JqZWN0IGluIGEgd29ya2VyLiBTZWUgIzE4My5cbnZhciBoYWRSdW50aW1lID0gZy5yZWdlbmVyYXRvclJ1bnRpbWUgJiZcbiAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZykuaW5kZXhPZihcInJlZ2VuZXJhdG9yUnVudGltZVwiKSA+PSAwO1xuXG4vLyBTYXZlIHRoZSBvbGQgcmVnZW5lcmF0b3JSdW50aW1lIGluIGNhc2UgaXQgbmVlZHMgdG8gYmUgcmVzdG9yZWQgbGF0ZXIuXG52YXIgb2xkUnVudGltZSA9IGhhZFJ1bnRpbWUgJiYgZy5yZWdlbmVyYXRvclJ1bnRpbWU7XG5cbi8vIEZvcmNlIHJlZXZhbHV0YXRpb24gb2YgcnVudGltZS5qcy5cbmcucmVnZW5lcmF0b3JSdW50aW1lID0gdW5kZWZpbmVkO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL3J1bnRpbWVcIik7XG5cbmlmIChoYWRSdW50aW1lKSB7XG4gIC8vIFJlc3RvcmUgdGhlIG9yaWdpbmFsIHJ1bnRpbWUuXG4gIGcucmVnZW5lcmF0b3JSdW50aW1lID0gb2xkUnVudGltZTtcbn0gZWxzZSB7XG4gIC8vIFJlbW92ZSB0aGUgZ2xvYmFsIHByb3BlcnR5IGFkZGVkIGJ5IHJ1bnRpbWUuanMuXG4gIHRyeSB7XG4gICAgZGVsZXRlIGcucmVnZW5lcmF0b3JSdW50aW1lO1xuICB9IGNhdGNoKGUpIHtcbiAgICBnLnJlZ2VuZXJhdG9yUnVudGltZSA9IHVuZGVmaW5lZDtcbiAgfVxufVxuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4hKGZ1bmN0aW9uKGdsb2JhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIHZhciBpbk1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCI7XG4gIHZhciBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgaWYgKHJ1bnRpbWUpIHtcbiAgICBpZiAoaW5Nb2R1bGUpIHtcbiAgICAgIC8vIElmIHJlZ2VuZXJhdG9yUnVudGltZSBpcyBkZWZpbmVkIGdsb2JhbGx5IGFuZCB3ZSdyZSBpbiBhIG1vZHVsZSxcbiAgICAgIC8vIG1ha2UgdGhlIGV4cG9ydHMgb2JqZWN0IGlkZW50aWNhbCB0byByZWdlbmVyYXRvclJ1bnRpbWUuXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IHJ1bnRpbWU7XG4gICAgfVxuICAgIC8vIERvbid0IGJvdGhlciBldmFsdWF0aW5nIHRoZSByZXN0IG9mIHRoaXMgZmlsZSBpZiB0aGUgcnVudGltZSB3YXNcbiAgICAvLyBhbHJlYWR5IGRlZmluZWQgZ2xvYmFsbHkuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRGVmaW5lIHRoZSBydW50aW1lIGdsb2JhbGx5IChhcyBleHBlY3RlZCBieSBnZW5lcmF0ZWQgY29kZSkgYXMgZWl0aGVyXG4gIC8vIG1vZHVsZS5leHBvcnRzIChpZiB3ZSdyZSBpbiBhIG1vZHVsZSkgb3IgYSBuZXcsIGVtcHR5IG9iamVjdC5cbiAgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWUgPSBpbk1vZHVsZSA/IG1vZHVsZS5leHBvcnRzIDoge307XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgcnVudGltZS53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGVbdG9TdHJpbmdUYWdTeW1ib2xdID1cbiAgICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBwcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBydW50aW1lLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGlmICghKHRvU3RyaW5nVGFnU3ltYm9sIGluIGdlbkZ1bikpIHtcbiAgICAgICAgZ2VuRnVuW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgcnVudGltZS5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uIElmIHRoZSBQcm9taXNlIGlzIHJlamVjdGVkLCBob3dldmVyLCB0aGVcbiAgICAgICAgICAvLyByZXN1bHQgZm9yIHRoaXMgaXRlcmF0aW9uIHdpbGwgYmUgcmVqZWN0ZWQgd2l0aCB0aGUgc2FtZVxuICAgICAgICAgIC8vIHJlYXNvbi4gTm90ZSB0aGF0IHJlamVjdGlvbnMgb2YgeWllbGRlZCBQcm9taXNlcyBhcmUgbm90XG4gICAgICAgICAgLy8gdGhyb3duIGJhY2sgaW50byB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uLCBhcyBpcyB0aGUgY2FzZVxuICAgICAgICAgIC8vIHdoZW4gYW4gYXdhaXRlZCBQcm9taXNlIGlzIHJlamVjdGVkLiBUaGlzIGRpZmZlcmVuY2UgaW5cbiAgICAgICAgICAvLyBiZWhhdmlvciBiZXR3ZWVuIHlpZWxkIGFuZCBhd2FpdCBpcyBpbXBvcnRhbnQsIGJlY2F1c2UgaXRcbiAgICAgICAgICAvLyBhbGxvd3MgdGhlIGNvbnN1bWVyIHRvIGRlY2lkZSB3aGF0IHRvIGRvIHdpdGggdGhlIHlpZWxkZWRcbiAgICAgICAgICAvLyByZWplY3Rpb24gKHN3YWxsb3cgaXQgYW5kIGNvbnRpbnVlLCBtYW51YWxseSAudGhyb3cgaXQgYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGdlbmVyYXRvciwgYWJhbmRvbiBpdGVyYXRpb24sIHdoYXRldmVyKS4gV2l0aFxuICAgICAgICAgIC8vIGF3YWl0LCBieSBjb250cmFzdCwgdGhlcmUgaXMgbm8gb3Bwb3J0dW5pdHkgdG8gZXhhbWluZSB0aGVcbiAgICAgICAgICAvLyByZWplY3Rpb24gcmVhc29uIG91dHNpZGUgdGhlIGdlbmVyYXRvciBmdW5jdGlvbiwgc28gdGhlXG4gICAgICAgICAgLy8gb25seSBvcHRpb24gaXMgdG8gdGhyb3cgaXQgZnJvbSB0aGUgYXdhaXQgZXhwcmVzc2lvbiwgYW5kXG4gICAgICAgICAgLy8gbGV0IHRoZSBnZW5lcmF0b3IgZnVuY3Rpb24gaGFuZGxlIHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBydW50aW1lLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBydW50aW1lLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdClcbiAgICApO1xuXG4gICAgcmV0dXJuIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvclwiO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIHJ1bnRpbWUua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBydW50aW1lLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xufSkoXG4gIC8vIEluIHNsb3BweSBtb2RlLCB1bmJvdW5kIGB0aGlzYCByZWZlcnMgdG8gdGhlIGdsb2JhbCBvYmplY3QsIGZhbGxiYWNrIHRvXG4gIC8vIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIGlmIHdlJ3JlIGluIGdsb2JhbCBzdHJpY3QgbW9kZS4gVGhhdCBpcyBzYWRseSBhIGZvcm1cbiAgLy8gb2YgaW5kaXJlY3QgZXZhbCB3aGljaCB2aW9sYXRlcyBDb250ZW50IFNlY3VyaXR5IFBvbGljeS5cbiAgKGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcyB9KSgpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKVxuKTtcbiIsImNvbnN0IGluaGVyaXQgPSBnM3dzZGsuY29yZS51dGlscy5pbmhlcml0O1xuY29uc3QgYmFzZSA9IGczd3Nkay5jb3JlLnV0aWxzLmJhc2U7XG5jb25zdCBYSFIgPSBnM3dzZGsuY29yZS51dGlscy5YSFI7XG5jb25zdCBQbHVnaW5TZXJ2aWNlID0gZzN3c2RrLmNvcmUucGx1Z2luLlBsdWdpblNlcnZpY2U7XG5jb25zdCB0ID0gZzN3c2RrLmNvcmUuaTE4bi50UGx1Z2luO1xuY29uc3QgR1VJID0gZzN3c2RrLmd1aS5HVUk7XG5jb25zdCBDb21wb25lbnRzRmFjdG9yeSA9IGczd3Nkay5ndWkuQ29tcG9uZW50c0ZhY3Rvcnk7XG5jb25zdCBDaGFydHNGYWN0b3J5ID0gZzN3c2RrLmd1aS52dWUuQ2hhcnRzLkNoYXJ0c0ZhY3Rvcnk7XG5cbmZ1bmN0aW9uIEVsZXZhdGlvblByb2ZpbGVTZXJ2aWNlKCkge1xuICBiYXNlKHRoaXMpO1xuICB0aGlzLmluaXQgPSBmdW5jdGlvbihjb25maWc9e30pIHtcbiAgICB0aGlzLmNoYXJ0Q29sb3IgPSBHVUkuc2tpbkNvbG9yO1xuICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xuICAgIHRoaXMuX21hcFNlcnZpY2UgPSBHVUkuZ2V0Q29tcG9uZW50KCdtYXAnKS5nZXRTZXJ2aWNlKCk7XG4gICAgdGhpcy5rZXlTZXR0ZXJzID0ge307XG4gICAgY29uc3QgcXVlcnlyZXN1bHRzQ29tcG9uZW50ID0gR1VJLmdldENvbXBvbmVudCgncXVlcnlyZXN1bHRzJyk7XG4gICAgdGhpcy5xdWVyeXJlc3VsdHNTZXJ2aWNlID0gcXVlcnlyZXN1bHRzQ29tcG9uZW50LmdldFNlcnZpY2UoKTtcbiAgICAvL3VzZWZ1bHQgdG8gcmVnaXN0ZXIgbGF5ZXIgdW5kZXIgbGF3XG4gICAgdGhpcy5rZXlTZXR0ZXJzLmFkZEFjdGlvbkxheWVycyA9IHRoaXMucXVlcnlyZXN1bHRzU2VydmljZS5vbmJlZm9yZSgnYWRkQWN0aW9uc0ZvckxheWVycycsIChhY3Rpb25zPXt9KSA9PiB7XG4gICAgICB0aGlzLmNvbmZpZy5sYXllcnMuZm9yRWFjaChsYXllck9iaiA9PiB7XG4gICAgICAgIGNvbnN0IHtsYXllcl9pZDogbGF5ZXJJZH0gPSBsYXllck9iajtcbiAgICAgICAgaWYgKCFhY3Rpb25zW2xheWVySWRdKSBhY3Rpb25zW2xheWVySWRdID0gW107XG4gICAgICAgIGNvbnN0IGxheWVyQWN0aW9ucyA9IGFjdGlvbnNbbGF5ZXJJZF07XG4gICAgICAgIGxheWVyQWN0aW9ucy5wdXNoKHtcbiAgICAgICAgICBpZDogJ3Nob3dlbGV2YXRpb24nLFxuICAgICAgICAgIGNsYXNzOiBHVUkuZ2V0Rm9udENsYXNzKCdjaGFydCcpLFxuICAgICAgICAgIGhpbnQ6ICdwbHVnaW5zLmVsZXByb2ZpbGUucXVlcnkuYWN0aW9ucy5zaG93ZWxldmF0aW9uJyxcbiAgICAgICAgICBjYms6IChsYXllciwgZmVhdHVyZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zaG93Q2hhcnRDb21wb25lbnQoe1xuICAgICAgICAgICAgICBsYXllck9iaixcbiAgICAgICAgICAgICAgZmlkOiBmZWF0dXJlLmF0dHJpYnV0ZXNbJ2czd19maWQnXVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgICB9KTtcbiAgfTtcblxuICB0aGlzLmdldENvbmZpZyA9IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHRoaXMuY29uZmlnO1xuICB9O1xuXG4gIHRoaXMuZ2V0VXJscyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmNvbmZpZy51cmxzO1xuICB9O1xuXG4gIHRoaXMuc2hvd0NoYXJ0Q29tcG9uZW50ID0gZnVuY3Rpb24oe2xheWVyT2JqLCBmaWR9PXt9KSB7XG4gICAgY29uc3Qge2FwaSwgbGF5ZXJfaWQ6IGxheWVySWR9ID0gbGF5ZXJPYmo7XG4gICAgdGhpcy5nZXRDaGFydENvbXBvbmVudCh7YXBpLCBsYXllcklkLCBmaWR9KVxuICAgICAgLnRoZW4oKHtmaWQsIGNvbXBvbmVudDp2dWVDb21wb25lbnRPYmplY3QsIGVycm9yfSkgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHJldHVybjtcbiAgICAgICAgZWxzZSBHVUkucHVzaENvbnRlbnQoe1xuICAgICAgICAgIGlkOiAnZWxldmF0aW9uJyxcbiAgICAgICAgICBjb250ZW50OiBDb21wb25lbnRzRmFjdG9yeS5idWlsZCh7XG4gICAgICAgICAgICB2dWVDb21wb25lbnRPYmplY3RcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBwZXJjOiA1MCxcbiAgICAgICAgICBjbG9zYWJsZTogZmFsc2VcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gIH07XG5cbiAgdGhpcy5nZXRDaGFydENvbXBvbmVudCA9IGFzeW5jIGZ1bmN0aW9uKHthcGksIGxheWVySWQsIGZpZH09e30pIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmdldEVsZXZhdGlvbkRhdGEoe2FwaSwgbGF5ZXJJZCwgZmlkfSk7XG4gICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UucmVzdWx0ICYmIHJlc3BvbnNlLnByb2ZpbGU7XG4gICAgICBpZiAoZGF0YSkge1xuICAgICAgICBjb25zdCBncmFwaERhdGEgPSB7XG4gICAgICAgICAgeDogWyd4J10sXG4gICAgICAgICAgeTogWyd5J10sXG4gICAgICAgICAgbWluWDogIDk5OTk5OTksXG4gICAgICAgICAgbWF4WDogLTk5OTk5OTksXG4gICAgICAgICAgbWluWTogIDk5OTk5OTksXG4gICAgICAgICAgbWF4WTogLTk5OTk5OTlcbiAgICAgICAgfTtcbiAgICAgICAgZm9yIChsZXQgaT0wOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbnN0IF9kYXRhID0gZGF0YVtpXTtcbiAgICAgICAgICBjb25zdCB4ID0gX2RhdGFbM107XG4gICAgICAgICAgY29uc3QgeSA9IF9kYXRhWzJdO1xuICAgICAgICAgIGdyYXBoRGF0YS5taW5YID0geCA8IGdyYXBoRGF0YS5taW5YID8geCA6IGdyYXBoRGF0YS5taW5YO1xuICAgICAgICAgIGdyYXBoRGF0YS5taW5ZID0geSA8IGdyYXBoRGF0YS5taW5ZID8geSA6IGdyYXBoRGF0YS5taW5ZO1xuICAgICAgICAgIGdyYXBoRGF0YS5tYXhYID0geCA+IGdyYXBoRGF0YS5tYXhYID8geCA6IGdyYXBoRGF0YS5tYXhYO1xuICAgICAgICAgIGdyYXBoRGF0YS5tYXhZID0geSA+IGdyYXBoRGF0YS5tYXhZID8geSA6IGdyYXBoRGF0YS5tYXhZO1xuICAgICAgICAgIGdyYXBoRGF0YS54LnB1c2goeCk7XG4gICAgICAgICAgZ3JhcGhEYXRhLnkucHVzaCh5KTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgY29uc3QgbWFwID0gdGhpcy5fbWFwU2VydmljZS5nZXRNYXAoKTtcbiAgICAgICAgbGV0IGhpZGVIaWdodGxpZ2h0Rm5jID0gKCkgPT4ge307XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZGF0YSxcbiAgICAgICAgICBpZDogdCgnZWxlcHJvZmlsZS5jaGFydC50aXRsZScpLFxuICAgICAgICAgIGNvbXBvbmVudDogQ2hhcnRzRmFjdG9yeS5idWlsZCh7XG4gICAgICAgICAgICB0eXBlOiAnYzM6bGluZVhZJyxcbiAgICAgICAgICAgIGhvb2tzOiB7XG4gICAgICAgICAgICAgIGNyZWF0ZWQoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRDb25maWcoe1xuICAgICAgICAgICAgICAgICAgb25tb3VzZW91dCgpIHtcbiAgICAgICAgICAgICAgICAgICAgaGlkZUhpZ2h0bGlnaHRGbmMoKVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHRpdGxlOiB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHQoJ2VsZXByb2ZpbGUuY2hhcnQudGl0bGUnKSxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICd0b3AtY2VudGVyJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBwYWRkaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgIHRvcDogNDAsXG4gICAgICAgICAgICAgICAgICAgIGJvdHRvbTogMzAsXG4gICAgICAgICAgICAgICAgICAgIHJpZ2h0OiAzMFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHpvb206IHtcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcmVzY2FsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgIGRyYWdnYWJsZTogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB4OiAneCcsXG4gICAgICAgICAgICAgICAgICAgIHk6ICd5JyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICB5OiAnYXJlYSdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY29sb3JzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgeDogc2VsZi5jaGFydENvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgIHk6IHNlbGYuY2hhcnRDb2xvclxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjb2x1bW5zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgZ3JhcGhEYXRhLngsXG4gICAgICAgICAgICAgICAgICAgICAgZ3JhcGhEYXRhLnlcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgb25tb3VzZW91dChldnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBoaWRlSGlnaHRsaWdodEZuYygpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBvbmNsaWNrKHtpbmRleH0pIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBbeCwgeV0gPSBkYXRhW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICBtYXAuZ2V0VmlldygpLnNldENlbnRlcihbeCx5XSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgdG9vbHRpcDp7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1hdDoge1xuICAgICAgICAgICAgICAgICAgICAgIHRpdGxlKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHt0KCdlbGVwcm9maWxlLmNoYXJ0LnRvb2x0aXAudGl0bGUnKX06ICR7ZGF0YVtkXVszXX1gXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudHM6IGZ1bmN0aW9uIChfZGF0YSwgY29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IF9kYXRhWzBdLmluZGV4O1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFt4LCB5LCB2YWx1ZV0gPSBkYXRhW2luZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwb2ludF9nZW9tID0gbmV3IG9sLmdlb20uUG9pbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICBbeCwgeV1cbiAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX21hcFNlcnZpY2UuaGlnaGxpZ2h0R2VvbWV0cnkocG9pbnRfZ2VvbSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgem9vbTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBoaWRlOiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlSGlnaHRsaWdodEZuYyA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiBuZXcgb2wuc3R5bGUuU3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpbWFnZTogbmV3IG9sLnN0eWxlLlJlZ3VsYXJTaGFwZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbDogbmV3IG9sLnN0eWxlLkZpbGwoe2NvbG9yOiAnd2hpdGUnIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZTogbmV3IG9sLnN0eWxlLlN0cm9rZSh7Y29sb3I6IHNlbGYuY2hhcnRDb2xvciwgd2lkdGg6IDN9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2ludHM6IDMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFkaXVzOiAxMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmdsZTogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxkaXYgc3R5bGU9XCJmb250LXdlaWdodDogYm9sZDsgYm9yZGVyOjJweCBzb2xpZDsgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjsgcGFkZGluZzogM3B4O2JvcmRlci1yYWRpdXM6IDNweDtcIiBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJza2luLWJvcmRlci1jb2xvciBza2luLWNvbG9yXCI+JHt2YWx1ZS50b0ZpeGVkKDIpfShtKTwvZGl2PmBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGF4aXM6IHtcbiAgICAgICAgICAgICAgICAgICAgeDoge1xuICAgICAgICAgICAgICAgICAgICAgIG1heDogZ3JhcGhEYXRhLm1heFggKyAyLFxuICAgICAgICAgICAgICAgICAgICAgIG1pbjogZ3JhcGhEYXRhLm1pblggLSAyLFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0KCdlbGVwcm9maWxlLmNoYXJ0LmxhYmVscy54JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ291dGVyLWNlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIHRpY2s6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudDogNCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1hdDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZS50b0ZpeGVkKDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgeToge1xuICAgICAgICAgICAgICAgICAgICAgIG1heDogZ3JhcGhEYXRhLm1heFkgKyA1LFxuICAgICAgICAgICAgICAgICAgICAgIG1pbjogZ3JhcGhEYXRhLm1pblkgLSA1LFxuICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiB0KCdlbGVwcm9maWxlLmNoYXJ0LmxhYmVscy55JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ291dGVyLW1pZGRsZSdcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIHRpY2s6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50OiA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybWF0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnRvRml4ZWQoMik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBlcnJvcjogdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB0aGlzLmdldEVsZXZhdGlvbkRhdGEgPSBhc3luYyBmdW5jdGlvbih7YXBpLCBsYXllcklkLCBmaWR9PXt9KSB7XG4gICAgY29uc3QgdXJsID0gYCR7YXBpfSR7bGF5ZXJJZH0vJHtmaWR9YDtcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgcmVzdWx0OiBmYWxzZVxuICAgIH07XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgWEhSLmdldCh7XG4gICAgICAgIHVybFxuICAgICAgfSk7XG4gICAgICBkYXRhLnByb2ZpbGUgPSByZXNwb25zZS5wcm9maWxlO1xuICAgICAgZGF0YS5yZXN1bHQgPSB0cnVlO1xuICAgIH0gY2F0Y2goZXJyb3Ipe31cbiAgICByZXR1cm4gZGF0YTtcbiAgfTtcblxuICB0aGlzLmNsZWFyID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5xdWVyeXJlc3VsdHNTZXJ2aWNlLnVuKCdhZGRBY3Rpb25MYXllcnMnLCB0aGlzLmtleVNldHRlcnMuYWRkQWN0aW9uTGF5ZXJzKTtcbiAgfVxufVxuXG5cbmluaGVyaXQoRWxldmF0aW9uUHJvZmlsZVNlcnZpY2UsIFBsdWdpblNlcnZpY2UpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5ldyBFbGV2YXRpb25Qcm9maWxlU2VydmljZTtcbiJdLCJwcmVFeGlzdGluZ0NvbW1lbnQiOiIvLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5aWNtOTNjMlZ5TFhCaFkyc3ZYM0J5Wld4MVpHVXVhbk1pTENKamIyNW1hV2N2YVRFNGJpOXBibVJsZUM1cWN5SXNJbU52Ym1acFp5OXBibVJsZUM1cWN5SXNJbWx1WkdWNExtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwySmhZbVZzTFhKMWJuUnBiV1V2WTI5eVpTMXFjeTluWlhRdGFYUmxjbUYwYjNJdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlltRmlaV3d0Y25WdWRHbHRaUzlqYjNKbExXcHpMMmx6TFdsMFpYSmhZbXhsTG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJKaFltVnNMWEoxYm5ScGJXVXZZMjl5WlMxcWN5OXdjbTl0YVhObExtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwySmhZbVZzTFhKMWJuUnBiV1V2YUdWc2NHVnljeTloYzNsdVkxUnZSMlZ1WlhKaGRHOXlMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMkpoWW1Wc0xYSjFiblJwYldVdmFHVnNjR1Z5Y3k5emJHbGpaV1JVYjBGeWNtRjVMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMkpoWW1Wc0xYSjFiblJwYldVdmNtVm5aVzVsY21GMGIzSXZhVzVrWlhndWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDJadUwyZGxkQzFwZEdWeVlYUnZjaTVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZabTR2YVhNdGFYUmxjbUZpYkdVdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDJadUwzQnliMjFwYzJVdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDJFdFpuVnVZM1JwYjI0dWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDJGa1pDMTBieTExYm5OamIzQmhZbXhsY3k1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmWVc0dGFXNXpkR0Z1WTJVdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDJGdUxXOWlhbVZqZEM1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmWVhKeVlYa3RhVzVqYkhWa1pYTXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgyTnNZWE56YjJZdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDJOdlppNXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OWpiM0psTFdwekwyeHBZbkpoY25rdmJXOWtkV3hsY3k5ZlkyOXlaUzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZZM1I0TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTlrWldacGJtVmtMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOWtaWE5qY21sd2RHOXljeTVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZaRzl0TFdOeVpXRjBaUzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZaVzUxYlMxaWRXY3RhMlY1Y3k1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmWlhod2IzSjBMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOW1ZV2xzY3k1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmWm05eUxXOW1MbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOW5iRzlpWVd3dWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDJoaGN5NXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OWpiM0psTFdwekwyeHBZbkpoY25rdmJXOWtkV3hsY3k5ZmFHbGtaUzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZhSFJ0YkM1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmYVdVNExXUnZiUzFrWldacGJtVXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgybHVkbTlyWlM1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmYVc5aWFtVmpkQzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZhWE10WVhKeVlYa3RhWFJsY2k1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmYVhNdGIySnFaV04wTG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTlwZEdWeUxXTmhiR3d1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYMmwwWlhJdFkzSmxZWFJsTG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTlwZEdWeUxXUmxabWx1WlM1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmYVhSbGNpMWtaWFJsWTNRdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDJsMFpYSXRjM1JsY0M1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmYVhSbGNtRjBiM0p6TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTlzYVdKeVlYSjVMbXB6SWl3aWJtOWtaVjl0YjJSMWJHVnpMMk52Y21VdGFuTXZiR2xpY21GeWVTOXRiMlIxYkdWekwxOXRhV055YjNSaGMyc3Vhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgyNWxkeTF3Y205dGFYTmxMV05oY0dGaWFXeHBkSGt1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYMjlpYW1WamRDMWpjbVZoZEdVdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDI5aWFtVmpkQzFrY0M1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmYjJKcVpXTjBMV1J3Y3k1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmYjJKcVpXTjBMV2R3Ynk1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmYjJKcVpXTjBMV3RsZVhNdGFXNTBaWEp1WVd3dWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDI5aWFtVmpkQzFyWlhsekxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5d1pYSm1iM0p0TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTl3Y205dGFYTmxMWEpsYzI5c2RtVXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgzQnliM0JsY25SNUxXUmxjMk11YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYM0psWkdWbWFXNWxMV0ZzYkM1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmY21Wa1pXWnBibVV1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZYM05sZEMxemNHVmphV1Z6TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMTl6WlhRdGRHOHRjM1J5YVc1bkxYUmhaeTVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZjMmhoY21Wa0xXdGxlUzVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWZjMmhoY21Wa0xtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5emNHVmphV1Z6TFdOdmJuTjBjblZqZEc5eUxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5emRISnBibWN0WVhRdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDNSaGMyc3Vhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgzUnZMV0ZpYzI5c2RYUmxMV2x1WkdWNExtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5MGJ5MXBiblJsWjJWeUxtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5MGJ5MXBiMkpxWldOMExtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5MGJ5MXNaVzVuZEdndWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WDNSdkxXOWlhbVZqZEM1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlmZEc4dGNISnBiV2wwYVhabExtcHpJaXdpYm05a1pWOXRiMlIxYkdWekwyTnZjbVV0YW5NdmJHbGljbUZ5ZVM5dGIyUjFiR1Z6TDE5MWFXUXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgzVnpaWEl0WVdkbGJuUXVhbk1pTENKdWIyUmxYMjF2WkhWc1pYTXZZMjl5WlMxcWN5OXNhV0p5WVhKNUwyMXZaSFZzWlhNdlgzZHJjeTVxY3lJc0ltNXZaR1ZmYlc5a2RXeGxjeTlqYjNKbExXcHpMMnhwWW5KaGNua3ZiVzlrZFd4bGN5OWpiM0psTG1kbGRDMXBkR1Z5WVhSdmNpMXRaWFJvYjJRdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WTI5eVpTNW5aWFF0YVhSbGNtRjBiM0l1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12WTI5eVpTMXFjeTlzYVdKeVlYSjVMMjF2WkhWc1pYTXZZMjl5WlM1cGN5MXBkR1Z5WVdKc1pTNXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OWpiM0psTFdwekwyeHBZbkpoY25rdmJXOWtkV3hsY3k5bGN6WXVZWEp5WVhrdWFYUmxjbUYwYjNJdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WlhNMkxtOWlhbVZqZEM1MGJ5MXpkSEpwYm1jdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WlhNMkxuQnliMjFwYzJVdWFuTWlMQ0p1YjJSbFgyMXZaSFZzWlhNdlkyOXlaUzFxY3k5c2FXSnlZWEo1TDIxdlpIVnNaWE12WlhNMkxuTjBjbWx1Wnk1cGRHVnlZWFJ2Y2k1cWN5SXNJbTV2WkdWZmJXOWtkV3hsY3k5amIzSmxMV3B6TDJ4cFluSmhjbmt2Ylc5a2RXeGxjeTlsY3pjdWNISnZiV2x6WlM1bWFXNWhiR3g1TG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDJOdmNtVXRhbk12YkdsaWNtRnllUzl0YjJSMWJHVnpMMlZ6Tnk1d2NtOXRhWE5sTG5SeWVTNXFjeUlzSW01dlpHVmZiVzlrZFd4bGN5OWpiM0psTFdwekwyeHBZbkpoY25rdmJXOWtkV3hsY3k5M1pXSXVaRzl0TG1sMFpYSmhZbXhsTG1weklpd2libTlrWlY5dGIyUjFiR1Z6TDNKbFoyVnVaWEpoZEc5eUxYSjFiblJwYldVdmNuVnVkR2x0WlMxdGIyUjFiR1V1YW5NaUxDSnViMlJsWDIxdlpIVnNaWE12Y21WblpXNWxjbUYwYjNJdGNuVnVkR2x0WlM5eWRXNTBhVzFsTG1weklpd2ljR3gxWjJsdWMyVnlkbWxqWlM1cWN5SmRMQ0p1WVcxbGN5STZXMTBzSW0xaGNIQnBibWR6SWpvaVFVRkJRVHM3T3p0clFrTkJaVHRCUVVOaUxFMUJRVWs3UVVGRFJpeFhRVUZQTzBGQlEwd3NaVUZCVXp0QlFVTlFMSFZDUVVGbE8wRkJSRkk3UVVGRVNpeExRVVJNTzBGQlRVWXNWMEZCVHp0QlFVTk1MR0ZCUVU4c1dVRkVSanRCUVVWTUxHVkJRVk03UVVGRFVDeGxRVUZQTzBGQlJFRXNUMEZHU2p0QlFVdE1MR05CUVZFN1FVRkRUaXhYUVVGSExHTkJSRWM3UVVGRlRpeFhRVUZGTzBGQlJrazdRVUZNU0R0QlFVNU1MRWRCUkZNN1FVRnJRbUlzVFVGQlNUdEJRVU5HTEZkQlFVODdRVUZEVEN4bFFVRlRPMEZCUTFBc2RVSkJRV1U3UVVGRVVqdEJRVVJLTEV0QlJFdzdRVUZOUml4WFFVRlBPMEZCUTB3c1lVRkJUeXhYUVVSR08wRkJSVXdzWlVGQlV6dEJRVU5RTEdWQlFVODdRVUZFUVN4UFFVWktPMEZCUzB3c1kwRkJVVHRCUVVOT0xGZEJRVWNzWTBGRVJ6dEJRVVZPTEZkQlFVVTdRVUZHU1R0QlFVeElPMEZCVGt3N1FVRnNRbE1zUXpzN096czdPenRCUTBGbU96czdPenM3YTBKQlEyVTdRVUZEWWp0QlFVUmhMRU03T3p0QlEwUm1PenM3T3pzN1FVRkRRU3hKUVVGTkxGVkJRVlVzVDBGQlR5eEpRVUZRTEVOQlFWa3NTMEZCV2l4RFFVRnJRaXhQUVVGc1F6dEJRVU5CTEVsQlFVMHNUMEZCVHl4UFFVRlBMRWxCUVZBc1EwRkJXU3hMUVVGYUxFTkJRV3RDTEVsQlFTOUNPMEZCUTBFc1NVRkJUU3hUUVVGVExFOUJRVThzU1VGQlVDeERRVUZaTEUxQlFWb3NRMEZCYlVJc1RVRkJiRU03UVVGRFFTeEpRVUZOTEZWQlFWVXNVVUZCVVN4cFFrRkJVaXhEUVVGb1FqdEJRVU5CTEVsQlFVMHNaMEpCUVdkQ0xFOUJRVThzU1VGQlVDeERRVUZaTEVsQlFWb3NRMEZCYVVJc1lVRkJka003TzBGQlJVRXNTVUZCVFN4VlFVRlZMRk5CUVZZc1QwRkJWU3hIUVVGWE8wRkJRM3BDTEU5QlFVc3NTVUZCVER0QlFVTkJMRTlCUVVzc1NVRkJUQ3hIUVVGWkxGbEJRVm83UVVGRFFTeFBRVUZMTEVsQlFVd3NSMEZCV1N4WlFVRlhPMEZCUTNKQ08wRkJRMEVzYTBKQlFXTTdRVUZEV2l4WlFVRk5MRXRCUVVzc1NVRkVRenRCUVVWYUxHTkJRVkVzYVVKQlFXRTdRVUZHVkN4TFFVRmtPMEZCU1VFN1FVRkRRU3hUUVVGTExFMUJRVXdzUjBGQll5eExRVUZMTEZOQlFVd3NSVUZCWkR0QlFVTkJMRk5CUVVzc1ZVRkJUQ3hEUVVGblFpeFBRVUZvUWp0QlFVTkJMRk5CUVVzc1QwRkJUQ3hEUVVGaExFbEJRV0lzUTBGQmEwSXNTMEZCU3l4TlFVRjJRanRCUVVOQkxGTkJRVXNzWTBGQlRDeERRVUZ2UWl4TFFVRkxMRTFCUVV3c1EwRkJXU3hIUVVGb1F6dEJRVU5CTzBGQlEwRXNVMEZCU3l4UlFVRk1MRU5CUVdNc1NVRkJaRHRCUVVORUxFZEJZa1E3UVVGalFUdEJRVU5CTEU5QlFVc3NUVUZCVEN4SFFVRmpMRmxCUVZjN1FVRkRka0lzVTBGQlN5eFBRVUZNTEVOQlFXRXNTMEZCWWp0QlFVTkVMRWRCUmtRN1FVRkhSQ3hEUVhKQ1JEczdRVUYxUWtFc1VVRkJVU3hQUVVGU0xFVkJRV2xDTEUxQlFXcENPenRCUVVWQkxFTkJRVU1zVlVGQlV5eE5RVUZVTEVWQlFXZENPMEZCUTJZc1UwRkJUeXhKUVVGUU8wRkJRMFFzUTBGR1JDeEZRVVZITEVsQlFVa3NUMEZCU2l4RlFVWklPenM3UVVOb1EwRTdPMEZEUVVFN08wRkRRVUU3TzBGRFFVRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTnlRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTJ4RVFUdEJRVU5CT3p0QlEwUkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMGhCTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTBoQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRVRUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTktRVHRCUVVOQk96dEJRMFJCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOTVFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRURUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTNaQ1FUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRka0pCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOTVFUdEJRVU5CTzBGQlEwRTdPMEZEUmtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRM0JDUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFRFRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOS1FUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMUJCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRTa0U3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRemxFUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlExQkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEZWtKQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTA1Qk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEU2tFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTFKQk8wRkJRMEU3UVVGRFFUczdRVU5HUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOSVFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMmhDUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5PUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEVWtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFNFRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRXa0U3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTmlRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTnlSVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTjBRa0U3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEU0VFN1FVRkRRVHM3UVVORVFUdEJRVU5CT3p0QlEwUkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlEzSkZRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOc1FrRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRM3BEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlEyaENRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlEySkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFlrRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlEycENRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTFCQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRVRUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEV2tFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTFKQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRVRUU3UVVGRFFUczdRVU5FUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFpFRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5RUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFRFRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRXa0U3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFZFRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlEycENRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU53UmtFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTlFRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTk9RVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTk9RVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTk9RVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEVEVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFdrRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMHhCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN08wRkRTa0U3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlExaEJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVRzN1FVTlNRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPenRCUTFCQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRFZrRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdRVU5zUTBFN08wRkRRVUU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVNNVVrRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlEycENRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGRGNFSkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk96dEJRMXBCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZEYmtKQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHM3UVVOdVEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUczdPenM3T3pzN096czdPenM3T3p0QlEzWjBRa0VzU1VGQlRTeFZRVUZWTEU5QlFVOHNTVUZCVUN4RFFVRlpMRXRCUVZvc1EwRkJhMElzVDBGQmJFTTdRVUZEUVN4SlFVRk5MRTlCUVU4c1QwRkJUeXhKUVVGUUxFTkJRVmtzUzBGQldpeERRVUZyUWl4SlFVRXZRanRCUVVOQkxFbEJRVTBzVFVGQlRTeFBRVUZQTEVsQlFWQXNRMEZCV1N4TFFVRmFMRU5CUVd0Q0xFZEJRVGxDTzBGQlEwRXNTVUZCVFN4blFrRkJaMElzVDBGQlR5eEpRVUZRTEVOQlFWa3NUVUZCV2l4RFFVRnRRaXhoUVVGNlF6dEJRVU5CTEVsQlFVMHNTVUZCU1N4UFFVRlBMRWxCUVZBc1EwRkJXU3hKUVVGYUxFTkJRV2xDTEU5QlFUTkNPMEZCUTBFc1NVRkJUU3hOUVVGTkxFOUJRVThzUjBGQlVDeERRVUZYTEVkQlFYWkNPMEZCUTBFc1NVRkJUU3h2UWtGQmIwSXNUMEZCVHl4SFFVRlFMRU5CUVZjc2FVSkJRWEpETzBGQlEwRXNTVUZCVFN4blFrRkJaMElzVDBGQlR5eEhRVUZRTEVOQlFWY3NSMEZCV0N4RFFVRmxMRTFCUVdZc1EwRkJjMElzWVVGQk5VTTdPMEZCUlVFc1UwRkJVeXgxUWtGQlZDeEhRVUZ0UXp0QlFVTnFReXhQUVVGTExFbEJRVXc3UVVGRFFTeFBRVUZMTEVsQlFVd3NSMEZCV1N4WlFVRnZRanRCUVVGQk96dEJRVUZCTEZGQlFWZ3NUVUZCVnl4MVJVRkJTaXhGUVVGSk96dEJRVU01UWl4VFFVRkxMRlZCUVV3c1IwRkJhMElzU1VGQlNTeFRRVUYwUWp0QlFVTkJMRk5CUVVzc1RVRkJUQ3hIUVVGakxFMUJRV1E3UVVGRFFTeFRRVUZMTEZkQlFVd3NSMEZCYlVJc1NVRkJTU3haUVVGS0xFTkJRV2xDTEV0QlFXcENMRVZCUVhkQ0xGVkJRWGhDTEVWQlFXNUNPMEZCUTBFc1UwRkJTeXhWUVVGTUxFZEJRV3RDTEVWQlFXeENPMEZCUTBFc1VVRkJUU3gzUWtGQmQwSXNTVUZCU1N4WlFVRktMRU5CUVdsQ0xHTkJRV3BDTEVOQlFUbENPMEZCUTBFc1UwRkJTeXh0UWtGQlRDeEhRVUV5UWl4elFrRkJjMElzVlVGQmRFSXNSVUZCTTBJN1FVRkRRVHRCUVVOQkxGTkJRVXNzVlVGQlRDeERRVUZuUWl4bFFVRm9RaXhIUVVGclF5eExRVUZMTEcxQ1FVRk1MRU5CUVhsQ0xGRkJRWHBDTEVOQlFXdERMSEZDUVVGc1F5eEZRVUY1UkN4WlFVRm5RanRCUVVGQkxGVkJRV1lzVDBGQlpTeDFSVUZCVUN4RlFVRlBPenRCUVVONlJ5eFpRVUZMTEUxQlFVd3NRMEZCV1N4TlFVRmFMRU5CUVcxQ0xFOUJRVzVDTEVOQlFUSkNMRzlDUVVGWk8wRkJRVUVzV1VGRGNFSXNUMEZFYjBJc1IwRkRWQ3hSUVVSVExFTkJRemxDTEZGQlJEaENPenRCUVVWeVF5eFpRVUZKTEVOQlFVTXNVVUZCVVN4UFFVRlNMRU5CUVV3c1JVRkJkVUlzVVVGQlVTeFBRVUZTTEVsQlFXMUNMRVZCUVc1Q08wRkJRM1pDTEZsQlFVMHNaVUZCWlN4UlFVRlJMRTlCUVZJc1EwRkJja0k3UVVGRFFTeHhRa0ZCWVN4SlFVRmlMRU5CUVd0Q08wRkJRMmhDTEdOQlFVa3NaVUZFV1R0QlFVVm9RaXhwUWtGQlR5eEpRVUZKTEZsQlFVb3NRMEZCYVVJc1QwRkJha0lzUTBGR1V6dEJRVWRvUWl4blFrRkJUU3huUkVGSVZUdEJRVWxvUWl4bFFVRkxMR0ZCUVVNc1MwRkJSQ3hGUVVGUkxFOUJRVklzUlVGQmIwSTdRVUZEZGtJc2EwSkJRVXNzYTBKQlFVd3NRMEZCZDBJN1FVRkRkRUlzWjBOQlJITkNPMEZCUlhSQ0xHMUNRVUZMTEZGQlFWRXNWVUZCVWl4RFFVRnRRaXhUUVVGdVFqdEJRVVpwUWl4aFFVRjRRanRCUVVsRU8wRkJWR1VzVTBGQmJFSTdRVUZYUkN4UFFXWkVPMEZCWjBKRUxFdEJha0pwUXl4RFFVRnNRenRCUVd0Q1JDeEhRVEZDUkRzN1FVRTBRa0VzVDBGQlN5eFRRVUZNTEVkQlFXbENMRmxCUVZVN1FVRkRla0lzVjBGQlR5eExRVUZMTEUxQlFWbzdRVUZEUkN4SFFVWkVPenRCUVVsQkxFOUJRVXNzVDBGQlRDeEhRVUZsTEZsQlFWYzdRVUZEZUVJc1YwRkJUeXhMUVVGTExFMUJRVXdzUTBGQldTeEpRVUZ1UWp0QlFVTkVMRWRCUmtRN08wRkJTVUVzVDBGQlN5eHJRa0ZCVEN4SFFVRXdRaXhaUVVFMlFqdEJRVUZCTEcxR1FVRktMRVZCUVVrN1FVRkJRU3hSUVVGdVFpeFJRVUZ0UWl4UlFVRnVRaXhSUVVGdFFqdEJRVUZCTEZGQlFWUXNSMEZCVXl4UlFVRlVMRWRCUVZNN08wRkJRVUVzVVVGRE9VTXNSMEZFT0VNc1IwRkRjRUlzVVVGRWIwSXNRMEZET1VNc1IwRkVPRU03UVVGQlFTeFJRVU12UWl4UFFVUXJRaXhIUVVOd1FpeFJRVVJ2UWl4RFFVTjZReXhSUVVSNVF6czdRVUZGY2tRc1UwRkJTeXhwUWtGQlRDeERRVUYxUWl4RlFVRkRMRkZCUVVRc1JVRkJUU3huUWtGQlRpeEZRVUZsTEZGQlFXWXNSVUZCZGtJc1JVRkRSeXhKUVVSSUxFTkJRMUVzYVVKQlFXZEVPMEZCUVVFc1ZVRkJPVU1zUjBGQk9FTXNVMEZCT1VNc1IwRkJPRU03UVVGQlFTeFZRVUV2UWl4clFrRkJLMElzVTBGQmVrTXNVMEZCZVVNN1FVRkJRU3hWUVVGWUxFdEJRVmNzVTBGQldDeExRVUZYT3p0QlFVTndSQ3hWUVVGSkxFdEJRVW9zUlVGQlZ5eFBRVUZZTEV0QlEwc3NTVUZCU1N4WFFVRktMRU5CUVdkQ08wRkJRMjVDTEZsQlFVa3NWMEZFWlR0QlFVVnVRaXhwUWtGQlV5eHJRa0ZCYTBJc1MwRkJiRUlzUTBGQmQwSTdRVUZETDBJN1FVRkVLMElzVTBGQmVFSXNRMEZHVlR0QlFVdHVRaXhqUVVGTkxFVkJUR0U3UVVGTmJrSXNhMEpCUVZVN1FVRk9VeXhQUVVGb1FqdEJRVkZPTEV0QldFZzdRVUZaUkN4SFFXUkVPenRCUVdkQ1FTeFBRVUZMTEdsQ1FVRk1PMEZCUVVFc2VVWkJRWGxDTzBGQlFVRXNjMFpCUVcxRExFVkJRVzVETzBGQlFVRXNWVUZCWjBJc1IwRkJhRUlzVTBGQlowSXNSMEZCYUVJN1FVRkJRU3hWUVVGeFFpeFBRVUZ5UWl4VFFVRnhRaXhQUVVGeVFqdEJRVUZCTEZWQlFUaENMRWRCUVRsQ0xGTkJRVGhDTEVkQlFUbENPenRCUVVGQk96dEJRVUZCTzBGQlFVRTdRVUZCUVR0QlFVRkJPMEZCUVVFN1FVRkJRVHRCUVVGQkxIRkNRVVZGTEV0QlFVc3NaMEpCUVV3c1EwRkJjMElzUlVGQlF5eFJRVUZFTEVWQlFVMHNaMEpCUVU0c1JVRkJaU3hSUVVGbUxFVkJRWFJDTEVOQlJrWTdPMEZCUVVFN1FVRkZaaXh6UWtGR1pUdEJRVWRtTEd0Q1FVaGxMRWRCUjFJc1UwRkJVeXhOUVVGVUxFbEJRVzFDTEZOQlFWTXNUMEZJY0VJN08wRkJRVUVzYlVKQlNXcENMRWxCU21sQ08wRkJRVUU3UVVGQlFUdEJRVUZCT3p0QlFVdGlMSFZDUVV4aExFZEJTMFE3UVVGRGFFSXNiVUpCUVVjc1EwRkJReXhIUVVGRUxFTkJSR0U3UVVGRmFFSXNiVUpCUVVjc1EwRkJReXhIUVVGRUxFTkJSbUU3UVVGSGFFSXNjMEpCUVU4c1QwRklVenRCUVVsb1FpeHpRa0ZCVFN4RFFVRkRMRTlCU2xNN1FVRkxhRUlzYzBKQlFVOHNUMEZNVXp0QlFVMW9RaXh6UWtGQlRTeERRVUZETzBGQlRsTXNaVUZNUXpzN1FVRmhia0lzYlVKQlFWTXNRMEZCVkN4SFFVRlhMRU5CUVZnc1JVRkJZeXhKUVVGSkxFdEJRVXNzVFVGQmRrSXNSVUZCSzBJc1IwRkJMMElzUlVGQmIwTTdRVUZETlVJc2NVSkJSRFJDTEVkQlEzQkNMRXRCUVVzc1EwRkJUQ3hEUVVSdlFqdEJRVVUxUWl4cFFrRkdORUlzUjBGRmVFSXNUVUZCVFN4RFFVRk9MRU5CUm5kQ08wRkJSelZDTEdsQ1FVZzBRaXhIUVVkNFFpeE5RVUZOTEVOQlFVNHNRMEZJZDBJN08wRkJTV3hETERCQ1FVRlZMRWxCUVZZc1IwRkJhVUlzU1VGQlNTeFZRVUZWTEVsQlFXUXNSMEZCY1VJc1EwRkJja0lzUjBGQmVVSXNWVUZCVlN4SlFVRndSRHRCUVVOQkxEQkNRVUZWTEVsQlFWWXNSMEZCYVVJc1NVRkJTU3hWUVVGVkxFbEJRV1FzUjBGQmNVSXNRMEZCY2tJc1IwRkJlVUlzVlVGQlZTeEpRVUZ3UkR0QlFVTkJMREJDUVVGVkxFbEJRVllzUjBGQmFVSXNTVUZCU1N4VlFVRlZMRWxCUVdRc1IwRkJjVUlzUTBGQmNrSXNSMEZCZVVJc1ZVRkJWU3hKUVVGd1JEdEJRVU5CTERCQ1FVRlZMRWxCUVZZc1IwRkJhVUlzU1VGQlNTeFZRVUZWTEVsQlFXUXNSMEZCY1VJc1EwRkJja0lzUjBGQmVVSXNWVUZCVlN4SlFVRndSRHRCUVVOQkxEQkNRVUZWTEVOQlFWWXNRMEZCV1N4SlFVRmFMRU5CUVdsQ0xFTkJRV3BDTzBGQlEwRXNNRUpCUVZVc1EwRkJWaXhEUVVGWkxFbEJRVm9zUTBGQmFVSXNRMEZCYWtJN1FVRkRSRHRCUVVOTExHdENRWGhDWVN4SFFYZENUaXhKUVhoQ1RUdEJRWGxDWWl4cFFrRjZRbUVzUjBGNVFsQXNTMEZCU3l4WFFVRk1MRU5CUVdsQ0xFMUJRV3BDTEVWQmVrSlBPenRCUVRCQ1ppd3JRa0V4UW1Vc1IwRXdRa3NzTmtKQlFVMHNRMEZCUlN4RFFURkNZanM3UVVGQlFTd3JRMEV5UWxvN1FVRkRUQ3d3UWtGRVN6dEJRVVZNTEc5Q1FVRkpMRVZCUVVVc2QwSkJRVVlzUTBGR1F6dEJRVWRNTERKQ1FVRlhMR05CUVdNc1MwRkJaQ3hEUVVGdlFqdEJRVU0zUWl4M1FrRkJUU3hYUVVSMVFqdEJRVVUzUWl4NVFrRkJUenRCUVVOTUxESkNRVVJMTEhGQ1FVTkxPMEZCUTFJc01rSkJRVXNzVTBGQlRDeERRVUZsTzBGQlEySXNhME5CUkdFc2QwSkJRMEU3UVVGRFdEdEJRVU5FTEhsQ1FVaFpPenRCUVVsaUxDdENRVUZQTzBGQlEwd3NaME5CUVUwc1JVRkJSU3gzUWtGQlJpeERRVVJFTzBGQlJVd3NiME5CUVZVN1FVRkdUQ3g1UWtGS1RUdEJRVkZpTEdsRFFVRlRPMEZCUTFBc0swSkJRVXNzUlVGRVJUdEJRVVZRTEd0RFFVRlJMRVZCUmtRN1FVRkhVQ3hwUTBGQlR6dEJRVWhCTEhsQ1FWSkpPMEZCWVdJc09FSkJRVTA3UVVGRFNpeHRRMEZCVXl4SlFVUk1PMEZCUlVvc2JVTkJRVk03UVVGR1RDeDVRa0ZpVHp0QlFXbENZaXc0UWtGQlRUdEJRVU5LTEhGRFFVRlhPMEZCUTFRc2NVTkJRVk1zUzBGRVFUdEJRVVZVTEhWRFFVRlhPMEZCUmtZc01rSkJSRkE3UVVGTFNpdzJRa0ZCUnl4SFFVeERPMEZCVFVvc05rSkJRVWNzUjBGT1F6dEJRVTlLTEdsRFFVRlBPMEZCUTB3c0swSkJRVWM3UVVGRVJTd3lRa0ZRU0R0QlFWVktMR3REUVVGUk8wRkJRMDRzSzBKQlFVY3NTMEZCU3l4VlFVUkdPMEZCUlU0c0swSkJRVWNzUzBGQlN6dEJRVVpHTERKQ1FWWktPMEZCWTBvc2JVTkJRVk1zUTBGRFVDeFZRVUZWTEVOQlJFZ3NSVUZGVUN4VlFVRlZMRU5CUmtnc1EwRmtURHRCUVd0Q1NpeHZRMEZzUWtrc2MwSkJhMEpQTEVkQmJFSlFMRVZCYTBKWk8wRkJRMlE3UVVGRFJDd3lRa0Z3UWtjN1FVRnhRa29zYVVOQmNrSkpMREJDUVhGQ1lUdEJRVUZCTEdkRFFVRlNMRXRCUVZFc1UwRkJVaXhMUVVGUk96dEJRVUZCTERKRlFVTkJMRXRCUVVzc1MwRkJUQ3hEUVVSQk8wRkJRVUVzWjBOQlExSXNRMEZFVVR0QlFVRkJMR2REUVVOTUxFTkJSRXM3TzBGQlJXWXNaME5CUVVrc1QwRkJTaXhIUVVGakxGTkJRV1FzUTBGQmQwSXNRMEZCUXl4RFFVRkVMRVZCUVVjc1EwRkJTQ3hEUVVGNFFqdEJRVU5FTzBGQmVFSkhMSGxDUVdwQ1R6dEJRVEpEWWl4blEwRkJVVHRCUVVOT0xHZERRVUZOTzBGQlJFRXNlVUpCTTBOTE8wRkJPRU5pTEdsRFFVRlJPMEZCUTA0c2EwTkJRVkU3UVVGRFRpeHBRMEZFVFN4cFFrRkRRU3hEUVVSQkxFVkJRMGM3UVVGRFVDeHhRMEZCVlN4RlFVRkZMR2REUVVGR0xFTkJRVllzVlVGQmEwUXNTMEZCU3l4RFFVRk1MRVZCUVZFc1EwRkJVaXhEUVVGc1JEdEJRVU5FTzBGQlNFc3NNa0pCUkVZN1FVRk5UaXh2UTBGQlZTeHJRa0ZCVlN4TFFVRldMRVZCUVdsQ0xFdEJRV3BDTEVWQlFYZENPMEZCUTJoRExHZERRVUZOTEZGQlFWRXNUVUZCVFN4RFFVRk9MRVZCUVZNc1MwRkJka0k3TzBGQlJHZERMRFJGUVVWV0xFdEJRVXNzUzBGQlRDeERRVVpWTzBGQlFVRXNaME5CUlhwQ0xFTkJSbmxDTzBGQlFVRXNaME5CUlhSQ0xFTkJSbk5DTzBGQlFVRXNaME5CUlc1Q0xFdEJSbTFDT3p0QlFVZG9ReXhuUTBGQlRTeGhRVUZoTEVsQlFVa3NSMEZCUnl4SlFVRklMRU5CUVZFc1MwRkJXaXhEUVVOcVFpeERRVUZETEVOQlFVUXNSVUZCU1N4RFFVRktMRU5CUkdsQ0xFTkJRVzVDTzBGQlIwRXNhVU5CUVVzc1YwRkJUQ3hEUVVGcFFpeHBRa0ZCYWtJc1EwRkJiVU1zVlVGQmJrTXNSVUZCSzBNN1FVRkROME1zYjBOQlFVMHNTMEZFZFVNN1FVRkZOME1zYjBOQlFVMHNZMEZCVXl4UlFVRlVMRVZCUVcxQ08wRkJRM1pDTEc5RVFVRnZRaXhSUVVGd1FqdEJRVU5FTEN0Q1FVbzBRenRCUVVzM1F5eHhRMEZCVHl4SlFVRkpMRWRCUVVjc1MwRkJTQ3hEUVVGVExFdEJRV0lzUTBGQmJVSTdRVUZEZUVJc2RVTkJRVThzU1VGQlNTeEhRVUZITEV0QlFVZ3NRMEZCVXl4WlFVRmlMRU5CUVRCQ08wRkJReTlDTEhkRFFVRk5MRWxCUVVrc1IwRkJSeXhMUVVGSUxFTkJRVk1zU1VGQllpeERRVUZyUWl4RlFVRkRMRTlCUVU4c1QwRkJVaXhGUVVGc1FpeERRVVI1UWp0QlFVVXZRaXd3UTBGQlVTeEpRVUZKTEVkQlFVY3NTMEZCU0N4RFFVRlRMRTFCUVdJc1EwRkJiMElzUlVGQlF5eFBRVUZQTEV0QlFVc3NWVUZCWWl4RlFVRjVRaXhQUVVGUExFTkJRV2hETEVWQlFYQkNMRU5CUm5WQ08wRkJSeTlDTERCRFFVRlJMRU5CU0hWQ08wRkJTUzlDTERCRFFVRlJMRVZCU25WQ08wRkJTeTlDTEhsRFFVRlBPMEZCVEhkQ0xHbERRVUV4UWp0QlFVUnBRaXdyUWtGQmJrSTdRVUZNYzBNc05rSkJRUzlETzBGQlpVRXNkVTVCUXpKRExFMUJRVTBzVDBGQlRpeERRVUZqTEVOQlFXUXNRMEZFTTBNN1FVRkZSRHRCUVRkQ1N5eDVRa0U1UTBzN1FVRTJSV0lzT0VKQlFVMDdRVUZEU2l3MlFrRkJSenRCUVVORUxHbERRVUZMTEZWQlFWVXNTVUZCVml4SFFVRnBRaXhEUVVSeVFqdEJRVVZFTEdsRFFVRkxMRlZCUVZVc1NVRkJWaXhIUVVGcFFpeERRVVp5UWp0QlFVZEVMRzFEUVVGUE8wRkJRMHdzYjBOQlFVMHNSVUZCUlN3eVFrRkJSaXhEUVVSRU8wRkJSVXdzZDBOQlFWVTdRVUZHVEN3MlFrRklUanRCUVU5RUxHdERRVUZOTzBGQlEwb3NiVU5CUVVzc1MwRkVSRHRCUVVWS0xIRkRRVUZQTEVOQlJrZzdRVUZIU2l4elEwRkJVU3huUWtGQlZTeExRVUZXTEVWQlFXbENPMEZCUTNaQ0xIVkRRVUZQTEUxQlFVMHNUMEZCVGl4RFFVRmpMRU5CUVdRc1EwRkJVRHRCUVVORU8wRkJURWM3UVVGUVRDd3lRa0ZFUXp0QlFXZENTaXcyUWtGQlJ6dEJRVU5FTEdsRFFVRkxMRlZCUVZVc1NVRkJWaXhIUVVGcFFpeERRVVJ5UWp0QlFVVkVMR2xEUVVGTExGVkJRVlVzU1VGQlZpeEhRVUZwUWl4RFFVWnlRanRCUVVkRUxHMURRVUZQTzBGQlEwd3NiME5CUVUwc1JVRkJSU3d5UWtGQlJpeERRVVJFTzBGQlJVd3NkME5CUVZVN1FVRkdUQ3cyUWtGSVRqdEJRVTlFTEd0RFFVRk5PMEZCUTBvc2NVTkJRVThzUTBGRVNEdEJRVVZLTEhORFFVRlJMR2RDUVVGVkxFdEJRVllzUlVGQmFVSTdRVUZEZGtJc2RVTkJRVThzVFVGQlRTeFBRVUZPTEVOQlFXTXNRMEZCWkN4RFFVRlFPMEZCUTBRN1FVRktSenRCUVZCTU8wRkJhRUpETzBGQk4wVlBMSFZDUVVGbU8wRkJOa2RFTzBGQkwwZEpPMEZCUm5OQ0xHbENRVUZ3UWp0QlFVaE9MR1ZCTTBKWk96dEJRVUZCTzBGQlFVRTdRVUZCUVRzN1FVRkJRVHRCUVVGQk8wRkJRVUU3UVVGQlFTd3JRMEZ4U21RN1FVRkRUQ3gxUWtGQlR6dEJRVVJHTEdWQmNrcGpPenRCUVVGQk8wRkJRVUU3UVVGQlFUdEJRVUZCTzBGQlFVRTdRVUZCUVR0QlFVRkJMRXRCUVhwQ096dEJRVUZCTzBGQlFVRTdRVUZCUVR0QlFVRkJPenRCUVRKS1FTeFBRVUZMTEdkQ1FVRk1PMEZCUVVFc2VVWkJRWGRDTzBGQlFVRXNjMFpCUVcxRExFVkJRVzVETzBGQlFVRXNWVUZCWjBJc1IwRkJhRUlzVTBGQlowSXNSMEZCYUVJN1FVRkJRU3hWUVVGeFFpeFBRVUZ5UWl4VFFVRnhRaXhQUVVGeVFqdEJRVUZCTEZWQlFUaENMRWRCUVRsQ0xGTkJRVGhDTEVkQlFUbENPenRCUVVGQk8wRkJRVUU3UVVGQlFUdEJRVUZCTzBGQlFVRTdRVUZEYUVJc2FVSkJSR2RDTEZGQlExQXNSMEZFVHl4SFFVTkVMRTlCUkVNc1UwRkRWU3hIUVVSV08wRkJSV2hDTEd0Q1FVWm5RaXhIUVVWVU8wRkJRMWdzZDBKQlFWRTdRVUZFUnl4bFFVWlRPMEZCUVVFN1FVRkJRVHRCUVVGQkxIRkNRVTFITEVsQlFVa3NSMEZCU2l4RFFVRlJPMEZCUXpkQ08wRkJSRFpDTEdWQlFWSXNRMEZPU0RzN1FVRkJRVHRCUVUxa0xITkNRVTVqT3p0QlFWTndRaXh0UWtGQlN5eFBRVUZNTEVkQlFXVXNVMEZCVXl4UFFVRjRRanRCUVVOQkxHMUNRVUZMTEUxQlFVd3NSMEZCWXl4SlFVRmtPMEZCVm05Q08wRkJRVUU3TzBGQlFVRTdRVUZCUVR0QlFVRkJPenRCUVVGQk8wRkJRVUVzWjBSQldXWXNTVUZhWlRzN1FVRkJRVHRCUVVGQk8wRkJRVUU3UVVGQlFUdEJRVUZCTzBGQlFVRTdRVUZCUVN4TFFVRjRRanM3UVVGQlFUdEJRVUZCTzBGQlFVRTdRVUZCUVRzN1FVRmxRU3hQUVVGTExFdEJRVXdzUjBGQllTeFpRVUZYTzBGQlEzUkNMRk5CUVVzc2JVSkJRVXdzUTBGQmVVSXNSVUZCZWtJc1EwRkJORUlzYVVKQlFUVkNMRVZCUVN0RExFdEJRVXNzVlVGQlRDeERRVUZuUWl4bFFVRXZSRHRCUVVORUxFZEJSa1E3UVVGSFJEczdRVUZIUkN4UlFVRlJMSFZDUVVGU0xFVkJRV2xETEdGQlFXcERPenRCUVVWQkxFOUJRVThzVDBGQlVDeEhRVUZwUWl4SlFVRkpMSFZDUVVGS0xFVkJRV3BDSWl3aVptbHNaU0k2SW1kbGJtVnlZWFJsWkM1cWN5SXNJbk52ZFhKalpWSnZiM1FpT2lJaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW9ablZ1WTNScGIyNG9LWHRtZFc1amRHbHZiaUJ5S0dVc2JpeDBLWHRtZFc1amRHbHZiaUJ2S0drc1ppbDdhV1lvSVc1YmFWMHBlMmxtS0NGbFcybGRLWHQyWVhJZ1l6MWNJbVoxYm1OMGFXOXVYQ0k5UFhSNWNHVnZaaUJ5WlhGMWFYSmxKaVp5WlhGMWFYSmxPMmxtS0NGbUppWmpLWEpsZEhWeWJpQmpLR2tzSVRBcE8ybG1LSFVwY21WMGRYSnVJSFVvYVN3aE1DazdkbUZ5SUdFOWJtVjNJRVZ5Y205eUtGd2lRMkZ1Ym05MElHWnBibVFnYlc5a2RXeGxJQ2RjSWl0cEsxd2lKMXdpS1R0MGFISnZkeUJoTG1OdlpHVTlYQ0pOVDBSVlRFVmZUazlVWDBaUFZVNUVYQ0lzWVgxMllYSWdjRDF1VzJsZFBYdGxlSEJ2Y25Sek9udDlmVHRsVzJsZFd6QmRMbU5oYkd3b2NDNWxlSEJ2Y25SekxHWjFibU4wYVc5dUtISXBlM1poY2lCdVBXVmJhVjFiTVYxYmNsMDdjbVYwZFhKdUlHOG9ibng4Y2lsOUxIQXNjQzVsZUhCdmNuUnpMSElzWlN4dUxIUXBmWEpsZEhWeWJpQnVXMmxkTG1WNGNHOXlkSE45Wm05eUtIWmhjaUIxUFZ3aVpuVnVZM1JwYjI1Y0lqMDlkSGx3Wlc5bUlISmxjWFZwY21VbUpuSmxjWFZwY21Vc2FUMHdPMms4ZEM1c1pXNW5kR2c3YVNzcktXOG9kRnRwWFNrN2NtVjBkWEp1SUc5OWNtVjBkWEp1SUhKOUtTZ3BJaXdpWlhod2IzSjBJR1JsWm1GMWJIUWdlMXh1SUNCcGREb2dlMXh1SUNBZ0lIRjFaWEo1T2lCN1hHNGdJQ0FnSUNCaFkzUnBiMjV6T2lCN1hHNGdJQ0FnSUNBZ0lITm9iM2RsYkdWMllYUnBiMjQ2SUZ3aVZtbHpkV0ZzYVhwNllTQmxiR1YyWVhwcGIyNWxYQ0lzWEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmU3hjYmlBZ0lDQmphR0Z5ZERvZ2UxeHVJQ0FnSUNBZ2RHbDBiR1U2SUNkRmJHVjJZWHBwYjI1bEp5eGNiaUFnSUNBZ0lIUnZiMngwYVhBNklIdGNiaUFnSUNBZ0lDQWdkR2wwYkdVNklDZEVhWE4wWVc1NllTZGNiaUFnSUNBZ0lIMHNYRzRnSUNBZ0lDQnNZV0psYkhNNklIdGNiaUFnSUNBZ0lDQWdlRG9nSjBScGMzUmhibnBoSUNodEtTY3NYRzRnSUNBZ0lDQWdJSGs2SjBGc2RHVjZlbUVnS0cwcEoxeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JpQWdmU3hjYmlBZ1pXNDZJSHRjYmlBZ0lDQnhkV1Z5ZVRvZ2UxeHVJQ0FnSUNBZ1lXTjBhVzl1Y3pvZ2UxeHVJQ0FnSUNBZ0lDQnphRzkzWld4bGRtRjBhVzl1T2lCY0lsTm9iM2NnWld4bGRtRjBhVzl1WENJc1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlN4Y2JpQWdJQ0JqYUdGeWREb2dlMXh1SUNBZ0lDQWdkR2wwYkdVNklGd2lSV3hsZG1GMGFXOXVYQ0lzWEc0Z0lDQWdJQ0IwYjI5c2RHbHdPaUI3WEc0Z0lDQWdJQ0FnSUhScGRHeGxPaUJjSWtScGMzUmhibU5sWENKY2JpQWdJQ0FnSUgwc1hHNGdJQ0FnSUNCc1lXSmxiSE02SUh0Y2JpQWdJQ0FnSUNBZ2VEb2dKMFJwYzNSaGJtTmxJQ2h0S1Njc1hHNGdJQ0FnSUNBZ0lIazZKMGhsYVdkb2RDQW9iU2tuWEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmVnh1SUNCOVhHNTlYRzRpTENKcGJYQnZjblFnYVRFNGJpQm1jbTl0SUNjdUwya3hPRzRuWEc1bGVIQnZjblFnWkdWbVlYVnNkQ0I3WEc0Z0lHa3hPRzVjYm4xY2JpSXNJbWx0Y0c5eWRDQndiSFZuYVc1RGIyNW1hV2NnWm5KdmJTQW5MaTlqYjI1bWFXY25PMXh1WTI5dWMzUWdhVzVvWlhKcGRDQTlJR2N6ZDNOa2F5NWpiM0psTG5WMGFXeHpMbWx1YUdWeWFYUTdYRzVqYjI1emRDQmlZWE5sSUQwZ1p6TjNjMlJyTG1OdmNtVXVkWFJwYkhNdVltRnpaVHRjYm1OdmJuTjBJRkJzZFdkcGJpQTlJR2N6ZDNOa2F5NWpiM0psTG5Cc2RXZHBiaTVRYkhWbmFXNDdYRzVqYjI1emRDQlRaWEoyYVdObElEMGdjbVZ4ZFdseVpTZ25MaTl3YkhWbmFXNXpaWEoyYVdObEp5azdYRzVqYjI1emRDQmhaR1JKTVRodVVHeDFaMmx1SUQwZ1p6TjNjMlJyTG1OdmNtVXVhVEU0Ymk1aFpHUkpNVGh1VUd4MVoybHVPMXh1WEc1amIyNXpkQ0JmVUd4MVoybHVJRDBnWm5WdVkzUnBiMjRvS1NCN1hHNGdJR0poYzJVb2RHaHBjeWs3WEc0Z0lIUm9hWE11Ym1GdFpTQTlJQ2RsYkdWd2NtOW1hV3hsSnp0Y2JpQWdkR2hwY3k1cGJtbDBJRDBnWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnTHk4Z1lXUmtJR2t4T0c0Z2IyWWdkR2hsSUhCc2RXZHBibHh1SUNBZ0lHRmtaRWt4T0c1UWJIVm5hVzRvZTF4dUlDQWdJQ0FnYm1GdFpUb2dkR2hwY3k1dVlXMWxMRnh1SUNBZ0lDQWdZMjl1Wm1sbk9pQndiSFZuYVc1RGIyNW1hV2N1YVRFNGJseHVJQ0FnSUgwcE8xeHVJQ0FnSUM4dklITmxkQ0JqWVhSaGJHOW5JR2x1YVhScFlXd2dkR0ZpWEc0Z0lDQWdkR2hwY3k1amIyNW1hV2NnUFNCMGFHbHpMbWRsZEVOdmJtWnBaeWdwTzF4dUlDQWdJSFJvYVhNdWMyVjBVMlZ5ZG1salpTaFRaWEoyYVdObEtUdGNiaUFnSUNCMGFHbHpMbk5sY25acFkyVXVhVzVwZENoMGFHbHpMbU52Ym1acFp5azdYRzRnSUNBZ2RHaHBjeTV5WldkcGMzUmxjbEJzZFdkcGJpaDBhR2x6TG1OdmJtWnBaeTVuYVdRcE8xeHVJQ0FnSUM4dklHTnlaV0YwWlNCQlVFbGNiaUFnSUNCMGFHbHpMbk5sZEZKbFlXUjVLSFJ5ZFdVcE8xeHVJQ0I5TzF4dUlDQXZMMk5oYkd4bFpDQjNhR1Z1SUhCc2RXZHBiaUJwY3lCeVpXMXZkbVZrWEc0Z0lIUm9hWE11ZFc1c2IyRmtJRDBnWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnZEdocGN5NXpaWEoyYVdObExtTnNaV0Z5S0NrN1hHNGdJSDA3WEc1OU8xeHVYRzVwYm1obGNtbDBLRjlRYkhWbmFXNHNJRkJzZFdkcGJpazdYRzVjYmlobWRXNWpkR2x2Ymlod2JIVm5hVzRwZTF4dUlDQndiSFZuYVc0dWFXNXBkQ2dwTzF4dWZTa29ibVYzSUY5UWJIVm5hVzRwTzF4dVhHNWNibHh1SWl3aWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCN0lGd2laR1ZtWVhWc2RGd2lPaUJ5WlhGMWFYSmxLRndpWTI5eVpTMXFjeTlzYVdKeVlYSjVMMlp1TDJkbGRDMXBkR1Z5WVhSdmNsd2lLU3dnWDE5bGMwMXZaSFZzWlRvZ2RISjFaU0I5T3lJc0ltMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2V5QmNJbVJsWm1GMWJIUmNJam9nY21WeGRXbHlaU2hjSW1OdmNtVXRhbk12YkdsaWNtRnllUzltYmk5cGN5MXBkR1Z5WVdKc1pWd2lLU3dnWDE5bGMwMXZaSFZzWlRvZ2RISjFaU0I5T3lJc0ltMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2V5QmNJbVJsWm1GMWJIUmNJam9nY21WeGRXbHlaU2hjSW1OdmNtVXRhbk12YkdsaWNtRnllUzltYmk5d2NtOXRhWE5sWENJcExDQmZYMlZ6VFc5a2RXeGxPaUIwY25WbElIMDdJaXdpWENKMWMyVWdjM1J5YVdOMFhDSTdYRzVjYm1WNGNHOXlkSE11WDE5bGMwMXZaSFZzWlNBOUlIUnlkV1U3WEc1Y2JuWmhjaUJmY0hKdmJXbHpaU0E5SUhKbGNYVnBjbVVvWENJdUxpOWpiM0psTFdwekwzQnliMjFwYzJWY0lpazdYRzVjYm5aaGNpQmZjSEp2YldselpUSWdQU0JmYVc1MFpYSnZjRkpsY1hWcGNtVkVaV1poZFd4MEtGOXdjbTl0YVhObEtUdGNibHh1Wm5WdVkzUnBiMjRnWDJsdWRHVnliM0JTWlhGMWFYSmxSR1ZtWVhWc2RDaHZZbW9wSUhzZ2NtVjBkWEp1SUc5aWFpQW1KaUJ2WW1vdVgxOWxjMDF2WkhWc1pTQS9JRzlpYWlBNklIc2daR1ZtWVhWc2REb2diMkpxSUgwN0lIMWNibHh1Wlhod2IzSjBjeTVrWldaaGRXeDBJRDBnWm5WdVkzUnBiMjRnS0dadUtTQjdYRzRnSUhKbGRIVnliaUJtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnZG1GeUlHZGxiaUE5SUdadUxtRndjR3g1S0hSb2FYTXNJR0Z5WjNWdFpXNTBjeWs3WEc0Z0lDQWdjbVYwZFhKdUlHNWxkeUJmY0hKdmJXbHpaVEl1WkdWbVlYVnNkQ2htZFc1amRHbHZiaUFvY21WemIyeDJaU3dnY21WcVpXTjBLU0I3WEc0Z0lDQWdJQ0JtZFc1amRHbHZiaUJ6ZEdWd0tHdGxlU3dnWVhKbktTQjdYRzRnSUNBZ0lDQWdJSFJ5ZVNCN1hHNGdJQ0FnSUNBZ0lDQWdkbUZ5SUdsdVptOGdQU0JuWlc1YmEyVjVYU2hoY21jcE8xeHVJQ0FnSUNBZ0lDQWdJSFpoY2lCMllXeDFaU0E5SUdsdVptOHVkbUZzZFdVN1hHNGdJQ0FnSUNBZ0lIMGdZMkYwWTJnZ0tHVnljbTl5S1NCN1hHNGdJQ0FnSUNBZ0lDQWdjbVZxWldOMEtHVnljbTl5S1R0Y2JpQWdJQ0FnSUNBZ0lDQnlaWFIxY200N1hHNGdJQ0FnSUNBZ0lIMWNibHh1SUNBZ0lDQWdJQ0JwWmlBb2FXNW1ieTVrYjI1bEtTQjdYRzRnSUNBZ0lDQWdJQ0FnY21WemIyeDJaU2gyWVd4MVpTazdYRzRnSUNBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJRjl3Y205dGFYTmxNaTVrWldaaGRXeDBMbkpsYzI5c2RtVW9kbUZzZFdVcExuUm9aVzRvWm5WdVkzUnBiMjRnS0haaGJIVmxLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnpkR1Z3S0Z3aWJtVjRkRndpTENCMllXeDFaU2s3WEc0Z0lDQWdJQ0FnSUNBZ2ZTd2dablZ1WTNScGIyNGdLR1Z5Y2lrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnYzNSbGNDaGNJblJvY205M1hDSXNJR1Z5Y2lrN1hHNGdJQ0FnSUNBZ0lDQWdmU2s3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2NtVjBkWEp1SUhOMFpYQW9YQ0p1WlhoMFhDSXBPMXh1SUNBZ0lIMHBPMXh1SUNCOU8xeHVmVHNpTENKY0luVnpaU0J6ZEhKcFkzUmNJanRjYmx4dVpYaHdiM0owY3k1ZlgyVnpUVzlrZFd4bElEMGdkSEoxWlR0Y2JseHVkbUZ5SUY5cGMwbDBaWEpoWW14bE1pQTlJSEpsY1hWcGNtVW9YQ0l1TGk5amIzSmxMV3B6TDJsekxXbDBaWEpoWW14bFhDSXBPMXh1WEc1MllYSWdYMmx6U1hSbGNtRmliR1V6SUQwZ1gybHVkR1Z5YjNCU1pYRjFhWEpsUkdWbVlYVnNkQ2hmYVhOSmRHVnlZV0pzWlRJcE8xeHVYRzUyWVhJZ1gyZGxkRWwwWlhKaGRHOXlNaUE5SUhKbGNYVnBjbVVvWENJdUxpOWpiM0psTFdwekwyZGxkQzFwZEdWeVlYUnZjbHdpS1R0Y2JseHVkbUZ5SUY5blpYUkpkR1Z5WVhSdmNqTWdQU0JmYVc1MFpYSnZjRkpsY1hWcGNtVkVaV1poZFd4MEtGOW5aWFJKZEdWeVlYUnZjaklwTzF4dVhHNW1kVzVqZEdsdmJpQmZhVzUwWlhKdmNGSmxjWFZwY21WRVpXWmhkV3gwS0c5aWFpa2dleUJ5WlhSMWNtNGdiMkpxSUNZbUlHOWlhaTVmWDJWelRXOWtkV3hsSUQ4Z2IySnFJRG9nZXlCa1pXWmhkV3gwT2lCdlltb2dmVHNnZlZ4dVhHNWxlSEJ2Y25SekxtUmxabUYxYkhRZ1BTQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lHWjFibU4wYVc5dUlITnNhV05sU1hSbGNtRjBiM0lvWVhKeUxDQnBLU0I3WEc0Z0lDQWdkbUZ5SUY5aGNuSWdQU0JiWFR0Y2JpQWdJQ0IyWVhJZ1gyNGdQU0IwY25WbE8xeHVJQ0FnSUhaaGNpQmZaQ0E5SUdaaGJITmxPMXh1SUNBZ0lIWmhjaUJmWlNBOUlIVnVaR1ZtYVc1bFpEdGNibHh1SUNBZ0lIUnllU0I3WEc0Z0lDQWdJQ0JtYjNJZ0tIWmhjaUJmYVNBOUlDZ3dMQ0JmWjJWMFNYUmxjbUYwYjNJekxtUmxabUYxYkhRcEtHRnljaWtzSUY5ek95QWhLRjl1SUQwZ0tGOXpJRDBnWDJrdWJtVjRkQ2dwS1M1a2IyNWxLVHNnWDI0Z1BTQjBjblZsS1NCN1hHNGdJQ0FnSUNBZ0lGOWhjbkl1Y0hWemFDaGZjeTUyWVd4MVpTazdYRzVjYmlBZ0lDQWdJQ0FnYVdZZ0tHa2dKaVlnWDJGeWNpNXNaVzVuZEdnZ1BUMDlJR2twSUdKeVpXRnJPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMGdZMkYwWTJnZ0tHVnljaWtnZTF4dUlDQWdJQ0FnWDJRZ1BTQjBjblZsTzF4dUlDQWdJQ0FnWDJVZ1BTQmxjbkk3WEc0Z0lDQWdmU0JtYVc1aGJHeDVJSHRjYmlBZ0lDQWdJSFJ5ZVNCN1hHNGdJQ0FnSUNBZ0lHbG1JQ2doWDI0Z0ppWWdYMmxiWENKeVpYUjFjbTVjSWwwcElGOXBXMXdpY21WMGRYSnVYQ0pkS0NrN1hHNGdJQ0FnSUNCOUlHWnBibUZzYkhrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvWDJRcElIUm9jbTkzSUY5bE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JseHVJQ0FnSUhKbGRIVnliaUJmWVhKeU8xeHVJQ0I5WEc1Y2JpQWdjbVYwZFhKdUlHWjFibU4wYVc5dUlDaGhjbklzSUdrcElIdGNiaUFnSUNCcFppQW9RWEp5WVhrdWFYTkJjbkpoZVNoaGNuSXBLU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdZWEp5TzF4dUlDQWdJSDBnWld4elpTQnBaaUFvS0RBc0lGOXBjMGwwWlhKaFlteGxNeTVrWldaaGRXeDBLU2hQWW1wbFkzUW9ZWEp5S1NrcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCemJHbGpaVWwwWlhKaGRHOXlLR0Z5Y2l3Z2FTazdYRzRnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUhSb2NtOTNJRzVsZHlCVWVYQmxSWEp5YjNJb1hDSkpiblpoYkdsa0lHRjBkR1Z0Y0hRZ2RHOGdaR1Z6ZEhKMVkzUjFjbVVnYm05dUxXbDBaWEpoWW14bElHbHVjM1JoYm1ObFhDSXBPMXh1SUNBZ0lIMWNiaUFnZlR0Y2JuMG9LVHNpTENKdGIyUjFiR1V1Wlhod2IzSjBjeUE5SUhKbGNYVnBjbVVvWENKeVpXZGxibVZ5WVhSdmNpMXlkVzUwYVcxbFhDSXBPMXh1SWl3aWNtVnhkV2x5WlNnbkxpNHZiVzlrZFd4bGN5OTNaV0l1Wkc5dExtbDBaWEpoWW14bEp5azdYRzV5WlhGMWFYSmxLQ2N1TGk5dGIyUjFiR1Z6TDJWek5pNXpkSEpwYm1jdWFYUmxjbUYwYjNJbktUdGNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdjbVZ4ZFdseVpTZ25MaTR2Ylc5a2RXeGxjeTlqYjNKbExtZGxkQzFwZEdWeVlYUnZjaWNwTzF4dUlpd2ljbVZ4ZFdseVpTZ25MaTR2Ylc5a2RXeGxjeTkzWldJdVpHOXRMbWwwWlhKaFlteGxKeWs3WEc1eVpYRjFhWEpsS0NjdUxpOXRiMlIxYkdWekwyVnpOaTV6ZEhKcGJtY3VhWFJsY21GMGIzSW5LVHRjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnY21WeGRXbHlaU2duTGk0dmJXOWtkV3hsY3k5amIzSmxMbWx6TFdsMFpYSmhZbXhsSnlrN1hHNGlMQ0p5WlhGMWFYSmxLQ2N1TGk5dGIyUjFiR1Z6TDJWek5pNXZZbXBsWTNRdWRHOHRjM1J5YVc1bkp5azdYRzV5WlhGMWFYSmxLQ2N1TGk5dGIyUjFiR1Z6TDJWek5pNXpkSEpwYm1jdWFYUmxjbUYwYjNJbktUdGNibkpsY1hWcGNtVW9KeTR1TDIxdlpIVnNaWE12ZDJWaUxtUnZiUzVwZEdWeVlXSnNaU2NwTzF4dWNtVnhkV2x5WlNnbkxpNHZiVzlrZFd4bGN5OWxjell1Y0hKdmJXbHpaU2NwTzF4dWNtVnhkV2x5WlNnbkxpNHZiVzlrZFd4bGN5OWxjemN1Y0hKdmJXbHpaUzVtYVc1aGJHeDVKeWs3WEc1eVpYRjFhWEpsS0NjdUxpOXRiMlIxYkdWekwyVnpOeTV3Y205dGFYTmxMblJ5ZVNjcE8xeHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQnlaWEYxYVhKbEtDY3VMaTl0YjJSMWJHVnpMMTlqYjNKbEp5a3VVSEp2YldselpUdGNiaUlzSW0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnS0dsMEtTQjdYRzRnSUdsbUlDaDBlWEJsYjJZZ2FYUWdJVDBnSjJaMWJtTjBhVzl1SnlrZ2RHaHliM2NnVkhsd1pVVnljbTl5S0dsMElDc2dKeUJwY3lCdWIzUWdZU0JtZFc1amRHbHZiaUVuS1R0Y2JpQWdjbVYwZFhKdUlHbDBPMXh1ZlR0Y2JpSXNJbTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdLQ2tnZXlBdktpQmxiWEIwZVNBcUx5QjlPMXh1SWl3aWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb2FYUXNJRU52Ym5OMGNuVmpkRzl5TENCdVlXMWxMQ0JtYjNKaWFXUmtaVzVHYVdWc1pDa2dlMXh1SUNCcFppQW9JU2hwZENCcGJuTjBZVzVqWlc5bUlFTnZibk4wY25WamRHOXlLU0I4ZkNBb1ptOXlZbWxrWkdWdVJtbGxiR1FnSVQwOUlIVnVaR1ZtYVc1bFpDQW1KaUJtYjNKaWFXUmtaVzVHYVdWc1pDQnBiaUJwZENrcElIdGNiaUFnSUNCMGFISnZkeUJVZVhCbFJYSnliM0lvYm1GdFpTQXJJQ2M2SUdsdVkyOXljbVZqZENCcGJuWnZZMkYwYVc5dUlTY3BPMXh1SUNCOUlISmxkSFZ5YmlCcGREdGNibjA3WEc0aUxDSjJZWElnYVhOUFltcGxZM1FnUFNCeVpYRjFhWEpsS0NjdUwxOXBjeTF2WW1wbFkzUW5LVHRjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnS0dsMEtTQjdYRzRnSUdsbUlDZ2hhWE5QWW1wbFkzUW9hWFFwS1NCMGFISnZkeUJVZVhCbFJYSnliM0lvYVhRZ0t5QW5JR2x6SUc1dmRDQmhiaUJ2WW1wbFkzUWhKeWs3WEc0Z0lISmxkSFZ5YmlCcGREdGNibjA3WEc0aUxDSXZMeUJtWVd4elpTQXRQaUJCY25KaGVTTnBibVJsZUU5bVhHNHZMeUIwY25WbElDQXRQaUJCY25KaGVTTnBibU5zZFdSbGMxeHVkbUZ5SUhSdlNVOWlhbVZqZENBOUlISmxjWFZwY21Vb0p5NHZYM1J2TFdsdlltcGxZM1FuS1R0Y2JuWmhjaUIwYjB4bGJtZDBhQ0E5SUhKbGNYVnBjbVVvSnk0dlgzUnZMV3hsYm1kMGFDY3BPMXh1ZG1GeUlIUnZRV0p6YjJ4MWRHVkpibVJsZUNBOUlISmxjWFZwY21Vb0p5NHZYM1J2TFdGaWMyOXNkWFJsTFdsdVpHVjRKeWs3WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUNoSlUxOUpUa05NVlVSRlV5a2dlMXh1SUNCeVpYUjFjbTRnWm5WdVkzUnBiMjRnS0NSMGFHbHpMQ0JsYkN3Z1puSnZiVWx1WkdWNEtTQjdYRzRnSUNBZ2RtRnlJRThnUFNCMGIwbFBZbXBsWTNRb0pIUm9hWE1wTzF4dUlDQWdJSFpoY2lCc1pXNW5kR2dnUFNCMGIweGxibWQwYUNoUExteGxibWQwYUNrN1hHNGdJQ0FnZG1GeUlHbHVaR1Y0SUQwZ2RHOUJZbk52YkhWMFpVbHVaR1Y0S0daeWIyMUpibVJsZUN3Z2JHVnVaM1JvS1R0Y2JpQWdJQ0IyWVhJZ2RtRnNkV1U3WEc0Z0lDQWdMeThnUVhKeVlYa2phVzVqYkhWa1pYTWdkWE5sY3lCVFlXMWxWbUZzZFdWYVpYSnZJR1Z4ZFdGc2FYUjVJR0ZzWjI5eWFYUm9iVnh1SUNBZ0lDOHZJR1Z6YkdsdWRDMWthWE5oWW14bExXNWxlSFF0YkdsdVpTQnVieTF6Wld4bUxXTnZiWEJoY21WY2JpQWdJQ0JwWmlBb1NWTmZTVTVEVEZWRVJWTWdKaVlnWld3Z0lUMGdaV3dwSUhkb2FXeGxJQ2hzWlc1bmRHZ2dQaUJwYm1SbGVDa2dlMXh1SUNBZ0lDQWdkbUZzZFdVZ1BTQlBXMmx1WkdWNEt5dGRPMXh1SUNBZ0lDQWdMeThnWlhOc2FXNTBMV1JwYzJGaWJHVXRibVY0ZEMxc2FXNWxJRzV2TFhObGJHWXRZMjl0Y0dGeVpWeHVJQ0FnSUNBZ2FXWWdLSFpoYkhWbElDRTlJSFpoYkhWbEtTQnlaWFIxY200Z2RISjFaVHRjYmlBZ0lDQXZMeUJCY25KaGVTTnBibVJsZUU5bUlHbG5ibTl5WlhNZ2FHOXNaWE1zSUVGeWNtRjVJMmx1WTJ4MVpHVnpJQzBnYm05MFhHNGdJQ0FnZlNCbGJITmxJR1p2Y2lBb08yeGxibWQwYUNBK0lHbHVaR1Y0T3lCcGJtUmxlQ3NyS1NCcFppQW9TVk5mU1U1RFRGVkVSVk1nZkh3Z2FXNWtaWGdnYVc0Z1R5a2dlMXh1SUNBZ0lDQWdhV1lnS0U5YmFXNWtaWGhkSUQwOVBTQmxiQ2tnY21WMGRYSnVJRWxUWDBsT1EweFZSRVZUSUh4OElHbHVaR1Y0SUh4OElEQTdYRzRnSUNBZ2ZTQnlaWFIxY200Z0lVbFRYMGxPUTB4VlJFVlRJQ1ltSUMweE8xeHVJQ0I5TzF4dWZUdGNiaUlzSWk4dklHZGxkSFJwYm1jZ2RHRm5JR1p5YjIwZ01Ua3VNUzR6TGpZZ1QySnFaV04wTG5CeWIzUnZkSGx3WlM1MGIxTjBjbWx1WnlncFhHNTJZWElnWTI5bUlEMGdjbVZ4ZFdseVpTZ25MaTlmWTI5bUp5azdYRzUyWVhJZ1ZFRkhJRDBnY21WeGRXbHlaU2duTGk5ZmQydHpKeWtvSjNSdlUzUnlhVzVuVkdGbkp5azdYRzR2THlCRlV6TWdkM0p2Ym1jZ2FHVnlaVnh1ZG1GeUlFRlNSeUE5SUdOdlppaG1kVzVqZEdsdmJpQW9LU0I3SUhKbGRIVnliaUJoY21kMWJXVnVkSE03SUgwb0tTa2dQVDBnSjBGeVozVnRaVzUwY3ljN1hHNWNiaTh2SUdaaGJHeGlZV05ySUdadmNpQkpSVEV4SUZOamNtbHdkQ0JCWTJObGMzTWdSR1Z1YVdWa0lHVnljbTl5WEc1MllYSWdkSEo1UjJWMElEMGdablZ1WTNScGIyNGdLR2wwTENCclpYa3BJSHRjYmlBZ2RISjVJSHRjYmlBZ0lDQnlaWFIxY200Z2FYUmJhMlY1WFR0Y2JpQWdmU0JqWVhSamFDQW9aU2tnZXlBdktpQmxiWEIwZVNBcUx5QjlYRzU5TzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlDaHBkQ2tnZTF4dUlDQjJZWElnVHl3Z1ZDd2dRanRjYmlBZ2NtVjBkWEp1SUdsMElEMDlQU0IxYm1SbFptbHVaV1FnUHlBblZXNWtaV1pwYm1Wa0p5QTZJR2wwSUQwOVBTQnVkV3hzSUQ4Z0owNTFiR3duWEc0Z0lDQWdMeThnUUVCMGIxTjBjbWx1WjFSaFp5QmpZWE5sWEc0Z0lDQWdPaUIwZVhCbGIyWWdLRlFnUFNCMGNubEhaWFFvVHlBOUlFOWlhbVZqZENocGRDa3NJRlJCUnlrcElEMDlJQ2R6ZEhKcGJtY25JRDhnVkZ4dUlDQWdJQzh2SUdKMWFXeDBhVzVVWVdjZ1kyRnpaVnh1SUNBZ0lEb2dRVkpISUQ4Z1kyOW1LRThwWEc0Z0lDQWdMeThnUlZNeklHRnlaM1Z0Wlc1MGN5Qm1ZV3hzWW1GamExeHVJQ0FnSURvZ0tFSWdQU0JqYjJZb1R5a3BJRDA5SUNkUFltcGxZM1FuSUNZbUlIUjVjR1Z2WmlCUExtTmhiR3hsWlNBOVBTQW5ablZ1WTNScGIyNG5JRDhnSjBGeVozVnRaVzUwY3ljZ09pQkNPMXh1ZlR0Y2JpSXNJblpoY2lCMGIxTjBjbWx1WnlBOUlIdDlMblJ2VTNSeWFXNW5PMXh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUNocGRDa2dlMXh1SUNCeVpYUjFjbTRnZEc5VGRISnBibWN1WTJGc2JDaHBkQ2t1YzJ4cFkyVW9PQ3dnTFRFcE8xeHVmVHRjYmlJc0luWmhjaUJqYjNKbElEMGdiVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQjdJSFpsY25OcGIyNDZJQ2N5TGpZdU1URW5JSDA3WEc1cFppQW9kSGx3Wlc5bUlGOWZaU0E5UFNBbmJuVnRZbVZ5SnlrZ1gxOWxJRDBnWTI5eVpUc2dMeThnWlhOc2FXNTBMV1JwYzJGaWJHVXRiR2x1WlNCdWJ5MTFibVJsWmx4dUlpd2lMeThnYjNCMGFXOXVZV3dnTHlCemFXMXdiR1VnWTI5dWRHVjRkQ0JpYVc1a2FXNW5YRzUyWVhJZ1lVWjFibU4wYVc5dUlEMGdjbVZ4ZFdseVpTZ25MaTlmWVMxbWRXNWpkR2x2YmljcE8xeHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQW9abTRzSUhSb1lYUXNJR3hsYm1kMGFDa2dlMXh1SUNCaFJuVnVZM1JwYjI0b1ptNHBPMXh1SUNCcFppQW9kR2hoZENBOVBUMGdkVzVrWldacGJtVmtLU0J5WlhSMWNtNGdabTQ3WEc0Z0lITjNhWFJqYUNBb2JHVnVaM1JvS1NCN1hHNGdJQ0FnWTJGelpTQXhPaUJ5WlhSMWNtNGdablZ1WTNScGIyNGdLR0VwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJtYmk1allXeHNLSFJvWVhRc0lHRXBPMXh1SUNBZ0lIMDdYRzRnSUNBZ1kyRnpaU0F5T2lCeVpYUjFjbTRnWm5WdVkzUnBiMjRnS0dFc0lHSXBJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQm1iaTVqWVd4c0tIUm9ZWFFzSUdFc0lHSXBPMXh1SUNBZ0lIMDdYRzRnSUNBZ1kyRnpaU0F6T2lCeVpYUjFjbTRnWm5WdVkzUnBiMjRnS0dFc0lHSXNJR01wSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJtYmk1allXeHNLSFJvWVhRc0lHRXNJR0lzSUdNcE8xeHVJQ0FnSUgwN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUdaMWJtTjBhVzl1SUNndktpQXVMaTVoY21keklDb3ZLU0I3WEc0Z0lDQWdjbVYwZFhKdUlHWnVMbUZ3Y0d4NUtIUm9ZWFFzSUdGeVozVnRaVzUwY3lrN1hHNGdJSDA3WEc1OU8xeHVJaXdpTHk4Z055NHlMakVnVW1WeGRXbHlaVTlpYW1WamRFTnZaWEpqYVdKc1pTaGhjbWQxYldWdWRDbGNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdLR2wwS1NCN1hHNGdJR2xtSUNocGRDQTlQU0IxYm1SbFptbHVaV1FwSUhSb2NtOTNJRlI1Y0dWRmNuSnZjaWhjSWtOaGJpZDBJR05oYkd3Z2JXVjBhRzlrSUc5dUlDQmNJaUFySUdsMEtUdGNiaUFnY21WMGRYSnVJR2wwTzF4dWZUdGNiaUlzSWk4dklGUm9ZVzVySjNNZ1NVVTRJR1p2Y2lCb2FYTWdablZ1Ym5rZ1pHVm1hVzVsVUhKdmNHVnlkSGxjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnSVhKbGNYVnBjbVVvSnk0dlgyWmhhV3h6Snlrb1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNCeVpYUjFjbTRnVDJKcVpXTjBMbVJsWm1sdVpWQnliM0JsY25SNUtIdDlMQ0FuWVNjc0lIc2daMlYwT2lCbWRXNWpkR2x2YmlBb0tTQjdJSEpsZEhWeWJpQTNPeUI5SUgwcExtRWdJVDBnTnp0Y2JuMHBPMXh1SWl3aWRtRnlJR2x6VDJKcVpXTjBJRDBnY21WeGRXbHlaU2duTGk5ZmFYTXRiMkpxWldOMEp5azdYRzUyWVhJZ1pHOWpkVzFsYm5RZ1BTQnlaWEYxYVhKbEtDY3VMMTluYkc5aVlXd25LUzVrYjJOMWJXVnVkRHRjYmk4dklIUjVjR1Z2WmlCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZGYkdWdFpXNTBJR2x6SUNkdlltcGxZM1FuSUdsdUlHOXNaQ0JKUlZ4dWRtRnlJR2x6SUQwZ2FYTlBZbXBsWTNRb1pHOWpkVzFsYm5RcElDWW1JR2x6VDJKcVpXTjBLR1J2WTNWdFpXNTBMbU55WldGMFpVVnNaVzFsYm5RcE8xeHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQW9hWFFwSUh0Y2JpQWdjbVYwZFhKdUlHbHpJRDhnWkc5amRXMWxiblF1WTNKbFlYUmxSV3hsYldWdWRDaHBkQ2tnT2lCN2ZUdGNibjA3WEc0aUxDSXZMeUJKUlNBNExTQmtiMjRuZENCbGJuVnRJR0oxWnlCclpYbHpYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJQ2hjYmlBZ0oyTnZibk4wY25WamRHOXlMR2hoYzA5M2JsQnliM0JsY25SNUxHbHpVSEp2ZEc5MGVYQmxUMllzY0hKdmNHVnlkSGxKYzBWdWRXMWxjbUZpYkdVc2RHOU1iMk5oYkdWVGRISnBibWNzZEc5VGRISnBibWNzZG1Gc2RXVlBaaWRjYmlrdWMzQnNhWFFvSnl3bktUdGNiaUlzSW5aaGNpQm5iRzlpWVd3Z1BTQnlaWEYxYVhKbEtDY3VMMTluYkc5aVlXd25LVHRjYm5aaGNpQmpiM0psSUQwZ2NtVnhkV2x5WlNnbkxpOWZZMjl5WlNjcE8xeHVkbUZ5SUdOMGVDQTlJSEpsY1hWcGNtVW9KeTR2WDJOMGVDY3BPMXh1ZG1GeUlHaHBaR1VnUFNCeVpYRjFhWEpsS0NjdUwxOW9hV1JsSnlrN1hHNTJZWElnYUdGeklEMGdjbVZ4ZFdseVpTZ25MaTlmYUdGekp5azdYRzUyWVhJZ1VGSlBWRTlVV1ZCRklEMGdKM0J5YjNSdmRIbHdaU2M3WEc1Y2JuWmhjaUFrWlhod2IzSjBJRDBnWm5WdVkzUnBiMjRnS0hSNWNHVXNJRzVoYldVc0lITnZkWEpqWlNrZ2UxeHVJQ0IyWVhJZ1NWTmZSazlTUTBWRUlEMGdkSGx3WlNBbUlDUmxlSEJ2Y25RdVJqdGNiaUFnZG1GeUlFbFRYMGRNVDBKQlRDQTlJSFI1Y0dVZ0ppQWtaWGh3YjNKMExrYzdYRzRnSUhaaGNpQkpVMTlUVkVGVVNVTWdQU0IwZVhCbElDWWdKR1Y0Y0c5eWRDNVRPMXh1SUNCMllYSWdTVk5mVUZKUFZFOGdQU0IwZVhCbElDWWdKR1Y0Y0c5eWRDNVFPMXh1SUNCMllYSWdTVk5mUWtsT1JDQTlJSFI1Y0dVZ0ppQWtaWGh3YjNKMExrSTdYRzRnSUhaaGNpQkpVMTlYVWtGUUlEMGdkSGx3WlNBbUlDUmxlSEJ2Y25RdVZ6dGNiaUFnZG1GeUlHVjRjRzl5ZEhNZ1BTQkpVMTlIVEU5Q1FVd2dQeUJqYjNKbElEb2dZMjl5WlZ0dVlXMWxYU0I4ZkNBb1kyOXlaVnR1WVcxbFhTQTlJSHQ5S1R0Y2JpQWdkbUZ5SUdWNGNGQnliM1J2SUQwZ1pYaHdiM0owYzF0UVVrOVVUMVJaVUVWZE8xeHVJQ0IyWVhJZ2RHRnlaMlYwSUQwZ1NWTmZSMHhQUWtGTUlEOGdaMnh2WW1Gc0lEb2dTVk5mVTFSQlZFbERJRDhnWjJ4dlltRnNXMjVoYldWZElEb2dLR2RzYjJKaGJGdHVZVzFsWFNCOGZDQjdmU2xiVUZKUFZFOVVXVkJGWFR0Y2JpQWdkbUZ5SUd0bGVTd2diM2R1TENCdmRYUTdYRzRnSUdsbUlDaEpVMTlIVEU5Q1FVd3BJSE52ZFhKalpTQTlJRzVoYldVN1hHNGdJR1p2Y2lBb2EyVjVJR2x1SUhOdmRYSmpaU2tnZTF4dUlDQWdJQzh2SUdOdmJuUmhhVzV6SUdsdUlHNWhkR2wyWlZ4dUlDQWdJRzkzYmlBOUlDRkpVMTlHVDFKRFJVUWdKaVlnZEdGeVoyVjBJQ1ltSUhSaGNtZGxkRnRyWlhsZElDRTlQU0IxYm1SbFptbHVaV1E3WEc0Z0lDQWdhV1lnS0c5M2JpQW1KaUJvWVhNb1pYaHdiM0owY3l3Z2EyVjVLU2tnWTI5dWRHbHVkV1U3WEc0Z0lDQWdMeThnWlhod2IzSjBJRzVoZEdsMlpTQnZjaUJ3WVhOelpXUmNiaUFnSUNCdmRYUWdQU0J2ZDI0Z1B5QjBZWEpuWlhSYmEyVjVYU0E2SUhOdmRYSmpaVnRyWlhsZE8xeHVJQ0FnSUM4dklIQnlaWFpsYm5RZ1oyeHZZbUZzSUhCdmJHeDFkR2x2YmlCbWIzSWdibUZ0WlhOd1lXTmxjMXh1SUNBZ0lHVjRjRzl5ZEhOYmEyVjVYU0E5SUVsVFgwZE1UMEpCVENBbUppQjBlWEJsYjJZZ2RHRnlaMlYwVzJ0bGVWMGdJVDBnSjJaMWJtTjBhVzl1SnlBL0lITnZkWEpqWlZ0clpYbGRYRzRnSUNBZ0x5OGdZbWx1WkNCMGFXMWxjbk1nZEc4Z1oyeHZZbUZzSUdadmNpQmpZV3hzSUdaeWIyMGdaWGh3YjNKMElHTnZiblJsZUhSY2JpQWdJQ0E2SUVsVFgwSkpUa1FnSmlZZ2IzZHVJRDhnWTNSNEtHOTFkQ3dnWjJ4dlltRnNLVnh1SUNBZ0lDOHZJSGR5WVhBZ1oyeHZZbUZzSUdOdmJuTjBjblZqZEc5eWN5Qm1iM0lnY0hKbGRtVnVkQ0JqYUdGdVoyVWdkR2hsYlNCcGJpQnNhV0p5WVhKNVhHNGdJQ0FnT2lCSlUxOVhVa0ZRSUNZbUlIUmhjbWRsZEZ0clpYbGRJRDA5SUc5MWRDQS9JQ2htZFc1amRHbHZiaUFvUXlrZ2UxeHVJQ0FnSUNBZ2RtRnlJRVlnUFNCbWRXNWpkR2x2YmlBb1lTd2dZaXdnWXlrZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvZEdocGN5QnBibk4wWVc1alpXOW1JRU1wSUh0Y2JpQWdJQ0FnSUNBZ0lDQnpkMmwwWTJnZ0tHRnlaM1Z0Wlc1MGN5NXNaVzVuZEdncElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdOaGMyVWdNRG9nY21WMGRYSnVJRzVsZHlCREtDazdYRzRnSUNBZ0lDQWdJQ0FnSUNCallYTmxJREU2SUhKbGRIVnliaUJ1WlhjZ1F5aGhLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTmhjMlVnTWpvZ2NtVjBkWEp1SUc1bGR5QkRLR0VzSUdJcE8xeHVJQ0FnSUNBZ0lDQWdJSDBnY21WMGRYSnVJRzVsZHlCREtHRXNJR0lzSUdNcE8xeHVJQ0FnSUNBZ0lDQjlJSEpsZEhWeWJpQkRMbUZ3Y0d4NUtIUm9hWE1zSUdGeVozVnRaVzUwY3lrN1hHNGdJQ0FnSUNCOU8xeHVJQ0FnSUNBZ1JsdFFVazlVVDFSWlVFVmRJRDBnUTF0UVVrOVVUMVJaVUVWZE8xeHVJQ0FnSUNBZ2NtVjBkWEp1SUVZN1hHNGdJQ0FnTHk4Z2JXRnJaU0J6ZEdGMGFXTWdkbVZ5YzJsdmJuTWdabTl5SUhCeWIzUnZkSGx3WlNCdFpYUm9iMlJ6WEc0Z0lDQWdmU2tvYjNWMEtTQTZJRWxUWDFCU1QxUlBJQ1ltSUhSNWNHVnZaaUJ2ZFhRZ1BUMGdKMloxYm1OMGFXOXVKeUEvSUdOMGVDaEdkVzVqZEdsdmJpNWpZV3hzTENCdmRYUXBJRG9nYjNWME8xeHVJQ0FnSUM4dklHVjRjRzl5ZENCd2NtOTBieUJ0WlhSb2IyUnpJSFJ2SUdOdmNtVXVKVU5QVGxOVVVsVkRWRTlTSlM1dFpYUm9iMlJ6TGlWT1FVMUZKVnh1SUNBZ0lHbG1JQ2hKVTE5UVVrOVVUeWtnZTF4dUlDQWdJQ0FnS0dWNGNHOXlkSE11ZG1seWRIVmhiQ0I4ZkNBb1pYaHdiM0owY3k1MmFYSjBkV0ZzSUQwZ2UzMHBLVnRyWlhsZElEMGdiM1YwTzF4dUlDQWdJQ0FnTHk4Z1pYaHdiM0owSUhCeWIzUnZJRzFsZEdodlpITWdkRzhnWTI5eVpTNGxRMDlPVTFSU1ZVTlVUMUlsTG5CeWIzUnZkSGx3WlM0bFRrRk5SU1ZjYmlBZ0lDQWdJR2xtSUNoMGVYQmxJQ1lnSkdWNGNHOXlkQzVTSUNZbUlHVjRjRkJ5YjNSdklDWW1JQ0ZsZUhCUWNtOTBiMXRyWlhsZEtTQm9hV1JsS0dWNGNGQnliM1J2TENCclpYa3NJRzkxZENrN1hHNGdJQ0FnZlZ4dUlDQjlYRzU5TzF4dUx5OGdkSGx3WlNCaWFYUnRZWEJjYmlSbGVIQnZjblF1UmlBOUlERTdJQ0FnTHk4Z1ptOXlZMlZrWEc0a1pYaHdiM0owTGtjZ1BTQXlPeUFnSUM4dklHZHNiMkpoYkZ4dUpHVjRjRzl5ZEM1VElEMGdORHNnSUNBdkx5QnpkR0YwYVdOY2JpUmxlSEJ2Y25RdVVDQTlJRGc3SUNBZ0x5OGdjSEp2ZEc5Y2JpUmxlSEJ2Y25RdVFpQTlJREUyT3lBZ0x5OGdZbWx1WkZ4dUpHVjRjRzl5ZEM1WElEMGdNekk3SUNBdkx5QjNjbUZ3WEc0a1pYaHdiM0owTGxVZ1BTQTJORHNnSUM4dklITmhabVZjYmlSbGVIQnZjblF1VWlBOUlERXlPRHNnTHk4Z2NtVmhiQ0J3Y205MGJ5QnRaWFJvYjJRZ1ptOXlJR0JzYVdKeVlYSjVZRnh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0FrWlhod2IzSjBPMXh1SWl3aWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb1pYaGxZeWtnZTF4dUlDQjBjbmtnZTF4dUlDQWdJSEpsZEhWeWJpQWhJV1Y0WldNb0tUdGNiaUFnZlNCallYUmphQ0FvWlNrZ2UxeHVJQ0FnSUhKbGRIVnliaUIwY25WbE8xeHVJQ0I5WEc1OU8xeHVJaXdpZG1GeUlHTjBlQ0E5SUhKbGNYVnBjbVVvSnk0dlgyTjBlQ2NwTzF4dWRtRnlJR05oYkd3Z1BTQnlaWEYxYVhKbEtDY3VMMTlwZEdWeUxXTmhiR3duS1R0Y2JuWmhjaUJwYzBGeWNtRjVTWFJsY2lBOUlISmxjWFZwY21Vb0p5NHZYMmx6TFdGeWNtRjVMV2wwWlhJbktUdGNiblpoY2lCaGJrOWlhbVZqZENBOUlISmxjWFZwY21Vb0p5NHZYMkZ1TFc5aWFtVmpkQ2NwTzF4dWRtRnlJSFJ2VEdWdVozUm9JRDBnY21WeGRXbHlaU2duTGk5ZmRHOHRiR1Z1WjNSb0p5azdYRzUyWVhJZ1oyVjBTWFJsY2tadUlEMGdjbVZ4ZFdseVpTZ25MaTlqYjNKbExtZGxkQzFwZEdWeVlYUnZjaTF0WlhSb2IyUW5LVHRjYm5aaGNpQkNVa1ZCU3lBOUlIdDlPMXh1ZG1GeUlGSkZWRlZTVGlBOUlIdDlPMXh1ZG1GeUlHVjRjRzl5ZEhNZ1BTQnRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlDaHBkR1Z5WVdKc1pTd2daVzUwY21sbGN5d2dabTRzSUhSb1lYUXNJRWxVUlZKQlZFOVNLU0I3WEc0Z0lIWmhjaUJwZEdWeVJtNGdQU0JKVkVWU1FWUlBVaUEvSUdaMWJtTjBhVzl1SUNncElIc2djbVYwZFhKdUlHbDBaWEpoWW14bE95QjlJRG9nWjJWMFNYUmxja1p1S0dsMFpYSmhZbXhsS1R0Y2JpQWdkbUZ5SUdZZ1BTQmpkSGdvWm00c0lIUm9ZWFFzSUdWdWRISnBaWE1nUHlBeUlEb2dNU2s3WEc0Z0lIWmhjaUJwYm1SbGVDQTlJREE3WEc0Z0lIWmhjaUJzWlc1bmRHZ3NJSE4wWlhBc0lHbDBaWEpoZEc5eUxDQnlaWE4xYkhRN1hHNGdJR2xtSUNoMGVYQmxiMllnYVhSbGNrWnVJQ0U5SUNkbWRXNWpkR2x2YmljcElIUm9jbTkzSUZSNWNHVkZjbkp2Y2locGRHVnlZV0pzWlNBcklDY2dhWE1nYm05MElHbDBaWEpoWW14bElTY3BPMXh1SUNBdkx5Qm1ZWE4wSUdOaGMyVWdabTl5SUdGeWNtRjVjeUIzYVhSb0lHUmxabUYxYkhRZ2FYUmxjbUYwYjNKY2JpQWdhV1lnS0dselFYSnlZWGxKZEdWeUtHbDBaWEpHYmlrcElHWnZjaUFvYkdWdVozUm9JRDBnZEc5TVpXNW5kR2dvYVhSbGNtRmliR1V1YkdWdVozUm9LVHNnYkdWdVozUm9JRDRnYVc1a1pYZzdJR2x1WkdWNEt5c3BJSHRjYmlBZ0lDQnlaWE4xYkhRZ1BTQmxiblJ5YVdWeklEOGdaaWhoYms5aWFtVmpkQ2h6ZEdWd0lEMGdhWFJsY21GaWJHVmJhVzVrWlhoZEtWc3dYU3dnYzNSbGNGc3hYU2tnT2lCbUtHbDBaWEpoWW14bFcybHVaR1Y0WFNrN1hHNGdJQ0FnYVdZZ0tISmxjM1ZzZENBOVBUMGdRbEpGUVVzZ2ZId2djbVZ6ZFd4MElEMDlQU0JTUlZSVlVrNHBJSEpsZEhWeWJpQnlaWE4xYkhRN1hHNGdJSDBnWld4elpTQm1iM0lnS0dsMFpYSmhkRzl5SUQwZ2FYUmxja1p1TG1OaGJHd29hWFJsY21GaWJHVXBPeUFoS0hOMFpYQWdQU0JwZEdWeVlYUnZjaTV1WlhoMEtDa3BMbVJ2Ym1VN0tTQjdYRzRnSUNBZ2NtVnpkV3gwSUQwZ1kyRnNiQ2hwZEdWeVlYUnZjaXdnWml3Z2MzUmxjQzUyWVd4MVpTd2daVzUwY21sbGN5azdYRzRnSUNBZ2FXWWdLSEpsYzNWc2RDQTlQVDBnUWxKRlFVc2dmSHdnY21WemRXeDBJRDA5UFNCU1JWUlZVazRwSUhKbGRIVnliaUJ5WlhOMWJIUTdYRzRnSUgxY2JuMDdYRzVsZUhCdmNuUnpMa0pTUlVGTElEMGdRbEpGUVVzN1hHNWxlSEJ2Y25SekxsSkZWRlZTVGlBOUlGSkZWRlZTVGp0Y2JpSXNJaTh2SUdoMGRIQnpPaTh2WjJsMGFIVmlMbU52YlM5NmJHOXBjbTlqYXk5amIzSmxMV3B6TDJsemMzVmxjeTg0TmlOcGMzTjFaV052YlcxbGJuUXRNVEUxTnpVNU1ESTRYRzUyWVhJZ1oyeHZZbUZzSUQwZ2JXOWtkV3hsTG1WNGNHOXlkSE1nUFNCMGVYQmxiMllnZDJsdVpHOTNJQ0U5SUNkMWJtUmxabWx1WldRbklDWW1JSGRwYm1SdmR5NU5ZWFJvSUQwOUlFMWhkR2hjYmlBZ1B5QjNhVzVrYjNjZ09pQjBlWEJsYjJZZ2MyVnNaaUFoUFNBbmRXNWtaV1pwYm1Wa0p5QW1KaUJ6Wld4bUxrMWhkR2dnUFQwZ1RXRjBhQ0EvSUhObGJHWmNiaUFnTHk4Z1pYTnNhVzUwTFdScGMyRmliR1V0Ym1WNGRDMXNhVzVsSUc1dkxXNWxkeTFtZFc1alhHNGdJRG9nUm5WdVkzUnBiMjRvSjNKbGRIVnliaUIwYUdsekp5a29LVHRjYm1sbUlDaDBlWEJsYjJZZ1gxOW5JRDA5SUNkdWRXMWlaWEluS1NCZlgyY2dQU0JuYkc5aVlXdzdJQzh2SUdWemJHbHVkQzFrYVhOaFlteGxMV3hwYm1VZ2JtOHRkVzVrWldaY2JpSXNJblpoY2lCb1lYTlBkMjVRY205d1pYSjBlU0E5SUh0OUxtaGhjMDkzYmxCeWIzQmxjblI1TzF4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb2FYUXNJR3RsZVNrZ2UxeHVJQ0J5WlhSMWNtNGdhR0Z6VDNkdVVISnZjR1Z5ZEhrdVkyRnNiQ2hwZEN3Z2EyVjVLVHRjYm4wN1hHNGlMQ0oyWVhJZ1pGQWdQU0J5WlhGMWFYSmxLQ2N1TDE5dlltcGxZM1F0WkhBbktUdGNiblpoY2lCamNtVmhkR1ZFWlhOaklEMGdjbVZ4ZFdseVpTZ25MaTlmY0hKdmNHVnlkSGt0WkdWell5Y3BPMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0J5WlhGMWFYSmxLQ2N1TDE5a1pYTmpjbWx3ZEc5eWN5Y3BJRDhnWm5WdVkzUnBiMjRnS0c5aWFtVmpkQ3dnYTJWNUxDQjJZV3gxWlNrZ2UxeHVJQ0J5WlhSMWNtNGdaRkF1WmlodlltcGxZM1FzSUd0bGVTd2dZM0psWVhSbFJHVnpZeWd4TENCMllXeDFaU2twTzF4dWZTQTZJR1oxYm1OMGFXOXVJQ2h2WW1wbFkzUXNJR3RsZVN3Z2RtRnNkV1VwSUh0Y2JpQWdiMkpxWldOMFcydGxlVjBnUFNCMllXeDFaVHRjYmlBZ2NtVjBkWEp1SUc5aWFtVmpkRHRjYm4wN1hHNGlMQ0oyWVhJZ1pHOWpkVzFsYm5RZ1BTQnlaWEYxYVhKbEtDY3VMMTluYkc5aVlXd25LUzVrYjJOMWJXVnVkRHRjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWkc5amRXMWxiblFnSmlZZ1pHOWpkVzFsYm5RdVpHOWpkVzFsYm5SRmJHVnRaVzUwTzF4dUlpd2liVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQWhjbVZ4ZFdseVpTZ25MaTlmWkdWelkzSnBjSFJ2Y25NbktTQW1KaUFoY21WeGRXbHlaU2duTGk5ZlptRnBiSE1uS1NobWRXNWpkR2x2YmlBb0tTQjdYRzRnSUhKbGRIVnliaUJQWW1wbFkzUXVaR1ZtYVc1bFVISnZjR1Z5ZEhrb2NtVnhkV2x5WlNnbkxpOWZaRzl0TFdOeVpXRjBaU2NwS0Nka2FYWW5LU3dnSjJFbkxDQjdJR2RsZERvZ1puVnVZM1JwYjI0Z0tDa2dleUJ5WlhSMWNtNGdOenNnZlNCOUtTNWhJQ0U5SURjN1hHNTlLVHRjYmlJc0lpOHZJR1poYzNRZ1lYQndiSGtzSUdoMGRIQTZMeTlxYzNCbGNtWXViRzVyYVhRdVkyOXRMMlpoYzNRdFlYQndiSGt2TlZ4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb1ptNHNJR0Z5WjNNc0lIUm9ZWFFwSUh0Y2JpQWdkbUZ5SUhWdUlEMGdkR2hoZENBOVBUMGdkVzVrWldacGJtVmtPMXh1SUNCemQybDBZMmdnS0dGeVozTXViR1Z1WjNSb0tTQjdYRzRnSUNBZ1kyRnpaU0F3T2lCeVpYUjFjbTRnZFc0Z1B5Qm1iaWdwWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdPaUJtYmk1allXeHNLSFJvWVhRcE8xeHVJQ0FnSUdOaGMyVWdNVG9nY21WMGRYSnVJSFZ1SUQ4Z1ptNG9ZWEpuYzFzd1hTbGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBNklHWnVMbU5oYkd3b2RHaGhkQ3dnWVhKbmMxc3dYU2s3WEc0Z0lDQWdZMkZ6WlNBeU9pQnlaWFIxY200Z2RXNGdQeUJtYmloaGNtZHpXekJkTENCaGNtZHpXekZkS1Z4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRG9nWm00dVkyRnNiQ2gwYUdGMExDQmhjbWR6V3pCZExDQmhjbWR6V3pGZEtUdGNiaUFnSUNCallYTmxJRE02SUhKbGRIVnliaUIxYmlBL0lHWnVLR0Z5WjNOYk1GMHNJR0Z5WjNOYk1WMHNJR0Z5WjNOYk1sMHBYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ09pQm1iaTVqWVd4c0tIUm9ZWFFzSUdGeVozTmJNRjBzSUdGeVozTmJNVjBzSUdGeVozTmJNbDBwTzF4dUlDQWdJR05oYzJVZ05Eb2djbVYwZFhKdUlIVnVJRDhnWm00b1lYSm5jMXN3WFN3Z1lYSm5jMXN4WFN3Z1lYSm5jMXN5WFN3Z1lYSm5jMXN6WFNsY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E2SUdadUxtTmhiR3dvZEdoaGRDd2dZWEpuYzFzd1hTd2dZWEpuYzFzeFhTd2dZWEpuYzFzeVhTd2dZWEpuYzFzelhTazdYRzRnSUgwZ2NtVjBkWEp1SUdadUxtRndjR3g1S0hSb1lYUXNJR0Z5WjNNcE8xeHVmVHRjYmlJc0lpOHZJR1poYkd4aVlXTnJJR1p2Y2lCdWIyNHRZWEp5WVhrdGJHbHJaU0JGVXpNZ1lXNWtJRzV2YmkxbGJuVnRaWEpoWW14bElHOXNaQ0JXT0NCemRISnBibWR6WEc1MllYSWdZMjltSUQwZ2NtVnhkV2x5WlNnbkxpOWZZMjltSnlrN1hHNHZMeUJsYzJ4cGJuUXRaR2x6WVdKc1pTMXVaWGgwTFd4cGJtVWdibTh0Y0hKdmRHOTBlWEJsTFdKMWFXeDBhVzV6WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUU5aWFtVmpkQ2duZWljcExuQnliM0JsY25SNVNYTkZiblZ0WlhKaFlteGxLREFwSUQ4Z1QySnFaV04wSURvZ1puVnVZM1JwYjI0Z0tHbDBLU0I3WEc0Z0lISmxkSFZ5YmlCamIyWW9hWFFwSUQwOUlDZFRkSEpwYm1jbklEOGdhWFF1YzNCc2FYUW9KeWNwSURvZ1QySnFaV04wS0dsMEtUdGNibjA3WEc0aUxDSXZMeUJqYUdWamF5QnZiaUJrWldaaGRXeDBJRUZ5Y21GNUlHbDBaWEpoZEc5eVhHNTJZWElnU1hSbGNtRjBiM0p6SUQwZ2NtVnhkV2x5WlNnbkxpOWZhWFJsY21GMGIzSnpKeWs3WEc1MllYSWdTVlJGVWtGVVQxSWdQU0J5WlhGMWFYSmxLQ2N1TDE5M2EzTW5LU2duYVhSbGNtRjBiM0luS1R0Y2JuWmhjaUJCY25KaGVWQnliM1J2SUQwZ1FYSnlZWGt1Y0hKdmRHOTBlWEJsTzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlDaHBkQ2tnZTF4dUlDQnlaWFIxY200Z2FYUWdJVDA5SUhWdVpHVm1hVzVsWkNBbUppQW9TWFJsY21GMGIzSnpMa0Z5Y21GNUlEMDlQU0JwZENCOGZDQkJjbkpoZVZCeWIzUnZXMGxVUlZKQlZFOVNYU0E5UFQwZ2FYUXBPMXh1ZlR0Y2JpSXNJbTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdLR2wwS1NCN1hHNGdJSEpsZEhWeWJpQjBlWEJsYjJZZ2FYUWdQVDA5SUNkdlltcGxZM1FuSUQ4Z2FYUWdJVDA5SUc1MWJHd2dPaUIwZVhCbGIyWWdhWFFnUFQwOUlDZG1kVzVqZEdsdmJpYzdYRzU5TzF4dUlpd2lMeThnWTJGc2JDQnpiMjFsZEdocGJtY2diMjRnYVhSbGNtRjBiM0lnYzNSbGNDQjNhWFJvSUhOaFptVWdZMnh2YzJsdVp5QnZiaUJsY25KdmNseHVkbUZ5SUdGdVQySnFaV04wSUQwZ2NtVnhkV2x5WlNnbkxpOWZZVzR0YjJKcVpXTjBKeWs3WEc1dGIyUjFiR1V1Wlhod2IzSjBjeUE5SUdaMWJtTjBhVzl1SUNocGRHVnlZWFJ2Y2l3Z1ptNHNJSFpoYkhWbExDQmxiblJ5YVdWektTQjdYRzRnSUhSeWVTQjdYRzRnSUNBZ2NtVjBkWEp1SUdWdWRISnBaWE1nUHlCbWJpaGhiazlpYW1WamRDaDJZV3gxWlNsYk1GMHNJSFpoYkhWbFd6RmRLU0E2SUdadUtIWmhiSFZsS1R0Y2JpQWdMeThnTnk0MExqWWdTWFJsY21GMGIzSkRiRzl6WlNocGRHVnlZWFJ2Y2l3Z1kyOXRjR3hsZEdsdmJpbGNiaUFnZlNCallYUmphQ0FvWlNrZ2UxeHVJQ0FnSUhaaGNpQnlaWFFnUFNCcGRHVnlZWFJ2Y2xzbmNtVjBkWEp1SjEwN1hHNGdJQ0FnYVdZZ0tISmxkQ0FoUFQwZ2RXNWtaV1pwYm1Wa0tTQmhiazlpYW1WamRDaHlaWFF1WTJGc2JDaHBkR1Z5WVhSdmNpa3BPMXh1SUNBZ0lIUm9jbTkzSUdVN1hHNGdJSDFjYm4wN1hHNGlMQ0luZFhObElITjBjbWxqZENjN1hHNTJZWElnWTNKbFlYUmxJRDBnY21WeGRXbHlaU2duTGk5ZmIySnFaV04wTFdOeVpXRjBaU2NwTzF4dWRtRnlJR1JsYzJOeWFYQjBiM0lnUFNCeVpYRjFhWEpsS0NjdUwxOXdjbTl3WlhKMGVTMWtaWE5qSnlrN1hHNTJZWElnYzJWMFZHOVRkSEpwYm1kVVlXY2dQU0J5WlhGMWFYSmxLQ2N1TDE5elpYUXRkRzh0YzNSeWFXNW5MWFJoWnljcE8xeHVkbUZ5SUVsMFpYSmhkRzl5VUhKdmRHOTBlWEJsSUQwZ2UzMDdYRzVjYmk4dklESTFMakV1TWk0eExqRWdKVWwwWlhKaGRHOXlVSEp2ZEc5MGVYQmxKVnRBUUdsMFpYSmhkRzl5WFNncFhHNXlaWEYxYVhKbEtDY3VMMTlvYVdSbEp5a29TWFJsY21GMGIzSlFjbTkwYjNSNWNHVXNJSEpsY1hWcGNtVW9KeTR2WDNkcmN5Y3BLQ2RwZEdWeVlYUnZjaWNwTENCbWRXNWpkR2x2YmlBb0tTQjdJSEpsZEhWeWJpQjBhR2x6T3lCOUtUdGNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUFvUTI5dWMzUnlkV04wYjNJc0lFNUJUVVVzSUc1bGVIUXBJSHRjYmlBZ1EyOXVjM1J5ZFdOMGIzSXVjSEp2ZEc5MGVYQmxJRDBnWTNKbFlYUmxLRWwwWlhKaGRHOXlVSEp2ZEc5MGVYQmxMQ0I3SUc1bGVIUTZJR1JsYzJOeWFYQjBiM0lvTVN3Z2JtVjRkQ2tnZlNrN1hHNGdJSE5sZEZSdlUzUnlhVzVuVkdGbktFTnZibk4wY25WamRHOXlMQ0JPUVUxRklDc2dKeUJKZEdWeVlYUnZjaWNwTzF4dWZUdGNiaUlzSWlkMWMyVWdjM1J5YVdOMEp6dGNiblpoY2lCTVNVSlNRVkpaSUQwZ2NtVnhkV2x5WlNnbkxpOWZiR2xpY21GeWVTY3BPMXh1ZG1GeUlDUmxlSEJ2Y25RZ1BTQnlaWEYxYVhKbEtDY3VMMTlsZUhCdmNuUW5LVHRjYm5aaGNpQnlaV1JsWm1sdVpTQTlJSEpsY1hWcGNtVW9KeTR2WDNKbFpHVm1hVzVsSnlrN1hHNTJZWElnYUdsa1pTQTlJSEpsY1hWcGNtVW9KeTR2WDJocFpHVW5LVHRjYm5aaGNpQkpkR1Z5WVhSdmNuTWdQU0J5WlhGMWFYSmxLQ2N1TDE5cGRHVnlZWFJ2Y25NbktUdGNiblpoY2lBa2FYUmxja055WldGMFpTQTlJSEpsY1hWcGNtVW9KeTR2WDJsMFpYSXRZM0psWVhSbEp5azdYRzUyWVhJZ2MyVjBWRzlUZEhKcGJtZFVZV2NnUFNCeVpYRjFhWEpsS0NjdUwxOXpaWFF0ZEc4dGMzUnlhVzVuTFhSaFp5Y3BPMXh1ZG1GeUlHZGxkRkJ5YjNSdmRIbHdaVTltSUQwZ2NtVnhkV2x5WlNnbkxpOWZiMkpxWldOMExXZHdieWNwTzF4dWRtRnlJRWxVUlZKQlZFOVNJRDBnY21WeGRXbHlaU2duTGk5ZmQydHpKeWtvSjJsMFpYSmhkRzl5SnlrN1hHNTJZWElnUWxWSFIxa2dQU0FoS0Z0ZExtdGxlWE1nSmlZZ0oyNWxlSFFuSUdsdUlGdGRMbXRsZVhNb0tTazdJQzh2SUZOaFptRnlhU0JvWVhNZ1luVm5aM2tnYVhSbGNtRjBiM0p6SUhjdmJ5QmdibVY0ZEdCY2JuWmhjaUJHUmw5SlZFVlNRVlJQVWlBOUlDZEFRR2wwWlhKaGRHOXlKenRjYm5aaGNpQkxSVmxUSUQwZ0oydGxlWE1uTzF4dWRtRnlJRlpCVEZWRlV5QTlJQ2QyWVd4MVpYTW5PMXh1WEc1MllYSWdjbVYwZFhKdVZHaHBjeUE5SUdaMWJtTjBhVzl1SUNncElIc2djbVYwZFhKdUlIUm9hWE03SUgwN1hHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdablZ1WTNScGIyNGdLRUpoYzJVc0lFNUJUVVVzSUVOdmJuTjBjblZqZEc5eUxDQnVaWGgwTENCRVJVWkJWVXhVTENCSlUxOVRSVlFzSUVaUFVrTkZSQ2tnZTF4dUlDQWthWFJsY2tOeVpXRjBaU2hEYjI1emRISjFZM1J2Y2l3Z1RrRk5SU3dnYm1WNGRDazdYRzRnSUhaaGNpQm5aWFJOWlhSb2IyUWdQU0JtZFc1amRHbHZiaUFvYTJsdVpDa2dlMXh1SUNBZ0lHbG1JQ2doUWxWSFIxa2dKaVlnYTJsdVpDQnBiaUJ3Y205MGJ5a2djbVYwZFhKdUlIQnliM1J2VzJ0cGJtUmRPMXh1SUNBZ0lITjNhWFJqYUNBb2EybHVaQ2tnZTF4dUlDQWdJQ0FnWTJGelpTQkxSVmxUT2lCeVpYUjFjbTRnWm5WdVkzUnBiMjRnYTJWNWN5Z3BJSHNnY21WMGRYSnVJRzVsZHlCRGIyNXpkSEoxWTNSdmNpaDBhR2x6TENCcmFXNWtLVHNnZlR0Y2JpQWdJQ0FnSUdOaGMyVWdWa0ZNVlVWVE9pQnlaWFIxY200Z1puVnVZM1JwYjI0Z2RtRnNkV1Z6S0NrZ2V5QnlaWFIxY200Z2JtVjNJRU52Ym5OMGNuVmpkRzl5S0hSb2FYTXNJR3RwYm1RcE95QjlPMXh1SUNBZ0lIMGdjbVYwZFhKdUlHWjFibU4wYVc5dUlHVnVkSEpwWlhNb0tTQjdJSEpsZEhWeWJpQnVaWGNnUTI5dWMzUnlkV04wYjNJb2RHaHBjeXdnYTJsdVpDazdJSDA3WEc0Z0lIMDdYRzRnSUhaaGNpQlVRVWNnUFNCT1FVMUZJQ3NnSnlCSmRHVnlZWFJ2Y2ljN1hHNGdJSFpoY2lCRVJVWmZWa0ZNVlVWVElEMGdSRVZHUVZWTVZDQTlQU0JXUVV4VlJWTTdYRzRnSUhaaGNpQldRVXhWUlZOZlFsVkhJRDBnWm1Gc2MyVTdYRzRnSUhaaGNpQndjbTkwYnlBOUlFSmhjMlV1Y0hKdmRHOTBlWEJsTzF4dUlDQjJZWElnSkc1aGRHbDJaU0E5SUhCeWIzUnZXMGxVUlZKQlZFOVNYU0I4ZkNCd2NtOTBiMXRHUmw5SlZFVlNRVlJQVWwwZ2ZId2dSRVZHUVZWTVZDQW1KaUJ3Y205MGIxdEVSVVpCVlV4VVhUdGNiaUFnZG1GeUlDUmtaV1poZFd4MElEMGdKRzVoZEdsMlpTQjhmQ0JuWlhSTlpYUm9iMlFvUkVWR1FWVk1WQ2s3WEc0Z0lIWmhjaUFrWlc1MGNtbGxjeUE5SUVSRlJrRlZURlFnUHlBaFJFVkdYMVpCVEZWRlV5QS9JQ1JrWldaaGRXeDBJRG9nWjJWMFRXVjBhRzlrS0NkbGJuUnlhV1Z6SnlrZ09pQjFibVJsWm1sdVpXUTdYRzRnSUhaaGNpQWtZVzU1VG1GMGFYWmxJRDBnVGtGTlJTQTlQU0FuUVhKeVlYa25JRDhnY0hKdmRHOHVaVzUwY21sbGN5QjhmQ0FrYm1GMGFYWmxJRG9nSkc1aGRHbDJaVHRjYmlBZ2RtRnlJRzFsZEdodlpITXNJR3RsZVN3Z1NYUmxjbUYwYjNKUWNtOTBiM1I1Y0dVN1hHNGdJQzh2SUVacGVDQnVZWFJwZG1WY2JpQWdhV1lnS0NSaGJubE9ZWFJwZG1VcElIdGNiaUFnSUNCSmRHVnlZWFJ2Y2xCeWIzUnZkSGx3WlNBOUlHZGxkRkJ5YjNSdmRIbHdaVTltS0NSaGJubE9ZWFJwZG1VdVkyRnNiQ2h1WlhjZ1FtRnpaU2dwS1NrN1hHNGdJQ0FnYVdZZ0tFbDBaWEpoZEc5eVVISnZkRzkwZVhCbElDRTlQU0JQWW1wbFkzUXVjSEp2ZEc5MGVYQmxJQ1ltSUVsMFpYSmhkRzl5VUhKdmRHOTBlWEJsTG01bGVIUXBJSHRjYmlBZ0lDQWdJQzh2SUZObGRDQkFRSFJ2VTNSeWFXNW5WR0ZuSUhSdklHNWhkR2wyWlNCcGRHVnlZWFJ2Y25OY2JpQWdJQ0FnSUhObGRGUnZVM1J5YVc1blZHRm5LRWwwWlhKaGRHOXlVSEp2ZEc5MGVYQmxMQ0JVUVVjc0lIUnlkV1VwTzF4dUlDQWdJQ0FnTHk4Z1ptbDRJR1p2Y2lCemIyMWxJRzlzWkNCbGJtZHBibVZ6WEc0Z0lDQWdJQ0JwWmlBb0lVeEpRbEpCVWxrZ0ppWWdkSGx3Wlc5bUlFbDBaWEpoZEc5eVVISnZkRzkwZVhCbFcwbFVSVkpCVkU5U1hTQWhQU0FuWm5WdVkzUnBiMjRuS1NCb2FXUmxLRWwwWlhKaGRHOXlVSEp2ZEc5MGVYQmxMQ0JKVkVWU1FWUlBVaXdnY21WMGRYSnVWR2hwY3lrN1hHNGdJQ0FnZlZ4dUlDQjlYRzRnSUM4dklHWnBlQ0JCY25KaGVTTjdkbUZzZFdWekxDQkFRR2wwWlhKaGRHOXlmUzV1WVcxbElHbHVJRlk0SUM4Z1JrWmNiaUFnYVdZZ0tFUkZSbDlXUVV4VlJWTWdKaVlnSkc1aGRHbDJaU0FtSmlBa2JtRjBhWFpsTG01aGJXVWdJVDA5SUZaQlRGVkZVeWtnZTF4dUlDQWdJRlpCVEZWRlUxOUNWVWNnUFNCMGNuVmxPMXh1SUNBZ0lDUmtaV1poZFd4MElEMGdablZ1WTNScGIyNGdkbUZzZFdWektDa2dleUJ5WlhSMWNtNGdKRzVoZEdsMlpTNWpZV3hzS0hSb2FYTXBPeUI5TzF4dUlDQjlYRzRnSUM4dklFUmxabWx1WlNCcGRHVnlZWFJ2Y2x4dUlDQnBaaUFvS0NGTVNVSlNRVkpaSUh4OElFWlBVa05GUkNrZ0ppWWdLRUpWUjBkWklIeDhJRlpCVEZWRlUxOUNWVWNnZkh3Z0lYQnliM1J2VzBsVVJWSkJWRTlTWFNrcElIdGNiaUFnSUNCb2FXUmxLSEJ5YjNSdkxDQkpWRVZTUVZSUFVpd2dKR1JsWm1GMWJIUXBPMXh1SUNCOVhHNGdJQzh2SUZCc2RXY2dabTl5SUd4cFluSmhjbmxjYmlBZ1NYUmxjbUYwYjNKelcwNUJUVVZkSUQwZ0pHUmxabUYxYkhRN1hHNGdJRWwwWlhKaGRHOXljMXRVUVVkZElEMGdjbVYwZFhKdVZHaHBjenRjYmlBZ2FXWWdLRVJGUmtGVlRGUXBJSHRjYmlBZ0lDQnRaWFJvYjJSeklEMGdlMXh1SUNBZ0lDQWdkbUZzZFdWek9pQkVSVVpmVmtGTVZVVlRJRDhnSkdSbFptRjFiSFFnT2lCblpYUk5aWFJvYjJRb1ZrRk1WVVZUS1N4Y2JpQWdJQ0FnSUd0bGVYTTZJRWxUWDFORlZDQS9JQ1JrWldaaGRXeDBJRG9nWjJWMFRXVjBhRzlrS0V0RldWTXBMRnh1SUNBZ0lDQWdaVzUwY21sbGN6b2dKR1Z1ZEhKcFpYTmNiaUFnSUNCOU8xeHVJQ0FnSUdsbUlDaEdUMUpEUlVRcElHWnZjaUFvYTJWNUlHbHVJRzFsZEdodlpITXBJSHRjYmlBZ0lDQWdJR2xtSUNnaEtHdGxlU0JwYmlCd2NtOTBieWtwSUhKbFpHVm1hVzVsS0hCeWIzUnZMQ0JyWlhrc0lHMWxkR2h2WkhOYmEyVjVYU2s3WEc0Z0lDQWdmU0JsYkhObElDUmxlSEJ2Y25Rb0pHVjRjRzl5ZEM1UUlDc2dKR1Y0Y0c5eWRDNUdJQ29nS0VKVlIwZFpJSHg4SUZaQlRGVkZVMTlDVlVjcExDQk9RVTFGTENCdFpYUm9iMlJ6S1R0Y2JpQWdmVnh1SUNCeVpYUjFjbTRnYldWMGFHOWtjenRjYm4wN1hHNGlMQ0oyWVhJZ1NWUkZVa0ZVVDFJZ1BTQnlaWEYxYVhKbEtDY3VMMTkzYTNNbktTZ25hWFJsY21GMGIzSW5LVHRjYm5aaGNpQlRRVVpGWDBOTVQxTkpUa2NnUFNCbVlXeHpaVHRjYmx4dWRISjVJSHRjYmlBZ2RtRnlJSEpwZEdWeUlEMGdXemRkVzBsVVJWSkJWRTlTWFNncE8xeHVJQ0J5YVhSbGNsc25jbVYwZFhKdUoxMGdQU0JtZFc1amRHbHZiaUFvS1NCN0lGTkJSa1ZmUTB4UFUwbE9SeUE5SUhSeWRXVTdJSDA3WEc0Z0lDOHZJR1Z6YkdsdWRDMWthWE5oWW14bExXNWxlSFF0YkdsdVpTQnVieTEwYUhKdmR5MXNhWFJsY21Gc1hHNGdJRUZ5Y21GNUxtWnliMjBvY21sMFpYSXNJR1oxYm1OMGFXOXVJQ2dwSUhzZ2RHaHliM2NnTWpzZ2ZTazdYRzU5SUdOaGRHTm9JQ2hsS1NCN0lDOHFJR1Z0Y0hSNUlDb3ZJSDFjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb1pYaGxZeXdnYzJ0cGNFTnNiM05wYm1jcElIdGNiaUFnYVdZZ0tDRnphMmx3UTJ4dmMybHVaeUFtSmlBaFUwRkdSVjlEVEU5VFNVNUhLU0J5WlhSMWNtNGdabUZzYzJVN1hHNGdJSFpoY2lCellXWmxJRDBnWm1Gc2MyVTdYRzRnSUhSeWVTQjdYRzRnSUNBZ2RtRnlJR0Z5Y2lBOUlGczNYVHRjYmlBZ0lDQjJZWElnYVhSbGNpQTlJR0Z5Y2x0SlZFVlNRVlJQVWwwb0tUdGNiaUFnSUNCcGRHVnlMbTVsZUhRZ1BTQm1kVzVqZEdsdmJpQW9LU0I3SUhKbGRIVnliaUI3SUdSdmJtVTZJSE5oWm1VZ1BTQjBjblZsSUgwN0lIMDdYRzRnSUNBZ1lYSnlXMGxVUlZKQlZFOVNYU0E5SUdaMWJtTjBhVzl1SUNncElIc2djbVYwZFhKdUlHbDBaWEk3SUgwN1hHNGdJQ0FnWlhobFl5aGhjbklwTzF4dUlDQjlJR05oZEdOb0lDaGxLU0I3SUM4cUlHVnRjSFI1SUNvdklIMWNiaUFnY21WMGRYSnVJSE5oWm1VN1hHNTlPMXh1SWl3aWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb1pHOXVaU3dnZG1Gc2RXVXBJSHRjYmlBZ2NtVjBkWEp1SUhzZ2RtRnNkV1U2SUhaaGJIVmxMQ0JrYjI1bE9pQWhJV1J2Ym1VZ2ZUdGNibjA3WEc0aUxDSnRiMlIxYkdVdVpYaHdiM0owY3lBOUlIdDlPMXh1SWl3aWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCMGNuVmxPMXh1SWl3aWRtRnlJR2RzYjJKaGJDQTlJSEpsY1hWcGNtVW9KeTR2WDJkc2IySmhiQ2NwTzF4dWRtRnlJRzFoWTNKdmRHRnpheUE5SUhKbGNYVnBjbVVvSnk0dlgzUmhjMnNuS1M1elpYUTdYRzUyWVhJZ1QySnpaWEoyWlhJZ1BTQm5iRzlpWVd3dVRYVjBZWFJwYjI1UFluTmxjblpsY2lCOGZDQm5iRzlpWVd3dVYyVmlTMmwwVFhWMFlYUnBiMjVQWW5ObGNuWmxjanRjYm5aaGNpQndjbTlqWlhOeklEMGdaMnh2WW1Gc0xuQnliMk5sYzNNN1hHNTJZWElnVUhKdmJXbHpaU0E5SUdkc2IySmhiQzVRY205dGFYTmxPMXh1ZG1GeUlHbHpUbTlrWlNBOUlISmxjWFZwY21Vb0p5NHZYMk52WmljcEtIQnliMk5sYzNNcElEMDlJQ2R3Y205alpYTnpKenRjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUhaaGNpQm9aV0ZrTENCc1lYTjBMQ0J1YjNScFpuazdYRzVjYmlBZ2RtRnlJR1pzZFhOb0lEMGdablZ1WTNScGIyNGdLQ2tnZTF4dUlDQWdJSFpoY2lCd1lYSmxiblFzSUdadU8xeHVJQ0FnSUdsbUlDaHBjMDV2WkdVZ0ppWWdLSEJoY21WdWRDQTlJSEJ5YjJObGMzTXVaRzl0WVdsdUtTa2djR0Z5Wlc1MExtVjRhWFFvS1R0Y2JpQWdJQ0IzYUdsc1pTQW9hR1ZoWkNrZ2UxeHVJQ0FnSUNBZ1ptNGdQU0JvWldGa0xtWnVPMXh1SUNBZ0lDQWdhR1ZoWkNBOUlHaGxZV1F1Ym1WNGREdGNiaUFnSUNBZ0lIUnllU0I3WEc0Z0lDQWdJQ0FnSUdadUtDazdYRzRnSUNBZ0lDQjlJR05oZEdOb0lDaGxLU0I3WEc0Z0lDQWdJQ0FnSUdsbUlDaG9aV0ZrS1NCdWIzUnBabmtvS1R0Y2JpQWdJQ0FnSUNBZ1pXeHpaU0JzWVhOMElEMGdkVzVrWldacGJtVmtPMXh1SUNBZ0lDQWdJQ0IwYUhKdmR5QmxPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMGdiR0Z6ZENBOUlIVnVaR1ZtYVc1bFpEdGNiaUFnSUNCcFppQW9jR0Z5Wlc1MEtTQndZWEpsYm5RdVpXNTBaWElvS1R0Y2JpQWdmVHRjYmx4dUlDQXZMeUJPYjJSbExtcHpYRzRnSUdsbUlDaHBjMDV2WkdVcElIdGNiaUFnSUNCdWIzUnBabmtnUFNCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ0lDQndjbTlqWlhOekxtNWxlSFJVYVdOcktHWnNkWE5vS1R0Y2JpQWdJQ0I5TzF4dUlDQXZMeUJpY205M2MyVnljeUIzYVhSb0lFMTFkR0YwYVc5dVQySnpaWEoyWlhJc0lHVjRZMlZ3ZENCcFQxTWdVMkZtWVhKcElDMGdhSFIwY0hNNkx5OW5hWFJvZFdJdVkyOXRMM3BzYjJseWIyTnJMMk52Y21VdGFuTXZhWE56ZFdWekx6TXpPVnh1SUNCOUlHVnNjMlVnYVdZZ0tFOWljMlZ5ZG1WeUlDWW1JQ0VvWjJ4dlltRnNMbTVoZG1sbllYUnZjaUFtSmlCbmJHOWlZV3d1Ym1GMmFXZGhkRzl5TG5OMFlXNWtZV3h2Ym1VcEtTQjdYRzRnSUNBZ2RtRnlJSFJ2WjJkc1pTQTlJSFJ5ZFdVN1hHNGdJQ0FnZG1GeUlHNXZaR1VnUFNCa2IyTjFiV1Z1ZEM1amNtVmhkR1ZVWlhoMFRtOWtaU2duSnlrN1hHNGdJQ0FnYm1WM0lFOWljMlZ5ZG1WeUtHWnNkWE5vS1M1dlluTmxjblpsS0c1dlpHVXNJSHNnWTJoaGNtRmpkR1Z5UkdGMFlUb2dkSEoxWlNCOUtUc2dMeThnWlhOc2FXNTBMV1JwYzJGaWJHVXRiR2x1WlNCdWJ5MXVaWGRjYmlBZ0lDQnViM1JwWm5rZ1BTQm1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdJQ0J1YjJSbExtUmhkR0VnUFNCMGIyZG5iR1VnUFNBaGRHOW5aMnhsTzF4dUlDQWdJSDA3WEc0Z0lDOHZJR1Z1ZG1seWIyNXRaVzUwY3lCM2FYUm9JRzFoZVdKbElHNXZiaTFqYjIxd2JHVjBaV3g1SUdOdmNuSmxZM1FzSUdKMWRDQmxlR2x6ZEdWdWRDQlFjbTl0YVhObFhHNGdJSDBnWld4elpTQnBaaUFvVUhKdmJXbHpaU0FtSmlCUWNtOXRhWE5sTG5KbGMyOXNkbVVwSUh0Y2JpQWdJQ0F2THlCUWNtOXRhWE5sTG5KbGMyOXNkbVVnZDJsMGFHOTFkQ0JoYmlCaGNtZDFiV1Z1ZENCMGFISnZkM01nWVc0Z1pYSnliM0lnYVc0Z1RFY2dWMlZpVDFNZ01seHVJQ0FnSUhaaGNpQndjbTl0YVhObElEMGdVSEp2YldselpTNXlaWE52YkhabEtIVnVaR1ZtYVc1bFpDazdYRzRnSUNBZ2JtOTBhV1o1SUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lDQWdjSEp2YldselpTNTBhR1Z1S0dac2RYTm9LVHRjYmlBZ0lDQjlPMXh1SUNBdkx5Qm1iM0lnYjNSb1pYSWdaVzUyYVhKdmJtMWxiblJ6SUMwZ2JXRmpjbTkwWVhOcklHSmhjMlZrSUc5dU9seHVJQ0F2THlBdElITmxkRWx0YldWa2FXRjBaVnh1SUNBdkx5QXRJRTFsYzNOaFoyVkRhR0Z1Ym1Wc1hHNGdJQzh2SUMwZ2QybHVaRzkzTG5CdmMzUk5aWE56WVdkY2JpQWdMeThnTFNCdmJuSmxZV1I1YzNSaGRHVmphR0Z1WjJWY2JpQWdMeThnTFNCelpYUlVhVzFsYjNWMFhHNGdJSDBnWld4elpTQjdYRzRnSUNBZ2JtOTBhV1o1SUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lDQWdMeThnYzNSeVlXNW5aU0JKUlNBcklIZGxZbkJoWTJzZ1pHVjJJSE5sY25abGNpQmlkV2NnTFNCMWMyVWdMbU5oYkd3b1oyeHZZbUZzS1Z4dUlDQWdJQ0FnYldGamNtOTBZWE5yTG1OaGJHd29aMnh2WW1Gc0xDQm1iSFZ6YUNrN1hHNGdJQ0FnZlR0Y2JpQWdmVnh1WEc0Z0lISmxkSFZ5YmlCbWRXNWpkR2x2YmlBb1ptNHBJSHRjYmlBZ0lDQjJZWElnZEdGemF5QTlJSHNnWm00NklHWnVMQ0J1WlhoME9pQjFibVJsWm1sdVpXUWdmVHRjYmlBZ0lDQnBaaUFvYkdGemRDa2diR0Z6ZEM1dVpYaDBJRDBnZEdGemF6dGNiaUFnSUNCcFppQW9JV2hsWVdRcElIdGNiaUFnSUNBZ0lHaGxZV1FnUFNCMFlYTnJPMXh1SUNBZ0lDQWdibTkwYVdaNUtDazdYRzRnSUNBZ2ZTQnNZWE4wSUQwZ2RHRnphenRjYmlBZ2ZUdGNibjA3WEc0aUxDSW5kWE5sSUhOMGNtbGpkQ2M3WEc0dkx5QXlOUzQwTGpFdU5TQk9aWGRRY205dGFYTmxRMkZ3WVdKcGJHbDBlU2hES1Z4dWRtRnlJR0ZHZFc1amRHbHZiaUE5SUhKbGNYVnBjbVVvSnk0dlgyRXRablZ1WTNScGIyNG5LVHRjYmx4dVpuVnVZM1JwYjI0Z1VISnZiV2x6WlVOaGNHRmlhV3hwZEhrb1F5a2dlMXh1SUNCMllYSWdjbVZ6YjJ4MlpTd2djbVZxWldOME8xeHVJQ0IwYUdsekxuQnliMjFwYzJVZ1BTQnVaWGNnUXlobWRXNWpkR2x2YmlBb0pDUnlaWE52YkhabExDQWtKSEpsYW1WamRDa2dlMXh1SUNBZ0lHbG1JQ2h5WlhOdmJIWmxJQ0U5UFNCMWJtUmxabWx1WldRZ2ZId2djbVZxWldOMElDRTlQU0IxYm1SbFptbHVaV1FwSUhSb2NtOTNJRlI1Y0dWRmNuSnZjaWduUW1Ga0lGQnliMjFwYzJVZ1kyOXVjM1J5ZFdOMGIzSW5LVHRjYmlBZ0lDQnlaWE52YkhabElEMGdKQ1J5WlhOdmJIWmxPMXh1SUNBZ0lISmxhbVZqZENBOUlDUWtjbVZxWldOME8xeHVJQ0I5S1R0Y2JpQWdkR2hwY3k1eVpYTnZiSFpsSUQwZ1lVWjFibU4wYVc5dUtISmxjMjlzZG1VcE8xeHVJQ0IwYUdsekxuSmxhbVZqZENBOUlHRkdkVzVqZEdsdmJpaHlaV3BsWTNRcE8xeHVmVnh1WEc1dGIyUjFiR1V1Wlhod2IzSjBjeTVtSUQwZ1puVnVZM1JwYjI0Z0tFTXBJSHRjYmlBZ2NtVjBkWEp1SUc1bGR5QlFjbTl0YVhObFEyRndZV0pwYkdsMGVTaERLVHRjYm4wN1hHNGlMQ0l2THlBeE9TNHhMakl1TWlBdklERTFMakl1TXk0MUlFOWlhbVZqZEM1amNtVmhkR1VvVHlCYkxDQlFjbTl3WlhKMGFXVnpYU2xjYm5aaGNpQmhiazlpYW1WamRDQTlJSEpsY1hWcGNtVW9KeTR2WDJGdUxXOWlhbVZqZENjcE8xeHVkbUZ5SUdSUWN5QTlJSEpsY1hWcGNtVW9KeTR2WDI5aWFtVmpkQzFrY0hNbktUdGNiblpoY2lCbGJuVnRRblZuUzJWNWN5QTlJSEpsY1hWcGNtVW9KeTR2WDJWdWRXMHRZblZuTFd0bGVYTW5LVHRjYm5aaGNpQkpSVjlRVWs5VVR5QTlJSEpsY1hWcGNtVW9KeTR2WDNOb1lYSmxaQzFyWlhrbktTZ25TVVZmVUZKUFZFOG5LVHRjYm5aaGNpQkZiWEIwZVNBOUlHWjFibU4wYVc5dUlDZ3BJSHNnTHlvZ1pXMXdkSGtnS2k4Z2ZUdGNiblpoY2lCUVVrOVVUMVJaVUVVZ1BTQW5jSEp2ZEc5MGVYQmxKenRjYmx4dUx5OGdRM0psWVhSbElHOWlhbVZqZENCM2FYUm9JR1poYTJVZ1lHNTFiR3hnSUhCeWIzUnZkSGx3WlRvZ2RYTmxJR2xtY21GdFpTQlBZbXBsWTNRZ2QybDBhQ0JqYkdWaGNtVmtJSEJ5YjNSdmRIbHdaVnh1ZG1GeUlHTnlaV0YwWlVScFkzUWdQU0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJQzh2SUZSb2NtRnphQ3dnZDJGemRHVWdZVzVrSUhOdlpHOXRlVG9nU1VVZ1IwTWdZblZuWEc0Z0lIWmhjaUJwWm5KaGJXVWdQU0J5WlhGMWFYSmxLQ2N1TDE5a2IyMHRZM0psWVhSbEp5a29KMmxtY21GdFpTY3BPMXh1SUNCMllYSWdhU0E5SUdWdWRXMUNkV2RMWlhsekxteGxibWQwYUR0Y2JpQWdkbUZ5SUd4MElEMGdKenduTzF4dUlDQjJZWElnWjNRZ1BTQW5QaWM3WEc0Z0lIWmhjaUJwWm5KaGJXVkViMk4xYldWdWREdGNiaUFnYVdaeVlXMWxMbk4wZVd4bExtUnBjM0JzWVhrZ1BTQW5ibTl1WlNjN1hHNGdJSEpsY1hWcGNtVW9KeTR2WDJoMGJXd25LUzVoY0hCbGJtUkRhR2xzWkNocFpuSmhiV1VwTzF4dUlDQnBabkpoYldVdWMzSmpJRDBnSjJwaGRtRnpZM0pwY0hRNkp6c2dMeThnWlhOc2FXNTBMV1JwYzJGaWJHVXRiR2x1WlNCdWJ5MXpZM0pwY0hRdGRYSnNYRzRnSUM4dklHTnlaV0YwWlVScFkzUWdQU0JwWm5KaGJXVXVZMjl1ZEdWdWRGZHBibVJ2ZHk1UFltcGxZM1E3WEc0Z0lDOHZJR2gwYld3dWNtVnRiM1psUTJocGJHUW9hV1p5WVcxbEtUdGNiaUFnYVdaeVlXMWxSRzlqZFcxbGJuUWdQU0JwWm5KaGJXVXVZMjl1ZEdWdWRGZHBibVJ2ZHk1a2IyTjFiV1Z1ZER0Y2JpQWdhV1p5WVcxbFJHOWpkVzFsYm5RdWIzQmxiaWdwTzF4dUlDQnBabkpoYldWRWIyTjFiV1Z1ZEM1M2NtbDBaU2hzZENBcklDZHpZM0pwY0hRbklDc2daM1FnS3lBblpHOWpkVzFsYm5RdVJqMVBZbXBsWTNRbklDc2diSFFnS3lBbkwzTmpjbWx3ZENjZ0t5Qm5kQ2s3WEc0Z0lHbG1jbUZ0WlVSdlkzVnRaVzUwTG1Oc2IzTmxLQ2s3WEc0Z0lHTnlaV0YwWlVScFkzUWdQU0JwWm5KaGJXVkViMk4xYldWdWRDNUdPMXh1SUNCM2FHbHNaU0FvYVMwdEtTQmtaV3hsZEdVZ1kzSmxZWFJsUkdsamRGdFFVazlVVDFSWlVFVmRXMlZ1ZFcxQ2RXZExaWGx6VzJsZFhUdGNiaUFnY21WMGRYSnVJR055WldGMFpVUnBZM1FvS1R0Y2JuMDdYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnVDJKcVpXTjBMbU55WldGMFpTQjhmQ0JtZFc1amRHbHZiaUJqY21WaGRHVW9UeXdnVUhKdmNHVnlkR2xsY3lrZ2UxeHVJQ0IyWVhJZ2NtVnpkV3gwTzF4dUlDQnBaaUFvVHlBaFBUMGdiblZzYkNrZ2UxeHVJQ0FnSUVWdGNIUjVXMUJTVDFSUFZGbFFSVjBnUFNCaGJrOWlhbVZqZENoUEtUdGNiaUFnSUNCeVpYTjFiSFFnUFNCdVpYY2dSVzF3ZEhrb0tUdGNiaUFnSUNCRmJYQjBlVnRRVWs5VVQxUlpVRVZkSUQwZ2JuVnNiRHRjYmlBZ0lDQXZMeUJoWkdRZ1hDSmZYM0J5YjNSdlgxOWNJaUJtYjNJZ1QySnFaV04wTG1kbGRGQnliM1J2ZEhsd1pVOW1JSEJ2YkhsbWFXeHNYRzRnSUNBZ2NtVnpkV3gwVzBsRlgxQlNUMVJQWFNBOUlFODdYRzRnSUgwZ1pXeHpaU0J5WlhOMWJIUWdQU0JqY21WaGRHVkVhV04wS0NrN1hHNGdJSEpsZEhWeWJpQlFjbTl3WlhKMGFXVnpJRDA5UFNCMWJtUmxabWx1WldRZ1B5QnlaWE4xYkhRZ09pQmtVSE1vY21WemRXeDBMQ0JRY205d1pYSjBhV1Z6S1R0Y2JuMDdYRzRpTENKMllYSWdZVzVQWW1wbFkzUWdQU0J5WlhGMWFYSmxLQ2N1TDE5aGJpMXZZbXBsWTNRbktUdGNiblpoY2lCSlJUaGZSRTlOWDBSRlJrbE9SU0E5SUhKbGNYVnBjbVVvSnk0dlgybGxPQzFrYjIwdFpHVm1hVzVsSnlrN1hHNTJZWElnZEc5UWNtbHRhWFJwZG1VZ1BTQnlaWEYxYVhKbEtDY3VMMTkwYnkxd2NtbHRhWFJwZG1VbktUdGNiblpoY2lCa1VDQTlJRTlpYW1WamRDNWtaV1pwYm1WUWNtOXdaWEowZVR0Y2JseHVaWGh3YjNKMGN5NW1JRDBnY21WeGRXbHlaU2duTGk5ZlpHVnpZM0pwY0hSdmNuTW5LU0EvSUU5aWFtVmpkQzVrWldacGJtVlFjbTl3WlhKMGVTQTZJR1oxYm1OMGFXOXVJR1JsWm1sdVpWQnliM0JsY25SNUtFOHNJRkFzSUVGMGRISnBZblYwWlhNcElIdGNiaUFnWVc1UFltcGxZM1FvVHlrN1hHNGdJRkFnUFNCMGIxQnlhVzFwZEdsMlpTaFFMQ0IwY25WbEtUdGNiaUFnWVc1UFltcGxZM1FvUVhSMGNtbGlkWFJsY3lrN1hHNGdJR2xtSUNoSlJUaGZSRTlOWDBSRlJrbE9SU2tnZEhKNUlIdGNiaUFnSUNCeVpYUjFjbTRnWkZBb1R5d2dVQ3dnUVhSMGNtbGlkWFJsY3lrN1hHNGdJSDBnWTJGMFkyZ2dLR1VwSUhzZ0x5b2daVzF3ZEhrZ0tpOGdmVnh1SUNCcFppQW9KMmRsZENjZ2FXNGdRWFIwY21saWRYUmxjeUI4ZkNBbmMyVjBKeUJwYmlCQmRIUnlhV0oxZEdWektTQjBhSEp2ZHlCVWVYQmxSWEp5YjNJb0owRmpZMlZ6YzI5eWN5QnViM1FnYzNWd2NHOXlkR1ZrSVNjcE8xeHVJQ0JwWmlBb0ozWmhiSFZsSnlCcGJpQkJkSFJ5YVdKMWRHVnpLU0JQVzFCZElEMGdRWFIwY21saWRYUmxjeTUyWVd4MVpUdGNiaUFnY21WMGRYSnVJRTg3WEc1OU8xeHVJaXdpZG1GeUlHUlFJRDBnY21WeGRXbHlaU2duTGk5ZmIySnFaV04wTFdSd0p5azdYRzUyWVhJZ1lXNVBZbXBsWTNRZ1BTQnlaWEYxYVhKbEtDY3VMMTloYmkxdlltcGxZM1FuS1R0Y2JuWmhjaUJuWlhSTFpYbHpJRDBnY21WeGRXbHlaU2duTGk5ZmIySnFaV04wTFd0bGVYTW5LVHRjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCeVpYRjFhWEpsS0NjdUwxOWtaWE5qY21sd2RHOXljeWNwSUQ4Z1QySnFaV04wTG1SbFptbHVaVkJ5YjNCbGNuUnBaWE1nT2lCbWRXNWpkR2x2YmlCa1pXWnBibVZRY205d1pYSjBhV1Z6S0U4c0lGQnliM0JsY25ScFpYTXBJSHRjYmlBZ1lXNVBZbXBsWTNRb1R5azdYRzRnSUhaaGNpQnJaWGx6SUQwZ1oyVjBTMlY1Y3loUWNtOXdaWEowYVdWektUdGNiaUFnZG1GeUlHeGxibWQwYUNBOUlHdGxlWE11YkdWdVozUm9PMXh1SUNCMllYSWdhU0E5SURBN1hHNGdJSFpoY2lCUU8xeHVJQ0IzYUdsc1pTQW9iR1Z1WjNSb0lENGdhU2tnWkZBdVppaFBMQ0JRSUQwZ2EyVjVjMXRwS3l0ZExDQlFjbTl3WlhKMGFXVnpXMUJkS1R0Y2JpQWdjbVYwZFhKdUlFODdYRzU5TzF4dUlpd2lMeThnTVRrdU1TNHlMamtnTHlBeE5TNHlMak11TWlCUFltcGxZM1F1WjJWMFVISnZkRzkwZVhCbFQyWW9UeWxjYm5aaGNpQm9ZWE1nUFNCeVpYRjFhWEpsS0NjdUwxOW9ZWE1uS1R0Y2JuWmhjaUIwYjA5aWFtVmpkQ0E5SUhKbGNYVnBjbVVvSnk0dlgzUnZMVzlpYW1WamRDY3BPMXh1ZG1GeUlFbEZYMUJTVDFSUElEMGdjbVZ4ZFdseVpTZ25MaTlmYzJoaGNtVmtMV3RsZVNjcEtDZEpSVjlRVWs5VVR5Y3BPMXh1ZG1GeUlFOWlhbVZqZEZCeWIzUnZJRDBnVDJKcVpXTjBMbkJ5YjNSdmRIbHdaVHRjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCUFltcGxZM1F1WjJWMFVISnZkRzkwZVhCbFQyWWdmSHdnWm5WdVkzUnBiMjRnS0U4cElIdGNiaUFnVHlBOUlIUnZUMkpxWldOMEtFOHBPMXh1SUNCcFppQW9hR0Z6S0U4c0lFbEZYMUJTVDFSUEtTa2djbVYwZFhKdUlFOWJTVVZmVUZKUFZFOWRPMXh1SUNCcFppQW9kSGx3Wlc5bUlFOHVZMjl1YzNSeWRXTjBiM0lnUFQwZ0oyWjFibU4wYVc5dUp5QW1KaUJQSUdsdWMzUmhibU5sYjJZZ1R5NWpiMjV6ZEhKMVkzUnZjaWtnZTF4dUlDQWdJSEpsZEhWeWJpQlBMbU52Ym5OMGNuVmpkRzl5TG5CeWIzUnZkSGx3WlR0Y2JpQWdmU0J5WlhSMWNtNGdUeUJwYm5OMFlXNWpaVzltSUU5aWFtVmpkQ0EvSUU5aWFtVmpkRkJ5YjNSdklEb2diblZzYkR0Y2JuMDdYRzRpTENKMllYSWdhR0Z6SUQwZ2NtVnhkV2x5WlNnbkxpOWZhR0Z6SnlrN1hHNTJZWElnZEc5SlQySnFaV04wSUQwZ2NtVnhkV2x5WlNnbkxpOWZkRzh0YVc5aWFtVmpkQ2NwTzF4dWRtRnlJR0Z5Y21GNVNXNWtaWGhQWmlBOUlISmxjWFZwY21Vb0p5NHZYMkZ5Y21GNUxXbHVZMngxWkdWekp5a29abUZzYzJVcE8xeHVkbUZ5SUVsRlgxQlNUMVJQSUQwZ2NtVnhkV2x5WlNnbkxpOWZjMmhoY21Wa0xXdGxlU2NwS0NkSlJWOVFVazlVVHljcE8xeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJQ2h2WW1wbFkzUXNJRzVoYldWektTQjdYRzRnSUhaaGNpQlBJRDBnZEc5SlQySnFaV04wS0c5aWFtVmpkQ2s3WEc0Z0lIWmhjaUJwSUQwZ01EdGNiaUFnZG1GeUlISmxjM1ZzZENBOUlGdGRPMXh1SUNCMllYSWdhMlY1TzF4dUlDQm1iM0lnS0d0bGVTQnBiaUJQS1NCcFppQW9hMlY1SUNFOUlFbEZYMUJTVDFSUEtTQm9ZWE1vVHl3Z2EyVjVLU0FtSmlCeVpYTjFiSFF1Y0hWemFDaHJaWGtwTzF4dUlDQXZMeUJFYjI0bmRDQmxiblZ0SUdKMVp5QW1JR2hwWkdSbGJpQnJaWGx6WEc0Z0lIZG9hV3hsSUNodVlXMWxjeTVzWlc1bmRHZ2dQaUJwS1NCcFppQW9hR0Z6S0U4c0lHdGxlU0E5SUc1aGJXVnpXMmtySzEwcEtTQjdYRzRnSUNBZ2ZtRnljbUY1U1c1a1pYaFBaaWh5WlhOMWJIUXNJR3RsZVNrZ2ZId2djbVZ6ZFd4MExuQjFjMmdvYTJWNUtUdGNiaUFnZlZ4dUlDQnlaWFIxY200Z2NtVnpkV3gwTzF4dWZUdGNiaUlzSWk4dklERTVMakV1TWk0eE5DQXZJREUxTGpJdU15NHhOQ0JQWW1wbFkzUXVhMlY1Y3loUEtWeHVkbUZ5SUNSclpYbHpJRDBnY21WeGRXbHlaU2duTGk5ZmIySnFaV04wTFd0bGVYTXRhVzUwWlhKdVlXd25LVHRjYm5aaGNpQmxiblZ0UW5WblMyVjVjeUE5SUhKbGNYVnBjbVVvSnk0dlgyVnVkVzB0WW5WbkxXdGxlWE1uS1R0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQlBZbXBsWTNRdWEyVjVjeUI4ZkNCbWRXNWpkR2x2YmlCclpYbHpLRThwSUh0Y2JpQWdjbVYwZFhKdUlDUnJaWGx6S0U4c0lHVnVkVzFDZFdkTFpYbHpLVHRjYm4wN1hHNGlMQ0p0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJQ2hsZUdWaktTQjdYRzRnSUhSeWVTQjdYRzRnSUNBZ2NtVjBkWEp1SUhzZ1pUb2dabUZzYzJVc0lIWTZJR1Y0WldNb0tTQjlPMXh1SUNCOUlHTmhkR05vSUNobEtTQjdYRzRnSUNBZ2NtVjBkWEp1SUhzZ1pUb2dkSEoxWlN3Z2Rqb2daU0I5TzF4dUlDQjlYRzU5TzF4dUlpd2lkbUZ5SUdGdVQySnFaV04wSUQwZ2NtVnhkV2x5WlNnbkxpOWZZVzR0YjJKcVpXTjBKeWs3WEc1MllYSWdhWE5QWW1wbFkzUWdQU0J5WlhGMWFYSmxLQ2N1TDE5cGN5MXZZbXBsWTNRbktUdGNiblpoY2lCdVpYZFFjbTl0YVhObFEyRndZV0pwYkdsMGVTQTlJSEpsY1hWcGNtVW9KeTR2WDI1bGR5MXdjbTl0YVhObExXTmhjR0ZpYVd4cGRIa25LVHRjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb1F5d2dlQ2tnZTF4dUlDQmhiazlpYW1WamRDaERLVHRjYmlBZ2FXWWdLR2x6VDJKcVpXTjBLSGdwSUNZbUlIZ3VZMjl1YzNSeWRXTjBiM0lnUFQwOUlFTXBJSEpsZEhWeWJpQjRPMXh1SUNCMllYSWdjSEp2YldselpVTmhjR0ZpYVd4cGRIa2dQU0J1WlhkUWNtOXRhWE5sUTJGd1lXSnBiR2wwZVM1bUtFTXBPMXh1SUNCMllYSWdjbVZ6YjJ4MlpTQTlJSEJ5YjIxcGMyVkRZWEJoWW1sc2FYUjVMbkpsYzI5c2RtVTdYRzRnSUhKbGMyOXNkbVVvZUNrN1hHNGdJSEpsZEhWeWJpQndjbTl0YVhObFEyRndZV0pwYkdsMGVTNXdjbTl0YVhObE8xeHVmVHRjYmlJc0ltMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z0tHSnBkRzFoY0N3Z2RtRnNkV1VwSUh0Y2JpQWdjbVYwZFhKdUlIdGNiaUFnSUNCbGJuVnRaWEpoWW14bE9pQWhLR0pwZEcxaGNDQW1JREVwTEZ4dUlDQWdJR052Ym1acFozVnlZV0pzWlRvZ0lTaGlhWFJ0WVhBZ0ppQXlLU3hjYmlBZ0lDQjNjbWwwWVdKc1pUb2dJU2hpYVhSdFlYQWdKaUEwS1N4Y2JpQWdJQ0IyWVd4MVpUb2dkbUZzZFdWY2JpQWdmVHRjYm4wN1hHNGlMQ0oyWVhJZ2FHbGtaU0E5SUhKbGNYVnBjbVVvSnk0dlgyaHBaR1VuS1R0Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z0tIUmhjbWRsZEN3Z2MzSmpMQ0J6WVdabEtTQjdYRzRnSUdadmNpQW9kbUZ5SUd0bGVTQnBiaUJ6Y21NcElIdGNiaUFnSUNCcFppQW9jMkZtWlNBbUppQjBZWEpuWlhSYmEyVjVYU2tnZEdGeVoyVjBXMnRsZVYwZ1BTQnpjbU5iYTJWNVhUdGNiaUFnSUNCbGJITmxJR2hwWkdVb2RHRnlaMlYwTENCclpYa3NJSE55WTF0clpYbGRLVHRjYmlBZ2ZTQnlaWFIxY200Z2RHRnlaMlYwTzF4dWZUdGNiaUlzSW0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnY21WeGRXbHlaU2duTGk5ZmFHbGtaU2NwTzF4dUlpd2lKM1Z6WlNCemRISnBZM1FuTzF4dWRtRnlJR2RzYjJKaGJDQTlJSEpsY1hWcGNtVW9KeTR2WDJkc2IySmhiQ2NwTzF4dWRtRnlJR052Y21VZ1BTQnlaWEYxYVhKbEtDY3VMMTlqYjNKbEp5azdYRzUyWVhJZ1pGQWdQU0J5WlhGMWFYSmxLQ2N1TDE5dlltcGxZM1F0WkhBbktUdGNiblpoY2lCRVJWTkRVa2xRVkU5U1V5QTlJSEpsY1hWcGNtVW9KeTR2WDJSbGMyTnlhWEIwYjNKekp5azdYRzUyWVhJZ1UxQkZRMGxGVXlBOUlISmxjWFZwY21Vb0p5NHZYM2RyY3ljcEtDZHpjR1ZqYVdWekp5azdYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnS0V0RldTa2dlMXh1SUNCMllYSWdReUE5SUhSNWNHVnZaaUJqYjNKbFcwdEZXVjBnUFQwZ0oyWjFibU4wYVc5dUp5QS9JR052Y21WYlMwVlpYU0E2SUdkc2IySmhiRnRMUlZsZE8xeHVJQ0JwWmlBb1JFVlRRMUpKVUZSUFVsTWdKaVlnUXlBbUppQWhRMXRUVUVWRFNVVlRYU2tnWkZBdVppaERMQ0JUVUVWRFNVVlRMQ0I3WEc0Z0lDQWdZMjl1Wm1sbmRYSmhZbXhsT2lCMGNuVmxMRnh1SUNBZ0lHZGxkRG9nWm5WdVkzUnBiMjRnS0NrZ2V5QnlaWFIxY200Z2RHaHBjenNnZlZ4dUlDQjlLVHRjYm4wN1hHNGlMQ0oyWVhJZ1pHVm1JRDBnY21WeGRXbHlaU2duTGk5ZmIySnFaV04wTFdSd0p5a3VaanRjYm5aaGNpQm9ZWE1nUFNCeVpYRjFhWEpsS0NjdUwxOW9ZWE1uS1R0Y2JuWmhjaUJVUVVjZ1BTQnlaWEYxYVhKbEtDY3VMMTkzYTNNbktTZ25kRzlUZEhKcGJtZFVZV2NuS1R0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQm1kVzVqZEdsdmJpQW9hWFFzSUhSaFp5d2djM1JoZENrZ2UxeHVJQ0JwWmlBb2FYUWdKaVlnSVdoaGN5aHBkQ0E5SUhOMFlYUWdQeUJwZENBNklHbDBMbkJ5YjNSdmRIbHdaU3dnVkVGSEtTa2daR1ZtS0dsMExDQlVRVWNzSUhzZ1kyOXVabWxuZFhKaFlteGxPaUIwY25WbExDQjJZV3gxWlRvZ2RHRm5JSDBwTzF4dWZUdGNiaUlzSW5aaGNpQnphR0Z5WldRZ1BTQnlaWEYxYVhKbEtDY3VMMTl6YUdGeVpXUW5LU2duYTJWNWN5Y3BPMXh1ZG1GeUlIVnBaQ0E5SUhKbGNYVnBjbVVvSnk0dlgzVnBaQ2NwTzF4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb2EyVjVLU0I3WEc0Z0lISmxkSFZ5YmlCemFHRnlaV1JiYTJWNVhTQjhmQ0FvYzJoaGNtVmtXMnRsZVYwZ1BTQjFhV1FvYTJWNUtTazdYRzU5TzF4dUlpd2lkbUZ5SUdOdmNtVWdQU0J5WlhGMWFYSmxLQ2N1TDE5amIzSmxKeWs3WEc1MllYSWdaMnh2WW1Gc0lEMGdjbVZ4ZFdseVpTZ25MaTlmWjJ4dlltRnNKeWs3WEc1MllYSWdVMGhCVWtWRUlEMGdKMTlmWTI5eVpTMXFjMTl6YUdGeVpXUmZYeWM3WEc1MllYSWdjM1J2Y21VZ1BTQm5iRzlpWVd4YlUwaEJVa1ZFWFNCOGZDQW9aMnh2WW1Gc1cxTklRVkpGUkYwZ1BTQjdmU2s3WEc1Y2JpaHRiMlIxYkdVdVpYaHdiM0owY3lBOUlHWjFibU4wYVc5dUlDaHJaWGtzSUhaaGJIVmxLU0I3WEc0Z0lISmxkSFZ5YmlCemRHOXlaVnRyWlhsZElIeDhJQ2h6ZEc5eVpWdHJaWGxkSUQwZ2RtRnNkV1VnSVQwOUlIVnVaR1ZtYVc1bFpDQS9JSFpoYkhWbElEb2dlMzBwTzF4dWZTa29KM1psY25OcGIyNXpKeXdnVzEwcExuQjFjMmdvZTF4dUlDQjJaWEp6YVc5dU9pQmpiM0psTG5abGNuTnBiMjRzWEc0Z0lHMXZaR1U2SUhKbGNYVnBjbVVvSnk0dlgyeHBZbkpoY25rbktTQS9JQ2R3ZFhKbEp5QTZJQ2RuYkc5aVlXd25MRnh1SUNCamIzQjVjbWxuYUhRNklDZkNxU0F5TURFNUlFUmxibWx6SUZCMWMyaHJZWEpsZGlBb2VteHZhWEp2WTJzdWNuVXBKMXh1ZlNrN1hHNGlMQ0l2THlBM0xqTXVNakFnVTNCbFkybGxjME52Ym5OMGNuVmpkRzl5S0U4c0lHUmxabUYxYkhSRGIyNXpkSEoxWTNSdmNpbGNiblpoY2lCaGJrOWlhbVZqZENBOUlISmxjWFZwY21Vb0p5NHZYMkZ1TFc5aWFtVmpkQ2NwTzF4dWRtRnlJR0ZHZFc1amRHbHZiaUE5SUhKbGNYVnBjbVVvSnk0dlgyRXRablZ1WTNScGIyNG5LVHRjYm5aaGNpQlRVRVZEU1VWVElEMGdjbVZ4ZFdseVpTZ25MaTlmZDJ0ekp5a29KM053WldOcFpYTW5LVHRjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnS0U4c0lFUXBJSHRjYmlBZ2RtRnlJRU1nUFNCaGJrOWlhbVZqZENoUEtTNWpiMjV6ZEhKMVkzUnZjanRjYmlBZ2RtRnlJRk03WEc0Z0lISmxkSFZ5YmlCRElEMDlQU0IxYm1SbFptbHVaV1FnZkh3Z0tGTWdQU0JoYms5aWFtVmpkQ2hES1Z0VFVFVkRTVVZUWFNrZ1BUMGdkVzVrWldacGJtVmtJRDhnUkNBNklHRkdkVzVqZEdsdmJpaFRLVHRjYm4wN1hHNGlMQ0oyWVhJZ2RHOUpiblJsWjJWeUlEMGdjbVZ4ZFdseVpTZ25MaTlmZEc4dGFXNTBaV2RsY2ljcE8xeHVkbUZ5SUdSbFptbHVaV1FnUFNCeVpYRjFhWEpsS0NjdUwxOWtaV1pwYm1Wa0p5azdYRzR2THlCMGNuVmxJQ0F0UGlCVGRISnBibWNqWVhSY2JpOHZJR1poYkhObElDMCtJRk4wY21sdVp5TmpiMlJsVUc5cGJuUkJkRnh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUFvVkU5ZlUxUlNTVTVIS1NCN1hHNGdJSEpsZEhWeWJpQm1kVzVqZEdsdmJpQW9kR2hoZEN3Z2NHOXpLU0I3WEc0Z0lDQWdkbUZ5SUhNZ1BTQlRkSEpwYm1jb1pHVm1hVzVsWkNoMGFHRjBLU2s3WEc0Z0lDQWdkbUZ5SUdrZ1BTQjBiMGx1ZEdWblpYSW9jRzl6S1R0Y2JpQWdJQ0IyWVhJZ2JDQTlJSE11YkdWdVozUm9PMXh1SUNBZ0lIWmhjaUJoTENCaU8xeHVJQ0FnSUdsbUlDaHBJRHdnTUNCOGZDQnBJRDQ5SUd3cElISmxkSFZ5YmlCVVQxOVRWRkpKVGtjZ1B5QW5KeUE2SUhWdVpHVm1hVzVsWkR0Y2JpQWdJQ0JoSUQwZ2N5NWphR0Z5UTI5a1pVRjBLR2twTzF4dUlDQWdJSEpsZEhWeWJpQmhJRHdnTUhoa09EQXdJSHg4SUdFZ1BpQXdlR1JpWm1ZZ2ZId2dhU0FySURFZ1BUMDlJR3dnZkh3Z0tHSWdQU0J6TG1Ob1lYSkRiMlJsUVhRb2FTQXJJREVwS1NBOElEQjRaR013TUNCOGZDQmlJRDRnTUhoa1ptWm1YRzRnSUNBZ0lDQS9JRlJQWDFOVVVrbE9SeUEvSUhNdVkyaGhja0YwS0drcElEb2dZVnh1SUNBZ0lDQWdPaUJVVDE5VFZGSkpUa2NnUHlCekxuTnNhV05sS0drc0lHa2dLeUF5S1NBNklDaGhJQzBnTUhoa09EQXdJRHc4SURFd0tTQXJJQ2hpSUMwZ01IaGtZekF3S1NBcklEQjRNVEF3TURBN1hHNGdJSDA3WEc1OU8xeHVJaXdpZG1GeUlHTjBlQ0E5SUhKbGNYVnBjbVVvSnk0dlgyTjBlQ2NwTzF4dWRtRnlJR2x1ZG05clpTQTlJSEpsY1hWcGNtVW9KeTR2WDJsdWRtOXJaU2NwTzF4dWRtRnlJR2gwYld3Z1BTQnlaWEYxYVhKbEtDY3VMMTlvZEcxc0p5azdYRzUyWVhJZ1kyVnNJRDBnY21WeGRXbHlaU2duTGk5ZlpHOXRMV055WldGMFpTY3BPMXh1ZG1GeUlHZHNiMkpoYkNBOUlISmxjWFZwY21Vb0p5NHZYMmRzYjJKaGJDY3BPMXh1ZG1GeUlIQnliMk5sYzNNZ1BTQm5iRzlpWVd3dWNISnZZMlZ6Y3p0Y2JuWmhjaUJ6WlhSVVlYTnJJRDBnWjJ4dlltRnNMbk5sZEVsdGJXVmthV0YwWlR0Y2JuWmhjaUJqYkdWaGNsUmhjMnNnUFNCbmJHOWlZV3d1WTJ4bFlYSkpiVzFsWkdsaGRHVTdYRzUyWVhJZ1RXVnpjMkZuWlVOb1lXNXVaV3dnUFNCbmJHOWlZV3d1VFdWemMyRm5aVU5vWVc1dVpXdzdYRzUyWVhJZ1JHbHpjR0YwWTJnZ1BTQm5iRzlpWVd3dVJHbHpjR0YwWTJnN1hHNTJZWElnWTI5MWJuUmxjaUE5SURBN1hHNTJZWElnY1hWbGRXVWdQU0I3ZlR0Y2JuWmhjaUJQVGxKRlFVUlpVMVJCVkVWRFNFRk9SMFVnUFNBbmIyNXlaV0ZrZVhOMFlYUmxZMmhoYm1kbEp6dGNiblpoY2lCa1pXWmxjaXdnWTJoaGJtNWxiQ3dnY0c5eWREdGNiblpoY2lCeWRXNGdQU0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJSFpoY2lCcFpDQTlJQ3QwYUdsek8xeHVJQ0F2THlCbGMyeHBiblF0WkdsellXSnNaUzF1WlhoMExXeHBibVVnYm04dGNISnZkRzkwZVhCbExXSjFhV3gwYVc1elhHNGdJR2xtSUNoeGRXVjFaUzVvWVhOUGQyNVFjbTl3WlhKMGVTaHBaQ2twSUh0Y2JpQWdJQ0IyWVhJZ1ptNGdQU0J4ZFdWMVpWdHBaRjA3WEc0Z0lDQWdaR1ZzWlhSbElIRjFaWFZsVzJsa1hUdGNiaUFnSUNCbWJpZ3BPMXh1SUNCOVhHNTlPMXh1ZG1GeUlHeHBjM1JsYm1WeUlEMGdablZ1WTNScGIyNGdLR1YyWlc1MEtTQjdYRzRnSUhKMWJpNWpZV3hzS0dWMlpXNTBMbVJoZEdFcE8xeHVmVHRjYmk4dklFNXZaR1V1YW5NZ01DNDVLeUFtSUVsRk1UQXJJR2hoY3lCelpYUkpiVzFsWkdsaGRHVXNJRzkwYUdWeWQybHpaVHBjYm1sbUlDZ2hjMlYwVkdGemF5QjhmQ0FoWTJ4bFlYSlVZWE5yS1NCN1hHNGdJSE5sZEZSaGMyc2dQU0JtZFc1amRHbHZiaUJ6WlhSSmJXMWxaR2xoZEdVb1ptNHBJSHRjYmlBZ0lDQjJZWElnWVhKbmN5QTlJRnRkTzF4dUlDQWdJSFpoY2lCcElEMGdNVHRjYmlBZ0lDQjNhR2xzWlNBb1lYSm5kVzFsYm5SekxteGxibWQwYUNBK0lHa3BJR0Z5WjNNdWNIVnphQ2hoY21kMWJXVnVkSE5iYVNzclhTazdYRzRnSUNBZ2NYVmxkV1ZiS3l0amIzVnVkR1Z5WFNBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ0lDQWdJQzh2SUdWemJHbHVkQzFrYVhOaFlteGxMVzVsZUhRdGJHbHVaU0J1YnkxdVpYY3RablZ1WTF4dUlDQWdJQ0FnYVc1MmIydGxLSFI1Y0dWdlppQm1iaUE5UFNBblpuVnVZM1JwYjI0bklEOGdabTRnT2lCR2RXNWpkR2x2YmlobWJpa3NJR0Z5WjNNcE8xeHVJQ0FnSUgwN1hHNGdJQ0FnWkdWbVpYSW9ZMjkxYm5SbGNpazdYRzRnSUNBZ2NtVjBkWEp1SUdOdmRXNTBaWEk3WEc0Z0lIMDdYRzRnSUdOc1pXRnlWR0Z6YXlBOUlHWjFibU4wYVc5dUlHTnNaV0Z5U1cxdFpXUnBZWFJsS0dsa0tTQjdYRzRnSUNBZ1pHVnNaWFJsSUhGMVpYVmxXMmxrWFR0Y2JpQWdmVHRjYmlBZ0x5OGdUbTlrWlM1cWN5QXdMamd0WEc0Z0lHbG1JQ2h5WlhGMWFYSmxLQ2N1TDE5amIyWW5LU2h3Y205alpYTnpLU0E5UFNBbmNISnZZMlZ6Y3ljcElIdGNiaUFnSUNCa1pXWmxjaUE5SUdaMWJtTjBhVzl1SUNocFpDa2dlMXh1SUNBZ0lDQWdjSEp2WTJWemN5NXVaWGgwVkdsamF5aGpkSGdvY25WdUxDQnBaQ3dnTVNrcE8xeHVJQ0FnSUgwN1hHNGdJQzh2SUZOd2FHVnlaU0FvU2xNZ1oyRnRaU0JsYm1kcGJtVXBJRVJwYzNCaGRHTm9JRUZRU1Z4dUlDQjlJR1ZzYzJVZ2FXWWdLRVJwYzNCaGRHTm9JQ1ltSUVScGMzQmhkR05vTG01dmR5a2dlMXh1SUNBZ0lHUmxabVZ5SUQwZ1puVnVZM1JwYjI0Z0tHbGtLU0I3WEc0Z0lDQWdJQ0JFYVhOd1lYUmphQzV1YjNjb1kzUjRLSEoxYml3Z2FXUXNJREVwS1R0Y2JpQWdJQ0I5TzF4dUlDQXZMeUJDY205M2MyVnljeUIzYVhSb0lFMWxjM05oWjJWRGFHRnVibVZzTENCcGJtTnNkV1JsY3lCWFpXSlhiM0pyWlhKelhHNGdJSDBnWld4elpTQnBaaUFvVFdWemMyRm5aVU5vWVc1dVpXd3BJSHRjYmlBZ0lDQmphR0Z1Ym1Wc0lEMGdibVYzSUUxbGMzTmhaMlZEYUdGdWJtVnNLQ2s3WEc0Z0lDQWdjRzl5ZENBOUlHTm9ZVzV1Wld3dWNHOXlkREk3WEc0Z0lDQWdZMmhoYm01bGJDNXdiM0owTVM1dmJtMWxjM05oWjJVZ1BTQnNhWE4wWlc1bGNqdGNiaUFnSUNCa1pXWmxjaUE5SUdOMGVDaHdiM0owTG5CdmMzUk5aWE56WVdkbExDQndiM0owTENBeEtUdGNiaUFnTHk4Z1FuSnZkM05sY25NZ2QybDBhQ0J3YjNOMFRXVnpjMkZuWlN3Z2MydHBjQ0JYWldKWGIzSnJaWEp6WEc0Z0lDOHZJRWxGT0NCb1lYTWdjRzl6ZEUxbGMzTmhaMlVzSUdKMWRDQnBkQ2R6SUhONWJtTWdKaUIwZVhCbGIyWWdhWFJ6SUhCdmMzUk5aWE56WVdkbElHbHpJQ2R2WW1wbFkzUW5YRzRnSUgwZ1pXeHpaU0JwWmlBb1oyeHZZbUZzTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElnSmlZZ2RIbHdaVzltSUhCdmMzUk5aWE56WVdkbElEMDlJQ2RtZFc1amRHbHZiaWNnSmlZZ0lXZHNiMkpoYkM1cGJYQnZjblJUWTNKcGNIUnpLU0I3WEc0Z0lDQWdaR1ZtWlhJZ1BTQm1kVzVqZEdsdmJpQW9hV1FwSUh0Y2JpQWdJQ0FnSUdkc2IySmhiQzV3YjNOMFRXVnpjMkZuWlNocFpDQXJJQ2NuTENBbktpY3BPMXh1SUNBZ0lIMDdYRzRnSUNBZ1oyeHZZbUZzTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjIxbGMzTmhaMlVuTENCc2FYTjBaVzVsY2l3Z1ptRnNjMlVwTzF4dUlDQXZMeUJKUlRndFhHNGdJSDBnWld4elpTQnBaaUFvVDA1U1JVRkVXVk5VUVZSRlEwaEJUa2RGSUdsdUlHTmxiQ2duYzJOeWFYQjBKeWtwSUh0Y2JpQWdJQ0JrWldabGNpQTlJR1oxYm1OMGFXOXVJQ2hwWkNrZ2UxeHVJQ0FnSUNBZ2FIUnRiQzVoY0hCbGJtUkRhR2xzWkNoalpXd29KM05qY21sd2RDY3BLVnRQVGxKRlFVUlpVMVJCVkVWRFNFRk9SMFZkSUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lDQWdJQ0JvZEcxc0xuSmxiVzkyWlVOb2FXeGtLSFJvYVhNcE8xeHVJQ0FnSUNBZ0lDQnlkVzR1WTJGc2JDaHBaQ2s3WEc0Z0lDQWdJQ0I5TzF4dUlDQWdJSDA3WEc0Z0lDOHZJRkpsYzNRZ2IyeGtJR0p5YjNkelpYSnpYRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdaR1ZtWlhJZ1BTQm1kVzVqZEdsdmJpQW9hV1FwSUh0Y2JpQWdJQ0FnSUhObGRGUnBiV1Z2ZFhRb1kzUjRLSEoxYml3Z2FXUXNJREVwTENBd0tUdGNiaUFnSUNCOU8xeHVJQ0I5WEc1OVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlIdGNiaUFnYzJWME9pQnpaWFJVWVhOckxGeHVJQ0JqYkdWaGNqb2dZMnhsWVhKVVlYTnJYRzU5TzF4dUlpd2lkbUZ5SUhSdlNXNTBaV2RsY2lBOUlISmxjWFZwY21Vb0p5NHZYM1J2TFdsdWRHVm5aWEluS1R0Y2JuWmhjaUJ0WVhnZ1BTQk5ZWFJvTG0xaGVEdGNiblpoY2lCdGFXNGdQU0JOWVhSb0xtMXBianRjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnS0dsdVpHVjRMQ0JzWlc1bmRHZ3BJSHRjYmlBZ2FXNWtaWGdnUFNCMGIwbHVkR1ZuWlhJb2FXNWtaWGdwTzF4dUlDQnlaWFIxY200Z2FXNWtaWGdnUENBd0lEOGdiV0Y0S0dsdVpHVjRJQ3NnYkdWdVozUm9MQ0F3S1NBNklHMXBiaWhwYm1SbGVDd2diR1Z1WjNSb0tUdGNibjA3WEc0aUxDSXZMeUEzTGpFdU5DQlViMGx1ZEdWblpYSmNiblpoY2lCalpXbHNJRDBnVFdGMGFDNWpaV2xzTzF4dWRtRnlJR1pzYjI5eUlEMGdUV0YwYUM1bWJHOXZjanRjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnWm5WdVkzUnBiMjRnS0dsMEtTQjdYRzRnSUhKbGRIVnliaUJwYzA1aFRpaHBkQ0E5SUN0cGRDa2dQeUF3SURvZ0tHbDBJRDRnTUNBL0lHWnNiMjl5SURvZ1kyVnBiQ2tvYVhRcE8xeHVmVHRjYmlJc0lpOHZJSFJ2SUdsdVpHVjRaV1FnYjJKcVpXTjBMQ0IwYjA5aWFtVmpkQ0IzYVhSb0lHWmhiR3hpWVdOcklHWnZjaUJ1YjI0dFlYSnlZWGt0YkdsclpTQkZVek1nYzNSeWFXNW5jMXh1ZG1GeUlFbFBZbXBsWTNRZ1BTQnlaWEYxYVhKbEtDY3VMMTlwYjJKcVpXTjBKeWs3WEc1MllYSWdaR1ZtYVc1bFpDQTlJSEpsY1hWcGNtVW9KeTR2WDJSbFptbHVaV1FuS1R0Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1puVnVZM1JwYjI0Z0tHbDBLU0I3WEc0Z0lISmxkSFZ5YmlCSlQySnFaV04wS0dSbFptbHVaV1FvYVhRcEtUdGNibjA3WEc0aUxDSXZMeUEzTGpFdU1UVWdWRzlNWlc1bmRHaGNiblpoY2lCMGIwbHVkR1ZuWlhJZ1BTQnlaWEYxYVhKbEtDY3VMMTkwYnkxcGJuUmxaMlZ5SnlrN1hHNTJZWElnYldsdUlEMGdUV0YwYUM1dGFXNDdYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJQ2hwZENrZ2UxeHVJQ0J5WlhSMWNtNGdhWFFnUGlBd0lEOGdiV2x1S0hSdlNXNTBaV2RsY2locGRDa3NJREI0TVdabVptWm1abVptWm1abVptWXBJRG9nTURzZ0x5OGdjRzkzS0RJc0lEVXpLU0F0SURFZ1BUMGdPVEF3TnpFNU9USTFORGMwTURrNU1WeHVmVHRjYmlJc0lpOHZJRGN1TVM0eE15QlViMDlpYW1WamRDaGhjbWQxYldWdWRDbGNiblpoY2lCa1pXWnBibVZrSUQwZ2NtVnhkV2x5WlNnbkxpOWZaR1ZtYVc1bFpDY3BPMXh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JtZFc1amRHbHZiaUFvYVhRcElIdGNiaUFnY21WMGRYSnVJRTlpYW1WamRDaGtaV1pwYm1Wa0tHbDBLU2s3WEc1OU8xeHVJaXdpTHk4Z055NHhMakVnVkc5UWNtbHRhWFJwZG1Vb2FXNXdkWFFnV3l3Z1VISmxabVZ5Y21Wa1ZIbHdaVjBwWEc1MllYSWdhWE5QWW1wbFkzUWdQU0J5WlhGMWFYSmxLQ2N1TDE5cGN5MXZZbXBsWTNRbktUdGNiaTh2SUdsdWMzUmxZV1FnYjJZZ2RHaGxJRVZUTmlCemNHVmpJSFpsY25OcGIyNHNJSGRsSUdScFpHNG5kQ0JwYlhCc1pXMWxiblFnUUVCMGIxQnlhVzFwZEdsMlpTQmpZWE5sWEc0dkx5QmhibVFnZEdobElITmxZMjl1WkNCaGNtZDFiV1Z1ZENBdElHWnNZV2NnTFNCd2NtVm1aWEp5WldRZ2RIbHdaU0JwY3lCaElITjBjbWx1WjF4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb2FYUXNJRk1wSUh0Y2JpQWdhV1lnS0NGcGMwOWlhbVZqZENocGRDa3BJSEpsZEhWeWJpQnBkRHRjYmlBZ2RtRnlJR1p1TENCMllXdzdYRzRnSUdsbUlDaFRJQ1ltSUhSNWNHVnZaaUFvWm00Z1BTQnBkQzUwYjFOMGNtbHVaeWtnUFQwZ0oyWjFibU4wYVc5dUp5QW1KaUFoYVhOUFltcGxZM1FvZG1Gc0lEMGdabTR1WTJGc2JDaHBkQ2twS1NCeVpYUjFjbTRnZG1Gc08xeHVJQ0JwWmlBb2RIbHdaVzltSUNobWJpQTlJR2wwTG5aaGJIVmxUMllwSUQwOUlDZG1kVzVqZEdsdmJpY2dKaVlnSVdselQySnFaV04wS0haaGJDQTlJR1p1TG1OaGJHd29hWFFwS1NrZ2NtVjBkWEp1SUhaaGJEdGNiaUFnYVdZZ0tDRlRJQ1ltSUhSNWNHVnZaaUFvWm00Z1BTQnBkQzUwYjFOMGNtbHVaeWtnUFQwZ0oyWjFibU4wYVc5dUp5QW1KaUFoYVhOUFltcGxZM1FvZG1Gc0lEMGdabTR1WTJGc2JDaHBkQ2twS1NCeVpYUjFjbTRnZG1Gc08xeHVJQ0IwYUhKdmR5QlVlWEJsUlhKeWIzSW9YQ0pEWVc0bmRDQmpiMjUyWlhKMElHOWlhbVZqZENCMGJ5QndjbWx0YVhScGRtVWdkbUZzZFdWY0lpazdYRzU5TzF4dUlpd2lkbUZ5SUdsa0lEMGdNRHRjYm5aaGNpQndlQ0E5SUUxaGRHZ3VjbUZ1Wkc5dEtDazdYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJR1oxYm1OMGFXOXVJQ2hyWlhrcElIdGNiaUFnY21WMGRYSnVJQ2RUZVcxaWIyd29KeTVqYjI1allYUW9hMlY1SUQwOVBTQjFibVJsWm1sdVpXUWdQeUFuSnlBNklHdGxlU3dnSnlsZkp5d2dLQ3NyYVdRZ0t5QndlQ2t1ZEc5VGRISnBibWNvTXpZcEtUdGNibjA3WEc0aUxDSjJZWElnWjJ4dlltRnNJRDBnY21WeGRXbHlaU2duTGk5ZloyeHZZbUZzSnlrN1hHNTJZWElnYm1GMmFXZGhkRzl5SUQwZ1oyeHZZbUZzTG01aGRtbG5ZWFJ2Y2p0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQnVZWFpwWjJGMGIzSWdKaVlnYm1GMmFXZGhkRzl5TG5WelpYSkJaMlZ1ZENCOGZDQW5KenRjYmlJc0luWmhjaUJ6ZEc5eVpTQTlJSEpsY1hWcGNtVW9KeTR2WDNOb1lYSmxaQ2NwS0NkM2EzTW5LVHRjYm5aaGNpQjFhV1FnUFNCeVpYRjFhWEpsS0NjdUwxOTFhV1FuS1R0Y2JuWmhjaUJUZVcxaWIyd2dQU0J5WlhGMWFYSmxLQ2N1TDE5bmJHOWlZV3duS1M1VGVXMWliMnc3WEc1MllYSWdWVk5GWDFOWlRVSlBUQ0E5SUhSNWNHVnZaaUJUZVcxaWIyd2dQVDBnSjJaMWJtTjBhVzl1Snp0Y2JseHVkbUZ5SUNSbGVIQnZjblJ6SUQwZ2JXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbWRXNWpkR2x2YmlBb2JtRnRaU2tnZTF4dUlDQnlaWFIxY200Z2MzUnZjbVZiYm1GdFpWMGdmSHdnS0hOMGIzSmxXMjVoYldWZElEMWNiaUFnSUNCVlUwVmZVMWxOUWs5TUlDWW1JRk41YldKdmJGdHVZVzFsWFNCOGZDQW9WVk5GWDFOWlRVSlBUQ0EvSUZONWJXSnZiQ0E2SUhWcFpDa29KMU41YldKdmJDNG5JQ3NnYm1GdFpTa3BPMXh1ZlR0Y2JseHVKR1Y0Y0c5eWRITXVjM1J2Y21VZ1BTQnpkRzl5WlR0Y2JpSXNJblpoY2lCamJHRnpjMjltSUQwZ2NtVnhkV2x5WlNnbkxpOWZZMnhoYzNOdlppY3BPMXh1ZG1GeUlFbFVSVkpCVkU5U0lEMGdjbVZ4ZFdseVpTZ25MaTlmZDJ0ekp5a29KMmwwWlhKaGRHOXlKeWs3WEc1MllYSWdTWFJsY21GMGIzSnpJRDBnY21WeGRXbHlaU2duTGk5ZmFYUmxjbUYwYjNKekp5azdYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJSEpsY1hWcGNtVW9KeTR2WDJOdmNtVW5LUzVuWlhSSmRHVnlZWFJ2Y2sxbGRHaHZaQ0E5SUdaMWJtTjBhVzl1SUNocGRDa2dlMXh1SUNCcFppQW9hWFFnSVQwZ2RXNWtaV1pwYm1Wa0tTQnlaWFIxY200Z2FYUmJTVlJGVWtGVVQxSmRYRzRnSUNBZ2ZId2dhWFJiSjBCQWFYUmxjbUYwYjNJblhWeHVJQ0FnSUh4OElFbDBaWEpoZEc5eWMxdGpiR0Z6YzI5bUtHbDBLVjA3WEc1OU8xeHVJaXdpZG1GeUlHRnVUMkpxWldOMElEMGdjbVZ4ZFdseVpTZ25MaTlmWVc0dGIySnFaV04wSnlrN1hHNTJZWElnWjJWMElEMGdjbVZ4ZFdseVpTZ25MaTlqYjNKbExtZGxkQzFwZEdWeVlYUnZjaTF0WlhSb2IyUW5LVHRjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnY21WeGRXbHlaU2duTGk5ZlkyOXlaU2NwTG1kbGRFbDBaWEpoZEc5eUlEMGdablZ1WTNScGIyNGdLR2wwS1NCN1hHNGdJSFpoY2lCcGRHVnlSbTRnUFNCblpYUW9hWFFwTzF4dUlDQnBaaUFvZEhsd1pXOW1JR2wwWlhKR2JpQWhQU0FuWm5WdVkzUnBiMjRuS1NCMGFISnZkeUJVZVhCbFJYSnliM0lvYVhRZ0t5QW5JR2x6SUc1dmRDQnBkR1Z5WVdKc1pTRW5LVHRjYmlBZ2NtVjBkWEp1SUdGdVQySnFaV04wS0dsMFpYSkdiaTVqWVd4c0tHbDBLU2s3WEc1OU8xeHVJaXdpZG1GeUlHTnNZWE56YjJZZ1BTQnlaWEYxYVhKbEtDY3VMMTlqYkdGemMyOW1KeWs3WEc1MllYSWdTVlJGVWtGVVQxSWdQU0J5WlhGMWFYSmxLQ2N1TDE5M2EzTW5LU2duYVhSbGNtRjBiM0luS1R0Y2JuWmhjaUJKZEdWeVlYUnZjbk1nUFNCeVpYRjFhWEpsS0NjdUwxOXBkR1Z5WVhSdmNuTW5LVHRjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnY21WeGRXbHlaU2duTGk5ZlkyOXlaU2NwTG1selNYUmxjbUZpYkdVZ1BTQm1kVzVqZEdsdmJpQW9hWFFwSUh0Y2JpQWdkbUZ5SUU4Z1BTQlBZbXBsWTNRb2FYUXBPMXh1SUNCeVpYUjFjbTRnVDF0SlZFVlNRVlJQVWwwZ0lUMDlJSFZ1WkdWbWFXNWxaRnh1SUNBZ0lIeDhJQ2RBUUdsMFpYSmhkRzl5SnlCcGJpQlBYRzRnSUNBZ0x5OGdaWE5zYVc1MExXUnBjMkZpYkdVdGJtVjRkQzFzYVc1bElHNXZMWEJ5YjNSdmRIbHdaUzFpZFdsc2RHbHVjMXh1SUNBZ0lIeDhJRWwwWlhKaGRHOXljeTVvWVhOUGQyNVFjbTl3WlhKMGVTaGpiR0Z6YzI5bUtFOHBLVHRjYm4wN1hHNGlMQ0luZFhObElITjBjbWxqZENjN1hHNTJZWElnWVdSa1ZHOVZibk5qYjNCaFlteGxjeUE5SUhKbGNYVnBjbVVvSnk0dlgyRmtaQzEwYnkxMWJuTmpiM0JoWW14bGN5Y3BPMXh1ZG1GeUlITjBaWEFnUFNCeVpYRjFhWEpsS0NjdUwxOXBkR1Z5TFhOMFpYQW5LVHRjYm5aaGNpQkpkR1Z5WVhSdmNuTWdQU0J5WlhGMWFYSmxLQ2N1TDE5cGRHVnlZWFJ2Y25NbktUdGNiblpoY2lCMGIwbFBZbXBsWTNRZ1BTQnlaWEYxYVhKbEtDY3VMMTkwYnkxcGIySnFaV04wSnlrN1hHNWNiaTh2SURJeUxqRXVNeTQwSUVGeWNtRjVMbkJ5YjNSdmRIbHdaUzVsYm5SeWFXVnpLQ2xjYmk4dklESXlMakV1TXk0eE15QkJjbkpoZVM1d2NtOTBiM1I1Y0dVdWEyVjVjeWdwWEc0dkx5QXlNaTR4TGpNdU1qa2dRWEp5WVhrdWNISnZkRzkwZVhCbExuWmhiSFZsY3lncFhHNHZMeUF5TWk0eExqTXVNekFnUVhKeVlYa3VjSEp2ZEc5MGVYQmxXMEJBYVhSbGNtRjBiM0pkS0NsY2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2NtVnhkV2x5WlNnbkxpOWZhWFJsY2kxa1pXWnBibVVuS1NoQmNuSmhlU3dnSjBGeWNtRjVKeXdnWm5WdVkzUnBiMjRnS0dsMFpYSmhkR1ZrTENCcmFXNWtLU0I3WEc0Z0lIUm9hWE11WDNRZ1BTQjBiMGxQWW1wbFkzUW9hWFJsY21GMFpXUXBPeUF2THlCMFlYSm5aWFJjYmlBZ2RHaHBjeTVmYVNBOUlEQTdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2SUc1bGVIUWdhVzVrWlhoY2JpQWdkR2hwY3k1ZmF5QTlJR3RwYm1RN0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUM4dklHdHBibVJjYmk4dklESXlMakV1TlM0eUxqRWdKVUZ5Y21GNVNYUmxjbUYwYjNKUWNtOTBiM1I1Y0dVbExtNWxlSFFvS1Z4dWZTd2dablZ1WTNScGIyNGdLQ2tnZTF4dUlDQjJZWElnVHlBOUlIUm9hWE11WDNRN1hHNGdJSFpoY2lCcmFXNWtJRDBnZEdocGN5NWZhenRjYmlBZ2RtRnlJR2x1WkdWNElEMGdkR2hwY3k1ZmFTc3JPMXh1SUNCcFppQW9JVThnZkh3Z2FXNWtaWGdnUGowZ1R5NXNaVzVuZEdncElIdGNiaUFnSUNCMGFHbHpMbDkwSUQwZ2RXNWtaV1pwYm1Wa08xeHVJQ0FnSUhKbGRIVnliaUJ6ZEdWd0tERXBPMXh1SUNCOVhHNGdJR2xtSUNocmFXNWtJRDA5SUNkclpYbHpKeWtnY21WMGRYSnVJSE4wWlhBb01Dd2dhVzVrWlhncE8xeHVJQ0JwWmlBb2EybHVaQ0E5UFNBbmRtRnNkV1Z6SnlrZ2NtVjBkWEp1SUhOMFpYQW9NQ3dnVDF0cGJtUmxlRjBwTzF4dUlDQnlaWFIxY200Z2MzUmxjQ2d3TENCYmFXNWtaWGdzSUU5YmFXNWtaWGhkWFNrN1hHNTlMQ0FuZG1Gc2RXVnpKeWs3WEc1Y2JpOHZJR0Z5WjNWdFpXNTBjMHhwYzNSYlFFQnBkR1Z5WVhSdmNsMGdhWE1nSlVGeWNtRjVVSEp2ZEc5ZmRtRnNkV1Z6SlNBb09TNDBMalF1Tml3Z09TNDBMalF1TnlsY2JrbDBaWEpoZEc5eWN5NUJjbWQxYldWdWRITWdQU0JKZEdWeVlYUnZjbk11UVhKeVlYazdYRzVjYm1Ga1pGUnZWVzV6WTI5d1lXSnNaWE1vSjJ0bGVYTW5LVHRjYm1Ga1pGUnZWVzV6WTI5d1lXSnNaWE1vSjNaaGJIVmxjeWNwTzF4dVlXUmtWRzlWYm5OamIzQmhZbXhsY3lnblpXNTBjbWxsY3ljcE8xeHVJaXdpSWl3aUozVnpaU0J6ZEhKcFkzUW5PMXh1ZG1GeUlFeEpRbEpCVWxrZ1BTQnlaWEYxYVhKbEtDY3VMMTlzYVdKeVlYSjVKeWs3WEc1MllYSWdaMnh2WW1Gc0lEMGdjbVZ4ZFdseVpTZ25MaTlmWjJ4dlltRnNKeWs3WEc1MllYSWdZM1I0SUQwZ2NtVnhkV2x5WlNnbkxpOWZZM1I0SnlrN1hHNTJZWElnWTJ4aGMzTnZaaUE5SUhKbGNYVnBjbVVvSnk0dlgyTnNZWE56YjJZbktUdGNiblpoY2lBa1pYaHdiM0owSUQwZ2NtVnhkV2x5WlNnbkxpOWZaWGh3YjNKMEp5azdYRzUyWVhJZ2FYTlBZbXBsWTNRZ1BTQnlaWEYxYVhKbEtDY3VMMTlwY3kxdlltcGxZM1FuS1R0Y2JuWmhjaUJoUm5WdVkzUnBiMjRnUFNCeVpYRjFhWEpsS0NjdUwxOWhMV1oxYm1OMGFXOXVKeWs3WEc1MllYSWdZVzVKYm5OMFlXNWpaU0E5SUhKbGNYVnBjbVVvSnk0dlgyRnVMV2x1YzNSaGJtTmxKeWs3WEc1MllYSWdabTl5VDJZZ1BTQnlaWEYxYVhKbEtDY3VMMTltYjNJdGIyWW5LVHRjYm5aaGNpQnpjR1ZqYVdWelEyOXVjM1J5ZFdOMGIzSWdQU0J5WlhGMWFYSmxLQ2N1TDE5emNHVmphV1Z6TFdOdmJuTjBjblZqZEc5eUp5azdYRzUyWVhJZ2RHRnpheUE5SUhKbGNYVnBjbVVvSnk0dlgzUmhjMnNuS1M1elpYUTdYRzUyWVhJZ2JXbGpjbTkwWVhOcklEMGdjbVZ4ZFdseVpTZ25MaTlmYldsamNtOTBZWE5ySnlrb0tUdGNiblpoY2lCdVpYZFFjbTl0YVhObFEyRndZV0pwYkdsMGVVMXZaSFZzWlNBOUlISmxjWFZwY21Vb0p5NHZYMjVsZHkxd2NtOXRhWE5sTFdOaGNHRmlhV3hwZEhrbktUdGNiblpoY2lCd1pYSm1iM0p0SUQwZ2NtVnhkV2x5WlNnbkxpOWZjR1Z5Wm05eWJTY3BPMXh1ZG1GeUlIVnpaWEpCWjJWdWRDQTlJSEpsY1hWcGNtVW9KeTR2WDNWelpYSXRZV2RsYm5RbktUdGNiblpoY2lCd2NtOXRhWE5sVW1WemIyeDJaU0E5SUhKbGNYVnBjbVVvSnk0dlgzQnliMjFwYzJVdGNtVnpiMngyWlNjcE8xeHVkbUZ5SUZCU1QwMUpVMFVnUFNBblVISnZiV2x6WlNjN1hHNTJZWElnVkhsd1pVVnljbTl5SUQwZ1oyeHZZbUZzTGxSNWNHVkZjbkp2Y2p0Y2JuWmhjaUJ3Y205alpYTnpJRDBnWjJ4dlltRnNMbkJ5YjJObGMzTTdYRzUyWVhJZ2RtVnljMmx2Ym5NZ1BTQndjbTlqWlhOeklDWW1JSEJ5YjJObGMzTXVkbVZ5YzJsdmJuTTdYRzUyWVhJZ2RqZ2dQU0IyWlhKemFXOXVjeUFtSmlCMlpYSnphVzl1Y3k1Mk9DQjhmQ0FuSnp0Y2JuWmhjaUFrVUhKdmJXbHpaU0E5SUdkc2IySmhiRnRRVWs5TlNWTkZYVHRjYm5aaGNpQnBjMDV2WkdVZ1BTQmpiR0Z6YzI5bUtIQnliMk5sYzNNcElEMDlJQ2R3Y205alpYTnpKenRjYm5aaGNpQmxiWEIwZVNBOUlHWjFibU4wYVc5dUlDZ3BJSHNnTHlvZ1pXMXdkSGtnS2k4Z2ZUdGNiblpoY2lCSmJuUmxjbTVoYkN3Z2JtVjNSMlZ1WlhKcFkxQnliMjFwYzJWRFlYQmhZbWxzYVhSNUxDQlBkMjVRY205dGFYTmxRMkZ3WVdKcGJHbDBlU3dnVjNKaGNIQmxjanRjYm5aaGNpQnVaWGRRY205dGFYTmxRMkZ3WVdKcGJHbDBlU0E5SUc1bGQwZGxibVZ5YVdOUWNtOXRhWE5sUTJGd1lXSnBiR2wwZVNBOUlHNWxkMUJ5YjIxcGMyVkRZWEJoWW1sc2FYUjVUVzlrZFd4bExtWTdYRzVjYm5aaGNpQlZVMFZmVGtGVVNWWkZJRDBnSVNGbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUhSeWVTQjdYRzRnSUNBZ0x5OGdZMjl5Y21WamRDQnpkV0pqYkdGemMybHVaeUIzYVhSb0lFQkFjM0JsWTJsbGN5QnpkWEJ3YjNKMFhHNGdJQ0FnZG1GeUlIQnliMjFwYzJVZ1BTQWtVSEp2YldselpTNXlaWE52YkhabEtERXBPMXh1SUNBZ0lIWmhjaUJHWVd0bFVISnZiV2x6WlNBOUlDaHdjbTl0YVhObExtTnZibk4wY25WamRHOXlJRDBnZTMwcFczSmxjWFZwY21Vb0p5NHZYM2RyY3ljcEtDZHpjR1ZqYVdWekp5bGRJRDBnWm5WdVkzUnBiMjRnS0dWNFpXTXBJSHRjYmlBZ0lDQWdJR1Y0WldNb1pXMXdkSGtzSUdWdGNIUjVLVHRjYmlBZ0lDQjlPMXh1SUNBZ0lDOHZJSFZ1YUdGdVpHeGxaQ0J5WldwbFkzUnBiMjV6SUhSeVlXTnJhVzVuSUhOMWNIQnZjblFzSUU1dlpHVktVeUJRY205dGFYTmxJSGRwZEdodmRYUWdhWFFnWm1GcGJITWdRRUJ6Y0dWamFXVnpJSFJsYzNSY2JpQWdJQ0J5WlhSMWNtNGdLR2x6VG05a1pTQjhmQ0IwZVhCbGIyWWdVSEp2YldselpWSmxhbVZqZEdsdmJrVjJaVzUwSUQwOUlDZG1kVzVqZEdsdmJpY3BYRzRnSUNBZ0lDQW1KaUJ3Y205dGFYTmxMblJvWlc0b1pXMXdkSGtwSUdsdWMzUmhibU5sYjJZZ1JtRnJaVkJ5YjIxcGMyVmNiaUFnSUNBZ0lDOHZJSFk0SURZdU5pQW9UbTlrWlNBeE1DQmhibVFnUTJoeWIyMWxJRFkyS1NCb1lYWmxJR0VnWW5WbklIZHBkR2dnY21WemIyeDJhVzVuSUdOMWMzUnZiU0IwYUdWdVlXSnNaWE5jYmlBZ0lDQWdJQzh2SUdoMGRIQnpPaTh2WW5WbmN5NWphSEp2YldsMWJTNXZjbWN2Y0M5amFISnZiV2wxYlM5cGMzTjFaWE12WkdWMFlXbHNQMmxrUFRnek1EVTJOVnh1SUNBZ0lDQWdMeThnZDJVZ1kyRnVKM1FnWkdWMFpXTjBJR2wwSUhONWJtTm9jbTl1YjNWemJIa3NJSE52SUdwMWMzUWdZMmhsWTJzZ2RtVnljMmx2Ym5OY2JpQWdJQ0FnSUNZbUlIWTRMbWx1WkdWNFQyWW9Kell1TmljcElDRTlQU0F3WEc0Z0lDQWdJQ0FtSmlCMWMyVnlRV2RsYm5RdWFXNWtaWGhQWmlnblEyaHliMjFsTHpZMkp5a2dQVDA5SUMweE8xeHVJQ0I5SUdOaGRHTm9JQ2hsS1NCN0lDOHFJR1Z0Y0hSNUlDb3ZJSDFjYm4wb0tUdGNibHh1THk4Z2FHVnNjR1Z5YzF4dWRtRnlJR2x6VkdobGJtRmliR1VnUFNCbWRXNWpkR2x2YmlBb2FYUXBJSHRjYmlBZ2RtRnlJSFJvWlc0N1hHNGdJSEpsZEhWeWJpQnBjMDlpYW1WamRDaHBkQ2tnSmlZZ2RIbHdaVzltSUNoMGFHVnVJRDBnYVhRdWRHaGxiaWtnUFQwZ0oyWjFibU4wYVc5dUp5QS9JSFJvWlc0Z09pQm1ZV3h6WlR0Y2JuMDdYRzUyWVhJZ2JtOTBhV1o1SUQwZ1puVnVZM1JwYjI0Z0tIQnliMjFwYzJVc0lHbHpVbVZxWldOMEtTQjdYRzRnSUdsbUlDaHdjbTl0YVhObExsOXVLU0J5WlhSMWNtNDdYRzRnSUhCeWIyMXBjMlV1WDI0Z1BTQjBjblZsTzF4dUlDQjJZWElnWTJoaGFXNGdQU0J3Y205dGFYTmxMbDlqTzF4dUlDQnRhV055YjNSaGMyc29ablZ1WTNScGIyNGdLQ2tnZTF4dUlDQWdJSFpoY2lCMllXeDFaU0E5SUhCeWIyMXBjMlV1WDNZN1hHNGdJQ0FnZG1GeUlHOXJJRDBnY0hKdmJXbHpaUzVmY3lBOVBTQXhPMXh1SUNBZ0lIWmhjaUJwSUQwZ01EdGNiaUFnSUNCMllYSWdjblZ1SUQwZ1puVnVZM1JwYjI0Z0tISmxZV04wYVc5dUtTQjdYRzRnSUNBZ0lDQjJZWElnYUdGdVpHeGxjaUE5SUc5cklEOGdjbVZoWTNScGIyNHViMnNnT2lCeVpXRmpkR2x2Ymk1bVlXbHNPMXh1SUNBZ0lDQWdkbUZ5SUhKbGMyOXNkbVVnUFNCeVpXRmpkR2x2Ymk1eVpYTnZiSFpsTzF4dUlDQWdJQ0FnZG1GeUlISmxhbVZqZENBOUlISmxZV04wYVc5dUxuSmxhbVZqZER0Y2JpQWdJQ0FnSUhaaGNpQmtiMjFoYVc0Z1BTQnlaV0ZqZEdsdmJpNWtiMjFoYVc0N1hHNGdJQ0FnSUNCMllYSWdjbVZ6ZFd4MExDQjBhR1Z1TENCbGVHbDBaV1E3WEc0Z0lDQWdJQ0IwY25rZ2UxeHVJQ0FnSUNBZ0lDQnBaaUFvYUdGdVpHeGxjaWtnZTF4dUlDQWdJQ0FnSUNBZ0lHbG1JQ2doYjJzcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaHdjbTl0YVhObExsOW9JRDA5SURJcElHOXVTR0Z1Wkd4bFZXNW9ZVzVrYkdWa0tIQnliMjFwYzJVcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnY0hKdmJXbHpaUzVmYUNBOUlERTdYRzRnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lHbG1JQ2hvWVc1a2JHVnlJRDA5UFNCMGNuVmxLU0J5WlhOMWJIUWdQU0IyWVd4MVpUdGNiaUFnSUNBZ0lDQWdJQ0JsYkhObElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaGtiMjFoYVc0cElHUnZiV0ZwYmk1bGJuUmxjaWdwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVZ6ZFd4MElEMGdhR0Z1Wkd4bGNpaDJZV3gxWlNrN0lDOHZJRzFoZVNCMGFISnZkMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR1J2YldGcGJpa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQmtiMjFoYVc0dVpYaHBkQ2dwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0JsZUdsMFpXUWdQU0IwY25WbE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0JwWmlBb2NtVnpkV3gwSUQwOVBTQnlaV0ZqZEdsdmJpNXdjbTl0YVhObEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpXcGxZM1FvVkhsd1pVVnljbTl5S0NkUWNtOXRhWE5sTFdOb1lXbHVJR041WTJ4bEp5a3BPMXh1SUNBZ0lDQWdJQ0FnSUgwZ1pXeHpaU0JwWmlBb2RHaGxiaUE5SUdselZHaGxibUZpYkdVb2NtVnpkV3gwS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZEdobGJpNWpZV3hzS0hKbGMzVnNkQ3dnY21WemIyeDJaU3dnY21WcVpXTjBLVHRjYmlBZ0lDQWdJQ0FnSUNCOUlHVnNjMlVnY21WemIyeDJaU2h5WlhOMWJIUXBPMXh1SUNBZ0lDQWdJQ0I5SUdWc2MyVWdjbVZxWldOMEtIWmhiSFZsS1R0Y2JpQWdJQ0FnSUgwZ1kyRjBZMmdnS0dVcElIdGNiaUFnSUNBZ0lDQWdhV1lnS0dSdmJXRnBiaUFtSmlBaFpYaHBkR1ZrS1NCa2IyMWhhVzR1WlhocGRDZ3BPMXh1SUNBZ0lDQWdJQ0J5WldwbFkzUW9aU2s3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmVHRjYmlBZ0lDQjNhR2xzWlNBb1kyaGhhVzR1YkdWdVozUm9JRDRnYVNrZ2NuVnVLR05vWVdsdVcya3JLMTBwT3lBdkx5QjJZWEpwWVdKc1pTQnNaVzVuZEdnZ0xTQmpZVzRuZENCMWMyVWdabTl5UldGamFGeHVJQ0FnSUhCeWIyMXBjMlV1WDJNZ1BTQmJYVHRjYmlBZ0lDQndjbTl0YVhObExsOXVJRDBnWm1Gc2MyVTdYRzRnSUNBZ2FXWWdLR2x6VW1WcVpXTjBJQ1ltSUNGd2NtOXRhWE5sTGw5b0tTQnZibFZ1YUdGdVpHeGxaQ2h3Y205dGFYTmxLVHRjYmlBZ2ZTazdYRzU5TzF4dWRtRnlJRzl1Vlc1b1lXNWtiR1ZrSUQwZ1puVnVZM1JwYjI0Z0tIQnliMjFwYzJVcElIdGNiaUFnZEdGemF5NWpZV3hzS0dkc2IySmhiQ3dnWm5WdVkzUnBiMjRnS0NrZ2UxeHVJQ0FnSUhaaGNpQjJZV3gxWlNBOUlIQnliMjFwYzJVdVgzWTdYRzRnSUNBZ2RtRnlJSFZ1YUdGdVpHeGxaQ0E5SUdselZXNW9ZVzVrYkdWa0tIQnliMjFwYzJVcE8xeHVJQ0FnSUhaaGNpQnlaWE4xYkhRc0lHaGhibVJzWlhJc0lHTnZibk52YkdVN1hHNGdJQ0FnYVdZZ0tIVnVhR0Z1Wkd4bFpDa2dlMXh1SUNBZ0lDQWdjbVZ6ZFd4MElEMGdjR1Z5Wm05eWJTaG1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdJQ0FnSUdsbUlDaHBjMDV2WkdVcElIdGNiaUFnSUNBZ0lDQWdJQ0J3Y205alpYTnpMbVZ0YVhRb0ozVnVhR0Z1Wkd4bFpGSmxhbVZqZEdsdmJpY3NJSFpoYkhWbExDQndjbTl0YVhObEtUdGNiaUFnSUNBZ0lDQWdmU0JsYkhObElHbG1JQ2hvWVc1a2JHVnlJRDBnWjJ4dlltRnNMbTl1ZFc1b1lXNWtiR1ZrY21WcVpXTjBhVzl1S1NCN1hHNGdJQ0FnSUNBZ0lDQWdhR0Z1Wkd4bGNpaDdJSEJ5YjIxcGMyVTZJSEJ5YjIxcGMyVXNJSEpsWVhOdmJqb2dkbUZzZFdVZ2ZTazdYRzRnSUNBZ0lDQWdJSDBnWld4elpTQnBaaUFvS0dOdmJuTnZiR1VnUFNCbmJHOWlZV3d1WTI5dWMyOXNaU2tnSmlZZ1kyOXVjMjlzWlM1bGNuSnZjaWtnZTF4dUlDQWdJQ0FnSUNBZ0lHTnZibk52YkdVdVpYSnliM0lvSjFWdWFHRnVaR3hsWkNCd2NtOXRhWE5sSUhKbGFtVmpkR2x2Ymljc0lIWmhiSFZsS1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2ZTazdYRzRnSUNBZ0lDQXZMeUJDY205M2MyVnljeUJ6YUc5MWJHUWdibTkwSUhSeWFXZG5aWElnWUhKbGFtVmpkR2x2YmtoaGJtUnNaV1JnSUdWMlpXNTBJR2xtSUdsMElIZGhjeUJvWVc1a2JHVmtJR2hsY21Vc0lFNXZaR1ZLVXlBdElITm9iM1ZzWkZ4dUlDQWdJQ0FnY0hKdmJXbHpaUzVmYUNBOUlHbHpUbTlrWlNCOGZDQnBjMVZ1YUdGdVpHeGxaQ2h3Y205dGFYTmxLU0EvSURJZ09pQXhPMXh1SUNBZ0lIMGdjSEp2YldselpTNWZZU0E5SUhWdVpHVm1hVzVsWkR0Y2JpQWdJQ0JwWmlBb2RXNW9ZVzVrYkdWa0lDWW1JSEpsYzNWc2RDNWxLU0IwYUhKdmR5QnlaWE4xYkhRdWRqdGNiaUFnZlNrN1hHNTlPMXh1ZG1GeUlHbHpWVzVvWVc1a2JHVmtJRDBnWm5WdVkzUnBiMjRnS0hCeWIyMXBjMlVwSUh0Y2JpQWdjbVYwZFhKdUlIQnliMjFwYzJVdVgyZ2dJVDA5SURFZ0ppWWdLSEJ5YjIxcGMyVXVYMkVnZkh3Z2NISnZiV2x6WlM1Zll5a3ViR1Z1WjNSb0lEMDlQU0F3TzF4dWZUdGNiblpoY2lCdmJraGhibVJzWlZWdWFHRnVaR3hsWkNBOUlHWjFibU4wYVc5dUlDaHdjbTl0YVhObEtTQjdYRzRnSUhSaGMyc3VZMkZzYkNobmJHOWlZV3dzSUdaMWJtTjBhVzl1SUNncElIdGNiaUFnSUNCMllYSWdhR0Z1Wkd4bGNqdGNiaUFnSUNCcFppQW9hWE5PYjJSbEtTQjdYRzRnSUNBZ0lDQndjbTlqWlhOekxtVnRhWFFvSjNKbGFtVmpkR2x2YmtoaGJtUnNaV1FuTENCd2NtOXRhWE5sS1R0Y2JpQWdJQ0I5SUdWc2MyVWdhV1lnS0doaGJtUnNaWElnUFNCbmJHOWlZV3d1YjI1eVpXcGxZM1JwYjI1b1lXNWtiR1ZrS1NCN1hHNGdJQ0FnSUNCb1lXNWtiR1Z5S0hzZ2NISnZiV2x6WlRvZ2NISnZiV2x6WlN3Z2NtVmhjMjl1T2lCd2NtOXRhWE5sTGw5MklIMHBPMXh1SUNBZ0lIMWNiaUFnZlNrN1hHNTlPMXh1ZG1GeUlDUnlaV3BsWTNRZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVcElIdGNiaUFnZG1GeUlIQnliMjFwYzJVZ1BTQjBhR2x6TzF4dUlDQnBaaUFvY0hKdmJXbHpaUzVmWkNrZ2NtVjBkWEp1TzF4dUlDQndjbTl0YVhObExsOWtJRDBnZEhKMVpUdGNiaUFnY0hKdmJXbHpaU0E5SUhCeWIyMXBjMlV1WDNjZ2ZId2djSEp2YldselpUc2dMeThnZFc1M2NtRndYRzRnSUhCeWIyMXBjMlV1WDNZZ1BTQjJZV3gxWlR0Y2JpQWdjSEp2YldselpTNWZjeUE5SURJN1hHNGdJR2xtSUNnaGNISnZiV2x6WlM1ZllTa2djSEp2YldselpTNWZZU0E5SUhCeWIyMXBjMlV1WDJNdWMyeHBZMlVvS1R0Y2JpQWdibTkwYVdaNUtIQnliMjFwYzJVc0lIUnlkV1VwTzF4dWZUdGNiblpoY2lBa2NtVnpiMngyWlNBOUlHWjFibU4wYVc5dUlDaDJZV3gxWlNrZ2UxeHVJQ0IyWVhJZ2NISnZiV2x6WlNBOUlIUm9hWE03WEc0Z0lIWmhjaUIwYUdWdU8xeHVJQ0JwWmlBb2NISnZiV2x6WlM1ZlpDa2djbVYwZFhKdU8xeHVJQ0J3Y205dGFYTmxMbDlrSUQwZ2RISjFaVHRjYmlBZ2NISnZiV2x6WlNBOUlIQnliMjFwYzJVdVgzY2dmSHdnY0hKdmJXbHpaVHNnTHk4Z2RXNTNjbUZ3WEc0Z0lIUnllU0I3WEc0Z0lDQWdhV1lnS0hCeWIyMXBjMlVnUFQwOUlIWmhiSFZsS1NCMGFISnZkeUJVZVhCbFJYSnliM0lvWENKUWNtOXRhWE5sSUdOaGJpZDBJR0psSUhKbGMyOXNkbVZrSUdsMGMyVnNabHdpS1R0Y2JpQWdJQ0JwWmlBb2RHaGxiaUE5SUdselZHaGxibUZpYkdVb2RtRnNkV1VwS1NCN1hHNGdJQ0FnSUNCdGFXTnliM1JoYzJzb1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ2QzSmhjSEJsY2lBOUlIc2dYM2M2SUhCeWIyMXBjMlVzSUY5a09pQm1ZV3h6WlNCOU95QXZMeUIzY21Gd1hHNGdJQ0FnSUNBZ0lIUnllU0I3WEc0Z0lDQWdJQ0FnSUNBZ2RHaGxiaTVqWVd4c0tIWmhiSFZsTENCamRIZ29KSEpsYzI5c2RtVXNJSGR5WVhCd1pYSXNJREVwTENCamRIZ29KSEpsYW1WamRDd2dkM0poY0hCbGNpd2dNU2twTzF4dUlDQWdJQ0FnSUNCOUlHTmhkR05vSUNobEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSkhKbGFtVmpkQzVqWVd4c0tIZHlZWEJ3WlhJc0lHVXBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5S1R0Y2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdjSEp2YldselpTNWZkaUE5SUhaaGJIVmxPMXh1SUNBZ0lDQWdjSEp2YldselpTNWZjeUE5SURFN1hHNGdJQ0FnSUNCdWIzUnBabmtvY0hKdmJXbHpaU3dnWm1Gc2MyVXBPMXh1SUNBZ0lIMWNiaUFnZlNCallYUmphQ0FvWlNrZ2UxeHVJQ0FnSUNSeVpXcGxZM1F1WTJGc2JDaDdJRjkzT2lCd2NtOXRhWE5sTENCZlpEb2dabUZzYzJVZ2ZTd2daU2s3SUM4dklIZHlZWEJjYmlBZ2ZWeHVmVHRjYmx4dUx5OGdZMjl1YzNSeWRXTjBiM0lnY0c5c2VXWnBiR3hjYm1sbUlDZ2hWVk5GWDA1QlZFbFdSU2tnZTF4dUlDQXZMeUF5TlM0MExqTXVNU0JRY205dGFYTmxLR1Y0WldOMWRHOXlLVnh1SUNBa1VISnZiV2x6WlNBOUlHWjFibU4wYVc5dUlGQnliMjFwYzJVb1pYaGxZM1YwYjNJcElIdGNiaUFnSUNCaGJrbHVjM1JoYm1ObEtIUm9hWE1zSUNSUWNtOXRhWE5sTENCUVVrOU5TVk5GTENBblgyZ25LVHRjYmlBZ0lDQmhSblZ1WTNScGIyNG9aWGhsWTNWMGIzSXBPMXh1SUNBZ0lFbHVkR1Z5Ym1Gc0xtTmhiR3dvZEdocGN5azdYRzRnSUNBZ2RISjVJSHRjYmlBZ0lDQWdJR1Y0WldOMWRHOXlLR04wZUNna2NtVnpiMngyWlN3Z2RHaHBjeXdnTVNrc0lHTjBlQ2drY21WcVpXTjBMQ0IwYUdsekxDQXhLU2s3WEc0Z0lDQWdmU0JqWVhSamFDQW9aWEp5S1NCN1hHNGdJQ0FnSUNBa2NtVnFaV04wTG1OaGJHd29kR2hwY3l3Z1pYSnlLVHRjYmlBZ0lDQjlYRzRnSUgwN1hHNGdJQzh2SUdWemJHbHVkQzFrYVhOaFlteGxMVzVsZUhRdGJHbHVaU0J1YnkxMWJuVnpaV1F0ZG1GeWMxeHVJQ0JKYm5SbGNtNWhiQ0E5SUdaMWJtTjBhVzl1SUZCeWIyMXBjMlVvWlhobFkzVjBiM0lwSUh0Y2JpQWdJQ0IwYUdsekxsOWpJRDBnVzEwN0lDQWdJQ0FnSUNBZ0lDQWdJQzh2SUR3dElHRjNZV2wwYVc1bklISmxZV04wYVc5dWMxeHVJQ0FnSUhSb2FYTXVYMkVnUFNCMWJtUmxabWx1WldRN0lDQWdJQ0FnTHk4Z1BDMGdZMmhsWTJ0bFpDQnBiaUJwYzFWdWFHRnVaR3hsWkNCeVpXRmpkR2x2Ym5OY2JpQWdJQ0IwYUdsekxsOXpJRDBnTURzZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2SUR3dElITjBZWFJsWEc0Z0lDQWdkR2hwY3k1ZlpDQTlJR1poYkhObE95QWdJQ0FnSUNBZ0lDQXZMeUE4TFNCa2IyNWxYRzRnSUNBZ2RHaHBjeTVmZGlBOUlIVnVaR1ZtYVc1bFpEc2dJQ0FnSUNBdkx5QThMU0IyWVd4MVpWeHVJQ0FnSUhSb2FYTXVYMmdnUFNBd095QWdJQ0FnSUNBZ0lDQWdJQ0FnTHk4Z1BDMGdjbVZxWldOMGFXOXVJSE4wWVhSbExDQXdJQzBnWkdWbVlYVnNkQ3dnTVNBdElHaGhibVJzWldRc0lESWdMU0IxYm1oaGJtUnNaV1JjYmlBZ0lDQjBhR2x6TGw5dUlEMGdabUZzYzJVN0lDQWdJQ0FnSUNBZ0lDOHZJRHd0SUc1dmRHbG1lVnh1SUNCOU8xeHVJQ0JKYm5SbGNtNWhiQzV3Y205MGIzUjVjR1VnUFNCeVpYRjFhWEpsS0NjdUwxOXlaV1JsWm1sdVpTMWhiR3duS1Nna1VISnZiV2x6WlM1d2NtOTBiM1I1Y0dVc0lIdGNiaUFnSUNBdkx5QXlOUzQwTGpVdU15QlFjbTl0YVhObExuQnliM1J2ZEhsd1pTNTBhR1Z1S0c5dVJuVnNabWxzYkdWa0xDQnZibEpsYW1WamRHVmtLVnh1SUNBZ0lIUm9aVzQ2SUdaMWJtTjBhVzl1SUhSb1pXNG9iMjVHZFd4bWFXeHNaV1FzSUc5dVVtVnFaV04wWldRcElIdGNiaUFnSUNBZ0lIWmhjaUJ5WldGamRHbHZiaUE5SUc1bGQxQnliMjFwYzJWRFlYQmhZbWxzYVhSNUtITndaV05wWlhORGIyNXpkSEoxWTNSdmNpaDBhR2x6TENBa1VISnZiV2x6WlNrcE8xeHVJQ0FnSUNBZ2NtVmhZM1JwYjI0dWIyc2dQU0IwZVhCbGIyWWdiMjVHZFd4bWFXeHNaV1FnUFQwZ0oyWjFibU4wYVc5dUp5QS9JRzl1Um5Wc1ptbHNiR1ZrSURvZ2RISjFaVHRjYmlBZ0lDQWdJSEpsWVdOMGFXOXVMbVpoYVd3Z1BTQjBlWEJsYjJZZ2IyNVNaV3BsWTNSbFpDQTlQU0FuWm5WdVkzUnBiMjRuSUNZbUlHOXVVbVZxWldOMFpXUTdYRzRnSUNBZ0lDQnlaV0ZqZEdsdmJpNWtiMjFoYVc0Z1BTQnBjMDV2WkdVZ1B5QndjbTlqWlhOekxtUnZiV0ZwYmlBNklIVnVaR1ZtYVc1bFpEdGNiaUFnSUNBZ0lIUm9hWE11WDJNdWNIVnphQ2h5WldGamRHbHZiaWs3WEc0Z0lDQWdJQ0JwWmlBb2RHaHBjeTVmWVNrZ2RHaHBjeTVmWVM1d2RYTm9LSEpsWVdOMGFXOXVLVHRjYmlBZ0lDQWdJR2xtSUNoMGFHbHpMbDl6S1NCdWIzUnBabmtvZEdocGN5d2dabUZzYzJVcE8xeHVJQ0FnSUNBZ2NtVjBkWEp1SUhKbFlXTjBhVzl1TG5CeWIyMXBjMlU3WEc0Z0lDQWdmU3hjYmlBZ0lDQXZMeUF5TlM0MExqVXVNU0JRY205dGFYTmxMbkJ5YjNSdmRIbHdaUzVqWVhSamFDaHZibEpsYW1WamRHVmtLVnh1SUNBZ0lDZGpZWFJqYUNjNklHWjFibU4wYVc5dUlDaHZibEpsYW1WamRHVmtLU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdkR2hwY3k1MGFHVnVLSFZ1WkdWbWFXNWxaQ3dnYjI1U1pXcGxZM1JsWkNrN1hHNGdJQ0FnZlZ4dUlDQjlLVHRjYmlBZ1QzZHVVSEp2YldselpVTmhjR0ZpYVd4cGRIa2dQU0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnZG1GeUlIQnliMjFwYzJVZ1BTQnVaWGNnU1c1MFpYSnVZV3dvS1R0Y2JpQWdJQ0IwYUdsekxuQnliMjFwYzJVZ1BTQndjbTl0YVhObE8xeHVJQ0FnSUhSb2FYTXVjbVZ6YjJ4MlpTQTlJR04wZUNna2NtVnpiMngyWlN3Z2NISnZiV2x6WlN3Z01TazdYRzRnSUNBZ2RHaHBjeTV5WldwbFkzUWdQU0JqZEhnb0pISmxhbVZqZEN3Z2NISnZiV2x6WlN3Z01TazdYRzRnSUgwN1hHNGdJRzVsZDFCeWIyMXBjMlZEWVhCaFltbHNhWFI1VFc5a2RXeGxMbVlnUFNCdVpYZFFjbTl0YVhObFEyRndZV0pwYkdsMGVTQTlJR1oxYm1OMGFXOXVJQ2hES1NCN1hHNGdJQ0FnY21WMGRYSnVJRU1nUFQwOUlDUlFjbTl0YVhObElIeDhJRU1nUFQwOUlGZHlZWEJ3WlhKY2JpQWdJQ0FnSUQ4Z2JtVjNJRTkzYmxCeWIyMXBjMlZEWVhCaFltbHNhWFI1S0VNcFhHNGdJQ0FnSUNBNklHNWxkMGRsYm1WeWFXTlFjbTl0YVhObFEyRndZV0pwYkdsMGVTaERLVHRjYmlBZ2ZUdGNibjFjYmx4dUpHVjRjRzl5ZENna1pYaHdiM0owTGtjZ0t5QWtaWGh3YjNKMExsY2dLeUFrWlhod2IzSjBMa1lnS2lBaFZWTkZYMDVCVkVsV1JTd2dleUJRY205dGFYTmxPaUFrVUhKdmJXbHpaU0I5S1R0Y2JuSmxjWFZwY21Vb0p5NHZYM05sZEMxMGJ5MXpkSEpwYm1jdGRHRm5KeWtvSkZCeWIyMXBjMlVzSUZCU1QwMUpVMFVwTzF4dWNtVnhkV2x5WlNnbkxpOWZjMlYwTFhOd1pXTnBaWE1uS1NoUVVrOU5TVk5GS1R0Y2JsZHlZWEJ3WlhJZ1BTQnlaWEYxYVhKbEtDY3VMMTlqYjNKbEp5bGJVRkpQVFVsVFJWMDdYRzVjYmk4dklITjBZWFJwWTNOY2JpUmxlSEJ2Y25Rb0pHVjRjRzl5ZEM1VElDc2dKR1Y0Y0c5eWRDNUdJQ29nSVZWVFJWOU9RVlJKVmtVc0lGQlNUMDFKVTBVc0lIdGNiaUFnTHk4Z01qVXVOQzQwTGpVZ1VISnZiV2x6WlM1eVpXcGxZM1FvY2lsY2JpQWdjbVZxWldOME9pQm1kVzVqZEdsdmJpQnlaV3BsWTNRb2Npa2dlMXh1SUNBZ0lIWmhjaUJqWVhCaFltbHNhWFI1SUQwZ2JtVjNVSEp2YldselpVTmhjR0ZpYVd4cGRIa29kR2hwY3lrN1hHNGdJQ0FnZG1GeUlDUWtjbVZxWldOMElEMGdZMkZ3WVdKcGJHbDBlUzV5WldwbFkzUTdYRzRnSUNBZ0pDUnlaV3BsWTNRb2NpazdYRzRnSUNBZ2NtVjBkWEp1SUdOaGNHRmlhV3hwZEhrdWNISnZiV2x6WlR0Y2JpQWdmVnh1ZlNrN1hHNGtaWGh3YjNKMEtDUmxlSEJ2Y25RdVV5QXJJQ1JsZUhCdmNuUXVSaUFxSUNoTVNVSlNRVkpaSUh4OElDRlZVMFZmVGtGVVNWWkZLU3dnVUZKUFRVbFRSU3dnZTF4dUlDQXZMeUF5TlM0MExqUXVOaUJRY205dGFYTmxMbkpsYzI5c2RtVW9lQ2xjYmlBZ2NtVnpiMngyWlRvZ1puVnVZM1JwYjI0Z2NtVnpiMngyWlNoNEtTQjdYRzRnSUNBZ2NtVjBkWEp1SUhCeWIyMXBjMlZTWlhOdmJIWmxLRXhKUWxKQlVsa2dKaVlnZEdocGN5QTlQVDBnVjNKaGNIQmxjaUEvSUNSUWNtOXRhWE5sSURvZ2RHaHBjeXdnZUNrN1hHNGdJSDFjYm4wcE8xeHVKR1Y0Y0c5eWRDZ2taWGh3YjNKMExsTWdLeUFrWlhod2IzSjBMa1lnS2lBaEtGVlRSVjlPUVZSSlZrVWdKaVlnY21WeGRXbHlaU2duTGk5ZmFYUmxjaTFrWlhSbFkzUW5LU2htZFc1amRHbHZiaUFvYVhSbGNpa2dlMXh1SUNBa1VISnZiV2x6WlM1aGJHd29hWFJsY2lsYkoyTmhkR05vSjEwb1pXMXdkSGtwTzF4dWZTa3BMQ0JRVWs5TlNWTkZMQ0I3WEc0Z0lDOHZJREkxTGpRdU5DNHhJRkJ5YjIxcGMyVXVZV3hzS0dsMFpYSmhZbXhsS1Z4dUlDQmhiR3c2SUdaMWJtTjBhVzl1SUdGc2JDaHBkR1Z5WVdKc1pTa2dlMXh1SUNBZ0lIWmhjaUJESUQwZ2RHaHBjenRjYmlBZ0lDQjJZWElnWTJGd1lXSnBiR2wwZVNBOUlHNWxkMUJ5YjIxcGMyVkRZWEJoWW1sc2FYUjVLRU1wTzF4dUlDQWdJSFpoY2lCeVpYTnZiSFpsSUQwZ1kyRndZV0pwYkdsMGVTNXlaWE52YkhabE8xeHVJQ0FnSUhaaGNpQnlaV3BsWTNRZ1BTQmpZWEJoWW1sc2FYUjVMbkpsYW1WamREdGNiaUFnSUNCMllYSWdjbVZ6ZFd4MElEMGdjR1Z5Wm05eWJTaG1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdJQ0IyWVhJZ2RtRnNkV1Z6SUQwZ1cxMDdYRzRnSUNBZ0lDQjJZWElnYVc1a1pYZ2dQU0F3TzF4dUlDQWdJQ0FnZG1GeUlISmxiV0ZwYm1sdVp5QTlJREU3WEc0Z0lDQWdJQ0JtYjNKUFppaHBkR1Z5WVdKc1pTd2dabUZzYzJVc0lHWjFibU4wYVc5dUlDaHdjbTl0YVhObEtTQjdYRzRnSUNBZ0lDQWdJSFpoY2lBa2FXNWtaWGdnUFNCcGJtUmxlQ3NyTzF4dUlDQWdJQ0FnSUNCMllYSWdZV3h5WldGa2VVTmhiR3hsWkNBOUlHWmhiSE5sTzF4dUlDQWdJQ0FnSUNCMllXeDFaWE11Y0hWemFDaDFibVJsWm1sdVpXUXBPMXh1SUNBZ0lDQWdJQ0J5WlcxaGFXNXBibWNyS3p0Y2JpQWdJQ0FnSUNBZ1F5NXlaWE52YkhabEtIQnliMjFwYzJVcExuUm9aVzRvWm5WdVkzUnBiMjRnS0haaGJIVmxLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2FXWWdLR0ZzY21WaFpIbERZV3hzWldRcElISmxkSFZ5Ymp0Y2JpQWdJQ0FnSUNBZ0lDQmhiSEpsWVdSNVEyRnNiR1ZrSUQwZ2RISjFaVHRjYmlBZ0lDQWdJQ0FnSUNCMllXeDFaWE5iSkdsdVpHVjRYU0E5SUhaaGJIVmxPMXh1SUNBZ0lDQWdJQ0FnSUMwdGNtVnRZV2x1YVc1bklIeDhJSEpsYzI5c2RtVW9kbUZzZFdWektUdGNiaUFnSUNBZ0lDQWdmU3dnY21WcVpXTjBLVHRjYmlBZ0lDQWdJSDBwTzF4dUlDQWdJQ0FnTFMxeVpXMWhhVzVwYm1jZ2ZId2djbVZ6YjJ4MlpTaDJZV3gxWlhNcE8xeHVJQ0FnSUgwcE8xeHVJQ0FnSUdsbUlDaHlaWE4xYkhRdVpTa2djbVZxWldOMEtISmxjM1ZzZEM1MktUdGNiaUFnSUNCeVpYUjFjbTRnWTJGd1lXSnBiR2wwZVM1d2NtOXRhWE5sTzF4dUlDQjlMRnh1SUNBdkx5QXlOUzQwTGpRdU5DQlFjbTl0YVhObExuSmhZMlVvYVhSbGNtRmliR1VwWEc0Z0lISmhZMlU2SUdaMWJtTjBhVzl1SUhKaFkyVW9hWFJsY21GaWJHVXBJSHRjYmlBZ0lDQjJZWElnUXlBOUlIUm9hWE03WEc0Z0lDQWdkbUZ5SUdOaGNHRmlhV3hwZEhrZ1BTQnVaWGRRY205dGFYTmxRMkZ3WVdKcGJHbDBlU2hES1R0Y2JpQWdJQ0IyWVhJZ2NtVnFaV04wSUQwZ1kyRndZV0pwYkdsMGVTNXlaV3BsWTNRN1hHNGdJQ0FnZG1GeUlISmxjM1ZzZENBOUlIQmxjbVp2Y20wb1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNBZ0lDQWdabTl5VDJZb2FYUmxjbUZpYkdVc0lHWmhiSE5sTENCbWRXNWpkR2x2YmlBb2NISnZiV2x6WlNrZ2UxeHVJQ0FnSUNBZ0lDQkRMbkpsYzI5c2RtVW9jSEp2YldselpTa3VkR2hsYmloallYQmhZbWxzYVhSNUxuSmxjMjlzZG1Vc0lISmxhbVZqZENrN1hHNGdJQ0FnSUNCOUtUdGNiaUFnSUNCOUtUdGNiaUFnSUNCcFppQW9jbVZ6ZFd4MExtVXBJSEpsYW1WamRDaHlaWE4xYkhRdWRpazdYRzRnSUNBZ2NtVjBkWEp1SUdOaGNHRmlhV3hwZEhrdWNISnZiV2x6WlR0Y2JpQWdmVnh1ZlNrN1hHNGlMQ0luZFhObElITjBjbWxqZENjN1hHNTJZWElnSkdGMElEMGdjbVZ4ZFdseVpTZ25MaTlmYzNSeWFXNW5MV0YwSnlrb2RISjFaU2s3WEc1Y2JpOHZJREl4TGpFdU15NHlOeUJUZEhKcGJtY3VjSEp2ZEc5MGVYQmxXMEJBYVhSbGNtRjBiM0pkS0NsY2JuSmxjWFZwY21Vb0p5NHZYMmwwWlhJdFpHVm1hVzVsSnlrb1UzUnlhVzVuTENBblUzUnlhVzVuSnl3Z1puVnVZM1JwYjI0Z0tHbDBaWEpoZEdWa0tTQjdYRzRnSUhSb2FYTXVYM1FnUFNCVGRISnBibWNvYVhSbGNtRjBaV1FwT3lBdkx5QjBZWEpuWlhSY2JpQWdkR2hwY3k1ZmFTQTlJREE3SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2SUc1bGVIUWdhVzVrWlhoY2JpOHZJREl4TGpFdU5TNHlMakVnSlZOMGNtbHVaMGwwWlhKaGRHOXlVSEp2ZEc5MGVYQmxKUzV1WlhoMEtDbGNibjBzSUdaMWJtTjBhVzl1SUNncElIdGNiaUFnZG1GeUlFOGdQU0IwYUdsekxsOTBPMXh1SUNCMllYSWdhVzVrWlhnZ1BTQjBhR2x6TGw5cE8xeHVJQ0IyWVhJZ2NHOXBiblE3WEc0Z0lHbG1JQ2hwYm1SbGVDQStQU0JQTG14bGJtZDBhQ2tnY21WMGRYSnVJSHNnZG1Gc2RXVTZJSFZ1WkdWbWFXNWxaQ3dnWkc5dVpUb2dkSEoxWlNCOU8xeHVJQ0J3YjJsdWRDQTlJQ1JoZENoUExDQnBibVJsZUNrN1hHNGdJSFJvYVhNdVgya2dLejBnY0c5cGJuUXViR1Z1WjNSb08xeHVJQ0J5WlhSMWNtNGdleUIyWVd4MVpUb2djRzlwYm5Rc0lHUnZibVU2SUdaaGJITmxJSDA3WEc1OUtUdGNiaUlzSWk4dklHaDBkSEJ6T2k4dloybDBhSFZpTG1OdmJTOTBZek01TDNCeWIzQnZjMkZzTFhCeWIyMXBjMlV0Wm1sdVlXeHNlVnh1SjNWelpTQnpkSEpwWTNRbk8xeHVkbUZ5SUNSbGVIQnZjblFnUFNCeVpYRjFhWEpsS0NjdUwxOWxlSEJ2Y25RbktUdGNiblpoY2lCamIzSmxJRDBnY21WeGRXbHlaU2duTGk5ZlkyOXlaU2NwTzF4dWRtRnlJR2RzYjJKaGJDQTlJSEpsY1hWcGNtVW9KeTR2WDJkc2IySmhiQ2NwTzF4dWRtRnlJSE53WldOcFpYTkRiMjV6ZEhKMVkzUnZjaUE5SUhKbGNYVnBjbVVvSnk0dlgzTndaV05wWlhNdFkyOXVjM1J5ZFdOMGIzSW5LVHRjYm5aaGNpQndjbTl0YVhObFVtVnpiMngyWlNBOUlISmxjWFZwY21Vb0p5NHZYM0J5YjIxcGMyVXRjbVZ6YjJ4MlpTY3BPMXh1WEc0a1pYaHdiM0owS0NSbGVIQnZjblF1VUNBcklDUmxlSEJ2Y25RdVVpd2dKMUJ5YjIxcGMyVW5MQ0I3SUNkbWFXNWhiR3g1SnpvZ1puVnVZM1JwYjI0Z0tHOXVSbWx1WVd4c2VTa2dlMXh1SUNCMllYSWdReUE5SUhOd1pXTnBaWE5EYjI1emRISjFZM1J2Y2loMGFHbHpMQ0JqYjNKbExsQnliMjFwYzJVZ2ZId2daMnh2WW1Gc0xsQnliMjFwYzJVcE8xeHVJQ0IyWVhJZ2FYTkdkVzVqZEdsdmJpQTlJSFI1Y0dWdlppQnZia1pwYm1Gc2JIa2dQVDBnSjJaMWJtTjBhVzl1Snp0Y2JpQWdjbVYwZFhKdUlIUm9hWE11ZEdobGJpaGNiaUFnSUNCcGMwWjFibU4wYVc5dUlEOGdablZ1WTNScGIyNGdLSGdwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJ3Y205dGFYTmxVbVZ6YjJ4MlpTaERMQ0J2YmtacGJtRnNiSGtvS1NrdWRHaGxiaWhtZFc1amRHbHZiaUFvS1NCN0lISmxkSFZ5YmlCNE95QjlLVHRjYmlBZ0lDQjlJRG9nYjI1R2FXNWhiR3g1TEZ4dUlDQWdJR2x6Um5WdVkzUnBiMjRnUHlCbWRXNWpkR2x2YmlBb1pTa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlIQnliMjFwYzJWU1pYTnZiSFpsS0VNc0lHOXVSbWx1WVd4c2VTZ3BLUzUwYUdWdUtHWjFibU4wYVc5dUlDZ3BJSHNnZEdoeWIzY2daVHNnZlNrN1hHNGdJQ0FnZlNBNklHOXVSbWx1WVd4c2VWeHVJQ0FwTzF4dWZTQjlLVHRjYmlJc0lpZDFjMlVnYzNSeWFXTjBKenRjYmk4dklHaDBkSEJ6T2k4dloybDBhSFZpTG1OdmJTOTBZek01TDNCeWIzQnZjMkZzTFhCeWIyMXBjMlV0ZEhKNVhHNTJZWElnSkdWNGNHOXlkQ0E5SUhKbGNYVnBjbVVvSnk0dlgyVjRjRzl5ZENjcE8xeHVkbUZ5SUc1bGQxQnliMjFwYzJWRFlYQmhZbWxzYVhSNUlEMGdjbVZ4ZFdseVpTZ25MaTlmYm1WM0xYQnliMjFwYzJVdFkyRndZV0pwYkdsMGVTY3BPMXh1ZG1GeUlIQmxjbVp2Y20wZ1BTQnlaWEYxYVhKbEtDY3VMMTl3WlhKbWIzSnRKeWs3WEc1Y2JpUmxlSEJ2Y25Rb0pHVjRjRzl5ZEM1VExDQW5VSEp2YldselpTY3NJSHNnSjNSeWVTYzZJR1oxYm1OMGFXOXVJQ2hqWVd4c1ltRmphMlp1S1NCN1hHNGdJSFpoY2lCd2NtOXRhWE5sUTJGd1lXSnBiR2wwZVNBOUlHNWxkMUJ5YjIxcGMyVkRZWEJoWW1sc2FYUjVMbVlvZEdocGN5azdYRzRnSUhaaGNpQnlaWE4xYkhRZ1BTQndaWEptYjNKdEtHTmhiR3hpWVdOclptNHBPMXh1SUNBb2NtVnpkV3gwTG1VZ1B5QndjbTl0YVhObFEyRndZV0pwYkdsMGVTNXlaV3BsWTNRZ09pQndjbTl0YVhObFEyRndZV0pwYkdsMGVTNXlaWE52YkhabEtTaHlaWE4xYkhRdWRpazdYRzRnSUhKbGRIVnliaUJ3Y205dGFYTmxRMkZ3WVdKcGJHbDBlUzV3Y205dGFYTmxPMXh1ZlNCOUtUdGNiaUlzSW5KbGNYVnBjbVVvSnk0dlpYTTJMbUZ5Y21GNUxtbDBaWEpoZEc5eUp5azdYRzUyWVhJZ1oyeHZZbUZzSUQwZ2NtVnhkV2x5WlNnbkxpOWZaMnh2WW1Gc0p5azdYRzUyWVhJZ2FHbGtaU0E5SUhKbGNYVnBjbVVvSnk0dlgyaHBaR1VuS1R0Y2JuWmhjaUJKZEdWeVlYUnZjbk1nUFNCeVpYRjFhWEpsS0NjdUwxOXBkR1Z5WVhSdmNuTW5LVHRjYm5aaGNpQlVUMTlUVkZKSlRrZGZWRUZISUQwZ2NtVnhkV2x5WlNnbkxpOWZkMnR6Snlrb0ozUnZVM1J5YVc1blZHRm5KeWs3WEc1Y2JuWmhjaUJFVDAxSmRHVnlZV0pzWlhNZ1BTQW9KME5UVTFKMWJHVk1hWE4wTEVOVFUxTjBlV3hsUkdWamJHRnlZWFJwYjI0c1ExTlRWbUZzZFdWTWFYTjBMRU5zYVdWdWRGSmxZM1JNYVhOMExFUlBUVkpsWTNSTWFYTjBMRVJQVFZOMGNtbHVaMHhwYzNRc0p5QXJYRzRnSUNkRVQwMVViMnRsYmt4cGMzUXNSR0YwWVZSeVlXNXpabVZ5U1hSbGJVeHBjM1FzUm1sc1pVeHBjM1FzU0ZSTlRFRnNiRU52Ykd4bFkzUnBiMjRzU0ZSTlRFTnZiR3hsWTNScGIyNHNTRlJOVEVadmNtMUZiR1Z0Wlc1MExFaFVUVXhUWld4bFkzUkZiR1Z0Wlc1MExDY2dLMXh1SUNBblRXVmthV0ZNYVhOMExFMXBiV1ZVZVhCbFFYSnlZWGtzVG1GdFpXUk9iMlJsVFdGd0xFNXZaR1ZNYVhOMExGQmhhVzUwVW1WeGRXVnpkRXhwYzNRc1VHeDFaMmx1TEZCc2RXZHBia0Z5Y21GNUxGTldSMHhsYm1kMGFFeHBjM1FzVTFaSFRuVnRZbVZ5VEdsemRDd25JQ3RjYmlBZ0oxTldSMUJoZEdoVFpXZE1hWE4wTEZOV1IxQnZhVzUwVEdsemRDeFRWa2RUZEhKcGJtZE1hWE4wTEZOV1IxUnlZVzV6Wm05eWJVeHBjM1FzVTI5MWNtTmxRblZtWm1WeVRHbHpkQ3hUZEhsc1pWTm9aV1YwVEdsemRDeFVaWGgwVkhKaFkydERkV1ZNYVhOMExDY2dLMXh1SUNBblZHVjRkRlJ5WVdOclRHbHpkQ3hVYjNWamFFeHBjM1FuS1M1emNHeHBkQ2duTENjcE8xeHVYRzVtYjNJZ0tIWmhjaUJwSUQwZ01Ec2dhU0E4SUVSUFRVbDBaWEpoWW14bGN5NXNaVzVuZEdnN0lHa3JLeWtnZTF4dUlDQjJZWElnVGtGTlJTQTlJRVJQVFVsMFpYSmhZbXhsYzF0cFhUdGNiaUFnZG1GeUlFTnZiR3hsWTNScGIyNGdQU0JuYkc5aVlXeGJUa0ZOUlYwN1hHNGdJSFpoY2lCd2NtOTBieUE5SUVOdmJHeGxZM1JwYjI0Z0ppWWdRMjlzYkdWamRHbHZiaTV3Y205MGIzUjVjR1U3WEc0Z0lHbG1JQ2h3Y205MGJ5QW1KaUFoY0hKdmRHOWJWRTlmVTFSU1NVNUhYMVJCUjEwcElHaHBaR1VvY0hKdmRHOHNJRlJQWDFOVVVrbE9SMTlVUVVjc0lFNUJUVVVwTzF4dUlDQkpkR1Z5WVhSdmNuTmJUa0ZOUlYwZ1BTQkpkR1Z5WVhSdmNuTXVRWEp5WVhrN1hHNTlYRzRpTENJdktpcGNiaUFxSUVOdmNIbHlhV2RvZENBb1l5a2dNakF4TkMxd2NtVnpaVzUwTENCR1lXTmxZbTl2YXl3Z1NXNWpMbHh1SUNwY2JpQXFJRlJvYVhNZ2MyOTFjbU5sSUdOdlpHVWdhWE1nYkdsalpXNXpaV1FnZFc1a1pYSWdkR2hsSUUxSlZDQnNhV05sYm5ObElHWnZkVzVrSUdsdUlIUm9aVnh1SUNvZ1RFbERSVTVUUlNCbWFXeGxJR2x1SUhSb1pTQnliMjkwSUdScGNtVmpkRzl5ZVNCdlppQjBhR2x6SUhOdmRYSmpaU0IwY21WbExseHVJQ292WEc1Y2JpOHZJRlJvYVhNZ2JXVjBhRzlrSUc5bUlHOWlkR0ZwYm1sdVp5QmhJSEpsWm1WeVpXNWpaU0IwYnlCMGFHVWdaMnh2WW1Gc0lHOWlhbVZqZENCdVpXVmtjeUIwYnlCaVpWeHVMeThnYTJWd2RDQnBaR1Z1ZEdsallXd2dkRzhnZEdobElIZGhlU0JwZENCcGN5QnZZblJoYVc1bFpDQnBiaUJ5ZFc1MGFXMWxMbXB6WEc1MllYSWdaeUE5SUNobWRXNWpkR2x2YmlncElIc2djbVYwZFhKdUlIUm9hWE1nZlNrb0tTQjhmQ0JHZFc1amRHbHZiaWhjSW5KbGRIVnliaUIwYUdselhDSXBLQ2s3WEc1Y2JpOHZJRlZ6WlNCZ1oyVjBUM2R1VUhKdmNHVnlkSGxPWVcxbGMyQWdZbVZqWVhWelpTQnViM1FnWVd4c0lHSnliM2R6WlhKeklITjFjSEJ2Y25RZ1kyRnNiR2x1WjF4dUx5OGdZR2hoYzA5M2JsQnliM0JsY25SNVlDQnZiaUIwYUdVZ1oyeHZZbUZzSUdCelpXeG1ZQ0J2WW1wbFkzUWdhVzRnWVNCM2IzSnJaWEl1SUZObFpTQWpNVGd6TGx4dWRtRnlJR2hoWkZKMWJuUnBiV1VnUFNCbkxuSmxaMlZ1WlhKaGRHOXlVblZ1ZEdsdFpTQW1KbHh1SUNCUFltcGxZM1F1WjJWMFQzZHVVSEp2Y0dWeWRIbE9ZVzFsY3lobktTNXBibVJsZUU5bUtGd2ljbVZuWlc1bGNtRjBiM0pTZFc1MGFXMWxYQ0lwSUQ0OUlEQTdYRzVjYmk4dklGTmhkbVVnZEdobElHOXNaQ0J5WldkbGJtVnlZWFJ2Y2xKMWJuUnBiV1VnYVc0Z1kyRnpaU0JwZENCdVpXVmtjeUIwYnlCaVpTQnlaWE4wYjNKbFpDQnNZWFJsY2k1Y2JuWmhjaUJ2YkdSU2RXNTBhVzFsSUQwZ2FHRmtVblZ1ZEdsdFpTQW1KaUJuTG5KbFoyVnVaWEpoZEc5eVVuVnVkR2x0WlR0Y2JseHVMeThnUm05eVkyVWdjbVZsZG1Gc2RYUmhkR2x2YmlCdlppQnlkVzUwYVcxbExtcHpMbHh1Wnk1eVpXZGxibVZ5WVhSdmNsSjFiblJwYldVZ1BTQjFibVJsWm1sdVpXUTdYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnY21WeGRXbHlaU2hjSWk0dmNuVnVkR2x0WlZ3aUtUdGNibHh1YVdZZ0tHaGhaRkoxYm5ScGJXVXBJSHRjYmlBZ0x5OGdVbVZ6ZEc5eVpTQjBhR1VnYjNKcFoybHVZV3dnY25WdWRHbHRaUzVjYmlBZ1p5NXlaV2RsYm1WeVlYUnZjbEoxYm5ScGJXVWdQU0J2YkdSU2RXNTBhVzFsTzF4dWZTQmxiSE5sSUh0Y2JpQWdMeThnVW1WdGIzWmxJSFJvWlNCbmJHOWlZV3dnY0hKdmNHVnlkSGtnWVdSa1pXUWdZbmtnY25WdWRHbHRaUzVxY3k1Y2JpQWdkSEo1SUh0Y2JpQWdJQ0JrWld4bGRHVWdaeTV5WldkbGJtVnlZWFJ2Y2xKMWJuUnBiV1U3WEc0Z0lIMGdZMkYwWTJnb1pTa2dlMXh1SUNBZ0lHY3VjbVZuWlc1bGNtRjBiM0pTZFc1MGFXMWxJRDBnZFc1a1pXWnBibVZrTzF4dUlDQjlYRzU5WEc0aUxDSXZLaXBjYmlBcUlFTnZjSGx5YVdkb2RDQW9ZeWtnTWpBeE5DMXdjbVZ6Wlc1MExDQkdZV05sWW05dmF5d2dTVzVqTGx4dUlDcGNiaUFxSUZSb2FYTWdjMjkxY21ObElHTnZaR1VnYVhNZ2JHbGpaVzV6WldRZ2RXNWtaWElnZEdobElFMUpWQ0JzYVdObGJuTmxJR1p2ZFc1a0lHbHVJSFJvWlZ4dUlDb2dURWxEUlU1VFJTQm1hV3hsSUdsdUlIUm9aU0J5YjI5MElHUnBjbVZqZEc5eWVTQnZaaUIwYUdseklITnZkWEpqWlNCMGNtVmxMbHh1SUNvdlhHNWNiaUVvWm5WdVkzUnBiMjRvWjJ4dlltRnNLU0I3WEc0Z0lGd2lkWE5sSUhOMGNtbGpkRndpTzF4dVhHNGdJSFpoY2lCUGNDQTlJRTlpYW1WamRDNXdjbTkwYjNSNWNHVTdYRzRnSUhaaGNpQm9ZWE5QZDI0Z1BTQlBjQzVvWVhOUGQyNVFjbTl3WlhKMGVUdGNiaUFnZG1GeUlIVnVaR1ZtYVc1bFpEc2dMeThnVFc5eVpTQmpiMjF3Y21WemMybGliR1VnZEdoaGJpQjJiMmxrSURBdVhHNGdJSFpoY2lBa1UzbHRZbTlzSUQwZ2RIbHdaVzltSUZONWJXSnZiQ0E5UFQwZ1hDSm1kVzVqZEdsdmJsd2lJRDhnVTNsdFltOXNJRG9nZTMwN1hHNGdJSFpoY2lCcGRHVnlZWFJ2Y2xONWJXSnZiQ0E5SUNSVGVXMWliMnd1YVhSbGNtRjBiM0lnZkh3Z1hDSkFRR2wwWlhKaGRHOXlYQ0k3WEc0Z0lIWmhjaUJoYzNsdVkwbDBaWEpoZEc5eVUzbHRZbTlzSUQwZ0pGTjViV0p2YkM1aGMzbHVZMGwwWlhKaGRHOXlJSHg4SUZ3aVFFQmhjM2x1WTBsMFpYSmhkRzl5WENJN1hHNGdJSFpoY2lCMGIxTjBjbWx1WjFSaFoxTjViV0p2YkNBOUlDUlRlVzFpYjJ3dWRHOVRkSEpwYm1kVVlXY2dmSHdnWENKQVFIUnZVM1J5YVc1blZHRm5YQ0k3WEc1Y2JpQWdkbUZ5SUdsdVRXOWtkV3hsSUQwZ2RIbHdaVzltSUcxdlpIVnNaU0E5UFQwZ1hDSnZZbXBsWTNSY0lqdGNiaUFnZG1GeUlISjFiblJwYldVZ1BTQm5iRzlpWVd3dWNtVm5aVzVsY21GMGIzSlNkVzUwYVcxbE8xeHVJQ0JwWmlBb2NuVnVkR2x0WlNrZ2UxeHVJQ0FnSUdsbUlDaHBiazF2WkhWc1pTa2dlMXh1SUNBZ0lDQWdMeThnU1dZZ2NtVm5aVzVsY21GMGIzSlNkVzUwYVcxbElHbHpJR1JsWm1sdVpXUWdaMnh2WW1Gc2JIa2dZVzVrSUhkbEozSmxJR2x1SUdFZ2JXOWtkV3hsTEZ4dUlDQWdJQ0FnTHk4Z2JXRnJaU0IwYUdVZ1pYaHdiM0owY3lCdlltcGxZM1FnYVdSbGJuUnBZMkZzSUhSdklISmxaMlZ1WlhKaGRHOXlVblZ1ZEdsdFpTNWNiaUFnSUNBZ0lHMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2NuVnVkR2x0WlR0Y2JpQWdJQ0I5WEc0Z0lDQWdMeThnUkc5dUozUWdZbTkwYUdWeUlHVjJZV3gxWVhScGJtY2dkR2hsSUhKbGMzUWdiMllnZEdocGN5Qm1hV3hsSUdsbUlIUm9aU0J5ZFc1MGFXMWxJSGRoYzF4dUlDQWdJQzh2SUdGc2NtVmhaSGtnWkdWbWFXNWxaQ0JuYkc5aVlXeHNlUzVjYmlBZ0lDQnlaWFIxY200N1hHNGdJSDFjYmx4dUlDQXZMeUJFWldacGJtVWdkR2hsSUhKMWJuUnBiV1VnWjJ4dlltRnNiSGtnS0dGeklHVjRjR1ZqZEdWa0lHSjVJR2RsYm1WeVlYUmxaQ0JqYjJSbEtTQmhjeUJsYVhSb1pYSmNiaUFnTHk4Z2JXOWtkV3hsTG1WNGNHOXlkSE1nS0dsbUlIZGxKM0psSUdsdUlHRWdiVzlrZFd4bEtTQnZjaUJoSUc1bGR5d2daVzF3ZEhrZ2IySnFaV04wTGx4dUlDQnlkVzUwYVcxbElEMGdaMnh2WW1Gc0xuSmxaMlZ1WlhKaGRHOXlVblZ1ZEdsdFpTQTlJR2x1VFc5a2RXeGxJRDhnYlc5a2RXeGxMbVY0Y0c5eWRITWdPaUI3ZlR0Y2JseHVJQ0JtZFc1amRHbHZiaUIzY21Gd0tHbHVibVZ5Um00c0lHOTFkR1Z5Um00c0lITmxiR1lzSUhSeWVVeHZZM05NYVhOMEtTQjdYRzRnSUNBZ0x5OGdTV1lnYjNWMFpYSkdiaUJ3Y205MmFXUmxaQ0JoYm1RZ2IzVjBaWEpHYmk1d2NtOTBiM1I1Y0dVZ2FYTWdZU0JIWlc1bGNtRjBiM0lzSUhSb1pXNGdiM1YwWlhKR2JpNXdjbTkwYjNSNWNHVWdhVzV6ZEdGdVkyVnZaaUJIWlc1bGNtRjBiM0l1WEc0Z0lDQWdkbUZ5SUhCeWIzUnZSMlZ1WlhKaGRHOXlJRDBnYjNWMFpYSkdiaUFtSmlCdmRYUmxja1p1TG5CeWIzUnZkSGx3WlNCcGJuTjBZVzVqWlc5bUlFZGxibVZ5WVhSdmNpQS9JRzkxZEdWeVJtNGdPaUJIWlc1bGNtRjBiM0k3WEc0Z0lDQWdkbUZ5SUdkbGJtVnlZWFJ2Y2lBOUlFOWlhbVZqZEM1amNtVmhkR1VvY0hKdmRHOUhaVzVsY21GMGIzSXVjSEp2ZEc5MGVYQmxLVHRjYmlBZ0lDQjJZWElnWTI5dWRHVjRkQ0E5SUc1bGR5QkRiMjUwWlhoMEtIUnllVXh2WTNOTWFYTjBJSHg4SUZ0ZEtUdGNibHh1SUNBZ0lDOHZJRlJvWlNBdVgybHVkbTlyWlNCdFpYUm9iMlFnZFc1cFptbGxjeUIwYUdVZ2FXMXdiR1Z0Wlc1MFlYUnBiMjV6SUc5bUlIUm9aU0F1Ym1WNGRDeGNiaUFnSUNBdkx5QXVkR2h5YjNjc0lHRnVaQ0F1Y21WMGRYSnVJRzFsZEdodlpITXVYRzRnSUNBZ1oyVnVaWEpoZEc5eUxsOXBiblp2YTJVZ1BTQnRZV3RsU1c1MmIydGxUV1YwYUc5a0tHbHVibVZ5Um00c0lITmxiR1lzSUdOdmJuUmxlSFFwTzF4dVhHNGdJQ0FnY21WMGRYSnVJR2RsYm1WeVlYUnZjanRjYmlBZ2ZWeHVJQ0J5ZFc1MGFXMWxMbmR5WVhBZ1BTQjNjbUZ3TzF4dVhHNGdJQzh2SUZSeWVTOWpZWFJqYUNCb1pXeHdaWElnZEc4Z2JXbHVhVzFwZW1VZ1pHVnZjSFJwYldsNllYUnBiMjV6TGlCU1pYUjFjbTV6SUdFZ1kyOXRjR3hsZEdsdmJseHVJQ0F2THlCeVpXTnZjbVFnYkdsclpTQmpiMjUwWlhoMExuUnllVVZ1ZEhKcFpYTmJhVjB1WTI5dGNHeGxkR2x2Ymk0Z1ZHaHBjeUJwYm5SbGNtWmhZMlVnWTI5MWJHUmNiaUFnTHk4Z2FHRjJaU0JpWldWdUlDaGhibVFnZDJGeklIQnlaWFpwYjNWemJIa3BJR1JsYzJsbmJtVmtJSFJ2SUhSaGEyVWdZU0JqYkc5emRYSmxJSFJ2SUdKbFhHNGdJQzh2SUdsdWRtOXJaV1FnZDJsMGFHOTFkQ0JoY21kMWJXVnVkSE1zSUdKMWRDQnBiaUJoYkd3Z2RHaGxJR05oYzJWeklIZGxJR05oY21VZ1lXSnZkWFFnZDJWY2JpQWdMeThnWVd4eVpXRmtlU0JvWVhabElHRnVJR1Y0YVhOMGFXNW5JRzFsZEdodlpDQjNaU0IzWVc1MElIUnZJR05oYkd3c0lITnZJSFJvWlhKbEozTWdibThnYm1WbFpGeHVJQ0F2THlCMGJ5QmpjbVZoZEdVZ1lTQnVaWGNnWm5WdVkzUnBiMjRnYjJKcVpXTjBMaUJYWlNCallXNGdaWFpsYmlCblpYUWdZWGRoZVNCM2FYUm9JR0Z6YzNWdGFXNW5YRzRnSUM4dklIUm9aU0J0WlhSb2IyUWdkR0ZyWlhNZ1pYaGhZM1JzZVNCdmJtVWdZWEpuZFcxbGJuUXNJSE5wYm1ObElIUm9ZWFFnYUdGd2NHVnVjeUIwYnlCaVpTQjBjblZsWEc0Z0lDOHZJR2x1SUdWMlpYSjVJR05oYzJVc0lITnZJSGRsSUdSdmJpZDBJR2hoZG1VZ2RHOGdkRzkxWTJnZ2RHaGxJR0Z5WjNWdFpXNTBjeUJ2WW1wbFkzUXVJRlJvWlZ4dUlDQXZMeUJ2Ym14NUlHRmtaR2wwYVc5dVlXd2dZV3hzYjJOaGRHbHZiaUJ5WlhGMWFYSmxaQ0JwY3lCMGFHVWdZMjl0Y0d4bGRHbHZiaUJ5WldOdmNtUXNJSGRvYVdOb1hHNGdJQzh2SUdoaGN5QmhJSE4wWVdKc1pTQnphR0Z3WlNCaGJtUWdjMjhnYUc5d1pXWjFiR3g1SUhOb2IzVnNaQ0JpWlNCamFHVmhjQ0IwYnlCaGJHeHZZMkYwWlM1Y2JpQWdablZ1WTNScGIyNGdkSEo1UTJGMFkyZ29abTRzSUc5aWFpd2dZWEpuS1NCN1hHNGdJQ0FnZEhKNUlIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCN0lIUjVjR1U2SUZ3aWJtOXliV0ZzWENJc0lHRnlaem9nWm00dVkyRnNiQ2h2WW1vc0lHRnlaeWtnZlR0Y2JpQWdJQ0I5SUdOaGRHTm9JQ2hsY25JcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCN0lIUjVjR1U2SUZ3aWRHaHliM2RjSWl3Z1lYSm5PaUJsY25JZ2ZUdGNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQjJZWElnUjJWdVUzUmhkR1ZUZFhOd1pXNWtaV1JUZEdGeWRDQTlJRndpYzNWemNHVnVaR1ZrVTNSaGNuUmNJanRjYmlBZ2RtRnlJRWRsYmxOMFlYUmxVM1Z6Y0dWdVpHVmtXV2xsYkdRZ1BTQmNJbk4xYzNCbGJtUmxaRmxwWld4a1hDSTdYRzRnSUhaaGNpQkhaVzVUZEdGMFpVVjRaV04xZEdsdVp5QTlJRndpWlhobFkzVjBhVzVuWENJN1hHNGdJSFpoY2lCSFpXNVRkR0YwWlVOdmJYQnNaWFJsWkNBOUlGd2lZMjl0Y0d4bGRHVmtYQ0k3WEc1Y2JpQWdMeThnVW1WMGRYSnVhVzVuSUhSb2FYTWdiMkpxWldOMElHWnliMjBnZEdobElHbHVibVZ5Um00Z2FHRnpJSFJvWlNCellXMWxJR1ZtWm1WamRDQmhjMXh1SUNBdkx5QmljbVZoYTJsdVp5QnZkWFFnYjJZZ2RHaGxJR1JwYzNCaGRHTm9JSE4zYVhSamFDQnpkR0YwWlcxbGJuUXVYRzRnSUhaaGNpQkRiMjUwYVc1MVpWTmxiblJwYm1Wc0lEMGdlMzA3WEc1Y2JpQWdMeThnUkhWdGJYa2dZMjl1YzNSeWRXTjBiM0lnWm5WdVkzUnBiMjV6SUhSb1lYUWdkMlVnZFhObElHRnpJSFJvWlNBdVkyOXVjM1J5ZFdOMGIzSWdZVzVrWEc0Z0lDOHZJQzVqYjI1emRISjFZM1J2Y2k1d2NtOTBiM1I1Y0dVZ2NISnZjR1Z5ZEdsbGN5Qm1iM0lnWm5WdVkzUnBiMjV6SUhSb1lYUWdjbVYwZFhKdUlFZGxibVZ5WVhSdmNseHVJQ0F2THlCdlltcGxZM1J6TGlCR2IzSWdablZzYkNCemNHVmpJR052YlhCc2FXRnVZMlVzSUhsdmRTQnRZWGtnZDJsemFDQjBieUJqYjI1bWFXZDFjbVVnZVc5MWNseHVJQ0F2THlCdGFXNXBabWxsY2lCdWIzUWdkRzhnYldGdVoyeGxJSFJvWlNCdVlXMWxjeUJ2WmlCMGFHVnpaU0IwZDI4Z1puVnVZM1JwYjI1ekxseHVJQ0JtZFc1amRHbHZiaUJIWlc1bGNtRjBiM0lvS1NCN2ZWeHVJQ0JtZFc1amRHbHZiaUJIWlc1bGNtRjBiM0pHZFc1amRHbHZiaWdwSUh0OVhHNGdJR1oxYm1OMGFXOXVJRWRsYm1WeVlYUnZja1oxYm1OMGFXOXVVSEp2ZEc5MGVYQmxLQ2tnZTMxY2JseHVJQ0F2THlCVWFHbHpJR2x6SUdFZ2NHOXNlV1pwYkd3Z1ptOXlJQ1ZKZEdWeVlYUnZjbEJ5YjNSdmRIbHdaU1VnWm05eUlHVnVkbWx5YjI1dFpXNTBjeUIwYUdGMFhHNGdJQzh2SUdSdmJpZDBJRzVoZEdsMlpXeDVJSE4xY0hCdmNuUWdhWFF1WEc0Z0lIWmhjaUJKZEdWeVlYUnZjbEJ5YjNSdmRIbHdaU0E5SUh0OU8xeHVJQ0JKZEdWeVlYUnZjbEJ5YjNSdmRIbHdaVnRwZEdWeVlYUnZjbE41YldKdmJGMGdQU0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnY21WMGRYSnVJSFJvYVhNN1hHNGdJSDA3WEc1Y2JpQWdkbUZ5SUdkbGRGQnliM1J2SUQwZ1QySnFaV04wTG1kbGRGQnliM1J2ZEhsd1pVOW1PMXh1SUNCMllYSWdUbUYwYVhabFNYUmxjbUYwYjNKUWNtOTBiM1I1Y0dVZ1BTQm5aWFJRY205MGJ5QW1KaUJuWlhSUWNtOTBieWhuWlhSUWNtOTBieWgyWVd4MVpYTW9XMTBwS1NrN1hHNGdJR2xtSUNoT1lYUnBkbVZKZEdWeVlYUnZjbEJ5YjNSdmRIbHdaU0FtSmx4dUlDQWdJQ0FnVG1GMGFYWmxTWFJsY21GMGIzSlFjbTkwYjNSNWNHVWdJVDA5SUU5d0lDWW1YRzRnSUNBZ0lDQm9ZWE5QZDI0dVkyRnNiQ2hPWVhScGRtVkpkR1Z5WVhSdmNsQnliM1J2ZEhsd1pTd2dhWFJsY21GMGIzSlRlVzFpYjJ3cEtTQjdYRzRnSUNBZ0x5OGdWR2hwY3lCbGJuWnBjbTl1YldWdWRDQm9ZWE1nWVNCdVlYUnBkbVVnSlVsMFpYSmhkRzl5VUhKdmRHOTBlWEJsSlRzZ2RYTmxJR2wwSUdsdWMzUmxZV1JjYmlBZ0lDQXZMeUJ2WmlCMGFHVWdjRzlzZVdacGJHd3VYRzRnSUNBZ1NYUmxjbUYwYjNKUWNtOTBiM1I1Y0dVZ1BTQk9ZWFJwZG1WSmRHVnlZWFJ2Y2xCeWIzUnZkSGx3WlR0Y2JpQWdmVnh1WEc0Z0lIWmhjaUJIY0NBOUlFZGxibVZ5WVhSdmNrWjFibU4wYVc5dVVISnZkRzkwZVhCbExuQnliM1J2ZEhsd1pTQTlYRzRnSUNBZ1IyVnVaWEpoZEc5eUxuQnliM1J2ZEhsd1pTQTlJRTlpYW1WamRDNWpjbVZoZEdVb1NYUmxjbUYwYjNKUWNtOTBiM1I1Y0dVcE8xeHVJQ0JIWlc1bGNtRjBiM0pHZFc1amRHbHZiaTV3Y205MGIzUjVjR1VnUFNCSGNDNWpiMjV6ZEhKMVkzUnZjaUE5SUVkbGJtVnlZWFJ2Y2taMWJtTjBhVzl1VUhKdmRHOTBlWEJsTzF4dUlDQkhaVzVsY21GMGIzSkdkVzVqZEdsdmJsQnliM1J2ZEhsd1pTNWpiMjV6ZEhKMVkzUnZjaUE5SUVkbGJtVnlZWFJ2Y2taMWJtTjBhVzl1TzF4dUlDQkhaVzVsY21GMGIzSkdkVzVqZEdsdmJsQnliM1J2ZEhsd1pWdDBiMU4wY21sdVoxUmhaMU41YldKdmJGMGdQVnh1SUNBZ0lFZGxibVZ5WVhSdmNrWjFibU4wYVc5dUxtUnBjM0JzWVhsT1lXMWxJRDBnWENKSFpXNWxjbUYwYjNKR2RXNWpkR2x2Ymx3aU8xeHVYRzRnSUM4dklFaGxiSEJsY2lCbWIzSWdaR1ZtYVc1cGJtY2dkR2hsSUM1dVpYaDBMQ0F1ZEdoeWIzY3NJR0Z1WkNBdWNtVjBkWEp1SUcxbGRHaHZaSE1nYjJZZ2RHaGxYRzRnSUM4dklFbDBaWEpoZEc5eUlHbHVkR1Z5Wm1GalpTQnBiaUIwWlhKdGN5QnZaaUJoSUhOcGJtZHNaU0F1WDJsdWRtOXJaU0J0WlhSb2IyUXVYRzRnSUdaMWJtTjBhVzl1SUdSbFptbHVaVWwwWlhKaGRHOXlUV1YwYUc5a2N5aHdjbTkwYjNSNWNHVXBJSHRjYmlBZ0lDQmJYQ0p1WlhoMFhDSXNJRndpZEdoeWIzZGNJaXdnWENKeVpYUjFjbTVjSWwwdVptOXlSV0ZqYUNobWRXNWpkR2x2YmlodFpYUm9iMlFwSUh0Y2JpQWdJQ0FnSUhCeWIzUnZkSGx3WlZ0dFpYUm9iMlJkSUQwZ1puVnVZM1JwYjI0b1lYSm5LU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUIwYUdsekxsOXBiblp2YTJVb2JXVjBhRzlrTENCaGNtY3BPMXh1SUNBZ0lDQWdmVHRjYmlBZ0lDQjlLVHRjYmlBZ2ZWeHVYRzRnSUhKMWJuUnBiV1V1YVhOSFpXNWxjbUYwYjNKR2RXNWpkR2x2YmlBOUlHWjFibU4wYVc5dUtHZGxia1oxYmlrZ2UxeHVJQ0FnSUhaaGNpQmpkRzl5SUQwZ2RIbHdaVzltSUdkbGJrWjFiaUE5UFQwZ1hDSm1kVzVqZEdsdmJsd2lJQ1ltSUdkbGJrWjFiaTVqYjI1emRISjFZM1J2Y2p0Y2JpQWdJQ0J5WlhSMWNtNGdZM1J2Y2x4dUlDQWdJQ0FnUHlCamRHOXlJRDA5UFNCSFpXNWxjbUYwYjNKR2RXNWpkR2x2YmlCOGZGeHVJQ0FnSUNBZ0lDQXZMeUJHYjNJZ2RHaGxJRzVoZEdsMlpTQkhaVzVsY21GMGIzSkdkVzVqZEdsdmJpQmpiMjV6ZEhKMVkzUnZjaXdnZEdobElHSmxjM1FnZDJVZ1kyRnVYRzRnSUNBZ0lDQWdJQzh2SUdSdklHbHpJSFJ2SUdOb1pXTnJJR2wwY3lBdWJtRnRaU0J3Y205d1pYSjBlUzVjYmlBZ0lDQWdJQ0FnS0dOMGIzSXVaR2x6Y0d4aGVVNWhiV1VnZkh3Z1kzUnZjaTV1WVcxbEtTQTlQVDBnWENKSFpXNWxjbUYwYjNKR2RXNWpkR2x2Ymx3aVhHNGdJQ0FnSUNBNklHWmhiSE5sTzF4dUlDQjlPMXh1WEc0Z0lISjFiblJwYldVdWJXRnlheUE5SUdaMWJtTjBhVzl1S0dkbGJrWjFiaWtnZTF4dUlDQWdJR2xtSUNoUFltcGxZM1F1YzJWMFVISnZkRzkwZVhCbFQyWXBJSHRjYmlBZ0lDQWdJRTlpYW1WamRDNXpaWFJRY205MGIzUjVjR1ZQWmloblpXNUdkVzRzSUVkbGJtVnlZWFJ2Y2taMWJtTjBhVzl1VUhKdmRHOTBlWEJsS1R0Y2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdaMlZ1Um5WdUxsOWZjSEp2ZEc5Zlh5QTlJRWRsYm1WeVlYUnZja1oxYm1OMGFXOXVVSEp2ZEc5MGVYQmxPMXh1SUNBZ0lDQWdhV1lnS0NFb2RHOVRkSEpwYm1kVVlXZFRlVzFpYjJ3Z2FXNGdaMlZ1Um5WdUtTa2dlMXh1SUNBZ0lDQWdJQ0JuWlc1R2RXNWJkRzlUZEhKcGJtZFVZV2RUZVcxaWIyeGRJRDBnWENKSFpXNWxjbUYwYjNKR2RXNWpkR2x2Ymx3aU8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgxY2JpQWdJQ0JuWlc1R2RXNHVjSEp2ZEc5MGVYQmxJRDBnVDJKcVpXTjBMbU55WldGMFpTaEhjQ2s3WEc0Z0lDQWdjbVYwZFhKdUlHZGxia1oxYmp0Y2JpQWdmVHRjYmx4dUlDQXZMeUJYYVhSb2FXNGdkR2hsSUdKdlpIa2diMllnWVc1NUlHRnplVzVqSUdaMWJtTjBhVzl1TENCZ1lYZGhhWFFnZUdBZ2FYTWdkSEpoYm5ObWIzSnRaV1FnZEc5Y2JpQWdMeThnWUhscFpXeGtJSEpsWjJWdVpYSmhkRzl5VW5WdWRHbHRaUzVoZDNKaGNDaDRLV0FzSUhOdklIUm9ZWFFnZEdobElISjFiblJwYldVZ1kyRnVJSFJsYzNSY2JpQWdMeThnWUdoaGMwOTNiaTVqWVd4c0tIWmhiSFZsTENCY0lsOWZZWGRoYVhSY0lpbGdJSFJ2SUdSbGRHVnliV2x1WlNCcFppQjBhR1VnZVdsbGJHUmxaQ0IyWVd4MVpTQnBjMXh1SUNBdkx5QnRaV0Z1ZENCMGJ5QmlaU0JoZDJGcGRHVmtMbHh1SUNCeWRXNTBhVzFsTG1GM2NtRndJRDBnWm5WdVkzUnBiMjRvWVhKbktTQjdYRzRnSUNBZ2NtVjBkWEp1SUhzZ1gxOWhkMkZwZERvZ1lYSm5JSDA3WEc0Z0lIMDdYRzVjYmlBZ1puVnVZM1JwYjI0Z1FYTjVibU5KZEdWeVlYUnZjaWhuWlc1bGNtRjBiM0lwSUh0Y2JpQWdJQ0JtZFc1amRHbHZiaUJwYm5admEyVW9iV1YwYUc5a0xDQmhjbWNzSUhKbGMyOXNkbVVzSUhKbGFtVmpkQ2tnZTF4dUlDQWdJQ0FnZG1GeUlISmxZMjl5WkNBOUlIUnllVU5oZEdOb0tHZGxibVZ5WVhSdmNsdHRaWFJvYjJSZExDQm5aVzVsY21GMGIzSXNJR0Z5WnlrN1hHNGdJQ0FnSUNCcFppQW9jbVZqYjNKa0xuUjVjR1VnUFQwOUlGd2lkR2h5YjNkY0lpa2dlMXh1SUNBZ0lDQWdJQ0J5WldwbFkzUW9jbVZqYjNKa0xtRnlaeWs3WEc0Z0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0IyWVhJZ2NtVnpkV3gwSUQwZ2NtVmpiM0prTG1GeVp6dGNiaUFnSUNBZ0lDQWdkbUZ5SUhaaGJIVmxJRDBnY21WemRXeDBMblpoYkhWbE8xeHVJQ0FnSUNBZ0lDQnBaaUFvZG1Gc2RXVWdKaVpjYmlBZ0lDQWdJQ0FnSUNBZ0lIUjVjR1Z2WmlCMllXeDFaU0E5UFQwZ1hDSnZZbXBsWTNSY0lpQW1KbHh1SUNBZ0lDQWdJQ0FnSUNBZ2FHRnpUM2R1TG1OaGJHd29kbUZzZFdVc0lGd2lYMTloZDJGcGRGd2lLU2tnZTF4dUlDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCUWNtOXRhWE5sTG5KbGMyOXNkbVVvZG1Gc2RXVXVYMTloZDJGcGRDa3VkR2hsYmlobWRXNWpkR2x2YmloMllXeDFaU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdhVzUyYjJ0bEtGd2libVY0ZEZ3aUxDQjJZV3gxWlN3Z2NtVnpiMngyWlN3Z2NtVnFaV04wS1R0Y2JpQWdJQ0FnSUNBZ0lDQjlMQ0JtZFc1amRHbHZiaWhsY25JcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsdWRtOXJaU2hjSW5Sb2NtOTNYQ0lzSUdWeWNpd2djbVZ6YjJ4MlpTd2djbVZxWldOMEtUdGNiaUFnSUNBZ0lDQWdJQ0I5S1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQlFjbTl0YVhObExuSmxjMjlzZG1Vb2RtRnNkV1VwTG5Sb1pXNG9ablZ1WTNScGIyNG9kVzUzY21Gd2NHVmtLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0x5OGdWMmhsYmlCaElIbHBaV3hrWldRZ1VISnZiV2x6WlNCcGN5QnlaWE52YkhabFpDd2dhWFJ6SUdacGJtRnNJSFpoYkhWbElHSmxZMjl0WlhOY2JpQWdJQ0FnSUNBZ0lDQXZMeUIwYUdVZ0xuWmhiSFZsSUc5bUlIUm9aU0JRY205dGFYTmxQSHQyWVd4MVpTeGtiMjVsZlQ0Z2NtVnpkV3gwSUdadmNpQjBhR1ZjYmlBZ0lDQWdJQ0FnSUNBdkx5QmpkWEp5Wlc1MElHbDBaWEpoZEdsdmJpNGdTV1lnZEdobElGQnliMjFwYzJVZ2FYTWdjbVZxWldOMFpXUXNJR2h2ZDJWMlpYSXNJSFJvWlZ4dUlDQWdJQ0FnSUNBZ0lDOHZJSEpsYzNWc2RDQm1iM0lnZEdocGN5QnBkR1Z5WVhScGIyNGdkMmxzYkNCaVpTQnlaV3BsWTNSbFpDQjNhWFJvSUhSb1pTQnpZVzFsWEc0Z0lDQWdJQ0FnSUNBZ0x5OGdjbVZoYzI5dUxpQk9iM1JsSUhSb1lYUWdjbVZxWldOMGFXOXVjeUJ2WmlCNWFXVnNaR1ZrSUZCeWIyMXBjMlZ6SUdGeVpTQnViM1JjYmlBZ0lDQWdJQ0FnSUNBdkx5QjBhSEp2ZDI0Z1ltRmpheUJwYm5SdklIUm9aU0JuWlc1bGNtRjBiM0lnWm5WdVkzUnBiMjRzSUdGeklHbHpJSFJvWlNCallYTmxYRzRnSUNBZ0lDQWdJQ0FnTHk4Z2QyaGxiaUJoYmlCaGQyRnBkR1ZrSUZCeWIyMXBjMlVnYVhNZ2NtVnFaV04wWldRdUlGUm9hWE1nWkdsbVptVnlaVzVqWlNCcGJseHVJQ0FnSUNBZ0lDQWdJQzh2SUdKbGFHRjJhVzl5SUdKbGRIZGxaVzRnZVdsbGJHUWdZVzVrSUdGM1lXbDBJR2x6SUdsdGNHOXlkR0Z1ZEN3Z1ltVmpZWFZ6WlNCcGRGeHVJQ0FnSUNBZ0lDQWdJQzh2SUdGc2JHOTNjeUIwYUdVZ1kyOXVjM1Z0WlhJZ2RHOGdaR1ZqYVdSbElIZG9ZWFFnZEc4Z1pHOGdkMmwwYUNCMGFHVWdlV2xsYkdSbFpGeHVJQ0FnSUNBZ0lDQWdJQzh2SUhKbGFtVmpkR2x2YmlBb2MzZGhiR3h2ZHlCcGRDQmhibVFnWTI5dWRHbHVkV1VzSUcxaGJuVmhiR3g1SUM1MGFISnZkeUJwZENCaVlXTnJYRzRnSUNBZ0lDQWdJQ0FnTHk4Z2FXNTBieUIwYUdVZ1oyVnVaWEpoZEc5eUxDQmhZbUZ1Wkc5dUlHbDBaWEpoZEdsdmJpd2dkMmhoZEdWMlpYSXBMaUJYYVhSb1hHNGdJQ0FnSUNBZ0lDQWdMeThnWVhkaGFYUXNJR0o1SUdOdmJuUnlZWE4wTENCMGFHVnlaU0JwY3lCdWJ5QnZjSEJ2Y25SMWJtbDBlU0IwYnlCbGVHRnRhVzVsSUhSb1pWeHVJQ0FnSUNBZ0lDQWdJQzh2SUhKbGFtVmpkR2x2YmlCeVpXRnpiMjRnYjNWMGMybGtaU0IwYUdVZ1oyVnVaWEpoZEc5eUlHWjFibU4wYVc5dUxDQnpieUIwYUdWY2JpQWdJQ0FnSUNBZ0lDQXZMeUJ2Ym14NUlHOXdkR2x2YmlCcGN5QjBieUIwYUhKdmR5QnBkQ0JtY205dElIUm9aU0JoZDJGcGRDQmxlSEJ5WlhOemFXOXVMQ0JoYm1SY2JpQWdJQ0FnSUNBZ0lDQXZMeUJzWlhRZ2RHaGxJR2RsYm1WeVlYUnZjaUJtZFc1amRHbHZiaUJvWVc1a2JHVWdkR2hsSUdWNFkyVndkR2x2Ymk1Y2JpQWdJQ0FnSUNBZ0lDQnlaWE4xYkhRdWRtRnNkV1VnUFNCMWJuZHlZWEJ3WldRN1hHNGdJQ0FnSUNBZ0lDQWdjbVZ6YjJ4MlpTaHlaWE4xYkhRcE8xeHVJQ0FnSUNBZ0lDQjlMQ0J5WldwbFkzUXBPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMWNibHh1SUNBZ0lIWmhjaUJ3Y21WMmFXOTFjMUJ5YjIxcGMyVTdYRzVjYmlBZ0lDQm1kVzVqZEdsdmJpQmxibkYxWlhWbEtHMWxkR2h2WkN3Z1lYSm5LU0I3WEc0Z0lDQWdJQ0JtZFc1amRHbHZiaUJqWVd4c1NXNTJiMnRsVjJsMGFFMWxkR2h2WkVGdVpFRnlaeWdwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUc1bGR5QlFjbTl0YVhObEtHWjFibU4wYVc5dUtISmxjMjlzZG1Vc0lISmxhbVZqZENrZ2UxeHVJQ0FnSUNBZ0lDQWdJR2x1ZG05clpTaHRaWFJvYjJRc0lHRnlaeXdnY21WemIyeDJaU3dnY21WcVpXTjBLVHRjYmlBZ0lDQWdJQ0FnZlNrN1hHNGdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lISmxkSFZ5YmlCd2NtVjJhVzkxYzFCeWIyMXBjMlVnUFZ4dUlDQWdJQ0FnSUNBdkx5QkpaaUJsYm5GMVpYVmxJR2hoY3lCaVpXVnVJR05oYkd4bFpDQmlaV1p2Y21Vc0lIUm9aVzRnZDJVZ2QyRnVkQ0IwYnlCM1lXbDBJSFZ1ZEdsc1hHNGdJQ0FnSUNBZ0lDOHZJR0ZzYkNCd2NtVjJhVzkxY3lCUWNtOXRhWE5sY3lCb1lYWmxJR0psWlc0Z2NtVnpiMngyWldRZ1ltVm1iM0psSUdOaGJHeHBibWNnYVc1MmIydGxMRnh1SUNBZ0lDQWdJQ0F2THlCemJ5QjBhR0YwSUhKbGMzVnNkSE1nWVhKbElHRnNkMkY1Y3lCa1pXeHBkbVZ5WldRZ2FXNGdkR2hsSUdOdmNuSmxZM1FnYjNKa1pYSXVJRWxtWEc0Z0lDQWdJQ0FnSUM4dklHVnVjWFZsZFdVZ2FHRnpJRzV2ZENCaVpXVnVJR05oYkd4bFpDQmlaV1p2Y21Vc0lIUm9aVzRnYVhRZ2FYTWdhVzF3YjNKMFlXNTBJSFJ2WEc0Z0lDQWdJQ0FnSUM4dklHTmhiR3dnYVc1MmIydGxJR2x0YldWa2FXRjBaV3g1TENCM2FYUm9iM1YwSUhkaGFYUnBibWNnYjI0Z1lTQmpZV3hzWW1GamF5QjBieUJtYVhKbExGeHVJQ0FnSUNBZ0lDQXZMeUJ6YnlCMGFHRjBJSFJvWlNCaGMzbHVZeUJuWlc1bGNtRjBiM0lnWm5WdVkzUnBiMjRnYUdGeklIUm9aU0J2Y0hCdmNuUjFibWwwZVNCMGJ5QmtiMXh1SUNBZ0lDQWdJQ0F2THlCaGJua2dibVZqWlhOellYSjVJSE5sZEhWd0lHbHVJR0VnY0hKbFpHbGpkR0ZpYkdVZ2QyRjVMaUJVYUdseklIQnlaV1JwWTNSaFltbHNhWFI1WEc0Z0lDQWdJQ0FnSUM4dklHbHpJSGRvZVNCMGFHVWdVSEp2YldselpTQmpiMjV6ZEhKMVkzUnZjaUJ6ZVc1amFISnZibTkxYzJ4NUlHbHVkbTlyWlhNZ2FYUnpYRzRnSUNBZ0lDQWdJQzh2SUdWNFpXTjFkRzl5SUdOaGJHeGlZV05yTENCaGJtUWdkMmg1SUdGemVXNWpJR1oxYm1OMGFXOXVjeUJ6ZVc1amFISnZibTkxYzJ4NVhHNGdJQ0FnSUNBZ0lDOHZJR1Y0WldOMWRHVWdZMjlrWlNCaVpXWnZjbVVnZEdobElHWnBjbk4wSUdGM1lXbDBMaUJUYVc1alpTQjNaU0JwYlhCc1pXMWxiblFnYzJsdGNHeGxYRzRnSUNBZ0lDQWdJQzh2SUdGemVXNWpJR1oxYm1OMGFXOXVjeUJwYmlCMFpYSnRjeUJ2WmlCaGMzbHVZeUJuWlc1bGNtRjBiM0p6TENCcGRDQnBjeUJsYzNCbFkybGhiR3g1WEc0Z0lDQWdJQ0FnSUM4dklHbHRjRzl5ZEdGdWRDQjBieUJuWlhRZ2RHaHBjeUJ5YVdkb2RDd2daWFpsYmlCMGFHOTFaMmdnYVhRZ2NtVnhkV2x5WlhNZ1kyRnlaUzVjYmlBZ0lDQWdJQ0FnY0hKbGRtbHZkWE5RY205dGFYTmxJRDhnY0hKbGRtbHZkWE5RY205dGFYTmxMblJvWlc0b1hHNGdJQ0FnSUNBZ0lDQWdZMkZzYkVsdWRtOXJaVmRwZEdoTlpYUm9iMlJCYm1SQmNtY3NYRzRnSUNBZ0lDQWdJQ0FnTHk4Z1FYWnZhV1FnY0hKdmNHRm5ZWFJwYm1jZ1ptRnBiSFZ5WlhNZ2RHOGdVSEp2YldselpYTWdjbVYwZFhKdVpXUWdZbmtnYkdGMFpYSmNiaUFnSUNBZ0lDQWdJQ0F2THlCcGJuWnZZMkYwYVc5dWN5QnZaaUIwYUdVZ2FYUmxjbUYwYjNJdVhHNGdJQ0FnSUNBZ0lDQWdZMkZzYkVsdWRtOXJaVmRwZEdoTlpYUm9iMlJCYm1SQmNtZGNiaUFnSUNBZ0lDQWdLU0E2SUdOaGJHeEpiblp2YTJWWGFYUm9UV1YwYUc5a1FXNWtRWEpuS0NrN1hHNGdJQ0FnZlZ4dVhHNGdJQ0FnTHk4Z1JHVm1hVzVsSUhSb1pTQjFibWxtYVdWa0lHaGxiSEJsY2lCdFpYUm9iMlFnZEdoaGRDQnBjeUIxYzJWa0lIUnZJR2x0Y0d4bGJXVnVkQ0F1Ym1WNGRDeGNiaUFnSUNBdkx5QXVkR2h5YjNjc0lHRnVaQ0F1Y21WMGRYSnVJQ2h6WldVZ1pHVm1hVzVsU1hSbGNtRjBiM0pOWlhSb2IyUnpLUzVjYmlBZ0lDQjBhR2x6TGw5cGJuWnZhMlVnUFNCbGJuRjFaWFZsTzF4dUlDQjlYRzVjYmlBZ1pHVm1hVzVsU1hSbGNtRjBiM0pOWlhSb2IyUnpLRUZ6ZVc1alNYUmxjbUYwYjNJdWNISnZkRzkwZVhCbEtUdGNiaUFnUVhONWJtTkpkR1Z5WVhSdmNpNXdjbTkwYjNSNWNHVmJZWE41Ym1OSmRHVnlZWFJ2Y2xONWJXSnZiRjBnUFNCbWRXNWpkR2x2YmlBb0tTQjdYRzRnSUNBZ2NtVjBkWEp1SUhSb2FYTTdYRzRnSUgwN1hHNGdJSEoxYm5ScGJXVXVRWE41Ym1OSmRHVnlZWFJ2Y2lBOUlFRnplVzVqU1hSbGNtRjBiM0k3WEc1Y2JpQWdMeThnVG05MFpTQjBhR0YwSUhOcGJYQnNaU0JoYzNsdVl5Qm1kVzVqZEdsdmJuTWdZWEpsSUdsdGNHeGxiV1Z1ZEdWa0lHOXVJSFJ2Y0NCdlpseHVJQ0F2THlCQmMzbHVZMGwwWlhKaGRHOXlJRzlpYW1WamRITTdJSFJvWlhrZ2FuVnpkQ0J5WlhSMWNtNGdZU0JRY205dGFYTmxJR1p2Y2lCMGFHVWdkbUZzZFdVZ2IyWmNiaUFnTHk4Z2RHaGxJR1pwYm1Gc0lISmxjM1ZzZENCd2NtOWtkV05sWkNCaWVTQjBhR1VnYVhSbGNtRjBiM0l1WEc0Z0lISjFiblJwYldVdVlYTjVibU1nUFNCbWRXNWpkR2x2YmlocGJtNWxja1p1TENCdmRYUmxja1p1TENCelpXeG1MQ0IwY25sTWIyTnpUR2x6ZENrZ2UxeHVJQ0FnSUhaaGNpQnBkR1Z5SUQwZ2JtVjNJRUZ6ZVc1alNYUmxjbUYwYjNJb1hHNGdJQ0FnSUNCM2NtRndLR2x1Ym1WeVJtNHNJRzkxZEdWeVJtNHNJSE5sYkdZc0lIUnllVXh2WTNOTWFYTjBLVnh1SUNBZ0lDazdYRzVjYmlBZ0lDQnlaWFIxY200Z2NuVnVkR2x0WlM1cGMwZGxibVZ5WVhSdmNrWjFibU4wYVc5dUtHOTFkR1Z5Um00cFhHNGdJQ0FnSUNBL0lHbDBaWElnTHk4Z1NXWWdiM1YwWlhKR2JpQnBjeUJoSUdkbGJtVnlZWFJ2Y2l3Z2NtVjBkWEp1SUhSb1pTQm1kV3hzSUdsMFpYSmhkRzl5TGx4dUlDQWdJQ0FnT2lCcGRHVnlMbTVsZUhRb0tTNTBhR1Z1S0daMWJtTjBhVzl1S0hKbGMzVnNkQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCeVpYTjFiSFF1Wkc5dVpTQS9JSEpsYzNWc2RDNTJZV3gxWlNBNklHbDBaWEl1Ym1WNGRDZ3BPMXh1SUNBZ0lDQWdJQ0I5S1R0Y2JpQWdmVHRjYmx4dUlDQm1kVzVqZEdsdmJpQnRZV3RsU1c1MmIydGxUV1YwYUc5a0tHbHVibVZ5Um00c0lITmxiR1lzSUdOdmJuUmxlSFFwSUh0Y2JpQWdJQ0IyWVhJZ2MzUmhkR1VnUFNCSFpXNVRkR0YwWlZOMWMzQmxibVJsWkZOMFlYSjBPMXh1WEc0Z0lDQWdjbVYwZFhKdUlHWjFibU4wYVc5dUlHbHVkbTlyWlNodFpYUm9iMlFzSUdGeVp5a2dlMXh1SUNBZ0lDQWdhV1lnS0hOMFlYUmxJRDA5UFNCSFpXNVRkR0YwWlVWNFpXTjFkR2x1WnlrZ2UxeHVJQ0FnSUNBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb1hDSkhaVzVsY21GMGIzSWdhWE1nWVd4eVpXRmtlU0J5ZFc1dWFXNW5YQ0lwTzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCcFppQW9jM1JoZEdVZ1BUMDlJRWRsYmxOMFlYUmxRMjl0Y0d4bGRHVmtLU0I3WEc0Z0lDQWdJQ0FnSUdsbUlDaHRaWFJvYjJRZ1BUMDlJRndpZEdoeWIzZGNJaWtnZTF4dUlDQWdJQ0FnSUNBZ0lIUm9jbTkzSUdGeVp6dGNiaUFnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUM4dklFSmxJR1p2Y21kcGRtbHVaeXdnY0dWeUlESTFMak11TXk0ekxqTWdiMllnZEdobElITndaV002WEc0Z0lDQWdJQ0FnSUM4dklHaDBkSEJ6T2k4dmNHVnZjR3hsTG0xdmVtbHNiR0V1YjNKbkwzNXFiM0psYm1SdmNtWm1MMlZ6Tmkxa2NtRm1kQzVvZEcxc0kzTmxZeTFuWlc1bGNtRjBiM0p5WlhOMWJXVmNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHUnZibVZTWlhOMWJIUW9LVHRjYmlBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnWTI5dWRHVjRkQzV0WlhSb2IyUWdQU0J0WlhSb2IyUTdYRzRnSUNBZ0lDQmpiMjUwWlhoMExtRnlaeUE5SUdGeVp6dGNibHh1SUNBZ0lDQWdkMmhwYkdVZ0tIUnlkV1VwSUh0Y2JpQWdJQ0FnSUNBZ2RtRnlJR1JsYkdWbllYUmxJRDBnWTI5dWRHVjRkQzVrWld4bFoyRjBaVHRjYmlBZ0lDQWdJQ0FnYVdZZ0tHUmxiR1ZuWVhSbEtTQjdYRzRnSUNBZ0lDQWdJQ0FnZG1GeUlHUmxiR1ZuWVhSbFVtVnpkV3gwSUQwZ2JXRjVZbVZKYm5admEyVkVaV3hsWjJGMFpTaGtaV3hsWjJGMFpTd2dZMjl1ZEdWNGRDazdYRzRnSUNBZ0lDQWdJQ0FnYVdZZ0tHUmxiR1ZuWVhSbFVtVnpkV3gwS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1pHVnNaV2RoZEdWU1pYTjFiSFFnUFQwOUlFTnZiblJwYm5WbFUyVnVkR2x1Wld3cElHTnZiblJwYm5WbE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJR1JsYkdWbllYUmxVbVZ6ZFd4ME8xeHVJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lHbG1JQ2hqYjI1MFpYaDBMbTFsZEdodlpDQTlQVDBnWENKdVpYaDBYQ0lwSUh0Y2JpQWdJQ0FnSUNBZ0lDQXZMeUJUWlhSMGFXNW5JR052Ym5SbGVIUXVYM05sYm5RZ1ptOXlJR3hsWjJGamVTQnpkWEJ3YjNKMElHOW1JRUpoWW1Wc0ozTmNiaUFnSUNBZ0lDQWdJQ0F2THlCbWRXNWpkR2x2Ymk1elpXNTBJR2x0Y0d4bGJXVnVkR0YwYVc5dUxseHVJQ0FnSUNBZ0lDQWdJR052Ym5SbGVIUXVjMlZ1ZENBOUlHTnZiblJsZUhRdVgzTmxiblFnUFNCamIyNTBaWGgwTG1GeVp6dGNibHh1SUNBZ0lDQWdJQ0I5SUdWc2MyVWdhV1lnS0dOdmJuUmxlSFF1YldWMGFHOWtJRDA5UFNCY0luUm9jbTkzWENJcElIdGNiaUFnSUNBZ0lDQWdJQ0JwWmlBb2MzUmhkR1VnUFQwOUlFZGxibE4wWVhSbFUzVnpjR1Z1WkdWa1UzUmhjblFwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSE4wWVhSbElEMGdSMlZ1VTNSaGRHVkRiMjF3YkdWMFpXUTdYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFISnZkeUJqYjI1MFpYaDBMbUZ5Wnp0Y2JpQWdJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnSUNCamIyNTBaWGgwTG1ScGMzQmhkR05vUlhoalpYQjBhVzl1S0dOdmJuUmxlSFF1WVhKbktUdGNibHh1SUNBZ0lDQWdJQ0I5SUdWc2MyVWdhV1lnS0dOdmJuUmxlSFF1YldWMGFHOWtJRDA5UFNCY0luSmxkSFZ5Ymx3aUtTQjdYRzRnSUNBZ0lDQWdJQ0FnWTI5dWRHVjRkQzVoWW5KMWNIUW9YQ0p5WlhSMWNtNWNJaXdnWTI5dWRHVjRkQzVoY21jcE8xeHVJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnYzNSaGRHVWdQU0JIWlc1VGRHRjBaVVY0WldOMWRHbHVaenRjYmx4dUlDQWdJQ0FnSUNCMllYSWdjbVZqYjNKa0lEMGdkSEo1UTJGMFkyZ29hVzV1WlhKR2Jpd2djMlZzWml3Z1kyOXVkR1Y0ZENrN1hHNGdJQ0FnSUNBZ0lHbG1JQ2h5WldOdmNtUXVkSGx3WlNBOVBUMGdYQ0p1YjNKdFlXeGNJaWtnZTF4dUlDQWdJQ0FnSUNBZ0lDOHZJRWxtSUdGdUlHVjRZMlZ3ZEdsdmJpQnBjeUIwYUhKdmQyNGdabkp2YlNCcGJtNWxja1p1TENCM1pTQnNaV0YyWlNCemRHRjBaU0E5UFQxY2JpQWdJQ0FnSUNBZ0lDQXZMeUJIWlc1VGRHRjBaVVY0WldOMWRHbHVaeUJoYm1RZ2JHOXZjQ0JpWVdOcklHWnZjaUJoYm05MGFHVnlJR2x1ZG05allYUnBiMjR1WEc0Z0lDQWdJQ0FnSUNBZ2MzUmhkR1VnUFNCamIyNTBaWGgwTG1SdmJtVmNiaUFnSUNBZ0lDQWdJQ0FnSUQ4Z1IyVnVVM1JoZEdWRGIyMXdiR1YwWldSY2JpQWdJQ0FnSUNBZ0lDQWdJRG9nUjJWdVUzUmhkR1ZUZFhOd1pXNWtaV1JaYVdWc1pEdGNibHh1SUNBZ0lDQWdJQ0FnSUdsbUlDaHlaV052Y21RdVlYSm5JRDA5UFNCRGIyNTBhVzUxWlZObGJuUnBibVZzS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JqYjI1MGFXNTFaVHRjYmlBZ0lDQWdJQ0FnSUNCOVhHNWNiaUFnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnNkV1U2SUhKbFkyOXlaQzVoY21jc1hHNGdJQ0FnSUNBZ0lDQWdJQ0JrYjI1bE9pQmpiMjUwWlhoMExtUnZibVZjYmlBZ0lDQWdJQ0FnSUNCOU8xeHVYRzRnSUNBZ0lDQWdJSDBnWld4elpTQnBaaUFvY21WamIzSmtMblI1Y0dVZ1BUMDlJRndpZEdoeWIzZGNJaWtnZTF4dUlDQWdJQ0FnSUNBZ0lITjBZWFJsSUQwZ1IyVnVVM1JoZEdWRGIyMXdiR1YwWldRN1hHNGdJQ0FnSUNBZ0lDQWdMeThnUkdsemNHRjBZMmdnZEdobElHVjRZMlZ3ZEdsdmJpQmllU0JzYjI5d2FXNW5JR0poWTJzZ1lYSnZkVzVrSUhSdklIUm9aVnh1SUNBZ0lDQWdJQ0FnSUM4dklHTnZiblJsZUhRdVpHbHpjR0YwWTJoRmVHTmxjSFJwYjI0b1kyOXVkR1Y0ZEM1aGNtY3BJR05oYkd3Z1lXSnZkbVV1WEc0Z0lDQWdJQ0FnSUNBZ1kyOXVkR1Y0ZEM1dFpYUm9iMlFnUFNCY0luUm9jbTkzWENJN1hHNGdJQ0FnSUNBZ0lDQWdZMjl1ZEdWNGRDNWhjbWNnUFNCeVpXTnZjbVF1WVhKbk8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZUdGNiaUFnZlZ4dVhHNGdJQzh2SUVOaGJHd2daR1ZzWldkaGRHVXVhWFJsY21GMGIzSmJZMjl1ZEdWNGRDNXRaWFJvYjJSZEtHTnZiblJsZUhRdVlYSm5LU0JoYm1RZ2FHRnVaR3hsSUhSb1pWeHVJQ0F2THlCeVpYTjFiSFFzSUdWcGRHaGxjaUJpZVNCeVpYUjFjbTVwYm1jZ1lTQjdJSFpoYkhWbExDQmtiMjVsSUgwZ2NtVnpkV3gwSUdaeWIyMGdkR2hsWEc0Z0lDOHZJR1JsYkdWbllYUmxJR2wwWlhKaGRHOXlMQ0J2Y2lCaWVTQnRiMlJwWm5scGJtY2dZMjl1ZEdWNGRDNXRaWFJvYjJRZ1lXNWtJR052Ym5SbGVIUXVZWEpuTEZ4dUlDQXZMeUJ6WlhSMGFXNW5JR052Ym5SbGVIUXVaR1ZzWldkaGRHVWdkRzhnYm5Wc2JDd2dZVzVrSUhKbGRIVnlibWx1WnlCMGFHVWdRMjl1ZEdsdWRXVlRaVzUwYVc1bGJDNWNiaUFnWm5WdVkzUnBiMjRnYldGNVltVkpiblp2YTJWRVpXeGxaMkYwWlNoa1pXeGxaMkYwWlN3Z1kyOXVkR1Y0ZENrZ2UxeHVJQ0FnSUhaaGNpQnRaWFJvYjJRZ1BTQmtaV3hsWjJGMFpTNXBkR1Z5WVhSdmNsdGpiMjUwWlhoMExtMWxkR2h2WkYwN1hHNGdJQ0FnYVdZZ0tHMWxkR2h2WkNBOVBUMGdkVzVrWldacGJtVmtLU0I3WEc0Z0lDQWdJQ0F2THlCQklDNTBhSEp2ZHlCdmNpQXVjbVYwZFhKdUlIZG9aVzRnZEdobElHUmxiR1ZuWVhSbElHbDBaWEpoZEc5eUlHaGhjeUJ1YnlBdWRHaHliM2RjYmlBZ0lDQWdJQzh2SUcxbGRHaHZaQ0JoYkhkaGVYTWdkR1Z5YldsdVlYUmxjeUIwYUdVZ2VXbGxiR1FxSUd4dmIzQXVYRzRnSUNBZ0lDQmpiMjUwWlhoMExtUmxiR1ZuWVhSbElEMGdiblZzYkR0Y2JseHVJQ0FnSUNBZ2FXWWdLR052Ym5SbGVIUXViV1YwYUc5a0lEMDlQU0JjSW5Sb2NtOTNYQ0lwSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLR1JsYkdWbllYUmxMbWwwWlhKaGRHOXlMbkpsZEhWeWJpa2dlMXh1SUNBZ0lDQWdJQ0FnSUM4dklFbG1JSFJvWlNCa1pXeGxaMkYwWlNCcGRHVnlZWFJ2Y2lCb1lYTWdZU0J5WlhSMWNtNGdiV1YwYUc5a0xDQm5hWFpsSUdsMElHRmNiaUFnSUNBZ0lDQWdJQ0F2THlCamFHRnVZMlVnZEc4Z1kyeGxZVzRnZFhBdVhHNGdJQ0FnSUNBZ0lDQWdZMjl1ZEdWNGRDNXRaWFJvYjJRZ1BTQmNJbkpsZEhWeWJsd2lPMXh1SUNBZ0lDQWdJQ0FnSUdOdmJuUmxlSFF1WVhKbklEMGdkVzVrWldacGJtVmtPMXh1SUNBZ0lDQWdJQ0FnSUcxaGVXSmxTVzUyYjJ0bFJHVnNaV2RoZEdVb1pHVnNaV2RoZEdVc0lHTnZiblJsZUhRcE8xeHVYRzRnSUNBZ0lDQWdJQ0FnYVdZZ0tHTnZiblJsZUhRdWJXVjBhRzlrSUQwOVBTQmNJblJvY205M1hDSXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZJRWxtSUcxaGVXSmxTVzUyYjJ0bFJHVnNaV2RoZEdVb1kyOXVkR1Y0ZENrZ1kyaGhibWRsWkNCamIyNTBaWGgwTG0xbGRHaHZaQ0JtY205dFhHNGdJQ0FnSUNBZ0lDQWdJQ0F2THlCY0luSmxkSFZ5Ymx3aUlIUnZJRndpZEdoeWIzZGNJaXdnYkdWMElIUm9ZWFFnYjNabGNuSnBaR1VnZEdobElGUjVjR1ZGY25KdmNpQmlaV3h2ZHk1Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQkRiMjUwYVc1MVpWTmxiblJwYm1Wc08xeHVJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lHTnZiblJsZUhRdWJXVjBhRzlrSUQwZ1hDSjBhSEp2ZDF3aU8xeHVJQ0FnSUNBZ0lDQmpiMjUwWlhoMExtRnlaeUE5SUc1bGR5QlVlWEJsUlhKeWIzSW9YRzRnSUNBZ0lDQWdJQ0FnWENKVWFHVWdhWFJsY21GMGIzSWdaRzlsY3lCdWIzUWdjSEp2ZG1sa1pTQmhJQ2QwYUhKdmR5Y2diV1YwYUc5a1hDSXBPMXh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0J5WlhSMWNtNGdRMjl1ZEdsdWRXVlRaVzUwYVc1bGJEdGNiaUFnSUNCOVhHNWNiaUFnSUNCMllYSWdjbVZqYjNKa0lEMGdkSEo1UTJGMFkyZ29iV1YwYUc5a0xDQmtaV3hsWjJGMFpTNXBkR1Z5WVhSdmNpd2dZMjl1ZEdWNGRDNWhjbWNwTzF4dVhHNGdJQ0FnYVdZZ0tISmxZMjl5WkM1MGVYQmxJRDA5UFNCY0luUm9jbTkzWENJcElIdGNiaUFnSUNBZ0lHTnZiblJsZUhRdWJXVjBhRzlrSUQwZ1hDSjBhSEp2ZDF3aU8xeHVJQ0FnSUNBZ1kyOXVkR1Y0ZEM1aGNtY2dQU0J5WldOdmNtUXVZWEpuTzF4dUlDQWdJQ0FnWTI5dWRHVjRkQzVrWld4bFoyRjBaU0E5SUc1MWJHdzdYRzRnSUNBZ0lDQnlaWFIxY200Z1EyOXVkR2x1ZFdWVFpXNTBhVzVsYkR0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0IyWVhJZ2FXNW1ieUE5SUhKbFkyOXlaQzVoY21jN1hHNWNiaUFnSUNCcFppQW9JU0JwYm1adktTQjdYRzRnSUNBZ0lDQmpiMjUwWlhoMExtMWxkR2h2WkNBOUlGd2lkR2h5YjNkY0lqdGNiaUFnSUNBZ0lHTnZiblJsZUhRdVlYSm5JRDBnYm1WM0lGUjVjR1ZGY25KdmNpaGNJbWwwWlhKaGRHOXlJSEpsYzNWc2RDQnBjeUJ1YjNRZ1lXNGdiMkpxWldOMFhDSXBPMXh1SUNBZ0lDQWdZMjl1ZEdWNGRDNWtaV3hsWjJGMFpTQTlJRzUxYkd3N1hHNGdJQ0FnSUNCeVpYUjFjbTRnUTI5dWRHbHVkV1ZUWlc1MGFXNWxiRHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQnBaaUFvYVc1bWJ5NWtiMjVsS1NCN1hHNGdJQ0FnSUNBdkx5QkJjM05wWjI0Z2RHaGxJSEpsYzNWc2RDQnZaaUIwYUdVZ1ptbHVhWE5vWldRZ1pHVnNaV2RoZEdVZ2RHOGdkR2hsSUhSbGJYQnZjbUZ5ZVZ4dUlDQWdJQ0FnTHk4Z2RtRnlhV0ZpYkdVZ2MzQmxZMmxtYVdWa0lHSjVJR1JsYkdWbllYUmxMbkpsYzNWc2RFNWhiV1VnS0hObFpTQmtaV3hsWjJGMFpWbHBaV3hrS1M1Y2JpQWdJQ0FnSUdOdmJuUmxlSFJiWkdWc1pXZGhkR1V1Y21WemRXeDBUbUZ0WlYwZ1BTQnBibVp2TG5aaGJIVmxPMXh1WEc0Z0lDQWdJQ0F2THlCU1pYTjFiV1VnWlhobFkzVjBhVzl1SUdGMElIUm9aU0JrWlhOcGNtVmtJR3h2WTJGMGFXOXVJQ2h6WldVZ1pHVnNaV2RoZEdWWmFXVnNaQ2t1WEc0Z0lDQWdJQ0JqYjI1MFpYaDBMbTVsZUhRZ1BTQmtaV3hsWjJGMFpTNXVaWGgwVEc5ak8xeHVYRzRnSUNBZ0lDQXZMeUJKWmlCamIyNTBaWGgwTG0xbGRHaHZaQ0IzWVhNZ1hDSjBhSEp2ZDF3aUlHSjFkQ0IwYUdVZ1pHVnNaV2RoZEdVZ2FHRnVaR3hsWkNCMGFHVmNiaUFnSUNBZ0lDOHZJR1Y0WTJWd2RHbHZiaXdnYkdWMElIUm9aU0J2ZFhSbGNpQm5aVzVsY21GMGIzSWdjSEp2WTJWbFpDQnViM0p0WVd4c2VTNGdTV1pjYmlBZ0lDQWdJQzh2SUdOdmJuUmxlSFF1YldWMGFHOWtJSGRoY3lCY0ltNWxlSFJjSWl3Z1ptOXlaMlYwSUdOdmJuUmxlSFF1WVhKbklITnBibU5sSUdsMElHaGhjeUJpWldWdVhHNGdJQ0FnSUNBdkx5QmNJbU52Ym5OMWJXVmtYQ0lnWW5rZ2RHaGxJR1JsYkdWbllYUmxJR2wwWlhKaGRHOXlMaUJKWmlCamIyNTBaWGgwTG0xbGRHaHZaQ0IzWVhOY2JpQWdJQ0FnSUM4dklGd2ljbVYwZFhKdVhDSXNJR0ZzYkc5M0lIUm9aU0J2Y21sbmFXNWhiQ0F1Y21WMGRYSnVJR05oYkd3Z2RHOGdZMjl1ZEdsdWRXVWdhVzRnZEdobFhHNGdJQ0FnSUNBdkx5QnZkWFJsY2lCblpXNWxjbUYwYjNJdVhHNGdJQ0FnSUNCcFppQW9ZMjl1ZEdWNGRDNXRaWFJvYjJRZ0lUMDlJRndpY21WMGRYSnVYQ0lwSUh0Y2JpQWdJQ0FnSUNBZ1kyOXVkR1Y0ZEM1dFpYUm9iMlFnUFNCY0ltNWxlSFJjSWp0Y2JpQWdJQ0FnSUNBZ1kyOXVkR1Y0ZEM1aGNtY2dQU0IxYm1SbFptbHVaV1E3WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdMeThnVW1VdGVXbGxiR1FnZEdobElISmxjM1ZzZENCeVpYUjFjbTVsWkNCaWVTQjBhR1VnWkdWc1pXZGhkR1VnYldWMGFHOWtMbHh1SUNBZ0lDQWdjbVYwZFhKdUlHbHVabTg3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdMeThnVkdobElHUmxiR1ZuWVhSbElHbDBaWEpoZEc5eUlHbHpJR1pwYm1semFHVmtMQ0J6YnlCbWIzSm5aWFFnYVhRZ1lXNWtJR052Ym5ScGJuVmxJSGRwZEdoY2JpQWdJQ0F2THlCMGFHVWdiM1YwWlhJZ1oyVnVaWEpoZEc5eUxseHVJQ0FnSUdOdmJuUmxlSFF1WkdWc1pXZGhkR1VnUFNCdWRXeHNPMXh1SUNBZ0lISmxkSFZ5YmlCRGIyNTBhVzUxWlZObGJuUnBibVZzTzF4dUlDQjlYRzVjYmlBZ0x5OGdSR1ZtYVc1bElFZGxibVZ5WVhSdmNpNXdjbTkwYjNSNWNHVXVlMjVsZUhRc2RHaHliM2NzY21WMGRYSnVmU0JwYmlCMFpYSnRjeUJ2WmlCMGFHVmNiaUFnTHk4Z2RXNXBabWxsWkNBdVgybHVkbTlyWlNCb1pXeHdaWElnYldWMGFHOWtMbHh1SUNCa1pXWnBibVZKZEdWeVlYUnZjazFsZEdodlpITW9SM0FwTzF4dVhHNGdJRWR3VzNSdlUzUnlhVzVuVkdGblUzbHRZbTlzWFNBOUlGd2lSMlZ1WlhKaGRHOXlYQ0k3WEc1Y2JpQWdMeThnUVNCSFpXNWxjbUYwYjNJZ2MyaHZkV3hrSUdGc2QyRjVjeUJ5WlhSMWNtNGdhWFJ6Wld4bUlHRnpJSFJvWlNCcGRHVnlZWFJ2Y2lCdlltcGxZM1FnZDJobGJpQjBhR1ZjYmlBZ0x5OGdRRUJwZEdWeVlYUnZjaUJtZFc1amRHbHZiaUJwY3lCallXeHNaV1FnYjI0Z2FYUXVJRk52YldVZ1luSnZkM05sY25NbklHbHRjR3hsYldWdWRHRjBhVzl1Y3lCdlppQjBhR1ZjYmlBZ0x5OGdhWFJsY21GMGIzSWdjSEp2ZEc5MGVYQmxJR05vWVdsdUlHbHVZMjl5Y21WamRHeDVJR2x0Y0d4bGJXVnVkQ0IwYUdsekxDQmpZWFZ6YVc1bklIUm9aU0JIWlc1bGNtRjBiM0pjYmlBZ0x5OGdiMkpxWldOMElIUnZJRzV2ZENCaVpTQnlaWFIxY201bFpDQm1jbTl0SUhSb2FYTWdZMkZzYkM0Z1ZHaHBjeUJsYm5OMWNtVnpJSFJvWVhRZ1pHOWxjMjRuZENCb1lYQndaVzR1WEc0Z0lDOHZJRk5sWlNCb2RIUndjem92TDJkcGRHaDFZaTVqYjIwdlptRmpaV0p2YjJzdmNtVm5aVzVsY21GMGIzSXZhWE56ZFdWekx6STNOQ0JtYjNJZ2JXOXlaU0JrWlhSaGFXeHpMbHh1SUNCSGNGdHBkR1Z5WVhSdmNsTjViV0p2YkYwZ1BTQm1kVzVqZEdsdmJpZ3BJSHRjYmlBZ0lDQnlaWFIxY200Z2RHaHBjenRjYmlBZ2ZUdGNibHh1SUNCSGNDNTBiMU4wY21sdVp5QTlJR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQmNJbHR2WW1wbFkzUWdSMlZ1WlhKaGRHOXlYVndpTzF4dUlDQjlPMXh1WEc0Z0lHWjFibU4wYVc5dUlIQjFjMmhVY25sRmJuUnllU2hzYjJOektTQjdYRzRnSUNBZ2RtRnlJR1Z1ZEhKNUlEMGdleUIwY25sTWIyTTZJR3h2WTNOYk1GMGdmVHRjYmx4dUlDQWdJR2xtSUNneElHbHVJR3h2WTNNcElIdGNiaUFnSUNBZ0lHVnVkSEo1TG1OaGRHTm9URzlqSUQwZ2JHOWpjMXN4WFR0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JwWmlBb01pQnBiaUJzYjJOektTQjdYRzRnSUNBZ0lDQmxiblJ5ZVM1bWFXNWhiR3g1VEc5aklEMGdiRzlqYzFzeVhUdGNiaUFnSUNBZ0lHVnVkSEo1TG1GbWRHVnlURzlqSUQwZ2JHOWpjMXN6WFR0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0IwYUdsekxuUnllVVZ1ZEhKcFpYTXVjSFZ6YUNobGJuUnllU2s3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCeVpYTmxkRlJ5ZVVWdWRISjVLR1Z1ZEhKNUtTQjdYRzRnSUNBZ2RtRnlJSEpsWTI5eVpDQTlJR1Z1ZEhKNUxtTnZiWEJzWlhScGIyNGdmSHdnZTMwN1hHNGdJQ0FnY21WamIzSmtMblI1Y0dVZ1BTQmNJbTV2Y20xaGJGd2lPMXh1SUNBZ0lHUmxiR1YwWlNCeVpXTnZjbVF1WVhKbk8xeHVJQ0FnSUdWdWRISjVMbU52YlhCc1pYUnBiMjRnUFNCeVpXTnZjbVE3WEc0Z0lIMWNibHh1SUNCbWRXNWpkR2x2YmlCRGIyNTBaWGgwS0hSeWVVeHZZM05NYVhOMEtTQjdYRzRnSUNBZ0x5OGdWR2hsSUhKdmIzUWdaVzUwY25rZ2IySnFaV04wSUNobFptWmxZM1JwZG1Wc2VTQmhJSFJ5ZVNCemRHRjBaVzFsYm5RZ2QybDBhRzkxZENCaElHTmhkR05vWEc0Z0lDQWdMeThnYjNJZ1lTQm1hVzVoYkd4NUlHSnNiMk5yS1NCbmFYWmxjeUIxY3lCaElIQnNZV05sSUhSdklITjBiM0psSUhaaGJIVmxjeUIwYUhKdmQyNGdabkp2YlZ4dUlDQWdJQzh2SUd4dlkyRjBhVzl1Y3lCM2FHVnlaU0IwYUdWeVpTQnBjeUJ1YnlCbGJtTnNiM05wYm1jZ2RISjVJSE4wWVhSbGJXVnVkQzVjYmlBZ0lDQjBhR2x6TG5SeWVVVnVkSEpwWlhNZ1BTQmJleUIwY25sTWIyTTZJRndpY205dmRGd2lJSDFkTzF4dUlDQWdJSFJ5ZVV4dlkzTk1hWE4wTG1admNrVmhZMmdvY0hWemFGUnllVVZ1ZEhKNUxDQjBhR2x6S1R0Y2JpQWdJQ0IwYUdsekxuSmxjMlYwS0hSeWRXVXBPMXh1SUNCOVhHNWNiaUFnY25WdWRHbHRaUzVyWlhseklEMGdablZ1WTNScGIyNG9iMkpxWldOMEtTQjdYRzRnSUNBZ2RtRnlJR3RsZVhNZ1BTQmJYVHRjYmlBZ0lDQm1iM0lnS0haaGNpQnJaWGtnYVc0Z2IySnFaV04wS1NCN1hHNGdJQ0FnSUNCclpYbHpMbkIxYzJnb2EyVjVLVHRjYmlBZ0lDQjlYRzRnSUNBZ2EyVjVjeTV5WlhabGNuTmxLQ2s3WEc1Y2JpQWdJQ0F2THlCU1lYUm9aWElnZEdoaGJpQnlaWFIxY201cGJtY2dZVzRnYjJKcVpXTjBJSGRwZEdnZ1lTQnVaWGgwSUcxbGRHaHZaQ3dnZDJVZ2EyVmxjRnh1SUNBZ0lDOHZJSFJvYVc1bmN5QnphVzF3YkdVZ1lXNWtJSEpsZEhWeWJpQjBhR1VnYm1WNGRDQm1kVzVqZEdsdmJpQnBkSE5sYkdZdVhHNGdJQ0FnY21WMGRYSnVJR1oxYm1OMGFXOXVJRzVsZUhRb0tTQjdYRzRnSUNBZ0lDQjNhR2xzWlNBb2EyVjVjeTVzWlc1bmRHZ3BJSHRjYmlBZ0lDQWdJQ0FnZG1GeUlHdGxlU0E5SUd0bGVYTXVjRzl3S0NrN1hHNGdJQ0FnSUNBZ0lHbG1JQ2hyWlhrZ2FXNGdiMkpxWldOMEtTQjdYRzRnSUNBZ0lDQWdJQ0FnYm1WNGRDNTJZV3gxWlNBOUlHdGxlVHRjYmlBZ0lDQWdJQ0FnSUNCdVpYaDBMbVJ2Ym1VZ1BTQm1ZV3h6WlR0Y2JpQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2JtVjRkRHRjYmlBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBdkx5QlVieUJoZG05cFpDQmpjbVZoZEdsdVp5QmhiaUJoWkdScGRHbHZibUZzSUc5aWFtVmpkQ3dnZDJVZ2FuVnpkQ0JvWVc1bklIUm9aU0F1ZG1Gc2RXVmNiaUFnSUNBZ0lDOHZJR0Z1WkNBdVpHOXVaU0J3Y205d1pYSjBhV1Z6SUc5bVppQjBhR1VnYm1WNGRDQm1kVzVqZEdsdmJpQnZZbXBsWTNRZ2FYUnpaV3htTGlCVWFHbHpYRzRnSUNBZ0lDQXZMeUJoYkhOdklHVnVjM1Z5WlhNZ2RHaGhkQ0IwYUdVZ2JXbHVhV1pwWlhJZ2QybHNiQ0J1YjNRZ1lXNXZibmx0YVhwbElIUm9aU0JtZFc1amRHbHZiaTVjYmlBZ0lDQWdJRzVsZUhRdVpHOXVaU0E5SUhSeWRXVTdYRzRnSUNBZ0lDQnlaWFIxY200Z2JtVjRkRHRjYmlBZ0lDQjlPMXh1SUNCOU8xeHVYRzRnSUdaMWJtTjBhVzl1SUhaaGJIVmxjeWhwZEdWeVlXSnNaU2tnZTF4dUlDQWdJR2xtSUNocGRHVnlZV0pzWlNrZ2UxeHVJQ0FnSUNBZ2RtRnlJR2wwWlhKaGRHOXlUV1YwYUc5a0lEMGdhWFJsY21GaWJHVmJhWFJsY21GMGIzSlRlVzFpYjJ4ZE8xeHVJQ0FnSUNBZ2FXWWdLR2wwWlhKaGRHOXlUV1YwYUc5a0tTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQnBkR1Z5WVhSdmNrMWxkR2h2WkM1allXeHNLR2wwWlhKaFlteGxLVHRjYmlBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnYVdZZ0tIUjVjR1Z2WmlCcGRHVnlZV0pzWlM1dVpYaDBJRDA5UFNCY0ltWjFibU4wYVc5dVhDSXBJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJR2wwWlhKaFlteGxPMXh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0JwWmlBb0lXbHpUbUZPS0dsMFpYSmhZbXhsTG14bGJtZDBhQ2twSUh0Y2JpQWdJQ0FnSUNBZ2RtRnlJR2tnUFNBdE1Td2dibVY0ZENBOUlHWjFibU4wYVc5dUlHNWxlSFFvS1NCN1hHNGdJQ0FnSUNBZ0lDQWdkMmhwYkdVZ0tDc3JhU0E4SUdsMFpYSmhZbXhsTG14bGJtZDBhQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0doaGMwOTNiaTVqWVd4c0tHbDBaWEpoWW14bExDQnBLU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0J1WlhoMExuWmhiSFZsSUQwZ2FYUmxjbUZpYkdWYmFWMDdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lHNWxlSFF1Wkc5dVpTQTlJR1poYkhObE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnYm1WNGREdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJQ0FnSUNCdVpYaDBMblpoYkhWbElEMGdkVzVrWldacGJtVmtPMXh1SUNBZ0lDQWdJQ0FnSUc1bGVIUXVaRzl1WlNBOUlIUnlkV1U3WEc1Y2JpQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2JtVjRkRHRjYmlBZ0lDQWdJQ0FnZlR0Y2JseHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2JtVjRkQzV1WlhoMElEMGdibVY0ZER0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc1Y2JpQWdJQ0F2THlCU1pYUjFjbTRnWVc0Z2FYUmxjbUYwYjNJZ2QybDBhQ0J1YnlCMllXeDFaWE11WEc0Z0lDQWdjbVYwZFhKdUlIc2dibVY0ZERvZ1pHOXVaVkpsYzNWc2RDQjlPMXh1SUNCOVhHNGdJSEoxYm5ScGJXVXVkbUZzZFdWeklEMGdkbUZzZFdWek8xeHVYRzRnSUdaMWJtTjBhVzl1SUdSdmJtVlNaWE4xYkhRb0tTQjdYRzRnSUNBZ2NtVjBkWEp1SUhzZ2RtRnNkV1U2SUhWdVpHVm1hVzVsWkN3Z1pHOXVaVG9nZEhKMVpTQjlPMXh1SUNCOVhHNWNiaUFnUTI5dWRHVjRkQzV3Y205MGIzUjVjR1VnUFNCN1hHNGdJQ0FnWTI5dWMzUnlkV04wYjNJNklFTnZiblJsZUhRc1hHNWNiaUFnSUNCeVpYTmxkRG9nWm5WdVkzUnBiMjRvYzJ0cGNGUmxiWEJTWlhObGRDa2dlMXh1SUNBZ0lDQWdkR2hwY3k1d2NtVjJJRDBnTUR0Y2JpQWdJQ0FnSUhSb2FYTXVibVY0ZENBOUlEQTdYRzRnSUNBZ0lDQXZMeUJTWlhObGRIUnBibWNnWTI5dWRHVjRkQzVmYzJWdWRDQm1iM0lnYkdWbllXTjVJSE4xY0hCdmNuUWdiMllnUW1GaVpXd25jMXh1SUNBZ0lDQWdMeThnWm5WdVkzUnBiMjR1YzJWdWRDQnBiWEJzWlcxbGJuUmhkR2x2Ymk1Y2JpQWdJQ0FnSUhSb2FYTXVjMlZ1ZENBOUlIUm9hWE11WDNObGJuUWdQU0IxYm1SbFptbHVaV1E3WEc0Z0lDQWdJQ0IwYUdsekxtUnZibVVnUFNCbVlXeHpaVHRjYmlBZ0lDQWdJSFJvYVhNdVpHVnNaV2RoZEdVZ1BTQnVkV3hzTzF4dVhHNGdJQ0FnSUNCMGFHbHpMbTFsZEdodlpDQTlJRndpYm1WNGRGd2lPMXh1SUNBZ0lDQWdkR2hwY3k1aGNtY2dQU0IxYm1SbFptbHVaV1E3WEc1Y2JpQWdJQ0FnSUhSb2FYTXVkSEo1Ulc1MGNtbGxjeTVtYjNKRllXTm9LSEpsYzJWMFZISjVSVzUwY25rcE8xeHVYRzRnSUNBZ0lDQnBaaUFvSVhOcmFYQlVaVzF3VW1WelpYUXBJSHRjYmlBZ0lDQWdJQ0FnWm05eUlDaDJZWElnYm1GdFpTQnBiaUIwYUdsektTQjdYRzRnSUNBZ0lDQWdJQ0FnTHk4Z1RtOTBJSE4xY21VZ1lXSnZkWFFnZEdobElHOXdkR2x0WVd3Z2IzSmtaWElnYjJZZ2RHaGxjMlVnWTI5dVpHbDBhVzl1Y3pwY2JpQWdJQ0FnSUNBZ0lDQnBaaUFvYm1GdFpTNWphR0Z5UVhRb01Da2dQVDA5SUZ3aWRGd2lJQ1ltWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJR2hoYzA5M2JpNWpZV3hzS0hSb2FYTXNJRzVoYldVcElDWW1YRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDRnBjMDVoVGlncmJtRnRaUzV6YkdsalpTZ3hLU2twSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFJvYVhOYmJtRnRaVjBnUFNCMWJtUmxabWx1WldRN1hHNGdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmU3hjYmx4dUlDQWdJSE4wYjNBNklHWjFibU4wYVc5dUtDa2dlMXh1SUNBZ0lDQWdkR2hwY3k1a2IyNWxJRDBnZEhKMVpUdGNibHh1SUNBZ0lDQWdkbUZ5SUhKdmIzUkZiblJ5ZVNBOUlIUm9hWE11ZEhKNVJXNTBjbWxsYzFzd1hUdGNiaUFnSUNBZ0lIWmhjaUJ5YjI5MFVtVmpiM0prSUQwZ2NtOXZkRVZ1ZEhKNUxtTnZiWEJzWlhScGIyNDdYRzRnSUNBZ0lDQnBaaUFvY205dmRGSmxZMjl5WkM1MGVYQmxJRDA5UFNCY0luUm9jbTkzWENJcElIdGNiaUFnSUNBZ0lDQWdkR2h5YjNjZ2NtOXZkRkpsWTI5eVpDNWhjbWM3WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUhKbGRIVnliaUIwYUdsekxuSjJZV3c3WEc0Z0lDQWdmU3hjYmx4dUlDQWdJR1JwYzNCaGRHTm9SWGhqWlhCMGFXOXVPaUJtZFc1amRHbHZiaWhsZUdObGNIUnBiMjRwSUh0Y2JpQWdJQ0FnSUdsbUlDaDBhR2x6TG1SdmJtVXBJSHRjYmlBZ0lDQWdJQ0FnZEdoeWIzY2daWGhqWlhCMGFXOXVPMXh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0IyWVhJZ1kyOXVkR1Y0ZENBOUlIUm9hWE03WEc0Z0lDQWdJQ0JtZFc1amRHbHZiaUJvWVc1a2JHVW9iRzlqTENCallYVm5hSFFwSUh0Y2JpQWdJQ0FnSUNBZ2NtVmpiM0prTG5SNWNHVWdQU0JjSW5Sb2NtOTNYQ0k3WEc0Z0lDQWdJQ0FnSUhKbFkyOXlaQzVoY21jZ1BTQmxlR05sY0hScGIyNDdYRzRnSUNBZ0lDQWdJR052Ym5SbGVIUXVibVY0ZENBOUlHeHZZenRjYmx4dUlDQWdJQ0FnSUNCcFppQW9ZMkYxWjJoMEtTQjdYRzRnSUNBZ0lDQWdJQ0FnTHk4Z1NXWWdkR2hsSUdScGMzQmhkR05vWldRZ1pYaGpaWEIwYVc5dUlIZGhjeUJqWVhWbmFIUWdZbmtnWVNCallYUmphQ0JpYkc5amF5eGNiaUFnSUNBZ0lDQWdJQ0F2THlCMGFHVnVJR3hsZENCMGFHRjBJR05oZEdOb0lHSnNiMk5ySUdoaGJtUnNaU0IwYUdVZ1pYaGpaWEIwYVc5dUlHNXZjbTFoYkd4NUxseHVJQ0FnSUNBZ0lDQWdJR052Ym5SbGVIUXViV1YwYUc5a0lEMGdYQ0p1WlhoMFhDSTdYRzRnSUNBZ0lDQWdJQ0FnWTI5dWRHVjRkQzVoY21jZ1BTQjFibVJsWm1sdVpXUTdYRzRnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnSVNFZ1kyRjFaMmgwTzF4dUlDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNCbWIzSWdLSFpoY2lCcElEMGdkR2hwY3k1MGNubEZiblJ5YVdWekxteGxibWQwYUNBdElERTdJR2tnUGowZ01Ec2dMUzFwS1NCN1hHNGdJQ0FnSUNBZ0lIWmhjaUJsYm5SeWVTQTlJSFJvYVhNdWRISjVSVzUwY21sbGMxdHBYVHRjYmlBZ0lDQWdJQ0FnZG1GeUlISmxZMjl5WkNBOUlHVnVkSEo1TG1OdmJYQnNaWFJwYjI0N1hHNWNiaUFnSUNBZ0lDQWdhV1lnS0dWdWRISjVMblJ5ZVV4dll5QTlQVDBnWENKeWIyOTBYQ0lwSUh0Y2JpQWdJQ0FnSUNBZ0lDQXZMeUJGZUdObGNIUnBiMjRnZEdoeWIzZHVJRzkxZEhOcFpHVWdiMllnWVc1NUlIUnllU0JpYkc5amF5QjBhR0YwSUdOdmRXeGtJR2hoYm1Sc1pWeHVJQ0FnSUNBZ0lDQWdJQzh2SUdsMExDQnpieUJ6WlhRZ2RHaGxJR052YlhCc1pYUnBiMjRnZG1Gc2RXVWdiMllnZEdobElHVnVkR2x5WlNCbWRXNWpkR2x2YmlCMGIxeHVJQ0FnSUNBZ0lDQWdJQzh2SUhSb2NtOTNJSFJvWlNCbGVHTmxjSFJwYjI0dVhHNGdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHaGhibVJzWlNoY0ltVnVaRndpS1R0Y2JpQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJR2xtSUNobGJuUnllUzUwY25sTWIyTWdQRDBnZEdocGN5NXdjbVYyS1NCN1hHNGdJQ0FnSUNBZ0lDQWdkbUZ5SUdoaGMwTmhkR05vSUQwZ2FHRnpUM2R1TG1OaGJHd29aVzUwY25rc0lGd2lZMkYwWTJoTWIyTmNJaWs3WEc0Z0lDQWdJQ0FnSUNBZ2RtRnlJR2hoYzBacGJtRnNiSGtnUFNCb1lYTlBkMjR1WTJGc2JDaGxiblJ5ZVN3Z1hDSm1hVzVoYkd4NVRHOWpYQ0lwTzF4dVhHNGdJQ0FnSUNBZ0lDQWdhV1lnS0doaGMwTmhkR05vSUNZbUlHaGhjMFpwYm1Gc2JIa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2gwYUdsekxuQnlaWFlnUENCbGJuUnllUzVqWVhSamFFeHZZeWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdhR0Z1Wkd4bEtHVnVkSEo1TG1OaGRHTm9URzlqTENCMGNuVmxLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMGdaV3h6WlNCcFppQW9kR2hwY3k1d2NtVjJJRHdnWlc1MGNua3VabWx1WVd4c2VVeHZZeWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdhR0Z1Wkd4bEtHVnVkSEo1TG1acGJtRnNiSGxNYjJNcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dVhHNGdJQ0FnSUNBZ0lDQWdmU0JsYkhObElHbG1JQ2hvWVhORFlYUmphQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0hSb2FYTXVjSEpsZGlBOElHVnVkSEo1TG1OaGRHTm9URzlqS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJvWVc1a2JHVW9aVzUwY25rdVkyRjBZMmhNYjJNc0lIUnlkV1VwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDaG9ZWE5HYVc1aGJHeDVLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvZEdocGN5NXdjbVYySUR3Z1pXNTBjbmt1Wm1sdVlXeHNlVXh2WXlrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnYUdGdVpHeGxLR1Z1ZEhKNUxtWnBibUZzYkhsTWIyTXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVYRzRnSUNBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIUm9jbTkzSUc1bGR5QkZjbkp2Y2loY0luUnllU0J6ZEdGMFpXMWxiblFnZDJsMGFHOTFkQ0JqWVhSamFDQnZjaUJtYVc1aGJHeDVYQ0lwTzF4dUlDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdmVnh1SUNBZ0lIMHNYRzVjYmlBZ0lDQmhZbkoxY0hRNklHWjFibU4wYVc5dUtIUjVjR1VzSUdGeVp5a2dlMXh1SUNBZ0lDQWdabTl5SUNoMllYSWdhU0E5SUhSb2FYTXVkSEo1Ulc1MGNtbGxjeTVzWlc1bmRHZ2dMU0F4T3lCcElENDlJREE3SUMwdGFTa2dlMXh1SUNBZ0lDQWdJQ0IyWVhJZ1pXNTBjbmtnUFNCMGFHbHpMblJ5ZVVWdWRISnBaWE5iYVYwN1hHNGdJQ0FnSUNBZ0lHbG1JQ2hsYm5SeWVTNTBjbmxNYjJNZ1BEMGdkR2hwY3k1d2NtVjJJQ1ltWEc0Z0lDQWdJQ0FnSUNBZ0lDQm9ZWE5QZDI0dVkyRnNiQ2hsYm5SeWVTd2dYQ0ptYVc1aGJHeDVURzlqWENJcElDWW1YRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbkJ5WlhZZ1BDQmxiblJ5ZVM1bWFXNWhiR3g1VEc5aktTQjdYRzRnSUNBZ0lDQWdJQ0FnZG1GeUlHWnBibUZzYkhsRmJuUnllU0E5SUdWdWRISjVPMXh1SUNBZ0lDQWdJQ0FnSUdKeVpXRnJPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUdsbUlDaG1hVzVoYkd4NVJXNTBjbmtnSmlaY2JpQWdJQ0FnSUNBZ0lDQW9kSGx3WlNBOVBUMGdYQ0ppY21WaGExd2lJSHg4WEc0Z0lDQWdJQ0FnSUNBZ0lIUjVjR1VnUFQwOUlGd2lZMjl1ZEdsdWRXVmNJaWtnSmlaY2JpQWdJQ0FnSUNBZ0lDQm1hVzVoYkd4NVJXNTBjbmt1ZEhKNVRHOWpJRHc5SUdGeVp5QW1KbHh1SUNBZ0lDQWdJQ0FnSUdGeVp5QThQU0JtYVc1aGJHeDVSVzUwY25rdVptbHVZV3hzZVV4dll5a2dlMXh1SUNBZ0lDQWdJQ0F2THlCSloyNXZjbVVnZEdobElHWnBibUZzYkhrZ1pXNTBjbmtnYVdZZ1kyOXVkSEp2YkNCcGN5QnViM1FnYW5WdGNHbHVaeUIwYnlCaFhHNGdJQ0FnSUNBZ0lDOHZJR3h2WTJGMGFXOXVJRzkxZEhOcFpHVWdkR2hsSUhSeWVTOWpZWFJqYUNCaWJHOWpheTVjYmlBZ0lDQWdJQ0FnWm1sdVlXeHNlVVZ1ZEhKNUlEMGdiblZzYkR0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2RtRnlJSEpsWTI5eVpDQTlJR1pwYm1Gc2JIbEZiblJ5ZVNBL0lHWnBibUZzYkhsRmJuUnllUzVqYjIxd2JHVjBhVzl1SURvZ2UzMDdYRzRnSUNBZ0lDQnlaV052Y21RdWRIbHdaU0E5SUhSNWNHVTdYRzRnSUNBZ0lDQnlaV052Y21RdVlYSm5JRDBnWVhKbk8xeHVYRzRnSUNBZ0lDQnBaaUFvWm1sdVlXeHNlVVZ1ZEhKNUtTQjdYRzRnSUNBZ0lDQWdJSFJvYVhNdWJXVjBhRzlrSUQwZ1hDSnVaWGgwWENJN1hHNGdJQ0FnSUNBZ0lIUm9hWE11Ym1WNGRDQTlJR1pwYm1Gc2JIbEZiblJ5ZVM1bWFXNWhiR3g1VEc5ak8xeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z1EyOXVkR2x1ZFdWVFpXNTBhVzVsYkR0Y2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ2NtVjBkWEp1SUhSb2FYTXVZMjl0Y0d4bGRHVW9jbVZqYjNKa0tUdGNiaUFnSUNCOUxGeHVYRzRnSUNBZ1kyOXRjR3hsZEdVNklHWjFibU4wYVc5dUtISmxZMjl5WkN3Z1lXWjBaWEpNYjJNcElIdGNiaUFnSUNBZ0lHbG1JQ2h5WldOdmNtUXVkSGx3WlNBOVBUMGdYQ0owYUhKdmQxd2lLU0I3WEc0Z0lDQWdJQ0FnSUhSb2NtOTNJSEpsWTI5eVpDNWhjbWM3WEc0Z0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUdsbUlDaHlaV052Y21RdWRIbHdaU0E5UFQwZ1hDSmljbVZoYTF3aUlIeDhYRzRnSUNBZ0lDQWdJQ0FnY21WamIzSmtMblI1Y0dVZ1BUMDlJRndpWTI5dWRHbHVkV1ZjSWlrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG01bGVIUWdQU0J5WldOdmNtUXVZWEpuTzF4dUlDQWdJQ0FnZlNCbGJITmxJR2xtSUNoeVpXTnZjbVF1ZEhsd1pTQTlQVDBnWENKeVpYUjFjbTVjSWlrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG5KMllXd2dQU0IwYUdsekxtRnlaeUE5SUhKbFkyOXlaQzVoY21jN1hHNGdJQ0FnSUNBZ0lIUm9hWE11YldWMGFHOWtJRDBnWENKeVpYUjFjbTVjSWp0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTV1WlhoMElEMGdYQ0psYm1SY0lqdGNiaUFnSUNBZ0lIMGdaV3h6WlNCcFppQW9jbVZqYjNKa0xuUjVjR1VnUFQwOUlGd2libTl5YldGc1hDSWdKaVlnWVdaMFpYSk1iMk1wSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTV1WlhoMElEMGdZV1owWlhKTWIyTTdYRzRnSUNBZ0lDQjlYRzVjYmlBZ0lDQWdJSEpsZEhWeWJpQkRiMjUwYVc1MVpWTmxiblJwYm1Wc08xeHVJQ0FnSUgwc1hHNWNiaUFnSUNCbWFXNXBjMmc2SUdaMWJtTjBhVzl1S0dacGJtRnNiSGxNYjJNcElIdGNiaUFnSUNBZ0lHWnZjaUFvZG1GeUlHa2dQU0IwYUdsekxuUnllVVZ1ZEhKcFpYTXViR1Z1WjNSb0lDMGdNVHNnYVNBK1BTQXdPeUF0TFdrcElIdGNiaUFnSUNBZ0lDQWdkbUZ5SUdWdWRISjVJRDBnZEdocGN5NTBjbmxGYm5SeWFXVnpXMmxkTzF4dUlDQWdJQ0FnSUNCcFppQW9aVzUwY25rdVptbHVZV3hzZVV4dll5QTlQVDBnWm1sdVlXeHNlVXh2WXlrZ2UxeHVJQ0FnSUNBZ0lDQWdJSFJvYVhNdVkyOXRjR3hsZEdVb1pXNTBjbmt1WTI5dGNHeGxkR2x2Yml3Z1pXNTBjbmt1WVdaMFpYSk1iMk1wTzF4dUlDQWdJQ0FnSUNBZ0lISmxjMlYwVkhKNVJXNTBjbmtvWlc1MGNua3BPMXh1SUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJEYjI1MGFXNTFaVk5sYm5ScGJtVnNPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmU3hjYmx4dUlDQWdJRndpWTJGMFkyaGNJam9nWm5WdVkzUnBiMjRvZEhKNVRHOWpLU0I3WEc0Z0lDQWdJQ0JtYjNJZ0tIWmhjaUJwSUQwZ2RHaHBjeTUwY25sRmJuUnlhV1Z6TG14bGJtZDBhQ0F0SURFN0lHa2dQajBnTURzZ0xTMXBLU0I3WEc0Z0lDQWdJQ0FnSUhaaGNpQmxiblJ5ZVNBOUlIUm9hWE11ZEhKNVJXNTBjbWxsYzF0cFhUdGNiaUFnSUNBZ0lDQWdhV1lnS0dWdWRISjVMblJ5ZVV4dll5QTlQVDBnZEhKNVRHOWpLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2RtRnlJSEpsWTI5eVpDQTlJR1Z1ZEhKNUxtTnZiWEJzWlhScGIyNDdYRzRnSUNBZ0lDQWdJQ0FnYVdZZ0tISmxZMjl5WkM1MGVYQmxJRDA5UFNCY0luUm9jbTkzWENJcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGNpQjBhSEp2ZDI0Z1BTQnlaV052Y21RdVlYSm5PMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVnpaWFJVY25sRmJuUnllU2hsYm5SeWVTazdYRzRnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCMGFISnZkMjQ3WEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUgxY2JseHVJQ0FnSUNBZ0x5OGdWR2hsSUdOdmJuUmxlSFF1WTJGMFkyZ2diV1YwYUc5a0lHMTFjM1FnYjI1c2VTQmlaU0JqWVd4c1pXUWdkMmwwYUNCaElHeHZZMkYwYVc5dVhHNGdJQ0FnSUNBdkx5QmhjbWQxYldWdWRDQjBhR0YwSUdOdmNuSmxjM0J2Ym1SeklIUnZJR0VnYTI1dmQyNGdZMkYwWTJnZ1lteHZZMnN1WEc0Z0lDQWdJQ0IwYUhKdmR5QnVaWGNnUlhKeWIzSW9YQ0pwYkd4bFoyRnNJR05oZEdOb0lHRjBkR1Z0Y0hSY0lpazdYRzRnSUNBZ2ZTeGNibHh1SUNBZ0lHUmxiR1ZuWVhSbFdXbGxiR1E2SUdaMWJtTjBhVzl1S0dsMFpYSmhZbXhsTENCeVpYTjFiSFJPWVcxbExDQnVaWGgwVEc5aktTQjdYRzRnSUNBZ0lDQjBhR2x6TG1SbGJHVm5ZWFJsSUQwZ2UxeHVJQ0FnSUNBZ0lDQnBkR1Z5WVhSdmNqb2dkbUZzZFdWektHbDBaWEpoWW14bEtTeGNiaUFnSUNBZ0lDQWdjbVZ6ZFd4MFRtRnRaVG9nY21WemRXeDBUbUZ0WlN4Y2JpQWdJQ0FnSUNBZ2JtVjRkRXh2WXpvZ2JtVjRkRXh2WTF4dUlDQWdJQ0FnZlR0Y2JseHVJQ0FnSUNBZ2FXWWdLSFJvYVhNdWJXVjBhRzlrSUQwOVBTQmNJbTVsZUhSY0lpa2dlMXh1SUNBZ0lDQWdJQ0F2THlCRVpXeHBZbVZ5WVhSbGJIa2dabTl5WjJWMElIUm9aU0JzWVhOMElITmxiblFnZG1Gc2RXVWdjMjhnZEdoaGRDQjNaU0JrYjI0bmRGeHVJQ0FnSUNBZ0lDQXZMeUJoWTJOcFpHVnVkR0ZzYkhrZ2NHRnpjeUJwZENCdmJpQjBieUIwYUdVZ1pHVnNaV2RoZEdVdVhHNGdJQ0FnSUNBZ0lIUm9hWE11WVhKbklEMGdkVzVrWldacGJtVmtPMXh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0J5WlhSMWNtNGdRMjl1ZEdsdWRXVlRaVzUwYVc1bGJEdGNiaUFnSUNCOVhHNGdJSDA3WEc1OUtTaGNiaUFnTHk4Z1NXNGdjMnh2Y0hCNUlHMXZaR1VzSUhWdVltOTFibVFnWUhSb2FYTmdJSEpsWm1WeWN5QjBieUIwYUdVZ1oyeHZZbUZzSUc5aWFtVmpkQ3dnWm1Gc2JHSmhZMnNnZEc5Y2JpQWdMeThnUm5WdVkzUnBiMjRnWTI5dWMzUnlkV04wYjNJZ2FXWWdkMlVuY21VZ2FXNGdaMnh2WW1Gc0lITjBjbWxqZENCdGIyUmxMaUJVYUdGMElHbHpJSE5oWkd4NUlHRWdabTl5YlZ4dUlDQXZMeUJ2WmlCcGJtUnBjbVZqZENCbGRtRnNJSGRvYVdOb0lIWnBiMnhoZEdWeklFTnZiblJsYm5RZ1UyVmpkWEpwZEhrZ1VHOXNhV041TGx4dUlDQW9ablZ1WTNScGIyNG9LU0I3SUhKbGRIVnliaUIwYUdseklIMHBLQ2tnZkh3Z1JuVnVZM1JwYjI0b1hDSnlaWFIxY200Z2RHaHBjMXdpS1NncFhHNHBPMXh1SWl3aVkyOXVjM1FnYVc1b1pYSnBkQ0E5SUdjemQzTmtheTVqYjNKbExuVjBhV3h6TG1sdWFHVnlhWFE3WEc1amIyNXpkQ0JpWVhObElEMGdaek4zYzJSckxtTnZjbVV1ZFhScGJITXVZbUZ6WlR0Y2JtTnZibk4wSUZoSVVpQTlJR2N6ZDNOa2F5NWpiM0psTG5WMGFXeHpMbGhJVWp0Y2JtTnZibk4wSUZCc2RXZHBibE5sY25acFkyVWdQU0JuTTNkelpHc3VZMjl5WlM1d2JIVm5hVzR1VUd4MVoybHVVMlZ5ZG1salpUdGNibU52Ym5OMElIUWdQU0JuTTNkelpHc3VZMjl5WlM1cE1UaHVMblJRYkhWbmFXNDdYRzVqYjI1emRDQkhWVWtnUFNCbk0zZHpaR3N1WjNWcExrZFZTVHRjYm1OdmJuTjBJRU52YlhCdmJtVnVkSE5HWVdOMGIzSjVJRDBnWnpOM2MyUnJMbWQxYVM1RGIyMXdiMjVsYm5SelJtRmpkRzl5ZVR0Y2JtTnZibk4wSUVOb1lYSjBjMFpoWTNSdmNua2dQU0JuTTNkelpHc3VaM1ZwTG5aMVpTNURhR0Z5ZEhNdVEyaGhjblJ6Um1GamRHOXllVHRjYmx4dVpuVnVZM1JwYjI0Z1JXeGxkbUYwYVc5dVVISnZabWxzWlZObGNuWnBZMlVvS1NCN1hHNGdJR0poYzJVb2RHaHBjeWs3WEc0Z0lIUm9hWE11YVc1cGRDQTlJR1oxYm1OMGFXOXVLR052Ym1acFp6MTdmU2tnZTF4dUlDQWdJSFJvYVhNdVkyaGhjblJEYjJ4dmNpQTlJRWRWU1M1emEybHVRMjlzYjNJN1hHNGdJQ0FnZEdocGN5NWpiMjVtYVdjZ1BTQmpiMjVtYVdjN1hHNGdJQ0FnZEdocGN5NWZiV0Z3VTJWeWRtbGpaU0E5SUVkVlNTNW5aWFJEYjIxd2IyNWxiblFvSjIxaGNDY3BMbWRsZEZObGNuWnBZMlVvS1R0Y2JpQWdJQ0IwYUdsekxtdGxlVk5sZEhSbGNuTWdQU0I3ZlR0Y2JpQWdJQ0JqYjI1emRDQnhkV1Z5ZVhKbGMzVnNkSE5EYjIxd2IyNWxiblFnUFNCSFZVa3VaMlYwUTI5dGNHOXVaVzUwS0NkeGRXVnllWEpsYzNWc2RITW5LVHRjYmlBZ0lDQjBhR2x6TG5GMVpYSjVjbVZ6ZFd4MGMxTmxjblpwWTJVZ1BTQnhkV1Z5ZVhKbGMzVnNkSE5EYjIxd2IyNWxiblF1WjJWMFUyVnlkbWxqWlNncE8xeHVJQ0FnSUM4dmRYTmxablZzZENCMGJ5QnlaV2RwYzNSbGNpQnNZWGxsY2lCMWJtUmxjaUJzWVhkY2JpQWdJQ0IwYUdsekxtdGxlVk5sZEhSbGNuTXVZV1JrUVdOMGFXOXVUR0Y1WlhKeklEMGdkR2hwY3k1eGRXVnllWEpsYzNWc2RITlRaWEoyYVdObExtOXVZbVZtYjNKbEtDZGhaR1JCWTNScGIyNXpSbTl5VEdGNVpYSnpKeXdnS0dGamRHbHZibk05ZTMwcElEMCtJSHRjYmlBZ0lDQWdJSFJvYVhNdVkyOXVabWxuTG14aGVXVnljeTVtYjNKRllXTm9LR3hoZVdWeVQySnFJRDArSUh0Y2JpQWdJQ0FnSUNBZ1kyOXVjM1FnZTJ4aGVXVnlYMmxrT2lCc1lYbGxja2xrZlNBOUlHeGhlV1Z5VDJKcU8xeHVJQ0FnSUNBZ0lDQnBaaUFvSVdGamRHbHZibk5iYkdGNVpYSkpaRjBwSUdGamRHbHZibk5iYkdGNVpYSkpaRjBnUFNCYlhUdGNiaUFnSUNBZ0lDQWdZMjl1YzNRZ2JHRjVaWEpCWTNScGIyNXpJRDBnWVdOMGFXOXVjMXRzWVhsbGNrbGtYVHRjYmlBZ0lDQWdJQ0FnYkdGNVpYSkJZM1JwYjI1ekxuQjFjMmdvZTF4dUlDQWdJQ0FnSUNBZ0lHbGtPaUFuYzJodmQyVnNaWFpoZEdsdmJpY3NYRzRnSUNBZ0lDQWdJQ0FnWTJ4aGMzTTZJRWRWU1M1blpYUkdiMjUwUTJ4aGMzTW9KMk5vWVhKMEp5a3NYRzRnSUNBZ0lDQWdJQ0FnYUdsdWREb2dKM0JzZFdkcGJuTXVaV3hsY0hKdlptbHNaUzV4ZFdWeWVTNWhZM1JwYjI1ekxuTm9iM2RsYkdWMllYUnBiMjRuTEZ4dUlDQWdJQ0FnSUNBZ0lHTmlhem9nS0d4aGVXVnlMQ0JtWldGMGRYSmxLU0E5UGlCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxuTm9iM2REYUdGeWRFTnZiWEJ2Ym1WdWRDaDdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lHeGhlV1Z5VDJKcUxGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNCbWFXUTZJR1psWVhSMWNtVXVZWFIwY21saWRYUmxjMXNuWnpOM1gyWnBaQ2RkWEc0Z0lDQWdJQ0FnSUNBZ0lDQjlLVnh1SUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ2ZTazdYRzRnSUNBZ0lDQjlLVnh1SUNBZ0lIMHBPMXh1SUNCOU8xeHVYRzRnSUhSb2FYTXVaMlYwUTI5dVptbG5JRDBnWm5WdVkzUnBiMjRvS1h0Y2JpQWdJQ0J5WlhSMWNtNGdkR2hwY3k1amIyNW1hV2M3WEc0Z0lIMDdYRzVjYmlBZ2RHaHBjeTVuWlhSVmNteHpJRDBnWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnY21WMGRYSnVJSFJvYVhNdVkyOXVabWxuTG5WeWJITTdYRzRnSUgwN1hHNWNiaUFnZEdocGN5NXphRzkzUTJoaGNuUkRiMjF3YjI1bGJuUWdQU0JtZFc1amRHbHZiaWg3YkdGNVpYSlBZbW9zSUdacFpIMDllMzBwSUh0Y2JpQWdJQ0JqYjI1emRDQjdZWEJwTENCc1lYbGxjbDlwWkRvZ2JHRjVaWEpKWkgwZ1BTQnNZWGxsY2s5aWFqdGNiaUFnSUNCMGFHbHpMbWRsZEVOb1lYSjBRMjl0Y0c5dVpXNTBLSHRoY0drc0lHeGhlV1Z5U1dRc0lHWnBaSDBwWEc0Z0lDQWdJQ0F1ZEdobGJpZ29lMlpwWkN3Z1kyOXRjRzl1Wlc1ME9uWjFaVU52YlhCdmJtVnVkRTlpYW1WamRDd2daWEp5YjNKOUtTQTlQaUI3WEc0Z0lDQWdJQ0FnSUdsbUlDaGxjbkp2Y2lrZ2NtVjBkWEp1TzF4dUlDQWdJQ0FnSUNCbGJITmxJRWRWU1M1d2RYTm9RMjl1ZEdWdWRDaDdYRzRnSUNBZ0lDQWdJQ0FnYVdRNklDZGxiR1YyWVhScGIyNG5MRnh1SUNBZ0lDQWdJQ0FnSUdOdmJuUmxiblE2SUVOdmJYQnZibVZ1ZEhOR1lXTjBiM0o1TG1KMWFXeGtLSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWjFaVU52YlhCdmJtVnVkRTlpYW1WamRGeHVJQ0FnSUNBZ0lDQWdJSDBwTEZ4dUlDQWdJQ0FnSUNBZ0lIQmxjbU02SURVd0xGeHVJQ0FnSUNBZ0lDQWdJR05zYjNOaFlteGxPaUJtWVd4elpWeHVJQ0FnSUNBZ0lDQjlLVnh1SUNBZ0lDQWdmU2xjYmlBZ2ZUdGNibHh1SUNCMGFHbHpMbWRsZEVOb1lYSjBRMjl0Y0c5dVpXNTBJRDBnWVhONWJtTWdablZ1WTNScGIyNG9lMkZ3YVN3Z2JHRjVaWEpKWkN3Z1ptbGtmVDE3ZlNrZ2UxeHVJQ0FnSUhSeWVTQjdYRzRnSUNBZ0lDQmpiMjV6ZENCeVpYTndiMjV6WlNBOUlHRjNZV2wwSUhSb2FYTXVaMlYwUld4bGRtRjBhVzl1UkdGMFlTaDdZWEJwTENCc1lYbGxja2xrTENCbWFXUjlLVHRjYmlBZ0lDQWdJR052Ym5OMElHUmhkR0VnUFNCeVpYTndiMjV6WlM1eVpYTjFiSFFnSmlZZ2NtVnpjRzl1YzJVdWNISnZabWxzWlR0Y2JpQWdJQ0FnSUdsbUlDaGtZWFJoS1NCN1hHNGdJQ0FnSUNBZ0lHTnZibk4wSUdkeVlYQm9SR0YwWVNBOUlIdGNiaUFnSUNBZ0lDQWdJQ0I0T2lCYkozZ25YU3hjYmlBZ0lDQWdJQ0FnSUNCNU9pQmJKM2tuWFN4Y2JpQWdJQ0FnSUNBZ0lDQnRhVzVZT2lBZ09UazVPVGs1T1N4Y2JpQWdJQ0FnSUNBZ0lDQnRZWGhZT2lBdE9UazVPVGs1T1N4Y2JpQWdJQ0FnSUNBZ0lDQnRhVzVaT2lBZ09UazVPVGs1T1N4Y2JpQWdJQ0FnSUNBZ0lDQnRZWGhaT2lBdE9UazVPVGs1T1Z4dUlDQWdJQ0FnSUNCOU8xeHVJQ0FnSUNBZ0lDQm1iM0lnS0d4bGRDQnBQVEE3SUdrZ1BDQmtZWFJoTG14bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ0lDQWdJQ0FnWTI5dWMzUWdYMlJoZEdFZ1BTQmtZWFJoVzJsZE8xeHVJQ0FnSUNBZ0lDQWdJR052Ym5OMElIZ2dQU0JmWkdGMFlWc3pYVHRjYmlBZ0lDQWdJQ0FnSUNCamIyNXpkQ0I1SUQwZ1gyUmhkR0ZiTWwwN1hHNGdJQ0FnSUNBZ0lDQWdaM0poY0doRVlYUmhMbTFwYmxnZ1BTQjRJRHdnWjNKaGNHaEVZWFJoTG0xcGJsZ2dQeUI0SURvZ1ozSmhjR2hFWVhSaExtMXBibGc3WEc0Z0lDQWdJQ0FnSUNBZ1ozSmhjR2hFWVhSaExtMXBibGtnUFNCNUlEd2daM0poY0doRVlYUmhMbTFwYmxrZ1B5QjVJRG9nWjNKaGNHaEVZWFJoTG0xcGJsazdYRzRnSUNBZ0lDQWdJQ0FnWjNKaGNHaEVZWFJoTG0xaGVGZ2dQU0I0SUQ0Z1ozSmhjR2hFWVhSaExtMWhlRmdnUHlCNElEb2daM0poY0doRVlYUmhMbTFoZUZnN1hHNGdJQ0FnSUNBZ0lDQWdaM0poY0doRVlYUmhMbTFoZUZrZ1BTQjVJRDRnWjNKaGNHaEVZWFJoTG0xaGVGa2dQeUI1SURvZ1ozSmhjR2hFWVhSaExtMWhlRms3WEc0Z0lDQWdJQ0FnSUNBZ1ozSmhjR2hFWVhSaExuZ3VjSFZ6YUNoNEtUdGNiaUFnSUNBZ0lDQWdJQ0JuY21Gd2FFUmhkR0V1ZVM1d2RYTm9LSGtwTzF4dUlDQWdJQ0FnSUNCOVhHNGdJQ0FnSUNBZ0lHTnZibk4wSUhObGJHWWdQU0IwYUdsek8xeHVJQ0FnSUNBZ0lDQmpiMjV6ZENCdFlYQWdQU0IwYUdsekxsOXRZWEJUWlhKMmFXTmxMbWRsZEUxaGNDZ3BPMXh1SUNBZ0lDQWdJQ0JzWlhRZ2FHbGtaVWhwWjJoMGJHbG5hSFJHYm1NZ1BTQW9LU0E5UGlCN2ZUdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIdGNiaUFnSUNBZ0lDQWdJQ0JrWVhSaExGeHVJQ0FnSUNBZ0lDQWdJR2xrT2lCMEtDZGxiR1Z3Y205bWFXeGxMbU5vWVhKMExuUnBkR3hsSnlrc1hHNGdJQ0FnSUNBZ0lDQWdZMjl0Y0c5dVpXNTBPaUJEYUdGeWRITkdZV04wYjNKNUxtSjFhV3hrS0h0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFI1Y0dVNklDZGpNenBzYVc1bFdGa25MRnh1SUNBZ0lDQWdJQ0FnSUNBZ2FHOXZhM002SUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnWTNKbFlYUmxaQ2dwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbk5sZEVOdmJtWnBaeWg3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCdmJtMXZkWE5sYjNWMEtDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCb2FXUmxTR2xuYUhSc2FXZG9kRVp1WXlncFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlMRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZEdsMGJHVTZJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHVjRkRG9nZENnblpXeGxjSEp2Wm1sc1pTNWphR0Z5ZEM1MGFYUnNaU2NwTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQndiM05wZEdsdmJqb2dKM1J2Y0MxalpXNTBaWEluTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZTeGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEJoWkdScGJtYzZJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHOXdPaUEwTUN4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZbTkwZEc5dE9pQXpNQ3hjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtbG5hSFE2SURNd1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlMRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZW05dmJUb2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbGJtRmliR1ZrT2lCMGNuVmxMRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYTmpZV3hsT2lCMGNuVmxMRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlN4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHUmhkR0U2SUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjMlZzWldOMGFXOXVPaUI3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdaVzVoWW14bFpEb2dabUZzYzJVc1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWkhKaFoyZGhZbXhsT2lCMGNuVmxYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgwc1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSGc2SUNkNEp5eGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZVRvZ0oza25MRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMGVYQmxjem9nZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSGs2SUNkaGNtVmhKMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOUxGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqYjJ4dmNuTTZJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjRPaUJ6Wld4bUxtTm9ZWEowUTI5c2IzSXNYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2VUb2djMlZzWmk1amFHRnlkRU52Ykc5eVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDBzWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTnZiSFZ0Ym5NNklGdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbmNtRndhRVJoZEdFdWVDeGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbmNtRndhRVJoZEdFdWVWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JkTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnZibTF2ZFhObGIzVjBLR1YyZENrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdocFpHVklhV2RvZEd4cFoyaDBSbTVqS0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDBzWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHOXVZMnhwWTJzb2UybHVaR1Y0ZlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdOdmJuTjBJRnQ0TENCNVhTQTlJR1JoZEdGYmFXNWtaWGhkTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRzFoY0M1blpYUldhV1YzS0NrdWMyVjBRMlZ1ZEdWeUtGdDRMSGxkS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmU3hjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgwc1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnNaV2RsYm1RNklIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYzJodmR6b2dabUZzYzJWY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMHNYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwYjI5c2RHbHdPbnRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1ptOXliV0YwT2lCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZEdsMGJHVW9aQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJR0FrZTNRb0oyVnNaWEJ5YjJacGJHVXVZMmhoY25RdWRHOXZiSFJwY0M1MGFYUnNaU2NwZlRvZ0pIdGtZWFJoVzJSZFd6TmRmV0JjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlMRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOUxGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqYjI1MFpXNTBjem9nWm5WdVkzUnBiMjRnS0Y5a1lYUmhMQ0JqYjJ4dmNpa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTnZibk4wSUdsdVpHVjRJRDBnWDJSaGRHRmJNRjB1YVc1a1pYZzdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kyOXVjM1FnVzNnc0lIa3NJSFpoYkhWbFhTQTlJR1JoZEdGYmFXNWtaWGhkTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR052Ym5OMElIQnZhVzUwWDJkbGIyMGdQU0J1WlhjZ2Iyd3VaMlZ2YlM1UWIybHVkQ2hjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRnQ0TENCNVhWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYzJWc1ppNWZiV0Z3VTJWeWRtbGpaUzVvYVdkb2JHbG5hSFJIWlc5dFpYUnllU2h3YjJsdWRGOW5aVzl0TENCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCNmIyOXRPaUJtWVd4elpTeGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHaHBaR1U2SUdaMWJtTjBhVzl1S0dOaGJHeGlZV05yS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHaHBaR1ZJYVdkb2RHeHBaMmgwUm01aklEMGdZMkZzYkdKaFkyczdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlMRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjM1I1YkdVNklHNWxkeUJ2YkM1emRIbHNaUzVUZEhsc1pTaDdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2x0WVdkbE9pQnVaWGNnYjJ3dWMzUjViR1V1VW1WbmRXeGhjbE5vWVhCbEtIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JtYVd4c09pQnVaWGNnYjJ3dWMzUjViR1V1Um1sc2JDaDdZMjlzYjNJNklDZDNhR2wwWlNjZ2ZTa3NYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYzNSeWIydGxPaUJ1WlhjZ2Iyd3VjM1I1YkdVdVUzUnliMnRsS0h0amIyeHZjam9nYzJWc1ppNWphR0Z5ZEVOdmJHOXlMQ0IzYVdSMGFEb2dNMzBwTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIQnZhVzUwY3pvZ015eGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J5WVdScGRYTTZJREV5TEZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHRnVaMnhsT2lBd1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMHBYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlLVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMHBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCZ1BHUnBkaUJ6ZEhsc1pUMWNJbVp2Ym5RdGQyVnBaMmgwT2lCaWIyeGtPeUJpYjNKa1pYSTZNbkI0SUhOdmJHbGtPeUJpWVdOclozSnZkVzVrTFdOdmJHOXlPaUFqWm1abVptWm1PeUJ3WVdSa2FXNW5PaUF6Y0hnN1ltOXlaR1Z5TFhKaFpHbDFjem9nTTNCNE8xd2lJRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqYkdGemN6MWNJbk5yYVc0dFltOXlaR1Z5TFdOdmJHOXlJSE5yYVc0dFkyOXNiM0pjSWo0a2UzWmhiSFZsTG5SdlJtbDRaV1FvTWlsOUtHMHBQQzlrYVhZK1lGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOUxGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZWGhwY3pvZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I0T2lCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYldGNE9pQm5jbUZ3YUVSaGRHRXViV0Y0V0NBcklESXNYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2JXbHVPaUJuY21Gd2FFUmhkR0V1YldsdVdDQXRJRElzWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiR0ZpWld3NklIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUmxlSFE2SUhRb0oyVnNaWEJ5YjJacGJHVXVZMmhoY25RdWJHRmlaV3h6TG5nbktTeGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIQnZjMmwwYVc5dU9pQW5iM1YwWlhJdFkyVnVkR1Z5SjF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDBzWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR2xqYXpvZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1ptbDBPaUJtWVd4elpTeGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTnZkVzUwT2lBMExGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1ptOXliV0YwT2lCbWRXNWpkR2x2YmlBb2RtRnNkV1VwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUhaaGJIVmxMblJ2Um1sNFpXUW9NaWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOUxGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I1T2lCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYldGNE9pQm5jbUZ3YUVSaGRHRXViV0Y0V1NBcklEVXNYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2JXbHVPaUJuY21Gd2FFUmhkR0V1YldsdVdTQXRJRFVzWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiR0ZpWld3NklIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUmxlSFE2SUhRb0oyVnNaWEJ5YjJacGJHVXVZMmhoY25RdWJHRmlaV3h6TG5rbktTeGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIQnZjMmwwYVc5dU9pQW5iM1YwWlhJdGJXbGtaR3hsSjF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDBzWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR2xqYXpvZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1kyOTFiblE2SURVc1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbWIzSnRZWFE2SUdaMWJtTjBhVzl1SUNoMllXeDFaU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnZG1Gc2RXVXVkRzlHYVhobFpDZ3lLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJSDBwWEc0Z0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUgxY2JpQWdJQ0I5SUdOaGRHTm9JQ2hsY25JcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCN1hHNGdJQ0FnSUNBZ0lHVnljbTl5T2lCMGNuVmxYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZWeHVJQ0I5TzF4dVhHNGdJSFJvYVhNdVoyVjBSV3hsZG1GMGFXOXVSR0YwWVNBOUlHRnplVzVqSUdaMWJtTjBhVzl1S0h0aGNHa3NJR3hoZVdWeVNXUXNJR1pwWkgwOWUzMHBJSHRjYmlBZ0lDQmpiMjV6ZENCMWNtd2dQU0JnSkh0aGNHbDlKSHRzWVhsbGNrbGtmUzhrZTJacFpIMWdPMXh1SUNBZ0lHTnZibk4wSUdSaGRHRWdQU0I3WEc0Z0lDQWdJQ0J5WlhOMWJIUTZJR1poYkhObFhHNGdJQ0FnZlR0Y2JpQWdJQ0IwY25rZ2UxeHVJQ0FnSUNBZ1kyOXVjM1FnY21WemNHOXVjMlVnUFNCaGQyRnBkQ0JZU0ZJdVoyVjBLSHRjYmlBZ0lDQWdJQ0FnZFhKc1hHNGdJQ0FnSUNCOUtUdGNiaUFnSUNBZ0lHUmhkR0V1Y0hKdlptbHNaU0E5SUhKbGMzQnZibk5sTG5CeWIyWnBiR1U3WEc0Z0lDQWdJQ0JrWVhSaExuSmxjM1ZzZENBOUlIUnlkV1U3WEc0Z0lDQWdmU0JqWVhSamFDaGxjbkp2Y2lsN2ZWeHVJQ0FnSUhKbGRIVnliaUJrWVhSaE8xeHVJQ0I5TzF4dVhHNGdJSFJvYVhNdVkyeGxZWElnUFNCbWRXNWpkR2x2YmlncElIdGNiaUFnSUNCMGFHbHpMbkYxWlhKNWNtVnpkV3gwYzFObGNuWnBZMlV1ZFc0b0oyRmtaRUZqZEdsdmJreGhlV1Z5Y3ljc0lIUm9hWE11YTJWNVUyVjBkR1Z5Y3k1aFpHUkJZM1JwYjI1TVlYbGxjbk1wTzF4dUlDQjlYRzU5WEc1Y2JseHVhVzVvWlhKcGRDaEZiR1YyWVhScGIyNVFjbTltYVd4bFUyVnlkbWxqWlN3Z1VHeDFaMmx1VTJWeWRtbGpaU2s3WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ2JtVjNJRVZzWlhaaGRHbHZibEJ5YjJacGJHVlRaWEoyYVdObE8xeHVJbDE5In0=
