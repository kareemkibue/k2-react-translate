const CircularDependencyPlugin = require('circular-dependency-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const webpack = require('webpack');
const styledComponentsTransformer = createStyledComponentsTransformer();
const paths = require('./paths');

const PORT = 3000;

module.exports = {
	mode: 'development',
	entry: paths.indexTsx,
	devtool: 'eval-source-map',
	devServer: {
		clientLogLevel: 'error',
		historyApiFallback: true,
		hot: true,
		open: true,
		quiet: true,
		overlay: {
			warnings: false,
			errors: true,
		},
		contentBase: paths.buildDirectory,
		port: PORT,
	},
	output: {
		filename: 'main.js',
		publicPath: '/',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json'],
	},
	module: {
		rules: [
			// {
			// 	test: /\.(ts|tsx)$/,
			// 	exclude: /(node_modules|bower_components)/,
			// 	use: {
			// 		loader: 'eslint-loader',
			// 		options: {
			// 			configFile: './eslintrc.js',
			// 		},
			// 	},
			// },
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'awesome-typescript-loader',
						options: {
							configFileName: paths.tsConfig,
							transpileModule: true,
							getCustomTransformers: () => ({
								before: [styledComponentsTransformer],
							}),
							forceIsolatedModules: true,
						},
					},
				],
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					require.resolve('style-loader'),
					{
						loader: require.resolve('css-loader'),
						options: { importLoaders: 1 },
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebPackPlugin({
			inject: true,
			template: paths.indexHtml,
		}),
		new FriendlyErrorsWebpackPlugin({
            clearConsole: true,
             messages: [
                `Local: http://localhost:${PORT}`          
            ],
		}),
		new CircularDependencyPlugin({
			exclude: /a\.js|node_modules/,
			failOnError: false,
			allowAsyncCycles: false,
			cwd: process.cwd(),
			onStart({ compilation }) {
				console.log('start detecting webpack modules cycles');
			},
			onDetected({ module: webpackModuleRecord, paths, compilation }) {
				compilation.errors.push(new Error(paths.join(' -> ')));
			},
			onEnd({ compilation }) {
				console.log('end detecting webpack modules cycles');
			},
		}),
		new HardSourceWebpackPlugin({
			configHash: (webpackConfig) => {
				return require('node-object-hash')().hash(webpackConfig);
			},
			cacheDirectory: `${paths.cacheDir}/.cache/hard-source/[confighash]`,
			recordsPath: `${paths.cacheDir}/.cache/hard-source/[confighash]/records.json`,
			cachePrune: {
				maxAge: 24 * 60 * 60 * 1000,
				sizeThreshold: 50 * 1024 * 1024,
			},
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
	externals: [],
};
