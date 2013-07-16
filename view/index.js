'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');


module.exports = Generator;

function Generator() {
	yeoman.generators.NamedBase.apply(this, arguments);
}

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.createViewFiles = function createViewFiles() {
	var path = 'src/main/webapp/resources/views/';
	this.template('_view.html', path + this.name + '.html');
};