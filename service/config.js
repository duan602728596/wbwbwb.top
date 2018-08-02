const process = require('process');

module.exports = {
  apiUri: `http://localhost:${ process.env.HTTP_SERVER_PORT }`
};