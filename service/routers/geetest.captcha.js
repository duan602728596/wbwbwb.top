import axios from 'axios';
import encryption from '../encryption/encryption';
import { getHeadersCookie } from '../utils';

// 获取重定向的url
function getUrl(str: string): string {
  return str.match(/location\.replace\(["'][^()"']+["']\)/g)[0]
    .replace(/^location\.replace\(["']/, '')
    .replace(/["']\)$/, '');
}

// 获取cross domain的地址列表
function getUrlList(str: string): string[] {
  const uri: string[] = str
    .match(/\[[^\[\]]+\]/)[0]
    .split(/,/);

  return uri.map((item: string, index: number): string => {
    return item.replace(/\[?["']/, '')
      .replace(/["']\]?/, '')
      .replace(/\\\//g, '/');
  });
}

/* 验证后的一系列登陆 */
async function geetestCaptcha(ctx: Object, next: Function): Promise<void> {
  const { query }: { query: Object } = ctx.request;
  const loginCookie: string = encryption.decode(query._);

  if ('key' in query) {
    // 先访问302重定向地址
    const step0Url: string = `https://passport.weibo.cn/verify/captcha?key=${ query.key }`;
    const step0: Object = await axios({
      url: step0Url,
      headers: {
        Referer: `https://security.weibo.com/captcha/geetest?key=${ query.key }&c=`,
        cookie: loginCookie
      }
    });
    const step0Cookie: string = getHeadersCookie(step0.headers);

    const step1Url: string = getUrl(step0.data);
    const step1: Object = await axios({
      url: step1Url,
      headers: {
        Referer: step0Url,
        cookie: step0Cookie
      }
    });

    const crossDomainList: string[] = getUrlList(step1.data);

    const step2: Object = await axios({
      url: crossDomainList[4],
      headers: {
        Cookie: step0Cookie
      }
    });

    ctx.status = 200;
    ctx.body = {
      data: step2.data,
      _: encryption.encode(getHeadersCookie(step2.headers))
    };
  } else {
    ctx.status = 500;
  }
}

function apiGeetesCaptcha(router: Object): void{
  router.get('/api/geetest/captcha', geetestCaptcha);
}

export default apiGeetesCaptcha;