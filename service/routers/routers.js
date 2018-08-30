/* 路由配置 */
const ssoLogin = require('./api/sso.login');
const apiContainerGetIndex = require('./api/api.container.getIndex');
const pAjGeneralButton = require('./api/p.aj.general.button');
const apiContainerFriendShip = require('./api/api.container.friendShip');
const apiConfig = require('./api/api.config');
const apiFriendShips = require('./api/api.friendships');
const fortyEightLive = require('./api/48.live');
const fortyEightLiveList = require('./api/48.live.list');

function routers(routers){
  ssoLogin(routers);
  apiContainerGetIndex(routers);
  pAjGeneralButton(routers);
  apiContainerFriendShip(routers);
  apiConfig(routers);
  apiFriendShips(routers);
  fortyEightLive(routers);
  fortyEightLiveList(routers);
}

module.exports = routers;