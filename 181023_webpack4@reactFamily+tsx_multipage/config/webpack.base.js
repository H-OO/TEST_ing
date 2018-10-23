/**
 * @const path 路径模块
 * @const glob shell使用的路径匹配符
 * @const CleanWebpackPlugin 删除文件
 * @const HtmlWebpackPlugin 处理html文件
 * @const ExtractTextPlugin 抽离样式插件
 * @const OptimizeCSSAssetsPlugin 压缩css
 * @const extractCSS 抽离css
 * @const extractSCSS 抽离scss
 * @const base 基础配置
 */
const path = require('path');
const glob = require('glob');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // version@next
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].[hash:4].css');
const extractSCSS = new ExtractTextPlugin('[name].[hash:6].css');

const base = {
  entry: {},
  output: {
    filename: '[name].[hash:5].js',
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: '[name].[chunkhash:5].js'
  },
  resolve: {
    // alias: {},
    extensions: ['.js', '.ts', '.tsx']
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
        exclude: /node_modules|lib/, // 解决本地 lib 库 `exports is not defined` 问题
        use: ['babel-loader']
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        enforce: 'pre', // 前置执行
        exclude: /node_modules/,
        use: ['tslint-loader']
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
    // new HtmlWebpackPlugin({
    //   template: path.resolve(__dirname, '../public/index.html')
    // }),
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
  ]
};

// 获取指定路径下的入口文件
function getEntries(globPath) {
  const files = glob.sync(globPath),
    entries = {};
  files.forEach(function(filepath) {
    const split = filepath.split('/');
    const name = split[split.length - 2];
    entries[name] = './' + filepath;
  });
  return entries;
}

const entries = getEntries('src/**/index.tsx');

Object.keys(entries).forEach(function(name) {
  base.entry[name] = entries[name];
  const plugin = new HtmlWebpackPlugin({
    filename: name + '.html',
    template: path.resolve(__dirname, '../public/index.html'),
    chunks: ['vendor', name]
  });
  base.plugins.push(plugin);
});

module.exports = base;
