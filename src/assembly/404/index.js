import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import publicStyle from '../../components/publicStyle/publicStyle.sass';
import style from './style.sass';

class Page404 extends Component {
  render() {
    return (
      <div className={ publicStyle.main }>
        <img className={ style.nvpu } src={ require('./nvpu.jpg') } />
        <p className={ style.text }>你好像迷路了呢！让我带你回家吧！</p>
        <div className={ style.center }>
          <Link to="/">
            <Button type="danger" icon="rollback" ghost={ true }>我要回家</Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Page404;