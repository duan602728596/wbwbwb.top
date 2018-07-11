import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

const initData: {} = {};

/* Action */
export const text: Function = createAction('首页');

/* reducer */
const reducer: Function = handleActions({
  [text]: ($$state: Immutable.Map, action: Object): Immutable.Map=>{
    return $$state.set('text', action.payload.text);
  }
}, fromJS(initData));

export default {
  index: reducer
};