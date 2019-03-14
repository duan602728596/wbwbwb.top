import { createAction, handleActions } from 'redux-actions';
import { fromJS, List } from 'immutable';

const initData = {
  cards: List([]),
  page: null,
  cookie: null
};

/* Action */
export const friendShip = createAction('关注列表');
export const apiFriendShip = createAction('取关后的列表刷新');

/* reducer */
const reducer = handleActions({
  [friendShip]: ($$state, action) => {
    const { cards, page, cookie } = action.payload;

    return $$state.set('cards', List(cards))
      .set('page', page)
      .set('cookie', cookie);
  },
  [apiFriendShip]: ($$state, action) => {
    const { cards } = action.payload;

    return $$state.set('cards', List(cards));
  }
}, fromJS(initData));

export default {
  friendShip: reducer
};