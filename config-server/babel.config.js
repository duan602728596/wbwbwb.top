/* babel-loader 配置 */
const path = require('path');

const presets = [
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
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-syntax-dynamic-import'
];

module.exports = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: path.join(__dirname, '../.babelCache'),
    presets,
    plugins
  }
};