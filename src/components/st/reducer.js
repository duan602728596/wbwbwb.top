import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

const initData: {
  st: ?string,
  cookie: ?string
} = {
  st: null,
  cookie: null
};

/* Action */
export const st: Function = createAction('微博st', (data: any): any => data);

/* reducer */
const reducer: Function = handleActions({
  [st]: ($$state: Immutable.Map, action: Object): Immutable.Map=>{
    const { st, cookie }: {
      st: string,
      cookie: string
    } = action.payload;
    console.log(action);
    return $$state.set('st', st)
      .set('cookie', cookie);
  }
}, fromJS(initData));

export default {
  st: reducer
};