/**
 * 获取关注列表
 * 【GET】https://m.weibo.cn/api/container/getIndex?containerid=231093_-_selffollowed&page=
 */

const axios = require('axios');

// 格式化数据
function formatData(data){
  for(let i = data.length - 1; i>= 0; i--){
    const item = data[i];
    if(item.card_type === 10){
      const { user } = item;
      data[i] = {
        card_type: item.card_type,
        desc1: item.desc1,
        desc2: item.desc2,
        scheme: item.scheme,
        id: user.id,
        screen_name: user.screen_name,
        profile_image_url: user.profile_image_url
      };
    }else{
      data.splice(i, 1);
    }
  }
  return data;
}

async function getFriendList(ctx, next){
  try{
    const { query } = ctx.request;
    let uri = 'https://m.weibo.cn/api/container/getIndex?containerid=231093_-_selffollowed';
    if('page' in query){
      uri += `&page=${ query.page }`;
    }

    const { status, data } = await axios({
      url: uri,
      method: 'GET',
      headers: {
        Cookie: query.cookie
      }
    });

    // 格式化数据
    const { cards } = data.data;
    const newCards = [];
    if(cards.length === 2){
      newCards.push({
        card_group: formatData(cards[1].card_group)
      });
    }else if(cards.length === 1){
      newCards.push({
        card_group: formatData(cards[0].card_group)
      });
    }

    const body= {
      ok: data.ok,
      data: {
        cards: newCards
      }
    };

    ctx.status = status;
    ctx.body = body;
  }catch(err){
    ctx.status = 500;
    ctx.body = err;
  }
}

function apiContainerFriendShip(router){
  router.get('/api/container/friendShip', getFriendList);
}

module.exports = apiContainerFriendShip;