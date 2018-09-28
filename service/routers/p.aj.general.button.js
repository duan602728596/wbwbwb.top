/**
 * 签到
 * 【GET】https://weibo.com/p/aj/general/button?api=http://i.huati.weibo.com/aj/super/checkin&id=
 */
import axios from 'axios';
import encryption from '../encryption/encryption';

async function qiandao(ctx: Object, next: Function): Promise<void>{
  const { body }: { body: Object } = ctx.request;
  const uri: string = `https://weibo.com/p/aj/general/button?api=http://i.huati.weibo.com/aj/super/checkin&id=${ body.containerid }`;

  const res: Object = await axios({
    url: uri,
    method: 'GET',
    headers: {
      Cookie: encryption.decode(ctx.get('_'))
    },
    timeout: 10000
  });

  ctx.status = res.status;
  ctx.body = res.data;
}

function pAjGeneralButton(router: Object): void{
  router.post('/p/aj/general/button', qiandao);
}

export default pAjGeneralButton;