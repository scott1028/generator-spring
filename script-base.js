'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var angularUtils = require('./util.js');

module.exports = Generator;

function Generator() {
	yeoman.generators.NamedBase.apply(this, arguments);

	try {
		this.appname = require(path.join(process.cwd(), 'bower.json')).name;
	} catch (e) {
		this.appname = path.basename(process.cwd());
	}
}

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.resourcePath = function () {
	return 'src/main/webapp/resources/';
};

Generator.prototype.testPath = function () {
	return 'src/main/webapp/karma/';
};

Generator.prototype.addScriptToIndex = function (script) {
	try {
		var fullPath = 'src/main/webapp/WEB-INF/views/index.jsp';
		angularUtils.rewriteFile({
			file: fullPath,
			needle: '<!-- endbuild -->',
			splicable: [
				'\t<script src="' + script + '.js"></script>'
			]
		});
	} catch (e) {
		console.log('\nUnable to find '.yellow + fullPath + '. Reference to '.yellow + script + '.js ' + 'not added.\n'.yellow);
	}
};