import Vue from 'vue'
import Router from 'vue-router'
import AppPainting from '@/components/AppPainting'
import AppArtist from '@/components/AppArtist'
import AppStyle from '@/components/AppStyle'
import AppAdmin from '@/components/AppAdmin'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/painting'
		}, {
			path: '/painting',
			component: AppPainting
		}, {
			path: '/artist',
			component: AppArtist
		}, {
			path: '/style',
			component: AppStyle
		}, {
			path: '/admin',
			component: AppAdmin
		}
	]
})
