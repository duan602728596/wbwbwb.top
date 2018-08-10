import axios from 'axios';
import { getUserInformation } from '../../utils';

// 获取数据
export function getSuperTopicList(sinceId: ?string): Promise{
  const infor: ?Object = getUserInformation();
  const cookie: string = infor.cookie;
  let uri: string = `/api/container/getIndex?cookie=${ cookie }`;
  if(sinceId) uri += `&since_id=${ sinceId }`;

  return axios({
    url: uri,
    method: 'GET'
  });
}

// 签到
export function signin(containerid: string): Promise{
  const infor: ?Object = getUserInformation();
  const cookie: string = infor.cookie;
  return axios({
    url: '/p/aj/general/button',
    method: 'POST',
    data: {
      cookie,
      containerid
    }
  });
}