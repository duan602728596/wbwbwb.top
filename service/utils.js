/* 给请求添加cookie */
function ctxSetCookie(ctx, cookie){
  for(const key in cookie){
    ctx.cookies.set(key, cookie[key]);
  }
}

/* 将cookie对象转化成数组 */
function queryToArray(query){
  const cookie = [];
  for(const key in query){
    cookie.push(`${ key }=${ query[key] }`);
  }
  return cookie;
}

module.exports = {
  ctxSetCookie,
  queryToArray
};