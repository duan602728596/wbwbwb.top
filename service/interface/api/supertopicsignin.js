const axios = require('axios');
const { apiUri } = require('../../config');

module.exports = async function(ctx){
  const { querystring } = ctx.request;
  let cards = [];
  let sinceId = null;

  if(querystring.length > 0){
    const { data } = await axios({
      url: `${ apiUri }/api/container/getIndex?${ querystring }`,
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