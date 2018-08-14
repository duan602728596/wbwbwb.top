/* 广告渲染 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './style.sass';

class Ad extends Component{
  static propTypes: Object = {
    src: PropTypes.string,
    className: PropTypes.string
  };

  state: {
    isReady: boolean
  } = {
    isReady: false // 是否加载完毕
  };

  constructor(): void{
    super(...arguments);

    if(typeof window === 'object'){
      window.addEventListener('load', this.handleWindowLoad, false);
    }
  }
  // window加载广告事件
  handleWindowLoad: Function = (event: Event): void=>{
    this.setState({
      isReady: true
    });
    window.removeEventListener('load', this.handleWindowLoad);
  };
  render(): ?React.Element{
    const props: Object = this.props;

    if(this.state.isReady && props.src){
      return (
        <div className={ classNames(style.ad, props.className) }>
          <div className={ style.iframeBox }>
            <iframe src={ props.src } scrolling="no" width="100%" height="100%" frameborder="0" />
          </div>
          <span className={ style.text }>广告</span>
        </div>
      );
    }else{
      return null;
    }
  }
}

export default Ad;