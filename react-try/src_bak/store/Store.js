const EventEmitter = require('events').EventEmitter; // node内置事件对象 提供发布订阅模式

const store = Object.assign({}, EventEmitter.prototype, {
  // items列表 保存text
  items: [],
  // 获取当前Items列表
  getAll: function() {
    return this.items;
  },
  // 添加新Item
  addNewItemHandler: function(text) {
    this.items.push(text);
  },
  // 触发change自定义事件
  emitChange: function () {
    this.emit('change');
  },
  // 监听change自定义事件 执行回调函数
  addChangeListener: function(callback) {
    this.on('change', callback);
  },
  // 移除change自定义事件
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});
module.exports = store;