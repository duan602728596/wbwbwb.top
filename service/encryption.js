/* 加密和解密 */
const CryptoJS = require("crypto-js");
const { Base64 } = require('js-base64');

const KEY = '4NIunU7SnILCUn3T0t0QJS8O1yNrZmxgUWnjUC+MZqsyhZPx0xtIKk7y6CQXZ0D6cq0bTqcprPKVVEK9bmVK8D+P+zIJI5791hq30KS+';

function encode(str){
  const ciphertext = CryptoJS.AES.encrypt(str, KEY);
  return Base64.encode(ciphertext.toString());
}

function decode(str){
  const bytes  = CryptoJS.AES.decrypt(Base64.decode(str), KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = {
  encode,
  decode
};