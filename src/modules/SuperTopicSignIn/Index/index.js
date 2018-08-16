import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import { Layout, Row, Col, Breadcrumb, Icon, Button, List, Avatar, Tag, Spin, message, BackTop } from 'antd';
import QueueAnim from 'rc-queue-anim';
import InfiniteScroll from 'react-infinite-scroller';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import { superTopic, qiandao } from '../store/reducer';
import style from './style.sass';
import { signin, getSuperTopicList } from '../request';

/* state */
const state: Function = createStructuredSelector({
  cards: createSelector(         // 超话列表
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('superTopicSignIn') ? $$state.get('superTopicSignIn') : null,
    ($$data: ?Immutable.Map): [] => $$data ? $$data.get('cards').toJS() : []
  ),
  sinceId: createSelector(       // sign_id
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('superTopicSignIn') ? $$state.get('superTopicSignIn') : null,
    ($$data: ?Immutable.Map): ?string => $$data ? $$data.get('sinceId') : null
  )
});

/* dispatch */
const dispatch: Function = (dispatch: Function): Object=>({
  action: bindActionCreators({
    superTopic,
    qiandao
  }, dispatch)
});

@connect(state, dispatch)
class SuperTopicSignIn extends Component{
  static propTypes: Object = {
    cards: PropTypes.array,
    action: PropTypes.objectOf(PropTypes.func)
  };

  state: {
    loading: boolean
  } = {
    loading: false // 是否加载
  };

