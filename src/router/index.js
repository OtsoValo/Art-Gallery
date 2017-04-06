import Vue from 'vue'
import Router from 'vue-router'
import AppPainting from '@/components/AppPainting'
import AppArtist from '@/components/AppArtist'
import AppStyle from '@/components/AppStyle'

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
		}
	]
})
