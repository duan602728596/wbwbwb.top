import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import isGoToLogin from '../../components/isGoToLogin/isGoToLogin';
import Page404 from '../../assembly/404/index';
import Index from './Index/index';

@withRouter
class ModuleLayout extends Component {
  componentDidMount() {
    isGoToLogin.call(this);
  }

  render() {
    return [
      <Helmet key="helmet">
        <title>微博签到系统</title>
      </Helmet>,
      <Switch key="route">
        <Route path="/" component={ Index } exact={ true } />
        <Route path="/Index" component={ Index } exact={ true } />
        <Route component={ Page404 } />
      </Switch>
    ];
  }
}

export default ModuleLayout;