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
      Referer: 'https://passport.weibo.cn/signin/login?entry=mweibo&res=wel&wm=3349&r=https%3A%2F%2Fm.weibo.cn%2F',
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
      Host: 'passport.weibo.cn',
      Origin: 'https://passport.weibo.cn'
    },
    data: `${ queryData }&r=https://m.weibo.cn/&entry=mweibo&pagerefer=https://m.weibo.cn/login?backURL=https%253A%252F%252Fm.weibo.cn%252F`
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