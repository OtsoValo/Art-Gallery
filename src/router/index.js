import Vue from 'vue';
import Router from 'vue-router';
import AppPainting from '@/components/AppPainting';
import AppArtist from '@/components/AppArtist';
import NewArtist from '@/components/admin/NewArtist';
import NewPainting from '@/components/admin/NewPainting';
import EditArtist from '@/components/admin/EditArtist';
import EditPainting from '@/components/admin/EditPainting';
import App404 from '@/components/App404';

Vue.use(Router);

export default new Router({
	routes: [
		{
			path: '/',
			name: 'AppIndex',
			redirect: '/painting'
		}, {
			path: '/painting',
			name: 'AppPainting',
			component: AppPainting
		}, {
			path: '/artist',
			name: 'AppArtist',
			component: AppArtist
		}, {
			path: '/newArtist',
			name: 'NewArtist',
			component: NewArtist
		}, {
			path: '/newPainting',
			name: 'NewPainting',
			component: NewPainting
		}, {
			path: '/editArtist',
			name: 'EditArtist',
			component: EditArtist
		}, {
			path: '/editPainting',
			name: 'EditPainting',
			component: EditPainting
		}, {
			path: '/404notfound',
			name: 'App404',
			component: App404
		}
	]
});
