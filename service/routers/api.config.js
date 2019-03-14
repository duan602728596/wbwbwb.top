const axios = require('axios');
const encryption = require('../encryption/encryption');
const { getHeadersCookie } = require('../utils');

/**
 * 获取st
 * 【GET】https://m.weibo.cn/api/config
 */
async function getSt(ctx, next) {
  const { status, data, headers } = await axios({
    url: 'https://m.weibo.cn/api/config',
    method: 'GET',
    headers: {
      Cookie: encryption.decode(ctx.get('_'))
    }
  });

  ctx.status = status;
  ctx.body = {
    st: data.data.st,
    _: encryption.encode(getHeadersCookie(headers))
  };
}

function apiConfig(router) {
  router.get('/api/config', getSt);
}

export default apiConfig;