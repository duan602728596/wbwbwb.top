const axios = require('axios');
const config = require('../utils/config');

module.exports = async function(ctx, sweetOptions) {
  const { query } = ctx.request;
  let cards = [];
  let page = null;
  let cookie = null;

  if (query && '_' in query) {
    const { data } = await axios({
      url: `${ config.apiUri(sweetOptions.httpPort) }/api/container/friendShip`,
      method: 'GET',
      headers: {
        _: query._
      }
    });

    const len = data.cards.length;

    page = len === 0 ? 'END' : 2;
    cards = len === 0 ? [] : data.cards;
    cookie = data._;
  }

  return {
    title: '用户关注',
    initialState: {
      time: new Date().getTime(),
      friendShip: {
        cards,
        page,
        cookie
      }
    }
  };
};