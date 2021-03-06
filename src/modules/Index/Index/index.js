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
import Ad from '../../../components/Ad/Ad';
import style from './style.sass';
import { username, prompted } from '../store/reducer';
import { encryption, loadWebP, loadImgIfNotIsSupportedWebP } from '../../../utils';
import CarouselAd from '../../../components/Ad/CarouselAd';

/* state */
const state = createStructuredSelector({
  username: createSelector( // 用户名
    ($$state) => $$state.has('index') ? $$state.get('index') : null,
    ($$data) => $$data ? $$data.get('username') : ''
  ),
  cookie: createSelector( // cookie
    ($$state) => $$state.has('index') ? $$state.get('index') : null,
    ($$data) => $$data ? $$data.get('cookie') : ''
  ),
  isPrompted: createSelector( // 提示信息
    ($$state) => $$state.has('index') ? $$state.get('index') : null,
    ($$data) => $$data ? $$data.get('isPrompted') : false
  )
});

/* dispatch */
const dispatch = (dispatch) => ({
  action: bindActionCreators({
    username,
    prompted
  }, dispatch)
});

@withRouter
@connect(state, dispatch)
class Index extends Component {
  static propTypes = {
    username: PropTypes.string,
    action: PropTypes.objectOf(PropTypes.func),
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };

  componentDidMount() {
    // 获取用户名
    const infor = getUserInformation();

    if (infor !== null) {
      this.props.action.username({
        username: infor.username,
        cookie: infor.cookie
      });
      this.prompt();
    }

    // 加载图片
    loadImgIfNotIsSupportedWebP();
  }

  // 提示信息
  prompt() {
    if (this.props.isPrompted === true) return void 0;
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
  handleExitClick = (event) => {
    const ref = Modal.confirm({
      content: '是否退出当前账号？',
      onOk: () => this.props.history.push('/Login'),
      onCancel: () => ref.destroy()
    });
  };

  render() {
    const { username, cookie } = this.props;
    const grid = { xs: 12, sm: 8 };
    const ec = encryption.encode(cookie);

    return (
      <Layout className={ publicStyle.main }>
        {/* 显示用户名 */}
        <Layout.Header className={ classNames(publicStyle.header, style.user) }>
          <Avatar src={ loadWebP(require('./image/avatar.webp'), require('./image/avatar.jpg')) }
            data-src={ require('./image/avatar.jpg') }
            size="large"
            alt={ username }
          />
          <b className={ style.avatarText }>用户：</b>
          { username }
        </Layout.Header>
        <Layout.Content className={ style.content }>
          {/* 轮播广告 */}
          <CarouselAd />
          {/* 菜单 */}
          <Row className={ style.nav } type="flex">
            <Col { ...grid }>
              <div className={ style.navItem }>
                <Link className={ style.navLink } to={ `/SuperTopicSignIn?_=${ ec }` }>
                  <Avatar className={ style.navAvatar }
                    src={ loadWebP(require('./image/icon1.webp'), require('./image/icon1.jpg')) }
                    data-src={ require('./image/icon1.jpg') }
                    shape="square"
                    size={ 90 }
                  />
                  <span className={ style.navItemText }>超话签到</span>
                </Link>
              </div>
            </Col>
            <Col { ...grid }>
              <div className={ style.navItem }>
                <a className={ style.navLink } href="https://bw.lovelyctx.com" target="_blank" rel="noopener noreferrer">
                  <Avatar className={ style.navAvatar }
                    src={ loadWebP(require('./image/chensi.webp'), require('./image/chensi.jpg')) }
                    data-src={ require('./image/chensi.jpg') }
                    shape="square"
                    size={ 90 }
                  />
                  <span className={ style.navItemText }>口袋48禁用词汇查询</span>
                </a>
              </div>
            </Col>
            <Col { ...grid }>
              <div className={ style.navItem }>
                <a className={ style.navLink } href="http://docs.skygrass.club" target="_blank" rel="noopener noreferrer">
                  <Avatar className={ style.navAvatar }
                    src={ loadWebP(require('./image/wangxiaojia.webp'), require('./image/wangxiaojia.jpg')) }
                    data-src={ require('./image/wangxiaojia.jpg') }
                    shape="square"
                    size={ 90 }
                  />
                  <span className={ style.navItemText }>QQ群黑名单API文档</span>
                </a>
              </div>
            </Col>
            <Col { ...grid }>
              <div className={ style.navItem }>
                <Link className={ style.navLink } to={ `/FriendShip?_=${ ec }` }>
                  <Avatar className={ style.navAvatar }
                    src={ loadWebP(require('./image/icon3.webp'), require('./image/icon3.jpg')) }
                    data-src={ require('./image/icon3.jpg') }
                    shape="square"
                    size={ 90 }
                  />
                  <span className={ style.navItemText }>用户关注</span>
                </Link>
              </div>
            </Col>
            <Col { ...grid }>
              <div className={ style.navItem }>
                <Link className={ style.navLink } to="48Live">
                  <Avatar className={ style.navAvatar }
                    src={ loadWebP(require('./image/icon4.webp'), require('./image/icon4.jpg')) }
                    data-src={ require('./image/icon4.jpg') }
                    shape="square"
                    size={ 90 }
                  />
                  <span className={ style.navItemText }>口袋48网页版</span>
                </Link>
              </div>
            </Col>
            <Col { ...grid }>
              <div className={ style.navItem }>
                <a className={ style.navLink } onClick={ this.handleExitClick }>
                  <Avatar className={ style.navAvatar }
                    src={ loadWebP(require('./image/icon2.webp'), require('./image/icon2.jpg')) }
                    data-src={ require('./image/icon2.jpg') }
                    shape="square"
                    size={ 90 }
                  />
                  <span className={ style.navItemText }>退出</span>
                </a>
              </div>
            </Col>
          </Row>
          {/* 广告 */}
          <div className={ classNames(style.mt10, style.indexAdBox) }>
            <Ad className={ style.indexAd } />
          </div>
        </Layout.Content>
        <Footer />
      </Layout>
    );
  }
}

export default Index;