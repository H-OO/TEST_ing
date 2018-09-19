/**
 * 插件名：FilesUploadCDN
 * 插件功能：获取打包后的文件，上传至CDN服务器
 * @const fs              node内置操作文件模块
 * @const archiver        归档插件
 * @const FilesUploadCDN  定义的功能类
 * 
 * 配置对象成员
 * @param buildDir  webpack构建输出目录名
 * @param output    zip压缩输出路径+文件名
 *    |- @member dirname   zip压缩包输出目录
 *    |- @member filename  zip压缩包文件名称
 * 
 * 思路：用`archiver`压缩`webpack`构建输出的目录文件夹；上传至CDN服务器
 */
const fs = require('fs');

// 归档插件
const archiver = require('archiver');

class FilesUploadCDN {
  constructor(options) {
    this.options = options;
  }
  // 获取文件
  upload(filepath) {
    fs.readFile(filepath, function(err, data) {
      if (err) {
        console.log('文件读取失败');
        return;
      }
      console.log('文件读取成功，上传文件');
      console.log(data);
    });
  }
  apply(compiler) {
    // webpack钩子
    compiler.hooks.done.tap('done', () => {
      // 定义归档输出文件名
      const { buildDir, output } = this.options;
      const { dirname, filename } = output;

      // 压缩包输出路径+文件名
      const packagePath = dirname + '/' + filename;
      
      // 创建输出目录
      fs.mkdirSync(dirname);

      // 创建可写流，`archiver`内部需使用`writeStream`对象的`write`方法
      const bareWriteStream = fs.createWriteStream(packagePath); // bareWriteStream is `writeStream`对象

      // 设置压缩级别
      const archive = archiver('zip', {
        zlib: {
          level: 9
        }
      });

      // 输出完成后上传文件
      bareWriteStream.on('finish', () => {
        this.upload(packagePath);
      });

      // 设置zip文件输出路径
      // 参数1 对dist目录下的所有文件进行zip压缩
      // 参数2 zip文件内的一级目录名称
      archive.directory(buildDir, false); // 根目录

      // 归档文件
      archive.pipe(bareWriteStream);

      // 归档完成 断开所有监听
      archive.finalize();
    });
  }
}

module.exports = FilesUploadCDN;
