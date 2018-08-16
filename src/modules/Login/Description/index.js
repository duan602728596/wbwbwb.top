import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import classNames from 'classnames';
import { Layout, Button } from 'antd';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import bootstrap from '../../../components/publicStyle/bootstrap.sass';
import style from './style.sass';

class Description extends Component{
  render(): React.ChildrenArray<React.Element>{
    return [
      <Helmet key="helmet">
        <title>网站说明</title>
      </Helmet>,
      <Layout key="element" className={ publicStyle.main }>
        <h1 className={ style.title }>网站说明</h1>
        <article className={ style.text }>
          <p className={ style.p }>1、本网站内容仅用于学习交流，非商用、非盈利。</p>
          <p className={ style.p }>2、本网站不会储存任何账号密码，接口仅作为中间服务。如有账号相关问题，本网站概不负责。</p>
          <Link to="/Login">
            <Button type="primary">返回</Button>
          </Link>
        </article>
      </Layout>
    ];
  }
}

export default Description;