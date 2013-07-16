'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');


module.exports = Generator;

function Generator() {
	ScriptBase.apply(this, arguments);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createServiceFiles = function createServiceFiles() {
	var resourcePath = 'src/main/webapp/resources/scripts/services/';
	var testPath = 'src/main/webapp/karma/spec/services/';
	this.template('_service.js', resourcePath + this.name + '.js');
	this.template('_spec.js', testPath + this.name + '.js');
	this.addScriptToIndex('resources/scripts/services/' + this.name);
};
