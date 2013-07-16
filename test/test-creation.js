'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;

describe('Spring Generator', function () {
	beforeEach(function (done) {
		var deps = [
			'../../app',
			'../../controller',
			'../../main'
		];
		helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
			if (err) {
				return done(err);
			}

			this.app = helpers.createGenerator('spring:app', deps);
			this.app.options['skip-install'] = true;

			helpers.mockPrompt(this.app, {
				'projectName': 'Safety Inspection',
				'abbreviation': 'SIT',
				'basePackage': 'edu.ucdavis.its.safetyinspection',
				'corePackage': 'edu.ucdavis.its.core',
				'dbUrl': '192.168.56.111',
				'dbName': 'SIT',
				'dbUser': 'safetyinspection',
				'dbPassword': 'safetyinspection',
				'siteTitle': 'Safety Inspection Tool',
				'appname': 'safetyInspection'
			});
			done();
		}.bind(this));
	});

	it('should create expected dotfiles', function (done) {
		var expected = [
			'.bowerrc'
		];

		this.app.run({}, function () {
			helpers.assertFiles(expected);
			done();
		});
	});

	it('should create expected package files', function (done) {
		var expected = [
		// core
			['src/main/java/edu/ucdavis/its/core/data/ControlCodeEnumUserType.java', /package edu\.ucdavis\.its\.core\.data;/],
			['src/main/java/edu/ucdavis/its/core/data/CustomJpaRepository.java', /package edu\.ucdavis\.its\.core\.data;/],
			['src/main/java/edu/ucdavis/its/core/data/CustomJpaRepositoryFactoryBean.java', /package edu\.ucdavis\.its\.core\.data;/],
			['src/main/java/edu/ucdavis/its/core/data/CustomJpaRepositoryImpl.java', /package edu\.ucdavis\.its\.core\.data;/],
			['src/main/java/edu/ucdavis/its/core/data/CustomNamingStrategy.java', /package edu\.ucdavis\.its\.core\.data;/],
			['src/main/java/edu/ucdavis/its/core/data/CustomSQLServer2008Dialect.java', /package edu\.ucdavis\.its\.core\.data;/],
			['src/main/java/edu/ucdavis/its/core/data/IdpInfoEnumUserType.java', /package edu\.ucdavis\.its\.core\.data;/],
			['src/main/java/edu/ucdavis/its/core/data/package-info.java', /package edu\.ucdavis\.its\.core\.data;/],
			['src/main/java/edu/ucdavis/its/core/data/PermissionDeniedException.java', /package edu\.ucdavis\.its\.core\.data;/],
			['src/main/java/edu/ucdavis/its/core/data/PersonRepository.java', /package edu\.ucdavis\.its\.core\.data;/],
			['src/main/java/edu/ucdavis/its/core/data/RecordNotFoundException.java', /package edu\.ucdavis\.its\.core\.data;/],
			['src/main/java/edu/ucdavis/its/core/domain/AuditableEntity.java', /package edu\.ucdavis\.its\.core\.domain;/],
			['src/main/java/edu/ucdavis/its/core/domain/BaseEntity.java', /package edu\.ucdavis\.its\.core\.domain;/],
			['src/main/java/edu/ucdavis/its/core/domain/BaseObject.java', /package edu\.ucdavis\.its\.core\.domain;/],
			['src/main/java/edu/ucdavis/its/core/domain/ControlCode.java', /package edu\.ucdavis\.its\.core\.domain;/],
			['src/main/java/edu/ucdavis/its/core/domain/ControlCodeConverterFactory.java', /package edu\.ucdavis\.its\.core\.domain;/],
			['src/main/java/edu/ucdavis/its/core/domain/EnumWithDescription.java', /package edu\.ucdavis\.its\.core\.domain;/],
			['src/main/java/edu/ucdavis/its/core/domain/Person.java', /package edu\.ucdavis\.its\.core\.domain;/],
			['src/main/java/edu/ucdavis/its/core/domain/StringToEnumConverter.java', /package edu\.ucdavis\.its\.core\.domain;/],
			['src/main/java/edu/ucdavis/its/core/security/SpringSecurityAuditorAware.java', /package edu\.ucdavis\.its\.core\.security;/],
			['src/main/java/edu/ucdavis/its/core/service/BaseService.java', /package edu\.ucdavis\.its\.core\.service;/],
			['src/main/java/edu/ucdavis/its/core/service/BaseServiceImpl.java', /package edu\.ucdavis\.its\.core\.service;/],
			['src/main/java/edu/ucdavis/its/core/service/PersonService.java', /package edu\.ucdavis\.its\.core\.service;/],
			['src/main/java/edu/ucdavis/its/core/service/PersonServiceImpl.java', /package edu\.ucdavis\.its\.core\.service;/],
			['src/main/java/edu/ucdavis/its/core/service/UserDetailsService.java', /package edu\.ucdavis\.its\.core\.service;/],
			['src/main/java/edu/ucdavis/its/core/testing/MockAuditorAware.java', /package edu\.ucdavis\.its\.core\.testing;/],
		// base
			['src/main/java/edu/ucdavis/its/safetyinspection/web/HomeController.java', /package edu\.ucdavis\.its\.safetyinspection\.web;/],
			['src/main/java/edu/ucdavis/its/safetyinspection/web/helper/RestError.java', /package edu\.ucdavis\.its\.safetyinspection\.web.helper;/],
			['src/main/java/edu/ucdavis/its/safetyinspection/web/helper/RestExceptionHandler.java', /package edu\.ucdavis\.its\.safetyinspection\.web.helper;/]
		];

		this.app.run({}, function () {
			helpers.assertFiles(expected);
			done();
		});
	});

	it('should create spring config files', function (done) {
		var expected = [
			'src/main/resources/ehsCache.xml',
			'src/main/resources/log4j.properties',
			'src/main/resources/safetyinspection.dev.properties',
			'src/main/resources/safetyinspection.stage.properties',
			'src/main/resources/safetyinspection.prod.properties',
			'src/main/resources/META-INF/orm.xml',
			'src/main/resources/META-INF/persistence.xml',
			'src/main/resources/spring/app-data.xml',
			'src/main/resources/spring/app-security.xml',
			'src/main/resources/spring/app-service.xml',
			'src/main/resources/spring/app-web.xml',
			'src/main/webapp/WEB-INF/web.xml',
			'pom.xml'
		];

		this.app.run({}, function () {
			helpers.assertFiles(expected);
			done();
		});
	});

	it('should create junit test files', function (done) {
		var expected = [
			'src/test/resources/log4j.properties',
			'src/test/resources/data/data.sql',
			'src/test/resources/data/schema.sql',
			'src/test/resources/spring/test-app-data.xml',
			['src/test/java/edu/ucdavis/its/core/data/BaseIntegrationTest.java', /package edu\.ucdavis\.its\.core\.data;/],
			['src/test/java/edu/ucdavis/its/core/data/PersonRepositoryTest.java',  /package edu\.ucdavis\.its\.core\.data;/]
		];

		this.app.run({}, function () {
			helpers.assertFiles(expected);
			done();
		});
	});

	it('should create node related files', function (done) {
		var expected = [
			['package.json', /"name": "safetyInspection"/],
			['bower.json', /"name": "safetyInspection"/],
			'Gruntfile.js',
			['src/main/webapp/karma/e2e/scenarios.js', /navigateTo\('\/sit\/'\)/]
		];

		this.app.run({}, function () {
			helpers.assertFiles(expected);
			done();
		});
	});

	describe('Controller', function () {
		it('should generate a new controller', function (done) {
			var deps = ['../../controller'];
			var controller = helpers.createGenerator('spring:controller', deps, ['foo']);
			var expected = [
				['src/main/webapp/resources/scripts/controllers/foo.js', /controller\('FooCtrl'/],
				['src/main/webapp/karma/spec/controllers/foo.js', /describe\('Controller: FooCtrl'/]
			];
			this.app.run({}, function () {
				controller.run({}, function () {
					helpers.assertFiles(expected);
					done();
				});
			});
		});
	});

	describe('Directive', function () {
		it('should generate a new directive', function (done) {
			var deps = ['../../directive'];
			var directive = helpers.createGenerator('spring:directive', deps, ['foo']);
			var expected = [
				['src/main/webapp/resources/scripts/directives/foo.js', /directive\('foo'/],
				['src/main/webapp/karma/spec/directives/foo.js', /describe\('Directive: foo'/]
			];
			this.app.run({}, function () {
				directive.run({}, function () {
					helpers.assertFiles(expected);
					done();
				});
			});
		});
	});

	describe('Factory', function () {
		it('should generate a new factory', function (done) {
			var deps = ['../../factory'];
			var factory = helpers.createGenerator('spring:factory', deps, ['foo']);
			var expected = [
				['src/main/webapp/resources/scripts/services/foo.js', /factory\('foo'/],
				['src/main/webapp/karma/spec/services/foo.js', /describe\('Service: foo'/]
			];
			this.app.run({}, function () {
				factory.run({}, function () {
					helpers.assertFiles(expected);
					done();
				});
			});
		});
	});

	describe('Main', function () {
		it('should generate app.js and main files', function (done) {
			var deps = ['../../main'];
			var main = helpers.createGenerator('spring:main', deps, ['main']);
			var expected = [
				['src/main/webapp/resources/scripts/app.js', /module\('safetyInspectionApp'/],
				'src/main/webapp/resources/views/main.html',
				'src/main/webapp/karma/karma.conf.js',
				'src/main/webapp/karma/karma-e2e.conf.js'
			];
			this.app.run({}, function () {
				main.run({}, function () {
					helpers.assertFiles(expected);
					done();
				});
			});
		});
	});

	describe('Service', function () {
		it('should generate a new service', function (done) {
			var deps = ['../../service'];
			var service = helpers.createGenerator('spring:service', deps, ['foo']);
			var expected = [
				['src/main/webapp/resources/scripts/services/foo.js', /service\('foo'/],
				['src/main/webapp/karma/spec/services/foo.js', /describe\('Service: foo'/]
			];
			this.app.run({}, function () {
				service.run({}, function () {
					helpers.assertFiles(expected);
					done();
				});
			});
		});
	});

	describe('View', function () {
		it('should generate a new view', function (done) {
			var deps = ['../../view'];
			var view = helpers.createGenerator('spring:view', deps, ['foo']);
			var expected = [
				'src/main/webapp/resources/views/foo.html'
			];
			this.app.run({}, function () {
				view.run({}, function () {
					helpers.assertFiles(expected);
					done();
				});
			});
		});
	});
});




