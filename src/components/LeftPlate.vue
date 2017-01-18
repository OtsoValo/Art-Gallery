<template>
	<div id="ygj-left">
    <div class="left-menu-plate"></div>
    <div class="left-stage-plate">
      <Stage></Stage>
    </div>
	</div>
</template>

<script>
import Stage from './Stage';

export default {
  name: 'LeftPlate',
  data () {
    return {
    };
  },
  components: {
    Stage
  },
  mounted () {
  }
};
</script>

<style>
  #ygj-left{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .left-menu-plate{
    float: left;
    width: 30%;
    height: 100%;
    background-color: #fff;
    box-shadow: 4px 0px 12px #333;
  }
  .left-stage-plate{
    position: relative;
    float: left;
    width: 70%;
    height: 100%;
  }
</style>