/**
 * 微博登陆
 * 【POST】 https://passport.weibo.cn/sso/login
 * username
 * password
 * vid
 */
const queryString = require('querystring');
const axios = require('axios');
const cookie = require('cookie');
const ctxSetCookie = require('../utils/ctxSetCookie');

async function login(ctx, next){
  try{
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
    
    const setCookie = cookie.parse(res.headers['set-cookie'].join('; '));
    const resCookie = {
      SUB: setCookie.SUB,
      SUHB: setCookie.SUHB,
      SSOLoginState: setCookie.SSOLoginState,
      login: setCookie.login
    };
    ctxSetCookie(ctx, resCookie);
    
    ctx.status = res.status;
    ctx.body = {
      ...res.data,
      _cookie: resCookie
    };
    
  }catch(err){
    ctx.status = 500;
    ctx.body = err;
  }
}

function ssoLogin(router){
  router.post('/sso/login', login);
}

module.exports = ssoLogin;