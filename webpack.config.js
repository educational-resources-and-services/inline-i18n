// webpack.config.js
var path = require('path');

module.exports = {
  entry: './src/i18nReact.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'i18nReact.js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-object-rest-spread'],
          },
        },
      },
    ],
  },
  externals: {
    'react': 'commonjs react',
  },
};