import { handleActions, combineActions } from 'redux-actions';
import { fromJS, Map, List } from 'immutable';
import liveListReducer, * as liveListAction from './lists';

const initData: {
  lists: Immutable.Map
} = {
  lists: Map({})
};

/* reducer */
const reducer: Function = handleActions({
  [combineActions(...Object.values(liveListAction))]: ($$state: Immutable.Map, action: Object): Immutable.Map=>{
    return $$state.set('lists', liveListReducer($$state.get('lists'), action));
  }
}, fromJS(initData));

export default {
  '48live': reducer
};