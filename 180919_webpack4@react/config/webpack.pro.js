/**
 * 生产环境
 * @const merge 合并配置插件
 * @const base 基础配置
 * @const pro 生产配置
 */
const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const pro = {
  mode: 'production', // development production
  output: {
    publicPath: './' // 静态资源路径 (start /) (build ./)
  },
  optimization: {
    splitChunks: {
      // 注册需要单独抽离第三方包
      cacheGroups: {
        vendor: {
          chunks: 'all', // async(默认, 只会提取异步加载模块的公共代码), initial(提取初始入口模块的公共代码), all(同时提取前两者)
          test: /node_modules/,
          name: 'common',
          priority: -20, // 小于`-10`才能进行抽离出异步模块
          minSize: 0, // 大于0kb就被抽离到公共模块
          minChunks: 1, // 模块出现1次就被抽离到公共模块
          maxAsyncRequests: 5 // 异步模块, 一次最多只能加载5个
        }
      }
    }
  }
};
module.exports = merge(base, pro);
