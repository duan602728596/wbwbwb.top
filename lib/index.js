const Koa = require('koa');
const Router = require('koa-router');
const body = require('koa-body');
const cors = require('koa2-cors');
const routers = require('./routers');

const app = new Koa();
const router = new Router();
const port = 5052;

/* 初始化 */
app.use(cors({
  origin(ctx){
    return '*';
  }
}));
app.use(body());

routers(router);

app.use(router.routes())
  .use(router.allowedMethods());

app.listen(port);