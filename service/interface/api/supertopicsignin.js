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

    const { cardlistInfo } = data.data;
    sinceId = 'since_id' in cardlistInfo ? cardlistInfo.since_id : 'END';
    cards = data.data.cards[0].card_group;
  }

  return {
    title: '超级话题签到',
    superTopicSignIn: {
      cards,
      sinceId
    }
  };
};