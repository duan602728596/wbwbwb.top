import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { Helmet } from 'react-helmet';
import Index from './Index/index';

@hot(module)
class ModuleLayout extends Component{
  render(): React.childrenArray<React.Element>{
    return [
      <Helmet key="helmet">
        <title>登陆 - 微博自动签到系统</title>
      </Helmet>,
      <Switch key="route">
        <Route path="/Login" component={ Index } exact={ true } />
      </Switch>
    ];
  }
}

export default ModuleLayout;