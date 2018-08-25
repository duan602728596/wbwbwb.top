/**
 * 获取超话列表
 * 【GET】https://m.weibo.cn/api/container/getIndex?containerid=100803_-_page_my_follow_super&since_id=
 */
const axios = require('axios');

async function getChaohuaList(ctx, next){
  const { query } = ctx.request;
  let uri = 'https://m.weibo.cn/api/container/getIndex?containerid=100803_-_page_my_follow_super';
  if('since_id' in query){
    uri += `&since_id=${ query.since_id }`;
  }

  const { status, data } = await axios({
    url: uri,
    method: 'GET',
    headers: {
      Cookie: query.cookie
    }
  });

  // 格式化数据
  const cards = data.data.cards[0].card_group;

  for(let i = cards.length - 1; i>= 0; i--){
    const item = cards[i];
    if(item.card_type === 8){
      delete item.card_type_name;
      delete item.title;
      delete item.itemid;
      delete item.display_arrow;
      delete item.buttons;
      delete item.title_flag_pic;
    }else{
      cards.splice(i, 1);
    }
  }

  const body= {
    since_id: data.data.cardlistInfo.since_id,
    cards
  };

  ctx.status = status;
  ctx.body = body;
}

function apiContainerGetIndex(router){
  router.get('/api/container/getIndex', getChaohuaList);
}

module.exports = apiContainerGetIndex;