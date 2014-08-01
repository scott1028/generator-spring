module.exports = function(config) {
  var customLaunchers = {
    'SL_Chrome': {
      base: 'SauceLabs',
      browserName: 'chrome'
    },
      'SL_Firefox': {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '30'
    },
    'SL_Safari': {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.9',
      version: '7'
    },
    'SL_IE_10': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 2012',
      version: '10'
    },
    'SL_IE_11': {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    }
  };

  config.set({
    basePath: 'src/main/resources/public/',

    frameworks: ['jasmine'],
    files: [
      'lib/angular.js',
      '../../../../bower_components/angular-mocks/angular-mocks.js',
      'lib/*.js',
      'scripts/**/*.js',
      '../../../../karma/**/*.js'
    ],
    exclude: [
      'lib/less.js'
    ],
    reporters: ['dots'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,

    sauceLabs: {
      testName: '<%= projectName %> Karma Tests'
    },
    captureTimeout: 120000,
    customLaunchers: customLaunchers,
    singleRun: true,
    browsers: Object.keys(customLaunchers)
  });
};
