module.exports = function(grunt) {

  var allTasks = [
    'clean',
    'ngtemplates',
    'concat',
    'uglify',
    'copy:assets',
    'copy:index',
    'copy:partials',
    'copy:build',
    'jshint'
  ];

  var serveStatic = require('serve-static');

  grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: {
        src: ['build', 'public']
      }
    },
    ngtemplates: {
      IowaCodeCampNg: {
        cwd: 'src',
        src: ['partials/**.html'],
        dest: 'build/partials.js'
      }
    },
    concat: {
      options: {
        banner: '(function () {\n',
        footer: '})();'
      },
      src: {
        src: [
          'src/module.js',
          '<%= ngtemplates.IowaCodeCampNg.dest %>',
          'src/controllers/**.js',
          'src/directives/**.js',
          'src/filters/**.js',
          'src/providers/**.js'
        ],
        dest: 'build/IowaCodeCampNg.js',
      },
    },
    copy: {
      assets: {
        files: [
        {
          expand: true,
          cwd: 'assets/',
          src: ['**'],
          dest: 'build/assets'
        }
        ]
      },
      index: {
        src: 'src/index.html',
        dest: 'build/index.html'
      },
      partials: {
        files: [
          {
            expand: true,
            cwd: 'src/partials/',
            src: ['**'],
            dest: 'build/'
          }
        ]
      },
      build: {
        files: [
          {
            expand: true,
            cwd: 'build',
            src: ['**'],
            dest: 'public'
          }
        ]
      }
    },
    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      path: '[**]',
      all: ['Gruntfile.js', 'public/IowaCodeCampNg.js']
    },
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
			build: {
				src: 'build/<%= pkg.name %>.js',
				dest: 'build/<%= pkg.name %>.min.js'
			}
		},
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 7999,
          base: 'public',
          middleware: function(connect, options) {
            var middlewares = [];
            if (!Array.isArray(options.base)) {
              options.base = [options.base];
            }
            var directory = options.directory || options.base[options.base.length - 1];
            options.base.forEach(function(base) {
              // Serve static files. (use serve-static instead)
              middlewares.push(serveStatic(base));
            });
            // Make directory browse-able. (not available on latest connect)
            // middlewares.push(connect.directory(directory));

            // ***
            // Not found - just serve index.html
            // ***
            middlewares.push(function(req, res){
              for(var file, i = 0; i < options.base.length; i++){
                // fixed missing index
                file = options.base[i] + "/index.html";
                if (grunt.file.exists(file)){
                  require('fs').createReadStream(file).pipe(res);
                  return; // we're done
                }
              }
              res.statusCode(404); // where's index.html?
              res.end();
            });
            return middlewares;
          }
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      gruntfile: {
        files: 'Gruntfile.js'
      },
      assets: {
        files: 'assets/**',
        tasks: allTasks
      },
      src: {
        files: 'src/**',
        tasks: allTasks
      }
    }
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', allTasks);
  grunt.registerTask('dev', allTasks.concat(['connect', 'watch']));

};
