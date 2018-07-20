import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import isGoToLogin from '../../components/isGoToLogin/isGoToLogin';
import Index from './Index/index';

@withRouter
class ModuleLayout extends Component{
  static propTypes: Object = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };

  componentDidMount(): void{
    isGoToLogin.call(this);
  }
  render(): React.childrenArray<React.Element>{
    return [
      <Helmet key="helmet">
        <title>微博自动签到系统</title>
      </Helmet>,
      <Switch key="route">
        <Route path="/" component={ Index } exact={ true } />
        <Route path="/Index" component={ Index } exact={ true } />
      </Switch>
    ];
  }
}

export default ModuleLayout;