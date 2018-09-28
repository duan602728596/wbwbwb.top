export default async function(ctx: Object): Promise<void>{
  const { query }: { query: Object } = ctx.request;
  const query2: Object = query || {};

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
}