module.exports = function(grunt) {

  var allTasks = [
    'clean',
    'ngtemplates',
    'concat',
    'uglify',
    'copy:index',
    'copy:partials',
    'copy:build'
  ];

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
          port: 8082,
          base: 'public'
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
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', allTasks);
  grunt.registerTask('dev', allTasks.concat(['connect', 'watch']));

};
