<template>
    <div id="app">
        <img src="./assets/logo.jpg">
        <test></test>
    </div>
</template>

<script>
  import Test from './components/Test'

  export default {
    name: 'app',
    components: {
      Test
    }
  }
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #404034;
    margin-top: 60px;
}
</style>