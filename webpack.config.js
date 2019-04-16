const path = require('path');
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import rucksackCss from 'rucksack-css';
import ConsoleLogOnBuildWebpackPlugin from './normal';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const theme = require('./theme.js');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({ size: 4 });

module.exports = {
  entry: {
    index: './src/index',
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'redux',
      'redux-thunk',
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  plugins: [
		new HtmlWebpackPlugin({
			template: './Template/index.html',
			filename: 'index.html',
			favicon: './Template/booking.ico',
			inject: 'body',
			// js插入的位置，true/'head'  false/'body'
			hash: false,
			// 这样每次客户端页面就会根据这个hash来判断页面是否有必要刷新
			// 在项目后续过程中，经常需要做些改动更新什么的，一但有改动，客户端页面就会自动更新！
			showErrors: true,
			// 是否将错误信息输出到html页面中
			minify: {
				// 压缩HTML文件
				removeComments: true,
				// 移除HTML中的注释
				collapseWhitespace: true
				// 删除空白符与换行符
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false, // remove all comments
			},
			compressor: {
				warnings: false,
				drop_debugger: true,
				drop_console: true
			}
		}),

		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			__DEV__: false
		}),
		new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js' }),
		new webpack.optimize.ModuleConcatenationPlugin(),
		new ExtractTextPlugin({ filename: '[name].[chunkhash].css', allChunks: true, disable: false }),
		new webpack.LoaderOptionsPlugin({
			debug: false
		}),
		new DuplicatePackageCheckerPlugin(),
    new ConsoleLogOnBuildWebpackPlugin(),
		new HappyPack({
	      id: 'js',
	      threadPool: happyThreadPool,
	      loaders: [ 'babel-loader' ]
    })
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: 'happypack/loader?id=js'
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
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
						}
					]
				})
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader' // translates CSS into CommonJS
						},
						{
							loader: 'less-loader', // compiles Less to CSS
							options: {
								sourceMap: true,
								modifyVars: theme
							}
						}
					]
				}),
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
				use: [{
					loader: 'url-loader?limit=1',
					options: {
						name: '[path][name].[ext]'
					}
				}]
			}
		]
	}
};
