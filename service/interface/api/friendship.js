const axios = require('axios');
const { apiUri } = require('../../config');

module.exports = async function(ctx){
  const { query } = ctx.request;
  let cards = [];
  let page = null;
  let cookie = null;

  if(query && 'cookie' in query){
    const { data } = await axios({
      url: `${ apiUri }/api/container/friendShip?cookie=${ query.cookie }`,
      method: 'GET'
    });

    const len = data.cards.length;
    page = len === 0 ? 'END' : 2;
    cards = len === 0 ? []: data.cards;
    cookie = data.cookie;
  }

  return {
    title: '用户关注',
    friendShip: {
      cards,
      page,
      cookie
    }
  };
};