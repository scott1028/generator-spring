'use strict';
var path = require('path');
var util = require('util');
var ScriptBase = require('../script-base.js');

module.exports = Generator;

function Generator() {
  ScriptBase.apply(this, arguments);

  // if the controller name is suffixed with ctrl, remove the suffix
  // if the controller name is just "ctrl," don't append/remove "ctrl"
  if (this.name && this.name.toLowerCase() !== 'ctrl' && this.name.substr(-4).toLowerCase() === 'ctrl') {
    this.name = this.name.slice(0, -4);
  }

  if (this.name.substr(0) === '/') {
    this.name = this.name.slice(0, 1);
  }

  if (this.name.substr(-1) === '/') {
    this.name = this.name.slice(0, -1);
  }

  this.path = this.name;
  if (this.name.lastIndexOf('/') > 0) {
    this.fileName = this.name.substr(this.name.lastIndexOf('/') + 1, this.name.length);
    this.path = this.path + '/' + this.fileName;
  } else {
    this.path = this.path + '/' + this.path;
  }
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createControllerFiles = function createControllerFiles() {
  this.template('_controller.js', path.join(this.resourcePath(), 'scripts/controllers/', this.path + '.js'));
  this.template('_view.html', path.join(this.resourcePath(), 'scripts/controllers/', this.path + '.html'));
  this.template('_spec.js', path.join(this.testPath(), 'spec/controllers/', this.path + '.js'));
  this.addScriptToIndex(path.join('resources/scripts/controllers/', this.path));
};
