import { combineReducers } from 'redux-immutable';
import stReducer from '../components/st/reducer';
import indexReducer from '../modules/Index/store/reducer';

/* reducers */
const reducers: Object = {
  ...stReducer,
  ...indexReducer
};

/* 创建reducer */
export function createReducer(asyncReducers: Object): Function{
  return combineReducers({
    ...reducers,
    ...asyncReducers
  });
}