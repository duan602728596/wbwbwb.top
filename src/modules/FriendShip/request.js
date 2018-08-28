import axios from 'axios';
import { getUserInformation, encryption } from '../../utils';

// 获取数据
export function getFriendShip(page: ?number): Promise{
  const infor: ?Object = getUserInformation();
  const cookie: string = infor.cookie;
  let uri: string = '/api/container/friendShip';
  if(page) uri += `?page=${ page }`;

  return axios({
    url: uri,
    method: 'GET',
    headers: {
      _: encryption.encode(cookie)
    }
  });
}

// 取关和关注
export function apiFriendships(action: string, id: string, st: string, cookie2: string): Promise{
  const infor: ?Object = getUserInformation();
  const cookie: string = `${ infor.cookie }; ${ cookie2 }`;

  return axios({
    url: '/api/friendships',
    method: 'POST',
    headers: {
      _: encryption.encode(cookie)
    },
    data: {
      action,
      id,
      st
    }
  });
}