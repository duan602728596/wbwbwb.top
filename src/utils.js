/* 公共函数 */
import axios from 'axios';
import _encryption from '../service/encryption/encryption';

/* 加密解密 */
export const encryption: Object = _encryption;

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

/* 当不支持webp时，加载jpg */
// 图片加载提示
export function loadImgIfNotIsSupportedWebP(): void{
  if((typeof isSupportedWebP === 'boolean' && isSupportedWebP === true) || typeof isSupportedWebP !== 'boolean'){
    return void 0;
  }

  const img: HTMLImageElement[] = document.getElementsByTagName('img');

  for(const item: HTMLImageElement of img){
    if(/\.webp$/.test(item.src) || item.src.includes('image/webp')){
      const src: string = item.parentNode.getAttribute('data-src');

      if(src && src !== '') item.src = src;
    }
  }
}