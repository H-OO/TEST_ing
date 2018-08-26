/**
 * 合并所有 reducer，将 index 文件作为最终的输出文件
 * @param combineReducers 合并插件
 * @param Test 引入TestReducer
 */
import { combineReducers } from 'redux';
import Test from './TestReducer';
export default combineReducers({
  // 命名等同于创建命名空间 使用时：store.getState().Test isObj
  Test
});