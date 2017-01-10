import Vue from 'vue'
import VueRouter from 'vue-router'
import Test from '../views/admin/test'

Vue.use(VueRouter)

const router = new VueRouter({
    history: true
})

var router = new VueRouter({
    routes: [
        { path: '/test', component: Test }
    ]
})

export default router