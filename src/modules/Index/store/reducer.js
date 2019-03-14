import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

const initData = {
  username: '',
  cookie: '',
  isPrompted: false // 已经提示
};

/* Action */
export const username = createAction('获取用户名和cookie');
export const prompted = createAction('notification提示信息');

/* reducer */
const reducer = handleActions({
  [username]: ($$state, action) => {
    const { username, cookie } = action.payload;

    return $$state.set('username', username)
      .set('cookie', cookie);
  },
  [prompted]: ($$state, action) => {
    return $$state.set('isPrompted', action.payload.data);
  }
}, fromJS(initData));

export default {
  index: reducer
};