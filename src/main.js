// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import App from './App';
import LeftPlate from './components/LeftPlate';
import RightPlate from './components/RightPlate';
import Stage from './components/Stage';

Vue.use(VueResource);
Vue.use(VueRouter);
/* eslint-disable no-new */
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: Stage, alias: '/stage' },
    { path: '/left', component: LeftPlate },
    { path: '/right', component: RightPlate }
  ]
});

new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app');
