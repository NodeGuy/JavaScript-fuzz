/*global define:true*/

'use strict';

define(['assert', 'underscore', '../lib/main'], function (assert, _, fuzz) {
  // 8.1 undefined
  assert(_.isUndefined(fuzz.types.undefined()));

  // 8.2 null
  assert(_.isNull(fuzz.types.null()));

  // 8.3 boolean
  assert(_.isBoolean(fuzz.types.boolean()));

  // 8.4 string
  (function () {
    var string;

    string = fuzz.types.string();
    assert(_.isString(string));
    assert(string.length <= 100);

    assert(fuzz.types.string(10).length <= 10);
  })();

  // 8.5 number
  _.times(30, function () {
    assert(_.isNumber(fuzz.types.number()));
  });

  fuzz.random();
});
