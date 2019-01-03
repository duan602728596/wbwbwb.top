import queryString from 'querystring';
import axios from 'axios';
import encryption from '../encryption/encryption';
import { getHeadersCookie } from '../utils';

/* 验证验证码 */
async function geetestValidate(ctx: Object, next: Function): Promise<void>{
  const { query }: { query: Object } = ctx.request;

  if('key' in query){
    const { body }: { body: Object } = ctx.request;
    const queryData: string = queryString.stringify(body);
    const { data, status, headers }: {
      data: Object,
      status: number,
      headers: Object
    } = await axios({
      url: `https://security.weibo.com/captcha/ajgeetest?action=validate&key=${ query.key }`,
      method: 'POST',
      headers: {
        Referer: `https://security.weibo.com/captcha/geetest?key=${ query.key }&c=`,
        'Content-Type': 'application/x-www-form-urlencoded',
        Host: 'security.weibo.com',
        Origin: 'https://security.weibo.com',
        Cookie: encryption.decode(query._)
      },
      data: queryData
    });

    ctx.status = status;
    ctx.body = {
      ...data,
      cookie: getHeadersCookie(headers)
    };
  }else{
    ctx.status = 500;
  }
}

function apiGeetesValidate(router: Object): void{
  router.post('/api/geetest/validate', geetestValidate);
}

export default apiGeetesValidate;