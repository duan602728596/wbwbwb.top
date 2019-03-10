/**
 * 加密和解密
 * 为了兼容而使用es5语法
 */
const CryptoJS = require('crypto-js');
const { Base64 } = require('js-base64');

const key = 'key';

exports.encode = function(str) {
  return Base64.encode(CryptoJS.AES.encrypt(str, key).toString());
};

exports.decode = function(str) {
  return CryptoJS.AES.decrypt(Base64.decode(str), key).toString(CryptoJS.enc.Utf8);
};