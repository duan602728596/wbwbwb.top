const queryString = require('querystring');
const axios = require('axios');
const encryption = require('../../utils/encryption');
const { getHeadersCookie } = require('../../utils/utils');

/* 微博验证验证码是否正确 */
async function geetestValidate(ctx, next) {
  const { query } = ctx.request;

  if ('key' in query) {
    const { body } = ctx.request;
    const queryData = queryString.stringify(body);
    const { data, status, headers } = await axios({
      url: `https://security.weibo.com/captcha/ajgeetest?action=validate&key=${ query.key }`,
      method: 'POST',
      headers: {
        Referer: `https://security.weibo.com/captcha/geetest?key=${ query.key }&c=`,
        'Content-Type': 'application/x-www-form-urlencoded',
        Host: 'security.weibo.com',
        Origin: 'https://security.weibo.com',
        Cookie: encryption.decode(query._)
      },
      data: queryData
    });

    ctx.status = status;
    ctx.body = {
      ...data,
      cookie: getHeadersCookie(headers)
    };
  } else {
    ctx.status = 500;
  }
}

function apiGeetesValidate(router) {
  router.post('/api/geetest/validate', geetestValidate);
}

module.exports = apiGeetesValidate;