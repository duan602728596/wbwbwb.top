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

export function geetest(key: string, cookie: string): Promise{
  return axios({
    url: `/api/geetest?&key=${ key }&_=${ cookie }`,
    method: 'GET'
  });
}

export function geetestValidate(key: string, data: Object, cookie: string): Promise{
  return axios({
    url: `/api/geetest/validate?&key=${ key }&_=${ cookie }`,
    method: 'POST',
    data
  });
}

export function geetestCaptcha(key: string, cookie: string): Promise{
  return axios({
    url: `/api/geetest/captcha?key=${ key }&_=${ cookie }`,
    method: 'GET'
  });
}