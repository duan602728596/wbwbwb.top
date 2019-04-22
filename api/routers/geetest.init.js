const axios = require('axios');
const encryption = require('../../utils/encryption');
const { getHeadersCookie } = require('../../utils/utils');

/* 初始化微博的验证 */
async function geetestInit(ctx, next) {
  try {
    const { query } = ctx.request;

    if ('key' in query) {
      const loginCookie = encryption.decode(query._);

      // 先访问302重定向地址
      const step0 = await axios({
        url: `https://passport.weibo.cn/verify/index?id=${ query.key }&showmenu=0`,
        headers: {
          Connection: 'keep-alive',
          Host: 'passport.weibo.cn',
          Referer: 'https://passport.weibo.cn/signin/login?entry=mweibo&res=wel&wm=3349&r=https%3A%2F%2Fm.weibo.cn%2F',
          'Upgrade-Insecure-Requests': 1,
          'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
          'Accept-Language': 'zh-CN,zh;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          Cookie: loginCookie
        }
      });

      // 访问正常地址
      const { data, headers } = await axios({
        url: `https://security.weibo.com/captcha/ajgeetest?action=init&key=${ query.key }`,
        method: 'GET',
        cookie: `${ loginCookie }; ${ getHeadersCookie(step0.headers) }`
      });

      ctx.status = step0.status;
      ctx.body = {
        ...data.data,
        _: encryption.encode(getHeadersCookie(headers))
      };
    } else {
      ctx.status = 500;
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
  }
}

function apiGeetestInit(router) {
  router.get('/api/geetest', geetestInit);
}

module.exports = apiGeetestInit;