const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader/dist/index')
const { MFSU } = require('@umijs/mfsu');

const mfsu = new MFSU({
    implementor: webpack,
    buildDepWithESBuild: {},
});
const config = {
    entry: {
        main: './src/index.ts'
    },
    mode: 'development',
    output: {
        path: __dirname + '/dist',
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
                        presets: ['@babel/preset-env', '@babel/preset-typescript'],
                        plugins: [
                            ...mfsu.getBabelPlugins()
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new (require('html-webpack-plugin'))({
            template: __dirname + '/index.html'
        }),
        new VueLoaderPlugin(),
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