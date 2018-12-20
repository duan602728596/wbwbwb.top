(function () {
  var userAgent = window.navigator.userAgent;
  if (/MSIE\s[0-9]{1,2}\.0;/i.test(userAgent)) {
    function handleWindowLoad(event) {
      var ieLv = userAgent.match(/MSIE\s[0-9]{1,2}\.0;/i)[0].match(/[0-9]{1,2}/)[0];
      var element = document.createElement('div');
      element.innerHTML = '<p style="font-size: 16px; text-align: center;">你正在使用IE' + ieLv + '浏览器，你当前的浏览器版本过低。</p>'
        + '<p style="font-size: 16px; text-align: center;">为了更好的体验，请升级你的浏览器。</p>';
      element.style.padding = '20px 10px';
      document.body.appendChild(element);
      document.getElementById('app').style.display = 'none';
      element = null;
      window.detachEvent('onload', handleWindowLoad);
    }

    window.attachEvent('onload', handleWindowLoad);
  }
})();