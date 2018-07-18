import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

const initData: {
  username: string,
  cookie: string
} = {
  username: '',
  cookie: ''
};

/* Action */
export const username: Function = createAction('获取用户名和cookie');

/* reducer */
const reducer: Function = handleActions({
  [username]: ($$state: Immutable.Map, action: Object): Immutable.Map=>{
    const { username, cookie }: {
      username: string,
      cookie: string
    } = action.payload;
    return $$state.set('username', username)
      .set('cookie', cookie);
  }
}, fromJS(initData));

export default {
  index: reducer
};