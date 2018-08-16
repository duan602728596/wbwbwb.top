import { createAction, handleActions } from 'redux-actions';
import { fromJS, List } from 'immutable';

const initData: {
  cards: Immutable.Map,
  page: ?(number | string)
} = {
  cards: List([]),
  page: null
};

/* Action */
export const friendShip: Function = createAction('关注列表');

/* reducer */
const reducer: Function = handleActions({
  [friendShip]: ($$state: Immutable.Map, action: Object): Immutable.Map=>{
    const { cards, page }: {
      cards: [],
      page: ?number
    } = action.payload;
    return $$state.set('cards', List(cards))
      .set('page', page);
  }
}, fromJS(initData));

export default {
  friendShip: reducer
};