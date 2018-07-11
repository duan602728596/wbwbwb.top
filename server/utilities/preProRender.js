const replaceTemplate = require('./replaceTemplate');
const server = require('../../build-server/server').default;
const api = require('../interface/interface');
const title = require('../interface/title');

// 渲染新的html
async function preRender(html, file, context){
  const initialState = await api(file);
  const render = server(file, context, initialState);
  return replaceTemplate(html.toString(), {
    render,
    title: title(file),
    initialState: JSON.stringify(initialState)
  });
}

module.exports = preRender;