import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

const initData: {
  username: string
} = {
  username: ''
};

/* Action */
export const username: Function = createAction('用户名');

/* reducer */
const reducer: Function = handleActions({
  [username]: ($$state: Immutable.Map, action: Object): Immutable.Map=>{
    return $$state.set('username', action.payload.username);
  }
}, fromJS(initData));

export default {
  index: reducer
};