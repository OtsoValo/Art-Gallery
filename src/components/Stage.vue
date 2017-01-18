<template>
	<div id="ygj-stage">
    <!--展示图片-->
    <img class="img-frame" src="/api/masterpieces/?id=1300" alt="...">
	</div>
</template>

<script>
export default {
  name: 'Stage',
  data () {
    return {
      msg: 'stage',
      msg2: '-- by 1kg --'
    };
  },
  mounted () {
  }
};
</script>

<style>
  #ygj-stage{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .img-frame{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 18px #333;
  }
</style>