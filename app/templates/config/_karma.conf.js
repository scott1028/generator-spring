module.exports = function(config) {
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
    autoWatch: true,
    browsers: ['Chrome'],
    captureTimeout: 20000,
    singleRun: false,
    reportSlowerThan: 500,

    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-safari-launcher',
      'karma-firefox-launcher'
    ]
  });
};
