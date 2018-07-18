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
import { superTopic, qiandaoIdList } from '../store/reducer';
import style from './style.sass';

/* state */
const state: Function = createStructuredSelector({
  cards: createSelector(         // 超话列表
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('superTopicSignIn') ? $$state.get('superTopicSignIn') : null,
    ($$data: ?Immutable.Map): [] => $$data ? $$data.get('cards').toJS() : []
  ),
  sinceId: createSelector(       // sign_id
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('superTopicSignIn') ? $$state.get('superTopicSignIn') : null,
    ($$data: ?Immutable.Map): ?string => $$data ? $$data.get('sinceId') : null
  ),
  qiandaoIdList: createSelector( // 已签到列表
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('superTopicSignIn') ? $$state.get('superTopicSignIn') : null,
    ($$data: ?Immutable.Map): string[] => $$data && $$data.has('qiandaoIdList') ? $$data.get('qiandaoIdList').toJS() : []
  )
});

/* dispatch */
const dispatch: Function = (dispatch: Function): Object=>({
  action: bindActionCreators({
    superTopic,
    qiandaoIdList
  }, dispatch)
});

@connect(state, dispatch)
class SuperTopicSignIn extends Component{
  static propTypes: Object = {
    cards: PropTypes.array,
    action: PropTypes.objectOf(PropTypes.func),
    qiandaoIdList: PropTypes.arrayOf(PropTypes.string)
  };
  state: {
    loading: boolean
  } = {
    loading: false // 是否加载
  };
  clickLen: number = 0;  // 点击次数
  timer: ?number = null; // 定时器

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
  sheme: Function = (scheme: string): string => scheme.match(/containerid=[a-zA-Z0-9]+/)[0];
  // 重新加载所有的超话列表
  async getAllSuperTopicList(): Promise<void>{
    this.setState({
      loading: true
    });
    try{
      const cards: [] = [];
      let isBreak: boolean = false;
      let sinceId: ?string = null;
      while(isBreak === false){
        const res: Object = await this.getSuperTopicList(sinceId);
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
      message('success', '数据加载成功！');
    }catch(err){
      console.error(err);
      message('danger', '数据加载失败！');
    }
    this.setState({
      loading: false
    });
  }
  // 签到
  async handleQiandaoClick(containerid: string, item: Object, event: Event): void{
    try{
      const infor: ?Object = getUserInformation();
      const cookie: string = stringify({
        username: infor.username,
        ...infor.cookie
      });
      const uri: string = `/p/aj/general/button?${ cookie }&containerid=${ containerid }`;
      const { data }: { data: Object } = await axios({
        url: uri,
        method: 'GET'
      });
      if(data.code === '100000'){
        // 签到成功
        const { qiandaoIdList }: { qiandaoIdList: string[] } = this.props;
        if(!qiandaoIdList.includes(containerid)){
          qiandaoIdList.push(containerid);
          this.props.action.qiandaoIdList({
            data: qiandaoIdList
          });
        }
      }else{
        // 其他情况
        message('danger', `${ item.title_sub }（${ containerid }: ${ data.code }）签到失败！`);
      }
    }catch(err){
      console.error(err);
      message('danger', '签到失败！');
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
  // 连续点击三次的事件
  handleThreeClick: Function = (event: Event): void=>{
    if(this.timer !== null){
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.clickLen += 1;
    if(this.clickLen === 3){
      this.clickLen = 0;
      this.getAllSuperTopicList();
    }else{
      this.timer = setTimeout((): void=>{
        this.clickLen = 0;
      }, 2000);
    }
  };
  // 渲染超话列表
  superTopicListView(): React.ChildrenArray<React.Element>{
    const { qiandaoIdList }: { qiandaoIdList: string[] } = this.props;
    return this.props.cards.map((item: Object, index: number): React.Element=>{
      if(item.card_type === 8){
        const containerid: string = this.sheme(item.scheme);
        const isQiandao: boolean = qiandaoIdList.includes(containerid);
        return (
          <a key={ containerid } className={ classNames(
            bootstrap['list-group-item'],
            bootstrap['flex-column'],
            bootstrap['align-items-start'],
            style.listItem)
          }>
            <img className={ style.pic } src={ item.pic } />
            <div className={ classNames(bootstrap['d-flex'], bootstrap['justify-content-between'], style.content) }>
              <h5 className={ classNames(bootstrap['mb-1'], bootstrap['text-primary'], style.title) }>
                { item.title_sub }
                {
                  isQiandao ? (
                    <span className={ classNames(
                      bootstrap.badge,
                      bootstrap['badge-pill'],
                      bootstrap['badge-success'],
                      style.badge)
                    }>
                      已签到
                    </span>
                  ) : null
                }
              </h5>
              <small className={ bootstrap['text-muted'] }>{ item.desc1 }</small>
            </div>
            <p className={ classNames(bootstrap['mb-1'], style.text) }>{ item.desc2 }</p>
            {
              isQiandao ? null : (
                <button className={ classNames(bootstrap.btn, bootstrap['btn-primary'], bootstrap['btn-sm'], style.qiandao) }
                  type="button"
                  onClick={ this.handleQiandaoClick.bind(this, containerid, item) }
                >
                  签到
                </button>
              )
            }
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
            <li className={ classNames(bootstrap['breadcrumb-item'], bootstrap.active) }
              aria-current="page"
              onClick={ this.handleThreeClick }
            >
              超级话题签到
            </li>
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