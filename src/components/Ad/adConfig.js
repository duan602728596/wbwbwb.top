import { loadWebP } from '../../utils';

const adConfig: Object[] = [
  {
    image: loadWebP(require('./image/chenyayu1.webp'), require('./image/chenyayu1.jpg')),
    weibo: 'https://weibo.com/u/6017289512?refer_flag=1001030102_',
    alt: 'BEJ48-陈雅钰',
    title: '欢迎关注@BEJ48-陈雅钰'
  },
  {
    image: loadWebP(require('./image/hty1.webp'), require('./image/hty1.jpg')),
    weibo: 'https://weibo.com/u/5863498042?refer_flag=1001030102_&is_all=1',
    alt: 'SNH48-黄彤扬',
    title: '欢迎关注@SNH48-黄彤扬'
  },
  {
    image: loadWebP(require('./image/linsiyi1.webp'), require('./image/linsiyi1.jpg')),
    weibo: 'https://weibo.com/u/3675865547?refer_flag=1001030101_&is_all=1',
    alt: '林思意了解一下@SNH48-林思意',
    title: '林思意了解一下@SNH48-林思意'
  },
  {
    image: 'https://oss.skygrass.club/popularize/wxj1.jpg?x-oss-process=image/resize,m_mfit,w_568,h_171',
    weibo: 'https://weibo.com/p/1004065490234918?is_all=1',
    alt: 'SNH48-王晓佳，滑板少女王晓佳',
    title: '滑板少女王晓佳'
  },
  {
    image: loadWebP(require('./image/xusiyang1.webp'), require('./image/xusiyang1.jpg')),
    weibo: 'https://weibo.com/u/5891500145?topnav=1&wvr=6&topsug=1&is_all=1',
    alt: '顼凘炀18岁生日快乐！@BEJ48-顼凘炀',
    title: '欢迎关注@BEJ48-顼凘炀'
  }
];

export default adConfig;