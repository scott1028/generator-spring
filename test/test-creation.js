'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;

describe('Spring Generator', function () {
  beforeEach(function (done) {
    var deps = [
      '../../app'
    ];
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('spring:app', deps);
      this.app.options['skip-install'] = true;

      helpers.mockPrompt(this.app, {
        'projectName': 'Demo App',
        'basePackage': 'ch.example.demo'
      });
      done();
    }.bind(this));
  });

  it('should create expected config files', function (done) {
    var expected = [
      'vagrant/bootstrap.sh',
      'bower.json',
      '.bowerrc',
      '.gitignore',
      'Gruntfile.js',
      '.jshintrc',
      'karma.conf.js',
      'package.json',
      'pom.xml',
      'README.md',
      'Vagrantfile'
    ];

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });

  it('should create expected java package files', function (done) {
    var expected = [
      ['src/main/java/ch/example/demo/config/DataBaseConfig.java', /package ch\.example\.demo\.config;/],
      ['src/main/java/ch/example/demo/config/Initializer.java', /package ch\.example\.demo\.config;/],
      ['src/main/java/ch/example/demo/config/RootConfig.java', /package ch\.example\.demo\.config;/],
      ['src/main/java/ch/example/demo/config/SecurityConfig.java', /package ch\.example\.demo\.config;/],
      ['src/main/java/ch/example/demo/config/SecurityInitializer.java', /package ch\.example\.demo\.config;/],
      ['src/main/java/ch/example/demo/config/WebAppConfig.java', /package ch\.example\.demo\.config;/],

      ['src/main/java/ch/example/demo/controller/AccountController.java', /package ch\.example\.demo\.controller;/],
      ['src/main/java/ch/example/demo/controller/HomeController.java', /package ch\.example\.demo\.controller;/],

      ['src/main/java/ch/example/demo/model/AbstractEntity.java', /package ch\.example\.demo\.model;/],
      ['src/main/java/ch/example/demo/model/Account.java', /package ch\.example\.demo\.model;/],

      ['src/main/java/ch/example/demo/repository/AccountRepository.java', /package ch\.example\.demo\.repository;/],

      ['src/main/java/ch/example/demo/security/AjaxAuthenticationFailureHandler.java', /package ch\.example\.demo\.security;/],
      ['src/main/java/ch/example/demo/security/AjaxAuthenticationSuccessHandler.java', /package ch\.example\.demo\.security;/],
      ['src/main/java/ch/example/demo/security/AjaxLogoutSuccessHandler.java', /package ch\.example\.demo\.security;/],
      ['src/main/java/ch/example/demo/security/Http401UnauthorizedEntryPoint.java', /package ch\.example\.demo\.security;/],
      ['src/main/java/ch/example/demo/security/SpringSecurityAuditorAware.java', /package ch\.example\.demo\.security;/],
      ['src/main/java/ch/example/demo/security/UserDetailsCustom.java', /package ch\.example\.demo\.security;/],
      ['src/main/java/ch/example/demo/security/UserDetailsService.java', /package ch\.example\.demo\.security;/],

      ['src/main/java/ch/example/demo/service/AccountService.java', /package ch\.example\.demo\.service;/],
      ['src/main/java/ch/example/demo/service/AccountServiceImpl.java', /package ch\.example\.demo\.service;/],
      ['src/main/java/ch/example/demo/service/BaseService.java', /package ch\.example\.demo\.service;/],
      ['src/main/java/ch/example/demo/service/BaseServiceImpl.java', /package ch\.example\.demo\.service;/]
    ];

    this.app.run({}, function () {
      helpers.assertFileContent(expected);
      done();
    });
  });

  it('should create junit test java files', function (done) {
    var expected = [
      ['src/test/java/ch/example/demo/config/MockAuditorAware.java', /package ch\.example\.demo\.test\.config;/],
      ['src/test/java/ch/example/demo/config/TestConfig.java', /package ch\.example\.demo\.test\.config;/],
      ['src/test/java/ch/example/demo/repository/BaseIntegrationTest.java', /package ch\.example\.demo\.test\.repository;/]
    ];

    this.app.run({}, function () {
      helpers.assertFileContent(expected);
      done();
    });
  });

  it('should create project related files', function (done) {
    var expected = [
      'src/main/resources/app.local.properties',
      'src/main/resources/base-data.sql',
      'src/main/resources/log4j.properties',
      'src/main/webapp/karma/controllers/login/login_spec.js',
      'src/main/webapp/karma/controllers/main/main_spec.js',
      'src/main/webapp/karma/controllers/register/register_spec.js',
      'src/main/webapp/karma/services/account_spec.js',
      'src/main/webapp/karma/services/auth_spec.js',
      'src/main/webapp/resources/scripts/controllers/login/login.html',
      'src/main/webapp/resources/scripts/controllers/login/login.js',
      'src/main/webapp/resources/scripts/controllers/main/main.html',
      'src/main/webapp/resources/scripts/controllers/main/main.js',
      'src/main/webapp/resources/scripts/controllers/navbar/navbar.js',
      'src/main/webapp/resources/scripts/controllers/register/register.html',
      'src/main/webapp/resources/scripts/controllers/register/register.js',
      'src/main/webapp/resources/scripts/services/account.js',
      'src/main/webapp/resources/scripts/services/auth.js',
      'src/main/webapp/resources/scripts/services/interceptor.js',
      'src/main/webapp/resources/scripts/app.js',
      'src/main/webapp/resources/styles/master.less',
      'src/main/webapp/resources/styles/mixins.less',
      'src/main/webapp/resources/styles/project.less',
      'src/main/webapp/resources/styles/variables.less',
      'src/main/webapp/WEB-INF/pages/index.jsp',
      'src/test/resources/application-test.properties',
      'src/test/resources/data.sql',
      'src/test/resources/log4j.properties'
    ];

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });

  describe('Controller', function () {
    it('should generate a new controller', function (done) {
      var deps = ['../../controller'];
      var controller = helpers.createGenerator('spring:controller', deps, ['foo']);
      var expected = [
        ['src/main/webapp/resources/scripts/controllers/foo/foo.js', /controller\('FooCtrl'/],
        ['src/main/webapp/resources/scripts/controllers/foo/foo.html', / /],
        ['src/main/webapp/karma/spec/controllers/foo/foo.js', /describe\('Controller: FooCtrl'/],
        ['src/main/webapp/WEB-INF/pages/index.jsp', /script src\="resources\/scripts\/controllers\/foo\/foo.js"/]
      ];
      this.app.run({}, function () {
        controller.run({}, function () {
          helpers.assertFileContent(expected);
          done();
        });
      });
    });

    it('should generate a new controller with correct structure', function (done) {
      var deps = ['../../controller'];
      var controller = helpers.createGenerator('spring:controller', deps, ['foo/bar']);
      var expected = [
        ['src/main/webapp/resources/scripts/controllers/foo/bar/bar.js', /controller\('FooBarCtrl'/],
        ['src/main/webapp/resources/scripts/controllers/foo/bar/bar.html', / /],
        ['src/main/webapp/karma/spec/controllers/foo/bar/bar.js', /describe\('Controller: FooBarCtrl'/],
        ['src/main/webapp/WEB-INF/pages/index.jsp', /script src\="resources\/scripts\/controllers\/foo\/bar\/bar.js"/]
      ];
      this.app.run({}, function () {
        controller.run({}, function () {
          helpers.assertFileContent(expected);
          done();
        });
      });
    });

    it('should generate a new controller without leading and trailing slashes', function (done) {
      var deps = ['../../controller'];
      var controller = helpers.createGenerator('spring:controller', deps, ['/foo/bar/']);
      var expected = [
        ['src/main/webapp/resources/scripts/controllers/foo/bar/bar.js', /controller\('FooBarCtrl'/],
        ['src/main/webapp/resources/scripts/controllers/foo/bar/bar.html', / /],
        ['src/main/webapp/karma/spec/controllers/foo/bar/bar.js', /describe\('Controller: FooBarCtrl'/],
        ['src/main/webapp/WEB-INF/pages/index.jsp', /script src\="resources\/scripts\/controllers\/foo\/bar\/bar.js"/]
      ];
      this.app.run({}, function () {
        controller.run({}, function () {
          helpers.assertFileContent(expected);
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
        ['src/main/webapp/karma/spec/directives/foo.js', /describe\('Directive: foo'/],
        ['src/main/webapp/WEB-INF/pages/index.jsp', /script src\="resources\/scripts\/directives\/foo.js"/]
      ];
      this.app.run({}, function () {
        directive.run({}, function () {
          helpers.assertFileContent(expected);
          done();
        });
      });
    });
  });

  describe('Filter', function () {
    it('should generate a new filter', function (done) {
      var deps = ['../../filter'];
      var filter = helpers.createGenerator('spring:filter', deps, ['foo']);
      var expected = [
        ['src/main/webapp/resources/scripts/filters/foo.js', /filter\('foo'/],
        ['src/main/webapp/karma/spec/filters/foo.js', /describe\('Filter: foo'/],
        ['src/main/webapp/WEB-INF/pages/index.jsp', /script src\="resources\/scripts\/filters\/foo.js"/]
      ];
      this.app.run({}, function () {
        filter.run({}, function () {
          helpers.assertFileContent(expected);
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
        ['src/main/webapp/resources/scripts/services/foo.js', /factory\('FooService'/],
        ['src/main/webapp/karma/spec/services/foo.js', /describe\('Service: FooService'/],
        ['src/main/webapp/WEB-INF/pages/index.jsp', /script src\="resources\/scripts\/services\/foo.js"/]
      ];
      this.app.run({}, function () {
        service.run({}, function () {
          helpers.assertFileContent(expected);
          done();
        });
      });
    });
  });
});
