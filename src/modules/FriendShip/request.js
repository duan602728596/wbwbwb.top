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