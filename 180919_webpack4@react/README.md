# webpack4@react

## **起步**

`npm init`

`npm i -D webpack webpack-cli`

目录结构

```
|- config
      |- webpack.config.js
|- public
|- src
|- package.json
```

## **简单配置**

```js
const path = require('path');
const config = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist')
  }
};
module.exports = config;
```

## **编译**

```json
// package.json
{
  "scripts": {
    "build": "webpack --config webpack.config.js"
  }
}
```

`npm run build`运行编译

## **清空目录文件插件**

`npm i -D clean-webpack-plugin`

插件误删保护机制导致无法删除指定文件夹的问题  
`path is outside of the project root`提示 path 在项目根目录之外(删除失败)  
需要解除误删保护机制，才能清空【上级目录】下的文件夹

```js
const config = {
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'), // 通过改变root范围越过保护机制
      verbose: true // (true 测试/模拟删除，不删除文件) (false 删除文件)
    })
  ]
};
```

## **react 相关包**

- `npm i -D react react-dom @babel/preset-react`
- `npm i -D babel-loader @babel/core @babel/polyfill @babel/preset-env @babel/runtime`

```
  {
    "@babel/core": "^7.1.2",
    "@babel/polyfill": "^7.0.0",
    "@babel/preset-env": "^7.1.0",
    "@babel/preset-react": "^7.0.0",
    "@babel/runtime": "^7.1.2",
    "babel-loader": "^8.0.4",

    "react": "^16.5.2",
    "react-dom": "^16.5.2",
    "webpack": "^4.19.1",
    "webpack-cli": "^3.1.0",
    "webpack-dev-server": "^3.1.9",
    "webpack-merge": "^4.1.4"
  }
```

## **react 相关 loader**

```js
const config = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
};
```

## **babel 配置文件**

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "debug": false
      }
    ],
    "@babel/preset-react"
  ]
}
```

## **模板生成 HTML 文件并自动注入依赖包**

`npm i -D html-loader html-webpack-plugin`

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html') // 模板路径
    })
  ]
};
```

## **处理样式**

`npm i -D style-loader css-loader postcss-loader autoprefixer sass-loader node-sass`

```js
// webpack.config.js
const config = {
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  }
};
module.exports = config;
```

## **样式自动添加前缀**

创建 postcss.config.js 文件与 webpack.config.js 文件同级

```
|- src
|- webpack.config.js
|- postcss.config.js
|- package.json
```

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer') // 自动加前缀
  ]
};
```

解决样式不添加前缀问题  
主要由于高版本浏览器已经做了兼容处理，添加前缀主要为了低版本浏览器

```json
// package.json
{
  "browserslist": ["iOS >= 8", "Firefox >= 20", "Android > 4.4"]
}
```

## **抽离样式**

将样式从 js 中抽离出来，生成 css 文件  
`npm i -D extract-text-webpack-plugin`

```js
// webpack.config.js
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // version@next
const extractCSS = new ExtractTextPlugin('[name].[hash:6].css');
const extractSCSS = new ExtractTextPlugin('[name].[hash:8].css');
const config = {
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
      }
    ]
  },
  plugins: [extractCSS, extractSCSS]
};
```

注意：extract-text-webpack-plugin 版本需使用 4.x

## **压缩样式**

将抽离出来的样式进行压缩处理
`npm i -D optimize-css-assets-webpack-plugin cssnano postcss-safe-parser`

```js
// webpack.config.js
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const config = {
  plugins: [
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
    })
  ]
};
module.exports = config;
```

## **加载图片与图标字体**

`npm i -D file-loader url-loader`

```js
// webpack.config.js
const config = {
  output: {
    publicPath: '' // 设置静态资源路径
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: '3072', // 图片大小小于limit时转换成base64进行存储，减少http请求
              name: 'img/[name].[hash:6].[ext]' // 在输出文件夹中的路径（自动创建img文件夹存放所有图片）
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
              name: '[name].[hash:6].[ext]',
              outputPath: 'img/' // 输出到dist目录下img文件夹中
            }
          }
        ]
      }
    ]
  }
};
```

图片大小大于 limit，url-loader 会调用 file-loader 进行处理，参数也会直接传给 file-loader

**react 图片路径写法**

```js
// 引入
import logo from './logo.svg';
// 使用
<img src={logo} alt="" />;
```

## **使用第三方包**

所有的第三方包必须遵循 ES6 模块写法：  
需以`export default`或`export`进行输出  
通过`import`进行引入使用

说明一下`export default`跟`export`的用法区别

```js
// test.js (第三方包)

// 方式1： export default 默认输出
const obj = {};
export default obj;
// 引入
import test from 'test.js';
console.log(test); // {}

