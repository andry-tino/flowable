const path = require('path');

module.exports = {
    entry: './test/brws-e2e/connecting/2boxes1rel.js',
    output: {
        filename: 'bundle-2boxes1rel.js',
        path: path.resolve(__dirname, 'dist')
    }
};
