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

class FriendShips extends Component{
  render(): React.ChildrenArray<React.Element>{
    return [
      <Layout key="main" id="friend-ship-main" className={ publicStyle.main }>
        <Layout.Header className={ publicStyle.header }>
          <Row type="flex">
            <Breadcrumb className={ publicStyle.breadcrumb }>
              <Breadcrumb.Item className={ publicStyle.breadcrumbItem }>
                <Link to="/Index">
                  <Icon type="home" />
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>用户关注</Breadcrumb.Item>
            </Breadcrumb>
          </Row>
        </Layout.Header>
      </Layout>,
      typeof document === 'object' ? ReactDOM.createPortal(
        <BackTop target={ (): Element => document.getElementById('friend-ship-main') } />,
        document.body
      ) : null
    ];
  }
}

export default FriendShips;