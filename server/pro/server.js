/* 生产环境 服务器 */
const path = require('path');
const zlib = require('zlib');
const Koa = require('koa');
const Router = require('koa-router');
const convert = require('koa-convert');
const compress = require('koa-compress');
const staticCache = require('koa-static-cache');
const mime = require('mime-types');
const readFile = require('./readFile');
const preRender = require('../utilities/preProRender');

const app = new Koa();
const router = new Router();
const port = 5051;                                       // 配置端口
const serverFile = path.join(__dirname, '/../../build'); // 文件夹地址

/* gzip压缩 */
app.use(compress({
  filter: function(content_type){
    return true;
  },
  threshold: 2048,
  flush: zlib.constants.Z_SYNC_FLUSH
}));

/* 缓存 */
app.use(convert(
  staticCache(serverFile, {
    maxAge: 60 * 60 * 24 * 365
  })
));

/* router */
app.use(router.routes())
  .use(router.allowedMethods());

/* index路由 */
router.get(/^\/[^._\-]*$/, async(ctx, next)=>{
  const { status, body } = await readFile(serverFile + '/index.html');

  ctx.status = status;
  ctx.type = 'text/html';
  ctx.body = await preRender(body, ctx.path, {});

  await next();
});

/* 静态文件 */
router.get(/^.*\.[a-zA-Z0-9]+$/, async(ctx, next)=>{
  const pathFile = ctx.path;
  const { status, body } = await readFile(serverFile + pathFile);

  ctx.status = status;
  ctx.type = status === 200 ? mime.lookup(pathFile) : 'text/plain';
  ctx.body = body;

  await next();
});

app.listen(port);
console.log('\x1B[32m%s\x1B[39m', `\nListening at port: ${ port }.\n`);