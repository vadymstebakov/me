const path = require('path');
const ip = require('ip');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHTMLPlugin = require('script-ext-html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all',
		},
	};

	if (isProd) {
		config.minimizer = [
			new OptimizeCssAssetWebpackPlugin(),
			new TerserWebpackPlugin(),
		];
	}

	return config;
};

const styleLoaders = () => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {
				hmr: isDev,
				reloadAll: true,
			},
		},
		{
			loader: 'css-loader',
			options: {
				sourceMap: isDev,
			},
		},
		{
			loader: 'sass-loader',
			options: {
				sourceMap: isDev,
			},
		},
	];

	return loaders;
};

const babelOptions = preset => {
	const opts = {
		presets: ['@babel/preset-env'],
	};

	if (preset) opts.presets.push(preset);

	return opts;
};

const filename = ext => (isDev ? `[name].${ext}` : `[name].[hash].min.${ext}`);

const plugins = () => {
	const base = [
		new HTMLWebpackPlugin({
			template: './index.html',
			inject: 'head',
			minify: {
				collapseWhitespace: isProd,
			},
		}),
		new ScriptExtHTMLPlugin({
			defer: ['main'],
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, 'src/images/favicon/**.*'),
				to: path.resolve(__dirname, 'dist'),
			},
			{
				from: path.resolve(__dirname, 'src/images/symbol-sprite/**.*'),
				to: path.resolve(__dirname, 'dist'),
			},
		]),
		new MiniCssExtractPlugin({
			filename: `styles/${filename('css')}`,
		}),
	];

	if (isProd) base.push(new BundleAnalyzerPlugin());

	return base;
};

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: ['@babel/polyfill', './js/index.js'],
	},
	output: {
		filename: `js/${filename('js')}`,
		path: path.resolve(__dirname, 'dist'),
	},
	optimization: optimization(),
	devServer: {
		host: ip.address(),
		port: 4200,
		hot: isDev,
	},
	devtool: isDev ? 'source-map' : '',
	plugins: plugins(),
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: /js/,
				loader: {
					loader: 'babel-loader',
					options: babelOptions(),
				},
			},
			{
				test: /\.scss$/i,
				use: styleLoaders(),
			},
			{
				test: /\.(png|jpe?g|svg|gif)$/i,
				include: /images/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: (file, resourcePath) => {
								if (/(svg)|(\.svg$)/gi.test(resourcePath)) {
									return `images/svg/${file}`;
								}

								return `images/${file}`;
							},
							publicPath: (file, resourcePath) => {
								if (/(svg)|(\.svg$)/gi.test(resourcePath)) {
									return `../images/svg/${file}`;
								}

								return `../images/${file}`;
							},
						},
					},
				],
			},
			// {
			// 	test: /\.(ttf|eot|woff2|woff|svg)$/i,
			// include: /fonts/,
			// 	use: [
			// 		{
			// 			loader: 'file-loader',
			// 			options: {
			// 				name: '[name].[ext]',
			// 				outputPath: (file, resourcePath) => {
			// 					if (/icomoon\.(ttf|eot|woff2|woff|svg)$/i.test(resourcePath)) {
			// 						return `fonts/icomoon/${file}`;
			// 					}

			// 					return `fonts/${file}`;
			// 				},
			// 				publicPath: (file, resourcePath) => {
			// 					if (/icomoon\.(ttf|eot|woff2|woff|svg)$/i.test(resourcePath)) {
			// 						return `../fonts/icomoon/${file}`;
			// 					}

			// 					return `../fonts/${file}`;
			// 				},
			// 			},
			// 		},
			// 	],
			// },
		],
	},
};
