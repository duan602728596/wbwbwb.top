const axios = require('axios');
const encryption = require('../../utils/encryption');
const { getHeadersCookie } = require('../../utils/utils');

// 获取重定向的url
function getUrl(str) {
  return str.match(/location\.replace\(["'][^()"']+["']\)/g)[0]
    .replace(/^location\.replace\(["']/, '')
    .replace(/["']\)$/, '');
}

// 获取cross domain的地址列表
function getUrlList(str) {
  const uri = str.match(/\[[^\[\]]+\]/)[0]
    .split(/,/);

  return uri.map((item, index) => {
    return item.replace(/\[?["']/, '')
      .replace(/["']\]?/, '')
      .replace(/\\\//g, '/');
  });
}

/* 微博验证后的一系列操作 */
async function geetestCaptcha(ctx, next) {
  try {
    const { query } = ctx.request;
    const loginCookie = encryption.decode(query._);

    if ('key' in query) {
      // 先访问302重定向地址
      const step0Url = `https://passport.weibo.cn/verify/captcha?key=${ query.key }`;
      const step0 = await axios({
        url: step0Url,
        headers: {
          Referer: `https://security.weibo.com/captcha/geetest?key=${ query.key }&c=`,
          cookie: loginCookie
        }
      });
      const step0Cookie = getHeadersCookie(step0.headers);

      const step1Url = getUrl(step0.data);
      const step1 = await axios({
        url: step1Url,
        headers: {
          Referer: step0Url,
          cookie: step0Cookie
        }
      });

      const crossDomainList = getUrlList(step1.data);

      const step2 = await axios({
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
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
  }
}

function apiGeetesCaptcha(router) {
  router.get('/api/geetest/captcha', geetestCaptcha);
}

module.exports = apiGeetesCaptcha;