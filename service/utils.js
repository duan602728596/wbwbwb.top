exports.getHeadersCookie = function(headers) {
  if (typeof headers === 'object' && headers['set-cookie']) {
    return headers['set-cookie'].join('; ');
  } else {
    return '';
  }
};