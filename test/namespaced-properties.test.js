/*
 * ns-props
 * https://github.com/fatfisz/ns-props
 *
 * Copyright (c) 2015 FatFisz
 * Licensed under the MIT license.
 */

'use strict';

var should = require('should');

var nsProps = require('../lib');


describe('get method', function () {

  it('simple prop', function () {
    var testObject = {
      prop: 'test',
      anotherProp: 'another test',
    };

    should(nsProps.get(testObject, 'prop')).be.equal('test');
    should(nsProps.get(testObject, 'anotherProp')).be.equal('another test');
  });

  it('namespaced prop', function () {
    var testObject = {
      namespace: {
        prop: 'test',
      },
      anotherNamespace: {
        anotherProp: 'another test',
      },
    };

    should(nsProps.get(testObject, 'namespace.prop')).be.equal('test');
    should(nsProps.get(testObject, 'anotherNamespace.anotherProp')).be.equal('another test');
  });

  it('very namespaced prop', function () {
    var testObject = {
      ns1: {
        ns2: {
          ns3: {
            ns4: {
              ns5: {
                prop: 'test',
              },
            },
          },
        },
      },
    };

    should(nsProps.get(testObject, 'ns1.ns2.ns3.ns4.ns5.prop')).be.equal('test');
  });

});

describe('has method', function () {

  it('simple prop', function () {
    var testObject = {
      prop: 'test',
    };

    should(nsProps.has(testObject, 'prop')).be.true();

    should(nsProps.has(testObject, 'noSuchProp')).be.false();
  });

  it('namespaced prop', function () {
    var testObject = {
      namespace: {
        prop: 'test',
      },
    };

    should(nsProps.has(testObject, 'namespace.prop')).be.true();

    should(nsProps.has(testObject, 'noSuchNamespace')).be.false();
    should(nsProps.has(testObject, 'namespace.noSuchProp')).be.false();
  });

  it('very namespaced prop', function () {
    var testObject = {
      ns1: {
        ns2: {
          ns3: {
            ns4: {
              ns5: {
                prop: 'test',
              },
            },
          },
        },
      },
    };

    should(nsProps.has(testObject, 'ns1')).be.true();
    should(nsProps.has(testObject, 'ns1.ns2')).be.true();
    should(nsProps.has(testObject, 'ns1.ns2.ns3')).be.true();
    should(nsProps.has(testObject, 'ns1.ns2.ns3.ns4')).be.true();
    should(nsProps.has(testObject, 'ns1.ns2.ns3.ns4.ns5')).be.true();
    should(nsProps.has(testObject, 'ns1.ns2.ns3.ns4.ns5.prop')).be.true();
  });

});

describe('set method', function () {

  it('simple prop', function () {
    var testObject = {};

    nsProps.set(testObject, 'prop', 'test');
    nsProps.set(testObject, 'anotherProp', 'another test');

    should(testObject.prop).be.equal('test');
    should(testObject.anotherProp).be.equal('another test');
  });

  it('namespaced prop', function () {
    var testObject = {};

    nsProps.set(testObject, 'namespace.prop', 'test');
    nsProps.set(testObject, 'anotherNamespace.anotherProp', 'another test');

    should(testObject.namespace.prop).be.equal('test');
    should(testObject.anotherNamespace.anotherProp).be.equal('another test');
  });

  it('very namespaced prop', function () {
    var testObject = {};

    nsProps.set(testObject, 'ns1.ns2.ns3.ns4.ns5.prop', 'test');

    should(testObject.ns1.ns2.ns3.ns4.ns5.prop).be.equal('test');
  });

});

describe('README example', function () {

  it('should work', function () {
    var obj = {};

    nsProps.has(obj, 'ns.prop'); // false

    nsProps.set(obj, 'ns.prop', 'value'); // obj is { ns: { prop: 'value' } }

    nsProps.has(obj, 'ns.prop'); // true

    nsProps.get(obj, 'ns.prop'); // 'value'
    obj.ns.prop; // the same as above, 'value'

    should.throws(function () {
      nsProps.get(obj, 'hello'); // throws an error, no such property
    }, function (err) {
      should(err.message).be.equal('Namespaced property "hello" does not exist');
      return true;
    });

    should.throws(function () {
      nsProps.set(obj, 'ns.prop.another', 42); // throws an error, obj.ns.prop can't be a namespace
    }, function (err) {
      should(err.message).be.equal('"ns.prop" is already a non-namespace');
      return true;
    });
  });

});
