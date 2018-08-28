import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { withRouter, Link } from 'react-router-dom';
import classNames from 'classnames';
import { Layout, Avatar, Modal, Row, Col, notification } from 'antd';
import { getUserInformation } from '../../../utils';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import Footer from '../../../assembly/Footer/index';
import Ad from '../../../components/Ad/index';
import style from './style.sass';
import { username, prompted } from '../store/reducer';
import { encryption } from '../../../utils';

/* state */
const state: Function = createStructuredSelector({
  time: createSelector(       // 当前时间
    ($$state: Immutable.Map): ?number => $$state.has('time') ? $$state.get('time') : null,
    ($$data: ?number): number => $$data ? $$data : new Date().getTime()
  ),
  username: createSelector(   // 用户名
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('index') ? $$state.get('index') : null,
    ($$data: ?Immutable.Map): string => $$data ? $$data.get('username') : ''
  ),
  cookie: createSelector(     // cookie
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('index') ? $$state.get('index') : null,
    ($$data: ?Immutable.Map): string => $$data ? $$data.get('cookie') : ''
  ),
  isPrompted: createSelector( // 提示信息
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('index') ? $$state.get('index') : null,
    ($$data: ?Immutable.Map): boolean => $$data ? $$data.get('isPrompted') : false
  )
});

/* dispatch */
const dispatch: Function = (dispatch: Function): Object=>({
  action: bindActionCreators({
    username,
    prompted
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
      this.prompt();
    }
  }
  // 提示信息
  prompt(): void{
    if(this.props.isPrompted === true) return void 0;
    notification.info({
      duration: 5,
      placement: 'bottomRight',
      message: '提示',
      description: '如果发生无法获取数据的情况，请重新登陆。本网站所有接口为代理获取数据，不会保存账号和密码。',
      onClose: this.props.action.prompted.bind(null, {
        data: true
      })
    });
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
    const ec: string = encryption.encode(cookie);

    return (
      <Layout className={ publicStyle.main }>
        {/* 显示用户名 */}
        <Layout.Header className={ classNames(publicStyle.header, style.user) }>
          <Avatar src={ require('./image/avatar.jpg') } size="large" alt={ username } />
          <b className={ style.avatarText }>用户：</b>
          { username }
        </Layout.Header>
        <Layout.Content className={ style.content }>
          {/* 广告 */}
          <div className={ style.indexAdBox }>
            <Ad className={ style.indexAd } src="https://www.wbwbwb.top:5056/xusiyang.html?t=201808252028" />
          </div>
          {/* 菜单 */}
          <Row className={ style.nav } type="flex">
            <Col { ...grid }>
              <Link className={ style.navItem } to={ `/SuperTopicSignIn?_=${ ec }` }>
                <Avatar className={ style.navAvatar } src={ require('./image/icon1.jpg') } shape="square" size={ 90 } />
                <span className={ style.navItemText }>超话签到</span>
              </Link>
            </Col>
            <Col { ...grid }>
              <a className={ style.navItem } href="https://bw.lovelyctx.com/" target="_blank" rel="noopener noreferrer">
                <Avatar className={ style.navAvatar } src={ require('./image/chensi.jpg') } shape="square" size={ 90 } />
                <span className={ style.navItemText }>口袋48禁用词汇查询</span>
              </a>
            </Col>
            <Col { ...grid }>
              <Link className={ style.navItem } to={ `/FriendShip?_=${ ec }` }>
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
          {/* 广告 */}
          <div className={ classNames(style.mt10, style.indexAdBox) }>
            <Ad className={ style.indexAd } src="https://www.wbwbwb.top:5056/chenyayu.html?t=201808280008" />
          </div>
        </Layout.Content>
        <Footer />
      </Layout>
    );
  }
}

export default Index;