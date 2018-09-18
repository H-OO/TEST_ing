/**
 * @const path 文件路径模块
 * @const CleanWebpackPlugin 删除文件
 * @const HtmlWebpackPlugin html文件处理插件
 * @const ExtractTextPlugin 抽离样式插件
 * @const extractCSS 抽离css样式
 * @const extractSCSS 抽离scss编译出来的样式
 * @const OptimizeCSSAssetsPlugin 优化css文件插件
 * @const StyleLintPlugin css/sass风格检查插件
 * @const vendorPath 非npm安装的第三方包设置别名
 * @const vendorRely 模块依赖的第三方包列表
 * @const config 配置
 */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name]/[name].[hash:6].css');
const extractSCSS = new ExtractTextPlugin('[name]/[name].[hash:8].css');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const vendorPath = require('./module.vendorPath');
const vendorRely = require('./module.vendorRely');
const config = {
  entry: {},
  output: {
    filename: '[name]/[name].js', // [name]等同于entry[name]
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [{
        test: /\.html$/,
        exclude: /node_modules/,
        use: ['html-loader']
      },
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
        exclude: /node_modules|lib_es5/,
        use: ['babel-loader']
      },
      {
        test: /\.js$/,
        exclude: /lib_es5/, // 不进行语法风格检查
        loader: 'eslint-loader',
        enforce: "pre",
        include: [path.resolve(__dirname, '../src')], // 指定检查的目录
        options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
          formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: '3072', // 图片大小小于limit时转换成base64进行存储
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
    new CleanWebpackPlugin(['dist', 'package'], {
      root: path.resolve(__dirname, '../'), // 通过改变root范围越过保护机制
      verbose: true // (true 测试/模拟删除，不删除文件) (false 删除文件)
    }),
    extractCSS,
    extractSCSS,
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
    new StyleLintPlugin({
      // 正则匹配想要lint监测的文件
      files: ['src/*/style/*.css', 'src/*/style/*.s?(a|c)ss']
    })
  ],
  // 第三方包设置别名
  resolve: {
    alias: vendorPath || {} // 规则 moduleName: path.resolve(__dirname, 'src/lib/moduleName.js')
  }
};
/**
 * 模块依赖
 */
const entry = config.entry;
const plugins = config.plugins;
for (let item in vendorRely) {
  // 注册项目模块
  entry[item] = __dirname + `/../src/${item}/js/${item}.js`;
  const tmp = {
    filename: `${item}/${item}.html`, // 输出文件名 不能使用[name]自动切换
    template: path.join(__dirname, `/../src/${item}/${item}.html`), // 使用的模板html
    inject: 'body', // 插入body标签底部
    chunks: [`${item}`, '__BRIDGE__', ...vendorRely[item]], // 插入scripts标签 引入打包后的js
    hash: true, // 文件名添加hash字符串
    // 压缩html
    minify: {
      removeAttributeQuotes: true, // 移除属性的引号
      removeComments: true, // 移除注释
      collapseWhitespace: true // 移除空格
    }
  };
  plugins.push(new HtmlWebpackPlugin(tmp));
}

module.exports = config;