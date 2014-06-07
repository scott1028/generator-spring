module.exports = function(grunt) {
  'use strict';

  var rename = function (dest, src) { return dest + src.substring(0, src.indexOf('.min')) + '.js';};
  var renameVersion = function (dest, src) { return dest + src.substring(0, src.indexOf('-')) + '.js'; };
  var genBowerPath = function (path) { return bowerPath + path; };
  var basePath = 'src/main/resources/public/';
  var bowerPath = 'bower_components/';
  var libPath = basePath + 'lib/';
  var stylesPath = basePath + 'styles/bootstrap/';
  var fontsPath = basePath + 'styles/fonts/';

  grunt.initConfig({
    watch: {
      js: {
        files: [
          basePath + '**/*.js',
          basePath + '**/*.less',
          basePath + '**/*.html',
          'karma/**/*.js'
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
          {expand: true, cwd: genBowerPath('angular/'), src: ['angular.js'], dest: libPath},
          {expand: true, cwd: genBowerPath('angular-resource/'), src: ['angular-resource.js'], dest: libPath},
          {expand: true, cwd: genBowerPath('angular-route/'), src: ['angular-route.js'], dest: libPath},
          {expand: true, cwd: genBowerPath('angular-cookies/'), src: ['angular-cookies.js'], dest: libPath},

          {expand: true, cwd: genBowerPath('lodash/dist/'), src: ['lodash.js'], dest: libPath},
          {expand: true, cwd: genBowerPath('momentjs/'), src: ['moment.js'], dest: libPath},
          {expand: true, cwd: genBowerPath('less.js/dist/'), src: ['less-1.6.1.js'], dest: libPath, rename: renameVersion},
          {expand: true, cwd: genBowerPath('angular-ui-bootstrap-bower/'), src: ['ui-bootstrap-tpls.js'], dest: libPath},

          {expand: true, cwd: genBowerPath('bootstrap/less/'), src: ['*.less'], dest: stylesPath},
          {expand: true, cwd: genBowerPath('bootstrap/dist/fonts/'), src: ['glyphicons*'], dest: fontsPath}
        ]
      },
      release: {
        files: [
          {expand: true, cwd: genBowerPath('angular/'), src: ['angular.min.js'], dest: libPath, rename: rename},
          {expand: true, cwd: genBowerPath('angular-resource/'), src: ['angular-resource.min.js'], dest: libPath, rename: rename},
          {expand: true, cwd: genBowerPath('angular-route/'), src: ['angular-route.min.js'], dest: libPath, rename: rename},
          {expand: true, cwd: genBowerPath('angular-cookies/'), src: ['angular-cookies.min.js'], dest: libPath, rename: rename},

          {expand: true, cwd: genBowerPath('lodash/dist/'), src: ['lodash.min.js'], dest: libPath, rename: rename},
          {expand: true, cwd: genBowerPath('momentjs/min/'), src: ['moment.min.js'], dest: libPath, rename: rename},
          {expand: true, cwd: genBowerPath('less.js/dist/'), src: ['less-1.6.1.min.js'], dest: libPath, rename: renameVersion},
          {expand: true, cwd: genBowerPath('angular-ui-bootstrap-bower/'), src: ['ui-bootstrap-tpls.min.js'], dest: libPath, rename: rename},

          {expand: true, cwd: genBowerPath('bootstrap/less/'), src: ['*.less'], dest: stylesPath},
          {expand: true, cwd: genBowerPath('bootstrap/dist/fonts/'), src: ['glyphicons*'], dest: fontsPath}
        ]
      }
    },
    shell: {
      bower: {
        command: './node_modules/bower/bin/bower install',
        options: {
          stdout: true
        }
      },
      revert: {
        command: 'git checkout -- src/main/resources/public/index.html'
      }
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        basePath + 'scripts/{,*/}*.js',
        'karma/{,*/}*.js'
      ]
    },
    less: {
      dist: {
        files: {
          "src/main/resources/public/styles/build.css": basePath + "styles/master.less"
        }
      }
    },
    useminPrepare: {
      html: basePath + 'index.html',
      options: {
        dest: basePath,
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs']
            },
            post: {}
          }
        }
      }
    },
    usemin: {
      html: basePath + 'index.html'
    },
    clean: {
      release: ['.tmp'],
      revert: [basePath + 'styles/build.css', basePath + 'scripts/build.js']
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['package']);
  grunt.registerTask('package', ['shell:bower', 'copy:dev']);
  grunt.registerTask('release', ['less', 'useminPrepare', 'concat', 'uglify', 'usemin', 'clean:release']);
  grunt.registerTask('revert', ['shell:revert', 'clean:revert']);

  grunt.registerTask('test', ['jshint', 'karma:continuous']);
  grunt.registerTask('test:unit', ['clear', 'jshint:all', 'karma:unit', 'watch:js']);
};
