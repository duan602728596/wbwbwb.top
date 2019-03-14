import axios from 'axios';

// 刷新
export function getNewData() {
  return axios.get('/48/live/list');
}

// 加载
export function getReviewListData(lastTime) {
  return axios.get(`/48/live/list?lastTime=${ lastTime }&type=reviewList`);
}