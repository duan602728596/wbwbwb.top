const axios = require('axios');
const { apiUri } = require('../config');

module.exports = async function(ctx){
  const { query } = ctx.request;
  let cards = [];
  let sinceId = null;

  if(query && '_' in query){
    const { data } = await axios({
      url: `${ apiUri }/api/container/getIndex`,
      method: 'GET',
      headers: {
        _: query._
      }
    });

    sinceId = 'since_id' in data && data.since_id ? data.since_id : 'END';
    cards = data.cards;
  }

  return {
    title: '超级话题签到',
    initialState: {
      time: new Date().getTime(),
      superTopicSignIn: {
        cards,
        sinceId
      }
    }
  };
};