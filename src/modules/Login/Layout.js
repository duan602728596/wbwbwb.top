import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Page404 from '../../assembly/404/index';
import Index from './Index/index';

class ModuleLayout extends Component {
  render() {
    return (
      <Switch>
        <Route path="/Login" component={ Index } exact={ true } />
        <Route component={ Page404 } />
      </Switch>
    );
  }
}

export default ModuleLayout;