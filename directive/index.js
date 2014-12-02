'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var genUtil = require('../util.js');

var DirectiveGenerator = yeoman.generators.NamedBase.extend({
  writing: function () {
    this.template('_directive.js',
        path.join(genUtil.resourcePath(), 'scripts/directives', this.name + '.js'));
    this.template('_spec.js',
        path.join(genUtil.testPath(), 'spec/directives', this.name + '.js'));
    genUtil.addScriptToIndex('resources/scripts/directives/' + this.name);
  }
});

module.exports = DirectiveGenerator;
