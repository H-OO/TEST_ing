/**
 * 需求：模板引擎，占位符替换
 */
const path = require('path');
const fs = require('fs');

class Merger {
  constructor(args) {
    this.sourceDir = args.sourceDir; // 源码文件目录名
    this.outputPath = args.output; // 输出路径
    this.merginFileList = args.merginFileList; // 模板html文件
    this.saveTemplateStream = {}; // 保存模板html文件流
  }
  /**
   * 初始化
   */
  init() {
    const sourceDir_A = path.resolve(__dirname, this.sourceDir); // 转绝对路径
    this.getTemplateStream(); // 读取模板html文件流
    this.readSourceDir(sourceDir_A); // 读取目录获取目标文件流
  }
  /**
   * 读取模板html文件流
   */
  getTemplateStream() {
    const merginFileList = this.merginFileList;
    merginFileList.forEach(basename => {
      const filename = path.resolve(
        __dirname,
        this.sourceDir,
        `${basename}.html`
      ); // 转绝对路径
      // readFile { (filename: string, type?: string, handler: (err, data: string|Buffer) => void) => void }
      fs.readFile(filename, 'utf-8', (err, fileStream) => {
        if (err) throw err;
        this.saveTemplateStream[basename] = fileStream;
      });
    });
  }
  /**
   * 读取该目录下所有文件夹和文件名 { (dir: string) => Array }
   */
  readSourceDir(dir) {
    // readdir { (path: string, handler: (err, res: Array<string>) => void) => void }
    fs.readdir(dir, (err, res) => {
      if (err) throw err;
      const fileList = res.filter(item => {
        // 过滤1：只保留html文件名
        if (!item.includes('.html')) {
          return false;
        }
        // 过滤2：去除模板html文件
        const merginFileList = this.merginFileList;
        let isTarget = true;
        merginFileList.forEach(basename => {
          const regE = new RegExp(`^${basename}.html$`);
          if (regE.test(item)) {
            isTarget = false;
          }
        });
        return isTarget;
      });
      this.getTargetStream(fileList); // 读取目标文件流
    });
  }
  /**
   * 读取目标文件流
   */
  getTargetStream(fileList) {
    fileList.forEach(targetName => {
      const filename = path.resolve(__dirname, this.sourceDir, targetName); // 完整文件路径
      fs.readFile(filename, 'utf-8', (err, targetStream) => {
        if (err) throw err;
        // console.log(targetStream);
        this.replacePlaceholder(targetName, targetStream); // 替换占位符
      });
    });
  }
  /**
   * 替换占位符
   */
  replacePlaceholder(targetName, targetStream) {
    const merginFileList = this.merginFileList;
    let resStream = targetStream;
    merginFileList.forEach(basename => {
      // console.log(basename);
      const placeholder = `<${basename}/>`;
      if (targetStream.includes(placeholder)) {
        resStream = resStream.replace(
          placeholder,
          this.saveTemplateStream[basename]
        );
      }
    });
    // 输出
    this.output(targetName, resStream);
  }
  /**
   * 输出
   */
  output(targetName, resStream) {
    const outPath = path.resolve(__dirname, this.outputPath, `${targetName}`); // 导出路径
    fs.writeFileSync(outPath, resStream);
  }
}

const merger = new Merger({
  sourceDir: './src',
  merginFileList: ['Top', 'Bottom'],
  output: './build'
});
merger.init();
