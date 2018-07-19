/**
 * 签到
 * 【GET】https://weibo.com/p/aj/general/button?api=http://i.huati.weibo.com/aj/super/checkin&id=
 */
const axios = require('axios');
const { queryToArray } = require('../../utils');

async function qiandao(ctx, next){
  try{
    const { query } = ctx.request;
    const cookieString = queryToArray(query);
    let uri = `https://weibo.com/p/aj/general/button?api=http://i.huati.weibo.com/aj/super/checkin&id=${ query.containerid }`;

    const res = await axios({
      url: uri,
      method: 'GET',
      headers: {
        Cookie: cookieString.join('; ')
      },
      timeout: 10000
    });

    ctx.status = res.status;
    ctx.body = res.data;
  }catch(err){
    ctx.status = 500;
    ctx.body = err;
  }
}

function pAjGeneralButton(router){
  router.get('/p/aj/general/button', qiandao);
}

module.exports = pAjGeneralButton;