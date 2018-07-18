import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames';
import QueueAnim from 'rc-queue-anim';
import { getUserInformation, stringify } from '../../../utils';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import bootstrap from '../../../components/publicStyle/bootstrap.sass';
import message from '../../../components/message/message';
import { superTopic } from '../store/reducer';
import style from './style.sass';

/* state */
const state: Function = createStructuredSelector({
  cards: createSelector(     // 超话列表
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('superTopicSignIn') ? $$state.get('superTopicSignIn') : null,
    ($$data: ?Immutable.Map): number => $$data ? $$data.get('cards').toJS() : []
  ),
  sinceId: createSelector(    // sign_id
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('superTopicSignIn') ? $$state.get('superTopicSignIn') : null,
    ($$data: ?Immutable.Map): ?string => $$data ? $$data.get('sinceId') : null
  )
});

/* dispatch */
const dispatch: Function = (dispatch: Function): Object=>({
  action: bindActionCreators({
    superTopic
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
      this.getSuperTopicList().then((res: Object): void=>{
        const { data }: { data: Object } = res;
        const sinceId: string = data.data.cardlistInfo?.since_id || 'END';
        const cards: [] = data.data.cards[0].card_group;
        this.props.action.superTopic({ sinceId, cards });
      });
    }
  }
  // 获取数据
  getSuperTopicList(sinceId: ?string): Promise{
    const infor: ?Object = getUserInformation();
    const cookie: string = stringify({
      username: infor.username,
      ...infor.cookie
    });
    let uri: string = `/api/container/getIndex?${ cookie }`;
    if(sinceId) uri += `&since_id=${ sinceId }`;
      
    return axios({
      url: uri,
      method: 'GET'
    }).catch((err: any): void=>{
      console.error(err);
    });
  }
  // sheme
  sheme(scheme: string): string{
    return scheme.match(/containerid=[a-zA-Z0-9]+/)[0];
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
      const res: Object = await this.getSuperTopicList(encodeURI(sinceId));
      const { data }: { data: Object } = res;
      const sinceId2: string = data.data.cardlistInfo?.since_id || 'END';
      const cards2: [] = data.data.cards[0].card_group;
      this.props.action.superTopic({
        sinceId: sinceId2,
        cards: cards.concat(cards2)
      });
      message('success', '数据加载成功！');
    }catch(err){
      console.error(err);
      message('danger', '数据加载失败！');
    }
    this.setState({
      loading: false
    });
  };
  // 渲染超话列表
  superTopicListView(): React.ChildrenArray<React.Element>{
    return this.props.cards.map((item: Object, index: number): React.Element=>{
      if(item.card_type === 8){
        const containerid: string = this.sheme(item.scheme);
        return (
          <a key={ containerid } className={ classNames(
            bootstrap['list-group-item'],
            bootstrap['flex-column'],
            bootstrap['align-items-start'],
            style.listItem)
          }>
            <img className={ style.pic } src={ item.pic } />
            <div className={ classNames(bootstrap['d-flex'], bootstrap['justify-content-between']) }>
              <h5 className={ classNames(bootstrap['mb-1'], bootstrap['text-primary'], style.title) }>{ item.title_sub }</h5>
              <small className={ bootstrap['text-muted'] }>{ item.desc1 }</small>
            </div>
            <p className={ classNames(bootstrap['mb-1'], style.text) }>{ item.desc2 }</p>
          </a>
        );
      }
    });
  }
  render(): React.Element{
    const { loading }: { loading: boolean } = this.state;
    return (
      <div className={ publicStyle.main }>
        <nav aria-label="breadcrumb">
          <ol className={ bootstrap.breadcrumb }>
            <li className={ bootstrap['breadcrumb-item'] }>
              <Link to="/Index">微博自动签到系统</Link>
            </li>
            <li className={ classNames(bootstrap['breadcrumb-item'], bootstrap.active) } aria-current="page">超级话题签到</li>
          </ol>
        </nav>
        {/* list */}
        <QueueAnim className={ classNames(bootstrap['list-group'], style.superTopicList) } duration={ 200 } interval={ 50 }>
          { this.superTopicListView() }
          {
            do{
              if(this.props.sinceId !== 'END'){
                <button className={ classNames(bootstrap.btn, bootstrap['btn-block'], bootstrap['btn-outline-info'], style.loadData) }
                  type="button"
                  disabled={ loading }
                  onClick={ this.handleLoadSuperTopicList }
                >
                  { loading ? '加载中...' : '加载数据' }
                </button>;
              }
            }
          }
        </QueueAnim>
      </div>
    );
  }
}

export default SuperTopicSignIn;