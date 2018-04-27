import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk'; // 异步渲染，改造Dispatch方法

import reducers from '../reducers'; // 将多个reducer进行合并

const store = createStore(reducers, applyMiddleware(thunk)); // need reducers

export default store;
