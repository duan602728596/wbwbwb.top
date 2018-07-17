import { createAction, handleActions } from 'redux-actions';
import { fromJS, List } from 'immutable';

const initData: {
  cards: Immutable.Map,
  signId: ?string
} = {
  cards: List([]),
  signId: null
};

/* Action */
export const superTopic: Function = createAction('超级话题列表');

/* reducer */
const reducer: Function = handleActions({
  [superTopic]: ($$state: Immutable.Map, action: Object): Immutable.Map=>{
    const { cards, signId }: {
      cards: [],
      signId: ?string
    } = action.payload;
    return $$state.set('cards', List(cards))
      .set('signId', signId);
  }
}, fromJS(initData));

export default {
  superTopicSignIn: reducer
};