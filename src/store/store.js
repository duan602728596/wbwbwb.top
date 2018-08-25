/* 全局的store */
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Map, fromJS } from 'immutable';
import { createReducer } from './reducers';

/* reducer列表 */
const reducer: Function = createReducer({});

/* 中间件 */
const middlewares: Function = applyMiddleware(thunk);

const store: Object = {
  asyncReducers: {}
};

export function storeFactory(initialState: ?Object): Object{
  /* initialState */
  const $$initialState: Immutable.Map = Map(fromJS(initialState));

  /* store */
  Object.assign(store, createStore(reducer, $$initialState, compose(middlewares)));

  return store;
}

export default store;

/* 注入store */
export function injectReducers(asyncReducer: Object): void{
  // 获取reducer的key值，并将reducer保存起来
  const name: string = Object.keys(asyncReducer);
  // 异步注入reducer
  store.asyncReducers[name] = asyncReducer[name];
  store.replaceReducer(createReducer(store.asyncReducers));
}