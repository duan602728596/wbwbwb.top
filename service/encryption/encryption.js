/**
 * 加密和解密
 * 为了兼容而使用es5语法
 */
var CryptoJS = require("crypto-js");
var { Base64 } = require('js-base64');

var key = 'key';

function encode(str){
  return Base64.encode(CryptoJS.AES.encrypt(str, key).toString());
}

function decode(str){
  return CryptoJS.AES.decrypt(Base64.decode(str), key).toString(CryptoJS.enc.Utf8);
}

module.exports = {
  encode: encode,
  decode: decode
};