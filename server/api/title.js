function title(file){
  switch(file){
    case '/Login':
      return '微博登陆';
    default:
      return '';
  }
}

module.exports = title;