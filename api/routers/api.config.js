const axios = require('axios');
const encryption = require('../../utils/encryption');
const { getHeadersCookie } = require('../../utils/utils');

/**
 * 获取微博的st参数
 * 【GET】https://m.weibo.cn/api/config
 */
async function getSt(ctx, next) {
  try {
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
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
  }
}

function apiConfig(router) {
  router.get('/api/config', getSt);
}

module.exports = apiConfig;