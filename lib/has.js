/*
 * ns-props
 * https://github.com/fatfisz/ns-props
 *
 * Copyright (c) 2015 FatFisz
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function hasNamespacedProperty(object, name) {
  var namespaces = name.split('.');
  var currentObject = object;
  var index;
  var length;
  var currentNamespace;

  for (index = 0, length = namespaces.length; index < length; index += 1) {
    currentNamespace = namespaces[index];

    if (!currentObject.hasOwnProperty(currentNamespace)) {
      return false;
    }

    currentObject = currentObject[currentNamespace];
  }

  return true;
};
