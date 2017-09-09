const path = require('path');

module.exports = {
    entry: './test/brws-e2e/arrangement/2boxes.js',
    output: {
        filename: 'bundle-2boxes.js',
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
            }
        ],  
    }
};
