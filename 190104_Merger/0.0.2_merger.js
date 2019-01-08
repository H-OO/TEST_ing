const path = require('path');
const fs = require('fs');

const config = {
  entry: './src',
  output: path.resolve(__dirname, './build'),
  tmpDir: 'common'
  // exclude: []
};

// 清空输出文件夹
function cleanFolder(dir) {
  // 1、检查输出文件夹是否存在，存在则删除输出文件夹，不存在则创建输出文件夹
  // 文件信息： stat { (assetName: string, callback: (err: null|Error, res: States) => void ) => void }
  const output = path.resolve(__dirname, dir);
  try {
    fs.statSync(output);
    // 存在
    emptyDir(output); // 清空文件
    rmEmptyDir(output); // 删除全部空文件夹
    // fs.mkdirSync(output); // 新建输出文件夹
  } catch (err) {
    // 不存在
    // fs.mkdirSync(output); // 新建输出文件夹
  }
}

// 读取模板文件
// 4、先获取模板html文件
const tmpHTMLStream = {};
const tmpHTMLEntry = config.tmpDir;
const tmpHTMLPath = path.resolve(__dirname, config.entry, tmpHTMLEntry);
const tmpHTMLList = fs.readdirSync(tmpHTMLPath);
tmpHTMLList.forEach(item => {
  const filename = path.resolve(__dirname, config.entry, tmpHTMLEntry, item);
  const fileStream = fs.readFileSync(filename).toString();
  const _key = item.replace('.html', '');
  tmpHTMLStream[_key] = fileStream;
});

cleanFolder(config.output); // 清空输出文件夹
merger(config); // 模板引擎

// 模板引擎
function merger(config) {
  const output = config.output;
  console.log(output);
  // 2、根据入口文件夹读取所有子文件夹和子文件名
  // readdir { (entry: string, callback: (err: null|Error, res: Array<string>) => void ) => void }
  const entry = path.resolve(__dirname, config.entry);
  const files = fs.readdirSync(entry);

  // 3、过滤非目标文件，仅保留html文件名、文件夹名
  const folder = []; // 文件夹
  const htmlFile = []; // html文件
  files.forEach(file => {
    const filename = path.resolve(entry, file);
    const states = fs.statSync(filename);
    if (states.isDirectory()) {
      folder.push(file);
    } else if (file.includes('.html')) {
      htmlFile.push(file);
    }
  });

  // 5、检查目标html文件流，替换占位符，输出
  const htmlFileStream = {};
  // console.log(tmpHTMLStream);
  // 检查与替换
  htmlFile.forEach(item => {
    const filename = path.resolve(entry, item);
    const fileStream = fs.readFileSync(filename).toString(); // 获取目标文件流
    htmlFileStream[item] = fileStream; // 存储
    const tmpHTMLkeys = Object.keys(tmpHTMLStream);
    // 遍历模板html键名进行匹配
    tmpHTMLkeys.forEach(tmpKey => {
      const regE = new RegExp(`<${tmpKey}\\s*/>`); // 匹配规则
      // 判断是否存在占位符
      if (regE.test(htmlFileStream[item])) {
        // 替换占位符
        htmlFileStream[item] = htmlFileStream[item].replace(
          regE,
          tmpHTMLStream[tmpKey]
        );
      }
    });
  });

  // 输出
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
    console.log(filename);
  }

  // 6、处理子文件夹，获取入口路径重新执行3的流程
  console.log(folder);
  folder.forEach(item => {
    if (item !== config.tmpDir) {
      // console.log(path.resolve(output, item));
      // console.log(entry);
      merger({
        entry: path.resolve(entry, item),
        output: path.resolve(output, item),
        tmpDir: 'common'
        // exclude: []
      });
    }
  });
}

// 清空文件
function emptyDir(dirPath) {
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
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
    files.forEach(file => {
      const filePath = path.resolve(dirPath, file);
      rmEmptyDir(filePath);
      count++;
    });
    // 删除母文件夹
    if (files.length === count) {
      fs.rmdirSync(dirPath);
    }
  }
}
