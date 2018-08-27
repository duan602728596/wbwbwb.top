import React, { Component } from 'react';
import { Layout } from 'antd';
import style from './style.sass';

class Footer extends Component{
  render(): React.Element{
    return (
      <Layout.Footer className={ style.footer }>
        <nav className={ style.footerNav }>
          <span>友情链接：</span>
          <a href="https://bw.lovelyctx.com/" target="_blank" rel="noopener noreferrer">口袋48禁用词汇查询</a>
        </nav>
      </Layout.Footer>
    );
  }
}

export default Footer;