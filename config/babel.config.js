/* babel-loader 配置 */
const path = require('path');
const process = require('process');

const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        ie: 11,
        edge: 12,
        chrome: 40,
        firefox: 40
      },
      debug: process.env.NODE_ENV === 'development',
      modules: false,
      useBuiltIns: 'usage'
    }
  ],
  '@babel/preset-flow',
  '@babel/preset-react'
];

const plugins = [
  [
    '@babel/plugin-proposal-decorators',
    {
      legacy: true
    }
  ],
  '@babel/plugin-proposal-export-default-from',
  '@babel/plugin-proposal-do-expressions',
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-syntax-dynamic-import',
  [
    'import',
    {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }
  ]
];

// 热替换插件
if(process.env.NODE_ENV === 'development') plugins.push('react-hot-loader/babel');

module.exports = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: path.join(__dirname, '../.babelCache'),
    presets,
    plugins
  }
};