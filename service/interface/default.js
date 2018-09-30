export default async function(ctx: Object, sweetOptions: Object): Promise<void>{
  return {
    title: '微博签到系统',
    initialState: {
      time: new Date().getTime()
    }
  };
}