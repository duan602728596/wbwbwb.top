import axios from 'axios';
import { apiUri } from '../config';

export default async function(ctx: Object): Promise<void>{
  const { data } = await axios({
    url: `${ apiUri }/48/live/list`,
    method: 'GET'
  });

  return {
    title: '口袋48成员直播',
    initialState: {
      time: new Date().getTime(),
      '48live': {
        lists: data
      }
    }
  };
}