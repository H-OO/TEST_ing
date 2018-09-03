## vue

**安装**
---
全局安装  
`npm i -g vue vue-cli`

快速搭建  
`vue init webpack projectName`

**创建根实例**
---
只进行一次实例化
```js
// src/main.js
import Vue from 'vue'
import App from './App'
import router from './router'
new Vue({
  el: '#app', // 替换到index.html中的id为app的节点
  router, // 提供 router-view 组件
  components: { App },
  template: '<App/>'
})
```
```js
// src/router/index.js
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router) // 注册插件，使其全局化

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
```

**组件**
---
组件结构（.vue）
* template 组件html模板
* script 输出组件
* style 组件样式

组件相关属性
* `name`          isStr  组件名
* `data`          isFunc 数据，数据改变触发视图更新
* `methods`       isObj  方法，将方法进实例对象中
* `beforeCreate`  isFunc 生命钩子，在实例创建之前调用
* `created`       isFunc 生命钩子，在实例创建完毕后调用
* `mounted`       isFunc 生命钩子，在实例挂载完毕后调用
* `destroyed`     isFunc 生命钩子，在实例被销毁时调用
* `computed`      isObj  计算属性，存放简单的计算方法，减少模板的逻辑代码
* `watch`         isObj  监听属性，监听data属性中某个成员的值，值发生改变就调用处理函数
```js
/**
 * App.vue
 * <script></script>
 */
export default {
  name: 'App',
  data () {
    return {
      num: 1
    }
  },
  methods: {},
  beforeCreate () {},
  created () {},
  mounted () {},
  destroyed () {},
  computed: {
    // <div>{{numHandler}}</div> 优于 <div>{{numHandler + 1}}</div>
    numHandler () {
      return num + 1
    }
  },
  watch: {
    num () {
      // 函数体在 this.num 被修改时调用
    }
  }
}
```

**遍历元素 v-for**
---
```
// arr: [1, 2, 3]
<ul>
  <li v-for="(item, i) in arr" :key="i">{{item}}</li>
</ul>
// 编译后
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
```

**数组更新**
---
变异方法
* `pop`
* `push`
* `reverse`
* `shift`
* `splice`
* `sort`
* `unshift`

只有使用变异方法才会触发视图更新；非变异方法只会返回新的数组，不触发更新

注意：由于JS本身限制，以下修改数组的方式不能被检测到，视图不更新
```js
const arr = [1, 2, 3]

// 情景1：通过索引改变数组某一个元素
arr[1] = 'xxx' // [1, 'xxx', 3]

// 情景2：通过length属性改变数组长度
arr.length = 1 // [1]
```

解决办法：如果变异方法不能满足需求，可以使用`this.$set(arr, index, newValue)`
```js
// arr: [1, 2, 3]
this.$set(this.arr, 1, 'xxx') // [1, 'xxx', 3] 视图更新
```

**对象更新**
---
由于JS本身限制，无法检测对象成员的添加与删除，视图都不更新  
```js
const obj = {
  first: 'aa',
  second: 'bb'
}
// 情景1：添加成员
obj.third = 'cc' // {first:'aa',second:'bb',third:'cc'}
// 情景2：删除成员
delete obj.first // {second:'bb'}
```

解决办法：需使用`this.$set(obj, key, value)`与`this.$delete(obj, key)`方法
```js
// this.obj {first:'aa',second:'bb'}
// 情景1：添加成员
this.$set(this.obj, 'third', 'cc') // {first:'aa',second:'bb',third:'cc'} 视图更新
// 情景2：删除成员
this.$delete(this.obj, 'first') // {second:'bb'} 视图更新
```

**组件通信：父传子**
---
通过`props`属性
```
/**
  * Child.vue
  */
<template>
  <div>
    <h2>Child</h2>
    <div>{{msg}}</div>
  </div>
</template>
<script>
export default {
  name: 'Child',
  props: ['msg']
}
</script>

/**
  * Parent.vue
  */
<template>
  <div>
    <h2>Parent</h2>
    <Child :msg="message"/>
  </div>
</template>
<script>
import Child from './Child' // 引入子组件
export default {
  name: 'Parent',
  components: {
    Child
  },
  data: {
    return {
      message: 'xxx'
    }
  }
}
</script>
```

