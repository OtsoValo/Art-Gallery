<template>
  <div id="appIndex" class="m-app-index">
    <div id="particles-js"></div>
  </div>
</template>

<script>
  import 'particles.js';

  export default {
    name: 'appIndex',
    mounted() {
      particlesJS.load('particles-js', '/api/particle', function () {
        console.log('callback - particles.js config loaded');
      });
    }
  };

</script>

<style scoped>
  .m-app-index {
    /*background: #72d0eb;*/
  }
  /* ---- reset ---- */
  
  canvas {
    display: block;
    vertical-align: bottom;
  }
  /* ---- particles.js container ---- */
  
  #particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #212121;
  }
</style>