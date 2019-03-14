import { createAction, handleActions } from 'redux-actions';
import { fromJS, List } from 'immutable';

const initData = {
  cards: List([]),
  sinceId: null
};

/* Action */
export const superTopic = createAction('超级话题列表');
export const qiandao = createAction('签到的情况');

/* reducer */
const reducer = handleActions({
  [superTopic]: ($$state, action) => {
    const { cards, sinceId } = action.payload;

    return $$state.set('cards', List(cards))
      .set('sinceId', sinceId);
  },
  [qiandao]: ($$state, action) => {
    const { index, code, msg } = action.payload;
    const cards = $$state.get('cards').toJS();

    cards[index].code = code;
    cards[index].msg = msg;

    return $$state.set('cards', List(cards));
  }
}, fromJS(initData));

export default {
  superTopicSignIn: reducer
};