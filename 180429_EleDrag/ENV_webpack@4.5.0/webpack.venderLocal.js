/**
 * 本地第三方资源，非npm安装
 * path.resolve(__dirname, 'src/lib/xx.js')
 */
const venderLocal = {
  drag: {
    path: 'src/lib_ES6/drag.js'
  },
  move: {
    path: 'src/lib_ES5/move.js'
  }
};
module.exports = venderLocal;
