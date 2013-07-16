'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

module.exports = Generator;

function Generator() {
	ScriptBase.apply(this, arguments);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createDirectiveFiles = function createDirectiveFiles() {
	var resourcePath = 'src/main/webapp/resources/scripts/directives/';
	var testPath = 'src/main/webapp/karma/spec/directives/';
	this.template('_directive.js', resourcePath + this.name + '.js');
	this.template('_spec.js', testPath + this.name + '.js');
	this.addScriptToIndex('resources/scripts/directives/' + this.name);
};
