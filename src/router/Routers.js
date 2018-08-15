import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import asyncModule from './asyncModule';
import Index from '../modules/Index/Layout';
import Page404 from '../assembly/404/index';

const LoginBundle: Function = asyncModule((): Promise => import('../modules/Login/Layout'));
const SuperTopicSignInBundle: Function = asyncModule((): Promise => import('../modules/SuperTopicSignIn/Layout'));
const FriendShipBundle: Function = asyncModule((): Promise => import('../modules/FriendShip/Layout'));

class Routers extends Component{
  render(): React.Element{
    return (
      <Switch>
        <Route path="/" component={ Index } exact={ true } />
        <Route path="/Index" component={ Index } />
        <Route path="/Login" component={ LoginBundle } />
        <Route path="/SuperTopicSignIn" component={ SuperTopicSignInBundle } />
        <Route path="/FriendShip" component={ FriendShipBundle } />
        <Route component={ Page404 } />
      </Switch>
    );
  }
}

export default Routers;