**组件通信：子传父**
---
通过`v-on | @`与`$emit`
```
/**
  * Child.vue
  * 通过 this.$emit(eventName, params) 触发事件
  */
<template>
  <div>
    <h2>Child</h2>
    <button @click="emitHandler">transfer value</button>
  </div>
</template>
<script>
  export default {
    name: 'Child',
    methods: {
      emitHandler () {
        this.$emit('msg', {
          payload: 'xxx'
        })
      }
    }
  }
</script>

/**
  * Parent.vue
  * 通过 v-on | @ 监听事件
  * @eventName="eventHandler"
  */
<template>
  <div>
    <h2>Parent</h2>
    <div>{{value}}</div>
    <Child @msg="msgHandler" />
  </div>
</template>
<script>
  import Child from './Child'
  export default {
    name: 'Parent',
    components: {
      Child
    },
    data: {
      return {
        value: 'init'
      }
    },
    methods: {
      msgHandler (params) {
        this.value = params.payload // xxx
      }
    }
  }
</script>
```

**组件通信：平行组件传值**
---
创建 bus.js 文件
```js
import Vue from 'vue'
export default new Vue()
```

使用bus进行通信
* 传值通过 `$emit(eventName, params)`
* 接收通过 `$on(eventName, eventHandler)`

```
/**
  * Emit.vue
  * 通过 Bus.$emit(eventName, params) 触发事件
  */
<template>
  <div>
    <h2>Emit Component</h2>
    <button @click="clickHandler">emit</button>
  </div>
</template>
<script>
  import Bus from '../assets/bus'
  export default {
    name: 'Emit',
    methods: {
      clickHandler () {
        Bus.$emit('msg', {
          payload: 'xxx'
        })
      }
    }
  }
</script>

/**
  * On.vue
  * 通过 Bus.$on(eventName, eventHandler) 触发事件
  */
<template>
  <div>
    <h2>On Component</h2>
    <div>{{content}}</div>
  </div>
</template>
<script>
  import Bus from '../assets/bus'
  export default {
    name: 'On',
    data () {
      return {
        content: ''
      }
    },
    create () {
      Bus.$on('msg', params => {
        this.content = params.payload // 'xxx'
      })
    }
  }
</script>
```

**ref**
---
作用：获取dom元素
```
// 设置
<div ref="ele"></div>
// 获取
this.$refs.ele
```

**v-if与v-show**
---
`v-if`只有条件成立元素才会渲染，切换过程中确保事件监听器和子组件适当被销毁和重建   
`v-show`无论条件是否成立都会渲染，通过切换样式进行显示隐藏

**动态类名**
---
```html
/**
  * 方式1 对象语法添加类名
  */
<div :class="{className: true === true}"></div>

/**
  * 方式2 数组语法+三元表达式添加类名
  */
<div :class="[class1 ? true : false, class2]"></div>
```

**动态组件**
---
作用：不同组件进行动态切换（tab选项卡功能）  
通过 `<component :is=""></component>` is属性值为组件名称，将其指定为当前组件
```
<template>
  <div>
    <button
      v-for="(tab, i) in tabs"
      :key="i"
      @click="currentTab = tab" // 点击对currentTab重新赋值
    >
      {{tab}}
    </button>
    <component :is="currentTab"></component>
  </div>
</template>

<script>
  import Tab1 from './Tab1'
  import Tab2 from './Tab2'
  import Tab3 from './Tab3'
  export default {
    name: 'Tab',
    component: {
      Tab1,
      Tab2,
      Tab3
    },
    data () {
      return {
        tabs: ['Tab1', 'Tab2', 'Tab3'], // 可切换组件列表
        currentTab: 'Tab1' // 当前组件
      }
    }
  }
</script>
```

