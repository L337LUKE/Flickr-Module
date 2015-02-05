//encapsulates grunt config
module.exports = function(grunt) {
    //initialize grunt config object
    grunt.initConfig({
        //Read vales stored in package.json
        pkg: grunt.file.readJSON('package.json'),
        // concatenate JS
        concat: {
            dist: {
                src: ['build/assets/js/main.js'],
                dest: 'dist/js/main.js',
            }
        },
        // Lint js
        jshint: {
            files: ['Gruntfile.js', 'dist/js/main.min.js']
        },
        // uglify/minify
        uglify: {
            options: {
                sourcemap : 'none',
                preserveComments : true,
                compress : false,
                mangle : false,
                beautify : true
            },
            dist: {
                files: {
                    //dest, src
                    'dist/js/main.min.js' : 'dist/js/main.js'
                }, // files
            } //my_target
        }, //uglify
        // setup the sass object to look at the correct files
        sass: {
            dist: {
                options: {
                    // nested, compact, compressed, expanded.
                    style: 'expanded',
                    noCache: true,
                }, //options
                files: [{
                    expand: true,
                    cwd: 'build/assets/sass/',
                    src: ['styles.scss'],
                    //this is relative to the "Gruntfile.js" not the CWD, need to put right path
                    dest: 'dist/css/',
                    ext: '.css',
                }] // files
            } // dist
        }, //sass
        copy: {
          main: {
            expand: true,
            cwd: 'build/',
            src: '**/*.html',
            dest: 'dist/',
            flatten: true,
            filter: 'isFile',
          },
          images: {
            expand: true,
            cwd: 'build/assets/images/',
            src: ['*.png', '*.jpg'],
            dest: 'dist/img/',
            flatten: true,
            filter: 'isFile',
          },
          scripts: {
            expand: true,
            cwd: 'build/assets/js/',
            src: ['*.js'],
            dest: 'dist/js/',
            flatten: true,
            filter: 'isFile',
          }
        },        // Watch command to detect file changes and refresh the browser
        watch: {
            configFiles: {
                files: ['Gruntfile.js']
            }, //configFiles
            css: {
                files: ['build/assets/sass/**/*.scss'],
                tasks: ['sass']
            }, //css
            scripts: {
                files: ['build/assets/js/*.js'],
                tasks: ['concat', 'jshint', 'uglify']
            }, //scripts
            copy: {
              files: ['build/index.html'],
              tasks: ['copy:main', 'copy:scripts']
            },
        }, //watch
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                    'dist/**/*.css',
                    'dist/js/*.js',
                    'dist/**/*.html',
                    ]
                }, //bsfiles
            }, //dev
            options: {
                watchTask: true,
                proxy: 'flickr.dev',
                host: 'localhost'
            } //options
        }, //browserSync
    });
    require('load-grunt-tasks')(grunt);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('copyimg', ['copy:images']);
};
