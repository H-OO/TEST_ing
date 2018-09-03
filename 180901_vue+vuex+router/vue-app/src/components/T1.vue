<template>
  <div>
    <h2>T1</h2>
    <div>{{test}}</div>
  </div>
</template>

<script>
export default {
  name: 'T1',
  computed: {
    test () {
      return this.$store.state.T1.content
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
</script>
