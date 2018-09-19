# webpack@4.16.x

`npm init` 创建package.json

**安装**
---
`npm i -D webpack webpack-cli`

**起步**
---
目录
```
|- dist
|- src
    |- demo.js
    |- demo.html
|- webpack.config.js
|- package.json
```

webpack配置文件
```js
// webpack.config.js
const config = {
  mode: 'production', // development production
  entry: './src/demo.js', // 单个文件入口
  output: {
    filename: '[name].js', // dist文件夹下的路径与文件名
    path: __dirname + '/dist' // 输出文件至dist文件夹下
  }
};
module.exports = config;
```

**编译**
---
npm脚本运行
```json
// package.json
{
  "scripts": {
    "start": "webpack --config webpack.config.js"
  }
}
```
`npm run start`运行编译

**清空目录文件插件**
---
`npm i -D clean-webpack-plugin`
```js
/**
 * |- webpack.config.js
 * |- dist
 */
// webpack.config.js
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = {
  plugins: new CleanWebpackPlugin(['dist']) // 清空dist目录下的文件
};
module.exports = config;
```

插件误删保护机制导致无法删除指定文件夹的问题  
`path is outside of the project root`提示path在项目根目录之外(删除失败)  
需要解除误删保护机制，才能清空【上级目录】下的文件夹
```js
/**
 * |- build
 *      |- webpack.config.js
 * |- dist
 *      |- test.js
 */
// webpack.config.js
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const config = {
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'), // 通过改变root范围越过保护机制
      verbose: true // (true 测试/模拟删除，不删除文件) (false 删除文件)
    })
  ]
};
module.exports = config;
```


**loader使用规则**
---
```js
// webpack.config.js
const config = {
  module: {
    rules: [
      {
        test: /\.xxx$/, // 匹配文件后缀名
        exclude: /node_modules/, // 忽略该路径下的文件
        use: ['xxx-loader'] // 匹配成功的使用该loader进行处理
      }
    ]
  }
};
module.exports = config;
```

