/**
 * 获取超话列表
 * 【GET】https://m.weibo.cn/api/container/getIndex?containerid=100803_-_page_my_follow_super&since_id=
 */
const axios = require('axios');

function queryToArray(query){
  const cookie = [];
  for(const key in query){
    cookie.push(`${ key }=${ query[key] }`);
  }
  return cookie;
}

async function getChaohuaList(ctx, next){
  try{
    const { query } = ctx.request;
    const cookieString = queryToArray(query);
    let uri = 'https://m.weibo.cn/api/container/getIndex?containerid=100803_-_page_my_follow_super';
    if('since_id' in query){
      uri += `&since_id=${ query.since_id }`;
    }

    const res = await axios({
      url: uri,
      method: 'GET',
      headers: {
        Cookie: cookieString.join('; ')
      }
    });

    ctx.status = res.status;
    ctx.body = res.data;
  }catch(err){
    ctx.status = 500;
    ctx.body = err;
  }
}

function apiContainerGetIndex(router){
  router.get('/api/container/getIndex', getChaohuaList);
}

module.exports = apiContainerGetIndex;