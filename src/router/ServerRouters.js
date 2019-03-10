/* 服务器端渲染组件 */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Index from '../modules/Index/Layout';
import Login from '../modules/Login/Layout';
import SuperTopicSignIn from '../modules/SuperTopicSignIn/Layout';
import FriendShip from '../modules/FriendShip/Layout';
import FortyEightLive from '../modules/48Live/Layout';
import Page404 from '../assembly/404/index';

class ServerRouters extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={ Index } exact={ true } />
        <Route path="/Index" component={ Index } />
        <Route path="/Login" component={ Login } />
        <Route path="/SuperTopicSignIn" component={ SuperTopicSignIn } />
        <Route path="/FriendShip" component={ FriendShip } />
        <Route path="/48Live" component={ FortyEightLive } />
        <Route component={ Page404 } />
      </Switch>
    );
  }
}

export default ServerRouters;