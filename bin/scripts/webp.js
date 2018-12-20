var isSupportedWebP = isSupportedWebP || false;
(function(){
  var canvas = document.createElement('canvas');
  var image = canvas.toDataURL('image/webp');
  isSupportedWebP = image.indexOf('data:image/webp') >= 0;
  canvas = null;
})();