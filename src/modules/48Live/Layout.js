import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Helmet from 'react-helmet';
import Page404 from '../../assembly/404/index';
import Index from './Index/index';
import Item from './Item/index';

@hot(module)
class ModuleLayout extends Component{
  render(): React.ChildrenArray<React.Element>{
    return (
      <Switch key="route">
        <Route path="/48Live" component={ Index } exact={ true } />
        <Route path="/48Live/Item" component={ Item } exact={ true } />
        <Route component={ Page404 } />
      </Switch>
    );
  }
}

export default ModuleLayout;
export reducer from './store/reducer';