/**
 * 获取关注
 * 【GET】https://m.weibo.cn/api/container/getIndex?containerid=231093_-_selffollowed&page=
 */

const axios = require('axios');

async function getFriendList(ctx, next){
  try{
    const { query } = ctx.request;
    let uri = 'https://m.weibo.cn/api/container/getIndex?containerid=231093_-_selffollowed';
    if('page' in query){
      uri += `&page=${ query.page }`;
    }

    const res = await axios({
      url: uri,
      method: 'GET',
      headers: {
        Cookie: query.cookie
      }
    });

    ctx.status = res.status;
    ctx.body = res.data;
  }catch(err){
    ctx.status = 500;
    ctx.body = err;
  }
}

function apiContainerFriendShip(router){
  router.get('/api/container/friendShip', getFriendList);
}

module.exports = apiContainerFriendShip;