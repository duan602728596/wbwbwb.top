const replaceTemplate = require('./replaceTemplate');
const interfaces = require('../interface/interfaces');

// 清除模块缓存
function cleanRequireCache(module){
  const modulePath = require.resolve(module);
  if(module.parent){
    module.parent.children.splice(module.parent.children.indexOf(module), 1);
  }
  require.cache[modulePath] = null;
}

// 渲染新的html
async function preRender(html, file, context){
  const initialState = await interfaces(file);
  cleanRequireCache('../../build-server/server');
  const server = require('../../build-server/server').default;
  const render = server(file, context, initialState);
  
  return replaceTemplate(html.toString(), {
    render,
    title: initialState.title,
    initialState: JSON.stringify(initialState)
  });
}

module.exports = preRender;