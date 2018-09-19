import React, { Component } from 'react';
import { Carousel } from 'antd';
import style from './style.sass';

const list: [] = [
  {
    img: 'https://oss.skygrass.club/popularize/wxj1.jpg?x-oss-process=image/resize,m_mfit,w_568,h_171',
    url: 'https://weibo.com/p/1004065490234918/home?from=page_100406&mod=TAB#place',
    title: '滑板少女王晓佳 @SNH48-王晓佳'
  },
  {
    img: 'https://www.wbwbwb.top:5056/image/hty1.jpg',
    url: 'https://weibo.com/u/5863498042?refer_flag=1001030102_&is_all=1',
    title: '欢迎关注@SNH48-黄彤扬'
  },
  {
    img: 'https://www.wbwbwb.top:5056/image/xusiyang1.jpg',
    url: 'https://weibo.com/u/5891500145?topnav=1&wvr=6&topsug=1&is_all=1',
    title: '顼凘炀18岁生日快乐！@BEJ48-顼凘炀'
  },
  {
    img: 'https://www.wbwbwb.top:5056/image/chenyayu1.jpg',
    url: 'https://weibo.com/u/6017289512?refer_flag=1001030102_',
    title: '@BEJ48-陈雅钰'
  },
  {
    img: 'https://www.wbwbwb.top:5056/image/linsiyi1.jpg',
    url: 'https://weibo.com/u/3675865547?refer_flag=1001030101_&is_all=1',
    title: '林思意了解一下@SNH48-林思意'
  }
];

class CarouselAd extends Component{
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
          <a className={ style.carouselItemImage } href={ item.url } title={ item.title } target="_blank" rel="noopener noreferrer">
            <img src={ item.img } title={ item.title } alt={ item.title } />
          </a>
        </div>
      );
    });
  }
  render(): React.Element{
    return (
      <div className={ style.carouselBox }>
        <Carousel autoplay={ true }>{ this.carouselItemView(this.randomList([...list])) }</Carousel>
      </div>
    );
  }
}

export default CarouselAd;