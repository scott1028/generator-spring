'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');

module.exports = Generator;

function Generator() {
	ScriptBase.apply(this, arguments);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createAppFile = function createAppFile() {
	this.template('_app.js', path.join(this.resourcePath(), 'scripts/app.js'));
	this.template('../../view/templates/_main.html', path.join(this.resourcePath(), 'views/main.html'));
};
