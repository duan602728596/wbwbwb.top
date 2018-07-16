/* 开发环境 服务器 */
const Koa = require('koa');
const Router = require('koa-router');
const convert = require('koa-convert');
const mime = require('mime-types');
const middleware = require('./middleware');
const preRender = require('../utilities/preDevRender');

const app = new Koa();
const router = new Router();
const port = 5050; // 配置端口

/* router */
app.use(router.routes())
  .use(router.allowedMethods());

app.use(convert(middleware.devMiddle()));  // webpack中间件
app.use(convert(middleware.hotMiddle()));  // 热加载部署

/* 重定向 */
router.get(/^\/[^._\-]*$/, async(ctx, next)=>{
  const file = ctx.path;
  const mimeType = mime.lookup(file);
  if(file !== '/' && file !== '/__webpack_hmr' && mimeType === false){
    ctx.path = '/';
  }
  await next();
  // 服务器端渲染
  if(ctx.type === 'text/html'){
    ctx.body = preRender(ctx.body, file);
  }
});

/* 端口监听 */
const server = app.listen(port, (err)=>{
  if(err){
    console.error(err);
    return false;
  }
  console.log('\x1B[32m%s\x1B[39m', `\nListening at port:${ port }.\n`);
});