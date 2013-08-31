module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            js: {
                files: [
                    'src/main/webapp/resources/**/*.js',
                    'src/main/webapp/resources/**/*.less',
                    'src/main/webapp/resources/**/*.html',
                    'src/main/webapp/WEB-INF/views/*.jsp',
                    'src/main/webapp/karma/spec/**/*.js'
                ],
                tasks: ['clear', 'jshint:all', 'karma:unit:run'],
                options: {
                    livereload: true
                }
            },
            e2e: {
                files: [
                    'src/main/webapp/karma/e2e/**/*.js',
                    'src/main/webapp/resources/**/*.js'
                ],
                tasks: ['clear', 'jshint:e2e', 'karma:e2e:run']
            }
        },
        karma: {
            unit: {
                configFile: 'src/main/webapp/karma/karma.conf.js',
                background: true
            },
            e2e: {
                configFile: 'src/main/webapp/karma/karma-e2e.conf.js',
                background: true
            },
            release: {
                configFile: 'src/main/webapp/karma/karma.conf.js',
                singleRun: true,
                background: false
            }
        },
        copy: {
            dev: {
                files: [
                    {expand: true, cwd: 'bower_components/angular/', src: ['angular.js'], dest: 'src/main/webapp/resources/lib/'},
                    {expand: true, cwd: 'bower_components/angular-resource/', src: ['angular-resource.js'], dest: 'src/main/webapp/resources/lib/'},
                    {expand: true, cwd: 'bower_components/angular-route/', src: ['angular-route.js'], dest: 'src/main/webapp/resources/lib/'},

                    {expand: true, cwd: 'bower_components/lodash/', src: ['lodash.js'], dest: 'src/main/webapp/resources/lib/'},
                    {expand: true, cwd: 'bower_components/momentjs/', src: ['moment.js'], dest: 'src/main/webapp/resources/lib/'},
                    {expand: true, cwd: 'bower_components/less.js/dist/', src: ['less-1.4.2.js'], dest: 'src/main/webapp/resources/lib/less.js'},
                    {expand: true, cwd: 'bower_components/angular-ui-bootstrap-bower/', src: ['ui-bootstrap.js'], dest: 'src/main/webapp/resources/lib/'},

                    {expand: true, cwd: 'bower_components/bootstrap/dist/css/', src: ['bootstrap.css'], dest: 'src/main/webapp/resources/styles/'},
                    {expand: true, cwd: 'bower_components/bootstrap/dist/fonts/', src: ['glyphicons*'], dest: 'src/main/webapp/resources/fonts/'}
                ]
            },
            release: {
                files: [
                    {expand: true, cwd: 'bower_components/angular/', src: ['angular.min.js'], dest: 'src/main/webapp/resources/lib/angular.js'},
                    {expand: true, cwd: 'bower_components/angular-resource/', src: ['angular-resource.min.js'], dest: 'src/main/webapp/resources/lib/angular-resource.js'},
                    {expand: true, cwd: 'bower_components/angular-route/', src: ['angular-route.min.js'], dest: 'src/main/webapp/resources/lib/angular-route.js'},

                    {expand: true, cwd: 'bower_components/lodash/dist/', src: ['lodash.min.js'], dest: 'src/main/webapp/resources/lib/lodash.js'},
                    {expand: true, cwd: 'bower_components/momentjs/min/', src: ['moment.min.js'], dest: 'src/main/webapp/resources/lib/moment.js'},
                    {expand: true, cwd: 'bower_components/less.js/dist/', src: ['less-1.4.2.min.js'], dest: 'src/main/webapp/resources/lib/less.js'},
                    {expand: true, cwd: 'bower_components/angular-ui-bootstrap-bower/', src: ['ui-bootstrap.min.js'], dest: 'src/main/webapp/resources/lib/ui-bootstrap.js'},

                    {expand: true, cwd: 'bower_components/bootstrap/dist/', src: ['bootstrap.min.css'], dest: 'src/main/webapp/resources/styles/bootstrap.css'},
                    {expand: true, cwd: 'bower_components/bootstrap/dist/fonts/', src: ['glyphicons*'], dest: 'src/main/webapp/resources/fonts/'}
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
                'src/main/webapp/resources/scripts/{,*/}*.js',
                'src/main/webapp/karma/spec/{,*/}*.js'
            ],
            e2e: [
                'src/main/webapp/karma/e2e/{,*/}*.js'
            ]
        },
        less: {
            dist: {
                files: {
                    "src/main/webapp/resources/css/build.css": "src/main/webapp/resources/css/project.less"
                }
            }
        },
        usemin: {
            html: 'src/main/webapp/WEB-INF/views/index.jsp'
        },
        concat: {
            dist: {
                src: ['src/main/webapp/resources/scripts/**/*.js', 'src/main/webapp/resources/scripts/*.js'],
                dest: 'src/main/webapp/resources/scripts/build.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-clear');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-usemin');

    grunt.registerTask('default', ['package']);
    grunt.registerTask('package', ['shell:bower', 'copy:dev']);

    grunt.registerTask('test', ['jshint', 'karma:unit', 'karma:e2e']);
    grunt.registerTask('test:e2e', ['clear', 'jshint:e2e', 'karma:e2e', 'watch:e2e']);
    grunt.registerTask('test:unit', ['clear', 'jshint:all', 'karma:unit', 'watch:js']);

    grunt.registerTask('build:release', ['jshint', 'karma:release', 'concat', 'less', 'usemin']);
};