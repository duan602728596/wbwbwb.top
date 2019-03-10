import React, { Component } from 'react';
import { Carousel } from 'antd';
import style from './style.sass';
import adConfig from './adConfig';
import { loadImgIfNotIsSupportedWebP } from '../../utils';

class CarouselAd extends Component {
  componentDidMount() {
    loadImgIfNotIsSupportedWebP();
  }
  shouldComponentUpdate() {
    return false;
  }
  // 数组随机打乱顺序
  randomList(lists) {
    const newList = [];

    while (lists.length !== 0) {
      const index = Math.floor(Math.random() * lists.length);

      newList.push(lists[index]);
      lists.splice(index, 1);
    }

    return newList;
  }
  // 渲染轮播图
  carouselItemView(lists) {
    return lists.map((item, index) => {
      return (
        <div key={ index } className={ style.carouselItem }>
          <a className={ style.carouselItemImage } href={ item.weibo } title={ item.title } target="_blank" rel="noopener noreferrer">
            <img src={ item.image } alt={ item.alt } />
          </a>
        </div>
      );
    });
  }
  render() {
    return (
      <div className={ style.carouselBox }>
        <Carousel autoplay={ true }>{ this.carouselItemView(this.randomList([...adConfig])) }</Carousel>
      </div>
    );
  }
}

export default CarouselAd;