
//=====================================================
//==================================== HopJS: grunt-DEV
//=====================================================


module.exports = function (grunt) {
	//grunt.registerTask('default', ['linkAssets',  'watch']);
  	grunt.registerTask('default', [
    'logger:Started  GRUNT',
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
};
