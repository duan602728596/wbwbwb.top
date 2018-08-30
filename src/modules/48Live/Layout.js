import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Page404 from '../../assembly/404/index';
import Index from './Index/index';

@hot(module)
class ModuleLayout extends Component{
  render(): React.Element{
    return (
      <Switch>
        <Route path="/48Live" component={ Index } exact={ true } />
        <Route component={ Page404 } />
      </Switch>
    );
  }
}

export default ModuleLayout;
export reducer from './store/reducer';