# webpack4@react+typescript

目录结构

```
|- config
    |- vendor.alias.js
    |- webpack.base.js
    |- webpack.dev.js
    |- webpack.pro.js
|- public
    |- index.html
|- src
    |- index.tsx
|- .babelrc
|- package.json
|- postcss.config.js
|- tsconfig.json
```

## **起步**

- `npm init`
- `npm i -D webpack webpack-cli`
- `npm i -D webpack-dev-server webpack-merge`
- `npm i -D babel-loader @babel/core @babel/polyfill @babel/preset-env @babel/preset-react @babel/runtime`
- `npm i -D ts-loader react react-dom @types/react @types/react-dom @types/es6-shim @types/webpack-env`

`@types/es6-shim` ES6 语法垫片  
`@types/webpack-env` 用于解决 `类型“NodeRequire”上不存在属性“ensure”。`

包版本

```json
{
  "webpack": "^4.19.1",
  "webpack-cli": "^3.1.0",
  "webpack-dev-server": "^3.1.9",
  "webpack-merge": "^4.1.4",
  "babel-loader": "^8.0.4",
  "@babel/core": "^7.1.2",
  "@babel/polyfill": "^7.0.0",
  "@babel/preset-env": "^7.1.0",
  "@babel/preset-react": "^7.0.0",
  "@babel/runtime": "^7.1.2",
  "ts-loader": "^5.2.1",
  "typescript": "^3.1.1",
  "react": "^16.5.2",
  "react-dom": "^16.5.2",
  "@types/react": "^16.4.14",
  "@types/react-dom": "^16.0.8",
  "@types/es6-shim": "^0.31.37",
  "@types/webpack-env": "^1.13.6"
}
```

## **配置文件**

```json
// .babelrc
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

```json
// tsconfig.json
{
  "compilerOptions": {
    "outDir": "./dist/",
    "noImplicitAny": true,
    "module": "es6",
    "target": "es5",
    "jsx": "react",
    "allowJs": true
  }
}
```

```json
// package.json
{
  "scripts": {
    "start": "webpack-dev-server --config config/webpack.dev.js",
    "build": "webpack --config config/webpack.pro.js"
  }
}
```

## **相关 loader**

```js
const config = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.tsx?$/, // .ts .tsx
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
      }
    ]
  }
};
```

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

创建 postcss.config.js 文件

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
  "browserslist": ["iOS >= 7", "Firefox >= 20", "Android >= 4"]
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

## **react 图片导入**

```ts
// 引入
const logo = require('./logo.svg');
// 使用
<img src={logo} alt="" />;
```

## **声明导出&导入**

`针对ts文件类型`

```ts
/**
 * 导出声明
 * 任何声明（比如变量、函数、类、类型别名或接口）都能通过添加`export`关键字来导出
 * 导入声明
 * 通过`import {} from '';`导入
 */

// m.ts
export function log(msg: string): void {
  console.log(msg);
}
export const title = '声明导出测试';

// App.jsx
// 导入-按需
import { log, title } from 'm.ts';
console.log(log); // f log
console.log(title); // 声明导出测试
// 导入-全部
import * as m from 'm.ts';
console.log(m); // { title: '声明导出测试', log: f }
// 导入-内容重命名
import { log as _log } from 'm.ts';
console.log(_log); // f log
```

```ts
// module.d.ts
/**
 * 帮助 TypeScript 判断传入的参数类型是否正确
 */
declare let log: (msg: string) => void;
```

## **使用第三方包**

`针对js文件`

```js
/**
 * foo.js
 * 声明导出
 */
function foo() {
  console.log('foo');
}
module.exports = foo;

/**
 * App.jsx
 * 声明导入
 */
import foo from 'foo.js';
```

说明一下`export default`跟`export`的用法区别

```js
// test.js

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

## **抽离第三方包**

webpack4.x 需使用 optimization.splitChunks

非按需加载（第三方包都抽离至同个文件中）

```js
const config = {
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
```

按需加载（第三方包单独抽离成独立文件）

通过用户交互触发加载与执行

```js
// App.jsx
import * as React from 'react';
class App extends React.Component {
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
      }
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
