const axios = require('axios');

async function getStreamPath(ctx, next) {
  try {
    const { query } = ctx.request;
    const res = await axios({
      url: 'https://pocketapi.48.cn/live/api/v1/live/getLiveOne',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        appInfo: JSON.stringify({
          vendor: 'apple',
          deviceId: '',
          appVersion: '6.0.0',
          appBuild: '190409',
          osVersion: '11.4.1',
          osType: 'ios',
          deviceName: 'iPhone 6s',
          os: 'ios'
        })
      },
      data: {
        liveId: query.liveId
      }
    });

    ctx.status = res.status;
    ctx.body = {
      streamPath: res.data.content.playStreamPath
    };
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
  }
}

function fortyEightStreamPath(router) {
  router.get('/48/live/streamPath', getStreamPath);
}

module.exports = fortyEightStreamPath;