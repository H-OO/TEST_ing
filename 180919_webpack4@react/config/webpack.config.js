/**
 * @const path
 * @const CleanWebpackPlugin
 * @const HtmlWebpackPlugin
 * @const ExtractTextPlugin
 * @const OptimizeCSSAssetsPlugin
 * 
 * @const config
 */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // version@next
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].[hash:6].css');
const extractSCSS = new ExtractTextPlugin('[name].[hash:8].css');

const config = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: './' // 静态资源路径 (start /) (build ../)
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: extractSCSS.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', 'babel-preset-react']
          }
        }
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','react'] // 在react环境下,也可以进行打包
          }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: '3072', // 图片大小小于limit时转换成base64进行存储，减少http请求
            name: 'img/[name].[hash:6].[ext]' // 在输出文件夹中的路径（自动创建img文件夹存放所有图片）
          }
        }]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[hash:6].[ext]',
            outputPath: 'img/' // 输出到dist目录下img文件夹中
          }
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'), // 通过改变root范围越过保护机制
      verbose: true // (true 测试/模拟删除，不删除文件) (false 删除文件)
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html')
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /\.css\.*(?!.*map)/g, // 注意不要写成 /\.css$/g
      cssProcessor: require('cssnano'), // css优化插件
      cssProcessorOptions: {
        discardComments: {
          removeAll: true // 移除所有注释
        },
        autoprefixer: false // 关闭cssnano的autoprefixer功能
      },
      canPrint: true // 设置是否可以向控制台打日志 默认为true
    }),
    extractCSS,
    extractSCSS
  ],
  optimization: {
    splitChunks: {
      chunks: 'async', // async(默认, 只会提取异步加载模块的公共代码), initial(提取初始入口模块的公共代码), all(同时提取前两者)
      minSize: 0, // 大于0kb就被抽离到公共模块
      minChunks: 1, // 模块出现2次就被抽离到公共模块
      maxAsyncRequests: 5, // 异步模块, 一次最多只能加载5个
      name: 'vender' // 打包出来公共模块的名称
    }
  }
};
module.exports = config;
