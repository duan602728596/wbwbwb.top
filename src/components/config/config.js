/* 配置文件 */

if(process.env.NODE_ENV === 'development'){
  module.exports = {
    api: {
      '/sso/login': 'http://localhost:5052/sso/login'
    }
  };
}else{
  module.exports = {
    api: {
      '/sso/login': 'http://5052/sso/login'
    }
  };
}