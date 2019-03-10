/**
 * 异步加载模块
 */
import React from 'react';
import { lazy, Suspense } from 'react';
import { injectReducers } from '../store/store';

/**
 * 异步加载、注入模块和reducer
 * @param { Function } loader: 需要异步注入的模块
 */
function asyncModule(loader) {
  const Module = lazy(loader);

  return () => (
    <Suspense fallback={ null }>
      <Module injectReducers={ injectReducers } />
    </Suspense>
  );
}

export default asyncModule;