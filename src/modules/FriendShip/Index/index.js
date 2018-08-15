import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import QueueAnim from 'rc-queue-anim';
import { getUserInformation } from '../../../utils';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import bootstrap from '../../../components/publicStyle/bootstrap.sass';
import message from '../../../components/message/message';
import style from './style.sass';

class FriendShips extends Component{
  render(): React.Element{
    return (
      <div className={ classNames(publicStyle.main, publicStyle.fixedMain) }>
        <div className={ publicStyle.fixedNav }>
          <nav className={ publicStyle.nav } aria-label="breadcrumb">
            <ol className={ bootstrap.breadcrumb }>
              <li className={ bootstrap['breadcrumb-item'] }>
                <Link to="/Index">
                  <i className={ publicStyle.iconHome } />
                </Link>
              </li>
              <li className={ classNames(bootstrap['breadcrumb-item'], bootstrap.active) } aria-current="page">用户关注</li>
            </ol>
          </nav>
        </div>
        {/* list */}
        <QueueAnim className={ classNames(bootstrap['list-group'], style.friendShipList) } duration={ 200 } interval={ 50 }>
          <div className={ classNames(bootstrap['btn-group'], bootstrap['d-flex']) } role="group" aria-label="列表操作">
            <button className={ classNames(bootstrap.btn, bootstrap['btn-secondary'], style.groupBtn) }
              type="button"
            >
              加载所有列表
            </button>
            <button className={ classNames(bootstrap.btn, bootstrap['btn-warning'], style.groupBtn) }
              type="button"
            >
              取消选中关注
            </button>
          </div>
        </QueueAnim>
      </div>
    );
  }
}

export default FriendShips;