module.exports = function(ctx, sweetOptions) {
  const { query } = ctx.request;
  const query2 = query || {};

  return {
    title: `${ query2.title } - ${ query2.nickname }`,
    initialState: {
      time: new Date().getTime(),
      '48live': {
        item: {
          title: query2.title,
          nickname: query2.nickname,
          picPath: query2.picPath,
          liveId: query2.liveId
        }
      }
    }
  };
};