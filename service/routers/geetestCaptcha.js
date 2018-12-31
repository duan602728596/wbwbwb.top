import axios from 'axios';
import encryption from '../encryption/encryption';
import { getHeadersCookie } from '../utils';

async function geetestCaptcha(ctx: Object, next: Function): Promise<void>{
  const { query }: { query: Object } = ctx.request;

  let uri: string = 'https://passport.weibo.cn/verify/captcha?key=';

  if('key' in query){
    uri += query.key;

    const { headers, data }: { headers: Object, data: string } = await axios({
      url: uri,
      method: 'GET',
      headers: {
        Referer: `https://security.weibo.com/captcha/geetest?key=${ query.key }&c=`,
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1'
      }
    });

    ctx.status = 200;
    ctx.body = {
      data,
      _: encryption.encode(getHeadersCookie(headers))
    };
  }else{
    ctx.status = 500;
  }
}

function apiGeetesCaptcha(router: Object): void{
  router.get('/api/geetest/captcha', geetestCaptcha);
}

export default apiGeetesCaptcha;