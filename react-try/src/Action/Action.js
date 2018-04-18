import AppDispatcher from '../Dispatcher/Dispatcher';

const Action = {
  addNewItemAction: function(text) {
    AppDispatcher.dispatch({
      type: 'ADD_NEW_ITEM',
      text
    })
  }
};

export default Action;
