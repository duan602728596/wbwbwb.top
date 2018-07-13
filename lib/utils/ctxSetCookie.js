function ctxSetCookie(ctx, cookie){
  for(const key in cookie){
    ctx.cookies.set(key, cookie[key]);
  }
}

module.exports = ctxSetCookie;