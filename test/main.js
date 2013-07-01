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

  // 8.1 undefined
  assert(_.isUndefined(random.undefined()));

  // 8.2 null
  assert(_.isNull(random.null()));

  // 8.3 boolean
  assert(_.isBoolean(random.boolean()));

  // 8.4 string
  (function () {
    var string;

    string = random.string();
    assert(_.isString(string));
    assert(string.length <= 100);

    assert(random.string(10).length <= 10);
  })();

  // 8.5 number
  _.times(20, function () {
    assert(_.isNumber(random.number()));
  });

  // 8.6 object
  _.times(10, function () {
    assert(_.isObject(random.object()));
  });

  _.times(30, function () {
    assert(depthOf(random()) <= 5);
  });
});
