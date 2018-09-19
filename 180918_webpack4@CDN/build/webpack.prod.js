/**
 * 生产环境
 * @const path node路径模块
 * @const merge 合并配置插件
 * @const base 基础配置
 * @const FileManagerPlugin 压缩文件夹插件
 * @const prodConfig 生产环境配置
 * @const vendorRely 模块依赖的第三方包
 * @let vendorList 第三方包列表（唯一性）
 * @const cacheGroups 注册需要单独抽离第三方包
 */
const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const FilesUploadCDN = require('../plugins/webpack.filesUploadCDN.js');
const prodConfig = {
  mode: 'production',
  output: {
    // publicPath: '../' // 静态资源路径 (start /) (build ../)
    publicPath: 'http://cdn/project/' // 静态资源路径 (start /) (build ../)
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // __BRIDGE__ 抽离webpack生成的代码 为了让第三方包和逻辑模块保持纯净（起到连接作用）
        __BRIDGE__: {
          chunks: 'initial', // initial初始化 async动态加载
          enforce: true,
          name: '__BRIDGE__',
          priority: 9, // 控制插入body标签的顺序 数值越小越后插入
          test: /node_modules|lib_es5|lib_es6/, // 指定目录才进行抽离，主要针对第三方包和公共的服务
        }
      }
    }
  },
  plugins: [
    // 将构建好的项目进行zip压缩并上传CDN
    new FilesUploadCDN({
      buildDir: 'dist',
      output: {
        dirname: 'package',
        filename: 'dist.zip'
      }
    })
  ]
};
// 整理模块依赖的所有第三方包，进行去重，将结果加入配置中进行注册抽离
const vendorRely = require('./module.vendorRely');
let vendorList = [];
for(let item in vendorRely) {
  vendorList = vendorList.concat(vendorRely[item]);
}
vendorList = Array.from(new Set(vendorList));
const cacheGroups = prodConfig.optimization.splitChunks.cacheGroups;
vendorList.map(name => {
  // 第三方包抽离规则
  cacheGroups[name] = {
    chunks: 'initial',  // `initial`初始化 `async`动态加载
    name,
    priority: 10,
    test: new RegExp(name)
  };
});

module.exports = merge(base, prodConfig);