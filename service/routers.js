/* 路由配置 */
const ssoLogin = require('./routers/sso.login');
const apiContainerGetIndex = require('./routers/api.container.getIndex');
const pAjGeneralButton = require('./routers/p.aj.general.button');
const apiContainerFriendShip = require('./routers/api.container.friendShip');
const apiConfig = require('./routers/api.config');
const apiFriendShips = require('./routers/api.friendships');
const fortyEightLive = require('./routers/48.live');
const fortyEightLiveList = require('./routers/48.live.list');

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