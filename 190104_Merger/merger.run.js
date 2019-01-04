/**
 * 需求：模板引擎，占位符替换
 */
// 已知 top bottom 公共文件
// 扫描全部html文件，获取文件名，存入对象
// 遍历对象，检索文件流是否存在占位符
const path = require('path');
const fs = require('fs');

class Merger {
  constructor(args) {
    const { source, commonFile } = args;
    this.source = source;
    this.commonFile = commonFile;
  }
  init() {
    this.readdir();
  }
  readdir() {
    // readdir { (path: string, handler: (err, files: Array<string>) => void) => void }
    fs.readdir(this.source, (err, files) => {
      if (err) throw err;
      // 过滤公用html文件
      const commonFile = this.commonFile;
      const _files = files.map((file) => {
        commonFile.forEach(() => {
          
        });
      });

      _files.forEach(file => {
        const filename = path.resolve(__dirname, 'src', file); // 文件完整
        if (file.includes('.html')) {
          // `html`文件
          console.log(file);
          // 获取文件流
          fs.readFile(filename, (err, data) => {
            if (err) throw err;
            console.log(data.toString());
          })
        } else {
          // 获取文件stats对象，判断是否为目录
          fs.stat(filename, (err, stats) => {
            if (stats.isDirectory()) {
              console.log(file);
            }
          });
        }
      });
    });
  }

}

const merger = new Merger({
  source: './src',
  commonFile: ['top.html', 'bottom.html']
});
merger.init();
