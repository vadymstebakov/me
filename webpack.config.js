const path = require('path');
const environment = require('./configuration/environment');
const fs = require('fs');
const chalk = require('chalk');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// eslint-disable-next-line no-console
const log = console.log;
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const isStats = process.env.NODE_ENV === 'stats';

// Filename
const filename = (ext, name = '[name]') => (isDev ? `${name}.${ext}` : `${name}.[contenthash:10].min.${ext}`);

// Optimization
const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: 'vendors',
                    chunks: 'initial',
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                    chunks: 'initial',
                },
            },
        },
    };

    if (isProd || isStats) {
        config.minimize = true;
        config.minimizer = [
            new TerserWebpackPlugin({
                parallel: true,
            }),
            new CssMinimizerPlugin({
                parallel: true,
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
        ];
    }

    return config;
};

// Templates
const templatesHTML = () => {
    const pages = [];
    const templates = fs
        .readdirSync(path.resolve(__dirname, environment.paths.source, 'templates'))
        .filter(file => /\.html$/.test(file));

    pages.push(...templates);

    /*
        NOTE: How many pages you will get
    */
    log(chalk.black.bgWhite.bold(`### Get pages: ${chalk.red.bgWhite.bold(pages.join(', '))}`));

    return pages.map(
        page =>
            new HTMLWebpackPlugin({
                filename: page,
                template: path.resolve(environment.paths.source, 'templates', page),
                minify: isProd || isStats,
            })
    );
};

// Style loaders
const styleLoaders = () => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: '../',
            },
        },
        {
            loader: 'css-loader',
            options: {
                importLoaders: 2,
                sourceMap: isDev,
            },
        },
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: ['autoprefixer'],
                },
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

// File loaders
const fileLoaders = () => {
    const loaders = [
        {
            loader: 'file-loader',
            options: {
                esModule: false,
                name: '[path][name].[ext]',
            },
        },
    ];

    return loaders;
};

// Js loaders
const jsLoaders = () => {
    const loaders = [];

    if (isDev) {
        loaders.push('eslint-loader');
    }

    return loaders;
};

// Plugins
const plugins = () => {
    const base = [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `css/${filename('css')}`,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: environment.paths.images,
                    to: 'images/',
                    force: true,
                    toType: 'dir',
                    globOptions: {
                        ignore: ['**/*.DS_Store', '**/Thumbs.db'],
                    },
                },
                {
                    from: environment.paths.fonts,
                    to: 'fonts/',
                    force: true,
                    toType: 'dir',
                    globOptions: {
                        ignore: ['**/*.DS_Store', '**/Thumbs.db'],
                    },
                },
            ],
        }),
        ...templatesHTML(),
    ];

    if (isStats) base.push(new BundleAnalyzerPlugin());

    return base;
};

// Modules of webpack
module.exports = {
    context: environment.paths.source,
    entry: {
        app: [path.resolve(environment.paths.source, 'js', 'index.js')],
    },
    output: {
        filename: `js/${filename('js')}`,
        path: environment.paths.output,
        publicPath: environment.paths.assetsPath,
    },
    optimization: optimization(),
    module: {
        rules: [
            {
                test: /\.js$/,
                include: /js/,
                use: jsLoaders(),
            },
            {
                test: /\.scss$/i,
                include: /scss/,
                use: styleLoaders(),
            },
            {
                test: /\.(png|jpe?g|svg|gif)$/i,
                include: /images/,
                use: fileLoaders(),
            },
            {
                test: /\.(woff2|woff)$/i,
                include: /fonts/,
                use: fileLoaders(),
            },
        ],
    },
    plugins: plugins(),
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    target: isProd ? 'browserslist' : 'web',
};
