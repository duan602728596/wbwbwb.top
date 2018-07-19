// 替换模板内的占位符
function replaceTemplate(template, data){
  let newTp = template;
  for(const key in data){
    const reg = new RegExp(`{%\\s*${ key }\\s*%}`);
    newTp = newTp.replace(reg, data[key]);
  }
  return newTp;
}

module.exports = replaceTemplate;