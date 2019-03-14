/* 公共函数 */
import axios from 'axios';
import _encryption from '../service/encryption/encryption';

/* 加密解密 */
export const encryption = _encryption;

/* 获取用户信息 */
export const USER_INFORMATION = 'userInformation';
export function getUserInformation() {
  const lUserInformation = localStorage.getItem(USER_INFORMATION);

  if (lUserInformation) {
    return JSON.parse(lUserInformation);
  }
  const sUserInformation = sessionStorage.getItem(USER_INFORMATION);

  return sUserInformation ? JSON.parse(sUserInformation) : null;
}

/* 获取st */
export function getSt() {
  const infor = getUserInformation();
  const cookie = infor.cookie;

  return axios({
    url: '/api/config',
    method: 'GET',
    headers: {
      _: encryption.encode(cookie)
    }
  });
}

/* 加载webp */
export function loadWebP(webp, img) {
  if ((typeof isSupportedWebP === 'boolean' && isSupportedWebP === true) || typeof isSupportedWebP !== 'boolean') {
    return webp;
  } else {
    return img;
  }
}

/* qs */
export function getQuery(url) {
  const urlArr = url.split('?');
  const result = {};

  if (url.length > 1) {
    const q = urlArr[1].split('&');

    for (const item of q) {
      const g = item.split('=');

      result[g[0]] = g[1];
    }

  }

  return result;
}

/* 当不支持webp时，加载jpg */
// 图片加载提示
export function loadImgIfNotIsSupportedWebP() {
  if ((typeof isSupportedWebP === 'boolean' && isSupportedWebP === true) || typeof isSupportedWebP !== 'boolean') {
    return void 0;
  }

  const img = document.getElementsByTagName('img');

  for (const item of img) {
    if (/\.webp$/.test(item.src) || item.src.includes('image/webp')) {
      const src = item.parentNode.getAttribute('data-src');

      if (src && src !== '') item.src = src;
    }
  }
}