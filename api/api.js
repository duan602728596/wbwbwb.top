/* 路由配置 */
const ssoLogin = require('./routers/sso.login');
const apiContainerGetIndex = require('./routers/api.container.getIndex');
const pAjGeneralButton = require('./routers/p.aj.general.button');
const apiContainerFriendShip = require('./routers/api.container.friendShip');
const apiConfig = require('./routers/api.config');
const apiFriendShips = require('./routers/api.friendships');
const fortyEightLive = require('./routers/48.live');
const fortyEightLiveList = require('./routers/48.live.list');
const fortyEightStreamPath = require('./routers/48.live.streamPath');
const apiGeetestInit = require('./routers/geetest.init');
const apiGeetesValidate = require('./routers/geetest.validate');
const apiGeetesCaptcha = require('./routers/geetest.captcha');

function api(router, sweetOptions) {
  ssoLogin(router);
  apiContainerGetIndex(router);
  pAjGeneralButton(router);
  apiContainerFriendShip(router);
  apiConfig(router);
  apiFriendShips(router);
  fortyEightLive(router);
  fortyEightLiveList(router);
  fortyEightStreamPath(router);
  apiGeetestInit(router);
  apiGeetesValidate(router);
  apiGeetesCaptcha(router);
}

module.exports = api;