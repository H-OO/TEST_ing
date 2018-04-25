import {combineReducers} from 'redux'; // 合并所有reducer的方法
import count from './count'; // count reducer

export default combineReducers({
  count
})