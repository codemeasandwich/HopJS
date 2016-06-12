module.exports = function (grunt) {
  

  
	grunt.registerTask('compileAssets', [
		'clean:dev',
		'jst:dev',
		'less:dev',
		//'copy:dev',
		//'coffee:dev',

		'copy:fonts',
        'logger:Started  JSX parce',
		'react',
        'logger:Finished JSX parce',
        'logger:Started  WebPack build',
		'webpack',
        'logger:Finished WebPack build',
    'clean:views',
        'logger:alldone',
	]);
  //grunt.log.writeln('YYYYYYYYYYY');
  //console.log("ddddddd")

};
