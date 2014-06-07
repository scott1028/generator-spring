'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');

function Generator() {
  ScriptBase.apply(this, arguments);
  var name = this.name;

  // if the controller name is suffixed with ctrl, remove the suffix
  // if the controller name is just "ctrl," don't append/remove "ctrl"
  if (name && name.toLowerCase() !== 'ctrl' && name.substr(-4).toLowerCase() === 'ctrl') {
    name = name.slice(0, -4);
  }

  if (name.substr(0) === '/') {
    name = name.slice(0, 1);
  }

  if (name.substr(-1) === '/') {
    name = name.slice(0, -1);
  }

  this.path = name;
  if (name.lastIndexOf('/') > 0) {
    this.fileName = name.substr(name.lastIndexOf('/') + 1, name.length);
    this.path = this.path + '/' + this.fileName;
  } else {
    this.path = this.path + '/' + this.path;
  }
}

module.exports = Generator;

util.inherits(Generator, ScriptBase);

Generator.prototype.createControllerFiles = function createControllerFiles() {
  this.template('_controller.js', path.join(this.resourcePath(), 'scripts/controllers/', this.path + '.js'));
  this.template('_view.html', path.join(this.resourcePath(), 'scripts/controllers/', this.path + '.html'));
  this.template('_spec.js', path.join(this.testPath(), 'spec/controllers/', this.path + '.js'));
  this.addScriptToIndex(path.join('resources/scripts/controllers/', this.path));
};
