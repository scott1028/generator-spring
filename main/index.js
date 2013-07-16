'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

module.exports = Generator;

function Generator() {
	ScriptBase.apply(this, arguments);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createAppFile = function createAppFile() {
	var resoucePath = 'src/main/webapp/resources/';
	this.template('_app.js', resoucePath + 'scripts/app.js');
	this.template('../../view/templates/_main.html', resoucePath + 'views/main.html');
};
