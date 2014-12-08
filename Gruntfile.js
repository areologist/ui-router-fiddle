/*global module*/

module.exports = function (grunt) {
  'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: ['build'],

        ngAnnotate: {
            options: {
                singleQuotes: false
            },
            app: {
                files: {
                    './build/js/app-bundle.js': ['./app/src/**/*.js']
                }
            }
        },

        jshint: {
            files: [
                './build/js/app-bundle.js',
                'gruntfile.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        concat: {
          options: {
            //separator: ';',
          },
          vendor: {
            src: [
              './vendor/angular/angular.js',
              './vendor/angular-ui-router/release/angular-ui-router.js',
              './vendor/angular-animate/angular-animate.js',
              './vendor/hammerjs/hammer.js',
              './vendor/angular-gestures/gestures.js'
            ],
            dest: './build/js/vendor-bundle.js'
          }
        },

        uglify: {
          options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            sourceMap: true,
            mangle: true
          },
          app: {
            files: {
              './build/js/app-bundle.min.js': './build/js/app-bundle.js'
            }
          },
          vendor: {
            files: {
              './build/js/vendor-bundle.min.js': './build/js/vendor-bundle.js'
            }
          }
        },

        less: {
          development: {
            options: {
              paths: ['./app/less/'],
              cleancss: true
            },
            files: {
              './build/css/app-bundle.min.css': './app/less/main.less'
            }
          }
        },

        csslint: {
          strict: {
            options: {
              import: 2
            },
            src: ['./build/css/app-bundle.min.css']
          },
          lax: {
            options: {
              csslintrc: '.csslintrc'
            },
            src: ['./build/css/app-bundle.min.css']
          }
        },

        copy: {
          app: {
            files: [
              {
                expand: true,
                flatten: true,
                src: ['./app/*.html'],
                dest: './build/'
              },
              {
                expand: true,
                flatten: true,
                src: ['./app/src/partials/*.html'],
                dest: './build/partials/'
              },
              {
                expand: true,
                flatten: true,
                src: ['./app/data/**/*.json'],
                dest: './build/data'
              }
            ]
          },
          vendor: {
            files: [
              {
                expand: true,
                flatten: true,
                src: [
                    './vendor/bootstrap/dist/css/bootstrap.min.css',
                    './vendor/bootstrap/dist/css/bootstrap-theme.min.css'
                ],
                dest: './build/css'
              },
              {
                expand: true,
                flatten: true,
                src: ['./vendor/bootstrap/dist/fonts/*.*'],
                dest: './build/fonts/'
              }
            ]
          }
        },

        connect: {
          server: {
            options: {
              port: 8001,
              //, hostname: '*',
              base: 'build'
            }
          }
        },
  
        watch: {
          development: {
            files: [
              './app/src/**/*.js',
              './app/less/**/*.less',
              './app/**/*.html'
            ],
            tasks: [
              'ngAnnotate',
              'jshint',
              'uglify:app',
              'less',
              'copy:app',
              'csslint:lax'
            ],
            options: {
              interrupt: true
            }
          },
          configFiles: {
            files: [ 'Gruntfile.js' ],
            tasks: [ 'jshint' ]
          }
        }
    });

    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

  
    grunt.registerTask('default', [
        'clean',
        'ngAnnotate',
        'jshint',
        'concat',
        'uglify',
        'less',
        'copy',
        'csslint:lax',
        'connect',
        'watch'
    ]);
};