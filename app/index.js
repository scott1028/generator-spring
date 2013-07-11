'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('underscore');

var SpringGenerator = module.exports = function SpringGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	this.on('end', function () {
		this.installDependencies({ skipInstall: options['skip-install'] });
	});

	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(SpringGenerator, yeoman.generators.Base);

SpringGenerator.prototype.askFor = function askFor() {
	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);

	var prompts = [{
		name: 'projectName',
		message: 'What is the project name?'
	}, {
		name: 'basePackage',
		message: 'What is the base project package name (com.example.projectname)?'
	}, {
		type: 'confirm',
		name: 'coreTest',
		message: 'What you like to make a core package (com.example.core)?',
		default: true
	}];

	this.prompt(prompts, function (props) {
		this.projectName = props.projectName;
		this.basePackage = props.basePackage;
		this.coreTest = props.coreTest;
		cb();
	}.bind(this));
};

SpringGenerator.prototype.corePackage = function corePackage() {
	if (!this.coreTest) {
		return;
	}
	var cb = this.async();
	var prompts = [{
		name: 'corePackage',
		message: 'What is the core package name (com.example.core)?'
	}];

	this.prompt(prompts, function (props) {
		this.corePackage = props.corePackage;
		cb();
	}.bind(this));
};

SpringGenerator.prototype.structure = function structure() {
	this.mkdir('src');
	this.mkdir('src/main');
	this.mkdir('src/main/java');
	this.mkdir('src/main/resources');
	this.mkdir('src/main/resources/META-INF');
	this.mkdir('src/main/resources/sping');
	this.mkdir('src/main/webapp');
	this.mkdir('src/main/webapp/WEB-INF');
	this.mkdir('src/main/webapp/resources');

	this.mkdir('src/test');
	this.mkdir('src/test/java');
	this.mkdir('src/test/resources');
	this.mkdir('src/test/resources/data');
	this.mkdir('src/test/resources/spring');
};

SpringGenerator.prototype.appPackages = function appPackages() {
	var basePackageSplit = this.basePackage.split('.');
	var mainPath = 'src/main/java/';
	var testPath = 'src/test/java/';
	_.each(basePackageSplit, function (item) {
		this.mkdir(mainPath + item);
		this.mkdir(testPath + item);
		mainPath += item + '/';
		testPath += item + '/';
	}, this);

	var mvcPackages = ['data', 'domain', 'service', 'web'];
	_.each(mvcPackages, function (item) {
		this.mkdir(mainPath + item);
		this.mkdir(testPath + item);
	}, this);

	if (this.coreTest) {
		var corePackageSplit = this.corePackage.split('.');
		mainPath = 'src/main/java/';
		testPath = 'src/test/java/';
		_.each(corePackageSplit, function (item) {
			this.mkdir(mainPath + item);
			this.mkdir(testPath + item);
			mainPath += item + '/';
			testPath += item + '/';
		}, this);

		var corePackages = ['data', 'domain', 'security', 'service', 'testing'];
		_.each(corePackages, function (item) {
			this.mkdir(mainPath + item);
		}, this);
	}
};

SpringGenerator.prototype.app = function app() {
	var name = this.projectName.toLowerCase().replace(' ', '');

	// name.dev.properties
	// name.prod.properties
	// name.stage.properties
	// log4j.properties
	console.log(name);
};

SpringGenerator.prototype.other = function other() {
	this.copy('_package.json', 'package.json');
	this.copy('_bower.json', 'bower.json');
};

// SpringGenerator.prototype.app = function app() {
// 	this.mkdir('app');
// 	this.mkdir('app/templates');

// 	this.copy('_package.json', 'package.json');
// 	this.copy('_bower.json', 'bower.json');
// };

// SpringGenerator.prototype.projectfiles = function projectfiles() {
// 	this.copy('editorconfig', '.editorconfig');
// 	this.copy('jshintrc', '.jshintrc');
// };
