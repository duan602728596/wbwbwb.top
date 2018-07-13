import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { css, getUserInformation } from '../../../utilities';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import bootstrap from '../../../components/publicStyle/bootstrap.sass';
import style from './style.sass';
import isGoToLogin from '../../../components/isGoToLogin/isGoToLogin';
import { username } from '../store/reducer';

/* state */
const state: Function = createStructuredSelector({
  time: createSelector(     // 当前时间
    ($$state: Immutable.Map): ?number => $$state.has('time') ? $$state.get('time') : null,
    ($$data: ?number): number => $$data ? $$data : new Date().getTime()
  ),
  username: createSelector( // 用户名
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('index') ? $$state.get('index') : null,
    ($$data: ?Immutable.Map): string => $$data ? $$data.get('username') : ''
  )
});

/* dispatch */
const dispatch: Function = (dispatch: Function): Object=>({
  action: bindActionCreators({
    username
  }, dispatch)
});

@withRouter
@connect(state, dispatch)
class Index extends Component{
  static propTypes: Object = {
    time: PropTypes.number,
    username: PropTypes.string,
    action: PropTypes.objectOf(PropTypes.func),
    history: PropTypes.object
  };
  
  componentDidMount(): void{
    isGoToLogin.call(this);
    // 获取用户名
    const infor: ?Object = getUserInformation();
    if(infor !== null){
      this.props.action.username({
        username: infor.username
      });
    }
  }
  render(): React.Element{
    return (
      <div className={ publicStyle.main }>
        {/* 显示用户名 */}
        <ul className={ css(bootstrap.breadcrumb, style.user) }>
          <li className={ bootstrap['breadcrumb-item'] }>
            <b>用户：</b>
            { this.props.username }
          </li>
        </ul>
        {/* 菜单 */}
        <nav className={ bootstrap.row }>
          <div className={ bootstrap['col-3'] }>1</div>
          <div className={ bootstrap['col-3'] }>1</div>
        </nav>
      </div>
    );
  }
}

export default Index;