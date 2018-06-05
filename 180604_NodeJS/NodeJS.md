# NodeJS
单线程、异步、事件驱动

## 基础

**http**
---
Node内置对象，开启服务、监听端口
* 导入使用: const http = require('http')
* 创建服务: http.createServer((req, res) => {})
* 设置请求头: res.writeHead 方法
* 数据回显: res.write 方法
* 设置协议尾，结束请求: res.end 方法
* 清除第二次访问: if(req.url !== '/favicon.ico') {}
* 监听端口: http.listen 方法
```JS
const http = require('http');
http.createServer((req, res) => {
  // 设置响应头
  res.writeHead(200, {
    'Content-Type': 'text/json; charset=utf-8'
  });
  // 清除第二次访问
  if (req.url !== '/favicon.ico') {
    res.write('Hello Node');
  }
  res.end(); // http协议尾，用于结束请求
}).listen(8000);
console.log('服务启动 localhost:8000');
```

**模块**
---
* 定义模块 (function)
* 输出模块 (module.exports)
* 导入模块 (require)

**url**
---
Node内置对象，用于获取浏览器url
* 获取url对象: url.parse(req.url)

**fs**
---
Node内置对象，用于读写文件

**path**
---
Node内置对象，用于设置相对路径写法
`path.resolve(__dirname, '')`

**读取文件**
---
* 异步读取: fs.readFile 方法
* 同步读取: fs.readFileSync 方法
```
// fs.readFile(path, 'binary', callback)
path 读取路径
'binary' 二进制读取
callback 读取动作结束执行回调 (err, file) => {}
```

**保存文件**
---
* 异步保存: fs.writeFile 方法
* 同步保存: fs.writeFileSync 方法
```
// fs.writeFile(path, content, callback)
path 存储路径+文件名+后缀
content 存入的内容
callback 存储动作结束执行回调 (err) => {}

// fs.writeFileSync(path, content)
path 存储路径+文件名+后缀
content 存入的内容
```

**需求-读取图片并回显**
---
* 读取方法 fs.readFile(path, 'binary', callback)
* 设置图片文件对应的响应头 image/jpeg
* 以二进制的格式传输回显
* 传输过程中不允许与其他文件同时进行

**需求-同时显示文本与图片**
---
先返回html，浏览器解析到 img 标签再发送获取对应图片的请求
```HTML
<!--_./view/index.html_-->
<img src="./img" alt="">
```
```JS
/******************_./node.js_******************/
const http = require('http');
const url = require('url');
const router = require('./router/router');
http.createServer((req, res) => {
  // 清除第二次访问
  if (req.url !== '/favicon.ico') {
    let {pathname} = url.parse(req.url);
    pathname = pathname.slice(1);
    // 异常处理
    try {
      router[pathname](req, res);
    } catch (err) {
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8'
      });
      res.write('404');
      res.end();
    }
  }
}).listen(8000);
console.log('Server run at localhost:8000');

/******************_./router/router.js_******************/
const file = require('../controler/file');
module.exports = {
  // 处理登录请求
  login: (req, res) => {
    file.readFile('./view/index.html', req, res);
  },
  // 获取图片
  img: (req, res) => {
    file.readImg('./public/logo.png', req, res);
  }
};

/******************_./control/file.js_******************/
const fs = require('fs');
const bale = {
  getFile: (path, req, res) => {
    fs.readFile(path, 'binary', (err, file) => {
      if (err) {
        console.log('404');
      } else {
        res.write(file, 'binary'); // 以二进制格式回显
      }
      res.end(); // http协议尾，用于结束请求
    });
  }
};
const file = {
  readFile: (path, req, res) => {
    // html文件响应头
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    bale.getFile(path, req, res);
  },
  readImg: (path, req, res) => {
    // 图片响应头
    res.writeHead(200, {
      'Content-Type': 'image/png; charset=utf-8'
    });
    bale.getFile(path, req, res);
  }
};
module.exports = file;
```

**异常处理**
---
使用 try...catch 语句包裹易出错代码  
主动抛出错误使用 throw 操作符
```JS
try {
  // 易错代码
} catch (err) {
  // 捕获错误
}

throw // 主动抛出错误给 catch 捕获
```

**参数接收**
---
* get 同步接收
* post 异步接收
```JS
/****************_GET_****************/
const url = require('url');
const {query} = url.parse(req.url, true); // true 表示是否将 query 转成对象形式使用

/****************_POST_****************/
const querystring = require('querystring'); // post请求参数获取
let post = '';
req.on('data', (chunk) => {
  post += chunk; // ifBuffer
});
req.on('end', () => {
  post = querystring.parse(post); // isObj
  // todosomething...
});
```

**async**
---
异步流程控制
* 串行无关联 async.series
* 并行无关联 async.parallel
* 串行有关联
```JS
/****************_series 与 parallel_****************/
const async = require('async'); // npm
async.series({ // parallel
  one: (done) => {
    done(null, '_one_');
  },
  two: (done) => {
    done(null, '_two_');
  }
}, (err, succ) => {
  if (err) {
  } else {
    // todosomething...
  }
});

/****************_waterfall_****************/
async.waterfall([(done) => {
  done(null, '_one_');
}, (preValue, done) => {
  console.log(preValue); // '_one_'
  done(null, '_two_');
}], (err, preValue) => {
  console.log(preValue); // '_two_'
});
```
区别：  
串行无关联中某个行为错误将导致其他行为不会得到执行  
并行无关联中某个行为错误不影响其他行为的执行  
行为错误通过 done 方法抛出错误信息，最终在回调函数的参数1 err 去捕获错误行为

**直接连接MySQL**
---

































































**REST**
---
REST 是浏览器与服务器通信方式的一种设计风格

**Express**

**最简单的例子**
---
```js
const express = require('express'); // 引入 Express 框架
const app = express(); // 接收 Express 暴露的 API
const router = express.Router(); // 接收 Express 路由对象

router.get('/', (req, res) => {
  // req 请求对象
  // res 响应对象
  res.send('<h1>Hello World</h1>');
});

// 使用中间件
// app.use(router); // 127.0.0.1:8080/
app.use('/home', router); // 127.0.0.1:8080/home/

// 监听端口
app.listen(8080); // linux 的系统限制，普通用户是无法打开1024以下端口

// 访问接口 127.0.0.1:8080/home/ 返回 <h1>Hello World</h1>
```

**获取请求携带的参数**
---
```js
// ...
router.get('/:id', (req, res) => {
  // 获取请求携带的参数 req.params.id
});
// ...
// 访问接口 127.0.0.1:8080/home/123 获取结果就为 '123'
```

**处理其他HTTP请求**
---
```js
const bodyParser = require('body-parser'); // 处理POST、PUT、DELETE等请求

```