<template>
	<div id="ygj-left">
    <div class="left-menu-plate">
      <ul class="gj-menu-list">
        <li class="j-menu-link"><a href="javascript:void(0);">作品详情</a></li>
        <li class="j-menu-link"><a href="javascript:void(0);">画家简介</a></li>
        <li class="j-menu-link"><a href="javascript:void(0);">漫游</a></li>
      </ul>
      <div class="gj-detail-text">
        <p>
          《呐喊》是挪威印象派画家爱德华·蒙克（Edvard Munch）的代表作之一。画面的主体是在血红色映衬下一个极其痛苦的表情，红色的背景源于1883年印尼喀拉喀托火山爆发，火山灰把天空染红了。画中的地点是从厄克贝里山上俯视的奥斯陆峡湾，有人认为该作品反映了现代人被存在主义的焦虑侵扰的意境。 这套组画题材范围广泛，以讴歌“生命、爱情和死亡”为基本主题，采用象征和隐喻的手法，揭示了人类“世纪末”的忧虑与恐惧。<br/>先锋派表现主义艺术运动（The avant-garde Expressionist art movement that emerged）在20世纪初兴起于德国和奥地利。尽管展览着眼于是蒙克艺术生涯的后期，但仍然为1895年创作的这幅《呐喊》找到了一席之地。<br>蒙克在1892年1月22日的一篇日记中记录了《呐喊》的灵感来源：“我跟两个朋友一起迎着落日散步——我感受到一阵忧郁——突然间，天空变得血红。我停下脚步，靠着栏杆，累得要死——感觉火红的天空像鲜血一样挂在上面，刺向蓝黑色的峡湾和城市——我的朋友继续前进——我则站在那里焦虑得发抖——我感觉到大自然那剧烈而又无尽的呐喊。”[《呐喊》中的人物或许是蒙克的自画像，或是在他13岁就去世的姐姐苏菲(Sophie)。艺术史学家还认为，《呐喊》中的人物或许还有另外一个来源，那就是蒙克在1889年巴黎世博会上看到的一具秘鲁木乃伊。
        </p>
        <p class="gj-detail-from">————<span>《维基百科》</span></p>
      </div>
    </div>
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

<style scoped>
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
  .gj-menu-list{
    width: 100%;
    height: auto;
    padding-top: 40px;
    padding-bottom: 40px;
    border-bottom: 1px solid #eee;
  }
  .j-menu-link{
    margin-top: 10px;
    text-align: center;
  }
  .j-menu-link a{
    display: inline-block;
    width: 240px;
    height: 50px;
    text-decoration: none;
    text-align: center;
    font-size: 20px;
    line-height: 2.5;
    background-color: #fff;
    border: 1px solid #333;
    color: #333;
  }
  .j-menu-link a:hover{
    color: #fff;
    background-color: #333;
  }
  .gj-detail-text{
    width: 90%;
    height: auto;
    max-height: 640px;
    margin: 20px auto;
    font-size: 18px;
    overflow-y: scroll;
  }
  .gj-detail-from{
    text-align: right;
    margin-top: 10px;
  }
</style>