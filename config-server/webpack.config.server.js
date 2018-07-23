/* webpack配置 */
const path = require('path');
const process = require('process');
const babelConfig = require('./babel.config');
const cssConfig = require('./css.config');
const sassConfig = require('../config/sass.config');
const postCssConfig = require('../config/postcss.config');

function config(){
  const conf = {
    mode: process.env.NODE_ENV,
    entry: {
      server: [path.join(__dirname, '../src/AppServer.js')]
    },
    output: {
      path: path.join(__dirname, '../build-server'),
      filename: '[name].js',
      chunkFilename: '[name].js',
      publicPath: '/',
      library: '[name]',
      libraryTarget: 'umd'
    },
    target: 'node',
    devtool: process.env.NODE_ENV === 'development' ? 'cheap-module-source-map' : 'none',
    node: {
      __filename: false,
      __dirname: false
    },
    module: {
      rules: [
        { // react & js
          test: /^.*\.js$/,
          use: [babelConfig],
          exclude: /(dll\.js|node_modules)/
        },
        { // sass
          test: /^.*\.s(a|c)ss$/,
          use: [cssConfig, postCssConfig, sassConfig]
        },
        { // css
          test: /^.*\.css$/,
          use: ['css-loader/locals']
        },
        { // 图片
          test: /^.*\.(jpg|png|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 3000,
                name: '[name].[hash].[ext]',
                outputPath: 'image/'
              }
            }
          ]
        },
        { // 矢量图片 & 文字
          test: /^.*\.(eot|svg|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[hash].[ext]',
                outputPath: 'file/'
              }
            }
          ]
        }
      ]
    }
  };

  return conf;
}

module.exports = config();