module.exports = function(grunt) {

  grunt.initConfig({

    concat: {
      app_js: {
        src: [
          './app/assets/js/**/*.js'
        ],
        dest: './public/assets/js/app.js'
      },
      lib_js: {
        src: [
          './bower_components/jquery/dist/jquery.js',
          './bower_components/angular/angular.js',
          './bower_components/angular-bootstrap/ui-bootstrap.js',
          './bower_components/angular-md5/angular-md5.js',
          './bower_components/angular-resource/angular-resource.js',
          './bower_components/angular-route/angular-route.js',
          './bower_components/angular-sanitize/angular-sanitize.js',
          './bower_components/angular-ui-router/release/angular-ui-router.js',
          './bower_components/bower-skrollr/skrollr.js'
        ],
        dest: './public/assets/js/lib.js'
      }
    },
    copy: {
      fontawesome: {
        files: [
          { src: './bower_components/fontawesome/fonts/*', dest: './public/assets/fonts/', expand: true, flatten: true }
        ]
      },
      views: {
        files: [
          { expand: true, cwd: './app/storage/views/', src:['**/*'], dest: './public/views/' }
        ]
      },
      lib_dev: {
        files: [
          { expand: true, cwd: './bower_components/', src:['**/*'], dest: './public/assets/vendor/' }
        ]
      }
    },
    uglify: {
      options: {
        mangle: false
      },
      app_js: {
        files: {
          './public/assets/js/app.js': './public/assets/js/app.js'
        }
      },
      lib_js: {
        files: {
          './public/assets/js/lib.js': './public/assets/js/lib.js'
        }
      }
    },    
    sass: {
      development: {
        files: {
          "./public/assets/css/app.css":"./app/assets/sass/app.scss",
          "./public/assets/css/vendor/font-awesome.css":"./bower_components/fontawesome/scss/font-awesome.scss"
        }
      }
    },
    watch: {
      app_js: {
        files: ['./app/assets/js/**/*.js'],
        tasks: ['concat:app_js']
      },
      lib_js: {
        files: ['./bower_components/**/*.js'],
        tasks: ['concat:lib_js', 'copy:lib_dev']
      },
      fontawesome: {
        files: ['./bower_components/fontawesome/fonts/*'],
        tasks: ['copy:fontawesome']
      },
      sass: {
        files: ['./app/assets/sass/**/*.scss'],
        tasks: ['sass']
      },
      views: {
        files: ['./app/storage/views/**/*'],
        tasks: ['copy:views']
      }
    }    
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['watch']);

}