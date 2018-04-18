/**
 * 唯一的状态仓库
 * 当某个状态发生改变时
 * 需要触发事件，用于通知绑定了该状态的组件
 * 绑定该状态的组件通过state的重新赋值使React再次调用render方法渲染视图
 */
import {EventEmitter} from 'events';

const Store = Object.assign({}, EventEmitter.prototype, {
  items: [],
  // 获取items
  getItems: function() {
    return this.items;
  },
  // 添加监听
  addChangeListener: function(callback) {
    this.on('change', callback)
  },
  // 触发事件
  emitChange: function() {
    this.emit('change');
  },
  // 移除监听
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }
});

export default Store;