import { createAction, handleActions } from 'redux-actions';
import { fromJS, List } from 'immutable';

const initData: {
  cards: Immutable.Map,
  sinceId: ?string
} = {
  cards: List([]),
  sinceId: null
};

/* Action */
export const superTopic: Function = createAction('超级话题列表');
export const qiandao: Function = createAction('签到的情况');

/* reducer */
const reducer: Function = handleActions({
  [superTopic]: ($$state: Immutable.Map, action: Object): Immutable.Map=>{
    const { cards, sinceId }: {
      cards: [],
      sinceId: ?string
    } = action.payload;
    return $$state.set('cards', List(cards))
      .set('sinceId', sinceId);
  },
  [qiandao]: ($$state: Immutable.Map, action: Object): Immutable.Map=>{
    const { cards }: { cards: [] } = action.payload;
    return $$state.set('cards', List(cards));
  }
}, fromJS(initData));

export default {
  superTopicSignIn: reducer
};