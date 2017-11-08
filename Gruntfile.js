module.exports = function (grunt) {

    grunt.initConfig({
        uglify: {
            js: {
                files: {
                    'src/main/resources/static/js/min/scripts.min.js': ['src/main/resources/static/js/**/*.js', '!src/main/resources/static/js/libs/*.js']
                }
            },
            css: {
                files : { 'src/main/resources/static/css/min/styles.css': ['src/main/resources/static/css/*.css'] }
            }
        },
        watch: {
            js: {
                files: ['src/main/resources/static/js/**/*.js', '!src/main/resources/static/js/libs/*.js'],
                tasks: ['uglify:js']
            },
            css: {
                files: ['src/main/resources/static/css/*.css'],
                tasks: ['uglify:css']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify', 'watch']);
};