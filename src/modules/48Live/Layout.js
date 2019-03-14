import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import loadReducer from '../../store/loadReducer';
import reducer from './store/reducer';
import Page404 from '../../assembly/404/index';
import Index from './Index/index';
import Item from './Item/index';

@loadReducer(reducer)
class ModuleLayout extends Component {
  render() {
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