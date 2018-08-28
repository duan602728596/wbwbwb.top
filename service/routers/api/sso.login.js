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
const { getHeadersCookie } = require('../../utils');

async function login(ctx, next){
  const { body } = ctx.request;
  const queryData = queryString.stringify(body);

  const { data, headers, status } = await axios({
    url: 'https://passport.weibo.cn/sso/login',
    method: 'POST',
    headers: {
      Referer: 'https://passport.weibo.cn/signin/login?entry=mweibo&r=http%3A%2F%2Fm.weibo.cn',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: queryData
  });

  // 格式化数据
  delete data.data;

  ctx.status = status;
  ctx.body = {
    ...data,
    _: encryption.encode(getHeadersCookie(headers))
  };
}

function ssoLogin(router){
  router.post('/sso/login', login);
}

module.exports = ssoLogin;