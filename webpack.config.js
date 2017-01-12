
var AsyncAwaitPlugin = require('webpack-async-await') ;
var path = require('path');

module.exports = {
  context: path.join(__dirname, 'js'),
  entry: {
    app: "./index.js",
  },
  output: {
    path: path.join(__dirname, 'www'),
    filename: "[name].bundle.js",
    publicPath: '/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'www'),
  },
  plugins: [
    new AsyncAwaitPlugin({awaitAnywhere: true})
  ],
};