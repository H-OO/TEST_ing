<template>
  <div>
    <h2>Detail</h2>
    <div>{{id}}</div>
    <div>{{num}}</div>
    <br>
    <button @click="goBackHandler">上一页</button>
    <button @click="goHomeHandler">前往首页</button>
  </div>
</template>

<script>
import CacheServer from '../assets/CacheServer'
export default {
  name: 'Detail',
  data () {
    return {
      id: '',
      num: '【' + (Math.random() * 100).toFixed(0) + '】'
    }
  },
  created () {
    const {id} = this.$route.params
    this.id = id
  },
  methods: {
    goBackHandler () {
      this.$router.back()
    },
    goHomeHandler () {
      this.$router.push('/')
      CacheServer.remove('List')
    }
  }
}
</script>
