const axios = require('axios');
const mime = require('mime-types');

async function live(ctx, next){
  const { query } = ctx.request;

  if('url' in query){
    const { data, status } = await axios({
      url: query.url,
      method: 'GET',
      responseType: 'stream'
    });

    ctx.type = mime.lookup(query.url);
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