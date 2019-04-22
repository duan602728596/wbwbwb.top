import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Layout, Breadcrumb, Icon, Button, Card, message, BackTop, Divider, Row, Col, Spin } from 'antd';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import style from './style.sass';
import { dataList, reviewList } from '../store/lists';
import { getNewData, getReviewListData } from '../request';

/* state */
const state = createStructuredSelector({
  liveList: createSelector( // 口袋48直播列表
    ($$state) => $$state.has('48live') ? $$state.get('48live').get('lists') : null,
    ($$data) => $$data !== null && $$data.has('liveList') ? $$data.get('liveList').toJS() : []
  ),
  reviewList: createSelector( // 口袋48回放列表
    ($$state) => $$state.has('48live') ? $$state.get('48live').get('lists') : null,
    ($$data) => $$data !== null && $$data.has('reviewList') ? $$data.get('reviewList').toJS() : []
  )
});

/* dispatch */
const dispatch = (dispatch) => ({
  action: bindActionCreators({
    dataList,
    reviewList
  }, dispatch)
});

@connect(state, dispatch)
class FortyEightLive extends Component {
  static propTypes = {
    liveList: PropTypes.array,
    reviewList: PropTypes.array,
    action: PropTypes.objectOf(PropTypes.func)
  };

  state = {
    loading: false // 是否加载
  };

  componentDidMount() {
    if (this.props.liveList.length === 0 && this.props.reviewList.length === 0) {
      getNewData().then((res) => {
        this.props.action.dataList({
          ...res.data
        });
      });
    }
  }

  // 刷新
  handleShuaxinClick = async (event) => {
    this.setState({
      loading: true
    });
    try {
      const { data } = await getNewData();

      this.props.action.dataList({
        ...data
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

  // 渲染cards
  cardsItemView(list) {
    return list.map((item, index) => {
      const url = `/48Live/Item?title=${ item.title }&nickname=${ item.nickname }&picPath=${ item.picPath }&liveId=${ item.liveId }`;

      return (
        <Col key={ item.liveId } xs={ 12 } sm={ 8 }>
          <Card className={ style.cards }
            hoverable={ true }
            actions={ [item.type === 1 ? '直播' : '电台'] }
            cover={
              <Link className={ style.cover } to={ url } target="_blank" rel="noopener noreferrer">
                <img src={ item.picPath } />
              </Link>
            }
          >
            <Card.Meta description={ item.nickname }
              title={
                <Link to={ url } target="_blank" rel="noopener noreferrer">{ item.title }</Link>
              }
            />
          </Card>
        </Col>
      );
    });
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
                <Breadcrumb.Item>口袋48成员直播</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
            <Col className={ style.extra } span={ 12 }>
              <Button type="dashed"
                size="small"
                ghost={ true }
                loading={ loading }
                onClick={ this.handleShuaxinClick }
              >
                刷新列表
              </Button>
            </Col>
          </Row>
        </Layout.Header>
        <Layout.Content className={ publicStyle.content } id="48live-list">
          {
            this.props.liveList.length !== 0 ? [
              <Divider key="divider" orientation="left">直播</Divider>,
              <Row key="row" type="flex">{ this.cardsItemView(this.props.liveList) }</Row>
            ] : null
          }
        </Layout.Content>
      </Layout>,
      typeof document === 'object' ? ReactDOM.createPortal(
        <BackTop target={ () => document.getElementById('48live-list') } visibilityHeight={ 200 } />,
        document.body
      ) : null
    ];
  }
}

export default FortyEightLive;