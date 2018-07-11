const replaceTemplate = require('./replaceTemplate');

// 清除模块缓存
function cleanRequireCache(module){
  const modulePath = require.resolve(module);
  if(module.parent){
    module.parent.children.splice(module.parent.children.indexOf(module), 1);
  }
  require.cache[modulePath] = null;
}

// 渲染新的html
function preRender(html, file, context){
  const initialState = {};
  cleanRequireCache('../../build-server/server');
  const server = require('../../build-server/server').default;
  const render = server(file, context, initialState);
  return replaceTemplate(html.toString(), {
    render,
    initialState: JSON.stringify(initialState)
  });
}

module.exports = preRender;