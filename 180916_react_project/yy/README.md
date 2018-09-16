# 创建H5

**安装&创建**
---
`npm i -g create-react-app`  安装脚手架  
`create-react-app appName`   创建H5

**目录结构**
---
理想目录结构
```
|- src
    |- actions
          |- componentNameActionCreater.js
    |- components
          |- App
              |- css
              |- img
              |- App.jsx
    |- reducers
          |- index.js
          |- componentNameReducer.js
    |- store
          |- index.js
```

`npm i -D redux`  使用全局仓库进行状态管理

```js
/**
 * src/store/index.js
 * `redux` API `createStore`
 * @function  createStore  创建全局状态仓库，接收`reducers`，返回`store`
 * @const     reducers     所有组件`reducer`的集合，通过`switch-case`语句匹配`action.type`，用于获取同步或异步数据
 * @const     store        全局仓库对象
 */
import { createStore } from 'redux';
import reducers from '../reducers';
const store = createStore(reducers);
export default store;

/**
 * src/reducers/index.js
 * `redux` API `combineReducers`
 * @function  combineReducers       将所有组合`reducer`进行组合
 * @const     componentNameReducer  修改`store.state`的唯一途径；通过`switch-case`语句匹配`action.type`执行逻辑操作，返回新的`store.state`
 * @const     reducers              所有组件`reducer`的集合
 */
import { combineReducers } from 'redux';
import componentNameReducer from './componentNameReducer';
const reducers = combineReducers({
  componentNameReducer
});
export default reducers;
```

**组件路由**
---
`npm i -D react-keeper`  路由插件，比官方的`react-router-dom`更适合H5项目

特性
* 可扩展路由
* 页面缓存
* 标签化过滤器
* 标签化动态加载
* 灵活的配置

**react-keeper 页面缓存**
---
作用：当路由发生跳转时，自动缓存当前页面的状态  
应用：列表页的缓存

缓存方式
* cache属性
* CacheLink组件

```js
/**
 * src/components/App/App.jsx
 * cache属性
 * cache / cache='root'  `root`是默认值，表示根组件不解绑便会永久缓存
 * cache='parent'        `parent`表示为父组件缓存，父组件不解绑便会持续缓存
 * `path`精确匹配使用`>`路径结束符
 * `path`传参`/:id`，通过`this.props`获取参数
 */
class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <div>
          <Route component={Home} path='/>' index />
          <Route component={List} path='/list' />
          <Route component={Detail} path='/detail/:id' />
          <Route cache component={AboutUs} path='/aboutus'>
        </div>
      </HashRouter>
    )
  }
}
```

```js
/**
 * CacheLink组件
 * 情景：适用于`列表页>详情页`
 * 作用：在详情页回退列表页使用缓存，详情跳转其他路径清除列表页缓存
 */
class List extends React.Component {
  render() {
    return (
      <ul>
        <li>
          <CacheLink to={`/detail/first`}>to detail</CacheLink>
        </li>
      </ul>
    )
  }
}
```

**加载动态组件**
---
```js
/**
 * `Route`组件的`loadComponent`属性
 * 作用：分割代码，实现按需加载，减少首屏时间
 */
const asyncGetComponent = (callback) => {
  import('../AsyncComponent/AsyncComponent.jsx').then((component) => {
    callback(component.default);
  })
};
<Route loadComponent={asyncGetComponent} path='/asyncComponent'></Route>
```