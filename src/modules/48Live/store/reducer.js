import { handleActions, combineActions } from 'redux-actions';
import { fromJS, Map } from 'immutable';
import listsReducer, * as listsAction from './lists';

const initData: {
  lists: Immutable.Map,
  item: Immutable.Map
} = {
  lists: Map({}),
  item: Map({})
};

/* reducer */
const reducer: Function = handleActions({
  [combineActions(...Object.values(listsAction))]: ($$state: Immutable.Map, action: Object): Immutable.Map=>{
    return $$state.set('lists', listsReducer($$state.get('lists'), action));
  }
}, fromJS(initData));

export default {
  '48live': reducer
};