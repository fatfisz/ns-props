/*
 * ns-props
 * https://github.com/fatfisz/ns-props
 *
 * Copyright (c) 2015 FatFisz
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function getNamespacedProperty(object, name) {
  var namespaces = name.split('.');
  var currentObject = object;
  var index;
  var length;
  var currentNamespace;

  for (index = 0, length = namespaces.length; index < length; index += 1) {
    currentNamespace = namespaces[index];

    if (process.env.NODE_ENV !== 'production' &&
        !currentObject.hasOwnProperty(currentNamespace)) {
      throw new Error(
        'Namespaced property "' + namespaces.slice(0, index + 1) + '" does not exist'
      );
    }

    currentObject = currentObject[currentNamespace];
  }

  return currentObject;
};
