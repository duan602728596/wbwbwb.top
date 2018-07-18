/* 全局的store */
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Map, fromJS } from 'immutable';
import { createReducer } from './reducers';

/* reducer列表 */
const reducer: Function = createReducer({});

/* 中间件 */
const middlewares: Function = applyMiddleware(thunk);

let store: ?Object = null;

function storeFactory(initialState: ?Object): Object{
  /* initialState */
  const $$initialState: Immutable.Map = Map(fromJS(initialState));

  /* store */
  store = createStore(reducer, $$initialState, compose(middlewares));
  store.asyncReducers = {};

  return store;
}

export default storeFactory;

/* 注入store */
export function injectReducers(asyncReducer: Object): void{
  // 获取reducer的key值，并将reducer保存起来
  let name: ?string = null;
  for(const key: string in asyncReducer){
    name = key;
  }
  // 异步注入reducer
  store.asyncReducers[name] = asyncReducer[name];
  store.replaceReducer(createReducer(store.asyncReducers));
}