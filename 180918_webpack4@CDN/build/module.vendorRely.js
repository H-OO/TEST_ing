/**
 * 注册项目模块以及模块依赖的第三方包（按需引入）
 * ------------------------
 * 遵循文件目录结构
 * |- webpack.common.js
 * |- webpack.prod.js
 * |- module.vendorRely.js
 * ------------------------
 * 非npm安装的第三方包需要先注册别名
 * ------------------------
 * 规则（项目模块名: 第三方包列表）
 */
const vendorRely = {
  demo: ['lodash', 'echarts'],
  demo2: ['lodash']
};
module.exports = vendorRely;