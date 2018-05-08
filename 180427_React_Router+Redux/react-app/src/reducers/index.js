import {combineReducers} from 'redux';

import Tab from '../reducers/Tab/TabReducer';
import Cart from '../reducers/Cart/CartReducer';
import List from '../reducers/List/ListReducer';

export default combineReducers({
  Tab,
  Cart,
  List
});