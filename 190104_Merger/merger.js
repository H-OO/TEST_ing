const path = require('path');
const fs = require('fs');
// 1、检查输出文件夹是否存在，存在则删除输出文件夹，不存在则创建输出文件夹
// 文件信息： stat { (assetName: string, callback: (err: null|Error, res: ) => void ) => void }
const output = path.resolve(__dirname, './build');
fs.stat(output, (err, res) => {
  if (err) {
    // 文件夹不存在
    // 创建目录：mkdir { (dirname: string) => void }
    fs.mkdirSync(output); // 新建输出文件夹
  } else {
    // 文件夹存在
    // 移除文件所有再创建
    // 删除文件：unlinkSync { (dirname: string) => void }
    // 删除目录：rmdirSync { (dirname: string) => void }
    emptyDir(output); // 清空文件
    rmEmptyDir(output); // 删除全部空文件夹
    fs.mkdirSync(output); // 新建输出文件夹
  }
})

// 清空文件
function emptyDir(dirPath) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const filePath = path.resolve(dirPath, file);
    // statSync { (filePath: string) => States }
    const states = fs.statSync(filePath);
    if (states.isDirectory()) {
      emptyDir(filePath);
    } else {
      // 删除文件：unlinkSync { (filename: string) => void }
      fs.unlinkSync(filePath);
    }
  });
}

// 删除全部空文件夹
function rmEmptyDir(dirPath) {
  const files = fs.readdirSync(dirPath); // 空文件夹列表
  if (files.length === 0) {
    fs.rmdirSync(dirPath); // 母文件夹中没有其他文件夹，直接删除
  } else {
    // 存在其他文件夹
    let count = 0; // 累计已删除的空文件夹数量
    files.forEach((file) => {
      const filePath = path.resolve(dirPath, file);
      rmEmptyDir(filePath);
      count ++;
    });
    // 删除母文件夹
    if (files.length === count) {
      fs.rmdirSync(dirPath);
    }
  }
}

// 2、根据入口文件夹读取所有子文件夹和子文件名
// readdir { (entry: string, callback: (err: null|Error, res: Array<string>) => void ) => void }
const entry = path.resolve(__dirname, './src');
const files = fs.readdirSync(entry);

// 3、过滤非目标文件，仅保留html文件名、文件夹名
// console.log(files);
const folder = [];
const htmlFile = [];
files.forEach((file) => {
  const filename = path.resolve(__dirname, file);
  const states = fs.statSync(filename);
  console.log(states);
  if (states.isDirectory()) {
    folder.push(file);
  } else if (file.includes('.html')) {
    htmlFile.push(file);
  }
});
// console.log(_files);
console.log(folder);
console.log(htmlFile);

// 4、检查目标html文件流，替换占位符，输出
// 5、处理子文件夹，获取入口路径重新执行3的流程