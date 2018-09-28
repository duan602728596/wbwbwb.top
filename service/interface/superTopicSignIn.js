import axios from 'axios';
import { apiUri } from '../config';

export default async function(ctx: Object): Promise<void>{
  const { query }: { query: Object } = ctx.request;
  let cards: [] = [];
  let sinceId: ?string = null;

  if(query && '_' in query){
    const { data }: { data: Object } = await axios({
      url: `${ apiUri }/api/container/getIndex`,
      method: 'GET',
      headers: {
        _: query._
      }
    });

    sinceId = 'since_id' in data && data.since_id ? data.since_id : 'END';
    cards = data.cards;
  }

  return {
    title: '超级话题签到',
    initialState: {
      time: new Date().getTime(),
      superTopicSignIn: {
        cards,
        sinceId
      }
    }
  };
}