import axios from 'axios';
import { getUserInformation, encryption } from '../../utils';

// 获取数据
export function getFriendShip(page) {
  const infor = getUserInformation();
  const cookie = infor.cookie;
  let uri = '/api/container/friendShip';

  if (page) uri += `?page=${ page }`;

  return axios({
    url: uri,
    method: 'GET',
    headers: {
      _: encryption.encode(cookie)
    }
  });
}

// 取关和关注
export function apiFriendships(action, id, st, cookie2) {
  const infor = getUserInformation();
  const cookie = `${ infor.cookie }; ${ cookie2 }`;

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