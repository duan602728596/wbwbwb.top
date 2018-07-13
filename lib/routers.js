/* 路由配置 */
const ssoLogin = require('./api/sso.login');

function routers(routers){
  ssoLogin(routers);
}

module.exports = routers;