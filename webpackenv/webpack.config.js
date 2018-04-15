const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'development', // development | production
  devtool: 'source-map', // 用于查看代码在编译前的位置
  devServer: {
    // host: '192.168.1.100',
    contentBase: './dist', // 监听该目录
    openPage: 'Home/Home.html',
    inline: true, // 用来支持dev-server自动刷新的配置
    historyApiFallback: true, // SPA任意跳转或404响应可以指向首页
    hot: true // 【HMR】
  },
  entry: {
    Home: './src/Home/Home.js',
    // News: './src/News/News.js',
    vendor: ['lodash'] // 第三方
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        use: extractCSS.extract(['css-loader', 'postcss-loader'])
      },
      {
        test: /\.sass$/,
        use: extractSASS.extract([
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ])
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
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
        use: [{
          loader: 'url-loader',
          options: {
            limit: '3072',
            name: 'image/[name].[hash:8].[ext]'
          }
        }]
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
        vendor: {
          test: /node_modules/,
					chunks: 'initial',
					name: 'vendor',
					priority: 10,
					enforce: true
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    Home,
    News,
    extractCSS,
    extractSASS,
    // new webpack.NamedModulesPlugin(), // 【HMR】
    // new webpack.HotModuleReplacementPlugin() // 【HMR】
  ],
  output: {
    filename: '[name]/[name].bundle.js', // 输出目录下的文件路径
    path: path.resolve(__dirname, 'dist'), // 输出目录
    publicPath: '../' // 静态资源路径 (build ../) (start /)
  }
};