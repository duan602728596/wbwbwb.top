const axios = require('axios');
const { apiUri } = require('../../config');

module.exports = async function(ctx){
  const { query } = ctx.request;
  let cards = [];
  let sinceId = null;

  if(query && 'cookie' in query){
    const { data } = await axios({
      url: `${ apiUri }/api/container/getIndex?cookie=${ query.cookie }`,
      method: 'GET'
    });

    sinceId = 'since_id' in data && data.since_id ? data.since_id : 'END';
    cards = data.cards;
  }

  return {
    title: '超级话题签到',
    superTopicSignIn: {
      cards,
      sinceId
    }
  };
};