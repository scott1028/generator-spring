'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');

module.exports = Generator;

function Generator() {
    ScriptBase.apply(this, arguments);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createFilterFiles = function createFilterFiles() {
    this.template('_filter.js', path.join(this.resourcePath(), 'scripts/filters/', this.name + '.js'));
    this.template('_spec.js', path.join(this.testPath(), 'spec/filters/', this.name + '.js'));
    this.addScriptToIndex('resources/scripts/filters/' + this.name);
};