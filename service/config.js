const process = require('process');

const uri = 'http://localhost';
const port = process.env.NODE_ENV === 'production' ? 5051 : 5050;

module.exports = {
  apiUri: `${ uri }:${ port }`
};