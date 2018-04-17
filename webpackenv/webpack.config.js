const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('[name]/[name].[hash:5].css'); // 分离css文件
const extractSASS = new ExtractTextPlugin('[name]/[name].[hash:6].css'); // 分离sass文件

const CURRENT_ENV = require('./webpack.env.js'); // 当前环境 development | production
const moduleConfig = require('./webpack.moduleConfig.js'); // 模块配置
const venderLocal = require('./webpack.venderLocal.js'); // 本地第三方包列表，非npm安装

/**
 * webpack空配置
 */
const webpackConfig = {
  mode: CURRENT_ENV, // development | production
  entry: {}, // 格式 Home:'./src/Home/js/Home.js'
  resolve: {
    alias: {} // 格式 echarts:path.resolve(__dirname, 'src/lib/echarts.min.js')
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: extractCSS.extract({
          use: ['css-loader', 'postcss-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        use: extractSASS.extract({
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.js$/,
        exclude: /node_modules|lib/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['transform-runtime'], // 转ES6原生API 例如Promise、Object.assign
            presets: ['es2015'] // ES6转ES5
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: '3072',
              name: 'img/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(['dist']), extractCSS, extractSASS],
  output: {
    filename: '[name]/[name].bundle.js', // 输出目录下的文件路径
    path: path.resolve(__dirname, 'dist'), // 输出目录
    publicPath: '' // 静态资源路径css和img会受影响 (build ../) (start /)
  }
};

/**
 * 根据当前环境开启所需功能+包含资源输出的publicPath
 */
if (CURRENT_ENV === 'development') {
  webpackConfig.devtool = 'source-map';
  webpackConfig.devServer = {
    // host: '192.168.1.xxx', // 域名/IP，默认localhost
    // port: '5000', // 端口，默认8080
    contentBase: './dist', // devServer访问该目录的文件
    openPage: 'Home/Home.html', // 默认打开页面
    inline: true // 用来支持dev-server自动刷新的配置
  };
  webpackConfig.output.publicPath = '/';
} else if (CURRENT_ENV === 'production') {
  // webpack4新特性 (第三方包抽离后需要注入HTML才能生效) 【只在最终打包阶段使用，否则会使devServer异常】
  webpackConfig.optimization = {
    splitChunks: {
      cacheGroups: {
        // 使用该特性需要先注入该js文件，js才会生效
        common: {
          test: /node_modules|lib/,
          chunks: 'initial',
          name: 'common',
          priority: 9,
          enforce: true
        }
      }
    }
  };
  webpackConfig.output.publicPath = '../';
}

/**
 * 填充webpack配置
 */
const totalVenderList = []; // 全部的第三方包，目的是将第三方包各自打包输出
for (let item in moduleConfig) {
  // moduleConfig[item].chunks isArr
  const moduleChunks = moduleConfig[item].chunks;
  for (let i = 0, l = moduleChunks.length; i < l; i++) {
    if (totalVenderList.indexOf(moduleChunks[i]) === -1) {
      totalVenderList.push(moduleChunks[i]);
    }
  }
}

let cacheGroups = null; // isObj
if (CURRENT_ENV === 'production') {
  cacheGroups = webpackConfig.optimization.splitChunks.cacheGroups; // isObj
}

for (let item in moduleConfig) {
  // 填充入口配置，设置入口文件路径
  webpackConfig.entry[item] = `./src/${item}/js/${item}.js`;

  // 【需要根据当前环境使用】
  if (CURRENT_ENV === 'production') {
    // 填充抽离第三方包配置
    cacheGroups[item] = {
      chunks: 'initial',
      minChunks: 2,
      maxInitialRequests: 5,
      minSize: 0
    };
  }

  // 填充Plugins
  webpackConfig.plugins.push(
    new HtmlWebpackPlugin({
      filename: `${item}/${item}.html`, // 输出文件名
      template: path.resolve(__dirname, `src/${item}/${item}.html`), // 模板路径
      chunks: (function() {
        const configChunks = moduleConfig[item].chunks;
        const finalChunks = [item, 'common'];
        configChunks.map(function(v) {
          finalChunks.push(v);
        });
        return finalChunks;
      })(), // 指定所需的js
      // hash: true, // 为css和js文件末尾添加hash，解决缓存问题
      inject: 'body' // 将js注入body标签
      // minify: { // 压缩html
      //   removeAttributeQuotes: true, // 移除属性的引号
      //   removeComments: true, // 移除注释
      //   collapseWhitespace: true // 移除空格
      // }
    })
  );
}

// 【需要根据当前环境使用】
if (CURRENT_ENV === 'production') {
  for (let i = 0, l = totalVenderList.length; i < l; i++) {
    let vender = totalVenderList[i];
    cacheGroups[vender] = {
      test: new RegExp(vender),
      chunks: 'initial',
      name: vender,
      priority: 10,
      enforce: true
    };
  }
}


for (let item in venderLocal) {
  // 填充相对路径第三方包别名，例如可直接require('echarts')
  webpackConfig.resolve.alias[item] = path.resolve(
    __dirname,
    venderLocal[item].path
  );
}

module.exports = webpackConfig;
