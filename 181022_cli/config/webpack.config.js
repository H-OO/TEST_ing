const path = require('path');

// process.cwd() 终端位置

const config = {
  mode: 'production', // development production
  entry: {
    index: path.resolve(__dirname, '../src/demo.js')
  }, // 单个文件入口
  output: {
    filename: '[name].js', // dist文件夹下的路径与文件名
    path: path.resolve(process.cwd(), 'dist') // 输出文件至dist文件夹下
  }
};

module.exports = config;
