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

SpringGenerator.prototype.frontEnd = function frontEnd() {
	var cb = this.async();
	var prompts = [{
		name: 'appname',
		message: 'Angular app name?',
		default: 'safetyInspection'
	}];

	this.prompt(prompts, function (props) {
		this.appname = props.appname;
		cb();
	}.bind(this));
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
	var path = 'src/main/resources/';

	this.extras = {
		name: name,
		schema: this.projectName.split(' ').join(''),
		type: 'dev',
		typeLong: 'Development',
		updateType: 'UPDATE'
	};
	this.copy('spring/temp.properties', path + name + '.dev.properties');
	this.extras = {
		name: name,
		schema: this.projectName.split(' ').join(''),
		type: 'stage',
		typeLong: 'Stage',
		updateType: ''
	};
	this.copy('spring/temp.properties', path + name + '.stage.properties');
	this.extras = {
		name: name,
		schema: this.projectName.split(' ').join('')
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
	this.template('spring/_web.xml', 'src/main/webapp/WEB-INF/web.xml');

	this.template('_index.jsp', 'src/main/webapp/WEB-INF/views/index.jsp');
	this.template('style/_bootstrap-override.css', 'src/main/webapp/resources/styles/bootstrap-override.css');
	this.template('style/_project.css', 'src/main/webapp/resources/styles/project.css');
	this.template('spring/_pom.xml', 'pom.xml');
};

SpringGenerator.prototype.testFiles = function testFiles() {
	var coreTestPath = path.join('src/test/java/', this.corePackage.toLowerCase().split('.').join('/'));
	this.extras = {
		name: this.projectName.toLowerCase().split(' ').join(''),
		schema: this.projectName.split(' ').join('')
	};
	this.template('test/_test-app-data.xml', 'src/test/resources/spring/test-app-data.xml');
	this.template('test/BaseIntegrationTest.java', coreTestPath + '/data/BaseIntegrationTest.java');
	this.template('test/PersonRepositoryTest.java', coreTestPath + '/data/PersonRepositoryTest.java');

	this.copy('test/_schema.sql', 'src/test/resources/data/schema.sql');
	this.copy('test/_data.sql', 'src/test/resources/data/data.sql');
	this.copy('test/log4j.properties', 'src/test/resources/log4j.properties');
};

SpringGenerator.prototype.javaFiles = function javaFiles() {
	var corePath = path.join('src/main/java/', this.corePackage.toLowerCase().split('.').join('/'));
	var mainPath = path.join('src/main/java/', this.basePackage.toLowerCase().split('.').join('/'));

	this.directory('classes/core', corePath, true);
	this.directory('classes/main', mainPath, true);
};

SpringGenerator.prototype.other = function other() {
	this.copy('_package.json', 'package.json');
	this.copy('_bower.json', 'bower.json');
	this.copy('_bowerrc', '.bowerrc');
	this.copy('_gruntfile.js', 'Gruntfile.js');
	this.copy('_scenarios.js', 'src/main/webapp/karma/e2e/scenarios.js');
};
