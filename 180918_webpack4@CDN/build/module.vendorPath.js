/**
 * 非npm安装的第三方包注册别名
 * ------------------------
 * 遵循文件目录结构
 * |- webpack.common.js
 * |- module.vendorPath.js
 * ------------------------
 * 注册第三方包别名
 * 规则（包名: 包路径）
 * 方式1 mouduleName: path.resolve(__dirname, 'src/lib/lib_es(5|6)/mouduleName.js')
 * 方式2 mouduleName: __dirname + '/src/lib/lib_es(5|6)/mouduleName.js'
 */
const path = require('path');
const vendorPath = {
  echarts: path.resolve(__dirname, '../src/lib/lib_es5/echarts.min.js')
};
module.exports = vendorPath;