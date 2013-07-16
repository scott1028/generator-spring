'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');

module.exports = Generator;

function Generator() {
	ScriptBase.apply(this, arguments);
	this.hookFor('spring:controller');
	this.hookFor('spring:view');
}

util.inherits(Generator, ScriptBase);

Generator.prototype.rewriteAppJs = function () {
	var resourcePath = 'src/main/webapp/resources/';
	angularUtils.rewriteFile({
		file: resourcePath + 'scripts/app.js',
		needle: '.otherwise',
		splicable: [
			'\t\t.when(\'/' + this.name + '\', {',
			'\t\t\ttemplateUrl: \'resources/views/' + this.name + '.html\',',
			'\t\t\tcontroller: \'' + this._.classify(this.name) + 'Ctrl\'',
			'\t\t})'
		]
	});
};
