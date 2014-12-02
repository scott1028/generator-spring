'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var genUtil = require('../util.js');

var ServiceGenerator = yeoman.generators.NamedBase.extend({
  writing: function () {
    this.template('_service.js',
        path.join(genUtil.resourcePath(), 'scripts/services/', this.name + '.js'));
    this.template('_spec.js',
        path.join(genUtil.testPath(), 'spec/services/', this.name + '.js'));
    genUtil.addScriptToIndex('resources/scripts/services/' + this.name);
  }
});

module.exports = ServiceGenerator;
