/**
 * 获取st
 * 【GET】https://m.weibo.cn/api/config
 */

import axios from 'axios';
import encryption from '../encryption/encryption';
import { getHeadersCookie } from '../utils';

async function getSt(ctx: Object, next: Function): Promise<void> {
  const { status, data, headers }: {
    status: number,
    data: Object,
    headers: Object
  } = await axios({
    url: 'https://m.weibo.cn/api/config',
    method: 'GET',
    headers: {
      Cookie: encryption.decode(ctx.get('_'))
    }
  });

  ctx.status = status;
  ctx.body = {
    st: data.data.st,
    _: encryption.encode(getHeadersCookie(headers))
  };
}

function apiConfig(router: Object): void{
  router.get('/api/config', getSt);
}

export default apiConfig;