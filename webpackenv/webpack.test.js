const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin({
  filename: '[name]/[name].[hash:5].css',
  allChunks: true
});
const extractSASS = new ExtractTextPlugin({
  filename: '[name]/[name].[hash:6].css',
  allChunks: true
});

module.exports = {
  mode: 'production', // development | production
  entry: {
    Home: './src/Home/js/Home.js',
    News: './src/News/js/News.js'
  },
  resolve: {
    alias: {
      echarts: path.resolve(__dirname, 'src/lib/echarts.min.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.css$/,
        use: extractCSS.extract(['css-loader', 'postcss-loader'])
      },
      {
        test: /\.sass$/,
        use: extractSASS.extract(['css-loader', 'postcss-loader', 'sass-loader'])
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
  // webpack4 新特性 (抽离后需要注入HTML才能生效) 【只在最终打包阶段使用，否则会使devServer异常】
  optimization: {
    splitChunks: {
      cacheGroups: {
        Home: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0 // This is example is too small to create commons chunks
        },
        News: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0 // This is example is too small to create commons chunks
        },
        common: {
          test: /node_modules|lib/,
          chunks: 'initial',
          name: 'common',
          priority: 9,
          enforce: true
        },
        echarts: {
          test: new RegExp('echarts'),
          chunks: 'initial',
          name: 'echarts',
          priority: 10,
          enforce: true
        },
        lodash: {
          test: /lodash/,
          chunks: 'initial',
          name: 'lodash',
          priority: 10,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    extractCSS,
    extractSASS,
    new HtmlWebpackPlugin({
      filename: 'Home/Home.[hash:8].html', // 输出文件名
      template: path.resolve(__dirname, 'src/Home/Home.html'), // 模板路径
      chunks: ['Home', 'common', 'echarts', 'lodash'], // 指定所需的js
      inject: 'body' // 将js注入body标签
    }),
    new HtmlWebpackPlugin({
      filename: 'News/News.html', // 输出文件名
      template: path.resolve(__dirname, 'src/News/News.html'), // 模板路径
      chunks: ['News', 'common', 'echarts', 'lodash'], // 指定所需的js
      inject: 'body' // 将js注入body标签
    })
  ],
  output: {
    filename: '[name]/[name].bundle.js', // 输出目录下的文件路径
    path: path.resolve(__dirname, 'dist'), // 输出目录
    publicPath: '../' // 静态资源路径css和img会受影响 (build ../) (start /)
  }
};
