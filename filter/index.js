'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var genUtil = require('../util.js');

var FilterGenerator = yeoman.generators.NamedBase.extend({
  writing: function () {
    this.template('_filter.js',
        path.join(genUtil.resourcePath(), 'scripts/filters/', this.name + '.js'));
    this.template('_spec.js',
        path.join(genUtil.testPath(), 'spec/filters/', this.name + '.js'));
    genUtil.addScriptToIndex('resources/scripts/filters/' + this.name);
  }
});

module.exports = FilterGenerator;