**模板生成HTML文件并自动注入CSS和JS**
---
`npm i -D html-loader html-webpack-plugin`
```js
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = {
  mode: 'production', // development production
  entry: {
    demo: './src/demo.js'
  },
  output: {
    filename: '[name]/[name].js', // [name]等同于entry[name]
    path: __dirname + '/dist'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'demo/demo.html', // 输出文件路径与文件名 不能使用[name]
      template: path.join(__dirname, 'src/demo.html'), // 模板html
      inject: 'body', // 插入body标签底部
      chunks: ['demo'], // 插入scripts标签 引入打包后的js
      hash: true, // 文件名添加hash字符串
      // 压缩html
      minify: {
        removeAttributeQuotes: true, // 移除属性的引号
        removeComments: true, // 移除注释
        collapseWhitespace: true // 移除空格
      }
    })
  ]
};
module.exports = config;
```
注意：处理图片的路径需要 `html-loader`

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
const extractCSS = new ExtractTextPlugin('[name]/[name].[hash:6].css');
const extractSCSS = new ExtractTextPlugin('[name]/[name].[hash:8].css');
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
module.exports = config;
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
    filename: '[name]/[name].js',  // [name]等同于entry[name]
    path: __dirname + '/dist',
    publicPath: '../' // 静态资源路径（解决html图片路径问题）
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
module.exports = config;
```
图片大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader

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
非按需加载配置
```js
const config = {
  entry: {
    demo: './src/demo/js/demo.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      // ...
      chunks: ['common'] // 注入公共模块 与optimization.splitChunks.name的名称保持一致
      // ...
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all', // async(默认, 只会提取异步加载模块的公共代码), initial(提取初始入口模块的公共代码), all(同时提取前两者)
      minSize: 0, // 大于0kb就被抽离到公共模块
      minChunks: 2, // 模块出现2次就被抽离到公共模块
      maxAsyncRequests: 5, // 异步模块, 一次最多只能加载5个
      name: 'common' // 打包出来公共模块的名称
    }
  }
};
```
效果是当两个不同模块共同引用同一个第三方包，该第三方包会被抽离到公共模块common中

按需加载配置
```js
const config = {
  // 通过HtmlWebpackPlugin将抽离的第三方包文件按需加载到文档中
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['__BRIDGE__', 'demo', 'lodash'], // 插入scripts标签 引入打包后的js
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        // __BRIDGE__ 抽离webpack生成的代码 为了让第三方包和逻辑模块保持纯净（起到连接作用）
        __BRIDGE__: {
          chunks: 'initial',
          enforce: true,
          name: '__BRIDGE__',
          priority: 9, // 控制插入body标签的顺序 数值越小越后插入
          test: /node_modules|lib_es5|lib_es6/, // 指定目录才进行抽离，主要针对第三方包和公共的服务
        },
        // 第三方包加入规则
        lodash: {
          chunks: 'initial',
          name: 'lodash',
          priority: 10,
          test: /lodash/
        }
      }
    }
  }
};
```
效果是将第三方包各自抽离成独立文件，通过__BRIDGE__进行连接使用，可实现PC端按需加载功能

**ES6转ES5**
---
`npm i -D babel-loader babel-core babel-preset-env babel-plugin-transform-runtime`  
创建.babelrc文件
```json
// .babelrc
{
  "presets": [
    "env"
  ],
  "plugins": [
    "transform-runtime"
  ]
}
```
babel-plugin-transform-runtime插件将ES6原生API转成ES5，babel默认不支持转换

**devServer**
---
`npm i -D webpack-dev-server`
```json
// package.json
{
  "scripts": {
    "start": "webpack-dev-server --open",
    "build": "webpack --config webpack.config.js"
  }
}
```
```js
// webpack.config.js
const config = {
  devServer: {
    // host: '192.168.1.xxx', // 域名/IP，默认localhost
    // port: '5000', // 端口，默认8080
    contentBase: './dist', // devServer访问该目录的文件
    openPage: 'demo/demo.html', // 默认打开页面
    inline: true // 用来支持dev-server自动刷新的配置
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/' // 静态资源路径 (start /) (build ../)
  }
};
module.exports = config;
```

**非npm下载的第三方包设置别名引入**
---
```js
// webpack.webpack.js
const config = {
  resolve: {
    alias: {} // 规则 moduleName: path.resolve(__dirname, 'src/lib/moduleName.js')
  }
};
module.exports = config;
```
设置后非npm下载的第三方包不再需要书写全路径，如下：
```js
import moduleName from 'moduleName';
```

**开发环境和生产环境构建**
---
`npm i -D webpack-merge`

创建  
```
|- webpack.common.js  
|- webpack.dev.js  
|- webpack.prod.js
```

```json
// package.json
{
  "scripts": {
    "start": "webpack-dev-server --open --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  }
}
```
```js
// webpack.(dev|prod).js
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge(common, {
  mode: '', // 模式 (start development) (build production)
  output: {
    publicPath: '' // 静态资源路径 (start /) (build ../)
  }
});
```

**eslint**
---
js代码风格检查功能  
`npm i -D eslint eslint-loader eslint-friendly-formatter`
```js
// .eslintrc.js
module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  rules: {
    'indent': ['error', 2], // 强制一致的缩进
    'quotes': ['error', 'single'], // 强制单引号
    'semi': ['error', 'always'], // 强制语句末尾使用分号
    'no-mixed-spaces-and-tabs': 'error', // 禁止tab和空格混合缩进
    // 'no-console': 'error', // 禁止console
  }
};
```
```js
// webpack.base.js
const config = {
  module: {
    rules: [
      // ...
      {
        test: /\.js$/,
        exclude: /lib_es5/, // 不进行语法风格检查
        loader: 'eslint-loader',
        enforce: "pre",
        include: [path.resolve(__dirname, '../src')], // 指定检查的目录
        options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
          formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
        }
      }
      // ...
    ]
  }
};
```

**stylelint**
---
css/sass/less代码风格检查功能  
`npm i -D stylelint stylelint-config-standard stylelint-webpack-plugin`
```js
// stylelint.config.js
module.exports = { 
  extends: ["stylelint-config-standard"], 
  rules: { 
      "max-nesting-depth": 2 // 允许嵌套的深度为2
  } 
};
```
```js
// webpack.base.js
const StyleLintPlugin = require('stylelint-webpack-plugin');
const config = {
  plugins: [
    new StyleLintPlugin({
      // 正则匹配想要lint监测的文件
      files: ['src/*/style/*.css', 'src/*/style/*.s?(a|c)ss']
    })
  ]
};
```
