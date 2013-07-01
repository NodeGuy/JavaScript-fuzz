/*global define:true*/

'use strict';

/*
Generates random values of the types defined in:

Standard ECMA-262 ECMAScript® Language Specification Edition 5.1 (June 2011)
http://www.ecma-international.org/publications/standards/Ecma-262.htm
*/

define(['underscore'], function (_) {
  var types, atoms;

  function randomElement(array) {
    return array[_.random(array.length - 1)];
  }

  function random(maximumDepth) {
    var name, type, generator;

    maximumDepth = maximumDepth || 5;

    name = randomElement(maximumDepth > 1 ? Object.keys(types) : atoms);
    type = types[name];
    generator = type.generator;

    return type.atomic
      ? generator()
      : generator(maximumDepth - 1);
  }

  types = {
    // 8.1 undefined
    undefined: {
      atomic: true,

      generator: function () {
        return undefined;
      }
    },

    // 8.2 null
    null: {
      atomic: true,

      generator: function () {
        return null;
      }
    },

    // 8.3 boolean
    boolean: {
      atomic: true,

      generator: function () {
        return Math.random() < 0.5;
      }
    },

    // 8.4 string
    string: {
      atomic: true,

      generator: function (maximumLength) {
        var length, charCodes, charCodeLimit;

        length = _.random(maximumLength || 10);
        charCodes = [];
        charCodeLimit = Math.pow(2, 16);

        _.times(length, function () {
          charCodes.push(_.random(charCodeLimit));
        });

        return String.fromCharCode.apply(null, charCodes);
      }
    },

    // 8.5 number
    number: {
      atomic: true,

      generator: function () {
        return randomElement([
          function () {
            var sign;

            sign = random.boolean() ? -1 : 1;
            return sign * Math.random() * Number.MAX_VALUE;
          },

          // This must be generated separately because the above function will
          // never generate it.
          function () { return Number.MAX_VALUE; },

          function () { return NaN; },
          function () { return -Infinity; },
          function () { return Infinity; }
        ])();
      }
    },

    // 8.6 object
    object: {
      atomic: false,

      generator: function (maximumDepth, maximumLength) {
        var length, names, name, object;

        length = _.random(maximumLength || 10);

        // Choose random but unique property names.
        names = [];

        while (names.length < length) {
          name = random.string();

          if (names.indexOf(name) == -1)
            names.push(name);
        }

        object = {};

        names.forEach(function (name) {
          Object.defineProperty(object, name, random.boolean()
            ? {
                value: random((maximumDepth || 5) - 1),
                writable: random.boolean(),
                enumerable: random.boolean(),
                configurable: random.boolean()
              }
            : {
                get: function () {},
                set: function () {},
                enumerable: random.boolean(),
                configurable: random.boolean()
            });
        });

        return object;
      }
    }
  };

  atoms = [];

  Object.keys(types).forEach(function (type) {
    if (types[type].atomic)
      atoms.push(type);

    random[type] = types[type].generator;
  });

  return random;
});
