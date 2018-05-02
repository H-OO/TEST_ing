/**
 * 控制当前Webpack的使用环境
 * ---
 * @param development 开发环境 指令npm run start
 * 作用：开启devServer自动刷新浏览器
 * ---
 * @param production  生产环境 指令npm run build
 * 作用：打包上线（已优化输出文件）
 * ---
 */

 module.exports = 'development'; // development | production