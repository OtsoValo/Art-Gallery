<template>
	<div class="m-app-admin">
		<div class="w-sidebar">
	
		</div>
		<div class="columns">
			<div class="column is-2">
				<aside class="menu w-admin-menu">
					<p class="menu-label">
						Artoex
					</p>
					<ul class="menu-list">
						<li><a :class="{'is-active': isManage === 'website'}"
							   href="#/admin?manage=website">关于网站</a></li>
						<li><a>关于开发者</a></li>
					</ul>
					<p class="menu-label">
						Administration
					</p>
					<ul class="menu-list">
						<li><a>权限控制</a></li>
						<li><a>邀请</a></li>
					</ul>
					<p class="menu-label">
						Manage
					</p>
					<ul class="menu-list">
						<li><a :class="{'is-active': isManage === 'masterpieces'}"
							   href="#/admin?manage=masterpieces">作品管理</a></li>
						<li><a :class="{'is-active': isManage === 'artists'}"
							   href="#/admin?manage=artists">艺术家管理</a></li>
						<li><a :class="{'is-active': isManage === 'styles'}"
							   href="#/admin?manage=styles">艺术流派管理</a></li>
					</ul>
				</aside>
			</div>
			<div class="column is-10">
	
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'appAdmin',
	data: () => ({
		isManage: 'website'
	}),
	computed: {
	},
	methods: {
		activeAdminMenu(){
			let hash = window.location.hash;
			if(hash.indexOf('?') < 0){
				this.isManage = 'website';
			}
			let manage = hash.slice(hash.indexOf('?') + 1).split('=');
			this.isManage = manage[1];
		}
	},
	components: {
	},
	mounted(){
		this.activeAdminMenu();
		window.addEventListener('hashchange', () => {
			this.activeAdminMenu();
		});
	}
}
</script>

<style scoped>
.m-app-admin {
	width: 100%;
}

.w-admin-menu {
	padding: 10px 0 0 10px;
}
</style>