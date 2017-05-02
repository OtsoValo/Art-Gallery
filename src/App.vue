<template>
	<div id="app">
		<Menu mode="horizontal"
		      theme="light"
		      :active-name="defaultLink"
		      @on-select="routePage">
			<Menu-item name="painting">
				<Icon type="ios-color-filter"></Icon>
				画廊
			</Menu-item>
			<Menu-item name="artist">
				<Icon type="beer"></Icon>
				艺术家展厅
			</Menu-item>
			<Menu-item name="style">
				<Icon type="pizza"></Icon>
				风格拼图
			</Menu-item>
			<Menu-item name="funny">
				<Icon type="ios-infinite"></Icon>
				无尽探索
			</Menu-item>
			<Submenu name="admin">
				<template slot="title">
					<Icon type="ios-gear"></Icon>
					后台
				</template>
				<Menu-group title="增加处理">
					<Menu-item name="newArtist">新增一个艺术家</Menu-item>
					<Menu-item name="newPainting">新增一幅画作</Menu-item>
				</Menu-group>
				<Menu-group title="编辑更新">
					<Menu-item name="editArtist">编辑某个艺术家</Menu-item>
					<Menu-item name="editPainting">编辑某幅画作</Menu-item>
				</Menu-group>
			</Submenu>
	
			<div class="power-admin"></div>
		</Menu>
	
		<div class="app-view">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			defaultLink: 'painting'
		};
	},
	methods: {
		routePage(name) {
			this.$router.push({ path: name });
		}
	},
	mounted() {
		const curPath = this.$route.path;
		this.defaultLink = curPath.split('/')[1];
	}
}
</script>

<style scoped lang="scss">
#app {
	.power-admin {
		float: right;
		width: 36px;
		height: 36px;
		margin: 12px;
		background: url(./assets/favicon.png) no-repeat;
		background-size: cover;
	}
}
</style>
