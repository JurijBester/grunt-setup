module.exports = function (grunt) {

    grunt.initConfig({
        browserify: {
          main: {
              files: {
                  'dist/js/app.js': ['src/main.ts']
              },
              options: {
                  plugin: ['tsify']
              }
          }
        },
        copy: {
            main: {
                files: [
                    {expand: true, flatten: true, src: ['src/**/*.html'], dest: 'dist/'}
                ]
            }
        },
        connect: {
            server: {
                options:{
                    port:48080,
                    hostname: 'localhost',
                    base: 'dist',
                    livereload: 35729
               }
            }
        },
        tslint:
        {
            options: {
                configuration: grunt.file.readJSON("tslint.json")
            },
            files: {
                src: ['src/**/*.ts']
            }
        },
        less:
        {
          production: {
              files: {
                  'dist/css/main.css': 'src/assets/main.less'
              }
          }
        },
        watch:{
            html:{
                files: ['src/**/*.html'],
                tasks: ['copy'],
                options: {
                    livereload: true
                }
            },
            scripts: {
                files: ['src/**/*.ts'],
                tasks: ['browserify', 'tslint'],
                options: {
                    livereload: true
                }
            },
            styles: {
                files: ['src/assets/**/*.less'],
                tasks: ['less'],
                options: {
                    livereload: true
                }
            },
        }

    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-tslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('build', ['less', 'copy', 'tslint', 'browserify', 'connect:server', 'watch']);

};
