const path = require('path');

module.exports = {
    entry: './test/brws-e2e/connecting/2boxes1rel-2.js',
    output: {
        filename: 'bundle-2boxes1rel-2.js',
        path: path.resolve(__dirname, 'out')
    },
    module: {
        rules: [
            /* In order to transpile ES6 */
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            /* In order to easily import snap.svg */
            {
                test: require.resolve('snapsvg/dist/snap.svg.js'),
                use: 'imports-loader?this=>window,fix=>module.exports=0',
            }
        ],  
    },
    resolve: {
        alias: {
            snapsvg: 'snapsvg/dist/snap.svg.js',
        },
    }
};
