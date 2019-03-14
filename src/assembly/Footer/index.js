import React from 'react';
import { Layout } from 'antd';
import style from './style.sass';

function Footer() {
  return (
    <Layout.Footer className={ style.footer }>
      <nav className={ style.footerNav }>
        <span>友情链接：</span>
        <a href="https://bw.lovelyctx.com" target="_blank" rel="noopener noreferrer">口袋48禁用词汇查询</a>
        <a href="http://docs.skygrass.club" target="_blank" rel="noopener noreferrer">QQ群黑名单API文档</a>
      </nav>
    </Layout.Footer>
  );
}

export default Footer;