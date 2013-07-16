module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            js: {
                files: [
                    'src/main/webapp/resources/**/*.js',
                    'src/main/webapp/resources/**/*.css',
                    'src/main/webapp/resources/**/*.html',
                    'src/main/webapp/WEB-INF/views/*.jsp'
                ],
                tasks: [],
                options: {
                    livereload: true
                }
            },
            karma: {
                files: [
                    'src/main/webapp/karma/spec/**/*.js',
                    'src/main/webapp/resources/**/*.js'
                ],
                tasks: ['karma:unit:run']
            },
            e2e: {
                files: [
                    'src/main/webapp/karma/e2e/**/*.js',
                    'src/main/webapp/resources/**/*.js'
                ],
                tasks: ['karma:e2e:run']
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
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['watch:js']);
    grunt.registerTask('unit', ['karma:unit', 'watch:karma']);
    grunt.registerTask('e2e', ['karma:e2e', 'watch:e2e']);
};