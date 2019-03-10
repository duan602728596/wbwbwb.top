import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import asyncModule from './asyncModule';
import Index from '../modules/Index/Layout';
import Page404 from '../assembly/404/index';

const LoginBundle = asyncModule(() => import('../modules/Login/Layout'));
const SuperTopicSignInBundle = asyncModule(() => import('../modules/SuperTopicSignIn/Layout'));
const FriendShipBundle = asyncModule(() => import('../modules/FriendShip/Layout'));
const FortyEightLiveBundle = asyncModule(() => import('../modules/48Live/Layout'));

class Routers extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={ Index } exact={ true } />
        <Route path="/Index" component={ Index } />
        <Route path="/Login" component={ LoginBundle } />
        <Route path="/SuperTopicSignIn" component={ SuperTopicSignInBundle } />
        <Route path="/FriendShip" component={ FriendShipBundle } />
        <Route path="/48Live" component={ FortyEightLiveBundle } />
        <Route component={ Page404 } />
      </Switch>
    );
  }
}

export default Routers;