/*global define:true*/

'use strict';

define(['assert', '../lib/main'], function (assert, fuzz) {
  // 8.1 undefined
  assert.equal(fuzz.types.undefined(), undefined);

  // 8.2 null
  assert.equal(fuzz.types.null(), null);

  // 8.3 boolean
  assert.equal(typeof fuzz.types.boolean(), 'boolean');

  // 8.4 string
  (function () {
    var string;

    string = fuzz.types.string();
    assert.equal(typeof string, 'string');
    assert(string.length <= 100);

    assert(fuzz.types.string(10).length <= 10);
  })();

  // 8.5 number
  assert.equal(typeof fuzz.types.number(), 'number');
});
