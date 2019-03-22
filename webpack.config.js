const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const stylus = require('./webpack/stylus');
const css = require('./webpack/css');
const fonts = require('./webpack/fonts');
const js = require('./webpack/js');
const extractCSS = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');
const sprite = require('./webpack/sprite');

const PATHS = {
	source: path.join(__dirname, 'source'),
	build: path.join(__dirname, 'build')
};

const common = merge([
	{
		entry: {
			'index': PATHS.source + '/pages/index/index.js',
			//'hide-ip': PATHS.source + '/pages/hide-ip/hide-ip.js'
		},
		// убрать это если не нужен source-map (а на продакшене он в принципе не нужен)
		//devtool: 'source-map',
		output: {
			path: PATHS.build,
			filename: 'js/[name].js'
		},
		externals: {
			'jquery-mousewheel': 'jquery-mousewheel',
			'../TweenLite': 'TweenLite',
		},
		resolve: {
			modules: ["node_modules", "source", "spritesmith-generated"],
			alias: {
				'sprite': path.resolve(__dirname, 'source/spritesmith/'),
				'img': path.resolve(__dirname, 'source/img/'),
				'fonts': path.resolve(__dirname, 'source/fonts/'),
				'stylus': path.resolve(__dirname, 'source/stylus/')
			}
		},
		plugins: [
			new HtmlWebpackPlugin({
				filename: 'index.html',
				chunks: ['index'],
				template: PATHS.source + '/pages/index/index.pug'
			}),
			new HtmlWebpackPlugin({
				filename: 'blog.html',
				chunks: ['index'],
				template: PATHS.source + '/pages/blog/blog.pug'
			}),
			new HtmlWebpackPlugin({
				filename: 'hide-ip.html',
				chunks: ['index'],
				template: PATHS.source + '/pages/hide-ip/hide-ip.pug'
			}),
			new HtmlWebpackPlugin({
				filename: 'proxy-checker.html',
				chunks: ['index'],
				template: PATHS.source + '/pages/proxy-checker/proxy-checker.pug'
			}),
			new HtmlWebpackPlugin({
				filename: 'port-scanner.html',
				chunks: ['index'],
				template: PATHS.source + '/pages/port-scanner/port-scanner.pug'
			}),
			new HtmlWebpackPlugin({
				filename: 'IP-ping.html',
				chunks: ['index'],
				template: PATHS.source + '/pages/IP-ping/IP-ping.pug'
			}),
			new HtmlWebpackPlugin({
				filename: 'Dig-Dns.html',
				chunks: ['index'],
				template: PATHS.source + '/pages/Dig-Dns/Dig-Dns.pug'
			}),
			new HtmlWebpackPlugin({
				filename: 'IP-traceroute.html',
				chunks: ['index'],
				template: PATHS.source + '/pages/IP-traceroute/IP-traceroute.pug'
			}),
			//new webpack.optimize.CommonsChunkPlugin({
			//	name: 'common'
			//}),
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery'
			}),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin()
		]
	},
	pug(),
	sprite(),
	images(),
	fonts()
]);

module.exports = function(env) {
	if (env === 'production'){
		return merge([
			common,
			extractCSS(),
			uglifyJS(),
			js()
		]);
	}
	if (env === 'development'){
		return merge([
			common,
			js(),
			css(),
			stylus(),
			devserver()
		]);
	}
};










