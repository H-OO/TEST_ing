const fs = require('fs');

// 归档插件
const archiver = require('archiver');

// zipFilePath
const zipFilePath = 'current.zip';

// 创建可写流，`archiver`内部需使用`writeStream`对象的`write`方法
const output = fs.createWriteStream(zipFilePath); // output is `writeStream`对象

// 设置压缩级别
const archive = archiver('zip', {
  zlib: {
    level: 9
  }
});

// 输出完成后上传文件
output.on('finish', upload);

// 设置zip文件输出路径
// archive.directory('dist/', false); // 根目录
archive.directory('dist/', 'new_dist'); 
// 参数1 对dist目录下的所有文件进行zip压缩
// 参数2 zip文件内的一级目录名称

// 归档文件
archive.pipe(output);

// 归档完成 断开所有监听
archive.finalize();

// 获取文件
function upload() {
  fs.readFile(zipFilePath, function(err, data) {
    if (err) {
      console.log('文件读取失败');
      return;
    }
    console.log('文件读取成功，上传文件');
    console.log(data);
  });
}
