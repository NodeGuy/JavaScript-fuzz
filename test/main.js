/*global define:true*/

'use strict';

define(['assert', 'underscore', '../lib/main'], function (assert, _, random) {
  function depthOf(object) {
    var level, key, value;

    level = 1;

    for (key in object) {
      value = object[key];

      if (object.hasOwnProperty(key) && _.isObject(value))
        level = Math.max(depthOf(value) + 1, level);
    }

    return level;
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

    string = random.string();
    assert(_.isString(string));
    assert(string.length <= 10);

    assert(random.string(100).length <= 100);
  })();

  // 8.5 Number
  _.times(30, function () {
    assert(_.isNumber(random.number()));
  });

  // 8.6 Object
  _.times(10, function () {
    assert(_.isObject(random.object()));
  });

  // 15.3 Function
  assert(_.isFunction(random.function()));

  // 15.4 Array
  (function () {
    var array;

    array = random.array();
    assert(_.isArray(array));
    assert(depthOf(array) <= 5);
    assert(array.length <= 10);

    assert(random.array(5, 100).length <= 100);
  })();

  // 15.9 Date
  assert(_.isDate(random.date()));

  // 15.10 RegExp
  assert(_.isRegExp(random.regexp()));

  // 15.11 Error
  assert(random.error() instanceof Error);

  _.times(50, function () {
    assert(depthOf(random()) <= 5);
  });
});
