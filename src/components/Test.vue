<template>
	<div class="test">
		<h1 class="test-hi">{{msg}}</h1>
		<h2>{{msg2}}</h2>
	</div>
</template>

<script>
export default {
  name: 'test',
  data () {
    return {
      msg: 'Welcome to Art-Gallery App',
      msg2: '-- by 1kg --'
    };
  },
  mounted () {
    console.log('mounted--mounted');
    this.$http.get('/api/hello').then((res) => {
      this.msg2 = res.body;
    });
  }
};
</script>

<style>
  .test{
    color: inherit;
  }
</style>