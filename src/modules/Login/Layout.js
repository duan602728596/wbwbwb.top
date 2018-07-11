import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Index from './Index/index';

@hot(module)
class ModuleLayout extends Component{
  render(): React.Element{
    return (
      <Switch>
        <Route path="/Login" component={ Index } exact={ true } />
      </Switch>
    );
  }
}

export default ModuleLayout;