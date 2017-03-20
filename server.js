'use strict';

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');

const { historyApiFallback, hot, port, publicPath } = config.devServer;

new WebpackDevServer(webpack(config),{
  historyApiFallback,
  hot,
  publicPath
}).listen(port,(err, result) => {
  if (err) {
    return console.log(err);
  }
  console.log(`Listening at http://localhost:${port}`)
});



