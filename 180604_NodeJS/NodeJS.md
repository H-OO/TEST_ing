# NodeJS
单线程、异步、事件驱动

```
【http、fs、】
模块制作与调用
路由
读取文件
写文件
读取图片
路由改造
异常处理(try...catch)
参数接收
异步流程控制(async)
```

## 基础

**http**
---
目的
* 使用 Node 内置 http 对象
* 设置请求头（文件类型与编码格式）
* 数据回显
* 设置协议尾，结束请求（需在回显方法后设置）
* 清除第二次访问
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
目的
* 定义模块
* 输出模块
* 导入模块
```JS
/*************_/src/module.js_*************/
// 定义模块
function User(name, age) {
  this.name = name;
  this.age = age;
}
// 输出模块
module.exports = {
  User
};

/*************_/src/node.js_*************/
// 导入模块
const module = require('/src/module.js');
const {
  User
} = m1;
const user = new User('H_OO', '17');
console.log(user); // {name: 'H_OO', age: '17'}
```

**url**
---
目的
* 使用 Node 内置的 url 对象
* 获取浏览器端访问的全路径url
```JS
/*************_/src/node.js_*************/
const http = require('http');
const url = require('url');
const c = require('./controler/c.js');

http.createServer((req, res) => {
  // 设置响应头
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  // 清除第二次访问
  if (req.url !== '/favicon.ico') {
    let {pathname} = url.parse(req.url); // 路径名
    pathname = pathname.slice(1);
    c[pathname](req, res); // 根据路径调用方法
  }
  res.end(); // http协议尾，用于结束请求
}).listen(8000);
console.log('↓↓↓ 服务启动 localhost:8000 ↓↓↓');

/*************_/src/controler/c.js_*************/
function login(req, res) {
  res.write('登录');  
}
function join(req, res) {
  res.write('注册');  
}

module.exports = {
  login,
  join
};

/*************_Brower_*************/
// localhost:8000/login
// localhost:8000/join
```

**读取文件**
---
目的
* 同步读取 fs.readFileSync()
* 异步读取 fs.readFile()
```JS
/*************_/src/node.js_*************/
const http = require('http');
const file = require('./controler/file.js');

http.createServer((req, res) => {
  // 设置响应头
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  // 清除第二次访问
  if (req.url !== '/favicon.ico') {
    file.readFile('./public/tmp.txt'); // 读取文件
  }
  res.end(); // http协议尾，用于结束请求
}).listen(8000);
console.log('↓↓↓ 服务启动 localhost:8000 ↓↓↓');
/*************_/src/controler/file.js_*************/
const fs = require('fs');
const file = {
  readFile: function (path) {
    console.log('__异步读取__');
    fs.readFile(path, (err, data) => {
      if (err) {
      } else {
        // data isBuffer
        console.log(data.toString());
      }
    });
  },
  readFileSync: function (path) {
    console.log('__同步读取__');
    const data = fs.readFileSync(path, 'utf-8');
    console.log(data);
    return data;
  }
};
module.exports = file;
```

**保存文件**
---
目的
* 同步保存与异步保存的区别
```JS
/*************_/src/node.js_*************/
const http = require('http');
const file = require('./controler/file.js');

http.createServer((req, res) => {
  // 设置响应头
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  // 清除第二次访问
  if (req.url !== '/favicon.ico') {
    file.writeFile('./public/tmp_write.txt', 'Hello world!'); // 异步写入
  }
  res.end(); // http协议尾，用于结束请求
}).listen(8000);
console.log('↓↓↓ 服务启动 localhost:8000 ↓↓↓');

/*************_/src/controler/file.js_*************/
const fs = require('fs');
const file = {
  writeFile: function (path, data) {
    console.log('__异步保存__');
    fs.writeFile(path, data, (err) => {
      if (err) {
        
      } else {
        console.log('saved!!!');
      }
    });
  },
  writeFileSync: function (path, data) {
    console.log('__同步保存__');
    fs.writeFileSync(path, data);
  }
};

module.exports = file;
```

**读取图片并回显**
---
* 读取方法 fs.readFile(path, 'binary', callback)
* 设置图片文件对应的响应头 image/jpeg
* 以二进制的格式传输回显
```JS
/*************_/src/node.js_*************/
const http = require('http');
const file = require('./controler/file.js');

http.createServer((req, res) => {
  // 设置响应头
  res.writeHead(200, {
    'Content-Type': 'text/html; charset=utf-8'
  });
  // 清除第二次访问
  if (req.url !== '/favicon.ico') {
    file.readImg('./public/img.jpg', res);
    console.log('主线程');
  }
  // res.end(); // http协议尾，用于结束请求
}).listen(8000);
console.log('↓↓↓ 服务启动 localhost:8000 ↓↓↓');

/*************_/src/controler/file.js_*************/
const fs = require('fs');
const file = {
  readImg: function (path, res) {
    // 读取方法
    fs.readFile(path, 'binary', (err, file) => {
      if (err) {
        console.log(err);
      } else {
        console.log('__输出图片__');
        // 设置响应头
        res.writeHead(200, {
          'Content-Type': 'image/jpeg; charset=utf-8'
        });
        res.write(file, 'binary'); // 以二进制格式传输回显
        res.end(); // http协议尾，用于结束请求
      }
    })
  }
};

module.exports = file;
```

****
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