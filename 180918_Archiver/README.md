# archiver 归档

```js
const fs = require('fs');
const archiver = require('archiver');

// 创建文件流归档数据
const output = fs.createWriteStream(__dirname + '/dist.zip');

// 设置压缩级别
const archive = archiver('zip', {
  zlib: {
    level: 9
  }
});

// 监听close事件
output.on('close', () => {
  // 归档完成，输出文件描述符close
  console.log('_close_');
})

// 监听end事件
output.on('end', () => {
  // 文件已完成读取
  console.log('_end_');
});

// 警告
archive.on('warning', (err) => {
  if (err.code === 'ENOENT') {
    // 记录警告
  } else {
    // 抛出错误
    throw err;
  }
});

// 错误
archive.on('error', (err) => {
  throw err;
});

// 管归档数据的文件 ???
archive.pipe(output);

// append a file from stream
const file1 = __dirname + '/file1.txt';
archive.append(fs.createReadStream(file1), {
  name: 'file1.txt'
});
```
