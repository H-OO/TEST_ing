import {combineReducers} from 'redux';

import Header from '../reducers/Header/HeaderReducer';
import Tab from '../reducers/Tab/TabReducer';
import Cart from '../reducers/Cart/CartReducer';
import List from '../reducers/List/ListReducer';
import Loading from '../reducers/Loading/LoadingReducer';

export default combineReducers({
  Header,
  Tab,
  Cart,
  List,
  Loading
});