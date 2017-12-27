<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style lang="css">
  @import './assets/css/flex.css';
</style>

<style>
  *{margin: 10;padding: 0;}
  #app {
    text-align: center;
  }
</style>
