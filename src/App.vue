<template>
	<div id="app">
		<div class="layout">
			<Menu mode="horizontal"
			      theme="light"
				   @on-select="selectMenu"
			      :active-name="presetLink">
				<div class="layout-logo"></div>
				<div class="layout-nav">
					<template v-for="menu in menuAll">
						<Menu-item :name="menu.link">
							<Icon :type="menu.icon"></Icon>
							{{menu.title}}
						</Menu-item>
					</template>
				</div>
			</Menu>
			<div class="layout-content">
				<router-view></router-view>
			</div>
			<div class="layout-copy">
				2017-2018 &copy; Guangjie
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
				{ title: '名画', icon: 'images',  link: 'painting' },
				{ title: '艺术家', icon: 'paintbrush', link: 'artist' },
				{ title: '流派', icon: 'eye', link: 'style' },
				{ title: '关于', icon: 'at', link: 'about' }
			]
		}
	},
	watch: {
	},
	methods: {
		selectMenu(link){
			this.$router.push({ path: link });
		}
	}

}
</script>

<style scoped>
.layout {
	border: 1px solid #d7dde4;
	background: #f5f7f9;
}

.layout-logo {
	width: 100px;
	height: 30px;
	background-image: url(./assets/logo.png);
	background-repeat: no-repeat;
	background-position: center center;
	background-size: contain;
	border-radius: 3px;
	float: left;
	position: relative;
	top: 15px;
	left: 20px;
}

.layout-nav {
	width: 420px;
	margin: 0 auto;
}

.layout-assistant {
	width: 300px;
	margin: 0 auto;
	height: inherit;
}

.layout-breadcrumb {
	padding: 10px 15px 0;
}

.layout-content {
	min-height: 640px;
	margin: 15px;
	overflow: hidden;
	background: #fff;
	border-radius: 4px;
}

.layout-content-main {
	padding: 10px;
}

.layout-copy {
	text-align: center;
	padding: 10px 0 20px;
	color: #9ea7b4;
}
</style>
