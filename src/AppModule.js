import React, { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import storeFactory from './store/store';
import './common.sass';
import Routers from './router/Routers';

/* 热替换 */
@hot(module)
class App extends Component{
  render(): React.Element{
    return (
      <Provider store={ storeFactory(window.__INITIAL_STATE__) }>
        <BrowserRouter>
          <Switch>
            <Routers />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;