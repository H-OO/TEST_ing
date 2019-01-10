'use strict';
/**
 * Merger
 * v0.0.1
 * ---
 * 检索所有HTML中的标签占位符，将其替换成代码块后，输出到一个新文件夹中
 * ---
 * 所有fs操作为同步执行
 */
const path = require('path');
const fs = require('fs');

class Merger {
  constructor(args) {
    /**
     * @this entry 入口目录 { string }
     * @this output 输出目录 { string }
     * @this tmp 模板目录 { string }
     * @this tmpFileStream 模板文件流 { object }
     */
    this.entry = args.entry;
    this.output = args.output;
    this.tmp = args.tmp;
    this.tmpFileStream = {};
  }
  /**
   * 初始化
   * init { () => void }
   */
  init() {
    this.cleanFolder(this.output);
    this.getTmpFileStream(this.tmp);
    this.mergeHandler({
      entry: this.entry,
      output: this.output,
      tmp: this.tmp
    });
  }
  /**
   * 读取模板目录下的文件，获取文件流并保存待用
   * getTmpFileStream { (dir: string) => void }
   */
  getTmpFileStream(dir) {
    const _dir = dir;
    const list = fs.readdirSync(_dir);
    // 遍历模板目录下的HTML文件
    list.forEach(item => {
      if (!item.includes('.html')) {
        return;
      }
      const filename = path.resolve(_dir, item);
      const stream = fs.readFileSync(filename).toString();
      const key = item.replace('.html', '');
      this.tmpFileStream[key] = stream;
    });
  }
  /**
   * 合并
   * mergeHandler { (params: object) => void }
   */
  mergeHandler(params) {
    const { entry, output, tmp } = params;
    // 获取目录下的所有文件夹与文件名
    const files = fs.readdirSync(entry);
    // 1.过滤非目标文件，仅保留html文件名、文件夹名
    const folder = []; // 文件夹
    const htmlFile = []; // html文件
    files.forEach(file => {
      const filename = path.resolve(entry, file);
      const stats = fs.statSync(filename);
      const isDir = stats.isDirectory();
      if (isDir) {
        // 过滤指定文件夹
        const regE = new RegExp(`${file}$`);
        const isExclude = !regE.test(tmp);
        if (isExclude) {
          folder.push(file);
        }
      } else if (file.includes('.html')) {
        htmlFile.push(file);
      }
    });
    // 2.检查目标html文件流，替换占位符，输出
    const htmlFileStream = {};
    // 检查与替换
    htmlFile.forEach(item => {
      const tmpFileStream = this.tmpFileStream;
      const filename = path.resolve(entry, item);
      const fileStream = fs.readFileSync(filename).toString(); // 获取目标文件流
      htmlFileStream[item] = fileStream; // 存储
      const tmpHTMLkeys = Object.keys(tmpFileStream);
      // 遍历模板html键名进行匹配
      tmpHTMLkeys.forEach(tmpKey => {
        const regE = new RegExp(`<${tmpKey}\\s*/>`); // 匹配规则
        // 判断是否存在占位符
        if (regE.test(htmlFileStream[item])) {
          // 替换占位符
          htmlFileStream[item] = htmlFileStream[item].replace(
            regE,
            tmpFileStream[tmpKey]
          );
        }
      });
    });
    // 3.输出
    for (let k in htmlFileStream) {
      const filename = path.resolve(output, k);
      try {
        fs.statSync(output);
        fs.writeFileSync(filename, htmlFileStream[k]);
      } catch (err) {
        // 目录不存在，先新建文件夹后输出
        fs.mkdirSync(output); // 新建输出文件夹
        fs.writeFileSync(filename, htmlFileStream[k]);
      }
    }
    // 4.处理文件夹
    folder.forEach(item => {
      if (item !== tmp) {
        this.mergeHandler({
          entry: path.resolve(entry, item),
          output: path.resolve(output, item),
          tmp: 'common'
        });
      }
    });
  }
  /**
   * @tools
   * 清空文件夹 { (dir: string) => void }
   */
  cleanFolder(dir) {
    // 1、检查输出文件夹是否存在，存在则删除输出文件夹，不存在则创建输出文件夹
    // 文件信息： stat { (assetName: string, callback: (err: null|Error, res: Stats) => void ) => void }
    const _dir = dir;
    try {
      fs.statSync(_dir);
      // 存在
      this.emptyDir(_dir); // 清空文件
      this.rmEmptyDir(_dir); // 删除全部空文件夹
    } catch (err) {
      // 不存在
    }
    // fs.mkdirSync(_dir); // 新建输出文件夹
  }
  /**
   * @tools
   * 清空文件 { (dir: string) => void }
   */
  emptyDir(dir) {
    const _dir = dir;
    const files = fs.readdirSync(_dir);
    files.forEach(file => {
      const filename = path.resolve(_dir, file);
      // statSync { (filename: string) => Stats }
      const stats = fs.statSync(filename);
      if (stats.isDirectory()) {
        this.emptyDir(filename);
      } else {
        // 删除文件：unlinkSync { (filename: string) => void }
        fs.unlinkSync(filename);
      }
    });
  }
  /**
   * @tools
   * 删除全部空文件夹 { (dir: string) => void }
   */
  rmEmptyDir(dir) {
    const files = fs.readdirSync(dir); // 空文件夹列表
    if (files.length === 0) {
      fs.rmdirSync(dir); // 母文件夹中没有其他文件夹，直接删除
    } else {
      // 存在其他文件夹
      let count = 0; // 累计已删除的空文件夹数量
      files.forEach(file => {
        const filename = path.resolve(dir, file);
        this.rmEmptyDir(filename);
        count++;
      });
      // 删除母文件夹
      if (files.length === count) {
        fs.rmdirSync(dir);
      }
    }
  }
}

module.exports = Merger;
