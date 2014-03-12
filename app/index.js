'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var SpringGenerator = module.exports = function SpringGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(SpringGenerator, yeoman.generators.Base);

SpringGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  console.log(this.yeoman);

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
    cb();
  }.bind(this));
};

SpringGenerator.prototype.baseFiles = function baseFile() {
  var mainPath = path.join('src/main/java/', this.basePackage.toLowerCase().split('.').join('/'));
  var testPath = path.join('src/test/java/', this.basePackage.toLowerCase().split('.').join('/'));

  this.directory('project/src', 'src');
  this.directory('java/main', mainPath);
  this.directory('java/test', testPath);
};

SpringGenerator.prototype.other = function other() {
  this.copy('config/_bootstrap.sh', 'vagrant/bootstrap.sh');
  this.copy('config/_bower.json', 'bower.json');
  this.copy('config/_bowerrc', '.bowerrc');
  this.copy('config/_gitignore', '.gitignore');
  this.copy('config/_Gruntfile.js', 'Gruntfile.js');
  this.copy('config/_jshintrc', '.jshintrc');
  this.copy('config/_karma.conf.js', 'karma.conf.js');
  this.copy('config/_package.json', 'package.json');
  this.copy('config/_pom.xml', 'pom.xml');
  this.copy('config/_README.md', 'README.md');
  this.copy('config/_Vagrantfile', 'Vagrantfile');
};
