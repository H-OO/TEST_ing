/**
 * @param createStore 创建唯一仓库的方法，该方法可以接收三个参数
 *        分别是：reducers函数[必须], 从服务器端获取的初始化状态[选填], applyMiddleware(中间件)[选填]
 * @param applyMiddleware 将需要使用的中间件组成一个数组，依次执行的方法
 */
import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
