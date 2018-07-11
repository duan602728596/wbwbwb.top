const webpack = require('webpack');
const koaWebpackMiddleware = require('koa-webpack-middleware');
const devConfig = require('../../config/webpack.dev');

const { devMiddleware, hotMiddleware } = koaWebpackMiddleware;
const compiler = webpack(devConfig);

/* webpack中间件 */
function devMiddle(){
  return devMiddleware(compiler, {
    reload: true,
    publicPath: devConfig.output.publicPath,
    stats: {
      colors: true
    },
    noInfo: false,
    quiet: false
  });
}

/* 热加载部署 */
function hotMiddle(){
  return hotMiddleware(compiler);
}

module.exports = {
  devMiddle,
  hotMiddle
};