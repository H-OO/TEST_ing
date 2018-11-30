'use strict';
/**
 * log-server 日志服务
 * 在终端运行目录生成日志文件
 * ---
 * @const path 内置路径模块
 * @const fs 内置文件模块
 * @const projectsDir 终端运行目录
 */
const path = require('path');
const fs = require('fs');
const projectsDir = fs.realpathSync(process.cwd());

class LogServer {
  constructor(arg) {
    const { fileName } = arg;
    this.fileName = fileName; // { Array<string> }
  }
  // 检查文件是否存在，存在则先删除
  exists() {
    const { fileName } = this;
    fileName.forEach(item => {
      const filePath = path.resolve(projectsDir, `${item}.log`); // 文件路径
      const isExists = fs.existsSync(filePath); // 检查文件是否存在
      if (isExists) {
        const isDir = fs.statSync(filePath).isDirectory(); // 判断是否为文件夹
        if (!isDir) {
          fs.unlinkSync(filePath); // 删除日志文件
        }
      }
    });
  }
  // 创建日志并写入信息
  write(fileName, content, writeMode = 'append') {
    // 参数：{ fileName: String; content: String; writeMode: String }
    // writeMode(write覆盖 append追加)
    const filePath = path.resolve(projectsDir, `${fileName}.log`); // 文件路径
    fs[`${writeMode}FileSync`](filePath, content); // 生成日志并将信息写入
  }
}

module.exports = LogServer;