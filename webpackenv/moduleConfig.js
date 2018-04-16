/**
 * 模块配置文件
 * @param chunks 注意有些非npm安装的第三方包需要注册别名
 */
const config = {
  Home: {
    chunks: ['echarts', 'lodash']
  },
  News: {
    chunks: ['echarts', 'lodash']
  }
};

module.exports = config;