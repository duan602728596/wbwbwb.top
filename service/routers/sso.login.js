/**
 * 微博登陆
 * 【POST】 https://passport.weibo.cn/sso/login
 * username
 * password
 * vid
 */
import queryString from 'querystring';
import axios from 'axios';
import encryption from '../encryption/encryption';
import { getHeadersCookie } from '../utils';

async function login(ctx: Object, next: Function): Promise<void>{
  const { body }: { body: Object } = ctx.request;
  const queryData: string = queryString.stringify(body);

  const { data, headers, status }: {
    data: Object,
    headers: Object,
    status: number
  } = await axios({
    url: 'https://passport.weibo.cn/sso/login',
    method: 'POST',
    headers: {
      Referer: 'https://passport.weibo.cn/signin/login?entry=mweibo&r=http%3A%2F%2Fm.weibo.cn',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: queryData
  });

  // 格式化数据
  delete data.data;

  ctx.status = status;
  ctx.body = {
    ...data,
    _: encryption.encode(getHeadersCookie(headers))
  };
}

function ssoLogin(router: Object): void{
  router.post('/sso/login', login);
}

export default ssoLogin;