module.exports = function(grunt) {
  'use strict';

  var rename = function (dest, src) { return dest + src.substring(0, src.indexOf('.min')) + '.js';};
  var renameVersion = function (dest, src) { return dest + src.substring(0, src.indexOf('-')) + '.js'; };
  var basePath = 'src/main/webapp/';

  grunt.initConfig({
    watch: {
      js: {
        files: [
          basePath + 'resources/**/*.js',
          basePath + 'resources/**/*.less',
          basePath + 'resources/**/*.html',
          basePath + 'karma/**/*.js'
        ],
        tasks: ['clear', 'jshint:all', 'karma:unit:run'],
        options: {
          livereload: true
        }
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        background: true
      },
      continuous: {
        configFile: 'karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },
    copy: {
      dev: {
        files: [
          {expand: true, cwd: 'bower_components/angular/', src: ['angular.js'], dest: basePath + 'resources/lib/'},
          {expand: true, cwd: 'bower_components/angular-resource/', src: ['angular-resource.js'], dest: basePath + 'resources/lib/'},
          {expand: true, cwd: 'bower_components/angular-route/', src: ['angular-route.js'], dest: basePath + 'resources/lib/'},
          {expand: true, cwd: 'bower_components/angular-cookies/', src: ['angular-cookies.js'], dest: basePath + 'resources/lib/'},

          {expand: true, cwd: 'bower_components/lodash/dist/', src: ['lodash.js'], dest: basePath + 'resources/lib/'},
          {expand: true, cwd: 'bower_components/momentjs/', src: ['moment.js'], dest: basePath + 'resources/lib/'},
          {expand: true, cwd: 'bower_components/less.js/dist/', src: ['less-1.6.1.js'], dest: basePath + 'resources/lib/', rename: renameVersion},
          {expand: true, cwd: 'bower_components/angular-ui-bootstrap-bower/', src: ['ui-bootstrap.js'], dest: basePath + 'resources/lib/'},

          {expand: true, cwd: 'bower_components/bootstrap/less/', src: ['*.less'], dest: basePath + 'resources/styles/bootstrap/'},
          {expand: true, cwd: 'bower_components/bootstrap/dist/fonts/', src: ['glyphicons*'], dest: basePath + 'resources/styles/fonts/'}
        ]
      },
      release: {
        files: [
          {expand: true, cwd: 'bower_components/angular/', src: ['angular.min.js'], dest: basePath + 'resources/lib/', rename: rename},
          {expand: true, cwd: 'bower_components/angular-resource/', src: ['angular-resource.min.js'], dest: basePath + 'resources/lib/', rename: rename},
          {expand: true, cwd: 'bower_components/angular-route/', src: ['angular-route.min.js'], dest: basePath + 'resources/lib/', rename: rename},
          {expand: true, cwd: 'bower_components/angular-cookies/', src: ['angular-cookies.min.js'], dest: basePath + 'resources/lib/', rename: rename},

          {expand: true, cwd: 'bower_components/lodash/dist/', src: ['lodash.min.js'], dest: basePath + 'resources/lib/', rename: rename},
          {expand: true, cwd: 'bower_components/momentjs/min/', src: ['moment.min.js'], dest: basePath + 'resources/lib/', rename: rename},
          {expand: true, cwd: 'bower_components/less.js/dist/', src: ['less-1.6.1.min.js'], dest: basePath + 'resources/lib/', rename: renameVersion},
          {expand: true, cwd: 'bower_components/angular-ui-bootstrap-bower/', src: ['ui-bootstrap.min.js'], dest: basePath + 'resources/lib/', rename: rename},

          {expand: true, cwd: 'bower_components/bootstrap/less/', src: ['*.less'], dest: basePath + 'resources/styles/bootstrap/'},
          {expand: true, cwd: 'bower_components/bootstrap/dist/fonts/', src: ['glyphicons*'], dest: basePath + 'resources/styles/fonts/'}
        ]
      }
    },
    shell: {
      bower: {
        command: 'bower install',
        options: {
          stdout: true
        }
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        basePath + 'resources/scripts/{,*/}*.js',
        basePath + 'karma/{,*/}*.js'
      ]
    },
    less: {
      dist: {
        files: {
          "src/main/webapp/resources/styles/build.css": basePath + "resources/styles/master.less"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-clear');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('default', ['package']);
  grunt.registerTask('package', ['shell:bower', 'copy:dev']);

  grunt.registerTask('test', ['jshint', 'karma:continuous']);
  grunt.registerTask('test:unit', ['clear', 'jshint:all', 'karma:unit', 'watch:js']);
};
