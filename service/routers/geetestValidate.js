import queryString from 'querystring';
import axios from 'axios';

async function geetestValidate(ctx: Object, next: Function): Promise<void>{
  const { query }: { query: Object } = ctx.request;

  let uri: string = 'https://security.weibo.com/captcha/ajgeetest?action=validate&key=';

  if('key' in query){
    uri += query.key;

    const { body }: { body: Object } = ctx.request;
    const queryData: string = queryString.stringify(body);
    const { data, status }: {
      data: Object,
      status: number
    } = await axios({
      url: uri,
      method: 'POST',
      headers: {
        Referer: `https://security.weibo.com/captcha/geetest?key=${ query.key }&c=`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
        Host: 'security.weibo.com',
        Origin: 'https://security.weibo.com'
      },
      data: queryData
    });

    ctx.status = status;
    ctx.body = data;
  }else{
    ctx.status = 500;
  }
}

function apiGeetesValidate(router: Object): void{
  router.post('/api/geetest/validate', geetestValidate);
}

export default apiGeetesValidate;