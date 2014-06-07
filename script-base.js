'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var angularUtils = require('./util.js');

function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);

  try {
    this.appname = require(path.join(process.cwd(), 'bower.json')).name;
  } catch (e) {
    this.appname = path.basename(process.cwd());
  }
}

module.exports = Generator;

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.resourcePath = function () {
  return 'src/main/resources/public/';
};

Generator.prototype.testPath = function () {
  return 'karma/';
};

Generator.prototype.addScriptToIndex = function (script) {
  try {
    var fullPath = 'src/main/resources/public/index.html';
    angularUtils.rewriteFile({
      file: fullPath,
      needle: '<!-- endbuild -->',
      splicable: [
        '<script src="' + script + '.js"></script>'
      ]
    });
  } catch (e) {
    console.log('\nUnable to find '.yellow + fullPath + '. Reference to '.yellow + script + '.js ' + 'not added.\n'.yellow);
  }
};