  componentDidMount(): void{
    if(this.props.sinceId === null){
      getSuperTopicList().then((res: Object): void=>{
        const { data }: { data: Object } = res;
        const sinceId: string = data.data.cardlistInfo?.since_id || 'END';
        const cards: [] = data.data.cards[0].card_group;
        this.props.action.superTopic({ sinceId, cards });
      });
    }
  }
  // 重新加载所有的超话列表
  handleGetAllSuperTopicList: Function = async(event: Event): Promise<void>=>{
    this.setState({
      loading: true
    });
    message.info('正在加载所有数据。');
    try{
      const cards: [] = [];
      let isBreak: boolean = false;
      let sinceId: ?string = null;
      while(isBreak === false){
        const res: Object = await getSuperTopicList(sinceId);
        const { data }: { data: Object } = res;
        const { cardlistInfo }: { cardlistInfo: Object } = data.data;
        const cards2: [] = data.data.cards[0].card_group;
        cards.push(...cards2);
        if('since_id' in cardlistInfo){
          sinceId = cardlistInfo.since_id;
        }else{
          sinceId = 'END';
          isBreak = true;
        }
      }
      this.props.action.superTopic({
        sinceId,
        cards
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
  // 签到所有
  handleQiandaoAllClick: Function = async(event: Event): Promise<void>=>{
    this.setState({
      loading: true
    });
    try{
      const { cards }: { cards: [] } = this.props;
      for(let i: number = 0, j: number = cards.length; i < j; i++){
        const item: Object = cards[i];
        if(item.card_type === 8){
          const containerid: string = this.sheme(item.scheme);
          if(item.code !== '100000'){
            await this.handleQiandaoClick(containerid, item, i);
          }
        }
      }
      message.success('一键签到成功！');
    }catch(err){
      console.error(err);
    }
    this.setState({
      loading: false
    });
  };
  // 签到
  async handleQiandaoClick(containerid: string, item: Object, index: number, event: ?Event): void{
    try{
      const { data }: { data: Object } = await signin(containerid);
      let code: ?(number | string) = null;
      let msg: ?string = null;
      if(data.code === '100000'){
        // 签到成功
        if('error_code' in data.data){
          code = data.data.error_code;
          msg = data.data.error_msg;
        }else{
          code = data.code;
          msg = `${ data.data?.alert_title }，${ data.data?.alert_subtitle }`;
        }
      }else{
        // 其他情况
        code = data.code;
        msg = data.msg;
      }
      this.props.action.qiandao({
        index,
        code,
        msg
      });
    }catch(err){
      console.error(err);
      message.error(`${ item.title_sub }：签到失败！`);
    }
  }
  // 加载数据
  handleLoadSuperTopicList: Function = async(event: Event): Promise<void>=>{
    this.setState({
      loading: true
    });
    const { cards, sinceId }: {
      cards: [],
      sinceId: ?string
    } = this.props;
    try{
      const res: Object = await getSuperTopicList(encodeURI(sinceId));
      const { data }: { data: Object } = res;
      const sinceId2: string = data.data.cardlistInfo?.since_id || 'END';
      const cards2: [] = data.data.cards[0].card_group;
      this.props.action.superTopic({
        sinceId: sinceId2,
        cards: cards.concat(cards2)
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
  // sheme
  sheme: Function = (scheme: string): string => scheme.match(/containerid=[a-zA-Z0-9]+/)[0].split('=')[1];
  // 渲染超话列表
  superTopicListItemView(item: Object, index: number): React.Element{
    if(!item || item.card_type !== 8) return null;
    const containerid: string = this.sheme(item.scheme);
    const isQiandao: boolean = item.code === '100000' || item.code === 382004;
    return (
      <List.Item key={ containerid }
        actions={[
          isQiandao ? null : (
            <Button key="qiandao"
              size="small"
              disabled={ this.state.loading }
              onClick={ this.handleQiandaoClick.bind(this, containerid, item, index)}
            >
              签到
            </Button>
          )
        ]}
      >
        <List.Item.Meta description={ item.desc2 }
          title={[
            <a key="title" href={ item.scheme} target="_blank" rel="noopener noreferrer">{ item.title_sub }</a>,
            <Tag key="lv" className={ style.tag } color="#2db7f5">{ item.desc1 }</Tag>,
            item.code !== undefined ? [
              <br key="br" />,
              <Tag key="msg" className={ style.msg } color={ item.code === '100000' ? 'green' : 'red' }>{ item.msg }</Tag>
            ] : null
          ]}
          avatar={
            <a href={ item.scheme} target="_blank" rel="noopener noreferrer">
              <Avatar src={ item.pic } shape="square" size="large"  />
            </a>
          }
        />
      </List.Item>
    );
  }
  superTopicListView(list: Array): React.ChildrenArray<React.Element>{
    const dom: [] = [];
    list.forEach((value: Object, index: number, array: []): void=>{
      const element: ?React.Element = this.superTopicListItemView(value, index);
      if(element){
        dom.push(element);
      }
    });
    return dom;
  }
  render(): React.ChildrenArray<React.Element>{
    const { loading }: { loading: boolean } = this.state;

    return [
      <Layout key="main" id="super-topic-sign-in-main" className={ publicStyle.main }>
        <InfiniteScroll hasMore={ this.props.sinceId === 'END' ? false : (loading === false ) }
          threshold={ 50 }
          initialLoad={ false }
          useWindow={ false }
          loadMore={ this.handleLoadSuperTopicList  }
        >
          <Layout.Header className={ publicStyle.header }>
            <Row type="flex">
              <Col span={ 12 }>
                <Breadcrumb className={ publicStyle.breadcrumb }>
                  <Breadcrumb.Item className={ publicStyle.breadcrumbItem }>
                    <Link to="/Index">
                      <Icon type="home" />
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
          <Layout.Content className={ publicStyle.content }>
            {
              do{
                if(this.props.cards.length > 0){
                  <Button className={ style.qiandaoAll }
                    type="primary"
                    block={ true }
                    disabled={ loading }
                    onClick={ this.handleQiandaoAllClick }
                  >
                    一键签到
                  </Button>;
                }
              }
            }
            <List className={ publicStyle.list } itemLayout="horizontal" bordered={ true }>
              <QueueAnim duration={ 200 } interval={ 50 }>
                { this.superTopicListView(this.props.cards) }
              </QueueAnim>
            </List>
            {
              do{
                if(this.props.sinceID !== 'END'){
                  loading ? (
                    <div className={ style.loading}>
                      <Spin />
                      <span>加载中...</span>
                    </div>
                  ) : null;
                }
              }
            }
          </Layout.Content>
        </InfiniteScroll>
      </Layout>,
      typeof document === 'object' ? ReactDOM.createPortal(
        <BackTop target={ (): Element => document.getElementById('super-topic-sign-in-main') } />,
        document.body
      ) : null
    ];
  }
}

export default SuperTopicSignIn;