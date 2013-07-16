'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');


module.exports = Generator;

function Generator() {
	ScriptBase.apply(this, arguments);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createViewFiles = function createViewFiles() {
	this.template('_view.html', path.join(this.resourcePath(), 'views/', this.name + '.html'));
};