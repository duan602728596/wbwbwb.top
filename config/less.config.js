/* less-loader 配置 (for antd) */

// 换肤
// https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
const modifyVars = {
  // -------- Colors -----------
  '@primary-color': '#faad14'
};

module.exports = {
  loader: 'less-loader',
  options: {
    javascriptEnabled: true,
    modifyVars
  }
};