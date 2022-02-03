const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const { MFSU } = require('@umijs/mfsu');
const path = require('path');
console.log(__dirname)
const mfsu = new MFSU({
    implementor: webpack,
    buildDepWithESBuild: {}
});
const config = {
    entry: {
        main: [path.resolve('./src/index.ts')]
    },
    mode: 'development',
    devtool: 'source-map',
    output: {
        path: path.resolve('./dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        onBeforeSetupMiddleware(devServer) {
            for (const middleware of mfsu.getMiddlewares()) {
                devServer.app.use(middleware);
            }
        }
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
        new VueLoaderPlugin()
    ],
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