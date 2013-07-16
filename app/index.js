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
	var mainPath = 'src/main/java/' + this.basePackage.toLowerCase().split('.').join('/') + '/';
	var testPath = 'src/test/java/' + this.basePackage.toLowerCase().split('.').join('/') + '/';
	this.mkdir(mainPath);
	this.mkdir(testPath);

	var mvcPackages = ['data', 'domain', 'service', 'web'];
	_.each(mvcPackages, function (item) {
		this.mkdir(mainPath + item);
		this.mkdir(testPath + item);
	}, this);

	mainPath = 'src/main/java/' + this.corePackage.toLowerCase().split('.').join('/') + '/';
	testPath = 'src/test/java/' + this.corePackage.toLowerCase().split('.').join('/') + '/';
	this.mkdir(mainPath);
	this.mkdir(testPath);

	var corePackages = ['data', 'domain', 'security', 'service', 'testing'];
	_.each(corePackages, function (item) {
		this.mkdir(mainPath + item);
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

SpringGenerator.prototype.javaFiles = function javaFiles() {
	var corePath = 'src/main/java/' + this.corePackage.toLowerCase().split('.').join('/');
	this.template('classes/core/data/ControlCodeEnumUserType.java', corePath + '/data/ControlCodeEnumUserType.java');
	this.template('classes/core/data/CustomJpaRepository.java', corePath + '/data/CustomJpaRepository.java');
	this.template('classes/core/data/CustomJpaRepositoryFactoryBean.java', corePath + '/data/CustomJpaRepositoryFactoryBean.java');
	this.template('classes/core/data/CustomJpaRepositoryImpl.java', corePath + '/data/CustomJpaRepositoryImpl.java');
	this.template('classes/core/data/CustomNamingStrategy.java', corePath + '/data/CustomNamingStrategy.java');
	this.template('classes/core/data/CustomSQLServer2008Dialect.java', corePath + '/data/CustomSQLServer2008Dialect.java');
	this.template('classes/core/data/IdpInfoEnumUserType.java', corePath + '/data/IdpInfoEnumUserType.java');
	this.template('classes/core/data/package-info.java', corePath + '/data/package-info.java');
	this.template('classes/core/data/PermissionDeniedException.java', corePath + '/data/PermissionDeniedException.java');
	this.template('classes/core/data/RecordNotFoundException.java', corePath + '/data/RecordNotFoundException.java');
	this.template('classes/core/data/PersonRepository.java', corePath + '/data/PersonRepository.java');

	this.template('classes/core/domain/AuditableEntity.java', corePath + '/domain/AuditableEntity.java');
	this.template('classes/core/domain/BaseEntity.java', corePath + '/domain/BaseEntity.java');
	this.template('classes/core/domain/BaseObject.java', corePath + '/domain/BaseObject.java');
	this.template('classes/core/domain/ControlCode.java', corePath + '/domain/ControlCode.java');
	this.template('classes/core/domain/ControlCodeConverterFactory.java', corePath + '/domain/ControlCodeConverterFactory.java');
	this.template('classes/core/domain/EnumWithDescription.java', corePath + '/domain/EnumWithDescription.java');
	this.template('classes/core/domain/StringToEnumConverter.java', corePath + '/domain/StringToEnumConverter.java');
	this.template('classes/core/domain/Person.java', corePath + '/domain/Person.java');

	this.template('classes/core/security/SpringSecurityAuditorAware.java', corePath + '/security/SpringSecurityAuditorAware.java');

	this.template('classes/core/service/BaseService.java', corePath + '/service/BaseService.java');
	this.template('classes/core/service/BaseServiceImpl.java', corePath + '/service/BaseServiceImpl.java');
	this.template('classes/core/service/PersonService.java', corePath + '/service/PersonService.java');
	this.template('classes/core/service/PersonServiceImpl.java', corePath + '/service/PersonServiceImpl.java');
	this.template('classes/core/service/UserDetailsService.java', corePath + '/service/UserDetailsService.java');

	this.template('classes/core/testing/MockAuditorAware.java', corePath + '/testing/MockAuditorAware.java');

	var mainPath = 'src/main/java/' + this.basePackage.toLowerCase().split('.').join('/');
	this.template('classes/web/HomeController.java', mainPath + '/web/HomeController.java');
	this.template('classes/web/helper/RestError.java', mainPath + '/web/helper/RestError.java');
	this.template('classes/web/helper/RestExceptionHandler.java', mainPath + '/web/helper/RestExceptionHandler.java');
};

SpringGenerator.prototype.other = function other() {
	this.copy('_package.json', 'package.json');
	this.copy('_bower.json', 'bower.json');
	this.copy('_bowerrc', '.bowerrc');
	this.copy('_gruntfile.js', 'Gruntfile.js');
	this.copy('_scenarios.js', 'src/main/webapp/karma/e2e/scenarios.js');
};
