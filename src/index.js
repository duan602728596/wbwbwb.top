import React from 'react';
import { hydrate } from 'react-dom';
import App from './App';

/* app */
hydrate(
  <App />,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}