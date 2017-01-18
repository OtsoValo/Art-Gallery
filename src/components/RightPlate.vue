<template>
  <div id="ygj-right">
    <div class="right-stage-plate">
      <Stage></Stage>
    </div>
    <div class="right-item-plate">
      <div class="gj-item-box">
        <ul class="gj-item-list">
          <!--列表展示-->
          <li class="j-single-item">
            <div class="m-upper-area">
                <img class="w-img" src="/api/masterpieces/?id=1101" alt="...">        
                <div class="w-txt-area">
                  <p>《鲜艳的苹果君》 达芬奇 高斯；1944年；现实主义；美国布达拉斯；莫奈斯展厅；售价$45233。</p>
                </div>
            </div>
          </li>
          <li class="j-single-item">
            <div class="m-upper-area">
                <img class="w-img" src="/api/masterpieces/?id=1102" alt="...">        
                <div class="w-txt-area">
                  <p>《鲜艳的苹果君》 达芬奇 高斯；1944年；现实主义；美国布达拉斯；莫奈斯展厅；售价$45233。</p>
                </div>
            </div>
          </li>
          <li class="j-single-item">
            <div class="m-upper-area">
                <img class="w-img" src="/api/masterpieces/?id=1103" alt="...">        
                <div class="w-txt-area">
                  <p>《不知道在干嘛的少女》 梵高修夜绿科；1944年；现实主义；美国布达拉斯；军炎摩斯个人收藏；售价$45233800。</p>
                </div>
            </div>
          </li>
          <li class="j-single-item">
            <div class="m-upper-area">
                <img class="w-img" src="/api/masterpieces/?id=1104" alt="...">        
                <div class="w-txt-area">
                  <p>《你要知道我只是一个拿来测试的标题哈哈哈》 达芬奇007；加补一段很长很长的文字，1944年；现实主义；美国布达拉斯；莫奈斯展厅；售价$45233。</p>
                </div>
            </div>
          </li>
          <li class="j-single-item">
            <div class="m-upper-area">
                <img class="w-img" src="/api/masterpieces/?id=1105" alt="...">        
                <div class="w-txt-area">
                  <p>《鲜艳的苹果君》 达芬奇 高斯；1944年；现实主义；美国布达拉斯；莫奈斯展厅；售价$45233。</p>
                </div>
            </div>
          </li>

        </ul>
      </div>   
    </div>
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

<style scoped>
  #ygj-right{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 8000;
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
  .gj-item-box{
    width: 100%;
    height: 100%;
    overflow-y: scroll; 
    overflow-x: hidden;
  }
  .gj-item-list{
    width: 90%;
    height: auto;
    margin: 0 auto;
  }
  .j-single-item{
    width: 100%;
    height: 240px;
    margin-top: 16px;
    border: 4px solid #fff;
  }
  .m-upper-area{
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .w-img{
    width: 100%;
  }
  .w-txt-area{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: auto;
    padding: 6px 2px;
    background-color: #fff;
  }
</style>