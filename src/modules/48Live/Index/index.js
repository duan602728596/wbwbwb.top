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
const state: Function = createStructuredSelector({
  liveList: createSelector(   // 口袋48直播列表
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('48live') ? $$state.get('48live').get('lists') : null,
    ($$data: ?Immutable.Map): [] => $$data !== null ? $$data.get('liveList').toJS() : []
  ),
  reviewList: createSelector( // 口袋48回放列表
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('48live') ? $$state.get('48live').get('lists') : null,
    ($$data: ?Immutable.Map): [] => $$data !== null ? $$data.get('reviewList').toJS() : []
  )
});

/* dispatch */
const dispatch: Function = (dispatch: Function): Object=>({
  action: bindActionCreators({
    dataList,
    reviewList
  }, dispatch)
});

@connect(state, dispatch)
class FortyEightLive extends Component{
  static propTypes: Object = {
    liveList: PropTypes.array,
    reviewList: PropTypes.array,
    action: PropTypes.objectOf(PropTypes.func)
  };

  state: {
    loading: boolean
  } = {
    loading: false // 是否加载
  };

  // 加载更多
  handleMoreReviewListClick: Function = async(event: Event): Promise<void>=>{
    this.setState({
      loading: true
    });
    try{
      const { reviewList }: { reviewList: [] } = this.props;
      const { data }: { data: [] } = await getReviewListData(reviewList[reviewList.length - 1].startTime);
      this.props.action.reviewList({
        data: reviewList.concat(data.reviewList)
      });
      message.success('数据加载成功！');
    }catch(err){
      console.error(err);
      message.error('数据加载失败！');
    }
    this.setState({
      loading: false
    });
  };
  // 刷新
  handleShuaxinClick: Function = async(event: Event): Promise<void>=>{
    this.setState({
      loading: true
    });
    try{
      const { data }: { data: [] } = await getNewData();
      this.props.action.dataList({
        ...data
      });
      message.success('数据加载成功！');
    }catch(err){
      console.error(err);
      message.error('数据加载失败！');
    }
    this.setState({
      loading: false
    });
  };
  // 渲染cards
  cardsItemView(list: []): React.ChildrenArray<React.Element>{
    return list.map((item: Object, index: number): React.Element=>{
      const url: string = '';
      return (
        <Col key={ item.liveId } xs={ 12 } sm={ 8 }>
          <Card className={ style.cards }
            hoverable={ true }
            cover={
              <a className={ style.cover }>
                <img src={ item.picPath } />
              </a>
            }
          >
            <Card.Meta title={ item.title } description={ item.subTitle }
            />
          </Card>
        </Col>
      );
    });
  }
  render(): React.ChildrenArray<React.Element>{
    const { loading }: { loading: boolean } = this.state;

    return [
      <Layout key="main" className={ publicStyle.main }>
        <Layout.Header className={ publicStyle.header }>
          <Row type="flex">
            <Col span={ 12 }>
              <Breadcrumb className={ publicStyle.breadcrumb }>
                <Breadcrumb.Item className={ publicStyle.breadcrumbItem }>
                  <Link to="/Index">
                    <Icon type="home" />
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
          <Divider orientation="left">直播</Divider>
          <Row type="flex">{ this.cardsItemView(this.props.liveList) }</Row>
          <Divider orientation="left">回放</Divider>
          <Row type="flex">{ this.cardsItemView(this.props.reviewList) }</Row>
          <div className={ classNames(style.loading, { [style.inLoading]: loading }) }>
            {
              loading ? [
                <Spin key="spin" />,
                <span key="text">加载中...</span>
              ] : <Button onClick={ this.handleMoreReviewListClick }>加载更多数据</Button>
            }
          </div>
        </Layout.Content>
      </Layout>,
      typeof document === 'object' ? ReactDOM.createPortal(
        <BackTop target={ (): Element => document.getElementById('48live-list') } visibilityHeight={ 200 } />,
        document.body
      ) : null
    ];
  }
}

export default FortyEightLive;