/**
 * 派发器
 * 用于接收Action，根据Action对象的信息修改Store的状态关系方法
 */
import {Dispatcher} from 'flux';
import Store from '../Store/Store';
const APPDispatcher = new Dispatcher();

APPDispatcher.register((action) => {
  switch (action.type) {
    case 'ADD_NEW_ITEM':
      console.log('获取action.text去更新store');
      Store.items.push(action.text);
      Store.emitChange();
      break;
  }
})

export default APPDispatcher;
