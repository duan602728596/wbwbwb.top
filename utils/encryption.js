/**
 * 加密和解密
 * 为了兼容而使用es5语法
 */

/* eslint-disable no-var */
var CryptoJS = require('crypto-js');
var { Base64 } = require('js-base64');

var key = 'key';
/* eslint-disable no var */

exports.encode = function(str) {
  return Base64.encode(CryptoJS.AES.encrypt(str, key).toString());
};

exports.decode = function(str) {
  return CryptoJS.AES.decrypt(Base64.decode(str), key).toString(CryptoJS.enc.Utf8);
};