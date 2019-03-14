import axios from 'axios';
import { getUserInformation, encryption } from '../../utils';

// 获取数据
export function getSuperTopicList(sinceId) {
  const infor = getUserInformation();
  const cookie = infor.cookie;
  let uri = '/api/container/getIndex';

  if (sinceId) uri += `?since_id=${ sinceId }`;

  return axios({
    url: uri,
    method: 'GET',
    headers: {
      _: encryption.encode(cookie)
    }
  });
}

// 签到
export function signin(containerid) {
  const infor = getUserInformation();
  const cookie = infor.cookie;

  return axios({
    url: '/p/aj/general/button',
    method: 'POST',
    headers: {
      _: encryption.encode(cookie)
    },
    data: {
      cookie,
      containerid
    }
  });
}