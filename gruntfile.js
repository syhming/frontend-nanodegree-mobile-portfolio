module.exports = function(grunt) {
  grunt.initConfig({
    inlinecss: {
        main: {
            options: {
            },
            files: {
                'out.html': 'in.html'
            }
        }
    }
    grunt.registerTask('default', ['inlinecss']);
})
}
