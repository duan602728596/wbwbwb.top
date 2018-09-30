import axios from 'axios';
import config from '../config';

export default async function(ctx: Object, sweetOptions: Object): Promise<void>{
  const { query }: { query: Object } = ctx.request;
  let cards: [] = [];
  let page: ?string = null;
  let cookie: ?string = null;

  if(query && '_' in query){
    const { data }: { data: Object } = await axios({
      url: `${ config.apiUri(sweetOptions.httpPort) }/api/container/friendShip`,
      method: 'GET',
      headers: {
        _: query._
      }
    });

    const len: number = data.cards.length;
    page = len === 0 ? 'END' : 2;
    cards = len === 0 ? [] : data.cards;
    cookie = data._;
  }

  return {
    title: '用户关注',
    initialState: {
      time: new Date().getTime(),
      friendShip: {
        cards,
        page,
        cookie
      }
    }
  };
}