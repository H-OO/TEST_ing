/**
 * 派发器
 * 注册Action对应的行为
 * 接收Action的行为触发
 * 修改Store
 */
import {Dispatcher} from 'flux';
import Store from '../Store/Store';

const AppDispatcher = new Dispatcher();

// 注册Action对应的行为
AppDispatcher.register((action) => {
  // 参数action 接收 Action 传递过来的对象
  switch (action.type) {
    case 'ADD_NEW_ITEM':
      Store.items.push(action.text); // 修改当前Store中的items
      Store.emitChange('change'); // 将Store中的修改通过Control响应给视图
      break;
  }
});

export default AppDispatcher;