/* 代码压缩 */
const path = require('path');
const fs = require('fs');
const terser = require('terser');

function readFile(file){
  return new Promise((resolve, reject)=>{
    fs.readFile(file, (err, data)=>{
      if(err){
        reject(err);
      }else{
        resolve(data.toString());
      }
    })
  }).catch((err)=>{
    console.error(err);
  });
}

function writeFile(file, data){
  return new Promise((resolve, reject)=>{
    fs.writeFile(file, data, (err)=>{
      if(err){
        reject(err);
      }else{
        resolve();
      }
    })
  }).catch((err)=>{
    console.error(err);
  });
}

(async function(){
  const code = await Promise.all([
    readFile(path.join(__dirname, 'scripts/ie.js')),
    readFile(path.join(__dirname, 'scripts/webp.js')),
  ]);

  const [ie, webp] = [terser.minify(code[0]), terser.minify(code[1])];
  const scripts = `script ${ ie.code }\nscript ${ webp.code }`;

  await writeFile(path.join(__dirname, '../src/scripts.pug'), scripts);
})();