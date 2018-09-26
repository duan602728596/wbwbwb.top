module.exports = async function(ctx){
  return {
    title: '微博签到系统',
    initialState: {
      time: new Date().getTime()
    }
  };
};