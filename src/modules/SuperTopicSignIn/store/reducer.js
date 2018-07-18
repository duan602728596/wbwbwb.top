import { createAction, handleActions } from 'redux-actions';
import { fromJS, List } from 'immutable';

const initData: {
  cards: Immutable.Map,
  sinceId: ?string,
  qiandaoIdList: Immutable.Map
} = {
  cards: List([]),
  sinceId: null,
  qiandaoIdList: List([])
};

/* Action */
export const superTopic: Function = createAction('超级话题列表');
export const qiandaoIdList: Function = createAction('已签到的id列表');

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
  [qiandaoIdList]: ($$state: Immutable.Map, action: Object): Immutable.Map=>{
    const { data }: { data: string[] } = action.payload;
    return $$state.set('qiandaoIdList', List(data));
  }
}, fromJS(initData));

export default {
  superTopicSignIn: reducer
};