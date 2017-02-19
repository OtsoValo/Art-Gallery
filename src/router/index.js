import Vue from 'vue'
import Router from 'vue-router'
import AppMasterpieces from 'views/AppMasterpieces'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppMasterpieces',
      component: AppMasterpieces
    }
  ]
})
