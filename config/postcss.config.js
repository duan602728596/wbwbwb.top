const autoPreFixer = require('autoprefixer');

module.exports = {
  loader: 'postcss-loader',
  options: {
    plugins: [
      autoPreFixer
    ]
  }
};