import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import asyncModule from './asyncModule';
import Index from '../modules/Index/Layout';
import Login from 'bundle-loader?lazy&name=login!../modules/Login/Layout';
import SuperTopicSignIn from 'bundle-loader?lazy&name=super_topic_sign_in!../modules/SuperTopicSignIn/Layout';

const LoginBundle: Function = asyncModule(Login);
const SuperTopicSignInBundle: Function = asyncModule(SuperTopicSignIn);

class Routers extends Component{
  render(): React.Element{
    return (
      <Switch>
        <Route path="/" component={ Index } exact={ true } />
        <Route path="/Index" component={ Index } />
        <Route path="/Login" component={ LoginBundle } />
        <Route path="/SuperTopicSignIn" component={ SuperTopicSignInBundle } />
      </Switch>
    );
  }
}

export default Routers;