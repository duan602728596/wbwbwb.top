const axios = require('axios');
const encryption = require('../../utils/encryption');

/**
 * 微博的超话签到接口
 * 【GET】https://weibo.com/p/aj/general/button?api=http://i.huati.weibo.com/aj/super/checkin&id=
 */
async function qiandao(ctx, next) {
  try {
    const { body } = ctx.request;
    const uri = `https://weibo.com/p/aj/general/button?api=http://i.huati.weibo.com/aj/super/checkin&id=${ body.containerid }`;

    const res = await axios({
      url: uri,
      method: 'GET',
      headers: {
        Cookie: encryption.decode(ctx.get('_'))
      },
      timeout: 10000
    });

    ctx.status = res.status;
    ctx.body = res.data;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
  }
}

function pAjGeneralButton(router) {
  router.post('/p/aj/general/button', qiandao);
}

module.exports = pAjGeneralButton;