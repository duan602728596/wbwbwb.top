import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import bootstrap from '../../../components/publicStyle/bootstrap.sass';
import { superTopic } from '../store/reducer';
import style from './style.sass';

/* state */
const getSuperTopicSignIn: Function = ($$state: Immutable.Map): ?Immutable.Map => $$state.has('superTopicSignIn')
  ? $$state.get('superTopicSignIn') : null;
const state: Function = createStructuredSelector({
  cards: createSelector(     // 超话列表
    getSuperTopicSignIn,
    ($$data: ?Immutable.Map): number => $$data ? $$data.get('cards').toJS() : []
  ),
  signId: createSelector(    // sign_id
    getSuperTopicSignIn,
    ($$data: ?Immutable.Map): ?string => $$data ? $$data.get('username') : null
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

  // sheme
  sheme(scheme: string): string{
    return scheme.match(/containerid=[a-zA-Z0-9]+/)[0];
  }
  // 渲染超话列表
  superTopicListView(): React.ChildrenArray<React.Element>{
    return this.props.cards.map((item: Object, index: number): React.Element=>{
      if(item.card_type === 8){
        return (
          <a key={ this.sheme(item.scheme) } className={ classNames(
            bootstrap['list-group-item'],
            bootstrap['flex-column'],
            bootstrap['align-items-start'],
            style.listItem
          ) }>
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
    console.log(this.props.cards);
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
        <div className={ classNames(bootstrap['list-group'], style.superTopicList) }>{ this.superTopicListView() }</div>
      </div>
    );
  }
}

export default SuperTopicSignIn;