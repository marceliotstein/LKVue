<template>
  <div class="opera-list">
    <h1>{{ msg }}</h1>
    <h2>Un Lovaro in Corso</h2>
  </div>
</template>

<script>
export default {
  name: 'OperaList',
  data () {
    return {
      msg: 'Testing JSON API ...'
    }
  }
}
</script>

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
