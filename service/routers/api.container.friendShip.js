/**
 * 获取关注列表
 * 【GET】https://m.weibo.cn/api/container/getIndex?containerid=231093_-_selffollowed&page=
 */

import axios from 'axios';
import encryption from '../encryption/encryption';
import { getHeadersCookie } from '../utils';

// 格式化数据
function formatData(data: []): [] {
  for (let i: number = data.length - 1; i >= 0; i--) {
    const item: Object = data[i];

    if (item.card_type === 10) {
      const { user }: {
        user: string
      } = item;

      data[i] = {
        card_type: item.card_type,
        desc1: item.desc1,
        desc2: item.desc2,
        scheme: item.scheme,
        id: user.id,
        screen_name: user.screen_name,
        profile_image_url: user.profile_image_url
      };
    } else {
      data.splice(i, 1);
    }
  }

  return data;
}

async function getFriendList(ctx: Object, next: Function): Promise<void> {
  const { query }: {
    query: Object
  } = ctx.request;
  let uri: string = 'https://m.weibo.cn/api/container/getIndex?containerid=231093_-_selffollowed';

  if ('page' in query) {
    uri += `&page=${ query.page }`;
  }

  const { status, data, headers }: {
    status: number,
    data: Object,
    headers: Object
  } = await axios({
    url: uri,
    method: 'GET',
    headers: {
      Cookie: encryption.decode(ctx.get('_'))
    }
  });

  // 格式化数据
  const { cards }: { cards: Object } = data.data;
  let newCards: [] = [];

  if (data.ok === 1 && cards.length === 2) {
    newCards = formatData(cards[1].card_group);
  } else if (data.ok === 1 && cards.length === 1) {
    newCards = formatData(cards[0].card_group);
  }

  ctx.status = status;
  ctx.body = {
    cards: newCards,
    _: data.ok === 1 ? encryption.encode(getHeadersCookie(headers)) : null
  };
}

function apiContainerFriendShip(router: Object): void{
  router.get('/api/container/friendShip', getFriendList);
}

export default apiContainerFriendShip;