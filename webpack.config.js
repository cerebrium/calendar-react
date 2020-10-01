var path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/Calendar.jsx',
    output: {
        path: path.resolve('lib'),
        filename: 'Calendar.jsx',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    }
}