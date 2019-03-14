const axios = require('axios');

function formatData(list) {
  const result = [];

  for (const item of list) {
    const picPath = item.picPath.split(/,\s*/g);

    result.push({
      liveId: item.liveId,
      title: item.title,
      subTitle: item.subTitle,
      picPath: `https://source3.48.cn${ picPath[0] }`,
      streamPath: item.streamPath,
      startTime: item.startTime
    });
  }

  return result;
}

async function liveList(ctx, next) {
  const { query } = ctx.request;
  const lastTime = 'lastTime' in query ? query.lastTime : 0;
  const { data, status } = await axios({
    url: 'https://plive.48.cn/livesystem/api/live/v1/memberLivePage',
    method: 'POST',
    headers: {
      os: 'android',
      IMEI: '123456789',
      version: '4.0.4',
      'Content-Type': 'application/json'
    },
    data: {
      lastTime: Number(lastTime),
      limit: 20,
      groupId: 0,
      memberId: 0,
      type: 0,
      giftUpdTime: 1490857731000
    }
  });

  const body = {};

  if (query.type) {
    body[query.type] = formatData(data.content[query.type]);
  } else {
    body.liveList = formatData(data.content.liveList);
    body.reviewList = formatData(data.content.reviewList);
  }

  ctx.status = status;
  ctx.body = body;
}

function fortyEightLiveList(router) {
  router.get('/48/live/list', liveList);
}

export default fortyEightLiveList;