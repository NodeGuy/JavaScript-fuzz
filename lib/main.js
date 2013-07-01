/*global define:true*/

'use strict';

/*
Generates random values of the types defined in:

Standard ECMA-262 ECMAScript® Language Specification Edition 5.1 (June 2011)
http://www.ecma-international.org/publications/standards/Ecma-262.htm
*/

define(['underscore'], function (_) {
  var types;

  function callRandomValue(object) {
    var values;

    values = _.values(object);
    return values[_.random(values.length - 1)]();
  }

  types = {
    // 8.1 undefined
    undefined: function () {
      return undefined;
    },

    // 8.2 null
    null: function () {
      return null;
    },

    // 8.3 boolean
    boolean: function () {
      return Math.random() < 0.5;
    },

    // 8.4 string
    string: function (maximumLength) {
      var length, charCodes, charCodeLimit;

      length = _.random(maximumLength || 100);
      charCodes = [];
      charCodeLimit = Math.pow(2, 16);

      _.times(length, function () {
        charCodes.push(_.random(charCodeLimit));
      });

      return String.fromCharCode.apply(null, charCodes);
    },

    // 8.5 number
    number: function () {
      return callRandomValue({
        finite: function () {
          var sign;

          sign = types.boolean() ? -1 : 1;
          return sign * Math.random() * Number.MAX_VALUE;
        },

        // This must be generated separately because the 'finite' function
        // above will never generate it.
        MAX_VALUE: function () {
          return Number.MAX_VALUE;
        },

        NaN: function () {
          return NaN;
        },

        NEGATIVE_INFINITY: function () {
          return -Infinity;
        },

        POSITIVE_INFINITY: function () {
          return Infinity;
        }
      });
    }
  };

  return {
    random: function () {
      return callRandomValue(types);
    },

    types: types
  };
});
