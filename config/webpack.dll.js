/* 预先编译dll */
const process = require('process');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    dll: [
      'react',
      'react-dom',
      'prop-types',
      'react-router-dom',
      'redux',
      'react-redux',
      'redux-thunk',
      'redux-actions',
      'immutable',
      'redux-immutable',
      'reselect',
      'react-helmet',
      'react-loadable'
    ]
  },
  output: {
    path: path.join(__dirname, '../.dll'),
    filename: '[name].js',
    library: '[name]_[hash:5]',
    libraryTarget: 'var'
  },
  module: {
    rules: [
      { // js
        test: /^.*\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: path.join(__dirname, '../.babelCache'),
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      ie: 11,
                      edge: 16,
                      chrome: 62,
                      firefox: 56
                    },
                    debug: false,
                    modules: false,
                    useBuiltIns: false
                  }
                ]
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // dll
    new webpack.DllPlugin({
      path: '.dll/manifest.json',
      name: '[name]_[hash:5]',
      context: __dirname
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};