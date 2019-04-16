const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const rucksackCss = require('rucksack-css');
const ConsoleLogOnBuildWebpackPlugin = require('./normal');
const path = require('path');
const theme = require('./theme.js');

module.exports = {
	// debug: true, loaders 的 debug 模式将在 webpack 3 或后续版本中取消。
	mode: 'development',
    devtool: 'source-map',
	entry: {
		// 文件入口配置
		index: [
			'babel-polyfill',
			'react-hot-loader/patch',
			'webpack-hot-middleware/client?reload=true', // 看上面
			path.resolve(__dirname, 'src/index')
		],
		vendor: [
			'react',
			'react-dom',
			'react-router-dom',
			'react-router-redux',
			'redux',
			'redux-logger',
			'redux-thunk',
		]
	},
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].js'
	},
  optimization: {
    splitChunks: {
      name (module) {
        return 'vendor';
      }
    }
  },
	plugins: [
		new HtmlWebpackPlugin({
			template: './Template/index.html',
			filename: 'index.html',
			favicon: './Template/booking.ico',
			inject: 'body',
			chunks: ['vendor', 'index'],
			hash: false,
			showErrors: true,
			minify: {
				// 压缩HTML文件
				removeComments: true,
				// 移除HTML中的注释
				collapseWhitespace: true
				// 删除空白符与换行符
			}
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
			__DEV__: false
		}),
		new webpack.LoaderOptionsPlugin({
			debug: true
		}),
		new webpack.HotModuleReplacementPlugin(),
		new ConsoleLogOnBuildWebpackPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: [{
					loader: 'babel-loader'
				}]
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: [{
					loader: 'style-loader' // creates style nodes from JS strings
				}, {
					loader: 'css-loader' // translates CSS into CommonJS
				},
				{
					loader: 'postcss-loader', // translates CSS into CommonJS
					options: {
						plugins: () => [autoprefixer({
							browsers: ['last 2 versions', 'ie>8']
						}), rucksackCss()],
					}
				},
				{
					loader: 'less-loader'// compiles Less to CSS
				},
				]
			},
			{
				test: /\.less$/,
				use: [
					{
						loader: 'style-loader' // creates style nodes from JS strings
					}, {
						loader: 'css-loader' // translates CSS into CommonJS
					},
					{
						loader: 'less-loader',// compiles Less to CSS
						options: {
              javascriptEnabled: true,
							sourceMap: true,
							modifyVars : theme
						}
					}
				],
				include: /node_modules/,
			},
			{
				test: /\.(otf|eot|ttf|woff|woff2).*$/,
				use: [{
					loader: 'url-loader?limit=10000'
				}]
			},
			{
				test: /\.(gif|jpe?g|png|ico)$/,
				use: [{
					loader: 'url-loader?limit=10000'
				}]
			},
			{
				test: /\.(svg).*$/i,
				oneOf: [
					{
						issuer: /.less$/,
						use: 'svg-url-loader'
					},
					{
						issuer: /.js$/,
						use: 'svg-url-loader?noquotes'
					}
				],
			}
		]
	}
};
