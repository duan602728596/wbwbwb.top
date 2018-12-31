import axios from 'axios';
import encryption from '../encryption/encryption';
import { getHeadersCookie } from '../utils';

async function geetestInit(ctx: Object, next: Function): Promise<void>{
  const { query }: {
    query: Object
  } = ctx.request;

  let uri: string = 'https://security.weibo.com/captcha/ajgeetest?action=init&key=';

  if('key' in query){
    uri += query.key;

    // 先从重定向地址中取出cookie
    const step0: Object = await axios({
      url: `https://passport.weibo.cn/verify/index?id=${ query.key }&showmenu=0`
    });

    // 获取cookie
    const { status, data }: {
      status: number,
      data: Object
    } = await axios({
      url: uri,
      method: 'GET'
    });

    ctx.status = status;
    ctx.body = data.data;
  }else{
    ctx.status = 500;
  }
}

function apiGeetestInit(router: Object): void{
  router.get('/api/geetest', geetestInit);
}

export default apiGeetestInit;