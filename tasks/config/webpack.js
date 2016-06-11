"user strict";


var path = require('path');
var webpack = require('webpack');

module.exports = function(grunt){

var home   = __dirname+'/../../';
var npm    = home + 'node_modules/';
//var source = home + 'assets/js/lib/';

	var config = {
		resolve: {
      modulesDirectories:["node_modules"],
      target:'web',
   // progress: true,
   // root:path.resolve(__dirname),
   // extensions: ['', '.js', '.jsx'],
			alias: {
        //  jquery$        : npm + 'jquery/dist/jquery',
            underscore$    : npm + 'lodash/index',
        //  backbone$      : npm + 'backbone/backbone',
        //  react$         : npm + 'react/dist/react',//-with-addons',
        // 'react-dom'     : npm + 'react-dom/dist/react-dom',//react/lib/ReactDOM',
            bootstrap$     : npm + 'react-bootstrap/dist/react-bootstrap',
        //  sideMenu$      : npm + 'react-burger-menu',///dist/react-burger-menu',
        // 'react/lib/ReactDOM' : npm + 'react/lib/ReactDOM'
        // 'react-widgets' : npm + 'react-widgets/dist/react-widgets',
        // globalize$      : npm + 'react-widgets/lib/localizers/globalize'
			}
		}
	}
  
grunt.config.set("webpack",{
      options:config,

      dev:{
          entry: {
              index: './assets/js/lib/load.js'
          },
          output: {
              path: path.join(__dirname,'../../.tmp/public/js'),
              filename: 'bundle-[name].js'
          },
         // plugins: [ new webpack.optimize.UglifyJsPlugin({ minimize: true })],
          stats: {
              // Configure the console output
              colors: true,
              modules: true,
              reasons: true
          },
        //  target: 'web',
          devtool:'source-map',
       //  
        //  keepalive: true
      /*  plugins: [
        new webpack.DefinePlugin({
          'process.env': {
            'NODE_ENV': '"production"'
          }
        })
      ]*/
      },  /*  
      module:{
        loaders: [
            { //tell webpack to use jsx-loader for all *.jsx files
                test: /\.jsx$/,  exclude: /node_modules/,
                loader: 'jsx-loader?insertPragma=React.DOM&harmony'
            },
            {test: /\.css$/, loader:"style!css"},
            {test: /\.(woff|woff2|eot|ttf|svg)$/, loader:"url"},
            { test: /underscore/, preloader: 'exports?_' },
            { test: /toastr/, preloader: 'exports?toastr!imports?jquery'},
            { test: /backbone/,   preloader: 'exports?Backbone!imports?underscore,jquery' }
        ]
      },
      externals: {
          //don't bundle the 'react' npm package with our bundle.js
          //but get it from a global 'React' variable
          'react': 'React'
      },
      resolve: {
          extensions: ['', '.js', '.jsx']
      }*/
   })

grunt.loadNpmTasks('grunt-webpack');

//grunt.config( 'bundle', require('./bundle.js') ); // <<< webpack config
//grunt.config( 'jsx', require('./jsx.js') );
/*
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-react');

  grunt.registerTask('default', ['react']);*/
}