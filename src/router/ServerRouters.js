/* 服务器端渲染组件 */
import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Index from '../modules/Index/Layout';
import Login from '../modules/Login/Layout';
import SuperTopicSignIn from '../modules/SuperTopicSignIn/Layout';

class ServerRouters extends Component{
  render(): React.Element{
    return (
      <Switch>
        <Route path="/" component={ Index } exact={ true } />
        <Route path="/Index" component={ Index } />
        <Route path="/Login" component={ Login } />
        <Route path="/SuperTopicSignIn" component={ SuperTopicSignIn } />
      </Switch>
    );
  }
}

export default ServerRouters;