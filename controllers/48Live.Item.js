module.exports = function(ctx, sweetOptions) {
  const { query } = ctx.request;
  const query2 = query || {};

  return {
    title: `${ query2.subTitle } - ${ query2.title }`,
    initialState: {
      time: new Date().getTime(),
      '48live': {
        item: {
          title: query2.title,
          subTitle: query2.subTitle,
          streamPath: query2.streamPath,
          picPath: query2.picPath
        }
      }
    }
  };
};