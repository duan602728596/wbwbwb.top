import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import style from './style.sass';
import { text } from '../store/reducer';

/* state */
const state: Function = createStructuredSelector({
  text: createSelector(
    ($$state: ?Immutable.Map): ?Immutable.Map => $$state && $$state.has('index') ? $$state.get('index') : null,
    ($$data: ?Immutable.Map): ?string => $$data ? $$data.get('text') : null
  )
});

/* dispatch */
const dispatch: Function = (dispatch: Function): Object=>({
  action: bindActionCreators({
    text
  }, dispatch)
});

@connect(state, dispatch)
class Index extends Component{
  render(): React.Element{
    return (
      <div className={ style.text }>{ this.props.text }</div>
    );
  }
}

export default Index;