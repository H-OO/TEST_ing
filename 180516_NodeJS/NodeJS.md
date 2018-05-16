# NodeJS

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