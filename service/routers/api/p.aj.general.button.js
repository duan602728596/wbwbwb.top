/**
 * 签到
 * 【GET】https://weibo.com/p/aj/general/button?api=http://i.huati.weibo.com/aj/super/checkin&id=
 */
const axios = require('axios');

async function qiandao(ctx, next){
  const { body } = ctx.request;
  let uri = `https://weibo.com/p/aj/general/button?api=http://i.huati.weibo.com/aj/super/checkin&id=${ body.containerid }`;

  const res = await axios({
    url: uri,
    method: 'GET',
    headers: {
      Cookie: body.cookie
    },
    timeout: 10000
  });

  ctx.status = res.status;
  ctx.body = res.data;
}

function pAjGeneralButton(router){
  router.post('/p/aj/general/button', qiandao);
}

module.exports = pAjGeneralButton;