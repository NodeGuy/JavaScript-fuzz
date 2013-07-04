/*global define:true*/

'use strict';

define(['assert', 'util', 'underscore', '../lib/main'],
  function (assert, util, _, random) {
  function containsCircularReference(object) {
    var references;

    function visit(object) {
      if (!_.isObject(object))
        return false;

      if (_.contains(references, object))
        return true;

      references.push(object);

      return _.values(object).map(visit).reduce(function (previous, current) {
        return previous || current;
      }, false);
    }

    references = [];
    return visit(object);
  }

  (function () {
    var object;

    object = {};
    object.reference = object;
    assert(containsCircularReference(object));
    assert(!containsCircularReference({}));
  })();

  function test(times, sample, condition) {
    var index;

    for (index = 0; index < times; index++)
      if (condition(sample()))
        return true;

    return false;
  }

  function testObject(generator) {
    var object;

    // defaults
    object = generator();
    assert(_.isObject(object));
    assert(Object.keys(object).length <= 10);
    assert(test(1000, generator, containsCircularReference));

    assert(test(10, function () {
      return Object.keys(generator({maximumLength: 100})).length;
    },
    function (length) { return length > 10; }));
  }

  // 8.1 Undefined
  assert(_.isUndefined(random.undefined()));

  // 8.2 Null
  assert(_.isNull(random.null()));

  // 8.3 Boolean
  assert(_.isBoolean(random.boolean()));

  // 8.4 String
  (function () {
    var string;

    // defaults
    string = random.string();
    assert(_.isString(string));
    assert(string.length <= 10);

    assert(test(10, function () {
      return random.string({maximumLength: 100}).length;
    },
    function (length) { return length > 10; }));
  })();

  // 8.5 Number
  _.times(10, function () {
    assert(_.isNumber(random.number()));
  });

  // 8.6 Object
  assert(_.isObject(random.object()));
  testObject(random.object.simple);

  // 15.3 Function
  (function () {
    testObject(random.object.function);
    assert(_.isFunction(random.object.function()));
  })();

  // 15.4 Array
  (function () {
    var array;

    // defaults
    array = random.object.array();
    assert(_.isArray(array));
    assert(array.length <= 10);
    assert(test(100, random.object.array, containsCircularReference));

    assert(test(10, function () {
      return random.object.array({maximumLength: 100}).length;
    },
    function (length) { return length > 10; }));
  })();

  // 15.9 Date
  assert(_.isDate(random.object.date()));

  // 15.10 RegExp
  _.times(10, function () {
    assert(_.isRegExp(random.object.regexp()));
  });

  // 15.11 Error
  assert(random.object.error() instanceof Error);

  // random
  (function () {
    var types;

    types = {
      undefined: _.isUndefined,
      null: _.isNull,
      boolean: _.isBoolean,
      string: _.isString,
      number: _.isNumber,
      object: _.isObject,
      function: _.isFunction,
      array: _.isArray,
      date: _.isDate,
      regexp: _.isRegExp,
      error: function (value) { return value instanceof Error; }
    };

    assert(test(1000, function () {
      var value, key;

      value = random();

      for (key in types)
        if (types[key](value)) {
          delete types[key];
          break;
        }
    },
    function () { return _.size(types) === 0; }));

    assert(test(1000, random, containsCircularReference));
  })();
});
