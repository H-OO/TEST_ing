/**
 * @param combineReducers 将所有抽离出来的reducer进行合并，才能传入createStore方法中
 */
import {combineReducers} from 'redux';

import goodsId from '../reducers/goodsId'; // goodsId reducer

export default combineReducers({
  goodsId
})