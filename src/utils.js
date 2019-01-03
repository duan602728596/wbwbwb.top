/* 公共函数 */
import axios from 'axios';

/* 获取用户信息 */
export const USER_INFORMATION: string = 'userInformation';
export function getUserInformation(): ?Object{
  const lUserInformation: ?string = localStorage.getItem(USER_INFORMATION);
  if(lUserInformation){
    return JSON.parse(lUserInformation);
  }
  const sUserInformation: ?string = sessionStorage.getItem(USER_INFORMATION);
  return sUserInformation ? JSON.parse(sUserInformation) : null;
}

/* 加密解密 */
import _encryption from '../service/encryption/encryption';
export const encryption: Object = _encryption;

/* 获取st */
export function getSt(): Promise{
  const infor: ?Object = getUserInformation();
  const cookie: string = infor.cookie;
  return axios({
    url: '/api/config',
    method: 'GET',
    headers: {
      _: encryption.encode(cookie)
    }
  });
}

/* 加载webp */
export function loadWebP(webp: string, img: string): string{
  if((typeof isSupportedWebP === 'boolean' && isSupportedWebP === true) || typeof isSupportedWebP !== 'boolean'){
    return webp;
  }else{
    return img;
  }
}

/* qs */
export function getQuery(url: string): Object{
  const urlArr: string[] = url.split('?');
  const result: Object = {};

  if(url.length > 1){
    const q: string[] = urlArr[1].split('&');

    for(const item: string of q){
      const g: string[] = item.split('=');
      result[g[0]] = g[1];
    }

  }

  return result;
}