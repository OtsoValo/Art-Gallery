<template>
	<nav class="nav has-shadow">
		<div class="container">
			<div class="nav-left">
				<a class="nav-item">
					<img style="border-radius: 100%;"
					     src="../assets/logo.png"
					     alt="Artoex logo">
				</a>
				<a href="#/"
				   class="nav-item is-tab"
				   :class="{'is-active': isActive == 0}">首页</a>
				<a href="#/masterpieces"
				   class="nav-item is-tab"
				   :class="{'is-active': isActive == 1}">作品</a>
				<a href="#/artists"
				   class=" nav-item is-tab"
				   :class="{'is-active': isActive == 2}">画家</a>
				<a href="#/styles"
				   class=" nav-item is-tab"
				   :class="{'is-active': isActive == 3}">艺术流派</a>
				<a href="#/about"
				   class="nav-item is-tab"
				   :class="{'is-active': isActive == 4}">关于</a>
	
				<a href="#/admin?manage=website"
				   class="nav-item is-tab"
				   :class="{'is-active': isActive == 5}">后台</a>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'appNavbar',
	data: () => ({
		isActive: 0
	}),
	methods: {
		activateNavbar() {
			let activeHash = window.location.hash;
			activeHash = activeHash.includes('?') ? activeHash.slice(0, activeHash.indexOf('?')) : activeHash;
			switch (activeHash) {
				case '#/masterpieces':
					this.isActive = 1;
					break;
				case '#/artists':
					this.isActive = 2;
					break;
				case '#/styles':
					this.isActive = 3;
					break;
				case '#/about':
					this.isActive = 4;
					break;
				case '#/admin':
					this.isActive = 5;
					break;
				default:
					this.isActive = 0;
					break;
			}
		}
	},
	mounted() {
		this.activateNavbar();
		window.addEventListener('hashchange', () => {
			this.activateNavbar();
		});
	}
};

</script>