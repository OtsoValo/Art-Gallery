import Vue from 'vue';
import Router from 'vue-router';
import AppPainting from '@/components/AppPainting';
import AppArtist from '@/components/AppArtist';
import NewArtist from '@/components/admin/NewArtist.vue';
import NewPainting from '@/components/admin/NewPainting.vue';
import EditArtist from '@/components/admin/EditArtist.vue';
import EditPainting from '@/components/admin/EditPainting.vue';

Vue.use(Router);

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
			path: '/newArtist',
			component: NewArtist
		}, {
			path: '/newPainting',
			component: NewPainting
		}, {
			path: '/editArtist',
			component: EditArtist
		}, {
			path: '/editPainting',
			component: EditPainting
		}
	]
});
