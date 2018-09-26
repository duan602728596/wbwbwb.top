module.exports = async function(ctx){
  return {
    title: '登陆 - 微博签到系统',
    initialState: {
      time: new Date().getTime()
    }
  };  
};