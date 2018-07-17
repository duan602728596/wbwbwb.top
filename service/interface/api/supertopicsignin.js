const axios = require('axios');
const { apiUri } = require('../../utils');

module.exports = async function(ctx){
  const { querystring } = ctx.request;
  let cards = [];
  let signId = null;

  if(querystring.length > 0){
    const { data } = await axios({
      url: `${ apiUri }/api/container/getIndex?${ querystring }`,
      method: 'GET'
    });

    signId = data.data.cardlistInfo.since_id;
    cards = data.data.cards[0].card_group;
  }

  return {
    title: '超级话题签到',
    superTopicSignIn: {
      cards,
      signId
    }
  };
};