/**
 * 唯一的状态仓库
 * 给Dispatcher提供改查接口
 * 给Control提供视图change命令（通过Control的state进行）
 */
import {EventEmitter} from 'events';

const Store = Object.assign({}, EventEmitter.prototype, {
  items: [],
  // 查
  getItems: function() {
    return this.items
  },
  // add listener
  addChangeListener: function(eventName, callback) {
    this.on(eventName, callback);
  },
  // emit event
  emitChange: function(eventName) {
    this.emit(eventName);
  },
  // remove listener
  removeChangeListener: function(eventName, callback) {
    this.removeListener(eventName, callback);
  }
});



export default Store;