import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Switch } from 'react-router';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import storeFactory from './store/store';
import './common.sass';
import ServerRouters from './router/ServerRouters';

function server(url: string, context: Object = {}, initialState: Object): string{
  const htmlString: string = renderToString(
    <Provider store={ storeFactory(initialState) }>
      <StaticRouter location={ url } context={ context }>
        <Switch>
          <ServerRouters />
        </Switch>
      </StaticRouter>
    </Provider>
  );
  const helmet: any = Helmet.renderStatic();
  return htmlString;
}

export default server;