/*global describe, beforeEach, it*/
'use strict';

var assert  = require('assert');

describe('Spring Generator Test Load', function () {
  it('can be imported without blowing up', function () {
    var app = require('../app');
    var controller = require('../controller');
    // var directive = require('../directive');
    var filter = require('../filter');
    var service = require('../service');
    assert(app !== undefined);
    assert(controller !== undefined);
    // assert(directive !== undefined);
    assert(filter !== undefined);
    assert(service !== undefined);
  });
});
