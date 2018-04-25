import {createStore} from 'redux';

import reducers from '../reducers'; // 组合派发器

const store = createStore(reducers); // 创建状态仓库

export default store;