import { createAction, handleActions } from 'redux-actions';
import { fromJS, List } from 'immutable';

const initData: {
  cards: Immutable.Map,
  page: ?(number | string),
  cookie: ?string
} = {
  cards: List([]),
  page: null,
  cookie: null
};

/* Action */
export const friendShip: Function = createAction('关注列表');
export const apiFriendShip: Function = createAction('取关后的列表刷新');

/* reducer */
const reducer: Function = handleActions({
  [friendShip]: ($$state: Immutable.Map, action: Object): Immutable.Map=>{
    const { cards, page, cookie }: {
      cards: [],
      page: ?(number | string),
      cookie: ?string
    } = action.payload;
    return $$state.set('cards', List(cards))
      .set('page', page)
      .set('cookie', cookie);
  },
  [apiFriendShip]: ($$state: Immutable.Map, action: Object): Immutable.Map=>{
    const { cards }: { cards: [] } = action.payload;
    return $$state.set('cards', List(cards));
  }
}, fromJS(initData));

export default {
  friendShip: reducer
};