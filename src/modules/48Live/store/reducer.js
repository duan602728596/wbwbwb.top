import { handleActions, combineActions } from 'redux-actions';
import { fromJS, Map } from 'immutable';
import listsReducer, * as listsAction from './lists';

const initData = {
  lists: Map({}),
  item: Map({})
};

/* reducer */
const reducer = handleActions({
  [combineActions(...Object.values(listsAction))]: ($$state, action) => {
    return $$state.set('lists', listsReducer($$state.get('lists'), action));
  }
}, fromJS(initData));

export default {
  '48live': reducer
};