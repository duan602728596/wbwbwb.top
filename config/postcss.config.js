/* postcss-loader 配置 */
const autoPreFixer = require('autoprefixer');

module.exports = {
  loader: 'postcss-loader',
  options: {
    plugins: [
      autoPreFixer
    ]
  }
};