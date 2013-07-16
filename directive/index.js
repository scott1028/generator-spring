'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');

module.exports = Generator;

function Generator() {
	ScriptBase.apply(this, arguments);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createDirectiveFiles = function createDirectiveFiles() {
	this.template('_directive.js', path.join(this.resourcePath(), 'scripts/directives', this.name + '.js'));
	this.template('_spec.js', path.join(this.testPath(), 'spec/directives', this.name + '.js'));
	this.addScriptToIndex('resources/scripts/directives/' + this.name);
};
