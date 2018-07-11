/* 读取文件 */
const fs = require('fs');

function readFile(file){
  return new Promise((resolve, reject)=>{
    fs.readFile(file, (err, data)=>{
      if(err){
        resolve({
          status: 404,
          body: '404 not found.'
        });
      }else{
        resolve({
          status: 200,
          body: data
        });
      }
    });
  });
}

module.exports = readFile;