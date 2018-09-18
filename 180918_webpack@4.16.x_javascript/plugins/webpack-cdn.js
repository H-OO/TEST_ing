var request = require("request");
var fs = require("fs");
var md5 = require("md5");
var archiver = require("archiver");

const CleanWebpackPlugin = require("clean-webpack-plugin");
var pathsToClean = ["dist/*.*"];
var cleanOptions = {
  verbose: true,
  dry: false
};

function toCdnPlugin(options) {
  this.options = options;
}

toCdnPlugin.prototype.apply = function(compiler) {
  var opts = this.options;

  // var zipFilePath = 'bbbb.zip'
  var zipFilePath = opts.buildpath + ".zip";

  compiler.plugin("done", function() {
    console.log("zipFilePath--------------" + zipFilePath);
    // 压缩成zip文件
    var archive = archiver("zip", {
      zlib: {
        level: 9
      } // Sets the compression level.
    });
    var output = fs.createWriteStream(zipFilePath);

    output.on("finish", upload);

    archive.on("error", function(err) {
      throw err;
    });

    archive.directory("dist/", "dist");

    archive.pipe(output);

    archive.finalize();
  });

  // upload()
  function zipDone() {
    console.log("!!!!!!!!!!!!!!!zipIsDone!!!!!!!!!!!!!!");
  }
  //upload()

  function upload() {
    fs.readFile(zipFilePath, function(err, data) {
      if (err) {
        console.log(err);
        return;
      }
      if (!data.toString()) {
        console.log("file is empty");
        return;
      }
      // console.log(data);
      request(
        {
          url: "http://inner.up.cdn.qq.com:8080/uploadserver/uploadfile.jsp",
          method: "POST",
          headers: {
            "X-CDN-Authentication": opts.token
          },
          body: data,
          qs: {
            appname: opts.appname,
            user: opts.username,
            filename: opts.buildpath,
            filetype: "zip",
            filepath: opts.path,
            filesize: (function(filepath) {
              return fs.statSync(filepath).size;
            })(zipFilePath),
            filemd5: (function(filepath) {
              return md5(fs.readFileSync(filepath)).toLowerCase();
            })(zipFilePath),
            isunzip: 1
          }
        },
        function() {
          console.log(
            zipFilePath + "--------------!!!!!!!!!!!!!!!!!!! upload success."
          );

          fs.unlinkSync(zipFilePath);
        }
      );
    });
  }
};

module.exports = toCdnPlugin;
