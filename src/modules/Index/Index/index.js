import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { withRouter, Link } from 'react-router-dom';
import classNames from 'classnames';
import QueueAnim from 'rc-queue-anim';
import { getUserInformation } from '../../../utils';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import bootstrap from '../../../components/publicStyle/bootstrap.sass';
import style from './style.sass';
import { username } from '../store/reducer';
import CloseModal from './CloseModal';

/* state */
const state: Function = createStructuredSelector({
  time: createSelector(     // 当前时间
    ($$state: Immutable.Map): ?number => $$state.has('time') ? $$state.get('time') : null,
    ($$data: ?number): number => $$data ? $$data : new Date().getTime()
  ),
  username: createSelector( // 用户名
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('index') ? $$state.get('index') : null,
    ($$data: ?Immutable.Map): string => $$data ? $$data.get('username') : ''
  ),
  cookie: createSelector(   // cookie
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('index') ? $$state.get('index') : null,
    ($$data: ?Immutable.Map): string => $$data ? $$data.get('cookie') : ''
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
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };
  state: {
    isModalDisplay: boolean
  } = {
    isModalDisplay: false // 弹出层的显示和隐藏
  };

  componentDidMount(): void{
    // 获取用户名
    const infor: ?Object = getUserInformation();
    if(infor !== null){
      this.props.action.username({
        username: infor.username,
        cookie: infor.cookie
      });
    }
  }
  // 点击显示modal
  handleModalDisplayClick(value: boolean, event: Event): void{
    this.setState({
      isModalDisplay: value
    });
  }
  // 点击确认跳转
  handleGoToLoginClick: Function = (event: Event): void=>{
    this.props.history.push('/Login');
  };
  render(): React.Element{
    const { username, cookie }: {
      username: string,
      cookie: string
    } = this.props;
    return (
      <div className={ publicStyle.main }>
        {/* 显示用户名 */}
        <div className={ classNames(bootstrap.navbar, bootstrap['bg-primary'], style.user) }>
          <a className={ bootstrap['navbar-brand'] }>
            <img className={ style.avatar } src={ require('./image/avatar.jpg') } />
            <b>用户：</b>
            { username }
          </a>
        </div>
        {/* 菜单 */}
        <nav className={ classNames(bootstrap.row, style.nav) }>
          <div className={ classNames(bootstrap['col-4'], bootstrap['text-center'], style.navCol) }>
            <Link className={ style.navItem } to={ `/SuperTopicSignIn${ cookie === '' ? '' : `?cookie=${ cookie }` }` }>
              <img className={ style.navItemImage } src={ require('./image/icon1.jpg') } />
              <span className={ style.navItemText }>超话签到</span>
            </Link>
          </div>
          <div className={ classNames(bootstrap['col-4'], bootstrap['text-center'], style.navCol) }>
            <Link className={ style.navItem } to={ `/FriendShip${ cookie === '' ? '' : `?cookie=${ cookie }` }` }>
              <img className={ style.navItemImage } src={ require('./image/icon3.jpg') } />
              <span className={ style.navItemText }>用户关注</span>
            </Link>
          </div>
          <div className={ classNames(bootstrap['col-4'], bootstrap['text-center'], style.navCol) }>
            <a className={ style.navItem } onClick={ this.handleModalDisplayClick.bind(this, true) }>
              <img className={ style.navItemImage } src={ require('./image/icon2.jpg') } />
              <span className={ style.navItemText }>退出</span>
            </a>
          </div>
        </nav>
        {/* 弹出层 */}
        <QueueAnim type="alpha">
          {
            do{
              if(this.state.isModalDisplay === true){
                <CloseModal key="closeModal"
                  onOk={ this.handleGoToLoginClick }
                  onCancel={ this.handleModalDisplayClick.bind(this, false) }
                />;
              }
            }
          }
        </QueueAnim>
      </div>
    );
  }
}

export default Index;