**缓存组件**
---
作用：保留组件状态，避免重新渲染  
通过 `<keep-alive :include="[]"></keep-alive>`
```
// src/App.vue
<template>
  <keep-alive :include="myCache">
    <router-view />
  </keep-alive>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {
        myCache: [] // 数组中出现的组件名将会被缓存
      }
    }
  }
</script>
```
```js
/**
 * 缓存服务
 * src/assets/CacheServer.js
 */
class CacheServer {
  constructor () {
    this.list = []
    this.regState = false
  }
  reg (list) {
    if (!Array.isArray(list)) {
      console.error('reg() param is Array')
      return false
    }
    this.regState = true
    this.list = list
  }
  check () {
    if (!this.regState) {
      console.error('it are not activated,Please firstly register it!')
      return false
    }
    return true
  }
  add (item) {
    if (!this.check()) {
      return
    }
    this.list.push(item)
  }
  remove (item) {
    if (!this.check()) {
      return
    }
    const index = this.list.indexOf(item)
    if (index > -1) {
      this.list.splice(index, 1)
    } else {
      console.error('CacheServer: cache list no found ' + item)
    }
  }
}

export default new CacheServer()
```

使用文档
```
一、引入包 （App.vue）
import CacheServer from './assets/CacheServer'
二、注册缓存服务 (App.vue)
created () {
  CacheServer.reg(this.myCache) // 注册缓存服务
}
三、设置myCache (App.vue)
data () {
  return: {
    myCache: [] // 缓存列表，默认为空数组
  }
}
四、将myCache动态绑定给include属性 (App.vue)
<keep-alive :include="myCache">
  <router-view />
</keep-alive>
五、添加缓存
CacheServer.add('componentName')
六、移除缓存
CacheServer.remove('componentName')
```

## vue-router

**路由**
---
`npm i -D vue-router`

在App组件中，通过`<router-view/>`进行组件切换

```js
/**
 * src/router/index.js
 * 路由配置
 */
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router) // 注册插件，使其全局化

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
```

```js
/**
 * src/main.js
 * 路由全局注册
 */
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 全局注册 子组件可通过 this.$router 获取路由方法
  components: { App },
  template: '<App/>'
})
```

**路由跳转**
---
跳转方式
* 编程式 `this.$router.push([string|object])`
* 组件式 `<router-link to="/"></router-link>`

```js
/**
 * 编程式
 * 可传递不同格式参数实现跳转
 * 传递的参数可通过 this.$route 获取
 */

// 跳转路径 `/detail/1`
// 注意：路由路径最末需添加`/:id`，作用是动态生成路由路径
// 格式1
this.$router.push('/detail/1')
// 格式2
this.$router.push({
  path: '/detail/1'
})
// 格式3
this.$router.push({
  name: 'Detail',
  params: {
    id: 1
  }
})

// 跳转路径 `/detail?id=1`
this.$router.push({
  path: '/detail',
  query: {
    id: 1
  }
})

/**
 * 组件式
 * router-link组件最终渲染成a标签
 */
// 跳转路径 `/detail/1`，路由路径最末需添加`/:id`
<router-link to="/detail/1">jumpPath</router-link>
// 跳转路径 `/detail?id=1`
<router-link to="/detail?id=1">jumpPath</router-link>
```

## vuex

**安装**
---
`npm i -D vuex`

store相关属性与方法
* state       isObj   状态仓库
* mutations   isObj   改变仓库状态的方法
* getters     isObj   存放共享的状态处理方法，相当于store中的计算属性
* actions     isObj   实现异步
* modules     isObj   分割模块代码

组件中触发改变仓库状态的方法
* commit      isFunc  触发mutations中对应的方法
* dispatch    isFunc  触发actions中对应的方法

简化代码方法
* mapState    isFunc  简化state成员绑定到计算属性的代码
* mapActions  isFunc  简化dispatch方法推送action的代码

**mutations**
---
作用：改变仓库状态的方法
```js
// src/store/index.js
import Vue from 'Vue'
import Vuex from 'Vuex'
Vue.use(Vuex) // 注册插件，使其全局化
export default new Vuex.Store({
  // 状态仓库 通过this.$store.state访问
  state: {},
  // 改变状态的方法 通过commit(type, params)触发
  mutations: {
    type (params) {
      // todosomething...
    }
  }
})
```
```js
// src/main.js
import Vue from 'Vue'
import store from './store'
new Vue({
  // 全局可通过 this.$store 访问
  store
})
```

**commit**
---
创建信息对象，调用mutations匹配的成员，改变state  
通过`this.$store.commit`方法触发mutations对应名称的方法
```js
/**
 * store
 */
new Vuex.Store({
  state: {},
  mutations: {
    init (state, params) {
      // state === this.state
      // params 为commit方法传递过来的参数
    }
  }
})

/**
 * 方式1
 * this.$store.commit(type, params)
 */
this.$store.commit('init', {})

/**
 * 方式2
 * this.$store.commit({
 *   type: 'x',
 *   payload: 'xxx'
 * })
 */
this.$store.commit({
  type: 'init',
  payload: 'xxx'
})
```

