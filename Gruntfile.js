'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var srcDir = 'src';
  var distDir = 'dist';

  grunt.initConfig({
    clean: {
      files: distDir,
      options: {
        force: true
      }
    },
    useminPrepare: {
      html: [
        srcDir+'/s.html'
      ],
      options: {
        dest: distDir,
        flow: {
          steps: {
            'css': ['concat','cssmin'],
            'js': ['concat','uglify']
          },
          post: {}
        }
      }
    },
    usemin: {
      html: [
        distDir+'/s.html'
      ]
    },
    copy: {
      html: {
        expand: true,
        cwd: srcDir,
        src: [
          './*.html'
        ],
        dest: distDir,
        options : {
          noProcess: '**/*.{png,gif,jpg,ico,svg,eot,ttf,woff,woff2}',
          process: function (content) {
            return content.replace(/<!-- dev -->.*<!-- enddev -->\n?/g, '')
              .replace(/<!-- mustache /g, '')
              .replace(/ end mustache -->\n?/g, '');
          }
        }
      },
      js: {
        expand: true,
        cwd: srcDir,
        src: [
          'js/*.js'
        ],
        dest: distDir
      },
      css: {
        expand: true,
        cwd: srcDir,
        src: [
          'css/*.css'
        ],
        dest: distDir
      },
      favicon: {
        expand: true,
        cwd: srcDir,
        src: [
          './*.png'
        ],
        dest: distDir
      }
    }
  });

  grunt.registerTask('default', [
    'build'
  ]);

  grunt.registerTask('build', [
    'clean',
    'useminPrepare',
    'concat',
    'uglify',
    'cssmin',
    'copy',
    'usemin'
  ]);
};
