import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Index from './Index/index';
import Description from './Description/index';

@hot(module)
class ModuleLayout extends Component{
  render(): React.Element{
    return (
      <Switch>
        <Route path="/Login" component={ Index } exact={ true } />
        <Route path="/Login/Description" component={ Description } exact={ true } />
      </Switch>
    );
  }
}

export default ModuleLayout;