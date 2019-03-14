/* 关注和取关 */
import queryString from 'querystring';
import axios from 'axios';
import encryption from '../encryption/encryption';

async function friendships(ctx: Object, next: Function): Promise<void> {
  const { body }: { body: Object } = ctx.request;
  const data: string = queryString.stringify({
    uid: body.id,
    st: body.st
  });

  const res: Object = await axios({
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

function apiFriendships(router: Object): void{
  router.post('/api/friendships', friendships);
}

export default apiFriendships;