import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import publicStyle from '../../components/publicStyle/publicStyle.sass';
import bootstrap from '../../components/publicStyle/bootstrap.sass';
import style from './style.sass';

class Page404 extends Component{
  render(): React.Element{
    return (
      <div className={ publicStyle.main }>
        <img className={ style.nvpu } src={ require('./nvpu.jpg') } />
        <p className={ classNames(bootstrap['text-center'], style.text) }>你好像迷路了呢！让我带你回家吧！</p>
        <div className={ bootstrap['text-center'] }>
          <Link className={ classNames(bootstrap.btn, bootstrap['btn-primary']) } to="/">我要回家</Link>
        </div>
      </div>
    );
  }
}

export default Page404;