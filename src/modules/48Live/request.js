import axios from 'axios';

// 刷新
export function getNewData(): Promise{
  return axios.get('/48/live/list');
}

// 加载
export function getReviewListData(lastTime: number): Promise{
  return axios.get(`/48/live/list?lastTime=${ lastTime }&type=reviewList`);
}