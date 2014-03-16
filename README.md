JavaScript-fuzz generates random values for every standard, built-in type of
[ECMAScript 5.1]
(http://www.ecma-international.org/publications/standards/Ecma-262.htm)
so you can use them to [fuzz test](https://en.wikipedia.org/wiki/Fuzz_testing)
your code.

Rather than generating only values which are probable to occur (such as recent
dates), JavaScript-fuzz strives to generate values in the full legal range
(e.g., including dates that are 270 millennia in the future).

## Usage

```JavaScript
var assert = require('assert'),
    random = require('JavaScript-fuzz');

assert.equal(typeof random.boolean(), 'boolean');

console.log(random());
```

```JavaScript
[ false,
  [ 1.3987869234598501e+308,
    '罃喩',
    -Infinity,
    [ /((a)|(ab))((c)|(bc))/gm,
      Sun Oct 12 262864 11:55:04 GMT-0300 (ART),
      [TypeError: 䧓ꅙۜ⧁雁득롼峑兗],
      NaN,
      Mon Sep 14 -99861 15:54:18 GMT-0300 (ART) ],
    null,
    '촲脞貃Ĝ똳ꋹ発',
    '㇣国ᢣ宥缚뮀㔞',
    undefined,
    false ],
  [Function],
  [Function],
  { '魩': '伾', '㥏Ο': [Getter/Setter], '': [Getter/Setter] } ]
```

## API

### random([options])

Returns a random value.  Omits functions if `options.functions` is `false`.

### random.undefined()

Returns `undefined`.

### random.null()

Returns `null`.

### random.boolean()

Returns `true` or `false`.

### random.string(options)

Returns a random `String` of up to `options.maximumLength` characters.

### random.number()

Returns a random `Number`, including possibly `NaN`, `-Infinity`, or `Infinity`.

### random.object([options])

Returns a random `Object`.  Omits functions if `options.functions` is `false`.

### random.object.simple(options)

Returns a random simple `Object` with at most `options.maximumLength` properties.

### random.object.function(options)

Returns `function () {}` with at most `options.maximumLength` properties.

### random.object.array(options)

Returns a random `Array` with at most `options.maximumLength` elements.

### random.object.date()

Returns a random `Date`.

### random.object.regexp()

Returns a random `RegExp`.

### random.object.error(options)

Returns one of `Error`, `RangeError`, `ReferenceError`, `SyntaxError`,
`TypeError`, or `URIError`, with a random message.

Omits the non-standard `stack` property if `options.functions` is false because
it sometimes has a getter function.

## See Also

[Gremlins.js](https://github.com/marmelab/gremlins.js) - Monkey testing library for web apps and Node.js

## Copyright

Copyright 2013 David Braun

This file is part of JavaScript-fuzz.

JavaScript-fuzz is free software: you can redistribute it and/or modify it under
the terms of the GNU Lesser General Public License as published by the Free
Software Foundation, either version 3 of the License, or (at your option) any
later version.

JavaScript-fuzz is distributed in the hope that it will be useful, but WITHOUT
ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
details.

You should have received a copy of the GNU Lesser General Public License along
with JavaScript-fuzz. If not, see http://www.gnu.org/licenses/.
