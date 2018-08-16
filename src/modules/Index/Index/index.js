import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { withRouter, Link } from 'react-router-dom';
import classNames from 'classnames';
import { Layout, Avatar, Modal, Row, Col } from 'antd';
import { getUserInformation } from '../../../utils';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import style from './style.sass';
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
  // 退出
  handleExitClick: Function = (event: Event): void=>{
    const ref: Object = Modal.confirm({
      content: '是否退出当前账号？',
      onOk: (): void => this.props.history.push('/Login'),
      onCancel: (): void => ref.destroy()
    });
  };
  render(): React.Element{
    const { username, cookie }: {
      username: string,
      cookie: string
    } = this.props;
    const grid: Object = {
      xs: 12,
      sm: 8
    };

    return (
      <Layout className={ publicStyle.main }>
        {/* 显示用户名 */}
        <Layout.Header className={ classNames(style.user) }>
          <Avatar src={ require('./image/avatar.jpg') } size="large" alt={ username } />
          <b className={ style.avatarText }>用户：</b>
          { username }
        </Layout.Header>
        {/* 菜单 */}
        <Row type="flex">
          <Col { ...grid }>
            <Link className={ style.navItem } to={ `/SuperTopicSignIn${ cookie === '' ? '' : `?cookie=${ cookie }` }` }>
              <Avatar className={ style.navAvatar } src={ require('./image/icon1.jpg') } shape="square" size={ 90 } />
              <span className={ style.navItemText }>超话签到</span>
            </Link>
          </Col>
          <Col { ...grid }>
            <Link className={ style.navItem } to={ `/FriendShip${ cookie === '' ? '' : `?cookie=${ cookie }` }` }>
              <Avatar className={ style.navAvatar } src={ require('./image/icon3.jpg') } shape="square" size={ 90 } />
              <span className={ style.navItemText }>用户关注</span>
            </Link>
          </Col>
          <Col { ...grid }>
            <a className={ style.navItem } onClick={ this.handleExitClick }>
              <Avatar className={ style.navAvatar } src={ require('./image/icon2.jpg') } shape="square" size={ 90 } />
              <span className={ style.navItemText }>退出</span>
            </a>
          </Col>
        </Row>
      </Layout>
    );
  }
}

export default Index;