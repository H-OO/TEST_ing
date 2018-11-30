'use strict';
/**
 * getEntry 动态获取入口配置对象
 * ---
 * @const path 内置路径模块
 * @const fs 内置文件模块
 * @function getModuleName 动态获取模块列表
 * @const projectsDir 获取终端启动的真实根路径
 * @const chalk 终端字体添加颜色
 * @const LogServer 日志服务
 * @const logServer 日志服务实例
 */

const path = require('path');
const fs = require('fs');
const getModuleName = require('./getModuleName');
const projectsDir = fs.realpathSync(process.cwd());
const chalk = require('chalk');
const LogServer = require('./logServer');
const logServer = new LogServer({
  fileName: ['error']
});

module.exports = function getEntry(dirName) {
  const dirPath = path.resolve(projectsDir, dirName); // { String } 目录绝对路径
  const dirList = getModuleName(dirPath); // { Array } 目录下的文件夹列表
  const entry = {};
  dirList.forEach((item) => {
    // 检查模块入口文件是否存在
    const entryFilePath = path.resolve(projectsDir, `src/${item}/index.tsx`); // 入口文件路径
    const isExists = fs.existsSync(entryFilePath); // { Boolean } 是否存在目录
    if (!isExists) {
      // 不存在入口文件
      const errMsg = `error: "${item}"模块缺少入口文件"index.tsx"，请检查！ ${entryFilePath}\n`;
      console.log(chalk.red(errMsg));
      logServer.write('error', errMsg); // 错误日志 写入错误信息
    } else {
      // 存在入口文件，加入`entry`
      entry[item] = `${dirPath}/${item}/index`; // js打包后的路径
    }
  })
  return entry; // { Object }
};
