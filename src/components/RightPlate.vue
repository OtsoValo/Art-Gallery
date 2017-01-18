<template>
  <div id="ygj-right">
    <div class="right-stage-plate">
      <Stage></Stage>
    </div>
    <div class="right-item-plate"></div>
  </div>
</template>

<script>
  import Stage from './Stage';
  export default {
    name: 'RightPlate',
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
  #ygj-right{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .right-stage-plate{
    position: relative;
    float: left;
    width: 70%;
    height: 100%;
  }
  .right-item-plate{
    float: left;
    width: 30%;
    height: 100%;
    box-shadow: -6px 0px 12px #333;
    background-color: #333;
    background-image: url(../assets/pattern/chalkboard.jpg);
    background-repeat: repeat-y;
  }
</style>