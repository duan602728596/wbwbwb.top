/* webpack配置 */
const process = require('process');
const path = require('path');
const webpack = require('webpack');
const babelConfig = require('./babel.config');

function config(options){
  const conf = {
    mode: process.env.NODE_ENV,
    entry: {
      app: [path.join(__dirname, '../src/app.js')]
    },
    module: {
      rules: [
        { // react & js
          test: /^.*\.js$/,
          use: [babelConfig],
          exclude: /(dll\.js|weibo-pattlock|node_modules)/
        },
        {
          test: /(dll\.js|weibo-pattlock)/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[hash].[ext]',
                outputPath: 'script/'
              }
            }
          ]
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
        { // 图标
          test: /^.*\.ico$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]'
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
        },
        { // pug
          test: /^.*\.pug$/,
          use: [
            {
              loader: 'pug-loader',
              options: {
                pretty: process.env.NODE_ENV === 'development',
                name: '[name].html'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
  };

  /* 合并 */
  conf.module.rules = conf.module.rules.concat(options.module.rules);       // 合并rules
  conf.plugins = conf.plugins.concat(options.plugins);                      // 合并插件
  conf.output = options.output;                                             // 合并输出目录
  if('devtool' in options) conf.devtool = options.devtool;                  // 合并source-map配置
  if('optimization' in options) conf.optimization = options.optimization;   // 合并optimization

  return conf;
}

module.exports = config;