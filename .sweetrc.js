const path = require('path');
const process = require('process');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  frame: 'react',
  dll: [
    'react',
    'react-dom',
    'prop-types',
    'react-router',
    'react-router-dom',
    'redux',
    'react-redux',
    'redux-thunk',
    'redux-actions',
    'immutable',
    'redux-immutable',
    'reselect',
    'react-helmet'
  ],
  entry: {
    index: [path.join(__dirname, 'src/index.js')]
  },
  serverRender: true,
  serverEntry: {
    server: [path.join(__dirname, 'src/server.js')]
  },
  rules: [
    {
      test: /gt\.min\.js/,
      use: [{
        loader: 'file-loader',
        options: {
          name: isDevelopment ? '[name].[hash:5].[ext]' : '[hash:5].[ext]',
          outputPath: 'script/'
        }
      }]
    }
  ],
  js: {
    plugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
    exclude: /(dll\.js|gt\.min\.js|node_modules|utils[\\/]encryption\.js)/
  },
  sass: { include: /src/ },
  css: {
    modules: false,
    modifyVars: {
      // https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
      '@primary-color': '#faad14'
    },
    include: /node_modules[\\/]antd/
  },
  html: [
    { template: path.join(__dirname, 'src/index.pug') },
    { template: path.join(__dirname, 'src/modules/Login/Description/description.pug'), excludeChunks: ['index'] }
  ],
  plugins: isDevelopment ? undefined : [
    new PreloadWebpackPlugin({
      rel: 'prefetch',
      include: 'asyncChunks'
    })
  ]
};