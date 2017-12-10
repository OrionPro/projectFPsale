module.exports = function(paths) {
	return {
		module: {
			rules: [
				{
					test: /\.styl$/,
					include: paths,
					use: [
						{ loader: 'style-loader', options: {
								//sourceMap: true
							}
						},
						{ loader: 'css-loader', options: {
								//sourceMap: true
							}
						},
						{ loader: 'postcss-loader', options: {
								//sourceMap: true
							}
						},
						{ loader: 'stylus-loader', options: {
								//sourceMap: true
							}
						}
					]
				}
			]
		}
	};
};