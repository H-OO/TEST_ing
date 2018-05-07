import {combineReducers} from 'redux';

import Tab from '../reducers/Tab/TabReducer';
import Cart from '../reducers/Cart/CartReducer';

export default combineReducers({
  Tab,
  Cart
});