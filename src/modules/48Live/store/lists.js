import { createAction, handleActions } from 'redux-actions';
import { List } from 'immutable';

/* Action */
export const dataList = createAction('口袋48直播列表和回放列表');
export const reviewList = createAction('口袋48回放列表');

/* reducer */
const reducer = handleActions({
  [dataList]: ($$state, action) => {
    return $$state.set('liveList', List(action.payload.liveList))
      .set('reviewList', List(action.payload.reviewList));
  },
  [reviewList]: ($$state, action) => {
    return $$state.set('reviewList', List(action.payload.data));
  }
}, {});

export default reducer;