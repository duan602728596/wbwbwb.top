import { createAction, handleActions } from 'redux-actions';
import { List } from 'immutable';

/* Action */
export const dataList: Function = createAction('口袋48直播列表和回放列表');
export const reviewList: Function = createAction('口袋48回放列表');

/* reducer */
const reducer: Function = handleActions({
  [dataList]: ($$state: Immutable.Map, action: Object): Immutable.Map=>{
    return $$state.set('liveList', List(action.payload.liveList))
      .set('reviewList', List(action.payload.reviewList));
  },
  [reviewList]: ($$state: Immutable.Map, action: Object): Immutable.Map=>{
    return $$state.set('reviewList', List(action.payload.data));
  }
}, {});

export default reducer;