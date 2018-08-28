/* 加密和解密 */
const CryptoJS = require("crypto-js");
const { Base64 } = require('js-base64');
const key = require('./key');

function encode(str){
  const ciphertext = CryptoJS.AES.encrypt(str, key);
  return Base64.encode(ciphertext.toString());
}

function decode(str){
  const bytes  = CryptoJS.AES.decrypt(Base64.decode(str), key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = {
  encode,
  decode
};