module.exports = function(grunt) {

  var allTasks = ['clean', 'copy', 'uglify'];

  grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
    clean: {
      build: {
        src: ["build"]
      }
    },
    copy: {
      src: {
        files: [
          {
            expand: true,
            cwd: 'src',
            src: ['**'],
            dest: 'build'
          }
        ]
      }
    },
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/<%= pkg.name %>.js',
				dest: 'build/<%= pkg.name %>.min.js'
			}
		},
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 8082,
          base: 'build'
        }
      }
    },
    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: allTasks
      },
      html: {
        files: '**/*.html',
        tasks: allTasks,
        options: {
          livereload: true
        }
      }
    }
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', allTasks.concat(['connect', 'watch']));

};
