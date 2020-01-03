const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = (env, argv) => {
    const SERVER_PATH = './src/server/server.js'

    return {
        entry: {
            server: [SERVER_PATH]
        },
        output: {
            path: path.join(__dirname, 'dist/server'),
            publicPath: '/',
            filename: '[name].js'
        },
        mode: argv.mode,
        target: 'node',
        node: {
            // Need this when working with express, otherwise the build fails
            __dirname: false, // if you don't put this is, __dirname
            __filename: false // and __filename return blank or /
        },
        externals: [nodeExternals()], // Need this to avoid error when working with Express
        module: {
            rules: []
        }
    }
}
