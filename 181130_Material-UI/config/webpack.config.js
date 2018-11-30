'use strict';
/**
 * @const path 路径模块
 * @const fs 文件模块
 * @const CleanWebpackPlugin 删除文件
 * @const HtmlWebpackPlugin 处理html文件
 * @const Autoprefixer 样式自动加前缀
 * @const MiniCssExtractPlugin css分离打包
 * @const UglifyJsPlugin js压缩
 * @const OptimizeCSSAssetsPlugin css压缩
 * @const postcssLoaderPlugins postcss-loader引用相关插件
 * @const projectsDir 获取终端启动的真实根路径
 * @const LogServer 日志服务
 * @const logServer 日志服务实例
 * @const getEntry 获取`entry`入口成员方法
 * @const entry `entry`入口成员
 * @const htmlConfig plugin > 模块`html-webpack-plugin`配置
 * @function getCacheGroups 动态获取`cacheGroups`对象成员方法
 * @const cacheGroups `cacheGroups`对象成员
 * @const config webpack启动配置
 */
const path = require('path');
const fs = require('fs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const postcssLoaderPlugins = () => [
  require('postcss-flexbugs-fixes'), // postcss flexbugs 修复
  Autoprefixer({
    browsers: [
      '>1%',
      'last 4 versions',
      'Firefox ESR',
      'not ie < 9' // React doesn't support IE8 anyway
    ],
    flexbox: 'no-2009'
  })
];

const projectsDir = fs.realpathSync(process.cwd());

// 日志
const LogServer = require('./utils/logServer');
const logServer = new LogServer({
  fileName: ['build', 'error']
});
logServer.exists(); // 移除已存在的日志文件

// 获取动态配置
const getEntry = require('./utils/getEntry'); // { (dirName: String) => { Object } }
const entry = getEntry('src') || {}; // { Object }
const htmlConfig = require('./utils/htmlConfig'); // { Array<Object> }
const getCacheGroups = require('./utils/getCacheGroups'); // { (path: string) => { Object } }
const cacheGroups = getCacheGroups('src'); // { Object }

const config = (env, argv) => {
  const { mode } = argv; // 当前环境 development | production
  const buildMsg = `// 当前环境 ${mode}\n`;
  logServer.write('build', buildMsg); // 构建日志 写入
  const _config = {
    // 服务
    devServer: {
      // host: '192.168.1.2', // 域名/IP，默认localhost
      port: 8080, // 端口，默认8080
      open: true // 自动打开页面
      // contentBase: path.resolve(projectsDir, 'dist'), // 访问目录
      // openPage: 'm1.html'
    },
    // 简洁化
    resolve: {
      // alias: {},
      extensions: ['.js', '.ts', '.tsx']
    },
    // 优化
    optimization: {
      minimizer: [
        // 压缩js
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: false
        }),
        // 压缩css
        new OptimizeCSSAssetsPlugin()
      ],
      // 抽离第三方包
      splitChunks: {
        // 第三方包独立打包 (按需导入优化模式)
        cacheGroups: {
          // 动态成员
          ...cacheGroups,
          // 默认抽离包
          react: {
            name: 'react', // 文件名
            test: new RegExp(
              mode !== 'production'
                ? 'react.development.js|react-dom.development.js|scheduler.development.js|object-assign'
                : 'react.production.min.js|react-dom.production.min.js|scheduler.production.min.js|object-assign'
            ), // 匹配包路径
            chunks: 'all', // 同步异步全抽离
            priority: -20, // 插入body的顺序，值越小越后插入
            enforce: true // 强制抽离
          }
        }
      }
    },
    // 入口
    entry,
    // 输出
    output: {
      filename: '[name]/[name].js',
      path: path.resolve(projectsDir, 'dist'),
      chunkFilename: 'lib/[name].js',
      publicPath: mode !== 'production' ? '/' : './'
    },
    // 模块
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              // 优化ts编译速度
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
          test: /\.(scss|css)$/,
          exclude: /node_modules/,
          use: [
            // 生产环境压缩css
            mode !== 'production'
              ? { loader: 'style-loader' }
              : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: postcssLoaderPlugins
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: '3072', // 图片大小小于limit时转换成base64进行存储，减少http请求
                name: 'images/[name].[ext]' // 在输出文件夹中的路径（自动创建images文件夹存放所有图片）
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'images/' // 输出到dist目录下images文件夹中
              }
            }
          ]
        }
      ]
    },
    // 插件
    plugins: [
      ...htmlConfig('src'),
      new CleanWebpackPlugin(['dist'], {
        root: path.resolve(projectsDir, '.'), // 通过改变root范围越过保护机制 (修改需验证路径，以免造成损失)
        verbose: true // 是否在控制台输出信息
      }),
      new MiniCssExtractPlugin({
        filename: '[name]/[name].css',
        chunkFilename: '[name]/[name].[id].css'
      })
    ]
  };
  // console.log(_config.optimization.splitChunks.cacheGroups); // debug
  return _config;
};

module.exports = config;
