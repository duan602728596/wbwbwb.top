/* 路由配置 */
const ssoLogin = require('./api/sso.login');
const apiContainerGetIndex = require('./api/api.container.getIndex');

function routers(routers){
  ssoLogin(routers);
  apiContainerGetIndex(routers);
}

module.exports = routers;