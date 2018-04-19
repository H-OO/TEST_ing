/**
 * Action
 * 主要就是将视图交互行为产生的信息以对象的形式发送给Dispatcher
 */

import Dispatcher from '../Dispatcher/Dispatcher';

const Action = {
  addNewItemAction: function(text) {
    const action = {
      type: 'ADD_NEW_ITEM', // 必须
      text
    };
    Dispatcher.dispatch(action);
  }
};

export default Action;