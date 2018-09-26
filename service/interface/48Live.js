const axios = require('axios');
const { apiUri } = require('../config');

module.exports = async function(ctx){
  const { data } = await axios({
    url: `${ apiUri }/48/live/list`,
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