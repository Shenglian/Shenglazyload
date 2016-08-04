var webpack = require('webpack');
var path = require('path');

var config = {
	entry: { 
		lazyload: './js/lazyload.js'
	},
	resolve :{alias: {}},
	output: { filename: "[name].js" },
	module: {
		noParse: [],
		loaders: [
			{
		        test: /.jsx?$/,
		        loader: 'babel-loader',
		        exclude: /(node_modules|bower_components)/,
		        query: {
		          presets: ['es2015', 'react']
		        }
		    }
  		]
    },
	plugins: [
		new webpack.optimize.CommonsChunkPlugin('common', 'common.js')
	]
};

module.exports = config;