/*
 * ns-props
 * https://github.com/fatfisz/ns-props
 *
 * Copyright (c) 2015 FatFisz
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function setNamespacedProperty(object, name, value) {
  var namespaces = name.split('.');
  var currentObject = object;
  var index;
  var length;
  var currentNamespace;

  for (index = 0, length = namespaces.length - 1; index < length; index += 1) {
    currentNamespace = namespaces[index];

    if (currentObject.hasOwnProperty(currentNamespace)) {
      if (process.env.NODE_ENV !== 'production' &&
          typeof currentObject[currentNamespace] !== 'object') {
        throw new Error(
          '"' + namespaces.slice(0, index + 1).join('.') + '" is already a non-namespace'
        );
      }
    } else {
      currentObject[currentNamespace] = {};
    }

    currentObject = currentObject[currentNamespace];
  }

  currentNamespace = namespaces[index];
  currentObject[currentNamespace] = value;
};
