/**
 * 非npm安装的第三方包注册别名
 * ---
 * 规则 mouduleName: moudulePath
 * 使用 import mouduleName from 'mouduleName'
 */
const path = require('path');
const alias = {
  // 规则 mouduleName: path.resolve(__dirname, 'src/asset/mouduleName.js')
};
module.exports = alias;
