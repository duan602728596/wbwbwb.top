import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import reducer from './store/reducer';
import Page404 from '../../assembly/404/index';
import Index from './Index/index';
import Item from './Item/index';

@hot(module)
class ModuleLayout extends Component{
  static propTypes: Object = {
    injectReducers: PropTypes.func
  };

  constructor(): void{
    super(...arguments);

    this.props.injectReducers && this.props.injectReducers(reducer);
  }
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