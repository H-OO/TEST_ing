import { combineReducers } from 'redux';
import Login from './LoginReducer';
import GoodsList from './GoodsListReducer';
export default combineReducers({
  Login,
  GoodsList
})