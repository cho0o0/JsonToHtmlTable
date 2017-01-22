// Learn more: [Getting Started with Webpack2](https://blog.madewithenvy.com/getting-started-with-webpack-2-ed2b86c68783)
const path = require('path');
const webpack = require('webpack');
module.exports = {
    context: path.resolve(__dirname, './'),
    entry: {
        jsonToHtmlTable: './jsonToHtmlTable.js',
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].min.js',
        libraryTarget: "var",
        library: "JsonToHtmlTable",
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: { presets: ['es2015'] }
            }],
        }],
    },
};
