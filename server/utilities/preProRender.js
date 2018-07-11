const replaceTemplate = require('./replaceTemplate');
const server = require('../../build-server/server').default;

// 渲染新的html
function preRender(html, file, context){
  const initialState = {};
  const render = server(file, context, initialState);
  return replaceTemplate(html.toString(), {
    render,
    initialState: JSON.stringify(initialState)
  });
}

module.exports = preRender;