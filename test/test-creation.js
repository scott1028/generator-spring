'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;
var assert  = require('yeoman-generator').assert;

describe('Spring Generator Test Creation', function () {
  describe('App', function () {
    beforeEach(function (done) {
      helpers.run(path.join( __dirname, '../app'))
        .withOptions({ 'skip-install': true })
        .withPrompts({
          'projectName': 'Demo App',
          'basePackage': 'ch.example.demo'
        })
        .on('end', done);
    });

    it('should create expected config files', function () {
      var expected = [
        'vagrant/bootstrap.sh',
        'bower.json',
        '.bowerrc',
        '.gitignore',
        'Gruntfile.js',
        '.jshintrc',
        'karma.conf.js',
        'package.json',
        'README.md',
        'Vagrantfile',
        'build.gradle',
        'settings.gradle',
        'circle.yml'
      ];

      assert.file(expected);
    });

    it('should create expected java package files', function () {
      var expected = [
        ['src/main/java/ch/example/demo/config/DataBaseConfig.java', /package ch\.example\.demo\.config;/],
        ['src/main/java/ch/example/demo/config/SecurityConfig.java', /package ch\.example\.demo\.config;/],
        ['src/main/java/ch/example/demo/config/Application.java', /package ch\.example\.demo\.config;/],

        ['src/main/java/ch/example/demo/controller/AccountController.java', /package ch\.example\.demo\.controller;/],

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

      assert.fileContent(expected);
    });

    it('should create junit test java files', function () {
      var expected = [
        ['src/test/java/ch/example/demo/test/config/MockAuditorAware.java', /package ch\.example\.demo\.test\.config;/],
        ['src/test/java/ch/example/demo/test/config/TestConfig.java', /package ch\.example\.demo\.test\.config;/],
        ['src/test/java/ch/example/demo/test/repository/BaseIntegrationTest.java', /package ch\.example\.demo\.test\.repository;/]
      ];

      assert.fileContent(expected);
    });

    it('should create project related files', function () {
      var expected = [
        'src/main/resources/application-local.properties',
        'src/main/resources/base-data.sql',
        'src/main/resources/favicon.ico',
        'karma/controllers/login/login_spec.js',
        'karma/controllers/main/main_spec.js',
        'karma/controllers/register/register_spec.js',
        'karma/services/account_spec.js',
        'karma/services/auth_spec.js',
        'src/main/resources/public/scripts/controllers/login/login.html',
        'src/main/resources/public/scripts/controllers/login/login.js',
        'src/main/resources/public/scripts/controllers/main/main.html',
        'src/main/resources/public/scripts/controllers/main/main.js',
        'src/main/resources/public/scripts/controllers/navbar/navbar.js',
        'src/main/resources/public/scripts/controllers/register/register.html',
        'src/main/resources/public/scripts/controllers/register/register.js',
        'src/main/resources/public/scripts/services/account.js',
        'src/main/resources/public/scripts/services/auth.js',
        'src/main/resources/public/scripts/services/interceptor.js',
        'src/main/resources/public/scripts/app.js',
        'src/main/resources/public/styles/master.less',
        'src/main/resources/public/styles/mixins.less',
        'src/main/resources/public/styles/project.less',
        'src/main/resources/public/styles/variables.less',
        'src/main/resources/public/index.html',
        'src/test/resources/application-test.properties',
        'src/test/resources/data.sql',
        'src/test/resources/logback.xml'
      ];

      assert.file(expected);
    });
  });

  describe('Controller', function () {
    it('should generate a new controller', function () {
      helpers.run(path.join( __dirname, '../controller'))
        .withArguments(['foo'])
        .on('end', function () {
          var expected = [
            ['src/main/resources/public/scripts/controllers/foo/foo.js', /controller\('FooCtrl'/],
            ['src/main/resources/public/scripts/controllers/foo/foo.html', / /],
            ['karma/spec/controllers/foo/foo.js', /describe\('Controller: FooCtrl'/],
            ['src/main/resources/public/index.html', /script src\="resources\/scripts\/controllers\/foo\/foo.js"/]
          ];
          assert.fileContent(expected);
        });
    });

    it('should generate a new controller with correct structure', function () {
      helpers.run(path.join( __dirname, '../controller'))
        .withArguments(['foo/bar'])
        .on('end', function () {
          var expected = [
            ['src/main/resources/public/scripts/controllers/foo/bar/bar.js', /controller\('FooBarCtrl'/],
            ['src/main/resources/public/scripts/controllers/foo/bar/bar.html', / /],
            ['karma/spec/controllers/foo/bar/bar.js', /describe\('Controller: FooBarCtrl'/],
            ['src/main/resources/public/index.html', /script src\="resources\/scripts\/controllers\/foo\/bar\/bar.js"/]
          ];
          assert.fileContent(expected);
        });
    });

    it('should generate a new controller without leading and trailing slashes', function () {
      helpers.run(path.join( __dirname, '../controller'))
        .withArguments(['/foo/bar/'])
        .on('end', function () {
          var expected = [
            ['src/main/resources/public/scripts/controllers/foo/bar/bar.js', /controller\('FooBarCtrl'/],
            ['src/main/resources/public/scripts/controllers/foo/bar/bar.html', / /],
            ['karma/spec/controllers/foo/bar/bar.js', /describe\('Controller: FooBarCtrl'/],
            ['src/main/resources/public/index.html', /script src\="resources\/scripts\/controllers\/foo\/bar\/bar.js"/]
          ];
          assert.fileContent(expected);
        });
    });
  });

  describe('Directive', function () {
    it('should generate a new directive', function () {
      helpers.run(path.join( __dirname, '../directive'))
        .withArguments(['foo'])
        .on('end', function () {
          var expected = [
            ['src/main/resources/public/scripts/directives/foo.js', /directive\('foo'/],
            ['karma/spec/directives/foo.js', /describe\('Directive: foo'/],
            ['src/main/resources/public/index.html', /script src\="resources\/scripts\/directives\/foo.js"/]
          ];
          assert.fileContent(expected);
        });
    });
  });

  describe('Filter', function () {
    it('should generate a new filter', function () {
      helpers.run(path.join( __dirname, '../filter'))
        .withArguments(['foo'])
        .on('end', function () {
          var expected = [
            ['src/main/resources/public/scripts/filters/foo.js', /filter\('foo'/],
            ['karma/spec/filters/foo.js', /describe\('Filter: foo'/],
            ['src/main/resources/public/index.html', /script src\="resources\/scripts\/filters\/foo.js"/]
          ];
          assert.fileContent(expected);
        });
    });
  });

  describe('Service', function () {
    it('should generate a new service', function () {
      helpers.run(path.join( __dirname, '../service'))
        .withArguments(['foo'])
        .on('end', function () {
          var expected = [
            ['src/main/resources/public/scripts/services/foo.js', /factory\('FooService'/],
            ['karma/spec/services/foo.js', /describe\('Service: FooService'/],
            ['src/main/resources/public/index.html', /script src\="resources\/scripts\/services\/foo.js"/]
          ];
          assert.fileContent(expected);
        });
    });
  });
});
