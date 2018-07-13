import { createAction, handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

const initData: {} = {};

/* Action */

/* reducer */
const reducer: Function = handleActions({}, fromJS(initData));

export default {
  index: reducer
};