const axios = require('axios');

function formatData(list) {
  const result = [];

  for (const item of list) {
    const picPath = item.coverPath.split(/,\s*/g);

    result.push({
      liveId: item.liveId,
      title: item.title,
      nickname: item.userInfo.nickname,
      picPath: `https://source.48.cn${ picPath[0] }`,
      startTime: item.ctime,
      type: item.liveType
    });
  }

  return result;
}

/* 获取直播列表 */
async function liveList(ctx, next) {
  try {
    const { query } = ctx.request;
    const lastTime = 'lastTime' in query ? query.lastTime : 0;
    const { data, status } = await axios({
      url: 'https://pocketapi.48.cn/live/api/v1/live/getLiveList',
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
        groupId: 0,
        debug: true,
        next: Number(lastTime),
        record: false
      }
    });

    const body = {};

    if (query.type) {
      body[query.type] = formatData(data.content[query.type]);
    } else {
      body.liveList = formatData(data.content.liveList);
      body.reviewList = [];
    }

    ctx.status = status;
    ctx.body = body;
  } catch (err) {
    ctx.status = 500;
    ctx.body = err;
  }
}

function fortyEightLiveList(router) {
  router.get('/48/live/list', liveList);
}

module.exports = fortyEightLiveList;