**状态改变响应到视图**
---
state(状态仓库)中的状态改变后，只需通过computed(计算属性)便可以响应会视图
```
<div>{{count}}</div>

export default {
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```

**mapState**
---
作用：简化state成员绑定到计算属性的代码
```js
import { mapState } from 'Vuex'
export default {
  computed: mapState({
    // 改变之前绑定count的写法
    // 写法1：箭头函数
    count: state => state.count
    // 写法2：字符串  `count` 等同于 `state => state.count`
    count: 'count'
    // 写法3：为了使用局部状态
    count (state) {
      // state 全局
      // this 局部
    }
  })
}
```

**扩展运算符+mapState**
---
作用：与局部计算属性混合使用
```js
export default {
  computed: {
    count1 () {
      return this.$store.state.count1
    },
    ...mapState({
      count2: 'count2'
    })
  }
}
```

**getter**
---
作用：存放共享的状态处理方法，相当于store中的计算属性  
获取：通过`this.$store.getters`
```js
// 全局共享的arrSplice方法
new Vuex.Store({
  state: {
    arr: [1, 2, 3]
  },
  getters: {
    arrSplice (state) {
      state.arr.splice(1, 1)
      return state.arr
    }
  }
})

// 通过 this.$store.getters.appSplice 获取计算后的结果
```

**actions**
---
作用：实现异步  
通过`this.$store.dispatch({type: '', payload: 'xxx'})`方法进行推送  
根据`type`执行`actions`中对应的方法
```js
// src/store/index.js
export default new Vuex.Store({
  state: {
    content: 'placeholder'
  },
  actions: {
    test (store, params) {
      // 同步
      store.commit({
        type: 'test',
        payload: params.payload
      })
      // 异步
      setTimeout(() => {
        store.commit({
          type: 'test',
          payload: 'async'
        })
      }, 1000)
    }
  },
  mutations: {
    // 方法参数1都为 state
    test ({ content }, params) {
      content = params.payload
    }
  }
})

/**
 * src/components/Test.vue
 * 视图绑定：<div>{{test}}</div>
 */
export default {
  name: 'Test',
  computed: {
    test () {
      console.log(this.$store.state.content)
      return this.$store.state.content
    }
  },
  created () {
    this.$store.dispatch({
      type: 'test',
      payload: 'init'
    })
  }
}
```

**mapActions**
---
作用：通过映射，简化dispatch方法推送action的代码
```js
import { mapActions } from 'Vuex'
export default {
  methods: {
    ...mapActions([
      'test'
    ])
  },
  created () {
    this.test() // 等同于`this.$store.dispatch({type: 'test'})`
  }
}
```
vue发出警告问题未解决

**组合Action**
---
异步结束后的操作，通过 Promise 对象实现  
`then`方法会在所有同步的代码执行完毕之后执行
```js
// src/store/index.js
export default new Vuex.Store({
  state: {
    content: 'placeholder'
  },
  actions: {
    test (store, params) {
      // 同步
      store.commit({
        type: 'test',
        payload: params.payload
      })
      return new Promise((resolve, reject) => {
        // 异步
        setTimeout(() => {
          store.commit({
            type: 'test',
            payload: 'async'
          })
          resolve()
        }, 0)
      })
    }
  },
  mutations: {
    test (state, params) {
      state.content = params.payload
    }
  }
})

/**
 * scr/components/Test.vue
 * 视图：<div>{{test}}</div>
 */
export default {
  name: 'Test',
  computed: {
    test () {
      return this.$store.state.content
    }
  },
  created () {
    this.$store.dispatch({
      type: 'test',
      payload: 'init'
    }).then(() => {
      console.log('then')
    })
  }
}
```

**modules**
---
作用：分割模块代码
```js
// src/store/modules/Test.js
export default {
  state: {},
  actions: {},
  mutations: {}
  ...
}
```
```js
import Test from './modules/Test'
export default new Vuex.Store({
  modules: {
    Test
  }
})

// 访问state中的状态：this.$store.state.Test
```
