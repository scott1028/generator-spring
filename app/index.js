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
		name: 'corePackage',
		message: 'What is the core package name (com.example.core)?',
		default: 'edu.ucdavis.its.core'
	}];

	this.prompt(prompts, function (props) {
		this.projectName = props.projectName;
		this.abbreviation = props.abbreviation;
		this.basePackage = props.basePackage;
		this.corePackage = props.corePackage;
		cb();
	}.bind(this));
};

SpringGenerator.prototype.properties = function properties() {
	var cb = this.async();
	var prompts = [{
		name: 'dbUrl',
		message: 'Database: What is the database url?',
		default: '132.249.232.144'
	}, {
		name: 'dbName',
		message: 'Database: What is the base database name?',
		default: 'PS'
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
	}];

	this.prompt(prompts, function (props) {
		this.dbUrl = props.dbUrl;
		this.dbName = props.dbName;
		this.dbUser = props.dbUser;
		this.dbPassword = props.dbPassword;
		this.siteTitle = props.siteTitle;
		cb();
	}.bind(this));
};

SpringGenerator.prototype.structure = function structure() {
	this.mkdir('src');
	this.mkdir('src/main');
	this.mkdir('src/main/java');
	this.mkdir('src/main/resources');
	this.mkdir('src/main/resources/META-INF');
	this.mkdir('src/main/resources/spring');
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
	var basePackageSplit = this.basePackage.toLowerCase().split('.');
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

	var corePackageSplit = this.corePackage.toLowerCase().split('.');
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
};

SpringGenerator.prototype.app = function app() {
	var name = this.projectName.toLowerCase().replace(' ', '');
	var path = 'src/main/resources/';

	this.extras = {
		name: name,
		schema: this.projectName.replace(' ', ''),
		type: 'dev',
		typeLong: 'Development',
		updateType: 'UPDATE'
	};
	this.copy('spring/temp.properties', path + name + '.dev.properties');
	this.extras = {
		name: name,
		schema: this.projectName.replace(' ', ''),
		type: 'stage',
		typeLong: 'Stage',
		updateType: ''
	};
	this.copy('spring/temp.properties', path + name + '.stage.properties');
	this.extras = {
		name: name,
		schema: this.projectName.replace(' ', ''),
	};
	this.copy('spring/prod.properties', path + name + '.prod.properties');

	this.copy('spring/log4j.properties', path + 'log4j.properties');
	this.copy('spring/ehsCache.xml', path + 'ehsCache.xml');
	this.copy('spring/orm.xml', path + 'META-INF/orm.xml');
	this.copy('spring/persistence.xml', path + 'META-INF/persistence.xml');
	this.template('spring/_app-data.xml', path + 'spring/app-data.xml');
	this.template('spring/_app-security.xml', path + 'spring/app-security.xml');
	this.template('spring/_app-service.xml', path + 'spring/app-service.xml');
	this.template('spring/_app-web.xml', path + 'spring/app-web.xml');
};

SpringGenerator.prototype.other = function other() {
	this.copy('_package.json', 'package.json');
	this.copy('_bower.json', 'bower.json');
};
