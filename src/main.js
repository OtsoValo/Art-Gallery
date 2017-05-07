// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import eventHub from './common/eventHub';
import 'iview/dist/styles/iview.css';

import lodash from 'lodash';
import axios from 'axios';

Vue.config.productionTip = false;

Vue.use(iView);

router.beforeEach((to, from, next) => {
	iView.LoadingBar.start();
	if (to.matched.length === 0) {
		next({ path: '/404notfound' });
	} else {
		next();
	}
});

router.afterEach((to, from, next) => {
	iView.LoadingBar.finish();
});

Vue.prototype.$http = axios;
Vue.prototype.$eventhub = eventHub;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
})
