module.exports = function(config) {
  config.set({
    basePath: 'src/main/webapp',

    frameworks: ['jasmine'],

    files: [
      'resources/lib/angular.js',
      '../../../bower_components/angular-mocks/angular-mocks.js',
      'resources/lib/*.js',
      'resources/scripts/**/*.js',
      'karma/**/*.js'
    ],

    exclude: [
      'resources/lib/less.js'
    ],

    reporters: ['progress', 'junit'],

    junitReporter: {
      outputFile: '../../../test-results.xml'
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeCanary'],
    captureTimeout: 20000,
    singleRun: false,
    reportSlowerThan: 500,

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-phantomjs-launcher',
      'karma-junit-reporter'
    ]
  });
};