module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'jst:dev',
		'less:dev',
		//'copy:dev',
		//'coffee:dev',

		'copy:fonts',
		'react',
		'webpack',
    'clean:views',
	]);
  //grunt.log.writeln('YYYYYYYYYYY');
  //console.log("ddddddd")
};
