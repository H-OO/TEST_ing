const path = require('path');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const projectsDir = fs.realpathSync(process.cwd());

console.log(path.resolve(projectsDir, 'loader/test-loader.js'));

module.exports = {
  // 入口
  entry: {
    index: './src/index.js'
  },
  // 输出
  output: {
    filename: '[name].js',
    path: path.resolve(projectsDir, 'dist')
  },
  // 模块
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [path.resolve(projectsDir, 'loader/test-loader.js')]
      }
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     // loader: 'babel-loader',
      //     // options: {
      //     //   presets: ['@babel/preset-env', '@babel/preset-react']
      //     // }
      //   }
      // }
    ]
  },
  // 插件
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(projectsDir, '.'), // 通过改变root范围越过保护机制 (修改需验证路径，以免造成损失)
      verbose: true // 是否在控制台输出信息
    })
  ]
};