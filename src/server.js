import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter, Switch } from 'react-router';
import { Provider } from 'react-redux';
import Helmet from 'react-helmet';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { storeFactory } from './store/store';
import './common.sass';
import ServerRouters from './router/ServerRouters';

function server(url, context = {}, initialState = {}) {
  const stream = renderToNodeStream(
    <Provider store={ storeFactory(initialState) }>
      <LocaleProvider locale={ zhCN }>
        <StaticRouter location={ url } context={ context }>
          <Switch>
            <ServerRouters />
          </Switch>
        </StaticRouter>
      </LocaleProvider>
    </Provider>
  );
  const helmet = Helmet.renderStatic();

  return stream;
}

export default server;