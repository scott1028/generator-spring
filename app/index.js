'use strict';

var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var SpringGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);
    this.option('skip-install');
  },
  prompting: function () {
    var done = this.async();
    this.log(this.yeoman);

    var prompts = [{
      name: 'projectName',
      message: 'What is the project name?',
      default: 'Demo App'
    }, {
      name: 'basePackage',
      message: 'What is the base project package name (ch.example.projectname)?',
      default: 'ch.example.demo'
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.basePackage = props.basePackage;
      done();
    }.bind(this));
  },
  writing: {
    javafiles: function () {
      var mainPath = path.join('src/main/java/', this.basePackage.toLowerCase().split('.').join('/'));
      var testPath = path.join('src/test/java/', this.basePackage.toLowerCase().split('.').join('/'), 'test/');

      this.directory('project/src', 'src');
      this.directory('project/karma', 'karma');
      this.directory('java/main', mainPath);
      this.directory('java/test', testPath);
    },
    projectfiles: function () {
      this.src.copy('config/_bootstrap.sh', 'vagrant/bootstrap.sh');
      this.src.copy('config/_bower.json', 'bower.json');
      this.src.copy('config/_bowerrc', '.bowerrc');
      this.src.copy('config/_gitignore', '.gitignore');
      this.src.copy('config/_Gruntfile.js', 'Gruntfile.js');
      this.src.copy('config/_jshintrc', '.jshintrc');
      this.src.copy('config/_karma.ci.conf.js', 'karma.ci.conf.js');
      this.src.copy('config/_karma.conf.js', 'karma.conf.js');
      this.src.copy('config/_package.json', 'package.json');
      this.src.copy('config/_README.md', 'README.md');
      this.src.copy('config/_Vagrantfile', 'Vagrantfile');
      this.src.copy('config/_build.gradle', 'build.gradle');
      this.src.copy('config/_settings.gradle', 'settings.gradle');
      this.src.copy('config/_circle.yml', 'circle.yml');
    }
  },
  end: function () {
    this.installDependencies({ skipInstall: this.options['skip-install'] });
  }
});

module.exports = SpringGenerator;
