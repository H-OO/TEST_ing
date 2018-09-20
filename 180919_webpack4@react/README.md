# webpack4@react

**起步**
---
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

**简单配置**
---
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

**编译**
---
```json
// package.json
{
  "scripts": {
    "build": "webpack --config webpack.config.js"
  }
}
```
`npm run build`运行编译

**清空目录文件插件**
---
`npm i -D clean-webpack-plugin`

插件误删保护机制导致无法删除指定文件夹的问题  
`path is outside of the project root`提示path在项目根目录之外(删除失败)  
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

**react相关包**
---
* `npm i -D react react-dom babel-preset-react`
* `npm i -D babel-loader @babel/core @babel/preset-env`
```
  "devDependencies": {
    "@babel/core": "^7.1.0",
    "@babel/preset-env": "^7.1.0",
    "babel-loader": "^8.0.2",
    "babel-preset-react": "^7.0.0-beta.3",
    "clean-webpack-plugin": "^0.1.19",
    "react": "^16.5.2",
    "react-dom": "^16.5.2",
    "webpack": "^4.19.1",
    "webpack-cli": "^3.1.0"
  }
```

**react相关loader**
---
```js
const config = {
  module: {
    rules: [
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
        exclude: /(node_modules)/,  //对这个不做处理
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','react'] // 在react环境下,也可以进行打包
          }
        }
      }
    ]
  }
};
```

**模板生成HTML文件并自动注入依赖包**
---
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

**处理样式**
---
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

**样式自动添加前缀**
---
创建postcss.config.js文件与webpack.config.js文件同级
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
  "browserslist": [
    "iOS >= 8",
    "Firefox >= 20",
    "Android > 4.4"
  ]
}
```

**抽离样式**
---
将样式从js中抽离出来，生成css文件  
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
  plugins: [
    extractCSS,
    extractSCSS
  ]
};
```
注意：extract-text-webpack-plugin版本需使用4.x

**压缩样式**
---
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

**加载图片与图标字体**
---
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
  }
};
```
图片大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader

**react图片路径写法**
```js
// 引入
import logo from './logo.svg';
// 使用
<img src={logo} alt="" />
```

**使用第三方包**
---
所有的第三方包必须遵循ES6模块写法：  
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
export {obj, arr};
// 引入
import {obj, arr} from 'test.js'; // 全引入
console.log(obj, arr); // {} []
import {obj} from 'test.js'; // 部分引入
console.log(obj); // {}
```

**创建第三方包**
---
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
import {first} from './math.js'; // 引入first
```

**抽离第三方包**
---
webpack4.x需使用optimization.splitChunks  
