// const Dispatcher = require('flux').Dispatcher;

import {Dispatcher} from 'flux';
import Store from '../store/Store';
const AppDispatcher = new Dispatcher();


// 注册action行为对应触发的处理动作
AppDispatcher.register(function (action) {
  switch(action.type) {
    case 'ADD_NEW_ITEM':
      Store.addNewItemHandler(action.text);
      Store.emitChange();
      break;
  }
});

export default AppDispatcher;
