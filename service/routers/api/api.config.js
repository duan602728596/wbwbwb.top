/**
 * 获取st
 * 【GET】https://m.weibo.cn/api/config
 */

const axios = require('axios');

async function getSt(ctx, next){
  const { query } = ctx.request;
  const { status, data, headers } = await axios({
    url: 'https://m.weibo.cn/api/config',
    method: 'GET',
    headers: {
      Cookie: query.cookie
    }
  });

  ctx.status = status;
  ctx.body = {
    st: data.data.st,
    cookie: headers['set-cookie'].join('; ')
  };
}

function apiConfig(router){
  router.get('/api/config', getSt);
}

module.exports = apiConfig;