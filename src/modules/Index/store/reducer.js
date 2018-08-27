import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

const initData: {
  username: string,
  cookie: string,
  isPrompted: boolean
} = {
  username: '',
  cookie: '',
  isPrompted: false // 已经提示
};

/* Action */
export const username: Function = createAction('获取用户名和cookie');
export const prompted: Function = createAction('notification提示信息');

/* reducer */
const reducer: Function = handleActions({
  [username]: ($$state: Immutable.Map, action: Object): Immutable.Map=>{
    const { username, cookie }: {
      username: string,
      cookie: string
    } = action.payload;
    return $$state.set('username', username)
      .set('cookie', cookie);
  },
  [prompted]: ($$state: Immutable.Map, action: Object): Immutable.Map=>{
    return $$state.set('isPrompted', action.payload.data);
  }
}, fromJS(initData));

export default {
  index: reducer
};