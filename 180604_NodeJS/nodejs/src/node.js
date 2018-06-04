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
