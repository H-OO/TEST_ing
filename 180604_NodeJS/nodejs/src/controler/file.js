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