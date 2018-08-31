import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { Layout, Button, Modal } from 'antd';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import style from './style.sass';

/* state */
const state: Function = createStructuredSelector({
  title: createSelector(      // title
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('48live') ? $$state.get('48live').get('item') : null,
    ($$data: ?Immutable.Map): string => $$data !== null ? $$data.get('title') : ''
  ),
  subTitle: createSelector(   // subTitle
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('48live') ? $$state.get('48live').get('item') : null,
    ($$data: ?Immutable.Map): string => $$data !== null ? $$data.get('subTitle') : ''
  ),
  streamPath: createSelector( // streamPath
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('48live') ? $$state.get('48live').get('item') : null,
    ($$data: ?Immutable.Map): string => $$data !== null ? $$data.get('streamPath') : ''
  ),
  picPath: createSelector(    // picPath
    ($$state: Immutable.Map): ?Immutable.Map => $$state.has('48live') ? $$state.get('48live').get('item') : null,
    ($$data: ?Immutable.Map): string => $$data !== null ? $$data.get('picPath') : ''
  )
});

/* dispatch */
const dispatch: Function = (dispatch: Function): Object=>({
  action: bindActionCreators({}, dispatch)
});

@connect(state, dispatch)
class Item extends Component{
  static propTypes: Object = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    streamPath: PropTypes.string,
    picPath: PropTypes.string,
    action: PropTypes.objectOf(PropTypes.func)
  };

  videoRef: Object = createRef();
  flvPlayer: ?Object = null;

  componentDidMount(): void{
    if(this.props.streamPath){
      this.initVideo();
    }
  }
  // 全屏
  handleFullscreenClick: Function = (event: Event): void=>{
    const element: Element = this.videoRef.current;
    if(element.webkitRequestFullScreen) element.webkitRequestFullScreen();
    else if(element.requestFullscreen) element.requestFullscreen();
    else if(element.mozRequestFullScreen) element.mozRequestFullScreen();
  };
  // 播放
  handleVideoPlayClick: Function = (event: Event): void=>{
    this.flvPlayer.play();
  };
  // 暂停
  handleVideoPauseClick: Function = (event: Event): void=>{
    this.flvPlayer.pause();
  };

  // 静音
  handleMutedClick: Function = (event: Event): void=>{
    this.flvPlayer.muted = !this.flvPlayer.muted;
  };
  // flv.js
  async initVideo(): Promise<void>{
    const Module: Object = await import('flv.js');
    const flvjs: Object = Module.default;
    const sp: string[] = this.props.streamPath.split(/\./g);
    if(flvjs.isSupported()){
      this.flvPlayer = flvjs.createPlayer({
        type: sp[sp.length - 1],
        url: `/48/live?url=${ this.props.streamPath }`
      });
      this.flvPlayer.attachMediaElement(this.videoRef.current);
      this.flvPlayer.load();
    }else{
      Modal.error({
        content: 'The Media Source Extensions API is not supported.'
      });
    }
  }
  render(): React.Element{
    return (
      <Layout className={ publicStyle.main }>
        <div className={ style.videoBox }>
          <div className={ style.video }>
            <video ref={ this.videoRef } width="100%" height="100%" controls={ true } poster={ this.props.picPath } />
          </div>
        </div>
        <div className={ style.infor }>
          <h2 className={ style.title }>{ this.props.title }</h2>
          <h3>{ this.props.subTitle }</h3>
        </div>
        <div className={ style.tools }>
          <Button className={ style.mr10 } icon="tablet" onClick={ this.handleFullscreenClick }>全屏</Button>
          <Button className={ style.mr10 } icon="play-circle-o" onClick={ this.handleVideoPlayClick }>播放</Button>
          <Button className={ style.mr10 } icon="pause" onClick={ this.handleVideoPauseClick }>暂停</Button>
          <Button icon="notification" onClick={ this.handleMutedClick }>静音</Button>
        </div>
      </Layout>
    );
  }
}

export default Item;