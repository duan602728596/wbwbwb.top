import axios from 'axios';
import { jsonp } from '../../utils';

// 登陆
export function login(data: Object): Promise{
  return axios({
    url: '/sso/login',
    method: 'POST',
    data
  });
}

// 初始化验证
export function geetest(key: string, cookie: string): Promise{
  return axios({
    url: `/api/geetest?&key=${ key }&_=${ cookie }`,
    method: 'GET'
  });
}

// 验证ing
export function geetestValidate(key: string, data: Object, cookie: string): Promise{
  return axios({
    url: `/api/geetest/validate?&key=${ key }&_=${ cookie }`,
    method: 'POST',
    data
  });
}

// 验证后的一系列操作
export function geetestCaptcha(key: string, cookie: string): Promise{
  return axios({
    url: `/api/geetest/captcha?key=${ key }&_=${ cookie }`,
    method: 'GET'
  });
}