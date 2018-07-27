/* 开发环境 */
const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config');
const cssConfig = require('./css.config');
const sassConfig = require('./sass.config');
const postCssConfig = require('./postcss.config');
const manifestJson = require('../.dll/manifest.json');

/* 合并配置 */
module.exports = config({
  output: {
    path: path.join(__dirname, '../build'),
    filename: 'script/[name].js',
    chunkFilename: 'script/[name].js',
    publicPath: '/'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      { // sass
        test: /^.*\.sass$/,
        use: ['style-loader', cssConfig, postCssConfig, sassConfig]
      },
      { // css
        test: /^.*\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    // dll
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: manifestJson
    })
  ]
});