<template>
  <div>
    <h2>List</h2>
    <ul>
      <li
        v-for="(item, i) in list"
        :key="i"
      >
        <router-link :to="`/detail/${item}`">{{listItem(item)}}</router-link>
      </li>
    </ul>
    <br>
    <button @click="goBackHandler">上一页</button>
  </div>
</template>

<script>
import CacheServer from '../assets/CacheServer'
export default {
  name: 'List',
  data () {
    return {
      list: ['1', '2', '3']
    }
  },
  methods: {
    goBackHandler () {
      this.$router.back()
      CacheServer.remove('List')
    },
    listItem (param) {
      return param + ' 【' + (Math.random() * 100).toFixed(0) + '】'
    }
  },
  created () {
    CacheServer.add('List')
  }
}
</script>
