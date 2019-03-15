import React from 'react';
import Helmet from 'react-helmet';
import { Layout } from 'antd';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import style from './style.sass';
import Ad from '../../../components/Ad/Ad';
import Footer from '../../../assembly/Footer/index';
import LoginForm from './LoginForm';

function Index(props) {
  return [
    <Helmet key="helmet">
      <title>登陆 - 微博签到系统</title>
    </Helmet>,
    <Layout key="element" className={ publicStyle.main }>
      <Layout.Content className={ style.content }>
        <div className={ style.form }>
          <Ad className={ style.loginAd } />
          <LoginForm />
          <Ad className={ style.loginAd } />
        </div>
      </Layout.Content>
      <Footer />
    </Layout>
  ];
}

export default Index;