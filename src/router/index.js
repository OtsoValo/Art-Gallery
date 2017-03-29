import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from 'views/AppIndex'
import AppMasterpieces from 'views/AppMasterpieces'
import AppAdmin from 'admin/AppAdmin';

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'AppIndex',
			component: AppIndex
		}, {
			path: '/masterpieces',
			name: 'AppMasterpieces',
			component: AppMasterpieces
		}, {
			path: '/admin',
			name: 'AppAdmin',
			component: AppAdmin
		}
	]
})
