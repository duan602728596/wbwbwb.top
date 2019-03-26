import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Layout, Breadcrumb, Icon, Button, List, Avatar, Tag, Spin, message, BackTop, Popconfirm, Checkbox } from 'antd';
import QueueAnim from 'rc-queue-anim';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import { getSt, encryption } from '../../../utils';
import style from './style.sass';
import { friendShip, apiFriendShip } from '../store/reducer';
import { getFriendShip, apiFriendships } from '../request';

/* state */
const state = createStructuredSelector({
  cards: createSelector( // 关注列表
    ($$state) => $$state.has('friendShip') ? $$state.get('friendShip') : null,
    ($$data) => $$data ? $$data.get('cards').toJS() : []
  ),
  page: createSelector( // page
    ($$state) => $$state.has('friendShip') ? $$state.get('friendShip') : null,
    ($$data) => $$data ? $$data.get('page') : null
  ),
  cookie: createSelector( // cookie
    ($$state) => $$state.has('friendShip') ? $$state.get('friendShip') : null,
    ($$data) => $$data ? $$data.get('cookie') : null
  )
});

/* dispatch */
const dispatch = (dispatch) => ({
  action: bindActionCreators({
    friendShip,
    apiFriendShip
  }, dispatch)
});

@connect(state, dispatch)
class FriendShips extends Component {
  static propTypes = {
    cards: PropTypes.array,
    page: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    cookie: PropTypes.string,
    action: PropTypes.objectOf(PropTypes.func)
  };

  state = {
    loading: false, // 是否加载
    quguanList: [] // 取关列表
  };

  componentDidMount() {
    if (this.props.page === null) {
      getFriendShip().then((res) => {
        const { data } = res;
        const len = data.cards.length;
        const page = len === 0 ? 'END' : 2;
        const cards = len === 0 ? [] : data.cards;
        const cookie = encryption.decode(data._);

        this.props.action.friendShip({ page, cards, cookie });
      });
    }
  }

  // 加载更多
  handleLoadFriendShip = async (event) => {
    try {
      this.setState({
        loading: true
      });
      const { cards, page } = this.props;
      const { data } = await getFriendShip(page);
      const cards2 = data.cards;

      this.props.action.friendShip({
        page: cards2.length === 0 ? 'END' : (page + 1),
        cards: cards.concat(cards2)
      });
      message.success('数据加载成功！');
    } catch (err) {
      console.error(err);
      message.error('数据加载失败！');
    }
    this.setState({
      loading: false
    });
  };

  // 关注
  async handleGuanzhuClick(item, event) {
    this.setState({
      loading: true
    });
    try {
      const { cookie } = this.props;
      const st = await getSt();
      const cookie2 = `${ encryption.decode(st.data._) }; ${ cookie }`;
      const { data } = await apiFriendships('create', item.id, st.data.st, cookie2);

      if (data.ok === 1) {
        delete item.isQuguan;
      } else {
        message.error(`${ item.screen_name }：${ data.msg }`);
      }
      this.props.action.apiFriendShip({
        cards: this.props.cards
      });
    } catch (err) {
      console.error(err);
      message.error('关注失败！');
    }
    this.setState({
      loading: false
    });
  }

  // 批量取关
  handleQuguanAllClick = async (event) => {
    const quguanList = this.state.quguanList;

    if (quguanList.length === 0) return void 0;

    this.setState({
      loading: true
    });
    try {
      const { cookie } = this.props;
      const st = await getSt();
      const cookie2 = `${ encryption.decode(st.data._) }; ${ cookie }`;
      const cards = this.props.cards;

      for (let i = cards.length - 1; i >= 0; i--) {
        const item = cards[i];

        if (!quguanList.includes(item.id)) continue;

        const { data } = await apiFriendships('destory', item.id, st.data.st, cookie2);

        if (data.ok === 1) {
          item.isQuguan = true;
          quguanList.splice(quguanList.indexOf(item.id), 1);
        } else {
          message.error(`${ item.screen_name }：${ data.msg }`);
        }
      }
      this.props.action.apiFriendShip({
        cards
      });
    } catch (err) {
      console.error(err);
      message.error('取关失败！');
    }
    this.setState({
      loading: false,
      quguanList
    });
  };

