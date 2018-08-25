import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Layout, Breadcrumb, Icon, Button, List, Avatar, Tag, Spin, message, BackTop } from 'antd';
import QueueAnim from 'rc-queue-anim';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import style from './style.sass';
import { friendShip } from '../store/reducer';
import { getFriendShip } from '../request';

/* state */
const state: Function = createStructuredSelector({
  cards: createSelector(         // 关注列表
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('friendShip') ? $$state.get('friendShip') : null,
    ($$data: ?Immutable.Map): [] => $$data ? $$data.get('cards').toJS() : []
  ),
  page: createSelector(         // page
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('friendShip') ? $$state.get('friendShip') : null,
    ($$data: ?Immutable.Map): ?(number | string) => $$data ? $$data.get('page') : null
  )
});

/* dispatch */
const dispatch: Function = (dispatch: Function): Object=>({
  action: bindActionCreators({
    friendShip
  }, dispatch)
});

@connect(state, dispatch)
class FriendShips extends Component{
  static propTypes: Object = {
    cards: PropTypes.array,
    page: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string
    ]),
    action: PropTypes.objectOf(PropTypes.func)
  };

  state: {
    loading: boolean
  } = {
    loading: false // 是否加载
  };

  componentDidMount(): void{
    if(this.props.page === null){
      getFriendShip().then((res: Object): void=>{
        const { data }: { data: Object } = res;
        const len: number = data.cards.length;
        const page: number | string = len === 0 ? 'END' : 2;
        const cards: [] = len === 0 ? [] : data.cards;
        const cookie: string = data.cookie;
        this.props.action.friendShip({ page, cards, cookie });
      });
    }
  }
  // 加载更多
  handleLoadFriendShip: Function = async(event: Event): Promise<void>=>{
    try{
      this.setState({
        loading: true
      });
      const { cards, page }: {
        cards: [],
        page: ?(number | string)
      } = this.props;
      const { data }: { data: Object } = await getFriendShip(page);
      const cards2: [] = data.cards;
      this.props.action.friendShip({
        page: cards2.length === 0 ? 'END' : (page + 1),
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
  // 渲染关注列表
  friendShipItemView(item: Object, index: number): React.Element{
    if(!item || item.card_type !== 10) return null;
    return (
      <List.Item key={ item.id }>
        <List.Item.Meta description={ item.desc2 }
          title={[
            <a key="title" href={ item.scheme } target="_blank" rel="noopener noreferrer">{ item.screen_name }</a>,
            <br key="br" />,
            <Tag key="tag" className={ style.tag } color="purple">{ item.desc1 }</Tag>
          ]}
          avatar={
            <a href={ item.scheme } target="_blank" rel="noopener noreferrer">
              <Avatar src={ item.profile_image_url } shape="square" size="large"  />
            </a>
          }
        />
      </List.Item>
    );
  }
  friendShipListView(list: Array): React.ChildrenArray<React.Element>{
    const dom: [] = [];
    list.forEach((value: Object, index: number, array: []): void=>{
      const element: ?React.Element = this.friendShipItemView(value, index);
      if(element){
        dom.push(element);
      }
    });
    return dom;
  }
  render(): React.ChildrenArray<React.Element>{
    const { loading }: { loading: boolean } = this.state;

    return [
      <Layout key="main" className={ publicStyle.main }>
        <Layout.Header className={ publicStyle.header }>
          <Breadcrumb className={ publicStyle.breadcrumb }>
            <Breadcrumb.Item className={ publicStyle.breadcrumbItem }>
              <Link to="/Index">
                <Icon type="home" />
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>用户关注</Breadcrumb.Item>
          </Breadcrumb>
        </Layout.Header>
        <Layout.Content className={ publicStyle.content } id="friend-ship-content">
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
        <BackTop target={ (): Element => document.getElementById('friend-ship-content') } visibilityHeight={ 200 } />,
        document.body
      ) : null
    ];
  }
}

export default FriendShips;