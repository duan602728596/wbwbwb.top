/**
 * 微博登陆
 * 【POST】 https://passport.weibo.cn/sso/login
 * username
 * password
 * vid
 */
const queryString = require('querystring');
const axios = require('axios');
const encryption = require('../../encryption/encryption');

async function login(ctx, next){
  const { body } = ctx.request;
  const data = queryString.stringify(body);

  const res = await axios({
    url: 'https://passport.weibo.cn/sso/login',
    method: 'POST',
    headers: {
      Referer: 'https://passport.weibo.cn/signin/login?entry=mweibo&r=http%3A%2F%2Fm.weibo.cn',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data
  });

  const cookie = res.headers['set-cookie'].join('; ');

  // 格式化数据
  delete res.data.data;

  ctx.status = res.status;
  ctx.body = {
    ...res.data,
    _: encryption.encode(cookie)
  };
}

function ssoLogin(router){
  router.post('/sso/login', login);
}

module.exports = ssoLogin;