module.exports = function(grunt){
  'use strict';
  require('load-grunt-tasks')(grunt);
  var appConfig = require('./lib/constants');
  grunt.initConfig({
    eslint: {
      options: {
        configFile: '.eslintrc'
      },
      src: ["lib/**/*.js"]
    },
    mochify: {
      options: {
        reporter: 'spec'
      },
      unit: {
        src: ['lib/**/*-spec.js']
      }
    },
    wfmTemplate: {
      module: appConfig.FILE_DIRECTIVE_MODULE,
      templateDir: "lib/template",
      outputDir: "dist"
    }
  });
  grunt.loadNpmTasks('fh-wfm-template-build');
  grunt.registerTask('eslint', ['eslint']);
  grunt.registerTask('test', ['mochify:unit']);};
