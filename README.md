# ns-props

> Namespaced props (or nice props).

## Getting Started

Install the package with this command:
```shell
npm install ns-props --save
```

Then you can require the package with `require('ns-props')`.

## What does this do?

This lightweight module contains 3 methods for operating on "namespaced" properties: `has`, `get`, and `set`.
They do exactly what their names indicate; look below for examples.

## Why / when should I use it?

This is a utility lib created for another project of mine, where I needed to handle dynamic "namespaces".
If you don't know beforehand what "namespaces" will be used, then this lib is for you.

If all your "namespaces" are static, then you probably don't need to and shouldn't use this library.
Referencing raw properties is always a lot faster.

## Why use quotation marks everywhere?

JavaScript does not have a built-in concept of a "namespace" and this is just one take on what "namespaces" can be in JS.
Hence the quotation marks.

## Examples

```js
var nsProps = require('ns-props');

var obj = {};

nsProps.has(obj, 'ns.prop'); // false

nsProps.set(obj, 'ns.prop', 'value'); // obj is { ns: { prop: 'value' } }

nsProps.has(obj, 'ns.prop'); // true

nsProps.get(obj, 'ns.prop'); // 'value'
obj.ns.prop; // the same as above, 'value'

nsProps.get(obj, 'hello'); // throws an error, no such property

nsProps.set(obj, 'ns.prop.another', 42); // throws an error, obj.ns.prop can't be a namespace
```

## API

All methods assume that `'.'` is a "namespace" separator and not a part of a property name when accessing properties.

Objects are tested for inclusion of properties with `Object.prototype.hasOwnProperty`.

### nsProps.has(object, name)

Returns `true` if there is a "namespaced" property with a name `name` in `object`, and `false` otherwise.

### nsProps.get(object, name)

Returns the value of a "namespaced" property `name` in `object`.

Throws an error if any part of the "namespace" is missing, including the last (key) part.

### nsProps.set(object, name, value)

Sets the value of a "namespaced" property `name` in `object` to `value`.
Returns `undefined`.

Throws an error if any sub-"namespace" is already in `object` and isn't a "namespace".

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code with `npm test`.

## License
Copyright (c) 2015 FatFisz. Licensed under the MIT license.
