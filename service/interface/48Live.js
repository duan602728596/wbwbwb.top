const axios = require('axios');
const config = require('../config');

module.exports = async function(ctx, sweetOptions) {
  const { data } = await axios({
    url: `${ config.apiUri(sweetOptions.httpPort) }/48/live/list`,
    method: 'GET'
  });

  return {
    title: '口袋48成员直播',
    initialState: {
      time: new Date().getTime(),
      '48live': {
        lists: data
      }
    }
  };
};