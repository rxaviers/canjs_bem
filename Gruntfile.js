module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    pkg: require("./package.json"),
    jshint: {
      source: {
        src: ["can_bem.js"],
        options: {
          jshintrc: ".jshintrc"
        }
      },
      grunt: {
        src: ["Gruntfile.js"],
        options: {
          jshintrc: ".jshintrc"
        }
      }
    }
  });

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.registerTask("default", ["jshint"]);

};
