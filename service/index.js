'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');

module.exports = Generator;

function Generator() {
	ScriptBase.apply(this, arguments);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createServiceFiles = function createServiceFiles() {
	this.template('_service.js', path.join(this.resourcePath(), 'scripts/services/', this.name + '.js'));
	this.template('_spec.js', path.join(this.testPath(), 'spec/services/', this.name + '.js'));
	this.addScriptToIndex('resources/scripts/services/' + this.name);
};
