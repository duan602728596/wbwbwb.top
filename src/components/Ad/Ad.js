/* 广告渲染 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Tag } from 'antd';
import NoSSR from 'react-no-ssr';
import style from './style.sass';
import adConfig from './adConfig';
import { loadImgIfNotIsSupportedWebP } from '../../utils';

class Ad extends Component {
  static propTypes = {
    className: PropTypes.string
  };

  constructor() {
    super(...arguments);

    this.state = {
      item: adConfig[Math.floor(Math.random() * adConfig.length)]
    };
  }

  componentDidMount() {
    loadImgIfNotIsSupportedWebP();
  }

  render() {
    const { props } = this;
    const { item } = this.state;
    const className = classNames(style.ad, props.className);

    return (
      <NoSSR onSSR={ <div className={ className } /> }>
        <div className={ className }>
          <a className={ style.adBox } href={ item.weibo } title={ item.title } target="_blank" rel="noopener noreferrer">
            <img src={ item.image } alt={ item.alt } />
          </a>
          <Tag className={ style.text }>广告</Tag>
        </div>
      </NoSSR>
    );
  }
}

export default Ad;