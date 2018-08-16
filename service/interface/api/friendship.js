const axios = require('axios');
const { apiUri } = require('../../config');

module.exports = async function(ctx){
  const { query } = ctx.request;
  let cards = [];
  let page = null;

  if(query && 'cookie' in query){
    const { data } = await axios({
      url: `${ apiUri }/api/container/friendShip?cookie=${ query.cookie }`,
      method: 'GET'
    });

    const len = data.data.cards.length;
    page = len === 0 ? 'END' : 2;
    cards = len === 0 ? []: data.data.cards[len - 1].card_group;
  }

  return {
    title: '用户关注',
    friendShip: {
      cards,
      page
    }
  };
};