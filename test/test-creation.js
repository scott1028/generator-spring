/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;

describe('spring generator', function () {
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
			done();
		}.bind(this));
	});

	it('creates expected dotfiles', function (done) {
		var expected = [
			// add files you expect to exist here.
			'.bowerrc'
		];

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

		this.app.run({}, function () {
			helpers.assertFiles(expected);
			done();
		});
	});
});
