/* 生产环境 服务器 */
const http = require('http');
const https = require('https');
const fs = require('fs');
const process = require('process');
const path = require('path');
const zlib = require('zlib');
const Koa = require('koa');
const Router = require('koa-router');
const convert = require('koa-convert');
const body = require('koa-body');
const compress = require('koa-compress');
const staticCache = require('koa-static-cache');
const mime = require('mime-types');
const preRender = require('./utils/preProRender');
const routers = require('../service/routers/routers');

const app = new Koa();
const router = new Router();
const serverFile = path.join(__dirname, '/../build');

/* 读取文件 */
function readFile(file){
  return new Promise((resolve, reject)=>{
    fs.readFile(file, (err, data)=>{
      if(err){
        resolve({
          status: 404,
          body: '404 not found.'
        });
      }else{
        resolve({
          status: 200,
          body: data
        });
      }
    });
  });
}

/* gzip压缩 */
app.use(compress({
  filter: function(contentType){
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

app.use(body());

/* router */
app.use(router.routes())
  .use(router.allowedMethods());

/* index路由 */
router.get(/^\/[^._\-]*$/, async(ctx, next)=>{
  const { status, body } = await readFile(serverFile + '/index.html');

  ctx.status = status;
  ctx.type = 'text/html';
  ctx.body = await preRender(body, ctx.path, ctx);

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

routers(router);

/* http服务 */
http.createServer(app.callback()).listen(process.env.HTTP_SERVER_PORT || 5051);

/* https服务 */
const key = path.join(__dirname, '../server.key');
const crt = path.join(__dirname, '../server.crt');
if(fs.existsSync(key) && fs.existsSync(crt)){
  https.createServer({
    key: fs.readFileSync(key),
    cert: fs.readFileSync(crt)
  }, app.callback()).listen(process.env.HTTPS_SERVER_PORT || 443);
}