// 方式2： export 对象解构赋值输出
const obj = {};
const arr = [];
export { obj, arr };
// 引入
import { obj, arr } from 'test.js'; // 全引入
console.log(obj, arr); // {} []
import { obj } from 'test.js'; // 部分引入
console.log(obj); // {}
```

## **创建第三方包**

规则

```js
// math.js
export function first() {
  // todosomething...
}
export function second() {
  // todosomething...
}
// use
import { first } from './math.js'; // 引入first
```

## **抽离第三方包**

webpack4.x 需使用 optimization.splitChunks

非按需加载（第三方包都抽离至同个文件中）

```js
const config = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all', // async(默认, 只会提取异步加载模块的公共代码), initial(提取初始入口模块的公共代码), all(同时提取前两者)
          test: /node_modules/,
          name: 'vendors',
          priority: -20, // 小于`-10`才能进行抽离出异步模块
          minSize: 0, // 大于0kb就被抽离到公共模块
          minChunks: 1, // 模块出现1次就被抽离到公共模块
          maxAsyncRequests: 5 // 异步模块, 一次最多只能加载5个
        }
      }
    }
  }
};
```

按需加载（第三方包单独抽离成独立文件）

通过用户交互触发加载与执行

```js
// App.jsx
class App extends Component {
  constructor() {
    super();
    this.handler = this.handler.bind(this);
  }
  handler() {
    require.ensure(
      [],
      () => {
        // 引入
        const _ = require('lodash');
        // 使用
        console.log(_.defaults({ a: 1 }, { a: 3, b: 2 })); // {a: 1, b: 2}
      },
      'lodash'
    );
  }
  render() {
    return (
      <div>
        <button onClick={this.handler}>lodash</button>
      </div>
    );
  }
}
```

## **开发与生产环境**

- `npm i -D webpack-merge`
- `npm i -D webpack-dev-server`

```
|- config
     |- webpack.base.js
     |- webpack.pro.js
     |- webpack.dev.js
     |- vendor.alias.js
|- src
     |- index.js
|- package.json
```

```json
// package.json
{
  "scripts": {
    "start": "webpack-dev-server --open --config config/webpack.dev.js",
    "build": "webpack --config config/webpack.pro.js"
  }
}
```

```js
// webpack.base.js
/**
 * @const path 路径模块
 * @const CleanWebpackPlugin 删除文件
 * @const HtmlWebpackPlugin 处理html文件
 * @const ExtractTextPlugin 抽离样式插件
 * @const OptimizeCSSAssetsPlugin 压缩css
 * @const extractCSS 抽离css
 * @const extractSCSS 抽离scss
 * @const vendorAlias 第三方包别名配置
 * @const base 基础配置
 */
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // version@next
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].[hash:4].css');
const extractSCSS = new ExtractTextPlugin('[name].[hash:6].css');
// const vendorAlias = './vendor.alias.js';

const base = {
  entry: {
    index: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    filename: 'index.[hash:5].js',
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: '[name].[chunkhash:5].js'
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
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', 'babel-preset-react']
          }
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', 'react'] // 在react环境下,也可以进行打包
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
              name: 'img/[name].[hash:6].[ext]' // 在输出文件夹中的路径（自动创建img文件夹存放所有图片）
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
              name: '[name].[hash:6].[ext]',
              outputPath: 'img/' // 输出到dist目录下img文件夹中
            }
          }
        ]
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
  ]
};
module.exports = base;
```

```js
// webpack.pro.js
/**
 * 生产环境
 * @const merge 合并配置插件
 * @const base 基础配置
 * @const pro 生产配置
 */
const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const pro = {
  mode: 'production',
  output: {
    publicPath: './' // 静态资源路径 (start /) (build ./)
  },
  optimization: {
    splitChunks: {
      // 注册需要单独抽离第三方包
      cacheGroups: {
        vendor: {
          chunks: 'all', // async(默认, 只会提取异步加载模块的公共代码), initial(提取初始入口模块的公共代码), all(同时提取前两者)
          test: /node_modules/,
          name: 'common',
          priority: -20, // 小于`-10`才能进行抽离出异步模块
          minSize: 0, // 大于0kb就被抽离到公共模块
          minChunks: 1, // 模块出现1次就被抽离到公共模块
          maxAsyncRequests: 5 // 异步模块, 一次最多只能加载5个
        }
      }
    }
  }
};
module.exports = merge(base, pro);
```

```js
// webpack.dev.js
/**
 * 开发环境
 * @const path node内置模块
 * @const merge 配置文件合并插件
 * @const base 基础配置
 * @const dev 开发环境配置
 */
const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const dev = {
  mode: 'development',
  // devtool: 'inline-source-map',
  devServer: {
    // host: '192.168.1.xxx', // 域名/IP，默认localhost
    // port: '5000', // 端口，默认8080
    // openPage: 'index.html', // 默认打开页面
    contentBase: path.resolve(__dirname, '../dist'), // devServer访问该目录的文件
    inline: true // 用来支持dev-server自动刷新的配置
  },
  output: {
    publicPath: '/' // 静态资源路径 (start /) (build ../)
  }
};
module.exports = merge(base, dev);
```

```js
// vendor.alias.js
/**
 * 非npm安装的第三方包注册别名
 * ---
 * 规则 mouduleName: moudulePath
 * 使用 import mouduleName from 'mouduleName'
 */
const path = require('path');
const alias = {
  // 规则 mouduleName: path.resolve(__dirname, 'src/asset/mouduleName.js')
};
module.exports = alias;
```
