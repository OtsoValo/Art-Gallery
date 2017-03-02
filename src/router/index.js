import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from 'views/AppIndex'
import AppMasterpieces from 'views/AppMasterpieces'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppIndex',
      component: AppIndex
    },{
      path: '/masterpieces',
      name: 'AppMasterpieces',
      component: AppMasterpieces
    }
  ]
})
