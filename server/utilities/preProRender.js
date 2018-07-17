const replaceTemplate = require('./replaceTemplate');
const server = require('../../build-server/server').default;
const interfaces = require('../../service/interface/interfaces');

// 渲染新的html
async function preRender(html, file, ctx){
  const initialState = await interfaces(file, ctx);
  const render = server(file, {}, initialState);
  return replaceTemplate(html.toString(), {
    render,
    title: initialState.title,
    initialState: JSON.stringify(initialState)
  });
}

module.exports = preRender;