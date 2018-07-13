function title(file){
  switch(file){
    case '/Login':
      return '登陆 - 微博自动签到系统';
    default:
      return '微博自动签到系统';
  }
}

module.exports = title;