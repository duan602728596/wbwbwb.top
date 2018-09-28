export function getHeadersCookie(headers: Object): string{
  if(typeof headers === 'object' && headers['set-cookie']){
    return headers['set-cookie'].join('; ');
  }else{
    return '';
  }
}