import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector, createStructuredSelector } from 'reselect';
import { Layout, Button, Modal } from 'antd';
import axios from 'axios';
import publicStyle from '../../../components/publicStyle/publicStyle.sass';
import style from './style.sass';

/* state */
const state = createStructuredSelector({
  title: createSelector( // title
    ($$state) => $$state.has('48live') ? $$state.get('48live').get('item') : null,
    ($$data) => $$data !== null ? $$data.get('title') : ''
  ),
  nickname: createSelector( // nickname
    ($$state) => $$state.has('48live') ? $$state.get('48live').get('item') : null,
    ($$data) => $$data !== null ? $$data.get('nickname') : ''
  ),
  picPath: createSelector( // picPath
    ($$state) => $$state.has('48live') ? $$state.get('48live').get('item') : null,
    ($$data) => $$data !== null ? $$data.get('picPath') : ''
  ),
  liveId: createSelector( // liveId
    ($$state) => $$state.has('48live') ? $$state.get('48live').get('item') : null,
    ($$data) => $$data !== null ? $$data.get('liveId') : ''
  )
});

/* dispatch */
const dispatch = (dispatch) => ({
  action: bindActionCreators({}, dispatch)
});

@connect(state, dispatch)
class Item extends Component {
  static propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    streamPath: PropTypes.string,
    picPath: PropTypes.string,
    action: PropTypes.objectOf(PropTypes.func)
  };

  videoRef = createRef();
  flvPlayer = null;

  state = {
    streamPath: undefined
  };

  componentDidMount() {
    this.initVideo();
  }

  // 全屏
  handleFullscreenClick = (event) => {
    const element = this.videoRef.current;

    if (element.webkitRequestFullScreen) element.webkitRequestFullScreen();
    else if (element.requestFullscreen) element.requestFullscreen();
    else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
  };

  // 播放
  handleVideoPlayClick = (event) => {
    this.flvPlayer.play();
  };

  // 暂停
  handleVideoPauseClick = (event) => {
    this.flvPlayer.pause();
  };

  // 静音
  handleMutedClick = (event) => {
    this.flvPlayer.muted = !this.flvPlayer.muted;
  };

  // flv.js
  async initVideo() {
    const Module = await import(/* webpackChunkName: 'flvjs' */'flv.js');
    const flvjs = Module.default;
    const res = await axios.get(`/48/live/streamPath?liveId=${ this.props.liveId }`);
    const { streamPath } = res.data;

    if (flvjs.isSupported()) {
      this.flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: `/48/live?url=${ streamPath }`
      });
      this.flvPlayer.attachMediaElement(this.videoRef.current);
      this.flvPlayer.load();
    } else {
      Modal.error({
        content: 'The Media Source Extensions API is not supported.'
      });
    }

    this.setState({
      streamPath
    });
  }

  render() {
    const { streamPath } = this.state;

    return (
      <Layout className={ publicStyle.main }>
        <div className={ style.videoBox }>
          <div className={ style.video }>
            <video ref={ this.videoRef } width="100%" height="100%" controls={ true } poster={ this.props.picPath } />
          </div>
        </div>
        <div className={ style.infor }>
          <h2 className={ style.title }>{ this.props.title }</h2>
          <h3>{ this.props.nickname }</h3>
          <p>{ streamPath }</p>
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