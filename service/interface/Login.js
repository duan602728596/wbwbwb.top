module.exports = function(ctx, sweetOptions) {
  return {
    title: '登陆 - 微博签到系统',
    initialState: {
      time: new Date().getTime()
    }
  };
};