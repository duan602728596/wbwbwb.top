import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import bootstrap from '../../../components/publicStyle/bootstrap.sass';
import style from './style.sass';

class Description extends Component{
  render(): React.ChildrenArray<React.Element>{
    return [
      <Helmet key="helmet">
        <title>网站说明</title>
      </Helmet>,
      <div key="element" className={ publicStyle.main }>
        <h1 className={ classNames(bootstrap['text-center'], bootstrap['text-primary'], style.title) }>网站说明</h1>
        <article className={ classNames(bootstrap['text-center'], style.text) }>
          <p className={ classNames(bootstrap['text-left'], style.p) }>1、本网站内容仅用于学习交流，非商用、非盈利。</p>
          <p className={ classNames(bootstrap['text-left'], style.p) }>2、本网站不会储存任何账号密码，接口仅作为中间服务。如有账号相关问题，本网站概不负责。</p>
          <Link className={ classNames(bootstrap.btn, bootstrap['btn-outline-dark'], style.back) } to="/Login">返回</Link>
        </article>
      </div>
    ];
  }
}

export default Description;