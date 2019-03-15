import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Layout, Row, Col, Breadcrumb, Icon, Button, List, Avatar, Tag, Spin, message, BackTop } from 'antd';
import QueueAnim from 'rc-queue-anim';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import { superTopic, qiandao } from '../store/reducer';
import style from './style.sass';
import { signin, getSuperTopicList } from '../request';

/* state */
const state = createStructuredSelector({
  cards: createSelector( // 超话列表
    ($$state) => $$state.has('superTopicSignIn') ? $$state.get('superTopicSignIn') : null,
    ($$data) => $$data ? $$data.get('cards').toJS() : []
  ),
  sinceId: createSelector( // sign_id
    ($$state) => $$state.has('superTopicSignIn') ? $$state.get('superTopicSignIn') : null,
    ($$data) => $$data ? $$data.get('sinceId') : null
  )
});

/* dispatch */
const dispatch = (dispatch) => ({
  action: bindActionCreators({
    superTopic,
    qiandao
  }, dispatch)
});

@connect(state, dispatch)
class SuperTopicSignIn extends Component {
  static propTypes = {
    cards: PropTypes.array,
    sinceId: PropTypes.string,
    action: PropTypes.objectOf(PropTypes.func)
  };

  state = {
    loading: false // 是否加载
  };

  componentDidMount() {
    if (this.props.sinceId === null) {
      getSuperTopicList().then((res) => {
        const { data } = res;
        const sinceId = data.since_id || 'END';
        const cards = data.cards;

        this.props.action.superTopic({ sinceId, cards });
      });
    }
  }

  // 重新加载所有的超话列表
  handleGetAllSuperTopicList = async (eventt) => {
    this.setState({
      loading: true
    });
    message.info('正在加载所有数据。');
    try {
      const cards = [];
      let isBreak = false;
      let sinceId = null;

      while (isBreak === false) {
        const res = await getSuperTopicList(sinceId);
        const { data } = res;
        const cards2 = data.cards;

        cards.push(...cards2);
        if ('since_id' in data && data.since_id) {
          sinceId = data.since_id;
        } else {
          sinceId = 'END';
          isBreak = true;
        }
      }
      this.props.action.superTopic({
        sinceId,
        cards
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

  // 签到所有
  handleQiandaoAllClick = async (event) => {
    this.setState({
      loading: true
    });
    try {
      const { cards } = this.props;

      for (let i = 0, j = cards.length; i < j; i++) {
        const item = cards[i];

        if (item.card_type === 8) {
          const containerid = this.sheme(item.scheme);

          if (item.code !== '100000') {
            await this.handleQiandaoClick(containerid, item, i);
          }
        }
      }
      message.success('一键签到成功！');
    } catch (err) {
      console.error(err);
    }
    this.setState({
      loading: false
    });
  };

  // 签到
  async handleQiandaoClick(containerid, item, index, event) {
    try {
      const { data } = await signin(containerid);
      let code = null;
      let msg = null;

      if (data.code === '100000') {
        // 签到成功
        if ('error_code' in data.data) {
          code = data.data.error_code;
          msg = data.data.error_msg;
        } else {
          code = data.code;
          msg = `${ data.data?.alert_title }，${ data.data?.alert_subtitle }`;
        }
      } else {
        // 其他情况
        code = data.code;
        msg = data.msg;
      }
      this.props.action.qiandao({
        index,
        code,
        msg
      });
    } catch (err) {
      console.error(err);
      message.error(`${ item.title_sub }：签到失败！`);
    }
  }

  // 加载数据
  handleLoadSuperTopicList = async (event) => {
    this.setState({
      loading: true
    });
    const { cards, sinceId } = this.props;

    try {
      const { data } = await getSuperTopicList(encodeURI(sinceId));
      const sinceId2 = data?.since_id || 'END';
      const cards2 = data.cards;

      this.props.action.superTopic({
        sinceId: sinceId2,
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

  // sheme
  sheme = (scheme) => scheme.match(/containerid=[a-zA-Z0-9]+/)[0].split('=')[1];

  // 渲染超话列表
  superTopicListItemView(item, index) {
    if (!item || item.card_type !== 8) return null;
    const containerid = this.sheme(item.scheme);
    const isQiandao = item.code === '100000' || item.code === 382004;

    return (
      <List.Item key={ containerid }
        actions={
          [
            isQiandao ? null : (
              <Button key="qiandao"
                size="small"
                disabled={ this.state.loading }
                onClick={ this.handleQiandaoClick.bind(this, containerid, item, index) }
              >
                签到
              </Button>
            )
          ]
        }
      >
        <List.Item.Meta description={ item.desc2 }
          title={
            [
              <a key="title" href={ item.scheme } target="_blank" rel="noopener noreferrer">{ item.title_sub }</a>,
              <Tag key="lv" className={ style.tag } color="#2db7f5">{ item.desc1 }</Tag>,
              item.code !== undefined ? [
                <br key="br" />,
                <Tag key="msg" className={ style.msg } color={ item.code === '100000' ? 'green' : 'red' }>{ item.msg }</Tag>
              ] : null
            ]
          }
          avatar={
            <a href={ item.scheme } target="_blank" rel="noopener noreferrer">
              <Avatar src={ item.pic } shape="square" size="large" />
            </a>
          }
        />
      </List.Item>
    );
  }

  superTopicListView(list) {
    const dom = [];

    list.forEach((value, index, array) => {
      const element = this.superTopicListItemView(value, index);

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
          <Row type="flex">
            <Col span={ 12 }>
              <Breadcrumb className={ publicStyle.breadcrumb }>
                <Breadcrumb.Item className={ publicStyle.breadcrumbItem }>
                  <Link to="/Index">
                    <Icon type="home" theme="filled" />
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>超级话题签到</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
            <Col className={ style.extra } span={ 12 }>
              <Button type="dashed"
                size="small"
                ghost={ true }
                loading={ loading }
                onClick={ this.handleGetAllSuperTopicList }
              >
                加载所有超话
              </Button>
            </Col>
          </Row>
        </Layout.Header>
        <Layout.Content className={ publicStyle.content } id="super-topic-sign-in-content">
          {
            do{
              if (this.props.cards.length > 0) {
                <Button className={ style.qiandaoAll }
                  type="primary"
                  icon="edit"
                  block={ true }
                  loading={ loading }
                  onClick={ this.handleQiandaoAllClick }
                >
                  一键签到
                </Button>;
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
                  ] : <Button onClick={ this.handleLoadSuperTopicList }>加载更多数据</Button>
                }
              </div>
            ) : null }
          >
            <QueueAnim duration={ 200 } interval={ 50 }>
              { this.superTopicListView(this.props.cards) }
            </QueueAnim>
          </List>
        </Layout.Content>
      </Layout>,
      typeof document === 'object' ? ReactDOM.createPortal(
        <BackTop target={ () => document.getElementById('super-topic-sign-in-content') } visibilityHeight={ 200 } />,
        document.body
      ) : null
    ];
  }
}

export default SuperTopicSignIn;