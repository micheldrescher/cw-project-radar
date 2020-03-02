// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
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
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../node_modules/core-js/modules/_global.js":[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"../../node_modules/core-js/modules/_core.js":[function(require,module,exports) {
var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"../../node_modules/core-js/modules/_is-object.js":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"../../node_modules/core-js/modules/_an-object.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"../../node_modules/core-js/modules/_is-object.js"}],"../../node_modules/core-js/modules/_fails.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"../../node_modules/core-js/modules/_descriptors.js":[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"../../node_modules/core-js/modules/_fails.js"}],"../../node_modules/core-js/modules/_dom-create.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_global":"../../node_modules/core-js/modules/_global.js"}],"../../node_modules/core-js/modules/_ie8-dom-define.js":[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"../../node_modules/core-js/modules/_descriptors.js","./_fails":"../../node_modules/core-js/modules/_fails.js","./_dom-create":"../../node_modules/core-js/modules/_dom-create.js"}],"../../node_modules/core-js/modules/_to-primitive.js":[function(require,module,exports) {
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

},{"./_is-object":"../../node_modules/core-js/modules/_is-object.js"}],"../../node_modules/core-js/modules/_object-dp.js":[function(require,module,exports) {
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

},{"./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_ie8-dom-define":"../../node_modules/core-js/modules/_ie8-dom-define.js","./_to-primitive":"../../node_modules/core-js/modules/_to-primitive.js","./_descriptors":"../../node_modules/core-js/modules/_descriptors.js"}],"../../node_modules/core-js/modules/_property-desc.js":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"../../node_modules/core-js/modules/_hide.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":"../../node_modules/core-js/modules/_object-dp.js","./_property-desc":"../../node_modules/core-js/modules/_property-desc.js","./_descriptors":"../../node_modules/core-js/modules/_descriptors.js"}],"../../node_modules/core-js/modules/_has.js":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"../../node_modules/core-js/modules/_uid.js":[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],"../../node_modules/core-js/modules/_library.js":[function(require,module,exports) {
module.exports = false;

},{}],"../../node_modules/core-js/modules/_shared.js":[function(require,module,exports) {

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

},{"./_core":"../../node_modules/core-js/modules/_core.js","./_global":"../../node_modules/core-js/modules/_global.js","./_library":"../../node_modules/core-js/modules/_library.js"}],"../../node_modules/core-js/modules/_function-to-string.js":[function(require,module,exports) {
module.exports = require('./_shared')('native-function-to-string', Function.toString);

},{"./_shared":"../../node_modules/core-js/modules/_shared.js"}],"../../node_modules/core-js/modules/_redefine.js":[function(require,module,exports) {

var global = require('./_global');
var hide = require('./_hide');
var has = require('./_has');
var SRC = require('./_uid')('src');
var $toString = require('./_function-to-string');
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

require('./_core').inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

},{"./_global":"../../node_modules/core-js/modules/_global.js","./_hide":"../../node_modules/core-js/modules/_hide.js","./_has":"../../node_modules/core-js/modules/_has.js","./_uid":"../../node_modules/core-js/modules/_uid.js","./_function-to-string":"../../node_modules/core-js/modules/_function-to-string.js","./_core":"../../node_modules/core-js/modules/_core.js"}],"../../node_modules/core-js/modules/_a-function.js":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"../../node_modules/core-js/modules/_ctx.js":[function(require,module,exports) {
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

},{"./_a-function":"../../node_modules/core-js/modules/_a-function.js"}],"../../node_modules/core-js/modules/_export.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var hide = require('./_hide');
var redefine = require('./_redefine');
var ctx = require('./_ctx');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
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

},{"./_global":"../../node_modules/core-js/modules/_global.js","./_core":"../../node_modules/core-js/modules/_core.js","./_hide":"../../node_modules/core-js/modules/_hide.js","./_redefine":"../../node_modules/core-js/modules/_redefine.js","./_ctx":"../../node_modules/core-js/modules/_ctx.js"}],"../../node_modules/core-js/modules/_defined.js":[function(require,module,exports) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],"../../node_modules/core-js/modules/_to-object.js":[function(require,module,exports) {
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":"../../node_modules/core-js/modules/_defined.js"}],"../../node_modules/core-js/modules/_to-integer.js":[function(require,module,exports) {
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],"../../node_modules/core-js/modules/_to-absolute-index.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":"../../node_modules/core-js/modules/_to-integer.js"}],"../../node_modules/core-js/modules/_to-length.js":[function(require,module,exports) {
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":"../../node_modules/core-js/modules/_to-integer.js"}],"../../node_modules/core-js/modules/_array-copy-within.js":[function(require,module,exports) {
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};

},{"./_to-object":"../../node_modules/core-js/modules/_to-object.js","./_to-absolute-index":"../../node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"../../node_modules/core-js/modules/_to-length.js"}],"../../node_modules/core-js/modules/_wks.js":[function(require,module,exports) {
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_shared":"../../node_modules/core-js/modules/_shared.js","./_uid":"../../node_modules/core-js/modules/_uid.js","./_global":"../../node_modules/core-js/modules/_global.js"}],"../../node_modules/core-js/modules/_add-to-unscopables.js":[function(require,module,exports) {
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = require('./_wks')('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) require('./_hide')(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

},{"./_wks":"../../node_modules/core-js/modules/_wks.js","./_hide":"../../node_modules/core-js/modules/_hide.js"}],"../../node_modules/core-js/modules/es6.array.copy-within.js":[function(require,module,exports) {
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { copyWithin: require('./_array-copy-within') });

require('./_add-to-unscopables')('copyWithin');

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_array-copy-within":"../../node_modules/core-js/modules/_array-copy-within.js","./_add-to-unscopables":"../../node_modules/core-js/modules/_add-to-unscopables.js"}],"../../node_modules/core-js/modules/_array-fill.js":[function(require,module,exports) {
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = require('./_to-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};

},{"./_to-object":"../../node_modules/core-js/modules/_to-object.js","./_to-absolute-index":"../../node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"../../node_modules/core-js/modules/_to-length.js"}],"../../node_modules/core-js/modules/es6.array.fill.js":[function(require,module,exports) {
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = require('./_export');

$export($export.P, 'Array', { fill: require('./_array-fill') });

require('./_add-to-unscopables')('fill');

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_array-fill":"../../node_modules/core-js/modules/_array-fill.js","./_add-to-unscopables":"../../node_modules/core-js/modules/_add-to-unscopables.js"}],"../../node_modules/core-js/modules/_cof.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"../../node_modules/core-js/modules/_iobject.js":[function(require,module,exports) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":"../../node_modules/core-js/modules/_cof.js"}],"../../node_modules/core-js/modules/_is-array.js":[function(require,module,exports) {
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":"../../node_modules/core-js/modules/_cof.js"}],"../../node_modules/core-js/modules/_array-species-constructor.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var isArray = require('./_is-array');
var SPECIES = require('./_wks')('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

},{"./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_is-array":"../../node_modules/core-js/modules/_is-array.js","./_wks":"../../node_modules/core-js/modules/_wks.js"}],"../../node_modules/core-js/modules/_array-species-create.js":[function(require,module,exports) {
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

},{"./_array-species-constructor":"../../node_modules/core-js/modules/_array-species-constructor.js"}],"../../node_modules/core-js/modules/_array-methods.js":[function(require,module,exports) {
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = require('./_ctx');
var IObject = require('./_iobject');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var asc = require('./_array-species-create');
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

},{"./_ctx":"../../node_modules/core-js/modules/_ctx.js","./_iobject":"../../node_modules/core-js/modules/_iobject.js","./_to-object":"../../node_modules/core-js/modules/_to-object.js","./_to-length":"../../node_modules/core-js/modules/_to-length.js","./_array-species-create":"../../node_modules/core-js/modules/_array-species-create.js"}],"../../node_modules/core-js/modules/es6.array.find.js":[function(require,module,exports) {
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_array-methods":"../../node_modules/core-js/modules/_array-methods.js","./_add-to-unscopables":"../../node_modules/core-js/modules/_add-to-unscopables.js"}],"../../node_modules/core-js/modules/es6.array.find-index.js":[function(require,module,exports) {
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = require('./_export');
var $find = require('./_array-methods')(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
require('./_add-to-unscopables')(KEY);

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_array-methods":"../../node_modules/core-js/modules/_array-methods.js","./_add-to-unscopables":"../../node_modules/core-js/modules/_add-to-unscopables.js"}],"../../node_modules/core-js/modules/_flatten-into-array.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = require('./_is-array');
var isObject = require('./_is-object');
var toLength = require('./_to-length');
var ctx = require('./_ctx');
var IS_CONCAT_SPREADABLE = require('./_wks')('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;

},{"./_is-array":"../../node_modules/core-js/modules/_is-array.js","./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_to-length":"../../node_modules/core-js/modules/_to-length.js","./_ctx":"../../node_modules/core-js/modules/_ctx.js","./_wks":"../../node_modules/core-js/modules/_wks.js"}],"../../node_modules/core-js/modules/es7.array.flat-map.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = require('./_export');
var flattenIntoArray = require('./_flatten-into-array');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var aFunction = require('./_a-function');
var arraySpeciesCreate = require('./_array-species-create');

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

require('./_add-to-unscopables')('flatMap');

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_flatten-into-array":"../../node_modules/core-js/modules/_flatten-into-array.js","./_to-object":"../../node_modules/core-js/modules/_to-object.js","./_to-length":"../../node_modules/core-js/modules/_to-length.js","./_a-function":"../../node_modules/core-js/modules/_a-function.js","./_array-species-create":"../../node_modules/core-js/modules/_array-species-create.js","./_add-to-unscopables":"../../node_modules/core-js/modules/_add-to-unscopables.js"}],"../../node_modules/core-js/modules/_iter-call.js":[function(require,module,exports) {
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

},{"./_an-object":"../../node_modules/core-js/modules/_an-object.js"}],"../../node_modules/core-js/modules/_iterators.js":[function(require,module,exports) {
module.exports = {};

},{}],"../../node_modules/core-js/modules/_is-array-iter.js":[function(require,module,exports) {
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":"../../node_modules/core-js/modules/_iterators.js","./_wks":"../../node_modules/core-js/modules/_wks.js"}],"../../node_modules/core-js/modules/_create-property.js":[function(require,module,exports) {
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":"../../node_modules/core-js/modules/_object-dp.js","./_property-desc":"../../node_modules/core-js/modules/_property-desc.js"}],"../../node_modules/core-js/modules/_classof.js":[function(require,module,exports) {
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

},{"./_cof":"../../node_modules/core-js/modules/_cof.js","./_wks":"../../node_modules/core-js/modules/_wks.js"}],"../../node_modules/core-js/modules/core.get-iterator-method.js":[function(require,module,exports) {
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":"../../node_modules/core-js/modules/_classof.js","./_wks":"../../node_modules/core-js/modules/_wks.js","./_iterators":"../../node_modules/core-js/modules/_iterators.js","./_core":"../../node_modules/core-js/modules/_core.js"}],"../../node_modules/core-js/modules/_iter-detect.js":[function(require,module,exports) {
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

},{"./_wks":"../../node_modules/core-js/modules/_wks.js"}],"../../node_modules/core-js/modules/es6.array.from.js":[function(require,module,exports) {
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_ctx":"../../node_modules/core-js/modules/_ctx.js","./_export":"../../node_modules/core-js/modules/_export.js","./_to-object":"../../node_modules/core-js/modules/_to-object.js","./_iter-call":"../../node_modules/core-js/modules/_iter-call.js","./_is-array-iter":"../../node_modules/core-js/modules/_is-array-iter.js","./_to-length":"../../node_modules/core-js/modules/_to-length.js","./_create-property":"../../node_modules/core-js/modules/_create-property.js","./core.get-iterator-method":"../../node_modules/core-js/modules/core.get-iterator-method.js","./_iter-detect":"../../node_modules/core-js/modules/_iter-detect.js"}],"../../node_modules/core-js/modules/_to-iobject.js":[function(require,module,exports) {
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_iobject":"../../node_modules/core-js/modules/_iobject.js","./_defined":"../../node_modules/core-js/modules/_defined.js"}],"../../node_modules/core-js/modules/_array-includes.js":[function(require,module,exports) {
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

},{"./_to-iobject":"../../node_modules/core-js/modules/_to-iobject.js","./_to-length":"../../node_modules/core-js/modules/_to-length.js","./_to-absolute-index":"../../node_modules/core-js/modules/_to-absolute-index.js"}],"../../node_modules/core-js/modules/es7.array.includes.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export = require('./_export');
var $includes = require('./_array-includes')(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

require('./_add-to-unscopables')('includes');

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_array-includes":"../../node_modules/core-js/modules/_array-includes.js","./_add-to-unscopables":"../../node_modules/core-js/modules/_add-to-unscopables.js"}],"../../node_modules/core-js/modules/_iter-step.js":[function(require,module,exports) {
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],"../../node_modules/core-js/modules/_shared-key.js":[function(require,module,exports) {
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":"../../node_modules/core-js/modules/_shared.js","./_uid":"../../node_modules/core-js/modules/_uid.js"}],"../../node_modules/core-js/modules/_object-keys-internal.js":[function(require,module,exports) {
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

},{"./_has":"../../node_modules/core-js/modules/_has.js","./_to-iobject":"../../node_modules/core-js/modules/_to-iobject.js","./_array-includes":"../../node_modules/core-js/modules/_array-includes.js","./_shared-key":"../../node_modules/core-js/modules/_shared-key.js"}],"../../node_modules/core-js/modules/_enum-bug-keys.js":[function(require,module,exports) {
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],"../../node_modules/core-js/modules/_object-keys.js":[function(require,module,exports) {
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_object-keys-internal":"../../node_modules/core-js/modules/_object-keys-internal.js","./_enum-bug-keys":"../../node_modules/core-js/modules/_enum-bug-keys.js"}],"../../node_modules/core-js/modules/_object-dps.js":[function(require,module,exports) {
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

},{"./_object-dp":"../../node_modules/core-js/modules/_object-dp.js","./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_object-keys":"../../node_modules/core-js/modules/_object-keys.js","./_descriptors":"../../node_modules/core-js/modules/_descriptors.js"}],"../../node_modules/core-js/modules/_html.js":[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":"../../node_modules/core-js/modules/_global.js"}],"../../node_modules/core-js/modules/_object-create.js":[function(require,module,exports) {
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

},{"./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_object-dps":"../../node_modules/core-js/modules/_object-dps.js","./_enum-bug-keys":"../../node_modules/core-js/modules/_enum-bug-keys.js","./_shared-key":"../../node_modules/core-js/modules/_shared-key.js","./_dom-create":"../../node_modules/core-js/modules/_dom-create.js","./_html":"../../node_modules/core-js/modules/_html.js"}],"../../node_modules/core-js/modules/_set-to-string-tag.js":[function(require,module,exports) {
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_object-dp":"../../node_modules/core-js/modules/_object-dp.js","./_has":"../../node_modules/core-js/modules/_has.js","./_wks":"../../node_modules/core-js/modules/_wks.js"}],"../../node_modules/core-js/modules/_iter-create.js":[function(require,module,exports) {
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

},{"./_object-create":"../../node_modules/core-js/modules/_object-create.js","./_property-desc":"../../node_modules/core-js/modules/_property-desc.js","./_set-to-string-tag":"../../node_modules/core-js/modules/_set-to-string-tag.js","./_hide":"../../node_modules/core-js/modules/_hide.js","./_wks":"../../node_modules/core-js/modules/_wks.js"}],"../../node_modules/core-js/modules/_object-gpo.js":[function(require,module,exports) {
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

},{"./_has":"../../node_modules/core-js/modules/_has.js","./_to-object":"../../node_modules/core-js/modules/_to-object.js","./_shared-key":"../../node_modules/core-js/modules/_shared-key.js"}],"../../node_modules/core-js/modules/_iter-define.js":[function(require,module,exports) {
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

},{"./_library":"../../node_modules/core-js/modules/_library.js","./_export":"../../node_modules/core-js/modules/_export.js","./_redefine":"../../node_modules/core-js/modules/_redefine.js","./_hide":"../../node_modules/core-js/modules/_hide.js","./_iterators":"../../node_modules/core-js/modules/_iterators.js","./_iter-create":"../../node_modules/core-js/modules/_iter-create.js","./_set-to-string-tag":"../../node_modules/core-js/modules/_set-to-string-tag.js","./_object-gpo":"../../node_modules/core-js/modules/_object-gpo.js","./_wks":"../../node_modules/core-js/modules/_wks.js"}],"../../node_modules/core-js/modules/es6.array.iterator.js":[function(require,module,exports) {
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

},{"./_add-to-unscopables":"../../node_modules/core-js/modules/_add-to-unscopables.js","./_iter-step":"../../node_modules/core-js/modules/_iter-step.js","./_iterators":"../../node_modules/core-js/modules/_iterators.js","./_to-iobject":"../../node_modules/core-js/modules/_to-iobject.js","./_iter-define":"../../node_modules/core-js/modules/_iter-define.js"}],"../../node_modules/core-js/modules/es6.array.of.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var createProperty = require('./_create-property');

// WebKit Array.of isn't generic
$export($export.S + $export.F * require('./_fails')(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_create-property":"../../node_modules/core-js/modules/_create-property.js","./_fails":"../../node_modules/core-js/modules/_fails.js"}],"../../node_modules/core-js/modules/_strict-method.js":[function(require,module,exports) {
'use strict';
var fails = require('./_fails');

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};

},{"./_fails":"../../node_modules/core-js/modules/_fails.js"}],"../../node_modules/core-js/modules/es6.array.sort.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var aFunction = require('./_a-function');
var toObject = require('./_to-object');
var fails = require('./_fails');
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !require('./_strict-method')($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_a-function":"../../node_modules/core-js/modules/_a-function.js","./_to-object":"../../node_modules/core-js/modules/_to-object.js","./_fails":"../../node_modules/core-js/modules/_fails.js","./_strict-method":"../../node_modules/core-js/modules/_strict-method.js"}],"../../node_modules/core-js/modules/_set-species.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_global":"../../node_modules/core-js/modules/_global.js","./_object-dp":"../../node_modules/core-js/modules/_object-dp.js","./_descriptors":"../../node_modules/core-js/modules/_descriptors.js","./_wks":"../../node_modules/core-js/modules/_wks.js"}],"../../node_modules/core-js/modules/es6.array.species.js":[function(require,module,exports) {
require('./_set-species')('Array');

},{"./_set-species":"../../node_modules/core-js/modules/_set-species.js"}],"../../node_modules/core-js/modules/es6.date.to-json.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');

$export($export.P + $export.F * require('./_fails')(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_to-object":"../../node_modules/core-js/modules/_to-object.js","./_to-primitive":"../../node_modules/core-js/modules/_to-primitive.js","./_fails":"../../node_modules/core-js/modules/_fails.js"}],"../../node_modules/core-js/modules/_date-to-primitive.js":[function(require,module,exports) {
'use strict';
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

},{"./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_to-primitive":"../../node_modules/core-js/modules/_to-primitive.js"}],"../../node_modules/core-js/modules/es6.date.to-primitive.js":[function(require,module,exports) {
var TO_PRIMITIVE = require('./_wks')('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) require('./_hide')(proto, TO_PRIMITIVE, require('./_date-to-primitive'));

},{"./_wks":"../../node_modules/core-js/modules/_wks.js","./_hide":"../../node_modules/core-js/modules/_hide.js","./_date-to-primitive":"../../node_modules/core-js/modules/_date-to-primitive.js"}],"../../node_modules/core-js/modules/es6.function.has-instance.js":[function(require,module,exports) {
'use strict';
var isObject = require('./_is-object');
var getPrototypeOf = require('./_object-gpo');
var HAS_INSTANCE = require('./_wks')('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) require('./_object-dp').f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });

},{"./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_object-gpo":"../../node_modules/core-js/modules/_object-gpo.js","./_wks":"../../node_modules/core-js/modules/_wks.js","./_object-dp":"../../node_modules/core-js/modules/_object-dp.js"}],"../../node_modules/core-js/modules/es6.function.name.js":[function(require,module,exports) {
var dP = require('./_object-dp').f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || require('./_descriptors') && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

},{"./_object-dp":"../../node_modules/core-js/modules/_object-dp.js","./_descriptors":"../../node_modules/core-js/modules/_descriptors.js"}],"../../node_modules/core-js/modules/_redefine-all.js":[function(require,module,exports) {
var redefine = require('./_redefine');
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};

},{"./_redefine":"../../node_modules/core-js/modules/_redefine.js"}],"../../node_modules/core-js/modules/_an-instance.js":[function(require,module,exports) {
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],"../../node_modules/core-js/modules/_for-of.js":[function(require,module,exports) {
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

},{"./_ctx":"../../node_modules/core-js/modules/_ctx.js","./_iter-call":"../../node_modules/core-js/modules/_iter-call.js","./_is-array-iter":"../../node_modules/core-js/modules/_is-array-iter.js","./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_to-length":"../../node_modules/core-js/modules/_to-length.js","./core.get-iterator-method":"../../node_modules/core-js/modules/core.get-iterator-method.js"}],"../../node_modules/core-js/modules/_meta.js":[function(require,module,exports) {
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_uid":"../../node_modules/core-js/modules/_uid.js","./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_has":"../../node_modules/core-js/modules/_has.js","./_object-dp":"../../node_modules/core-js/modules/_object-dp.js","./_fails":"../../node_modules/core-js/modules/_fails.js"}],"../../node_modules/core-js/modules/_validate-collection.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

},{"./_is-object":"../../node_modules/core-js/modules/_is-object.js"}],"../../node_modules/core-js/modules/_collection-strong.js":[function(require,module,exports) {
'use strict';
var dP = require('./_object-dp').f;
var create = require('./_object-create');
var redefineAll = require('./_redefine-all');
var ctx = require('./_ctx');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var $iterDefine = require('./_iter-define');
var step = require('./_iter-step');
var setSpecies = require('./_set-species');
var DESCRIPTORS = require('./_descriptors');
var fastKey = require('./_meta').fastKey;
var validate = require('./_validate-collection');
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

},{"./_object-dp":"../../node_modules/core-js/modules/_object-dp.js","./_object-create":"../../node_modules/core-js/modules/_object-create.js","./_redefine-all":"../../node_modules/core-js/modules/_redefine-all.js","./_ctx":"../../node_modules/core-js/modules/_ctx.js","./_an-instance":"../../node_modules/core-js/modules/_an-instance.js","./_for-of":"../../node_modules/core-js/modules/_for-of.js","./_iter-define":"../../node_modules/core-js/modules/_iter-define.js","./_iter-step":"../../node_modules/core-js/modules/_iter-step.js","./_set-species":"../../node_modules/core-js/modules/_set-species.js","./_descriptors":"../../node_modules/core-js/modules/_descriptors.js","./_meta":"../../node_modules/core-js/modules/_meta.js","./_validate-collection":"../../node_modules/core-js/modules/_validate-collection.js"}],"../../node_modules/core-js/modules/_object-pie.js":[function(require,module,exports) {
exports.f = {}.propertyIsEnumerable;

},{}],"../../node_modules/core-js/modules/_object-gopd.js":[function(require,module,exports) {
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_object-pie":"../../node_modules/core-js/modules/_object-pie.js","./_property-desc":"../../node_modules/core-js/modules/_property-desc.js","./_to-iobject":"../../node_modules/core-js/modules/_to-iobject.js","./_to-primitive":"../../node_modules/core-js/modules/_to-primitive.js","./_has":"../../node_modules/core-js/modules/_has.js","./_ie8-dom-define":"../../node_modules/core-js/modules/_ie8-dom-define.js","./_descriptors":"../../node_modules/core-js/modules/_descriptors.js"}],"../../node_modules/core-js/modules/_set-proto.js":[function(require,module,exports) {
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object');
var anObject = require('./_an-object');
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

},{"./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_ctx":"../../node_modules/core-js/modules/_ctx.js","./_object-gopd":"../../node_modules/core-js/modules/_object-gopd.js"}],"../../node_modules/core-js/modules/_inherit-if-required.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var setPrototypeOf = require('./_set-proto').set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};

},{"./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_set-proto":"../../node_modules/core-js/modules/_set-proto.js"}],"../../node_modules/core-js/modules/_collection.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var $export = require('./_export');
var redefine = require('./_redefine');
var redefineAll = require('./_redefine-all');
var meta = require('./_meta');
var forOf = require('./_for-of');
var anInstance = require('./_an-instance');
var isObject = require('./_is-object');
var fails = require('./_fails');
var $iterDetect = require('./_iter-detect');
var setToStringTag = require('./_set-to-string-tag');
var inheritIfRequired = require('./_inherit-if-required');

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

},{"./_global":"../../node_modules/core-js/modules/_global.js","./_export":"../../node_modules/core-js/modules/_export.js","./_redefine":"../../node_modules/core-js/modules/_redefine.js","./_redefine-all":"../../node_modules/core-js/modules/_redefine-all.js","./_meta":"../../node_modules/core-js/modules/_meta.js","./_for-of":"../../node_modules/core-js/modules/_for-of.js","./_an-instance":"../../node_modules/core-js/modules/_an-instance.js","./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_fails":"../../node_modules/core-js/modules/_fails.js","./_iter-detect":"../../node_modules/core-js/modules/_iter-detect.js","./_set-to-string-tag":"../../node_modules/core-js/modules/_set-to-string-tag.js","./_inherit-if-required":"../../node_modules/core-js/modules/_inherit-if-required.js"}],"../../node_modules/core-js/modules/es6.map.js":[function(require,module,exports) {
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var MAP = 'Map';

// 23.1 Map Objects
module.exports = require('./_collection')(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);

},{"./_collection-strong":"../../node_modules/core-js/modules/_collection-strong.js","./_validate-collection":"../../node_modules/core-js/modules/_validate-collection.js","./_collection":"../../node_modules/core-js/modules/_collection.js"}],"../../node_modules/core-js/modules/_math-log1p.js":[function(require,module,exports) {
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

},{}],"../../node_modules/core-js/modules/es6.math.acosh.js":[function(require,module,exports) {
// 20.2.2.3 Math.acosh(x)
var $export = require('./_export');
var log1p = require('./_math-log1p');
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_math-log1p":"../../node_modules/core-js/modules/_math-log1p.js"}],"../../node_modules/core-js/modules/es6.math.asinh.js":[function(require,module,exports) {
// 20.2.2.5 Math.asinh(x)
var $export = require('./_export');
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

},{"./_export":"../../node_modules/core-js/modules/_export.js"}],"../../node_modules/core-js/modules/es6.math.atanh.js":[function(require,module,exports) {
// 20.2.2.7 Math.atanh(x)
var $export = require('./_export');
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js"}],"../../node_modules/core-js/modules/_math-sign.js":[function(require,module,exports) {
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

},{}],"../../node_modules/core-js/modules/es6.math.cbrt.js":[function(require,module,exports) {
// 20.2.2.9 Math.cbrt(x)
var $export = require('./_export');
var sign = require('./_math-sign');

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_math-sign":"../../node_modules/core-js/modules/_math-sign.js"}],"../../node_modules/core-js/modules/es6.math.clz32.js":[function(require,module,exports) {
// 20.2.2.11 Math.clz32(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js"}],"../../node_modules/core-js/modules/es6.math.cosh.js":[function(require,module,exports) {
// 20.2.2.12 Math.cosh(x)
var $export = require('./_export');
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js"}],"../../node_modules/core-js/modules/_math-expm1.js":[function(require,module,exports) {
// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

},{}],"../../node_modules/core-js/modules/es6.math.expm1.js":[function(require,module,exports) {
// 20.2.2.14 Math.expm1(x)
var $export = require('./_export');
var $expm1 = require('./_math-expm1');

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_math-expm1":"../../node_modules/core-js/modules/_math-expm1.js"}],"../../node_modules/core-js/modules/_math-fround.js":[function(require,module,exports) {
// 20.2.2.16 Math.fround(x)
var sign = require('./_math-sign');
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

},{"./_math-sign":"../../node_modules/core-js/modules/_math-sign.js"}],"../../node_modules/core-js/modules/es6.math.fround.js":[function(require,module,exports) {
// 20.2.2.16 Math.fround(x)
var $export = require('./_export');

$export($export.S, 'Math', { fround: require('./_math-fround') });

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_math-fround":"../../node_modules/core-js/modules/_math-fround.js"}],"../../node_modules/core-js/modules/es6.math.hypot.js":[function(require,module,exports) {
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = require('./_export');
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js"}],"../../node_modules/core-js/modules/es6.math.imul.js":[function(require,module,exports) {
// 20.2.2.18 Math.imul(x, y)
var $export = require('./_export');
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * require('./_fails')(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_fails":"../../node_modules/core-js/modules/_fails.js"}],"../../node_modules/core-js/modules/es6.math.log1p.js":[function(require,module,exports) {
// 20.2.2.20 Math.log1p(x)
var $export = require('./_export');

$export($export.S, 'Math', { log1p: require('./_math-log1p') });

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_math-log1p":"../../node_modules/core-js/modules/_math-log1p.js"}],"../../node_modules/core-js/modules/es6.math.log10.js":[function(require,module,exports) {
// 20.2.2.21 Math.log10(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js"}],"../../node_modules/core-js/modules/es6.math.log2.js":[function(require,module,exports) {
// 20.2.2.22 Math.log2(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js"}],"../../node_modules/core-js/modules/es6.math.sign.js":[function(require,module,exports) {
// 20.2.2.28 Math.sign(x)
var $export = require('./_export');

$export($export.S, 'Math', { sign: require('./_math-sign') });

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_math-sign":"../../node_modules/core-js/modules/_math-sign.js"}],"../../node_modules/core-js/modules/es6.math.sinh.js":[function(require,module,exports) {
// 20.2.2.30 Math.sinh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * require('./_fails')(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_math-expm1":"../../node_modules/core-js/modules/_math-expm1.js","./_fails":"../../node_modules/core-js/modules/_fails.js"}],"../../node_modules/core-js/modules/es6.math.tanh.js":[function(require,module,exports) {
// 20.2.2.33 Math.tanh(x)
var $export = require('./_export');
var expm1 = require('./_math-expm1');
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_math-expm1":"../../node_modules/core-js/modules/_math-expm1.js"}],"../../node_modules/core-js/modules/es6.math.trunc.js":[function(require,module,exports) {
// 20.2.2.34 Math.trunc(x)
var $export = require('./_export');

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js"}],"../../node_modules/core-js/modules/_object-gopn.js":[function(require,module,exports) {
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_object-keys-internal":"../../node_modules/core-js/modules/_object-keys-internal.js","./_enum-bug-keys":"../../node_modules/core-js/modules/_enum-bug-keys.js"}],"../../node_modules/core-js/modules/_string-ws.js":[function(require,module,exports) {
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],"../../node_modules/core-js/modules/_string-trim.js":[function(require,module,exports) {
var $export = require('./_export');
var defined = require('./_defined');
var fails = require('./_fails');
var spaces = require('./_string-ws');
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_defined":"../../node_modules/core-js/modules/_defined.js","./_fails":"../../node_modules/core-js/modules/_fails.js","./_string-ws":"../../node_modules/core-js/modules/_string-ws.js"}],"../../node_modules/core-js/modules/es6.number.constructor.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var has = require('./_has');
var cof = require('./_cof');
var inheritIfRequired = require('./_inherit-if-required');
var toPrimitive = require('./_to-primitive');
var fails = require('./_fails');
var gOPN = require('./_object-gopn').f;
var gOPD = require('./_object-gopd').f;
var dP = require('./_object-dp').f;
var $trim = require('./_string-trim').trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(require('./_object-create')(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = require('./_descriptors') ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  require('./_redefine')(global, NUMBER, $Number);
}

},{"./_global":"../../node_modules/core-js/modules/_global.js","./_has":"../../node_modules/core-js/modules/_has.js","./_cof":"../../node_modules/core-js/modules/_cof.js","./_inherit-if-required":"../../node_modules/core-js/modules/_inherit-if-required.js","./_to-primitive":"../../node_modules/core-js/modules/_to-primitive.js","./_fails":"../../node_modules/core-js/modules/_fails.js","./_object-gopn":"../../node_modules/core-js/modules/_object-gopn.js","./_object-gopd":"../../node_modules/core-js/modules/_object-gopd.js","./_object-dp":"../../node_modules/core-js/modules/_object-dp.js","./_string-trim":"../../node_modules/core-js/modules/_string-trim.js","./_object-create":"../../node_modules/core-js/modules/_object-create.js","./_descriptors":"../../node_modules/core-js/modules/_descriptors.js","./_redefine":"../../node_modules/core-js/modules/_redefine.js"}],"../../node_modules/core-js/modules/es6.number.epsilon.js":[function(require,module,exports) {
// 20.1.2.1 Number.EPSILON
var $export = require('./_export');

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });

},{"./_export":"../../node_modules/core-js/modules/_export.js"}],"../../node_modules/core-js/modules/es6.number.is-finite.js":[function(require,module,exports) {
// 20.1.2.2 Number.isFinite(number)
var $export = require('./_export');
var _isFinite = require('./_global').isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_global":"../../node_modules/core-js/modules/_global.js"}],"../../node_modules/core-js/modules/_is-integer.js":[function(require,module,exports) {
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object');
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

},{"./_is-object":"../../node_modules/core-js/modules/_is-object.js"}],"../../node_modules/core-js/modules/es6.number.is-integer.js":[function(require,module,exports) {
// 20.1.2.3 Number.isInteger(number)
var $export = require('./_export');

$export($export.S, 'Number', { isInteger: require('./_is-integer') });

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_is-integer":"../../node_modules/core-js/modules/_is-integer.js"}],"../../node_modules/core-js/modules/es6.number.is-nan.js":[function(require,module,exports) {
// 20.1.2.4 Number.isNaN(number)
var $export = require('./_export');

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js"}],"../../node_modules/core-js/modules/es6.number.is-safe-integer.js":[function(require,module,exports) {
// 20.1.2.5 Number.isSafeInteger(number)
var $export = require('./_export');
var isInteger = require('./_is-integer');
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_is-integer":"../../node_modules/core-js/modules/_is-integer.js"}],"../../node_modules/core-js/modules/es6.number.max-safe-integer.js":[function(require,module,exports) {
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

},{"./_export":"../../node_modules/core-js/modules/_export.js"}],"../../node_modules/core-js/modules/es6.number.min-safe-integer.js":[function(require,module,exports) {
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = require('./_export');

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

},{"./_export":"../../node_modules/core-js/modules/_export.js"}],"../../node_modules/core-js/modules/_parse-float.js":[function(require,module,exports) {
var $parseFloat = require('./_global').parseFloat;
var $trim = require('./_string-trim').trim;

module.exports = 1 / $parseFloat(require('./_string-ws') + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

},{"./_global":"../../node_modules/core-js/modules/_global.js","./_string-trim":"../../node_modules/core-js/modules/_string-trim.js","./_string-ws":"../../node_modules/core-js/modules/_string-ws.js"}],"../../node_modules/core-js/modules/es6.number.parse-float.js":[function(require,module,exports) {
var $export = require('./_export');
var $parseFloat = require('./_parse-float');
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_parse-float":"../../node_modules/core-js/modules/_parse-float.js"}],"../../node_modules/core-js/modules/_parse-int.js":[function(require,module,exports) {
var $parseInt = require('./_global').parseInt;
var $trim = require('./_string-trim').trim;
var ws = require('./_string-ws');
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

},{"./_global":"../../node_modules/core-js/modules/_global.js","./_string-trim":"../../node_modules/core-js/modules/_string-trim.js","./_string-ws":"../../node_modules/core-js/modules/_string-ws.js"}],"../../node_modules/core-js/modules/es6.number.parse-int.js":[function(require,module,exports) {
var $export = require('./_export');
var $parseInt = require('./_parse-int');
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_parse-int":"../../node_modules/core-js/modules/_parse-int.js"}],"../../node_modules/core-js/modules/_object-gops.js":[function(require,module,exports) {
exports.f = Object.getOwnPropertySymbols;

},{}],"../../node_modules/core-js/modules/_object-assign.js":[function(require,module,exports) {
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = require('./_descriptors');
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

},{"./_descriptors":"../../node_modules/core-js/modules/_descriptors.js","./_object-keys":"../../node_modules/core-js/modules/_object-keys.js","./_object-gops":"../../node_modules/core-js/modules/_object-gops.js","./_object-pie":"../../node_modules/core-js/modules/_object-pie.js","./_to-object":"../../node_modules/core-js/modules/_to-object.js","./_iobject":"../../node_modules/core-js/modules/_iobject.js","./_fails":"../../node_modules/core-js/modules/_fails.js"}],"../../node_modules/core-js/modules/es6.object.assign.js":[function(require,module,exports) {
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_object-assign":"../../node_modules/core-js/modules/_object-assign.js"}],"../../node_modules/core-js/modules/_object-forced-pam.js":[function(require,module,exports) {
'use strict';
// Forced replacement prototype accessors methods
module.exports = require('./_library') || !require('./_fails')(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete require('./_global')[K];
});

},{"./_library":"../../node_modules/core-js/modules/_library.js","./_fails":"../../node_modules/core-js/modules/_fails.js","./_global":"../../node_modules/core-js/modules/_global.js"}],"../../node_modules/core-js/modules/es7.object.define-getter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_to-object":"../../node_modules/core-js/modules/_to-object.js","./_a-function":"../../node_modules/core-js/modules/_a-function.js","./_object-dp":"../../node_modules/core-js/modules/_object-dp.js","./_descriptors":"../../node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"../../node_modules/core-js/modules/_object-forced-pam.js"}],"../../node_modules/core-js/modules/es7.object.define-setter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var aFunction = require('./_a-function');
var $defineProperty = require('./_object-dp');

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_to-object":"../../node_modules/core-js/modules/_to-object.js","./_a-function":"../../node_modules/core-js/modules/_a-function.js","./_object-dp":"../../node_modules/core-js/modules/_object-dp.js","./_descriptors":"../../node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"../../node_modules/core-js/modules/_object-forced-pam.js"}],"../../node_modules/core-js/modules/_object-to-array.js":[function(require,module,exports) {
var DESCRIPTORS = require('./_descriptors');
var getKeys = require('./_object-keys');
var toIObject = require('./_to-iobject');
var isEnum = require('./_object-pie').f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};

},{"./_descriptors":"../../node_modules/core-js/modules/_descriptors.js","./_object-keys":"../../node_modules/core-js/modules/_object-keys.js","./_to-iobject":"../../node_modules/core-js/modules/_to-iobject.js","./_object-pie":"../../node_modules/core-js/modules/_object-pie.js"}],"../../node_modules/core-js/modules/es7.object.entries.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_object-to-array":"../../node_modules/core-js/modules/_object-to-array.js"}],"../../node_modules/core-js/modules/_object-sap.js":[function(require,module,exports) {
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_core":"../../node_modules/core-js/modules/_core.js","./_fails":"../../node_modules/core-js/modules/_fails.js"}],"../../node_modules/core-js/modules/es6.object.freeze.js":[function(require,module,exports) {
// 19.1.2.5 Object.freeze(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

},{"./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_meta":"../../node_modules/core-js/modules/_meta.js","./_object-sap":"../../node_modules/core-js/modules/_object-sap.js"}],"../../node_modules/core-js/modules/es6.object.get-own-property-descriptor.js":[function(require,module,exports) {
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = require('./_to-iobject');
var $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

},{"./_to-iobject":"../../node_modules/core-js/modules/_to-iobject.js","./_object-gopd":"../../node_modules/core-js/modules/_object-gopd.js","./_object-sap":"../../node_modules/core-js/modules/_object-sap.js"}],"../../node_modules/core-js/modules/_own-keys.js":[function(require,module,exports) {
// all object keys, includes non-enumerable and symbols
var gOPN = require('./_object-gopn');
var gOPS = require('./_object-gops');
var anObject = require('./_an-object');
var Reflect = require('./_global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

},{"./_object-gopn":"../../node_modules/core-js/modules/_object-gopn.js","./_object-gops":"../../node_modules/core-js/modules/_object-gops.js","./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_global":"../../node_modules/core-js/modules/_global.js"}],"../../node_modules/core-js/modules/es7.object.get-own-property-descriptors.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = require('./_export');
var ownKeys = require('./_own-keys');
var toIObject = require('./_to-iobject');
var gOPD = require('./_object-gopd');
var createProperty = require('./_create-property');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_own-keys":"../../node_modules/core-js/modules/_own-keys.js","./_to-iobject":"../../node_modules/core-js/modules/_to-iobject.js","./_object-gopd":"../../node_modules/core-js/modules/_object-gopd.js","./_create-property":"../../node_modules/core-js/modules/_create-property.js"}],"../../node_modules/core-js/modules/_object-gopn-ext.js":[function(require,module,exports) {
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_to-iobject":"../../node_modules/core-js/modules/_to-iobject.js","./_object-gopn":"../../node_modules/core-js/modules/_object-gopn.js"}],"../../node_modules/core-js/modules/es6.object.get-own-property-names.js":[function(require,module,exports) {
// 19.1.2.7 Object.getOwnPropertyNames(O)
require('./_object-sap')('getOwnPropertyNames', function () {
  return require('./_object-gopn-ext').f;
});

},{"./_object-sap":"../../node_modules/core-js/modules/_object-sap.js","./_object-gopn-ext":"../../node_modules/core-js/modules/_object-gopn-ext.js"}],"../../node_modules/core-js/modules/es6.object.get-prototype-of.js":[function(require,module,exports) {
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = require('./_to-object');
var $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});

},{"./_to-object":"../../node_modules/core-js/modules/_to-object.js","./_object-gpo":"../../node_modules/core-js/modules/_object-gpo.js","./_object-sap":"../../node_modules/core-js/modules/_object-sap.js"}],"../../node_modules/core-js/modules/es7.object.lookup-getter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_to-object":"../../node_modules/core-js/modules/_to-object.js","./_to-primitive":"../../node_modules/core-js/modules/_to-primitive.js","./_object-gpo":"../../node_modules/core-js/modules/_object-gpo.js","./_object-gopd":"../../node_modules/core-js/modules/_object-gopd.js","./_descriptors":"../../node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"../../node_modules/core-js/modules/_object-forced-pam.js"}],"../../node_modules/core-js/modules/es7.object.lookup-setter.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var toObject = require('./_to-object');
var toPrimitive = require('./_to-primitive');
var getPrototypeOf = require('./_object-gpo');
var getOwnPropertyDescriptor = require('./_object-gopd').f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
require('./_descriptors') && $export($export.P + require('./_object-forced-pam'), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_to-object":"../../node_modules/core-js/modules/_to-object.js","./_to-primitive":"../../node_modules/core-js/modules/_to-primitive.js","./_object-gpo":"../../node_modules/core-js/modules/_object-gpo.js","./_object-gopd":"../../node_modules/core-js/modules/_object-gopd.js","./_descriptors":"../../node_modules/core-js/modules/_descriptors.js","./_object-forced-pam":"../../node_modules/core-js/modules/_object-forced-pam.js"}],"../../node_modules/core-js/modules/es6.object.prevent-extensions.js":[function(require,module,exports) {
// 19.1.2.15 Object.preventExtensions(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

},{"./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_meta":"../../node_modules/core-js/modules/_meta.js","./_object-sap":"../../node_modules/core-js/modules/_object-sap.js"}],"../../node_modules/core-js/modules/es6.object.to-string.js":[function(require,module,exports) {
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = require('./_classof');
var test = {};
test[require('./_wks')('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  require('./_redefine')(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

},{"./_classof":"../../node_modules/core-js/modules/_classof.js","./_wks":"../../node_modules/core-js/modules/_wks.js","./_redefine":"../../node_modules/core-js/modules/_redefine.js"}],"../../node_modules/core-js/modules/_same-value.js":[function(require,module,exports) {
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

},{}],"../../node_modules/core-js/modules/es6.object.is.js":[function(require,module,exports) {
// 19.1.3.10 Object.is(value1, value2)
var $export = require('./_export');
$export($export.S, 'Object', { is: require('./_same-value') });

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_same-value":"../../node_modules/core-js/modules/_same-value.js"}],"../../node_modules/core-js/modules/es6.object.is-frozen.js":[function(require,module,exports) {
// 19.1.2.12 Object.isFrozen(O)
var isObject = require('./_is-object');

require('./_object-sap')('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

},{"./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_object-sap":"../../node_modules/core-js/modules/_object-sap.js"}],"../../node_modules/core-js/modules/es6.object.is-sealed.js":[function(require,module,exports) {
// 19.1.2.13 Object.isSealed(O)
var isObject = require('./_is-object');

require('./_object-sap')('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

},{"./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_object-sap":"../../node_modules/core-js/modules/_object-sap.js"}],"../../node_modules/core-js/modules/es6.object.is-extensible.js":[function(require,module,exports) {
// 19.1.2.11 Object.isExtensible(O)
var isObject = require('./_is-object');

require('./_object-sap')('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

},{"./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_object-sap":"../../node_modules/core-js/modules/_object-sap.js"}],"../../node_modules/core-js/modules/es6.object.keys.js":[function(require,module,exports) {
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_to-object":"../../node_modules/core-js/modules/_to-object.js","./_object-keys":"../../node_modules/core-js/modules/_object-keys.js","./_object-sap":"../../node_modules/core-js/modules/_object-sap.js"}],"../../node_modules/core-js/modules/es6.object.seal.js":[function(require,module,exports) {
// 19.1.2.17 Object.seal(O)
var isObject = require('./_is-object');
var meta = require('./_meta').onFreeze;

require('./_object-sap')('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

},{"./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_meta":"../../node_modules/core-js/modules/_meta.js","./_object-sap":"../../node_modules/core-js/modules/_object-sap.js"}],"../../node_modules/core-js/modules/es6.object.set-prototype-of.js":[function(require,module,exports) {
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', { setPrototypeOf: require('./_set-proto').set });

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_set-proto":"../../node_modules/core-js/modules/_set-proto.js"}],"../../node_modules/core-js/modules/es7.object.values.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-values-entries
var $export = require('./_export');
var $values = require('./_object-to-array')(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_object-to-array":"../../node_modules/core-js/modules/_object-to-array.js"}],"../../node_modules/core-js/modules/_species-constructor.js":[function(require,module,exports) {
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_a-function":"../../node_modules/core-js/modules/_a-function.js","./_wks":"../../node_modules/core-js/modules/_wks.js"}],"../../node_modules/core-js/modules/_invoke.js":[function(require,module,exports) {
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

},{}],"../../node_modules/core-js/modules/_task.js":[function(require,module,exports) {


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

},{"./_ctx":"../../node_modules/core-js/modules/_ctx.js","./_invoke":"../../node_modules/core-js/modules/_invoke.js","./_html":"../../node_modules/core-js/modules/_html.js","./_dom-create":"../../node_modules/core-js/modules/_dom-create.js","./_global":"../../node_modules/core-js/modules/_global.js","./_cof":"../../node_modules/core-js/modules/_cof.js"}],"../../node_modules/core-js/modules/_microtask.js":[function(require,module,exports) {


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

},{"./_global":"../../node_modules/core-js/modules/_global.js","./_task":"../../node_modules/core-js/modules/_task.js","./_cof":"../../node_modules/core-js/modules/_cof.js"}],"../../node_modules/core-js/modules/_new-promise-capability.js":[function(require,module,exports) {
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

},{"./_a-function":"../../node_modules/core-js/modules/_a-function.js"}],"../../node_modules/core-js/modules/_perform.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],"../../node_modules/core-js/modules/_user-agent.js":[function(require,module,exports) {

var global = require('./_global');
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

},{"./_global":"../../node_modules/core-js/modules/_global.js"}],"../../node_modules/core-js/modules/_promise-resolve.js":[function(require,module,exports) {
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

},{"./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_new-promise-capability":"../../node_modules/core-js/modules/_new-promise-capability.js"}],"../../node_modules/core-js/modules/es6.promise.js":[function(require,module,exports) {


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

},{"./_library":"../../node_modules/core-js/modules/_library.js","./_global":"../../node_modules/core-js/modules/_global.js","./_ctx":"../../node_modules/core-js/modules/_ctx.js","./_classof":"../../node_modules/core-js/modules/_classof.js","./_export":"../../node_modules/core-js/modules/_export.js","./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_a-function":"../../node_modules/core-js/modules/_a-function.js","./_an-instance":"../../node_modules/core-js/modules/_an-instance.js","./_for-of":"../../node_modules/core-js/modules/_for-of.js","./_species-constructor":"../../node_modules/core-js/modules/_species-constructor.js","./_task":"../../node_modules/core-js/modules/_task.js","./_microtask":"../../node_modules/core-js/modules/_microtask.js","./_new-promise-capability":"../../node_modules/core-js/modules/_new-promise-capability.js","./_perform":"../../node_modules/core-js/modules/_perform.js","./_user-agent":"../../node_modules/core-js/modules/_user-agent.js","./_promise-resolve":"../../node_modules/core-js/modules/_promise-resolve.js","./_wks":"../../node_modules/core-js/modules/_wks.js","./_redefine-all":"../../node_modules/core-js/modules/_redefine-all.js","./_set-to-string-tag":"../../node_modules/core-js/modules/_set-to-string-tag.js","./_set-species":"../../node_modules/core-js/modules/_set-species.js","./_core":"../../node_modules/core-js/modules/_core.js","./_iter-detect":"../../node_modules/core-js/modules/_iter-detect.js"}],"../../node_modules/core-js/modules/es7.promise.finally.js":[function(require,module,exports) {

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

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_core":"../../node_modules/core-js/modules/_core.js","./_global":"../../node_modules/core-js/modules/_global.js","./_species-constructor":"../../node_modules/core-js/modules/_species-constructor.js","./_promise-resolve":"../../node_modules/core-js/modules/_promise-resolve.js"}],"../../node_modules/core-js/modules/es6.reflect.apply.js":[function(require,module,exports) {
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = require('./_export');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var rApply = (require('./_global').Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !require('./_fails')(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_a-function":"../../node_modules/core-js/modules/_a-function.js","./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_global":"../../node_modules/core-js/modules/_global.js","./_fails":"../../node_modules/core-js/modules/_fails.js"}],"../../node_modules/core-js/modules/_bind.js":[function(require,module,exports) {
'use strict';
var aFunction = require('./_a-function');
var isObject = require('./_is-object');
var invoke = require('./_invoke');
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

},{"./_a-function":"../../node_modules/core-js/modules/_a-function.js","./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_invoke":"../../node_modules/core-js/modules/_invoke.js"}],"../../node_modules/core-js/modules/es6.reflect.construct.js":[function(require,module,exports) {
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = require('./_export');
var create = require('./_object-create');
var aFunction = require('./_a-function');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var fails = require('./_fails');
var bind = require('./_bind');
var rConstruct = (require('./_global').Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_object-create":"../../node_modules/core-js/modules/_object-create.js","./_a-function":"../../node_modules/core-js/modules/_a-function.js","./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_fails":"../../node_modules/core-js/modules/_fails.js","./_bind":"../../node_modules/core-js/modules/_bind.js","./_global":"../../node_modules/core-js/modules/_global.js"}],"../../node_modules/core-js/modules/es6.reflect.define-property.js":[function(require,module,exports) {
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = require('./_object-dp');
var $export = require('./_export');
var anObject = require('./_an-object');
var toPrimitive = require('./_to-primitive');

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * require('./_fails')(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_object-dp":"../../node_modules/core-js/modules/_object-dp.js","./_export":"../../node_modules/core-js/modules/_export.js","./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_to-primitive":"../../node_modules/core-js/modules/_to-primitive.js","./_fails":"../../node_modules/core-js/modules/_fails.js"}],"../../node_modules/core-js/modules/es6.reflect.delete-property.js":[function(require,module,exports) {
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = require('./_export');
var gOPD = require('./_object-gopd').f;
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_object-gopd":"../../node_modules/core-js/modules/_object-gopd.js","./_an-object":"../../node_modules/core-js/modules/_an-object.js"}],"../../node_modules/core-js/modules/es6.reflect.get.js":[function(require,module,exports) {
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var isObject = require('./_is-object');
var anObject = require('./_an-object');

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });

},{"./_object-gopd":"../../node_modules/core-js/modules/_object-gopd.js","./_object-gpo":"../../node_modules/core-js/modules/_object-gpo.js","./_has":"../../node_modules/core-js/modules/_has.js","./_export":"../../node_modules/core-js/modules/_export.js","./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_an-object":"../../node_modules/core-js/modules/_an-object.js"}],"../../node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js":[function(require,module,exports) {
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = require('./_object-gopd');
var $export = require('./_export');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});

},{"./_object-gopd":"../../node_modules/core-js/modules/_object-gopd.js","./_export":"../../node_modules/core-js/modules/_export.js","./_an-object":"../../node_modules/core-js/modules/_an-object.js"}],"../../node_modules/core-js/modules/es6.reflect.get-prototype-of.js":[function(require,module,exports) {
// 26.1.8 Reflect.getPrototypeOf(target)
var $export = require('./_export');
var getProto = require('./_object-gpo');
var anObject = require('./_an-object');

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_object-gpo":"../../node_modules/core-js/modules/_object-gpo.js","./_an-object":"../../node_modules/core-js/modules/_an-object.js"}],"../../node_modules/core-js/modules/es6.reflect.has.js":[function(require,module,exports) {
// 26.1.9 Reflect.has(target, propertyKey)
var $export = require('./_export');

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js"}],"../../node_modules/core-js/modules/es6.reflect.is-extensible.js":[function(require,module,exports) {
// 26.1.10 Reflect.isExtensible(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_an-object":"../../node_modules/core-js/modules/_an-object.js"}],"../../node_modules/core-js/modules/es6.reflect.own-keys.js":[function(require,module,exports) {
// 26.1.11 Reflect.ownKeys(target)
var $export = require('./_export');

$export($export.S, 'Reflect', { ownKeys: require('./_own-keys') });

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_own-keys":"../../node_modules/core-js/modules/_own-keys.js"}],"../../node_modules/core-js/modules/es6.reflect.prevent-extensions.js":[function(require,module,exports) {
// 26.1.12 Reflect.preventExtensions(target)
var $export = require('./_export');
var anObject = require('./_an-object');
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_an-object":"../../node_modules/core-js/modules/_an-object.js"}],"../../node_modules/core-js/modules/es6.reflect.set.js":[function(require,module,exports) {
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = require('./_object-dp');
var gOPD = require('./_object-gopd');
var getPrototypeOf = require('./_object-gpo');
var has = require('./_has');
var $export = require('./_export');
var createDesc = require('./_property-desc');
var anObject = require('./_an-object');
var isObject = require('./_is-object');

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });

},{"./_object-dp":"../../node_modules/core-js/modules/_object-dp.js","./_object-gopd":"../../node_modules/core-js/modules/_object-gopd.js","./_object-gpo":"../../node_modules/core-js/modules/_object-gpo.js","./_has":"../../node_modules/core-js/modules/_has.js","./_export":"../../node_modules/core-js/modules/_export.js","./_property-desc":"../../node_modules/core-js/modules/_property-desc.js","./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_is-object":"../../node_modules/core-js/modules/_is-object.js"}],"../../node_modules/core-js/modules/es6.reflect.set-prototype-of.js":[function(require,module,exports) {
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = require('./_export');
var setProto = require('./_set-proto');

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_set-proto":"../../node_modules/core-js/modules/_set-proto.js"}],"../../node_modules/core-js/modules/_is-regexp.js":[function(require,module,exports) {
// 7.2.8 IsRegExp(argument)
var isObject = require('./_is-object');
var cof = require('./_cof');
var MATCH = require('./_wks')('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

},{"./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_cof":"../../node_modules/core-js/modules/_cof.js","./_wks":"../../node_modules/core-js/modules/_wks.js"}],"../../node_modules/core-js/modules/_flags.js":[function(require,module,exports) {
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = require('./_an-object');
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

},{"./_an-object":"../../node_modules/core-js/modules/_an-object.js"}],"../../node_modules/core-js/modules/es6.regexp.constructor.js":[function(require,module,exports) {

var global = require('./_global');
var inheritIfRequired = require('./_inherit-if-required');
var dP = require('./_object-dp').f;
var gOPN = require('./_object-gopn').f;
var isRegExp = require('./_is-regexp');
var $flags = require('./_flags');
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (require('./_descriptors') && (!CORRECT_NEW || require('./_fails')(function () {
  re2[require('./_wks')('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require('./_redefine')(global, 'RegExp', $RegExp);
}

require('./_set-species')('RegExp');

},{"./_global":"../../node_modules/core-js/modules/_global.js","./_inherit-if-required":"../../node_modules/core-js/modules/_inherit-if-required.js","./_object-dp":"../../node_modules/core-js/modules/_object-dp.js","./_object-gopn":"../../node_modules/core-js/modules/_object-gopn.js","./_is-regexp":"../../node_modules/core-js/modules/_is-regexp.js","./_flags":"../../node_modules/core-js/modules/_flags.js","./_descriptors":"../../node_modules/core-js/modules/_descriptors.js","./_fails":"../../node_modules/core-js/modules/_fails.js","./_wks":"../../node_modules/core-js/modules/_wks.js","./_redefine":"../../node_modules/core-js/modules/_redefine.js","./_set-species":"../../node_modules/core-js/modules/_set-species.js"}],"../../node_modules/core-js/modules/es6.regexp.flags.js":[function(require,module,exports) {
// 21.2.5.3 get RegExp.prototype.flags()
if (require('./_descriptors') && /./g.flags != 'g') require('./_object-dp').f(RegExp.prototype, 'flags', {
  configurable: true,
  get: require('./_flags')
});

},{"./_descriptors":"../../node_modules/core-js/modules/_descriptors.js","./_object-dp":"../../node_modules/core-js/modules/_object-dp.js","./_flags":"../../node_modules/core-js/modules/_flags.js"}],"../../node_modules/core-js/modules/_string-at.js":[function(require,module,exports) {
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

},{"./_to-integer":"../../node_modules/core-js/modules/_to-integer.js","./_defined":"../../node_modules/core-js/modules/_defined.js"}],"../../node_modules/core-js/modules/_advance-string-index.js":[function(require,module,exports) {
'use strict';
var at = require('./_string-at')(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};

},{"./_string-at":"../../node_modules/core-js/modules/_string-at.js"}],"../../node_modules/core-js/modules/_regexp-exec-abstract.js":[function(require,module,exports) {
'use strict';

var classof = require('./_classof');
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};

},{"./_classof":"../../node_modules/core-js/modules/_classof.js"}],"../../node_modules/core-js/modules/_regexp-exec.js":[function(require,module,exports) {
'use strict';

var regexpFlags = require('./_flags');

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;

},{"./_flags":"../../node_modules/core-js/modules/_flags.js"}],"../../node_modules/core-js/modules/es6.regexp.exec.js":[function(require,module,exports) {
'use strict';
var regexpExec = require('./_regexp-exec');
require('./_export')({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});

},{"./_regexp-exec":"../../node_modules/core-js/modules/_regexp-exec.js","./_export":"../../node_modules/core-js/modules/_export.js"}],"../../node_modules/core-js/modules/_fix-re-wks.js":[function(require,module,exports) {
'use strict';
require('./es6.regexp.exec');
var redefine = require('./_redefine');
var hide = require('./_hide');
var fails = require('./_fails');
var defined = require('./_defined');
var wks = require('./_wks');
var regexpExec = require('./_regexp-exec');

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};

},{"./es6.regexp.exec":"../../node_modules/core-js/modules/es6.regexp.exec.js","./_redefine":"../../node_modules/core-js/modules/_redefine.js","./_hide":"../../node_modules/core-js/modules/_hide.js","./_fails":"../../node_modules/core-js/modules/_fails.js","./_defined":"../../node_modules/core-js/modules/_defined.js","./_wks":"../../node_modules/core-js/modules/_wks.js","./_regexp-exec":"../../node_modules/core-js/modules/_regexp-exec.js"}],"../../node_modules/core-js/modules/es6.regexp.match.js":[function(require,module,exports) {
'use strict';

var anObject = require('./_an-object');
var toLength = require('./_to-length');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');

// @@match logic
require('./_fix-re-wks')('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative($match, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      if (!rx.global) return regExpExec(rx, S);
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

},{"./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_to-length":"../../node_modules/core-js/modules/_to-length.js","./_advance-string-index":"../../node_modules/core-js/modules/_advance-string-index.js","./_regexp-exec-abstract":"../../node_modules/core-js/modules/_regexp-exec-abstract.js","./_fix-re-wks":"../../node_modules/core-js/modules/_fix-re-wks.js"}],"../../node_modules/core-js/modules/es6.regexp.replace.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';

var anObject = require('./_an-object');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var toInteger = require('./_to-integer');
var advanceStringIndex = require('./_advance-string-index');
var regExpExec = require('./_regexp-exec-abstract');
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
require('./_fix-re-wks')('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

},{"./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_to-object":"../../node_modules/core-js/modules/_to-object.js","./_to-length":"../../node_modules/core-js/modules/_to-length.js","./_to-integer":"../../node_modules/core-js/modules/_to-integer.js","./_advance-string-index":"../../node_modules/core-js/modules/_advance-string-index.js","./_regexp-exec-abstract":"../../node_modules/core-js/modules/_regexp-exec-abstract.js","./_fix-re-wks":"../../node_modules/core-js/modules/_fix-re-wks.js"}],"../../node_modules/core-js/modules/es6.regexp.split.js":[function(require,module,exports) {
'use strict';

var isRegExp = require('./_is-regexp');
var anObject = require('./_an-object');
var speciesConstructor = require('./_species-constructor');
var advanceStringIndex = require('./_advance-string-index');
var toLength = require('./_to-length');
var callRegExpExec = require('./_regexp-exec-abstract');
var regexpExec = require('./_regexp-exec');
var fails = require('./_fails');
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { RegExp(MAX_UINT32, 'y'); });

// @@split logic
require('./_fix-re-wks')('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = defined(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
});

},{"./_is-regexp":"../../node_modules/core-js/modules/_is-regexp.js","./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_species-constructor":"../../node_modules/core-js/modules/_species-constructor.js","./_advance-string-index":"../../node_modules/core-js/modules/_advance-string-index.js","./_to-length":"../../node_modules/core-js/modules/_to-length.js","./_regexp-exec-abstract":"../../node_modules/core-js/modules/_regexp-exec-abstract.js","./_regexp-exec":"../../node_modules/core-js/modules/_regexp-exec.js","./_fails":"../../node_modules/core-js/modules/_fails.js","./_fix-re-wks":"../../node_modules/core-js/modules/_fix-re-wks.js"}],"../../node_modules/core-js/modules/es6.regexp.search.js":[function(require,module,exports) {
'use strict';

var anObject = require('./_an-object');
var sameValue = require('./_same-value');
var regExpExec = require('./_regexp-exec-abstract');

// @@search logic
require('./_fix-re-wks')('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[SEARCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
    function (regexp) {
      var res = maybeCallNative($search, regexp, this);
      if (res.done) return res.value;
      var rx = anObject(regexp);
      var S = String(this);
      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

},{"./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_same-value":"../../node_modules/core-js/modules/_same-value.js","./_regexp-exec-abstract":"../../node_modules/core-js/modules/_regexp-exec-abstract.js","./_fix-re-wks":"../../node_modules/core-js/modules/_fix-re-wks.js"}],"../../node_modules/core-js/modules/es6.regexp.to-string.js":[function(require,module,exports) {

'use strict';
require('./es6.regexp.flags');
var anObject = require('./_an-object');
var $flags = require('./_flags');
var DESCRIPTORS = require('./_descriptors');
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  require('./_redefine')(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (require('./_fails')(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

},{"./es6.regexp.flags":"../../node_modules/core-js/modules/es6.regexp.flags.js","./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_flags":"../../node_modules/core-js/modules/_flags.js","./_descriptors":"../../node_modules/core-js/modules/_descriptors.js","./_redefine":"../../node_modules/core-js/modules/_redefine.js","./_fails":"../../node_modules/core-js/modules/_fails.js"}],"../../node_modules/core-js/modules/es6.set.js":[function(require,module,exports) {
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var SET = 'Set';

// 23.2 Set Objects
module.exports = require('./_collection')(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);

},{"./_collection-strong":"../../node_modules/core-js/modules/_collection-strong.js","./_validate-collection":"../../node_modules/core-js/modules/_validate-collection.js","./_collection":"../../node_modules/core-js/modules/_collection.js"}],"../../node_modules/core-js/modules/_wks-ext.js":[function(require,module,exports) {
exports.f = require('./_wks');

},{"./_wks":"../../node_modules/core-js/modules/_wks.js"}],"../../node_modules/core-js/modules/_wks-define.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_global":"../../node_modules/core-js/modules/_global.js","./_core":"../../node_modules/core-js/modules/_core.js","./_library":"../../node_modules/core-js/modules/_library.js","./_wks-ext":"../../node_modules/core-js/modules/_wks-ext.js","./_object-dp":"../../node_modules/core-js/modules/_object-dp.js"}],"../../node_modules/core-js/modules/_enum-keys.js":[function(require,module,exports) {
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-keys":"../../node_modules/core-js/modules/_object-keys.js","./_object-gops":"../../node_modules/core-js/modules/_object-gops.js","./_object-pie":"../../node_modules/core-js/modules/_object-pie.js"}],"../../node_modules/core-js/modules/es6.symbol.js":[function(require,module,exports) {

'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toObject = require('./_to-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $GOPS = require('./_object-gops');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_global":"../../node_modules/core-js/modules/_global.js","./_has":"../../node_modules/core-js/modules/_has.js","./_descriptors":"../../node_modules/core-js/modules/_descriptors.js","./_export":"../../node_modules/core-js/modules/_export.js","./_redefine":"../../node_modules/core-js/modules/_redefine.js","./_meta":"../../node_modules/core-js/modules/_meta.js","./_fails":"../../node_modules/core-js/modules/_fails.js","./_shared":"../../node_modules/core-js/modules/_shared.js","./_set-to-string-tag":"../../node_modules/core-js/modules/_set-to-string-tag.js","./_uid":"../../node_modules/core-js/modules/_uid.js","./_wks":"../../node_modules/core-js/modules/_wks.js","./_wks-ext":"../../node_modules/core-js/modules/_wks-ext.js","./_wks-define":"../../node_modules/core-js/modules/_wks-define.js","./_enum-keys":"../../node_modules/core-js/modules/_enum-keys.js","./_is-array":"../../node_modules/core-js/modules/_is-array.js","./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_to-object":"../../node_modules/core-js/modules/_to-object.js","./_to-iobject":"../../node_modules/core-js/modules/_to-iobject.js","./_to-primitive":"../../node_modules/core-js/modules/_to-primitive.js","./_property-desc":"../../node_modules/core-js/modules/_property-desc.js","./_object-create":"../../node_modules/core-js/modules/_object-create.js","./_object-gopn-ext":"../../node_modules/core-js/modules/_object-gopn-ext.js","./_object-gopd":"../../node_modules/core-js/modules/_object-gopd.js","./_object-gops":"../../node_modules/core-js/modules/_object-gops.js","./_object-dp":"../../node_modules/core-js/modules/_object-dp.js","./_object-keys":"../../node_modules/core-js/modules/_object-keys.js","./_object-gopn":"../../node_modules/core-js/modules/_object-gopn.js","./_object-pie":"../../node_modules/core-js/modules/_object-pie.js","./_library":"../../node_modules/core-js/modules/_library.js","./_hide":"../../node_modules/core-js/modules/_hide.js"}],"../../node_modules/core-js/modules/es7.symbol.async-iterator.js":[function(require,module,exports) {
require('./_wks-define')('asyncIterator');

},{"./_wks-define":"../../node_modules/core-js/modules/_wks-define.js"}],"../../node_modules/core-js/modules/_string-html.js":[function(require,module,exports) {
var $export = require('./_export');
var fails = require('./_fails');
var defined = require('./_defined');
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_fails":"../../node_modules/core-js/modules/_fails.js","./_defined":"../../node_modules/core-js/modules/_defined.js"}],"../../node_modules/core-js/modules/es6.string.anchor.js":[function(require,module,exports) {
'use strict';
// B.2.3.2 String.prototype.anchor(name)
require('./_string-html')('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});

},{"./_string-html":"../../node_modules/core-js/modules/_string-html.js"}],"../../node_modules/core-js/modules/es6.string.big.js":[function(require,module,exports) {
'use strict';
// B.2.3.3 String.prototype.big()
require('./_string-html')('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});

},{"./_string-html":"../../node_modules/core-js/modules/_string-html.js"}],"../../node_modules/core-js/modules/es6.string.blink.js":[function(require,module,exports) {
'use strict';
// B.2.3.4 String.prototype.blink()
require('./_string-html')('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});

},{"./_string-html":"../../node_modules/core-js/modules/_string-html.js"}],"../../node_modules/core-js/modules/es6.string.bold.js":[function(require,module,exports) {
'use strict';
// B.2.3.5 String.prototype.bold()
require('./_string-html')('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});

},{"./_string-html":"../../node_modules/core-js/modules/_string-html.js"}],"../../node_modules/core-js/modules/es6.string.code-point-at.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $at = require('./_string-at')(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_string-at":"../../node_modules/core-js/modules/_string-at.js"}],"../../node_modules/core-js/modules/_string-context.js":[function(require,module,exports) {
// helper for String#{startsWith, endsWith, includes}
var isRegExp = require('./_is-regexp');
var defined = require('./_defined');

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

},{"./_is-regexp":"../../node_modules/core-js/modules/_is-regexp.js","./_defined":"../../node_modules/core-js/modules/_defined.js"}],"../../node_modules/core-js/modules/_fails-is-regexp.js":[function(require,module,exports) {
var MATCH = require('./_wks')('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};

},{"./_wks":"../../node_modules/core-js/modules/_wks.js"}],"../../node_modules/core-js/modules/es6.string.ends-with.js":[function(require,module,exports) {
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_to-length":"../../node_modules/core-js/modules/_to-length.js","./_string-context":"../../node_modules/core-js/modules/_string-context.js","./_fails-is-regexp":"../../node_modules/core-js/modules/_fails-is-regexp.js"}],"../../node_modules/core-js/modules/es6.string.fixed.js":[function(require,module,exports) {
'use strict';
// B.2.3.6 String.prototype.fixed()
require('./_string-html')('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});

},{"./_string-html":"../../node_modules/core-js/modules/_string-html.js"}],"../../node_modules/core-js/modules/es6.string.fontcolor.js":[function(require,module,exports) {
'use strict';
// B.2.3.7 String.prototype.fontcolor(color)
require('./_string-html')('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});

},{"./_string-html":"../../node_modules/core-js/modules/_string-html.js"}],"../../node_modules/core-js/modules/es6.string.fontsize.js":[function(require,module,exports) {
'use strict';
// B.2.3.8 String.prototype.fontsize(size)
require('./_string-html')('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});

},{"./_string-html":"../../node_modules/core-js/modules/_string-html.js"}],"../../node_modules/core-js/modules/es6.string.from-code-point.js":[function(require,module,exports) {
var $export = require('./_export');
var toAbsoluteIndex = require('./_to-absolute-index');
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_to-absolute-index":"../../node_modules/core-js/modules/_to-absolute-index.js"}],"../../node_modules/core-js/modules/es6.string.includes.js":[function(require,module,exports) {
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export = require('./_export');
var context = require('./_string-context');
var INCLUDES = 'includes';

$export($export.P + $export.F * require('./_fails-is-regexp')(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_string-context":"../../node_modules/core-js/modules/_string-context.js","./_fails-is-regexp":"../../node_modules/core-js/modules/_fails-is-regexp.js"}],"../../node_modules/core-js/modules/es6.string.italics.js":[function(require,module,exports) {
'use strict';
// B.2.3.9 String.prototype.italics()
require('./_string-html')('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});

},{"./_string-html":"../../node_modules/core-js/modules/_string-html.js"}],"../../node_modules/core-js/modules/es6.string.iterator.js":[function(require,module,exports) {
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

},{"./_string-at":"../../node_modules/core-js/modules/_string-at.js","./_iter-define":"../../node_modules/core-js/modules/_iter-define.js"}],"../../node_modules/core-js/modules/es6.string.link.js":[function(require,module,exports) {
'use strict';
// B.2.3.10 String.prototype.link(url)
require('./_string-html')('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});

},{"./_string-html":"../../node_modules/core-js/modules/_string-html.js"}],"../../node_modules/core-js/modules/_string-repeat.js":[function(require,module,exports) {
'use strict';
var toInteger = require('./_to-integer');
var defined = require('./_defined');

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};

},{"./_to-integer":"../../node_modules/core-js/modules/_to-integer.js","./_defined":"../../node_modules/core-js/modules/_defined.js"}],"../../node_modules/core-js/modules/_string-pad.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = require('./_to-length');
var repeat = require('./_string-repeat');
var defined = require('./_defined');

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

},{"./_to-length":"../../node_modules/core-js/modules/_to-length.js","./_string-repeat":"../../node_modules/core-js/modules/_string-repeat.js","./_defined":"../../node_modules/core-js/modules/_defined.js"}],"../../node_modules/core-js/modules/es7.string.pad-start.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_string-pad":"../../node_modules/core-js/modules/_string-pad.js","./_user-agent":"../../node_modules/core-js/modules/_user-agent.js"}],"../../node_modules/core-js/modules/es7.string.pad-end.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = require('./_export');
var $pad = require('./_string-pad');
var userAgent = require('./_user-agent');

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_string-pad":"../../node_modules/core-js/modules/_string-pad.js","./_user-agent":"../../node_modules/core-js/modules/_user-agent.js"}],"../../node_modules/core-js/modules/es6.string.raw.js":[function(require,module,exports) {
var $export = require('./_export');
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_to-iobject":"../../node_modules/core-js/modules/_to-iobject.js","./_to-length":"../../node_modules/core-js/modules/_to-length.js"}],"../../node_modules/core-js/modules/es6.string.repeat.js":[function(require,module,exports) {
var $export = require('./_export');

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: require('./_string-repeat')
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_string-repeat":"../../node_modules/core-js/modules/_string-repeat.js"}],"../../node_modules/core-js/modules/es6.string.small.js":[function(require,module,exports) {
'use strict';
// B.2.3.11 String.prototype.small()
require('./_string-html')('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});

},{"./_string-html":"../../node_modules/core-js/modules/_string-html.js"}],"../../node_modules/core-js/modules/es6.string.starts-with.js":[function(require,module,exports) {
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export = require('./_export');
var toLength = require('./_to-length');
var context = require('./_string-context');
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * require('./_fails-is-regexp')(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_to-length":"../../node_modules/core-js/modules/_to-length.js","./_string-context":"../../node_modules/core-js/modules/_string-context.js","./_fails-is-regexp":"../../node_modules/core-js/modules/_fails-is-regexp.js"}],"../../node_modules/core-js/modules/es6.string.strike.js":[function(require,module,exports) {
'use strict';
// B.2.3.12 String.prototype.strike()
require('./_string-html')('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});

},{"./_string-html":"../../node_modules/core-js/modules/_string-html.js"}],"../../node_modules/core-js/modules/es6.string.sub.js":[function(require,module,exports) {
'use strict';
// B.2.3.13 String.prototype.sub()
require('./_string-html')('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});

},{"./_string-html":"../../node_modules/core-js/modules/_string-html.js"}],"../../node_modules/core-js/modules/es6.string.sup.js":[function(require,module,exports) {
'use strict';
// B.2.3.14 String.prototype.sup()
require('./_string-html')('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});

},{"./_string-html":"../../node_modules/core-js/modules/_string-html.js"}],"../../node_modules/core-js/modules/es7.string.trim-left.js":[function(require,module,exports) {
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');

},{"./_string-trim":"../../node_modules/core-js/modules/_string-trim.js"}],"../../node_modules/core-js/modules/es7.string.trim-right.js":[function(require,module,exports) {
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
require('./_string-trim')('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');

},{"./_string-trim":"../../node_modules/core-js/modules/_string-trim.js"}],"../../node_modules/core-js/modules/_typed.js":[function(require,module,exports) {

var global = require('./_global');
var hide = require('./_hide');
var uid = require('./_uid');
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};

},{"./_global":"../../node_modules/core-js/modules/_global.js","./_hide":"../../node_modules/core-js/modules/_hide.js","./_uid":"../../node_modules/core-js/modules/_uid.js"}],"../../node_modules/core-js/modules/_to-index.js":[function(require,module,exports) {
// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};

},{"./_to-integer":"../../node_modules/core-js/modules/_to-integer.js","./_to-length":"../../node_modules/core-js/modules/_to-length.js"}],"../../node_modules/core-js/modules/_typed-buffer.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var DESCRIPTORS = require('./_descriptors');
var LIBRARY = require('./_library');
var $typed = require('./_typed');
var hide = require('./_hide');
var redefineAll = require('./_redefine-all');
var fails = require('./_fails');
var anInstance = require('./_an-instance');
var toInteger = require('./_to-integer');
var toLength = require('./_to-length');
var toIndex = require('./_to-index');
var gOPN = require('./_object-gopn').f;
var dP = require('./_object-dp').f;
var arrayFill = require('./_array-fill');
var setToStringTag = require('./_set-to-string-tag');
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

},{"./_global":"../../node_modules/core-js/modules/_global.js","./_descriptors":"../../node_modules/core-js/modules/_descriptors.js","./_library":"../../node_modules/core-js/modules/_library.js","./_typed":"../../node_modules/core-js/modules/_typed.js","./_hide":"../../node_modules/core-js/modules/_hide.js","./_redefine-all":"../../node_modules/core-js/modules/_redefine-all.js","./_fails":"../../node_modules/core-js/modules/_fails.js","./_an-instance":"../../node_modules/core-js/modules/_an-instance.js","./_to-integer":"../../node_modules/core-js/modules/_to-integer.js","./_to-length":"../../node_modules/core-js/modules/_to-length.js","./_to-index":"../../node_modules/core-js/modules/_to-index.js","./_object-gopn":"../../node_modules/core-js/modules/_object-gopn.js","./_object-dp":"../../node_modules/core-js/modules/_object-dp.js","./_array-fill":"../../node_modules/core-js/modules/_array-fill.js","./_set-to-string-tag":"../../node_modules/core-js/modules/_set-to-string-tag.js"}],"../../node_modules/core-js/modules/es6.typed.array-buffer.js":[function(require,module,exports) {
'use strict';
var $export = require('./_export');
var $typed = require('./_typed');
var buffer = require('./_typed-buffer');
var anObject = require('./_an-object');
var toAbsoluteIndex = require('./_to-absolute-index');
var toLength = require('./_to-length');
var isObject = require('./_is-object');
var ArrayBuffer = require('./_global').ArrayBuffer;
var speciesConstructor = require('./_species-constructor');
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * require('./_fails')(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

require('./_set-species')(ARRAY_BUFFER);

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_typed":"../../node_modules/core-js/modules/_typed.js","./_typed-buffer":"../../node_modules/core-js/modules/_typed-buffer.js","./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_to-absolute-index":"../../node_modules/core-js/modules/_to-absolute-index.js","./_to-length":"../../node_modules/core-js/modules/_to-length.js","./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_global":"../../node_modules/core-js/modules/_global.js","./_species-constructor":"../../node_modules/core-js/modules/_species-constructor.js","./_fails":"../../node_modules/core-js/modules/_fails.js","./_set-species":"../../node_modules/core-js/modules/_set-species.js"}],"../../node_modules/core-js/modules/_typed-array.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';
if (require('./_descriptors')) {
  var LIBRARY = require('./_library');
  var global = require('./_global');
  var fails = require('./_fails');
  var $export = require('./_export');
  var $typed = require('./_typed');
  var $buffer = require('./_typed-buffer');
  var ctx = require('./_ctx');
  var anInstance = require('./_an-instance');
  var propertyDesc = require('./_property-desc');
  var hide = require('./_hide');
  var redefineAll = require('./_redefine-all');
  var toInteger = require('./_to-integer');
  var toLength = require('./_to-length');
  var toIndex = require('./_to-index');
  var toAbsoluteIndex = require('./_to-absolute-index');
  var toPrimitive = require('./_to-primitive');
  var has = require('./_has');
  var classof = require('./_classof');
  var isObject = require('./_is-object');
  var toObject = require('./_to-object');
  var isArrayIter = require('./_is-array-iter');
  var create = require('./_object-create');
  var getPrototypeOf = require('./_object-gpo');
  var gOPN = require('./_object-gopn').f;
  var getIterFn = require('./core.get-iterator-method');
  var uid = require('./_uid');
  var wks = require('./_wks');
  var createArrayMethod = require('./_array-methods');
  var createArrayIncludes = require('./_array-includes');
  var speciesConstructor = require('./_species-constructor');
  var ArrayIterators = require('./es6.array.iterator');
  var Iterators = require('./_iterators');
  var $iterDetect = require('./_iter-detect');
  var setSpecies = require('./_set-species');
  var arrayFill = require('./_array-fill');
  var arrayCopyWithin = require('./_array-copy-within');
  var $DP = require('./_object-dp');
  var $GOPD = require('./_object-gopd');
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };

},{"./_descriptors":"../../node_modules/core-js/modules/_descriptors.js","./_library":"../../node_modules/core-js/modules/_library.js","./_global":"../../node_modules/core-js/modules/_global.js","./_fails":"../../node_modules/core-js/modules/_fails.js","./_export":"../../node_modules/core-js/modules/_export.js","./_typed":"../../node_modules/core-js/modules/_typed.js","./_typed-buffer":"../../node_modules/core-js/modules/_typed-buffer.js","./_ctx":"../../node_modules/core-js/modules/_ctx.js","./_an-instance":"../../node_modules/core-js/modules/_an-instance.js","./_property-desc":"../../node_modules/core-js/modules/_property-desc.js","./_hide":"../../node_modules/core-js/modules/_hide.js","./_redefine-all":"../../node_modules/core-js/modules/_redefine-all.js","./_to-integer":"../../node_modules/core-js/modules/_to-integer.js","./_to-length":"../../node_modules/core-js/modules/_to-length.js","./_to-index":"../../node_modules/core-js/modules/_to-index.js","./_to-absolute-index":"../../node_modules/core-js/modules/_to-absolute-index.js","./_to-primitive":"../../node_modules/core-js/modules/_to-primitive.js","./_has":"../../node_modules/core-js/modules/_has.js","./_classof":"../../node_modules/core-js/modules/_classof.js","./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_to-object":"../../node_modules/core-js/modules/_to-object.js","./_is-array-iter":"../../node_modules/core-js/modules/_is-array-iter.js","./_object-create":"../../node_modules/core-js/modules/_object-create.js","./_object-gpo":"../../node_modules/core-js/modules/_object-gpo.js","./_object-gopn":"../../node_modules/core-js/modules/_object-gopn.js","./core.get-iterator-method":"../../node_modules/core-js/modules/core.get-iterator-method.js","./_uid":"../../node_modules/core-js/modules/_uid.js","./_wks":"../../node_modules/core-js/modules/_wks.js","./_array-methods":"../../node_modules/core-js/modules/_array-methods.js","./_array-includes":"../../node_modules/core-js/modules/_array-includes.js","./_species-constructor":"../../node_modules/core-js/modules/_species-constructor.js","./es6.array.iterator":"../../node_modules/core-js/modules/es6.array.iterator.js","./_iterators":"../../node_modules/core-js/modules/_iterators.js","./_iter-detect":"../../node_modules/core-js/modules/_iter-detect.js","./_set-species":"../../node_modules/core-js/modules/_set-species.js","./_array-fill":"../../node_modules/core-js/modules/_array-fill.js","./_array-copy-within":"../../node_modules/core-js/modules/_array-copy-within.js","./_object-dp":"../../node_modules/core-js/modules/_object-dp.js","./_object-gopd":"../../node_modules/core-js/modules/_object-gopd.js"}],"../../node_modules/core-js/modules/es6.typed.int8-array.js":[function(require,module,exports) {
require('./_typed-array')('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../../node_modules/core-js/modules/_typed-array.js"}],"../../node_modules/core-js/modules/es6.typed.uint8-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../../node_modules/core-js/modules/_typed-array.js"}],"../../node_modules/core-js/modules/es6.typed.uint8-clamped-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

},{"./_typed-array":"../../node_modules/core-js/modules/_typed-array.js"}],"../../node_modules/core-js/modules/es6.typed.int16-array.js":[function(require,module,exports) {
require('./_typed-array')('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../../node_modules/core-js/modules/_typed-array.js"}],"../../node_modules/core-js/modules/es6.typed.uint16-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../../node_modules/core-js/modules/_typed-array.js"}],"../../node_modules/core-js/modules/es6.typed.int32-array.js":[function(require,module,exports) {
require('./_typed-array')('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../../node_modules/core-js/modules/_typed-array.js"}],"../../node_modules/core-js/modules/es6.typed.uint32-array.js":[function(require,module,exports) {
require('./_typed-array')('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../../node_modules/core-js/modules/_typed-array.js"}],"../../node_modules/core-js/modules/es6.typed.float32-array.js":[function(require,module,exports) {
require('./_typed-array')('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../../node_modules/core-js/modules/_typed-array.js"}],"../../node_modules/core-js/modules/es6.typed.float64-array.js":[function(require,module,exports) {
require('./_typed-array')('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

},{"./_typed-array":"../../node_modules/core-js/modules/_typed-array.js"}],"../../node_modules/core-js/modules/_collection-weak.js":[function(require,module,exports) {
'use strict';
var redefineAll = require('./_redefine-all');
var getWeak = require('./_meta').getWeak;
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var createArrayMethod = require('./_array-methods');
var $has = require('./_has');
var validate = require('./_validate-collection');
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

},{"./_redefine-all":"../../node_modules/core-js/modules/_redefine-all.js","./_meta":"../../node_modules/core-js/modules/_meta.js","./_an-object":"../../node_modules/core-js/modules/_an-object.js","./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_an-instance":"../../node_modules/core-js/modules/_an-instance.js","./_for-of":"../../node_modules/core-js/modules/_for-of.js","./_array-methods":"../../node_modules/core-js/modules/_array-methods.js","./_has":"../../node_modules/core-js/modules/_has.js","./_validate-collection":"../../node_modules/core-js/modules/_validate-collection.js"}],"../../node_modules/core-js/modules/es6.weak-map.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var each = require('./_array-methods')(0);
var redefine = require('./_redefine');
var meta = require('./_meta');
var assign = require('./_object-assign');
var weak = require('./_collection-weak');
var isObject = require('./_is-object');
var validate = require('./_validate-collection');
var NATIVE_WEAK_MAP = require('./_validate-collection');
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = require('./_collection')(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

},{"./_global":"../../node_modules/core-js/modules/_global.js","./_array-methods":"../../node_modules/core-js/modules/_array-methods.js","./_redefine":"../../node_modules/core-js/modules/_redefine.js","./_meta":"../../node_modules/core-js/modules/_meta.js","./_object-assign":"../../node_modules/core-js/modules/_object-assign.js","./_collection-weak":"../../node_modules/core-js/modules/_collection-weak.js","./_is-object":"../../node_modules/core-js/modules/_is-object.js","./_validate-collection":"../../node_modules/core-js/modules/_validate-collection.js","./_collection":"../../node_modules/core-js/modules/_collection.js"}],"../../node_modules/core-js/modules/es6.weak-set.js":[function(require,module,exports) {
'use strict';
var weak = require('./_collection-weak');
var validate = require('./_validate-collection');
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
require('./_collection')(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);

},{"./_collection-weak":"../../node_modules/core-js/modules/_collection-weak.js","./_validate-collection":"../../node_modules/core-js/modules/_validate-collection.js","./_collection":"../../node_modules/core-js/modules/_collection.js"}],"../../node_modules/core-js/modules/web.timers.js":[function(require,module,exports) {

// ie9- setTimeout & setInterval additional parameters fix
var global = require('./_global');
var $export = require('./_export');
var userAgent = require('./_user-agent');
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

},{"./_global":"../../node_modules/core-js/modules/_global.js","./_export":"../../node_modules/core-js/modules/_export.js","./_user-agent":"../../node_modules/core-js/modules/_user-agent.js"}],"../../node_modules/core-js/modules/web.immediate.js":[function(require,module,exports) {
var $export = require('./_export');
var $task = require('./_task');
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});

},{"./_export":"../../node_modules/core-js/modules/_export.js","./_task":"../../node_modules/core-js/modules/_task.js"}],"../../node_modules/core-js/modules/web.dom.iterable.js":[function(require,module,exports) {

var $iterators = require('./es6.array.iterator');
var getKeys = require('./_object-keys');
var redefine = require('./_redefine');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var wks = require('./_wks');
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}

},{"./es6.array.iterator":"../../node_modules/core-js/modules/es6.array.iterator.js","./_object-keys":"../../node_modules/core-js/modules/_object-keys.js","./_redefine":"../../node_modules/core-js/modules/_redefine.js","./_global":"../../node_modules/core-js/modules/_global.js","./_hide":"../../node_modules/core-js/modules/_hide.js","./_iterators":"../../node_modules/core-js/modules/_iterators.js","./_wks":"../../node_modules/core-js/modules/_wks.js"}],"../../node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

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
  exports.wrap = wrap;

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

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
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
  exports.awrap = function(arg) {
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
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
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
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
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
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
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

  exports.keys = function(object) {
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
  exports.values = values;

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

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

},{}],"util/alert.js":[function(require,module,exports) {
/* eslint-disable no-undef */

/* eslint-disable no-unused-vars */
var hideAlert = function hideAlert() {
  var el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
}; // type is 'success', 'warning' or 'error'


var showAlert = function showAlert(type, msg) {
  var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 7;
  hideAlert();
  var markup = "<div class=\"alert alert--".concat(type, "\">").concat(msg, "</div>");
  document.querySelector('#alerts').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, time * 1000);
};

module.exports = showAlert;
},{}],"../../node_modules/axios/lib/helpers/bind.js":[function(require,module,exports) {
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],"../../node_modules/axios/lib/utils.js":[function(require,module,exports) {
'use strict';

var bind = require('./helpers/bind');

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};

},{"./helpers/bind":"../../node_modules/axios/lib/helpers/bind.js"}],"../../node_modules/axios/lib/helpers/buildURL.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/core/InterceptorManager.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/core/transformData.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/cancel/isCancel.js":[function(require,module,exports) {
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],"../../node_modules/axios/lib/helpers/normalizeHeaderName.js":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/core/enhanceError.js":[function(require,module,exports) {
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

},{}],"../../node_modules/axios/lib/core/createError.js":[function(require,module,exports) {
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":"../../node_modules/axios/lib/core/enhanceError.js"}],"../../node_modules/axios/lib/core/settle.js":[function(require,module,exports) {
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":"../../node_modules/axios/lib/core/createError.js"}],"../../node_modules/axios/lib/helpers/isAbsoluteURL.js":[function(require,module,exports) {
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],"../../node_modules/axios/lib/helpers/combineURLs.js":[function(require,module,exports) {
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],"../../node_modules/axios/lib/core/buildFullPath.js":[function(require,module,exports) {
'use strict';

var isAbsoluteURL = require('../helpers/isAbsoluteURL');
var combineURLs = require('../helpers/combineURLs');

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

},{"../helpers/isAbsoluteURL":"../../node_modules/axios/lib/helpers/isAbsoluteURL.js","../helpers/combineURLs":"../../node_modules/axios/lib/helpers/combineURLs.js"}],"../../node_modules/axios/lib/helpers/parseHeaders.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/helpers/isURLSameOrigin.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/helpers/cookies.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/adapters/xhr.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = require('./../helpers/cookies');

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

},{"./../utils":"../../node_modules/axios/lib/utils.js","./../core/settle":"../../node_modules/axios/lib/core/settle.js","./../helpers/buildURL":"../../node_modules/axios/lib/helpers/buildURL.js","../core/buildFullPath":"../../node_modules/axios/lib/core/buildFullPath.js","./../helpers/parseHeaders":"../../node_modules/axios/lib/helpers/parseHeaders.js","./../helpers/isURLSameOrigin":"../../node_modules/axios/lib/helpers/isURLSameOrigin.js","../core/createError":"../../node_modules/axios/lib/core/createError.js","./../helpers/cookies":"../../node_modules/axios/lib/helpers/cookies.js"}],"../../node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
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
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
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

  while (len) {
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
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
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

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"../../node_modules/axios/lib/defaults.js":[function(require,module,exports) {
var process = require("process");
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

},{"./utils":"../../node_modules/axios/lib/utils.js","./helpers/normalizeHeaderName":"../../node_modules/axios/lib/helpers/normalizeHeaderName.js","./adapters/xhr":"../../node_modules/axios/lib/adapters/xhr.js","./adapters/http":"../../node_modules/axios/lib/adapters/xhr.js","process":"../../node_modules/process/browser.js"}],"../../node_modules/axios/lib/core/dispatchRequest.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"./../utils":"../../node_modules/axios/lib/utils.js","./transformData":"../../node_modules/axios/lib/core/transformData.js","../cancel/isCancel":"../../node_modules/axios/lib/cancel/isCancel.js","../defaults":"../../node_modules/axios/lib/defaults.js"}],"../../node_modules/axios/lib/core/mergeConfig.js":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};

},{"../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/core/Axios.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"./../utils":"../../node_modules/axios/lib/utils.js","../helpers/buildURL":"../../node_modules/axios/lib/helpers/buildURL.js","./InterceptorManager":"../../node_modules/axios/lib/core/InterceptorManager.js","./dispatchRequest":"../../node_modules/axios/lib/core/dispatchRequest.js","./mergeConfig":"../../node_modules/axios/lib/core/mergeConfig.js"}],"../../node_modules/axios/lib/cancel/Cancel.js":[function(require,module,exports) {
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],"../../node_modules/axios/lib/cancel/CancelToken.js":[function(require,module,exports) {
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":"../../node_modules/axios/lib/cancel/Cancel.js"}],"../../node_modules/axios/lib/helpers/spread.js":[function(require,module,exports) {
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],"../../node_modules/axios/lib/axios.js":[function(require,module,exports) {
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./utils":"../../node_modules/axios/lib/utils.js","./helpers/bind":"../../node_modules/axios/lib/helpers/bind.js","./core/Axios":"../../node_modules/axios/lib/core/Axios.js","./core/mergeConfig":"../../node_modules/axios/lib/core/mergeConfig.js","./defaults":"../../node_modules/axios/lib/defaults.js","./cancel/Cancel":"../../node_modules/axios/lib/cancel/Cancel.js","./cancel/CancelToken":"../../node_modules/axios/lib/cancel/CancelToken.js","./cancel/isCancel":"../../node_modules/axios/lib/cancel/isCancel.js","./helpers/spread":"../../node_modules/axios/lib/helpers/spread.js"}],"../../node_modules/axios/index.js":[function(require,module,exports) {
module.exports = require('./lib/axios');
},{"./lib/axios":"../../node_modules/axios/lib/axios.js"}],"../../node_modules/@svgdotjs/svg.js/dist/svg.esm.js":[function(require,module,exports) {
var global = arguments[3];

var define;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adopt = adopt;
exports.assignNewId = assignNewId;
exports.create = create;
exports.dispatch = dispatch;
exports.eid = eid;
exports.extend = extend;
exports.find = baseFind;
exports.getClass = getClass;
exports.invent = invent;
exports.makeInstance = makeInstance;
exports.makeMorphable = makeMorphable;
exports.mockAdopt = mockAdopt;
exports.nodeOrNew = nodeOrNew;
exports.off = off;
exports.on = on;
exports.parser = parser;
exports.register = register;
exports.registerMorphableType = registerMorphableType;
exports.registerWindow = registerWindow;
exports.wrapWithAttrCheck = wrapWithAttrCheck;
exports.utils = exports.root = exports.regex = exports.namespaces = exports.easing = exports.defaults = exports.Use = exports.Tspan = exports.TransformBag = exports.Timeline = exports.TextPath = exports.Text = exports.Symbol = exports.Svg = exports.Style = exports.Stop = exports.Spring = exports.Shape = exports.SVG = exports.Runner = exports.Rect = exports.Queue = exports.Polyline = exports.Polygon = exports.PointArray = exports.Point = exports.Pattern = exports.PathArray = exports.Path = exports.PID = exports.ObjectBag = exports.Number = exports.NonMorphable = exports.Morphable = exports.Matrix = exports.Mask = exports.Marker = exports.List = exports.Line = exports.Image = exports.Gradient = exports.G = exports.ForeignObject = exports.EventTarget = exports.Ellipse = exports.Element = exports.Ease = exports.Dom = exports.Defs = exports.Controller = exports.Container = exports.Color = exports.ClipPath = exports.Circle = exports.Box = exports.Array = exports.Animator = exports.A = void 0;

/*!
* @svgdotjs/svg.js - A lightweight library for manipulating and animating SVG.
* @version 3.0.16
* https://svgdotjs.github.io/
*
* @copyright Wout Fierens <wout@mick-wout.com>
* @license MIT
*
* BUILT: Tue Nov 12 2019 21:57:16 GMT+0100 (GMT+01:00)
*/
;
var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
  return module = {
    exports: {}
  }, fn(module, module.exports), module.exports;
}

var check = function (it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


var global_1 = // eslint-disable-next-line no-undef
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof commonjsGlobal == 'object' && commonjsGlobal) || // eslint-disable-next-line no-new-func
Function('return this')();

var fails = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
}; // Thank's IE8 for his funny defineProperty


var descriptors = !fails(function () {
  return Object.defineProperty({}, 'a', {
    get: function () {
      return 7;
    }
  }).a != 7;
});
var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;
var objectPropertyIsEnumerable = {
  f: f
};

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var toString = {}.toString;

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1);
};

var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object; // `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible

var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
}; // toObject with fallback for non-array-like ES3 strings


var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};

var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
}; // `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string


var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

var hasOwnProperty = {}.hasOwnProperty;

var has = function (it, key) {
  return hasOwnProperty.call(it, key);
};

var document$1 = global_1.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document$1) && isObject(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
}; // Thank's IE8 for his funny defineProperty


var ie8DomDefine = !descriptors && !fails(function () {
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function () {
      return 7;
    }
  }).a != 7;
});
var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};
var objectGetOwnPropertyDescriptor = {
  f: f$1
};

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  }

  return it;
};

var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty

var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};
var objectDefineProperty = {
  f: f$2
};
var createNonEnumerableProperty = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var setGlobal = function (key, value) {
  try {
    createNonEnumerableProperty(global_1, key, value);
  } catch (error) {
    global_1[key] = value;
  }

  return value;
};

var SHARED = '__core-js_shared__';
var store = global_1[SHARED] || setGlobal(SHARED, {});
var sharedStore = store;
var shared = createCommonjsModule(function (module) {
  (module.exports = function (key, value) {
    return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
  })('versions', []).push({
    version: '3.3.6',
    mode: 'global',
    copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
  });
});
var functionToString = shared('native-function-to-string', Function.toString);
var WeakMap = global_1.WeakMap;
var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(functionToString.call(WeakMap));
var id = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var keys = shared('keys');

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys = {};
var WeakMap$1 = global_1.WeakMap;
var set, get, has$1;

var enforce = function (it) {
  return has$1(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (nativeWeakMap) {
  var store$1 = new WeakMap$1();
  var wmget = store$1.get;
  var wmhas = store$1.has;
  var wmset = store$1.set;

  set = function (it, metadata) {
    wmset.call(store$1, it, metadata);
    return metadata;
  };

  get = function (it) {
    return wmget.call(store$1, it) || {};
  };

  has$1 = function (it) {
    return wmhas.call(store$1, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function (it) {
    return has(it, STATE) ? it[STATE] : {};
  };

  has$1 = function (it) {
    return has(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};
var redefine = createCommonjsModule(function (module) {
  var getInternalState = internalState.get;
  var enforceInternalState = internalState.enforce;
  var TEMPLATE = String(functionToString).split('toString');
  shared('inspectSource', function (it) {
    return functionToString.call(it);
  });
  (module.exports = function (O, key, value, options) {
    var unsafe = options ? !!options.unsafe : false;
    var simple = options ? !!options.enumerable : false;
    var noTargetGet = options ? !!options.noTargetGet : false;

    if (typeof value == 'function') {
      if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
      enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }

    if (O === global_1) {
      if (simple) O[key] = value;else setGlobal(key, value);
      return;
    } else if (!unsafe) {
      delete O[key];
    } else if (!noTargetGet && O[key]) {
      simple = true;
    }

    if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  })(Function.prototype, 'toString', function toString() {
    return typeof this == 'function' && getInternalState(this).source || functionToString.call(this);
  });
});
var path = global_1;

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
};

var ceil = Math.ceil;
var floor = Math.floor; // `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger

var toInteger = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var min = Math.min; // `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength

var toLength = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).

var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
}; // `Array.prototype.{ indexOf, includes }` methods implementation


var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};
var indexOf = arrayIncludes.indexOf;

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key); // Don't enum bug & hidden keys


  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }

  return result;
}; // IE8- don't enum bug keys


var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];
var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return objectKeysInternal(O, hiddenKeys$1);
};

var objectGetOwnPropertyNames = {
  f: f$3
};
var f$4 = Object.getOwnPropertySymbols;
var objectGetOwnPropertySymbols = {
  f: f$4
}; // all object keys, includes non-enumerable and symbols

var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = objectGetOwnPropertyNames.f(anObject(it));
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var copyConstructorProperties = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = objectDefineProperty.f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
var isForced_1 = isForced;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/

var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global_1;
  } else if (STATIC) {
    target = global_1[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global_1[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    } // extend global


    redefine(target, key, sourceProperty, options);
  }
}; // `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray


var isArray = Array.isArray || function isArray(arg) {
  return classofRaw(arg) == 'Array';
};

var createProperty = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
};

var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});
var Symbol$1 = global_1.Symbol;
var store$2 = shared('wks');

var wellKnownSymbol = function (name) {
  return store$2[name] || (store$2[name] = nativeSymbol && Symbol$1[name] || (nativeSymbol ? Symbol$1 : uid)('Symbol.' + name));
};

var userAgent = getBuiltIn('navigator', 'userAgent') || '';
var process = global_1.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var v8Version = version && +version;
var SPECIES = wellKnownSymbol('species');

var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return v8Version >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};

    constructor[SPECIES] = function () {
      return {
        foo: 1
      };
    };

    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

var SPECIES$1 = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max$1 = Math.max; // `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects

_export({
  target: 'Array',
  proto: true,
  forced: !arrayMethodHasSpeciesSupport('slice')
}, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

    var Constructor, result, n;

    if (isArray(O)) {
      Constructor = O.constructor; // cross-realm fallback

      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES$1];
        if (Constructor === null) Constructor = undefined;
      }

      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }

    result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));

    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);

    result.length = n;
    return result;
  }
});

var defineProperty = objectDefineProperty.f;
var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name'; // Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name

if (descriptors && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}

var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;
var toString$1 = {}.toString;
var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
}; // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window


var f$5 = function getOwnPropertyNames(it) {
  return windowNames && toString$1.call(it) == '[object Window]' ? getWindowNames(it) : nativeGetOwnPropertyNames(toIndexedObject(it));
};

var objectGetOwnPropertyNamesExternal = {
  f: f$5
};
var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
var FAILS_ON_PRIMITIVES = fails(function () {
  return !Object.getOwnPropertyNames(1);
}); // `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

_export({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES
}, {
  getOwnPropertyNames: nativeGetOwnPropertyNames$1
});

function _typeof2(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof2 = function _typeof2(obj) {
      return typeof obj;
    };
  } else {
    _typeof2 = function _typeof2(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof2(obj);
}

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
} // `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject


var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
}; // `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys


var objectKeys = Object.keys || function keys(O) {
  return objectKeysInternal(O, enumBugKeys);
}; // `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties


var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;

  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);

  return O;
};
var html = getBuiltIn('document', 'documentElement');
var IE_PROTO = sharedKey('IE_PROTO');
var PROTOTYPE = 'prototype';

var Empty = function () {
  /* empty */
}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var length = enumBugKeys.length;
  var lt = '<';
  var script = 'script';
  var gt = '>';
  var js = 'java' + script + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = String(js);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;

  while (length--) delete createDict[PROTOTYPE][enumBugKeys[length]];

  return createDict();
}; // `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create


var objectCreate = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO] = O;
  } else result = createDict();

  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};

hiddenKeys[IE_PROTO] = true;
var f$6 = wellKnownSymbol;
var wrappedWellKnownSymbol = {
  f: f$6
};
var defineProperty$1 = objectDefineProperty.f;

var defineWellKnownSymbol = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty$1(Symbol, NAME, {
    value: wrappedWellKnownSymbol.f(NAME)
  });
};

var defineProperty$2 = objectDefineProperty.f;
var TO_STRING_TAG = wellKnownSymbol('toStringTag');

var setToStringTag = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty$2(it, TO_STRING_TAG, {
      configurable: true,
      value: TAG
    });
  }
};

var aFunction$1 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  }

  return it;
}; // optional / simple context binding


var bindContext = function (fn, that, length) {
  aFunction$1(fn);
  if (that === undefined) return fn;

  switch (length) {
    case 0:
      return function () {
        return fn.call(that);
      };

    case 1:
      return function (a) {
        return fn.call(that, a);
      };

    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };

    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }

  return function ()
  /* ...args */
  {
    return fn.apply(that, arguments);
  };
};

var SPECIES$2 = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate

var arraySpeciesCreate = function (originalArray, length) {
  var C;

  if (isArray(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
      C = C[SPECIES$2];
      if (C === null) C = undefined;
    }
  }

  return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation

var createMethod$1 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = bindContext(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;

    for (; length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);

      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
            case 3:
              return true;
            // some

            case 5:
              return value;
            // find

            case 6:
              return index;
            // findIndex

            case 2:
              push.call(target, value);
            // filter
          } else if (IS_EVERY) return false; // every
      }
    }

    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$1(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod$1(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod$1(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod$1(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod$1(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod$1(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$1(6)
};
var $forEach = arrayIteration.forEach;
var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE$1 = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = internalState.set;
var getInternalState = internalState.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE$1];
var $Symbol = global_1.Symbol;
var JSON$1 = global_1.JSON;
var nativeJSONStringify = JSON$1 && JSON$1.stringify;
var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var nativeDefineProperty$1 = objectDefineProperty.f;
var nativeGetOwnPropertyNames$2 = objectGetOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global_1.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

var setSymbolDescriptor = descriptors && fails(function () {
  return objectCreate(nativeDefineProperty$1({}, 'a', {
    get: function () {
      return nativeDefineProperty$1(this, 'a', {
        value: 7
      }).a;
    }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty$1(O, P, Attributes);

  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty$1(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty$1;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!descriptors) symbol.description = description;
  return symbol;
};

var isSymbol = nativeSymbol && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);

  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = objectCreate(Attributes, {
        enumerable: createPropertyDescriptor(0, false)
      });
    }

    return setSymbolDescriptor(O, key, Attributes);
  }

  return nativeDefineProperty$1(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);

  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }

  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames$2(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames$2(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
}; // `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor


if (!nativeSymbol) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);

    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };

    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, {
      configurable: true,
      set: setter
    });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
    return getInternalState(this).tag;
  });
  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
  objectDefineProperty.f = $defineProperty;
  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

  if (descriptors) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, {
        unsafe: true
      });
    }
  }

  wrappedWellKnownSymbol.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };
}

_export({
  global: true,
  wrap: true,
  forced: !nativeSymbol,
  sham: !nativeSymbol
}, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

_export({
  target: SYMBOL,
  stat: true,
  forced: !nativeSymbol
}, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () {
    USE_SETTER = true;
  },
  useSimple: function () {
    USE_SETTER = false;
  }
});

_export({
  target: 'Object',
  stat: true,
  forced: !nativeSymbol,
  sham: !descriptors
}, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

_export({
  target: 'Object',
  stat: true,
  forced: !nativeSymbol
}, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
}); // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443


_export({
  target: 'Object',
  stat: true,
  forced: fails(function () {
    objectGetOwnPropertySymbols.f(1);
  })
}, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return objectGetOwnPropertySymbols.f(toObject(it));
  }
}); // `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify


JSON$1 && _export({
  target: 'JSON',
  stat: true,
  forced: !nativeSymbol || fails(function () {
    var symbol = $Symbol(); // MS Edge converts symbol values to JSON as {}

    return nativeJSONStringify([symbol]) != '[null]' // WebKit converts symbol values to JSON as null
    || nativeJSONStringify({
      a: symbol
    }) != '{}' // V8 throws on boxed symbols
    || nativeJSONStringify(Object(symbol)) != '{}';
  })
}, {
  stringify: function stringify(it) {
    var args = [it];
    var index = 1;
    var replacer, $replacer;

    while (arguments.length > index) args.push(arguments[index++]);

    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return nativeJSONStringify.apply(JSON$1, args);
  }
}); // `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive

if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf);
} // `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag


setToStringTag($Symbol, SYMBOL);
hiddenKeys[HIDDEN] = true;
var defineProperty$3 = objectDefineProperty.f;
var NativeSymbol = global_1.Symbol;

if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) || // Safari 12 bug
NativeSymbol().description !== undefined)) {
  var EmptyStringDescriptionStore = {}; // wrap Symbol constructor for correct work with undefined description

  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper ? new NativeSymbol(description) // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
    : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };

  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;
  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty$3(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  _export({
    global: true,
    forced: true
  }, {
    Symbol: SymbolWrapper
  });
} // `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator


defineWellKnownSymbol('iterator');
var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

if (ArrayPrototype[UNSCOPABLES] == undefined) {
  createNonEnumerableProperty(ArrayPrototype, UNSCOPABLES, objectCreate(null));
} // add a key to Array.prototype[@@unscopables]


var addToUnscopables = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

var iterators = {};
var correctPrototypeGetter = !fails(function () {
  function F() {
    /* empty */
  }

  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});
var IE_PROTO$1 = sharedKey('IE_PROTO');
var ObjectPrototype$1 = Object.prototype; // `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof

var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];

  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }

  return O instanceof Object ? ObjectPrototype$1 : null;
};
var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () {
  return this;
}; // `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object


var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;else {
    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

if (!has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};
var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;

var returnThis$1 = function () {
  return this;
};

var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, {
    next: createPropertyDescriptor(1, next)
  });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
  iterators[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var aPossiblePrototype = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  }

  return it;
}; // `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.

/* eslint-disable no-proto */


var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;

  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) {
    /* empty */
  }

  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
    return O;
  };
}() : undefined);
var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$1 = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis$2 = function () {
  return this;
};

var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];

    switch (KIND) {
      case KEYS:
        return function keys() {
          return new IteratorConstructor(this, KIND);
        };

      case VALUES:
        return function values() {
          return new IteratorConstructor(this, KIND);
        };

      case ENTRIES:
        return function entries() {
          return new IteratorConstructor(this, KIND);
        };
    }

    return function () {
      return new IteratorConstructor(this);
    };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$1] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY; // fix native

  if (anyNativeIterator) {
    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));

    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
      if (objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
        if (objectSetPrototypeOf) {
          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
        }
      } // Set @@toStringTag to native iterators


      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  } // fix Array#{values, @@iterator}.name in V8 / FF


  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;

    defaultIterator = function values() {
      return nativeIterator.call(this);
    };
  } // define iterator


  if (IterablePrototype[ITERATOR$1] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
  }

  iterators[NAME] = defaultIterator; // export additional methods

  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else _export({
      target: NAME,
      proto: true,
      forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME
    }, methods);
  }

  return methods;
};

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$1 = internalState.set;
var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator

var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState$1(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated),
    // target
    index: 0,
    // next index
    kind: kind // kind

  }); // `%ArrayIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$1(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;

  if (!target || index >= target.length) {
    state.target = undefined;
    return {
      value: undefined,
      done: true
    };
  }

  if (kind == 'keys') return {
    value: index,
    done: false
  };
  if (kind == 'values') return {
    value: target[index],
    done: false
  };
  return {
    value: [index, target[index]],
    done: false
  };
}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject

iterators.Arguments = iterators.Array; // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
var nativeAssign = Object.assign; // `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
// should work with symbols and should have deterministic property order (V8 bug)

var objectAssign = !nativeAssign || fails(function () {
  var A = {};
  var B = {}; // eslint-disable-next-line no-undef

  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) {
    B[chr] = chr;
  });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  var propertyIsEnumerable = objectPropertyIsEnumerable.f;

  while (argumentsLength > index) {
    var S = indexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;

    while (length > j) {
      key = keys[j++];
      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  }

  return T;
} : nativeAssign; // `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign

_export({
  target: 'Object',
  stat: true,
  forced: Object.assign !== objectAssign
}, {
  assign: objectAssign
});

var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag'); // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


var classof = function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$1)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG$2] = 'z'; // `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring

var objectToString = String(test) !== '[object z]' ? function toString() {
  return '[object ' + classof(this) + ']';
} : test.toString;
var ObjectPrototype$2 = Object.prototype; // `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring

if (objectToString !== ObjectPrototype$2.toString) {
  redefine(ObjectPrototype$2, 'toString', objectToString, {
    unsafe: true
  });
}

var freezing = !fails(function () {
  return Object.isExtensible(Object.preventExtensions({}));
});
var internalMetadata = createCommonjsModule(function (module) {
  var defineProperty = objectDefineProperty.f;
  var METADATA = uid('meta');
  var id = 0;

  var isExtensible = Object.isExtensible || function () {
    return true;
  };

  var setMetadata = function (it) {
    defineProperty(it, METADATA, {
      value: {
        objectID: 'O' + ++id,
        // object ID
        weakData: {} // weak collections IDs

      }
    });
  };

  var fastKey = function (it, create) {
    // return a primitive with prefix
    if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

    if (!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return 'F'; // not necessary to add metadata

      if (!create) return 'E'; // add missing metadata

      setMetadata(it); // return object ID
    }

    return it[METADATA].objectID;
  };

  var getWeakData = function (it, create) {
    if (!has(it, METADATA)) {
      // can't set metadata to uncaught frozen object
      if (!isExtensible(it)) return true; // not necessary to add metadata

      if (!create) return false; // add missing metadata

      setMetadata(it); // return the store of weak collections IDs
    }

    return it[METADATA].weakData;
  }; // add metadata on freeze-family methods calling


  var onFreeze = function (it) {
    if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
    return it;
  };

  var meta = module.exports = {
    REQUIRED: false,
    fastKey: fastKey,
    getWeakData: getWeakData,
    onFreeze: onFreeze
  };
  hiddenKeys[METADATA] = true;
});
var ITERATOR$2 = wellKnownSymbol('iterator');
var ArrayPrototype$1 = Array.prototype; // check on default Array iterator

var isArrayIteratorMethod = function (it) {
  return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR$2] === it);
};

var ITERATOR$3 = wellKnownSymbol('iterator');

var getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR$3] || it['@@iterator'] || iterators[classof(it)];
}; // call something on iterator step with safe closing on error


var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};

var iterate_1 = createCommonjsModule(function (module) {
  var Result = function (stopped, result) {
    this.stopped = stopped;
    this.result = result;
  };

  var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
    var boundFunction = bindContext(fn, that, AS_ENTRIES ? 2 : 1);
    var iterator, iterFn, index, length, result, next, step;

    if (IS_ITERATOR) {
      iterator = iterable;
    } else {
      iterFn = getIteratorMethod(iterable);
      if (typeof iterFn != 'function') throw TypeError('Target is not iterable'); // optimisation for array iterators

      if (isArrayIteratorMethod(iterFn)) {
        for (index = 0, length = toLength(iterable.length); length > index; index++) {
          result = AS_ENTRIES ? boundFunction(anObject(step = iterable[index])[0], step[1]) : boundFunction(iterable[index]);
          if (result && result instanceof Result) return result;
        }

        return new Result(false);
      }

      iterator = iterFn.call(iterable);
    }

    next = iterator.next;

    while (!(step = next.call(iterator)).done) {
      result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
      if (typeof result == 'object' && result && result instanceof Result) return result;
    }

    return new Result(false);
  };

  iterate.stop = function (result) {
    return new Result(true, result);
  };
});

var anInstance = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  }

  return it;
};

var ITERATOR$4 = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return {
        done: !!called++
      };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };

  iteratorWithReturn[ITERATOR$4] = function () {
    return this;
  }; // eslint-disable-next-line no-throw-literal


  Array.from(iteratorWithReturn, function () {
    throw 2;
  });
} catch (error) {
  /* empty */
}

var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;

  try {
    var object = {};

    object[ITERATOR$4] = function () {
      return {
        next: function () {
          return {
            done: ITERATION_SUPPORT = true
          };
        }
      };
    };

    exec(object);
  } catch (error) {
    /* empty */
  }

  return ITERATION_SUPPORT;
}; // makes subclassing work correct for wrapped built-ins


var inheritIfRequired = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if ( // it can work only with native `setPrototypeOf`
  objectSetPrototypeOf && // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
  typeof (NewTarget = dummy.constructor) == 'function' && NewTarget !== Wrapper && isObject(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype) objectSetPrototypeOf($this, NewTargetPrototype);
  return $this;
};

var collection = function (CONSTRUCTOR_NAME, wrapper, common, IS_MAP, IS_WEAK) {
  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
  var Constructor = NativeConstructor;
  var ADDER = IS_MAP ? 'set' : 'add';
  var exported = {};

  var fixMethod = function (KEY) {
    var nativeMethod = NativePrototype[KEY];
    redefine(NativePrototype, KEY, KEY == 'add' ? function add(value) {
      nativeMethod.call(this, value === 0 ? 0 : value);
      return this;
    } : KEY == 'delete' ? function (key) {
      return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
    } : KEY == 'get' ? function get(key) {
      return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
    } : KEY == 'has' ? function has(key) {
      return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
    } : function set(key, value) {
      nativeMethod.call(this, key === 0 ? 0 : key, value);
      return this;
    });
  }; // eslint-disable-next-line max-len


  if (isForced_1(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
    new NativeConstructor().entries().next();
  })))) {
    // create collection constructor
    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
    internalMetadata.REQUIRED = true;
  } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
    var instance = new Constructor(); // early implementations not supports chaining

    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance; // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false

    var THROWS_ON_PRIMITIVES = fails(function () {
      instance.has(1);
    }); // most early implementations doesn't supports iterables, most modern - not close it correctly
    // eslint-disable-next-line no-new

    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) {
      new NativeConstructor(iterable);
    }); // for early implementations -0 and +0 not the same

    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new NativeConstructor();
      var index = 5;

      while (index--) $instance[ADDER](index, index);

      return !$instance.has(-0);
    });

    if (!ACCEPT_ITERABLES) {
      Constructor = wrapper(function (dummy, iterable) {
        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
        if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
        return that;
      });
      Constructor.prototype = NativePrototype;
      NativePrototype.constructor = Constructor;
    }

    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }

    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER); // weak collections should not contains .clear method

    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
  }

  exported[CONSTRUCTOR_NAME] = Constructor;

  _export({
    global: true,
    forced: Constructor != NativeConstructor
  }, exported);

  setToStringTag(Constructor, CONSTRUCTOR_NAME);
  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
  return Constructor;
};

var redefineAll = function (target, src, options) {
  for (var key in src) redefine(target, key, src[key], options);

  return target;
};

var SPECIES$3 = wellKnownSymbol('species');

var setSpecies = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = objectDefineProperty.f;

  if (descriptors && Constructor && !Constructor[SPECIES$3]) {
    defineProperty(Constructor, SPECIES$3, {
      configurable: true,
      get: function () {
        return this;
      }
    });
  }
};

var defineProperty$4 = objectDefineProperty.f;
var fastKey = internalMetadata.fastKey;
var setInternalState$2 = internalState.set;
var internalStateGetterFor = internalState.getterFor;
var collectionStrong = {
  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, CONSTRUCTOR_NAME);
      setInternalState$2(that, {
        type: CONSTRUCTOR_NAME,
        index: objectCreate(null),
        first: undefined,
        last: undefined,
        size: 0
      });
      if (!descriptors) that.size = 0;
      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
    });
    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

    var define = function (that, key, value) {
      var state = getInternalState(that);
      var entry = getEntry(that, key);
      var previous, index; // change existing entry

      if (entry) {
        entry.value = value; // create new entry
      } else {
        state.last = entry = {
          index: index = fastKey(key, true),
          key: key,
          value: value,
          previous: previous = state.last,
          next: undefined,
          removed: false
        };
        if (!state.first) state.first = entry;
        if (previous) previous.next = entry;
        if (descriptors) state.size++;else that.size++; // add to index

        if (index !== 'F') state.index[index] = entry;
      }

      return that;
    };

    var getEntry = function (that, key) {
      var state = getInternalState(that); // fast case

      var index = fastKey(key);
      var entry;
      if (index !== 'F') return state.index[index]; // frozen object case

      for (entry = state.first; entry; entry = entry.next) {
        if (entry.key == key) return entry;
      }
    };

    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        var that = this;
        var state = getInternalState(that);
        var data = state.index;
        var entry = state.first;

        while (entry) {
          entry.removed = true;
          if (entry.previous) entry.previous = entry.previous.next = undefined;
          delete data[entry.index];
          entry = entry.next;
        }

        state.first = state.last = undefined;
        if (descriptors) state.size = 0;else that.size = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = this;
        var state = getInternalState(that);
        var entry = getEntry(that, key);

        if (entry) {
          var next = entry.next;
          var prev = entry.previous;
          delete state.index[entry.index];
          entry.removed = true;
          if (prev) prev.next = next;
          if (next) next.previous = prev;
          if (state.first == entry) state.first = next;
          if (state.last == entry) state.last = prev;
          if (descriptors) state.size--;else that.size--;
        }

        return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn
      /* , that = undefined */
      ) {
        var state = getInternalState(this);
        var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;

        while (entry = entry ? entry.next : state.first) {
          boundFunction(entry.value, entry.key, this); // revert to the last existing entry

          while (entry && entry.removed) entry = entry.previous;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(this, key);
      }
    });
    redefineAll(C.prototype, IS_MAP ? {
      // 23.1.3.6 Map.prototype.get(key)
      get: function get(key) {
        var entry = getEntry(this, key);
        return entry && entry.value;
      },
      // 23.1.3.9 Map.prototype.set(key, value)
      set: function set(key, value) {
        return define(this, key === 0 ? 0 : key, value);
      }
    } : {
      // 23.2.3.1 Set.prototype.add(value)
      add: function add(value) {
        return define(this, value = value === 0 ? 0 : value, value);
      }
    });
    if (descriptors) defineProperty$4(C.prototype, 'size', {
      get: function () {
        return getInternalState(this).size;
      }
    });
    return C;
  },
  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME); // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11

    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
      setInternalState$2(this, {
        type: ITERATOR_NAME,
        target: iterated,
        state: getInternalCollectionState(iterated),
        kind: kind,
        last: undefined
      });
    }, function () {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var entry = state.last; // revert to the last existing entry

      while (entry && entry.removed) entry = entry.previous; // get next entry


      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
        // or finish the iteration
        state.target = undefined;
        return {
          value: undefined,
          done: true
        };
      } // return step by kind


      if (kind == 'keys') return {
        value: entry.key,
        done: false
      };
      if (kind == 'values') return {
        value: entry.value,
        done: false
      };
      return {
        value: [entry.key, entry.value],
        done: false
      };
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true); // add [@@species], 23.1.2.2, 23.2.2.2

    setSpecies(CONSTRUCTOR_NAME);
  }
}; // `Set` constructor
// https://tc39.github.io/ecma262/#sec-set-objects

var es_set = collection('Set', function (get) {
  return function Set() {
    return get(this, arguments.length ? arguments[0] : undefined);
  };
}, collectionStrong); // `String.prototype.{ codePointAt, at }` methods implementation

var createMethod$2 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$2(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$2(true)
};
var charAt = stringMultibyte.charAt;
var STRING_ITERATOR = 'String Iterator';
var setInternalState$3 = internalState.set;
var getInternalState$2 = internalState.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator

defineIterator(String, 'String', function (iterated) {
  setInternalState$3(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  }); // `%StringIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState$2(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return {
    value: undefined,
    done: true
  };
  point = charAt(string, index);
  state.index += point.length;
  return {
    value: point,
    done: false
  };
}); // iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods

var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};
var ITERATOR$5 = wellKnownSymbol('iterator');
var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
var ArrayValues = es_array_iterator.values;

for (var COLLECTION_NAME in domIterables) {
  var Collection = global_1[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;

  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR$5] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR$5, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR$5] = ArrayValues;
    }

    if (!CollectionPrototype[TO_STRING_TAG$3]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
    }

    if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
      }
    }
  }
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

var methods = {};
var names = [];

function registerMethods(name, m) {
  if (Array.isArray(name)) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = name[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _name = _step.value;
        registerMethods(_name, m);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return;
  }

  if (_typeof(name) === 'object') {
    for (var _name2 in name) {
      registerMethods(_name2, name[_name2]);
    }

    return;
  }

  addMethodNames(Object.getOwnPropertyNames(m));
  methods[name] = Object.assign(methods[name] || {}, m);
}

function getMethodsFor(name) {
  return methods[name] || {};
}

function getMethodNames() {
  return _toConsumableArray(new Set(names));
}

function addMethodNames(_names) {
  names.push.apply(names, _toConsumableArray(_names));
}

var $includes = arrayIncludes.includes; // `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes

_export({
  target: 'Array',
  proto: true
}, {
  includes: function includes(el
  /* , fromIndex = 0 */
  ) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables


addToUnscopables('includes'); // `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags

var regexpFlags = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

var nativeExec = RegExp.prototype.exec; // This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.

var nativeReplace = String.prototype.replace;
var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
}(); // nonparticipating capturing group, copied from es5-shim's String#split patch.


var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }

    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;
    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }

    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

var regexpExec = patchedExec;

_export({
  target: 'RegExp',
  proto: true,
  forced: /./.exec !== regexpExec
}, {
  exec: regexpExec
});

var MATCH = wellKnownSymbol('match'); // `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp

var isRegexp = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
};

var notARegexp = function (it) {
  if (isRegexp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  }

  return it;
};

var MATCH$1 = wellKnownSymbol('match');

var correctIsRegexpLogic = function (METHOD_NAME) {
  var regexp = /./;

  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH$1] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) {
      /* empty */
    }
  }

  return false;
}; // `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes


_export({
  target: 'String',
  proto: true,
  forced: !correctIsRegexpLogic('includes')
}, {
  includes: function includes(searchString
  /* , position = 0 */
  ) {
    return !!~String(requireObjectCoercible(this)).indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});

var SPECIES$4 = wellKnownSymbol('species');
var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;

  re.exec = function () {
    var result = [];
    result.groups = {
      a: '7'
    };
    return result;
  };

  return ''.replace(re, '$<a>') !== '7';
}); // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;

  re.exec = function () {
    return originalExec.apply(this, arguments);
  };

  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);
  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};

    O[SYMBOL] = function () {
      return 7;
    };

    return ''[KEY](O) != 7;
  });
  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {}; // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.

      re.constructor = {};

      re.constructor[SPECIES$4] = function () {
        return re;
      };

      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () {
      execCalled = true;
      return null;
    };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return {
            done: true,
            value: nativeRegExpMethod.call(regexp, str, arg2)
          };
        }

        return {
          done: true,
          value: nativeMethod.call(str, regexp, arg2)
        };
      }

      return {
        done: false
      };
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];
    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
    ? function (string, arg) {
      return regexMethod.call(string, this, arg);
    } // 21.2.5.6 RegExp.prototype[@@match](string)
    // 21.2.5.9 RegExp.prototype[@@search](string)
    : function (string) {
      return regexMethod.call(string, this);
    });
    if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
  }
};

var charAt$1 = stringMultibyte.charAt; // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex

var advanceStringIndex = function (S, index, unicode) {
  return index + (unicode ? charAt$1(S, index).length : 1);
}; // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec


var regexpExecAbstract = function (R, S) {
  var exec = R.exec;

  if (typeof exec === 'function') {
    var result = exec.call(R, S);

    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }

    return result;
  }

  if (classofRaw(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};

var max$2 = Math.max;
var min$2 = Math.min;
var floor$1 = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
}; // @@replace logic


fixRegexpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative) {
  return [// `String.prototype.replace` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.replace
  function replace(searchValue, replaceValue) {
    var O = requireObjectCoercible(this);
    var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
    return replacer !== undefined ? replacer.call(searchValue, O, replaceValue) : nativeReplace.call(String(O), searchValue, replaceValue);
  }, // `RegExp.prototype[@@replace]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
  function (regexp, replaceValue) {
    var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    var functionalReplace = typeof replaceValue === 'function';
    if (!functionalReplace) replaceValue = String(replaceValue);
    var global = rx.global;

    if (global) {
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
    }

    var results = [];

    while (true) {
      var result = regexpExecAbstract(rx, S);
      if (result === null) break;
      results.push(result);
      if (!global) break;
      var matchStr = String(result[0]);
      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
    }

    var accumulatedResult = '';
    var nextSourcePosition = 0;

    for (var i = 0; i < results.length; i++) {
      result = results[i];
      var matched = String(result[0]);
      var position = max$2(min$2(toInteger(result.index), S.length), 0);
      var captures = []; // NOTE: This is equivalent to
      //   captures = result.slice(1).map(maybeToString)
      // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
      // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
      // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

      for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));

      var namedCaptures = result.groups;

      if (functionalReplace) {
        var replacerArgs = [matched].concat(captures, position, S);
        if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
        var replacement = String(replaceValue.apply(undefined, replacerArgs));
      } else {
        replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
      }

      if (position >= nextSourcePosition) {
        accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
        nextSourcePosition = position + matched.length;
      }
    }

    return accumulatedResult + S.slice(nextSourcePosition);
  }]; // https://tc39.github.io/ecma262/#sec-getsubstitution

  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }

    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;

      switch (ch.charAt(0)) {
        case '$':
          return '$';

        case '&':
          return matched;

        case '`':
          return str.slice(0, position);

        case "'":
          return str.slice(tailPos);

        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;

        default:
          // \d\d?
          var n = +ch;
          if (n === 0) return match;

          if (n > m) {
            var f = floor$1(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }

          capture = captures[n - 1];
      }

      return capture === undefined ? '' : capture;
    });
  }
}); // a string of all valid unicode whitespaces
// eslint-disable-next-line max-len

var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$'); // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation

var createMethod$3 = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

var stringTrim = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod$3(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod$3(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod$3(3)
};
var non = '\u200B\u0085\u180E'; // check that a method works with the correct list
// of whitespaces and has a correct name

var forcedStringTrimMethod = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};

var $trim = stringTrim.trim; // `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim

_export({
  target: 'String',
  proto: true,
  forced: forcedStringTrimMethod('trim')
}, {
  trim: function trim() {
    return $trim(this);
  }
}); // Map function


function map(array, block) {
  var i;
  var il = array.length;
  var result = [];

  for (i = 0; i < il; i++) {
    result.push(block(array[i]));
  }

  return result;
} // Filter function


function filter(array, block) {
  var i;
  var il = array.length;
  var result = [];

  for (i = 0; i < il; i++) {
    if (block(array[i])) {
      result.push(array[i]);
    }
  }

  return result;
} // Degrees to radians


function radians(d) {
  return d % 360 * Math.PI / 180;
} // Radians to degrees


function degrees(r) {
  return r * 180 / Math.PI % 360;
} // Convert dash-separated-string to camelCase


function camelCase(s) {
  return s.toLowerCase().replace(/-(.)/g, function (m, g) {
    return g.toUpperCase();
  });
} // Convert camel cased string to string seperated


function unCamelCase(s) {
  return s.replace(/([A-Z])/g, function (m, g) {
    return '-' + g.toLowerCase();
  });
} // Capitalize first letter of a string


function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
} // Calculate proportional width and height values when necessary


function proportionalSize(element, width, height, box) {
  if (width == null || height == null) {
    box = box || element.bbox();

    if (width == null) {
      width = box.width / box.height * height;
    } else if (height == null) {
      height = box.height / box.width * width;
    }
  }

  return {
    width: width,
    height: height
  };
}

function getOrigin(o, element) {
  // Allow origin or around as the names
  var origin = o.origin; // o.around == null ? o.origin : o.around

  var ox, oy; // Allow the user to pass a string to rotate around a given point

  if (typeof origin === 'string' || origin == null) {
    // Get the bounding box of the element with no transformations applied
    var string = (origin || 'center').toLowerCase().trim();

    var _element$bbox = element.bbox(),
        height = _element$bbox.height,
        width = _element$bbox.width,
        x = _element$bbox.x,
        y = _element$bbox.y; // Calculate the transformed x and y coordinates


    var bx = string.includes('left') ? x : string.includes('right') ? x + width : x + width / 2;
    var by = string.includes('top') ? y : string.includes('bottom') ? y + height : y + height / 2; // Set the bounds eg : "bottom-left", "Top right", "middle" etc...

    ox = o.ox != null ? o.ox : bx;
    oy = o.oy != null ? o.oy : by;
  } else {
    ox = origin[0];
    oy = origin[1];
  } // Return the origin as it is if it wasn't a string


  return [ox, oy];
}

var utils = {
  __proto__: null,
  map: map,
  filter: filter,
  radians: radians,
  degrees: degrees,
  camelCase: camelCase,
  unCamelCase: unCamelCase,
  capitalize: capitalize,
  proportionalSize: proportionalSize,
  getOrigin: getOrigin
}; // Default namespaces

exports.utils = utils;
var ns = 'http://www.w3.org/2000/svg';
var xmlns = 'http://www.w3.org/2000/xmlns/';
var xlink = 'http://www.w3.org/1999/xlink';
var svgjs = 'http://svgjs.com/svgjs';
var namespaces = {
  __proto__: null,
  ns: ns,
  xmlns: xmlns,
  xlink: xlink,
  svgjs: svgjs
};
exports.namespaces = namespaces;
var globals = {
  window: typeof window === 'undefined' ? null : window,
  document: typeof document === 'undefined' ? null : document
};

function registerWindow() {
  var win = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var doc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  globals.window = win;
  globals.document = doc;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Base = function Base() {
  _classCallCheck(this, Base);
};

var elements = {};
var root = '___SYMBOL___ROOT___'; // Method for element creation

exports.root = root;

function create(name) {
  // create element
  return globals.document.createElementNS(ns, name);
}

function makeInstance(element) {
  if (element instanceof Base) return element;

  if (_typeof(element) === 'object') {
    return adopter(element);
  }

  if (element == null) {
    return new elements[root]();
  }

  if (typeof element === 'string' && element.charAt(0) !== '<') {
    return adopter(globals.document.querySelector(element));
  }

  var node = create('svg');
  node.innerHTML = element; // We can use firstChild here because we know,
  // that the first char is < and thus an element

  element = adopter(node.firstChild);
  return element;
}

function nodeOrNew(name, node) {
  return node instanceof globals.window.Node ? node : create(name);
} // Adopt existing svg elements


function adopt(node) {
  // check for presence of node
  if (!node) return null; // make sure a node isn't already adopted

  if (node.instance instanceof Base) return node.instance; // initialize variables

  var className = capitalize(node.nodeName || 'Dom'); // Make sure that gradients are adopted correctly

  if (className === 'LinearGradient' || className === 'RadialGradient') {
    className = 'Gradient'; // Fallback to Dom if element is not known
  } else if (!elements[className]) {
    className = 'Dom';
  }

  return new elements[className](node);
}

var adopter = adopt;

function mockAdopt() {
  var mock = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : adopt;
  adopter = mock;
}

function register(element) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : element.name;
  var asRoot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  elements[name] = element;
  if (asRoot) elements[root] = element;
  addMethodNames(Object.getOwnPropertyNames(element.prototype));
  return element;
}

function getClass(name) {
  return elements[name];
} // Element id sequence


var did = 1000; // Get next named element id

function eid(name) {
  return 'Svgjs' + capitalize(name) + did++;
} // Deep new id assignment


function assignNewId(node) {
  // do the same for SVG child nodes as well
  for (var i = node.children.length - 1; i >= 0; i--) {
    assignNewId(node.children[i]);
  }

  if (node.id) {
    return adopt(node).id(eid(node.nodeName));
  }

  return adopt(node);
} // Method for extending objects


function extend(modules, methods, attrCheck) {
  var key, i;
  modules = Array.isArray(modules) ? modules : [modules];

  for (i = modules.length - 1; i >= 0; i--) {
    for (key in methods) {
      var method = methods[key];

      if (attrCheck) {
        method = wrapWithAttrCheck(methods[key]);
      }

      modules[i].prototype[key] = method;
    }
  }
} // export function extendWithAttrCheck (...args) {
//   extend(...args, true)
// }


function wrapWithAttrCheck(fn) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var o = args[args.length - 1];

    if (o && o.constructor === Object && !(o instanceof Array)) {
      return fn.apply(this, args.slice(0, -1)).attr(o);
    } else {
      return fn.apply(this, args);
    }
  };
}

function invent(config) {
  // Create element initializer
  var initializer = typeof config.create === 'function' ? config.create : function (node) {
    this.constructor(node || create(config.create));
  }; // Inherit prototype

  if (config.inherit) {
    /* eslint new-cap: off */
    initializer.prototype = new config.inherit();
    initializer.prototype.constructor = initializer;
  } // Extend with methods


  if (config.extend) {
    extend(initializer, config.extend);
  } // Attach construct method to parent


  if (config.construct) {
    extend(config.parent || elements.Container, config.construct);
  }

  return initializer;
}

function siblings() {
  return this.parent().children();
} // Get the curent position siblings


function position() {
  return this.parent().index(this);
} // Get the next element (will return null if there is none)


function next() {
  return this.siblings()[this.position() + 1];
} // Get the next element (will return null if there is none)


function prev() {
  return this.siblings()[this.position() - 1];
} // Send given element one step forward


function forward() {
  var i = this.position() + 1;
  var p = this.parent(); // move node one step forward

  p.removeElement(this).add(this, i); // make sure defs node is always at the top

  if (typeof p.isRoot === 'function' && p.isRoot()) {
    p.node.appendChild(p.defs().node);
  }

  return this;
} // Send given element one step backward


function backward() {
  var i = this.position();

  if (i > 0) {
    this.parent().removeElement(this).add(this, i - 1);
  }

  return this;
} // Send given element all the way to the front


function front() {
  var p = this.parent(); // Move node forward

  p.node.appendChild(this.node); // Make sure defs node is always at the top

  if (typeof p.isRoot === 'function' && p.isRoot()) {
    p.node.appendChild(p.defs().node);
  }

  return this;
} // Send given element all the way to the back


function back() {
  if (this.position() > 0) {
    this.parent().removeElement(this).add(this, 0);
  }

  return this;
} // Inserts a given element before the targeted element


function before(element) {
  element = makeInstance(element);
  element.remove();
  var i = this.position();
  this.parent().add(element, i);
  return this;
} // Inserts a given element after the targeted element


function after(element) {
  element = makeInstance(element);
  element.remove();
  var i = this.position();
  this.parent().add(element, i + 1);
  return this;
}

function insertBefore(element) {
  element = makeInstance(element);
  element.before(this);
  return this;
}

function insertAfter(element) {
  element = makeInstance(element);
  element.after(this);
  return this;
}

registerMethods('Dom', {
  siblings: siblings,
  position: position,
  next: next,
  prev: prev,
  forward: forward,
  backward: backward,
  front: front,
  back: back,
  before: before,
  after: after,
  insertBefore: insertBefore,
  insertAfter: insertAfter
});
var $filter = arrayIteration.filter; // `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species

_export({
  target: 'Array',
  proto: true,
  forced: !arrayMethodHasSpeciesSupport('filter')
}, {
  filter: function filter(callbackfn
  /* , thisArg */
  ) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var sloppyArrayMethod = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !method || !fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () {
      throw 1;
    }, 1);
  });
};

var $indexOf = arrayIncludes.indexOf;
var nativeIndexOf = [].indexOf;
var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var SLOPPY_METHOD = sloppyArrayMethod('indexOf'); // `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof

_export({
  target: 'Array',
  proto: true,
  forced: NEGATIVE_ZERO || SLOPPY_METHOD
}, {
  indexOf: function indexOf(searchElement
  /* , fromIndex = 0 */
  ) {
    return NEGATIVE_ZERO // convert -0 to +0
    ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var nativeJoin = [].join;
var ES3_STRINGS = indexedObject != Object;
var SLOPPY_METHOD$1 = sloppyArrayMethod('join', ','); // `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join

_export({
  target: 'Array',
  proto: true,
  forced: ES3_STRINGS || SLOPPY_METHOD$1
}, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});

var SPECIES$5 = wellKnownSymbol('species'); // `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor

var speciesConstructor = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES$5]) == undefined ? defaultConstructor : aFunction$1(S);
};

var arrayPush = [].push;
var min$3 = Math.min;
var MAX_UINT32 = 0xFFFFFFFF; // babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError

var SUPPORTS_Y = !fails(function () {
  return !RegExp(MAX_UINT32, 'y');
}); // @@split logic

fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;

  if ('abbc'.split(/(b)*/)[1] == 'c' || 'test'.split(/(?:)/, -1).length != 4 || 'ab'.split(/(?:ab)*/).length != 2 || '.'.split(/(.?)(.?)/).length != 4 || '.'.split(/()()/).length > 1 || ''.split(/.?/).length) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string]; // If `separator` is not a regex, use native split

      if (!isRegexp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }

      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
      var lastLastIndex = 0; // Make `global` and avoid `lastIndex` issues by working with a copy

      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;

      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;

        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }

        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }

      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));

      return output.length > lim ? output.slice(0, lim) : output;
    }; // Chakra, V8

  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [// `String.prototype.split` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.split
  function split(separator, limit) {
    var O = requireObjectCoercible(this);
    var splitter = separator == undefined ? undefined : separator[SPLIT];
    return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
  }, // `RegExp.prototype[@@split]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
  //
  // NOTE: This cannot be properly polyfilled in engines that don't support
  // the 'y' flag.
  function (regexp, limit) {
    var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    var C = speciesConstructor(rx, RegExp);
    var unicodeMatching = rx.unicode;
    var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (SUPPORTS_Y ? 'y' : 'g'); // ^(? + rx + ) is needed, in combination with some S slicing, to
    // simulate the 'y' flag.

    var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
    var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
    if (lim === 0) return [];
    if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
    var p = 0;
    var q = 0;
    var A = [];

    while (q < S.length) {
      splitter.lastIndex = SUPPORTS_Y ? q : 0;
      var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
      var e;

      if (z === null || (e = min$3(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
        q = advanceStringIndex(S, q, unicodeMatching);
      } else {
        A.push(S.slice(p, q));
        if (A.length === lim) return A;

        for (var i = 1; i <= z.length - 1; i++) {
          A.push(z[i]);
          if (A.length === lim) return A;
        }

        q = p = e;
      }
    }

    A.push(S.slice(p));
    return A;
  }];
}, !SUPPORTS_Y); // Parse unit value

var numberAndUnit = /^([+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?)([a-z%]*)$/i; // Parse hex value

var hex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i; // Parse rgb value

var rgb = /rgb\((\d+),(\d+),(\d+)\)/; // Parse reference id

var reference = /(#[a-z0-9\-_]+)/i; // splits a transformation chain

var transforms = /\)\s*,?\s*/; // Whitespace

var whitespace$1 = /\s/g; // Test hex value

var isHex = /^#[a-f0-9]{3,6}$/i; // Test rgb value

var isRgb = /^rgb\(/; // Test css declaration

var isCss = /[^:]+:[^;]+;?/; // Test for blank string

var isBlank = /^(\s+)?$/; // Test for numeric string

var isNumber = /^[+-]?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i; // Test for percent value

var isPercent = /^-?[\d.]+%$/; // Test for image url

var isImage = /\.(jpg|jpeg|png|gif|svg)(\?[^=]+.*)?/i; // split at whitespace and comma

var delimiter = /[\s,]+/; // The following regex are used to parse the d attribute of a path
// Matches all hyphens which are not after an exponent

var hyphen = /([^e])-/gi; // Replaces and tests for all path letters

var pathLetters = /[MLHVCSQTAZ]/gi; // yes we need this one, too

var isPathLetter = /[MLHVCSQTAZ]/i; // matches 0.154.23.45

var numbersWithDots = /((\d?\.\d+(?:e[+-]?\d+)?)((?:\.\d+(?:e[+-]?\d+)?)+))+/gi; // matches .

var dots = /\./g;
var regex = {
  __proto__: null,
  numberAndUnit: numberAndUnit,
  hex: hex,
  rgb: rgb,
  reference: reference,
  transforms: transforms,
  whitespace: whitespace$1,
  isHex: isHex,
  isRgb: isRgb,
  isCss: isCss,
  isBlank: isBlank,
  isNumber: isNumber,
  isPercent: isPercent,
  isImage: isImage,
  delimiter: delimiter,
  hyphen: hyphen,
  pathLetters: pathLetters,
  isPathLetter: isPathLetter,
  numbersWithDots: numbersWithDots,
  dots: dots
};
exports.regex = regex;

function classes() {
  var attr = this.attr('class');
  return attr == null ? [] : attr.trim().split(delimiter);
} // Return true if class exists on the node, false otherwise


function hasClass(name) {
  return this.classes().indexOf(name) !== -1;
} // Add class to the node


function addClass(name) {
  if (!this.hasClass(name)) {
    var array = this.classes();
    array.push(name);
    this.attr('class', array.join(' '));
  }

  return this;
} // Remove class from the node


function removeClass(name) {
  if (this.hasClass(name)) {
    this.attr('class', this.classes().filter(function (c) {
      return c !== name;
    }).join(' '));
  }

  return this;
} // Toggle the presence of a class on the node


function toggleClass(name) {
  return this.hasClass(name) ? this.removeClass(name) : this.addClass(name);
}

registerMethods('Dom', {
  classes: classes,
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass
});
var $forEach$1 = arrayIteration.forEach; // `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach

var arrayForEach = sloppyArrayMethod('forEach') ? function forEach(callbackfn
/* , thisArg */
) {
  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach; // `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach

_export({
  target: 'Array',
  proto: true,
  forced: [].forEach != arrayForEach
}, {
  forEach: arrayForEach
});

for (var COLLECTION_NAME$1 in domIterables) {
  var Collection$1 = global_1[COLLECTION_NAME$1];
  var CollectionPrototype$1 = Collection$1 && Collection$1.prototype; // some Chrome versions have non-configurable methods on DOMTokenList

  if (CollectionPrototype$1 && CollectionPrototype$1.forEach !== arrayForEach) try {
    createNonEnumerableProperty(CollectionPrototype$1, 'forEach', arrayForEach);
  } catch (error) {
    CollectionPrototype$1.forEach = arrayForEach;
  }
}

function css(style, val) {
  var ret = {};

  if (arguments.length === 0) {
    // get full style as object
    this.node.style.cssText.split(/\s*;\s*/).filter(function (el) {
      return !!el.length;
    }).forEach(function (el) {
      var t = el.split(/\s*:\s*/);
      ret[t[0]] = t[1];
    });
    return ret;
  }

  if (arguments.length < 2) {
    // get style properties in the array
    if (Array.isArray(style)) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = style[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var name = _step.value;
          var cased = camelCase(name);
          ret[cased] = this.node.style[cased];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return ret;
    } // get style for property


    if (typeof style === 'string') {
      return this.node.style[camelCase(style)];
    } // set styles in object


    if (_typeof(style) === 'object') {
      for (var _name in style) {
        // set empty string if null/undefined/'' was given
        this.node.style[camelCase(_name)] = style[_name] == null || isBlank.test(style[_name]) ? '' : style[_name];
      }
    }
  } // set style for property


  if (arguments.length === 2) {
    this.node.style[camelCase(style)] = val == null || isBlank.test(val) ? '' : val;
  }

  return this;
} // Show element


function show() {
  return this.css('display', '');
} // Hide element


function hide() {
  return this.css('display', 'none');
} // Is element visible?


function visible() {
  return this.css('display') !== 'none';
}

registerMethods('Dom', {
  css: css,
  show: show,
  hide: hide,
  visible: visible
});

function data$1(a, v, r) {
  if (_typeof(a) === 'object') {
    for (v in a) {
      this.data(v, a[v]);
    }
  } else if (arguments.length < 2) {
    try {
      return JSON.parse(this.attr('data-' + a));
    } catch (e) {
      return this.attr('data-' + a);
    }
  } else {
    this.attr('data-' + a, v === null ? null : r === true || typeof v === 'string' || typeof v === 'number' ? v : JSON.stringify(v));
  }

  return this;
}

registerMethods('Dom', {
  data: data$1
});

function remember(k, v) {
  // remember every item in an object individually
  if (_typeof(arguments[0]) === 'object') {
    for (var key in k) {
      this.remember(key, k[key]);
    }
  } else if (arguments.length === 1) {
    // retrieve memory
    return this.memory()[k];
  } else {
    // store memory
    this.memory()[k] = v;
  }

  return this;
} // Erase a given memory


function forget() {
  if (arguments.length === 0) {
    this._memory = {};
  } else {
    for (var i = arguments.length - 1; i >= 0; i--) {
      delete this.memory()[arguments[i]];
    }
  }

  return this;
} // This triggers creation of a new hidden class which is not performant
// However, this function is not rarely used so it will not happen frequently
// Return local memory object


function memory() {
  return this._memory = this._memory || {};
}

registerMethods('Dom', {
  remember: remember,
  forget: forget,
  memory: memory
}); // `Array.prototype.{ reduce, reduceRight }` methods implementation

var createMethod$4 = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction$1(callbackfn);
    var O = toObject(that);
    var self = indexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }

      index += i;

      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }

    for (; IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }

    return memo;
  };
};

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod$4(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod$4(true)
};
var $reduce = arrayReduce.left; // `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce

_export({
  target: 'Array',
  proto: true,
  forced: sloppyArrayMethod('reduce')
}, {
  reduce: function reduce(callbackfn
  /* , initialValue */
  ) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var listenerId = 0;
var windowEvents = {};

function getEvents(instance) {
  var n = instance.getEventHolder(); // We dont want to save events in global space

  if (n === globals.window) n = windowEvents;
  if (!n.events) n.events = {};
  return n.events;
}

function getEventTarget(instance) {
  return instance.getEventTarget();
}

function clearEvents(instance) {
  var n = instance.getEventHolder();
  if (n.events) n.events = {};
} // Add event binder in the SVG namespace


function on(node, events, listener, binding, options) {
  var l = listener.bind(binding || node);
  var instance = makeInstance(node);
  var bag = getEvents(instance);
  var n = getEventTarget(instance); // events can be an array of events or a string of events

  events = Array.isArray(events) ? events : events.split(delimiter); // add id to listener

  if (!listener._svgjsListenerId) {
    listener._svgjsListenerId = ++listenerId;
  }

  events.forEach(function (event) {
    var ev = event.split('.')[0];
    var ns = event.split('.')[1] || '*'; // ensure valid object

    bag[ev] = bag[ev] || {};
    bag[ev][ns] = bag[ev][ns] || {}; // reference listener

    bag[ev][ns][listener._svgjsListenerId] = l; // add listener

    n.addEventListener(ev, l, options || false);
  });
} // Add event unbinder in the SVG namespace


function off(node, events, listener, options) {
  var instance = makeInstance(node);
  var bag = getEvents(instance);
  var n = getEventTarget(instance); // listener can be a function or a number

  if (typeof listener === 'function') {
    listener = listener._svgjsListenerId;
    if (!listener) return;
  } // events can be an array of events or a string or undefined


  events = Array.isArray(events) ? events : (events || '').split(delimiter);
  events.forEach(function (event) {
    var ev = event && event.split('.')[0];
    var ns = event && event.split('.')[1];
    var namespace, l;

    if (listener) {
      // remove listener reference
      if (bag[ev] && bag[ev][ns || '*']) {
        // removeListener
        n.removeEventListener(ev, bag[ev][ns || '*'][listener], options || false);
        delete bag[ev][ns || '*'][listener];
      }
    } else if (ev && ns) {
      // remove all listeners for a namespaced event
      if (bag[ev] && bag[ev][ns]) {
        for (l in bag[ev][ns]) {
          off(n, [ev, ns].join('.'), l);
        }

        delete bag[ev][ns];
      }
    } else if (ns) {
      // remove all listeners for a specific namespace
      for (event in bag) {
        for (namespace in bag[event]) {
          if (ns === namespace) {
            off(n, [event, ns].join('.'));
          }
        }
      }
    } else if (ev) {
      // remove all listeners for the event
      if (bag[ev]) {
        for (namespace in bag[ev]) {
          off(n, [ev, namespace].join('.'));
        }

        delete bag[ev];
      }
    } else {
      // remove all listeners on a given node
      for (event in bag) {
        off(n, event);
      }

      clearEvents(instance);
    }
  });
}

function dispatch(node, event, data) {
  var n = getEventTarget(node); // Dispatch event

  if (event instanceof globals.window.Event) {
    n.dispatchEvent(event);
  } else {
    event = new globals.window.CustomEvent(event, {
      detail: data,
      cancelable: true
    });
    n.dispatchEvent(event);
  }

  return event;
}

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679

var IS_CONCAT_SPREADABLE_SUPPORT = v8Version >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function (O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species

_export({
  target: 'Array',
  proto: true,
  forced: FORCED
}, {
  concat: function concat(arg) {
    // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;

    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];

      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }

    A.length = n;
    return A;
  }
});

var $map = arrayIteration.map; // `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species

_export({
  target: 'Array',
  proto: true,
  forced: !arrayMethodHasSpeciesSupport('map')
}, {
  map: function map(callbackfn
  /* , thisArg */
  ) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

var DatePrototype = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var nativeDateToString = DatePrototype[TO_STRING];
var getTime = DatePrototype.getTime; // `Date.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-date.prototype.tostring

if (new Date(NaN) + '' != INVALID_DATE) {
  redefine(DatePrototype, TO_STRING, function toString() {
    var value = getTime.call(this); // eslint-disable-next-line no-self-compare

    return value === value ? nativeDateToString.call(this) : INVALID_DATE;
  });
}

var trim = stringTrim.trim;
var nativeParseInt = global_1.parseInt;
var hex$1 = /^[+-]?0[Xx]/;
var FORCED$1 = nativeParseInt(whitespaces + '08') !== 8 || nativeParseInt(whitespaces + '0x16') !== 22; // `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix

var _parseInt = FORCED$1 ? function parseInt(string, radix) {
  var S = trim(String(string));
  return nativeParseInt(S, radix >>> 0 || (hex$1.test(S) ? 16 : 10));
} : nativeParseInt; // `parseInt` method
// https://tc39.github.io/ecma262/#sec-parseint-string-radix


_export({
  global: true,
  forced: parseInt != _parseInt
}, {
  parseInt: _parseInt
});

var TO_STRING$1 = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING$1];
var NOT_GENERIC = fails(function () {
  return nativeToString.call({
    source: 'a',
    flags: 'b'
  }) != '/a/b';
}); // FF44- RegExp#toString has a wrong name

var INCORRECT_NAME = nativeToString.name != TO_STRING$1; // `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring

if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING$1, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? regexpFlags.call(R) : rf);
    return '/' + p + '/' + f;
  }, {
    unsafe: true
  });
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
    return;
  }

  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function sixDigitHex(hex) {
  return hex.length === 4 ? ['#', hex.substring(1, 2), hex.substring(1, 2), hex.substring(2, 3), hex.substring(2, 3), hex.substring(3, 4), hex.substring(3, 4)].join('') : hex;
}

function componentHex(component) {
  var integer = Math.round(component);
  var bounded = Math.max(0, Math.min(255, integer));
  var hex = bounded.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

function is(object, space) {
  for (var i = space.length; i--;) {
    if (object[space[i]] == null) {
      return false;
    }
  }

  return true;
}

function getParameters(a, b) {
  var params = is(a, 'rgb') ? {
    _a: a.r,
    _b: a.g,
    _c: a.b,
    space: 'rgb'
  } : is(a, 'xyz') ? {
    _a: a.x,
    _b: a.y,
    _c: a.z,
    _d: 0,
    space: 'xyz'
  } : is(a, 'hsl') ? {
    _a: a.h,
    _b: a.s,
    _c: a.l,
    _d: 0,
    space: 'hsl'
  } : is(a, 'lab') ? {
    _a: a.l,
    _b: a.a,
    _c: a.b,
    _d: 0,
    space: 'lab'
  } : is(a, 'lch') ? {
    _a: a.l,
    _b: a.c,
    _c: a.h,
    _d: 0,
    space: 'lch'
  } : is(a, 'cmyk') ? {
    _a: a.c,
    _b: a.m,
    _c: a.y,
    _d: a.k,
    space: 'cmyk'
  } : {
    _a: 0,
    _b: 0,
    _c: 0,
    space: 'rgb'
  };
  params.space = b || params.space;
  return params;
}

function cieSpace(space) {
  if (space === 'lab' || space === 'xyz' || space === 'lch') {
    return true;
  } else {
    return false;
  }
}

function hueToRgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

var Color =
/*#__PURE__*/
function () {
  function Color() {
    _classCallCheck(this, Color);

    this.init.apply(this, arguments);
  }

  _createClass(Color, [{
    key: "init",
    value: function init() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var space = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'rgb'; // This catches the case when a falsy value is passed like ''

      a = !a ? 0 : a; // Reset all values in case the init function is rerun with new color space

      if (this.space) {
        for (var component in this.space) {
          delete this[this.space[component]];
        }
      }

      if (typeof a === 'number') {
        // Allow for the case that we don't need d...
        space = typeof d === 'string' ? d : space;
        d = typeof d === 'string' ? 0 : d; // Assign the values straight to the color

        Object.assign(this, {
          _a: a,
          _b: b,
          _c: c,
          _d: d,
          space: space
        }); // If the user gave us an array, make the color from it
      } else if (a instanceof Array) {
        this.space = b || (typeof a[3] === 'string' ? a[3] : a[4]) || 'rgb';
        Object.assign(this, {
          _a: a[0],
          _b: a[1],
          _c: a[2],
          _d: a[3] || 0
        });
      } else if (a instanceof Object) {
        // Set the object up and assign its values directly
        var values = getParameters(a, b);
        Object.assign(this, values);
      } else if (typeof a === 'string') {
        if (isRgb.test(a)) {
          var noWhitespace = a.replace(whitespace$1, '');

          var _rgb$exec$slice$map = rgb.exec(noWhitespace).slice(1, 4).map(function (v) {
            return parseInt(v);
          }),
              _rgb$exec$slice$map2 = _slicedToArray(_rgb$exec$slice$map, 3),
              _a2 = _rgb$exec$slice$map2[0],
              _b2 = _rgb$exec$slice$map2[1],
              _c2 = _rgb$exec$slice$map2[2];

          Object.assign(this, {
            _a: _a2,
            _b: _b2,
            _c: _c2,
            _d: 0,
            space: 'rgb'
          });
        } else if (isHex.test(a)) {
          var hexParse = function hexParse(v) {
            return parseInt(v, 16);
          };

          var _hex$exec$map = hex.exec(sixDigitHex(a)).map(hexParse),
              _hex$exec$map2 = _slicedToArray(_hex$exec$map, 4),
              _a3 = _hex$exec$map2[1],
              _b3 = _hex$exec$map2[2],
              _c3 = _hex$exec$map2[3];

          Object.assign(this, {
            _a: _a3,
            _b: _b3,
            _c: _c3,
            _d: 0,
            space: 'rgb'
          });
        } else throw Error('Unsupported string format, can\'t construct Color');
      } // Now add the components as a convenience


      var _a = this._a,
          _b = this._b,
          _c = this._c,
          _d = this._d;
      var components = this.space === 'rgb' ? {
        r: _a,
        g: _b,
        b: _c
      } : this.space === 'xyz' ? {
        x: _a,
        y: _b,
        z: _c
      } : this.space === 'hsl' ? {
        h: _a,
        s: _b,
        l: _c
      } : this.space === 'lab' ? {
        l: _a,
        a: _b,
        b: _c
      } : this.space === 'lch' ? {
        l: _a,
        c: _b,
        h: _c
      } : this.space === 'cmyk' ? {
        c: _a,
        m: _b,
        y: _c,
        k: _d
      } : {};
      Object.assign(this, components);
    }
    /*
    Conversion Methods
    */

  }, {
    key: "rgb",
    value: function rgb() {
      if (this.space === 'rgb') {
        return this;
      } else if (cieSpace(this.space)) {
        // Convert to the xyz color space
        var x = this.x,
            y = this.y,
            z = this.z;

        if (this.space === 'lab' || this.space === 'lch') {
          // Get the values in the lab space
          var l = this.l,
              a = this.a,
              _b4 = this.b;

          if (this.space === 'lch') {
            var c = this.c,
                h = this.h;
            var dToR = Math.PI / 180;
            a = c * Math.cos(dToR * h);
            _b4 = c * Math.sin(dToR * h);
          } // Undo the nonlinear function


          var yL = (l + 16) / 116;
          var xL = a / 500 + yL;
          var zL = yL - _b4 / 200; // Get the xyz values

          var ct = 16 / 116;
          var mx = 0.008856;
          var nm = 7.787;
          x = 0.95047 * (Math.pow(xL, 3) > mx ? Math.pow(xL, 3) : (xL - ct) / nm);
          y = 1.00000 * (Math.pow(yL, 3) > mx ? Math.pow(yL, 3) : (yL - ct) / nm);
          z = 1.08883 * (Math.pow(zL, 3) > mx ? Math.pow(zL, 3) : (zL - ct) / nm);
        } // Convert xyz to unbounded rgb values


        var rU = x * 3.2406 + y * -1.5372 + z * -0.4986;
        var gU = x * -0.9689 + y * 1.8758 + z * 0.0415;
        var bU = x * 0.0557 + y * -0.2040 + z * 1.0570; // Convert the values to true rgb values

        var pow = Math.pow;
        var bd = 0.0031308;
        var r = rU > bd ? 1.055 * pow(rU, 1 / 2.4) - 0.055 : 12.92 * rU;
        var g = gU > bd ? 1.055 * pow(gU, 1 / 2.4) - 0.055 : 12.92 * gU;
        var b = bU > bd ? 1.055 * pow(bU, 1 / 2.4) - 0.055 : 12.92 * bU; // Make and return the color

        var color = new Color(255 * r, 255 * g, 255 * b);
        return color;
      } else if (this.space === 'hsl') {
        // https://bgrins.github.io/TinyColor/docs/tinycolor.html
        // Get the current hsl values
        var _h = this.h,
            s = this.s,
            _l = this.l;
        _h /= 360;
        s /= 100;
        _l /= 100; // If we are grey, then just make the color directly

        if (s === 0) {
          _l *= 255;

          var _color2 = new Color(_l, _l, _l);

          return _color2;
        } // TODO I have no idea what this does :D If you figure it out, tell me!


        var q = _l < 0.5 ? _l * (1 + s) : _l + s - _l * s;
        var p = 2 * _l - q; // Get the rgb values

        var _r = 255 * hueToRgb(p, q, _h + 1 / 3);

        var _g = 255 * hueToRgb(p, q, _h);

        var _b5 = 255 * hueToRgb(p, q, _h - 1 / 3); // Make a new color


        var _color = new Color(_r, _g, _b5);

        return _color;
      } else if (this.space === 'cmyk') {
        // https://gist.github.com/felipesabino/5066336
        // Get the normalised cmyk values
        var _c4 = this.c,
            m = this.m,
            _y = this.y,
            k = this.k; // Get the rgb values

        var _r2 = 255 * (1 - Math.min(1, _c4 * (1 - k) + k));

        var _g2 = 255 * (1 - Math.min(1, m * (1 - k) + k));

        var _b6 = 255 * (1 - Math.min(1, _y * (1 - k) + k)); // Form the color and return it


        var _color3 = new Color(_r2, _g2, _b6);

        return _color3;
      } else {
        return this;
      }
    }
  }, {
    key: "lab",
    value: function lab() {
      // Get the xyz color
      var _this$xyz = this.xyz(),
          x = _this$xyz.x,
          y = _this$xyz.y,
          z = _this$xyz.z; // Get the lab components


      var l = 116 * y - 16;
      var a = 500 * (x - y);
      var b = 200 * (y - z); // Construct and return a new color

      var color = new Color(l, a, b, 'lab');
      return color;
    }
  }, {
    key: "xyz",
    value: function xyz() {
      // Normalise the red, green and blue values
      var _this$rgb = this.rgb(),
          r255 = _this$rgb._a,
          g255 = _this$rgb._b,
          b255 = _this$rgb._c;

      var _map = [r255, g255, b255].map(function (v) {
        return v / 255;
      }),
          _map2 = _slicedToArray(_map, 3),
          r = _map2[0],
          g = _map2[1],
          b = _map2[2]; // Convert to the lab rgb space


      var rL = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
      var gL = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
      var bL = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92; // Convert to the xyz color space without bounding the values

      var xU = (rL * 0.4124 + gL * 0.3576 + bL * 0.1805) / 0.95047;
      var yU = (rL * 0.2126 + gL * 0.7152 + bL * 0.0722) / 1.00000;
      var zU = (rL * 0.0193 + gL * 0.1192 + bL * 0.9505) / 1.08883; // Get the proper xyz values by applying the bounding

      var x = xU > 0.008856 ? Math.pow(xU, 1 / 3) : 7.787 * xU + 16 / 116;
      var y = yU > 0.008856 ? Math.pow(yU, 1 / 3) : 7.787 * yU + 16 / 116;
      var z = zU > 0.008856 ? Math.pow(zU, 1 / 3) : 7.787 * zU + 16 / 116; // Make and return the color

      var color = new Color(x, y, z, 'xyz');
      return color;
    }
  }, {
    key: "lch",
    value: function lch() {
      // Get the lab color directly
      var _this$lab = this.lab(),
          l = _this$lab.l,
          a = _this$lab.a,
          b = _this$lab.b; // Get the chromaticity and the hue using polar coordinates


      var c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
      var h = 180 * Math.atan2(b, a) / Math.PI;

      if (h < 0) {
        h *= -1;
        h = 360 - h;
      } // Make a new color and return it


      var color = new Color(l, c, h, 'lch');
      return color;
    }
  }, {
    key: "hsl",
    value: function hsl() {
      // Get the rgb values
      var _this$rgb2 = this.rgb(),
          _a = _this$rgb2._a,
          _b = _this$rgb2._b,
          _c = _this$rgb2._c;

      var _map3 = [_a, _b, _c].map(function (v) {
        return v / 255;
      }),
          _map4 = _slicedToArray(_map3, 3),
          r = _map4[0],
          g = _map4[1],
          b = _map4[2]; // Find the maximum and minimum values to get the lightness


      var max = Math.max(r, g, b);
      var min = Math.min(r, g, b);
      var l = (max + min) / 2; // If the r, g, v values are identical then we are grey

      var isGrey = max === min; // Calculate the hue and saturation

      var delta = max - min;
      var s = isGrey ? 0 : l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
      var h = isGrey ? 0 : max === r ? ((g - b) / delta + (g < b ? 6 : 0)) / 6 : max === g ? ((b - r) / delta + 2) / 6 : max === b ? ((r - g) / delta + 4) / 6 : 0; // Construct and return the new color

      var color = new Color(360 * h, 100 * s, 100 * l, 'hsl');
      return color;
    }
  }, {
    key: "cmyk",
    value: function cmyk() {
      // Get the rgb values for the current color
      var _this$rgb3 = this.rgb(),
          _a = _this$rgb3._a,
          _b = _this$rgb3._b,
          _c = _this$rgb3._c;

      var _map5 = [_a, _b, _c].map(function (v) {
        return v / 255;
      }),
          _map6 = _slicedToArray(_map5, 3),
          r = _map6[0],
          g = _map6[1],
          b = _map6[2]; // Get the cmyk values in an unbounded format


      var k = Math.min(1 - r, 1 - g, 1 - b);

      if (k === 1) {
        // Catch the black case
        return new Color(0, 0, 0, 1, 'cmyk');
      }

      var c = (1 - r - k) / (1 - k);
      var m = (1 - g - k) / (1 - k);
      var y = (1 - b - k) / (1 - k); // Construct the new color

      var color = new Color(c, m, y, k, 'cmyk');
      return color;
    }
    /*
    Input and Output methods
    */

  }, {
    key: "_clamped",
    value: function _clamped() {
      var _this$rgb4 = this.rgb(),
          _a = _this$rgb4._a,
          _b = _this$rgb4._b,
          _c = _this$rgb4._c;

      var max = Math.max,
          min = Math.min,
          round = Math.round;

      var format = function format(v) {
        return max(0, min(round(v), 255));
      };

      return [_a, _b, _c].map(format);
    }
  }, {
    key: "toHex",
    value: function toHex() {
      var _this$_clamped$map = this._clamped().map(componentHex),
          _this$_clamped$map2 = _slicedToArray(_this$_clamped$map, 3),
          r = _this$_clamped$map2[0],
          g = _this$_clamped$map2[1],
          b = _this$_clamped$map2[2];

      return "#".concat(r).concat(g).concat(b);
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.toHex();
    }
  }, {
    key: "toRgb",
    value: function toRgb() {
      var _this$_clamped = this._clamped(),
          _this$_clamped2 = _slicedToArray(_this$_clamped, 3),
          rV = _this$_clamped2[0],
          gV = _this$_clamped2[1],
          bV = _this$_clamped2[2];

      var string = "rgb(".concat(rV, ",").concat(gV, ",").concat(bV, ")");
      return string;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var _a = this._a,
          _b = this._b,
          _c = this._c,
          _d = this._d,
          space = this.space;
      return [_a, _b, _c, _d, space];
    }
    /*
    Generating random colors
    */

  }], [{
    key: "random",
    value: function random() {
      var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'vibrant';
      var t = arguments.length > 1 ? arguments[1] : undefined; // Get the math modules

      var random = Math.random,
          round = Math.round,
          sin = Math.sin,
          pi = Math.PI; // Run the correct generator

      if (mode === 'vibrant') {
        var l = (81 - 57) * random() + 57;
        var c = (83 - 45) * random() + 45;
        var h = 360 * random();
        var color = new Color(l, c, h, 'lch');
        return color;
      } else if (mode === 'sine') {
        t = t == null ? random() : t;
        var r = round(80 * sin(2 * pi * t / 0.5 + 0.01) + 150);
        var g = round(50 * sin(2 * pi * t / 0.5 + 4.6) + 200);
        var b = round(100 * sin(2 * pi * t / 0.5 + 2.3) + 150);

        var _color4 = new Color(r, g, b);

        return _color4;
      } else if (mode === 'pastel') {
        var _l2 = (94 - 86) * random() + 86;

        var _c5 = (26 - 9) * random() + 9;

        var _h2 = 360 * random();

        var _color5 = new Color(_l2, _c5, _h2, 'lch');

        return _color5;
      } else if (mode === 'dark') {
        var _l3 = 10 + 10 * random();

        var _c6 = (125 - 75) * random() + 86;

        var _h3 = 360 * random();

        var _color6 = new Color(_l3, _c6, _h3, 'lch');

        return _color6;
      } else if (mode === 'rgb') {
        var _r3 = 255 * random();

        var _g3 = 255 * random();

        var _b7 = 255 * random();

        var _color7 = new Color(_r3, _g3, _b7);

        return _color7;
      } else if (mode === 'lab') {
        var _l4 = 100 * random();

        var a = 256 * random() - 128;

        var _b8 = 256 * random() - 128;

        var _color8 = new Color(_l4, a, _b8, 'lab');

        return _color8;
      } else if (mode === 'grey') {
        var grey = 255 * random();

        var _color9 = new Color(grey, grey, grey);

        return _color9;
      }
    }
    /*
    Constructing colors
    */
    // Test if given value is a color string

  }, {
    key: "test",
    value: function test(color) {
      return typeof color === 'string' && (isHex.test(color) || isRgb.test(color));
    } // Test if given value is an rgb object

  }, {
    key: "isRgb",
    value: function isRgb(color) {
      return color && typeof color.r === 'number' && typeof color.g === 'number' && typeof color.b === 'number';
    } // Test if given value is a color

  }, {
    key: "isColor",
    value: function isColor(color) {
      return color && (color instanceof Color || this.isRgb(color) || this.test(color));
    }
  }]);

  return Color;
}();

exports.Color = Color;
var FAILS_ON_PRIMITIVES$1 = fails(function () {
  objectKeys(1);
}); // `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys

_export({
  target: 'Object',
  stat: true,
  forced: FAILS_ON_PRIMITIVES$1
}, {
  keys: function keys(it) {
    return objectKeys(toObject(it));
  }
}); // @@match logic


fixRegexpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [// `String.prototype.match` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.match
  function match(regexp) {
    var O = requireObjectCoercible(this);
    var matcher = regexp == undefined ? undefined : regexp[MATCH];
    return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, // `RegExp.prototype[@@match]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
  function (regexp) {
    var res = maybeCallNative(nativeMatch, regexp, this);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    if (!rx.global) return regexpExecAbstract(rx, S);
    var fullUnicode = rx.unicode;
    rx.lastIndex = 0;
    var A = [];
    var n = 0;
    var result;

    while ((result = regexpExecAbstract(rx, S)) !== null) {
      var matchStr = String(result[0]);
      A[n] = matchStr;
      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      n++;
    }

    return n === 0 ? null : A;
  }];
});

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
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
  if (superClass) _setPrototypeOf(subClass, superClass);
}

var getOwnPropertyNames = objectGetOwnPropertyNames.f;
var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
var defineProperty$5 = objectDefineProperty.f;
var trim$1 = stringTrim.trim;
var NUMBER = 'Number';
var NativeNumber = global_1[NUMBER];
var NumberPrototype = NativeNumber.prototype; // Opera ~12 has broken Object#toString

var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER; // `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber

var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;

  if (typeof it == 'string' && it.length > 2) {
    it = trim$1(it);
    first = it.charCodeAt(0);

    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66:
        case 98:
          radix = 2;
          maxCode = 49;
          break;
        // fast equal of /^0b[01]+$/i

        case 79:
        case 111:
          radix = 8;
          maxCode = 55;
          break;
        // fast equal of /^0o[0-7]+$/i

        default:
          return +it;
      }

      digits = it.slice(2);
      length = digits.length;

      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index); // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols

        if (code < 48 || code > maxCode) return NaN;
      }

      return parseInt(digits, radix);
    }
  }

  return +it;
}; // `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor


if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper // check on 1..constructor(foo) case
    && (BROKEN_CLASSOF ? fails(function () {
      NumberPrototype.valueOf.call(dummy);
    }) : classofRaw(dummy) != NUMBER) ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };

  for (var keys$1 = descriptors ? getOwnPropertyNames(NativeNumber) : ( // ES3:
  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + // ES2015 (in case, if modules with ES2015 Number statics required before):
  'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys$1.length > j; j++) {
    if (has(NativeNumber, key = keys$1[j]) && !has(NumberWrapper, key)) {
      defineProperty$5(NumberWrapper, key, getOwnPropertyDescriptor$2(NativeNumber, key));
    }
  }

  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global_1, NUMBER, NumberWrapper);
}

var trim$2 = stringTrim.trim;
var nativeParseFloat = global_1.parseFloat;
var FORCED$2 = 1 / nativeParseFloat(whitespaces + '-0') !== -Infinity; // `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string

var _parseFloat = FORCED$2 ? function parseFloat(string) {
  var trimmedString = trim$2(String(string));
  var result = nativeParseFloat(trimmedString);
  return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
} : nativeParseFloat; // `parseFloat` method
// https://tc39.github.io/ecma262/#sec-parsefloat-string


_export({
  global: true,
  forced: parseFloat != _parseFloat
}, {
  parseFloat: _parseFloat
});

var Point =
/*#__PURE__*/
function () {
  // Initialize
  function Point() {
    _classCallCheck(this, Point);

    this.init.apply(this, arguments);
  }

  _createClass(Point, [{
    key: "init",
    value: function init(x, y) {
      var base = {
        x: 0,
        y: 0
      }; // ensure source as object

      var source = Array.isArray(x) ? {
        x: x[0],
        y: x[1]
      } : _typeof(x) === 'object' ? {
        x: x.x,
        y: x.y
      } : {
        x: x,
        y: y
      }; // merge source

      this.x = source.x == null ? base.x : source.x;
      this.y = source.y == null ? base.y : source.y;
      return this;
    } // Clone point

  }, {
    key: "clone",
    value: function clone() {
      return new Point(this);
    }
  }, {
    key: "transform",
    value: function transform(m) {
      return this.clone().transformO(m);
    } // Transform point with matrix

  }, {
    key: "transformO",
    value: function transformO(m) {
      if (!Matrix.isMatrixLike(m)) {
        m = new Matrix(m);
      }

      var x = this.x,
          y = this.y; // Perform the matrix multiplication

      this.x = m.a * x + m.c * y + m.e;
      this.y = m.b * x + m.d * y + m.f;
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return [this.x, this.y];
    }
  }]);

  return Point;
}();

exports.Point = Point;

function point(x, y) {
  return new Point(x, y).transform(this.screenCTM().inverse());
}

function closeEnough(a, b, threshold) {
  return Math.abs(b - a) < (threshold || 1e-6);
}

var Matrix =
/*#__PURE__*/
function () {
  function Matrix() {
    _classCallCheck(this, Matrix);

    this.init.apply(this, arguments);
  } // Initialize


  _createClass(Matrix, [{
    key: "init",
    value: function init(source) {
      var base = Matrix.fromArray([1, 0, 0, 1, 0, 0]); // ensure source as object

      source = source instanceof Element ? source.matrixify() : typeof source === 'string' ? Matrix.fromArray(source.split(delimiter).map(parseFloat)) : Array.isArray(source) ? Matrix.fromArray(source) : _typeof(source) === 'object' && Matrix.isMatrixLike(source) ? source : _typeof(source) === 'object' ? new Matrix().transform(source) : arguments.length === 6 ? Matrix.fromArray([].slice.call(arguments)) : base; // Merge the source matrix with the base matrix

      this.a = source.a != null ? source.a : base.a;
      this.b = source.b != null ? source.b : base.b;
      this.c = source.c != null ? source.c : base.c;
      this.d = source.d != null ? source.d : base.d;
      this.e = source.e != null ? source.e : base.e;
      this.f = source.f != null ? source.f : base.f;
      return this;
    } // Clones this matrix

  }, {
    key: "clone",
    value: function clone() {
      return new Matrix(this);
    } // Transform a matrix into another matrix by manipulating the space

  }, {
    key: "transform",
    value: function transform(o) {
      // Check if o is a matrix and then left multiply it directly
      if (Matrix.isMatrixLike(o)) {
        var matrix = new Matrix(o);
        return matrix.multiplyO(this);
      } // Get the proposed transformations and the current transformations


      var t = Matrix.formatTransforms(o);
      var current = this;

      var _transform = new Point(t.ox, t.oy).transform(current),
          ox = _transform.x,
          oy = _transform.y; // Construct the resulting matrix


      var transformer = new Matrix().translateO(t.rx, t.ry).lmultiplyO(current).translateO(-ox, -oy).scaleO(t.scaleX, t.scaleY).skewO(t.skewX, t.skewY).shearO(t.shear).rotateO(t.theta).translateO(ox, oy); // If we want the origin at a particular place, we force it there

      if (isFinite(t.px) || isFinite(t.py)) {
        var origin = new Point(ox, oy).transform(transformer); // TODO: Replace t.px with isFinite(t.px)

        var dx = t.px ? t.px - origin.x : 0;
        var dy = t.py ? t.py - origin.y : 0;
        transformer.translateO(dx, dy);
      } // Translate now after positioning


      transformer.translateO(t.tx, t.ty);
      return transformer;
    } // Applies a matrix defined by its affine parameters

  }, {
    key: "compose",
    value: function compose(o) {
      if (o.origin) {
        o.originX = o.origin[0];
        o.originY = o.origin[1];
      } // Get the parameters


      var ox = o.originX || 0;
      var oy = o.originY || 0;
      var sx = o.scaleX || 1;
      var sy = o.scaleY || 1;
      var lam = o.shear || 0;
      var theta = o.rotate || 0;
      var tx = o.translateX || 0;
      var ty = o.translateY || 0; // Apply the standard matrix

      var result = new Matrix().translateO(-ox, -oy).scaleO(sx, sy).shearO(lam).rotateO(theta).translateO(tx, ty).lmultiplyO(this).translateO(ox, oy);
      return result;
    } // Decomposes this matrix into its affine parameters

  }, {
    key: "decompose",
    value: function decompose() {
      var cx = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var cy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0; // Get the parameters from the matrix

      var a = this.a;
      var b = this.b;
      var c = this.c;
      var d = this.d;
      var e = this.e;
      var f = this.f; // Figure out if the winding direction is clockwise or counterclockwise

      var determinant = a * d - b * c;
      var ccw = determinant > 0 ? 1 : -1; // Since we only shear in x, we can use the x basis to get the x scale
      // and the rotation of the resulting matrix

      var sx = ccw * Math.sqrt(a * a + b * b);
      var thetaRad = Math.atan2(ccw * b, ccw * a);
      var theta = 180 / Math.PI * thetaRad;
      var ct = Math.cos(thetaRad);
      var st = Math.sin(thetaRad); // We can then solve the y basis vector simultaneously to get the other
      // two affine parameters directly from these parameters

      var lam = (a * c + b * d) / determinant;
      var sy = c * sx / (lam * a - b) || d * sx / (lam * b + a); // Use the translations

      var tx = e - cx + cx * ct * sx + cy * (lam * ct * sx - st * sy);
      var ty = f - cy + cx * st * sx + cy * (lam * st * sx + ct * sy); // Construct the decomposition and return it

      return {
        // Return the affine parameters
        scaleX: sx,
        scaleY: sy,
        shear: lam,
        rotate: theta,
        translateX: tx,
        translateY: ty,
        originX: cx,
        originY: cy,
        // Return the matrix parameters
        a: this.a,
        b: this.b,
        c: this.c,
        d: this.d,
        e: this.e,
        f: this.f
      };
    } // Left multiplies by the given matrix

  }, {
    key: "multiply",
    value: function multiply(matrix) {
      return this.clone().multiplyO(matrix);
    }
  }, {
    key: "multiplyO",
    value: function multiplyO(matrix) {
      // Get the matrices
      var l = this;
      var r = matrix instanceof Matrix ? matrix : new Matrix(matrix);
      return Matrix.matrixMultiply(l, r, this);
    }
  }, {
    key: "lmultiply",
    value: function lmultiply(matrix) {
      return this.clone().lmultiplyO(matrix);
    }
  }, {
    key: "lmultiplyO",
    value: function lmultiplyO(matrix) {
      var r = this;
      var l = matrix instanceof Matrix ? matrix : new Matrix(matrix);
      return Matrix.matrixMultiply(l, r, this);
    } // Inverses matrix

  }, {
    key: "inverseO",
    value: function inverseO() {
      // Get the current parameters out of the matrix
      var a = this.a;
      var b = this.b;
      var c = this.c;
      var d = this.d;
      var e = this.e;
      var f = this.f; // Invert the 2x2 matrix in the top left

      var det = a * d - b * c;
      if (!det) throw new Error('Cannot invert ' + this); // Calculate the top 2x2 matrix

      var na = d / det;
      var nb = -b / det;
      var nc = -c / det;
      var nd = a / det; // Apply the inverted matrix to the top right

      var ne = -(na * e + nc * f);
      var nf = -(nb * e + nd * f); // Construct the inverted matrix

      this.a = na;
      this.b = nb;
      this.c = nc;
      this.d = nd;
      this.e = ne;
      this.f = nf;
      return this;
    }
  }, {
    key: "inverse",
    value: function inverse() {
      return this.clone().inverseO();
    } // Translate matrix

  }, {
    key: "translate",
    value: function translate(x, y) {
      return this.clone().translateO(x, y);
    }
  }, {
    key: "translateO",
    value: function translateO(x, y) {
      this.e += x || 0;
      this.f += y || 0;
      return this;
    } // Scale matrix

  }, {
    key: "scale",
    value: function scale(x, y, cx, cy) {
      var _this$clone;

      return (_this$clone = this.clone()).scaleO.apply(_this$clone, arguments);
    }
  }, {
    key: "scaleO",
    value: function scaleO(x) {
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      var cx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var cy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0; // Support uniform scaling

      if (arguments.length === 3) {
        cy = cx;
        cx = y;
        y = x;
      }

      var a = this.a,
          b = this.b,
          c = this.c,
          d = this.d,
          e = this.e,
          f = this.f;
      this.a = a * x;
      this.b = b * y;
      this.c = c * x;
      this.d = d * y;
      this.e = e * x - cx * x + cx;
      this.f = f * y - cy * y + cy;
      return this;
    } // Rotate matrix

  }, {
    key: "rotate",
    value: function rotate(r, cx, cy) {
      return this.clone().rotateO(r, cx, cy);
    }
  }, {
    key: "rotateO",
    value: function rotateO(r) {
      var cx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var cy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0; // Convert degrees to radians

      r = radians(r);
      var cos = Math.cos(r);
      var sin = Math.sin(r);
      var a = this.a,
          b = this.b,
          c = this.c,
          d = this.d,
          e = this.e,
          f = this.f;
      this.a = a * cos - b * sin;
      this.b = b * cos + a * sin;
      this.c = c * cos - d * sin;
      this.d = d * cos + c * sin;
      this.e = e * cos - f * sin + cy * sin - cx * cos + cx;
      this.f = f * cos + e * sin - cx * sin - cy * cos + cy;
      return this;
    } // Flip matrix on x or y, at a given offset

  }, {
    key: "flip",
    value: function flip(axis, around) {
      return this.clone().flipO(axis, around);
    }
  }, {
    key: "flipO",
    value: function flipO(axis, around) {
      return axis === 'x' ? this.scaleO(-1, 1, around, 0) : axis === 'y' ? this.scaleO(1, -1, 0, around) : this.scaleO(-1, -1, axis, around || axis); // Define an x, y flip point
    } // Shear matrix

  }, {
    key: "shear",
    value: function shear(a, cx, cy) {
      return this.clone().shearO(a, cx, cy);
    }
  }, {
    key: "shearO",
    value: function shearO(lx) {
      var cy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var a = this.a,
          b = this.b,
          c = this.c,
          d = this.d,
          e = this.e,
          f = this.f;
      this.a = a + b * lx;
      this.c = c + d * lx;
      this.e = e + f * lx - cy * lx;
      return this;
    } // Skew Matrix

  }, {
    key: "skew",
    value: function skew(x, y, cx, cy) {
      var _this$clone2;

      return (_this$clone2 = this.clone()).skewO.apply(_this$clone2, arguments);
    }
  }, {
    key: "skewO",
    value: function skewO(x) {
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : x;
      var cx = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var cy = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0; // support uniformal skew

      if (arguments.length === 3) {
        cy = cx;
        cx = y;
        y = x;
      } // Convert degrees to radians


      x = radians(x);
      y = radians(y);
      var lx = Math.tan(x);
      var ly = Math.tan(y);
      var a = this.a,
          b = this.b,
          c = this.c,
          d = this.d,
          e = this.e,
          f = this.f;
      this.a = a + b * lx;
      this.b = b + a * ly;
      this.c = c + d * lx;
      this.d = d + c * ly;
      this.e = e + f * lx - cy * lx;
      this.f = f + e * ly - cx * ly;
      return this;
    } // SkewX

  }, {
    key: "skewX",
    value: function skewX(x, cx, cy) {
      return this.skew(x, 0, cx, cy);
    }
  }, {
    key: "skewXO",
    value: function skewXO(x, cx, cy) {
      return this.skewO(x, 0, cx, cy);
    } // SkewY

  }, {
    key: "skewY",
    value: function skewY(y, cx, cy) {
      return this.skew(0, y, cx, cy);
    }
  }, {
    key: "skewYO",
    value: function skewYO(y, cx, cy) {
      return this.skewO(0, y, cx, cy);
    } // Transform around a center point

  }, {
    key: "aroundO",
    value: function aroundO(cx, cy, matrix) {
      var dx = cx || 0;
      var dy = cy || 0;
      return this.translateO(-dx, -dy).lmultiplyO(matrix).translateO(dx, dy);
    }
  }, {
    key: "around",
    value: function around(cx, cy, matrix) {
      return this.clone().aroundO(cx, cy, matrix);
    } // Check if two matrices are equal

  }, {
    key: "equals",
    value: function equals(other) {
      var comp = new Matrix(other);
      return closeEnough(this.a, comp.a) && closeEnough(this.b, comp.b) && closeEnough(this.c, comp.c) && closeEnough(this.d, comp.d) && closeEnough(this.e, comp.e) && closeEnough(this.f, comp.f);
    } // Convert matrix to string

  }, {
    key: "toString",
    value: function toString() {
      return 'matrix(' + this.a + ',' + this.b + ',' + this.c + ',' + this.d + ',' + this.e + ',' + this.f + ')';
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return [this.a, this.b, this.c, this.d, this.e, this.f];
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return {
        a: this.a,
        b: this.b,
        c: this.c,
        d: this.d,
        e: this.e,
        f: this.f
      };
    }
  }], [{
    key: "fromArray",
    value: function fromArray(a) {
      return {
        a: a[0],
        b: a[1],
        c: a[2],
        d: a[3],
        e: a[4],
        f: a[5]
      };
    }
  }, {
    key: "isMatrixLike",
    value: function isMatrixLike(o) {
      return o.a != null || o.b != null || o.c != null || o.d != null || o.e != null || o.f != null;
    }
  }, {
    key: "formatTransforms",
    value: function formatTransforms(o) {
      // Get all of the parameters required to form the matrix
      var flipBoth = o.flip === 'both' || o.flip === true;
      var flipX = o.flip && (flipBoth || o.flip === 'x') ? -1 : 1;
      var flipY = o.flip && (flipBoth || o.flip === 'y') ? -1 : 1;
      var skewX = o.skew && o.skew.length ? o.skew[0] : isFinite(o.skew) ? o.skew : isFinite(o.skewX) ? o.skewX : 0;
      var skewY = o.skew && o.skew.length ? o.skew[1] : isFinite(o.skew) ? o.skew : isFinite(o.skewY) ? o.skewY : 0;
      var scaleX = o.scale && o.scale.length ? o.scale[0] * flipX : isFinite(o.scale) ? o.scale * flipX : isFinite(o.scaleX) ? o.scaleX * flipX : flipX;
      var scaleY = o.scale && o.scale.length ? o.scale[1] * flipY : isFinite(o.scale) ? o.scale * flipY : isFinite(o.scaleY) ? o.scaleY * flipY : flipY;
      var shear = o.shear || 0;
      var theta = o.rotate || o.theta || 0;
      var origin = new Point(o.origin || o.around || o.ox || o.originX, o.oy || o.originY);
      var ox = origin.x;
      var oy = origin.y;
      var position = new Point(o.position || o.px || o.positionX, o.py || o.positionY);
      var px = position.x;
      var py = position.y;
      var translate = new Point(o.translate || o.tx || o.translateX, o.ty || o.translateY);
      var tx = translate.x;
      var ty = translate.y;
      var relative = new Point(o.relative || o.rx || o.relativeX, o.ry || o.relativeY);
      var rx = relative.x;
      var ry = relative.y; // Populate all of the values

      return {
        scaleX: scaleX,
        scaleY: scaleY,
        skewX: skewX,
        skewY: skewY,
        shear: shear,
        theta: theta,
        rx: rx,
        ry: ry,
        tx: tx,
        ty: ty,
        ox: ox,
        oy: oy,
        px: px,
        py: py
      };
    } // left matrix, right matrix, target matrix which is overwritten

  }, {
    key: "matrixMultiply",
    value: function matrixMultiply(l, r, o) {
      // Work out the product directly
      var a = l.a * r.a + l.c * r.b;
      var b = l.b * r.a + l.d * r.b;
      var c = l.a * r.c + l.c * r.d;
      var d = l.b * r.c + l.d * r.d;
      var e = l.e + l.a * r.e + l.c * r.f;
      var f = l.f + l.b * r.e + l.d * r.f; // make sure to use local variables because l/r and o could be the same

      o.a = a;
      o.b = b;
      o.c = c;
      o.d = d;
      o.e = e;
      o.f = f;
      return o;
    }
  }]);

  return Matrix;
}();

exports.Matrix = Matrix;

function ctm() {
  return new Matrix(this.node.getCTM());
}

function screenCTM() {
  /* https://bugzilla.mozilla.org/show_bug.cgi?id=1344537
     This is needed because FF does not return the transformation matrix
     for the inner coordinate system when getScreenCTM() is called on nested svgs.
     However all other Browsers do that */
  if (typeof this.isRoot === 'function' && !this.isRoot()) {
    var rect = this.rect(1, 1);
    var m = rect.node.getScreenCTM();
    rect.remove();
    return new Matrix(m);
  }

  return new Matrix(this.node.getScreenCTM());
}

register(Matrix, 'Matrix');

function parser() {
  // Reuse cached element if possible
  if (!parser.nodes) {
    var svg = makeInstance().size(2, 0);
    svg.node.style.cssText = ['opacity: 0', 'position: absolute', 'left: -100%', 'top: -100%', 'overflow: hidden'].join(';');
    svg.attr('focusable', 'false');
    svg.attr('aria-hidden', 'true');
    var path = svg.path().node;
    parser.nodes = {
      svg: svg,
      path: path
    };
  }

  if (!parser.nodes.svg.node.parentNode) {
    var b = globals.document.body || globals.document.documentElement;
    parser.nodes.svg.addTo(b);
  }

  return parser.nodes;
}

function isNulledBox(box) {
  return !box.width && !box.height && !box.x && !box.y;
}

function domContains(node) {
  return node === globals.document || (globals.document.documentElement.contains || function (node) {
    // This is IE - it does not support contains() for top-level SVGs
    while (node.parentNode) {
      node = node.parentNode;
    }

    return node === globals.document;
  }).call(globals.document.documentElement, node);
}

var Box =
/*#__PURE__*/
function () {
  function Box() {
    _classCallCheck(this, Box);

    this.init.apply(this, arguments);
  }

  _createClass(Box, [{
    key: "init",
    value: function init(source) {
      var base = [0, 0, 0, 0];
      source = typeof source === 'string' ? source.split(delimiter).map(parseFloat) : Array.isArray(source) ? source : _typeof(source) === 'object' ? [source.left != null ? source.left : source.x, source.top != null ? source.top : source.y, source.width, source.height] : arguments.length === 4 ? [].slice.call(arguments) : base;
      this.x = source[0] || 0;
      this.y = source[1] || 0;
      this.width = this.w = source[2] || 0;
      this.height = this.h = source[3] || 0; // Add more bounding box properties

      this.x2 = this.x + this.w;
      this.y2 = this.y + this.h;
      this.cx = this.x + this.w / 2;
      this.cy = this.y + this.h / 2;
      return this;
    } // Merge rect box with another, return a new instance

  }, {
    key: "merge",
    value: function merge(box) {
      var x = Math.min(this.x, box.x);
      var y = Math.min(this.y, box.y);
      var width = Math.max(this.x + this.width, box.x + box.width) - x;
      var height = Math.max(this.y + this.height, box.y + box.height) - y;
      return new Box(x, y, width, height);
    }
  }, {
    key: "transform",
    value: function transform(m) {
      if (!(m instanceof Matrix)) {
        m = new Matrix(m);
      }

      var xMin = Infinity;
      var xMax = -Infinity;
      var yMin = Infinity;
      var yMax = -Infinity;
      var pts = [new Point(this.x, this.y), new Point(this.x2, this.y), new Point(this.x, this.y2), new Point(this.x2, this.y2)];
      pts.forEach(function (p) {
        p = p.transform(m);
        xMin = Math.min(xMin, p.x);
        xMax = Math.max(xMax, p.x);
        yMin = Math.min(yMin, p.y);
        yMax = Math.max(yMax, p.y);
      });
      return new Box(xMin, yMin, xMax - xMin, yMax - yMin);
    }
  }, {
    key: "addOffset",
    value: function addOffset() {
      // offset by window scroll position, because getBoundingClientRect changes when window is scrolled
      this.x += globals.window.pageXOffset;
      this.y += globals.window.pageYOffset;
      return this;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.x + ' ' + this.y + ' ' + this.width + ' ' + this.height;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return [this.x, this.y, this.width, this.height];
    }
  }, {
    key: "isNulled",
    value: function isNulled() {
      return isNulledBox(this);
    }
  }]);

  return Box;
}();

exports.Box = Box;

function getBox(cb, retry) {
  var box;

  try {
    box = cb(this.node);

    if (isNulledBox(box) && !domContains(this.node)) {
      throw new Error('Element not in the dom');
    }
  } catch (e) {
    box = retry(this);
  }

  return box;
}

function bbox() {
  return new Box(getBox.call(this, function (node) {
    return node.getBBox();
  }, function (el) {
    try {
      var clone = el.clone().addTo(parser().svg).show();
      var box = clone.node.getBBox();
      clone.remove();
      return box;
    } catch (e) {
      throw new Error('Getting bbox of element "' + el.node.nodeName + '" is not possible. ' + e.toString());
    }
  }));
}

function rbox(el) {
  var box = new Box(getBox.call(this, function (node) {
    return node.getBoundingClientRect();
  }, function (el) {
    throw new Error('Getting rbox of element "' + el.node.nodeName + '" is not possible');
  }));
  if (el) return box.transform(el.screenCTM().inverse());
  return box.addOffset();
}

registerMethods({
  viewbox: {
    viewbox: function viewbox(x, y, width, height) {
      // act as getter
      if (x == null) return new Box(this.attr('viewBox')); // act as setter

      return this.attr('viewBox', new Box(x, y, width, height));
    },
    zoom: function zoom(level, point) {
      var width = this.node.clientWidth;
      var height = this.node.clientHeight;
      var v = this.viewbox(); // Firefox does not support clientHeight and returns 0
      // https://bugzilla.mozilla.org/show_bug.cgi?id=874811

      if (!width && !height) {
        var style = window.getComputedStyle(this.node);
        width = parseFloat(style.getPropertyValue('width'));
        height = parseFloat(style.getPropertyValue('height'));
      }

      var zoomX = width / v.width;
      var zoomY = height / v.height;
      var zoom = Math.min(zoomX, zoomY);

      if (level == null) {
        return zoom;
      }

      var zoomAmount = zoom / level;
      if (zoomAmount === Infinity) zoomAmount = Number.MIN_VALUE;
      point = point || new Point(width / 2 / zoomX + v.x, height / 2 / zoomY + v.y);
      var box = new Box(v).transform(new Matrix({
        scale: zoomAmount,
        origin: point
      }));
      return this.viewbox(box);
    }
  }
});
register(Box, 'Box');
/* eslint no-new-func: "off" */

var subClassArray = function () {
  try {
    // try es6 subclassing
    return Function('name', 'baseClass', '_constructor', ['baseClass = baseClass || Array', 'return {', '  [name]: class extends baseClass {', '    constructor (...args) {', '      super(...args)', '      _constructor && _constructor.apply(this, args)', '    }', '  }', '}[name]'].join('\n'));
  } catch (e) {
    // Use es5 approach
    return function (name) {
      var baseClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Array;

      var _constructor = arguments.length > 2 ? arguments[2] : undefined;

      var Arr = function Arr() {
        baseClass.apply(this, arguments);
        _constructor && _constructor.apply(this, arguments);
      };

      Arr.prototype = Object.create(baseClass.prototype);
      Arr.prototype.constructor = Arr;

      Arr.prototype.map = function (fn) {
        var arr = new Arr();
        arr.push.apply(arr, Array.prototype.map.call(this, fn));
        return arr;
      };

      return Arr;
    };
  }
}();

var List = subClassArray('List', Array, function () {
  var arr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []; // This catches the case, that native map tries to create an array with new Array(1)

  if (typeof arr === 'number') return this;
  this.length = 0;
  this.push.apply(this, _toConsumableArray(arr));
});
exports.List = List;
extend(List, {
  each: function each(fnOrMethodName) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    if (typeof fnOrMethodName === 'function') {
      return this.map(function (el) {
        return fnOrMethodName.call(el, el);
      });
    } else {
      return this.map(function (el) {
        return el[fnOrMethodName].apply(el, args);
      });
    }
  },
  toArray: function toArray() {
    return Array.prototype.concat.apply([], this);
  }
});
var reserved = ['toArray', 'constructor', 'each'];

List.extend = function (methods) {
  methods = methods.reduce(function (obj, name) {
    // Don't overwrite own methods
    if (reserved.includes(name)) return obj; // Don't add private methods

    if (name[0] === '_') return obj; // Relay every call to each()

    obj[name] = function () {
      for (var _len2 = arguments.length, attrs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        attrs[_key2] = arguments[_key2];
      }

      return this.each.apply(this, [name].concat(attrs));
    };

    return obj;
  }, {});
  extend(List, methods);
};

function baseFind(query, parent) {
  return new List(map((parent || globals.document).querySelectorAll(query), function (node) {
    return adopt(node);
  }));
} // Scoped find method


function find(query) {
  return baseFind(query, this.node);
}

function findOne(query) {
  return adopt(this.node.querySelector(query));
}

var EventTarget =
/*#__PURE__*/
function (_Base) {
  _inherits(EventTarget, _Base);

  function EventTarget() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$events = _ref.events,
        events = _ref$events === void 0 ? {} : _ref$events;

    _classCallCheck(this, EventTarget);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EventTarget).call(this));
    _this.events = events;
    return _this;
  }

  _createClass(EventTarget, [{
    key: "addEventListener",
    value: function addEventListener() {}
  }, {
    key: "dispatch",
    value: function dispatch$1(event, data) {
      return dispatch(this, event, data);
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(event) {
      var bag = this.getEventHolder().events;
      if (!bag) return true;
      var events = bag[event.type];

      for (var i in events) {
        for (var j in events[i]) {
          events[i][j](event);
        }
      }

      return !event.defaultPrevented;
    } // Fire given event

  }, {
    key: "fire",
    value: function fire(event, data) {
      this.dispatch(event, data);
      return this;
    }
  }, {
    key: "getEventHolder",
    value: function getEventHolder() {
      return this;
    }
  }, {
    key: "getEventTarget",
    value: function getEventTarget() {
      return this;
    } // Unbind event from listener

  }, {
    key: "off",
    value: function off$1(event, listener) {
      off(this, event, listener);
      return this;
    } // Bind given event to listener

  }, {
    key: "on",
    value: function on$1(event, listener, binding, options) {
      on(this, event, listener, binding, options);
      return this;
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener() {}
  }]);

  return EventTarget;
}(Base);

exports.EventTarget = EventTarget;
register(EventTarget, 'EventTarget');

function noop() {} // Default animation values


var timeline = {
  duration: 400,
  ease: '>',
  delay: 0
}; // Default attribute values

var attrs = {
  // fill and stroke
  'fill-opacity': 1,
  'stroke-opacity': 1,
  'stroke-width': 0,
  'stroke-linejoin': 'miter',
  'stroke-linecap': 'butt',
  fill: '#000000',
  stroke: '#000000',
  opacity: 1,
  // position
  x: 0,
  y: 0,
  cx: 0,
  cy: 0,
  // size
  width: 0,
  height: 0,
  // radius
  r: 0,
  rx: 0,
  ry: 0,
  // gradient
  offset: 0,
  'stop-opacity': 1,
  'stop-color': '#000000',
  // text
  'text-anchor': 'start'
};
var defaults = {
  __proto__: null,
  noop: noop,
  timeline: timeline,
  attrs: attrs
};
exports.defaults = defaults;
var SVGArray = subClassArray('SVGArray', Array, function (arr) {
  this.init(arr);
});
exports.Array = SVGArray;
extend(SVGArray, {
  init: function init(arr) {
    // This catches the case, that native map tries to create an array with new Array(1)
    if (typeof arr === 'number') return this;
    this.length = 0;
    this.push.apply(this, _toConsumableArray(this.parse(arr)));
    return this;
  },
  toArray: function toArray() {
    return Array.prototype.concat.apply([], this);
  },
  toString: function toString() {
    return this.join(' ');
  },
  // Flattens the array if needed
  valueOf: function valueOf() {
    var ret = [];
    ret.push.apply(ret, _toConsumableArray(this));
    return ret;
  },
  // Parse whitespace separated string
  parse: function parse() {
    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : []; // If already is an array, no need to parse it

    if (array instanceof Array) return array;
    return array.trim().split(delimiter).map(parseFloat);
  },
  clone: function clone() {
    return new this.constructor(this);
  },
  toSet: function toSet() {
    return new Set(this);
  }
});

var SVGNumber =
/*#__PURE__*/
function () {
  // Initialize
  function SVGNumber() {
    _classCallCheck(this, SVGNumber);

    this.init.apply(this, arguments);
  }

  _createClass(SVGNumber, [{
    key: "init",
    value: function init(value, unit) {
      unit = Array.isArray(value) ? value[1] : unit;
      value = Array.isArray(value) ? value[0] : value; // initialize defaults

      this.value = 0;
      this.unit = unit || ''; // parse value

      if (typeof value === 'number') {
        // ensure a valid numeric value
        this.value = isNaN(value) ? 0 : !isFinite(value) ? value < 0 ? -3.4e+38 : +3.4e+38 : value;
      } else if (typeof value === 'string') {
        unit = value.match(numberAndUnit);

        if (unit) {
          // make value numeric
          this.value = parseFloat(unit[1]); // normalize

          if (unit[5] === '%') {
            this.value /= 100;
          } else if (unit[5] === 's') {
            this.value *= 1000;
          } // store unit


          this.unit = unit[5];
        }
      } else {
        if (value instanceof SVGNumber) {
          this.value = value.valueOf();
          this.unit = value.unit;
        }
      }

      return this;
    }
  }, {
    key: "toString",
    value: function toString() {
      return (this.unit === '%' ? ~~(this.value * 1e8) / 1e6 : this.unit === 's' ? this.value / 1e3 : this.value) + this.unit;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.toString();
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return [this.value, this.unit];
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.value;
    } // Add number

  }, {
    key: "plus",
    value: function plus(number) {
      number = new SVGNumber(number);
      return new SVGNumber(this + number, this.unit || number.unit);
    } // Subtract number

  }, {
    key: "minus",
    value: function minus(number) {
      number = new SVGNumber(number);
      return new SVGNumber(this - number, this.unit || number.unit);
    } // Multiply number

  }, {
    key: "times",
    value: function times(number) {
      number = new SVGNumber(number);
      return new SVGNumber(this * number, this.unit || number.unit);
    } // Divide number

  }, {
    key: "divide",
    value: function divide(number) {
      number = new SVGNumber(number);
      return new SVGNumber(this / number, this.unit || number.unit);
    }
  }, {
    key: "convert",
    value: function convert(unit) {
      return new SVGNumber(this.value, unit);
    }
  }]);

  return SVGNumber;
}();

exports.Number = SVGNumber;
var hooks = [];

function registerAttrHook(fn) {
  hooks.push(fn);
} // Set svg element attribute


function attr(attr, val, ns) {
  var _this = this; // act as full getter


  if (attr == null) {
    // get an object of attributes
    attr = {};
    val = this.node.attributes;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = val[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var node = _step.value;
        attr[node.nodeName] = isNumber.test(node.nodeValue) ? parseFloat(node.nodeValue) : node.nodeValue;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return attr;
  } else if (attr instanceof Array) {
    // loop through array and get all values
    return attr.reduce(function (last, curr) {
      last[curr] = _this.attr(curr);
      return last;
    }, {});
  } else if (_typeof(attr) === 'object' && attr.constructor === Object) {
    // apply every attribute individually if an object is passed
    for (val in attr) {
      this.attr(val, attr[val]);
    }
  } else if (val === null) {
    // remove value
    this.node.removeAttribute(attr);
  } else if (val == null) {
    // act as a getter if the first and only argument is not an object
    val = this.node.getAttribute(attr);
    return val == null ? attrs[attr] : isNumber.test(val) ? parseFloat(val) : val;
  } else {
    // Loop through hooks and execute them to convert value
    val = hooks.reduce(function (_val, hook) {
      return hook(attr, _val, _this);
    }, val); // ensure correct numeric values (also accepts NaN and Infinity)

    if (typeof val === 'number') {
      val = new SVGNumber(val);
    } else if (Color.isColor(val)) {
      // ensure full hex color
      val = new Color(val);
    } else if (val.constructor === Array) {
      // Check for plain arrays and parse array values
      val = new SVGArray(val);
    } // if the passed attribute is leading...


    if (attr === 'leading') {
      // ... call the leading method instead
      if (this.leading) {
        this.leading(val);
      }
    } else {
      // set given attribute on node
      typeof ns === 'string' ? this.node.setAttributeNS(ns, attr, val.toString()) : this.node.setAttribute(attr, val.toString());
    } // rebuild if required


    if (this.rebuild && (attr === 'font-size' || attr === 'x')) {
      this.rebuild();
    }
  }

  return this;
}

var Dom =
/*#__PURE__*/
function (_EventTarget) {
  _inherits(Dom, _EventTarget);

  function Dom(node, attrs) {
    var _this2;

    _classCallCheck(this, Dom);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Dom).call(this, node));
    _this2.node = node;
    _this2.type = node.nodeName;

    if (attrs && node !== attrs) {
      _this2.attr(attrs);
    }

    return _this2;
  } // Add given element at a position


  _createClass(Dom, [{
    key: "add",
    value: function add(element, i) {
      element = makeInstance(element);

      if (i == null) {
        this.node.appendChild(element.node);
      } else if (element.node !== this.node.childNodes[i]) {
        this.node.insertBefore(element.node, this.node.childNodes[i]);
      }

      return this;
    } // Add element to given container and return self

  }, {
    key: "addTo",
    value: function addTo(parent) {
      return makeInstance(parent).put(this);
    } // Returns all child elements

  }, {
    key: "children",
    value: function children() {
      return new List(map(this.node.children, function (node) {
        return adopt(node);
      }));
    } // Remove all elements in this container

  }, {
    key: "clear",
    value: function clear() {
      // remove children
      while (this.node.hasChildNodes()) {
        this.node.removeChild(this.node.lastChild);
      }

      return this;
    } // Clone element

  }, {
    key: "clone",
    value: function clone() {
      // write dom data to the dom so the clone can pickup the data
      this.writeDataToDom(); // clone element and assign new id

      return assignNewId(this.node.cloneNode(true));
    } // Iterates over all children and invokes a given block

  }, {
    key: "each",
    value: function each(block, deep) {
      var children = this.children();
      var i, il;

      for (i = 0, il = children.length; i < il; i++) {
        block.apply(children[i], [i, children]);

        if (deep) {
          children[i].each(block, deep);
        }
      }

      return this;
    }
  }, {
    key: "element",
    value: function element(nodeName) {
      return this.put(new Dom(create(nodeName)));
    } // Get first child

  }, {
    key: "first",
    value: function first() {
      return adopt(this.node.firstChild);
    } // Get a element at the given index

  }, {
    key: "get",
    value: function get(i) {
      return adopt(this.node.childNodes[i]);
    }
  }, {
    key: "getEventHolder",
    value: function getEventHolder() {
      return this.node;
    }
  }, {
    key: "getEventTarget",
    value: function getEventTarget() {
      return this.node;
    } // Checks if the given element is a child

  }, {
    key: "has",
    value: function has(element) {
      return this.index(element) >= 0;
    } // Get / set id

  }, {
    key: "id",
    value: function id(_id) {
      // generate new id if no id set
      if (typeof _id === 'undefined' && !this.node.id) {
        this.node.id = eid(this.type);
      } // dont't set directly width this.node.id to make `null` work correctly


      return this.attr('id', _id);
    } // Gets index of given element

  }, {
    key: "index",
    value: function index(element) {
      return [].slice.call(this.node.childNodes).indexOf(element.node);
    } // Get the last child

  }, {
    key: "last",
    value: function last() {
      return adopt(this.node.lastChild);
    } // matches the element vs a css selector

  }, {
    key: "matches",
    value: function matches(selector) {
      var el = this.node;
      return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
    } // Returns the parent element instance

  }, {
    key: "parent",
    value: function parent(type) {
      var parent = this; // check for parent

      if (!parent.node.parentNode) return null; // get parent element

      parent = adopt(parent.node.parentNode);
      if (!type) return parent; // loop trough ancestors if type is given

      while (parent) {
        if (typeof type === 'string' ? parent.matches(type) : parent instanceof type) return parent;
        if (!parent.node.parentNode || parent.node.parentNode.nodeName === '#document' || parent.node.parentNode.nodeName === '#document-fragment') return null; // #759, #720

        parent = adopt(parent.node.parentNode);
      }
    } // Basically does the same as `add()` but returns the added element instead

  }, {
    key: "put",
    value: function put(element, i) {
      this.add(element, i);
      return element;
    } // Add element to given container and return container

  }, {
    key: "putIn",
    value: function putIn(parent) {
      return makeInstance(parent).add(this);
    } // Remove element

  }, {
    key: "remove",
    value: function remove() {
      if (this.parent()) {
        this.parent().removeElement(this);
      }

      return this;
    } // Remove a given child

  }, {
    key: "removeElement",
    value: function removeElement(element) {
      this.node.removeChild(element.node);
      return this;
    } // Replace this with element

  }, {
    key: "replace",
    value: function replace(element) {
      element = makeInstance(element);
      this.node.parentNode.replaceChild(element.node, this.node);
      return element;
    }
  }, {
    key: "round",
    value: function round() {
      var precision = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
      var map = arguments.length > 1 ? arguments[1] : undefined;
      var factor = Math.pow(10, precision);
      var attrs = this.attr(); // If we have no map, build one from attrs

      if (!map) {
        map = Object.keys(attrs);
      } // Holds rounded attributes


      var newAttrs = {};
      map.forEach(function (key) {
        newAttrs[key] = Math.round(attrs[key] * factor) / factor;
      });
      this.attr(newAttrs);
      return this;
    } // Return id on string conversion

  }, {
    key: "toString",
    value: function toString() {
      return this.id();
    } // Import raw svg

  }, {
    key: "svg",
    value: function svg(svgOrFn, outerHTML) {
      var well, len, fragment;

      if (svgOrFn === false) {
        outerHTML = false;
        svgOrFn = null;
      } // act as getter if no svg string is given


      if (svgOrFn == null || typeof svgOrFn === 'function') {
        // The default for exports is, that the outerNode is included
        outerHTML = outerHTML == null ? true : outerHTML; // write svgjs data to the dom

        this.writeDataToDom();
        var current = this; // An export modifier was passed

        if (svgOrFn != null) {
          current = adopt(current.node.cloneNode(true)); // If the user wants outerHTML we need to process this node, too

          if (outerHTML) {
            var result = svgOrFn(current);
            current = result || current; // The user does not want this node? Well, then he gets nothing

            if (result === false) return '';
          } // Deep loop through all children and apply modifier


          current.each(function () {
            var result = svgOrFn(this);

            var _this = result || this; // If modifier returns false, discard node


            if (result === false) {
              this.remove(); // If modifier returns new node, use it
            } else if (result && this !== _this) {
              this.replace(_this);
            }
          }, true);
        } // Return outer or inner content


        return outerHTML ? current.node.outerHTML : current.node.innerHTML;
      } // Act as setter if we got a string
      // The default for import is, that the current node is not replaced


      outerHTML = outerHTML == null ? false : outerHTML; // Create temporary holder

      well = globals.document.createElementNS(ns, 'svg');
      fragment = globals.document.createDocumentFragment(); // Dump raw svg

      well.innerHTML = svgOrFn; // Transplant nodes into the fragment

      for (len = well.children.length; len--;) {
        fragment.appendChild(well.firstElementChild);
      }

      var parent = this.parent(); // Add the whole fragment at once

      return outerHTML ? this.replace(fragment) && parent : this.add(fragment);
    }
  }, {
    key: "words",
    value: function words(text) {
      // This is faster than removing all children and adding a new one
      this.node.textContent = text;
      return this;
    } // write svgjs data to the dom

  }, {
    key: "writeDataToDom",
    value: function writeDataToDom() {
      // dump variables recursively
      this.each(function () {
        this.writeDataToDom();
      });
      return this;
    }
  }]);

  return Dom;
}(EventTarget);

exports.Dom = Dom;
extend(Dom, {
  attr: attr,
  find: find,
  findOne: findOne
});
register(Dom, 'Dom');

var Element =
/*#__PURE__*/
function (_Dom) {
  _inherits(Element, _Dom);

  function Element(node, attrs) {
    var _this;

    _classCallCheck(this, Element);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Element).call(this, node, attrs)); // initialize data object

    _this.dom = {}; // create circular reference

    _this.node.instance = _assertThisInitialized(_this);

    if (node.hasAttribute('svgjs:data')) {
      // pull svgjs data from the dom (getAttributeNS doesn't work in html5)
      _this.setData(JSON.parse(node.getAttribute('svgjs:data')) || {});
    }

    return _this;
  } // Move element by its center


  _createClass(Element, [{
    key: "center",
    value: function center(x, y) {
      return this.cx(x).cy(y);
    } // Move by center over x-axis

  }, {
    key: "cx",
    value: function cx(x) {
      return x == null ? this.x() + this.width() / 2 : this.x(x - this.width() / 2);
    } // Move by center over y-axis

  }, {
    key: "cy",
    value: function cy(y) {
      return y == null ? this.y() + this.height() / 2 : this.y(y - this.height() / 2);
    } // Get defs

  }, {
    key: "defs",
    value: function defs() {
      return this.root().defs();
    } // Relative move over x and y axes

  }, {
    key: "dmove",
    value: function dmove(x, y) {
      return this.dx(x).dy(y);
    } // Relative move over x axis

  }, {
    key: "dx",
    value: function dx() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return this.x(new SVGNumber(x).plus(this.x()));
    } // Relative move over y axis

  }, {
    key: "dy",
    value: function dy() {
      var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return this.y(new SVGNumber(y).plus(this.y()));
    } // Get parent document

  }, {
    key: "root",
    value: function root$1() {
      var p = this.parent(getClass(root));
      return p && p.root();
    }
  }, {
    key: "getEventHolder",
    value: function getEventHolder() {
      return this;
    } // Set height of element

  }, {
    key: "height",
    value: function height(_height) {
      return this.attr('height', _height);
    } // Checks whether the given point inside the bounding box of the element

  }, {
    key: "inside",
    value: function inside(x, y) {
      var box = this.bbox();
      return x > box.x && y > box.y && x < box.x + box.width && y < box.y + box.height;
    } // Move element to given x and y values

  }, {
    key: "move",
    value: function move(x, y) {
      return this.x(x).y(y);
    } // return array of all ancestors of given type up to the root svg

  }, {
    key: "parents",
    value: function parents() {
      var until = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : globals.document;
      until = makeInstance(until);
      var parents = new List();
      var parent = this;

      while ((parent = parent.parent()) && parent.node !== until.node && parent.node !== globals.document) {
        parents.push(parent);
      }

      return parents;
    } // Get referenced element form attribute value

  }, {
    key: "reference",
    value: function reference$1(attr) {
      attr = this.attr(attr);
      if (!attr) return null;
      var m = attr.match(reference);
      return m ? makeInstance(m[1]) : null;
    } // set given data to the elements data property

  }, {
    key: "setData",
    value: function setData(o) {
      this.dom = o;
      return this;
    } // Set element size to given width and height

  }, {
    key: "size",
    value: function size(width, height) {
      var p = proportionalSize(this, width, height);
      return this.width(new SVGNumber(p.width)).height(new SVGNumber(p.height));
    } // Set width of element

  }, {
    key: "width",
    value: function width(_width) {
      return this.attr('width', _width);
    } // write svgjs data to the dom

  }, {
    key: "writeDataToDom",
    value: function writeDataToDom() {
      // remove previously set data
      this.node.removeAttribute('svgjs:data');

      if (Object.keys(this.dom).length) {
        this.node.setAttribute('svgjs:data', JSON.stringify(this.dom)); // see #428
      }

      return _get(_getPrototypeOf(Element.prototype), "writeDataToDom", this).call(this);
    } // Move over x-axis

  }, {
    key: "x",
    value: function x(_x) {
      return this.attr('x', _x);
    } // Move over y-axis

  }, {
    key: "y",
    value: function y(_y) {
      return this.attr('y', _y);
    }
  }]);

  return Element;
}(Dom);

exports.Element = Element;
extend(Element, {
  bbox: bbox,
  rbox: rbox,
  point: point,
  ctm: ctm,
  screenCTM: screenCTM
});
register(Element, 'Element');
var sugar = {
  stroke: ['color', 'width', 'opacity', 'linecap', 'linejoin', 'miterlimit', 'dasharray', 'dashoffset'],
  fill: ['color', 'opacity', 'rule'],
  prefix: function prefix(t, a) {
    return a === 'color' ? t : t + '-' + a;
  }
} // Add sugar for fill and stroke
;
['fill', 'stroke'].forEach(function (m) {
  var extension = {};
  var i;

  extension[m] = function (o) {
    if (typeof o === 'undefined') {
      return this.attr(m);
    }

    if (typeof o === 'string' || o instanceof Color || Color.isRgb(o) || o instanceof Element) {
      this.attr(m, o);
    } else {
      // set all attributes from sugar.fill and sugar.stroke list
      for (i = sugar[m].length - 1; i >= 0; i--) {
        if (o[sugar[m][i]] != null) {
          this.attr(sugar.prefix(m, sugar[m][i]), o[sugar[m][i]]);
        }
      }
    }

    return this;
  };

  registerMethods(['Element', 'Runner'], extension);
});
registerMethods(['Element', 'Runner'], {
  // Let the user set the matrix directly
  matrix: function matrix(mat, b, c, d, e, f) {
    // Act as a getter
    if (mat == null) {
      return new Matrix(this);
    } // Act as a setter, the user can pass a matrix or a set of numbers


    return this.attr('transform', new Matrix(mat, b, c, d, e, f));
  },
  // Map rotation to transform
  rotate: function rotate(angle, cx, cy) {
    return this.transform({
      rotate: angle,
      ox: cx,
      oy: cy
    }, true);
  },
  // Map skew to transform
  skew: function skew(x, y, cx, cy) {
    return arguments.length === 1 || arguments.length === 3 ? this.transform({
      skew: x,
      ox: y,
      oy: cx
    }, true) : this.transform({
      skew: [x, y],
      ox: cx,
      oy: cy
    }, true);
  },
  shear: function shear(lam, cx, cy) {
    return this.transform({
      shear: lam,
      ox: cx,
      oy: cy
    }, true);
  },
  // Map scale to transform
  scale: function scale(x, y, cx, cy) {
    return arguments.length === 1 || arguments.length === 3 ? this.transform({
      scale: x,
      ox: y,
      oy: cx
    }, true) : this.transform({
      scale: [x, y],
      ox: cx,
      oy: cy
    }, true);
  },
  // Map translate to transform
  translate: function translate(x, y) {
    return this.transform({
      translate: [x, y]
    }, true);
  },
  // Map relative translations to transform
  relative: function relative(x, y) {
    return this.transform({
      relative: [x, y]
    }, true);
  },
  // Map flip to transform
  flip: function flip(direction, around) {
    var directionString = typeof direction === 'string' ? direction : isFinite(direction) ? 'both' : 'both';
    var origin = direction === 'both' && isFinite(around) ? [around, around] : direction === 'x' ? [around, 0] : direction === 'y' ? [0, around] : isFinite(direction) ? [direction, direction] : [0, 0];
    return this.transform({
      flip: directionString,
      origin: origin
    }, true);
  },
  // Opacity
  opacity: function opacity(value) {
    return this.attr('opacity', value);
  }
});
registerMethods('radius', {
  // Add x and y radius
  radius: function radius(x, y) {
    var type = (this._element || this).type;
    return type === 'radialGradient' || type === 'radialGradient' ? this.attr('r', new SVGNumber(x)) : this.rx(x).ry(y == null ? x : y);
  }
});
registerMethods('Path', {
  // Get path length
  length: function length() {
    return this.node.getTotalLength();
  },
  // Get point at length
  pointAt: function pointAt(length) {
    return new Point(this.node.getPointAtLength(length));
  }
});
registerMethods(['Element', 'Runner'], {
  // Set font
  font: function font(a, v) {
    if (_typeof(a) === 'object') {
      for (v in a) {
        this.font(v, a[v]);
      }

      return this;
    }

    return a === 'leading' ? this.leading(v) : a === 'anchor' ? this.attr('text-anchor', v) : a === 'size' || a === 'family' || a === 'weight' || a === 'stretch' || a === 'variant' || a === 'style' ? this.attr('font-' + a, v) : this.attr(a, v);
  }
});
registerMethods('Text', {
  ax: function ax(x) {
    return this.attr('x', x);
  },
  ay: function ay(y) {
    return this.attr('y', y);
  },
  amove: function amove(x, y) {
    return this.ax(x).ay(y);
  }
}); // Add events to elements

var methods$1 = ['click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'mousemove', 'mouseenter', 'mouseleave', 'touchstart', 'touchmove', 'touchleave', 'touchend', 'touchcancel'].reduce(function (last, event) {
  // add event to Element
  var fn = function fn(f) {
    if (f === null) {
      off(this, event);
    } else {
      on(this, event, f);
    }

    return this;
  };

  last[event] = fn;
  return last;
}, {});
registerMethods('Element', methods$1);
var nativeReverse = [].reverse;
var test$1 = [1, 2]; // `Array.prototype.reverse` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794

_export({
  target: 'Array',
  proto: true,
  forced: String(test$1) === String(test$1.reverse())
}, {
  reverse: function reverse() {
    // eslint-disable-next-line no-self-assign
    if (isArray(this)) this.length = this.length;
    return nativeReverse.call(this);
  }
}); // `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties


_export({
  target: 'Object',
  stat: true,
  forced: !descriptors,
  sham: !descriptors
}, {
  defineProperties: objectDefineProperties
}); // `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty


_export({
  target: 'Object',
  stat: true,
  forced: !descriptors,
  sham: !descriptors
}, {
  defineProperty: objectDefineProperty.f
});

var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
var FAILS_ON_PRIMITIVES$2 = fails(function () {
  nativeGetOwnPropertyDescriptor$2(1);
});
var FORCED$3 = !descriptors || FAILS_ON_PRIMITIVES$2; // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

_export({
  target: 'Object',
  stat: true,
  forced: FORCED$3,
  sham: !descriptors
}, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor$2(toIndexedObject(it), key);
  }
}); // `Object.getOwnPropertyDescriptors` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors


_export({
  target: 'Object',
  stat: true,
  sham: !descriptors
}, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;

    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }

    return result;
  }
});

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$1(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$1(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function untransform() {
  return this.attr('transform', null);
} // merge the whole transformation chain into one matrix and returns it


function matrixify() {
  var matrix = (this.attr('transform') || ''). // split transformations
  split(transforms).slice(0, -1).map(function (str) {
    // generate key => value pairs
    var kv = str.trim().split('(');
    return [kv[0], kv[1].split(delimiter).map(function (str) {
      return parseFloat(str);
    })];
  }).reverse() // merge every transformation into one matrix
  .reduce(function (matrix, transform) {
    if (transform[0] === 'matrix') {
      return matrix.lmultiply(Matrix.fromArray(transform[1]));
    }

    return matrix[transform[0]].apply(matrix, transform[1]);
  }, new Matrix());
  return matrix;
} // add an element to another parent without changing the visual representation on the screen


function toParent(parent) {
  if (this === parent) return this;
  var ctm = this.screenCTM();
  var pCtm = parent.screenCTM().inverse();
  this.addTo(parent).untransform().transform(pCtm.multiply(ctm));
  return this;
} // same as above with parent equals root-svg


function toRoot() {
  return this.toParent(this.root());
} // Add transformations


function transform(o, relative) {
  // Act as a getter if no object was passed
  if (o == null || typeof o === 'string') {
    var decomposed = new Matrix(this).decompose();
    return o == null ? decomposed : decomposed[o];
  }

  if (!Matrix.isMatrixLike(o)) {
    // Set the origin according to the defined transform
    o = _objectSpread({}, o, {
      origin: getOrigin(o, this)
    });
  } // The user can pass a boolean, an Element or an Matrix or nothing


  var cleanRelative = relative === true ? this : relative || false;
  var result = new Matrix(cleanRelative).transform(o);
  return this.attr('transform', result);
}

registerMethods('Element', {
  untransform: untransform,
  matrixify: matrixify,
  toParent: toParent,
  toRoot: toRoot,
  transform: transform
});

function rx(rx) {
  return this.attr('rx', rx);
} // Radius y value


function ry(ry) {
  return this.attr('ry', ry);
} // Move over x-axis


function x(x) {
  return x == null ? this.cx() - this.rx() : this.cx(x + this.rx());
} // Move over y-axis


function y(y) {
  return y == null ? this.cy() - this.ry() : this.cy(y + this.ry());
} // Move by center over x-axis


function cx(x) {
  return x == null ? this.attr('cx') : this.attr('cx', x);
} // Move by center over y-axis


function cy(y) {
  return y == null ? this.attr('cy') : this.attr('cy', y);
} // Set width of element


function width(width) {
  return width == null ? this.rx() * 2 : this.rx(new SVGNumber(width).divide(2));
} // Set height of element


function height(height) {
  return height == null ? this.ry() * 2 : this.ry(new SVGNumber(height).divide(2));
}

var circled = {
  __proto__: null,
  rx: rx,
  ry: ry,
  x: x,
  y: y,
  cx: cx,
  cy: cy,
  width: width,
  height: height
};

var Shape =
/*#__PURE__*/
function (_Element) {
  _inherits(Shape, _Element);

  function Shape() {
    _classCallCheck(this, Shape);

    return _possibleConstructorReturn(this, _getPrototypeOf(Shape).apply(this, arguments));
  }

  return Shape;
}(Element);

exports.Shape = Shape;
register(Shape, 'Shape');

var Circle =
/*#__PURE__*/
function (_Shape) {
  _inherits(Circle, _Shape);

  function Circle(node) {
    _classCallCheck(this, Circle);

    return _possibleConstructorReturn(this, _getPrototypeOf(Circle).call(this, nodeOrNew('circle', node), node));
  }

  _createClass(Circle, [{
    key: "radius",
    value: function radius(r) {
      return this.attr('r', r);
    } // Radius x value

  }, {
    key: "rx",
    value: function rx(_rx) {
      return this.attr('r', _rx);
    } // Alias radius x value

  }, {
    key: "ry",
    value: function ry(_ry) {
      return this.rx(_ry);
    }
  }, {
    key: "size",
    value: function size(_size) {
      return this.radius(new SVGNumber(_size).divide(2));
    }
  }]);

  return Circle;
}(Shape);

exports.Circle = Circle;
extend(Circle, {
  x: x,
  y: y,
  cx: cx,
  cy: cy,
  width: width,
  height: height
});
registerMethods({
  Container: {
    // Create circle element
    circle: wrapWithAttrCheck(function (size) {
      return this.put(new Circle()).size(size).move(0, 0);
    })
  }
});
register(Circle, 'Circle');

var Container =
/*#__PURE__*/
function (_Element) {
  _inherits(Container, _Element);

  function Container() {
    _classCallCheck(this, Container);

    return _possibleConstructorReturn(this, _getPrototypeOf(Container).apply(this, arguments));
  }

  _createClass(Container, [{
    key: "flatten",
    value: function flatten(parent) {
      this.each(function () {
        if (this instanceof Container) return this.flatten(parent).ungroup(parent);
        return this.toParent(parent);
      }); // we need this so that the root does not get removed

      this.node.firstElementChild || this.remove();
      return this;
    }
  }, {
    key: "ungroup",
    value: function ungroup(parent) {
      parent = parent || this.parent();
      this.each(function () {
        return this.toParent(parent);
      });
      this.remove();
      return this;
    }
  }]);

  return Container;
}(Element);

exports.Container = Container;
register(Container, 'Container');

var Defs =
/*#__PURE__*/
function (_Container) {
  _inherits(Defs, _Container);

  function Defs(node) {
    _classCallCheck(this, Defs);

    return _possibleConstructorReturn(this, _getPrototypeOf(Defs).call(this, nodeOrNew('defs', node), node));
  }

  _createClass(Defs, [{
    key: "flatten",
    value: function flatten() {
      return this;
    }
  }, {
    key: "ungroup",
    value: function ungroup() {
      return this;
    }
  }]);

  return Defs;
}(Container);

exports.Defs = Defs;
register(Defs, 'Defs');

var Ellipse =
/*#__PURE__*/
function (_Shape) {
  _inherits(Ellipse, _Shape);

  function Ellipse(node) {
    _classCallCheck(this, Ellipse);

    return _possibleConstructorReturn(this, _getPrototypeOf(Ellipse).call(this, nodeOrNew('ellipse', node), node));
  }

  _createClass(Ellipse, [{
    key: "size",
    value: function size(width, height) {
      var p = proportionalSize(this, width, height);
      return this.rx(new SVGNumber(p.width).divide(2)).ry(new SVGNumber(p.height).divide(2));
    }
  }]);

  return Ellipse;
}(Shape);

exports.Ellipse = Ellipse;
extend(Ellipse, circled);
registerMethods('Container', {
  // Create an ellipse
  ellipse: wrapWithAttrCheck(function () {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : width;
    return this.put(new Ellipse()).size(width, height).move(0, 0);
  })
});
register(Ellipse, 'Ellipse');

var Stop =
/*#__PURE__*/
function (_Element) {
  _inherits(Stop, _Element);

  function Stop(node) {
    _classCallCheck(this, Stop);

    return _possibleConstructorReturn(this, _getPrototypeOf(Stop).call(this, nodeOrNew('stop', node), node));
  } // add color stops


  _createClass(Stop, [{
    key: "update",
    value: function update(o) {
      if (typeof o === 'number' || o instanceof SVGNumber) {
        o = {
          offset: arguments[0],
          color: arguments[1],
          opacity: arguments[2]
        };
      } // set attributes


      if (o.opacity != null) this.attr('stop-opacity', o.opacity);
      if (o.color != null) this.attr('stop-color', o.color);
      if (o.offset != null) this.attr('offset', new SVGNumber(o.offset));
      return this;
    }
  }]);

  return Stop;
}(Element);

exports.Stop = Stop;
register(Stop, 'Stop');

function from(x, y) {
  return (this._element || this).type === 'radialGradient' ? this.attr({
    fx: new SVGNumber(x),
    fy: new SVGNumber(y)
  }) : this.attr({
    x1: new SVGNumber(x),
    y1: new SVGNumber(y)
  });
}

function to(x, y) {
  return (this._element || this).type === 'radialGradient' ? this.attr({
    cx: new SVGNumber(x),
    cy: new SVGNumber(y)
  }) : this.attr({
    x2: new SVGNumber(x),
    y2: new SVGNumber(y)
  });
}

var gradiented = {
  __proto__: null,
  from: from,
  to: to
};

var Gradient =
/*#__PURE__*/
function (_Container) {
  _inherits(Gradient, _Container);

  function Gradient(type, attrs) {
    _classCallCheck(this, Gradient);

    return _possibleConstructorReturn(this, _getPrototypeOf(Gradient).call(this, nodeOrNew(type + 'Gradient', typeof type === 'string' ? null : type), attrs));
  } // Add a color stop


  _createClass(Gradient, [{
    key: "stop",
    value: function stop(offset, color, opacity) {
      return this.put(new Stop()).update(offset, color, opacity);
    } // Update gradient

  }, {
    key: "update",
    value: function update(block) {
      // remove all stops
      this.clear(); // invoke passed block

      if (typeof block === 'function') {
        block.call(this, this);
      }

      return this;
    } // Return the fill id

  }, {
    key: "url",
    value: function url() {
      return 'url(#' + this.id() + ')';
    } // Alias string convertion to fill

  }, {
    key: "toString",
    value: function toString() {
      return this.url();
    } // custom attr to handle transform

  }, {
    key: "attr",
    value: function attr(a, b, c) {
      if (a === 'transform') a = 'gradientTransform';
      return _get(_getPrototypeOf(Gradient.prototype), "attr", this).call(this, a, b, c);
    }
  }, {
    key: "targets",
    value: function targets() {
      return baseFind('svg [fill*="' + this.id() + '"]');
    }
  }, {
    key: "bbox",
    value: function bbox() {
      return new Box();
    }
  }]);

  return Gradient;
}(Container);

exports.Gradient = Gradient;
extend(Gradient, gradiented);
registerMethods({
  Container: {
    // Create gradient element in defs
    gradient: wrapWithAttrCheck(function (type, block) {
      return this.defs().gradient(type, block);
    })
  },
  // define gradient
  Defs: {
    gradient: wrapWithAttrCheck(function (type, block) {
      return this.put(new Gradient(type)).update(block);
    })
  }
});
register(Gradient, 'Gradient');

var Pattern =
/*#__PURE__*/
function (_Container) {
  _inherits(Pattern, _Container); // Initialize node


  function Pattern(node) {
    _classCallCheck(this, Pattern);

    return _possibleConstructorReturn(this, _getPrototypeOf(Pattern).call(this, nodeOrNew('pattern', node), node));
  } // Return the fill id


  _createClass(Pattern, [{
    key: "url",
    value: function url() {
      return 'url(#' + this.id() + ')';
    } // Update pattern by rebuilding

  }, {
    key: "update",
    value: function update(block) {
      // remove content
      this.clear(); // invoke passed block

      if (typeof block === 'function') {
        block.call(this, this);
      }

      return this;
    } // Alias string convertion to fill

  }, {
    key: "toString",
    value: function toString() {
      return this.url();
    } // custom attr to handle transform

  }, {
    key: "attr",
    value: function attr(a, b, c) {
      if (a === 'transform') a = 'patternTransform';
      return _get(_getPrototypeOf(Pattern.prototype), "attr", this).call(this, a, b, c);
    }
  }, {
    key: "targets",
    value: function targets() {
      return baseFind('svg [fill*="' + this.id() + '"]');
    }
  }, {
    key: "bbox",
    value: function bbox() {
      return new Box();
    }
  }]);

  return Pattern;
}(Container);

exports.Pattern = Pattern;
registerMethods({
  Container: {
    // Create pattern element in defs
    pattern: function pattern() {
      var _this$defs;

      return (_this$defs = this.defs()).pattern.apply(_this$defs, arguments);
    }
  },
  Defs: {
    pattern: wrapWithAttrCheck(function (width, height, block) {
      return this.put(new Pattern()).update(block).attr({
        x: 0,
        y: 0,
        width: width,
        height: height,
        patternUnits: 'userSpaceOnUse'
      });
    })
  }
});
register(Pattern, 'Pattern');

var Image =
/*#__PURE__*/
function (_Shape) {
  _inherits(Image, _Shape);

  function Image(node) {
    _classCallCheck(this, Image);

    return _possibleConstructorReturn(this, _getPrototypeOf(Image).call(this, nodeOrNew('image', node), node));
  } // (re)load image


  _createClass(Image, [{
    key: "load",
    value: function load(url, callback) {
      if (!url) return this;
      var img = new globals.window.Image();
      on(img, 'load', function (e) {
        var p = this.parent(Pattern); // ensure image size

        if (this.width() === 0 && this.height() === 0) {
          this.size(img.width, img.height);
        }

        if (p instanceof Pattern) {
          // ensure pattern size if not set
          if (p.width() === 0 && p.height() === 0) {
            p.size(this.width(), this.height());
          }
        }

        if (typeof callback === 'function') {
          callback.call(this, e);
        }
      }, this);
      on(img, 'load error', function () {
        // dont forget to unbind memory leaking events
        off(img);
      });
      return this.attr('href', img.src = url, xlink);
    }
  }]);

  return Image;
}(Shape);

exports.Image = Image;
registerAttrHook(function (attr, val, _this) {
  // convert image fill and stroke to patterns
  if (attr === 'fill' || attr === 'stroke') {
    if (isImage.test(val)) {
      val = _this.root().defs().image(val);
    }
  }

  if (val instanceof Image) {
    val = _this.root().defs().pattern(0, 0, function (pattern) {
      pattern.add(val);
    });
  }

  return val;
});
registerMethods({
  Container: {
    // create image element, load image and set its size
    image: wrapWithAttrCheck(function (source, callback) {
      return this.put(new Image()).size(0, 0).load(source, callback);
    })
  }
});
register(Image, 'Image');
var PointArray = subClassArray('PointArray', SVGArray);
exports.PointArray = PointArray;
extend(PointArray, {
  // Convert array to string
  toString: function toString() {
    // convert to a poly point string
    for (var i = 0, il = this.length, array = []; i < il; i++) {
      array.push(this[i].join(','));
    }

    return array.join(' ');
  },
  // Convert array to line object
  toLine: function toLine() {
    return {
      x1: this[0][0],
      y1: this[0][1],
      x2: this[1][0],
      y2: this[1][1]
    };
  },
  // Get morphed array at given position
  at: function at(pos) {
    // make sure a destination is defined
    if (!this.destination) return this; // generate morphed point string

    for (var i = 0, il = this.length, array = []; i < il; i++) {
      array.push([this[i][0] + (this.destination[i][0] - this[i][0]) * pos, this[i][1] + (this.destination[i][1] - this[i][1]) * pos]);
    }

    return new PointArray(array);
  },
  // Parse point string and flat array
  parse: function parse() {
    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [[0, 0]];
    var points = []; // if it is an array

    if (array instanceof Array) {
      // and it is not flat, there is no need to parse it
      if (array[0] instanceof Array) {
        return array;
      }
    } else {
      // Else, it is considered as a string
      // parse points
      array = array.trim().split(delimiter).map(parseFloat);
    } // validate points - https://svgwg.org/svg2-draft/shapes.html#DataTypePoints
    // Odd number of coordinates is an error. In such cases, drop the last odd coordinate.


    if (array.length % 2 !== 0) array.pop(); // wrap points in two-tuples

    for (var i = 0, len = array.length; i < len; i = i + 2) {
      points.push([array[i], array[i + 1]]);
    }

    return points;
  },
  // transform points with matrix (similar to Point.transform)
  transform: function transform(m) {
    var points = [];

    for (var i = 0; i < this.length; i++) {
      var point = this[i]; // Perform the matrix multiplication

      points.push([m.a * point[0] + m.c * point[1] + m.e, m.b * point[0] + m.d * point[1] + m.f]);
    } // Return the required point


    return new PointArray(points);
  },
  // Move point string
  move: function move(x, y) {
    var box = this.bbox(); // get relative offset

    x -= box.x;
    y -= box.y; // move every point

    if (!isNaN(x) && !isNaN(y)) {
      for (var i = this.length - 1; i >= 0; i--) {
        this[i] = [this[i][0] + x, this[i][1] + y];
      }
    }

    return this;
  },
  // Resize poly string
  size: function size(width, height) {
    var i;
    var box = this.bbox(); // recalculate position of all points according to new size

    for (i = this.length - 1; i >= 0; i--) {
      if (box.width) this[i][0] = (this[i][0] - box.x) * width / box.width + box.x;
      if (box.height) this[i][1] = (this[i][1] - box.y) * height / box.height + box.y;
    }

    return this;
  },
  // Get bounding box of points
  bbox: function bbox() {
    var maxX = -Infinity;
    var maxY = -Infinity;
    var minX = Infinity;
    var minY = Infinity;
    this.forEach(function (el) {
      maxX = Math.max(el[0], maxX);
      maxY = Math.max(el[1], maxY);
      minX = Math.min(el[0], minX);
      minY = Math.min(el[1], minY);
    });
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }
});
var MorphArray = PointArray; // Move by left top corner over x-axis

function x$1(x) {
  return x == null ? this.bbox().x : this.move(x, this.bbox().y);
} // Move by left top corner over y-axis


function y$1(y) {
  return y == null ? this.bbox().y : this.move(this.bbox().x, y);
} // Set width of element


function width$1(width) {
  var b = this.bbox();
  return width == null ? b.width : this.size(width, b.height);
} // Set height of element


function height$1(height) {
  var b = this.bbox();
  return height == null ? b.height : this.size(b.width, height);
}

var pointed = {
  __proto__: null,
  MorphArray: MorphArray,
  x: x$1,
  y: y$1,
  width: width$1,
  height: height$1
};

var Line =
/*#__PURE__*/
function (_Shape) {
  _inherits(Line, _Shape); // Initialize node


  function Line(node) {
    _classCallCheck(this, Line);

    return _possibleConstructorReturn(this, _getPrototypeOf(Line).call(this, nodeOrNew('line', node), node));
  } // Get array


  _createClass(Line, [{
    key: "array",
    value: function array() {
      return new PointArray([[this.attr('x1'), this.attr('y1')], [this.attr('x2'), this.attr('y2')]]);
    } // Overwrite native plot() method

  }, {
    key: "plot",
    value: function plot(x1, y1, x2, y2) {
      if (x1 == null) {
        return this.array();
      } else if (typeof y1 !== 'undefined') {
        x1 = {
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2
        };
      } else {
        x1 = new PointArray(x1).toLine();
      }

      return this.attr(x1);
    } // Move by left top corner

  }, {
    key: "move",
    value: function move(x, y) {
      return this.attr(this.array().move(x, y).toLine());
    } // Set element size to given width and height

  }, {
    key: "size",
    value: function size(width, height) {
      var p = proportionalSize(this, width, height);
      return this.attr(this.array().size(p.width, p.height).toLine());
    }
  }]);

  return Line;
}(Shape);

exports.Line = Line;
extend(Line, pointed);
registerMethods({
  Container: {
    // Create a line element
    line: wrapWithAttrCheck(function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      } // make sure plot is called as a setter
      // x1 is not necessarily a number, it can also be an array, a string and a PointArray


      return Line.prototype.plot.apply(this.put(new Line()), args[0] != null ? args : [0, 0, 0, 0]);
    })
  }
});
register(Line, 'Line');

var Marker =
/*#__PURE__*/
function (_Container) {
  _inherits(Marker, _Container); // Initialize node


  function Marker(node) {
    _classCallCheck(this, Marker);

    return _possibleConstructorReturn(this, _getPrototypeOf(Marker).call(this, nodeOrNew('marker', node), node));
  } // Set width of element


  _createClass(Marker, [{
    key: "width",
    value: function width(_width) {
      return this.attr('markerWidth', _width);
    } // Set height of element

  }, {
    key: "height",
    value: function height(_height) {
      return this.attr('markerHeight', _height);
    } // Set marker refX and refY

  }, {
    key: "ref",
    value: function ref(x, y) {
      return this.attr('refX', x).attr('refY', y);
    } // Update marker

  }, {
    key: "update",
    value: function update(block) {
      // remove all content
      this.clear(); // invoke passed block

      if (typeof block === 'function') {
        block.call(this, this);
      }

      return this;
    } // Return the fill id

  }, {
    key: "toString",
    value: function toString() {
      return 'url(#' + this.id() + ')';
    }
  }]);

  return Marker;
}(Container);

exports.Marker = Marker;
registerMethods({
  Container: {
    marker: function marker() {
      var _this$defs; // Create marker element in defs


      return (_this$defs = this.defs()).marker.apply(_this$defs, arguments);
    }
  },
  Defs: {
    // Create marker
    marker: wrapWithAttrCheck(function (width, height, block) {
      // Set default viewbox to match the width and height, set ref to cx and cy and set orient to auto
      return this.put(new Marker()).size(width, height).ref(width / 2, height / 2).viewbox(0, 0, width, height).attr('orient', 'auto').update(block);
    })
  },
  marker: {
    // Create and attach markers
    marker: function marker(_marker, width, height, block) {
      var attr = ['marker']; // Build attribute name

      if (_marker !== 'all') attr.push(_marker);
      attr = attr.join('-'); // Set marker attribute

      _marker = arguments[1] instanceof Marker ? arguments[1] : this.defs().marker(width, height, block);
      return this.attr(attr, _marker);
    }
  }
});
register(Marker, 'Marker');
var nativeSort = [].sort;
var test$2 = [1, 2, 3]; // IE8-

var FAILS_ON_UNDEFINED = fails(function () {
  test$2.sort(undefined);
}); // V8 bug

var FAILS_ON_NULL = fails(function () {
  test$2.sort(null);
}); // Old WebKit

var SLOPPY_METHOD$2 = sloppyArrayMethod('sort');
var FORCED$4 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || SLOPPY_METHOD$2; // `Array.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-array.prototype.sort

_export({
  target: 'Array',
  proto: true,
  forced: FORCED$4
}, {
  sort: function sort(comparefn) {
    return comparefn === undefined ? nativeSort.call(toObject(this)) : nativeSort.call(toObject(this), aFunction$1(comparefn));
  }
});
/***
Base Class
==========
The base stepper class that will be
***/


function makeSetterGetter(k, f) {
  return function (v) {
    if (v == null) return this[v];
    this[k] = v;
    if (f) f.call(this);
    return this;
  };
}

var easing = {
  '-': function _(pos) {
    return pos;
  },
  '<>': function _(pos) {
    return -Math.cos(pos * Math.PI) / 2 + 0.5;
  },
  '>': function _(pos) {
    return Math.sin(pos * Math.PI / 2);
  },
  '<': function _(pos) {
    return -Math.cos(pos * Math.PI / 2) + 1;
  },
  bezier: function bezier(x1, y1, x2, y2) {
    // see https://www.w3.org/TR/css-easing-1/#cubic-bezier-algo
    return function (t) {
      if (t < 0) {
        if (x1 > 0) {
          return y1 / x1 * t;
        } else if (x2 > 0) {
          return y2 / x2 * t;
        } else {
          return 0;
        }
      } else if (t > 1) {
        if (x2 < 1) {
          return (1 - y2) / (1 - x2) * t + (y2 - x2) / (1 - x2);
        } else if (x1 < 1) {
          return (1 - y1) / (1 - x1) * t + (y1 - x1) / (1 - x1);
        } else {
          return 1;
        }
      } else {
        return 3 * t * Math.pow(1 - t, 2) * y1 + 3 * Math.pow(t, 2) * (1 - t) * y2 + Math.pow(t, 3);
      }
    };
  },
  // see https://www.w3.org/TR/css-easing-1/#step-timing-function-algo
  steps: function steps(_steps) {
    var stepPosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'end'; // deal with "jump-" prefix

    stepPosition = stepPosition.split('-').reverse()[0];
    var jumps = _steps;

    if (stepPosition === 'none') {
      --jumps;
    } else if (stepPosition === 'both') {
      ++jumps;
    } // The beforeFlag is essentially useless


    return function (t) {
      var beforeFlag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false; // Step is called currentStep in referenced url

      var step = Math.floor(t * _steps);
      var jumping = t * step % 1 === 0;

      if (stepPosition === 'start' || stepPosition === 'both') {
        ++step;
      }

      if (beforeFlag && jumping) {
        --step;
      }

      if (t >= 0 && step < 0) {
        step = 0;
      }

      if (t <= 1 && step > jumps) {
        step = jumps;
      }

      return step / jumps;
    };
  }
};
exports.easing = easing;

var Stepper =
/*#__PURE__*/
function () {
  function Stepper() {
    _classCallCheck(this, Stepper);
  }

  _createClass(Stepper, [{
    key: "done",
    value: function done() {
      return false;
    }
  }]);

  return Stepper;
}();
/***
Easing Functions
================
***/


var Ease =
/*#__PURE__*/
function (_Stepper) {
  _inherits(Ease, _Stepper);

  function Ease(fn) {
    var _this;

    _classCallCheck(this, Ease);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Ease).call(this));
    _this.ease = easing[fn || timeline.ease] || fn;
    return _this;
  }

  _createClass(Ease, [{
    key: "step",
    value: function step(from, to, pos) {
      if (typeof from !== 'number') {
        return pos < 1 ? from : to;
      }

      return from + (to - from) * this.ease(pos);
    }
  }]);

  return Ease;
}(Stepper);
/***
Controller Types
================
***/


exports.Ease = Ease;

var Controller =
/*#__PURE__*/
function (_Stepper2) {
  _inherits(Controller, _Stepper2);

  function Controller(fn) {
    var _this2;

    _classCallCheck(this, Controller);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(Controller).call(this));
    _this2.stepper = fn;
    return _this2;
  }

  _createClass(Controller, [{
    key: "step",
    value: function step(current, target, dt, c) {
      return this.stepper(current, target, dt, c);
    }
  }, {
    key: "done",
    value: function done(c) {
      return c.done;
    }
  }]);

  return Controller;
}(Stepper);

exports.Controller = Controller;

function recalculate() {
  // Apply the default parameters
  var duration = (this._duration || 500) / 1000;
  var overshoot = this._overshoot || 0; // Calculate the PID natural response

  var eps = 1e-10;
  var pi = Math.PI;
  var os = Math.log(overshoot / 100 + eps);
  var zeta = -os / Math.sqrt(pi * pi + os * os);
  var wn = 3.9 / (zeta * duration); // Calculate the Spring values

  this.d = 2 * zeta * wn;
  this.k = wn * wn;
}

var Spring =
/*#__PURE__*/
function (_Controller) {
  _inherits(Spring, _Controller);

  function Spring(duration, overshoot) {
    var _this3;

    _classCallCheck(this, Spring);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(Spring).call(this));

    _this3.duration(duration || 500).overshoot(overshoot || 0);

    return _this3;
  }

  _createClass(Spring, [{
    key: "step",
    value: function step(current, target, dt, c) {
      if (typeof current === 'string') return current;
      c.done = dt === Infinity;
      if (dt === Infinity) return target;
      if (dt === 0) return current;
      if (dt > 100) dt = 16;
      dt /= 1000; // Get the previous velocity

      var velocity = c.velocity || 0; // Apply the control to get the new position and store it

      var acceleration = -this.d * velocity - this.k * (current - target);
      var newPosition = current + velocity * dt + acceleration * dt * dt / 2; // Store the velocity

      c.velocity = velocity + acceleration * dt; // Figure out if we have converged, and if so, pass the value

      c.done = Math.abs(target - newPosition) + Math.abs(velocity) < 0.002;
      return c.done ? target : newPosition;
    }
  }]);

  return Spring;
}(Controller);

exports.Spring = Spring;
extend(Spring, {
  duration: makeSetterGetter('_duration', recalculate),
  overshoot: makeSetterGetter('_overshoot', recalculate)
});

var PID =
/*#__PURE__*/
function (_Controller2) {
  _inherits(PID, _Controller2);

  function PID(p, i, d, windup) {
    var _this4;

    _classCallCheck(this, PID);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(PID).call(this));
    p = p == null ? 0.1 : p;
    i = i == null ? 0.01 : i;
    d = d == null ? 0 : d;
    windup = windup == null ? 1000 : windup;

    _this4.p(p).i(i).d(d).windup(windup);

    return _this4;
  }

  _createClass(PID, [{
    key: "step",
    value: function step(current, target, dt, c) {
      if (typeof current === 'string') return current;
      c.done = dt === Infinity;
      if (dt === Infinity) return target;
      if (dt === 0) return current;
      var p = target - current;
      var i = (c.integral || 0) + p * dt;
      var d = (p - (c.error || 0)) / dt;
      var windup = this.windup; // antiwindup

      if (windup !== false) {
        i = Math.max(-windup, Math.min(i, windup));
      }

      c.error = p;
      c.integral = i;
      c.done = Math.abs(p) < 0.001;
      return c.done ? target : current + (this.P * p + this.I * i + this.D * d);
    }
  }]);

  return PID;
}(Controller);

exports.PID = PID;
extend(PID, {
  windup: makeSetterGetter('windup'),
  p: makeSetterGetter('P'),
  i: makeSetterGetter('I'),
  d: makeSetterGetter('D')
});
var PathArray = subClassArray('PathArray', SVGArray);
exports.PathArray = PathArray;

function pathRegReplace(a, b, c, d) {
  return c + d.replace(dots, ' .');
}

function arrayToString(a) {
  for (var i = 0, il = a.length, s = ''; i < il; i++) {
    s += a[i][0];

    if (a[i][1] != null) {
      s += a[i][1];

      if (a[i][2] != null) {
        s += ' ';
        s += a[i][2];

        if (a[i][3] != null) {
          s += ' ';
          s += a[i][3];
          s += ' ';
          s += a[i][4];

          if (a[i][5] != null) {
            s += ' ';
            s += a[i][5];
            s += ' ';
            s += a[i][6];

            if (a[i][7] != null) {
              s += ' ';
              s += a[i][7];
            }
          }
        }
      }
    }
  }

  return s + ' ';
}

var pathHandlers = {
  M: function M(c, p, p0) {
    p.x = p0.x = c[0];
    p.y = p0.y = c[1];
    return ['M', p.x, p.y];
  },
  L: function L(c, p) {
    p.x = c[0];
    p.y = c[1];
    return ['L', c[0], c[1]];
  },
  H: function H(c, p) {
    p.x = c[0];
    return ['H', c[0]];
  },
  V: function V(c, p) {
    p.y = c[0];
    return ['V', c[0]];
  },
  C: function C(c, p) {
    p.x = c[4];
    p.y = c[5];
    return ['C', c[0], c[1], c[2], c[3], c[4], c[5]];
  },
  S: function S(c, p) {
    p.x = c[2];
    p.y = c[3];
    return ['S', c[0], c[1], c[2], c[3]];
  },
  Q: function Q(c, p) {
    p.x = c[2];
    p.y = c[3];
    return ['Q', c[0], c[1], c[2], c[3]];
  },
  T: function T(c, p) {
    p.x = c[0];
    p.y = c[1];
    return ['T', c[0], c[1]];
  },
  Z: function Z(c, p, p0) {
    p.x = p0.x;
    p.y = p0.y;
    return ['Z'];
  },
  A: function A(c, p) {
    p.x = c[5];
    p.y = c[6];
    return ['A', c[0], c[1], c[2], c[3], c[4], c[5], c[6]];
  }
};
var mlhvqtcsaz = 'mlhvqtcsaz'.split('');

for (var i = 0, il = mlhvqtcsaz.length; i < il; ++i) {
  pathHandlers[mlhvqtcsaz[i]] = function (i) {
    return function (c, p, p0) {
      if (i === 'H') c[0] = c[0] + p.x;else if (i === 'V') c[0] = c[0] + p.y;else if (i === 'A') {
        c[5] = c[5] + p.x;
        c[6] = c[6] + p.y;
      } else {
        for (var j = 0, jl = c.length; j < jl; ++j) {
          c[j] = c[j] + (j % 2 ? p.y : p.x);
        }
      }
      return pathHandlers[i](c, p, p0);
    };
  }(mlhvqtcsaz[i].toUpperCase());
}

extend(PathArray, {
  // Convert array to string
  toString: function toString() {
    return arrayToString(this);
  },
  // Move path string
  move: function move(x, y) {
    // get bounding box of current situation
    var box = this.bbox(); // get relative offset

    x -= box.x;
    y -= box.y;

    if (!isNaN(x) && !isNaN(y)) {
      // move every point
      for (var l, i = this.length - 1; i >= 0; i--) {
        l = this[i][0];

        if (l === 'M' || l === 'L' || l === 'T') {
          this[i][1] += x;
          this[i][2] += y;
        } else if (l === 'H') {
          this[i][1] += x;
        } else if (l === 'V') {
          this[i][1] += y;
        } else if (l === 'C' || l === 'S' || l === 'Q') {
          this[i][1] += x;
          this[i][2] += y;
          this[i][3] += x;
          this[i][4] += y;

          if (l === 'C') {
            this[i][5] += x;
            this[i][6] += y;
          }
        } else if (l === 'A') {
          this[i][6] += x;
          this[i][7] += y;
        }
      }
    }

    return this;
  },
  // Resize path string
  size: function size(width, height) {
    // get bounding box of current situation
    var box = this.bbox();
    var i, l; // If the box width or height is 0 then we ignore
    // transformations on the respective axis

    box.width = box.width === 0 ? 1 : box.width;
    box.height = box.height === 0 ? 1 : box.height; // recalculate position of all points according to new size

    for (i = this.length - 1; i >= 0; i--) {
      l = this[i][0];

      if (l === 'M' || l === 'L' || l === 'T') {
        this[i][1] = (this[i][1] - box.x) * width / box.width + box.x;
        this[i][2] = (this[i][2] - box.y) * height / box.height + box.y;
      } else if (l === 'H') {
        this[i][1] = (this[i][1] - box.x) * width / box.width + box.x;
      } else if (l === 'V') {
        this[i][1] = (this[i][1] - box.y) * height / box.height + box.y;
      } else if (l === 'C' || l === 'S' || l === 'Q') {
        this[i][1] = (this[i][1] - box.x) * width / box.width + box.x;
        this[i][2] = (this[i][2] - box.y) * height / box.height + box.y;
        this[i][3] = (this[i][3] - box.x) * width / box.width + box.x;
        this[i][4] = (this[i][4] - box.y) * height / box.height + box.y;

        if (l === 'C') {
          this[i][5] = (this[i][5] - box.x) * width / box.width + box.x;
          this[i][6] = (this[i][6] - box.y) * height / box.height + box.y;
        }
      } else if (l === 'A') {
        // resize radii
        this[i][1] = this[i][1] * width / box.width;
        this[i][2] = this[i][2] * height / box.height; // move position values

        this[i][6] = (this[i][6] - box.x) * width / box.width + box.x;
        this[i][7] = (this[i][7] - box.y) * height / box.height + box.y;
      }
    }

    return this;
  },
  // Test if the passed path array use the same path data commands as this path array
  equalCommands: function equalCommands(pathArray) {
    var i, il, equalCommands;
    pathArray = new PathArray(pathArray);
    equalCommands = this.length === pathArray.length;

    for (i = 0, il = this.length; equalCommands && i < il; i++) {
      equalCommands = this[i][0] === pathArray[i][0];
    }

    return equalCommands;
  },
  // Make path array morphable
  morph: function morph(pathArray) {
    pathArray = new PathArray(pathArray);

    if (this.equalCommands(pathArray)) {
      this.destination = pathArray;
    } else {
      this.destination = null;
    }

    return this;
  },
  // Get morphed path array at given position
  at: function at(pos) {
    // make sure a destination is defined
    if (!this.destination) return this;
    var sourceArray = this;
    var destinationArray = this.destination.value;
    var array = [];
    var pathArray = new PathArray();
    var i, il, j, jl; // Animate has specified in the SVG spec
    // See: https://www.w3.org/TR/SVG11/paths.html#PathElement

    for (i = 0, il = sourceArray.length; i < il; i++) {
      array[i] = [sourceArray[i][0]];

      for (j = 1, jl = sourceArray[i].length; j < jl; j++) {
        array[i][j] = sourceArray[i][j] + (destinationArray[i][j] - sourceArray[i][j]) * pos;
      } // For the two flags of the elliptical arc command, the SVG spec say:
      // Flags and booleans are interpolated as fractions between zero and one, with any non-zero value considered to be a value of one/true
      // Elliptical arc command as an array followed by corresponding indexes:
      // ['A', rx, ry, x-axis-rotation, large-arc-flag, sweep-flag, x, y]
      //   0    1   2        3                 4             5      6  7


      if (array[i][0] === 'A') {
        array[i][4] = +(array[i][4] !== 0);
        array[i][5] = +(array[i][5] !== 0);
      }
    } // Directly modify the value of a path array, this is done this way for performance


    pathArray.value = array;
    return pathArray;
  },
  // Absolutize and parse path to array
  parse: function parse() {
    var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [['M', 0, 0]]; // if it's already a patharray, no need to parse it

    if (array instanceof PathArray) return array; // prepare for parsing

    var s;
    var paramCnt = {
      M: 2,
      L: 2,
      H: 1,
      V: 1,
      C: 6,
      S: 4,
      Q: 4,
      T: 2,
      A: 7,
      Z: 0
    };

    if (typeof array === 'string') {
      array = array.replace(numbersWithDots, pathRegReplace) // convert 45.123.123 to 45.123 .123
      .replace(pathLetters, ' $& ') // put some room between letters and numbers
      .replace(hyphen, '$1 -') // add space before hyphen
      .trim() // trim
      .split(delimiter); // split into array
    } else {
      array = array.reduce(function (prev, curr) {
        return [].concat.call(prev, curr);
      }, []);
    } // array now is an array containing all parts of a path e.g. ['M', '0', '0', 'L', '30', '30' ...]


    var result = [];
    var p = new Point();
    var p0 = new Point();
    var index = 0;
    var len = array.length;

    do {
      // Test if we have a path letter
      if (isPathLetter.test(array[index])) {
        s = array[index];
        ++index; // If last letter was a move command and we got no new, it defaults to [L]ine
      } else if (s === 'M') {
        s = 'L';
      } else if (s === 'm') {
        s = 'l';
      }

      result.push(pathHandlers[s].call(null, array.slice(index, index = index + paramCnt[s.toUpperCase()]).map(parseFloat), p, p0));
    } while (len > index);

    return result;
  },
  // Get bounding box of path
  bbox: function bbox() {
    parser().path.setAttribute('d', this.toString());
    return parser.nodes.path.getBBox();
  }
});

var Morphable =
/*#__PURE__*/
function () {
  function Morphable(stepper) {
    _classCallCheck(this, Morphable);

    this._stepper = stepper || new Ease('-');
    this._from = null;
    this._to = null;
    this._type = null;
    this._context = null;
    this._morphObj = null;
  }

  _createClass(Morphable, [{
    key: "from",
    value: function from(val) {
      if (val == null) {
        return this._from;
      }

      this._from = this._set(val);
      return this;
    }
  }, {
    key: "to",
    value: function to(val) {
      if (val == null) {
        return this._to;
      }

      this._to = this._set(val);
      return this;
    }
  }, {
    key: "type",
    value: function type(_type) {
      // getter
      if (_type == null) {
        return this._type;
      } // setter


      this._type = _type;
      return this;
    }
  }, {
    key: "_set",
    value: function _set(value) {
      if (!this._type) {
        var type = _typeof(value);

        if (type === 'number') {
          this.type(SVGNumber);
        } else if (type === 'string') {
          if (Color.isColor(value)) {
            this.type(Color);
          } else if (delimiter.test(value)) {
            this.type(pathLetters.test(value) ? PathArray : SVGArray);
          } else if (numberAndUnit.test(value)) {
            this.type(SVGNumber);
          } else {
            this.type(NonMorphable);
          }
        } else if (morphableTypes.indexOf(value.constructor) > -1) {
          this.type(value.constructor);
        } else if (Array.isArray(value)) {
          this.type(SVGArray);
        } else if (type === 'object') {
          this.type(ObjectBag);
        } else {
          this.type(NonMorphable);
        }
      }

      var result = new this._type(value);

      if (this._type === Color) {
        result = this._to ? result[this._to[4]]() : this._from ? result[this._from[4]]() : result;
      }

      result = result.toArray();
      this._morphObj = this._morphObj || new this._type();
      this._context = this._context || Array.apply(null, Array(result.length)).map(Object).map(function (o) {
        o.done = true;
        return o;
      });
      return result;
    }
  }, {
    key: "stepper",
    value: function stepper(_stepper) {
      if (_stepper == null) return this._stepper;
      this._stepper = _stepper;
      return this;
    }
  }, {
    key: "done",
    value: function done() {
      var complete = this._context.map(this._stepper.done).reduce(function (last, curr) {
        return last && curr;
      }, true);

      return complete;
    }
  }, {
    key: "at",
    value: function at(pos) {
      var _this = this;

      return this._morphObj.fromArray(this._from.map(function (i, index) {
        return _this._stepper.step(i, _this._to[index], pos, _this._context[index], _this._context);
      }));
    }
  }]);

  return Morphable;
}();

exports.Morphable = Morphable;

var NonMorphable =
/*#__PURE__*/
function () {
  function NonMorphable() {
    _classCallCheck(this, NonMorphable);

    this.init.apply(this, arguments);
  }

  _createClass(NonMorphable, [{
    key: "init",
    value: function init(val) {
      val = Array.isArray(val) ? val[0] : val;
      this.value = val;
      return this;
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return this.value;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return [this.value];
    }
  }]);

  return NonMorphable;
}();

exports.NonMorphable = NonMorphable;

var TransformBag =
/*#__PURE__*/
function () {
  function TransformBag() {
    _classCallCheck(this, TransformBag);

    this.init.apply(this, arguments);
  }

  _createClass(TransformBag, [{
    key: "init",
    value: function init(obj) {
      if (Array.isArray(obj)) {
        obj = {
          scaleX: obj[0],
          scaleY: obj[1],
          shear: obj[2],
          rotate: obj[3],
          translateX: obj[4],
          translateY: obj[5],
          originX: obj[6],
          originY: obj[7]
        };
      }

      Object.assign(this, TransformBag.defaults, obj);
      return this;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      var v = this;
      return [v.scaleX, v.scaleY, v.shear, v.rotate, v.translateX, v.translateY, v.originX, v.originY];
    }
  }]);

  return TransformBag;
}();

exports.TransformBag = TransformBag;
TransformBag.defaults = {
  scaleX: 1,
  scaleY: 1,
  shear: 0,
  rotate: 0,
  translateX: 0,
  translateY: 0,
  originX: 0,
  originY: 0
};

var ObjectBag =
/*#__PURE__*/
function () {
  function ObjectBag() {
    _classCallCheck(this, ObjectBag);

    this.init.apply(this, arguments);
  }

  _createClass(ObjectBag, [{
    key: "init",
    value: function init(objOrArr) {
      this.values = [];

      if (Array.isArray(objOrArr)) {
        this.values = objOrArr;
        return;
      }

      objOrArr = objOrArr || {};
      var entries = [];

      for (var i in objOrArr) {
        entries.push([i, objOrArr[i]]);
      }

      entries.sort(function (a, b) {
        return a[0] - b[0];
      });
      this.values = entries.reduce(function (last, curr) {
        return last.concat(curr);
      }, []);
      return this;
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      var obj = {};
      var arr = this.values;

      for (var i = 0, len = arr.length; i < len; i += 2) {
        obj[arr[i]] = arr[i + 1];
      }

      return obj;
    }
  }, {
    key: "toArray",
    value: function toArray() {
      return this.values;
    }
  }]);

  return ObjectBag;
}();

exports.ObjectBag = ObjectBag;
var morphableTypes = [NonMorphable, TransformBag, ObjectBag];

function registerMorphableType() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  morphableTypes.push.apply(morphableTypes, _toConsumableArray([].concat(type)));
}

function makeMorphable() {
  extend(morphableTypes, {
    to: function to(val) {
      return new Morphable().type(this.constructor).from(this.valueOf()).to(val);
    },
    fromArray: function fromArray(arr) {
      this.init(arr);
      return this;
    }
  });
}

var Path =
/*#__PURE__*/
function (_Shape) {
  _inherits(Path, _Shape); // Initialize node


  function Path(node) {
    _classCallCheck(this, Path);

    return _possibleConstructorReturn(this, _getPrototypeOf(Path).call(this, nodeOrNew('path', node), node));
  } // Get array


  _createClass(Path, [{
    key: "array",
    value: function array() {
      return this._array || (this._array = new PathArray(this.attr('d')));
    } // Plot new path

  }, {
    key: "plot",
    value: function plot(d) {
      return d == null ? this.array() : this.clear().attr('d', typeof d === 'string' ? d : this._array = new PathArray(d));
    } // Clear array cache

  }, {
    key: "clear",
    value: function clear() {
      delete this._array;
      return this;
    } // Move by left top corner

  }, {
    key: "move",
    value: function move(x, y) {
      return this.attr('d', this.array().move(x, y));
    } // Move by left top corner over x-axis

  }, {
    key: "x",
    value: function x(_x) {
      return _x == null ? this.bbox().x : this.move(_x, this.bbox().y);
    } // Move by left top corner over y-axis

  }, {
    key: "y",
    value: function y(_y) {
      return _y == null ? this.bbox().y : this.move(this.bbox().x, _y);
    } // Set element size to given width and height

  }, {
    key: "size",
    value: function size(width, height) {
      var p = proportionalSize(this, width, height);
      return this.attr('d', this.array().size(p.width, p.height));
    } // Set width of element

  }, {
    key: "width",
    value: function width(_width) {
      return _width == null ? this.bbox().width : this.size(_width, this.bbox().height);
    } // Set height of element

  }, {
    key: "height",
    value: function height(_height) {
      return _height == null ? this.bbox().height : this.size(this.bbox().width, _height);
    }
  }, {
    key: "targets",
    value: function targets() {
      return baseFind('svg textpath [href*="' + this.id() + '"]');
    }
  }]);

  return Path;
}(Shape); // Define morphable array


exports.Path = Path;
Path.prototype.MorphArray = PathArray; // Add parent method

registerMethods({
  Container: {
    // Create a wrapped path element
    path: wrapWithAttrCheck(function (d) {
      // make sure plot is called as a setter
      return this.put(new Path()).plot(d || new PathArray());
    })
  }
});
register(Path, 'Path');

function array() {
  return this._array || (this._array = new PointArray(this.attr('points')));
} // Plot new path


function plot(p) {
  return p == null ? this.array() : this.clear().attr('points', typeof p === 'string' ? p : this._array = new PointArray(p));
} // Clear array cache


function clear() {
  delete this._array;
  return this;
} // Move by left top corner


function move(x, y) {
  return this.attr('points', this.array().move(x, y));
} // Set element size to given width and height


function size(width, height) {
  var p = proportionalSize(this, width, height);
  return this.attr('points', this.array().size(p.width, p.height));
}

var poly = {
  __proto__: null,
  array: array,
  plot: plot,
  clear: clear,
  move: move,
  size: size
};

var Polygon =
/*#__PURE__*/
function (_Shape) {
  _inherits(Polygon, _Shape); // Initialize node


  function Polygon(node) {
    _classCallCheck(this, Polygon);

    return _possibleConstructorReturn(this, _getPrototypeOf(Polygon).call(this, nodeOrNew('polygon', node), node));
  }

  return Polygon;
}(Shape);

exports.Polygon = Polygon;
registerMethods({
  Container: {
    // Create a wrapped polygon element
    polygon: wrapWithAttrCheck(function (p) {
      // make sure plot is called as a setter
      return this.put(new Polygon()).plot(p || new PointArray());
    })
  }
});
extend(Polygon, pointed);
extend(Polygon, poly);
register(Polygon, 'Polygon');

var Polyline =
/*#__PURE__*/
function (_Shape) {
  _inherits(Polyline, _Shape); // Initialize node


  function Polyline(node) {
    _classCallCheck(this, Polyline);

    return _possibleConstructorReturn(this, _getPrototypeOf(Polyline).call(this, nodeOrNew('polyline', node), node));
  }

  return Polyline;
}(Shape);

exports.Polyline = Polyline;
registerMethods({
  Container: {
    // Create a wrapped polygon element
    polyline: wrapWithAttrCheck(function (p) {
      // make sure plot is called as a setter
      return this.put(new Polyline()).plot(p || new PointArray());
    })
  }
});
extend(Polyline, pointed);
extend(Polyline, poly);
register(Polyline, 'Polyline');

var Rect =
/*#__PURE__*/
function (_Shape) {
  _inherits(Rect, _Shape); // Initialize node


  function Rect(node) {
    _classCallCheck(this, Rect);

    return _possibleConstructorReturn(this, _getPrototypeOf(Rect).call(this, nodeOrNew('rect', node), node));
  }

  return Rect;
}(Shape);

exports.Rect = Rect;
extend(Rect, {
  rx: rx,
  ry: ry
});
registerMethods({
  Container: {
    // Create a rect element
    rect: wrapWithAttrCheck(function (width, height) {
      return this.put(new Rect()).size(width, height);
    })
  }
});
register(Rect, 'Rect');
var max$3 = Math.max;
var min$4 = Math.min;
var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species

_export({
  target: 'Array',
  proto: true,
  forced: !arrayMethodHasSpeciesSupport('splice')
}, {
  splice: function splice(start, deleteCount
  /* , ...items */
  ) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;

    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min$4(max$3(toInteger(deleteCount), 0), len - actualStart);
    }

    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }

    A = arraySpeciesCreate(O, actualDeleteCount);

    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }

    A.length = actualDeleteCount;

    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];else delete O[to];
      }

      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];else delete O[to];
      }
    }

    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }

    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

var Queue =
/*#__PURE__*/
function () {
  function Queue() {
    _classCallCheck(this, Queue);

    this._first = null;
    this._last = null;
  }

  _createClass(Queue, [{
    key: "push",
    value: function push(value) {
      // An item stores an id and the provided value
      var item = value.next ? value : {
        value: value,
        next: null,
        prev: null
      }; // Deal with the queue being empty or populated

      if (this._last) {
        item.prev = this._last;
        this._last.next = item;
        this._last = item;
      } else {
        this._last = item;
        this._first = item;
      } // Return the current item


      return item;
    }
  }, {
    key: "shift",
    value: function shift() {
      // Check if we have a value
      var remove = this._first;
      if (!remove) return null; // If we do, remove it and relink things

      this._first = remove.next;
      if (this._first) this._first.prev = null;
      this._last = this._first ? this._last : null;
      return remove.value;
    } // Shows us the first item in the list

  }, {
    key: "first",
    value: function first() {
      return this._first && this._first.value;
    } // Shows us the last item in the list

  }, {
    key: "last",
    value: function last() {
      return this._last && this._last.value;
    } // Removes the item that was returned from the push

  }, {
    key: "remove",
    value: function remove(item) {
      // Relink the previous item
      if (item.prev) item.prev.next = item.next;
      if (item.next) item.next.prev = item.prev;
      if (item === this._last) this._last = item.prev;
      if (item === this._first) this._first = item.next; // Invalidate item

      item.prev = null;
      item.next = null;
    }
  }]);

  return Queue;
}();

exports.Queue = Queue;
var Animator = {
  nextDraw: null,
  frames: new Queue(),
  timeouts: new Queue(),
  immediates: new Queue(),
  timer: function timer() {
    return globals.window.performance || globals.window.Date;
  },
  transforms: [],
  frame: function frame(fn) {
    // Store the node
    var node = Animator.frames.push({
      run: fn
    }); // Request an animation frame if we don't have one

    if (Animator.nextDraw === null) {
      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
    } // Return the node so we can remove it easily


    return node;
  },
  timeout: function timeout(fn, delay) {
    delay = delay || 0; // Work out when the event should fire

    var time = Animator.timer().now() + delay; // Add the timeout to the end of the queue

    var node = Animator.timeouts.push({
      run: fn,
      time: time
    }); // Request another animation frame if we need one

    if (Animator.nextDraw === null) {
      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
    }

    return node;
  },
  immediate: function immediate(fn) {
    // Add the immediate fn to the end of the queue
    var node = Animator.immediates.push(fn); // Request another animation frame if we need one

    if (Animator.nextDraw === null) {
      Animator.nextDraw = globals.window.requestAnimationFrame(Animator._draw);
    }

    return node;
  },
  cancelFrame: function cancelFrame(node) {
    node != null && Animator.frames.remove(node);
  },
  clearTimeout: function clearTimeout(node) {
    node != null && Animator.timeouts.remove(node);
  },
  cancelImmediate: function cancelImmediate(node) {
    node != null && Animator.immediates.remove(node);
  },
  _draw: function _draw(now) {
    // Run all the timeouts we can run, if they are not ready yet, add them
    // to the end of the queue immediately! (bad timeouts!!! [sarcasm])
    var nextTimeout = null;
    var lastTimeout = Animator.timeouts.last();

    while (nextTimeout = Animator.timeouts.shift()) {
      // Run the timeout if its time, or push it to the end
      if (now >= nextTimeout.time) {
        nextTimeout.run();
      } else {
        Animator.timeouts.push(nextTimeout);
      } // If we hit the last item, we should stop shifting out more items


      if (nextTimeout === lastTimeout) break;
    } // Run all of the animation frames


    var nextFrame = null;
    var lastFrame = Animator.frames.last();

    while (nextFrame !== lastFrame && (nextFrame = Animator.frames.shift())) {
      nextFrame.run(now);
    }

    var nextImmediate = null;

    while (nextImmediate = Animator.immediates.shift()) {
      nextImmediate();
    } // If we have remaining timeouts or frames, draw until we don't anymore


    Animator.nextDraw = Animator.timeouts.first() || Animator.frames.first() ? globals.window.requestAnimationFrame(Animator._draw) : null;
  }
};
exports.Animator = Animator;

var makeSchedule = function makeSchedule(runnerInfo) {
  var start = runnerInfo.start;
  var duration = runnerInfo.runner.duration();
  var end = start + duration;
  return {
    start: start,
    duration: duration,
    end: end,
    runner: runnerInfo.runner
  };
};

var defaultSource = function defaultSource() {
  var w = globals.window;
  return (w.performance || w.Date).now();
};

var Timeline =
/*#__PURE__*/
function (_EventTarget) {
  _inherits(Timeline, _EventTarget); // Construct a new timeline on the given element


  function Timeline() {
    var _this;

    var timeSource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultSource;

    _classCallCheck(this, Timeline);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Timeline).call(this));
    _this._timeSource = timeSource; // Store the timing variables

    _this._startTime = 0;
    _this._speed = 1.0; // Determines how long a runner is hold in memory. Can be a dt or true/false

    _this._persist = 0; // Keep track of the running animations and their starting parameters

    _this._nextFrame = null;
    _this._paused = true;
    _this._runners = [];
    _this._runnerIds = [];
    _this._lastRunnerId = -1;
    _this._time = 0;
    _this._lastSourceTime = 0;
    _this._lastStepTime = 0; // Make sure that step is always called in class context

    _this._step = _this._stepFn.bind(_assertThisInitialized(_this), false);
    _this._stepImmediate = _this._stepFn.bind(_assertThisInitialized(_this), true);
    return _this;
  } // schedules a runner on the timeline


  _createClass(Timeline, [{
    key: "schedule",
    value: function schedule(runner, delay, when) {
      if (runner == null) {
        return this._runners.map(makeSchedule);
      } // The start time for the next animation can either be given explicitly,
      // derived from the current timeline time or it can be relative to the
      // last start time to chain animations direclty


      var absoluteStartTime = 0;
      var endTime = this.getEndTime();
      delay = delay || 0; // Work out when to start the animation

      if (when == null || when === 'last' || when === 'after') {
        // Take the last time and increment
        absoluteStartTime = endTime;
      } else if (when === 'absolute' || when === 'start') {
        absoluteStartTime = delay;
        delay = 0;
      } else if (when === 'now') {
        absoluteStartTime = this._time;
      } else if (when === 'relative') {
        var _runnerInfo = this._runners[runner.id];

        if (_runnerInfo) {
          absoluteStartTime = _runnerInfo.start + delay;
          delay = 0;
        }
      } else {
        throw new Error('Invalid value for the "when" parameter');
      } // Manage runner


      runner.unschedule();
      runner.timeline(this);
      var persist = runner.persist();
      var runnerInfo = {
        persist: persist === null ? this._persist : persist,
        start: absoluteStartTime + delay,
        runner: runner
      };
      this._lastRunnerId = runner.id;

      this._runners.push(runnerInfo);

      this._runners.sort(function (a, b) {
        return a.start - b.start;
      });

      this._runnerIds = this._runners.map(function (info) {
        return info.runner.id;
      });

      this.updateTime()._continue();

      return this;
    } // Remove the runner from this timeline

  }, {
    key: "unschedule",
    value: function unschedule(runner) {
      var index = this._runnerIds.indexOf(runner.id);

      if (index < 0) return this;

      this._runners.splice(index, 1);

      this._runnerIds.splice(index, 1);

      runner.timeline(null);
      return this;
    } // Calculates the end of the timeline

  }, {
    key: "getEndTime",
    value: function getEndTime() {
      var lastRunnerInfo = this._runners[this._runnerIds.indexOf(this._lastRunnerId)];

      var lastDuration = lastRunnerInfo ? lastRunnerInfo.runner.duration() : 0;
      var lastStartTime = lastRunnerInfo ? lastRunnerInfo.start : 0;
      return lastStartTime + lastDuration;
    }
  }, {
    key: "getEndTimeOfTimeline",
    value: function getEndTimeOfTimeline() {
      var lastEndTime = 0;

      for (var i = 0; i < this._runners.length; i++) {
        var runnerInfo = this._runners[i];
        var duration = runnerInfo ? runnerInfo.runner.duration() : 0;
        var startTime = runnerInfo ? runnerInfo.start : 0;
        var endTime = startTime + duration;

        if (endTime > lastEndTime) {
          lastEndTime = endTime;
        }
      }

      return lastEndTime;
    } // Makes sure, that after pausing the time doesn't jump

  }, {
    key: "updateTime",
    value: function updateTime() {
      if (!this.active()) {
        this._lastSourceTime = this._timeSource();
      }

      return this;
    }
  }, {
    key: "play",
    value: function play() {
      // Now make sure we are not paused and continue the animation
      this._paused = false;
      return this.updateTime()._continue();
    }
  }, {
    key: "pause",
    value: function pause() {
      this._paused = true;
      return this._continue();
    }
  }, {
    key: "stop",
    value: function stop() {
      // Go to start and pause
      this.time(0);
      return this.pause();
    }
  }, {
    key: "finish",
    value: function finish() {
      // Go to end and pause
      this.time(this.getEndTimeOfTimeline() + 1);
      return this.pause();
    }
  }, {
    key: "speed",
    value: function speed(_speed) {
      if (_speed == null) return this._speed;
      this._speed = _speed;
      return this;
    }
  }, {
    key: "reverse",
    value: function reverse(yes) {
      var currentSpeed = this.speed();
      if (yes == null) return this.speed(-currentSpeed);
      var positive = Math.abs(currentSpeed);
      return this.speed(yes ? positive : -positive);
    }
  }, {
    key: "seek",
    value: function seek(dt) {
      return this.time(this._time + dt);
    }
  }, {
    key: "time",
    value: function time(_time) {
      if (_time == null) return this._time;
      this._time = _time;
      return this._continue(true);
    }
  }, {
    key: "persist",
    value: function persist(dtOrForever) {
      if (dtOrForever == null) return this._persist;
      this._persist = dtOrForever;
      return this;
    }
  }, {
    key: "source",
    value: function source(fn) {
      if (fn == null) return this._timeSource;
      this._timeSource = fn;
      return this;
    }
  }, {
    key: "_stepFn",
    value: function _stepFn() {
      var immediateStep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false; // Get the time delta from the last time and update the time

      var time = this._timeSource();

      var dtSource = time - this._lastSourceTime;
      if (immediateStep) dtSource = 0;
      var dtTime = this._speed * dtSource + (this._time - this._lastStepTime);
      this._lastSourceTime = time; // Only update the time if we use the timeSource.
      // Otherwise use the current time

      if (!immediateStep) {
        // Update the time
        this._time += dtTime;
        this._time = this._time < 0 ? 0 : this._time;
      }

      this._lastStepTime = this._time;
      this.fire('time', this._time); // This is for the case that the timeline was seeked so that the time
      // is now before the startTime of the runner. Thats why we need to set
      // the runner to position 0
      // FIXME:
      // However, reseting in insertion order leads to bugs. Considering the case,
      // where 2 runners change the same attriute but in different times,
      // reseting both of them will lead to the case where the later defined
      // runner always wins the reset even if the other runner started earlier
      // and therefore should win the attribute battle
      // this can be solved by reseting them backwards

      for (var k = this._runners.length; k--;) {
        // Get and run the current runner and ignore it if its inactive
        var runnerInfo = this._runners[k];
        var runner = runnerInfo.runner; // Make sure that we give the actual difference
        // between runner start time and now

        var dtToStart = this._time - runnerInfo.start; // Dont run runner if not started yet
        // and try to reset it

        if (dtToStart <= 0) {
          runner.reset();
        }
      } // Run all of the runners directly


      var runnersLeft = false;

      for (var i = 0, len = this._runners.length; i < len; i++) {
        // Get and run the current runner and ignore it if its inactive
        var _runnerInfo2 = this._runners[i];
        var _runner = _runnerInfo2.runner;
        var dt = dtTime; // Make sure that we give the actual difference
        // between runner start time and now

        var _dtToStart = this._time - _runnerInfo2.start; // Dont run runner if not started yet


        if (_dtToStart <= 0) {
          runnersLeft = true;
          continue;
        } else if (_dtToStart < dt) {
          // Adjust dt to make sure that animation is on point
          dt = _dtToStart;
        }

        if (!_runner.active()) continue; // If this runner is still going, signal that we need another animation
        // frame, otherwise, remove the completed runner

        var finished = _runner.step(dt).done;

        if (!finished) {
          runnersLeft = true; // continue
        } else if (_runnerInfo2.persist !== true) {
          // runner is finished. And runner might get removed
          var endTime = _runner.duration() - _runner.time() + this._time;

          if (endTime + _runnerInfo2.persist < this._time) {
            // Delete runner and correct index
            _runner.unschedule();

            --i;
            --len;
          }
        }
      } // Basically: we continue when there are runners right from us in time
      // when -->, and when runners are left from us when <--


      if (runnersLeft && !(this._speed < 0 && this._time === 0) || this._runnerIds.length && this._speed < 0 && this._time > 0) {
        this._continue();
      } else {
        this.pause();
        this.fire('finished');
      }

      return this;
    } // Checks if we are running and continues the animation

  }, {
    key: "_continue",
    value: function _continue() {
      var immediateStep = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      Animator.cancelFrame(this._nextFrame);
      this._nextFrame = null;
      if (immediateStep) return this._stepImmediate();
      if (this._paused) return this;
      this._nextFrame = Animator.frame(this._step);
      return this;
    }
  }, {
    key: "active",
    value: function active() {
      return !!this._nextFrame;
    }
  }]);

  return Timeline;
}(EventTarget);

exports.Timeline = Timeline;
registerMethods({
  Element: {
    timeline: function timeline(_timeline) {
      if (_timeline == null) {
        this._timeline = this._timeline || new Timeline();
        return this._timeline;
      } else {
        this._timeline = _timeline;
        return this;
      }
    }
  }
});

function ownKeys$2(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$2(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$2(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var Runner =
/*#__PURE__*/
function (_EventTarget) {
  _inherits(Runner, _EventTarget);

  function Runner(options) {
    var _this;

    _classCallCheck(this, Runner);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Runner).call(this)); // Store a unique id on the runner, so that we can identify it later

    _this.id = Runner.id++; // Ensure a default value

    options = options == null ? timeline.duration : options; // Ensure that we get a controller

    options = typeof options === 'function' ? new Controller(options) : options; // Declare all of the variables

    _this._element = null;
    _this._timeline = null;
    _this.done = false;
    _this._queue = []; // Work out the stepper and the duration

    _this._duration = typeof options === 'number' && options;
    _this._isDeclarative = options instanceof Controller;
    _this._stepper = _this._isDeclarative ? options : new Ease(); // We copy the current values from the timeline because they can change

    _this._history = {}; // Store the state of the runner

    _this.enabled = true;
    _this._time = 0;
    _this._lastTime = 0; // At creation, the runner is in reseted state

    _this._reseted = true; // Save transforms applied to this runner

    _this.transforms = new Matrix();
    _this.transformId = 1; // Looping variables

    _this._haveReversed = false;
    _this._reverse = false;
    _this._loopsDone = 0;
    _this._swing = false;
    _this._wait = 0;
    _this._times = 1;
    _this._frameId = null; // Stores how long a runner is stored after beeing done

    _this._persist = _this._isDeclarative ? true : null;
    return _this;
  }
  /*
  Runner Definitions
  ==================
  These methods help us define the runtime behaviour of the Runner or they
  help us make new runners from the current runner
  */


  _createClass(Runner, [{
    key: "element",
    value: function element(_element) {
      if (_element == null) return this._element;
      this._element = _element;

      _element._prepareRunner();

      return this;
    }
  }, {
    key: "timeline",
    value: function timeline(_timeline) {
      // check explicitly for undefined so we can set the timeline to null
      if (typeof _timeline === 'undefined') return this._timeline;
      this._timeline = _timeline;
      return this;
    }
  }, {
    key: "animate",
    value: function animate(duration, delay, when) {
      var o = Runner.sanitise(duration, delay, when);
      var runner = new Runner(o.duration);
      if (this._timeline) runner.timeline(this._timeline);
      if (this._element) runner.element(this._element);
      return runner.loop(o).schedule(o.delay, o.when);
    }
  }, {
    key: "schedule",
    value: function schedule(timeline, delay, when) {
      // The user doesn't need to pass a timeline if we already have one
      if (!(timeline instanceof Timeline)) {
        when = delay;
        delay = timeline;
        timeline = this.timeline();
      } // If there is no timeline, yell at the user...


      if (!timeline) {
        throw Error('Runner cannot be scheduled without timeline');
      } // Schedule the runner on the timeline provided


      timeline.schedule(this, delay, when);
      return this;
    }
  }, {
    key: "unschedule",
    value: function unschedule() {
      var timeline = this.timeline();
      timeline && timeline.unschedule(this);
      return this;
    }
  }, {
    key: "loop",
    value: function loop(times, swing, wait) {
      // Deal with the user passing in an object
      if (_typeof(times) === 'object') {
        swing = times.swing;
        wait = times.wait;
        times = times.times;
      } // Sanitise the values and store them


      this._times = times || Infinity;
      this._swing = swing || false;
      this._wait = wait || 0; // Allow true to be passed

      if (this._times === true) {
        this._times = Infinity;
      }

      return this;
    }
  }, {
    key: "delay",
    value: function delay(_delay) {
      return this.animate(0, _delay);
    }
    /*
    Basic Functionality
    ===================
    These methods allow us to attach basic functions to the runner directly
    */

  }, {
    key: "queue",
    value: function queue(initFn, runFn, retargetFn, isTransform) {
      this._queue.push({
        initialiser: initFn || noop,
        runner: runFn || noop,
        retarget: retargetFn,
        isTransform: isTransform,
        initialised: false,
        finished: false
      });

      var timeline = this.timeline();
      timeline && this.timeline()._continue();
      return this;
    }
  }, {
    key: "during",
    value: function during(fn) {
      return this.queue(null, fn);
    }
  }, {
    key: "after",
    value: function after(fn) {
      return this.on('finished', fn);
    }
    /*
    Runner animation methods
    ========================
    Control how the animation plays
    */

  }, {
    key: "time",
    value: function time(_time) {
      if (_time == null) {
        return this._time;
      }

      var dt = _time - this._time;
      this.step(dt);
      return this;
    }
  }, {
    key: "duration",
    value: function duration() {
      return this._times * (this._wait + this._duration) - this._wait;
    }
  }, {
    key: "loops",
    value: function loops(p) {
      var loopDuration = this._duration + this._wait;

      if (p == null) {
        var loopsDone = Math.floor(this._time / loopDuration);
        var relativeTime = this._time - loopsDone * loopDuration;
        var position = relativeTime / this._duration;
        return Math.min(loopsDone + position, this._times);
      }

      var whole = Math.floor(p);
      var partial = p % 1;
      var time = loopDuration * whole + this._duration * partial;
      return this.time(time);
    }
  }, {
    key: "persist",
    value: function persist(dtOrForever) {
      if (dtOrForever == null) return this._persist;
      this._persist = dtOrForever;
      return this;
    }
  }, {
    key: "position",
    value: function position(p) {
      // Get all of the variables we need
      var x = this._time;
      var d = this._duration;
      var w = this._wait;
      var t = this._times;
      var s = this._swing;
      var r = this._reverse;
      var position;

      if (p == null) {
        /*
        This function converts a time to a position in the range [0, 1]
        The full explanation can be found in this desmos demonstration
          https://www.desmos.com/calculator/u4fbavgche
        The logic is slightly simplified here because we can use booleans
        */
        // Figure out the value without thinking about the start or end time
        var f = function f(x) {
          var swinging = s * Math.floor(x % (2 * (w + d)) / (w + d));
          var backwards = swinging && !r || !swinging && r;
          var uncliped = Math.pow(-1, backwards) * (x % (w + d)) / d + backwards;
          var clipped = Math.max(Math.min(uncliped, 1), 0);
          return clipped;
        }; // Figure out the value by incorporating the start time


        var endTime = t * (w + d) - w;
        position = x <= 0 ? Math.round(f(1e-5)) : x < endTime ? f(x) : Math.round(f(endTime - 1e-5));
        return position;
      } // Work out the loops done and add the position to the loops done


      var loopsDone = Math.floor(this.loops());
      var swingForward = s && loopsDone % 2 === 0;
      var forwards = swingForward && !r || r && swingForward;
      position = loopsDone + (forwards ? p : 1 - p);
      return this.loops(position);
    }
  }, {
    key: "progress",
    value: function progress(p) {
      if (p == null) {
        return Math.min(1, this._time / this.duration());
      }

      return this.time(p * this.duration());
    }
  }, {
    key: "step",
    value: function step(dt) {
      // If we are inactive, this stepper just gets skipped
      if (!this.enabled) return this; // Update the time and get the new position

      dt = dt == null ? 16 : dt;
      this._time += dt;
      var position = this.position(); // Figure out if we need to run the stepper in this frame

      var running = this._lastPosition !== position && this._time >= 0;
      this._lastPosition = position; // Figure out if we just started

      var duration = this.duration();
      var justStarted = this._lastTime <= 0 && this._time > 0;
      var justFinished = this._lastTime < duration && this._time >= duration;
      this._lastTime = this._time;

      if (justStarted) {
        this.fire('start', this);
      } // Work out if the runner is finished set the done flag here so animations
      // know, that they are running in the last step (this is good for
      // transformations which can be merged)


      var declarative = this._isDeclarative;
      this.done = !declarative && !justFinished && this._time >= duration; // Runner is running. So its not in reseted state anymore

      this._reseted = false; // Call initialise and the run function

      if (running || declarative) {
        this._initialise(running); // clear the transforms on this runner so they dont get added again and again


        this.transforms = new Matrix();

        var converged = this._run(declarative ? dt : position);

        this.fire('step', this);
      } // correct the done flag here
      // declaritive animations itself know when they converged


      this.done = this.done || converged && declarative;

      if (justFinished) {
        this.fire('finished', this);
      }

      return this;
    }
  }, {
    key: "reset",
    value: function reset() {
      if (this._reseted) return this;
      this.time(0);
      this._reseted = true;
      return this;
    }
  }, {
    key: "finish",
    value: function finish() {
      return this.step(Infinity);
    }
  }, {
    key: "reverse",
    value: function reverse(_reverse) {
      this._reverse = _reverse == null ? !this._reverse : _reverse;
      return this;
    }
  }, {
    key: "ease",
    value: function ease(fn) {
      this._stepper = new Ease(fn);
      return this;
    }
  }, {
    key: "active",
    value: function active(enabled) {
      if (enabled == null) return this.enabled;
      this.enabled = enabled;
      return this;
    }
    /*
    Private Methods
    ===============
    Methods that shouldn't be used externally
    */
    // Save a morpher to the morpher list so that we can retarget it later

  }, {
    key: "_rememberMorpher",
    value: function _rememberMorpher(method, morpher) {
      this._history[method] = {
        morpher: morpher,
        caller: this._queue[this._queue.length - 1]
      }; // We have to resume the timeline in case a controller
      // is already done without beeing ever run
      // This can happen when e.g. this is done:
      //    anim = el.animate(new SVG.Spring)
      // and later
      //    anim.move(...)

      if (this._isDeclarative) {
        var timeline = this.timeline();
        timeline && timeline.play();
      }
    } // Try to set the target for a morpher if the morpher exists, otherwise
    // do nothing and return false

  }, {
    key: "_tryRetarget",
    value: function _tryRetarget(method, target, extra) {
      if (this._history[method]) {
        // if the last method wasnt even initialised, throw it away
        if (!this._history[method].caller.initialised) {
          var index = this._queue.indexOf(this._history[method].caller);

          this._queue.splice(index, 1);

          return false;
        } // for the case of transformations, we use the special retarget function
        // which has access to the outer scope


        if (this._history[method].caller.retarget) {
          this._history[method].caller.retarget(target, extra); // for everything else a simple morpher change is sufficient

        } else {
          this._history[method].morpher.to(target);
        }

        this._history[method].caller.finished = false;
        var timeline = this.timeline();
        timeline && timeline.play();
        return true;
      }

      return false;
    } // Run each initialise function in the runner if required

  }, {
    key: "_initialise",
    value: function _initialise(running) {
      // If we aren't running, we shouldn't initialise when not declarative
      if (!running && !this._isDeclarative) return; // Loop through all of the initialisers

      for (var i = 0, len = this._queue.length; i < len; ++i) {
        // Get the current initialiser
        var current = this._queue[i]; // Determine whether we need to initialise

        var needsIt = this._isDeclarative || !current.initialised && running;
        running = !current.finished; // Call the initialiser if we need to

        if (needsIt && running) {
          current.initialiser.call(this);
          current.initialised = true;
        }
      }
    } // Run each run function for the position or dt given

  }, {
    key: "_run",
    value: function _run(positionOrDt) {
      // Run all of the _queue directly
      var allfinished = true;

      for (var i = 0, len = this._queue.length; i < len; ++i) {
        // Get the current function to run
        var current = this._queue[i]; // Run the function if its not finished, we keep track of the finished
        // flag for the sake of declarative _queue

        var converged = current.runner.call(this, positionOrDt);
        current.finished = current.finished || converged === true;
        allfinished = allfinished && current.finished;
      } // We report when all of the constructors are finished


      return allfinished;
    }
  }, {
    key: "addTransform",
    value: function addTransform(transform, index) {
      this.transforms.lmultiplyO(transform);
      return this;
    }
  }, {
    key: "clearTransform",
    value: function clearTransform() {
      this.transforms = new Matrix();
      return this;
    } // TODO: Keep track of all transformations so that deletion is faster

  }, {
    key: "clearTransformsFromQueue",
    value: function clearTransformsFromQueue() {
      if (!this.done || !this._timeline || !this._timeline._runnerIds.includes(this.id)) {
        this._queue = this._queue.filter(function (item) {
          return !item.isTransform;
        });
      }
    }
  }], [{
    key: "sanitise",
    value: function sanitise(duration, delay, when) {
      // Initialise the default parameters
      var times = 1;
      var swing = false;
      var wait = 0;
      duration = duration || timeline.duration;
      delay = delay || timeline.delay;
      when = when || 'last'; // If we have an object, unpack the values

      if (_typeof(duration) === 'object' && !(duration instanceof Stepper)) {
        delay = duration.delay || delay;
        when = duration.when || when;
        swing = duration.swing || swing;
        times = duration.times || times;
        wait = duration.wait || wait;
        duration = duration.duration || timeline.duration;
      }

      return {
        duration: duration,
        delay: delay,
        swing: swing,
        times: times,
        wait: wait,
        when: when
      };
    }
  }]);

  return Runner;
}(EventTarget);

exports.Runner = Runner;
Runner.id = 0;

var FakeRunner =
/*#__PURE__*/
function () {
  function FakeRunner() {
    var transforms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Matrix();
    var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
    var done = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    _classCallCheck(this, FakeRunner);

    this.transforms = transforms;
    this.id = id;
    this.done = done;
  }

  _createClass(FakeRunner, [{
    key: "clearTransformsFromQueue",
    value: function clearTransformsFromQueue() {}
  }]);

  return FakeRunner;
}();

extend([Runner, FakeRunner], {
  mergeWith: function mergeWith(runner) {
    return new FakeRunner(runner.transforms.lmultiply(this.transforms), runner.id);
  }
}); // FakeRunner.emptyRunner = new FakeRunner()

var lmultiply = function lmultiply(last, curr) {
  return last.lmultiplyO(curr);
};

var getRunnerTransform = function getRunnerTransform(runner) {
  return runner.transforms;
};

function mergeTransforms() {
  // Find the matrix to apply to the element and apply it
  var runners = this._transformationRunners.runners;
  var netTransform = runners.map(getRunnerTransform).reduce(lmultiply, new Matrix());
  this.transform(netTransform);

  this._transformationRunners.merge();

  if (this._transformationRunners.length() === 1) {
    this._frameId = null;
  }
}

var RunnerArray =
/*#__PURE__*/
function () {
  function RunnerArray() {
    _classCallCheck(this, RunnerArray);

    this.runners = [];
    this.ids = [];
  }

  _createClass(RunnerArray, [{
    key: "add",
    value: function add(runner) {
      if (this.runners.includes(runner)) return;
      var id = runner.id + 1;
      this.runners.push(runner);
      this.ids.push(id);
      return this;
    }
  }, {
    key: "getByID",
    value: function getByID(id) {
      return this.runners[this.ids.indexOf(id + 1)];
    }
  }, {
    key: "remove",
    value: function remove(id) {
      var index = this.ids.indexOf(id + 1);
      this.ids.splice(index, 1);
      this.runners.splice(index, 1);
      return this;
    }
  }, {
    key: "merge",
    value: function merge() {
      var _this2 = this;

      var lastRunner = null;
      this.runners.forEach(function (runner, i) {
        var condition = lastRunner && runner.done && lastRunner.done // don't merge runner when persisted on timeline
        && (!runner._timeline || !runner._timeline._runnerIds.includes(runner.id)) && (!lastRunner._timeline || !lastRunner._timeline._runnerIds.includes(lastRunner.id));

        if (condition) {
          // the +1 happens in the function
          _this2.remove(runner.id);

          _this2.edit(lastRunner.id, runner.mergeWith(lastRunner));
        }

        lastRunner = runner;
      });
      return this;
    }
  }, {
    key: "edit",
    value: function edit(id, newRunner) {
      var index = this.ids.indexOf(id + 1);
      this.ids.splice(index, 1, id + 1);
      this.runners.splice(index, 1, newRunner);
      return this;
    }
  }, {
    key: "length",
    value: function length() {
      return this.ids.length;
    }
  }, {
    key: "clearBefore",
    value: function clearBefore(id) {
      var deleteCnt = this.ids.indexOf(id + 1) || 1;
      this.ids.splice(0, deleteCnt, 0);
      this.runners.splice(0, deleteCnt, new FakeRunner()).forEach(function (r) {
        return r.clearTransformsFromQueue();
      });
      return this;
    }
  }]);

  return RunnerArray;
}();

registerMethods({
  Element: {
    animate: function animate(duration, delay, when) {
      var o = Runner.sanitise(duration, delay, when);
      var timeline = this.timeline();
      return new Runner(o.duration).loop(o).element(this).timeline(timeline.play()).schedule(o.delay, o.when);
    },
    delay: function delay(by, when) {
      return this.animate(0, by, when);
    },
    // this function searches for all runners on the element and deletes the ones
    // which run before the current one. This is because absolute transformations
    // overwfrite anything anyway so there is no need to waste time computing
    // other runners
    _clearTransformRunnersBefore: function _clearTransformRunnersBefore(currentRunner) {
      this._transformationRunners.clearBefore(currentRunner.id);
    },
    _currentTransform: function _currentTransform(current) {
      return this._transformationRunners.runners // we need the equal sign here to make sure, that also transformations
      // on the same runner which execute before the current transformation are
      // taken into account
      .filter(function (runner) {
        return runner.id <= current.id;
      }).map(getRunnerTransform).reduce(lmultiply, new Matrix());
    },
    _addRunner: function _addRunner(runner) {
      this._transformationRunners.add(runner); // Make sure that the runner merge is executed at the very end of
      // all Animator functions. Thats why we use immediate here to execute
      // the merge right after all frames are run


      Animator.cancelImmediate(this._frameId);
      this._frameId = Animator.immediate(mergeTransforms.bind(this));
    },
    _prepareRunner: function _prepareRunner() {
      if (this._frameId == null) {
        this._transformationRunners = new RunnerArray().add(new FakeRunner(new Matrix(this)));
      }
    }
  }
});
extend(Runner, {
  attr: function attr(a, v) {
    return this.styleAttr('attr', a, v);
  },
  // Add animatable styles
  css: function css(s, v) {
    return this.styleAttr('css', s, v);
  },
  styleAttr: function styleAttr(type, name, val) {
    // apply attributes individually
    if (_typeof(name) === 'object') {
      for (var key in name) {
        this.styleAttr(type, key, name[key]);
      }

      return this;
    }

    var morpher = new Morphable(this._stepper).to(val);
    this.queue(function () {
      morpher = morpher.from(this.element()[type](name));
    }, function (pos) {
      this.element()[type](name, morpher.at(pos));
      return morpher.done();
    });
    return this;
  },
  zoom: function zoom(level, point) {
    if (this._tryRetarget('zoom', to, point)) return this;
    var morpher = new Morphable(this._stepper).to(new SVGNumber(level));
    this.queue(function () {
      morpher = morpher.from(this.element().zoom());
    }, function (pos) {
      this.element().zoom(morpher.at(pos), point);
      return morpher.done();
    }, function (newLevel, newPoint) {
      point = newPoint;
      morpher.to(newLevel);
    });

    this._rememberMorpher('zoom', morpher);

    return this;
  },

  /**
   ** absolute transformations
   **/
  //
  // M v -----|-----(D M v = F v)------|----->  T v
  //
  // 1. define the final state (T) and decompose it (once)
  //    t = [tx, ty, the, lam, sy, sx]
  // 2. on every frame: pull the current state of all previous transforms
  //    (M - m can change)
  //   and then write this as m = [tx0, ty0, the0, lam0, sy0, sx0]
  // 3. Find the interpolated matrix F(pos) = m + pos * (t - m)
  //   - Note F(0) = M
  //   - Note F(1) = T
  // 4. Now you get the delta matrix as a result: D = F * inv(M)
  transform: function transform(transforms, relative, affine) {
    // If we have a declarative function, we should retarget it if possible
    relative = transforms.relative || relative;

    if (this._isDeclarative && !relative && this._tryRetarget('transform', transforms)) {
      return this;
    } // Parse the parameters


    var isMatrix = Matrix.isMatrixLike(transforms);
    affine = transforms.affine != null ? transforms.affine : affine != null ? affine : !isMatrix; // Create a morepher and set its type

    var morpher = new Morphable(this._stepper).type(affine ? TransformBag : Matrix);
    var origin;
    var element;
    var current;
    var currentAngle;
    var startTransform;

    function setup() {
      // make sure element and origin is defined
      element = element || this.element();
      origin = origin || getOrigin(transforms, element);
      startTransform = new Matrix(relative ? undefined : element); // add the runner to the element so it can merge transformations

      element._addRunner(this); // Deactivate all transforms that have run so far if we are absolute


      if (!relative) {
        element._clearTransformRunnersBefore(this);
      }
    }

    function run(pos) {
      // clear all other transforms before this in case something is saved
      // on this runner. We are absolute. We dont need these!
      if (!relative) this.clearTransform();

      var _transform = new Point(origin).transform(element._currentTransform(this)),
          x = _transform.x,
          y = _transform.y;

      var target = new Matrix(_objectSpread$1({}, transforms, {
        origin: [x, y]
      }));
      var start = this._isDeclarative && current ? current : startTransform;

      if (affine) {
        target = target.decompose(x, y);
        start = start.decompose(x, y); // Get the current and target angle as it was set

        var rTarget = target.rotate;
        var rCurrent = start.rotate; // Figure out the shortest path to rotate directly

        var possibilities = [rTarget - 360, rTarget, rTarget + 360];
        var distances = possibilities.map(function (a) {
          return Math.abs(a - rCurrent);
        });
        var shortest = Math.min.apply(Math, _toConsumableArray(distances));
        var index = distances.indexOf(shortest);
        target.rotate = possibilities[index];
      }

      if (relative) {
        // we have to be careful here not to overwrite the rotation
        // with the rotate method of Matrix
        if (!isMatrix) {
          target.rotate = transforms.rotate || 0;
        }

        if (this._isDeclarative && currentAngle) {
          start.rotate = currentAngle;
        }
      }

      morpher.from(start);
      morpher.to(target);
      var affineParameters = morpher.at(pos);
      currentAngle = affineParameters.rotate;
      current = new Matrix(affineParameters);
      this.addTransform(current);

      element._addRunner(this);

      return morpher.done();
    }

    function retarget(newTransforms) {
      // only get a new origin if it changed since the last call
      if ((newTransforms.origin || 'center').toString() !== (transforms.origin || 'center').toString()) {
        origin = getOrigin(transforms, element);
      } // overwrite the old transformations with the new ones


      transforms = _objectSpread$1({}, newTransforms, {
        origin: origin
      });
    }

    this.queue(setup, run, retarget, true);
    this._isDeclarative && this._rememberMorpher('transform', morpher);
    return this;
  },
  // Animatable x-axis
  x: function x(_x, relative) {
    return this._queueNumber('x', _x);
  },
  // Animatable y-axis
  y: function y(_y) {
    return this._queueNumber('y', _y);
  },
  dx: function dx() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return this._queueNumberDelta('x', x);
  },
  dy: function dy() {
    var y = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return this._queueNumberDelta('y', y);
  },
  dmove: function dmove(x, y) {
    return this.dx(x).dy(y);
  },
  _queueNumberDelta: function _queueNumberDelta(method, to) {
    to = new SVGNumber(to); // Try to change the target if we have this method already registerd

    if (this._tryRetarget(method, to)) return this; // Make a morpher and queue the animation

    var morpher = new Morphable(this._stepper).to(to);
    var from = null;
    this.queue(function () {
      from = this.element()[method]();
      morpher.from(from);
      morpher.to(from + to);
    }, function (pos) {
      this.element()[method](morpher.at(pos));
      return morpher.done();
    }, function (newTo) {
      morpher.to(from + new SVGNumber(newTo));
    }); // Register the morpher so that if it is changed again, we can retarget it

    this._rememberMorpher(method, morpher);

    return this;
  },
  _queueObject: function _queueObject(method, to) {
    // Try to change the target if we have this method already registerd
    if (this._tryRetarget(method, to)) return this; // Make a morpher and queue the animation

    var morpher = new Morphable(this._stepper).to(to);
    this.queue(function () {
      morpher.from(this.element()[method]());
    }, function (pos) {
      this.element()[method](morpher.at(pos));
      return morpher.done();
    }); // Register the morpher so that if it is changed again, we can retarget it

    this._rememberMorpher(method, morpher);

    return this;
  },
  _queueNumber: function _queueNumber(method, value) {
    return this._queueObject(method, new SVGNumber(value));
  },
  // Animatable center x-axis
  cx: function cx(x) {
    return this._queueNumber('cx', x);
  },
  // Animatable center y-axis
  cy: function cy(y) {
    return this._queueNumber('cy', y);
  },
  // Add animatable move
  move: function move(x, y) {
    return this.x(x).y(y);
  },
  // Add animatable center
  center: function center(x, y) {
    return this.cx(x).cy(y);
  },
  // Add animatable size
  size: function size(width, height) {
    // animate bbox based size for all other elements
    var box;

    if (!width || !height) {
      box = this._element.bbox();
    }

    if (!width) {
      width = box.width / box.height * height;
    }

    if (!height) {
      height = box.height / box.width * width;
    }

    return this.width(width).height(height);
  },
  // Add animatable width
  width: function width(_width) {
    return this._queueNumber('width', _width);
  },
  // Add animatable height
  height: function height(_height) {
    return this._queueNumber('height', _height);
  },
  // Add animatable plot
  plot: function plot(a, b, c, d) {
    // Lines can be plotted with 4 arguments
    if (arguments.length === 4) {
      return this.plot([a, b, c, d]);
    }

    if (this._tryRetarget('plot', a)) return this;
    var morpher = new Morphable(this._stepper).type(this._element.MorphArray).to(a);
    this.queue(function () {
      morpher.from(this._element.array());
    }, function (pos) {
      this._element.plot(morpher.at(pos));

      return morpher.done();
    });

    this._rememberMorpher('plot', morpher);

    return this;
  },
  // Add leading method
  leading: function leading(value) {
    return this._queueNumber('leading', value);
  },
  // Add animatable viewbox
  viewbox: function viewbox(x, y, width, height) {
    return this._queueObject('viewbox', new Box(x, y, width, height));
  },
  update: function update(o) {
    if (_typeof(o) !== 'object') {
      return this.update({
        offset: arguments[0],
        color: arguments[1],
        opacity: arguments[2]
      });
    }

    if (o.opacity != null) this.attr('stop-opacity', o.opacity);
    if (o.color != null) this.attr('stop-color', o.color);
    if (o.offset != null) this.attr('offset', o.offset);
    return this;
  }
});
extend(Runner, {
  rx: rx,
  ry: ry,
  from: from,
  to: to
});
register(Runner, 'Runner');

var Svg =
/*#__PURE__*/
function (_Container) {
  _inherits(Svg, _Container);

  function Svg(node) {
    var _this;

    _classCallCheck(this, Svg);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Svg).call(this, nodeOrNew('svg', node), node));

    _this.namespace();

    return _this;
  }

  _createClass(Svg, [{
    key: "isRoot",
    value: function isRoot() {
      return !this.node.parentNode || !(this.node.parentNode instanceof globals.window.SVGElement) || this.node.parentNode.nodeName === '#document';
    } // Check if this is a root svg
    // If not, call docs from this element

  }, {
    key: "root",
    value: function root() {
      if (this.isRoot()) return this;
      return _get(_getPrototypeOf(Svg.prototype), "root", this).call(this);
    } // Add namespaces

  }, {
    key: "namespace",
    value: function namespace() {
      if (!this.isRoot()) return this.root().namespace();
      return this.attr({
        xmlns: ns,
        version: '1.1'
      }).attr('xmlns:xlink', xlink, xmlns).attr('xmlns:svgjs', svgjs, xmlns);
    } // Creates and returns defs element

  }, {
    key: "defs",
    value: function defs() {
      if (!this.isRoot()) return this.root().defs();
      return adopt(this.node.querySelector('defs')) || this.put(new Defs());
    } // custom parent method

  }, {
    key: "parent",
    value: function parent(type) {
      if (this.isRoot()) {
        return this.node.parentNode.nodeName === '#document' ? null : adopt(this.node.parentNode);
      }

      return _get(_getPrototypeOf(Svg.prototype), "parent", this).call(this, type);
    }
  }, {
    key: "clear",
    value: function clear() {
      // remove children
      while (this.node.hasChildNodes()) {
        this.node.removeChild(this.node.lastChild);
      } // remove defs reference


      delete this._defs;
      return this;
    }
  }]);

  return Svg;
}(Container);

exports.Svg = Svg;
registerMethods({
  Container: {
    // Create nested svg document
    nested: wrapWithAttrCheck(function () {
      return this.put(new Svg());
    })
  }
});
register(Svg, 'Svg', true);

var _Symbol =
/*#__PURE__*/
function (_Container) {
  _inherits(_Symbol, _Container); // Initialize node


  function _Symbol(node) {
    _classCallCheck(this, _Symbol);

    return _possibleConstructorReturn(this, _getPrototypeOf(_Symbol).call(this, nodeOrNew('symbol', node), node));
  }

  return _Symbol;
}(Container);

exports.Symbol = _Symbol;
registerMethods({
  Container: {
    symbol: wrapWithAttrCheck(function () {
      return this.put(new _Symbol());
    })
  }
});
register(_Symbol, 'Symbol');

function plain(text) {
  // clear if build mode is disabled
  if (this._build === false) {
    this.clear();
  } // create text node


  this.node.appendChild(globals.document.createTextNode(text));
  return this;
} // Get length of text element


function length() {
  return this.node.getComputedTextLength();
}

var textable = {
  __proto__: null,
  plain: plain,
  length: length
};

var Text =
/*#__PURE__*/
function (_Shape) {
  _inherits(Text, _Shape); // Initialize node


  function Text(node) {
    var _this;

    _classCallCheck(this, Text);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Text).call(this, nodeOrNew('text', node), node));
    _this.dom.leading = new SVGNumber(1.3); // store leading value for rebuilding

    _this._rebuild = true; // enable automatic updating of dy values

    _this._build = false; // disable build mode for adding multiple lines

    return _this;
  } // Move over x-axis
  // Text is moved its bounding box
  // text-anchor does NOT matter


  _createClass(Text, [{
    key: "x",
    value: function x(_x) {
      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();

      if (_x == null) {
        return box.x;
      }

      return this.attr('x', this.attr('x') + _x - box.x);
    } // Move over y-axis

  }, {
    key: "y",
    value: function y(_y) {
      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();

      if (_y == null) {
        return box.y;
      }

      return this.attr('y', this.attr('y') + _y - box.y);
    }
  }, {
    key: "move",
    value: function move(x, y) {
      var box = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.bbox();
      return this.x(x, box).y(y, box);
    } // Move center over x-axis

  }, {
    key: "cx",
    value: function cx(x) {
      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();

      if (x == null) {
        return box.cx;
      }

      return this.attr('x', this.attr('x') + x - box.cx);
    } // Move center over y-axis

  }, {
    key: "cy",
    value: function cy(y) {
      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();

      if (y == null) {
        return box.cy;
      }

      return this.attr('y', this.attr('y') + y - box.cy);
    }
  }, {
    key: "center",
    value: function center(x, y) {
      var box = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.bbox();
      return this.cx(x, box).cy(y, box);
    } // Set the text content

  }, {
    key: "text",
    value: function text(_text) {
      // act as getter
      if (_text === undefined) {
        var children = this.node.childNodes;
        var firstLine = 0;
        _text = '';

        for (var i = 0, len = children.length; i < len; ++i) {
          // skip textPaths - they are no lines
          if (children[i].nodeName === 'textPath') {
            if (i === 0) firstLine = 1;
            continue;
          } // add newline if its not the first child and newLined is set to true


          if (i !== firstLine && children[i].nodeType !== 3 && adopt(children[i]).dom.newLined === true) {
            _text += '\n';
          } // add content of this node


          _text += children[i].textContent;
        }

        return _text;
      } // remove existing content


      this.clear().build(true);

      if (typeof _text === 'function') {
        // call block
        _text.call(this, this);
      } else {
        // store text and make sure text is not blank
        _text = _text.split('\n'); // build new lines

        for (var j = 0, jl = _text.length; j < jl; j++) {
          this.tspan(_text[j]).newLine();
        }
      } // disable build mode and rebuild lines


      return this.build(false).rebuild();
    } // Set / get leading

  }, {
    key: "leading",
    value: function leading(value) {
      // act as getter
      if (value == null) {
        return this.dom.leading;
      } // act as setter


      this.dom.leading = new SVGNumber(value);
      return this.rebuild();
    } // Rebuild appearance type

  }, {
    key: "rebuild",
    value: function rebuild(_rebuild) {
      // store new rebuild flag if given
      if (typeof _rebuild === 'boolean') {
        this._rebuild = _rebuild;
      } // define position of all lines


      if (this._rebuild) {
        var self = this;
        var blankLineOffset = 0;
        var leading = this.dom.leading;
        this.each(function () {
          var fontSize = globals.window.getComputedStyle(this.node).getPropertyValue('font-size');
          var dy = leading * new SVGNumber(fontSize);

          if (this.dom.newLined) {
            this.attr('x', self.attr('x'));

            if (this.text() === '\n') {
              blankLineOffset += dy;
            } else {
              this.attr('dy', dy + blankLineOffset);
              blankLineOffset = 0;
            }
          }
        });
        this.fire('rebuild');
      }

      return this;
    } // Enable / disable build mode

  }, {
    key: "build",
    value: function build(_build) {
      this._build = !!_build;
      return this;
    } // overwrite method from parent to set data properly

  }, {
    key: "setData",
    value: function setData(o) {
      this.dom = o;
      this.dom.leading = new SVGNumber(o.leading || 1.3);
      return this;
    }
  }]);

  return Text;
}(Shape);

exports.Text = Text;
extend(Text, textable);
registerMethods({
  Container: {
    // Create text element
    text: wrapWithAttrCheck(function (text) {
      return this.put(new Text()).text(text);
    }),
    // Create plain text element
    plain: wrapWithAttrCheck(function (text) {
      return this.put(new Text()).plain(text);
    })
  }
});
register(Text, 'Text');

var Tspan =
/*#__PURE__*/
function (_Text) {
  _inherits(Tspan, _Text); // Initialize node


  function Tspan(node) {
    _classCallCheck(this, Tspan);

    return _possibleConstructorReturn(this, _getPrototypeOf(Tspan).call(this, nodeOrNew('tspan', node), node));
  } // Set text content


  _createClass(Tspan, [{
    key: "text",
    value: function text(_text) {
      if (_text == null) return this.node.textContent + (this.dom.newLined ? '\n' : '');
      typeof _text === 'function' ? _text.call(this, this) : this.plain(_text);
      return this;
    } // Shortcut dx

  }, {
    key: "dx",
    value: function dx(_dx) {
      return this.attr('dx', _dx);
    } // Shortcut dy

  }, {
    key: "dy",
    value: function dy(_dy) {
      return this.attr('dy', _dy);
    }
  }, {
    key: "x",
    value: function x(_x) {
      return this.attr('x', _x);
    }
  }, {
    key: "y",
    value: function y(_y) {
      return this.attr('x', _y);
    }
  }, {
    key: "move",
    value: function move(x, y) {
      return this.x(x).y(y);
    } // Create new line

  }, {
    key: "newLine",
    value: function newLine() {
      // fetch text parent
      var t = this.parent(Text); // mark new line

      this.dom.newLined = true;
      var fontSize = globals.window.getComputedStyle(this.node).getPropertyValue('font-size');
      var dy = t.dom.leading * new SVGNumber(fontSize); // apply new position

      return this.dy(dy).attr('x', t.x());
    }
  }]);

  return Tspan;
}(Text);

exports.Tspan = Tspan;
extend(Tspan, textable);
registerMethods({
  Tspan: {
    tspan: wrapWithAttrCheck(function (text) {
      var tspan = new Tspan(); // clear if build mode is disabled

      if (!this._build) {
        this.clear();
      } // add new tspan


      this.node.appendChild(tspan.node);
      return tspan.text(text);
    })
  }
});
register(Tspan, 'Tspan');

var ClipPath =
/*#__PURE__*/
function (_Container) {
  _inherits(ClipPath, _Container);

  function ClipPath(node) {
    _classCallCheck(this, ClipPath);

    return _possibleConstructorReturn(this, _getPrototypeOf(ClipPath).call(this, nodeOrNew('clipPath', node), node));
  } // Unclip all clipped elements and remove itself


  _createClass(ClipPath, [{
    key: "remove",
    value: function remove() {
      // unclip all targets
      this.targets().forEach(function (el) {
        el.unclip();
      }); // remove clipPath from parent

      return _get(_getPrototypeOf(ClipPath.prototype), "remove", this).call(this);
    }
  }, {
    key: "targets",
    value: function targets() {
      return baseFind('svg [clip-path*="' + this.id() + '"]');
    }
  }]);

  return ClipPath;
}(Container);

exports.ClipPath = ClipPath;
registerMethods({
  Container: {
    // Create clipping element
    clip: wrapWithAttrCheck(function () {
      return this.defs().put(new ClipPath());
    })
  },
  Element: {
    // Distribute clipPath to svg element
    clipWith: function clipWith(element) {
      // use given clip or create a new one
      var clipper = element instanceof ClipPath ? element : this.parent().clip().add(element); // apply mask

      return this.attr('clip-path', 'url("#' + clipper.id() + '")');
    },
    // Unclip element
    unclip: function unclip() {
      return this.attr('clip-path', null);
    },
    clipper: function clipper() {
      return this.reference('clip-path');
    }
  }
});
register(ClipPath, 'ClipPath');

var ForeignObject =
/*#__PURE__*/
function (_Element) {
  _inherits(ForeignObject, _Element);

  function ForeignObject(node) {
    _classCallCheck(this, ForeignObject);

    return _possibleConstructorReturn(this, _getPrototypeOf(ForeignObject).call(this, nodeOrNew('foreignObject', node), node));
  }

  return ForeignObject;
}(Element);

exports.ForeignObject = ForeignObject;
registerMethods({
  Container: {
    foreignObject: wrapWithAttrCheck(function (width, height) {
      return this.put(new ForeignObject()).size(width, height);
    })
  }
});
register(ForeignObject, 'ForeignObject');

var G =
/*#__PURE__*/
function (_Container) {
  _inherits(G, _Container);

  function G(node) {
    _classCallCheck(this, G);

    return _possibleConstructorReturn(this, _getPrototypeOf(G).call(this, nodeOrNew('g', node), node));
  }

  _createClass(G, [{
    key: "x",
    value: function x(_x) {
      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();
      if (_x == null) return box.x;
      return this.move(_x, box.y, box);
    }
  }, {
    key: "y",
    value: function y(_y) {
      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();
      if (_y == null) return box.y;
      return this.move(box.x, _y, box);
    }
  }, {
    key: "move",
    value: function move() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var box = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.bbox();
      var dx = x - box.x;
      var dy = y - box.y;
      return this.dmove(dx, dy);
    }
  }, {
    key: "dx",
    value: function dx(_dx) {
      return this.dmove(_dx, 0);
    }
  }, {
    key: "dy",
    value: function dy(_dy) {
      return this.dmove(0, _dy);
    }
  }, {
    key: "dmove",
    value: function dmove(dx, dy) {
      this.children().forEach(function (child, i) {
        // Get the childs bbox
        var bbox = child.bbox(); // Get childs matrix

        var m = new Matrix(child); // Translate childs matrix by amount and
        // transform it back into parents space

        var matrix = m.translate(dx, dy).transform(m.inverse()); // Calculate new x and y from old box

        var p = new Point(bbox.x, bbox.y).transform(matrix); // Move element

        child.move(p.x, p.y);
      });
      return this;
    }
  }, {
    key: "width",
    value: function width(_width) {
      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();
      if (_width == null) return box.width;
      return this.size(_width, box.height, box);
    }
  }, {
    key: "height",
    value: function height(_height) {
      var box = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.bbox();
      if (_height == null) return box.height;
      return this.size(box.width, _height, box);
    }
  }, {
    key: "size",
    value: function size(width, height) {
      var box = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.bbox();
      var p = proportionalSize(this, width, height, box);
      var scaleX = p.width / box.width;
      var scaleY = p.height / box.height;
      this.children().forEach(function (child, i) {
        var o = new Point(box).transform(new Matrix(child).inverse());
        child.scale(scaleX, scaleY, o.x, o.y);
      });
      return this;
    }
  }]);

  return G;
}(Container);

exports.G = G;
registerMethods({
  Container: {
    // Create a group element
    group: wrapWithAttrCheck(function () {
      return this.put(new G());
    })
  }
});
register(G, 'G');

var A =
/*#__PURE__*/
function (_Container) {
  _inherits(A, _Container);

  function A(node) {
    _classCallCheck(this, A);

    return _possibleConstructorReturn(this, _getPrototypeOf(A).call(this, nodeOrNew('a', node), node));
  } // Link url


  _createClass(A, [{
    key: "to",
    value: function to(url) {
      return this.attr('href', url, xlink);
    } // Link target attribute

  }, {
    key: "target",
    value: function target(_target) {
      return this.attr('target', _target);
    }
  }]);

  return A;
}(Container);

exports.A = A;
registerMethods({
  Container: {
    // Create a hyperlink element
    link: wrapWithAttrCheck(function (url) {
      return this.put(new A()).to(url);
    })
  },
  Element: {
    // Create a hyperlink element
    linkTo: function linkTo(url) {
      var link = new A();

      if (typeof url === 'function') {
        url.call(link, link);
      } else {
        link.to(url);
      }

      return this.parent().put(link).put(this);
    }
  }
});
register(A, 'A');

var Mask =
/*#__PURE__*/
function (_Container) {
  _inherits(Mask, _Container); // Initialize node


  function Mask(node) {
    _classCallCheck(this, Mask);

    return _possibleConstructorReturn(this, _getPrototypeOf(Mask).call(this, nodeOrNew('mask', node), node));
  } // Unmask all masked elements and remove itself


  _createClass(Mask, [{
    key: "remove",
    value: function remove() {
      // unmask all targets
      this.targets().forEach(function (el) {
        el.unmask();
      }); // remove mask from parent

      return _get(_getPrototypeOf(Mask.prototype), "remove", this).call(this);
    }
  }, {
    key: "targets",
    value: function targets() {
      return baseFind('svg [mask*="' + this.id() + '"]');
    }
  }]);

  return Mask;
}(Container);

exports.Mask = Mask;
registerMethods({
  Container: {
    mask: wrapWithAttrCheck(function () {
      return this.defs().put(new Mask());
    })
  },
  Element: {
    // Distribute mask to svg element
    maskWith: function maskWith(element) {
      // use given mask or create a new one
      var masker = element instanceof Mask ? element : this.parent().mask().add(element); // apply mask

      return this.attr('mask', 'url("#' + masker.id() + '")');
    },
    // Unmask element
    unmask: function unmask() {
      return this.attr('mask', null);
    },
    masker: function masker() {
      return this.reference('mask');
    }
  }
});
register(Mask, 'Mask');

function ownKeys$3(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread$2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys$3(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys$3(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function cssRule(selector, rule) {
  if (!selector) return '';
  if (!rule) return selector;
  var ret = selector + '{';

  for (var i in rule) {
    ret += unCamelCase(i) + ':' + rule[i] + ';';
  }

  ret += '}';
  return ret;
}

var Style =
/*#__PURE__*/
function (_Element) {
  _inherits(Style, _Element);

  function Style(node) {
    _classCallCheck(this, Style);

    return _possibleConstructorReturn(this, _getPrototypeOf(Style).call(this, nodeOrNew('style', node), node));
  }

  _createClass(Style, [{
    key: "addText",
    value: function addText() {
      var w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      this.node.textContent += w;
      return this;
    }
  }, {
    key: "font",
    value: function font(name, src) {
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.rule('@font-face', _objectSpread$2({
        fontFamily: name,
        src: src
      }, params));
    }
  }, {
    key: "rule",
    value: function rule(selector, obj) {
      return this.addText(cssRule(selector, obj));
    }
  }]);

  return Style;
}(Element);

exports.Style = Style;
registerMethods('Dom', {
  style: wrapWithAttrCheck(function (selector, obj) {
    return this.put(new Style()).rule(selector, obj);
  }),
  fontface: wrapWithAttrCheck(function (name, src, params) {
    return this.put(new Style()).font(name, src, params);
  })
});
register(Style, 'Style');

var TextPath =
/*#__PURE__*/
function (_Text) {
  _inherits(TextPath, _Text); // Initialize node


  function TextPath(node) {
    _classCallCheck(this, TextPath);

    return _possibleConstructorReturn(this, _getPrototypeOf(TextPath).call(this, nodeOrNew('textPath', node), node));
  } // return the array of the path track element


  _createClass(TextPath, [{
    key: "array",
    value: function array() {
      var track = this.track();
      return track ? track.array() : null;
    } // Plot path if any

  }, {
    key: "plot",
    value: function plot(d) {
      var track = this.track();
      var pathArray = null;

      if (track) {
        pathArray = track.plot(d);
      }

      return d == null ? pathArray : this;
    } // Get the path element

  }, {
    key: "track",
    value: function track() {
      return this.reference('href');
    }
  }]);

  return TextPath;
}(Text);

exports.TextPath = TextPath;
registerMethods({
  Container: {
    textPath: wrapWithAttrCheck(function (text, path) {
      // Convert text to instance if needed
      if (!(text instanceof Text)) {
        text = this.text(text);
      }

      return text.path(path);
    })
  },
  Text: {
    // Create path for text to run on
    path: wrapWithAttrCheck(function (track) {
      var importNodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var textPath = new TextPath(); // if track is a path, reuse it

      if (!(track instanceof Path)) {
        // create path element
        track = this.defs().path(track);
      } // link textPath to path and add content


      textPath.attr('href', '#' + track, xlink); // Transplant all nodes from text to textPath

      var node;

      if (importNodes) {
        while (node = this.node.firstChild) {
          textPath.node.appendChild(node);
        }
      } // add textPath element as child node and return textPath


      return this.put(textPath);
    }),
    // Get the textPath children
    textPath: function textPath() {
      return this.findOne('textPath');
    }
  },
  Path: {
    // creates a textPath from this path
    text: wrapWithAttrCheck(function (text) {
      // Convert text to instance if needed
      if (!(text instanceof Text)) {
        text = new Text().addTo(this.parent()).text(text);
      } // Create textPath from text and path and return


      return text.path(this);
    }),
    targets: function targets() {
      return baseFind('svg [href*="' + this.id() + '"]');
    }
  }
});
TextPath.prototype.MorphArray = PathArray;
register(TextPath, 'TextPath');

var Use =
/*#__PURE__*/
function (_Shape) {
  _inherits(Use, _Shape);

  function Use(node) {
    _classCallCheck(this, Use);

    return _possibleConstructorReturn(this, _getPrototypeOf(Use).call(this, nodeOrNew('use', node), node));
  } // Use element as a reference


  _createClass(Use, [{
    key: "element",
    value: function element(_element, file) {
      // Set lined element
      return this.attr('href', (file || '') + '#' + _element, xlink);
    }
  }]);

  return Use;
}(Shape);

exports.Use = Use;
registerMethods({
  Container: {
    // Create a use element
    use: wrapWithAttrCheck(function (element, file) {
      return this.put(new Use()).element(element, file);
    })
  }
});
register(Use, 'Use');
/* Optional Modules */

var SVG = makeInstance;
exports.SVG = SVG;
extend([Svg, _Symbol, Image, Pattern, Marker], getMethodsFor('viewbox'));
extend([Line, Polyline, Polygon, Path], getMethodsFor('marker'));
extend(Text, getMethodsFor('Text'));
extend(Path, getMethodsFor('Path'));
extend(Defs, getMethodsFor('Defs'));
extend([Text, Tspan], getMethodsFor('Tspan'));
extend([Rect, Ellipse, Circle, Gradient], getMethodsFor('radius'));
extend(EventTarget, getMethodsFor('EventTarget'));
extend(Dom, getMethodsFor('Dom'));
extend(Element, getMethodsFor('Element'));
extend(Shape, getMethodsFor('Shape')); // extend(Element, getConstructor('Memory'))

extend(Container, getMethodsFor('Container'));
extend(Runner, getMethodsFor('Runner'));
List.extend(getMethodNames());
registerMorphableType([SVGNumber, Color, Box, Matrix, SVGArray, PointArray, PathArray]);
makeMorphable();
},{}],"radar/projectInfo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.copy-within");

require("core-js/modules/es6.array.fill");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es7.array.flat-map");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.array.of");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.species");

require("core-js/modules/es6.date.to-json");

require("core-js/modules/es6.date.to-primitive");

require("core-js/modules/es6.function.has-instance");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.map");

require("core-js/modules/es6.math.acosh");

require("core-js/modules/es6.math.asinh");

require("core-js/modules/es6.math.atanh");

require("core-js/modules/es6.math.cbrt");

require("core-js/modules/es6.math.clz32");

require("core-js/modules/es6.math.cosh");

require("core-js/modules/es6.math.expm1");

require("core-js/modules/es6.math.fround");

require("core-js/modules/es6.math.hypot");

require("core-js/modules/es6.math.imul");

require("core-js/modules/es6.math.log1p");

require("core-js/modules/es6.math.log10");

require("core-js/modules/es6.math.log2");

require("core-js/modules/es6.math.sign");

require("core-js/modules/es6.math.sinh");

require("core-js/modules/es6.math.tanh");

require("core-js/modules/es6.math.trunc");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.epsilon");

require("core-js/modules/es6.number.is-finite");

require("core-js/modules/es6.number.is-integer");

require("core-js/modules/es6.number.is-nan");

require("core-js/modules/es6.number.is-safe-integer");

require("core-js/modules/es6.number.max-safe-integer");

require("core-js/modules/es6.number.min-safe-integer");

require("core-js/modules/es6.number.parse-float");

require("core-js/modules/es6.number.parse-int");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es7.object.define-getter");

require("core-js/modules/es7.object.define-setter");

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.object.get-own-property-descriptor");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.object.get-own-property-names");

require("core-js/modules/es6.object.get-prototype-of");

require("core-js/modules/es7.object.lookup-getter");

require("core-js/modules/es7.object.lookup-setter");

require("core-js/modules/es6.object.prevent-extensions");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.is");

require("core-js/modules/es6.object.is-frozen");

require("core-js/modules/es6.object.is-sealed");

require("core-js/modules/es6.object.is-extensible");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.seal");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.promise");

require("core-js/modules/es7.promise.finally");

require("core-js/modules/es6.reflect.apply");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.reflect.define-property");

require("core-js/modules/es6.reflect.delete-property");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.reflect.get-own-property-descriptor");

require("core-js/modules/es6.reflect.get-prototype-of");

require("core-js/modules/es6.reflect.has");

require("core-js/modules/es6.reflect.is-extensible");

require("core-js/modules/es6.reflect.own-keys");

require("core-js/modules/es6.reflect.prevent-extensions");

require("core-js/modules/es6.reflect.set");

require("core-js/modules/es6.reflect.set-prototype-of");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.regexp.flags");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.set");

require("core-js/modules/es6.symbol");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.anchor");

require("core-js/modules/es6.string.big");

require("core-js/modules/es6.string.blink");

require("core-js/modules/es6.string.bold");

require("core-js/modules/es6.string.code-point-at");

require("core-js/modules/es6.string.ends-with");

require("core-js/modules/es6.string.fixed");

require("core-js/modules/es6.string.fontcolor");

require("core-js/modules/es6.string.fontsize");

require("core-js/modules/es6.string.from-code-point");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.string.italics");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.string.link");

require("core-js/modules/es7.string.pad-start");

require("core-js/modules/es7.string.pad-end");

require("core-js/modules/es6.string.raw");

require("core-js/modules/es6.string.repeat");

require("core-js/modules/es6.string.small");

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/es6.string.strike");

require("core-js/modules/es6.string.sub");

require("core-js/modules/es6.string.sup");

require("core-js/modules/es7.string.trim-left");

require("core-js/modules/es7.string.trim-right");

require("core-js/modules/es6.typed.array-buffer");

require("core-js/modules/es6.typed.int8-array");

require("core-js/modules/es6.typed.uint8-array");

require("core-js/modules/es6.typed.uint8-clamped-array");

require("core-js/modules/es6.typed.int16-array");

require("core-js/modules/es6.typed.uint16-array");

require("core-js/modules/es6.typed.int32-array");

require("core-js/modules/es6.typed.uint32-array");

require("core-js/modules/es6.typed.float32-array");

require("core-js/modules/es6.typed.float64-array");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.weak-set");

require("core-js/modules/web.timers");

require("core-js/modules/web.immediate");

require("core-js/modules/web.dom.iterable");

require("regenerator-runtime/runtime");

var _axios = _interopRequireDefault(require("axios"));

var _svg = require("@svgdotjs/svg.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var showProjectData =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(blip) {
    var response, modalString;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _axios.default.get('/api/v1/project/' + blip.project);

          case 2:
            _context.next = 4;
            return _context.sent.data;

          case 4:
            response = _context.sent;
            // TODO add error message to footer in red
            // compile HTML from the template
            modalString = projectinfoTemplate({
              modalID: 'projectInfo',
              header: blip.prj_name,
              footer: '',
              project: response.data.data,
              blip: blip,
              scale: createScoreScale(blip)
            }); // add to DOM and display

            d3.select('#modals').html(modalString); // link up the close button - DELETES the modal! (it is recreated anyway)

            d3.select('#projectInfo .closeBtn').on('click', function () {
              d3.select('#projectInfo').remove();
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function showProjectData(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = showProjectData;

var setFailureFooter = function setFailureFooter(cont, res) {
  cont.append('div').style('color: red;').html('Failed to load project data');
  console.log('FAILED TO LOAD PROJECT DATA!');
  console.log(res);
};

var createScoreScale = function createScoreScale(blip) {
  // no score scale if no score in project
  if (!blip.score) return undefined; // prepare and adjust scale values

  var shift = blip.min < 0 ? Math.abs(blip.min) : 0;
  var values = [blip.min + shift, 0 + shift, blip.max + shift];
  var labels = ['min', 'median', 'max']; // create the scale

  var scale = d3.scaleLinear().domain([0, values[2]]).range([0, 450]); // create the SVG

  var svg = (0, _svg.SVG)().attr({
    viewBox: '-25 -20 500 50'
  });
  var g = svg.group().addClass('data'); // add the base line

  g.line(0, 0, 450, 0); // append the vertical scale lines

  values.forEach(function (v) {
    g.line(scale(v), 0, scale(v), 10);
  }); // add the project performance line

  var x = scale(blip.performance + shift);
  g.line(x, 0, x, -15).attr('id', 'perf'); // add the labels

  labels.forEach(function (l) {
    g.text(l).attr({
      x: scale(values[labels.indexOf(l)]),
      y: 25
    });
  });
  return svg.svg(); // // add scale labels
  // svg.selectAll('text')
  //     .data(labels)
  //     .enter()
  //     .append('text')
  //     .attr('x', d => scale(values[labels.indexOf(d)]))
  //     .attr('y', 25)
  //     .text(d => d)
  // // add the project performance value in red
  // svg.append('path')
  //     .attr('d', d => {
  //         return `M${scale(blip.performance + shift)},0L${scale(blip.performance + shift)},-15`
  //     })
  //     .attr('stroke-width', 3)
  //     .attr('stroke', 'red')
};
},{"core-js/modules/es6.array.copy-within":"../../node_modules/core-js/modules/es6.array.copy-within.js","core-js/modules/es6.array.fill":"../../node_modules/core-js/modules/es6.array.fill.js","core-js/modules/es6.array.find":"../../node_modules/core-js/modules/es6.array.find.js","core-js/modules/es6.array.find-index":"../../node_modules/core-js/modules/es6.array.find-index.js","core-js/modules/es7.array.flat-map":"../../node_modules/core-js/modules/es7.array.flat-map.js","core-js/modules/es6.array.from":"../../node_modules/core-js/modules/es6.array.from.js","core-js/modules/es7.array.includes":"../../node_modules/core-js/modules/es7.array.includes.js","core-js/modules/es6.array.iterator":"../../node_modules/core-js/modules/es6.array.iterator.js","core-js/modules/es6.array.of":"../../node_modules/core-js/modules/es6.array.of.js","core-js/modules/es6.array.sort":"../../node_modules/core-js/modules/es6.array.sort.js","core-js/modules/es6.array.species":"../../node_modules/core-js/modules/es6.array.species.js","core-js/modules/es6.date.to-json":"../../node_modules/core-js/modules/es6.date.to-json.js","core-js/modules/es6.date.to-primitive":"../../node_modules/core-js/modules/es6.date.to-primitive.js","core-js/modules/es6.function.has-instance":"../../node_modules/core-js/modules/es6.function.has-instance.js","core-js/modules/es6.function.name":"../../node_modules/core-js/modules/es6.function.name.js","core-js/modules/es6.map":"../../node_modules/core-js/modules/es6.map.js","core-js/modules/es6.math.acosh":"../../node_modules/core-js/modules/es6.math.acosh.js","core-js/modules/es6.math.asinh":"../../node_modules/core-js/modules/es6.math.asinh.js","core-js/modules/es6.math.atanh":"../../node_modules/core-js/modules/es6.math.atanh.js","core-js/modules/es6.math.cbrt":"../../node_modules/core-js/modules/es6.math.cbrt.js","core-js/modules/es6.math.clz32":"../../node_modules/core-js/modules/es6.math.clz32.js","core-js/modules/es6.math.cosh":"../../node_modules/core-js/modules/es6.math.cosh.js","core-js/modules/es6.math.expm1":"../../node_modules/core-js/modules/es6.math.expm1.js","core-js/modules/es6.math.fround":"../../node_modules/core-js/modules/es6.math.fround.js","core-js/modules/es6.math.hypot":"../../node_modules/core-js/modules/es6.math.hypot.js","core-js/modules/es6.math.imul":"../../node_modules/core-js/modules/es6.math.imul.js","core-js/modules/es6.math.log1p":"../../node_modules/core-js/modules/es6.math.log1p.js","core-js/modules/es6.math.log10":"../../node_modules/core-js/modules/es6.math.log10.js","core-js/modules/es6.math.log2":"../../node_modules/core-js/modules/es6.math.log2.js","core-js/modules/es6.math.sign":"../../node_modules/core-js/modules/es6.math.sign.js","core-js/modules/es6.math.sinh":"../../node_modules/core-js/modules/es6.math.sinh.js","core-js/modules/es6.math.tanh":"../../node_modules/core-js/modules/es6.math.tanh.js","core-js/modules/es6.math.trunc":"../../node_modules/core-js/modules/es6.math.trunc.js","core-js/modules/es6.number.constructor":"../../node_modules/core-js/modules/es6.number.constructor.js","core-js/modules/es6.number.epsilon":"../../node_modules/core-js/modules/es6.number.epsilon.js","core-js/modules/es6.number.is-finite":"../../node_modules/core-js/modules/es6.number.is-finite.js","core-js/modules/es6.number.is-integer":"../../node_modules/core-js/modules/es6.number.is-integer.js","core-js/modules/es6.number.is-nan":"../../node_modules/core-js/modules/es6.number.is-nan.js","core-js/modules/es6.number.is-safe-integer":"../../node_modules/core-js/modules/es6.number.is-safe-integer.js","core-js/modules/es6.number.max-safe-integer":"../../node_modules/core-js/modules/es6.number.max-safe-integer.js","core-js/modules/es6.number.min-safe-integer":"../../node_modules/core-js/modules/es6.number.min-safe-integer.js","core-js/modules/es6.number.parse-float":"../../node_modules/core-js/modules/es6.number.parse-float.js","core-js/modules/es6.number.parse-int":"../../node_modules/core-js/modules/es6.number.parse-int.js","core-js/modules/es6.object.assign":"../../node_modules/core-js/modules/es6.object.assign.js","core-js/modules/es7.object.define-getter":"../../node_modules/core-js/modules/es7.object.define-getter.js","core-js/modules/es7.object.define-setter":"../../node_modules/core-js/modules/es7.object.define-setter.js","core-js/modules/es7.object.entries":"../../node_modules/core-js/modules/es7.object.entries.js","core-js/modules/es6.object.freeze":"../../node_modules/core-js/modules/es6.object.freeze.js","core-js/modules/es6.object.get-own-property-descriptor":"../../node_modules/core-js/modules/es6.object.get-own-property-descriptor.js","core-js/modules/es7.object.get-own-property-descriptors":"../../node_modules/core-js/modules/es7.object.get-own-property-descriptors.js","core-js/modules/es6.object.get-own-property-names":"../../node_modules/core-js/modules/es6.object.get-own-property-names.js","core-js/modules/es6.object.get-prototype-of":"../../node_modules/core-js/modules/es6.object.get-prototype-of.js","core-js/modules/es7.object.lookup-getter":"../../node_modules/core-js/modules/es7.object.lookup-getter.js","core-js/modules/es7.object.lookup-setter":"../../node_modules/core-js/modules/es7.object.lookup-setter.js","core-js/modules/es6.object.prevent-extensions":"../../node_modules/core-js/modules/es6.object.prevent-extensions.js","core-js/modules/es6.object.to-string":"../../node_modules/core-js/modules/es6.object.to-string.js","core-js/modules/es6.object.is":"../../node_modules/core-js/modules/es6.object.is.js","core-js/modules/es6.object.is-frozen":"../../node_modules/core-js/modules/es6.object.is-frozen.js","core-js/modules/es6.object.is-sealed":"../../node_modules/core-js/modules/es6.object.is-sealed.js","core-js/modules/es6.object.is-extensible":"../../node_modules/core-js/modules/es6.object.is-extensible.js","core-js/modules/es6.object.keys":"../../node_modules/core-js/modules/es6.object.keys.js","core-js/modules/es6.object.seal":"../../node_modules/core-js/modules/es6.object.seal.js","core-js/modules/es6.object.set-prototype-of":"../../node_modules/core-js/modules/es6.object.set-prototype-of.js","core-js/modules/es7.object.values":"../../node_modules/core-js/modules/es7.object.values.js","core-js/modules/es6.promise":"../../node_modules/core-js/modules/es6.promise.js","core-js/modules/es7.promise.finally":"../../node_modules/core-js/modules/es7.promise.finally.js","core-js/modules/es6.reflect.apply":"../../node_modules/core-js/modules/es6.reflect.apply.js","core-js/modules/es6.reflect.construct":"../../node_modules/core-js/modules/es6.reflect.construct.js","core-js/modules/es6.reflect.define-property":"../../node_modules/core-js/modules/es6.reflect.define-property.js","core-js/modules/es6.reflect.delete-property":"../../node_modules/core-js/modules/es6.reflect.delete-property.js","core-js/modules/es6.reflect.get":"../../node_modules/core-js/modules/es6.reflect.get.js","core-js/modules/es6.reflect.get-own-property-descriptor":"../../node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js","core-js/modules/es6.reflect.get-prototype-of":"../../node_modules/core-js/modules/es6.reflect.get-prototype-of.js","core-js/modules/es6.reflect.has":"../../node_modules/core-js/modules/es6.reflect.has.js","core-js/modules/es6.reflect.is-extensible":"../../node_modules/core-js/modules/es6.reflect.is-extensible.js","core-js/modules/es6.reflect.own-keys":"../../node_modules/core-js/modules/es6.reflect.own-keys.js","core-js/modules/es6.reflect.prevent-extensions":"../../node_modules/core-js/modules/es6.reflect.prevent-extensions.js","core-js/modules/es6.reflect.set":"../../node_modules/core-js/modules/es6.reflect.set.js","core-js/modules/es6.reflect.set-prototype-of":"../../node_modules/core-js/modules/es6.reflect.set-prototype-of.js","core-js/modules/es6.regexp.constructor":"../../node_modules/core-js/modules/es6.regexp.constructor.js","core-js/modules/es6.regexp.flags":"../../node_modules/core-js/modules/es6.regexp.flags.js","core-js/modules/es6.regexp.match":"../../node_modules/core-js/modules/es6.regexp.match.js","core-js/modules/es6.regexp.replace":"../../node_modules/core-js/modules/es6.regexp.replace.js","core-js/modules/es6.regexp.split":"../../node_modules/core-js/modules/es6.regexp.split.js","core-js/modules/es6.regexp.search":"../../node_modules/core-js/modules/es6.regexp.search.js","core-js/modules/es6.regexp.to-string":"../../node_modules/core-js/modules/es6.regexp.to-string.js","core-js/modules/es6.set":"../../node_modules/core-js/modules/es6.set.js","core-js/modules/es6.symbol":"../../node_modules/core-js/modules/es6.symbol.js","core-js/modules/es7.symbol.async-iterator":"../../node_modules/core-js/modules/es7.symbol.async-iterator.js","core-js/modules/es6.string.anchor":"../../node_modules/core-js/modules/es6.string.anchor.js","core-js/modules/es6.string.big":"../../node_modules/core-js/modules/es6.string.big.js","core-js/modules/es6.string.blink":"../../node_modules/core-js/modules/es6.string.blink.js","core-js/modules/es6.string.bold":"../../node_modules/core-js/modules/es6.string.bold.js","core-js/modules/es6.string.code-point-at":"../../node_modules/core-js/modules/es6.string.code-point-at.js","core-js/modules/es6.string.ends-with":"../../node_modules/core-js/modules/es6.string.ends-with.js","core-js/modules/es6.string.fixed":"../../node_modules/core-js/modules/es6.string.fixed.js","core-js/modules/es6.string.fontcolor":"../../node_modules/core-js/modules/es6.string.fontcolor.js","core-js/modules/es6.string.fontsize":"../../node_modules/core-js/modules/es6.string.fontsize.js","core-js/modules/es6.string.from-code-point":"../../node_modules/core-js/modules/es6.string.from-code-point.js","core-js/modules/es6.string.includes":"../../node_modules/core-js/modules/es6.string.includes.js","core-js/modules/es6.string.italics":"../../node_modules/core-js/modules/es6.string.italics.js","core-js/modules/es6.string.iterator":"../../node_modules/core-js/modules/es6.string.iterator.js","core-js/modules/es6.string.link":"../../node_modules/core-js/modules/es6.string.link.js","core-js/modules/es7.string.pad-start":"../../node_modules/core-js/modules/es7.string.pad-start.js","core-js/modules/es7.string.pad-end":"../../node_modules/core-js/modules/es7.string.pad-end.js","core-js/modules/es6.string.raw":"../../node_modules/core-js/modules/es6.string.raw.js","core-js/modules/es6.string.repeat":"../../node_modules/core-js/modules/es6.string.repeat.js","core-js/modules/es6.string.small":"../../node_modules/core-js/modules/es6.string.small.js","core-js/modules/es6.string.starts-with":"../../node_modules/core-js/modules/es6.string.starts-with.js","core-js/modules/es6.string.strike":"../../node_modules/core-js/modules/es6.string.strike.js","core-js/modules/es6.string.sub":"../../node_modules/core-js/modules/es6.string.sub.js","core-js/modules/es6.string.sup":"../../node_modules/core-js/modules/es6.string.sup.js","core-js/modules/es7.string.trim-left":"../../node_modules/core-js/modules/es7.string.trim-left.js","core-js/modules/es7.string.trim-right":"../../node_modules/core-js/modules/es7.string.trim-right.js","core-js/modules/es6.typed.array-buffer":"../../node_modules/core-js/modules/es6.typed.array-buffer.js","core-js/modules/es6.typed.int8-array":"../../node_modules/core-js/modules/es6.typed.int8-array.js","core-js/modules/es6.typed.uint8-array":"../../node_modules/core-js/modules/es6.typed.uint8-array.js","core-js/modules/es6.typed.uint8-clamped-array":"../../node_modules/core-js/modules/es6.typed.uint8-clamped-array.js","core-js/modules/es6.typed.int16-array":"../../node_modules/core-js/modules/es6.typed.int16-array.js","core-js/modules/es6.typed.uint16-array":"../../node_modules/core-js/modules/es6.typed.uint16-array.js","core-js/modules/es6.typed.int32-array":"../../node_modules/core-js/modules/es6.typed.int32-array.js","core-js/modules/es6.typed.uint32-array":"../../node_modules/core-js/modules/es6.typed.uint32-array.js","core-js/modules/es6.typed.float32-array":"../../node_modules/core-js/modules/es6.typed.float32-array.js","core-js/modules/es6.typed.float64-array":"../../node_modules/core-js/modules/es6.typed.float64-array.js","core-js/modules/es6.weak-map":"../../node_modules/core-js/modules/es6.weak-map.js","core-js/modules/es6.weak-set":"../../node_modules/core-js/modules/es6.weak-set.js","core-js/modules/web.timers":"../../node_modules/core-js/modules/web.timers.js","core-js/modules/web.immediate":"../../node_modules/core-js/modules/web.immediate.js","core-js/modules/web.dom.iterable":"../../node_modules/core-js/modules/web.dom.iterable.js","regenerator-runtime/runtime":"../../node_modules/regenerator-runtime/runtime.js","axios":"../../node_modules/axios/index.js","@svgdotjs/svg.js":"../../node_modules/@svgdotjs/svg.js/dist/svg.esm.js"}],"radar/linkupRadar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.array.copy-within");

require("core-js/modules/es6.array.fill");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es7.array.flat-map");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.array.of");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.species");

require("core-js/modules/es6.date.to-json");

require("core-js/modules/es6.date.to-primitive");

require("core-js/modules/es6.function.has-instance");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.map");

require("core-js/modules/es6.math.acosh");

require("core-js/modules/es6.math.asinh");

require("core-js/modules/es6.math.atanh");

require("core-js/modules/es6.math.cbrt");

require("core-js/modules/es6.math.clz32");

require("core-js/modules/es6.math.cosh");

require("core-js/modules/es6.math.expm1");

require("core-js/modules/es6.math.fround");

require("core-js/modules/es6.math.hypot");

require("core-js/modules/es6.math.imul");

require("core-js/modules/es6.math.log1p");

require("core-js/modules/es6.math.log10");

require("core-js/modules/es6.math.log2");

require("core-js/modules/es6.math.sign");

require("core-js/modules/es6.math.sinh");

require("core-js/modules/es6.math.tanh");

require("core-js/modules/es6.math.trunc");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.epsilon");

require("core-js/modules/es6.number.is-finite");

require("core-js/modules/es6.number.is-integer");

require("core-js/modules/es6.number.is-nan");

require("core-js/modules/es6.number.is-safe-integer");

require("core-js/modules/es6.number.max-safe-integer");

require("core-js/modules/es6.number.min-safe-integer");

require("core-js/modules/es6.number.parse-float");

require("core-js/modules/es6.number.parse-int");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es7.object.define-getter");

require("core-js/modules/es7.object.define-setter");

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.object.get-own-property-descriptor");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.object.get-own-property-names");

require("core-js/modules/es6.object.get-prototype-of");

require("core-js/modules/es7.object.lookup-getter");

require("core-js/modules/es7.object.lookup-setter");

require("core-js/modules/es6.object.prevent-extensions");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.is");

require("core-js/modules/es6.object.is-frozen");

require("core-js/modules/es6.object.is-sealed");

require("core-js/modules/es6.object.is-extensible");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.seal");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.promise");

require("core-js/modules/es7.promise.finally");

require("core-js/modules/es6.reflect.apply");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.reflect.define-property");

require("core-js/modules/es6.reflect.delete-property");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.reflect.get-own-property-descriptor");

require("core-js/modules/es6.reflect.get-prototype-of");

require("core-js/modules/es6.reflect.has");

require("core-js/modules/es6.reflect.is-extensible");

require("core-js/modules/es6.reflect.own-keys");

require("core-js/modules/es6.reflect.prevent-extensions");

require("core-js/modules/es6.reflect.set");

require("core-js/modules/es6.reflect.set-prototype-of");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.regexp.flags");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.set");

require("core-js/modules/es6.symbol");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.anchor");

require("core-js/modules/es6.string.big");

require("core-js/modules/es6.string.blink");

require("core-js/modules/es6.string.bold");

require("core-js/modules/es6.string.code-point-at");

require("core-js/modules/es6.string.ends-with");

require("core-js/modules/es6.string.fixed");

require("core-js/modules/es6.string.fontcolor");

require("core-js/modules/es6.string.fontsize");

require("core-js/modules/es6.string.from-code-point");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.string.italics");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.string.link");

require("core-js/modules/es7.string.pad-start");

require("core-js/modules/es7.string.pad-end");

require("core-js/modules/es6.string.raw");

require("core-js/modules/es6.string.repeat");

require("core-js/modules/es6.string.small");

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/es6.string.strike");

require("core-js/modules/es6.string.sub");

require("core-js/modules/es6.string.sup");

require("core-js/modules/es7.string.trim-left");

require("core-js/modules/es7.string.trim-right");

require("core-js/modules/es6.typed.array-buffer");

require("core-js/modules/es6.typed.int8-array");

require("core-js/modules/es6.typed.uint8-array");

require("core-js/modules/es6.typed.uint8-clamped-array");

require("core-js/modules/es6.typed.int16-array");

require("core-js/modules/es6.typed.uint16-array");

require("core-js/modules/es6.typed.int32-array");

require("core-js/modules/es6.typed.uint32-array");

require("core-js/modules/es6.typed.float32-array");

require("core-js/modules/es6.typed.float64-array");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.weak-set");

require("core-js/modules/web.timers");

require("core-js/modules/web.immediate");

require("core-js/modules/web.dom.iterable");

require("regenerator-runtime/runtime");

var _alert = _interopRequireDefault(require("../util/alert"));

var _projectInfo = _interopRequireDefault(require("./projectInfo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
// FUNCTIONS
//
var linkupRadar =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(radarRootDOM) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // 1) Animate interactive quadrants
            interactiveQuadrants(); // 2) Popover texts for blips

            interactiveBlips();

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function linkupRadar(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = linkupRadar;

var interactiveQuadrants = function interactiveQuadrants() {
  d3.selectAll('.segment').on('mouseover', mouseOverQuadrant).on('mouseout', mouseOutQuadrant).on('click', clickQuadrant);
};

var interactiveBlips = function interactiveBlips() {
  // 1) Configure the tooltip
  var bliptip = configureBliptip();
  d3.selectAll('.blip').on('mouseover', function (d, i, a) {
    return mouseOverBlip(bliptip, i, a);
  }).on('mouseout', function (d, i, a) {
    return mouseOutBlip(bliptip, i, a);
  }).on('click', clickBlip);
}; // highlight the selected quadrant,
// dim the others


var mouseOverQuadrant = function mouseOverQuadrant(d, i) {
  d3.select(".segment-".concat(i)).style('opacity', 1); // dim the non-selected segments

  d3.selectAll(".segment:not(.segment-".concat(i, ")")).style('opacity', 0.3); // TODO highlight the segment's button
  // d3.select('.button.' + order + '.full-view').style('opacity', 1)
  // dim all other buttons
  // d3.selectAll('.button.full-view:not(.' + order+')').style('opacity', 0.3)
}; // highlight all segments again


var mouseOutQuadrant = function mouseOutQuadrant(d, i) {
  d3.selectAll(".segment:not(.segment-".concat(i, ")")).style('opacity', 1); // TODO reset all dimming for the buttons
  // d3.selectAll('.button.full-view').style('opacity', 1)
}; // click the quadrant:
// 1. scales up the selected quadrant and hides all other
// 2. shows the quadrant's table and hides the others


var clickQuadrant = function clickQuadrant(d, i, a) {
  console.log('Quadrant click event handling!');
  var zoomed = d3.select("g.segment.segment-".concat(i)).classed('zoomed'); // if we are in zoom mode, unzoom

  if (zoomed) {
    // unzoom segments
    d3.select("g.segment.segment-".concat(i)).style('transform', undefined).classed('zoomed', false);
    d3.selectAll(".segment:not(.segment-".concat(i, ")")).style('transform', undefined); // "un"rotate blips & performance ring

    d3.selectAll("g.segment.segment-".concat(i, " .blip text")).style('transform', undefined); // hide the segment table

    d3.selectAll(".segment-table.segment-".concat(i)).style('display', 'none');
    return;
  }

  var theta = 360 / a.length;
  var offset = theta / 2;
  var rotateLeft = i * theta + offset > 180;
  var angle = -i * theta - offset;
  if (rotateLeft) angle = 360 + angle; // clicked segment gets rotated, shifted down and scaleed by two

  d3.select("g.segment.segment-".concat(i)).style('transform', "scale(2) translateY(25%) rotate(".concat(angle, "deg)")).classed('zoomed', true); // rotate the blip text by inverse angle

  d3.selectAll("g.segment.segment-".concat(i, " .blip text")).style('transform', "rotate(".concat(-angle, "deg)")); // hide the other segments

  d3.selectAll(".segment:not(.segment-".concat(i, ")")).style('transform', 'scale(0)'); // select the corresponding table

  d3.selectAll(".segment-table.segment-".concat(i)).style('display', 'block'); // hide the other tables

  d3.selectAll(".segment-table:not(.segment-".concat(i, ")")).style('display', 'none');
};

var configureBliptip = function configureBliptip() {
  var svg = d3.select('#rendering > svg');
  var bliptip = d3.tip().attr('id', 'bliptip').offset([-8, 0]).html(function (d) {
    return d;
  });
  svg.call(bliptip);
  return bliptip;
};

var mouseOverBlip = function mouseOverBlip(tip, i, a) {
  tip.show(d3.select("#".concat(a[i].id)).attr('label'));
};

var mouseOutBlip = function mouseOutBlip(tip, i, a) {
  tip.hide();
};

var clickBlip = function clickBlip(d, i, a) {
  d3.event.stopPropagation(); // stop the event bubbling up the hierarchy

  (0, _projectInfo.default)(JSON.parse(a[i].getAttribute('data')));
};
},{"core-js/modules/es6.array.copy-within":"../../node_modules/core-js/modules/es6.array.copy-within.js","core-js/modules/es6.array.fill":"../../node_modules/core-js/modules/es6.array.fill.js","core-js/modules/es6.array.find":"../../node_modules/core-js/modules/es6.array.find.js","core-js/modules/es6.array.find-index":"../../node_modules/core-js/modules/es6.array.find-index.js","core-js/modules/es7.array.flat-map":"../../node_modules/core-js/modules/es7.array.flat-map.js","core-js/modules/es6.array.from":"../../node_modules/core-js/modules/es6.array.from.js","core-js/modules/es7.array.includes":"../../node_modules/core-js/modules/es7.array.includes.js","core-js/modules/es6.array.iterator":"../../node_modules/core-js/modules/es6.array.iterator.js","core-js/modules/es6.array.of":"../../node_modules/core-js/modules/es6.array.of.js","core-js/modules/es6.array.sort":"../../node_modules/core-js/modules/es6.array.sort.js","core-js/modules/es6.array.species":"../../node_modules/core-js/modules/es6.array.species.js","core-js/modules/es6.date.to-json":"../../node_modules/core-js/modules/es6.date.to-json.js","core-js/modules/es6.date.to-primitive":"../../node_modules/core-js/modules/es6.date.to-primitive.js","core-js/modules/es6.function.has-instance":"../../node_modules/core-js/modules/es6.function.has-instance.js","core-js/modules/es6.function.name":"../../node_modules/core-js/modules/es6.function.name.js","core-js/modules/es6.map":"../../node_modules/core-js/modules/es6.map.js","core-js/modules/es6.math.acosh":"../../node_modules/core-js/modules/es6.math.acosh.js","core-js/modules/es6.math.asinh":"../../node_modules/core-js/modules/es6.math.asinh.js","core-js/modules/es6.math.atanh":"../../node_modules/core-js/modules/es6.math.atanh.js","core-js/modules/es6.math.cbrt":"../../node_modules/core-js/modules/es6.math.cbrt.js","core-js/modules/es6.math.clz32":"../../node_modules/core-js/modules/es6.math.clz32.js","core-js/modules/es6.math.cosh":"../../node_modules/core-js/modules/es6.math.cosh.js","core-js/modules/es6.math.expm1":"../../node_modules/core-js/modules/es6.math.expm1.js","core-js/modules/es6.math.fround":"../../node_modules/core-js/modules/es6.math.fround.js","core-js/modules/es6.math.hypot":"../../node_modules/core-js/modules/es6.math.hypot.js","core-js/modules/es6.math.imul":"../../node_modules/core-js/modules/es6.math.imul.js","core-js/modules/es6.math.log1p":"../../node_modules/core-js/modules/es6.math.log1p.js","core-js/modules/es6.math.log10":"../../node_modules/core-js/modules/es6.math.log10.js","core-js/modules/es6.math.log2":"../../node_modules/core-js/modules/es6.math.log2.js","core-js/modules/es6.math.sign":"../../node_modules/core-js/modules/es6.math.sign.js","core-js/modules/es6.math.sinh":"../../node_modules/core-js/modules/es6.math.sinh.js","core-js/modules/es6.math.tanh":"../../node_modules/core-js/modules/es6.math.tanh.js","core-js/modules/es6.math.trunc":"../../node_modules/core-js/modules/es6.math.trunc.js","core-js/modules/es6.number.constructor":"../../node_modules/core-js/modules/es6.number.constructor.js","core-js/modules/es6.number.epsilon":"../../node_modules/core-js/modules/es6.number.epsilon.js","core-js/modules/es6.number.is-finite":"../../node_modules/core-js/modules/es6.number.is-finite.js","core-js/modules/es6.number.is-integer":"../../node_modules/core-js/modules/es6.number.is-integer.js","core-js/modules/es6.number.is-nan":"../../node_modules/core-js/modules/es6.number.is-nan.js","core-js/modules/es6.number.is-safe-integer":"../../node_modules/core-js/modules/es6.number.is-safe-integer.js","core-js/modules/es6.number.max-safe-integer":"../../node_modules/core-js/modules/es6.number.max-safe-integer.js","core-js/modules/es6.number.min-safe-integer":"../../node_modules/core-js/modules/es6.number.min-safe-integer.js","core-js/modules/es6.number.parse-float":"../../node_modules/core-js/modules/es6.number.parse-float.js","core-js/modules/es6.number.parse-int":"../../node_modules/core-js/modules/es6.number.parse-int.js","core-js/modules/es6.object.assign":"../../node_modules/core-js/modules/es6.object.assign.js","core-js/modules/es7.object.define-getter":"../../node_modules/core-js/modules/es7.object.define-getter.js","core-js/modules/es7.object.define-setter":"../../node_modules/core-js/modules/es7.object.define-setter.js","core-js/modules/es7.object.entries":"../../node_modules/core-js/modules/es7.object.entries.js","core-js/modules/es6.object.freeze":"../../node_modules/core-js/modules/es6.object.freeze.js","core-js/modules/es6.object.get-own-property-descriptor":"../../node_modules/core-js/modules/es6.object.get-own-property-descriptor.js","core-js/modules/es7.object.get-own-property-descriptors":"../../node_modules/core-js/modules/es7.object.get-own-property-descriptors.js","core-js/modules/es6.object.get-own-property-names":"../../node_modules/core-js/modules/es6.object.get-own-property-names.js","core-js/modules/es6.object.get-prototype-of":"../../node_modules/core-js/modules/es6.object.get-prototype-of.js","core-js/modules/es7.object.lookup-getter":"../../node_modules/core-js/modules/es7.object.lookup-getter.js","core-js/modules/es7.object.lookup-setter":"../../node_modules/core-js/modules/es7.object.lookup-setter.js","core-js/modules/es6.object.prevent-extensions":"../../node_modules/core-js/modules/es6.object.prevent-extensions.js","core-js/modules/es6.object.to-string":"../../node_modules/core-js/modules/es6.object.to-string.js","core-js/modules/es6.object.is":"../../node_modules/core-js/modules/es6.object.is.js","core-js/modules/es6.object.is-frozen":"../../node_modules/core-js/modules/es6.object.is-frozen.js","core-js/modules/es6.object.is-sealed":"../../node_modules/core-js/modules/es6.object.is-sealed.js","core-js/modules/es6.object.is-extensible":"../../node_modules/core-js/modules/es6.object.is-extensible.js","core-js/modules/es6.object.keys":"../../node_modules/core-js/modules/es6.object.keys.js","core-js/modules/es6.object.seal":"../../node_modules/core-js/modules/es6.object.seal.js","core-js/modules/es6.object.set-prototype-of":"../../node_modules/core-js/modules/es6.object.set-prototype-of.js","core-js/modules/es7.object.values":"../../node_modules/core-js/modules/es7.object.values.js","core-js/modules/es6.promise":"../../node_modules/core-js/modules/es6.promise.js","core-js/modules/es7.promise.finally":"../../node_modules/core-js/modules/es7.promise.finally.js","core-js/modules/es6.reflect.apply":"../../node_modules/core-js/modules/es6.reflect.apply.js","core-js/modules/es6.reflect.construct":"../../node_modules/core-js/modules/es6.reflect.construct.js","core-js/modules/es6.reflect.define-property":"../../node_modules/core-js/modules/es6.reflect.define-property.js","core-js/modules/es6.reflect.delete-property":"../../node_modules/core-js/modules/es6.reflect.delete-property.js","core-js/modules/es6.reflect.get":"../../node_modules/core-js/modules/es6.reflect.get.js","core-js/modules/es6.reflect.get-own-property-descriptor":"../../node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js","core-js/modules/es6.reflect.get-prototype-of":"../../node_modules/core-js/modules/es6.reflect.get-prototype-of.js","core-js/modules/es6.reflect.has":"../../node_modules/core-js/modules/es6.reflect.has.js","core-js/modules/es6.reflect.is-extensible":"../../node_modules/core-js/modules/es6.reflect.is-extensible.js","core-js/modules/es6.reflect.own-keys":"../../node_modules/core-js/modules/es6.reflect.own-keys.js","core-js/modules/es6.reflect.prevent-extensions":"../../node_modules/core-js/modules/es6.reflect.prevent-extensions.js","core-js/modules/es6.reflect.set":"../../node_modules/core-js/modules/es6.reflect.set.js","core-js/modules/es6.reflect.set-prototype-of":"../../node_modules/core-js/modules/es6.reflect.set-prototype-of.js","core-js/modules/es6.regexp.constructor":"../../node_modules/core-js/modules/es6.regexp.constructor.js","core-js/modules/es6.regexp.flags":"../../node_modules/core-js/modules/es6.regexp.flags.js","core-js/modules/es6.regexp.match":"../../node_modules/core-js/modules/es6.regexp.match.js","core-js/modules/es6.regexp.replace":"../../node_modules/core-js/modules/es6.regexp.replace.js","core-js/modules/es6.regexp.split":"../../node_modules/core-js/modules/es6.regexp.split.js","core-js/modules/es6.regexp.search":"../../node_modules/core-js/modules/es6.regexp.search.js","core-js/modules/es6.regexp.to-string":"../../node_modules/core-js/modules/es6.regexp.to-string.js","core-js/modules/es6.set":"../../node_modules/core-js/modules/es6.set.js","core-js/modules/es6.symbol":"../../node_modules/core-js/modules/es6.symbol.js","core-js/modules/es7.symbol.async-iterator":"../../node_modules/core-js/modules/es7.symbol.async-iterator.js","core-js/modules/es6.string.anchor":"../../node_modules/core-js/modules/es6.string.anchor.js","core-js/modules/es6.string.big":"../../node_modules/core-js/modules/es6.string.big.js","core-js/modules/es6.string.blink":"../../node_modules/core-js/modules/es6.string.blink.js","core-js/modules/es6.string.bold":"../../node_modules/core-js/modules/es6.string.bold.js","core-js/modules/es6.string.code-point-at":"../../node_modules/core-js/modules/es6.string.code-point-at.js","core-js/modules/es6.string.ends-with":"../../node_modules/core-js/modules/es6.string.ends-with.js","core-js/modules/es6.string.fixed":"../../node_modules/core-js/modules/es6.string.fixed.js","core-js/modules/es6.string.fontcolor":"../../node_modules/core-js/modules/es6.string.fontcolor.js","core-js/modules/es6.string.fontsize":"../../node_modules/core-js/modules/es6.string.fontsize.js","core-js/modules/es6.string.from-code-point":"../../node_modules/core-js/modules/es6.string.from-code-point.js","core-js/modules/es6.string.includes":"../../node_modules/core-js/modules/es6.string.includes.js","core-js/modules/es6.string.italics":"../../node_modules/core-js/modules/es6.string.italics.js","core-js/modules/es6.string.iterator":"../../node_modules/core-js/modules/es6.string.iterator.js","core-js/modules/es6.string.link":"../../node_modules/core-js/modules/es6.string.link.js","core-js/modules/es7.string.pad-start":"../../node_modules/core-js/modules/es7.string.pad-start.js","core-js/modules/es7.string.pad-end":"../../node_modules/core-js/modules/es7.string.pad-end.js","core-js/modules/es6.string.raw":"../../node_modules/core-js/modules/es6.string.raw.js","core-js/modules/es6.string.repeat":"../../node_modules/core-js/modules/es6.string.repeat.js","core-js/modules/es6.string.small":"../../node_modules/core-js/modules/es6.string.small.js","core-js/modules/es6.string.starts-with":"../../node_modules/core-js/modules/es6.string.starts-with.js","core-js/modules/es6.string.strike":"../../node_modules/core-js/modules/es6.string.strike.js","core-js/modules/es6.string.sub":"../../node_modules/core-js/modules/es6.string.sub.js","core-js/modules/es6.string.sup":"../../node_modules/core-js/modules/es6.string.sup.js","core-js/modules/es7.string.trim-left":"../../node_modules/core-js/modules/es7.string.trim-left.js","core-js/modules/es7.string.trim-right":"../../node_modules/core-js/modules/es7.string.trim-right.js","core-js/modules/es6.typed.array-buffer":"../../node_modules/core-js/modules/es6.typed.array-buffer.js","core-js/modules/es6.typed.int8-array":"../../node_modules/core-js/modules/es6.typed.int8-array.js","core-js/modules/es6.typed.uint8-array":"../../node_modules/core-js/modules/es6.typed.uint8-array.js","core-js/modules/es6.typed.uint8-clamped-array":"../../node_modules/core-js/modules/es6.typed.uint8-clamped-array.js","core-js/modules/es6.typed.int16-array":"../../node_modules/core-js/modules/es6.typed.int16-array.js","core-js/modules/es6.typed.uint16-array":"../../node_modules/core-js/modules/es6.typed.uint16-array.js","core-js/modules/es6.typed.int32-array":"../../node_modules/core-js/modules/es6.typed.int32-array.js","core-js/modules/es6.typed.uint32-array":"../../node_modules/core-js/modules/es6.typed.uint32-array.js","core-js/modules/es6.typed.float32-array":"../../node_modules/core-js/modules/es6.typed.float32-array.js","core-js/modules/es6.typed.float64-array":"../../node_modules/core-js/modules/es6.typed.float64-array.js","core-js/modules/es6.weak-map":"../../node_modules/core-js/modules/es6.weak-map.js","core-js/modules/es6.weak-set":"../../node_modules/core-js/modules/es6.weak-set.js","core-js/modules/web.timers":"../../node_modules/core-js/modules/web.timers.js","core-js/modules/web.immediate":"../../node_modules/core-js/modules/web.immediate.js","core-js/modules/web.dom.iterable":"../../node_modules/core-js/modules/web.dom.iterable.js","regenerator-runtime/runtime":"../../node_modules/regenerator-runtime/runtime.js","../util/alert":"util/alert.js","./projectInfo":"radar/projectInfo.js"}],"index.js":[function(require,module,exports) {
"use strict";

require("core-js/modules/es6.array.copy-within");

require("core-js/modules/es6.array.fill");

require("core-js/modules/es6.array.find");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es7.array.flat-map");

require("core-js/modules/es6.array.from");

require("core-js/modules/es7.array.includes");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.array.of");

require("core-js/modules/es6.array.sort");

require("core-js/modules/es6.array.species");

require("core-js/modules/es6.date.to-json");

require("core-js/modules/es6.date.to-primitive");

require("core-js/modules/es6.function.has-instance");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.map");

require("core-js/modules/es6.math.acosh");

require("core-js/modules/es6.math.asinh");

require("core-js/modules/es6.math.atanh");

require("core-js/modules/es6.math.cbrt");

require("core-js/modules/es6.math.clz32");

require("core-js/modules/es6.math.cosh");

require("core-js/modules/es6.math.expm1");

require("core-js/modules/es6.math.fround");

require("core-js/modules/es6.math.hypot");

require("core-js/modules/es6.math.imul");

require("core-js/modules/es6.math.log1p");

require("core-js/modules/es6.math.log10");

require("core-js/modules/es6.math.log2");

require("core-js/modules/es6.math.sign");

require("core-js/modules/es6.math.sinh");

require("core-js/modules/es6.math.tanh");

require("core-js/modules/es6.math.trunc");

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.epsilon");

require("core-js/modules/es6.number.is-finite");

require("core-js/modules/es6.number.is-integer");

require("core-js/modules/es6.number.is-nan");

require("core-js/modules/es6.number.is-safe-integer");

require("core-js/modules/es6.number.max-safe-integer");

require("core-js/modules/es6.number.min-safe-integer");

require("core-js/modules/es6.number.parse-float");

require("core-js/modules/es6.number.parse-int");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es7.object.define-getter");

require("core-js/modules/es7.object.define-setter");

require("core-js/modules/es7.object.entries");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.object.get-own-property-descriptor");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.object.get-own-property-names");

require("core-js/modules/es6.object.get-prototype-of");

require("core-js/modules/es7.object.lookup-getter");

require("core-js/modules/es7.object.lookup-setter");

require("core-js/modules/es6.object.prevent-extensions");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.is");

require("core-js/modules/es6.object.is-frozen");

require("core-js/modules/es6.object.is-sealed");

require("core-js/modules/es6.object.is-extensible");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.seal");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es7.object.values");

require("core-js/modules/es6.promise");

require("core-js/modules/es7.promise.finally");

require("core-js/modules/es6.reflect.apply");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.reflect.define-property");

require("core-js/modules/es6.reflect.delete-property");

require("core-js/modules/es6.reflect.get");

require("core-js/modules/es6.reflect.get-own-property-descriptor");

require("core-js/modules/es6.reflect.get-prototype-of");

require("core-js/modules/es6.reflect.has");

require("core-js/modules/es6.reflect.is-extensible");

require("core-js/modules/es6.reflect.own-keys");

require("core-js/modules/es6.reflect.prevent-extensions");

require("core-js/modules/es6.reflect.set");

require("core-js/modules/es6.reflect.set-prototype-of");

require("core-js/modules/es6.regexp.constructor");

require("core-js/modules/es6.regexp.flags");

require("core-js/modules/es6.regexp.match");

require("core-js/modules/es6.regexp.replace");

require("core-js/modules/es6.regexp.split");

require("core-js/modules/es6.regexp.search");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.set");

require("core-js/modules/es6.symbol");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.anchor");

require("core-js/modules/es6.string.big");

require("core-js/modules/es6.string.blink");

require("core-js/modules/es6.string.bold");

require("core-js/modules/es6.string.code-point-at");

require("core-js/modules/es6.string.ends-with");

require("core-js/modules/es6.string.fixed");

require("core-js/modules/es6.string.fontcolor");

require("core-js/modules/es6.string.fontsize");

require("core-js/modules/es6.string.from-code-point");

require("core-js/modules/es6.string.includes");

require("core-js/modules/es6.string.italics");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.string.link");

require("core-js/modules/es7.string.pad-start");

require("core-js/modules/es7.string.pad-end");

require("core-js/modules/es6.string.raw");

require("core-js/modules/es6.string.repeat");

require("core-js/modules/es6.string.small");

require("core-js/modules/es6.string.starts-with");

require("core-js/modules/es6.string.strike");

require("core-js/modules/es6.string.sub");

require("core-js/modules/es6.string.sup");

require("core-js/modules/es7.string.trim-left");

require("core-js/modules/es7.string.trim-right");

require("core-js/modules/es6.typed.array-buffer");

require("core-js/modules/es6.typed.int8-array");

require("core-js/modules/es6.typed.uint8-array");

require("core-js/modules/es6.typed.uint8-clamped-array");

require("core-js/modules/es6.typed.int16-array");

require("core-js/modules/es6.typed.uint16-array");

require("core-js/modules/es6.typed.int32-array");

require("core-js/modules/es6.typed.uint32-array");

require("core-js/modules/es6.typed.float32-array");

require("core-js/modules/es6.typed.float64-array");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.weak-set");

require("core-js/modules/web.timers");

require("core-js/modules/web.immediate");

require("core-js/modules/web.dom.iterable");

require("regenerator-runtime/runtime");

var _linkupRadar = _interopRequireDefault(require("./radar/linkupRadar"));

var _alert = _interopRequireDefault(require("./util/alert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// app modules
// import { displayMap } from './mapbox'
// import { login, logout } from './login'
// import { updateSettings } from './updateSettings'
// import { bookTour } from './stripe'
// DOM ELEMENTS
var radarButtons = document.querySelectorAll('.radar');
var radarSection = document.getElementById('radar'); //
// RADAR MENU BUTTONS EVENT
//

if (radarButtons) {
  radarButtons.forEach(function (btn) {
    btn.addEventListener('click', function (event) {
      event.preventDefault();
      var slug = event.target.getAttribute('radar');
      window.location.assign("/radar/".concat(slug));
    });
  });
} //
// SHOW RADAR - CLIENT SIDE
//


if (radarSection) {
  // 1) Select the root element of the radar section
  var radarRootDOM = d3.select('section#radar'); // 2) Link up DOM elements with interactive JavaScript

  (0, _linkupRadar.default)(radarRootDOM);
} // if (mapBox) {
//     const locations = JSON.parse(mapBox.dataset.locations)
//     displayMap(locations)
// }
// if (loginForm)
//     loginForm.addEventListener('submit', e => {
//         e.preventDefault()
//         const email = document.getElementById('email').value
//         const password = document.getElementById('password').value
//         login(email, password)
//     })
// if (logOutBtn) logOutBtn.addEventListener('click', logout)
// if (userDataForm)
//     userDataForm.addEventListener('submit', e => {
//         e.preventDefault()
//         const form = new FormData()
//         form.append('name', document.getElementById('name').value)
//         form.append('email', document.getElementById('email').value)
//         form.append('photo', document.getElementById('photo').files[0])
//         updateSettings(form, 'data')
//     })
// if (userPasswordForm)
//     userPasswordForm.addEventListener('submit', async e => {
//         e.preventDefault()
//         document.querySelector('.btn--save-password').textContent = 'Updating...'
//         const passwordCurrent = document.getElementById('password-current').value
//         const password = document.getElementById('password').value
//         const passwordConfirm = document.getElementById('password-confirm').value
//         await updateSettings({ passwordCurrent, password, passwordConfirm }, 'password')
//         document.querySelector('.btn--save-password').textContent = 'Save password'
//         document.getElementById('password-current').value = ''
//         document.getElementById('password').value = ''
//         document.getElementById('password-confirm').value = ''
//     })
// if (bookBtn)
//     bookBtn.addEventListener('click', e => {
//         e.target.textContent = 'Processing...'
//         const { tourId } = e.target.dataset
//         bookTour(tourId)
//     })
// show alerts sent by the server


var alertMsg = document.querySelector('body').dataset.alertmsg;
var alertType = document.querySelector('body').dataset.alerttype;
if (alertMsg && alertType) (0, _alert.default)(alertType, alertMsg, 500);
},{"core-js/modules/es6.array.copy-within":"../../node_modules/core-js/modules/es6.array.copy-within.js","core-js/modules/es6.array.fill":"../../node_modules/core-js/modules/es6.array.fill.js","core-js/modules/es6.array.find":"../../node_modules/core-js/modules/es6.array.find.js","core-js/modules/es6.array.find-index":"../../node_modules/core-js/modules/es6.array.find-index.js","core-js/modules/es7.array.flat-map":"../../node_modules/core-js/modules/es7.array.flat-map.js","core-js/modules/es6.array.from":"../../node_modules/core-js/modules/es6.array.from.js","core-js/modules/es7.array.includes":"../../node_modules/core-js/modules/es7.array.includes.js","core-js/modules/es6.array.iterator":"../../node_modules/core-js/modules/es6.array.iterator.js","core-js/modules/es6.array.of":"../../node_modules/core-js/modules/es6.array.of.js","core-js/modules/es6.array.sort":"../../node_modules/core-js/modules/es6.array.sort.js","core-js/modules/es6.array.species":"../../node_modules/core-js/modules/es6.array.species.js","core-js/modules/es6.date.to-json":"../../node_modules/core-js/modules/es6.date.to-json.js","core-js/modules/es6.date.to-primitive":"../../node_modules/core-js/modules/es6.date.to-primitive.js","core-js/modules/es6.function.has-instance":"../../node_modules/core-js/modules/es6.function.has-instance.js","core-js/modules/es6.function.name":"../../node_modules/core-js/modules/es6.function.name.js","core-js/modules/es6.map":"../../node_modules/core-js/modules/es6.map.js","core-js/modules/es6.math.acosh":"../../node_modules/core-js/modules/es6.math.acosh.js","core-js/modules/es6.math.asinh":"../../node_modules/core-js/modules/es6.math.asinh.js","core-js/modules/es6.math.atanh":"../../node_modules/core-js/modules/es6.math.atanh.js","core-js/modules/es6.math.cbrt":"../../node_modules/core-js/modules/es6.math.cbrt.js","core-js/modules/es6.math.clz32":"../../node_modules/core-js/modules/es6.math.clz32.js","core-js/modules/es6.math.cosh":"../../node_modules/core-js/modules/es6.math.cosh.js","core-js/modules/es6.math.expm1":"../../node_modules/core-js/modules/es6.math.expm1.js","core-js/modules/es6.math.fround":"../../node_modules/core-js/modules/es6.math.fround.js","core-js/modules/es6.math.hypot":"../../node_modules/core-js/modules/es6.math.hypot.js","core-js/modules/es6.math.imul":"../../node_modules/core-js/modules/es6.math.imul.js","core-js/modules/es6.math.log1p":"../../node_modules/core-js/modules/es6.math.log1p.js","core-js/modules/es6.math.log10":"../../node_modules/core-js/modules/es6.math.log10.js","core-js/modules/es6.math.log2":"../../node_modules/core-js/modules/es6.math.log2.js","core-js/modules/es6.math.sign":"../../node_modules/core-js/modules/es6.math.sign.js","core-js/modules/es6.math.sinh":"../../node_modules/core-js/modules/es6.math.sinh.js","core-js/modules/es6.math.tanh":"../../node_modules/core-js/modules/es6.math.tanh.js","core-js/modules/es6.math.trunc":"../../node_modules/core-js/modules/es6.math.trunc.js","core-js/modules/es6.number.constructor":"../../node_modules/core-js/modules/es6.number.constructor.js","core-js/modules/es6.number.epsilon":"../../node_modules/core-js/modules/es6.number.epsilon.js","core-js/modules/es6.number.is-finite":"../../node_modules/core-js/modules/es6.number.is-finite.js","core-js/modules/es6.number.is-integer":"../../node_modules/core-js/modules/es6.number.is-integer.js","core-js/modules/es6.number.is-nan":"../../node_modules/core-js/modules/es6.number.is-nan.js","core-js/modules/es6.number.is-safe-integer":"../../node_modules/core-js/modules/es6.number.is-safe-integer.js","core-js/modules/es6.number.max-safe-integer":"../../node_modules/core-js/modules/es6.number.max-safe-integer.js","core-js/modules/es6.number.min-safe-integer":"../../node_modules/core-js/modules/es6.number.min-safe-integer.js","core-js/modules/es6.number.parse-float":"../../node_modules/core-js/modules/es6.number.parse-float.js","core-js/modules/es6.number.parse-int":"../../node_modules/core-js/modules/es6.number.parse-int.js","core-js/modules/es6.object.assign":"../../node_modules/core-js/modules/es6.object.assign.js","core-js/modules/es7.object.define-getter":"../../node_modules/core-js/modules/es7.object.define-getter.js","core-js/modules/es7.object.define-setter":"../../node_modules/core-js/modules/es7.object.define-setter.js","core-js/modules/es7.object.entries":"../../node_modules/core-js/modules/es7.object.entries.js","core-js/modules/es6.object.freeze":"../../node_modules/core-js/modules/es6.object.freeze.js","core-js/modules/es6.object.get-own-property-descriptor":"../../node_modules/core-js/modules/es6.object.get-own-property-descriptor.js","core-js/modules/es7.object.get-own-property-descriptors":"../../node_modules/core-js/modules/es7.object.get-own-property-descriptors.js","core-js/modules/es6.object.get-own-property-names":"../../node_modules/core-js/modules/es6.object.get-own-property-names.js","core-js/modules/es6.object.get-prototype-of":"../../node_modules/core-js/modules/es6.object.get-prototype-of.js","core-js/modules/es7.object.lookup-getter":"../../node_modules/core-js/modules/es7.object.lookup-getter.js","core-js/modules/es7.object.lookup-setter":"../../node_modules/core-js/modules/es7.object.lookup-setter.js","core-js/modules/es6.object.prevent-extensions":"../../node_modules/core-js/modules/es6.object.prevent-extensions.js","core-js/modules/es6.object.to-string":"../../node_modules/core-js/modules/es6.object.to-string.js","core-js/modules/es6.object.is":"../../node_modules/core-js/modules/es6.object.is.js","core-js/modules/es6.object.is-frozen":"../../node_modules/core-js/modules/es6.object.is-frozen.js","core-js/modules/es6.object.is-sealed":"../../node_modules/core-js/modules/es6.object.is-sealed.js","core-js/modules/es6.object.is-extensible":"../../node_modules/core-js/modules/es6.object.is-extensible.js","core-js/modules/es6.object.keys":"../../node_modules/core-js/modules/es6.object.keys.js","core-js/modules/es6.object.seal":"../../node_modules/core-js/modules/es6.object.seal.js","core-js/modules/es6.object.set-prototype-of":"../../node_modules/core-js/modules/es6.object.set-prototype-of.js","core-js/modules/es7.object.values":"../../node_modules/core-js/modules/es7.object.values.js","core-js/modules/es6.promise":"../../node_modules/core-js/modules/es6.promise.js","core-js/modules/es7.promise.finally":"../../node_modules/core-js/modules/es7.promise.finally.js","core-js/modules/es6.reflect.apply":"../../node_modules/core-js/modules/es6.reflect.apply.js","core-js/modules/es6.reflect.construct":"../../node_modules/core-js/modules/es6.reflect.construct.js","core-js/modules/es6.reflect.define-property":"../../node_modules/core-js/modules/es6.reflect.define-property.js","core-js/modules/es6.reflect.delete-property":"../../node_modules/core-js/modules/es6.reflect.delete-property.js","core-js/modules/es6.reflect.get":"../../node_modules/core-js/modules/es6.reflect.get.js","core-js/modules/es6.reflect.get-own-property-descriptor":"../../node_modules/core-js/modules/es6.reflect.get-own-property-descriptor.js","core-js/modules/es6.reflect.get-prototype-of":"../../node_modules/core-js/modules/es6.reflect.get-prototype-of.js","core-js/modules/es6.reflect.has":"../../node_modules/core-js/modules/es6.reflect.has.js","core-js/modules/es6.reflect.is-extensible":"../../node_modules/core-js/modules/es6.reflect.is-extensible.js","core-js/modules/es6.reflect.own-keys":"../../node_modules/core-js/modules/es6.reflect.own-keys.js","core-js/modules/es6.reflect.prevent-extensions":"../../node_modules/core-js/modules/es6.reflect.prevent-extensions.js","core-js/modules/es6.reflect.set":"../../node_modules/core-js/modules/es6.reflect.set.js","core-js/modules/es6.reflect.set-prototype-of":"../../node_modules/core-js/modules/es6.reflect.set-prototype-of.js","core-js/modules/es6.regexp.constructor":"../../node_modules/core-js/modules/es6.regexp.constructor.js","core-js/modules/es6.regexp.flags":"../../node_modules/core-js/modules/es6.regexp.flags.js","core-js/modules/es6.regexp.match":"../../node_modules/core-js/modules/es6.regexp.match.js","core-js/modules/es6.regexp.replace":"../../node_modules/core-js/modules/es6.regexp.replace.js","core-js/modules/es6.regexp.split":"../../node_modules/core-js/modules/es6.regexp.split.js","core-js/modules/es6.regexp.search":"../../node_modules/core-js/modules/es6.regexp.search.js","core-js/modules/es6.regexp.to-string":"../../node_modules/core-js/modules/es6.regexp.to-string.js","core-js/modules/es6.set":"../../node_modules/core-js/modules/es6.set.js","core-js/modules/es6.symbol":"../../node_modules/core-js/modules/es6.symbol.js","core-js/modules/es7.symbol.async-iterator":"../../node_modules/core-js/modules/es7.symbol.async-iterator.js","core-js/modules/es6.string.anchor":"../../node_modules/core-js/modules/es6.string.anchor.js","core-js/modules/es6.string.big":"../../node_modules/core-js/modules/es6.string.big.js","core-js/modules/es6.string.blink":"../../node_modules/core-js/modules/es6.string.blink.js","core-js/modules/es6.string.bold":"../../node_modules/core-js/modules/es6.string.bold.js","core-js/modules/es6.string.code-point-at":"../../node_modules/core-js/modules/es6.string.code-point-at.js","core-js/modules/es6.string.ends-with":"../../node_modules/core-js/modules/es6.string.ends-with.js","core-js/modules/es6.string.fixed":"../../node_modules/core-js/modules/es6.string.fixed.js","core-js/modules/es6.string.fontcolor":"../../node_modules/core-js/modules/es6.string.fontcolor.js","core-js/modules/es6.string.fontsize":"../../node_modules/core-js/modules/es6.string.fontsize.js","core-js/modules/es6.string.from-code-point":"../../node_modules/core-js/modules/es6.string.from-code-point.js","core-js/modules/es6.string.includes":"../../node_modules/core-js/modules/es6.string.includes.js","core-js/modules/es6.string.italics":"../../node_modules/core-js/modules/es6.string.italics.js","core-js/modules/es6.string.iterator":"../../node_modules/core-js/modules/es6.string.iterator.js","core-js/modules/es6.string.link":"../../node_modules/core-js/modules/es6.string.link.js","core-js/modules/es7.string.pad-start":"../../node_modules/core-js/modules/es7.string.pad-start.js","core-js/modules/es7.string.pad-end":"../../node_modules/core-js/modules/es7.string.pad-end.js","core-js/modules/es6.string.raw":"../../node_modules/core-js/modules/es6.string.raw.js","core-js/modules/es6.string.repeat":"../../node_modules/core-js/modules/es6.string.repeat.js","core-js/modules/es6.string.small":"../../node_modules/core-js/modules/es6.string.small.js","core-js/modules/es6.string.starts-with":"../../node_modules/core-js/modules/es6.string.starts-with.js","core-js/modules/es6.string.strike":"../../node_modules/core-js/modules/es6.string.strike.js","core-js/modules/es6.string.sub":"../../node_modules/core-js/modules/es6.string.sub.js","core-js/modules/es6.string.sup":"../../node_modules/core-js/modules/es6.string.sup.js","core-js/modules/es7.string.trim-left":"../../node_modules/core-js/modules/es7.string.trim-left.js","core-js/modules/es7.string.trim-right":"../../node_modules/core-js/modules/es7.string.trim-right.js","core-js/modules/es6.typed.array-buffer":"../../node_modules/core-js/modules/es6.typed.array-buffer.js","core-js/modules/es6.typed.int8-array":"../../node_modules/core-js/modules/es6.typed.int8-array.js","core-js/modules/es6.typed.uint8-array":"../../node_modules/core-js/modules/es6.typed.uint8-array.js","core-js/modules/es6.typed.uint8-clamped-array":"../../node_modules/core-js/modules/es6.typed.uint8-clamped-array.js","core-js/modules/es6.typed.int16-array":"../../node_modules/core-js/modules/es6.typed.int16-array.js","core-js/modules/es6.typed.uint16-array":"../../node_modules/core-js/modules/es6.typed.uint16-array.js","core-js/modules/es6.typed.int32-array":"../../node_modules/core-js/modules/es6.typed.int32-array.js","core-js/modules/es6.typed.uint32-array":"../../node_modules/core-js/modules/es6.typed.uint32-array.js","core-js/modules/es6.typed.float32-array":"../../node_modules/core-js/modules/es6.typed.float32-array.js","core-js/modules/es6.typed.float64-array":"../../node_modules/core-js/modules/es6.typed.float64-array.js","core-js/modules/es6.weak-map":"../../node_modules/core-js/modules/es6.weak-map.js","core-js/modules/es6.weak-set":"../../node_modules/core-js/modules/es6.weak-set.js","core-js/modules/web.timers":"../../node_modules/core-js/modules/web.timers.js","core-js/modules/web.immediate":"../../node_modules/core-js/modules/web.immediate.js","core-js/modules/web.dom.iterable":"../../node_modules/core-js/modules/web.dom.iterable.js","regenerator-runtime/runtime":"../../node_modules/regenerator-runtime/runtime.js","./radar/linkupRadar":"radar/linkupRadar.js","./util/alert":"util/alert.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "50083" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
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
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
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
      cb();
    });

    return true;
  }
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/js/bundle.js.map