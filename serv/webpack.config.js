const path = require('path')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    mode: 'development',
    entry: './index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        libraryExport: 'default',
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                exclude: /node_modules/
            }
        ]
    },
    watch: true,
    watchOptions:{
        // 每次保存后的构建延迟，如果期间有新的保存，则重新计时
        aggregateTimeout:1000,
        // 轮训时间
        poll:5000,
        ignored:/node_modules/
    },
    plugins:[
        new NodePolyfillPlugin()
    ],
}