import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Title from '../../components/Title/Title';
import Index from './Index/index';

class ModuleLayout extends Component{
  render(): React.childrenArray<React.Element>{
    return [
      <Title key="title">微博自动签到系统</Title>,
      <Switch key="route">
        <Route path="/" component={ Index } exact={ true } />
        <Route path="/Index" component={ Index } exact={ true } />
      </Switch>
    ];
  }
}

export default ModuleLayout;