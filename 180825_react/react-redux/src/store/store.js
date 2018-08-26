/**
 * @const createStore 创建 store，异步渲染需要接受两个参数
 * @const reducers 将多个reducer进行合并后的结果
 */
import { createStore } from 'redux';
import reducers from '../reducers';
const store = createStore(reducers);
export default store;