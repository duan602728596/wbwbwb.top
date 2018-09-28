import process from 'process';

export default {
  apiUri: `http://localhost:${ process.env.HTTP_SERVER_PORT }`
};