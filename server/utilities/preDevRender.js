const replaceTemplate = require('./replaceTemplate');
const api = require('../interface/interface');
const title = require('../interface/title');

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
  const initialState = await api(file);
  cleanRequireCache('../../build-server/server');
  const server = require('../../build-server/server').default;
  const render = server(file, context, initialState);
  return replaceTemplate(html.toString(), {
    render,
    title: title(file),
    initialState: JSON.stringify(initialState)
  });
}

module.exports = preRender;