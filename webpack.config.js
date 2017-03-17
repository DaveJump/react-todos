'use strict';

const webpack = require('webpack');
const path = require('path');

const appPath = path.join(__dirname, '/app');
const publicPath = '/build/';
const port = 3000;

module.exports = {
  entry: [
    `webpack-dev-server/client?http://127.0.0.1:${port}`,
    'webpack/hot/only-dev-server',
    './app/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: publicPath,
    filename: './build/app.js'
  },
  devtool: 'eval',
  devServer: {
    contentBase: './app/',
    historyApiFallback: true,
    hot: true,
    port: port,
    publicPath: publicPath,
    noInfo: false
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      components: `${appPath}/components/`,
      styles: `${appPath}/styles/`,
      'react/lib/ReactMount': 'react-dom/lib/ReactMount'
    }
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: ['react-hot-loader','babel-loader?presets[]=es2015&presets[]=react']
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=compressed'
      },
      {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  }
}