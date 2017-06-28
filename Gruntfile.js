/**
 * Created by Administrator on 2017/4/24.
 */
module.exports = function (grunt) {
    grunt.initConfig({
      jshint: {
          all: ['src/**/*.js'],
          options: {
              globals: {
                  _:false,
                  $:false
              },
              browser: true,
              devel: true
          }
      }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
};
