import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './AppModule';

/* app */
ReactDOM.hydrate(
  <App />,
  document.getElementById('react-app')
);

if(module.hot){
  module.hot.accept();
}