/**
 * 加密和解密
 * 为了兼容而使用es5语法
 */
import CryptoJS from 'crypto-js';
import { Base64 } from 'js-base64';

const key: string = 'key';

export function encode(str: string): string{
  return Base64.encode(CryptoJS.AES.encrypt(str, key).toString());
}

export function decode(str: string): string{
  return CryptoJS.AES.decrypt(Base64.decode(str), key).toString(CryptoJS.enc.Utf8);
}

export default {
  encode,
  decode
};