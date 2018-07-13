import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import style from './style.sass';
import isGoToLogin from '../../../components/isGoToLogin/isGoToLogin';

/* state */
const state: Function = createStructuredSelector({});

/* dispatch */
const dispatch: Function = (dispatch: Function): Object=>({
  action: bindActionCreators({}, dispatch)
});

@withRouter
@connect(state, dispatch)
class Index extends Component{
  static propTypes: Object = {
    action: PropTypes.objectOf(PropTypes.func),
    history: PropTypes.object
  };
  
  componentDidMount(): void{
    isGoToLogin.call(this);
  }
  render(): React.Element{
    return (
      <div className={ style.text }>index</div>
    );
  }
}

export default Index;