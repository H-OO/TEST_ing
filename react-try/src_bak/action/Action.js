// const AppDispatcher = require('../dispacher/AppDispacher');
import AppDispatcher from '../dispacher/AppDispacher';

const Action = {
  addNewItem: function (text) {
    AppDispatcher.dispatch({
      type: 'ADD_NEW_ITEM',
      text
    })
  }
};
export default Action;