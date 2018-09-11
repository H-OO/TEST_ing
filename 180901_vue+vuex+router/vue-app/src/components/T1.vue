<template>
  <div>
    <h2>T1</h2>
    <br>
    <input type="checkbox" value="A" v-model="checkNames">
    <input type="checkbox" value="B" v-model="checkNames">
    <div>checkNames: {{checkNames}}</div>
    <br>
    <input type="radio" value="A" v-model="picked">
    <input type="radio" value="B" v-model="picked">
    <div>picked: {{picked}}</div>
    <br>
    <select multiple v-model="selected">
      <option disabled value="">请选择</option>
      <option value="a">A</option>
      <option value="b">B</option>
    </select>
    <div>selected: {{selected}}</div>
    <br>
    <input type="checkbox" v-model="toggle">
    <div>toggle: {{toggle}}</div>
  </div>
</template>

<script>
export default {
  name: 'T1',
  data() {
    return {
      checkNames: [],
      picked: '',
      selected: '',
      toggle: false
    }
  },
  created() {}
}
</script>
