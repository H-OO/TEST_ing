/**
 * 模块配置文件
 * 作用：注册模块，按需引入第三方依赖包
 * @param config[key] key指模块名
 * @param chunks 模块依赖的第三方包
 * 注意有些非npm安装的第三方包需要注册别名，例如echarts
 */
const config = {
  Try: {
    chunks: ['drag']
  }
};

module.exports = config;