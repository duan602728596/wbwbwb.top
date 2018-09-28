/* 路由配置 */
import ssoLogin from './routers/sso.login';
import apiContainerGetIndex from './routers/api.container.getIndex';
import pAjGeneralButton from './routers/p.aj.general.button';
import apiContainerFriendShip from './routers/api.container.friendShip';
import apiConfig from './routers/api.config';
import apiFriendShips from './routers/api.friendships';
import fortyEightLive from './routers/48.live';
import fortyEightLiveList from './routers/48.live.list';

function routers(routers: Object): void{
  ssoLogin(routers);
  apiContainerGetIndex(routers);
  pAjGeneralButton(routers);
  apiContainerFriendShip(routers);
  apiConfig(routers);
  apiFriendShips(routers);
  fortyEightLive(routers);
  fortyEightLiveList(routers);
}

export default routers;