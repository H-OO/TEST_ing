'use strict';
/**
 * getCacheGroups 动态获取`cacheGroups`对象成员
 * ---
 * @const path 内置路径模块
 * @const fs 内置文件模块
 * @function getModuleName 动态获取模块列表
 * @const projectsDir 获取终端启动的真实根路径
 */

const path = require('path');
const fs = require('fs');
const getModuleName = require('./getModuleName');
const projectsDir = fs.realpathSync(process.cwd());

module.exports = function getCacheGroups(dirName) {
  let allChunks = []; // { Array<string> } 收集所有模块依赖包名称
  getModuleName(dirName).forEach((item) => {
    const pageInfoPath = path.resolve(projectsDir, `src/${item}/_CONFIG/pageInfo`); // 用户页面配置文件路径
    try {
      const { chunks } = require(pageInfoPath); // { Array<string> }
      allChunks.push(...chunks);
    } catch (err) {}
  });

  allChunks = Array.from(new Set(allChunks)); // 去重

  // 动态添加`cacheGroups`成员
  const cacheGroups = {};
  allChunks.forEach((item) => {
    // 成员配置格式参考
    // 'lodash': {
    //   name: 'lodash',
    //   test: new RegExp('lodash'),
    //   chunks: 'all',
    //   priority: -20, // 插入body的顺序，值越小越后插入
    //   enforce: true // 强制抽离
    //   minChunks: 1, // 使用次数大于1次就会抽离 (可不加)
    //   minSize: 0, // chunk体积大于0就会抽离 (可不加)
    // }
    // console.log(item);
    cacheGroups[item] = { // 属性名与包引用无关联
      name: item, // 路径+文件名(错误配置能被抽离)(需与chunk名一致，否则无法生成script标签)
      test: new RegExp(
        item.includes('/') ? `${item.replace(/\//g, '.+')}[^0-9a-zA-Z]` + '' : `${item}[^0-9a-zA-Z]` // '**/**/*' webpack 内部会转义成 '**\\/**/\\/*' 导致正则无法匹配
      ), // 匹配包路径
      chunks: 'all', // 同步异步全抽离
      priority: -10, // 插入body的顺序，值越小越后插入
      enforce: true // 强制抽离
    };
  });
  return cacheGroups; // { Object }
};
