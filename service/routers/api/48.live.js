const axios = require('axios');

async function live(ctx, next){
  const { query } = ctx.request;

  if('url' in query){
    const { data, status } = await axios({
      url: query.url,
      method: 'GET',
      responseType: 'stream'
    });

    ctx.append('Connection', 'keep-alive');
    ctx.append('Content-Type', 'application/octet-stream');
    ctx.status = status;
    ctx.body = data;
  }else{
    ctx.status = 404;
  }
}

function fortyEightLive(router){
  router.get('/48/live', live);
}

module.exports = fortyEightLive;