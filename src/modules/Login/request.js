import axios from 'axios';
import { jsonp } from '../../utils';

// 判断是否需要验证码
export function prelogin(usernameBase64: string): Promise{
  return jsonp(`https://login.sina.com.cn/sso/prelogin.php?checkpin=1&entry=mweibo&su=${ usernameBase64 }`);
}

// 获取验证码
export function pattern(username: string): Promise{
  const uri: string = 'https://captcha.weibo.com/api/pattern/get?'
    + `ver=1.0.0&source=ssologin&usrname=${ username }&line=160&side=100&radius=30&_rnd=${ Math.random() }`;
  return jsonp(uri);
}

// 验证验证码
export function verify(id: string, username: string, pathEnc: string, dataEnc: string): Promise{
  const uri: string = 'https://captcha.weibo.com/api/pattern/verify?ver=1.0.0&source=ssologin'
    + `&id=${ id }&usrname=${ username }&path_enc=${ pathEnc }&data_enc=${ dataEnc }`;
  return jsonp(uri);
}

// 登陆
export function login(data: Object): Promise{
  return axios({
    url: '/sso/login',
    method: 'POST',
    data
  });
}