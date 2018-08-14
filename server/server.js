const http = require('http');
const https = require('https');
const fs = require('fs');
const process = require('process');
const path = require('path');
const zlib = require('zlib');
const Koa = require('koa');
const Router = require('koa-router');
const convert = require('koa-convert');
const compress = require('koa-compress');
const staticCache = require('koa-static-cache');
const mime = require('mime-types');

const app = new Koa();
const router = new Router();
const serverFile = path.join(__dirname, '/../static');

/* 读取文件 */
function readFile(file){
  return new Promise((resolve, reject)=>{
    fs.readFile(file, (err, data)=>{
      if(err){
        reject(err);
      }else{
        resolve(data);
      }
    });
  }).catch((err)=>{
    console.error(err);
  });
}

if(process.env.NODE_ENV === 'production'){
  /* gzip压缩 */
  app.use(compress({
    filter(contentType){
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
}

/* router */
app.use(router.routes())
  .use(router.allowedMethods());

router.get(/^.*\.[a-zA-Z0-9]+$/, async(ctx, next)=>{
  try{
    const pathFile = ctx.path;
    const file = serverFile + pathFile;

    if(fs.existsSync(file)){
      ctx.status = 200;
      ctx.type = mime.lookup(file);
      ctx.body = await readFile(file);
    }else{
      ctx.status = 404;
      ctx.type = 'text/plain';
      ctx.body = '404 not found.';
    }
  }catch(err){
    ctx.status = 500;
    ctx.type = 'text/plain';
    ctx.body = err;
  }
  await next();
});

/* http服务 */
http.createServer(app.callback()).listen(process.env.HTTP_SERVER_PORT || 5055);

/* https服务 */
const key = path.join(__dirname, '../server.key');
const crt = path.join(__dirname, '../server.crt');
if(fs.existsSync(key) && fs.existsSync(crt)){
  https.createServer({
    key: fs.readFileSync(key),
    cert: fs.readFileSync(crt)
  }, app.callback()).listen(process.env.HTTPS_SERVER_PORT || 5056);
}