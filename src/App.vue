<template>
	<div id="app">
		<div class="layout">
			<mu-appbar title="Artoex"
			           :class="{'drawer-open': open}"
			           class="app-navbar">
				<mu-icon-button icon="menu"
				                slot="left"
				                @click="toggle()" />
			</mu-appbar>
	
			<mu-drawer :open="open"
			           :docked="docked"
			           @close="toggle()">
				<mu-list @itemClick="open = false">
					<template v-for="menu in menuAll">
						<mu-list-item :title="menu.title"
						              @click="route(menu.link)" />
					</template>
				</mu-list>
			</mu-drawer>
	
			<div class="app-view"
			     :class="{'drawer-open': open}">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'app',
	data() {
		return {
			presetLink: 'painting',
			menuAll: [
				{ title: '名画', link: 'painting' },
				{ title: '艺术家', link: 'artist' },
				{ title: '流派', link: 'style' },
				{ title: '关于', link: 'about' }
			],
			open: false,
			docked: true
		}
	},
	watch: {
	},
	methods: {
		route(link) {
			this.$router.push({ path: link })
		},
		toggle(flag) {
			this.open = !this.open
			this.docked = !flag
		}
	}

}
</script>

<style scoped>
.layout {
	position: relative;
	width: 100%;
}

.app-navbar {
	position: fixed;
	left: 0;
	top: 0;
	height: 56px;
	transition: left .3s;
}

.app-view {
	position: fixed;
	width: 100%;
	height: 100%;
	overflow: scroll;
	left: 0;
	top: 56px;
	background-color: #fff;
	padding: 10px 10px 56px 10px;
}

.drawer-open {
	left: 256px;
}
</style>
