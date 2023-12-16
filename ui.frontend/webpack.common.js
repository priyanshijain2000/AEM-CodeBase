'use strict';

const path                    = require('path');
const webpack                 = require('webpack');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const TSConfigPathsPlugin     = require('tsconfig-paths-webpack-plugin');
const CopyWebpackPlugin       = require('copy-webpack-plugin');
const { CleanWebpackPlugin }  = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const SOURCE_ROOT = __dirname + '/src/main/webpack';

const resolve = {
    extensions: ['.js', '.ts'],
    plugins: [new TSConfigPathsPlugin({
        configFile: './tsconfig.json'
    })]
};

module.exports = {
    resolve: resolve,
    entry: {
        site: SOURCE_ROOT + '/site/main.ts'
    },
    output: {
        filename: (chunkData) => {
            return chunkData.chunk.name === 'dependencies' ? 'clientlib-dependencies/[name].js' : 'clientlib-site/[name].js';
        },
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        options: {
                            eslintPath: require.resolve('eslint'),
                        },
                        loader: require.resolve('eslint-loader'),
                    },
                    {
                        loader: 'ts-loader'
                    },
                    {
                        loader: 'glob-import-loader',
                        options: {
                            resolve: resolve
                        }
                    }
                ]
            },
            { 
                test: /\.twig$/, 
                use: [ 
                  'raw-loader', 
                  'twig-html-loader' 
                ] 
          
            } ,
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins() {
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: 'glob-import-loader',
                        options: {
                            resolve: resolve
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'clientlib-[name]/[name].css'
        }),
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, SOURCE_ROOT + '/resources'), to: './clientlib-site/' }
        ]),
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, SOURCE_ROOT + '/chatbot'), to: './clientlib-chatbot/' }
        ]),
        new CopyWebpackPlugin([
            { from: path.resolve(__dirname, SOURCE_ROOT + '/chatbot-ap'), to: './clientlib-chatbot-ap/' }
        ]),
		new CopyWebpackPlugin([
            { from: path.resolve(__dirname, SOURCE_ROOT + '/chat-config-dev'), to: './clientlib-chatbot-config-dev/' }
        ]),
		new CopyWebpackPlugin([
            { from: path.resolve(__dirname, SOURCE_ROOT + '/chat-config-prod'), to: './clientlib-chatbot-config-prod/' }
        ]),
		new CopyWebpackPlugin([
            { from: path.resolve(__dirname, SOURCE_ROOT + '/chat-config-qa'), to: './clientlib-chatbot-config-qa/' }
        ]),
		new HtmlWebpackPlugin({
            template: path.resolve(__dirname, SOURCE_ROOT + '/static/index.twig'),
			filename: 'index.html'
        }),
		new HtmlWebpackPlugin({
            template: path.resolve(__dirname, SOURCE_ROOT + '/static/corporate-page.twig'),
			filename: 'corporate-page.html'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, SOURCE_ROOT + '/static/contactUs.twig'),
			filename: 'contactUs.html'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, SOURCE_ROOT + '/static/sprintTen.twig'),
			filename: 'sprintTen.html'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, SOURCE_ROOT + '/static/home.twig'),
			filename: 'home.html'
        })
    ],
    stats: {
        assetsSort: 'chunks',
        builtAt: true,
        children: false,
        chunkGroups: true,
        chunkOrigins: true,
        colors: false,
        errors: true,
        errorDetails: true,
        env: true,
        modules: false,
        performance: true,
        providedExports: false,
        source: false,
        warnings: true
    }
};
