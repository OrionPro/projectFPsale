const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(paths) {
	return {
		module: {
			rules: [
				{
					test: /\.styl$/,
					include: paths,
					use: ExtractTextPlugin.extract({
						publicPath: '../',
						fallback: 'style-loader',
						use: ['css-loader?minimize=true,sourceMap','postcss-loader?sourceMap','stylus-loader?sourceMap'],
					}),
				},
				{
					test: /\.css$/,
					include: paths,
					use: ExtractTextPlugin.extract({
						publicPath: '../',
						fallback: 'style-loader',
						use: ['css-loader?minimize=true?sourceMap','postcss-loader?sourceMap'],
					}),
				},
			],
		},
		plugins: [
			new ExtractTextPlugin('./css/[name].css'),
		],
	};
};