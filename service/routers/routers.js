/* 路由配置 */
const ssoLogin = require('./api/sso.login');
const apiContainerGetIndex = require('./api/api.container.getIndex');
const pAjGeneralButton = require('./api/p.aj.general.button');
const apiContainerFriendShip = require('./api/api.container.friendShip');

function routers(routers){
  ssoLogin(routers);
  apiContainerGetIndex(routers);
  pAjGeneralButton(routers);
  apiContainerFriendShip(routers);
}

module.exports = routers;