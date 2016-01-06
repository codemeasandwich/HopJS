module.exports = function(grunt){
  
  grunt.config.set('react', {
    dev:{
        files: [{
            expand: true,
            cwd: 'assets/js/views', // Source Directory
            src: ['**/*.jsx','**/*.js'], // Files to compile
            dest: 'assets/js/.views',//'.tmp/build/js', // Destination dir after compile
            ext: '.js'
        }]
      }
    });
  
  grunt.loadNpmTasks('grunt-react');

};