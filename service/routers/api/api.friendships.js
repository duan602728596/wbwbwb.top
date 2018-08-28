/* 关注和取关 */
const queryString = require('querystring');
const axios = require('axios');
const encryption = require('../../encryption/encryption');

async function friendships(ctx, next){
  const { body } = ctx.request;
  const data = queryString.stringify({
    uid: body.id,
    st: body.st
  });

  const res = await axios({
    url: `https://m.weibo.cn/api/friendships/${ body.action }`,
    method: 'POST',
    headers: {
      Cookie: encryption.decode(ctx.get('_')),
      Referer: 'https://m.weibo.cn/p/index?containerid=231093_-_selffollowed',
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  });

  ctx.status = res.status;
  ctx.body = {
    msg: res.data.msg,
    ok: res.data.ok
  };
}

function apiFriendships(router){
  router.post('/api/friendships', friendships);
}

module.exports = apiFriendships;