const path = require('path');
module.exports = {
  mode: 'production',
  entry: {
    jsonToHtmlTable: './jsonToHtmlTable.js',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].min.js',
    libraryTarget: 'umd',
    libraryExport: 'default',
    library: 'JsonToHtmlTable',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      ie: '9',
                      node: '4',
                    },
                    useBuiltIns: 'usage',
                    corejs: 3,
                    debug: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
};