  // 单个取关
  async handleQuguanOneClick(item, event) {
    this.setState({
      loading: true
    });
    const quguanList = this.state.quguanList;

    try {
      const { cookie } = this.props;
      const st = await getSt();
      const cookie2 = `${ encryption.decode(st.data._) }; ${ cookie }`;
      const { data } = await apiFriendships('destory', item.id, st.data.st, cookie2);

      if (data.ok === 1) {
        item.isQuguan = true;
        const index = quguanList.indexOf(item.id);

        if (index >= 0) quguanList.splice(index, 1);
      } else {
        message.error(`${ item.screen_name }：${ data.msg }`);
      }
      this.props.action.apiFriendShip({
        cards: this.props.cards
      });
    } catch (err) {
      console.error(err);
      message.error('取关失败！');
    }
    this.setState({
      loading: false,
      quguanList
    });
  }

  // 取关checkbox
  handleQuguanOneChange(item, event) {
    const quguanList = this.state.quguanList;

    if (quguanList.includes(item.id)) {
      quguanList.splice(quguanList.indexOf(item.id), 1);
    } else {
      quguanList.push(item.id);
    }
    this.setState({
      quguanList
    });
  }

  // 渲染关注列表
  friendShipItemView(item, index) {
    if (!item || item.card_type !== 10) return null;

    return (
      <List.Item key={ item.id }
        actions={ [
          <div key="handle">
            {
              item.isQuguan === true ? (
                <Button size="small" onClick={ this.handleGuanzhuClick.bind(this, item) }>关注</Button>
              ) : (
                <Popconfirm title="是否取关" onConfirm={ this.handleQuguanOneClick.bind(this, item) }>
                  <Button type="danger" size="small">取关</Button>
                </Popconfirm>
              )
            }
            <Checkbox className={ style.ml10 }
              checked={ this.state.quguanList.includes(item.id) }
              disabled={ item.isQuguan === true }
              onChange={ this.handleQuguanOneChange.bind(this, item) }
            />
          </div>
        ] }
      >
        <List.Item.Meta description={ item.desc2 }
          title={ [
            <a key="title" href={ item.scheme } target="_blank" rel="noopener noreferrer">{ item.screen_name }</a>,
            <br key="br" />,
            <Tag key="tag" className={ style.tag } color="purple">{ item.desc1 }</Tag>
          ] }
          avatar={
            <a href={ item.scheme } target="_blank" rel="noopener noreferrer">
              <Avatar src={ item.profile_image_url } shape="square" size="large" />
            </a>
          }
        />
      </List.Item>
    );
  }

  friendShipListView(list) {
    const dom = [];

    list.forEach((value, index, array) => {
      const element = this.friendShipItemView(value, index);

      if (element) {
        dom.push(element);
      }
    });

    return dom;
  }

  render() {
    const { loading } = this.state;

    return [
      <Layout key="main" className={ publicStyle.main }>
        <Layout.Header className={ publicStyle.header }>
          <Breadcrumb className={ publicStyle.breadcrumb }>
            <Breadcrumb.Item className={ publicStyle.breadcrumbItem }>
              <Link to="/Index">
                <Icon type="home" theme="filled" />
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>用户关注</Breadcrumb.Item>
          </Breadcrumb>
        </Layout.Header>
        <Layout.Content className={ publicStyle.content } id="friend-ship-content">
          {
            do {
              if (this.props.cards.length > 0) {
                <Popconfirm title="确定要取关这批好友吗？" onConfirm={ this.handleQuguanAllClick }>
                  <Button className={ style.quguanAll }
                    type="danger"
                    icon="warning"
                    block={ true }
                    ghost={ true }
                    loading={ loading }
                  >
                    一键取关
                  </Button>
                </Popconfirm>;
              }
            }
          }
          <List className={ publicStyle.list }
            itemLayout="horizontal"
            bordered={ true }
            loadMore={ this.props.sinceId !== 'END' ? (
              <div className={ classNames(style.loading, { [style.inLoading]: loading }) }>
                {
                  loading ? [
                    <Spin key="spin" />,
                    <span key="text">加载中...</span>
                  ] : <Button onClick={ this.handleLoadFriendShip }>加载更多数据</Button>
                }
              </div>
            ) : null }
          >
            <QueueAnim duration={ 200 } interval={ 50 }>
              { this.friendShipListView(this.props.cards) }
            </QueueAnim>
          </List>
        </Layout.Content>
      </Layout>,
      typeof document === 'object' ? ReactDOM.createPortal(
        <BackTop target={ () => document.getElementById('friend-ship-content') } visibilityHeight={ 200 } />,
        document.body
      ) : null
    ];
  }
}

export default FriendShips;