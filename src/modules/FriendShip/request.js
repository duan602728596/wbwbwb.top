import axios from 'axios';
import { getUserInformation } from '../../utils';

// 获取数据
export function getFriendShip(page: ?number): Promise{
  const infor: ?Object = getUserInformation();
  const cookie: string = infor.cookie;
  let uri: string = `/api/container/friendShip?cookie=${ cookie }`;
  if(page) uri += `&page=${ page }`;

  return axios({
    url: uri,
    method: 'GET'
  });
}

// 取关和关注
export function apiFriendships(action: string, id: string, st: string, cookie2: string): Promise{
  const infor: ?Object = getUserInformation();
  const cookie: string = `${ infor.cookie }; ${ cookie2 }`;

  return axios({
    url: '/api/friendships',
    method: 'POST',
    data: {
      action,
      id,
      st,
      cookie
    }
  });
}