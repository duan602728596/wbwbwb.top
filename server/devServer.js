/* 开发环境 服务器 */
const http = require('http');
const https = require('https');
const fs = require('fs');
const process = require('process');
const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const body = require('koa-body');
const mime = require('mime-types');
const webpack = require('webpack');
const koaWebpack = require('koa-webpack');
const devConfig = require('../config/webpack.dev');
const preRender = require('./utils/preDevRender');
const routers = require('../service/routers/routers');

const app = new Koa();
const router = new Router();

(async function(){
  app.use(body());

  /* router */
  app.use(router.routes())
    .use(router.allowedMethods());

  /* webpack中间件 */
  const middleware = await koaWebpack({
    compiler: webpack(devConfig),
    hotClient: {
      host: {
        client: '*',
        server: '0.0.0.0'
      },
      port: 65050
    }
  });
  app.use(middleware);

  /* 重定向 */
  router.get(/^\/[^._\-]*$/, async(ctx, next)=>{
    const file = ctx.path;
    const mimeType = mime.lookup(file);
    if(file !== '/' && mimeType === false){
      ctx.path = '/';
      ctx._path = file;
    }
    await next();
    // 服务器端渲染
    if(ctx.type === 'text/html'){
      ctx.body = await preRender(ctx.body, file, ctx);
    }
  });

  routers(router);

  /* http服务 */
  http.createServer(app.callback()).listen(process.env.HTTP_SERVER_PORT || 5050);

  /* https服务 */
  const key = path.join(__dirname, '../dev.key');
  const crt = path.join(__dirname, '../dev.crt');
  if(fs.existsSync(key) && fs.existsSync(crt)){
    https.createServer({
      key: fs.readFileSync(key),
      cert: fs.readFileSync(crt)
    }, app.callback()).listen(process.env.HTTPS_SERVER_PORT || 5051);
  }
})();