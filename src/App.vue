<template>
	<div id="app">
		<Menu mode="horizontal"
		      theme="light"
		      :active-name="defaultLink"
		      @on-select="routePage">
			<template v-for="menu in menuAry">
				<Menu-item :name="menu.link">
					<Icon :type="menu.icon"></Icon>
					{{menu.title}}
				</Menu-item>
			</template>
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
			defaultLink: 'painting',
			menuAry: [
				{ title: '绘画', link: 'painting', icon: 'paintbrush' },
				{ title: '艺术家', link: 'artist', icon: 'ios-people' },
				// { title: '风格', link: 'style', icon: 'pizza' },
				{ title: '综合设置', link: 'admin', icon: 'settings' }
			],
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
