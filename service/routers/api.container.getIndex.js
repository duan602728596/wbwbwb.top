const axios = require('axios');
const encryption = require('../encryption/encryption');

// 格式化数据
function formatData(data) {
  for (let i = data.length - 1; i >= 0; i--) {
    const item = data[i];

    if (item.card_type === 8) {
      delete item.card_type_name;
      delete item.title;
      delete item.itemid;
      delete item.display_arrow;
      delete item.buttons;
      delete item.title_flag_pic;
    } else {
      data.splice(i, 1);
    }
  }

  return data;
}

/**
 * 获取超话列表
 * 【GET】https://m.weibo.cn/api/container/getIndex?containerid=100803_-_page_my_follow_super&since_id=
 */
async function getChaohuaList(ctx, next) {
  const { query } = ctx.request;
  let uri = 'https://m.weibo.cn/api/container/getIndex?containerid=100803_-_page_my_follow_super';

  if ('since_id' in query) {
    uri += `&since_id=${ query.since_id }`;
  }

  const { status, data } = await axios({
    url: uri,
    method: 'GET',
    headers: {
      Cookie: encryption.decode(ctx.get('_'))
    }
  });

  // 格式化数据
  const cards = data.ok === 1 ? formatData(data.data.cards[0].card_group) : [];

  ctx.status = status;
  ctx.body = {
    since_id: data.ok === 1 ? data.data.cardlistInfo.since_id : [],
    cards
  };
}

function apiContainerGetIndex(router) {
  router.get('/api/container/getIndex', getChaohuaList);
}

module.exports = apiContainerGetIndex;