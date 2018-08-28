/* 公共函数 */
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { Base64 } from 'js-base64';

/**
 * jsonp方法
 * @param { string } uri: 请求地址
 */
export function jsonp(uri: string): Promise{
  let script: Element = document.createElement('script');
  return new Promise((resolve: Function, reject: Function): void=>{
    // callback
    const time: number = new Date().getTime();
    const callbackName: string = `jsonpCallback${ time }`;
    script.src = `${ uri }&callback=${ callbackName }`;
    script.id = callbackName;

    window[callbackName] = (data: Object): void=>{
      resolve(data);
    };
    // load
    const handleScriptLoad: Function = (event: Event): void=>{
      delete window[callbackName];
      script.removeEventListener('load', handleScriptLoad);
      script.removeEventListener('error', handleScriptError);
      document.body.removeChild(script);
      script = null;
    };
    // error
    const handleScriptError: Function = (event: Event): void=>{
      handleScriptLoad();
      reject(event);
    };

    script.addEventListener('load', handleScriptLoad, false);
    script.addEventListener('error', handleScriptError, false);
    document.body.appendChild(script);
  });
}

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

/* 加密和解密 */
const KEY: string = '4NIunU7SnILCUn3T0t0QJS8O1yNrZmxgUWnjUC+MZqsyhZPx0xtIKk7y6CQXZ0D6cq0bTqcprPKVVEK9bmVK8D+P+zIJI5791hq30KS+';
export const encryption: Object = {
  encode(str: string): string{
    const ciphertext: Object = CryptoJS.AES.encrypt(str, KEY);
    return Base64.encode(ciphertext.toString());
  },
  decode(str: string): string{
    const bytes: Object  = CryptoJS.AES.decrypt(Base64.decode(str), KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
};