// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths
    var config = {
        app: 'app',
        build: 'build',
        dist: 'dist',
        tasks: grunt.cli.tasks
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },<% if (coffee) { %>
            coffee: {
                files: ['<%%= config.app %>/scripts/{,*/}*.{coffee,litcoffee,coffee.md}'],
                tasks: ['coffee:dist'],
                options: {
                    livereload: true
                }
            },<% } else { %>
            js: {
                files: ['<%%= config.app %>/scripts/{,*/}*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },<% } %>
            gruntfile: {
                files: ['Gruntfile.js']
            },
            styles: {
                files: ['<%%= config.app %>/styles/{,*/}*.css'],
                tasks: [],
                options: {
                    livereload: true
                }
            },
            livereload: {
                options: {
                    livereload: '<%%= connect.options.livereload %>'
                },
                files: [
                    '.tmp/styles/{,*/}*.css',<% if (coffee) { %>
                    '.tmp/scripts/{,*/}*.js',<% } %>
                    '<%%= config.app %>/*.html',
                    '<%%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%%= config.app %>/manifest.json',
                    '<%%= config.app %>/_locales/{,*/}*.json'
                ]
            }
        },

        // Grunt server and debug server settings
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost',
                open: true,
            },
            server: {
                options: {
                    middleware: function(connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(config.app)
                        ];
                    }
                }
            },
            chrome: {
                options: {
                    open: false,
                    base: [
                        '<%%= config.app %>'
                    ]
                }
            },
            test: {
                options: {
                    open: false,
                    base: [
                        'test',
                        '<%%= config.app %>'
                    ]
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            server: '.tmp',
            chrome: '.tmp',
            build: {
                files: [{
                    src: [
                        '<%%= config.build %>/*',
                        '!<%%= config.build %>/.git*'
                    ]
                }]
            },
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= config.dist %>/*',
                        '!<%%= config.dist %>/.git*'
                    ]
                }]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%%= config.app %>/scripts/{,*/}*.js',
                '!<%%= config.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },<% if (testFramework === 'mocha') { %>

        // Mocha testing framework configuration options
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://localhost:<%%= connect.options.port %>/index.html']
                }
            }
        },<% } else if (testFramework === 'jasmine') { %>
        jasmine: {
            all: {
                options: {
                    specs: 'test/spec/{,*/}*.js'
                }
            }
        },<% } %><% if (coffee) { %>

        // Compiles CoffeeScript to JavaScript
        coffee: {
            server: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.app %>/scripts',
                    src: '{,*/}*.{coffee,litcoffee,coffee.md}',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.app %>/scripts',
                    src: '{,*/}*.{coffee,litcoffee,coffee.md}',
                    dest: '<%%= config.app %>/scripts',
                    ext: '.js'
                }]
            }
        },<% } %><% if (compass) { %>

        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%%= config.app %>/styles',
                cssDir: '<%%= config.dist %>/styles',
                generatedImagesDir: '<%%= config.dist %>/images/generated',
                imagesDir: '<%%= config.app %>/images',
                javascriptsDir: '<%%= config.app %>/scripts',
                fontsDir: '<%%= config.app %>/styles/fonts',
                importPath: '<%%= config.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false
            },
            server: {
                options: {
                    cssDir: '.tmp/styles',
                    generatedImagesDir: '.tmp/images/generated',
                    debugInfo: true
                }
            },
            chrome: {
                options: {
                    cssDir: '<%%= config.app %>/styles',
                    generatedImagesDir: '<%%= config.app %>/images/generated',
                    debugInfo: true
                }
            },
            dist: {
            }
        },<% } %>

        // Automatically inject Bower components into the HTML file
        bowerInstall: {
            app: {
                src: ['<%%= config.app %>/index.html'],
                ignorePath: '<%%= config.app %>/'
            }<% if (compass) { %>,
            sass: {
                src: ['<%%= config.app %>/styles/{,*/}*.{scss,sass}'],
                ignorePath: '<%%= config.app %>/bower_components/'
            }<% } %>
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%%= config.dist %>'
            },
            html: [
                '<%%= config.build %>/index.html'
            ]
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%%= config.dist %>', '<%%= config.dist %>/images']
            },
            html: ['<%%= config.dist %>/{,*/}*.html'],
            css: ['<%%= config.dist %>/styles/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.build %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%%= config.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= config.build %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%%= config.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    customAttrAssign: [/\?=/],
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%%= config.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%%= config.dist %>'
                }]
            }
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //     dist: {
        //         files: {
        //             '<%%= config.dist %>/styles/main.css': [
        //                 '.tmp/styles/{,*/}*.css',
        //                 '<%%= config.app %>/styles/{,*/}*.css'
        //             ]
        //         }
        //     }
        // },
        // uglify: {
        //     dist: {
        //         files: {
        //             '<%%= config.dist %>/scripts/scripts.js': [
        //                 '<%%= config.dist %>/scripts/scripts.js'
        //             ]
        //         }
        //     }
        // },
        // concat: {
        //     dist: {}
        // },

        copy: {
            // Copies all files into build directory for vulcanization
            build: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= config.app %>',
                    dest: '<%%= config.build %>',
                    src: [
                        '**'
                    ]
                }]
            },

            vulcanized: {
                options: {
                    // move the csp js file into usemin block
                    process: function (content, srcpath) {
                      var useminComment = '<!-- build:js scripts/index.js -->';
                      function moveToUsemin(script) {
                        // extract the csp js script line
                        var cspStart = content.indexOf(script);
                        var cspEnd   = cspStart+script.length;
                        var cspJs = content.slice(cspStart,cspEnd); // CR

                        // cut it out
                        content = content.substring(0,cspStart-1).concat(
                            content.substring(cspEnd)
                        );

                        // insert it into the usemin block
                        var useminEnd = content.indexOf(useminComment)+useminComment.length; // next line
                        content = content
                            .substring(0,useminEnd) // end of useminComment
                            .concat(
                                '\n',
                                cspJs, // insert
                                '\n',
                                content.substring(useminEnd+1) // after end of useminComment
                            );
                      }

                      moveToUsemin('<script src="index-csp.js"></script>');
                      moveToUsemin('<script src="bower_components/polymer/polymer.js"></script>');
                      moveToUsemin('<script src="bower_components/platform/platform.js"></script>');
                      return content;
                    }
                },
                src: 'build/index-csp.html',
                dest: 'build/index.html',
            },

            // Copies remaining files to places other tasks can use
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%%= config.build %>',
                    dest: '<%%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        'images/{,*/}*.{webp,gif}',
                        '{,*/}*.html',
                        'styles/fonts/{,*/}*.*',
                        '_locales/{,*/}*.json',
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%%= config.build %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [<% if (coffee) { %>
                'coffee:dist',<% } if (compass) { %>
                'compass:server',<% } %>
                'copy:styles'
            ],
            chrome: [<% if (coffee) { %>
                'coffee:dist',<% } if (compass) { %>
                'compass:chrome',<% } %>
                'copy:styles'
            ],
            dist: [<% if (coffee) { %>
                'coffee:dist',<% } if (compass) { %>
                'compass:dist',<% } %>
                'copy:styles',
                'imagemin',
                'svgmin'
            ],
            test: [<% if (coffee) { %>
                'coffee',<% } %>
                'copy:styles'
            ],
        },

        // Merge event page, update build number, exclude the debug script
        chromeManifest: {
            dist: {
                options: {
                    buildnumber: true,
                    background: {
                        target: 'scripts/background.js',
                        exclude: [
                            'scripts/chromereload.js'
                        ]
                    }
                },
                src: '<%%= config.build %>',
                dest: '<%%= config.dist %>'
            }
        },

        // Compress files in dist to make Chromea Apps package
        compress: {
            dist: {
                options: {
                    archive: function() {
                        var manifest = grunt.file.readJSON('app/manifest.json');
                        return 'package/<%= appname %>-' + manifest.version + '.zip';
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**'],
                    dest: ''
                }]
            }
        },

        vulcanize: {
            default: {
                options: {
                    'csp': true
                },
                files: {
                    '<%%= config.build %>/index-csp.html': '<%%= config.build %>/index.html'
                }
            }
        },

        remove: {
          unvulcanized: {
            fileList: ['<%%= config.build %>/index.html']
          },
          vulcanized: {
            fileList: ['<%%= config.build %>/index-csp.html']
          }
        }
    });

    grunt.registerTask('debug', function (platform) {
        var watch = grunt.config('watch');
        platform = platform || 'chrome';
        <% if (compass) { %>
        // Configure compass task for debug[server:chrome] task
        watch.compass = {
            files: ['<%%= config.app %>/styles/{,*/}*.{scss,sass}'],
            tasks: ['compass:' + platform]
        }<% } %>

        // Configure style task for debug:server task
        if (platform === 'server') {
            watch.styles.tasks = ['newer:copy:styles'];
            watch.styles.options.livereload = false;
            <% if (coffee) { %>watch.coffee.tasks = ['coffee:server'];
            watch.styles.options.livereload = false;<% } %>
        }

        // Configure updated watch task
        grunt.config('watch', watch);

        grunt.task.run([
            'clean:' + platform,
            'concurrent:' + platform,
            'connect:' + platform,
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'connect:test',<% if (testFramework === 'mocha') { %>
        'mocha'<% } else if (testFramework === 'jasmine') { %>
        'jasmine'<% } %>
    ]);

    grunt.registerTask('build', [
        'clean:build',
        'copy:build',
        'vulcanize', // 1. index.html -> index-csp.html/index-csp.js
        'remove:unvulcanized', // 2. rm index.html
        'copy:vulcanized', // 3. index-csp.html -> index.html & move script element
        'remove:vulcanized', // 4. rm index-csp.html
    ]);

    grunt.registerTask('dist', [
        'clean:dist',
        'copy:dist',
        'chromeManifest:dist',
        'useminPrepare',
        'concurrent:dist',
        'concat',
        'cssmin',
        'uglify',
        'copy:styles',
        'usemin',
        'htmlmin',
        'compress'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);
};
