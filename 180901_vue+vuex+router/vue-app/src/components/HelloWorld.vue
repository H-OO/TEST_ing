<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <button
      v-for="(tab, i) in tabs"
      :key="i"
      @click="currentTab = tab"
    >{{tab}}</button>
    <component :is="currentTab"></component>
    <br>
    <router-link to="/list">前往 List</router-link>
  </div>
</template>

<script>
import C1 from './C1'
import C2 from './C2'
import C3 from './C3'
export default {
  name: 'HelloWorld',
  data () {
    return {
      message: 'Welcome to Your Vue.js App',
      tabs: ['C1', 'C2', 'C3'], // 与组件名称对应
      currentTab: 'C1'
    }
  },
  components: {
    C1,
    C2,
    C3
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
