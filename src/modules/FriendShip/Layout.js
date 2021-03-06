import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import loadReducer from '../../store/loadReducer';
import reducer from './store/reducer';
import isGoToLogin from '../../components/isGoToLogin/isGoToLogin';
import Page404 from '../../assembly/404/index';
import Index from './Index/index';

@loadReducer(reducer)
@withRouter
class ModuleLayout extends Component {
  componentDidMount() {
    isGoToLogin.call(this);
  }

  render() {
    return [
      <Helmet key="helmet">
        <title>用户关注</title>
      </Helmet>,
      <Switch key="route">
        <Route path="/FriendShip" component={ Index } exact={ true } />
        <Route component={ Page404 } />
      </Switch>
    ];
  }
}

export default ModuleLayout;