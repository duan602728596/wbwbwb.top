/* 广告渲染 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tag } from 'antd';
import style from './style.sass';
import adConfig from './adConfig';
import { loadImgIfNotIsSupportedWebP } from '../../utils';

class Ad extends Component{
  static propTypes: Object = {
    className: PropTypes.string
  };

  componentDidMount(): void{
    loadImgIfNotIsSupportedWebP();
  }
  shouldComponentUpdate(): boolean{
    return false;
  }
  render(): ?React.Element{
    const props: Object = this.props;
    const item: Object = adConfig[Math.floor(Math.random() * adConfig.length)];

    return (
      <div className={ classNames(style.ad, props.className) }>
        <a className={ style.adBox } href={ item.weibo } title={ item.title } target="_blank" rel="noopener noreferrer">
          <img src={ item.image } alt={ item.alt }  />
        </a>
        <Tag className={ style.text }>广告</Tag>
      </div>
    );
  }
}

export default Ad;