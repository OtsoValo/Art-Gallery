<template>
    <div id="app">
        <ul class="ygj-menu">
          <li><router-link to="/"><a href="javascript:void(0);">舞台</a></router-link></li>
          <li><router-link to="/left"><a href="javascript:void(0);">左幕布</a></router-link></li>
          <li><router-link to="/right"><a href="javascript:void(0);">右幕布</a></router-link></li>
        </ul>
        <transition name="fade">
          <router-view></router-view>
        </transition>
    </div>
</template>

<script>
  export default {
    name: 'App'
  };
</script>

<style>
body,h1,h2,h3,h4,h5,h6,ul,ol,li,form,p,dl,dt,dd,blockquote,legend,table,th,td,fieldset,menu,pre{margin:0;padding:0}
table,th,td,img,fieldset{border:0}
img{display: block; margin: 0;}
ul{list-style: none}
#app {
    position: fixed;
    width: 100%;
    height: 100%;
    font-family: 'Microsoft Yahei','arial','sans-serif';
    font-weight: lighter;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #333;
    background-image: url(./assets/pattern/white-wood-min.jpg);
    background-repeat: repeat;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .3s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
}
.ygj-menu{
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 9000;
}
.ygj-menu li{
  float: left;
  font-size: 150px;
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-left: 10px;
  cursor: pointer;
}
.ygj-menu li a{
  font-size: 0;
  display: block;
  width: 100%;
  height: 100%;
  background-color: transparent;
  text-decoration: none;
}
.ygj-menu li:nth-child(1){
  background-color: #ff1e1e;
}
.ygj-menu li:nth-child(2){
  background-color: #14d254;
}
.ygj-menu li:nth-child(3){
  background-color: #1d64ff;
}
.ygj-menu li:nth-child(1):hover{
  box-shadow: 0 0 12px #ff1e1e;
}
.ygj-menu li:nth-child(2):hover{
  box-shadow: 0 0 12px #14d254;
}
.ygj-menu li:nth-child(3):hover{
  box-shadow: 0 0 12px #1d64ff;
}
</style>