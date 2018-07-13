function title(file){
  switch(file){
    case '/Login':
      return '登陆';
    default:
      return '';
  }
}

module.exports = title;