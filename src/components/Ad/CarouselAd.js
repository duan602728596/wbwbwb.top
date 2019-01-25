import React, { Component } from 'react';
import { Carousel } from 'antd';
import style from './style.sass';
import adConfig from './adConfig';
import { loadImgIfNotIsSupportedWebP } from '../../utils';

class CarouselAd extends Component{
  componentDidMount(): void{
    loadImgIfNotIsSupportedWebP();
  }
  shouldComponentUpdate(): boolean{
    return false;
  }
  // 数组随机打乱顺序
  randomList(lists: []): []{
    const newList: [] = [];

    while(lists.length !== 0){
      const index: number = Math.floor(Math.random() * lists.length);
      newList.push(lists[index]);
      lists.splice(index, 1);
    }

    return newList;
  }
  // 渲染轮播图
  carouselItemView(lists: []): React.ChildrenArray<React.Element>{
    return lists.map((item: Object, index: number): React.Element=>{
      return (
        <div key={ index } className={ style.carouselItem }>
          <a className={ style.carouselItemImage } href={ item.weibo } title={ item.title } target="_blank" rel="noopener noreferrer">
            <img src={ item.image } alt={ item.alt } />
          </a>
        </div>
      );
    });
  }
  render(): React.Element{
    return (
      <div className={ style.carouselBox }>
        <Carousel autoplay={ true }>{ this.carouselItemView(this.randomList([...adConfig])) }</Carousel>
      </div>
    );
  }
}

export default CarouselAd;