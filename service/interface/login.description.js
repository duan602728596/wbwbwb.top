module.exports = async function(ctx){
  return {
    title: '网站说明',
    initialState: {
      time: new Date().getTime()
    }
  };
};