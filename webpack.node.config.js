const path = require('path');

module.exports = {
    target: 'node',
    entry: './backend/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'lib.node.js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }

};