const queryString = require('querystring');
const axios = require('axios');
const encryption = require('../../utils/encryption');
const { getHeadersCookie } = require('../../utils/utils');

/**
 * 微博的登陆接口
 * 【POST】 https://passport.weibo.cn/sso/login
 * username
 * password
 * vid
 */
async function login(ctx, next) {
  const { body } = ctx.request;
  const queryData = queryString.stringify(body);

  const step0 = await axios({
    url: 'https://m.weibo.cn/'
  });
  const cookie0 = getHeadersCookie(step0.headers);

  const { data, headers, status } = await axios({
    url: 'https://passport.weibo.cn/sso/login',
    method: 'POST',
    headers: {
      Referer: 'https://passport.weibo.cn/signin/login?entry=mweibo&res=wel&wm=3349&r=https%3A%2F%2Fm.weibo.cn%2F',
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
      Host: 'passport.weibo.cn',
      Origin: 'https://passport.weibo.cn',
      Cookie: cookie0
    },
    data: `${ queryData }&r=https://m.weibo.cn/&entry=mweibo&pagerefer=https://m.weibo.cn/login?backURL=https%253A%252F%252Fm.weibo.cn%252F`
  });

  // 格式化数据
  ctx.status = status;
  ctx.body = {
    ...data,
    _: encryption.encode(`${ cookie0 }; ${ getHeadersCookie(headers) }`)
  };
}

function ssoLogin(router) {
  router.post('/sso/login', login);
}

module.exports = ssoLogin;