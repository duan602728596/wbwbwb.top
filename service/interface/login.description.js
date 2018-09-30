export default async function(ctx: Object, sweetOptions: Object): Promise<void>{
  return {
    title: '网站说明',
    initialState: {
      time: new Date().getTime()
    }
  };
}