const path = require('path');
const fs = require('fs');

function pathAnalyze(file){
  const file2 = file.slice(1);
  if(file2 === ''){
    return 'index';
  }else{
    return file2.toLowerCase()
      .replace(/\//g, '.'); 
  }
}

async function interfaces(file, ctx){
  const initialState = {
    time: new Date().getTime(),
    title: '微博签到系统'
  };
  const filePath = path.resolve(__dirname, 'api', `${ pathAnalyze(file) }.js`);
  const api = fs.existsSync(filePath) ? await require(filePath)(ctx) : {};
  return Object.assign(initialState, api);
}

module.exports = interfaces;