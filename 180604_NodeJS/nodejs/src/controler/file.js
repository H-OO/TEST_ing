const fs = require('fs');
const file = {
  readImg: function (path, res) {
    fs.readFile(path, 'binary', (err, file) => {
      if (err) {
        console.log(err);
      } else {
        console.log('__输出图片__');
        // 设置图片文件响应头
        res.writeHead(200, {
          'Content-Type': 'image/jpeg; charset=utf-8'
        });
        res.write(file, 'binary'); // 以二进制格式回显
        res.end(); // http协议尾，用于结束请求
      }
    })
  }
};

module.exports = file;