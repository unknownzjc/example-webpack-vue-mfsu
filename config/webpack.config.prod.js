const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const { MFSU } = require('@umijs/mfsu');
const CopyPlugin = require("copy-webpack-plugin");
const { ESBuildMinifyPlugin } = require('esbuild-loader')
const path = require("path");

const mfsu = new MFSU({
    implementor: webpack,
    buildDepWithESBuild: {}
});
const config = {
    entry: {
        main: [path.resolve('./src/index.ts')]
    },
    mode: 'production',
    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    'vue-loader'
                ]
            },
            {
                test: /\.[jt]s?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env',
                            [
                                '@babel/preset-typescript',
                                {
                                    allExtensions: true,
                                }
                            ]
                        ],
                        plugins: [
                            ...mfsu.getBabelPlugins()
                        ]
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new (require('html-webpack-plugin'))({
            template: path.resolve('./index.html')
        }),
        new VueLoaderPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve('.mfsu/'),
                    to: path.resolve('./dist')
                },
            ]
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new ESBuildMinifyPlugin({
                target: 'ESNext'
            })
        ],
    },
    stats: {
        assets: false,
        moduleAssets: false,
        runtime: false,
        runtimeModules: false,
        modules: false,
        entrypoints: false
    },
    experiments: {
        topLevelAwait: true,
    }
}
mfsu.setWebpackConfig({
    config,
});

module.exports = config;