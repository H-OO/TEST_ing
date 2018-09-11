<template>
  <div id="app">
    <keep-alive :include="myCache">
      <router-view/>
    </keep-alive>
    <br>
    <!-- <div>缓存列表：{{myCacheToString}}</div> -->
  </div>
</template>

<script>
import CacheServer from './assets/CacheServer'
export default {
  name: 'App',
  data () {
    return {
      myCache: []
    }
  },
  computed: {
    myCacheToString () {
      return this.myCache.toString()
    }
  },
  created () {
    CacheServer.reg(this.myCache) // 注册缓存服务
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
