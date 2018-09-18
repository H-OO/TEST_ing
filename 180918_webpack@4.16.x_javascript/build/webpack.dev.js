/**
 * 开发环境
 * @const path node内置模块
 * @const merge 配置文件合并插件
 * @const base 基础配置
 * @const devConfig 开发环境配置
 */
const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // host: '192.168.1.xxx', // 域名/IP，默认localhost
    // port: '5000', // 端口，默认8080
    contentBase: path.resolve(__dirname, '../dist'), // devServer访问该目录的文件
    openPage: 'demo/demo.html', // 【默认打开页面】！！！
    inline: true // 用来支持dev-server自动刷新的配置
  },
  output: {
    publicPath: '/' // 静态资源路径 (start /) (build ../)
  }
};
module.exports = merge(base, devConfig);