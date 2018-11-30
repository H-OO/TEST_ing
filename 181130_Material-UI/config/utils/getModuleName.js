'use strict';
/**
 * getModuleName 动态获取模块列表
 * ---
 * @const path 内置路径模块
 * @const fs 内置文件模块
 */

const path = require('path');
const fs = require('fs');

module.exports = function getModuleName(dir) {
  // console.log(dir);
  const moduleArr = []; // 模块列表
  const isExists = fs.existsSync(dir); // { Boolean } 是否存在目录
  if (isExists) {
    const readdir = fs.readdirSync(dir); // { Array } 获取目录下一级`文件与文件夹`名称
    readdir.forEach(item => {
      const currentDir = path.resolve(dir, item); // { String } 一级文件夹路径
      const isDirectory = fs.statSync(currentDir).isDirectory(); // { Boolean } 判断是否为文件夹
      const isTypingsDir = currentDir.includes('typings'); // { Boolean } 判断是否为`typings`文件夹，忽略该文件夹
      if (isDirectory && !isTypingsDir) {
        moduleArr.push(item); // 将文件夹名追加进空数组中
      }
    });
    return moduleArr; // { Array }
  }
};
