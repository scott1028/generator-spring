'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var _ = require('underscore');

var SpringGenerator = module.exports = function SpringGenerator(args, options, config) {
	yeoman.generators.Base.apply(this, arguments);

	args = ['main'];
	this.hookFor('spring:main', {args: args});
	this.hookFor('spring:controller', {args: args});

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
		message: 'What is the project name?',
		default: 'Safety Inspection'
	}, {
		name: 'abbreviation',
		message: 'What is the project abbreviation?',
		default: 'SIT'
	}, {
		name: 'basePackage',
		message: 'What is the base project package name (com.example.projectname)?',
		default: 'edu.ucdavis.its.safetyinspection'
	}, {
		name: 'dbUrl',
		message: 'Database: What is the database url?',
		default: '192.168.56.111'
	}, {
		name: 'dbName',
		message: 'Database: What is the base database name?',
		default: 'SIT'
	}, {
		name: 'dbUser',
		message: 'Database: What is the database username?',
		default: 'safetyinspection'
	}, {
		name: 'dbPassword',
		message: 'Database: What is the database password?',
		default: 'safetyinspection'
	}, {
		name: 'siteTitle',
		message: 'What is the project site title?',
		default: 'Safety Inspection Tool'
	}, {
		name: 'appname',
		message: 'Angular app name?',
		default: 'safetyInspection'
	}];

	this.prompt(prompts, function (props) {
		this.projectName = props.projectName;
		this.abbreviation = props.abbreviation;
		this.basePackage = props.basePackage;
		this.corePackage = 'edu.ucdavis.its.ps.core';

		this.dbUrl = props.dbUrl;
		this.dbName = props.dbName;
		this.dbUser = props.dbUser;
		this.dbPassword = props.dbPassword;
		this.siteTitle = props.siteTitle;

		this.appname = props.appname;
		cb();
	}.bind(this));
};

SpringGenerator.prototype.baseFiles = function baseFile() {
	this.extras = {
		name: this.projectName.toLowerCase().split(' ').join(''),
		schema: this.projectName.split(' ').join('')
	};
	this.directory('src', 'src', true);
};

SpringGenerator.prototype.appPackages = function appPackages() {
	var mainPath = path.join('src/main/java/', this.basePackage.toLowerCase().split('.').join('/'));
	var testPath = path.join('src/test/java/', this.basePackage.toLowerCase().split('.').join('/'));

	var mvcPackages = ['data', 'domain', 'service', 'web'];
	_.each(mvcPackages, function (item) {
		this.mkdir(path.join(mainPath, item));
		this.mkdir(path.join(testPath, item));
	}, this);
};

SpringGenerator.prototype.app = function app() {
	var name = this.projectName.toLowerCase().split(' ').join('');
	var basePath = 'src/main/resources/';

	this.extras = {
		name: name,
		schema: this.projectName.split(' ').join(''),
		type: 'dev',
		typeLong: 'Development',
		updateType: 'UPDATE'
	};
	this.copy('spring/temp.properties', path.join(basePath, name + '.dev.properties'));
	this.extras = {
		name: name,
		schema: this.projectName.split(' ').join(''),
		type: 'stage',
		typeLong: 'Stage',
		updateType: ''
	};
	this.copy('spring/temp.properties', path.join(basePath, name + '.stage.properties'));
	this.extras = {
		name: name,
		schema: this.projectName.split(' ').join('')
	};
	this.copy('spring/prod.properties', path.join(basePath, name + '.prod.properties'));
	this.template('spring/_pom.xml', 'pom.xml');
};

SpringGenerator.prototype.testFiles = function testFiles() {
	var mainTestPath = path.join('src/test/java/', this.basePackage.toLowerCase().split('.').join('/'));
	this.directory('classes/test/', path.join(mainTestPath));
};

SpringGenerator.prototype.javaFiles = function javaFiles() {
	var mainPath = path.join('src/main/java/', this.basePackage.toLowerCase().split('.').join('/'));
	this.directory('classes/main', mainPath, true);
};

SpringGenerator.prototype.other = function other() {
	this.copy('_package.json', 'package.json');
	this.copy('_bower.json', 'bower.json');
	this.copy('_bowerrc', '.bowerrc');
	this.copy('_gruntfile.js', 'Gruntfile.js');
};
