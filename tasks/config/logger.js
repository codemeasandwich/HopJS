"user strict";

//=====================================================
//================================= HopJS: grunt-logger
//=====================================================

module.exports = function(grunt){
  grunt.registerTask('logger', function(message) {
      grunt.log.writeln('[help] '+message);
  });
}
