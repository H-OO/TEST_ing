/**
 * 本地第三方资源，非npm安装
 * path.resolve(__dirname, 'src/lib/xx.js')
 */
const venderLocal = {
  echarts: {
    path: 'src/lib_ES5/echarts.min.js'
  },
  drag: {
    path: 'src/lib_ES6/drag.js'
  }
};
module.exports = venderLocal;
