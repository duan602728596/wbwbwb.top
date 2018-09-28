export default async function(ctx: Object): Promise<void>{
  return {
    title: '登陆 - 微博签到系统',
    initialState: {
      time: new Date().getTime()
    }
  };
};