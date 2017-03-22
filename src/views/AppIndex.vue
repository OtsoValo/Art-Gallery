<template>
  <div id="appIndex" class="m-app-index">
    <div id="particles-js"></div>
    <div class="site-intro">
      <div class="card">
        <div class="card-content">
          <p class="title">
            小清新艺术展廊网站 Artoex
          </p>
          <p class="subtitle">
            by懒懒笨笨的程序猿小杰
          </p>
          <div class="content">
            欢迎光临此网站！该网站里有两百多幅世界著名画家的画。著名大师与艺术家在创作中奇迹般地展示了我们所有的印象、幻想、建筑景观、物体、风景等。可以说，任何画廊都能使观众充满高等艺术的神秘气息并能感觉到创造者独特的内心世界。
            布景画、油画、水彩画、铅笔画、大型装饰画、圣像画、全景画、微型画、透影画——在如此多样性的选择中每个人总会找出他自己喜欢的风格。但即便如此，复制著名艺术家画作的过程仍笼罩在一层神秘的色彩中。也许正是这个隐瞒的秘密让观众每次都满腔热情地享受着画上鲜艳的色彩，不寻常的形状与雄伟深刻的作品主题。
            如果你是艺术的强烈爱好者，画布上的新形象与活泼色调每次都会使你赞叹不已。艺术作品的形象非常逼真，像活的一样。
            在这里我们可以发现过去的艺术家和当代的艺术家们找寻创作的灵感，鉴赏其艺术价值，并且在精神方面也很有意义。
            <a href="https://github.com/Gotjoy/Art-Gallery.git" target="_blank">@github</a>
            <br>
            <small>{{date}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import 'particles.js';

  export default {
    name: 'appIndex',
    data: ()=> ({
      date: (new Date).toString()
    }),
    mounted() {
      particlesJS.load('particles-js', '/api/particle', function () {
        console.log('callback - particles.js config loaded');
      });
    }
  };

</script>

<style scoped>
  .m-app-index {
    background: #121212;
  }
  /* ---- reset ---- */
  
  canvas {
    display: block;
    vertical-align: bottom;
    margin: 0;
  }
  
  #particles-js {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: #fff;
  }
  
  .site-intro {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
  }
</style>