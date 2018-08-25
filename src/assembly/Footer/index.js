import React, { Component } from 'react';
import classNames from 'classnames';
import { Layout, Icon } from 'antd';
import style from './style.sass';

class Footer extends Component{
  render(): React.Element{
    return (
      <Layout.Footer className={ style.footer }>
        <nav className={ style.footerNav }>
          <span>友情链接：</span>
          <a href="https://bw.lovelyctx.com/" target="_blank" rel="noopener noreferrer">口袋48禁用词汇查询</a>
        </nav>
        <div>
          <span className={ style.footerSpan }>
            <a href="http://www.miitbeian.gov.cn" target="_blank" rel="noopener noreferrer">辽ICP备18005585号</a>
          </span>
          {/*
          <span className={ classNames(style.ml10, style.footerSpan) }>
            <img src={ require('./beian.png') } />
            <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=21108102211092"
              target="_blank"
              rel="noopener noreferrer"
            >
              辽公网安备 21108102211092
            </a>
          </span>
          */}
        </div>
      </Layout.Footer>
    );
  }
}

export default Footer;